importFile('./style.css');
var App = {
    ready: ()=>{
        return new Promise((resolve, reject)=>{
            importFile([
                '../../classes/event_emitter.js',
                '../../classes/point.js'
            ]).then(() => {
                class NQueensProblemSolver extends EventEmitter{
                    constructor(size, multi = false){
                        super();
                        this.size = size;
                        this.isSolutionFound = false;
                        this.multi = multi;
                    }
                    search(){
                        this._searchSolution();
                    }
                    _searchSolution(points = [], lastRow = 0, lastColumn = 0){
                        let currentColumn = lastColumn;
                        for (let i = lastRow; i < this.size; i++) {
                            if(this.isSolutionFound && !this.multi){return;}
                            for (let j = currentColumn; j < this.size; j++) {
                                if(this.isSolutionFound && !this.multi){return;}
                                let point = new Point(j, i);
                                if(NQueensProblemSolver.checkPoint(point, points)){
                                    this._searchSolution(points.slice(), i, ++j);
                                    points.push(point);
                                    break;
                                }
                            }
                            currentColumn=0;
                        }
                        if(points.length === this.size) {
                            if(this.multi || !this.isSolutionFound){
                                this.emit('solution', this._translateToFitSolution(points));
                                this.isSolutionFound = true;
                            }
                        }
                    }
                    _translateToFitSolution(points){
                        let fitSolution = {};
                        points.forEach((point) => {
                            fitSolution[point.x] = point.y;
                        });
                        return fitSolution;
                    }
                    static checkPoint(point, points){
                        for(let i = 0; i < points.length; i++) {
                            let checkablePoint = points[i];
                            if(checkablePoint.x === point.x || point.y === checkablePoint.y ||
                                Math.abs(checkablePoint.x - point.x) === Math.abs(checkablePoint.y - point.y)){
                                return false;
                            }
                        }
                        return true;
                    }
                }
                resolve({
                    NQueensProblemSolver
                });
            });
        });
    }
};