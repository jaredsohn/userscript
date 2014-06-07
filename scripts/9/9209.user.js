// TheCrims
// version 0.1 BETA!
// 2007-05-10
// Copyright (c) 2007, Joao Taborda
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name            TC
// @description     The Crims Raves
// @include         http://*.thecrims.com/*
// @exclude	    http://*.thecrims.com/ad_adbrite_*
// ==/UserScript==
	
(function() {

    var TC = {

	addLogo: function() {
	    window.setTimeout((function() {
		var logo = document.createElement("div");
		logo.innerHTML = '<form action="/nightlife.php" method="post"><input type="hidden" name="action" value="enter"><input type="hidden" name="id" value="21709"><input type="hidden" name="edf55ce85914470a454d3175bd1d82de" value="xMxwbGLCZsZkZGJuaGJwbHBobMRkcmxqYmJuanBqasyCl2ltaZllmGhoYg=="><input type="submit" name="Submit" value="Entrar"></form>';
		document.body.insertBefore(logo, document.body.firstChild);
            }), 2);
	},
    }

    var href = window.location.href;

	TC.addLogo();

    //alert('successfully at ' + href);

})();

