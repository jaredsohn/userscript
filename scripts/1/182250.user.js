// ==UserScript==
// @name        ie_spoof
// @namespace   igniting.in
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==
var fakeAppNameGetter = function () {
  return "Microsoft Internet Explorer";
};
if (Object.defineProperty) {
  Object.defineProperty(navigator, "appName", {
    get: fakeAppNameGetter
  });
} else if (Object.prototype.__defineGetter__) {
  navigator.__defineGetter__("appName", fakeAppNameGetter);
}