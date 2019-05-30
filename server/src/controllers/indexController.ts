import {Request, Response } from 'express';

class IndexController {
    public index (rep: Request, res: Response) {
        res.json({text: 'API Is /api/games'});
    }
}

export const indexController = new IndexController();