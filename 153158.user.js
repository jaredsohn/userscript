/*
    Change standalone image background and show its transparency on Firefox.
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
// @name            Standalone Image Background and Transparency
// @namespace       http://userscripts.org/users/12
// @description     Change standalone image background and show its transparency on Firefox. Use context menu to configure.
// @version         9.0
// @author          LouCypher
// @license         GPL
// @screenshot      http://loucypher.github.io/userscripts/image-background/images/screenshot-after.png
// @icon            http://loucypher.github.io/userscripts/image-background/images/miku-icon48.png
// @icon64URL       http://loucypher.github.io/userscripts/image-background/images/miku-icon64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Standalone+Image+Background
// @homepageURL     https://greasyfork.org/scripts/63
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @downloadURL     https://greasyfork.org/scripts/63/code.user.js
// @updateURL       https://greasyfork.org/scripts/63/code.user.js
// @require         https://greasyfork.org/libraries/jscolor/1.4.2/jscolor.js
// @resource        hs.png https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/hs.png
// @resource        hv.png https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/hv.png
// @resource        arrow.gif https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/arrow.gif
// @resource        cross.gif https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/cross.gif
// @resource        CSS https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.css
// @resource        HTML https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.html
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/image-background/changelog.txt
// @resource        thanks https://raw.github.com/LouCypher/userscripts/master/image-background/thanks.html
// @run-at          document-start
// @include         *
// @grant           GM_addStyle
// @grant           GM_getResourceText
// @grant           GM_getResourceURL
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_log
// ==/UserScript==

function $(aId) document.getElementById(aId);

function getThanksURL() {
  var url = GM_getResourceURL("thanks");
  if (/^data\:/.test(url)) // If old GM_resourceURL
    url = url.replace(/text\/plain/, "text/html");
  return url;
}

// Show 'thank you' page
function showThanks(aEvent) {
  if (aEvent)
    aEvent.preventDefault();
  GM_openInTab(getThanksURL()); // Open 'thank you' page
}

// Executed on right click
function popupShowing(aEvent) {
  var node = aEvent.target; // The web element you right click on
  while (node && node.id != "color-config")
    node = node.parentNode;
  if (node) // Color config dialog
    gDocElm.removeAttribute("contextmenu"); // Hide context menu items
  else
    gDocElm.setAttribute("contextmenu", "context-menu"); // Show context menu items

  // Check/uncheck menu items based on prefs
  $("toggle-background-image").checked = GM_getValue("bgImage");
  $("toggle-image-transparency").checked = GM_getValue("imgTrans");
  $("toggle-image-placeholder").checked = GM_getValue("placeholder");
  $("toggle-image-placeholder").hidden = !$("toggle-image-transparency").checked;
}

// Check validity of color value
function validateColor(aColor, aCallback) {
  // Set dummy element color
  $("dummy").style.color = (aColor == "") ? "#222" : aColor;
  var save = false;
  var computedColor = getComputedStyle($("dummy"), null).color;

  if (computedColor == "transparent") // If dummy element's color is not set because invalid color value
    alert("Invalid color value: " + aColor);
  else {
    aCallback(aColor); // Run callback function
    save = true;
  }
  $("dummy").style.color = ""; // Reset dummy element's color
  return save;
}

// Set background color
function setBgColor(aColorValue) {
  if (aColorValue == "")
    gDocElm.style.backgroundColor = ""; // Use default color from CSS resource
  else
    setStyleProperty(gDocElm, "background-color", aColorValue);
}

// Save color setting to preferences
function saveBgColor() {
  var color = $("color-picker").value;
  if (validateColor(color, setBgColor)) { // If color value is valid
    GM_setValue("bgColor", color); // Save color value to pref
    saveComputedColor();
    hideColorConfig();
  }
}

// Reset background color to previous setting
function resetBgColor() {
  setStyleProperty(gDocElm, "background-color", GM_getValue("bgColor", ""));
  hideColorConfig();
}

// Use default background color
function defaultBgColor() {
  $("color-picker").value = "";
  gDocElm.style.backgroundColor = "";
}

// Show color configuration dialog
function showColorConfig() {
  $("change-background-color").disabled = true; // Disable menu item
  $("color-config").className = "";
  $("color-picker").value = GM_getValue("bgColor", "");
  $("color-picker").focus();
}

// Hide color configuration dialog
function hideColorConfig() {
  ("color" in $("color-picker")) && $("color-picker").color.hidePicker();
  $("color-config").className = "hide"; // Hide dialog
  $("change-background-color").disabled = false; // Enable menu item
}

// Preview background color when chosing color in color picker
function previewBgColor(aEvent) {
  setBgColor(aEvent.target.value);
}

// Show color picker
function showPicker(aEvent) {
  ("color" in $("color-picker")) && $("color-picker").color.showPicker();
}

// Hide color picker
function hidePicker(aEvent) {
  var node = aEvent.target;
  if ((node.localName != "div") && !node.id && ("color" in $("color-picker")))
    $("color-picker").color.hidePicker();
}

function showAlert() {
  var scheme = location.protocol;
  var site = (scheme == "file:") ? "file://" : (scheme + "//" + location.hostname);
  alert("Color picker requires JavaScript to be enabled. However,\n" +
        "you can still change the background color by entering any\n" +
        "valid color value.\n\nIf you have NoScript extension, color " +
        "picker will work\nif you select 'Allow [ " + site +
        " ]'\nfrom NoScript menu.");
}

// Enable/disable checkerboard background
function setBgImage(aEnable) {
  if (aEnable) // Enable checkerboard background
    gDocElm.style.backgroundImage = ""; // Use checkerboard bg in CSS resource
  else // Disable checkerboard background
    setStyleProperty(gDocElm, "background-image", "none");

  GM_setValue("bgImage", aEnable); // Save background option to pref
}

// Toggle checkerboard background on/off
function toggleBgImage(aEvent) {
  try {
    var node = aEvent.target;
    if (node instanceof HTMLMenuItemElement)
      setBgImage(node.checked);
    else
      setBgImage(!GM_getValue("bgImage"));
  } catch (ex) {
    setBgImage(!GM_getValue("bgImage"));
  }
}

// Enable/disable image transparency
function showTransparency(aEnable) {
  var image = document.querySelector("img");
  if (aEnable) // Enable image transparency
    image.classList.add("transparent");
  else // Disable image transparency
    image.classList.remove("transparent");

  GM_setValue("imgTrans", aEnable); // Save image transparency option to pref
}

// Toggle image transparency on/off
function toggleTransparency(aEvent) {
  try {
    var node = aEvent.target;
    if (node instanceof HTMLMenuItemElement)
      showTransparency(node.checked);
    else
      showTransparency(!GM_getValue("imgTrans"));
  } catch (ex) {
    showTransparency(!GM_getValue("imgTrans"));
  }
}


// Enable/disable image placeholder
function showPlaceholder(aEnable) {
  var image = document.querySelector("img");
  if (aEnable)
    image.classList.add("placeholder");
  else
    image.classList.remove("placeholder");

  GM_setValue("placeholder", aEnable); // Save image placeholder option to pref
}

// Toggle image placeholder on/off
function togglePlaceholder(aEvent) {
  try {
    var node = aEvent.target;
    if (node instanceof HTMLMenuItemElement)
      showPlaceholder(node.checked);
    else
      showPlaceholder(!GM_getValue("placeholder"));
  } catch (ex) {
    showPlaceholder(!GM_getValue("placeholder"));
  }
}

function setStyleProperty(aNode, aPropertyName, aValue) {
  aNode.style.setProperty(aPropertyName, aValue, "important");
}

function saveComputedColor() {
  GM_setValue("computedColor", getComputedStyle(gDocElm, null).backgroundColor);
}

function init() {
  gDocElm= document.documentElement

  if (!/^image\//.test(document.contentType)) {
    jscolor.binding = false; // Turn off JSColor on non-image page
    return;
  }

  /***** Start checking preferences *****/
  var bgColor = GM_getValue("bgColor", ""); // Get color value pref (def = empty)
  var bgImage = GM_getValue("bgImage", true); // Get background pref (def = true)
  var imgTrans = GM_getValue("imgTrans", true); // Get transparency pref (def = true)
  var placeholder = GM_getValue("placeholder", true); // Get image placeholder pref (def = true)
  var enableSVG = GM_getValue("enableSVG", true);
  var computedColor = GM_getValue("computedColor", "");
  /***** End checking preferences *****/

  if (document.contentType === "image/svg+xml") { // If SVG image
    if (enableSVG) {
      if (typeof GM_notification === "function") { // Scriptish
        window.addEventListener("load", function() {
          initSVG(computedColor, bgImage);
        });
      }
      else // Greasemonkey
        initSVG(computedColor, bgImage);
    }
    GM_registerMenuCommand("Toggle SVG", function() {
      GM_setValue("enableSVG", !enableSVG);
      location.reload();
    }, "S");
    return;
  }

  if (!("contextMenu" in gDocElm && "HTMLMenuItemElement" in window)) {
    alert("This userscript requires Firefox 15 or newer.");
    return;
  }

  setBgColor(bgColor); // Set background color from pref
  setBgImage(bgImage); // Set background patters from pref
  showTransparency(imgTrans); // Set image transparency from pref
  showPlaceholder(placeholder); // Set image placeholder from pref
  saveComputedColor();
  GM_addStyle(GM_getResourceText("CSS")); // Inject style from @resource

  // Append elements
  var div = document.body.appendChild(document.createElement("div"));
  div.innerHTML = GM_getResourceText("HTML");

  // Check if JavaScript is enabled for JSColor to work
  if (getComputedStyle($("noscript"), null).display == "none") { // If JavaScript is enabled
    if (typeof GM_info === "object")  // Greasemonkey, use @resource images for offline use
      jscolor.dir = GM_getResourceURL("LICENSE").match(/[^\/]+/).toString() + "/";
    else  // Scriptish
      jscolor.dir = "https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/";
    $("color-picker").value = bgColor;
  }
  else { // JavaScript is disabled
    jscolor.binding = false; // Disable color picker
    $("error").className = "";
    var p = $("color-config").querySelector("div");
    p.replaceChild(document.createTextNode("Enter valid "), p.firstChild);
  }

  // Monkey Menu
  GM_registerMenuCommand("Change Background Color", showColorConfig);
  GM_registerMenuCommand("Toggle Checkerboard Background", toggleBgImage);
  GM_registerMenuCommand("Toggle Image Transparency", toggleTransparency);
  GM_registerMenuCommand("Toggle Image Placeholder", togglePlaceholder);

  /***** Start context menu initialization *****/
  // Add event listeners to menuitems
  $("change-background-color").addEventListener("click", showColorConfig);
  $("toggle-background-image").addEventListener("click", toggleBgImage);
  $("toggle-image-transparency").addEventListener("click", toggleTransparency);
  $("toggle-image-placeholder").addEventListener("click", togglePlaceholder);

  // Set context menu to html element
  gDocElm.setAttribute("contextmenu", "context-menu");
  gDocElm.addEventListener("contextmenu", popupShowing);
  /***** End context menu initialization *****/

  // Color dialog initialization
  gDocElm.addEventListener("click", hidePicker);
  $("color-picker").addEventListener("mouseenter", showPicker);
  $("color-picker").addEventListener("input", previewBgColor);
  $("color-picker").addEventListener("change", previewBgColor);
  $("color-config").addEventListener("keypress", function(e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
      return;

    switch (e.keyCode) {
      case 13: // 'Enter' key is pressed
        saveBgColor();
        break;
      case 27: // 'Escape' key is pressed
        $("color-picker").value = GM_getValue("bgColor", "");
        resetBgColor();
      default: return;
    }
  });
  $("ok").addEventListener("click", saveBgColor);
  $("cancel").addEventListener("click", resetBgColor);
  $("default").addEventListener("click", defaultBgColor);
  $("error").addEventListener("click", showAlert);
  $("about").href = getThanksURL();
}

