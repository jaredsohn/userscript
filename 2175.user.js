// ==UserScript== 
// @name           HuSi Home Page
// @namespace      http://tps12.50webs.com
// @description    Link site logo to page of your choice. Edit script to set home page.
// @include        *hulver.com* 
// ==/UserScript==  

(function() {

	// set this to the page you want to load when you click the site logo
	var homepage = "http://www.hulver.com/scoop/section/Diary";

	if (/^http:\/\/[^.]*\.hulver\.com/.exec(location.href)) {

		var divs = document.getElementsByTagName('div');
		for(var i = 0; i < divs.length; i++)
			if(divs[i].getAttribute('class') == 'site_logo') {
				divs[i].getElementsByTagName('a')[0].setAttribute('href', homepage);
				break;
			}
	}

})();
