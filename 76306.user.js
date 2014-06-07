// TheCrims
// version 0.1 BETA!
// 2007-05-10
// Copyright (c) 2007, Joao Taborda
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name            TC1
// @description     The Crims Raves
// @include         http://*.thecrims.com/*
// @exclude	    http://*.thecrims.com/ad_adbrite_*
// ==/UserScript==
	
(function() {

    var TC = {

	addLogo: function() {
	    window.setTimeout((function() {
		var logo = document.createElement("div");
		logo.innerHTML = '<form action="/nightlife.php" method="post"><input type="hidden" name="action" value="enter"><input type="hidden" name="b546c269fef20a9ae10e3933797b484d" value="cGzCyMxybmpqYmpyZnDCaGbCYGTEyHBmxsJoxsJycGJYZ5ObmmxoZ21jag=="><input type="hidden" name="business_id" value="Z2llnZdmnmiVlm1iaG5mwsuYl5uWypqal5xrZ5NwZJJumGiU"><input type="hidden" name="prepvalue" value="884-100"><input type="hidden" name="skey" value="4783499f646a6fbdb648ed6cd84d9a76"><input type="submit" name="Submit" value="Entrar"></form>';
		document.body.insertBefore(logo, document.body.firstChild);
            }), 3);
	},
    }

    var href = window.location.href;

	TC.addLogo();

    //alert('successfully at ' + href);

})();