function initSVG(aColorValue, aBgImage) {
  gDocElm = document.documentElement;
  if ((getComputedStyle(gDocElm, null).backgroundColor != "transparent") ||
      (getComputedStyle(gDocElm, null).backgroundImage != "none"))
    return; // Don't override if SVG has background color or background image

  // Append <style> element (because GM_addStyle doesn't work on SVG)
  var style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.type = "text/css";
  style.textContent = 'svg { background: #222 url("data:image/png;base64,'
                    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hA'
                    + 'AAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAC'
                    + '5JREFUOMtjZGBgsGfAA/7//38QnzwTA4Vg1IDBYADj///'
                    + '/8StgZLQfDcRhbwAAfyQHW028hvoAAAAASUVORK5CYII=")'
                    + ' 0 0 repeat fixed !important;'
                    + ' margin: auto !important; position: absolute;'
                    + ' top: 0; right: 0; bottom: 0; left: 0;\n'
                    + ' pointer-events: auto;'
                    + '\n}';
  gDocElm.appendChild(style);

  setBgColor(aColorValue); // Set background color from pref
  setBgImage(aBgImage); // Set background patters from pref

  gDocElm.addEventListener("contextmenu", function() {
    getSelection().removeAllRanges();
  });
}

/***** Main script *****/
try {
  GM_setValue("firstRun", GM_getValue("firstTime")); // Copy from old pref
  GM_deleteValue("firstTime"); // Remove old pref
} catch (ex) {};

var firstRun = GM_getValue("firstRun", true);
if (firstRun && window.top === window.self) { // If first time use and not in frame
  showThanks(); // Open 'thank you' page
  GM_setValue("firstRun", false); // Don't open 'thank you' page again
}

//GM_log(GM_getResourceURL("LICENSE")); //.match(/[^\/]+/));
var gDocElm = null;
init();
