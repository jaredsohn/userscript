// ==UserScript==
// @name           Virtonomica: Unit List v2.0
// @namespace      virtonomica
// @version        1.2
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
			$(this).append("<a href="+href+"supply><img width=16 height=16 alt='Supply' src='/img/unit_types/warehouse.gif'/><a href="+href1+ " onclick='return doWindow(this, 800, 500);'><img width=16 height=16 alt='Tech' src='/img/icon/invention.gif'/>");
		}
		else {
			if ( href.search("trading_hall") != -1 ) {
				href = href.replace("trading_hall","supply");
				$(this).append("<a href="+href+ "><img width=16 height=16 alt='Supply' src='/img/unit_types/warehouse.gif'/>");
			}
			else {
				if ( href.search("investigation") != -1 ) {
					href = href.replace("main","window");
					href = href.replace("investigation","project_create");
					$(this).append("<a href="+href+ " onclick='return doWindow(this, 800, 320);'><b>New!</b>");
				}
				else {
					href = href.replace("main/unit/view","window/unit/changename");
					$(this).append("<a href="+href+ " onclick='return doWindow(this, 800, 320);'><img width=16 height=16 alt='Change name' src='/img/units/edit.gif'/>");
				}
			}
		}
	});
	
}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);