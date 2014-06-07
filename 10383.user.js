// ==UserScript==
// @name          Google Reader Unread Count at Head
// @namespace     http://shinto.dyndns.org/greasemonkey
// @description   Brings the unread count to the head of feed title
// @include       https://www.google.com/reader/*
// @include       http://www.google.com/reader/*
// ==/UserScript==

(function() {

  var timerID = null;
  var isThrottling = false;
  var wantUpdate = false;

  function countAtHead() {
    if(isThrottling){
      wantUpdate = true;
      return;
    }
    isThrottling=true;

    modifySubTree();

    throttleTimer = setInterval(releaseThrottling, 3000);
  }

  function modifySubTree() {
    var divUnreadCount = document.evaluate(
      '//div[@class="unread-count sub-unread-count unread-count-d-2"]',
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

    if ( divUnreadCount.snapshotLength > 0 ) {
      for (var i = 0; i < divUnreadCount.snapshotLength; i++) {
        var c = divUnreadCount.snapshotItem(i);
        var p = c.parentNode;
        var name = null;
        for(var j = 0; j < p.childNodes.length; j++) {
          if(p.childNodes.item(j).getAttribute("class") == "name-text sub-name-text name-text-d-2 name sub-name name-d-2 name-unread") {
            name = p.childNodes.item(j);
          }
        }
        if (name==null) continue;
        var x = p.removeChild(c);
        p.insertBefore(x, name);
      }
    }
  }


  function releaseThrottling() {
    clearInterval(throttleTimer);
    isThrottling = false;

    if(wantUpdate){
      wantUpdate=false;
      countAtHead();
    }
  }


  function initialRun() {
    clearInterval(timerID);
    countAtHead();

    document.getElementById("sub-tree")
      .addEventListener('DOMNodeInserted', countAtHead, false);
  }

  timerID = setInterval(initialRun, 3000);

}) ();

