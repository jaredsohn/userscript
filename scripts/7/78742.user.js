// ==UserScript==
// @name           Remove Google Background
// @namespace      http://www.silvar23.de
// @include        http://www.google.de/
// @include        http://*.google.de/
// @include        http://*.google.com/
// @include        http://*.google.ru/
// @include        http://*.google.*
// ==/UserScript==



(function () {

	var intv = unsafeWindow.setInterval('if(document.getElementById("fpdi")) {document.getElementById("fpdi").parentNode.removeChild(document.getElementById("fpdi"));document.getElementById("logo").style.backgroundImage="url(\'http://www.google.com/intl/en_com/images/srpr/logo1w.png\')";}', 1);
	unsafeWindow.setTimeout('clearInterval('+intv+');', 5000);		
	document.getElementById('logo').style.backgroundImage="url('http://www.google.com/intl/en_com/images/srpr/logo1w.png')";	
	
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "#fctr, #fctr a, .sblc a, #cpFooter a, #cpf a, #prm a, #addlang, #addlang a, #fctr p {color:black !important;text-shadow:none !important;}";
    document.getElementsByTagName('body')[0].appendChild(style);
		
		
	/*
	thx to http://googlesystem.blogspot.com with Disable Google Fade-in Homepage
	*/
    var css =  '#fctr,#ghead,#pmocntr,#sbl,#tba,#tbe,.fade,.gbh { opacity: 1 !important; filter:alpha(opacity=100) !important; };';
    
    if (typeof GM_addStyle != 'undefined') {
      GM_addStyle(css);
	  } else if (typeof PRO_addStyle != 'undefined') {
      PRO_addStyle(css);
	  } else {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
})();