/*
    Redirect LinkBucks to its target location.
    Copyright (C) 2013 LouCypher

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
// @name            LinkBucks Redir
// @namespace       http://userscripts.org/users/12
// @description     Redirect LinkBucks to its target location.
// @version         2.0
// @author          LouCypher
// @license         GPL
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/adf.ly-redir
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/linkbucks-redir.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/linkbucks-redir.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         http://*.linkbucks.com/
// @include         http://*.any.gs/
// @include         http://*.amy.gs/
// @include         http://*.deb.gs/
// @include         http://*.dyo.gs/
// @include         http://*.theseforums.com/
// @include         http://*.theseblogs.com/
// @include         http://*.ubervidz.com/
// @include         http://*.uberpicz.com/
// @include         http://*.zxxo.net/
// @include         http://*.ugalleries.net/
// @include         http://*.picturesetc.net/
// @include         http://*.filesonthe.net/
// @include         http://*.cash4files.com/
// @include         http://*.cash4links.co/
// @include         http://*.miniurls.co/
// @include         http://*.ultrafiles.net/
// @include         http://*.drstickyfingers.com/
// @include         http://*.allanalpass.com/
// @include         http://*.freean.us/
// @include         http://*.freegaysitepass.com/
// @include         http://*.fapoff.com/
// @include         http://*.galleries.bz/
// @include         http://*.goneviral.com/
// @include         http://*.hornywood.tv/
// @include         http://*.sexpalace.gs/
// @include         http://*.linkbabes.com/
// @include         http://*.linkseer.net/
// @include         http://*.megaline.co/
// @include         http://*.picbucks.com/
// @include         http://*.poontown.net/
// @include         http://*.seriousdeals.net/
// @include         http://*.seriousfiles.com/
// @include         http://*.urlbeat.net/
// @include         http://*.youfap.me/
// @include         http://*.whackyvidz.com/
// @include         http://*.tubeviral.com/
// @include         http://*.tnabucks.com/
// @include         http://*.tinylinks.co/
// @include         http://*.rqq.co/
// @include         http://*.qqc.co/
// @include         http://*.yyv.co/
// @include         http://*.zff.co/
// @grant           none
// ==/UserScript==

var xpath = "./script[not(@src) and text()[contains(.,'TargetUrl =')]]";
var script = document.evaluate(xpath, document.body, null, 9, null).singleNodeValue;
if (script) {
  document.body.innerHTML = document.title = "Redirecting\u2026";
  var targetURL = script.textContent.match(/TargetUrl.*\'http.*(?=')/).toString()
                        .replace(/TargetUrl.*\'/, "");
  location.replace(targetURL);
}
