// ==UserScript==
// @name           Virtonomica: Unit List v2.0 SE
// @namespace      virtonomica
// @version        1.21
// @include        http://*virtonomic*.*/*/main/company/view/*/unit_list
// ==/UserScript==

var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

	var el = $("a[href*='main/unit/view']").parent().each( function() {
		href = $("a", this).attr('href');
		if ( href.search("manufacture") != -1 ) {
			href1 = href;
			href1 = href1.replace("main/unit/view","window/technology_market/ask/by_unit");
			href1 = href1.replace("manufacture","offer/set");
			href = href.replace("manufacture","");
//			$(this).append("<a href="+href+"supply><img width=16 height=16 alt='Supply' src='/img/unit_types/warehouse.gif'/><a href="+href1+ " onclick='return doWindow(this, 800, 500);'><img width=16 height=16 alt='Tech' src='/img/icon/invention.gif'/>");
		}
		else {
			if ( href.search("trading_hall") != -1 ) {
				href = href.replace("trading_hall","supply");
//				$(this).append("<a href="+href+ "><img width=16 height=16 alt='Supply' src='/img/unit_types/warehouse.gif'/>");
			}
			else {
				if ( href.search("investigation") != -1 ) {
					href = href.replace("main","window");
					href = href.replace("investigation","project_create");
//					$(this).append("<a href="+href+ " onclick='return doWindow(this, 800, 320);'><b>New!</b>");
				}
				else {
					href1 = href.replace("main/unit/view","window/unit/changename");
					href2 = href.replace("main/unit/view","window/unit/market/sale");
					href3 = href.replace("main/unit/view","window/unit/close");
//					$(this).append("<a href="+href1+ " onclick='return doWindow(this, 800, 320);'><img width=16 height=16 alt='Change name' src='/img/units/edit.gif'/>");
					$(this).append("<a href="+href2+ " onclick='return doWindow(this, 650, 400);'><img width=16 height=16 alt='Sell' src='/img/common/coin_black.gif'/></a>");
					$(this).append("<a href="+href3+ " onclick='return doWindow(this, 800, 360);'><img width=16 height=16 alt='Close' src='/img/del.gif'/></a>");
				}
			}
		}
	});
	
}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);