var React = require("react");
var _ = require("lodash")


module.exports = React.createClass({
    render: function () {
        var props = this.props;
        var className =  "modal-box";
        var width = _.isUndefined(props.width)?"auto":props.width;
        return (
            <div className={className} style={{'width': width}}>
              <PanelHeader>{props.header}</PanelHeader>
                <PanelContent>{this.props.children}</PanelContent>
            </div>
        );
    }
});

var PanelHeader = React.createClass({
    render: function(){
        return(
            <div className="modal-header">
                {this.props.children}
            </div>
        );
    }
});
var PanelContent = React.createClass({
    render: function(){
        return(
            <div className="modal-content">
                <p>{this.props.children}</p>
            </div>
        );
    }
});

var PanelFooter = React.createClass({
    render: function(){
        return(
            <div className="modal-footer">
                {this.props.children}
            </div>
        );
    }
});
