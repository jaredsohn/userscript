// ==UserScript==
// @name           BAR 1.0
// @version        1.0
// @description    Bazaar Auto Refresh (BAR)
// @include        http://bazaar.tf/trades
// @run-at         document-end
// @grant          none
// ==/UserScript==
(function () {
    var RELOAD_MINUTES = 31; // reload every 31 minutes
    var divid = "bar";
    var reload_time, counter;

    function notify(notify) {
        var div = document.getElementById(divid);
        if (!div) {
            var trades = document.getElementById("trades");
            var div = document.createElement("div");
            div.id = divid;
            trades.insertBefore(div, trades.childNodes[0]);
        }
        div.innerHTML = notify;
    }

    function showstatus() {
        reload_time -= 1;
        if (reload_time <= 0) {
            clearInterval(counter);
            location.reload();
            return;
        }
        var min = Math.floor(reload_time / 60);
        var sec = reload_time - min * 60;
        notify("Bazaar Auto Refresh: Recargando la página en " + min + " minutos y " + sec + " segundos...");
    }

    function color_anchor(anchor, apply) {
        anchor.parentNode.parentNode.parentNode.parentNode.style.border = apply ? "1px solid red" : "none";
    }
    var anchor;

    if (anchor && anchor.getAttribute('data-tradeid')) {
        anchor.scrollIntoView();
        color_anchor(anchor, true);

    } else {
        reload_time = RELOAD_MINUTES * 60;
        window.scrollTo(0, 0);
        counter = setInterval(showstatus, 1000);
    }
}).call(this);