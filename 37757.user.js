// ==UserScript==
// @name           LDR - exblog filter
// @namespace      http://www.relucks.org/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

var fl = function(feed) {
    var re = /^http:\/\/[^. ]+\.exblog\.jp/
    if (re.test(feed.channel.link)) {
        for (var i = 0; i < feed.items.length; i++) {
            // remove image size restriction
            feed.items[i].body = feed.items[i].body.replace(/(<img src="[^"]+?") .+?>/g, '$1>')
        }
    }
}
addFilter(fl)

function addFilter(filter) {
    var filtered = {}
    var wrapped = function() {
        var feed = arguments.length == 2 ? arguments[1] : arguments[0]
        // if (typeof(feed) == 'object' && !filtered[feed.channel.link]) {
        if (typeof feed == 'object') {
            filter(feed)
            // filtered[feed.channel.link] = true
        }
    }
    addBefore(unsafeWindow.get_unread.cache, 'set', wrapped)
    unsafeWindow.register_hook('BEFORE_PRINTFEED', wrapped)
}

function addBefore(target, name, before) {
    var original = target[name]
    target[name] = function() {
        before.apply(target, arguments)
        return original.apply(target, arguments)
    }
}

function log() {
    unsafeWindow.console.log(arguments)
}
