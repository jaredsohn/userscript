// ==UserScript==
// @name           MiscRevival Read Fix
// @namespace      GeonoTRON2000
// @description    Fixes the read topics system on MiscRevival
// @version        1.1
// @include        *://miscrevival.punbb-hosting.com/*
// ==/UserScript==

var storage = "miscrevival_read";

function setStorage(name,value) {
  window.localStorage[name] = escape(value);
}

function getStorage(name) {
  return unescape(window.localStorage[name]);
}

function getRead () {
  var readstorage = getStorage(storage);
  if (!readstorage)
    return [];
  var read = JSON.parse(readstorage);
  if (!read) {
    return [];
  } else {
    if (read.length > 0) {
      return read;
    } else {
      return [];
    }
  }
}

function setRead (read) {
  setStorage(storage, JSON.stringify(read));
}

function addRead (id) {
  var read = getRead();
  if (read.indexOf(id) != -1) {
    return;
  } else {
    setRead(read.concat(id));
  }
}

function updateRead (read) {
  var divs = document.getElementsByClassName("intd");
  for (var i = 0; i < divs.length; i++) {
    var row = divs[i].parentNode.parentNode;
    var lplink = row.getElementsByClassName("tcr")[0].getElementsByTagName("a")[0];
    if (lplink) {
      var matches = lplink.href.match(/viewtopic\.php\?pid=([0-9]+)#p([0-9]+)/i);
      if (matches) {
        var id = parseInt(matches[1]);
        if (read.indexOf(id) != -1) {
          var icon = row.getElementsByClassName("icon inew")[0];
          if (icon)
            icon.className = "icon";
          var link = row.getElementsByClassName("tclcon")[0].getElementsByTagName("a")[0];
          if (link && icon && window.location.href.indexOf('viewforum.php') != -1)
            link.style.fontWeight = "normal";
          var newtext = row.getElementsByClassName("newtext")[0];
          if (newtext && icon && window.location.href.indexOf('viewforum.php') != -1)
            newtext.style.display = "none";
        } else {
          var icon = row.getElementsByClassName("icon inew")[0];
          if (icon)
            icon.className = "icon inew";
          var link = row.getElementsByClassName("tclcon")[0].getElementsByTagName("a")[0];
          if (link && icon)
            link.style.fontWeight = "bold";
        }
      }
    }
  }
}

if (window.location.href.indexOf('viewtopic.php') != -1 || window.location.href.indexOf('viewpoll.php') != -1) {
  var posts = document.getElementsByClassName("blockpost");
  for (var i = 0; i < posts.length; i++) {
    var id = parseInt(posts[i].id.substr(1));
    if (id > 0)
      addRead(id);
  }
} else if (window.location.href.indexOf('viewforum.php') != -1) {
  updateRead(getRead());
} else if (window.location.pathname.match(/\/?(index\.php)?(.*)/i)) {
  updateRead(getRead());
}