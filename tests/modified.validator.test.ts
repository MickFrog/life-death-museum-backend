import mongoose from "mongoose";
import { describe, expect, it } from "vitest";
import { OnType } from "../src/models/ObjectModel";
import { ItemFunction } from "../src/types";
import {
  createModifiedSchema,
  updateModifiedSchema,
} from "../src/validators/modified.validator";

describe("Modified Object Validation", () => {
  describe("Create Modified Object - itemFunction validation", () => {
    const baseCreateData = {
      name: "Test Object",
      currentImageSetId: new mongoose.Types.ObjectId().toString(),
      originalObjectId: new mongoose.Types.ObjectId().toString(),
      coordinates: { x: 0.5, y: 0.5 },
      onType: OnType.Floor,
    };

    it("should validate successfully when itemFunction is null and additionalData is empty", () => {
      const result = createModifiedSchema.safeParse({
        body: {
          ...baseCreateData,
          itemFunction: null,
          additionalData: {},
        },
      });

      expect(result.success).toBe(true);
    });

    it("should validate successfully when itemFunction is null and additionalData is undefined", () => {
      const result = createModifiedSchema.safeParse({
        body: {
          ...baseCreateData,
          itemFunction: null,
        },
      });

      expect(result.success).toBe(true);
    });

    it("should fail validation when itemFunction is null but additionalData has content", () => {
      const result = createModifiedSchema.safeParse({
        body: {
          ...baseCreateData,
          itemFunction: null,
          additionalData: { link: "https://example.com" },
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "";
        expect(errorMessage).toContain(
          "additionalData should be empty or undefined when itemFunction is null"
        );
      }
    });

    it("should validate successfully when itemFunction is Link with valid additionalData", () => {
      const result = createModifiedSchema.safeParse({
        body: {
          ...baseCreateData,
          itemFunction: ItemFunction.Link,
          additionalData: {
            link: "https://example.com",
          },
        },
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.itemFunction).toBe(ItemFunction.Link);
        expect(result.data.body.additionalData?.link).toBe(
          "https://example.com"
        );
      }
    });

    it("should fail validation when itemFunction is Link but additionalData is missing", () => {
      const result = createModifiedSchema.safeParse({
        body: {
          ...baseCreateData,
          itemFunction: ItemFunction.Link,
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "";
        expect(errorMessage).toContain(
          "additionalData is required when itemFunction is Link"
        );
      }
    });

    it("should fail validation when itemFunction is Link but additionalData.link is empty", () => {
      const result = createModifiedSchema.safeParse({
        body: {
          ...baseCreateData,
          itemFunction: ItemFunction.Link,
          additionalData: {
            link: "",
          },
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "";
        expect(errorMessage).toContain(
          "link field is required and cannot be empty"
        );
      }
    });

    it("should validate successfully when itemFunction is Board with valid additionalData", () => {
      const result = createModifiedSchema.safeParse({
        body: {
          ...baseCreateData,
          itemFunction: ItemFunction.Board,
          additionalData: {
            data: {
              title: "Test Board",
              description: "Test Description",
              items: [
                {
                  writer: "Test Writer",
                  text: "Test Text",
                  color: "#FF0000",
                },
              ],
            },
          },
        },
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.itemFunction).toBe(ItemFunction.Board);
        expect(result.data.body.additionalData?.data?.title).toBe("Test Board");
        expect(result.data.body.additionalData?.data?.items).toHaveLength(1);
      }
    });

    it("should fail validation when itemFunction is Board but additionalData is missing", () => {
      const result = createModifiedSchema.safeParse({
        body: {
          ...baseCreateData,
          itemFunction: ItemFunction.Board,
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "";
        expect(errorMessage).toContain(
          "additionalData is required when itemFunction is Board"
        );
      }
    });

    it("should fail validation when itemFunction is Board but data field is missing", () => {
      const result = createModifiedSchema.safeParse({
        body: {
          ...baseCreateData,
          itemFunction: ItemFunction.Board,
          additionalData: {},
        },
      });

      expect(result.success).toBe(false);
    });

    it("should fail validation when itemFunction is Board but items have invalid fields", () => {
      const result = createModifiedSchema.safeParse({
        body: {
          ...baseCreateData,
          itemFunction: ItemFunction.Board,
          additionalData: {
            data: {
              title: "Test Board",
              description: "Test Description",
              items: [
                {
                  writer: "", // Empty writer should fail
                  text: "Test Text",
                  color: "#FF0000",
                },
              ],
            },
          },
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "";
        expect(errorMessage).toContain(
          "writer field is required and cannot be empty"
        );
      }
    });
  });

  describe("Update Modified Object - itemFunction validation", () => {
    const baseUpdateData = {
      params: {
        id: new mongoose.Types.ObjectId().toString(),
      },
    };

    it("should validate successfully when itemFunction is set to null and additionalData is empty", () => {
      const result = updateModifiedSchema.safeParse({
        ...baseUpdateData,
        body: {
          itemFunction: null,
          additionalData: {},
        },
      });

      expect(result.success).toBe(true);
    });

    it("should validate successfully when itemFunction is set to null and additionalData is undefined", () => {
      const result = updateModifiedSchema.safeParse({
        ...baseUpdateData,
        body: {
          itemFunction: null,
        },
      });

      expect(result.success).toBe(true);
    });

    it("should fail validation when itemFunction is set to null but additionalData has content", () => {
      const result = updateModifiedSchema.safeParse({
        ...baseUpdateData,
        body: {
          itemFunction: null,
          additionalData: { link: "https://example.com" },
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "";
        expect(errorMessage).toContain(
          "additionalData should be empty or undefined when itemFunction is null"
        );
      }
    });

    it("should validate successfully when itemFunction is set to Link with valid additionalData", () => {
      const result = updateModifiedSchema.safeParse({
        ...baseUpdateData,
        body: {
          itemFunction: ItemFunction.Link,
          additionalData: {
            link: "https://example.com",
          },
        },
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.itemFunction).toBe(ItemFunction.Link);
        expect(result.data.body.additionalData?.link).toBe(
          "https://example.com"
        );
      }
    });

    it("should fail validation when itemFunction is set to Link but additionalData is missing", () => {
      const result = updateModifiedSchema.safeParse({
        ...baseUpdateData,
        body: {
          itemFunction: ItemFunction.Link,
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "";
        expect(errorMessage).toContain(
          "additionalData is required when itemFunction is Link"
        );
      }
    });

    it("should fail validation when itemFunction is set to Link but additionalData.link is empty", () => {
      const result = updateModifiedSchema.safeParse({
        ...baseUpdateData,
        body: {
          itemFunction: ItemFunction.Link,
          additionalData: {
            link: "",
          },
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "";
        expect(errorMessage).toContain(
          "link field is required and cannot be empty"
        );
      }
    });

    it("should validate successfully when itemFunction is set to Board with valid additionalData", () => {
      const result = updateModifiedSchema.safeParse({
        ...baseUpdateData,
        body: {
          itemFunction: ItemFunction.Board,
          additionalData: {
            data: {
              title: "Updated Board",
              description: "Updated Description",
              items: [
                {
                  writer: "Updated Writer",
                  text: "Updated Text",
                  color: "#00FF00",
                },
              ],
            },
          },
        },
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.itemFunction).toBe(ItemFunction.Board);
        expect(result.data.body.additionalData?.data?.title).toBe(
          "Updated Board"
        );
        expect(result.data.body.additionalData?.data?.items).toHaveLength(1);
      }
    });

    it("should fail validation when itemFunction is set to Board but additionalData is missing", () => {
      const result = updateModifiedSchema.safeParse({
        ...baseUpdateData,
        body: {
          itemFunction: ItemFunction.Board,
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "";
        expect(errorMessage).toContain(
          "additionalData is required when itemFunction is Board"
        );
      }
    });

    it("should fail validation when itemFunction is set to Board but items have empty fields", () => {
      const result = updateModifiedSchema.safeParse({
        ...baseUpdateData,
        body: {
          itemFunction: ItemFunction.Board,
          additionalData: {
            data: {
              title: "Test Board",
              description: "Test Description",
              items: [
                {
                  writer: "Writer",
                  text: "", // Empty text should fail
                  color: "#FF0000",
                },
              ],
            },
          },
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "";
        expect(errorMessage).toContain(
          "text field is required and cannot be empty"
        );
      }
    });

    it("should validate successfully when updating only name without changing itemFunction", () => {
      const result = updateModifiedSchema.safeParse({
        ...baseUpdateData,
        body: {
          name: "Updated Name",
        },
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.name).toBe("Updated Name");
        expect(result.data.body.itemFunction).toBeUndefined();
      }
    });
  });

  describe("Data integrity checks", () => {
    it("should preserve all data fields when creating with itemFunction null", () => {
      const createData = {
        name: "Test Object",
        currentImageSetId: new mongoose.Types.ObjectId().toString(),
        originalObjectId: new mongoose.Types.ObjectId().toString(),
        coordinates: { x: 0.3, y: 0.7 },
        onType: OnType.LeftWall,
        description: "Test Description",
        isReversed: true,
        itemFunction: null,
      };

      const result = createModifiedSchema.safeParse({
        body: createData,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.name).toBe(createData.name);
        expect(result.data.body.coordinates.x).toBe(createData.coordinates.x);
        expect(result.data.body.coordinates.y).toBe(createData.coordinates.y);
        expect(result.data.body.onType).toBe(createData.onType);
        expect(result.data.body.description).toBe(createData.description);
        expect(result.data.body.isReversed).toBe(createData.isReversed);
        expect(result.data.body.itemFunction).toBeNull();
      }
    });

    it("should preserve all data fields when creating with itemFunction Link", () => {
      const createData = {
        name: "Link Object",
        currentImageSetId: new mongoose.Types.ObjectId().toString(),
        originalObjectId: new mongoose.Types.ObjectId().toString(),
        coordinates: { x: 0.2, y: 0.8 },
        onType: OnType.RightWall,
        description: "Link Description",
        isReversed: false,
        itemFunction: ItemFunction.Link,
        additionalData: {
          link: "https://test.com",
        },
      };

      const result = createModifiedSchema.safeParse({
        body: createData,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.name).toBe(createData.name);
        expect(result.data.body.itemFunction).toBe(ItemFunction.Link);
        expect(result.data.body.additionalData?.link).toBe(
          createData.additionalData.link
        );
        expect(result.data.body.coordinates).toEqual(createData.coordinates);
      }
    });

    it("should preserve all data fields when creating with itemFunction Board", () => {
      const createData = {
        name: "Board Object",
        currentImageSetId: new mongoose.Types.ObjectId().toString(),
        originalObjectId: new mongoose.Types.ObjectId().toString(),
        coordinates: { x: 0.9, y: 0.1 },
        onType: OnType.Floor,
        description: "Board Description",
        isReversed: false,
        itemFunction: ItemFunction.Board,
        additionalData: {
          data: {
            title: "Board Title",
            description: "Board Description",
            items: [
              {
                writer: "Writer 1",
                text: "Text 1",
                color: "#FF0000",
              },
              {
                writer: "Writer 2",
                text: "Text 2",
                color: "#00FF00",
              },
            ],
          },
        },
      };

      const result = createModifiedSchema.safeParse({
        body: createData,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.name).toBe(createData.name);
        expect(result.data.body.itemFunction).toBe(ItemFunction.Board);
        expect(result.data.body.additionalData?.data?.title).toBe(
          createData.additionalData.data.title
        );
        expect(result.data.body.additionalData?.data?.items).toHaveLength(2);
        expect(result.data.body.additionalData?.data?.items[0].writer).toBe(
          "Writer 1"
        );
        expect(result.data.body.additionalData?.data?.items[1].writer).toBe(
          "Writer 2"
        );
      }
    });

    it("should preserve all data fields when updating with itemFunction null", () => {
      const updateData = {
        params: {
          id: new mongoose.Types.ObjectId().toString(),
        },
        body: {
          name: "Updated Name",
          description: "Updated Description",
          coordinates: { x: 0.4, y: 0.6 },
          itemFunction: null,
          additionalData: {},
        },
      };

      const result = updateModifiedSchema.safeParse(updateData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.name).toBe(updateData.body.name);
        expect(result.data.body.description).toBe(updateData.body.description);
        expect(result.data.body.coordinates).toEqual(
          updateData.body.coordinates
        );
        expect(result.data.body.itemFunction).toBeNull();
      }
    });
  });
});
