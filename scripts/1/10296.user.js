// ==UserScript==
// @name         Hatena::RSS Manual Update Button
// @namespace    http://d.hatena.ne.jp/Yuichirou/
// @description  Make the "Manual Update" button at "RSS Reader" pages in Hatena::RSS
// @include      http://r.hatena.ne.jp/*/
// @include      http://r.hatena.ne.jp/*/*/*
// @exclude      http://r.hatena.ne.jp/append/*
// @exclude      http://r.hatena.ne.jp/feed/*
// @exclude      http://r.hatena.ne.jp/*/?mode=*table
// @version      2.11
// ==/UserScript==

// Version 2.11 (Released at 2008-02-13)

(function() {
  // Search for the "hatena-body" element
  var divs = document.getElementsByTagName("div");
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].className == "hatena-body") break;
  }
  if (i == divs.length) return;

  if (divs[i].id.match(/hatena\-rss\-(.+)/)) {
    var antenna = (RegExp.$1 == "antenna");

    // Make a button icon
    var img = document.createElement("img");
    img.src = "/images/podcasting_s.gif";
    img.alt = "\u66F4\u65B0"; img.width = 16; img.height = 12;
    img.title = "\u3053\u306E\u30D5\u30A3\u30FC\u30C9\u3092\u624B\u52D5\u66F4\u65B0";
    img.style.cursor = "pointer"; img.style.paddingBottom = "1px";

    // 
    var updateinfo = new Array();
    updateinfo.loading = 0;

    // Make an event handler
    var update = function (evt) {
      // Change the button icon
      var img = evt.target;
      if (img.src == "/images/loading.gif") return;
      img.src = "/images/loading.gif"; img.width = 13; img.height = 13;
      img.style.paddingBottom = "0"; img.style.paddingRight = "3px";

      // Get a feed identifier
      if (img.nextSibling) { /* Antenna Mode */
        var fid = img.nextSibling.id.substring(8);
      } else {               /* Normal or Simple */
        var fid = img.parentNode.parentNode.id.substring(8);
      }

      // Get a feed title
      var links = img.parentNode.getElementsByTagName("a");
      for (var i = 0; i < links.length; i++) {
        if (links[i].className == "entrylist-link" || links[i].className == "link") break;
      }
      var message = links[i].firstChild.nodeValue + " - ";
      updateinfo.loading++;

      // Set a call-back function
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (req.readyState == 4) {
          img.src = "/images/podcasting_s.gif"; img.width = 16; img.height = 12;
          img.style.paddingBottom = "1px"; img.style.paddingRight = "0";
          if (req.status != 200) {
            // Failure
            img.src = "/images/error-l.gif";
            message += "\u901A\u4FE1\u306B\u5931\u6557\u3057\u307E\u3057\u305F";
            alert(message);
          } else if (req.responseText.indexOf('\u30D5\u30A3\u30FC\u30C9\u66F4\u65B0') != -1) {
            // Succeed and Updated
            message += req.responseText;
            updateinfo.push(message);
          }

          updateinfo.loading--;
          if (updateinfo.loading == 0 && updateinfo.length > 0) {
            message = updateinfo.join("\n") + "\n";
            message += "\u30DA\u30FC\u30B8\u3092\u66F4\u65B0\u3057\u307E\u3059\u304B\u003F";
            if (confirm(message)) location.href = location.pathname;
            updateinfo = new Array();
            updateinfo.loading = 0;
          }
        }
      };
      // Access to the server
      req.open("GET", "/check?fid=" + fid, true);
      req.send(null);
    };

    // Search for the feed list
    if (antenna) {
      var feedlist = document.getElementById("main-body").getElementsByTagName("ul")[0];
    } else {
      var feedlist = document.getElementById("sidebar").getElementsByTagName("ul")[1];
    }

    // Append buttons to each feed items
    var lis = feedlist.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
      if (lis[i].id.indexOf('keyword') == -1) {
        var cimg = img.cloneNode(false);
        cimg.addEventListener("click", update, false);
        if (antenna) {
          lis[i].insertBefore(cimg, lis[i].getElementsByTagName("div")[0]);
        } else {
          lis[i].getElementsByTagName("span")[0].appendChild(cimg);
        }
      }
    }
  }
})();
