// ==UserScript==
// @name           miniupload
// @namespace      megaupload.com
// @description    remove wait on mega upload 
// @version        1
// @date           2014-1-14
// @author         Patrick.M
// @license        GNU
// @include        *
// ==/UserScript==

(function(){
	
	var arrGagaInstances = document.body.innerHTML.match(<div id="countdown");
	
	if (arrGagaInstances.length > 0)
	{
	count = 1
        document.getElementById('downloadlink').style.display = '';
	document.getElementById('downloadcounter').style.display = 'none'
	}
	
})();