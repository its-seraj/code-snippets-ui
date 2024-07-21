import { useEffect, useState } from "react";
import Card from "./component/card";
import BasicModal from "./component/modal";
import { CardSkeleton } from "./component/cardSkeleton";

const CardRoot = (props) => {
  const { modalOpenRoot, setModalOpenRoot, search, setSearch } = props;

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          setCards(data.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error occured while fetching cards", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCards();
  }, []);
  useEffect(() => {
    fetchCards(true);
  }, [search]);

  return (
    <>
      <div className="card-root-container">{cards?.length > 0 ? cards.map((currCard, index) => <Card key={index} cardDetails={currCard} refresh={fetchCards} />) : isLoading && <CardSkeleton />}</div>
      {modalOpenRoot && <BasicModal modalOpen={modalOpenRoot} setModalOpen={setModalOpenRoot} modalAction="new-card" refresh={fetchCards} />}
    </>
  );
};

export default CardRoot;
