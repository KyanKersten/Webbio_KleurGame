import { describe, expect, it, afterEach, jest } from '@jest/globals';
import Car from './car';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('accelerate', () => {
            // Given
            const car = new Car();

            jest.spyOn(car, 'accelerate').mockImplementation((factor: number) => {
                car['_speed'] -= factor;
            });

            const accelerateFactor = 20;

            // When
            car.accelerate(accelerateFactor);

            // Then
            expect(car.speed).toBe(-20);
});

describe('decelerate', () => {
            // Given
            const car = new Car();

            jest.spyOn(car, 'decelerate').mockImplementation((factor: number) => {
                car['_speed'] += factor;
            });

            const decelerateFactor = 15;

            // When
            car.decelerate(decelerateFactor);

            // Then
            expect(car.speed).toBe(15);
});

describe('emergencyBrake', () => {
            // Given
            const car = new Car();

            car.accelerate(80);

            // When
            car.emergencyBrake();

            // Then
            expect(car.speed).toBe(0);
});

describe('initial state', () => {
            // Given
            const car = new Car();

            // When
            const speed = car.speed;

            // Then
            expect(speed).toBe(0);
});

