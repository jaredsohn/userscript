// ==UserScript==
// @name        HTML5-Video für Golem.de
// @namespace   tfr
// @description Wandelt den Golem.de-eigenen Flash-Player in einen HTML5-Player um.
// @downloadURL https://userscripts.org/scripts/source/180446.user.js
// @updateURL   https://userscripts.org/scripts/source/180446.meta.js
// @include     http://www.golem.de/*
// @include     https://www.golem.de/*
// @include     http://video.golem.de/*
// @include     https://video.golem.de/*
// @version     4
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/* Dieses Skript steht unter CC0:
 * http://creativecommons.org/publicdomain/zero/1.0/deed.de */

function HTML5VideoDisabled() {
  var retval = false;
  try {
    retval = window.sessionStorage.getItem("tfrNoHTML5Video") == "true";
    window.sessionStorage.removeItem("tfrNoHTML5Video");
  } catch(e) {
    retval = window.name.indexOf(";tfrNoHTML5Video") > -1;
    window.name = window.name.replace(/;tfrNoHTML5Video/g, "");
  }
  return retval;
}

function ReplacePlayers() {
  if(!HTML5VideoDisabled()) {
    for(var i = 0; i < window.document.getElementsByTagName("div").length; i++) {
      if(typeof window.document.getElementsByTagName("div")[i].id !== "undefined" && window.document.getElementsByTagName("div")[i].id.search(/^NVBPlayer[0-9]*$/) >= 0) {
        ReplacePlayer(window.document.getElementsByTagName("div")[i].id);
      }
    }
  }
}
function ReplacePlayer(divId) {
  divId.match(/^NVBPlayer([0-9]*)$/);
  var videoId = RegExp.$1;
  GM_xmlhttpRequest({
    method: "GET",
    url: "//video.golem.de/xml/" + videoId + ".xml",
    onload: function(response) {
      var responseXml = new DOMParser().parseFromString(response.responseText, "text/xml");
      var videoId = responseXml.getElementsByTagName("id")[0].innerHTML;
      var sdVideoUrl = "//video.golem.de" + responseXml.getElementsByTagName("medium")[0].getElementsByTagName("url")[0].innerHTML;
      var sdVideoThumb = "//video.golem.de" + responseXml.getElementsByTagName("medium")[0].getElementsByTagName("teaser")[0].getElementsByTagName("url")[0].innerHTML;
      var hdVideoAvailable = false;
      var hdVideoUrl = "";
      var hdVideoThumb = "";
      if(responseXml.getElementsByTagName("high")[0]) {
        hdVideoAvailable = true;
        hdVideoUrl = "//video.golem.de" + responseXml.getElementsByTagName("high")[0].getElementsByTagName("url")[0].innerHTML;
        hdVideoThumb = "//video.golem.de" + responseXml.getElementsByTagName("high")[0].getElementsByTagName("teaser")[0].getElementsByTagName("url")[0].innerHTML;
      }
      var videoElem = window.document.createElement("video");
      videoElem.setAttribute("id", "tfrHtml5Video" + videoId);
      videoElem.setAttribute("controls", "controls");
      videoElem.setAttribute("width", "620");
      videoElem.setAttribute("height", "349");
      videoElem.setAttribute("poster", sdVideoThumb);
      videoElem.setAttribute("src", sdVideoUrl);
      videoElem.setAttribute("style", "background-color:black;");
      videoElem.setAttribute("onmousemove", "javascript:if(typeof tfrHtml5Timeout" + videoId + " !== \"undefined\") { window.clearTimeout(tfrHtml5Timeout" + videoId + "); }window.document.getElementById(\"tfrHtml5Options" + videoId + "\").style.display = \"block\"; tfrHtml5Timeout" + videoId + " = window.setTimeout(\"window.document.getElementById(\\\"tfrHtml5Options" + videoId + "\\\").style.display = \\\"none\\\";\", 2000);");
      videoElem.setAttribute("onmouseout", "javascript:window.document.getElementById(\"tfrHtml5Options" + videoId + "\").style.display = \"none\";");
      videoElem.setAttribute("onplay", "javascript:window.document.getElementById(\"tfrHtml5Related" + videoId + "\").style.display = \"none\";");
      videoElem.setAttribute("onseeked", "javascript:window.document.getElementById(\"tfrHtml5Related" + videoId + "\").style.display = \"none\";");
      videoElem.setAttribute("onended", "javascript:window.document.getElementById(\"tfrHtml5Related" + videoId + "\").style.display = \"block\";");
      var videoOptionBox = window.document.createElement("div");
      videoOptionBox.setAttribute("id", "tfrHtml5Options" + videoId);
      videoOptionBox.setAttribute("style", "position:absolute; top:0px; right:0px; z-index:1; background-color:black; color:white; opacity:0.4; cursor:default; font-family:\"Segoe UI\", Tahoma, sans-serif; display:none;");
      videoOptionBox.setAttribute("onmouseover", "javascript:if(typeof tfrHtml5Timeout" + videoId + " !== \"undefined\") { window.clearTimeout(tfrHtml5Timeout" + videoId + "); }window.document.getElementById(\"tfrHtml5Options" + videoId + "\").style.display = \"block\";");
      videoOptionBox.setAttribute("onmouseout", "javascript:window.document.getElementById(\"tfrHtml5Options" + videoId + "\").style.display = \"none\";");
      var relatedVideoBox = window.document.createElement("div");
      relatedVideoBox.setAttribute("id", "tfrHtml5Related" + videoId);
      relatedVideoBox.setAttribute("style", "position:absolute; top:0px; left:0px; width:620px; height:315px; z-index:2; background-color:black; color:white; opacity:0.8; cursor:default; font-family:\"Segoe UI\", Tahoma, sans-serif; display:none; font-size:8pt;");
      var relatedVideoTable = window.document.createElement("table");
      relatedVideoTable.setAttribute("id", "tfrHtml5Related" + videoId + "Table");
      var relatedVideoRow0 = window.document.createElement("tr");
      var relatedVideoRow1 = window.document.createElement("tr");
      var relatedVideoCell0 = window.document.createElement("td");
      var relatedVideoCell1 = window.document.createElement("td");
      var relatedVideoCell2 = window.document.createElement("td");
      var relatedVideoCell3 = window.document.createElement("td");
      var relatedVideoCell4 = window.document.createElement("td");
      var relatedVideoCell5 = window.document.createElement("td");
      var relatedVideoCell6 = window.document.createElement("td");
      var relatedVideoCell7 = window.document.createElement("td");
      var relatedVideoCell8 = window.document.createElement("td");
      var relatedVideoCell9 = window.document.createElement("td");
      relatedVideoCell0.setAttribute("class", "tfrRelatedVideo");
      relatedVideoCell1.setAttribute("class", "tfrRelatedVideo");
      relatedVideoCell2.setAttribute("class", "tfrRelatedVideo");
      relatedVideoCell3.setAttribute("class", "tfrRelatedVideo");
      relatedVideoCell4.setAttribute("class", "tfrRelatedVideo");
      relatedVideoCell5.setAttribute("class", "tfrRelatedVideo");
      relatedVideoCell6.setAttribute("class", "tfrRelatedVideo");
      relatedVideoCell7.setAttribute("class", "tfrRelatedVideo");
      relatedVideoCell8.setAttribute("class", "tfrRelatedVideo");
      relatedVideoCell9.setAttribute("class", "tfrRelatedVideo");
      relatedVideoCell0.setAttribute("style", "border:none; text-align:center; margin:0px; padding:2px;");
      relatedVideoCell1.setAttribute("style", "border:none; text-align:center; margin:0px; padding:2px;");
      relatedVideoCell2.setAttribute("style", "border:none; text-align:center; margin:0px; padding:2px;");
      relatedVideoCell3.setAttribute("style", "border:none; text-align:center; margin:0px; padding:2px;");
      relatedVideoCell4.setAttribute("style", "border:none; text-align:center; margin:0px; padding:2px;");
      relatedVideoCell5.setAttribute("style", "border:none; text-align:center; margin:0px; padding:2px;");
      relatedVideoCell6.setAttribute("style", "border:none; text-align:center; margin:0px; padding:2px;");
      relatedVideoCell7.setAttribute("style", "border:none; text-align:center; margin:0px; padding:2px;");
      relatedVideoCell8.setAttribute("style", "border:none; text-align:center; margin:0px; padding:2px;");
      relatedVideoCell9.setAttribute("style", "border:none; text-align:center; margin:0px; padding:2px;");
      if(responseXml.getElementsByTagName("relatedvideo")[0]) {
        relatedVideoCell0.setAttribute("id", "tfrRelatedVideo" + videoId + "_" + responseXml.getElementsByTagName("relatedvideo")[0].getElementsByTagName("id")[0].innerHTML);
      }
      if(responseXml.getElementsByTagName("relatedvideo")[1]) {
        relatedVideoCell1.setAttribute("id", "tfrRelatedVideo" + videoId + "_" + responseXml.getElementsByTagName("relatedvideo")[1].getElementsByTagName("id")[0].innerHTML);
      }
      if(responseXml.getElementsByTagName("relatedvideo")[2]) {
        relatedVideoCell2.setAttribute("id", "tfrRelatedVideo" + videoId + "_" + responseXml.getElementsByTagName("relatedvideo")[2].getElementsByTagName("id")[0].innerHTML);
      }
      if(responseXml.getElementsByTagName("relatedvideo")[3]) {
        relatedVideoCell3.setAttribute("id", "tfrRelatedVideo" + videoId + "_" + responseXml.getElementsByTagName("relatedvideo")[3].getElementsByTagName("id")[0].innerHTML);
      }
      if(responseXml.getElementsByTagName("relatedvideo")[4]) {
        relatedVideoCell4.setAttribute("id", "tfrRelatedVideo" + videoId + "_" + responseXml.getElementsByTagName("relatedvideo")[4].getElementsByTagName("id")[0].innerHTML);
      }
      if(responseXml.getElementsByTagName("relatedvideo")[5]) {
        relatedVideoCell5.setAttribute("id", "tfrRelatedVideo" + videoId + "_" + responseXml.getElementsByTagName("relatedvideo")[5].getElementsByTagName("id")[0].innerHTML);
      }
      if(responseXml.getElementsByTagName("relatedvideo")[6]) {
        relatedVideoCell6.setAttribute("id", "tfrRelatedVideo" + videoId + "_" + responseXml.getElementsByTagName("relatedvideo")[6].getElementsByTagName("id")[0].innerHTML);
      }
      if(responseXml.getElementsByTagName("relatedvideo")[7]) {
        relatedVideoCell7.setAttribute("id", "tfrRelatedVideo" + videoId + "_" + responseXml.getElementsByTagName("relatedvideo")[7].getElementsByTagName("id")[0].innerHTML);
      }
      if(responseXml.getElementsByTagName("relatedvideo")[8]) {
        relatedVideoCell8.setAttribute("id", "tfrRelatedVideo" + videoId + "_" + responseXml.getElementsByTagName("relatedvideo")[8].getElementsByTagName("id")[0].innerHTML);
      }
      if(responseXml.getElementsByTagName("relatedvideo")[9]) {
        relatedVideoCell9.setAttribute("id", "tfrRelatedVideo" + videoId + "_" + responseXml.getElementsByTagName("relatedvideo")[9].getElementsByTagName("id")[0].innerHTML);
      }
      relatedVideoRow0.appendChild(relatedVideoCell0);
      relatedVideoRow0.appendChild(relatedVideoCell1);
      relatedVideoRow0.appendChild(relatedVideoCell2);
      relatedVideoRow0.appendChild(relatedVideoCell3);
      relatedVideoRow0.appendChild(relatedVideoCell4);
      relatedVideoRow1.appendChild(relatedVideoCell5);
      relatedVideoRow1.appendChild(relatedVideoCell6);
      relatedVideoRow1.appendChild(relatedVideoCell7);
      relatedVideoRow1.appendChild(relatedVideoCell8);
      relatedVideoRow1.appendChild(relatedVideoCell9);
      relatedVideoTable.appendChild(relatedVideoRow0);
      relatedVideoTable.appendChild(relatedVideoRow1);
      relatedVideoBox.appendChild(relatedVideoTable);
      if(hdVideoAvailable) {
        var hdOnLink = window.document.createElement("a");
        hdOnLink.setAttribute("id", "tfrHtml5Option" + videoId + "HdOn");
        hdOnLink.setAttribute("onclick", "javascript:window.document.getElementById(\"tfrHtml5Option" + videoId + "HdOn\").style.display = \"none\"; window.document.getElementById(\"tfrHtml5Option" + videoId + "HdOff\").style.display = \"inline\"; var pos = window.document.getElementById(\"tfrHtml5Video" + videoId + "\").currentTime; var vidpau = window.document.getElementById(\"tfrHtml5Video" + videoId + "\").paused; window.document.getElementById(\"tfrHtml5Video" + videoId + "\").setAttribute(\"src\", \"" + hdVideoUrl + "\"); window.document.getElementById(\"tfrHtml5Video" + videoId + "\").load(); window.document.getElementById(\"tfrHtml5Video" + videoId + "\").setAttribute(\"onloadedmetadata\", \"if(!\" + vidpau + \") { window.document.getElementById(\\\"tfrHtml5Video" + videoId + "\\\").play(); } window.document.getElementById(\\\"tfrHtml5Video" + videoId + "\\\").currentTime = \" + pos + \";\"); return false;");
        hdOnLink.setAttribute("style", "color:white;");
        hdOnLink.appendChild(window.document.createTextNode("HD ein"));
        videoOptionBox.appendChild(hdOnLink);
        var hdOffLink = window.document.createElement("a");
        hdOffLink.setAttribute("id", "tfrHtml5Option" + videoId + "HdOff");
        hdOffLink.setAttribute("onclick", "javascript:window.document.getElementById(\"tfrHtml5Option" + videoId + "HdOff\").style.display = \"none\"; window.document.getElementById(\"tfrHtml5Option" + videoId + "HdOn\").style.display = \"inline\"; var pos = window.document.getElementById(\"tfrHtml5Video" + videoId + "\").currentTime; var vidpau = window.document.getElementById(\"tfrHtml5Video" + videoId + "\").paused; window.document.getElementById(\"tfrHtml5Video" + videoId + "\").setAttribute(\"src\", \"" + sdVideoUrl + "\"); window.document.getElementById(\"tfrHtml5Video" + videoId + "\").load(); window.document.getElementById(\"tfrHtml5Video" + videoId + "\").setAttribute(\"onloadedmetadata\", \"if(!\" + vidpau + \") { window.document.getElementById(\\\"tfrHtml5Video" + videoId + "\\\").play(); } window.document.getElementById(\\\"tfrHtml5Video" + videoId + "\\\").currentTime = \" + pos + \";\"); return false;");
        hdOffLink.setAttribute("style", "color:white; display:none;");
        hdOffLink.appendChild(window.document.createTextNode("HD aus"));
        videoOptionBox.appendChild(hdOffLink);
        videoOptionBox.appendChild(window.document.createTextNode(" \u00B7 "));
      }
      var noHtml5Link = window.document.createElement("a");
      noHtml5Link.setAttribute("id", "tfrHtml5Option" + videoId + "NoHTML5");
      noHtml5Link.setAttribute("onclick", "javascript:try {window.sessionStorage.setItem(\"tfrNoHTML5Video\", \"true\");} catch(e) {window.name += \";tfrNoHTML5Video\";} window.location.reload(); return false;");
      noHtml5Link.setAttribute("style", "color:white;");
      noHtml5Link.appendChild(window.document.createTextNode("Kein HTML5"));
      videoOptionBox.appendChild(noHtml5Link);
      if(window.document.getElementById("NVBPlayer" + videoId + "video")) {
        window.document.getElementById("NVBPlayer" + videoId + "video").parentNode.removeChild(window.document.getElementById("NVBPlayer" + videoId + "video"));
      }
      window.document.getElementById("NVBPlayer" + videoId).appendChild(videoElem);
      window.document.getElementById("NVBPlayer" + videoId).appendChild(videoOptionBox);
      window.document.getElementById("NVBPlayer" + videoId).appendChild(relatedVideoBox);
      FillRelatedVideos();
    }
  });
}
function FillRelatedVideos() {
  for(var i = 0; i < window.document.getElementsByClassName("tfrRelatedVideo").length; i++) {
    if(typeof window.document.getElementsByClassName("tfrRelatedVideo")[i].id !== "undefined" && window.document.getElementsByClassName("tfrRelatedVideo")[i].id.search(/^tfrRelatedVideo[0-9]*_[0-9]*$/) >= 0) {
      var elemId = window.document.getElementsByClassName("tfrRelatedVideo")[i].id
      elemId.match(/^tfrRelatedVideo([0-9]*)_([0-9]*)$/);
      parentId = RegExp.$1;
      var videoId = RegExp.$2;
      GM_xmlhttpRequest({
        method: "GET",
        url: "//video.golem.de/xml/" + videoId + ".xml",
        onload: function(response) {
          var responseXml = new DOMParser().parseFromString(response.responseText, "text/xml");
          var videoId = responseXml.getElementsByTagName("id")[0].innerHTML;
          var videoTitle = responseXml.getElementsByTagName("title")[0].innerHTML;
          var videoPage = responseXml.getElementsByTagName("detailsurl")[0].innerHTML;
          var sdVideoThumb = "//video.golem.de" + responseXml.getElementsByTagName("medium")[0].getElementsByTagName("teaser")[0].getElementsByTagName("url")[0].innerHTML;
          var videoLink = window.document.createElement("a");
          videoLink.setAttribute("href", "//video.golem.de" + videoPage);
          videoLink.setAttribute("title", videoTitle);
          var videoImage = window.document.createElement("img");
          videoImage.setAttribute("src", sdVideoThumb);
          videoImage.setAttribute("width", "120");
          videoImage.setAttribute("alt", videoTitle);
          videoLink.appendChild(videoImage);
          videoLink.appendChild(window.document.createTextNode(videoTitle));
          window.document.getElementById("tfrRelatedVideo" + parentId + "_" + videoId).appendChild(videoLink);
        }
      });
    }
  }
}
ReplacePlayers();