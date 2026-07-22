import { Navigate, useParams } from "react-router-dom";
import { moduleRegistry } from "../domains/dsa/content/moduleRegistry";

export function AlgorithmPage() {
  const { category, algorithm } = useParams();
  const key = `${category}/${algorithm}`;
  const Module = moduleRegistry[key];

  if (!Module) return <Navigate to={`/learn/${category}`} replace />;

  return <Module />;
}
