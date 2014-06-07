// ==UserScript==
// @name		IGM EngineerRoom
// @namespace		IGM
// @icon		http://dy5oyikz6c23y.cloudfront.net/V005/1/templates/igmaraudersglobal/favicon.ico
// @description		Resort buidable units on engineering room
// @author		Kleho
// @version		0.0.6
// @date		2012-02-14
// @include		http://igmarauders.isotx.com/*
// ==/UserScript==

if (/http:\/\/igmarauders.isotx.com\//.test(window.location.href)){

	setInterval(function() {
		
		if (!document.getElementById('production_tabs')) {

			if (window.location.href.indexOf('engineerroom')+1) {

			   	var ul	= document.getElementById('rightPart').getElementsByTagName('ul')[0];
			   	ul.id	= 'production_tabs';
	
				var tabs = {
					//"supports" : [714,584,1171,907,622,1157,588,617,629,621,778,598,615,817,616,614,777,1170,	908,938,1179,1277],
					//"civilian" : [1007,948,1003,1008,1001,							1009,1135,1279]
					"civilian" : [714,584,1171,907,622,1157,588,617,629,621,778,598,615,817,616,614,777,1170,908,938,1179,1277,1007,948,1003,1008,1001,1009,1135,1279]
				};
	
				var tab = 'vehicles';	// default
				var lis = ul.getElementsByTagName('li');
	
				for (var i in lis) {
					var li = lis[i];
					if (li.className) {
						var pos = li.className.indexOf(" selected");
						if (pos > -1) tab = li.className.substr(0, pos);
					}
				}
	
				for (var c in tabs) {
					for (var i = 0; i < tabs[c].length; i++) {
						var o = document.getElementById("b"+tabs[c][i]);
						if (o) {
							o.className = "buildable "+ c;
							o.style.display = tab == c ? 'block' : 'none';
						}
					}
				}

			}
		}

		},
		1000
	);

}
