import React from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IPoint, ITrack, MaxSpeed, MaxSpeedColors, Surface, SurfaceColors } from './types';
Chart.register(CategoryScale);
Chart.defaults.plugins.legend.display = false;

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSurface(): Surface {
    const surfaces = [Surface.SAND, Surface.ASPHALT, Surface.GROUND];
    const randomIndex = getRandomNumber(0, 2);
    return surfaces[randomIndex];
}

function getRandomMaxSpeed(): MaxSpeed {
    const maxSpeeds = [MaxSpeed.FAST, MaxSpeed.NORMAL, MaxSpeed.SLOW];
    const randomIndex = getRandomNumber(0, 2);
    return maxSpeeds[randomIndex];
}

function generateTracks(randomPoints: any): ITrack[] {
    const tracks: ITrack[] = [];
    for (let i = 0; i < randomPoints.length - 1; i++) {
        tracks.push({
            firstId: randomPoints[i].id,
            secondId: randomPoints[i + 1].id,
            distance: getRandomNumber(20, 100),
            surface: getRandomSurface(),
            maxSpeed: getRandomMaxSpeed()
        });
    }
    return tracks;
}

function getBackgroundColorBySurface(surface: Surface): string {
    switch (surface) {
        case Surface.SAND:
            return SurfaceColors.SAND;
        case Surface.ASPHALT:
            return SurfaceColors.ASPHALT;
        case Surface.GROUND:
            return SurfaceColors.GROUND;
        default:
            return '#ffffff';
    }
}

function getBorderColorBySurface(surface: MaxSpeed): string {
    switch (surface) {
        case MaxSpeed.FAST:
            return MaxSpeedColors.FAST;
        case MaxSpeed.NORMAL:
            return MaxSpeedColors.NORMAL;
        case MaxSpeed.SLOW:
            return MaxSpeedColors.SLOW;
        default:
            return '#ffffff';
    }
}

interface IAreaChartProps {
    points: IPoint[]
}

const AreaChart = (props: IAreaChartProps) => {
    const { points } = props;
    const tracks = generateTracks(points);
    const getDatasetItem = (t: any, target: string) => ({
        fill: {
            target: target,
        },
        backgroundColor: getBackgroundColorBySurface(t.surface),
        borderColor: getBorderColorBySurface(t.maxSpeed),
        data: points.map(p => t.firstId === p.id || t.secondId === p.id ? p.height : null)
    });

    const data = {
        labels: points.map(p => p.name),
        datasets: [
            ...tracks.map(t => getDatasetItem(t, 'origin')),
            ...tracks.map(t => getDatasetItem(t, 'end')),
        ]
    };
    const getWidth = (points: IPoint[]) => {
        const pointsPageLength = 20;
        if (points.length > pointsPageLength) return 1638 * Math.ceil(points.length / pointsPageLength);
        return '1638px';
    } 
    return (
        <div style={{ width: '100%', overflowX: 'scroll' }}>
            <div style={{ minWidth: '600px' }}>
                <div style={{ width: getWidth(points), height: '800px' }}>
                    <Line data={data} options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );
};

export default AreaChart;