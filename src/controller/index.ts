import { Application } from "express";
import { exampleRouter } from "./_example";
import { signupRouter, loginRouter, profileRouter, verifyRouter } from "./auth";
  
export const setupRoutes = (app: Application): void => {
  // API routes
  app.use("/api/example", exampleRouter);
  
  // Auth routes
  app.use("/auth/signup", signupRouter);
  app.use("/auth/login", loginRouter);
  app.use("/auth/profile", profileRouter);
  app.use("/auth/verify", verifyRouter);

  // Add more routes here
  // app.use('/api/users', userRouter);
  // app.use('/api/posts', postRouter);
};
