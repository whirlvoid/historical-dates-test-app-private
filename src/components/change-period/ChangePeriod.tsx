import { FC } from 'react'
import styles from './ChangePeriod.module.scss'
import leftArrow from '../../img/leftArrow.png'
import rightArrow from '../../img/rightArrow.png'

interface IProps {
    numPoints: number
    activePoint: number
    setPeriodPrevHandler: () => void
    setPeriodNextHandler: () => void
}

export const ChangePeriod: FC<IProps> = ({
    activePoint,
    numPoints,
    setPeriodPrevHandler,
    setPeriodNextHandler,
}) => {
    return (
        <section className={styles.swipePeriod}>
            {/* TITLE */}
            <p className={styles.swipePeriodText}>
                0{activePoint}/0{numPoints}
            </p>

            {/* BUTTONS */}
            <div className={styles.swipePeriodButtons}>
                <button
                    className={styles.swipePeriodButton}
                    onClick={setPeriodPrevHandler}
                    disabled={activePoint === 1}
                >
                    <img
                        className={styles.swipePeriodImg}
                        src={leftArrow}
                        alt="left arrow"
                    />
                </button>
                <button
                    className={styles.swipePeriodButton}
                    onClick={setPeriodNextHandler}
                    disabled={activePoint === numPoints}
                >
                    <img
                        className={styles.swipePeriodImg}
                        src={rightArrow}
                        alt="right arrow"
                    />
                </button>
            </div>
        </section>
    )
}
