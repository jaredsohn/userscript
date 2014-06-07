// ==UserScript==
// @name           SnowStorm Killer
// @namespace      http://pioupioum.fr
// @description    Remove "Snow Storm" effect added by Snowstorm script.
// @version        1.2
// @author         Mehdi Kabab
// @include        *
// @grant          none
// ==/UserScript==
/*
# ***** BEGIN LICENSE BLOCK *****
# Copyright (C) 2008 Mehdi Kabab <http://pioupioum.fr/>.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# ***** END LICENSE BLOCK ***** */
(function(uw){
  var noop = function () {};

  function stopAndClean(s)
  {
    s.stop();

    // clean this mess
    var flakes = s.flakes;
    s = uw.snowStorm = noop;
    if (!flakes.length)
      return;

    p = flakes[0].o.parentNode;
    for (var i = 0, f; f = flakes[i++];) {
      p.removeChild(f.o);
    }
  };

  // SnowStorm 1.1+
  if ('function' == typeof uw.SnowStorm) {
    // SnowStorm 1.3
    if (!uw.snowStormInit) {
      stopAndClean(uw.snowStorm);
    }
    uw.SnowStorm = noop;
  }
  // SnowStorm 1.4+
  else if (!!uw.snowStorm) {
    stopAndClean(uw.snowStorm);
  }
})(unsafeWindow);
