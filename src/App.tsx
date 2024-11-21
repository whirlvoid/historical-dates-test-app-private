import { FC, useEffect, useState } from 'react'
import styles from './App.module.scss'
import { IData, IPointsWithCoordinates } from './shared/interfaces'
import { INITIAL_DATA } from './db'
import { useSwiper } from 'swiper/react'
import { Background } from './components/background/Background'
import { BigYearNumbers } from './components/big-year-numbers/BigYearNumbers'
import { ChangePeriod } from './components/change-period/ChangePeriod'
import { Facts } from './components/facts/Facts'
import { MobilePagination } from './components/mobile-pagination/MobilePagination'

const App: FC = () => {
    const [data, setData] = useState<IData[]>(INITIAL_DATA)
    const [pointsWithCoordinates, setPointsWithCoordinates] = useState<
        IPointsWithCoordinates[]
    >([])
    const [activePoint, setActivePoint] = useState<number>(1)
    const [radius] = useState<number>(534 / 2)

    useEffect(() => {
        setData(INITIAL_DATA)
        const newPoinsWithCoordinates = []
        for (let i = 0; i < data.length; i++) {
            const angle = (i / data.length) * 2 * Math.PI
            const x = radius + radius * Math.cos(angle)
            const y = radius + radius * Math.sin(angle)
            newPoinsWithCoordinates.push({ x, y, num: i + 1, id: i })
        }
        setPointsWithCoordinates(newPoinsWithCoordinates)
    }, [data])

    const swiper = useSwiper()
    const [swiperInstance, setSwiperInstance] = useState<typeof swiper | null>(
        null,
    )
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)

    const handleSwiperChange = () => {
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
    const setActivePointHandler = (num: number) => {
        setActivePoint(num)
    }
    const setPeriodPrevHandler = () => {
        setActivePoint(prev => {
            if (prev === 1) return data.length
            return prev - 1
        })
    }
    const setPeriodNextHandler = () => {
        setActivePoint(prev => {
            if (prev === data.length) return 1
            return prev + 1
        })
    }
    const setSwiperInstanceHandler = (swiper: any) => {
        setSwiperInstance(swiper)
    }
    return (
        <main className={styles.app}>
            <Background
                numPoints={data.length}
                activePoint={activePoint}
                pointsWithCoordinates={pointsWithCoordinates}
                data={data}
                setActivePointHandler={setActivePointHandler}
            />
            <div className={styles.container}>
                <section className={styles.title}>
                    Исторические <br />
                    даты
                </section>
                <BigYearNumbers activePoint={activePoint} data={data} />
                <ChangePeriod
                    activePoint={activePoint}
                    numPoints={data.length}
                    setPeriodNextHandler={setPeriodNextHandler}
                    setPeriodPrevHandler={setPeriodPrevHandler}
                />
                <section className={styles.lineText}>
                    {data[activePoint - 1].title}
                </section>
                <section className={styles.line}></section>
                <Facts
                    activePoint={activePoint}
                    data={data}
                    handleSwiperChange={handleSwiperChange}
                    isBeginning={isBeginning}
                    isEnd={isEnd}
                    setSwiperInstanceHandler={setSwiperInstanceHandler}
                    swiperInstance={swiperInstance}
                />
            </div>
            <MobilePagination
                activePoint={activePoint}
                data={data}
                setActivePointHandler={setActivePointHandler}
            />
        </main>
    )
}

export default App
