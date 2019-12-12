import View from './view.js'

export default class LinePlot extends View {
    constructor(context,inputs,labelx,labely){
        super(context,inputs);
        this.labelx = labelx;
        this.labely = labely;
    }

    dicotomicSearchAndInsert(element,array){

        Array.prototype.insert = function (index,item) {
            this.splice(index,0,item);
        };

        let start = 0, end = array.length - 1

        while(start <= end){
          let middle = Math.floor((start + end)/2);
          if(array[middle].x === element.x){
            array[middle].y = (array[middle].y + element.y) / 2;
            return true;
          }
          if(array[middle].x < element.x) start = middle + 1;
          else end = middle - 1;
        }
        array.insert(start,element);
        return false;
    }
    
    addData(datax, datay) {
        let b = {x:datax,y:datay}
        this.dicotomicSearchAndInsert(b,this.chart.data.datasets[0].data);
        this.chart.update();
    }

    createPlot(){
        this.chart = new Chart(this.context, {
            type: 'scatter',
            data: {
                datasets: [{
                    data: [],
                    pointBackgroundColor: "#1535BB",
                    borderColor: "#84BFF7",
                    showLine: true,
                    fill:false
                }],
            },
            options: {
                legend: {
                    display: false
                },
                scales :{
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: this.labelx
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: this.labely
                        }
                    }]
                }
            }
        });
    }

    display(){
        var self = this
        var onData = function(binding){
            binding = binding.toObject()
            if(binding[self.labelx] != undefined && binding[self.labely] != undefined){ //TODO Make a filter
                self.addData(parseInt(binding[self.labelx].split("\"")[1].replace(/\D/g,'')),parseInt(binding[self.labely].split("\"")[1].replace(/\D/g,'')));
            }else{
                console.log("parameters " + self.labelx + " and " + self.labely + " don't exist")
            }
        }
        var onError = function(err){
            console.error('something wrong occurred: ' + err); 
        }
    
        var onComplete = function(){
            console.log('done');
        }

        super.display(this.inputs,onData,onError,onComplete)
    }
}

