// ==UserScript==
// @name           Google Books Minimal UI
// @namespace      666f6f/google/books/miniui
// @description    Minimal UI for Google Books
// @include        http://books.google.fr/*
// ==/UserScript==

(function() {
    var isFull = false;
    var oldHandler = document.getElementById(':4').onclick;
    
    var toggle = function() {

	if (isFull) {
	    document.getElementById('gb-top-search-box').style.display = '';
	    document.getElementById('gb').style.display = '';
	    document.getElementById(':7').style.display = '';
	    isFull = false;
	} else {
	    document.getElementById('gb-top-search-box').style.display = 'none';
	    document.getElementById('gb').style.display = 'none';
	    document.getElementById(':7').style.display = 'none';
	    isFull = true;
	}
	
	oldHandler();
    };

    document.getElementById(':4').onclick = toggle;

    document.getElementsByClassName('kd-appbar')[0].style.padding = '5px 0';
})();