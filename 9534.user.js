// ==UserScript==
// @name          Last.fm Automatically Updating Recently Listened Tracks
// @author        Andrew Wilkinson <andrew@indiegigs.co.uk>
// @namespace     http://lastfm.indiegigs.co.uk/
// @version       0.3.1
// @description	  Updates the recently listened tracks every 60 seconds
// @include       http://www.last.fm/user/*
// @include       http://beta.last.fm/user/*
// @include       http://www.lastfm.*/user/*
// ==/UserScript==

var timeout;
var username;

//Regular Expression to strip XML declaration prior to new XML()
var xmlDeclaration = /^<\?xml version[^>]+?>/;

String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

String.prototype.startsWith = function(prefix) {
    if (this.length < prefix.length) {
        return false;
    }
    return (this.substring(0, prefix.length) == prefix);
};

String.prototype.endsWith = function(suffix) {
    var startPos = this.length - suffix.length;
    if (startPos < 0) {
        return false;
    }
    return (this.lastIndexOf(suffix, startPos) == startPos);
};

function xpath(query, doc) {
    return doc.evaluate(query, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getServer() {
    path = window.location.href;
    slash = path.substr(7).indexOf("/");
    return path.substr(0, slash+8);
}

function getPageMajorType(server) {
    path = window.location.href;
    serverlen = server.length;
    return path.substr(serverlen, path.substr(serverlen, path.length).indexOf("/"));
}

function getUserName(server, majortype) {
    path = window.location.href;
    fullpath = server + majortype + "/";
    fullpathsize = fullpath.length;
    if(path.substr(0, fullpathsize) != fullpath) {
        return null;
    }
    if(path.substr(fullpathsize, path.length).indexOf("/") == -1) {
        return path.substr(fullpathsize);
    } else {
        return path.substr(fullpathsize, path.substr(fullpathsize, path.length).indexOf("/"));
    }
}

function getPageType(server, majortype, username) {
    path = window.location.href;
    fullpath = server + majortype + "/";
    size = (fullpath + username).length + 1;
    nextslash = window.location.href.substr(size).indexOf("/");
    nextampersand = window.location.href.substr(size).indexOf("&");
    nextquestion = window.location.href.substr(size).indexOf("?");
    if(fullpath + username == window.location.href
       || fullpath + username + "/" == window.location.href
       || (nextquestion != -1 && fullpath + username == window.location.href.substr(0, size+nextquestion))
       || (nextquestion != -1 && fullpath + username + "/" == window.location.href.substr(0, size+nextquestion))) {
        return "front";
    } else {
        return "other";
    }
}

function createRecentlyListenedTracks() {
    var page = xpath("//div[@id=\"LastContent3\"]", document).snapshotItem(0);

    page.innerHTML = "<div id=\"recenttracks\" class=\"chartWithQuilttwoBox \"><h3><a href=\"/user/"+username+"charts/?charttype=recenttracks\">Recently Listened Tracks</a></h3>" +
"<div class=\"chartWithQuilt chartWithQuilttwo\">" +
"<div class=\"imgQuilt imgQuilttwo\" id=\"quilt\"></div>" +
"<div class=\"chartWithQuiltChart\">" +
"<table class=\"recentList\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\">" +
"<tbody></tbody></table></div></div>" +
"<div class=\"chartmore\">" +
"<a href=\"/user/"+username+"/charts/?charttype=recenttracks\">See more…</a>" +
"<span class=\"li\"><a class=\"feed\" href=\"http://ws.audioscrobbler.com/1.0/user/"+username+"/recenttracks.rss\" title=\"RSS Feed for "+username+"’s Recent Tracks\"><span>Feed</span></a></span>" +
"</p>" +
"</div>" + page.innerHTML;
}

function getFuzzyTime(timestamp) {
    var now = new Date().getTime()/1000.0;
    var diff = now - timestamp;

    if(diff < 60) {
        return "just listened";
    } else if(diff < 3600) {
        return Math.floor(diff/60) + " minutes ago";
    } else if(diff < 24 * 3600) {
        hours = Math.floor(diff / 3600);
        minutes = Math.floor((diff - hours*3600) / 60);
        return hours + "h and " + minutes + "m ago";
    } else {
        days = Math.floor(diff / (24 * 3600));
        hours = Math.floor((diff - days*(24 * 3600))/3600);
        minutes = Math.floor((diff - days*(24 * 3600) - hours*3600) / 60);
        return days + "d, " + hours + "h and " + minutes + "m ago";
    }
}

function updateTracks() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://ws.audioscrobbler.com/1.0/user/" + username + "/recenttracks.xml",
        onload: function(responseDetails) {
            var xml = new XML(responseDetails["responseText"].replace(xmlDeclaration, ''));
            doUpdateTracks(xml);
        }
    });
}

