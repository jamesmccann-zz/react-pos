/** @jsx React.DOM */

var React = require('react/addons'),
    _ = require('lodash')
    moment = require('moment'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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

var SaleSummary = React.createClass({
  render: function() {
    var total = _.reduce(this.props.items, function(sum, item) {
      return sum += item.price_in_cents;
    }, 0);
    var gst = total * 3 / 23;
    var subtotal = total - gst;

    return (
      <div className="sale-summary">
        <table className="summary-table">
          <tr>
            <td>Sub-total</td>
            <td className="right subtotal">{'$'+(subtotal / 100).toFixed(2)}</td>
          </tr>
          <tr className="divider">
            <td>GST</td>
            <td className="right gst">{'$'+(gst / 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>TOTAL TO PAY</td>
            <td className="right total">{'$'+(total / 100).toFixed(2)}</td>
          </tr>
        </table>
      </div>
    );
  }
});

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
    }, function(){
      this.forceUpdate();
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


