export interface IPoints {
    num: number
    x: number
    y: number
}

interface IYear {
    year: number
    descr: string
}

export interface IDate {
    num: number
    title: string
    leftYear: number
    rightYear: number
    text: IYear[]
}
