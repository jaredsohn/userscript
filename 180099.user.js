// ==UserScript==
// @name       Minethings Foreign Spread Links
// @version    0.1
// @description  Enjoy, Ahmedillo
// @match      http://*.minethings.com/items/view/*
// @copyright  2013+, Hotrootsoup
// ==/UserScript==

var foreignTable;
var rows;
var names = [];
var cityLinks;

try {
    foreignTable = document.getElementsByClassName("itemview-table")[4];
    cityLinks = document.getElementById("sub1").getElementsByTagName("a");
}
catch (e) {
    console.log("Foreign Spread is either running on a page it shouldn't, or there is no Foreign Spread table");
    return;
}

if (!foreignTable || !cityLinks) {
    return;
}

rows = foreignTable.getElementsByTagName("tr");
for (i=rows.length - 1; i>0; i--) {
    names.push(rows[i]);
}

for (i=0; i<names.length; i++) {
    (function() {
        var j = i;
    	var tName = names[j].childNodes[0].innerHTML;
        names[j].childNodes[0].innerHTML = "";
    	var link = document.createElement("a");
        link.href = "javascript: return false;";
        link.innerHTML = tName;
        names[j].childNodes[0].appendChild(link);
        link.addEventListener("click", function() {
            for (k=0; k<cityLinks.length - 2; k++) {
                if (cityLinks[k].innerHTML.indexOf(tName) !== -1) {
                    cityLinks[k].click();
                    return;
                }
            }
        });
    })();
}