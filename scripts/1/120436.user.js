// ==UserScript==
// @name           Twitter
// @namespace      http://fcmartins.net
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

function httpExpandURI(element) {
  GM_xmlhttpRequest({
    url: element.getAttribute("data-expanded-url"),
    method: "HEAD",
    onload: function(response) {
      modify(element, response.finalUrl);
    }
  });
}

function modify(element, url) {
  element.setAttribute("href", url);
  element.textContent = url;
  
  element.removeAttribute("data-ultimate-url");
  element.removeAttribute("title");
  element.removeAttribute("data-expanded-url");
  docHeight = document.getElementById("stream-items-id").scrollHeight;
}

function expandURL() {
  Array.forEach(document.getElementsByTagName("a"), function(element, index, array) {
    if(element.className.indexOf("twitter-timeline-link") != -1 && element.getAttribute("data-expanded-url")) {
      if(element.getAttribute("data-ultimate-url")) {
        modify(element, element.getAttribute("data-ultimate-url"));        
      }
      else {
        httpExpandURI(element);
      }      
    }
  });    
}

function divClick() {
  window.setTimeout(expandURL, 1000);
}

function newTweetsBar() {
  var div = document.getElementsByClassName("new-tweets-bar")[0];
  if(typeof div !== "undefined") {
    div.addEventListener("click", divClick, false);
  }
}

function onScroll(e) {
  if(scrollId) {
    window.clearTimeout(scrollId);
  }
  scrollId = window.setTimeout(function() {
    if(docHeight < document.getElementById("stream-items-id").scrollHeight) {
      expandURL();      
    }
  }, 2000);
}

function start() {
  if(document.getElementById("stream-items-id")) {
    window.clearTimeout(startId);
    docHeight = document.getElementById("stream-items-id").scrollHeight;
    expandURL();
  }
}

var scrollId;
var docHeight;
var startId;

window.addEventListener("load", function(e) {
  startId = window.setInterval(start, 1000);
}, false);
window.setInterval(newTweetsBar, 1000);
window.addEventListener("scroll", onScroll, false);
