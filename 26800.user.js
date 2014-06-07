// ==UserScript==
// @name           MangaFilter
// @namespace      Gyz
// @description    Allows you to filter mangas from the recent updates list so you only see the mangas you're interested in
// @include        http://www.onemanga.com/recent/
// ==/UserScript==

var mangas = eval(GM_getValue("mangas", uneval({})));

var save = function() {
    GM_setValue("mangas", uneval(mangas));
}

if(typeof mangas.filters == "undefined") {
    mangas.filters = [];
    save();
}

var now = new Date();
mangas.last_seen = now.getTime();
save();

var getMangaTitle = function(dataNode) {
    var anchor = dataNode.getElementsByTagName("a")[0];
    var reg = /^http:\/\/[^\/]*\/([^\/]*)\//;
    var result = anchor.href.match(reg);
    
    if(typeof result[1] != "undefined") {
        return result[1];
    }
    
    return null;
}

var matchFilter = function(title) {
    for(var i = 0; i < mangas.filters.length;i++) {
        if(mangas.filters[i] == title) return true;
    }
    return false;
}

var reAlternate = function() {
    var r = table.getElementsByTagName("tr");
    var index = 1;
    for(var i = 1;i < r.length;i++) {
        if(r[i].style.display == "none") continue;
        r[i].className = index % 2 == 1? "bg01": "bg02";
        index++;
    }
}

var addFilterHandler = function(title, node) {
    node.addEventListener("click", function() {
        mangas.filters.push(title);
        mangas.filters.sort();
        save();
        doFilter();
    }, true);
}

var addUnFilterHandler = function(title, node) {
    node.addEventListener("click", function () {
        var index = -1;
        for(var i = 0; i < mangas.filters.length; i++) {
            if(mangas.filters[i] == title) {
                index = i;
                break;
            }
        }
        if(index != -1) {
            mangas.filters.splice(index, 1);
            save();
            doFilter();
        }
    }, true);
}

var doFilter = function() {
    var rows = table.getElementsByTagName("tr");
    for(var i = 1; i < rows.length;i++) {
        var dataNodes = rows[i].getElementsByTagName("td");
        if(dataNodes.length != 2) continue;
        var title = getMangaTitle(dataNodes[1]);
    
        var strip = dataNodes[1].getElementsByTagName("span");
        for(var j = 0;j < strip.length;j++) {
            if(strip[j].className == "filterlink") {
                dataNodes[1].removeChild(strip[j]);
            }
        }
    
        if(matchFilter(title)) {
            rows[i].style.display = "none";
        } else {
            rows[i].style.display = "";
            var linkspan = document.createElement("span");
            linkspan.className = "filterlink";
            linkspan.innerHTML = "&nbsp;[<a style='cursor: pointer'>X</a>]";
            addFilterHandler(title, linkspan.getElementsByTagName("a")[0]);
            dataNodes[1].appendChild(linkspan);
        }
    }
    
    reAlternate();
    
    var filtertable = table.nextSibling;
    if(filtertable.className == "filtertable") {
        table.parentNode.removeChild(filtertable);
    }
    filtertable = document.createElement("div");
    filtertable.className = "filtertable";
    filtertable.innerHTML = "<table class='ch-table'><tr><th>Filtered Manga</th><th>Action</th></tr></table>";
    if(table.nextSibling == null) {
        table.parentNode.appendChild(filtertable);
    } else {
        table.parentNode.insertBefore(filtertable, table.nextSibling);
    }
    
    var filterRow = filtertable.getElementsByTagName("tr")[0];
    
    for(var i = 0; i < mangas.filters.length; i++) {
        var row = document.createElement("tr");
        row.className = i % 2 == 0 ? "bg01": "bg02";
        var titlenode = document.createElement("td");
        titlenode.innerHTML = mangas.filters[i].replace(/_/g, " ");
        var actionnode = document.createElement("td");
        actionnode.innerHTML = "[ <a style='cursor: pointer'>Remove Filter</a> ]";
        addUnFilterHandler(mangas.filters[i], actionnode.getElementsByTagName("a")[0]);
        row.appendChild(titlenode);
        row.appendChild(actionnode);
        filterRow.parentNode.appendChild(row);
    }
}

var main_content = document.getElementById("content-main");
var table = null;
if(typeof(main_content) != "undefined")
{
    table = main_content.getElementsByTagName("table")[0];
    if(typeof(table) != "undefined") {
        doFilter();
    }
}
