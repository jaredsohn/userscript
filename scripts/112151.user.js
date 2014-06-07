// ==UserScript==
// @name           Glitch Sorted Realty
// @namespace      http://beta.glitch.com/profiles/PIF6RN35T3D1DT2/
// @include        http://www.glitch.com/realty/*
// @match          http://www.glitch.com/realty/*
// @description    Realty pages enhancements. Version 0.1
// @require        http://updater.usotools.co.cc/112151.js
// ==/UserScript==

(function() {

function main() {
	var _properties;
	var _propertiesAsc;
	var _propertiesDesc;
	var _realtyParentDiv;
	
	function sortPrice(a, b, isAscending) {
		var x = $(a);
		var y = $(b);
		if (parseInt(x.find('span.price em').text().replace(',','')) > parseInt(y.find('span.price em').text().replace(',',''))) {
			if (isAscending) { return 1; } 
			return -1;
		}
		if (parseInt(x.find('span.price em').text().replace(',','')) < parseInt(y.find('span.price em').text().replace(',',''))) {
			if (isAscending) { return -1; } 
			return 1;
		}
		return 0;
	}
	function sortAscendingPrice(a, b) { return sortPrice(a, b, true); }
	function sortDescendingPrice(a, b) { return sortPrice(a, b, false); }
	
	function sortRealty(props, ascending) {
		if (ascending) { 
			if (!_propertiesAsc) {
				_propertiesAsc = $(_properties).sort(sortAscendingPrice);
			}
			_propertiesAsc.appendTo(_realtyParentDiv.empty());
		} else { 
			if (!_propertiesDesc) {
				_propertiesDesc= $(_properties).sort(sortDescendingPrice);
			}
			_propertiesDesc.appendTo(_realtyParentDiv.empty());
		}
	}
	
	function sortOptions(a, b) {
		if (a > b) { return 1; }
		return -1;
	}
	
	function formatCurrants(w) {
		w = w + '';
		var MOD = 3;
		var m = w.length%MOD;
		var w2 = '';
		for (i = 1; i <= ((w.length-m)/MOD); i++) {
			w2 = (w.substring(w.length-i*MOD, MOD+w.length-i*MOD)) + (i == 1 ? '':',') + w2;
		}
		if (m > 0) { w2 = w.substring(0,m) + ',' + w2; }
		return w2; 
	}

	function filterPrice(e) {
		markCurrentNav(e.target);
		var priceSelected = formatCurrants($(e.target).attr('price'));
		_realtyParentDiv.empty();
		$.each(_properties, function(i, e) { 
			e = $(e);
			if (e.find("em:contains('" + priceSelected + "')").length > 0) {
				e.appendTo(_realtyParentDiv);
			}
		});
	}
	
	function markCurrentNav(link) {
		$('li.navRealty a.selected').removeClass('selected');
		$(link).addClass('selected');
	}
	$(document).ready(function() {
		if (!$('a.realty:first')) { return;	}
		$('a.realty:first').parent().before('<ul id="priceMenu"></ul>');
		
		_realtyParentDiv = $('a.realty:first').parent();
		_properties = $('a.realty');
		
		// Hook up navigation for prices
		var p = [];
		$('a.realty span.price em').each(function(i, e) {
			var price = parseInt($(e).text().replace(',',''));
			if ($.inArray(price, p) < 0) { p.push(price); }
		});
		var priceOptions = $(p).sort(sortOptions);
		var priceMenu = $('#priceMenu');
		priceMenu.append('<li class="navRealty"><b>Prices</b></li>');
		$.each(priceOptions, function(i, e) {
			priceMenu.append('<li class="filterPrice navRealty"><a title="Show houses priced at ' + formatCurrants(e) + '&#8353;" price="' + e + '" href="javascript: void(0);">' + formatCurrants(e) + '</a></li>');
		});
		$('#priceMenu li.filterPrice a').click(filterPrice);
		
		priceMenu.append('<li class="navRealty"><a title="Show all in ascending order" id="linkAscending" href="javascript: void(0);">Ascending</a></li>');
		priceMenu.append('<li class="navRealty navLast"><a title="Show all in descending order" id="linkDescending" href="javascript: void(0);">Descending</a></li>');
		$('#linkAscending').click(function(e) { markCurrentNav(e.target); sortRealty(_properties, true); });
		$('#linkDescending').click(function(e) { markCurrentNav(e.target); sortRealty(_properties, false); });
		
	});	// $(document).ready(function() {
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);

var style = document.createElement('style');
style.innerHTML = ''
	+ ' #priceMenu		{ margin-bottom: 65px; background: red; display: block; width: 100%; } '
	+ ' li.navRealty	{ float: left; margin-bottom: 5px; display: inline; padding: 2px 5px 2px 5px; border-right: solid 1px grey; } '
	+ ' li.navLast		{ border-right: none !important; } '
	+ ' li.navRealty a.selected	{ border-bottom: dotted 1px #aaaaaa;  } '
	;
document.head.appendChild(style);

})();