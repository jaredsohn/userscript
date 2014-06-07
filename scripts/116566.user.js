// ==UserScript==
// @name		Prevent accidental page navigation while some condition is true.
// @namespace		v1
// @description         is based on some other userscript which i cannot find with addition of config
// @include		*
// ==/UserScript==

var config = {};
config["vkontakte.ru:player is active"] = {
	regexp : "vkontakte.ru/.*",
	callback : "(document.getElementById('audio_global') || {}).clientWidth"
};

config["default"] = {
	regexp : ".*",
	callback : "document.activeElement.tagName !== 'TEXTAREA'"
}

var items = [];
for(var configName in config) {
	if (window.location.href.match(new RegExp(config[configName].regexp)) != null) {
		items.push(config[configName].callback);
	}
}
var script = document.createElement("script");
script.textContent = "(window.onbeforeunload = function(){ return ((" + items.join(") && (") + ")); })();";
document.body.appendChild( script );