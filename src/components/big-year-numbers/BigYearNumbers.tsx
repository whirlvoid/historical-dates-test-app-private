import { FC } from 'react'
import styles from './BigYearNumbers.module.scss'
import { IData } from '../../shared/interfaces'

interface IProps {
    activePoint: number
    data: IData[]
}

export const BigYearNumbers: FC<IProps> = ({ data, activePoint }) => {
    return (
        <section className={styles.bigYears}>
            <div className={`${styles.leftYear} ${styles.bigYear}`}>
                {data[activePoint - 1].leftYear}
            </div>
            <div className={`${styles.rightYear} ${styles.bigYear}`}>
                {data[activePoint - 1].rightYear}
            </div>
        </section>
    )
}
