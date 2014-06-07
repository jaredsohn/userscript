// ==UserScript==
// @name           Kae's Kongregate Script
// @namespace      tag://kongregate
// @description    Kaedenn's script for fiddling with Kongregate, adding a ton of features
// @include        http://www.kongregate.com/*
// @include        http://kaedenn.net/userscripts/
// @require        http://kaedenn.net/userscripts/kae_extension.js
// @require        http://kaedenn.net/userscripts/utilities.js
// @require        http://kaedenn.net/userscripts/message_rollover.js
// @require        http://kaedenn.net/userscripts/logger.js
// @require        http://kaedenn.net/userscripts/chat_dialogue.js
// @require        http://kaedenn.net/userscripts/chat_room.js
// @require        http://kaedenn.net/userscripts/chat_commands.js
// @require        http://kaedenn.net/userscripts/chat_tab.js
// ==/UserScript==

function find_prototypes(dom) {
  // ChatWindow.prototype
  if (dom.ChatWindow) {
    if (!dom.ChatWindow.prototype) {
      dom.ChatWindow.prototype = dom.getChatWindow();
    }
  }
  // ChatDialogue.prototype
  // ChatRoom.prototype
  // Holodeck.prototype
  // Template.prototype
  // Element.prototype
}

function main() {
  var dom = this;
  try {
    var ff = window.navigator.userAgent.match(/Firefox\/3\.([0-9.]*)/)[1];
    if (ff == null || parseFloat(ff) >= 0.12) {
      dom = unsafeWindow ? unsafeWindow : this;
    }
    var dom_hack_script = document.createElement("script");
    var anti_ad_script = document.createElement("script");
    dom_hack_script.innerHTML = "function getChatWindow() { return ChatWindow.prototype; }";
    dom_hack_script.innerHTML += "\nfunction getChatDialogue() { return ChatDialogue.prototype; }";
    dom_hack_script.innerHTML += "\nfunction getChatRoom() { return ChatRoom.prototype; }";
    dom_hack_script.innerHTML += "\nfunction getHolodeck() { return Holodeck.prototype; }";
    dom_hack_script.innerHTML += "\nfunction getTemplate() { return Template.prototype; }";
    dom_hack_script.innerHTML += "\nfunction getElement() { return Element.prototype; }";
    dom_hack_script.innerHTML += "\nfunction newTemplate(s) { return new Template(s); }";
    dom_hack_script.innerHTML += "\nfunction newElement(e, o) { return new Element(e, o); }";
    anti_ad_script.innerHTML = "function kae_remove_ads() { $$('div.ad').each(Element.hide); }";
    document.getElementsByTagName("head")[0].appendChild(dom_hack_script);
    document.getElementsByTagName("head")[0].appendChild(anti_ad_script);
    //find_prototypes(dom);
  }
  catch (e) {
    dom = this;
  }
  dom.set_config = function(key, value) {
    window.setTimeout(function() {
      GM_setValue(key, value);
    }, 0);
  };
  dom.request_config = function(key, callback) {
    window.setTimeout(function() {
      callback(key, GM_getValue(key));
    }, 0);
  };
  if (document.location.href == "http://kaedenn.net/userscripts/") {
    dom.show_success();
  } else {
    dom.kae_remove_ads();
  }
  if (dom.holodeck) {
    try {
      var kae = new KaeExtension(dom);
    }
    catch (e) {
      alert("Fatal error, please tell Kaedenn: " + e);
    }
  }
}

(function() {
  window.setTimeout(main, 0);
})();
