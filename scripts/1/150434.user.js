
// ==UserScript==
	// @name       Tweakers 7 restyle
	// @version    0.6
	// @description  gebaseerd op versie van 2012+, @vonloghausen en @schellevis met contrast veranderingen
	// @include      http://tweakers.net/*
    // @include      http://gathering.tweakers.net/*
	// @copyright  2012+, @vonloghausen, met css revisie van @schellevis
// ==/UserScript==

(function() {
	var style = document.createElement('style'),
	rules =
		'html { background-color: #333; }' +
		'#menubar { width: 100%; }' +
		'div#top { border-bottom: #000 0px solid; }'+
		'div#contentArea { background-color: #EEE; padding-left: 20px; padding-right: 20px; '+
		'border: #c3c6c6 1px solid; border-bottom: none; }'+
		'#fp_tabs_container, #forum_tabs{ height: 37px; margin-bottom: 20px; margin-top: -57px; overflow: hidden; position: absolute;border-bottom: none;}'+
		'#contentArea { padding-bottom: 180px; padding-top: 20px; margin-top:27px;}'+
		'#reacties {width: 980px;}.relevancyColumn {display: none;}.articleColumn { float: left;line-height: 1.6;margin-top: -5px; width: 980px;}'+
		'html #bottom div.hr { background: none}';

	if(style.styleSheet) {
		style.styleSheet.cssText = rules;
	} else {
		style.appendChild(document.createTextNode(rules));
	}

	document.getElementsByTagName('head')[0].appendChild(style);

})();