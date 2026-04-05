import { useEffect, useRef, useState, useCallback } from "react";
import Card from "./component/card";
import BasicModal from "./component/modal";
import { CardSkeleton } from "./component/cardSkeleton";

const PAGE_LIMIT = 20;

const useColumnCount = () => {
  const getCount = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1100) return 2;
    return 3;
  };
  const [cols, setCols] = useState(getCount);
  useEffect(() => {
    const handler = () => setCols(getCount());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return cols;
};

const CardRoot = (props) => {
  const { modalOpenRoot, setModalOpenRoot, search, setSearch, isLoggedIn } = props;

  const [counts, setCounts] = useState();
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const debounceTimer = useRef(null);
  const sentinelRef = useRef(null);
  const abortControllerRef = useRef(null);
  const colCount = useColumnCount();

  // Distribute cards into fixed columns — new cards always append to the
  // shortest column, so existing cards never move on pagination.
  const columns = Array.from({ length: colCount }, () => []);
  cards.forEach((card, i) => columns[i % colCount].push(card));

  const fetchCards = async (reset = false) => {
    if (isLoadingRef.current) return;
    if (!reset && !hasMoreRef.current) return;

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    const page = reset ? 1 : pageRef.current;
    isLoadingRef.current = true;
    setIsLoading(true);

    let url = `${window._env_.CODE_SNIPPETS_BACKEND}/card?page=${page}&limit=${PAGE_LIMIT}`;
    if (search.trim()) url += `&search=${search.trim()}`;

    await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: abortControllerRef.current.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success === true) {
          const newCards = data.data ?? [];
          setCards((prev) => (reset ? newCards : [...prev, ...newCards]));
          pageRef.current = page + 1;
          setCounts(data.count);
          const more = newCards.length === PAGE_LIMIT;
          hasMoreRef.current = more;
          setHasMore(more);
        }
        isLoadingRef.current = false;
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("Error occured while fetching cards", error);
        isLoadingRef.current = false;
        setIsLoading(false);
      });
  };

  useEffect(() => { fetchCards(true); }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      hasMoreRef.current = true;
      setHasMore(true);
      pageRef.current = 1;
      fetchCards(true);
    }, 600);
    return () => clearTimeout(debounceTimer.current);
  }, [search]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) fetchCards(false); },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isLoading, hasMore, cards]);

  return (
    <>
      {counts !== undefined && (
        <div className="toolbar">
          <div className="toolbar-left">
            <span className="total-count">{counts} {counts === 1 ? "snippet" : "snippets"}</span>
          </div>
        </div>
      )}

      <div className="card-root-container">
        {(cards.length > 0 ? columns : Array.from({ length: colCount }, () => [])).map((col, ci) => (
          <div key={ci} className="card-column">
            {col.map((currCard) => (
              <Card key={currCard?.cardUuid} cardDetails={currCard} refresh={() => fetchCards(true)} isLoggedIn={isLoggedIn} />
            ))}
            {isLoading && <CardSkeleton />}
          </div>
        ))}
      </div>

      {!isLoading && hasMore && <div ref={sentinelRef} style={{ height: "1px" }} />}

      {modalOpenRoot && (
        <BasicModal modalOpen={modalOpenRoot} setModalOpen={setModalOpenRoot} modalAction="new-card" refresh={() => fetchCards(true)} />
      )}
    </>
  );
};

export default CardRoot;
