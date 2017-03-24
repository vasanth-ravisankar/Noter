var React = require("react");

module.exports = React.createClass({

    openEditLightbox: function(info) {
      this.props.openEditLightbox(info)
    },
    openDeleteLightbox: function(info) {
      this.props.openDeleteLightbox(info)
    },
    render:function(){
      var props = this.props;
      var info = this.props.info;
      //console.log(info)
        return(
        <div className="col s4">
            <div className="card hoverable note-card">
                <div onClick={this.openEditLightbox.bind(this, info)} className="card-content">
                  <span className="card-title">
                    <b>{info.title}</b>
                  </span>

                  <p>
                    {info.text}
                  </p>
                </div>
                <div className="card-action">
                  <div className="note-actions">
                    <a href="#" onClick={this.openEditLightbox.bind(this, info)} className="">
                      <i className="material-icons">edit</i>
                    </a>
                    <a href="#" onClick={this.openDeleteLightbox.bind(this, info)} className="">
                      <i className="material-icons">delete</i>
                    </a>
                    <a href="#" className="">
                      <i className="material-icons">bookmark_border</i>
                    </a>
                </div>
              </div>
            </div>
        </div>
        )
    }
})
