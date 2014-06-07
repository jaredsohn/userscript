// ==UserScript==
// @name             EBITDA [GW]
// @namespace        GW
// @description      EBITDA of real estate
// @include          http://*ganjawars.ru/object.php*
// @version          1.0
// @author           VSOP_juDGe
// ==/UserScript==

(function() {
	
	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	var doc = root.document;
	
	var t = doc.getElementsByTagName('table');
	
	var c = doc.getElementsByTagName('center');
	if(c[0].innerHTML.indexOf('Прибыль') >= 0) // anti-Safari из-за глючного onload
		return;
	
	// зарплата
	var t_main = t[6];
	
	var salary = /Премия за работу:.*\<b\>\$([0-9]*)\<\/b\>/i.exec(t_main.innerHTML);
	salary = new Number(salary[1]);
	
	var square = /Площадь:.*\<b\>([0-9]*)\<\/b\>/i.exec(t_main.innerHTML);
	square = new Number(square[1]);
	
	// Продукция
	var t_out = t[10];
	var tr = t_out.rows[1];
	var td = tr.cells[1];
	
	var out = new Number(td.innerHTML);
	var out_price = /\$([0-9]*)/.exec(tr.cells[4].innerHTML);
	out_price = new Number(out_price[1]);
	
	
	// Ресурсы
	var t_in = t[12];
	var tr = t_in.rows[1];
	var td = tr.cells[1];
	var hours = new Number(td.innerHTML);
	
	var a_in = new Array();
	var a_in_price = new Array();
	
	for (var i = 3, l = t_in.rows.length; i < l; i++) 
	{
		tr = t_in.rows[i];
		td = tr.cells[1];
		a_in.push(new Number(td.innerHTML));
		a_in_price.push(new Number(/\$([0-9]*)/.exec(tr.cells[4].innerHTML)[1]));
	}
	
	var income = out * out_price - salary * hours;
	
	for (var i = 0, l = a_in.length; i < l; i++) 
		income -= a_in[i] * a_in_price[i];

	income = Math.round(income);
	income_all = income*square;
	
	var c_new = doc.createElement('center');
	c_new.innerHTML = '<b> Прибыль: с единицы <font color = "red">$' + (Math.round((income / out)*100) / 100).toFixed(2) + '</font>, с клетки в час <font color = "red">$' + 
										Math.round(income / hours) + '</font>, всего в час <font color = "red">$' + Math.round(income*square / hours) + '</font></b><hr>'; 
	c[0].parentNode.insertBefore(c_new, c[0]);
	
})();