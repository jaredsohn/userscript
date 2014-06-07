// ==UserScript==
// @name           Virtonomica: Unit List v2.1
// @namespace      virtonomica
// @version        2.1
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
		add_finance = false;
		add_consume = false;
		add_virtasement = false;
		add_sale = false;
		add_unit = false;
		switch (type) {

			// рыболовная база
			case "u-c i-fishingbase":
			add_produce = true;
			add_finance = true;
			add_sale = true;
			break;

			// лесопилка
			case "u-c i-sawmill":
			add_finance = true;
			add_sale = true;
			break;

			// шахта
			case "u-c i-mine":
			add_finance = true;
			add_sale = true;
			break;

			// Нефтевышка
			case "u-c i-oilpump":
			add_finance = true;
			add_sale = true;
			break;

			// магазин
			case "u-c i-shop":
			add_supply = true;
			add_finance = true;
			add_virtasement = true;
			break;

			// Медцентры
			case "u-c i-medicine":
			add_supply = true;
			add_consume = true;
			add_finance = true;
			add_virtasement = true;
			break;

			// мельницы
			case "u-c i-mill":
			add_supply = true;
			add_finance = true;
			add_sale = true;
			break;

			// Ресторан
			case "u-c i-restaurant":
			add_supply = true;
			add_consume = true;
			add_finance = true;
			add_virtasement = true;
			break;

			// Фитнес центр
			case "u-c i-fitness":
			add_finance = true;
			add_virtasement = true;
			break;

			// Парикмахерская
			case "u-c i-hairdressing":
			add_finance = true;
			add_virtasement = true;
			break;

			// Прачечная
			case "u-c i-laundry":
			add_finance = true;
			add_virtasement = true;
			break;
	
			// Фруктовая плантация
			case "u-c i-orchard":
			add_produce = true;
			add_finance = true;
			add_sale = true;
			break;

			//Заводы
			case "u-c i-workshop":
			add_supply = true;
			add_finance = true;
			add_sale = true;
			break;

			//Склад
			case "u-c i-warehouse":
			add_supply = true;
			add_sale = true;
			add_finance = true;
			break;

			// Животноводческая ферма
			case "u-c i-animalfarm":
			add_supply = true;
			add_finance = true;
			add_sale = true;
			break;

			// Офис
			case "u-c i-office":
			add_virtasement = true;
			add_finance = true;
			add_unit = true;
			break;
		}
		
		href = $("a", el.eq(i)).prop('href');
			console.log(href);
		if ( add_produce == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/manufacture>" + "<img width=16 height=16 alt='Производство' title='Производство' src=/img/icon/produce.gif></a> ");
		}
		if ( add_consume == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/consume>" + "<img width=16 height=16 alt='Расходники' title='Расходники' src=/img/icon/shopboard.gif></a> ");
		}
		if ( add_finance == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/finans_report>" + "<img width=16 height=16 alt='Фин. отчет' title='Фин. отчет'  src=/pub/artefact/olga/20232152.gif></a> ");
		}
		if ( add_supply == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/supply>" + "<img width=16 height=16 alt='Снабжение' title='Снабжение' src=/img/unit_types/warehouse.gif></a> ");
		}
		if ( add_sale == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/sale>" + "<img width=16 height=16 alt='Сбыт' title='Сбыт' src=/img/supplier_add.gif></a> ");
		}
		if ( add_unit == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/units>" + "<img width=16 height=16 alt='Подразделения' title='Подразделения'  src=/img/artefact/icons/color/production.gif></a> ");
			} 
		if ( add_virtasement == true ) {
			console.log(href);
			el.eq(i).next().append(" <a href=" + href +"/virtasement>" + "<img width=16 height=16 alt='Реклама' title='Реклама' src=/pub/artefact/olga/165738100406.gif></a> ");
			} 

	}
	
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}