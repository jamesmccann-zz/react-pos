/** @jsx React.DOM */

var React = require('react');

var ITEMS = [
  { name: 'Flat White', price_in_cents: 450, colour: 'carrot' },
  { name: 'Long Black', price_in_cents: 300, colour: 'carrot' },
  { name: 'Machiatto', price_in_cents: 350, colour: 'carrot' },
  { name: 'Milkshake', price_in_cents: 850, colour: 'emerald' },
  { name: 'Milk', price_in_cents: 400, colour: 'emerald' },
  { name: 'Chicken', price_in_cents: 450, colour: 'sunflower' }
]

var ItemButton = React.createClass({
  render: function() {
    var classNames = 'item-button ' + this.props.colour;
    return (
      <div className={classNames} onClick={this.props.handleClick}>
        <span className="item-name">{this.props.name.toUpperCase()}</span>
      </div>);
  }
});

var Menu = React.createClass({
  handleItemClicked: function(index) {
    this.props.onItemSelected(this.props.items[index]);
  },
  render: function() {
    var t = this, itemButtons = [];
    this.props.items.forEach(function(item, index) {
      itemButtons.push(<ItemButton name={item.name} price={'$'+(item.price_in_cents / 100.0)}
                                   colour={item.colour} handleClick={t.handleItemClicked.bind(t, index)} />);
    });
    return (
      <div className="menu">
        {itemButtons}
      </div>
    );
  }
});

/**
 * @jsx React.DOM
 */

var SaleRow = React.createClass({
  render: function() {
    return (
      <div className="sale-row">
        <div className="name">{this.props.item.name}</div>
        <div>{'$'+(this.props.item.price_in_cents / 100.0)}</div>
      </div>
    );
  }
});

var Sale = React.createClass({
  render: function() {
    rows = [];
    this.props.items.forEach(function(item) {
      rows.push(<SaleRow item={item} />);
    });

    return (
      <div className={'sale'}>
        <div className={'sale-items'}>
          {rows}
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      selectedItems: []
    };
  },
  onItemSelected: function(item) {
    this.setState({selectedItems: this.state.selectedItems.concat(item)});
  },
  render: function() {
    return (
      <main id="app">
        <Menu items={ITEMS} onItemSelected={this.onItemSelected} />
        <Sale items={this.state.selectedItems} />
      </main>
    );
  }
});

document.addEventListener('DOMContentLoaded', function() {
  React.renderComponent(<App />, document.getElementById('react-app'));
});


