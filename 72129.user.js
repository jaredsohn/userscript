// ==UserScript==
// @name           Online Document Viewer (pdf,doc,xls,ppt,odt,ods,odp,...)
// @namespace      
// @include        /^https?://.*/
// @exclude        /^https?://docs.google.com/.*/
// @grant          none
// @version        1.6
// based on http://userscripts.org/scripts/show/59557 by Koonies
// ==/UserScript==

(function(){
    var l = document.getElementsByTagName("a");
    var i = l.length; 
    while (i--) {
      if (l[i].href.match(/^https?:([^?]+|[^:]+)\.(pdf|ps|eps|doc|docx|xls|xlsx|ppt|pptx|pps|odt|sxw|tif|tiff)$/i)) {
        var a = document.createElement("a");
        a.href = 'http://docs.google.com/viewer?url=' + escape(l[i].href);

        var ico = document.createElement("img");
        ico.src = "http://www.google.com/favicon.ico";
        ico.setAttribute("style", "border-style: none; vertical-align: text-bottom; height: 1em");

        a.appendChild(ico);

		var space = document.createTextNode(" ");

        l[i].parentNode.insertBefore(a, l[i].nextSibling);
        l[i].parentNode.insertBefore(space, l[i].nextSibling);
      }
      else if (l[i].href.match(/^https?:([^?]+|[^:]+)\.(ods|odp|odg|sxc|sxi|sxd)$/i)) {
        var a = document.createElement("a");
        a.href = 'http://viewdocsonline.com/view.php?url=' + l[i].href;
		
        var ico = document.createElement("img");
        ico.src = "http://viewdocsonline.com/favicon.ico";
        ico.setAttribute("style", "border-style: none; vertical-align: text-bottom; height: 1em");
		
        a.appendChild(ico);
		
		var space = document.createTextNode(" ");

        l[i].parentNode.insertBefore(a, l[i].nextSibling);
        l[i].parentNode.insertBefore(space, l[i].nextSibling);
      }
      else if (l[i].href.match(/^https?:([^?]+|[^:]+)\.(bmp|ppm|xpm)$/i)) {
        var a = document.createElement("a");
        a.href = 'http://vuzit.com/view?url=' + escape(l[i].href);
		
        var ico = document.createElement("img");
        ico.src = "http://vuzit.com/favicon.ico";
        ico.setAttribute("style", "border-style: none; vertical-align: text-bottom; height: 1em");
		
        a.appendChild(ico);
		
		var space = document.createTextNode(" ");

        l[i].parentNode.insertBefore(a, l[i].nextSibling);
        l[i].parentNode.insertBefore(space, l[i].nextSibling);
      }
    }
})();
