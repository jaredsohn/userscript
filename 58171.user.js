// ==UserScript==
// @name           LDR - githubicon
// @namespace      http://www.relucks.org/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

var fl = function(feed) {
    var re = /^https?:\/\/github\.com/
    if (re.test(feed.channel.link)) {
        for (var i = 0; i < feed.items.length; i++) {
            if (!/^<img class="ldrghicon"/.test(feed.items[i].body)) {
                var img_url = 'http://usericons.relucks.org/github/' + feed.items[i].author
                new Image().src = img_url
                feed.items[i].body = '<img class="ldrghicon" src="' +
                    img_url + '" style="float:left;margin-right:5px;width:48px;height:48px;" /> ' +
                    feed.items[i].body + '<br style="clear:left;" />'
            }
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
