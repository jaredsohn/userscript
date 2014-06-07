// ==UserScript==
// @name            Ikariam Theme - Avatar-Theme Beta [work in progress]
// @description     A Theme for Ikariam with pictures out of Avatar. Ein Theme für Ikariam mit Bildern aus Avatar - Aufbruch nach Padora
// @namespace       IkariamTheme58
// @include         http://s*.ikariam.*/*?*
// @include         http://*.ikariam.*/index.php
// @include         http://*ikariam.*/
// @author          FREAKstößer
//
// @resource        img/bg_stone.jpg http://s7.directupload.net/images/100530/crxihjvw.jpg
// @resource        img/bild1.jpg http://s10.directupload.net/images/100529/4l4gsmrl.jpg
// @resource        img/bild2.jpg http://s1.directupload.net/images/100529/wtl4e57y.jpg
// @resource        img/ikariam-logo7.jpg http://s5.directupload.net/images/100530/98etvrq7.jpg
// @resource        img/main-bg5.jpg http://s7.directupload.net/images/100530/oljjdh6j.jpg
// @resource        skin/layout/advisors/diplomat.gif http://s3.directupload.net/images/100531/kufabf8a.gif
// @resource        skin/layout/advisors/diplomat_active.gif http://s5.directupload.net/images/100530/wltiifvw.jpg
// @resource        skin/layout/advisors/general.gif http://s7.directupload.net/images/100531/9swp3bvq.gif
// @resource        skin/layout/advisors/general_active.gif http://s7.directupload.net/images/100530/gutoyqsc.jpg
// @resource        skin/layout/advisors/general_alert.gif http://s7.directupload.net/images/100529/mzsaks85.jpg
// @resource        skin/layout/advisors/mayor.gif http://s3.directupload.net/images/100531/xuo6i5r4.gif
// @resource        skin/layout/advisors/mayor_active.gif http://s7.directupload.net/images/100530/69xdsg7z.jpg
// @resource        skin/layout/advisors/scientist.gif http://s1.directupload.net/images/100531/jfasfpef.gif
// @resource        skin/layout/advisors/scientist_active.gif http://s3.directupload.net/images/100530/qjvbm77d.jpg
// @resource        skin/layout/bg_content.jpg http://s5.directupload.net/images/100530/2cob4jkb.jpg
// @resource        skin/layout/bg_footer.jpg http://s7.directupload.net/images/100530/3x8fus34.jpg
// @resource        skin/layout/bg_header.jpg http://s10.directupload.net/images/100531/dt2c2qon.jpg
// @resource        skin/layout/bg_ocean.jpg http://s5.directupload.net/images/100530/jrlr759p.jpg
// @resource        skin/layout/bg_sky.jpg http://s7.directupload.net/images/100530/sdy8jung.jpg
// @resource        skin/layout/bg_stone.jpg http://s7.directupload.net/images/100530/crxihjvw.jpg
// @resource        skin/layout/btn_city.jpg http://s3.directupload.net/images/100601/z3kwvjd2.gif
// @resource        skin/layout/btn_island.jpg http://s5.directupload.net/images/100601/hmxyc5ix.gif
// @resource        skin/layout/btn_world.jpg http://s5.directupload.net/images/100601/v8kqeifp.gif
// @resource        skin/layout/select_citynav.jpg http://s1.directupload.net/images/100530/nwdcyb2s.jpg
//
// ==/UserScript==

var css = [];

function replaceResourceIcons() {
	if(typeof(id) != 'undefined')
		var elems = document.getElementById(id).getElementsByTagName('img')
	else
		var elems = document.getElementsByTagName('img');	
	for(var i = 0; i < elems.length; i++) {
		
		
		
		
		
	}
	
}

