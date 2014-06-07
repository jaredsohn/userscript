// ==UserScript==
// @name           RetkikarttaLinking
// @namespace      retkikartta
// @include        http://retkikartta.fi/*
// @include        http://www.retkikartta.fi/*
// ==/UserScript==


var parseUrl = function() {
	var url = window.location.href;
	var vars = url.substring(url.indexOf('?')+1).split('&');
	settings = new Array;
	settings['areas'] = '';
	for (x=0;x < vars.length;x++) {
		v = vars[x].split('=');
		if (v.length != 2) {
			continue;
		}
		if (v[0] != 'areas') {
			settings[v[0]] = parseFloat(v[1]);
		} else {
			settings[v[0]] = v[1];
		}
		
	}
	
	if (settings['x'] == undefined && settings['y'] == undefined) {
		if (settings['lat'] != undefined && settings['lon'] != undefined) {
			var coords = unsafeWindow.WGSToKKJ(settings['lon'],settings['lat']);
			settings['x'] = coords[0];
			settings['y'] = coords[1];
		} else {
			return;
		}
	}
	return settings
}



var setCenter = function() {
	parameters = parseUrl();

	if (parameters == undefined) return;
    if (navigator.appName.indexOf('Opera') == -1) {
        unsafeWindow.naviciAjaxApi.setMapZoom(parameters['z']);
    } else {
        naviciAjaxApi.setMapZoom(parameters['z']);
    }
	
    if (navigator.appName.indexOf('Opera') == -1) {
        ykjxy = unsafeWindow.WGSToKKJ(parameters['x'],parameters['y']);
        unsafeWindow.naviciAjaxApi.setMapCenter(ykjxy[0],ykjxy[1]);
    } else {
        ykjxy = WGSToKKJ(parameters['x'],parameters['y']);
        naviciAjaxApi.setMapCenter(ykjxy[0],ykjxy[1]);
    }
	var areas = String(parameters['areas']);	
	if (areas.substr(-1,1) != ',') {
		areas = areas+',';
	}
	areas = areas.split(',');

	for (x=0;x<areas.length;x++) {
		if (areas[x] == '' || areas[x] == undefined) continue;
		inp = document.getElementById('ml_'+areas[x]);
		inp.checked = true;
		if (navigator.appName.indexOf('Opera') == -1) unsafeWindow.toggleLayerSelection(inp,'MapLayerMenuListItem')
		else toggleLayerSelection(inp,'MapLayerMenuListItem')

	}	
}
window.addEventListener('load', function() {setCenter(); },true);