// ==UserScript==
// @name        TracksFlow Download
// @namespace   https://github.com/denispostu/
// @description Tracksflow content downloader
// @author      Denis Postu <denis.postu@gmail.com>
// @copyright   Denis Postu, 2013
// @version     1.2
// @include     http://tracksflow.com/*
// tested in    Google Chrome v24.0.1312.52 m
// relies on    browser support for a[download] (see http://updates.html5rocks.com/2011/08/Downloading-resources-in-HTML5-a-download)
// ==/UserScript==

(function () {
  // workaround for Chrome not supporting unsafeWindow
  var bGreasemonkeyServiceDefined = false;
  try {
    if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
      bGreasemonkeyServiceDefined = true;
    }
  } catch (e) { }
  if (typeof unsafeWindow === "undefined" || !bGreasemonkeyServiceDefined) {
    unsafeWindow = (function () {
      var dummyElem = document.createElement('p');
      dummyElem.setAttribute('onclick', 'return window;');
      return dummyElem.onclick();
    })();
  }

  var window = unsafeWindow,
    performDownload = function (link, trackName) {
      if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        var a = document.createElement('a');
        a.href = link;
        a.target = '_blank';
        a.download = trackName;
        a.click();
      } else {
        window.open(link);
      }
    };

  var onDownloadClicked = function () {
    var track = window.views.actionMenu.model,
      link = track.get('link'),
      trackName = track.getArtist() + ' - ' + track.getName();

    if (link) {
      performDownload(link, trackName);
    } else {
      window.player.getLink(track, {
        success: function (link, duration) { performDownload(link, trackName); },
        error: function () { }
      });
    }
  };

  var init = function () {
    window.views.actionMenu.trackMenu = window.views.actionMenu.trackMenu.add('Download', onDownloadClicked).add('');
  };

  window.addEventListener('load', function () {
    init();
  });
}());