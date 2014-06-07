// ==UserScript==
// @name       mlookdlurl
// @namespace  http://userscripts.org/scripts/show/180403
// @version    0.3
// @description  enter something useful
// @match      http://*.mlook.mobi/*
// @exclude	   http://*.mlook.mobi/forum/*
// ==/UserScript==


function dlurl() {
var url = document.URL;
var reg = /http:\/\/(www\.|)mlook\.mobi\/book\/info\/(\d*)/;
 if ((url.search(/info/g) != -1) && (url.search(/doubanbook/g) == -1)) {
        
        self.location.href = reg.exec(url)[2]+'?rel=doubanbook2mlook';
    }
}
$(document).ready(function() {
    dlurl();
    var arr = $('a');
    
	for (var i = 0;i < arr.length;i++) {
        href = arr[i].href;
    	if (href.search(/info/g)!=-1) {
        	$(arr[i]).attr("href",href+"?rel=doubanbook2mlook");
    	}
	};
    
})
