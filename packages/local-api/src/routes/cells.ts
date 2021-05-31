import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import defaultCells from '../default';

interface Cell {
    id: string;
    content: string;
    type: 'code' | 'text';
}

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();
    const fullPath = path.join(dir, filename);

    router.use(express.json());

    router.get('/cells', async (request, response) => {
        try {
            const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
            response.send(JSON.parse(result));
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.writeFile(fullPath, JSON.stringify(defaultCells), 'utf-8');
                const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
                response.send(JSON.parse(result));
            } else {
                response.status(500).send(err.message);
            }
        }
    });

    router.post('/cells', async (request, response) => {
        const { cells }: { cells: Cell[] } = request.body;
        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        response.send({ status: 'ok' });
    });

    return router;
};