import './cell-list-item.css';
import { Fragment } from 'react';
import { Cell } from '../state';
import ActionBar from './action-bar';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellListItemProps {
    cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    const cellListItem = cell.type === 'code' 
        ? <Fragment>
            <div className="action-bar-wrapper">
                <ActionBar id={cell.id} />
            </div>
            <CodeCell cell={cell} />
          </Fragment>
        : <Fragment>
            <ActionBar id={cell.id} />
            <TextEditor cell={cell} />
          </Fragment>;

    return (
        <div className="cell-list-item">
            {cellListItem}
        </div>
    );
};

export default CellListItem;