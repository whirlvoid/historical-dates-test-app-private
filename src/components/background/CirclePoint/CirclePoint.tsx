import { FC } from 'react'
import { IPointsWithCoordinates } from '../../../shared/interfaces'
import styles from '../Background.module.scss'

interface IProps {
    point: IPointsWithCoordinates
    numPoints: number
    activePoint: number
    setActivePointHandler: (num: number) => void
}

export const CirclePoint: FC<IProps> = ({
    point,
    activePoint,
    setActivePointHandler,
    numPoints,
}) => {
    return (
        <div
            className={`${styles.point} ${point.num === activePoint ? styles.pointActive : null}`}
            style={{
                left: point.x - 28,
                top: point.y - 28,
                transform: `rotate(${(360 / numPoints) * activePoint}deg)`,
            }}
            onClick={() => setActivePointHandler(point.num)}
        >
            <p
                className={`${styles.pointNum} ${point.num === activePoint ? styles.pointNumActive : null}`}
            >
                {point.num}
            </p>
            <p
                className={`${styles.pointPoint} ${point.num === activePoint ? styles.pointPointActive : null}`}
            ></p>
        </div>
    )
}
