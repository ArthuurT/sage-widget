import View from './view.js'

export default class BarPlot extends View {
    constructor(context,inputs,label,value){
        super(context,inputs);
        this.label = label;
        this.value = value;
    }
    
    addData(label, value) {
        var clean_label = label.split("\"")[1]
        var clean_value = parseInt(value.split("\"")[1].replace(/\D/g,''))
        var rand_color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
        this.chart.data.labels.push(clean_label)
        this.chart.data.datasets[0].data.push(clean_value)
        this.chart.data.datasets[0].backgroundColor.push(rand_color)
        this.chart.update()
    }

    createPlot(){
        this.chart = new Chart(this.context, {
            type: 'bar',
            data: {
                labels:[],
                datasets: [
                    {
                        data: [],
                        backgroundColor: []
                    }
                ],
            },
            options: {
                legend: {
                    display: false
                }
            }
        });
    }

    display(){
        var self = this
        var onData = function(binding){
            binding = binding.toObject()
            if(binding[self.label] != undefined && binding[self.value] != undefined){ //TODO Make a filter
                self.addData(binding[self.label],binding[self.value]);
            }else{
                console.log("parameters " + self.label + " and " + self.value + " don't exist")
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