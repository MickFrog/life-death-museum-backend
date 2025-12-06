import mongoose, { Schema, Document, Model } from "mongoose";
import { ImageObject, ImageObjectSchema } from "./ObjectModel";
import { ObjectId } from "mongoose";
import { ItemFunction } from "../types";

export interface ImageCoords {
  x: number;
  y: number;
}

// Example interface
export interface ModifiedObject extends Document, ImageObject {
  _id: ObjectId;
  isReversed: boolean;
  itemFunction: ItemFunction | null;
  additionalData?: any;
  coordinates: ImageCoords;
}

// Example schema
const ModifiedObjectSchema: Schema = new Schema(
  Object.assign({}, ImageObjectSchema.obj, {
    itemFunction: {
      type: String,
      enum: [ItemFunction.Link, ItemFunction.Board, null],
      required: false,
      default: null,
      trim: true,
    },
    isReversed: {
      type: Boolean,
      required: true,
      default: false,
    },
    additionalData: { type: Schema.Types.Mixed },
    coordinates: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  }),
  { timestamps: true }
);

export const ModifiedObjectModel: Model<ModifiedObject> =
  mongoose.model<ModifiedObject>("ModifiedObject", ModifiedObjectSchema);
