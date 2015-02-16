var React = require('react');

var ItemButton = React.createClass({
  render: function() {
    var classNames = 'item-button ';
    var price = '$'+(this.props.item.price_in_cents / 100.0);
    var nameStyle = {
      color: this.props.item.colour
    }

    return (
      <div className={classNames} onClick={this.props.handleClick}>
        <img src={"/assets/menu_items/" + this.props.item.image_name} />
        <div className="item-detail">
          <span className="item-name" style={nameStyle}>
            {this.props.item.name}
          </span>
        </div>
      </div>);
  }
});

module.exports = ItemButton;
