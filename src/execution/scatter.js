export default function createPlot(iterator,labelx,labely){

  var ctx = document.getElementById('chartLinePlot');
  var chart = new Chart(ctx, {
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
            labelString: labelx
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: labely
          }
        }]
      }
    }
  });

  Array.prototype.insert = function (index,item) {
    this.splice(index,0,item);
  };

  function dicotomicSearchAndInsert(element,array){
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

  function addData(datax, datay) {
      let b = {x:datax,y:datay}
      dicotomicSearchAndInsert(b,chart.data.datasets[0].data);
      chart.update();
  }

  function pipe(inputs,x,y){

    inputs.subscribe({
      next(binding) {
        //console.log("Vue Line" + JSON.stringify(binding.toObject()))
        binding = binding.toObject()
        if(binding[x] != undefined && binding[y] != undefined){ //TODO Make a filter
          //console.log("x : " + binding[x].split("\"")[1] + " y : " + binding[y].split("\"")[1])
          addData(parseInt(binding[x].split("\"")[1].replace(/\D/g,'')),parseInt(binding[y].split("\"")[1].replace(/\D/g,'')));
        }else{
          console.log("parameters " + x + " and " + y + " don't exist")
        }
      },
      error(err) { 
        console.error('something wrong occurred: ' + err); 
      },
      complete() { 
        console.log('done'); 
      }
    });
  }

  pipe(iterator,labelx,labely);

}
