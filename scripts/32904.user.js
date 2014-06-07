// me2DAY Friends Count
// version 0.3
// 2008-09-01
// Copyright (c) 2008, Seungwon Jeong
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          me2DAY Friends Count
// @namespace     http://jeongsw.textcube.com/
// @description   Show me2DAY friends count
// @include       http://me2day.net/*
// ==/UserScript==

// Show me2DAY friends count using me2DAY Open API.

function getId() {
  var link = document.evaluate("//div[@id='header']/h1/a[1]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  if (link) {
    return link.firstChild.nodeValue;
  } else {
    return null;
  }
}

function setFriendsCount(link) {
  var id = getId();		// User ID
  var request;

  if (!id) {
    return;
  }

  request = {
    method: 'GET',
    url: 'http://me2day.net/api/get_person/' + id + '.json',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/json'
    },
    onload: function (responseDetails) {
      var response = eval('(' + responseDetails.responseText + ')');

      link.firstChild.nodeValue += '(' + String(response.friendsCount) + ')';
    }
  };

  GM_xmlhttpRequest(request);
}

var link = document.evaluate("//ul[@id='main_navigation']/li[4]/a",
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (link) {
  setFriendsCount(link);
}
