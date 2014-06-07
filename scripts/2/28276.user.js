// ==UserScript==
// @name           Travian TSU info v1.0
// @author                 FreeWare <freeware_ (at) mail (dot) ru>
// @namespace      FreeWare
// @description    Adds "Travian Server Utils" button next to each player or alliance
// @include        http://*.travian.*/*
// @exclude        http://forum.travian.*
// @exclude        http://www.travian.*
// ==/UserScript==

function getServerName() {
        return location.href.match(/([\w]+[.]travian.[\w]+([.][\w]+)?)/i)[1];
}
var url;

var w = window.innerWidth;;
var h = window.innerHeight;

var popW = 800, popH = 600;

var leftPos = (w-popW)/2, topPos = (h-popH)/2;
var out = "";

function append(elem, color) {  
        var child = document.createElement("a");
        child.setAttribute("onclick", "window.open('" + url + "', new Date().getTime(), 'scrollbars=1, fullscreen =\"yes\"'); return false;"); //width="+popW+",height="+popH+",top="+topPos+",left="+leftPos+"
        child.setAttribute("href", url);
        child.setAttribute("style", "display: inline; margin-left: 5px; color: " + color + ";");
        child.innerHTML = "#";
        elem.parentNode.insertBefore(child,elem.nextSibling);
}

var ttt,loc;
loc = location+"!";

for (var i = 0; i < document.links.length; i++) {
        var a = document.links[i];
        var server = getServerName();
        if (a.parentNode.className != 'txt_menue' && a.parentNode.className != 'menu' ) {
                if (a.getAttribute('href').search(/allianz[.]php[?]aid=/i) != -1) {
                        var who = a.getAttribute('href').replace(/allianz[.]php[?]aid=/, '');

ttt = loc.substring(loc.indexOf("travian")+8);
ttt = ttt.substring(0,ttt.indexOf("/")) + loc.charAt(loc.indexOf(".")-1);
url = "http://www.travutils.com/en/?s="+ttt+"&ida="+who+"";
                        append(a, '#6F84FF');                   
                } else if (a.getAttribute('href').search(/spieler[.]php[?]uid=/i) != -1) {
                        var who = a.getAttribute('href').replace(/spieler[.]php[?]uid=/, '');
ttt = loc.substring(loc.indexOf("travian")+8);
ttt = ttt.substring(0,ttt.indexOf("/")) + loc.charAt(loc.indexOf(".")-1);
url = "http://www.travutils.com/en/?s="+ttt+"&idu="+who+"";
                        append(a, '#17A3FF');
                }
        }
}