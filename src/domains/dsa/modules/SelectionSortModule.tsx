import { ArraySortModule } from "./ArraySortModule";
import { selectionSortSteps } from "../algorithms/sorting/selectionSort";
import { selectionSortContent } from "../content/selectionSortContent";

export function SelectionSortModule() {
  return <ArraySortModule stepsGenerator={selectionSortSteps} content={selectionSortContent} />;
}