// ==UserScript==
// @name        Sort GOG games by title by default
// @include     http://www.gog.com/catalogue*
// @match       http://www.gog.com/catalogue*
// @grant       none
// ==/UserScript==

(function() {
    origGetMoreGamesResults = window.getMoreGamesResults;
    window.getMoreGamesResults = function(b, a) {$("div.games_list").removeClass("spin");autoLoadComplete = true;gog_sort()};

    function gog_sort() {
        var tab = $("#tab").val();
        window.getMoreGamesResults = origGetMoreGamesResults;
        $("#" + tab + "_order_alph").click();
        closeDD(tab + "_orderDD");
    }
})();