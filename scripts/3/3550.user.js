// ==UserScript==
// @name          Link IMDB/enhance Yahoo TV
// @description   Enhanced details (right click on link) and IMDB links for Yahoo TV listings
// @include       http://tv.yahoo.com/grid/*
// ==/UserScript==
//
// author Kai Bolay <kai-greasemonkey@bolay.de>

(function() {
    // based on "yahoolistingsenhancer.user.js" by <rchandran@gmail.com>
    function showDetails(xx, yy, thelink, thetitle) {
        var d = document.getElementById('myahgm');

        if (!d) {
            d = document.createElement("div");
            d.id = "myahgm";
            d.style.position = "absolute";
            d.style.left = 0;
            d.style.top = 0;
            d.style.background = "#aaccaa";
            d.style.border = "1px solid #337733";
            d.style.width = "300px";
            d.style.padding = "5px";
            d.style.overflow = "hidden";
            d.style.display = "none";
            d.addEventListener("click", function(e) {d.style.display = "none";}, false);
            document.body.appendChild(d);
        }

        GM_xmlhttpRequest({
            method: "GET",
            url: thelink,
            headers: {
                "User-Agent":"monkeyagent",
                "Accept":"text/monkey,text/xml",
            },
            onload: function(details) {
                var d = document.getElementById('myahgm');
                d.style.display = "none";

                var justDetails = details.responseText;
                justDetails = justDetails.substring(justDetails.indexOf(thetitle) + thetitle.length);
                justDetails = justDetails.substring(justDetails.indexOf(thetitle) + thetitle.length);
                justDetails = justDetails.substring(justDetails.indexOf(thetitle));
                d.innerHTML = justDetails.replace(/(Original Airdate:(\n|\r|.)*?<\/p>)(\n|\r|.)*/m, "$1");

                d.style.left    = xx;
                d.style.top     = yy;
                d.style.display = "block";
            }
        });
    }

    // closures are fun!
    function makeContextHandler(alink, atitle) {
        function handle(event) {
            event.stopPropagation();
            event.preventDefault();
            showDetails(findPosX(this), findPosY(this), alink, atitle);
            return false;
        }
        return handle;
    }

    // from http://www.quirksmode.org/js/findpos.html
    function findPosX(obj) {
        var curleft = 0;
        if (obj.offsetParent){
            while (obj.offsetParent) {
                curleft += obj.offsetLeft
                obj = obj.offsetParent;
            }
        } else if (obj.x) {
            curleft += obj.x;
        }
        return curleft;
    }

    function findPosY(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            while (obj.offsetParent) {
                curtop += obj.offsetTop
                obj = obj.offsetParent;
            }
        } else if (obj.y) {
            curtop += obj.y;
        }
        return curtop;
    }

    // from IMDb Links in Netflix (http://www.j-san.net/ <jason@j-san.net>)
    function makeIMDbUrl(movietitle) {
        return 'http://www.imdb.com/find?q='+encodeURIComponent(movietitle)+';tt=on;nm=on;mx=20;';
    }

    // remotely inspired by http://alistapart.com/
    function relink(grid) {
        if (!grid) {return;}

        // and iterate through the rows...
        for (var r = 0; r < grid.childNodes.length; r++) {
            var row = grid.childNodes[r];
            if ((row.nodeType != row.ELEMENT_NODE) ||
                (row.tagName != "DIV") ||
                (row.className != "chan")) {
                // not a channel row
                continue;
            }

            row = row.getElementsByTagName("ul")[0];
            if (!row || (row.className !="chan")) {
                // alert("malformed row #"+h);
                continue;
            }

            // find all the shows...
            var shows = row.getElementsByTagName("li");

            // ... and iterate through them
            for (var s = 0; s < shows.length; s++) {
                show = shows[s].getElementsByTagName("div")[0];
                if (!show || (show.className != "show")) {
                    // alert("malformed show #"+i+" (row #"+h+")");
                    continue;
                }

                var link = show.getElementsByTagName("a");
                if (link.length == 1) {
                    var lnk = link.item(0);
                    var title = lnk.getAttribute("title");
                    if (title) {
                        // the link is abbreviated, but the full title is here,,,
                        title = decodeURIComponent(title); // double encoded?
                    } else {
                        title = lnk.innerHTML;
                    }
                    lnk.addEventListener("contextmenu", makeContextHandler(lnk.href, title), true);
                    lnk.setAttribute("href", makeIMDbUrl(title.replace("&amp;", "&")));
                    lnk.setAttribute("target", "ytv");
                }
            }
        }
    }

    relink(document.getElementById("grid")); // obtain a reference to the desired grid
})();
