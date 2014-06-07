// ==UserScript==
// @name           Batoto Follows
// @description    Sort your followed manga
// @namespace      http://userscripts.org/users/msm595
// @version        1.0.1
// @include        http://www.batoto.net/*
// @match          http://www.batoto.net/*
// @homepageURL    http://userscripts.org/scripts/show/165502
// @updateUrl      https://userscripts.org/scripts/source/165502.user.js
// @installURL     https://userscripts.org/scripts/source/165502.user.js
// @downloadUrl    https://userscripts.org/scripts/source/165502.user.js
// @updateVersion  5
// ==/UserScript==

document.getElementById('nav_menu_4_trigger').href='/follows_comics';

if (window.location.pathname == "/follows_comics") {

    //compare chapters
    function compareManga(c1, c2) {
        if (c1 == null || c2 == null) return 0;
        if (!isNaN(c1.Chapter*1) && !isNaN(c2.Chapter*1)) {
            return c1.Chapter*1 - c2.Chapter*1;
        }
        else 1*(c1.Chapter!=c2.Chapter);
    }

    var sortingOptions = {
        "all": {
            display: "All",
            test: function(r, l) {return true}
        },
        "unread": {
            display: "Unread",
            test: function(r, l) {return r === null}
        },
        "updated": {
            display: "New chapters",
            test: function(r, l) {return r != null && compareManga(r, l) < 0}
        },
        "uptodate": {
            display: "Up to date",
            test: function(r, l) {return r != null && compareManga(r, l) == 0}
        },
        "recent": {
            display: "Reading",
            test: function(r, l) {return r != null && compareManga(r, l) >= -5 && compareManga(r, l) < 0}
        }
    };

    var manga = [];

    // Parse all manga for chapters/volumes
    var table = document.getElementsByTagName("table")[0],
        trs = [].slice.call(table.getElementsByTagName("tr")),
        tbody = trs[0].parentNode;

    for (var i=0; i<trs.length; i+=2) {
        var lastReadTr = trs[i],
            latestTr = trs[i+1];

        var lastRead = parseChapter(lastReadTr.getElementsByTagName("a")[2]),
            latest = parseChapter(latestTr.getElementsByTagName("a")[0]);

        manga.push({lastReadTr:lastReadTr, latestTr:latestTr, lastRead:lastRead, latest:latest});

        //console.log(lastReadTr.getElementsByTagName("a")[1], lastRead, latest);
        continue;

        if (latest == null || lastRead == null || lastRead.Chapter != latest.Chapter) {
            trs[i].style.backgroundColor = "#fbb";
            trs[i+1].style.backgroundColor = "#fbb";

            tbody.removeChild(trs[i]);
            tbody.removeChild(trs[i+1]);

            tbody.insertBefore(trs[i+1], tbody.firstChild);
            tbody.insertBefore(trs[i], tbody.firstChild);
        }
    }

    //TODO: also sort by date
    //TODO: alternating rows
    //TODO: update menu
    function updateSorting(type) {
        var sort = sortingOptions[type];
        tbody.innerHTML = "";
        for (var i=0; i<manga.length; i++) {
            var m = manga[i];
            if (sort.test(m.lastRead, m.latest)) {
                //console.log(m);
                tbody.appendChild(m.lastReadTr);
                tbody.appendChild(m.latestTr);
            }
        }
    }


    // Convert textual chapter ("Vol.4 Ch.7") to object {Volume:4, Chapter:7}
    function parseChapter(text) {
        if (text == undefined) return null;
        var c = {Volume: 0, Chapter: 0},
            res = /((Vol)\.([0-9.]+))? ?(Ch)\.(\d[0-9.a-z]*|[a-z][0-9a-z: ]+)/i.exec(text.innerHTML);

        if (res == null) return null;

        c.Volume = res[3];
        c.Chapter = res[5];

        return c;
    }


    // Remove the "New" tags that seem randomly sparsed throughout the manga
    var sups;
    while ((sups = document.getElementsByTagName("sup")) != undefined && sups.length > 0) {
        sups[0].parentNode.removeChild(sups[0]);
    }


    //Add menu bar
    var menu = document.createElement("div"),
        menuOptions = ['Unread', 'New Chapters', 'Finished']; 
    menu.style.marginBottom = "16px";
    for (var key in sortingOptions) {
        if (!sortingOptions.hasOwnProperty(key)) continue;
        var a = document.createElement('a');
        a.innerHTML = sortingOptions[key].display;
        a.className = "maintitle";
        a.href="#";
        a.id=key;
        a.style.marginRight = "6px";
        a.onclick = function(key){return function(){updateSorting(key);}}(key);
        menu.appendChild(a)
    }
    var myFollows = document.getElementsByClassName("maintitle")[0];
    myFollows.parentNode.insertBefore(menu, myFollows);

    //todo: sort by remembered
    updateSorting("updated");

}