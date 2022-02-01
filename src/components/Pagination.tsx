import React from 'react';
import { useItemContext } from '../store/ContextProvider';

export const Pagination: React.FC = () => {
    const { totalPage, currentPage, action } = useItemContext();
    return (
        <div className="display-flex justify-center unselectable">
            <div className="pagination">
                {Array.from({ length: totalPage}, (_, i) =>
                    <span key={i} className={((i+1) === currentPage) ? "underlined" : ""} onClick={() => { action.setCurrentPage(i+1) }}
                    >{i+1}</span>
                )}
            </div>
        </div>
    )
}