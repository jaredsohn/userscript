// ==UserScript==
// @name           Ressis-Symbole
// @namespace      sdgsdgserg
// @include        *.die-staemme.de*forum.php*mode=new*
// @include        *.die-staemme.de*forum.php*answer=true*
// @include        *.die-staemme.de*forum.php*edit_post_id=*
// ==/UserScript==
var holz = document.createElement("td");
var holzc = document.createElement("a");
holzc.setAttribute("onclick", "insertBBcode('message', '[img]http://de54.die-staemme.de/graphic/holz.png[/img]', '');");
holzc.innerHTML = "<img src='http://de54.die-staemme.de/graphic/holz.png'>";
holzc.href = "#";
holz.appendChild(holzc);
document.getElementById("formTable").getElementsByTagName("tr")[1].getElementsByTagName("div")[0].appendChild(holz);

var lehm = document.createElement("td");
var lehmc = document.createElement("a");
lehmc.setAttribute("onclick", "insertBBcode('message', '[img]http://de54.die-staemme.de/graphic/lehm.png[/img]', '');");
lehmc.innerHTML = "<img src='http://de54.die-staemme.de/graphic/lehm.png'>";
lehmc.href = "#";
lehm.appendChild(lehmc);
document.getElementById("formTable").getElementsByTagName("tr")[1].getElementsByTagName("div")[0].appendChild(lehm);

var eisen = document.createElement("td");
var eisenc = document.createElement("a");
eisenc.setAttribute("onclick", "insertBBcode('message', '[img]http://de54.die-staemme.de/graphic/eisen.png[/img]', '');");
eisenc.innerHTML = "<img src='http://de54.die-staemme.de/graphic/eisen.png'>";
eisenc.href = "#";
eisen.appendChild(eisenc);
document.getElementById("formTable").getElementsByTagName("tr")[1].getElementsByTagName("div")[0].appendChild(eisen);