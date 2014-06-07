// ==UserScript==
// @id             ingress-ph-portal-submission
// @name           IngressPH: Portal submission
// @version        0.4
// @namespace      https://github.com/aqlx86/
// @updateURL      http://ingress.com.ph/tools/ipps.js
// @downloadURL    http://ingress.com.ph/tools/ipps.js
// @description    Portal submission tool for ingress PH portals
// @include        http://www.ingress.com/intel*
// @include        https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
	if(typeof window.plugin !== 'function') window.plugin = function() {};
	window.plugin.iph = function() {};
	
	window.plugin.iph.submit_portal = function(){
		var p = [];
		$.each(window.portals, function(i, portal){
			var guid = portal.options.guid,	d = portal.options.details;
			p.push({guid: guid,	title: d.portalV2.descriptiveText.TITLE, address: d.portalV2.descriptiveText.ADDRESS, image: d.imageByUrl.imageUrl, lngE6: d.locationE6.lngE6, latE6: d.locationE6.latE6, });	
		});
		$.ajax({url: 'http://ingress.com.ph/portals/submit',type: 'POST', data:{'d': JSON.stringify(p)},dataType: 'jsop',success: function(r){return;}});
		alert('thanks for submitting.');
	}

	var setup = function(){$('#toolbox').append(' <a onclick="window.plugin.iph.submit_portal()" title="submit all visible portals to ingress.com.ph">IPH Submit</a>');}

	if(window.iitcLoaded && typeof setup === 'function') {setup();} 
	else {
		if(window.bootPlugins) {window.bootPlugins.push(setup);} 
		else {window.bootPlugins = [setup];}
	}
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);