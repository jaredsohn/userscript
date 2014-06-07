// ==UserScript==
// @name           Virtonomica: Unit List v2.0
// @namespace      virtonomica
// @version        2.0
// @include        http://*virtonomic*.*/*/main/company/view/*/unit_list
// ==/UserScript==

var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

	table = $("table.unit-top").next();
	el = $("td:has(a[href*='main/unit/view'])", table);
	for( i=0; i<el.length; i++){
		type =  el.eq(i).prop('class');
		add_produce = false;
		add_supply = false;
		add_consume = false;
		add_sale = false;
		switch (type) {
			// рыболовная база
			case "u-c i-fishingbase":
			add_produce = true;
			break;

			// магазин
			case "u-c i-shop":
			add_supply = true;
			break;

			// Медцентры
			case "u-c i-medicine":
			add_supply = true;
			add_consume = true;
			break;

			// мельницы
			case "u-c i-mill":
			add_supply = true;
			break;

			// Ресторан
			case "u-c i-restaurant":
			add_supply = true;
			add_consume = true;
			break;
	
			// Фруктовая плантация
			case "u-c i-orchard":
			add_produce = true;
			break;

			//Заводы
			case "u-c i-workshop":
			add_supply = true;
			break;

			//Склад
			case "u-c i-warehouse":
			add_supply = true;
			add_sale = true;
			break;

			// Животноводческая ферма
			case "u-c i-animalfarm":
			add_supply = true;
			break;
		}
		
		href = $("a", el.eq(i)).prop('href');
			console.log(href);
		if ( add_produce == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/manufacture>" + "<img width=16 height=16 alt='Производство' src=/img/icon/produce.gif></a> ");
		}
		if ( add_consume == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/consume>" + "<img width=16 height=16 alt='Расходники' src=/img/icon/shopboard.gif></a> ");
		}
		if ( add_supply == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/supply>" + "<img width=16 height=16 alt='Снабжение' src=/img/unit_types/warehouse.gif></a> ");
		}
		if ( add_sale == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/sale>" + "<img width=16 height=16 alt='Сбыт' src=/img/supplier_add.gif></a> ");
		}

		// если ссылка уже с иконкой, то не добавлять редактирвоание имени подразделения
		if ( $("img", el.eq(i)).length > 0 ) continue;
		href = href.replace("main/unit/view","window/unit/changename");
		el.eq(i).append("<a href="+href+ " onclick='return doWindow(this, 800, 320);'><img width=16 height=16 alt='Change name' src='/img/units/edit.gif'/>");

	}
	
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}