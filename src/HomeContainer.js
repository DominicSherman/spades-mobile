import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ActionCreators from './redux/action-creators';
import Home from './Home';

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
