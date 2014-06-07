// ==UserScript==
// @name           exotoBlock
// @namespace      none
// @description    removes all posts on lupa.cz from exotopedia author(s)
// @date           2012-07-24
// @author         exotoBlock
// @include        http://www.lupa.cz/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

var main = function () {
    var authors = ["Daniel Dočekal"];

    if (typeof(Storage) !== "undefined") {
	if (localStorage.lupaAuthors) {
	    var authors = Array(localStorage.lupaAuthors);
	} else {
	    localStorage.lupaAuthors = authors;
	}
    }

    for (j in authors) {
	var elems = $("a:contains(" + authors[j] + ")").parent().parent();
	for (var i = 0; i < elems.length; i++) {
	    elems[i].style.visibility = "hidden";
	}
    }

}

var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
