// ==UserScript==
// @name          Fan or Not
// @namespace     http://werebear.tistory.com/
// @description   Show whether a user is my follower or not list members page or following users page
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @match         http://twitter.com/*
// @match         https://twitter.com/*
// @author        gjwlstjr
// @version       0.0.2
// ==/UserScript==

window.setTimeout(function(e) {
    if (e == 1) {
        var follow_grid = document.getElementById('follow_grid');
        if (follow_grid) {
            var tables = follow_grid.getElementsByTagName('TBODY');
            if (tables.length == 0) {
                tables = follow_grid.getElementsByTagName('TABLE');
            }
            for (var i = 0; i < tables.length; i++) {
                var users = tables[i].childNodes;
                for (var k = 0; k < users.length; k++) {
                    if (users[k].className && / direct-messageable /.test(users[k].className)) {
                        var following = false;
                        if (/ following /.test(users[k].className))
                            following = true;
                        var tds = users[k].childNodes;
                        for (var l = 0; l < tds.length; l++) {
                            if (tds[l].className == 'user-detail') {
                                var adrs = tds[l].childNodes;
                                for (var j = 0; j < adrs.length; j++) {
                                    if (adrs[j].tagName == 'ADDRESS') {
                                        var spans = adrs[j].childNodes;
                                        for (var m = 0; m < spans.length; m++) {
                                            if (spans[m].className && spans[m].className == 'is-relationship') {
                                                if (following) {
                                                    if (/^\s*$/.test(spans[m].innerHTML)) {
                                                        spans[m].innerHTML = '<span>&nbsp;&nbsp;&nbsp;&nbsp;<strong>Friend</strong></span>';
                                                    }
                                                    else {
                                                        spans[m].innerHTML = spans[m].innerHTML.replace(/Following/,'Friend');
                                                    }
                                                }
                                                else {
                                                    if (/^\s*$/.test(spans[m].innerHTML)) {
                                                        spans[m].innerHTML = '<span>&nbsp;&nbsp;&nbsp;&nbsp;<strong>Fan</strong></span>';
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    window.setTimeout(arguments.callee, 1000, 1);
}, 1000, 1);
