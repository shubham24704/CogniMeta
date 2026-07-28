import type { ComponentType } from "react";
import { BubbleSortModule } from "../modules/BubbleSortModule";
import { InsertionSortModule } from "../modules/InsertionSortModule";
import { SelectionSortModule } from "../modules/SelectionSortModule";
import { MergeSortModule } from "../modules/MergeSortModule";

/**
 * Central lookup so routing stays generic (/learn/:category/:algorithm)
 * instead of needing a new hardcoded <Route> for every algorithm we add.
 * Add a line here + a catalog entry in catalog.ts and a new module is live.
 */
export const moduleRegistry: Record<string, ComponentType> = {
  "sorting/bubble-sort": BubbleSortModule,
  "sorting/insertion-sort": InsertionSortModule,
  "sorting/selection-sort": SelectionSortModule,
  "sorting/merge-sort": MergeSortModule,
};