function doUpdateTracks(chart) {
    var table = xpath("//table[contains(@class, 'recentList')]//tbody", document).snapshotItem(0);

    if(!table) {
        createRecentlyListenedTracks();
        table = xpath("//table[contains(@class, 'recentList')]//tbody", document).snapshotItem(0);
        if(!table) {
            // Still failed so give up.
            return;
        }
    }

    tablerows = table.rows.length;
    chartrows = chart.track.length();

    if(tablerows < chartrows) {
        for(i = 0; i < (chartrows-tablerows); i++) {
            var row = table.insertRow(0);
            var track = row.insertCell(0);
            var time = row.insertCell(1);
            track.setAttribute("class", "subject");
            time.setAttribute("class", "date");
        }
    } else if(tablerows > chartrows) {
        for(i = 0; i < (tablerows-chartrows); i++) {
            table.deleteRow(0);
        }
    }

    if(chartrows == 0) {
        var row = table.insertRow(0);
        var track = row.insertCell(0);
        var time = row.insertCell(1);
        track.innerHTML = username + " has not scrobbled any tracks recently.";
            track.setAttribute("class", "subject");
            time.setAttribute("class", "date");
    }

    for(i = 0; i < chartrows; i++) {
        artisturl = chart.track[i].url.split("/");
        artisturl = artisturl.slice(0, -2);
        artisturl = artisturl.join("/");
        table.rows[i].cells[0].innerHTML =  "<a href=\"" + artisturl + "\">" + chart.track[i].artist + "</a> – <a href=\"" + chart.track[i].url + "\">" + chart.track[i].name + "</a>";
        // Warning: EVIL HACK AHEAD!
        // Why can't we access the uts parameter here?
        var date = chart.track[i].date.split(" ");
        var day = parseInt(date[0]);
        var month = 0;
        if(date[1].startsWith("Jan")) { month = 0; }
        else if(date[1].startsWith("Feb")) { month = 1; }
        else if(date[1].startsWith("Mar")) { month = 2; }
        else if(date[1].startsWith("Apr")) { month = 3; }
        else if(date[1].startsWith("May")) { month = 4; }
        else if(date[1].startsWith("Jun")) { month = 5; }
        else if(date[1].startsWith("Jul")) { month = 6; }
        else if(date[1].startsWith("Aug")) { month = 7; }
        else if(date[1].startsWith("Sep")) { month = 8; }
        else if(date[1].startsWith("Oct")) { month = 9; }
        else if(date[1].startsWith("Nov")) { month = 10; }
        else if(date[1].startsWith("Dec")) { month = 11; }
        var year = parseInt(date[2].substr(0, 4));
        var hour;
        var minute;
        if(date[3].endsWith("am") && parseInt(date[3].split(":")[0]) == 12) {
            var hour = 0;
            var minute = parseInt(date[3].split(":")[1].substr(0, 2));
        } else if((date[3].endsWith("am") && parseInt(date[3].split(":")[0]) != 12)
               || (date[3].endsWith("pm") && parseInt(date[3].split(":")[0]) == 12)) {
            var hour = parseInt(date[3].split(":")[0]);
            var minute = parseInt(date[3].split(":")[1].substr(0, 2));
        } else {
            var hour = parseInt(date[3].split(":")[0]) + 12;
            var minute = parseInt(date[3].split(":")[1].substr(0, 2));
        }
        table.rows[i].cells[1].innerHTML = getFuzzyTime(new Date(Date.UTC(year, month, day, hour, minute)).getTime() / 1000.0);
    }

    updateTimer();
}

function updateTimer() {
    var element;
    var info = xpath("//div[contains(@id, 'recenttracks')]//div[contains(@class, 'chartmore')]", document).snapshotItem(0);

    if(info) {
        len = info.childNodes.length;

        for(i = info.childNodes.length - 1; i >= 0; i--) {
            if(info.childNodes[i].nodeName == "SPAN" && info.childNodes[i].textContent.startsWith("Updating")) {
                element = info.childNodes[i];
                break;
            }
        }

        if(!element) {
            element = document.createElement('span');
            element.setAttribute("class", "li");
            info.appendChild(element);
        }
    }

    timeout = timeout - 5;
    if(timeout > 0) {
        if(element) { element.innerHTML = "Updating in " + timeout + " seconds..."; }
        setTimeout(updateTimer, 5000);
    } else {
        timeout = 60;
        if(element) { element.innerHTML = "Updating..."; }
        updateTracks();
    }
}

(function() {
    server = getServer();
    username = getUserName(server, getPageMajorType(server));
    if(getPageType(server, getPageMajorType(server), username) != "front") {
        return;
    }
    timeout = 60;
    updateTracks();
})();
