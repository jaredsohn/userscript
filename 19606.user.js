// ==UserScript==// @name           Fix Globes stocks list// @namespace      urn:alexswissa:greasemonkey:scripts:globesstocksfix// @description    Show globes stocks list, so that all of it could be seen// @include        http://*globes.co.il/serve/globes/globesglobal/worldstocks.asp*// ==/UserScript==(function(){
	var frame = document.getElementById("frmAllStocs");
	frame.scrolling = true;
	
})();
