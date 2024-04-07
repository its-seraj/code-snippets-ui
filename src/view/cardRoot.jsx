import { useEffect, useState } from "react";
import Card from "./component/card";
import BasicModal from "./component/modal";

const CardRoot = (props) => {
  const { modalOpenRoot, setModalOpenRoot } = props;

  const [cards, setCards] = useState([]);

  const fetchCards = async (isRefresh = false) => {
    if (cards?.length > 0 && !isRefresh) {
      return;
    }

    const url = `${window._env_.CODE_SNIPPETS_BACKEND}/card`;
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success === true) {
          setCards(data.data);
        }
      })
      .catch((error) => {
        console.error("Error occured while fetching cards", error);
      });
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      <div className="card-root-container">{cards?.length > 0 && cards.map((currCard, index) => <Card key={index} cardDetails={currCard} refresh={fetchCards} />)}</div>
      {modalOpenRoot && <BasicModal modalOpen={modalOpenRoot} setModalOpen={setModalOpenRoot} modalAction="new-card" refresh={fetchCards} />}
    </>
  );
};

export default CardRoot;
