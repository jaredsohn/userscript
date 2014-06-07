// ==UserScript==
// @name           Monopoly City Street TOOLS custom
// @namespace      http://mcsclans.com/
// @description    Monopoly City Street TOOLS custom
// @include        http://www.monopolycitystreets.com/*
// @include        http://monopolycitystreets.com/*
// @version        0.3
// ==/UserScript==

var isGM = (typeof(GM_xmlhttpRequest) != 'undefined');

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

if (isGM) {
	// irr
	GM_addStyle(".build p.irr { color: #FF0000; font-size:1em; font-weight:700; margin:0; padding:0; text-align:center; }");
	// filter / order
	GM_addStyle(".mcs-buy-filter { float: left; margin-left: 15px; }");
	GM_addStyle(".mcs-buy-order { float: left; margin-left: 15px; }");
	GM_addStyle(".mcs-buy-none { clear: both; margin: 25px 15px 0 15px; }");
}

function embedFunction(script)
{
	var content = document.createElement('script');
	content.innerHTML = script.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	document.body.appendChild(content)
}

/*
 * Calculate buildings
 */
function buildingCalc()
{ 
	$('ol.clearfix').find('li').find('p.price').each(function() {
		var price = $(this).text().replace(/[^0-9]/ig, '').trim();
		var effect = $(this).next().text().replace(/[^0-9]/ig, '').trim();
		$(this).parent('li').append('<p class="irr">' + (price / effect).toFixed(2) + " Days" + '</p>');
	});
}

/*
* Filter streets
*/
	function FindFree(dlg){
		dlg.find("table tr:not([class *= 'free'])").hide();
		dlg.find("table tr[class *= 'free']").show();
		$(this).trigger('LISTCHECK');
		return false;		
	}		
	
	function OrderByCost(dlg) {
		// Always show the most expensive streets first
		// i.e. 'desc' order
		var orderasc = false;
		var $table = dlg.find('table');
		var rows = dlg.find('table').find('tbody > tr').get()
		$.each(rows, function(index, row) {
			row.sortKey = parseInt($(row).children('td').text().replace(/[^0-9]/ig, '').trim());
		})
		rows.sort(function(a, b) {
			var ret = (a.sortKey > b.sortKey) ? 1 : 0;
			return orderasc ? ret : !ret;
		})
		$.each(rows, function(index, row) {
			$table.children('tbody').append(row);
			row.sortKey = null;
		})
		$(this).trigger('LISTCHECK');
		return false;
	}
	
	function FilterStreets(dlg)
	{
	FindFree(dlg);
	OrderByCost(dlg);
	}
	
	
	function showBuy(dlg)
{

	var content = '<span class="mcs-buy-filter">Filter: <a href="#" class="filter-all">All  </a></span>  <span class="mcs-buy-order">Sort: <a href="#" class="sort-value"><span class="unit">M<i></i></span></a> </span><p class="mcs-buy-none" style="display: none;"></p>';
	
	// content beszurasa
	if (dlg.text().indexOf('Filter:') == -1) {
		dlg.prepend(content);
	}
	// ha kinn maradna
	dlg.find('.mcs-buy-none').hide();

	function NoFilter(dlg) {
		var length = dlg.find('table tr:visible').length;
		if (!length) {
			sendMessage('.mcs-buy-none', 'Items not found', 3000);
		} else {
			dlg.find('.mcs-buy-none').hide();
			dlg.find('table tr').removeClass("first").removeClass("last");
			dlg.find('table tr:visible:first').addClass("first");
			dlg.find('table tr:visible:last').addClass("last");
		}
	}
	
	dlg.find('a').bind('LISTCHECK', function() { NoFilter(dlg);});
	
	// filter: all, free
	dlg.find('a.filter-all').live("click", function () {
		dlg.find('table tr').show();
		$(this).trigger('LISTCHECK');
		return false;
	});

	//dlg.find('a.filter-free').live("click", FindFree);

	// order by $ when M is clicked
	dlg.find('a.sort-value').live("click", function() { FilterStreets(dlg);});
}

function prepare(type)
{
	switch (type) {
		// buy streets
		case 'buy':
		var dlg = $('div.dialog.buy').find('div.street-list');
			showBuy(dlg);
			break;
	}
}

function sendMessage(selector, message, timeout)
{
	$(selector).html(message).show('slow', function() { window.setTimeout("$('" + selector + "').hide('slow')", timeout); });
}

function registerFunctions()
{
	if ( typeof (MCS) == 'undefined' ) {
		window.setTimeout("registerFunctions()", 1000);
		return;
	}
	sendMessage("#startup", 'Hi Petite!', 3000);

	// Building set up
	MCS.BUILD.show_orig = MCS.BUILD.show
	MCS.BUILD.show_orig.prototype = MCS.BUILD.show.prototype
	MCS.BUILD.show = function (id, data) { window.setTimeout("buildingCalc()", 10); return MCS.BUILD.show_orig(id, data); }
	MCS.BUILD.show.prototype = function (id, data) { window.setTimeout("buildingCalc()", 10); return MCS.BUILD.show_orig(id, data); }

	// Streets set up
	MCS.TOOLTIP.show_orig = MCS.TOOLTIP.show
	MCS.TOOLTIP.show_orig.prototype = MCS.TOOLTIP.show.prototype
	MCS.TOOLTIP.show = function (type, dialog) {
		prepare(type);
		return MCS.TOOLTIP.show_orig(type, dialog); 
	}
	MCS.TOOLTIP.show.prototype = function (type, dialog) {
		prepare(type);
		return MCS.TOOLTIP.show_orig(type, dialog);
	}
}

embedFunction(registerFunctions);
embedFunction(buildingCalc);

var dlg = $('div.dialog.buy').find('div.street-list');
embedFunction(function() {showBuy(dlg);});
window.setTimeout(function() {  FilterStreets(dlg); }, 1000);

embedFunction(prepare);
embedFunction(sendMessage);

registerFunctions();
