export default function createPlot(iterator,labelx,labely){

  var ctx = document.getElementById('chartLinePlot').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'scatter',

      // The data for our dataset
      data: {
          labels: [],
          datasets: [{
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              fill: false,
              data: [],
          }]
      },

      // Configuration options go here
      options: {
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
    })


  function addData(datax, datay) {

      let b = {"x":datax,"y":datay}
      //console.log(b)
      chart.data.datasets.forEach((dataset) => {
          dataset.data.push(b);
      });

      chart.update();
  }

  function pipe(inputs,x,y){

    inputs.subscribe({
      next(binding) { 
        binding = binding.toObject()
        if(binding[x] != undefined && binding[y] != undefined){ //TODO Make a filter
          //console.log("x : " + binding[x].split("\"")[1] + " y : " + binding[y].split("\"")[1])
          addData(binding[x].split("\"")[1].replace(/\D/g,''),binding[y].split("\"")[1].replace(/\D/g,''));
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
