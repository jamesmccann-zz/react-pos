var React = require('react'),
    _ = require('lodash');

var SaleRow = React.createClass({
  handleQuantitySubtractClicked: function() {
    this.props.onRemoveItemSelected(_.last(this.props.items));
  },
  handleQuantityAddClicked: function() {
    this.props.onAddItemSelected(_.last(this.props.items));
  },
  render: function() {
    var item = _.first(this.props.items);
    var quantity = this.props.items.length;

    return (
        <div className="sale-row">
          <div className="name">{item.name}</div>
          <div className="quantity-btns">
            <div className="quantity-btn quantity-btn-minus" onClick={this.handleQuantitySubtractClicked}></div>
            <div className="quantity">{quantity}</div>
            <div className="quantity-btn quantity-btn-plus" onClick={this.handleQuantityAddClicked}></div>
          </div>
          <div className="price">{'$'+(item.price_in_cents * quantity / 100.0).toFixed(2)}</div>
        </div>
    );
  }
});

module.exports = SaleRow;
