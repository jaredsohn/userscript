// ==UserScript==
// @name           Fix world-art.ru links
// @namespace      urn:uuid:ec9e3abf-72c1-45f1-ae32-d683f9a8a92a
// @description    Fixes world-art.ru links to more appropriate location. Version 1.1.
// @include        *
// @exclude        http://www.world-art.ru/*
// @exclude        http://world-art.ru/*
// ==/UserScript==

(function() {
  var arrIDPairs = [];

  function LoadIDPairs() {
    var strData = GM_getValue('idpairs_anidb', '');
    if (strData != '') {
      var arrPairs = strData.split(';');
      if (arrPairs.shift() == 'IDPairs') {
        for (var iIndex in arrPairs) {
          var arrPair = arrPairs[iIndex].split('=');
          arrIDPairs[arrPair[0]] = arrPair[1];
        }
      }
    }
  }

  function SaveIDPairs() {
    var strData = 'IDPairs';
    for (var iWAID in arrIDPairs) {
      strData += ';' + iWAID + '=' + arrIDPairs[iWAID];
    }
    GM_setValue('idpairs_anidb', strData);
  }

  function AddIDPair(iWAID, iADBID) {
    arrIDPairs[iWAID] = iADBID; SaveIDPairs();
  }

  function FixWALink(objLink) {
    var strURL = objLink.getAttribute('href');
    var mData = /^http:\/\/(www\.)?world-art\.ru\/animation\/animation\.php\?id=(\d+)/.exec(strURL)
    if (mData != null) {
      if (arrIDPairs[mData[2]]) {
        var strNewURL = 'http://anidb.net/a' + arrIDPairs[mData[2]];
        objLink.setAttribute('href', strNewURL);
        if (objLink.textContent.match(/^\s*http:\/\/(www\.)?world-art\.ru\//i)) { objLink.textContent = strNewURL; }
      } else {
        GM_xmlhttpRequest({
          'method' : 'GET',
          'url'    : strURL,
          'onload' : function(details) {
            var reRate = new RegExp('aid=(\\d+)"[^>]+>AniDB</a>', 'i');
            var mRate = reRate.exec(details.responseText);
            if (mRate != null && objLink) {
              AddIDPair(mData[2], mRate[1]);
              var strNewURL = 'http://anidb.net/a' + mRate[1];
              objLink.setAttribute('href', strNewURL);
              if (objLink.textContent.match(/^\s*http:\/\/(www\.)?world-art\.ru\//i)) { objLink.textContent = strNewURL; }
            }
          }
        });
      }
    }
  }

  window.addEventListener('load', function() {
    var objSnapshot = document.evaluate("//a[contains(@href, 'world-art.ru/animation/animation.php?id=')]",
                                        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (objSnapshot.snapshotLength > 0) { LoadIDPairs(); }
    for (var i = 0 ; i < objSnapshot.snapshotLength; i++) {
      FixWALink(objSnapshot.snapshotItem(i));
    }
  }, false);
})();
