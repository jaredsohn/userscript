// Email Linkify v0.1
// Made By Jason (aka GamingFox)
// Last updated: 6/4/05
//
// This script is made according to a request:
// Have you considered "linkifying" email addresses that aren't 
// linked with mailtos? Much to my surprise, nobody seems to have 
// done this yet, and I would find that very valuable.
//
// The regular expression of an email address was found at
// http://www.regexlib.com/REDetails.aspx?regexp_id=284
// Thank Myle Ott for the regular expression.
//
// The script follows same concept as the Linkify script from
// http://youngpup.net/userscripts. This time, its for email
// addresses instead of URLs.
//
// ==UserScript==
// @name	  Email Linkify
// @namespace	  http://gamingfox.blogspot.com/
// @description	  v0.1: Linkify all or most unlinked email addresses.
// @include	  http://*
// @include	  https://*
// @include	  file://*
// ==/UserScript==

(function () {
  var emailRegExp = /\b([a-zA-Z0-9_\-])+(\.([a-zA-Z0-9_\-])+)*@((\[(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5]))\]))|((([a-zA-Z0-9])+(([\-])+([a-zA-Z0-9])+)*\.)+([a-zA-Z])+(([\-])+([a-zA-Z0-9])+)*))/ig;

  // tags we will scan looking for un-hyperlinked email addresses
  var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
  var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ") and " + "contains(translate(., '@', '@'), '@')]";

  var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
          if (emailRegExp.test(cand.nodeValue)) {
      var span = document.createElement("span");
                var source = cand.nodeValue;
            
                cand.parentNode.replaceChild(span, cand);

                emailRegExp.lastIndex = 0;
                for (var match = null, lastLastIndex = 0; (match = emailRegExp.exec(source)); ) {
                    span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                
                    var a = document.createElement("a");
                    a.setAttribute("href", "mailto:"+match[0]);
                    a.appendChild(document.createTextNode(match[0]));
                    span.appendChild(a);

                    lastLastIndex = emailRegExp.lastIndex;
                }

                span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
                span.normalize();
          }
  }
})(); 
