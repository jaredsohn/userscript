// ==UserScript==
// @name           Blinksale Summary
// @description    Adds up the totals for a summary glance figure
// @match http://*.blinksale.com/*
// @match https://*.blinksale.com/*
// ==/UserScript==

var dashboard = document.querySelector('body.dashboard');

if (dashboard) (function () {
  // from: http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
function toMoney(n, decimals, decimal_sep, thousands_sep) { 
   var c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
   d = decimal_sep || ',', //if no decimal separetor is passed we use the comma as default decimal separator (we MUST use a decimal separator)

   /*
   according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
   the fastest way to check for not defined parameter is to use typeof value === 'undefined' 
   rather than doing value === undefined.
   */   
   t = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep, //if you don't want ot use a thousands separator you can pass empty string as thousands_sep value

   sign = (n < 0) ? '-' : '',

   //extracting the absolute value of the integer part of the number and converting to string
   i = parseInt(n = Math.abs(n).toFixed(c), 10) + '', 

   j = ((j = i.length) > 3) ? j % 3 : 0; 
   return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ''); 
};

function each(context, selector, fn) {
  if (typeof selector == 'function') {
    fn = selector;
    selector = context;
    context = document;
  }

  [].forEach.call(context.querySelectorAll(selector), fn);
}

var overallTotal = 0;

each('div.invoiceTableBox tbody', function (table) {
  var total = 0;

  each(table, '.amount', function (el) {
    total += parseFloat(el.innerText.replace(/[^0-9\.]/g, ''));
  });

  overallTotal += total;

  var row = document.createElement('tr');
  row.innerHTML = '<td style="background:#fff!important;border-bottom:0" colspan="3"></td><td><strong>Subtotal</strong></td><td class="amount"><strong>£' + toMoney(total, 2, '.', ',') + '</strong></td>';
  table.appendChild(row);
});

})();