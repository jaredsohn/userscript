/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            Wikipedia: Edit 1st Section
// @namespace       http://mozilla.status.net/loucypher
// @description     Allow editing the first section
// @author          LouCypher
// @version         2.0
// @license         WTFPL http://sam.zoy.org/wtfpl/
// @updateURL       https://userscripts.org/scripts/source/106314.meta.js
// @include         http://*.wikipedia.org/wiki/*
// @include         https://*.wikipedia.org/wiki/*
// @grant           none
// ==/UserScript==

(function() {
  var isArticle = getGlobalValue("wgIsArticle");
  if (!isArticle) return;
  var pageName = getGlobalValue("wgPageName");
  var head = document.querySelector("#content > #firstHeading");

  var span = head.parentNode.insertBefore(document.createElement("span"),
                                          head);
  span.className = "editsection";
  span.style.fontSize = "80%";
  span.textContent = "[";

  var link = span.appendChild(document.createElement("a"));
  link.title = "Edit section: " + head.textContent;
  link.setAttribute("href", "/w/index.php?title=" + pageName +
                            "&action=edit&section=0");
  link.textContent = "edit";

  span.appendChild(document.createTextNode("]"));

  //@https://github.com/LouCypher/userscripts/tree/master/getGlobalValue.js
  /*
      Get value a global variable from user script. Version 1.3
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

  /**
   * Get the value of a global variable.
   *
   * @param aGlobalVarName
   *        String. The name of global variable.
   *        To get property of a global object, use "object['property']"
   *        or "object['property1']['property2']".
   * @param debug [optional]
   *        Boolean. If true, display 'variable = value' in console.
   * @returns The value of aGlobalVarName.
   *          If aGlobalVarName is undefined, returns null.
   */
  function getGlobalValue(aGlobalVarName, debug) {
    var script = document.querySelector("head")
                         .appendChild(document.createElement("script"));
    script.type = "text/javascript";

    // Unique name for sessionStorage
    var itemName = "globalValue_" + (new Date()).getTime().toString();

    // Store global value to sessionStorage
    script.textContent = "sessionStorage['" + itemName + "'] = " +
                         "JSON.stringify({'value' : " + aGlobalVarName + "})";

    var globalValue;
    try {
      // Get global value from sessionStorage
      globalValue = JSON.parse(sessionStorage[itemName]).value;
    } catch (ex) {}

    // Clean up
    script.parentNode.removeChild(script); // Remove <script> from DOM
    sessionStorage.removeItem(itemName); // Remove sessionStorage item

    debug && console.log(aGlobalVarName + " = " + globalValue);

    return globalValue; // Returns the value of aGlobalVarName
                        // Returns null if aGlobalVarName is undefined
  }
})()