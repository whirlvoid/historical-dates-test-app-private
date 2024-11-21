import { FC } from 'react'
import styles from './MobilePagination.module.scss'
import { IData } from '../../shared/interfaces'

interface IProps {
    activePoint: number
    data: IData[]
    setActivePointHandler: (num: number) => void
}

export const MobilePagination: FC<IProps> = ({
    data,
    activePoint,
    setActivePointHandler,
}) => {
    return (
        <div className={styles.mobilePagination}>
            <div className={styles.mobilePaginationPoints}>
                {data.map((point: IData) => (
                    <button
                        key={point.id}
                        className={`${styles.mobilePaginationPoint} ${point.num === activePoint ? styles.mobilePaginationPointActive : null}`}
                        onClick={() => setActivePointHandler(point.num)}
                    ></button>
                ))}
            </div>
        </div>
    )
}
