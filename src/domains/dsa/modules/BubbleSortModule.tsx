import { ArraySortModule } from "./ArraySortModule";
import { bubbleSortSteps } from "../algorithms/sorting/bubbleSort";
import { bubbleSortContent } from "../content/bubbleSortContent";

export function BubbleSortModule() {
  return <ArraySortModule stepsGenerator={bubbleSortSteps} content={bubbleSortContent} />;
}