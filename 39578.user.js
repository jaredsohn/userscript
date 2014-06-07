// ==UserScript==
// @name           Anime Music Lyric Getter
// @namespace      System
// @include        http*/*.animelyrics.com/*.*
// ==/UserScript==

/*
 * @author Bruno Leonardo Michels
 * @profile http://www.orkut.com/Profile.aspx?uid=11584069900845257050
 */


var LyricContainer = document.createElement("div");
LyricContainer.id = "transl";
LyricContainer.style.position = "fixed";
LyricContainer.style.zIndex = 100;
LyricContainer.style.backgroundColor = "black";
LyricContainer.style.width = "100%";
LyricContainer.style.color = "white";
LyricContainer.style.minHeight = "100%";

var TableContainer = document.getElementById("content").getElementsByTagName("table");
var TableContent = TableContainer[0];
TableContent = TableContent.getElementsByTagName("table")[0];

var td = TableContent.getElementsByTagName("td");
var text = text2 = "";
for (i = 0; i < td.length; ++i)
{
    if (td[i].className == "romaji")
    {
        text += td[i].innerHTML.replace(/<.*?>/ig, "");
        text += "\r\n";
    }
    else
    {
        text2 += td[i].innerHTML.replace(/<.*?>/ig, "");
        text2 += "\r\n";
    }
}

var txtArea = document.createElement("textarea");
txtArea.innerHTML = text;
txtArea.style.backgroundColor = "black";
txtArea.style.color = "white";
txtArea.style.width = "100%";
txtArea.style.height = "300px";
txtArea.style.border = "0";
LyricContainer.appendChild(txtArea);

LyricContainer.appendChild(document.createElement("hr"));

var txtArea2 = document.createElement("textarea");
txtArea2.innerHTML = text2;
txtArea2.style.backgroundColor = "black";
txtArea2.style.color = "white";
txtArea2.style.width = "100%";
txtArea2.style.height = "300px";
txtArea2.style.border = "0";
LyricContainer.appendChild(txtArea2);

LyricContainer.appendChild(document.createElement("hr"));

var closediv = document.createElement("div");
closediv.style.width = "100%";
closediv.style.textAlign = "center";
closediv.style.backgroundColor = "black";
closediv.style.color = "red";
closediv.innerHTML = "Close x";
closediv.style.cursor = "pointer";
closediv.addEventListener("click", function () { document.getElementById("transl").style.display = "none" }, false);
LyricContainer.appendChild(closediv);

document.body.insertBefore(LyricContainer, document.body.firstChild);