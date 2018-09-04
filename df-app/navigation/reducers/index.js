import ApplicationNavigator from "../AppNavigator";
//import { WELCOME } from "../screen_names";

let initialState = {
  index: 0,
  routes: []
};

const navigationData = (state, action) => {
  const nextState = ApplicationNavigator.router.getStateForAction(
    action,
    state
  );

  return nextState || state;
};

export default navigationData;