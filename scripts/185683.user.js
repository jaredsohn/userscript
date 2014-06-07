// ==UserScript==
// @name          Swyter Tweaks for Seriespepito
// @description   Puts direct links in the seriespepito.com site.
// @match         http://*.seriespepito.com/*
// @match         http://*.peliculaspepito.com/*
// This one is for the cross-site XHR requests without CORS:
// @match         http://*.enlacespepito.com/*
// @grant         GM_xmlhttpRequest
// @version       2014.04.06
// @author        Swyter
// ==/UserScript==

/*
 * DOMParser HTML extension
 * 2012-09-04
 * 
 * By Eli Grey, http://eligrey.com
 * Public domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/

(function(DOMParser) {
	"use strict";

	var
	  DOMParser_proto = DOMParser.prototype
	, real_parseFromString = DOMParser_proto.parseFromString
	;

	// Firefox/Opera/IE throw errors on unsupported types
	try {
		// WebKit returns null on unsupported types
		if ((new DOMParser).parseFromString("", "text/html")) {
			// text/html parsing is natively supported
			return;
		}
	} catch (ex) {}

	DOMParser_proto.parseFromString = function(markup, type) {
		if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
			var
			  doc = document.implementation.createHTMLDocument("")
			;
	      		if (markup.toLowerCase().indexOf('<!doctype') > -1) {
        			doc.documentElement.innerHTML = markup;
      			}
      			else {
        			doc.body.innerHTML = markup;
      			}
			return doc;
		} else {
			return real_parseFromString.apply(this, arguments);
		}
	};
}(DOMParser));


if (document.domain.match(/enlacespepito.com$/))
{
  throw "stop it, you!";
}

document.body.addEventListener("click", function(e)
{
  if( (e.target.classList.contains("enlace_link")
   ||  e.target.classList.contains("btn_link"))
   && !e.target.classList.contains("direct"))
  {
    e.preventDefault();
    GM_xmlhttpRequest({
      method: "GET",
      url: e.target.href,
      onload: function(o)
      {
        o.responseXML = new DOMParser().parseFromString(o.responseText, "text/html");
        
        e.target.href = o.responseXML.querySelector(".enlace_link").href;
        e.target.classList.add("direct");
        
        window.open(e.target.href);
      }
    });
  }
});