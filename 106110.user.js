/*
    Add Google +1, Twitter, Facebook Like, Pinterest buttons, etc. to AMO.
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
// @name            Social Buttons for AMO
// @namespace       http://mozilla.status.net/loucypher
// @description     Add Google +1, Twitter, Facebook Like Pinterest buttons, etc. to AMO
// @version         2.22
// @author          LouCypher
// @license         GPL
// @icon            https://github.com/LouCypher/userscripts/raw/master/addons.mozilla.org/social-buttons/amo-social-buttons.png
// @require         https://raw.github.com/LouCypher/GM_config/master/gm_config.js
// @resource        CSS https://raw.github.com/LouCypher/userscripts/master/addons.mozilla.org/social-buttons/amo-social-buttons.css
// @resource        configCSS https://raw.github.com/LouCypher/userscripts/master/addons.mozilla.org/social-buttons/gm_config.css
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/addons.mozilla.org/social-buttons/CHANGELOG.txt
// @updateURL       https://userscripts.org/scripts/source/106110.meta.js
// @downloadURL     https://userscripts.org/scripts/source/106110.user.js
// @include         https://addons.mozilla.org/*/addon/*
// @grant           GM_addStyle
// @grant           GM_getResourceText
// @grant           GM_log
// ==/UserScript==

/*
Resources:
- https://www.google.com/webmasters/+1/button/
- https://twitter.com/about/resources/buttons#tweet
- https://developers.facebook.com/docs/reference/plugins/like/
- http://pinterest.com/about/goodies/#button_for_websites
- http://developers.pinterest.com/pin_it/
- http://www.stumbleupon.com/badges/
- http://share.lockerz.com/buttons/
- http://sharethis.com/publishers/get-sharing-tools
- http://support.sharethis.com/customer/portal/articles/475097-ssl-support
- https://github.com/sizzlemctwizzle/GM_config/
*/

