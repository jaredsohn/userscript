// ==UserScript==
// @name           Defensive AI 0's
// @namespace      DefenseAI
// @description    Set's 0 for the Blitz values
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// ==/UserScript==

window.setTimeout(
	function() {
		var elems = document.forms[0].elements;
		for(var i=0;i<elems.length;i++) {
			if (Left(elems[i].name, 7) == 'o_blitz') { if (elems[i].value == '') { elems[i].value = '0'; } }
		}
	}
, 3000);

function Left(str, n)
        {
                if (n <= 0)
                        return "";
                else if (n > String(str).length)
                        return str;
                else
                        return String(str).substring(0,n);
        }