//--------------------------- Login Page ---------------------------
if(document.getElementById('loginForm')) {
	css.push('#headlogo { background-image:url(' + GM_getResourceURL('img/ikariam-logo7.jpg') + '); }');
	css.push('body { background-image:url(' + GM_getResourceURL('img/bg_stone.jpg') + ') }');
	css.push('#main { background-image:url(' + GM_getResourceURL('img/main-bg5.jpg') + ') }');
	
	
	
	
	
	var elems = document.getElementById('text').getElementsByTagName('img');
	for(var i = 0; i < elems.length; i++) {
		if(elems[i].src.match(/bild2/)) { elems[i].src = '' + GM_getResourceURL('img/bild2.jpg') + ''; }
		if(elems[i].src.match(/bild1/)) { elems[i].src = '' + GM_getResourceURL('img/bild1.jpg') + ''; }
	}
} else if(document.getElementById('GF_toolbar')) {
	//--------------------------- Layout -----------------------------
	css.push('#header { background:url(' + GM_getResourceURL('skin/layout/bg_header.jpg') + ') no-repeat; }');css.push('#extraDiv1 { background-image:url(' + GM_getResourceURL('skin/layout/bg_sky.jpg') + '); }');
	css.push('#extraDiv2 { background-image:url(' + GM_getResourceURL('skin/layout/bg_ocean.jpg') + '); }');
	
	css.push('#cityNav .viewCity a { background-image:url(' + GM_getResourceURL('skin/layout/btn_city.jpg') + '); }');
	css.push('#cityNav .viewCity a:hover { background-image:url(' + GM_getResourceURL('skin/layout/btn_city.jpg') + '); }');
	css.push('#cityNav .viewCity a:down { background-image:url(' + GM_getResourceURL('skin/layout/btn_city.jpg') + '); }');
	
	
	
	css.push('#cityNav .viewWorldmap a { background-image:url(' + GM_getResourceURL('skin/layout/btn_world.jpg') + '); }');
	
	
	
	
	
	
	
	
	
	//--------------------------- Advisers -----------------------------
	css.push('#advisors #advCities a.normal { background-image:url(' + GM_getResourceURL('skin/layout/advisors/mayor.gif') + '); }');
	css.push('#advisors #advCities a.normalactive { background-image:url(' + GM_getResourceURL('skin/layout/advisors/mayor_active.gif') + '); } ');
	css.push('#advisors #advMilitary a.normal { background-image:url(' + GM_getResourceURL('skin/layout/advisors/general.gif') + '); } ');
	css.push('#advisors #advMilitary a.normalactive { background-image:url(' + GM_getResourceURL('skin/layout/advisors/general_active.gif') + '); } ');
	css.push('#advisors #advMilitary a.normalalert { background-image:url(' + GM_getResourceURL('skin/layout/advisors/general_alert.gif') + '); } ');
	css.push('#advisors #advResearch a.normal { background-image:url(' + GM_getResourceURL('skin/layout/advisors/scientist.gif') + '); }');
	css.push('#advisors #advResearch a.normalactive { background-image:url(' + GM_getResourceURL('skin/layout/advisors/scientist_active.gif') + '); } ');
	css.push('#advisors #advDiplomacy a.normal { background-image:url(' + GM_getResourceURL('skin/layout/advisors/diplomat.gif') + '); }');
	css.push('#advisors #advDiplomacy a.normalactive { background-image:url(' + GM_getResourceURL('skin/layout/advisors/diplomat_active.gif') + '); } ');
	
	switch(document.body.id) {
		case 'branchOffice':
			replaceResourceIcons('mainview');
			break;	
		case 'city':	//------------ City View ---------------
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			break;
		case 'island':
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			break;
		case 'resource':
			function updateImages() {
				var elems = document.getElementById('resiconcontainer').getElementsByTagName('img');	
				for(var i = 0; i < elems.length; i++) {
					
				}
			}
			document.getElementById('inputWorkers').addEventListener('change', updateImages, false);
			document.getElementById('inputWorkers').addEventListener('keyup', updateImages, false);
			document.getElementById('sliderbg').addEventListener('mousemove', updateImages, false);
			document.getElementById('sliderbg').addEventListener('mouseup', updateImages, false);
			var elems = document.getElementById('sliderbg').parentNode.getElementsByTagName('a');
			for(var i = 0; i < elems.length; i++) {
				elems[i].addEventListener('mouseup', function() { setTimeout(updateImages, 50); }, true);
			}
			updateImages();
			var elems = document.getElementById('mainview').getElementsByTagName('img');
			for(var i = 0; i < elems.length; i++) {
				
			}
			break;
		case 'tradegood':
			function updateImages() {
				var elems = document.getElementById('resiconcontainer').getElementsByTagName('img');	
				for(var i = 0; i < elems.length; i++) {
					
					
					
					
				}
			}
			document.getElementById('inputWorkers').addEventListener('change', updateImages, false);
			document.getElementById('inputWorkers').addEventListener('keyup', updateImages, false);
			document.getElementById('sliderbg').addEventListener('mousemove', updateImages, false);
			document.getElementById('sliderbg').addEventListener('mouseup', updateImages, false);
			var elems = document.getElementById('sliderbg').parentNode.getElementsByTagName('a');
			for(var i = 0; i < elems.length; i++) {
				elems[i].addEventListener('mouseup', function() { setTimeout(updateImages, 50); }, true);
			}
			updateImages();
			var elems = document.getElementById('mainview').getElementsByTagName('img');
			for(var i = 0; i < elems.length; i++) {
				
			}
			break;
		case 'palace':
			replaceResourceIcons('mainview');
			break;	
		case 'palaceColony':
			replaceResourceIcons('mainview');
			break;
		case 'transport':
			
			
			
			
			
			break;
		case 'warehouse':
			replaceResourceIcons();
			break;
		case 'worldmap_iso':
			
			
			
			
			
			break;
		
	}
}	


GM_addStyle(css.join(''));

