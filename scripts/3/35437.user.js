// Dark Orbit Game Resize v0.1
// Copyright (c) 2008, Perberos
// http://perberos.com.ar/
//
// ==UserScript==
// @name	Dark Orbit Game Resize
// @namespace	http://perberos.com.ar/downloads/greasemonkey/
// @description   Cambia el modo de ver la ventana del juego, para poder ajustarla.
// @include	   http://*.darkorbit.com/indexInternal.es?action=internalMap&sid=*
// ==/UserScript==    


(function () {
	var obj = document.getElementsByName('DFlash')[0];
	obj.setAttribute("style", "position:absolute;left:0px;top:0px;right:0px;bottom:0px;width:100%;height:100%;");
	obj.setAttribute("menu", "true");
	obj.setAttribute("quality", "low");
})();

