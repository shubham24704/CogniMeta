import { ArraySortModule } from "./ArraySortModule";
import { insertionSortSteps } from "../algorithms/sorting/insertionSort";
import { insertionSortContent } from "../content/insertionSortContent";

export function InsertionSortModule() {
  return <ArraySortModule stepsGenerator={insertionSortSteps} content={insertionSortContent} />;
}