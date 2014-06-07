// ==UserScript==
// @name           virtonomica:Продажа технологий
// @namespace      virtonomica
// @namespace      virtonomica
// @description    Выставление цены технологий под тендеры
// @description    без учета своей цены :)
// @description    работает адекватно, если много предложений выставлено
// @version        1.21
// @include        http://igra.aup.ru/*/window/management_action/*/investigations/technology_offer_create/*/*
// @include        http://*virtonomic*.*/*/window/management_action/*/investigations/technology_offer_create/*/*
// ==/UserScript==

var run = function() {

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;
	var n = 0;

	var my_salary = new Number($("#salary").val());
	var my_salary_0 = my_salary; 


  var container = $('div.headerSeparator');

  var input_100 = $('<button id=b100>моя текущая цена</button>').click(function() {
	var el = 	$("td:contains('Ваше текущее предложение')").eq(1);
	el = $(el).next().next();

	//alert( el.html() );
	var prize = /([\D]+)*([\d\s]+\.*\d*)/.exec( $(el).text()  )[2].replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
	//alert("prize = [" + prize + "]");

	$("input[name='price']").attr('value',  Math.round(prize) );

  });

  str = "<table><tr>";
  for (i=80; i<=93; i++){
	if( i==87) str+= "<tr>";
	str += "<td><button id=bt_" + i + " key=" + i+ ">"+ i + "%</button>";
  }
  str+= "</table>";
  container.before(str);
  container.append(input_100);

	var el = 	$("td:contains('Рыночная стоимость технологии')").eq(1);
	el = $(el).next().next();

	var prize = /([\D]+)*([\d\s]+\.*\d*)/.exec( $(el).text()  )[2].replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");

  $("button[id^='bt_']").click( function() {
	key = $(this).attr("key");

	$("input[name='price']").attr('value',  Math.round(prize * key/100) );

  });

	// контрольная подсветка свой цены
	el = $("td:contains('новая цена')");
	//alert(el.length );
	if (el.length == 0) {
		// контрольная подсветка свой цены
		el = $("td:contains('Ваше текущее предложение')").next().next();
		//console.log( el.html() ); 
		my = parseInt( el.text().replace('$','').replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ','') );
		console.log( my ); 
	} else {
		str  = el.eq(1).text();

		pos1 = str.indexOf('новая цена');
		pos2 = str.indexOf('$', pos1 + 11);
		my = parseInt( str.substring( pos1+11, pos2).replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ','') );

		el = el.eq(1);
	}
	console.log("prize = " + prize);
	var color = "";	
	if ( (my < prize/2) || (my > prize*2) ){
		color = "red";
	} else {
		if ( (my < prize*0.8) || (my > prize) ){
			color = "Peru";
		}
	}

	if (color != ""){
		el.html( " <font color=" + color +"><b> " + el.html() +"</b></font>");
	}

}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} 