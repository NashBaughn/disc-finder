import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "../components";
import * as Actions from '../actions';

const mapStateToProps = (state, props) => ({
	loading: state.mapData.loading,
  data: state.mapData.data
});

const mapDispatchToProps = function (dispatch) {
   return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
