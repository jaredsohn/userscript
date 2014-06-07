// ==UserScript==
// @name        http://lingvopro.abbyyonline.com
// @namespace   localhost
// @include     http://lingvopro.abbyyonline.com/*
// @version     1
// ==/UserScript==

	function find(path) {
		return document.evaluate( path ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	}
	
	var logenabled = false
	function log(msg) {
		if (logenabled)
			alert (msg)
	}
	function hide(path) {
		var element = find(path)
		log( element)
		if (element != null)
			element.style.display = 'none'
	}
	//alert(location.href)
	var base = '/html/body/div[@class="g-page"]/div[@class="page"]/'
	
	hide(base + 'div[@class="topmenu"]')
	hide(base + 'div[@class="b-head"]')
	hide(base + 'a[@class="home"]')
	logenabled = false
	hide(base + 'ul[@class="mainmenu"]') // cannot locate this element
	hide(base + '/div[@class="b-useful-info-after-searchform"]')
	hide(base + '/tr[@class="b-search-panel__language js-search-panel-controls"]')
	logenabled = false
	
	var panel = base + '/div[@class="b-search-panel__data"]'
	log( find(panel).style.padding = '0px 0px 0px')
	
	var textarea = find(panel + '//textarea[@id="searchText"]')
	textarea.style.padding = '0px 0px 0px 0px';
	
//	var tabs = find(panel + '//a[@class="b-roundbox__menutabs__cont"]')
//	alert(tabs)
	
	
	
	function addCss(cssString) {
		var head = document.getElementsByTagName('head')[0];
		var newCss = document.createElement('style');
		newCss.type = "text/css";
		newCss.innerHTML = cssString;
		head.appendChild(newCss);
	}	

	function zeroPad(class1) {
		addCss ( class1 + ' { padding:0px 0px 0px 0px ! important; }'); 
	} 
	zeroPad ('.b-roundbox__menutabs__cont')
	zeroPad ('.b-roundbox__menutabs_active__cont')
	addCss ('.b-roundbox__menutabs { border-radius: 0px 0px 3px 3px ! important; }'); 
	addCss ('.b-roundbox__menutabs_active { border-radius: 0px 0px 3px 3px ! important; }'); 
	addCss ('.b-menu-tabs{ padding-bottom: 0px ! important; }'); 
	addCss ( '.tab { padding:0px 10px 0px 10px ! important; }'); 
	zeroPad('.b-search-panel_short')
	zeroPad('.b-menu-tabs_link')