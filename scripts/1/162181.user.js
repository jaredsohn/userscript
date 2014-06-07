 

// ==UserScript==
// @name            new
// @namespace       http://userscripts.org/users/509276
// @description     new
// @version         1.0
// @author          new Admin
// @license         MIT
// @resource        license http://opensource.org/licenses/MIT
// @updateURL       https://userscripts.org/scripts/source/151097.meta.js
// @include         http://pinterest.com/*
// @include         http://pinterest.com/*
// @exclude         file://*
// @grant           GM_openInTab
// ==/UserScript==

if (!("contextMenu" in document.documentElement &&
      "HTMLMenuItemElement" in window)) return;

var body = document.body;
body.addEventListener("contextmenu", initMenu, false);

var menu = body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="userscript-search-by-image" type="context">\
                    <menuitem label="Shop in Shopulses"\
                              icon="http://shopulses.com/web/css/images/video_back.png"></menuitem>\
                  </menu>';

document.querySelector("#userscript-search-by-image menuitem")
        .addEventListener("click", searchImage, false);

function initMenu(aEvent) {
  // Executed when user right click on web page body
  // aEvent.target is the element you right click on
  var node = aEvent.target;
  var item = document.querySelector("#userscript-search-by-image menuitem");
  if (node.localName == "img") {
    body.setAttribute("contextmenu", "userscript-search-by-image");
    item.setAttribute("imageURL", node.alt);
  } else {
    body.removeAttribute("contextmenu");
    item.removeAttribute("imageURL");
  }
}

function addParamsToForm(aForm, aKey, aValue) {
  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", aKey);
  hiddenField.setAttribute("value", aValue);
  aForm.appendChild(hiddenField);
}

function searchImage(aEvent) {
  // Executed when user click on menuitem
  // aEvent.target is the <menuitem> element
  var imageURL = aEvent.target.getAttribute("imageURL");
  if (imageURL.indexOf("data:") == 0) {
    var base64Offset = imageURL.indexOf(",");
    if (base64Offset != -1) {
      var inlineImage = imageURL.substring(base64Offset + 1)
                                 .replace(/\+/g, "-")
                                 .replace(/\//g, "_")
                                 .replace(/\./g, "=");

      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "//www.google.com/searchbyimage/upload");
      form.setAttribute("enctype", "multipart/form-data");
      form.setAttribute("target", "_blank");
      addParamsToForm(form, "image_content", inlineImage);
      addParamsToForm(form, "filename", "");
      addParamsToForm(form, "image_url", "");
      body.appendChild(form);
      form.submit();
    }
  } else {
    GM_openInTab("https://www.shopulses.com/fbstaging/value="+imageURL);
  }
}