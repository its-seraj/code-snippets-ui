import { useEffect, useState } from "react";
import Card from "./component/card";
import BasicModal from "./component/modal";
import { CardSkeleton } from "./component/cardSkeleton";

const CardRoot = (props) => {
  const { modalOpenRoot, setModalOpenRoot, search, setSearch } = props;

  const [counts, setCounts] = useState();
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const controller = new AbortController();
  const signal = controller.signal;
  const fetchCards = async (isRefresh = false) => {
    if (cards?.length > 0 && !isRefresh) {
      return;
    }
    setIsLoading(true);

    let url = `${window._env_.CODE_SNIPPETS_BACKEND}/card`;
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    };

    if (search.trim()) {
      url += `?search=${search.trim()}`;
    }

    await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success === true) {
          controller.abort();
          console.log("All cards data", data.data);
          setCards(data.data);
          if (!counts) {
            setCounts(data.count);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return console.log("Request was canceled");
        }
        console.error("Error occured while fetching cards", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCards();
  }, []);
  useEffect(() => {
    if (search) {
      fetchCards(true);
    }
  }, [search]);

  return (
    <>
      <div className="total-count">{counts}</div>
      <div className="card-root-container">
        {cards?.length > 0 ? cards.map((currCard) => <Card key={currCard?.cardUuid} cardDetails={currCard} refresh={fetchCards} />) : isLoading && <CardSkeleton />}
      </div>
      {modalOpenRoot && <BasicModal modalOpen={modalOpenRoot} setModalOpen={setModalOpenRoot} modalAction="new-card" refresh={fetchCards} />}
    </>
  );
};

export default CardRoot;
