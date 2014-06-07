// ==UserScript==
// @name            YMaps simplifier
// @namespace       http://voloko.ru/
// @include         http://*maps.yandex.ru*
// @exclude         http://*maps.yandex.ru/search*.xml*
// @exclude         http://*maps.yandex.ru/metro*.xml*
// @description     Removes clutter
// @author          Volodya Kolesnikov voloko@gmail.com
// @version         1.0.7
// ==/UserScript==

(function() {

	function redrawPage() {
		function $(id) {return document.getElementById(id)};
	
		if (document.getElementsByClassName) {
			getElementsByClass = function(searchClass) {return document.getElementsByClassName(searchClass);};
		} else {
			getElementsByClass = function (searchClass) {
				var classElements = new Array();
				node = document;
				tag = '*';
				var els = node.getElementsByTagName(tag);
				var elsLen = els.length;
				var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
				for (i = 0, j = 0; i < elsLen; i++) {
					if ( pattern.test(els[i].className) ) {
						classElements[j] = els[i];
						j++;
					}
				}
				return classElements;
			}
		}
		
		var wnd = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
		
		function updateToolbar() {
			var form = getElementsByClass('baseform')[0];
			form.style.position = 'absolute';
			form.style.width = '200px';
			form.style.left = '300px';
			form.style.top = '2px';
			form.style.zIndex = 2000;
			form.style.fontSize = '0.8em';
			var searchInput = form.getElementsByTagName('input')[0];
			searchInput.style.width = '200px';
			form.getElementsByTagName('input')[1].style.display = 'none';
			searchInput.setAttribute('type', 'search');
			searchInput.setAttribute('placeholder', 'ÐŸÐ¾Ð¸ÑÐº');
			return form;
		}
		
		function updateAllCountries() {
			var countries = getElementsByClass('all')[0];
			countries.style.position = 'absolute';
			countries.style.left = '530px'; 
			countries.style.top  = '2px'; 
			countries.style.fontSize  = '0.7em'; 
			countries.style.zIndex = 2000;
			var allCountriesLink = countries.getElementsByTagName('a')[0];
			allCountries = document.createElement('span');
			allCountries.appendChild(document.createTextNode(allCountriesLink.innerHTML));
			//countries.insertBefore(allCountries, allCountriesLink);
			var arrow = $('head-menu-ctrl');
			arrow.style.zIndex = 1000;
			arrow.style.position = 'relative';
			arrow.style.top = '5px';
			return countries;
		}
		
		function addTraffic(parent) {
			if ($('selector-traffic')) {
				var link = ($('selector-traffic').className.indexOf('selected') == -1 ? $('selector-traffic') : $('selector-base')).getElementsByTagName('a')[0];
				parent.appendChild(link);
				parent.appendChild(document.createTextNode(' '));
			}
		}
	
		function addMetro(parent) {
			if ($('selector-metro')) {
				parent.appendChild($('selector-metro').getElementsByTagName('a')[0]);
			}
		}
	
		var form = updateToolbar();
		var countries = updateAllCountries();
		addTraffic(countries);
		addMetro(countries);
	
		var map = $('ya-map');
		$('head-menu').parentNode.appendChild(map);
		$('head-menu').parentNode.appendChild(countries);
		$('head-menu').parentNode.appendChild(form);
		map.style.width = map.style.height = '100%';
		window.setTimeout(function(){ // without timeout safari might crash
			$('head-menu').parentNode.removeChild($('j-wrap'))
		}, 500);
	
		wnd.map.map.redraw();
		//wnd.headMenu(allRegions, $('head-menu'));
	}

	redrawPage();
})()