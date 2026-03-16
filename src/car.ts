class Car { 
    private _speed: number; 
    constructor() {
        this._speed = 0; 
    } 
    
    public accelerate(accelerateFactor: number): void { 
        this._speed += accelerateFactor; 
    }
     
    public decelerate(decelerateFactor: number): void {
        this._speed -= decelerateFactor; 
    } 
 
    public emergencyBrake(): void { 
        this._speed = 0; 
    }
    
    public get speed(): number { 
        return this._speed; 
    }
}

export default Car