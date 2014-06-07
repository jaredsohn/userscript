// ==UserScript==
// @name       window.prompt with prediction
// @namespace  global
// @version    0.3
// @description  suppress default window.prompt functionality to use last typed text as default value(in case if there are no default value set). As for now list of values lives only untill tab is closed.
// @match      http://*/*
// @copyright  2012+, skyboy
// ==/UserScript==

(function() {
var oldPrompt = unsafeWindow.prompt, cache = {};
unsafeWindow.prompt = function(title, defaultValue) {
    if (!defaultValue) {
        defaultValue = cache[title] || "";
    }
    cache[title] = oldPrompt(title, defaultValue);
    return cache[title];
};
})();