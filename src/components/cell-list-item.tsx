import './cell-list-item.css';
import { Cell } from '../state';
import ActionBar from './action-bar';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellListItemProps {
    cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    const cellListItem = cell.type === 'code' 
        ? <>
            <div className="action-bar-wrapper">
                <ActionBar id={cell.id} />
            </div>
            <CodeCell cell={cell} />
          </>
        : <>
            <ActionBar id={cell.id} />
            <TextEditor cell={cell} />
          </>;

    return (
        <div className="cell-list-item">
            {cellListItem}
        </div>
    );
};

export default CellListItem;