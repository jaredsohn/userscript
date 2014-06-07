// ==UserScript==
// @name           RaiTv Video Link
// @namespace      http://wedjaa.net/mrwho/raitv
// @description    Adds a link in the Rai.tv video pages to directly access the video stream.
// @include        http://*.rai.tv/*
// ==/UserScript==



var linkFound = 0;

function getLink() {

  GM_log("Fetching original HTML for : " + document.location);
  var req = new XMLHttpRequest();
  req.open('GET', document.location, false);
  req.send(null);
 
  var originalHTML = req.responseText;

  var matches = originalHTML.match(/videoURL[ ]+=[ ]+\"([^\"]+)\"/);
  if ( matches ) {
        linkFound = 1;
        var videoURL = matches[1];
        GM_log("Video URL: " + videoURL);
        var videoWindow = document.getElementById('silverlightControlHost');
        var contentWindow = document.getElementById('Player');
        var linkElement = document.createElement('div');
        linkElement.setAttribute('style', 'background: #777;');
        linkElement.innerHTML = '<a style="color: #fff; font-family: sans,helvetica,arial; font-weight: bold;" href="' + videoURL + '">Watch Video</a>';
        contentWindow.insertBefore(linkElement, videoWindow);
  }

}

var timeOut = 60000;

function waitLink() {

  getLink();

  if ( !linkFound ) {
        GM_log("Waiting 3 seconds for page to load...");
        if ( timeOut > 0 ) {
          GM_log("Timeout: " + timeOut);
          timeOut -= 3000;
          setTimeout(waitLink, 3000);
        } 
        else {
                GM_log("Timed out! This page has no video links...");
        }
  }
  else {
        GM_log("Created video link!");
  }
}


function addChannel(channel, channelName) {

  GM_xmlhttpRequest({
    method: "GET",
    url: "http://mediapolis.rai.it/relinker/relinkerServlet.htm?cont="+channel,
    headers: {
        "viaurl": "www.rai.tv"
    },
    onload: function(response) {
      var refmatches = response.responseText.match(/HREF=\"([^\"]+)\"/);
      if (refmatches) {
          var channelUrl = refmatches[1];
          GM_log("Found "+channelName+": " + channelUrl);
          var videoWindow = document.getElementById('silverlightControlHost');
          var contentWindow = document.getElementById('Player');
          var linkElement = document.createElement('div');
          linkElement.setAttribute('style', 'background: #777; position: inline; float: left; padding-right: 5px; ');
          linkElement.innerHTML = '<a style="color: #fff; font-family: sans,helvetica,arial; font-weight: bold;" href="' 
                                + channelUrl + '">'+ channelName + '</a>';
          contentWindow.insertBefore(linkElement, videoWindow);
      }
      GM_log([
        response.status,
        response.statusText,
        response.readyState,
        response.responseHeaders,
        response.responseText,
        response.finalUrl,
        response.responseXML
      ].join("\n"));
    }
  });

}

// Prepare Channel Links
addChannel("983", "RaiUno");
addChannel("984", "RaiDue");
addChannel("986", "RaiTre");
addChannel("1", "RaiNews24");
addChannel("75708", "RaiQuattro");
addChannel("4119", "RaiGulp");
addChannel("4145", "RaiSport");
addChannel("4152", "RaiScuola");
addChannel("24269", "RaiStoria");
addChannel("72382", "RaiSat Extra");
addChannel("72383", "RaiSat Premium");
addChannel("72384", "RaiSat YoYo");
addChannel("72381", "RaiSat Cinema");

waitLink();