import Skeleton from "@mui/material/Skeleton";

export const CardSkeleton = () => {
  const size = Array(50).fill(0);

  return (
    <>
      {size.map((itr, index) => (
        <Skeleton key={index} className="card-item" variant="rounded" height={100} style={{ borderRadius: "8px" }} />
      ))}
    </>
  );
};
