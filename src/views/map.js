import View from './view.js'

export default class Map extends View {

    constructor(context,inputs,lat,lng){
        super(context,inputs);
        this.lat = lat;
        this.lng = lng;
        this.icon = new H.map.Icon("https://image.flaticon.com/icons/svg/149/149059.svg", {size: {w: 32, h: 32}});

    }

    addData(lat, lng) {
        let place = new H.map.Marker({lat:lat,  lng:lng}, {icon: this.icon});
        this.group.addObject(place);
    }

    resize(){
        this.map.getViewModel().setLookAtData({
            bounds: this.group.getBoundingBox()
        });
    }

    createPlot(){

        console.log(H);

        // Initialize the platform object:
        var platform = new H.service.Platform({
            'apikey': 'HereMap_apiKey'
        });

        // Obtain the default map types from the platform object
        var defaultLayers = platform.createDefaultLayers();

        // Instantiate (and display) a map object:
        this.map = new H.Map(document.getElementById('chartMap'),
            defaultLayers.vector.normal.map,{
            center: {lat:0, lng:0},
            zoom: 1,
            pixelRatio: window.devicePixelRatio || 1
        });
        
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

        //var ui = H.ui.UI.createDefault(this.map, defaultLayers);

        this.group = new H.map.Group();
        this.map.addObject(this.group);

        console.log("map created");        
    }

    display(){
        var self = this
        var onData = function(binding){
            binding = binding.toObject()
            if(binding[self.lat] != undefined && binding[self.lng] != undefined){ //TODO Make a filter
                self.addData(parseFloat(binding[self.lat].split("\"")[1]),parseFloat(binding[self.lng].split("\"")[1]));
                if(self.group.b % 10 == 0){
                    self.resize();
                }
            }else{
                console.log("parameters " + self.lat + " and " + self.lng + " don't exist")
            }
        }
        var onError = function(err){
            console.error('something wrong occurred: ' + err); 
        }
    
        var onComplete = function(){
            self.resize();
            console.log('done');
        }

        super.display(this.inputs,onData,onError,onComplete)
    }

}