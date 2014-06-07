// ==UserScript==
// @name           Hide Rank
// @description	   Hide your opponent's displayed rank on board page.
// @include        http://gameknot.com/chess.pl*
// ==/UserScript==

(window.onload = function () {
    "use strict";

    var matchupTable = document.getElementById('chessvs'),
        span = matchupTable.getElementsByTagName('span'),
        opponentRank,
        opponentSpan;

    function hideRank() {
        var i, currentSpan, currentParent, currentParentLinks, showLink;
        for (i = 0; i < span.length; i += 1) {
            currentSpan = span[i];
            if (isNaN(currentSpan.innerHTML)) {
                if (currentSpan.innerHTML.indexOf('Hide Rank') !== -1) {
                    currentSpan.innerHTML = '<a style="cursor: pointer;" id="showlink">Show Rank</a>';
                    showLink = document.getElementById('showlink');
                    showLink.onclick = showRank;
                    break;
                }
            } else {
                currentParent = currentSpan.parentNode;
                currentParentLinks = currentParent.getElementsByTagName('a');
                if (currentParentLinks[0].innerHTML === gk_uid) {
                } else {
                    opponentRank = currentSpan.innerHTML;
                    opponentSpan = currentSpan;
                    currentSpan.innerHTML = '<a style="cursor: pointer;" id="showlink">Show Rank</a>';
                    showLink = document.getElementById('showlink');
                    showLink.onclick = showRank;
                    break;
                }
            }
        }
    }

    function showRank() {
        var hideLink;
        opponentSpan.innerHTML = opponentRank + ' <a style="cursor: pointer;" id="hidelink">Hide Rank</a>';
        hideLink = document.getElementById('hidelink');
        hideLink.onclick = hideRank;
    }

    hideRank();

}());