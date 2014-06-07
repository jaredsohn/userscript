// ==UserScript==
// @name           Test script
// @namespace      Ignore js popups
// @description    ignore .js opened popups
// ==/UserScript==
//Turn off the window open function
//user_pref("capability.policy.strict.Window.foo", "onbeforeunload");
//user_pref("capability.policy.default.Window.open", "onbeforeunload");
user_pref("dom.disable_open_during_load", true);
user_pref("dom.disable_open_click_delay", 1000); 