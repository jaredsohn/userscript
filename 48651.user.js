// ==UserScript==
// @name Piperka.net Bookmarking for Google Chrome
// @description Adds a 'Bookmark' button to Piperka comic sites
// @run-at document-start
// ==/UserScript==

var key = 131415;
var keysByHost = { "piperka.net" : (key ++),
                   "www.piperka.net" : (key ++) };
var keysBySite = {};
var sitesByKey = [];
var hostsByKey = [];
for (var host in keysByHost) {
  var site = "http://" + host + "/updates.html";
  keysBySite[site] = keysByHost[host];
  sitesByKey[keysBySite[site]] = site;
  hostsByKey[keysByHost[host]] = host;
}

if (location.href != "about:blank")
with (document)
if (keysByHost[location.host] && location.search.match("bookmark=")) {
    window.onload = function() {
      if (body.innerText.match('Failed to set bookmark') || !body.innerText.match('Set bookmark'))
        alert("Piperka: FAILED to set bookmark!");
    }
} else if (keysBySite[location.href]) {
  var loading = 0;
  /*window.onbeforeunload = function() {
    if (loading > 0) {
      return (loading > 1 ? (loading + " comics are ") : "One comic is ") + "still being processed and could be left in a corrupt state!";
    }
  }*/
  window.onload = function() {
  var unread = getElementById("left").getElementsByTagName("a");
  var expiry = new Date();
  expiry.setFullYear(expiry.getFullYear()+1);
  expiry = ";expires=" + expiry.toGMTString();
  for (var i = 0; i < unread.length; i ++) {
    var comicnum = unread[i].href.match('[0-9]*$');
    var cookiestr = "auto" + keysBySite[location.href] + "bookmark" + comicnum + "=" + comicnum;
    if (!cookie.match(cookiestr)) {
      var ifr = createElement("iframe");
      with (ifr) {
        width = 7;
        height = keysBySite[document.location.href];
        style.borderWidth="0";
        style.visibility = "hidden";
        loading ++;
        src = unread[i].href;
        unread[i].href = null;
        style.position = "absolute";
        var text = unread[i].innerHTML;
        unread[i].innerHTML = "Adding bookmark button to " + text + "...";
        onload = function(str,url,text,obj) { return function() {
          cookie = str;
          obj.href = url;
          obj.innerHTML = text;
          loading --;
        }}(cookiestr + expiry,src,text,unread[i]);
      }
      body.appendChild(ifr);
    }  
  }
  }
} else if (typeof(width) !== 'undefined' && width == 7 && sitesByKey[height] && !location.href.match(sitesByKey[height])) {
  var expiry = new Date();
  expiry.setFullYear(expiry.getFullYear()+10);
  cookie = "piperka"+height+"=7;expires="+expiry.toGMTString()+";path=/";
  location.href = sitesByKey[height] + "?bookmark=" + 
                  encodeURIComponent(location.href) +
                  "&wantbookmarkhere=yes";
} else {
  var curtop = -28;
  for (var key in sitesByKey) if (cookie.match("piperka" + key + "=7")) {
    (function(oldOnload, key) {
      window.onload = function() {
        var bmbar = createElement("div");
        with (bmbar.style) {
          position = "fixed";
          left = 0;
          top = (curtop += 27) + 1;
          backgroundColor = "#ff7777";
          borderWidth = "1px";
          borderStyle = "solid";
          borderColor = "#000000";
          padding = "3px";
        }
        var bmbut = createElement("a");
        bmbut.href = "#";
        bmbut.innerText = "Bookmark on " + hostsByKey[key];
        bmbut.style.color = "#003399";
        bmbut.onclick = function() {
          bmbar.innerHTML = "Bookmarking...";
          var ifr = createElement("iframe");
          ifr.style.visibility = "hidden";
          ifr.src = sitesByKey[key] + "?bookmark=" +
                    encodeURIComponent(location.href) +
                    "&wantbookmarkhere=yes";
          ifr.width = 0; ifr.height = 0;
          ifr.onload = function() {
            bmbar.innerHTML = "Bookmark sent to <a href='" + sitesByKey[key] + "'>" + sitesByKey[key] + "</a>";
          }
          bmbar.appendChild(ifr);
        }
        bmbar.appendChild(bmbut);
        body.appendChild(bmbar);
        if (oldOnload) oldOnload();
      }
    })(window.onload, key);
  }
}
