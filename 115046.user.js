// ==UserScript==
// @name           Virtonomica: Shop Warehouse
// @namespace      virtonomica
// @version        0.61
// @include        http://*virtonomic*.*/*/main/unit/view/*/sale*
// ==/UserScript==
var run = function() 
{
   	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

	//console.log("start");

	function getFromStorage(obj, id_shop, id_item){
		if (obj[id_shop] == null) return '';
		if (obj[id_shop][id_item] == null) return '';
		return obj[id_shop][id_item];
	}

//----------------------------------------------------
// Данные из локального хранилища

// Закупочная цена в магазинах
shop_transport = JSON.parse( window.localStorage.getItem('shop_transport') );
if ( shop_transport == null ) shop_transport = new Object();

//Цена пролади в магазинах
shop_price = JSON.parse( window.localStorage.getItem('shop_price') );
if ( shop_price == null ) shop_price = new Object();

// Дата обнолвения данных по ценам в магазинах
shop_time = JSON.parse( window.localStorage.getItem('shop_time') );
if ( shop_time == null ) shop_time = new Object();
//----------------------------------------------------

// Текущая дата
d = new Date();
today = d.getFullYear() + "." + d.getMonth() + "." +  d.getDate();


function add_info()
{
	var table = $("#consumerListDiv");
	//console.log(table.length);
	if (table.length == 0) return;
	
	var a_shop = $("a[href*='main/unit/view']", table);
	//console.log(a_shop.length);
	if (a_shop.length == 0) return;
	//var img1 = $("img.selectedImage");
	//console.log("Selected = " + img1.length);

	var tr_r = $("tr[id*='row[']", table);
	//console.log("ROW = " + tr_r.length);
	if (tr_r.length == 0 ) return;

	var str = tr_r.eq(0).attr('id');
	//console.log("ITEM = " + str );
 	//var img = $("img.selectedImage").eq(0).parent();
	//var id_item = /sale\/product\/(\d+)/.exec(img.attr('href'))[0];
	id_item = /(\d+)/.exec( str )[0];
	//console.log("ITEM = " + id_item );

	var th = $("th", table);
	//console.log("th = " + th.length);
	if (th.length > 0) {
		th.eq(4).after("<th><span title='Цена продажи в магазине'>Цена продажи</span><hr><span title='разница между ценой продажи и закупочной ценой'>прибыль</span>");
	}
	
	for(i=0; i< a_shop.length; i+=2){
		var shop = a_shop.eq(i+1);

		var id_shop = /(\d+)/.exec(shop.attr('href'))[0];
		//console.log(id_shop);

		var color = "";
		var saveday = new Date();
		//var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
		if (shop_time[id_shop] != null){
			if ( today != shop_time[id_shop]) {
				color= "";
				var res = /(\d+)\.(\d+)\.(\d+)/.exec( shop_time[id_shop] );
				year = res[1];
				month = res[2];
				day = res[3];
				if ( (year != null) && (month != null) && (day != null) ){
					saveday.setFullYear(year,month,day);
					var delta = Math.floor( (d.getTime() - saveday.getTime() )/1000/60/60/24);
					if (delta >2) {
						if (delta < 6) {
							color = "gray"; 
						} else if (delta <12) {
							color = "darkkhaki"; 
						} else if (delta <21) {
							color = "orange"; 
						} else if (delta <28) {
							color = "purple"; 
						} else if (delta <35) {
							color = "maroon"; 
						} else {
							color = "red"; 						
						}
					}
				}
	
			}
		}
	
		out = "&nbsp;";
		if (shop_price[id_shop] != null){
			if (shop_price[id_shop][id_item] != null){
				out += "<span title='" + saveday.toLocaleDateString() + "'>";
				if (color != "") {
					out += "<font color=" + color + ">";
				}
				out += shop_price[id_shop][id_item];
				if (color != "") {
					out += "</font>";
				}
				out += "</span>";
				//console.log("shop =  " + id_shop);
				//console.log("price =  " + shop_price[id_shop][id_item]);

				if (shop_transport[id_shop] != null){
					if (shop_transport[id_shop][id_item] != null){
						del = shop_price[id_shop][id_item] - shop_transport[id_shop][id_item];
						if (del >0) color = "green";
						else color = "red";
						del = Math.round(del*100)/100;
						out += "<br><font color=" + color + ">" + del + "</font>" ;
					}
				}

			}
		}	
		
		shop.parent().after("<td> " + out);
	}

	// модифицирем стрелки вврех и вниз, что бы сохранить науш информацию
	var link = $("a[onclick*='return changeContractPosition']");
	link.click(function(){
		add_info();
	});

	// модифицирем перескоки сразу на заданную позиицю, что бы сохранить науш информацию
	var link2 = $("img[id*='posistionsave']");
	link2.click(function(){
		add_info();
	});

	// заменяем ссылки на магазины ссыдками на торговые залы магазинов
	// http://virtonomica.ru/vera/main/unit/view/4135337
	// http://virtonomica.ru/vera/main/unit/view/4135337/trading_hall
	var shop_link = $("a[onclick='return doWindow(this.href)']");
	console.log(shop_link.length);
	for(i=0; i< shop_link.length; i++){
		var alink = shop_link.eq(i);
		console.log(alink.attr('href'));
		alink.attr('href', alink.attr('href')+ '/trading_hall' );
	}
}

add_info();

}

if (window.top == window) {
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
}