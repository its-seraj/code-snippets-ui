export const CardSkeleton = () => {
  return (
    <>
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="card-skeleton" />
      ))}
    </>
  );
};
