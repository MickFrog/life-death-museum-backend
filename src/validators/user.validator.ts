import { z } from "zod";

// PATCH /users/invitation 스키마
export const updateInvitationSchema = z.object({
  body: z.object({
    invitation: z.union([z.string().trim(), z.null()], {
      message: "invitation field is required",
    }),
  }),
});

// 타입 추출
export type UpdateInvitationBody = z.infer<
  typeof updateInvitationSchema
>["body"];
