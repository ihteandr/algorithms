importFile('./style.css');
var App = {
    ready: ()=>{
        return new Promise((resolve, reject)=>{
            importFile([
                '../../classes/event_emitter.js',
                '../../classes/point.js'
            ]).then(() => {
                class NKnightProblemSolver extends EventEmitter{
                    constructor(size, multi = false){
                        super();
                        this.size = size;
                        this.solution = [];
                        for (let i = 0; i < size; i++) {
                            this.solution[i] = [];
                        }
                    }
                    search(){
                        this._searchSolution();
                    }
                    static getPoints(point, solution, size) {
                        const diffs = [
                            {
                                x: 1,
                                y: 2,
                            }, {
                                x: 2,
                                y: 1,
                            }, {
                                x: 2,
                                y: -1,
                            }, {
                                x: 1,
                                y: -2,
                            }, {
                                x: -1,
                                y: -2
                            }, {
                                x: -2,
                                y: -1,
                            }, {
                                x: -2,
                                y: 1,
                            }, {
                                x: -1,
                                y: 2
                            },
                        ];
                        return diffs.map((diff) => {
                            return new Point(point.x + diff.x, point.y + diff.y);
                        }).filter((point) => {
                            return NKnightProblemSolver.checkPoint(point, solution, size);
                        });
                    }
                    _searchSolution(step = 1, point = new Point(0, 0)){
                        const possiblePoints = NKnightProblemSolver.getPoints(point, this.solution, this.size);
                        this.solution[point.x][point.y] = step;
                        if(step === this.size * this.size) {
                            this.emit('solution', this.solution);
                            return true;
                        }
                        for (let i = 0; i < possiblePoints.length; i++) {
                            const pPoint = possiblePoints[i];
                            if(this._searchSolution(step+1, pPoint)) {
                                return true;
                            }
                            this.solution[pPoint.x][pPoint.y] = undefined;
                        }
                        return false;
                    }
                    static checkPoint(point, solution, size){
                        if (point.x < 0 || point.x >= size ||
                            point.y >= size || point.y < 0) {
                            return false;
                        }
                        return typeof solution[point.x][point.y] === 'undefined';
                    }
                }
                resolve({
                    NKnightProblemSolver
                });
            });
        });
    }
};