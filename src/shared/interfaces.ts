export interface IPointsWithCoordinates {
    id: number
    num: number
    x: number
    y: number
}

interface IYear {
    year: number
    descr: string
}

export interface IData {
    id: number
    num: number
    title: string
    leftYear: number
    rightYear: number
    text: IYear[]
}
