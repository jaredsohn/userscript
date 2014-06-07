// ==UserScript==
// @name          TVNZ OnDemand direct download script v0.9
// @namespace     http://www.additiverich.com/gm/
// @description   Links directly to flash video (FLV) files on TVNZ's website
// @include       http://tvnz.co.nz/*
// @include       http://tvnzondemand.co.nz/content/*
// ==/UserScript==

window.addEventListener(
  'load',
  function() { doLoad(); },
  true);

function doLoad() {
  playlistURI = unsafeWindow.videoVars.playlist;
  if(playlistURI) {

    /* Download SMIL from server */
    GM_xmlhttpRequest({
      method: 'GET',
      url   : 'http://' + document.domain + playlistURI,
      onload : completeRequest
    });
  }
}

function completeRequest(r) {
  var parser = new DOMParser();
  var dom = parser.parseFromString(r.responseText, "application/xml");
  var videos = dom.getElementsByTagName('seq');

  chapter = "";
  currentChapter = "";
  links = "";

  for (var i = 0; i < videos.length; i++) {
    /* Find the JSON */
    params = videos[i].getElementsByTagName('param');
    for (var x = 0; x < params.length; x++) {
      param = params[x];
      /* Get the chapter name */
      if(param.getAttribute('name') == 'conviva') {
        json = param.textContent;
        data = eval('(' + json + ')')
        chapter = data.tags.Chapter;
      }
    }

    var pars = videos[i].getElementsByTagName('par');
    var v = pars[0].getElementsByTagName('video');

    for (var x = 0; x < v.length; x++) {
      var url = v[x].getAttribute("src");

      if(url.indexOf("http") > -1) {
        var bitrate = v[x].getAttribute("systemBitrate");
        bitrate = Math.ceil(bitrate / 1000) + "k";
        if(chapter != currentChapter) {
          links += "&nbsp;&nbsp;<span class=\"episode_num\">Chapter " + chapter + ": ";
        }
        links += "&nbsp;&nbsp;<a href=\"" + url + "\">" + bitrate + "</a>";

        if(chapter != currentChapter) {
          currentChapter = chapter;
        }
      }
    }
  }

  if(links != "") {
    links = "<strong>Download options</strong><br />" + links;
    document.getElementById("video-container").innerHTML += links;
  }
  else {
    document.getElementById("video-container").innerHTML += "<strong>Sorry, this title can't be downloaded</strong>";
  }
}
