// types/key-types.ts
import { validKeys } from "../validKeys";

export type Key = (typeof validKeys)[number]; // Inferred from the validKeys array
