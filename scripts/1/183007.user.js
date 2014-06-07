// ==UserScript==
// @name gk_plugins
// @description browser plugins for guokr users
// ==/UserScript==

var plugins = [];
plugins.push({
    'pattern': /^\/nuts\//g,
    'url': 'http://userscripts.org/scripts/source/183003.user.js'
});
plugins.push({
    'pattern': /^\/group\/rank\//g,
    'url': 'http://userscripts.org/scripts/source/183004.user.js'
});
plugins.push({
    'pattern': /^\/ask\/(hottest|highlight)\//g,
    'url': 'http://userscripts.org/scripts/source/183005.user.js'
});
plugins.push({
    'pattern': /^\/ask\/(potential|popular)\//g,
    'url': 'http://userscripts.org/scripts/source/183006.user.js'
});
var origin_regexp = /^http\:\/\/www\.(\w+\.)?guokr\.com(\:\d+)?$/g;
function render() {
    var origin = window.location.origin;
    if(!origin_regexp.test(origin)) {
        return;
    }
    for(var i=0; i<plugins.length; i++) {
        var plugin = plugins[i];
        var pattern = plugin.pattern;
        var path = window.location.pathname;
        if(typeof(pattern) == 'string' && pattern == path ||
                pattern.test && pattern.test(path)) {
            load(plugin.url);
        }
    }
}
function load(js) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', js);
    document.head.appendChild(script);
}
render();
