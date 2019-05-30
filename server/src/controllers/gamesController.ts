import {Request, Response } from 'express';

import pool from '../database';
import { REPLServer } from 'repl';

class GamesController {
    public async list (req: Request, res: Response) {
       const games = await pool.query('SELECT * FROM games');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if(games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({text: "Yhe game doesn't exists"});
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO games set ?', [req.body]);
        res.json({text: 'creating a game'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The was updated'});
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message: 'The game was deleted'});
        } catch (error) {
            res.status(500).json({error});
        }
    }

}

const gamesController = new GamesController();
export default gamesController;