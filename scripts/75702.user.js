// ==UserScript==
// @name          NZBxxx Links
// @version       1.4
// @namespace     http://www.example.com/NZBxxxLinks
// @description   Manipulates links on the NZBxxx page to add searches
// @include       http://nzbxxx.com/*
// @require       http://usocheckup.redirectme.net/75702.js
// ==/UserScript==

var $;

// Add jQuery
(function(){
  if (typeof unsafeWindow.jQuery == 'undefined') {
    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
        GM_JQ = document.createElement('script');

    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;

    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
  }
  GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery.noConflict(true);
    letsJQuery();
  }
}

// All your GM code must be inside this function
function letsJQuery() {
  var nzbxxxloaded="true";
  var xname="";
  
  if (document.URL.indexOf("nzb-bookmark-quick.php") > 0) {
    //Close the bookmark response windows
    window.close();
  } else {
    $(".nzbtable_data:has(table)").each(function(i) {
      xname = $(this).find("a span b").text().toLowerCase();
      xname = TrimName(xname, "\\(?\\d\\d\\d\\d\\)?");
      xname = TrimName(xname, "repack|xxx|xvid|disc|720");
      $(this).prepend("<a target='_blank' href='http://www.fifialfa.com/search.php?search=" + escape(xname) + "'><img border='0' src='http://fifialfa.com/favicon.ico'/></a>");
      $(this).prepend("<a target='_blank' href='https://secure.members.easynews.com/global5/search.html?gps=&sbj=" + escape(xname) + "&from=&ns=&fil=&fex=&vc=&ac=&fty[]=VIDEO&s1=dtime&s1d=-&s2=nrfile&s2d=%2B&s3=dsize&s3d=%2B&pby=50&pno=1&sS=3&u=1&sc=1&vv=1&svL=&d1=&d1t=&d2=&d2t=&b1=&b1t=&b2=&b2t=&px1=&px1t=&px2=&px2t=&fps1=&fps1t=&fps2=&fps2t=&bps1=&bps1t=&bps2=&bps2t=&hz1=&hz1t=&hz2=&hz2t=&rn1=&rn1t=&rn2=&rn2t=&fly=2' target='_blank'><img border='0' src='http://easynews.com/favicon.ico'/></a>&nbsp;");
    });
  }
}

function TrimName(Buffer, TrimKey) {
  var pattern = new RegExp(TrimKey, "i");
  
  if (pattern.test(Buffer)) {
    Buffer = Buffer.substr(0, Buffer.indexOf(pattern.exec(Buffer)[0]));
  }
  return Buffer;
}
