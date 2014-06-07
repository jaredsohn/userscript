// ==UserScript==
// @name           Virtonomica: корректировка закупок в магах v2.1 Baranki
// @description 
// @include        http://virtonomic*.*/*/main/unit/view/*/supply
// @include        http://igra.aup.ru/*/main/unit/view/*/supply

// ==/UserScript==

var run = function() {


  var div = $('td.title:first');
  if (div.length == 0) { return; }
  
  var button = $('<input type="button" value="Рассчитать">');

  div.append('&nbsp;');
  div.append(button);
  div.append('&nbsp;');
  div.append($('<input type="submit" name="applyChanges" value="Изменить">'));
  div.append('&nbsp;');
  div.append(' на <input id="js-prc" type="text" size="1" value="3">дня.');
  div.append('&nbsp;');
  div.append('Запас не менее <input id="js-prc2" type="text" size="5" value="10000">');
  


  
  function myClick() {
    var prc = parseInt($('#js-prc').val())+1;
    var prc2 = parseInt($('#js-prc2').val());

    $('tr.product_row').each(function() {
      var sale = parseInt($('td td:contains(Продано)', this).next().text().replace(' ', '').replace(' ', ''));
      var amount = parseInt($('td td:contains(Количество)', this).next().text().replace(' ', '').replace(' ', ''));
      var order = Math.round((sale * prc)-amount);
      var row = $(this);
      var rows = [row];
      
      while (row.next().hasClass('sub_row')) {
	row = row.next();
	rows.push(row);
      }
      
      for (var i = 0; i < rows.length; i++) {
	var free = parseInt($('table.noborder td:contains(Свободно)', rows[i]).next().text().replace(' ', '').replace(' ', ''));
	var inp = $('input:eq(1)', rows[i]);
	
	if (((amount<prc2)&&(order<prc2)) || ((amount==prc2)&&(sale==0))) {order=prc2;}
	if (order<0){order=0;}
//	if (free <= order) {order=free;}

	  inp.val(order);
	  return;
      }
      
    });
  }
  myClick();
  button.click(myClick);


}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.getElementsByTagName("head")[0].appendChild(script);