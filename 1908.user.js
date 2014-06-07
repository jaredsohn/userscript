// ==UserScript==
// @namespace     http://biwr.net
// @name          ESPN Cleaner
// @description   Removes the advertisements from espn.com
// @include       http://*espn.go.com*
// ==/UserScript==

(function() {

	var el, els, i;

	els = new Array("upperad","adcontrol","topad","expander_top","FLASH_AD","ad_Poster","ad_InContent","adslug","rightcolad","ad_MarketingLogo","splinks","spon1","rowd","contest1");

	for(i = 0; i < els.length; i++)
	{
		el = document.getElementById(els[i]);
		if(el)
			el.style.display = 'none';
	}

})();
