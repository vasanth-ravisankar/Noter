var React = require("react");
var _ = require("lodash")

module.exports = React.createClass({
    whiteContentStyles: {
        position: 'fixed',
        top: '20%',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '500px',
        zIndex:'103'
    },

    blackOverlayStyles: {
        background: 'black',
        opacity: '.5',
        position: 'fixed',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        zIndex: '100'
    },

    closeTagStyles: {
        float: 'right',
        marginTop: '-25px',
        marginRight: '-25px',
        zIndex: '1000'
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({display: nextProps.display});
    },
    componentDidMount: function(){
        document.addEventListener("keydown", function (e) {
            if ( (this.props.display) && (e.keyCode === 27) ){
                this.props.close();
            }
        }.bind(this));
    },
    render: function(){
        var props = this.props;
        if(!_.isUndefined(props.width)) {
            this.whiteContentStyles['width'] = props.width;
        }
        if (props.display){
            return (
                <div>
                    <div style={this.blackOverlayStyles} onClick={this.props.close} />
                    <div style={this.whiteContentStyles} className="colorbox-animate">
                        { !props.hide_close ? <span className="close" onClick={props.close}>&times;</span> : '' }
                        {props.children}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
});
