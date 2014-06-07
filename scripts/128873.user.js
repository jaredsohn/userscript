// ==UserScript==
// @name           Gumtree Plus
// @namespace      gumtreeplus
// @include        http://*gumtree.com.au/*
// @require http://www.aussieelectronics.com/gm_config.js
// ==/UserScript==

GM_config.init('Gumtree Plus Options',
{
	'filters':
	{
		'label': 'filters',
		'type': 'text',
		'default': ''
	}
});

GM_registerMenuCommand('Gumtree Plus Options', opengmcf);

function opengmcf(){
	GM_config.open();
}

removeit("srchrslt-adtable-topads");
removeit("topads-sr-title");
removeit("adsense-top");
removeit("adsense-bottom");

var ads = document.getElementsByTagName("li");
if(ads){
	for (var i=0; i<ads.length; i++) {
		var title = ads[i].getElementsByClassName("rs-ad-title h-elips");
		if(title.length != 0){
			title = title[0].innerHTML.toString().toLowerCase();
			var filters = GM_config.get('filters').split(",");
			for (var i2=0; i2<filters.length; i2++) {
				if(title.indexOf(filters[i2].toLowerCase()) != -1){
					ads[i].innerHTML = "";
					//ads[i].parentNode.removeChild(ads[i]);
				}
			}
		}
	}
}

function removeit(id){
	if(document.getElementById(id)){
		document.getElementById(id).parentNode.removeChild(document.getElementById(id));
	}
}

clickph();

function clickph(){
	var phbut = document.getElementById('vip-replyfrm-phone-show');
	if(phbut){
		phbut.click();
	}
}