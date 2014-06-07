// ==UserScript==
// @name        bilibili show links
// @include     http://www.bilibili.tv/video/*
// ==/UserScript==

function parseCid() {
  var cidClass = document.getElementsByClassName("player")[0];
  var cidUrl = "";
  var cid = "";
  if (cidClass.getAttribute("src").search("cid") < 0) {
    cidUrl = cidClass.getAttribute("flashvars");
    cid = cidUrl.split("&")[0].split("=")[1];
  } else {
    cidUrl = cidClass.getAttribute("src");
    cid = cidUrl.split(",")[1].split("&")[0].split("=")[1];
  }
  return cid;
}

function loadXml(cid) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://interface.bilibili.tv/playurl?cid=' + cid,
    onload: function(response) {
      responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
      var sum = XPCNativeWrapper.unwrap(responseXML).getElementsByTagName("url").length;
      for (var loop = 0; loop < sum; loop++) {
        var xmlLink = XPCNativeWrapper.unwrap(responseXML).getElementsByTagName("url")[loop].childNodes[0];
        var dlLink = xmlLink.data;
        eventList(dlLink);
      }
    }
  });
}

function eventList(link) {
  var push_position = document.getElementsByClassName("viewbox")[0];
  var push_myinput = document.createElement("input");
  push_myinput.setAttribute("name", "BILIBILI");
  var xmlUrl = link;
  push_myinput.setAttribute("size", 42);
  push_myinput.setAttribute("type", "button");
  var length = xmlUrl.length;
  var xmlUrlSliced = "";
  if (length > 42) {
    xmlUrlSliced = xmlUrl.slice(0, 39) + "...";
  } else {
    xmlUrlSliced = xmlUrl;
  }
  push_myinput.setAttribute("value", xmlUrlSliced);
  var push_myfunc = "window.location.href='" + xmlUrl + "'";
  push_myinput.setAttribute("onclick", push_myfunc);
  push_position.appendChild(push_myinput);
}

var cid = parseCid();
loadXml(cid);
