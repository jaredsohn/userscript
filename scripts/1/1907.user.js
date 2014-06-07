// ==UserScript==
// @name 		Yahoo! Site Explorer
// @namespace		http://baliga.blogdns.com/scripts/
// @description		Display all InBound links for a page
// @include		*
// ==/UserScript==

var ye_d;
window.ye_slide_down = function() {
   var top = parseInt(ye_d.top);
  // GM_log("Top = " + top);
  if (top <= 0) {
    top = top + 100;
    ye_d.top = "" + top + "px";
    if (top > 0) {
      ye_d.top = "0px";
    } else {
      setTimeout("ye_slide_down()", 100);
    }
  }
}

window.ye_slide_up = function() {
 
  var top = parseInt(document.getElementById("ye_result").style.top);
  if (top >= -500) {
    top = top - 100;
    document.getElementById("ye_result").style.top = "" + top + "px";
    setTimeout("ye_slide_up()");
  } else {
    document.getElementById('ye_result').style.display = "none";
  }
}

window.ye_showLink = function(obj) {
  if (document.getElementById("ye_result").style.display == "none") {
    document.getElementById("ye_result").style.top = "-500px";
    document.getElementById('ye_result').style.display = "block";
    GM_log("Height = " + document.getElementById("ye_result").style.height);
    obj.innerHTML = "Hide";
    setTimeout("ye_slide_down()", 100);
  } else {
    setTimeout("ye_slide_up()", 100);
    obj.innerHTML = "Explore";
  }
}

