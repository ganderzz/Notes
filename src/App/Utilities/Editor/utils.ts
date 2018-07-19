import { Slate } from "slate";

export function hasMark(value: Slate.Value, type: string) {
  return value.activeMarks.some(
    (mark?: Slate.Mark) => (mark && mark.type == type) || false
  );
}

export function hasBlock(value: Slate.Value, type: string) {
  return value.blocks.some(
    (mark?: Slate.Block) => (mark && mark.type == type) || false
  );
}