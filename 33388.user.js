// ==UserScript==
// @name           Hide Next Opponent
// @namespace      pbr
// @description    Hide Next Opponent
// @include        http://goallineblitz.com/game/home.pl
// @version		   08.09.08
// ==/UserScript==

/*
 * pabst was here 08/09/08
 */

function showOpponent(t) {
	var next = t.nextSibling;
	if (next == null) return;

	next.setAttribute("style","visibility: visible;");    				
	t.parentNode.removeChild(t);
}

var season = document.getElementById("season").innerHTML;
var idx = season.indexOf("Day ");
var day = parseFloat(season.slice(idx+"Day ".length));
if (day < 32) {
    return;
}

var links = document.links;
for (var i=0; i<links.length; i++) {
    if (links[i].toString().match("compare_teams.pl") != null) {
        var hspan = document.createElement("span");
        hspan.setAttribute("style","color: #A03C19; text-decoration: underline;");
        hspan.innerHTML = "Show Opponent";
    	hspan.addEventListener('click', function() { showOpponent(this); }, true);
    	
    	var tspan = document.createElement("span");
		tspan.setAttribute("style","display: none; visibility: hidden;"); 
		
	    var node = links[i].parentNode;
		node.insertBefore(hspan,links[i]);
    	node.insertBefore(tspan,links[i]);
    	tspan.appendChild(links[i]);
    }
}

