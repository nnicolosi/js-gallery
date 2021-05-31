import { useTypedSelector } from './use-typed-selector'

export const useCumulativeCode = (cellId: string) => {
    return useTypedSelector((state) => {
        const { data, order } = state.cells;

        const showFunction = `
            import _React from 'react';
            import _ReactDOM from 'react-dom';

            var show = (value) => {
                const root = document.querySelector('#root');

                if (typeof value === 'object') {
                    if (value.$$typeof && value.props) {
                        const div = document.createElement('div');
                        root.appendChild(div);
                        _ReactDOM.render(value, div);
                    } else {
                        root.append(JSON.stringify(value));
                    }
                } else {
                    root.append(value);
                }
            };
        `;

        const showFunctionNoOp = 'var show = () => {}';
        const orderedCells = order.map(id => data[id]);
        const cumulativeCode = [];

        for (let c of orderedCells) {
            if (c.type === 'code') {
                if (c.id === cellId) {
                    cumulativeCode.push(showFunction);
                } else {
                    cumulativeCode.push(showFunctionNoOp);
                }
                cumulativeCode.push(c.content);
            }
            if (c.id === cellId) {
                break;
            }
        }

        return cumulativeCode;
    }).join('\n');
};