// ==UserScript==
// @name        Remember sort order for GOG games
// @include     http://www.gog.com/catalogue*
// @match       http://www.gog.com/catalogue*
// @grant       none
// ==/UserScript==

(function() {
    var saved_order = readCookie("GM_gog_saved_order");
    if (saved_order == null) saved_order = "alph";

    var tab = $("#tab").val();
    var a = $("#" + tab + "_order_cont > li.active").attr('id').split('_');
    var current_order = a[a.length-1];
    
    origSetOrder = window.setOrder;
    window.setOrder = function(a) {var order = a.split("_"); order = order[order.length - 1]; createCookie("GM_gog_saved_order", order, 30); origSetOrder(a)}

    if (current_order == saved_order) return;
    
    origGetMoreGamesResults = window.getMoreGamesResults;
    window.getMoreGamesResults = function(b, a) {$("div.games_list").removeClass("spin");autoLoadComplete = true;gog_sort()};

    function gog_sort() {
        window.getMoreGamesResults = origGetMoreGamesResults;
        $("#" + tab + "_order_" + saved_order).click();
        closeDD(tab + "_orderDD");
    }
    
    // createCookie and readCookie from http://www.quirksmode.org/js/cookies.html
    
    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

})();