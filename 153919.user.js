// ==UserScript==
// @name        anime-planet info+
// @namespace   http://annanfay.com
// @include     http://www.anime-planet.com/users/*/anime*
// @version     6
// @grant       none
// ==/UserScript==

var NEARLY_FINISHED_THRESHOLD = 6;

//
// Utility Functions 
//

// Create element
function e (n, contents) {
    var el = document.createElement(n);
    contents && (el.innerHTML = contents);
    return el;
}
// Single nod value at XPath
function x (p, src) {
    var res = document.evaluate(p, src||document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return res.singleNodeValue;
}
function xs (p, src) {
    var items = [],
        res = document.evaluate(p, src||document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for ( var i=0, l=res.snapshotLength; i < l; i++ ) {
        items.push( res.snapshotItem(i) );
    }
    return items;
}
function get_by_class(className, src) {
    // will also return partial matches!
    return x("descendant::*[contains(@class,'"+className+"')]", src);
}
function get_by_name(name, src) {
    return x("descendant::*[@name='"+name+"']", src);
}

//
// Some data structures
//

function anime (status, episodes) {
    return {
        status: status.value,
        episodes: episodes.children.length - 1,
        current_episode: episodes.value,
        airing: !~status.innerHTML.search("Watched")
    };
}
function change (pred, changer, reset) {
    return {
        pred: pred,
        changer: changer,
        reset: reset
    };
}

// create message node
function message (text, color) {
    var el = e("span");
    el.className = "apip-message"
    el.style.color = color;
    el.style.padding = 0;
    el.innerHTML = text;
    return el;
}


//
// Our predicates and format functions
//

var changes = [
    //
    // This adds the percent complete to Stalled or Watching anime
    //
    change(
        function (anime) {
            // all stalled or watching
            return (anime.status == 2 || anime.status == 5);
        }, function (anime, row) {

            var watchedPercent = ((anime.current_episode*100)/(anime.episodes||1));

            var pDiv = e("div");
            pDiv.className = "colored-percent";
            pDiv.style.padding = 0;
            pDiv.style.cssFloat = "right";
            pDiv.innerHTML = "" + watchedPercent.toFixed(0) + "%";

            // Sort out the colour
            if (watchedPercent == 0) {
                pDiv.style.color = "#901050";
                pDiv.style.fontWeight = "bold";
            } else {
                var green = Math.round(watchedPercent * 2.55);

                pDiv.style.color = "#15" + (green < 0x10 ? '0' : '') + green.toString(16) + "b0";
            }

            row.children[0].appendChild(pDiv);

        }, function (row) {
            var cp = get_by_class('colored-percent', row);
            if (cp) {
                cp.parentNode.removeChild(cp);
            }
        }),
    //
    // This adds the NEW label
    //
    change(
        function (anime) {
            // Airing AND Watching AND not watched everything
            return (
                anime.airing && 
                anime.status == 2 && 
                anime.current_episode < anime.episodes);
        }, function (anime, row) {
            var m = message("NEW ", "#151ab0");
            row.children[0].appendChild(m);
        }, function (row) {
            var cp = get_by_class('apip-message', row);
            if (cp) {
                cp.parentNode.removeChild(cp);
            }
        }),
    //
    // This fades out the anime if it's currently Airing and you've watched everything
    //
    change(
        function (anime) {
            // Airing AND Watching AND watched everything
            return (
                anime.airing && 
                anime.status == 2 && 
                anime.current_episode == anime.episodes);
        }, function (anime, row) {
            
            // We want to fade everything to 40%, except 
            // for the percentage which we want to make 60% to increase readability

            // children of the first cell AND all other cells
            var fade40 = xs('child::td[position()!=1] | child::td[position()=1]/*', row);
            for (var i = 0, l = fade40.length; i<l; i++) {
                fade40[i].style.opacity = '0.4';
            }

            var fade60 = get_by_class('colored-percent', row);
            fade60.style.opacity = '0.6';
        }, function (row) {
            var els = xs('descendant::*', row);
            for (var i = 0, l = els.length; i<l; i++) {
                els[i].style.opacity = '1';
            }
        }),
    //
    // This adds the [+n] label for anime that have less than 6 episodes remaining.
    //
    change(
        function (anime) {
            // stalled OR watching
            // AND nearly finished
            var episodesLeft = anime.episodes - anime.current_episode;
            return (
                (
                    anime.status == 2 || 
                    anime.status == 5
                ) &&
                episodesLeft <= NEARLY_FINISHED_THRESHOLD && 
                episodesLeft > 0);
        }, function (anime, row) {
            var episodesLeft = anime.episodes - anime.current_episode;
            var m = message("[+" + episodesLeft + "]", "#151ab0");
            row.children[0].appendChild(m);
        }, function (row) {
            var cp = get_by_class('apip-message', row);
            if (cp) {
                cp.parentNode.removeChild(cp);
            }
        }),
    //
    // Labels anime as [UPDATE NEEDED] if you have finished them or haven't started them
    //
    change(
        function (anime) {
            var episodesLeft = anime.episodes - anime.current_episode;
            return (
                (anime.status == 2 || anime.status == 5) && 
                (anime.episodes == 0 || episodesLeft == 0)  && 
                !anime.airing);
        }, function (anime, row) {
            var m = message("[UPDATE NEEDED]", "#15b01a");
            row.children[0].appendChild(m);
        }, function (row) {
            var cp = get_by_class('apip-message', row);
            if (cp) {
                cp.parentNode.removeChild(cp);
            }
        })
];

function change_row (row) {
    var status = get_by_name("status", row);
    var episodes = get_by_name("episodes", row);
    var current_anime = anime(status, episodes);

    for (var i=0,l=changes.length; i<l; i++) {
        var change = changes[i];
        if (change.pred(current_anime)) {
            change.changer(current_anime, row);
        }
    }
}

function reset_row (row) {
    for (var i=0,l=changes.length; i<l; i++) {
        var change = changes[i];
        if (change.reset) {
            change.reset(row);
        }
    }
}

function change_handler (e) {
    var row = x('ancestor::tr', e.target);
    reset_row(row);
    change_row(row);
}

var list = get_by_class("entryTable");

if (list != null) {
    var rows = list.lastElementChild.children
    for (var i = 0, l=rows.length; i < l; i++) {
        change_row(rows[i]);
    }

    // add a change listener to all select inputs so we can update 
    // things when changes are made
    var selects = xs("descendant::select", list);
    for (var j=0, lj=selects.length; j<lj; j++) {
        selects[j].addEventListener('change', change_handler, false)
    }
}