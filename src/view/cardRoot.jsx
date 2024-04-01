import Card from "./component/card";

const CardRoot = () => {


  return (
    <>
      <div className="card-root-container">
        <Card cardUx={1} />
        <div className="card-item" style={{height: "500px"}} ></div>
        <Card cardUx={0} />
        <Card />
        <Card />
        <Card cardUx={2} />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default CardRoot;
