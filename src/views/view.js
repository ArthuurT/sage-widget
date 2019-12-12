export default class View {
    constructor(context,inputs){
        if(this.constructor === View){
            throw new TypeError('Abstract class "View" cannot be instantiated directly')
        }
        this.inputs = inputs;
        this.context = context;
        this.chart = null;
    }

    createPlot(){
        throw new Error('You must implement the createPlot function');
    }

    display(inputs,onData,onError,onComplete){
        this.createPlot()
        inputs.subscribe(onData,onError,onComplete);
    }
}