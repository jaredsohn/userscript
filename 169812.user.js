// ==UserScript==
// @name            Adf.ly Redirect
// @namespace       http://userscripts.org/users/12
// @description     Redirect adf.ly to its target location.
// @version         6.1
// @author          LouCypher
// @contributor     AMZMA (bug reports and feature requests)
// @contributor     coolkips (base64 info)
// @license         GPL
// @homepageURL     https://userscripts.org/scripts/show/141047
// @updateURL       https://userscripts.org/scripts/source/141047.meta.js
// @downloadURL     https://userscripts.org/scripts/source/141047.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         http://adf.ly/*
// @include         https://adf.ly/*
// @include         http://j.gs/*
// @include         http://q.gs/*
// @include         http://9.bb/*
// @include         http://u.bb/*
// @exclude         http://adf.ly/go/*
// @exclude         https://adf.ly/go/*
// @grant           none
// ==/UserScript==

(function() {
  var gStorage = ["adfly_redirURL", "adfly_redirTitle"];

  if (/locked/.test(location.pathname)) {
    redir(sessionStorage.getItem(gStorage[0]),
          sessionStorage.getItem(gStorage[1]));
    return;
  }

  var xpath = "/html/head/script[not(@src) and text()[contains(.,'var zzz =')]]";
  var script = document.evaluate(xpath, document, null, 9, null).singleNodeValue;
  if (script) {
    var regx = /zzz.*(?=')/;
    var url = script.textContent.match(regx).toString().split("'")[1];
    if (/adf.ly\/go.php/.test(url)) {
      url = atob(url.replace(/^https?:\/\/adf.ly\/go.php\?u\=/, ""));
    }
    sessionStorage.setItem(gStorage[0], url);
    sessionStorage.setItem(gStorage[1], document.title);
    redir(url, document.title);
    return;
  }

  function redir(aURL, aTitle) {
    document.title = "Redirecting to " + aTitle;
    document.body.innerHTML = "Redirecting\u2026";
    location.replace(aURL);
  }
})()