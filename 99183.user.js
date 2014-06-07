// ==UserScript==
// @name           SelfUpdatingScript
// @version        1.0.0
// @namespace      Benjol (http://stackoverflow.com/users/11410/benjol)
// @description    Template script for a self-updating script
// @credits        Kudos to http://stackoverflow.com/users/115866/balpha
// @include        https://gist.github.com/*
// ==/UserScript==

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function ($) {
  $(function () {
    //how does this work?
    // 1. The installed script loads first, and sets the local VERSION variable with the currently installed version number
    // 2. window["selfUpdaterCallback:" + URL] is not defined, so this is skipped
    // 3. When updateCheck() is called, it defines window["selfUpdaterCallback:" + URL], which retains the installed version number in VERSION (closure)
    // 4. updateCheck() then loads the external version of the script into the page header
    // 5. when the external version of the script loads, it defines its own local VERSION with the external (potentially new) version number
    // 6. window["selfUpdaterCallback:" + URL] is now defined, so it is invoked, and the external version number is passed in
    // 7. if the external version number (ver) is greater than the installed version (VERSION), the notification is invoked
    var VERSION = 1.0;                                                         //<--- YOUR VERSION HERE (careful, 1.2 is > than 1.13; if you mean 1.02, say so!)
    var URL = "https://gist.github.com/raw/874058/selfupdatingscript.user.js"; //<--- URL OF SCRIPT SOURCE HERE (don't forget to change @includes too!)

    if(window["selfUpdaterCallback:" + URL]) {
      window["selfUpdaterCallback:" + URL](VERSION);
      return;
    }

    function updateCheck(notifier) {
      window["selfUpdaterCallback:" + URL] = function (ver) {
        if(ver > VERSION)
          notifier(ver, VERSION, URL);
      }
      $("<script />").attr("src", URL).appendTo("head");
    }

    // INSERT YOUR CUSTOM SCRIPT AFTER THIS COMMENT
    //Customize this code in the following ways
    //  - modify the callback to show your own custom notification
    //  - You could decide to check for updates less frequently that on every page load
    updateCheck(function (newver, oldver, url) {
      alert("A new version (" + newver + ", your current version is " + oldver + ") of the SelfUpdatingScript is available for download here: " + url);
    });
  });
});