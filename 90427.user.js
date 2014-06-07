// ==UserScript==
// @name           Virtonomica: корректировка закупок в магах
// @description 
// @include        http://virtonomic*.*/*/main/unit/view/*/supply
// @include        http://igra.aup.ru/*/main/unit/view/*/supply
// ==/UserScript==

var run = function() {
  var div = $('td.title:first');
  if (div.length == 0) { return; }
  
  var button = $('<input type="button" value="Расчитать">');
  div.append('&nbsp;');
  div.append(button);
  div.append('&nbsp;');
  div.append('+<input id="js-prc" type="text" size="1" value="10">%');
  
  button.click(function() {
    var prc = parseInt($('#js-prc').val());

    $('tr.product_row').each(function() {
      var sale = parseInt($('td td:contains(Продано)', this).next().text().replace(' ', ''));
      var order = Math.round(sale + (sale * (prc/100)));
      var row = $(this);
      var rows = [row];
      
      while (row.next().hasClass('sub_row')) {
	row = row.next();
	rows.push(row);
      }
      
      for (var i = 0; i < rows.length; i++) {
	var free = parseInt($('table.noborder td:contains(Свободно)', rows[i]).next().text().replace(' ', ''));
	var inp = $('input:eq(1)', rows[i]);
	
	if (free >= order) {
	  inp.val(order);
	  return;
	}
      }
      
    });
  });
  
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.getElementsByTagName("head")[0].appendChild(script);
