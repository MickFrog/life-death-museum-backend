import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middleware/auth';

const protectedRouter = Router();

// Example of a protected route - requires authentication
protectedRouter.get('/secret', authenticateJWT, (req: Request, res: Response) => {
    const user = req.user!;
    
    res.json({
        message: `Hello ${user.name}! This is a protected route.`,
        userId: user.id,
        email: user.email,
        accessTime: new Date().toISOString()
    });
});

export { protectedRouter };
