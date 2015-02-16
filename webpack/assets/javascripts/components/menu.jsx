var React = require('react'),
    ItemButton = require('./item_button.jsx');

var Menu = React.createClass({
  handleItemClicked: function(index) {
    this.props.onAddItemSelected(this.props.items[index]);
  },
  render: function() {
    var itemButtons = [];
    this.props.items.forEach(function(item, index) {
      itemButtons.push(<ItemButton key={'item-button-' + index} item={item} handleClick={this.handleItemClicked.bind(this, index)} />);
    }.bind(this));
    return (
      <div className="menu">
        {itemButtons}
      </div>
    );
  }
});

module.exports = Menu;
