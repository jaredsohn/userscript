// ==UserScript==
// @name Travianstats2phpBB
// @author tamiflu
// @description Adds a little Image link next to phpBB Usernames to a Travian-Statistics Website
// @version 1.2
// @include http://*.foren-city.*
// @include http://*.iphpbb3.com*
// @include http//*.siteboard.de*
// ==/UserScript==

var foo = GM_getValue(window.location.hostname, -1);
if ((foo == -1) || (foo == "")) {
	bar = prompt("Please enter travian world for " + window.location.hostname,"");
	if ((bar != "") && (bar != undefined)) {
		GM_setValue(window.location.hostname,bar);
		var welt = bar;
	} else {
		alert("Your input wasn't correct. This script will not work!");
		var welt = "";
	}
} else {
	var welt = foo;
}
document.getElementsByClassName = function(clsName){
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className.indexOf(" ") >= 0){
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++){
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}
var tamiWeltContent = "<div id='tamiLightBoxBg' style='position:fixed; top:0px; left:0px; display:none; -moz-opacity:0.5; opacity:0.5; z-index:0; width:100%; height:100%; background-color:#666;'></div>";
var tamiWorldChanger = document.createElement("a");
tamiWorldChanger.id = "changeWorld";
tamiWorldChanger.href= "javascript:void(0)";
tamiWorldChanger.innerHTML = "Change Travian World" + tamiWeltContent;

if (document.getElementsByClassName("copyright").length > 0) {
	var copyrightCounter = document.getElementsByClassName("copyright").length -1;
	document.getElementsByClassName("copyright")[copyrightCounter].parentNode.appendChild(tamiWorldChanger);
} else if (document.getElementById("wrapfooter").innerHTML != "") {
	document.getElementById("wrapfooter").appendChild(tamiWorldChanger);
}
document.getElementById("changeWorld").addEventListener("click", editWorld, true);

function editWorld (baz) {
	bar = prompt("Please enter travian world for " + window.location.hostname,welt);
	if ((bar != "") && (bar != undefined)) {
	GM_setValue(window.location.hostname,bar);
	return true;
	} else {
		GM_setValue(window.location.hostname,"");
	return false;	
	}
}

var travUrl = "http://travian.ping-timeout.de/";
var img = "R0lGODlhDQAJALMPAPX19WKAn+3t7aKyw5SktcLM1snS3LvEzrbC0FNzlOjo6Pz8/OPj4////0Zmhwz/ACH5BAEAAA8ALAAAAAANAAkAAAQ28D3kqnVISjea94OjPc5iBoYpag5gGAEKrBuQ3HdBk8JxVAfBzqEoYowjB4HBZBJ2lEsl84gAADs%3D";
function check () {
	var bTag = document.getElementsByTagName("b");
	var spanTag = document.getElementsByTagName("span");
	var divTag = document.getElementsByTagName("div");
	var pTag = document.getElementsByTagName("p");
	writeAll(bTag);
	writeAll(spanTag);
	writeAll(divTag);
	writeAll(pTag);
}
function writeAll(tag) {
		for (i in tag) {
		if ((tag[i].innerHTML) && ((tag[i].className == "author") || (tag[i].className == "postauthor") || (tag[i].className == "name"))) {
			
			if (tag[i].getElementsByTagName("strong").length > 0) {
					var plainName = removeHTMLTags(tag[i].getElementsByTagName("strong")[0].innerHTML);
					var Statslink = writeLink(plainName,i);
					var old = tag[i].getElementsByTagName("strong")[0].innerHTML;
					tag[i].getElementsByTagName("strong")[0].innerHTML = "<span name='TravianName'>" + old + "</span> " + writeLink(plainName,i);
				}
				
				
			 else {
			var Statlink = writeLink(tag[i].innerHTML.replace(/<.*?>/gi, ''),i);
			var old = tag[i].innerHTML;
			tag[i].innerHTML = "<span name='TravianName'>" + old + "</span> " + Statlink;
			}
		}
	}
}
function writeLink(nick,i) {
	var statistik = "<a href='"+ travUrl + "index.php?m=spielersuche&s=" + nick + "&w=" + welt + "' target='_self' id='travAvatar' name='travAvatar' style='z-index:5; position:relative;'>"
					+ "<img src='data:image/gif;base64," + img + "' alt='statistik anzeigen' style='border:none; z-index:5;' onmouseover='this.nextSibling.style.display = \"block\"; document.getElementById(\"tamiLightBoxBg\").style.display=\"block\"' onmouseout='this.nextSibling.style.display = \"none\"; document.getElementById(\"tamiLightBoxBg\").style.display=\"none\"'>" + writeAvatar(nick,i) + "</a>";
	return statistik;
}
function writeAvatar(nick,i) {
	var avatarImg = "<div style='position:absolute; display:none;' id='TravTamiflu"+i+"' name='TravTamiflu'><img src='" + travUrl + "phpbb3/" + welt + "/" + nick + ".gif' alt=''></div>";
	return avatarImg;
}
function removeHTMLTags(htmlcode){
		return htmlcode.replace(/<\/?[^>]+(>|$)/g, "");
}
check();