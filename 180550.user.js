// ==UserScript==
// @name       duokanoldbbs
// @namespace  http://userscripts.org/scripts/show/180550
// @version    0.1
// @description  enter something useful
// @include    http*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==

$(document).ready(function() {
	
    var reg = /http:\/\/(www\.|bbs\.|bbs_old\.|)duokan\.com\/forum\/[\s\S]+/;
	var arr = $('a');
    var url = document.URL;
    if (url.search('&action=printable') != -1) {
        self.location.href = url.split('&action=printable')[0];
      //  break;
    };
	for (var i = 0;i < arr.length;i++) {
        var href = arr[i].href;
        
    	if (reg.exec(arr[i].href)) {
        	$(arr[i]).attr('href',href.replace(reg.exec(href)[1],'bbs_old.'));
    	}
	};
    
})