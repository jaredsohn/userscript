// TheCrims
// version 0.1 BETA!
// 2007-05-10
// Copyright (c) 2007, Joao Taborda
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name            D-tox
// @description     D-tox
// @include         http://*.thecrims.com/*
// @exclude	    http://*.thecrims.com/ad_adbrite_*
// ==/UserScript==

(function() {

    var TC = {

	addLogo: function() {
	    window.setTimeout((function() {
		var logo = document.createElement("div");
		logo.innerHTML = '<form action="/hospital.php" method="post"><input type="hidden" name="action" value="buy"><input type="hidden" name="id" value="10"><input type="hidden" name="key" value="YnJszG5maGzEzMxsaGDCZspqamRqYmZycmxgamhwysRRamedb2xtb5iemA=="><input name="quantity" id="quantity" value="1"><input type="submit" name="Submit" value="Comprar"></form>';
		document.body.insertBefore(logo, document.body.firstChild);
            }), 3);
	},
    }

    var href = window.location.href;

	TC.addLogo();

    //alert('successfully at ' + href);

})();	
		