window.displayResult =  function(responseText) {
  // GM_log(responseText);
  var parser = new DOMParser();
  var dom = parser.parseFromString(responseText, "text/xml");
  var resultSet = dom.documentElement;
  var totalResultsAvailable = resultSet.getAttribute("totalResultsAvailable");
  var totalResultsReturned = resultSet.getAttribute("totalResultsReturned:");
  
  var results = resultSet.getElementsByTagName("Result");
  // GM_log("total results = "  + results.length);
  if (results.length > 0) {
    // GM_log("In condition");
    var divElement = document.createElement("div");
    divElement.setAttribute("style", "display: block; padding: 2px; border: 1px solid blue; width: 100px; position: fixed; left: 0px; top: 0px; background: #EEE; -moz-opacity: 1.0;");
    var textElement = document.createElement("div");
    textElement.setAttribute("style", "text-align: center; font-family: courier; font-size: 10pt;");
    textElement.innerHTML = "<a href=\"+\" onClick='javascript:ye_showLink(this); return false;'>Explore</a>";
    divElement.appendChild(textElement);

    var dElement = document.createElement("div");
    dElement.setAttribute("id", "ye_result");
    dElement.setAttribute("style", "position:fixed; width: 300px; left: 110px; top: 10px; border: 0px; z-Index: 999; display: none; padding: 5px; background:lightyellow; -moz-opacity: 1.0; border: 2px solid red; font-family: courier; font-size: 10pt;");

    var powerElement = document.createElement("div");
    var img_src = 'data:image/gif;base64,' +		'R0lGODlhiAAPALMPAHsAmd6/5ZxAs71/zIMQn+7f8ubP7Pfv+ZQwrMyZzIwgpq1gv9av37VwxqRQuf//' +		'/yH5BAEAAA8ALAAAAACIAA8AQAT/MMhJzbs46827/x0AEAIDnmiaHogoIocWAEMCCJq4JNQMBA9Rg+Mz' +		'KETAjUGUeAgApk2h0QIoHjOSQDDEigTV2MAlUlieg012+wRoDAQRwYIpjAGIBF1TCCy+PBkiGAd/ckcj' +		'TQ93CAUbd01tSRhwZAteZD8YhoqLmVAXdy4EfTcYgx4uOBgDRwSXFy0DfT17WDGOFwUJA716Khk+DwoE' +		'ShIxDwc9AQcGAbkXzgV9dMqTD87MF8p7EhcBDFUADjLLxyk+ZMB+n1adbQjA8vMoNiLkDzYEnQcNLtqn' +		'APDogcTJCGQZ9PlYxeEPjifxNIzZB20Gggl7bAiIQ2fMKgam/xyY2vYNzwRUIb6osdKrBSwD9hZMKgXq' +		'joIoD+yIiGKgigIuAhB1OYBQwxMCDlpcWcPGQIGdEsZc8ZhPhIUCcUi0IDWDIUoM6dpd09WrbBd6aNOq' +		'VdvOxdm1cL8FSMADWiwXduPq1cDCRacHcT4RKJqPjWFdPq4dYFB2AIOi/kbsiFoFVpu30RYI2EG28aw6' +		'AvB982w3QIMtCXDVYJVGhgsYYON0MWBYwJ4loHK4yZk1NYYEcQYcwNuhBbk2hD0GGDDHy8UJyA4EZjjm' +		'YoIWOHw4mPvKi9fdGwwJ/NM8Q9AWf4O0LSiEyM4XHp48BIAZW+AbFsKOHAblDyypvRxxnIZAK33iAW4i' +		'EGZQA5F1w8QGBWWloFT2jTBWAHGskoAAeSUjHDaDdLWBSJmkAWBwF/hDygW/iHjBVxCqpEELuWRxgCiq' +		'YDLKA+G0o8BYDCzgkwAJVCRCAQhE9A0iI5ig3w/+iAYYFFQZFJERozThonpEgEMGdLXltIArDqS31wl9' +		'5NThmWtFAAA7';    var img_node = document.createElement('img');    img_node.src = img_src;
    img_node.border = 0;
    img_node.setAttribute("title", "Powered by Yahoo! Search");
    powerElement.appendChild(document.createTextNode("Powered By "));
    var anchor_element = document.createElement("a");
    anchor_element.setAttribute("href", "http://search.yahoo.com");
    anchor_element.appendChild(img_node);
    powerElement.appendChild(anchor_element);
    dElement.appendChild(powerElement);
    dElement.appendChild(document.createElement("hr"));

    for (var i = 0; i < results.length; ++i) {
      var result = results[i];
      // GM_log("In loop " + results + ":" + result);
      var innerDiv = document.createElement("div");
      innerDiv.setAttribute("style", "padding: 2px;");
      var link = document.createElement("a");
      var clickUrl = result.getElementsByTagName("Title").item(0).firstChild.nodeValue;
      // GM_log("ClickURL = " + clickUrl);
      link.setAttribute("href", result.getElementsByTagName("ClickUrl").item(0).firstChild.nodeValue);
      link.innerHTML = result.getElementsByTagName("Title").item(0).firstChild.nodeValue;
      innerDiv.appendChild(link);
      dElement.appendChild(innerDiv); 
    }

    //if (totalResultsAvailable > results.length) {
      // GM_log("adding more element");
      var moreElement = document.createElement("div");
      moreElement.setAttribute("style", "width: 100%; text-align: right;");
      moreElement.innerHTML = "<a href=\"http://siteexplorer.search.yahoo.com/search?ei=UTF-8&p=" + escape(document.location.href) + "&bwm=p&bwms=p&searchbwm=Explore+URL\">More Results...</a>";
      dElement.appendChild(moreElement);
    //}

    // GM_log("Inserting child as divElement");
    // GM_log("Total Results Available " + totalResultsAvailable);
    // GM_log("Total Results Retruned " + totalResultsReturned);
    document.body.insertBefore(divElement, document.body.firstChild);
    document.body.appendChild(dElement);
    ye_d = document.getElementById("ye_result").style;
  }
 }

window.ye_getLinks = function() {
  var url = document.location.href;
  var appId = "yogishbaliga";
  var results = 10;
  var api_req = "http://api.search.yahoo.com/SiteExplorerService/V1/inlinkData?appid=" + appId + "&query=" +
                 escape(url) + "&results=" + results;
  // GM_log(api_req);
  GM_xmlhttpRequest( {
    method: "GET",
    url: api_req,
    onload: function(details) {
      if (details.readyState == 4) {
        displayResult(details.responseText);
      }
    }
  } );

}

ye_getLinks();


