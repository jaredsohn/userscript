// ==UserScript==
// @name            GLB Player Awards/EQ/Tactics Links
// @description		Add Equipment & Tactics & Awards Link On The Homepage
// @include         http://goallineblitz.com/game/home.pl
// @version         08.12.28
// ==/UserScript==
/*
 *
 * written by pabst/modified kardiackids 12/28/08 - 4/30/09+
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

    var t = document.createElement("a");
    t.href = address.replace("player.pl","equipment.pl");
    t.innerHTML = "(Eq.)";

    var b = document.createElement("a");
    b.href = address.replace("player.pl","player_tactics.pl");
    b.innerHTML = "(Tactics)";

    var d = document.createElement("div");
    d.setAttribute("style","margin-left: 20px; text-align: left");
    d.appendChild(eq);    
    d.appendChild(t);    
    d.appendChild(b);    
    div.insertBefore(d,div.lastChild);
}

