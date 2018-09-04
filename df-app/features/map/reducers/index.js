import { DATA_AVAILABLE } from "../actions/";

let dataState = {data:[], loading:true};

//dummy content
const mapData = (state = dataState, action) => {
  switch (action.type) {
        case DATA_AVAILABLE:
        	console.log("B B B B B")
             
            var markers = action.data.markers;
            var formattedMarkers = [];

            for(var i=0; i<markers.length; i++){
            	markers[i].coordinate = {
            		longitude: markers[i].longitude,
            		latitude: markers[i].latitude
            	}
            }

            var frmt = {
            	region: action.data.region,
            	markers: markers
            }

            state = Object.assign({}, state, { data: frmt, loading:false });
            return state;
        default:
            return state;
    }
};

export default mapData;