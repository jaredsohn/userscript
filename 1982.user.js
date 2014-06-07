// ==UserScript==
// @name          Last.fm Chart Changes
// @author        Andrew Wilkinson <andrewjwilkinson@gmail.com>
// @namespace     http://lastfm.indiegigs.co.uk/
// @version       2.2.1
// @description	  Show chart changes over a period of time for user charts on Last.fm
// @include       http://www.last.fm/user/*
// @include       http://beta.last.fm/user/*
// @include       http://www.lastfm.*/user/*
// @exclude       http://www.last.fm/user/*/tags/*
// @exclude       http://www.lastfm.*/user/*/tags/*
// ==/UserScript==

var overall_history = "http://lastfm.indiegigs.co.uk/charts";
var version_path = "http://lastfm.indiegigs.co.uk/static/version.txt";
var version = 221;

var chart_limits = new Array();
chart_limits["user"] = 50;
chart_limits["group"] = 10;

var processing = {};
var charttypes = {};

//Regular Expression to strip XML declaration prior to new XML()
var xmlDeclaration = /^<\?xml version[^>]+?>/;

String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

String.prototype.endsWith = function(suffix) {
    var startPos = this.length - suffix.length;
    if (startPos < 0) {
        return false;
    }
    return (this.lastIndexOf(suffix, startPos) == startPos);
};

function usePlainStyle() {
    GM_setValue('style', 0);
    document.location.reload();
}
function useColouredStyle() {
    GM_setValue('style', 1);
    document.location.reload();
}

var outofrange = "&nbsp;";
var outofrange_class = "delta"; var outofrange_style = "";
var newentry = "&nbsp;";
var newentry_class = "delta"; var newentry_style = "";
var movedown = "&#x25BC; ";
var movedown_end = "";
var movedown_class = "delta"; var movedown_style = "";
var moveup = "&#x25B2; ";
var moveup_end = "";
var moveup_class = "delta rise"; var moveup_style = "";
var nonmover = "&#x2013;";
var nonmover_class = "delta"; var nonmover_style = "";

if(GM_getValue('style') == 1) {
    outofrange = "&nbsp;";
    outofrange_class = "delta"; outofrange_style = "";
    newentry = "&#x25B2;&nbsp;&nbsp;";
    newentry_class = "delta"; newentry_style = "color: #71B7E6;";
    movedown = "&#x25BC; ";
    movedown_end = "";
    movedown_class = "delta"; movedown_style = "color: #D51007;";
    moveup = "&#x25B2; ";
    moveup_end = "";
    moveup_class = "delta rise"; moveup_style = "color: #66BD30;";
    nonmover = "&#x2013;&nbsp;&nbsp;";
    nonmover_class = "delta"; nonmover_style = "color: #D5D535;";

    GM_registerMenuCommand("Use the plain style.", usePlainStyle);
} else {
    GM_registerMenuCommand("Use the coloured style.", useColouredStyle);
}

