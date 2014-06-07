// ==UserScript==
// @name           Virtonimica:FactoryInfo
// @namespace      virtonomica
// @description     Оценка вклада в качество и цену комплектующих
// @version        1.0
// @include        http://*virtonomic*.*/*/main/unit/view/*/manufacture
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    function numberFormat (number) {
        number += '';
        var parts = number.split('.');
        var int = parts[0];
        var dec = parts.length > 1 ? '.' + parts[1] : '';
        var regexp = /(\d+)(\d{3}(\s|$))/;
        while (regexp.test(int)) {
            int = int.replace(regexp, '$1 $2');
        }
        return int + dec;
    }

	var el = $("table.list:eq(1)");

	var tr = $("tr", el);
	var col = new Array();
	var qv= new Array();
	var money= new Array();
	mm = 0
	cc = 0
	for (i = 2; i< tr.length; i++){
		td = $("td", tr.eq(i) );

		// требуется
		col[i-2] = td.eq(3).text().replace(" ", "").replace(" ", "").replace(" ", "");
		
		// качество
		qv[i-2] = td.eq(7).text(); 
		if (qv[i-2]=="---") qv[i-2] = 0;

		// себестоимость
		money[i-2] = td.eq(8).text().replace("$", "").replace(" ", "").replace(" ", "").replace(" ", ""); 
		if (money[i-2]=="---") money[i-2] = 0;
		//alert(i + ". = "+ td.length);
		mm+= col[i-2] * money[i-2];
		cc+= col[i-2] * qv[i-2];
	}

	for(i=0; i< col.length; i++){
		td = $("td", tr.eq(i+2) );
		str = Math.round(1000*col[i]*money[i]/mm)/10 + "%" ;
		td.eq(8).append("<br><font color=grey>"+str + "</font>");

		str = Math.round(1000*col[i]*qv[i]/cc)/10 + "%" ;
		td.eq(7).append("<br><font color=grey>"+str + "</font>");

		str = numberFormat( Math.round(col[i]*money[i]) );
		td.eq(3).append("<br><font color=grey>"+str + "$</font>");
	}

	el = $("table.grid:eq(0)");
	tr = $("tr", el);
	for(i=1; i<tr.length; i++){
		td = $("td", tr.eq(i) );
		if (td.length < 5) continue;
		//alert(td.length);
		indx = 3;
		if (td.length == 21) {
			td2 = $("td", td.eq(indx));
		}else{
			indx = 2
		}
		td2 = $("td", td.eq(indx));

		out = td2.eq(1).text().replace(" ", "").replace(" ", "").replace(" ", "");
		if (out == "---") continue;
		if (out == "") continue;
		td.eq(indx).append("<br><font color=grey>Себестоиомость по сырью: "+ numberFormat( Math.round(100*mm/out)/100 ) + "$</font>");
	}


}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);