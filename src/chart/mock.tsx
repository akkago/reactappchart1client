import { IPoint } from "./types";

function generateRandomPoints(numPoints: number): IPoint[] {
    const points: IPoint[] = [];
    for (let i = 0; i < numPoints; i++) {
        const randomHeight = Math.floor(Math.random() * 200);
        points.push({
            id: i,
            name: `Point ${i}`,
            height: randomHeight,
        });
    }
    return points;
}

export default generateRandomPoints;