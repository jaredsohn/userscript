// ==UserScript==
// @name           mods.de Thread hider
// @namespace      userscripts.org/users/cms
// @description    Blendet bestimmte Threads aus
// @author         cms
// @version        1.1.1
// @include        http://forum.mods.de/bb/board.php*
// @include        http://forum.counter-strike.de/bb/board.php*
// @include        http://forum.cstrike.de/bb/board.php*
// @include        http://82.149.226.138/bb/board.php*
// ==/UserScript==

var hider = {
    hideThreads: function(a) {
        GM_setValue("hiddenThreads", (prompt("Thread-(Teil-)Namen eingeben, per ';' trennen.", GM_getValue("hiddenThreads") )));
    },

    init: function() {
        var threads = GM_getValue("hiddenThreads");
        
        GM_registerMenuCommand("Threads verstecken", this.hideThreads);

        if (threads && threads != "" && threads != "undefined")
            this.search(threads.split(";")).forEach(function(a) {
                if (a)
                    a.parentNode.parentNode.parentNode.style.display = "none";
            });
    },

    search: function(a) {
        var retVal = [], xpr;

        for (var i = 0; i < a.length; i++) {
            xpr = document.evaluate(".//a/b[contains(text(), '" + a[i] + "')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);

            if (xpr.snapshotLength > 0)
                retVal.push(xpr.snapshotItem(0));
        }

        return retVal;
    }
}

hider.init();