(function() {

var addon = $("#page section > #addon");
if (!addon) {
  //GM_log("This is NOT an ADD-ON page.");
  return; // not an add-on page
}

var dir = document.documentElement.dir;

/////////////////////////////////////////////////////////////
////////////////////// Start GM_config //////////////////////

var customize_config = {
  title: "AMO Social Buttons Settings", // GM_config title

  // Override GM_config styles
  get css() { return GM_getResourceText("configCSS"); },

  // Re-init GM_config
  init: function() {
    overlay.setAttribute("style", "top: 0; right: 0; bottom: 0; left:0; " +
                                  "-moz-transition-delay: 0ms;");
    var doc = this.frame.contentDocument;

    $("#GM_config_fbSend_var", doc).appendChild(this.create("span", {
      style: "font-size: 6pt; margin-left: 1em;"
    }));

    var div = $("#GM_config_buttons_holder", doc);
    div.insertBefore(this.create("button", { // Add 'Apply' button
      id: GM_config.configId + "_applyBtn",
      textContent: "Apply",
      title: "Apply settings",
      className: "saveclose_buttons",
      onclick: function () { GM_config.save() } // Save and stay open
    }), div.lastChild);

    // Check if all buttons are disabled.
    // At least one button must be enabled.
    // If you don't want to use them
    // just uninstall this userscript, goddammit!
    function checkValues() {
      if (/true/.test(GM_config.getValue("GM_config"))) return true;
      alert("At least one button must be enabled!");
      return false;
    }

    // Check if FB 'Send' button' is enabled but 'Like' button is disabled.
    // 'Like' button must be enabled to add 'Send' button
    function checkFB() {
      if (!(!GM_config.get("fbLike") && GM_config.get("fbSend"))) return true;
      alert("You must enable Facebook 'Like' button to add 'Send' button.");
      return false;
    }

    // Is called when config button is closed
    this.onClose = function() {
      // If the above conditions are false, re-open config window
      overlay.removeAttribute("style");
      (!checkValues() || !checkFB()) && $config();
    }

    var saveButt = $("#GM_config_saveBtn", doc) // 'Save' button
    saveButt.textContent = "OK";                // renamed to 'OK'
    saveButt.title = "Save changes and reload this page";
    saveButt.onclick = function(e) {
      // Reload the page if there are no problems
      (checkValues() && checkFB()) && location.reload(); // Save and reload
    }

    $("#GM_config_closeBtn", doc).textContent = "Cancel"; // 'Close' renamed
  }
}

GM_config.init({
  "gPlus": { "label": "+1 button",
             "type": "checkbox",
             "default": true },

  "gShare": { "label": "'Share' button",
              "type": "checkbox",
              "default": false },

  "fbLike": { "label": "'Like' button",
              "type": "checkbox",
              "default": true },

  "fbSend": { "label": "'Send' button",
              "type": "checkbox",
              "default": false },

  "twitter": { "label": "'Tweet' button",
               "type": "checkbox",
               "default": true },

  "pinterest": { "label": "'Pin-it' button",
                 "type": "checkbox",
                 "default": true },

  "stumble": { "label": "StumbleUpon",
               "type": "checkbox",
               "default": false },

  "lockerz": { "label": "Lockerz Share",
               "type": "checkbox",
               "default": false },

  "shareThis": { "label": "ShareThis",
                 "type": "checkbox",
                 "default": false }

}, customize_config.title, customize_config.css, customize_config.init)

//GM_log(GM_config.get("gPlus"));
//GM_config.open();

// Add link to document to call GM_config
var config = $(".widgets").appendChild($new("a"));
config.href = "http://userscripts.org/scripts/show/106110";
config.className = "widget";
config.style.background = "url('//addons.cdn.mozilla.net" +
                          "/media/img/addon-icons/social-32.png') " +
                          "top " + ((dir == "rtl") ? "right" : "left") +
                          " no-repeat";
config.style.backgroundSize = "16px 16px";
config.textContent = "Social Buttons";
config.title = "Add/remove social buttons.";
config.addEventListener("click", $config, false);

/////////////////////// End GM_config ///////////////////////
/////////////////////////////////////////////////////////////

//@https://developers.google.com/+/plugins/+1button/#plus-snippet
// doesn't actually work
document.documentElement.setAttribute("itemscope", "");
document.documentElement.setAttribute("itemtype", "http://schema.org/");
$("#addon hgroup h1").setAttribute("itemprop", "name");
$("#addon-summary").setAttribute("itemprop", "description");
// ---------------

// Trim /language/, /application/, ?search&params and #hash
var url = location.href.replace(location.search, "")
                       .replace(location.hash, "")
                       .replace(location.pathname.split("/")[1] + "\/", "")
                       .replace(location.pathname.split("/")[2] + "\/", "");

$rel("canonical", url);

var scrnshot = $("#preview .screenshot");
$("img", scrnshot).setAttribute("itemprop", "image");
var imgSrc = $rel("image_src", scrnshot ? scrnshot.href.replace(/\?.*/, "")
                                        : $("#addon-icon").src);

var desc = $("head").appendChild($new("meta"));
desc.setAttribute("name", "description");
desc.setAttribute("content", $("#addon-summary").textContent);

var xml = '<div class="g-plusone" data-href="' + url + '" data-size="medium"'
        + ' data-annotation="bubble" data-width="100px"></div>'
        + '<div class="g-share"><a href="" title="Share on Google+">'
        + '<img src="//ssl.gstatic.com/images/icons/gplus-32.png"'
        + ' alt="Share on Google+" width="20" height="20" border="0"/></a>'
        + '</div>'
        + '<div><a class="twitter-share-button" data-uri="'
        + (url + "?src=external-twitter") + '"'
        + ' data-related="mozamo:Mozilla Add-ons"></a></div>'
        + '<div class="fb-like" data-href="' + (url + "?src=external-facebook")
        + '" data-layout="button_count" data-send="' + GM_config.get("fbSend")
        + '" data-show-faces="false" data-width="90px"></div>'
        + '<div><a class="pin-it-button" title="Pin It"'
        + ' href="http://www.pinterest.com/pin/create/button/'
        + '?url=' + $esc(url + "?src=external-pinterest") + '&media='
        + $esc(imgSrc.href) + '&description=' + $esc(document.title)
        + ' - ' + $esc(desc.content) + '"' + ' count-layout="horizontal">'
        + '<img border="0" src="//assets.pinterest.com/images/pidgets/pin_it_button.png"/>'
        + '</a></div>'
        + '<div><su:badge layout="2" location="' + url + '?src=external-stumbleupon">'
        + '</su:badge></div>'
        + '<div><a class="a2a_dd"'
        + ' href="http://www.addtoany.com/share_save?linkurl='
        + $esc(url + '?src=external-lockerz') + '&linkname='
        + $esc(document.title) + '">'
        + '<img src="//static.addtoany.com/buttons/favicon.png"'
        + ' width="16" height="16" border="0" alt="Share"/></a></div>'
        + '<div><span class="st_sharethis" displayText="ShareThis"'
        + ' st_url="' + (url + "?src=external-sharethis") + '" st_title="'
        + document.title + '"></span></div>';

var buttons = document.createElement("div");
buttons.id = "amo-social-buttons-userscript";
buttons.style.cssFloat = (dir == "rtl") ? "right" : "none";
buttons.innerHTML = xml;

addon.appendChild(buttons);

// must use DOM method or the scripts won't execute
if (GM_config.get("gPlus"))
  buttons.appendChild($script("//apis.google.com/js/plusone.js"));

if (GM_config.get("gShare")) {
  $(".g-share").style.display = "block";
  $(".g-share").addEventListener("click", function(aEvent) {
    aEvent.preventDefault();
    window.open("https://plus.google.com/share?url=" +
                encodeURIComponent(url + "?src=external-google+"),
                "share-on-google-plus",
                "width=600, height=400, toolbar=no, location")
  }, false)
}

if (GM_config.get("fbLike"))
  buttons.appendChild($script("//connect.facebook.net/en_US/all.js#xfbml=1"));

if (GM_config.get("twitter"))
  buttons.appendChild($script("//platform.twitter.com/widgets.js"));

if (GM_config.get("pinterest"))
  buttons.appendChild($script("//assets.pinterest.com/js/pinit.js"));

if (GM_config.get("stumble"))
  buttons.appendChild($script("//platform.stumbleupon.com/1/widgets.js"));

if (GM_config.get("lockerz")) {
  $(".a2a_dd").style.display = "block";
  buttons.appendChild($script()).textContent = '\
var a2a_config = a2a_config || {};\
a2a_config.linkname = "' + document.title + '";\
a2a_config.linkurl = "' + (url + "?src=external-lockers") + '";\
a2a_config.onclick = 1;\
a2a_config.num_services = 14;\
a2a_config.prioritize = [\
  "delicious", "tumblr", "diigo", "posterous", "reddit", \
  "blogger_post", "typepad_post", "slashdot", \
  "multiply", "squidoo", "ping", "bebo", "email"];';

  buttons.appendChild($script("//static.addtoany.com/menu/page.js"));
}

if (GM_config.get("shareThis")) {
  $(".st_sharethis").style.display = "block";
  buttons.appendChild($script()).textContent = "var switchTo5x=false;";
  buttons.appendChild($script("//ws.sharethis.com/button/buttons.js"));
  buttons.appendChild($script()).textContent = "\
stLight.options({publisher:'73203996-db03-49eb-babe-bebd62c11a26',\
onhover:false});";
}

GM_addStyle(GM_getResourceText("CSS"));

var overlay = document.body.appendChild($new("div"));
overlay.id = "GM_config_overlay";
overlay.addEventListener("click", $config, false);

// 'Manage My Add-on' userscript
$("#edit-popup") && ($("#edit-popup").style.top = "402px");

function $(aSelector, aNode) {
  return (aNode ? aNode : document).querySelector(aSelector);
}

function $new(aNodeName) {
  return document.createElement(aNodeName);
}

function $rel(aRelation, aHref) {
  var link = $("head").appendChild($new("link"));
  link.setAttribute("rel", aRelation);
  link.href = aHref;
  return link;
}

function $script(aSource, aSync) {
  var script = $new("script");
  script.type = "text/javascript";
  script.setAttribute("async", aSync ? false : true);
  aSource && (script.src = aSource);
  return script;
}

function $esc(aString) {
  return encodeURIComponent(aString);
}

function $config(aEvent) {
  aEvent && aEvent.preventDefault();
  //overlay.style.display = (overlay.style.display == "") ? "block" : "";
  if ($("#GM_config")) GM_config.close();
  else GM_config.open();
}

})()
