// ==UserScript==
// @name			mst
// @description		mam October 2011.
// @author			mst
// @include     https://docs.google.com/file/*


// ==/UserScript==

function appendDownloadLink() {
	var scripts = document.getElementsByTagName('script');
	var hd_url = null;
        var low_url = null;
        var thumb_url = null;

        for (var i=0; i<scripts.length; i++) {
		var html = scripts[i].innerHTML;
		var start = html.indexOf('media":{"content');
var start2 = html.indexOf('ccOverride');
		if (start != -1) {
			hd_url = html.substring(start,start2);
			break;
		}
	}
        

alert(i);
 
            alert(scripts[4].innerHTML);
		
		
	     

}

window.setTimeout(appendDownloadLink, 10);