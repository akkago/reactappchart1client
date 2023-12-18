// Список возможных типов поверхности
export enum SurfaceColors {
    SAND = '#f6f9c9',
    ASPHALT = '#cbcac9',
    GROUND = '#cff9cb'
}
export enum MaxSpeedColors {
    FAST = '#41aca8',
    NORMAL = '#5a8cab',
    SLOW = '#cf0000'
}

export enum Surface {
    SAND,
    ASPHALT,
    GROUND
}
export enum MaxSpeed {
    FAST,
    NORMAL,
    SLOW
}
// Контрольная точка. Позиция в маршруте определяется в массиве маршрута
export interface IPoint {
    // id
    id: number;
    // название
    name: string;
    // Высота точки
    height: number;
}

// Отрезок. Определяет характеристики участка маршрута между 2 соседними точками  
export interface ITrack {
    // id первой точки
    firstId: number;
    // id второй точки
    secondId: number;
    // расстояние между точками
    distance: number;
    // тип поверхности на отрезке
    surface: Surface;
    // максимально допустимая скорость на отрезке
    maxSpeed: MaxSpeed;
}