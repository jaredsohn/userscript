// ==UserScript==
// @name            Not Working Yet
// @description	    Add Awards Link on the Retired Players Homepage
// @include         http://goallineblitz.com/game/home.pl?retired=1
// @version         08.12.28
// ==/UserScript==
/*
 *
 * written by pabst/modified kardiackids2007 2/18/10 
 *
 */

window.setTimeout( 
	function() {
        player_links_main();
	}, 
	200
);

function player_links_main() {
    var list = document.getElementsByClassName("playerhead");
    for (var i=0; i<list.length; i++) {
        playerlinks(list[i]);
        var skillButton = list[i].getElementsByTagName("a");
        skillButton = skillButton[skillButton.length-1];
        if (skillButton.parentNode.getAttribute("id") == "level_button_container") {
            var parent = skillButton.parentNode;
            parent.style.width = "120px";
        }
    }
}

function playerlinks(div) {
    var address = div.getElementsByTagName("a")[0].href.toString();
    var eq = document.createElement("a");
    eq.href = address.replace("player.pl","player_awards.pl");
    eq.innerHTML = "(Awards)";

    var d = document.createElement("div");
    d.setAttribute("style","margin-left: 20px; text-align: left");
    d.appendChild(eq);    
    d.appendChild(t);    
    d.appendChild(b);    
    div.insertBefore(d,div.lastChild);
}
