// ==UserScript==
// @name       MORE User Highlight
// @namespace  *
// @version    0.1
// @description  Highlights user lists for due dates and holds
// @include    http://www.more.lib.wi.us/patroninfo*
// @include    https://www.more.lib.wi.us/patroninfo*
// @copyright  2011+, Michael Buchmann
// ==/UserScript==

// This works for MORE (WI) library site
var dueHighlightDaysOrange = 2;  // Number of days to highlight Orange
var dueHighlightDaysYellow = 5;  // Number of days to highlight Yellow

var readyList = document.getElementsByClassName("patFuncStatus");
if (readyList != null) {
  for (var i = 0; i < readyList.length; ++i) {
    if (readyList[i].innerHTML.indexOf("Ready") == 1) {
      readyList[i].style.background = 'red';
    }
    if (readyList[i].innerHTML.indexOf("IN TRANSIT") == 1) {
      readyList[i].style.background = 'orange';
    }
    if (readyList[i].innerHTML.indexOf("1 of") == 1) {
      readyList[i].style.background = 'lightgreen';
    }
    if (readyList[i].innerHTML.indexOf("DUE") == 1) {
      var str = readyList[i].innerHTML;
      str = str.replace("-","/");
      str = str.replace("-","/20");
      var d = new Date(str.substring(5,15));
      var now = new Date();
      if ((d - now) < 0) readyList[i].style.background = 'red';
      else if ((d - now) < dueHighlightDaysOrange * 24 * 60 * 60 * 1000) readyList[i].style.background = 'orange';
      else if ((d - now) < dueHighlightDaysYellow * 24 * 60 * 60 * 1000) readyList[i].style.background = 'yellow';
    } 
  }


var titleList = document.getElementsByClassName("patFuncTitle");
  if (titleList != null) {
    for (var i = 0; i < titleList.length; ++i) {
      var bookurl = titleList[i].getElementsByTagName("a");
      if (bookurl != null) {
        for (var ii = 0; ii < bookurl.length; ++ii) {
          var bookurlstr = bookurl[ii].toString();
          var lloc = bookurl[ii];
          doRequest(bookurlstr, lloc);
        }
      }
    }
  }
}

function doRequest(url, lloc) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(responseDetails) {
      var doc = document.implementation.createDocument('', '', null), html = document.createElement('html');
      html.innerHTML = responseDetails.responseText;
      doc.appendChild(html);
      getHolds(doc, lloc);
    },
    onerror: function(responseDetails) {
      alert("ERROR Reading Record: " + bookurlstr);
    }
  });
}

function getHolds(doc, loc) {
  var holdList = doc.getElementsByClassName("bibHolds");
  for (var i = 0; i < holdList.length; ++i) {
    var holds = document.createElement('li');
    holds.innerHTML = holdList[i].innerHTML;
    loc.parentNode.insertBefore(holds, loc.nextSibling);
  }
}