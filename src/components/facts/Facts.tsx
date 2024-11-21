import { FC } from 'react'
import styles from './Facts.module.scss'
import { IData } from '../../shared/interfaces'
import { Swiper, SwiperSlide } from 'swiper/react'
import leftArrowBlue from '../../img/leftArrowBlue.png'
import rightArrowBlue from '../../img/rightArrowBlue.png'
import 'swiper/css'

interface IProps {
    activePoint: number
    data: IData[]
    isBeginning: boolean
    isEnd: boolean
    swiperInstance: any
    setSwiperInstanceHandler: (swiper: any) => void
    handleSwiperChange: () => void
}

export const Facts: FC<IProps> = ({
    data,
    activePoint,
    isBeginning,
    isEnd,
    swiperInstance,
    setSwiperInstanceHandler,
    handleSwiperChange,
}) => {
    return (
        <section className={styles.factsContainer}>
            {/* SLIDER */}
            <div className={styles.facts}>
                <Swiper
                    onSwiper={(swiper: any) => setSwiperInstanceHandler(swiper)}
                    spaceBetween={50}
                    slidesPerView={3}
                    onSlideChange={handleSwiperChange}
                >
                    {data[activePoint - 1].text.map(e => (
                        <SwiperSlide key={e.year}>
                            <div className={styles.fact}>
                                <div className={styles.factYear}>{e.year}</div>
                                <div className={styles.factText}>{e.descr}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* PREV BUTTON */}
            <button
                className={`${styles.factsButton} ${styles.factsButtonLeft}`}
                onClick={() => swiperInstance?.slidePrev()}
                disabled={isBeginning}
            >
                <img
                    className={styles.factsButtonImg}
                    src={leftArrowBlue}
                    alt="left arrow blue"
                />
            </button>

            {/* NEXT BUTTON */}
            <button
                className={`${styles.factsButton} ${styles.factsButtonRight}`}
                onClick={() => swiperInstance?.slideNext()}
                disabled={isEnd}
            >
                <img
                    className={styles.factsButtonImg}
                    src={rightArrowBlue}
                    alt="right arrow blue"
                />
            </button>
        </section>
    )
}
