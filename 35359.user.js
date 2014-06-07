// ==UserScript==
// @name           LDR - twittericon
// @namespace      http://userscripts.org/users/25793
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

var tw = function(feed) {
    if (/^http:\/\/twitter\.com/.test(feed.channel.link)) {
        var user_id = feed.channel.link.split('/').slice(-1)[0]
        // unsafeWindow.console.log(user_id)
        var img_url = 'http://usericons.relucks.org/twitter/' + user_id
        new Image().src = img_url
        for (var i = 0; i < feed.items.length; i++) {
            if (!/^<img class="ldrtwicon"/.test(feed.items[i].body)) {
                feed.items[i].title = ''
                feed.items[i].body = '<img class="ldrtwicon" src="' +
                    img_url + '" style="float:left;margin-right:5px;width:48px;height:48px;" /> ' +
                    feed.items[i].body + '<br style="clear:left;" />'
            }
        }
    }
}
addFilter(tw)

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
