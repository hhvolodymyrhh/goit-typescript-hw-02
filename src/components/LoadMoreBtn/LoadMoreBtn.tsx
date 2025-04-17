import { FC } from "react";
import css from "./LoadMoreBtn.module.css";
import { LoadMoreBtnProps } from "./LoadMoreBtn.types";


const LoadMoreBtn: FC<LoadMoreBtnProps> = ({onLoadMore}) => {
 
  return (
    <>
      <button onClick={onLoadMore} className={css.loadMoreBtn}>
      Load More
    </button>
    </>
  )
}

export default LoadMoreBtn
