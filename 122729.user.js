// ==UserScript==
// @name	ISWC-Net Assistant
// @namespace	mb.kovacsur
// @version	2012-01-09
// @author	Kovács Endre János
// @include	http://iswcnet.cisac.org/iswcnet/MWI/result/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
//**************************************************************************//

var scr = document.createElement("script");
scr.textContent = "(" + ISWCNet_thing + ")();";
document.body.appendChild(scr);

function ISWCNet_thing() {
    var roles = {};

    function build_tree(role) {
        for (var w in works) {
            for (var a in works[w].artists) {
                if (works[w].artists[a].role == role) {
                    if (!(roles[role][works[w].artists[a].ipi])) {
                        roles[role][works[w].artists[a].ipi] = {};
                        roles[role][works[w].artists[a].ipi].works = {};
                    }
                    roles[role][works[w].artists[a].ipi].name = works[w].artists[a].name;
                    roles[role][works[w].artists[a].ipi].works[works[w].iswc] = {
                        "title": works[w].title,
                        "duration": works[w].duration
                    }
                }
            }
        }
    }

    function print_roles() {
        var d = $('<div id="roles-list"></div>');
        for (var r in roles) {
            d.append($("<h2></h2>").text("Role: " + r));

            //sort artists alphabetically
            var sort_keys = [];
            for (var i in roles[r]) sort_keys.push({
                "name": roles[r][i].name,
                "ipi": i
            });
            sort_keys.sort(compare_artist);

            for (var i in sort_keys) {
                d.append($("<h3></h3>").text(roles[r][sort_keys[i].ipi].name + " (IPI: " + sort_keys[i].ipi + ")"));
                var tb = $('<tbody></tbody>');
                for (var w in roles[r][sort_keys[i].ipi].works) {
                    tb.append(
                        $("<tr></tr>").append(
                            $("<td></td>").text(roles[r][sort_keys[i].ipi].works[w].title), 
                            $("<td></td>").text(w), 
                            $("<td></td>").text(roles[r][sort_keys[i].ipi].works[w].duration)
                        )
                    );
                }
                var t = $('<table border="1" style="width:100%" id="' + r + '-' + sort_keys[i].ipi + '-works"><thead><td style="width:65%">Title</td><td style="width:20%">ISWC</td><td style="width:15%">Duration</td></thead></table>').append(tb);
                d.append(t);
            }
        }
        return d;
    }

    function compare_artist(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }

    var works = new Array();
    $("table.list").find("td.ResultRecordHeader2").each(function () {
        var title = $(this).next().find("a").text();
        var workinfo = $(this).next().next().find("td.workinfo");
        var match = $(workinfo[0]).text().match(/ISWC\:\s*(T-[0-9.-]+)/);
        var iswc = match ? match[1] : "";
        match = $(workinfo[1]).text().match(/Duration\:\s*([0-9]{2}\:[0-9]{2}\:[0-9]{2})/);
        var duration = match ? match[1] : "00:00:00";
        var artists = new Array();
        var artistinfos = $(this).parent().next().next().find("tbody tr");
        artistinfos.each(function (index) {
            if (index < artistinfos.length - 1) {
                var artistinfo = $(this).find("td");
                var name = $(artistinfo[0]).text().trim();
                var ipi = $(artistinfo[1]).text().trim();
                if (ipi == "") ipi = "No IPI <" + name + ">";
                var role = $(artistinfo[2]).text().trim();
                if (!(roles[role])) roles[role] = {};
                artists.push({
                    "name": name,
                    "ipi": ipi,
                    "role": role
                });
            }
        });
        works.push({
            "title": title,
            "duration": duration,
            "iswc": iswc,
            "artists": artists
        });
    })

    // build role->ipi->iswc tree
    for (var r in roles) {
        build_tree(r);
    }

    $("body").append(print_roles());
    $("#roles-list tr:nth-child(odd)").css({"background-color": "#e0e8ff"});
    $("#roles-list td").css({"padding": ".2em"});
    $("#roles-list thead td").css({"font-weight": "bold", "background-color": "#c0c8df", "color": "black"});
    $("#roles-list h2").css({"background-color": "#fff880", "color": "black", "font-size": "2.75em"});
    $("#roles-list h3").css({"background-color": "#102040", "color": "white", "font-size": "1.5em"});
}