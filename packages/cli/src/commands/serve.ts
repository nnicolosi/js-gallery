import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action(async (filename = 'gallery.js', options: { port: string }) => {
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
            console.log(`Opened file ${filename}.  Navigate to http://localhost:${options.port} to edit file.`)
        } catch (err) {
            if (err.code === 'EADDRINUSE') {
                console.log('Error: Port is in use. Try running on a different port.');
            } else {
                console.log(`Error: ${err.message}`);
            }
            process.exit(1);
        }
    });