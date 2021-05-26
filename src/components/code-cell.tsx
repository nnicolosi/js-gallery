import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useEffect, useState } from 'react';
import Resizable from './resizable';
import CodeEditor from './code-editor';
import CodePreview from './code-preview';
import bundle from '../bundler';

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code);
            setErr(output.err);
        }, 750);

        return () => {
            clearTimeout(timer);
        }
    }, [input]);

    return (
        <Resizable direction="vertical">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction="horizontal">
                    <CodeEditor onChange={(value) => setInput(value)} />
                </Resizable>
                <CodePreview code={code} error={err} />
            </div>
        </Resizable>
    );
}

export default CodeCell;
