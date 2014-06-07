// ==UserScript==
// @name       movie2k-streamcloud-autoselect
// @include http://www.movie2k.to/*
// @version    0.21
// @description  Selects automatically Streamcloud as streaming-service
// @run-at document-end
// @copyright  2013, b7r
// @grant       none
// ==/UserScript==
if(window.location.href.search('html') != -1) {
    var l = document.getElementById('menu').getElementsByTagName('a');
    for (var i=0; i<l.length; i++) {
        l[i].onclick = function() {
            document.cookie = 'c=user';
        }; 
    }
    if(readCookie('c') != 'user') {
        for (var i=0; i<l.length; i++) {
            if(l[i].innerHTML.search('Streamcloud') != -1) {
                if(l[i].parentNode.style.backgroundColor != 'rgb(208, 208, 208)') {
                    l[i].click();
                }
                break;
            }
        }
    }
    document.cookie = 'c=null';
}

function readCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') 
			c = c.substring(1,c.length);
			
		if (c.indexOf(nameEQ) == 0) 
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}