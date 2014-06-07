/*
    Allows you to update code from script source page directly.
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
// @name            USO: Edit code on source page
// @namespace       http://userstyles.org/users/12
// @description     Allows you to update code from script source page directyly.
// @version         3.6
// @author          LouCypher
// @license         GPL
// @updateURL       https://userscripts.org/scripts/source/128324.meta.js
// @include         https://userscripts.org/scripts/review/*
// @include         http://userscripts.org/scripts/review/*
// @include         http://userscripts.org./scripts/review/*
// @include         http://greasefire.userscripts.org./scripts/review/*
// @match           *://userscripts.org/scripts/review/*
// @match           *://userscripts.org./scripts/review/*
// @match           *://greasefire.userscripts.org./scripts/review/*
// ==/UserScript==

(function(){
  var isAdmin = document.querySelector("#script-nav .menu .admin");
  //console.log(isAdmin != null);
  if (!isAdmin) return;

  var token = getGlobalValue("auth_token");

  var scriptId = location.pathname.match(/\d+/).toString();
  //console.log(scriptId);

  var form = document.createElement("form");
  form.method = "POST";
  form.action = "/scripts/edit_src/" + scriptId;
  form.style.display = "none";
  form.innerHTML = '<div style="margin:0; padding:0; display:inline">'
                 + '<input type="hidden" value="' + token
                 + '" name="authenticity_token"/></div>'
                 + '<p style="margin-bottom: 0;"><input type="submit" '
                 + 'value="Update" name="commit"/> or </p>'
                 + '<textarea name="src" id="script_src" cols="40" '
                 + 'style="width: 98%; height: 500px" rows="20"></textarea>';
  form.addEventListener("submit", function(e) { // This doesn't work on Opera
    if (this.querySelector("[name='src']")
            .value == source.textContent) {
      e.preventDefault();
      alert("1 error prohibited this version from being saved\n\n"
          + "There were problems with the following fields:\n"
          + "\u2022 Src Source contains no changes from previous version");
    }
  }, false);

  var edit = document.createElement("a");
  edit.href = "/scripts/edit_src/" + scriptId;
  edit.style.marginBottom = "0";
  edit.textContent = "Edit code";
  edit.addEventListener("click", function(e) {
    e.preventDefault();
    var textBox = document.getElementById("script_src");
    if ((this.textContent == "Cancel") &&
        (textBox.value != source.textContent)) {
      var ask = confirm("Discard changes?");
      if (!ask) return;
    }
    this.textContent = (this.textContent == "Cancel") ? "Edit code"
                                                      : "Cancel";
    if (this.parentNode.id == "content") {
      document.querySelector("input[name='commit']")
              .parentNode.appendChild(this);
    } else {
      source.parentNode.insertBefore(this, source);
    }
    textBox.value = source.textContent;
    source.style.display = (source.style.display == "") ? "none" : "";
    form.style.display = (form.style.display == "") ? "none" : "";
  }, false);

  var source = document.getElementById("source");
  source.style.marginTop = "0";
  source.parentNode.insertBefore(edit, source);
  source.parentNode.appendChild(form);

  /**
   * Get the value of a global variable.
   *
   * @param aGlobalVarName
   *        String. The name of global variable.
   * @param debug [optional]
   *        Boolean. If true, display 'variable = value' in console.
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
    } catch (ex) {
      throw ex + "\n" + aGlobalVarName + " is undefined.";
    }

    // Clean up
    script.parentNode.removeChild(script); // Remove <script> from DOM
    sessionStorage.removeItem(itemName); // Remove sessionStorage item

    debug && console.log(aGlobalVarName + " = " + globalValue);

    return globalValue; // Returns the value of aGlobalVarName
  }
})()