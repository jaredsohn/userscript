// ==UserScript==
// @name          Clean My Yahoo 
// @namespace     http://geocities.yahoo.com/b7j0c/
// @description   Strips headers from yahoo pages
// @include       http://my.yahoo.com*
// ==/UserScript==

(function() {
    // my.yahoo.com headers, ycs_wlMsg
    var arr = new Array('yschiy','logodiv','ycs_vertSrchHdr',
                        'ycs_wlMsg','mhvs','yschsec','ymycpy','ymyptb');
    for(var i=0; i<arr.length; i++) {
      var e = document.getElementById(arr[i]);
      if(e != undefined) {
        e.parentNode.removeChild(e);
      }
    }

    var arr = document.getElementsByTagName("form");
    for(var i=0; i<arr.length; i++) {
      e = arr[i];
      var r = /Quotes are delayed/;
      ar = r.exec(e.innerHTML);
      if (ar) {
        e.parentNode.removeChild(e);
      }
    }
    
    var arr = document.getElementsByTagName("a");
    for(var i=0; i<arr.length; i++) {
      e = arr[i];
      if (e.innerHTML == "Add Content") {
        e.parentNode.removeChild(e);
      }
    }
    
    var arr = document.getElementsByTagName("span");
    for(var i=0; i<arr.length; i++) {
      e = arr[i];
      if (e.getAttribute("class") == "ymaddb") {
        e.setAttribute("class","");
      }
    }

    var xpath = "//a[contains(@href,'news.yahoo')]";
    var res = 
	document.evaluate(xpath, document, null,
        	          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var i, link;
    for (i = 0; link = res.snapshotItem(i); i++) {
        var add;
        if (link.href.search(/\?/) >= 0) {
          add = '&';
        } else {
          add = '?';
        }
        link.href = link.href + add + 'printer=1';
    }
})();
