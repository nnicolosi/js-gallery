import './code-cell.css';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useEffect } from 'react';
import Resizable from './resizable';
import CodeEditor from './code-editor';
import CodePreview from './code-preview';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cell.content);
            return;
        }

        const timer = setTimeout(async () => {
            createBundle(cell.id, cell.content);
        }, 750);

        return () => {
            clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.id, cell.content, createBundle]);

    return (
        <Resizable direction="vertical">
            <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction="horizontal">
                    <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
                </Resizable>
                <div className="progress-wrapper"> 
                    { !bundle || bundle.loading ? (
                            <div className="progress-cover">
                                <progress className="progress is-small is-primary" max="100">
                                    Loading
                                </progress>
                            </div>
                    ) : (
                        <CodePreview code={bundle.code} error={bundle.error} />
                    )}
                </div>
            </div>
        </Resizable>
    );
}

export default CodeCell;
