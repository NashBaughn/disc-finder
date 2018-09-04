import { DATA_AVAILABLE } from "../actions/";

let dataState = {data:[], loading:true};

const mapData = (state = dataState, action) => {
  switch (action.type) {
        case DATA_AVAILABLE:          
            var markers = action.data.markers;
            var lost  = [];
            var found = [];
            var unkown = [];


            for(var i=0; i<markers.length; i++){
            	var curr = markers[i];
                curr.coordinate = {
            		longitude: curr.longitude,
            		latitude: curr.latitude
            	}
                if(curr.status == 'lost'){
                    lost.push(curr);
                } else if (curr.status == 'found'){
                    found.push(curr);
                } else {
                    unkown.push(curr);
                }
            }

            var frmt = {
            	region: action.data.region,
            	lost: lost,
                found: found,
                unkown: unkown,
                markers: lost
            }   

            state = Object.assign({}, state, { data: frmt, loading:false });
            return state;
        default:
            return state;
    }
};

export default mapData;