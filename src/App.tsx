import { useEffect, useRef, useState } from 'react'
import styles from './App.module.scss'
import leftArrow from './img/leftArrow.png'
import rightArrow from './img/rightArrow.png'
import leftArrowBlue from './img/leftArrowBlue.png'
import rightArrowBlue from './img/rightArrowBlue.png'
import { IDate, IPoints } from './interfaces'
import { INITIAL_DATES } from './db'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useSwiper } from 'swiper/react'

function App() {
    const [dates, setDates] = useState<IDate[]>(INITIAL_DATES)
    const [points, setPoints] = useState<IPoints[]>([])
    const [activePoint, setActivePoint] = useState<number>(1)
    const [numPoints, setNumPoints] = useState<number>(6)
    const radius = 534 / 2

    useEffect(() => {
        setNumPoints(dates.length)
        const newPoints = []
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * 2 * Math.PI
            const x = radius + radius * Math.cos(angle)
            const y = radius + radius * Math.sin(angle)
            let isActive = false
            if (i === 5) isActive = true
            newPoints.push({ x, y, num: i + 1 })
        }
        setPoints(newPoints)
    }, [numPoints])

    const swiper = useSwiper()
    const [swiperInstance, setSwiperInstance] = useState<typeof swiper | null>(
        null,
    )

    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)

    const handleSwiperChange = () => {
        console.log('is beginning: ' + swiperInstance?.isBeginning)
        console.log('is end: ' + swiperInstance?.isEnd)

        if (swiperInstance?.isEnd) {
            setIsEnd(true)
        }
        if (!swiperInstance?.isEnd) {
            setIsEnd(false)
        }
        if (swiperInstance?.isBeginning) {
            setIsBeginning(true)
        }
        if (!swiperInstance?.isBeginning) {
            setIsBeginning(false)
        }
    }

    return (
        <div className={styles.app}>
            <div className={styles.bg}>
                <div className={`${styles.main} ${styles.container}`}>
                    <div className={styles.child}></div>
                    <div className={styles.child}></div>
                    <div className={styles.child}></div>
                    <div className={styles.child}></div>
                    <div className={styles.circle}>
                        <div
                            className={styles.circleRelative}
                            style={{
                                transform: `rotate(-${(360 / numPoints) * activePoint}deg)`,
                            }}
                        >
                            {points.map((point, index) => (
                                <div
                                    key={index}
                                    className={`${styles.point} ${point.num === activePoint ? styles.pointActive : null}`}
                                    style={{
                                        left: point.x - 28,
                                        top: point.y - 28,
                                        transform: `rotate(${(360 / numPoints) * activePoint}deg)`,
                                    }}
                                    onClick={() => setActivePoint(point.num)}
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
                            ))}
                        </div>
                        <div className={styles.circleText}>
                            {dates[activePoint - 1].title}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.title}>
                    Исторические <br />
                    даты
                </div>
                <div className={styles.bigYears}>
                    <div className={`${styles.leftYear} ${styles.bigYear}`}>
                        {dates[activePoint - 1].leftYear}
                    </div>
                    <div className={`${styles.rightYear} ${styles.bigYear}`}>
                        {dates[activePoint - 1].rightYear}
                    </div>
                </div>
                <div className={styles.swipePeriod}>
                    <p className={styles.swipePeriodText}>
                        0{activePoint}/0{numPoints}
                    </p>
                    <div className={styles.swipePeriodButtons}>
                        <button
                            className={styles.swipePeriodButton}
                            onClick={() =>
                                setActivePoint(prev => {
                                    if (prev === 1) return numPoints
                                    return prev - 1
                                })
                            }
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
                            onClick={() =>
                                setActivePoint(prev => {
                                    if (prev === numPoints) return 1
                                    return prev + 1
                                })
                            }
                            disabled={activePoint === numPoints}
                        >
                            <img
                                className={styles.swipePeriodImg}
                                src={rightArrow}
                                alt="right arrow"
                            />
                        </button>
                    </div>
                </div>
                <div className={styles.factsContainer}>
                    <div className={styles.facts}>
                        <Swiper
                            onSwiper={(swiper: any) =>
                                setSwiperInstance(swiper)
                            }
                            spaceBetween={50}
                            slidesPerView={3}
                            onSlideChange={handleSwiperChange}
                        >
                            {dates[activePoint - 1].text.map(e => (
                                <SwiperSlide key={e.year}>
                                    <div className={styles.fact}>
                                        <div className={styles.factYear}>
                                            {e.year}
                                        </div>
                                        <div className={styles.factText}>
                                            {e.descr}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
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
                    <button
                        className={`${styles.factsButton} ${styles.factsButtonRight}`}
                        onClick={() => swiperInstance?.slideNext()}
                        disabled={isEnd}
                    >
                        <img
                            className={styles.swipePeriodImg}
                            src={rightArrowBlue}
                            alt="right arrow blue"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App
