var React = require('react/addons'),
    _ = require('lodash'),
    SaleSummary = require('./sale_summary.jsx'),
    SaleRow = require('./sale_row.jsx')
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Sale = React.createClass({
  render: function() {
    rows = [];
    _.values(_.groupBy(this.props.items, 'id')).forEach(function(items, index) {
      rows.push(<SaleRow items={items}
                         key={'sale-row-' + index}
                         onAddItemSelected={this.props.onAddItemSelected}
                         onRemoveItemSelected={this.props.onRemoveItemSelected} />
      );
    }.bind(this));

    return (
      <div className="sale">
        <div className="sale-header"></div>
        <div className="sale-items">
          <ReactCSSTransitionGroup transitionName="sale-row">
            {rows}
          </ReactCSSTransitionGroup>
        </div>
        <SaleSummary items={this.props.items}/>
        <div className="sale-controls">
          <div className="sale-btn btn danger" onClick={this.props.onVoidSalePressed}>VOID</div>
          <div className="sale-btn btn default">DISCOUNT</div>
          <div className="sale-btn btn default">NOTES</div>
          <div className="sale-btn btn success">PAY</div>
        </div>
      </div>
    );
  }
});

module.exports = Sale;
