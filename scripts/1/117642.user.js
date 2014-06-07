// ==UserScript==
// @name           Evita el coso feo del new msn
// @namespace      Pato12
// @include        http://link.smartscreen.live.com/
// ==/UserScript==

(function(){
alert("asdasdasd inicio");
	var url = String(document.location);
	
	if(url.split('?').length == 0 || url.indexOf('?') < 0)
		return;
		
	for(var i = 0, sep = url.split('?')[1].split('&'), l = sep.length; i < l ; i++){
		if(sep[0].split('=')[0] == 'l')
			window.location = unescape(sep[0].split('=')[1]);
alert(sep[0].split('=')[0]);
	}
	
})();