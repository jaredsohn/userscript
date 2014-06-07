// ==UserScript==
// @name           Nexus Clash Message Pane Resize
// @namespace      http://userscripts.org/users/435889
// @description    Allows the user to resize the message pane in Nexus Clash
// @include        http://nexusclash.com/modules.php?name=Game*
// @include        http://www.nexusclash.com/modules.php?name=Game*
// @exclude        http://nexusclash.com/modules.php?name=Game&op=disconnect
// @exclude        http://www.nexusclash.com/modules.php?name=Game&op=disconnect
// @exclude        http://nexusclash.com/modules.php?name=Game&op=character*
// @exclude        http://www.nexusclash.com/modules.php?name=Game&op=character*
// ==/UserScript==

(function() {
    if (document.getElementById("Messages")) {
        var msg_pane = document.getElementById("Messages")
        msg_pane.style.height = "150px";
        msg_pane.style.resize = "vertical";
        msg_pane.style.minHeight = "100px";
    }
})();