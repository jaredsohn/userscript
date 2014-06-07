// ==UserScript==
// @name          GMailTo
// @namespace     http://lists.shimer.edu/greasemonkey/
// @description	  Opens mailto: hyperlinks in gmail compose
// @include       *
//
// further based on youngpup's extension of it (http://youngpup.net/userscripts/)
// Based on G-Mailto firefox extension at 
// http://www.rabidsquirrel.net/G-Mailto/
// ==/UserScript==

(function() {
 	const COMPOSE_URL = "https://mail.google.com/a/shimer.edu/?view=cm&fs=1&tf=1&";
//  const COMPOSE_URL = "https://gmail.google.com/?dest=https%3A%2F%2Fgmail%2Egoogle%2Ecom%2Fgmail%3Fview%3Dcm%26fs%3D1%26tf%3D1%26"
  
  window.addEventListener("click", function(e) {
    var node = e.target;

    if (e.button > 1)  {
    	return;
	}

    if (node.nodeType == Node.TEXT_NODE) {
      node = node.parentNode;      
    }
    
    if (node.tagName == "A") {
      var to = doPattern(/^mailto\:([^\?]+)/i, node.href);
      var subject = "", cc = "", bcc = "", body = "";
      
      if (to != "") {
        var qs = doPattern(/\?(.+)/, node.href);
        
        if (qs != "") {
          subject = doPattern(/subject=([^&]+)/i, qs);          
          cc = doPattern(/cc=([^&]+)/i, qs);          
          bcc = doPattern(/bcc=([^&]+)/i, qs);          
          body = doPattern(/body=([^&]+)/i, qs);
        }

        var suffix = [ "to=" + escape(to), "su=" + escape(subject), "cc=" + escape(cc),
            "bcc=" + escape(bcc), "body=" + escape(body) ].join("&");


        window.open(COMPOSE_URL + suffix);
        e.preventDefault();
      }
    }
  }, false);
  
  function doPattern(re, str) {
    var result = str.match(re);
    return result == null ? "" : result[1];
  }
})();
