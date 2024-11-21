import styles from './Background.module.scss'
import { FC } from 'react'
import { IData, IPointsWithCoordinates } from '../../shared/interfaces'
import { CirclePoint } from './CirclePoint/CirclePoint'

interface IProps {
    numPoints: number
    activePoint: number
    pointsWithCoordinates: IPointsWithCoordinates[]
    data: IData[]
    setActivePointHandler: (num: number) => void
}

export const Background: FC<IProps> = ({
    numPoints,
    activePoint,
    pointsWithCoordinates,
    data,
    setActivePointHandler,
}) => {
    return (
        <section className={styles.bgContainer}>
            <div className={`${styles.bg} ${styles.container}`}>
                {/* MARKUP BLOCKS FOR BACKGROUND GRID*/}
                <div className={styles.bgMarkup}></div>
                <div className={styles.bgMarkup}></div>
                <div className={styles.bgMarkup}></div>
                <div className={styles.bgMarkup}></div>

                {/* CIRCLE */}
                <div className={styles.circle}>
                    <div
                        className={styles.circleRelative}
                        style={{
                            transform: `rotate(-${(360 / numPoints) * activePoint}deg)`,
                        }}
                    >
                        {/* POINTS ON CIRCLE */}
                        {pointsWithCoordinates.map(
                            (point: IPointsWithCoordinates) => (
                                <CirclePoint
                                    key={point.id}
                                    activePoint={activePoint}
                                    numPoints={numPoints}
                                    point={point}
                                    setActivePointHandler={
                                        setActivePointHandler
                                    }
                                />
                            ),
                        )}
                    </div>

                    {/* TEXT NEAR CIRCLE */}
                    <div className={styles.circleText}>
                        {data[activePoint - 1].title}
                    </div>
                </div>
            </div>
        </section>
    )
}
