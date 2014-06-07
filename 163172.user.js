// ==UserScript==
// @name            Cosplaydeviants video downloader and keyboard navigaton
// @version         1.0
// @author          thealbinosmurf
// @namespace       http://userscripts.org/users/508975
// @description     Makes it possible to download videos and browse galleries with the arrow keys.
// @include         http://www.cosplaydeviants.com/*
// ==/UserScript==
(function() {

    function getLoc(dirc) {
        var linkdiv = document.getElementsByTagName("a");
        for (var i = 0; i < linkdiv.length; i++) {
            if (linkdiv[i].attributes.length > 1) {
                if (linkdiv[i].attributes.item(1).nodeName == "title") {
                    if (linkdiv[i].attributes.item(1).textContent  == dirc){
                        return linkdiv[i].attributes.getNamedItem("href").textContent;
                    }
                }
            }
        }
        return "#";
    }

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        switch (evt.keyCode) {
            case 37:
                window.location = getLoc("Previous");
                break;
            case 39:
                window.location = getLoc("Next");
                break;
        }
    };

})();