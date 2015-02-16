/** @jsx React.DOM */

var React = require('react/addons'),
    _ = require('lodash')
    moment = require('moment'),
    Sale = require('./components/sale.jsx'),
    Menu = require('./components/menu.jsx');

var GST = 0.15;

var ITEMS = [
  { id: 1, name: 'Flat White', price_in_cents: 450, image_name: 'flat_white.png', colour: '#997252' },
  { id: 2, name: 'Long Black', price_in_cents: 300, image_name: 'long_black.png', colour: '#592F16' },
  { id: 3, name: 'Cappuccino', price_in_cents: 350, image_name: 'cappuccino.png', colour: '#855442' },
  { id: 4, name: 'Hot Chocolate', price_in_cents: 850, image_name: 'hot_chocolate.png', colour: '#8D6A59'},
  { id: 5, name: 'Fruit Muesli', price_in_cents: 400, image_name: 'fruit_muesli.png', colour: '#FC7E56'},
  { id: 6, name: 'Berry Delight', price_in_cents: 450, image_name: 'berry_delight.png', colour: '#E82523'},
  { id: 7, name: 'Eggs on Sourdough', price_in_cents: 450, image_name: 'eggs_on_sourdough.png', colour: '#EB8412'},
  { id: 8, name: 'Pancake Stack', price_in_cents: 450, image_name: 'pancake_stack.png', colour: '#B0660A'},
  { id: 9, name: 'Vege Salad', price_in_cents: 450, image_name: 'vege_salad.png', colour: '#C45FA8'}
]

var App = React.createClass({
  getInitialState: function() {
    return {
      selectedItems: []
    };
  },
  addItem: function(item) {
    var saleItem = _.cloneDeep(item);
    _.assign(saleItem, { timestamp: moment() });
    this.setState({selectedItems: this.state.selectedItems.concat(saleItem)});
  },
  removeItem: function(item) {
    this.setState({
      selectedItems: _.pull(this.state.selectedItems, item)
    });
  },
  removeItems: function() {
    this.setState({
      selectedItems: []
    });
  },
  render: function() {
    return (
      <main id="app">
        <Menu items={ITEMS} onAddItemSelected={this.addItem} />
        <Sale items={this.state.selectedItems}
              onAddItemSelected={this.addItem}
              onRemoveItemSelected={this.removeItem}
              onVoidSalePressed={this.removeItems} />
      </main>
    );
  }
});

document.addEventListener('DOMContentLoaded', function() {
  React.render(<App />, document.getElementById('app-container'));
});


