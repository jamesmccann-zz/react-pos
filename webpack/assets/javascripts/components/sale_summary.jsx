var React = require('react'),
    _ = require('lodash');

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

module.exports = SaleSummary;