function xpath(query, doc) {
    return document.evaluate(query, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function preprocessChart(type, chart) {
    var arr = new Array();
    for(var i=0; i<chart.length; i++) {
        name = chart[i].getElementsByTagName("url")[0].textContent;
        arr[name.toLowerCase()] = parseInt(chart[i].getAttribute("rank"));
    }
    return arr;
}

function nameArtistChart(pos) {
    chart = xpath("//div[contains(@class, 'chart')]/table", document).snapshotItem(pos);
    chart.id = "artistchart";
}

function nameTrackChart(pos) {
    chart = xpath("//div[contains(@class, 'chart')]/table", document).snapshotItem(pos);
    chart.id = "trackchart";
}

function doChart(chartid, user, type, chart, maxsize) {
    var i, rows, pos, playbutton, subject, artistcell, multibutton, chartbar, title;

    var parent = xpath("//table[@id='"+chartid+"']/../..", document).snapshotItem(0);

    for(i = 0; i < parent.childNodes.length; i++) {
        if(parent.childNodes[i].className && parent.childNodes[i].className.indexOf("chart") != -1 && parent.childNodes[i].style.display != "none") {
            rows = xpath(".//tr", parent.childNodes[i]);
            break;
        }
    }

    if(rows.snapshotLength > 0 && rows.snapshotItem(0).cells.length != 6)
    {
        return false;
    }

    server = getServer();
    for(i=0; i < rows.snapshotLength; i++) {
        row = rows.snapshotItem(i);
        pos = parseInt(row.cells[0].innerHTML.trim());

        if(type == "artist") {
            poscell = row.cells[0].innerHTML;
            playbutton = row.cells[1].innerHTML;
            subject = xpath(".//div/a/@href", row.cells[2]).snapshotItem(0).value;
            artistcell = row.cells[2].innerHTML;
            lovedcell = row.cells[3].innerHTML;
            multibutton = row.cells[4].innerHTML;
            chartbar = row.cells[5].innerHTML;
        } else if(type == "track") {
            poscell = row.cells[0].innerHTML;
            playbutton = row.cells[1].innerHTML;
            subject = xpath(".//div/a[2]/@href", row.cells[2]).snapshotItem(0).value;
            artistcell = row.cells[2].innerHTML;
            lovedcell = row.cells[3].innerHTML;
            multibutton = row.cells[4].innerHTML;
            chartbar = row.cells[5].innerHTML;
        }
        var url = "http://www.last.fm" + subject;
        title = row.cells[1].title;

        prev = chart[url.toLowerCase()];

        if(!prev && maxsize > 0 && pos > maxsize) {
            change = outofrange;
            chgclass = outofrange_class;
            chgstyle = outofrange_style;
        } else if(!prev) {
            change = newentry;
            chgclass = newentry_class;
            chgstyle = newentry_style;
        } else if(pos > prev) {
            change = movedown + (pos - prev) + movedown_end;
            chgclass = movedown_class;
            chgstyle = movedown_style;
        } else if(pos < prev) {
            change = moveup + (prev - pos) + moveup_end;
            chgclass = moveup_class;
            chgstyle = moveup_style;
        } else if(pos == prev) {
            change = nonmover;
            chgclass = nonmover_class;
            chgstyle = nonmover_style;
        } else {
            chgclass = ""; chgstyle = ""; change = "N/A";
        }

        row.innerHTML = "<td class='"+chgclass+"' style='width: 30px; text-align: left; padding-right: 0px;"+chgstyle+"'>" + change + "</td><td class='positionCell' style='padding-left: 0px;'>" + poscell + "</td><td class='playbuttonCell'>" + playbutton + "<td class='subjectCell' title='"+title+"'>" + artistcell + "</td><td class='lovedCell'>" + lovedcell + "</td><td class='multibuttonCell'>" + multibutton + "</td><td class='chartbarCell'>" + chartbar + "</td>";
    }

    return true;
}

function doChartDate(chart, chdate, weeks, current) {
    var div = document.getElementById(chart+"_date");
    var new_div = false;

    if(!div) {
        div = document.createElement("div");
        new_div = true;
    }

    var chart_selector = xpath("//table[@id='"+chart+"']/../../div[position()=last()]", document).snapshotItem(0);

    div.className = "clearit";
    div.id = chart + "_date";
    var html = "Comparing to: <b>" + chdate + "</b>. ";
    var week_list = weeks.getElementsByTagName("week")
    if(week_list.length > 0) {
        html += " Compare against";
        for(i=0; i<week_list.length; i++) {
            if(parseInt(week_list[i].textContent) == parseInt(current)) {
                html += " <i>" + week_list[i].textContent + "</i>";
            } else {
                html += " <a style='cursor: pointer; text-decoration: underline;' href='javascript:window.gm_wrapped_setValue(\"compareto\", "+week_list[i].textContent+");'>" + week_list[i].textContent + "</a>";
            }
            html += "&nbsp;";
        }
        html += " days ago."
    }

    div.innerHTML = html;
    if(new_div) {
        xpath("//table[@id='"+chart+"']/../../div[position()=last()-1]", document).snapshotItem(0).style.marginBottom = "0px";
        chart_selector.parentNode.insertBefore(div, chart_selector);
    }
}

function getChartType(tabs, majortype, chart) {
    for(var i = 0; i < tabs.snapshotLength; i++) {
        tab = tabs.snapshotItem(i);
        if(tab.className.indexOf("current") != -1) {
            if(tab.className.indexOf("chartweek") != -1) {
                return "week";
            } else if(tab.className.indexOf("chart3month") != -1) {
                return "threemonths";
            } else if(tab.className.indexOf("chart6month") != -1) {
                return "sixmonths";
            } else if(tab.className.indexOf("chartyear") != -1) {
                return "twelvemonths";
            } else if(tab.className.indexOf("chartoverall") != -1) {
                return "overall";
            }
        }
    }
}

function getOverallChart(majortype, chart, user, type) {
    if(processing[chart]) {
        return;
    }

    processing[chart] = true;

    var tabs = xpath("//table[@id='"+chart+"']/../../div/ul/li", document);
    var charttype = getChartType(tabs, majortype, chart);

    if(!charttype)
    {
        GM_log("Unable to determine the " + type + " chart type.");
        return;
    }

    GM_xmlhttpRequest({
        method: 'GET',
        url: overall_history + '/' + user + '/' + type + '/' + charttype + '/' + GM_getValue('compareto', 7),
        onload: function(responseDetails) {
            charttypes[type] = charttype;
            if(responseDetails["responseText"] != "Invalid period.\n")
            {
                var parser = new DOMParser();
                var dom = parser.parseFromString(responseDetails["responseText"], "application/xml");
                var root = dom.getElementsByTagName("lfm")[0];
                if(doChart(chart, user, type, preprocessChart(type, root.getElementsByTagName("top"+type+"s")[0].getElementsByTagName(type)), chart_limits[majortype]))
                {
                    doChartDate(chart, root.getElementsByTagName("date")[0].getAttribute("text"), root.getElementsByTagName("weeks")[0], root.getElementsByTagName("used")[0].textContent);
                }
            }
            processing[chart] = false;

            setTimeout(function () { watchForChartChange(majortype, chart, username, type); }, 15000);
        }
    });
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
    } else if(majortype == "user") {
        var pagetype = path.substr(size, (nextslash == -1 && nextquestion == -1 ? path.length - size : (nextslash == -1 ? nextquestion : nextslash)))

        if(pagetype == "charts" && window.location.href.match(/subtype=tracks/)) {
            return "trackchart";
        } else if(pagetype == "charts" && window.location.href.match(/subtype=albums/)) {
            return "albumchart";
        } else if(pagetype == "charts") {
            return "artistchart";
        }
    }
}

function getServer() {
    path = window.location.href;
    slash = path.substr(7).indexOf("/");
    return path.substr(0, slash+8);
}

function checkVersion() {
    var now = new Date();
    if(GM_getValue('last_version_check') == (now.getDay() * 100000 + now.getMonth() * 1000 + now.getYear())) {
        return;
    }
    GM_xmlhttpRequest({
        method: 'GET',
        url: version_path,
        onload: function(responseDetails) {
            GM_setValue('latest_version', parseInt(responseDetails["responseText"].trim()));
            GM_setValue('last_version_check', (now.getDay() * 100000 + now.getMonth() * 1000 + now.getYear()));
            if(GM_getValue('latest_version') > version) {
                var profile_box = xpath("//div[@class='leftColWrapper']/div[1]", document).snapshotItem(0);
                var div = document.createElement("div");
                div.innerHTML = "<p>The Chart Changes Greasemonkey Script has been updated. Click <a href='http://lastfm.indiegigs.co.uk/chartchanges/files/lastfm.user.js'>here</a> to get the latest version.</p>";
                profile_box.appendChild(div);
            }
        }
    });
}

function watchForChartChange(majortype, chart, username, type)
{
    var tabs = xpath("//table[@id='"+chart+"']/../../div/ul/li", document);
    var charttype = getChartType(tabs, majortype, chart);
    if(charttype != charttypes[type]) {
        getOverallChart(majortype, chart, username, type);
    } else {
        setTimeout(function () { watchForChartChange(majortype, chart, username, type); }, 15000);
    }
}

(function() {
    // Give main page access to GM_setValue
    unsafeWindow.gm_wrapped_setValue = function (key, value) { window.setTimeout(function () { GM_setValue(key, value);  window.location.reload(); }, 0); };

    checkVersion();

    server = getServer();
    if(!server) { return; }
    majortype = getPageMajorType(server);
    if(!majortype) { return; }
    username = getUserName(server, majortype);
    if(!username) { return; }

    page = getPageType(server, majortype, username);

    if(page == "front") {
        nameArtistChart(0);
        getOverallChart(majortype, "artistchart", username, "artist");
        nameTrackChart(1);
        getOverallChart(majortype, "trackchart", username, "track");

        //setInterval(function () { watchForChartChange(majortype, "artistchart", username, "artist");
        //                         watchForChartChange(majortype, "trackchart", username, "track"); }, 15000);
    } else if(page == "artistchart") {
        nameArtistChart(0);
        getOverallChart(majortype, "artistchart", username, "artist");

        //setInterval(function () { watchForChartChange(majortype, "artistchart", username, "artist"); }, 15000);
    }else if(page == "trackchart") {
        nameTrackChart(0);
        getOverallChart(majortype, "trackchart", username, "track");

       // setInterval(function () { watchForChartChange(majortype, "trackchart", username, "track"); }, 15000);
    }
})();
