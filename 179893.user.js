// ==UserScript==
// @name        Yahoo Mail Enlarge Darken
// @namespace   http://userscripts.org
// @description Yahoo Mail Enlarge Darken
// @include     http://*.mail.yahoo.com/*
// @version     3
// @grant       none
// ==/UserScript==

console.log(document.location.href);

function deleteSky() {
    var elements = document.getElementsByClassName("sky-ad");
    if (elements.length > 0) {
        elements[0].innerHTML = '';
        //console.log("Deleted Sky-Ad!");
    }
}

deleteSky();

function redo() {
	setInterval(function() {
	    console.log("Doing");
	}, 10000000);
}

function removeMe(elem) {
    parent = elem.parentNode;
    parent.removeChild(elem);
}

function delclass(name) {
    var elements = document.getElementsByClassName(name);
    if (elements.length > 0) {
        elements[0].innerHTML="&nbsp;";
    }
}
function delid(name) {
    var id = document.getElementById(name);
    if (id != null) {
        id.innerHTML = "";
    }
}

//document.body.style.background = "#ccccff"; 
if (document.location.href.match(/(message)|(compose)/)) {
    var elements = document.getElementsByClassName("navigation");
    if (elements.length > 0) {
        elements[0].innerHTML = '';
    }
    var id = document.getElementById("globalbuttonbartop");
    if (id != null) {
        id.innerHTML = "";
    }
    var elements = document.getElementsByClassName("layoutfixer");
    if (elements.length > 0) {
        elements[0].innerHTML="<td>&nbsp;</td><td width=100%>&nbsp;</td><td>&nbsp;</td>";
    }
    // top page contents
    //var elements = document.getElementsByClassName("uh");
    //if (elements.length > 0) {
    //    elements[0].innerHTML="&nbsp;";
    //}
    // sponsored link
    var elements = document.getElementsByClassName("mb");
    if (elements.length > 0) {
        elements[0].innerHTML="&nbsp;";
    }
    // toolbar footer
    var elements = document.getElementsByClassName("toolbar ft");
    if (elements.length > 0) {
        elements[0].innerHTML="&nbsp;";
    }
    //delclass("navcontainer");
} else {
    var elements = document.getElementsByClassName("layoutfixer");
    if (elements.length > 0) {
        //elements[0].innerHTML='<td class="c1">&nbsp;</td><td class="c2">&nbsp;</td><td width="1px">&nbsp;</td>';
        elements[0].innerHTML='<td width="25%">&nbsp;</td><td width="75%">&nbsp;</td><td width="1px">&nbsp;</td>';
    }
    var elements = document.getElementsByClassName("mlink");
    for (i=0; i< elements.length > 0; i++) {
        var e = elements[i];
        if (i % 2 == 1) {
            //console.log("mlink:" + e);
            //console.log(e.style);
            e.style.overflow = "visible";
        } else {
            e.style.textOverflow = "ellipsis";
            e.style.whiteSpace = "nowrap";
        }
    }
    var elements = document.getElementsByClassName("mb");
    if (elements.length > 0) {
        elements[0].style.visibility="collapse";
    }
}
delid("upsell");

document.body.style = 'min-width: 0;';

console.log(document.body);
setInterval(deleteSky, 500);

console.log("Done!");
