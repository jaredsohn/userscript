// ==UserScript==
// @name        GM List Auto-Click
// @namespace   pbr/gmc
// @description GM List Auto-Click
// @include     http://goallineblitz.com/game/team.pl?*team_id=*
// @copyright   2008, pabst
// @license     (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version     12.10.24
// ==/UserScript==

window.setTimeout( 
    function() {
        var div = document.getElementById("gm_selector");
		if (div != null) {
			div.getElementsByTagName("a")[0].click();
		}
	}, 250
);
	