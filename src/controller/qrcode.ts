import { Router, Request, Response, NextFunction } from "express";
import QRCode from "qrcode";
import { authenticateJWT } from "../middleware/auth";

export const qrcodeRouter = Router();

