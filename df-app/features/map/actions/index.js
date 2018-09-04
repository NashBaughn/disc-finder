export const DATA_AVAILABLE = 'DATA_AVAILABLE';

import { GetDiscsRoute } from '../../../constants/api-routes';

export function getData(){
	return (dispatch) => {
 
		//Make API Call
		//For this example, I will be using the sample data in the json file
		//delay the retrieval [Sample reasons only]
		asyncGetDiscs("dela").then((data) => { 
			dispatch({type: DATA_AVAILABLE, data:data});
		});
	
	};
}

export function asyncGetDiscs(course) {
	return fetch(GetDiscsRoute, {
	  method: 'POST',
	  headers: {
	    Accept: 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
			latitude: "params.latitude",
			longitude: "params.longitude",
			course: course	
	  }),
	}).then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
	});
}


