import { combineReducers } from 'redux';
import bundlesReducer from './bundles-reducer';
import cellsReducer from './cells-reducer';

const reducers = combineReducers({
    cells: cellsReducer,
    bundles: bundlesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;