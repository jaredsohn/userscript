// ==UserScript==
// @name           m.aptoide myapp resolver
// @author         Pirlouwi
// @version        0.3
// @namespace      http://
// @updateURL      http://userscripts.org/scripts/show/170629
// @download       http://userscripts.org/scripts/show/170629
// @description    Resolve indirection of the download url inside m.aptoide.com pages.
// @include        http://m.*.*.aptoide.com/*
// ==/UserScript==

var done = false;
var button;

function loadXMLDoc(url)
{
    GM_xmlhttpRequest({
    	method: "GET",
    	accept: 'text/xml',
    	url: url,
    	onload: function(data) {  
            	var parser=new DOMParser();
        		doc=parser.parseFromString(data.response,'text/xml');
                get = doc.getElementsByTagName("get")[0];
                url = get.childNodes[0].nodeValue;
                button[0].setAttribute("href",url);
                button[0].innerText = "Install (.apk)"
    		}
	});
}

(function () {
    var url;
    function myappInsider(e) {
        if (done == true) return;
		done = true;

        button = document.getElementsByClassName("app_install_button");
        var anchorText = button[0].innerText;
        var url = button[0].getAttribute("href");
        
        if (anchorText == "Install"){
            loadXMLDoc(url);
        }
        return;
    }
    
    document.addEventListener('DOMNodeInserted', myappInsider);
    
})();
