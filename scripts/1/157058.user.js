/*
    Redirect adf.ly to its target location.
    Copyright (C) 2012 LouCypher

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>
*/

// ==UserScript==
// @name            adf.ly Redir
// @namespace       http://userscripts.org/users/12
// @description     Redirect adf.ly to its target location.
// @version         5.6
// @author          LouCypher
// @contributor     AMZMA (bug reports and feature requests)
// @license         GPL
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/adf.ly-redir
// @updateURL       https://userscripts.org/scripts/source/141047.meta.js
// @downloadURL     https://userscripts.org/scripts/source/141047.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         http://adf.ly/*
// @include         https://adf.ly/*
// @include         http://j.gs/*
// @include         http://q.gs/*
// @include         http://9.bb/*
// @include         http://u.bb/*
// @exclude         http://adf.ly/go/*
// @exclude         https://adf.ly/go/*
// ==/UserScript==

(function() {
  var gStorage = ["adfly_redirURL", "adfly_redirTitle"];

  if (/blocked/.test(location.pathname)) {
    redir(sessionStorage.getItem(gStorage[0]),
          sessionStorage.getItem(gStorage[1]));
    return;
  }

  var scripts = document.querySelectorAll("script:not([src])");
  if (scripts.length) {
    var regx = /\/go\/.*(?=')/;
    for (var i = 0; i < scripts.length; i++) {
      if (regx.test(scripts[i].textContent)) {
        var path = scripts[i].textContent.match(regx).toString();
        sessionStorage.setItem(gStorage[0], path);
        sessionStorage.setItem(gStorage[1], document.title);
        redir(path, document.title);
        return;
      }
    }
  }

  function redir(aPath, aTitle) {
    document.title = "Redirecting to " + aTitle;
    document.body.innerHTML = "Redirecting\u2026";
    location.replace("https://adf.ly" + aPath);
  }
})()