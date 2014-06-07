// ==UserScript==
// @name           kayako_tid_linker
// @namespace      kayako_tid_linker
// @description    kayako_tid_linker
// ==/UserScript==

// Kayako TID linker / joehahn@gmail.com / 20120204

function joinNodeLists() {
    if (!arguments.length) {
        return null;
    }
    var newList = new Array();
    for (var i = 0; i < arguments.length; i++) {
        var list = arguments[i];
        for (var j = 0; j < list.length; j++) {
            newList[newList.length] = list[j];
        }
    }
    return newList;
}

function kayajoe() {
    var n = document.getElementsByClassName("ticketnotecontent");
    var m = document.getElementsByClassName("mediumtext");
    nm = joinNodeLists(n, m);
    for (i in nm) {
 	  nm[i].innerHTML = nm[i].innerHTML.replace(/[a-z]{3}-\d{6}/gi, '<a href="./index.php?_m=tickets&_a=search&type=ticketid&ticketid=' + "$&" + '"><b>' + "$&" + '</b></a>');
	
     }
}
kayajoe();