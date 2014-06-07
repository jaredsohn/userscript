// ==UserScript==
// @name           Chase Running Total
// @namespace      http://userscripts.org/users/125576
// @description    Adds a running total column to the Chase Account Activity page
// @include        https://cards.chase.com/Account/AccountActivity.aspx*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.2.6.pack.js
// ==/UserScript==

$(function() {
  var grid   = $('table#ActivityGrid');
  var rows   = grid.find('tr');
  var header = grid.find('tr.tanHeader');
  var total  = parseCurrency(
    $('#LastBal').html()
  );
  
  header.find('td:last').css({
    padding: '0 7px'
  });
  
  header.append(
    '<td align="right" style="padding: 0 7px">Total</td>'
  );
    
  $.each(rows.get().reverse(), function() {
    var tr    = $(this);
    var td    = tr.find('td:last');
    var value = parseCurrency(td.html());
    
    if (!isNaN(value)) {
      if(value < 0) {
        td.css({color: '#060'});
      } else {
        td.css({color: '#600'});
      }
      
      total += value;
      
      tr.find('td:last').css({
        padding: '0 7px'
      });
      
      tr.append(
        '<td align="right" style="color:#333; border-color: #ddd; border-left:1px dotted #ddd; background:#f7f7f7; padding:0 7px">$' +
          (total / 100).formatMoney(2, '.', ',') +
        '</td>'
      );
    }
  });
});

function parseCurrency(string) {
  return parseInt(
    string.replace(/\.|\$|\,/g,'')
  )
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/number/fmt-money [v1.1]

Number.prototype.formatMoney = function(c, d, t){
	var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};