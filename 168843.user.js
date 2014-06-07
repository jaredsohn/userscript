// ==UserScript==
// @name       thesecretknots.com - arrow keys browsing
// @namespace  http://userscripts.org/scripts/show/168843
// @version    1.0
// @description  enable browsing the website with the left and right arrow keys
// @match      http://www.thesecretknots.com/*
// ==/UserScript==


(function () {
    
if (document.getElementById('comic-1')) {
    var comic = document.getElementById('comic-1');
    document.onkeyup = function (e) {
        								if (document.getElementsByClassName('nav-next')[0].childNodes[0] && e.keyCode === 39 && window.pageYOffset + window.innerHeight * 3/4 < comic.offsetHeight + comic.offsetTop) {
             								 window.location.href = document.getElementsByClassName('nav-next')[0].childNodes[0].href
         								 }
       			                    	 else if (document.getElementsByClassName('nav-previous')[0].childNodes[0] && e.keyCode === 37 && window.pageYOffset + window.innerHeight * 3/4 < comic.offsetHeight + comic.offsetTop) {
                                    	          window.location.href = document.getElementsByClassName('nav-previous')[0].childNodes[0].href
                                    	 }
            	                     }
        }
})();