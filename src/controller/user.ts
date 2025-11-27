import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/UserModel";
import { authenticateJWT } from "../middleware/auth";
import { validate } from "../middleware/validation";
import {
  updateInvitationSchema,
  type UpdateInvitationBody,
} from "../validators/user.validator";

export const userRouter = Router();

// PATCH /users/invitation - Update user invitation
userRouter.patch(
  "/invitation",
  authenticateJWT,
  validate(updateInvitationSchema),
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const body: UpdateInvitationBody = req.body;
      const { invitation } = body;
      const userId = req.user!.id;

      // Find user and update invitation
      const user = await User.findByIdAndUpdate(
        userId,
        { invitation: invitation === "" ? null : invitation },
        { new: true, runValidators: true }
      ).exec();

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "초대 문구가 성공적으로 업데이트되었습니다.",
        invitation: user.invitation || null,
      });
    } catch (error) {
      console.error("Error updating invitation:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);
