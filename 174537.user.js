// ==UserScript==
// @name        N7HQ Linker for r/MECoOp
// @namespace   chypsylon
// @description Adds a link to the N7HQ-Page to the flair of each user in r/MECoOp. Currently only flairs following the template "platform/name/timezone" are supported.
// @include     http://reddit.com/r/MECoOp*
// @include     http://www.reddit.com/r/MECoOp*
// @match       http://reddit.com/r/MECoOp*
// @match       http://www.reddit.com/r/MECoOp*
// @version     1.2
// @grant       none
// ==/UserScript==

/*
Changelog:
1.2: detect platform synonyms. e.g. ps3, psn and playstation
1.1: changed link layout
1.0: first release
*/

function parseFlair(flair) {
    if (flair) {
        //TODO: remove HTML-tags from flair
        var flair_array = flair.split("/");

        //standard case
        if (flair_array.length == 3) {
            var name = flair_array[1].trim();
            var platform = (flair_array[0].trim()).toLowerCase();

            if (platform.search("pc") != -1 || platform.search("origin") != -1) {
                return [name, "pc"];
            }

            if (platform.search("xbox") != -1 || platform.search("360") != -1) {
                return [name, "xbox"];
            }

            if (platform.search("ps") != -1 || platform.search("playstation") != -1 || platform.search("psn") != -1) {
                return [name, "ps3"];
            }
        }
    }

    return null;
}

function generateLinks() {
    if (document.getElementsByClassName) {
        var allFlairs = document.getElementsByClassName("flair");

        for (var i = 0; i < allFlairs.length; i++) {
            var flair = allFlairs[i].innerHTML;
            var player_data = parseFlair(flair);

            //parsing successful
            if (player_data) {
                //allFlairs[i].innerHTML = flair + " <a href=\"http://social.bioware.com/n7hq/home/overview/?name=" + player_data[0] +"&platform=" + player_data[1] + "\">(N7hq)</a>";
                allFlairs[i].innerHTML = " <a href=\"http://social.bioware.com/n7hq/home/overview/?name=" + player_data[0] + "&platform=" + player_data[1] + "\">" + flair + "</a>";
            }
        }
    } else {
        //Browser doesnt support getElementsByClassName()
    }
}

generateLinks();