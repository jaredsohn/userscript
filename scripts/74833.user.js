// ==UserScript==
// @name           hfr-rehost @ mycrub
// @namespace      http://mycrub.info
// @include        http://rehost.mycrub.fr/*
// @include        http://rehost.mycrub.info/*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
      var toBeFixed = $("base, img, script, a, link, form");
      toBeFixed.filter(function (index) {
        var attrNames = getAttrNames(this.tagName);
        for (var i=0 ; i<attrNames.length ; i++) {
          eval("this." + attrNames[i] + "=\"" + fixUrl(eval("this." + attrNames[i])) + "\"");
        }
      });
    }
    
    function getAttrNames(tagName) {
      if (tagName == 'BASE' || tagName == 'base') {
        return ["href"];
      }
      if (tagName == 'IMG' || tagName == 'img') {
        return ["src"];
      }
      else if(tagName == 'SCRIPT' || tagName == 'script') {
        return ["src"];
      }
      else if(tagName == 'A' || tagName == 'a') {
        return ["href", "style.backgroundImage"];
      }
      else if(tagName == 'LINK' || tagName == 'link') {
        return ["href"];
      }
      else if(tagName == 'FORM' || tagName == 'form') {
        return ["action"];
      }
    }
    
    function fixUrl(url) {
      if(url != null && url != "") {
        url = url.replace(new RegExp("url\\(\"thumb\\/"), "url\\(\"http://rehost.mycrub.fr/thumb/");
        url = url.replace(new RegExp("\"", "g"), "\\\"");
        return url.replace(new RegExp("hfr\\-rehost\\.net", "g"), "rehost.mycrub.fr");
      }
      return url;
    }
    
    
    
