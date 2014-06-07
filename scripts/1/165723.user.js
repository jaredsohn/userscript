// ==UserScript==
// @name        Hide Board Messages
// @namespace   AE
// @description Getting rid of DV
// @include     http://mira.astroempires.com/board.aspx
// @include     http://mira.astroempires.com/board.aspx?folder=0*
// @version     1
// @grant       none
// ==/UserScript==

var id, script, cIndex, cList, c, trIndex, trList, tr, aIndex, aList, a, toggle, tdIndex, tdList, td, div;

id = "12135";

script = document.createElement("script");
script.type = "text/javascript";
script.innerHTML = 'function toggleDiv(id) { var div = document.getElementById(id); var divT = document.getElementById(id + "T");  if(div && divT) { if(div.style.display == "none") { div.style.display = "inline"; divT.innerHTML = "Hide"; } else { div.style.display ="none"; divT.innerHTML = "Show"; } } }';
document.body.appendChild(script);

cList = document.getElementsByClassName("layout listing board-listing");
for (cIndex = 0; cIndex < cList.length; ++cIndex) {
    c = cList[cIndex];
    trList = c.getElementsByTagName("tr");
    for (trIndex = 0; trIndex < trList.length; ++trIndex) {
        tr = trList[trIndex];
        if (tr) {
            aList = tr.getElementsByTagName("a");
            for (aIndex = 0; aIndex < aList.length; ++aIndex) {
                a = aList[aIndex]
                if (a && a.getAttribute("href") == "profile.aspx?player=" + id) {
                    toggle = tr.ownerDocument.createElement("div");
                    toggle.innerHTML = "Show";
                    toggle.setAttribute("id", "dv" + trIndex + "T");
                    toggle.setAttribute("onClick", 'toggleDiv("dv' + trIndex + '");');
                    tr.firstChild.appendChild(toggle);
                    
                    tr = trList[trIndex + 1];
                    if (tr) {
                        tdList = tr.getElementsByTagName("td");
                        for (tdIndex = 0; tdIndex < tdList.length; ++tdIndex) {
                            td = tdList[tdIndex];
                            if (td) {
                                div = td.ownerDocument.createElement("div");
                                div.innerHTML = td.innerHTML;
                                div.setAttribute("id", "dv" + trIndex);
                                div.style.display = "none";
                                while(td.childNodes.length >= 1) {
                                    td.removeChild(td.firstChild);
                                }
                                td.appendChild(div);
                            }
                        }
                    }
                    ++trIndex;
                }
            }
        }
    }
    break;
}