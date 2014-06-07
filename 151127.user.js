// ==UserScript==
// @name           Chrome Maps HiDPI
// @description  
// @author         untitled
// @include        https://www.google.com/maps*
// @include        http://www.google.com/maps*
// @include        https://google.com/maps*
// @include        http://google.com/maps*
// @include        http://maps.google.com*
// @include        https://maps.google.com*
// @version        1.1
// ==/UserScript==

(function()
{
	setTimeout(function()
	{
		var myScript = document.createElement('script');

		myScript.innerHTML = "window.devicePixelRatio=4";
	
		document.body.appendChild(myScript);

		//--------------

		var myStyle = document.createElement('style');
		myStyle.media = 'print';
		myStyle.innerHTML = ".panel-width-start {min-height:800px !important}"
		
		document.body.appendChild(myStyle);

	}, 300);
})();