// ==UserScript==
// @name       Categorization Map
// @version    0.6
// @description  enter something useful
// @updateurl  http://userscripts.org/scripts/source/487014.user.js
// @match      https://www.mturkcontent.com/dynamic/hit*
// @require    http://code.jquery.com/jquery-1.9.0.min.js
// @copyright  2014+, Tjololo
// ==/UserScript==

var elem = document.getElementsByClassName('span7 ng-scope')[0];
var addy = elem.innerText.split(':')[1];
var api = "";
var zoomlevel = 20;
var googlePrefix = "https://maps.googleapis.com/maps/api/staticmap?markers=size:mid%7Ccolor:red%7C";
var url = googlePrefix + encodeURIComponent(addy.replace(",","")) + "&size=512x512&zoom="+zoomlevel+"&maptype=hybrid&sensor=false";
if (api != "")
    url += "&key="+api;
console.log(url);
var ifrm = document.createElement("img");
ifrm.setAttribute("src", url);
ifrm.setAttribute("id", "map");
ifrm.style.width = 512+"px";
ifrm.style.height = 512+"px";

var zoomlvl = document.createElement("div");
zoomlvl.setAttribute("id","zoom_level");
zoomlvl.innerHTML="Zoom: "+zoomlevel;
elem.appendChild(ifrm);
elem.appendChild(zoomlvl);

var content = document.getElementById("wrapper");
content.tabIndex = "0";
content.focus();

var element = document.getElementById('preview_overlay');
element.parentNode.removeChild(element);

document.onkeydown = showkeycode;
function showkeycode(evt){
    var keycode = evt.keyCode;
    switch (keycode) {
        case 65: //a
            document.getElementById("A - Great for solar").click();
            document.getElementById("mturk_form").submit();
            break;
        case 66: //b
            document.getElementById("B - OK for solar").click();
            document.getElementById("mturk_form").submit();
            break;
        case 67: //c
            document.getElementById("C - Not so good for solar").click();
            document.getElementById("mturk_form").submit();
            break;
        case 68: //d
            document.getElementById("D - Bad for solar").click();
            document.getElementById("mturk_form").submit();
            break;
        case 69: //e
            document.getElementById("E - Cannot find the roof").click();
            document.getElementById("mturk_form").submit();
            break;
        case 13: //enter
            document.getElementById("mturk_form").submit();
            break;
        case 107: //+
            zoomlevel += 1;
            url = googlePrefix + encodeURIComponent(addy.replace(",","")) + "&size=512x512&zoom="+zoomlevel+"&maptype=hybrid&sensor=false";
            console.log(url);
            document.getElementById("map").setAttribute("src", url);
            document.getElementById("zoom_level").innerHTML="Zoom: "+zoomlevel;
            break;
        case 187: //+
            zoomlevel += 1;
            url = googlePrefix + encodeURIComponent(addy.replace(",","")) + "&size=512x512&zoom="+zoomlevel+"&maptype=hybrid&sensor=false";
            console.log(url);
            document.getElementById("map").setAttribute("src", url);
            document.getElementById("zoom_level").innerHTML="Zoom: "+zoomlevel;
            break;
        case 109: //+
            zoomlevel -= 1;
            url = googlePrefix + encodeURIComponent(addy.replace(",","")) + "&size=512x512&zoom="+zoomlevel+"&maptype=hybrid&sensor=false";
            console.log(url);
            document.getElementById("map").setAttribute("src", url);
            document.getElementById("zoom_level").innerHTML="Zoom: "+zoomlevel;
            break;
        case 189: //+
            zoomlevel -= 1;
            url = googlePrefix + encodeURIComponent(addy.replace(",","")) + "&size=512x512&zoom="+zoomlevel+"&maptype=hybrid&sensor=false";
            console.log(url);
            document.getElementById("map").setAttribute("src", url);
            document.getElementById("zoom_level").innerHTML="Zoom: "+zoomlevel;
            break;
    }
}