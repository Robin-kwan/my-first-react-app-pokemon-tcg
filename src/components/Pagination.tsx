import React from 'react';

interface IPagination {
    totalPage: number;
    currentPage: number;
    clickHandler: (n : number) => void;
}

export const Pagination: React.FC<IPagination> = props => {

    return (
        <div className="display-flex justify-center unselectable">
            <div className="pagination">
                {Array.from({ length: props.totalPage}, (_, i) =>
                    <span key={i} className={((i+1) === props.currentPage) ? "underlined" : ""} onClick={() => { props.clickHandler(i+1) }}
                    >{i+1}</span>
                )}
            </div>
        </div>
    )
    
}