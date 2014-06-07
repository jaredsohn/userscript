// ==UserScript==
// @name           Twitter - Replies Context
// @namespace      http://blog.fulltext-search.biz/
// @description    Twitter - Viewer Replies Context: Usage: click replies-side image.
// @license        The MIT License
// @version        0.1.5
// @released       2007-12-17 14:00:00
// @updated        2007-12-21 23:00:00
// @conpatible     Greasemonkey
// @include        http://twitter.com/*
// @exclude        http://twitter.com/*/friends
// @exclude        http://twitter.com/account/*
// @exclude        http://twitter.com/badges/
// @exclude        http://twitter.com/devices
// @exclude        http://twitter.com/direct_messages
// @exclude        http://twitter.com/followers
// @exclude        http://twitter.com/friends
// @exclude        http://twitter.com/help/*
// @exclude        http://twitter.com/invitations
// @exclude        http://twitter.com/tos
// ==/UserScript==

// XPath
var hasRepliesContentExp = [
    'self::node()/descendant::*[local-name() = "span" or local-name() = "SPAN"]',
    '[contains(concat(" ",@class," "), " entry-title ")',
    ' and ',
    'contains(concat(" ",@class," "), " entry-content ")',
    ' and ',
    'count(descendant::*[(local-name() = "a" or local-name() = "A")',
    ' and ',
    'starts-with(@href, "/")',
    '])>0]'
].join('');
var metaExp = [
    'self::node()/following-sibling::*[(local-name() = "span" or local-name() = "SPAN")',
    ' and ',
    'contains(concat(" ",@class," "), " meta ")',
    ' and ',
    'contains(concat(" ",@class," "), " entry-meta ")]'
].join('');
var replyLinkExp = [
    'self::node()/descendant::*[(local-name() = "a" or local-name() = "A")',
    ' and ',
    'starts-with(@href, "/")]'
].join('');
var publishedExp = [
    'self::node()/descendant::*[(local-name() = "abbr" or local-name() = "ABBR")',
    ' and ',
    'contains(concat(" ",@class," "), " published ")]'
].join('');

// Application Class
// -- Controller
function RepliesContext() {};
RepliesContext.Controller = function() {};
RepliesContext.Controller.getUpdates = function(obj) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://twitter.com/statuses/user_timeline/' + obj.name + '.json',
        onload: function(res) {
            var div = new RepliesContext.View.context();
            var updates = eval('('+res.responseText+')');
            if(updates.error) {
                RepliesContext.View.error(updates, obj);
                obj.icon.src = obj.icon_src;
                return;
            }
            //var ctxs = [];
            for(var i=j=0,len=updates.length; i<len && j<3; i++) {
                if(obj.published > (new Date(updates[i].created_at))) {
                    //ctxs.push(updates[i]);
                    div.contexts.push(updates[i]);
                    j++;
                }
            }
            div.parentTD = obj.parentTD;
            if(div.parent = obj.parent)
                div.parent.children.push(div);
            if(div.contexts.length > 0) {
                div.success();
            } else {
                div.contexts = updates[0];
                div.nonexistence_contexts();
            }
            //RepliesContext.View.contexts(ctxs, obj);
            obj.icon.src = obj.icon_src;
        },
        onerror: function(res) { GM_log(res.status + ':' + res.responseText); }
    });
};
RepliesContext.Controller.insert = function(context, parent) {
    context = context.length ? context[0] : context;
    var spans = $x(hasRepliesContentExp, context);
    spans.forEach(function(span) {
        var meta = $x(metaExp, span)[0];
        var replies = $x(replyLinkExp, span);
        replies.forEach(function(reply) {
            var icon = RepliesContext.View.icon();
            icon.addEventListener('click', function(event) {
                var link = new Object();
                link.icon = this;
                link.icon_src = this.src;
                this.src = RepliesContext.View.loading();
                link.name = reply.textContent;
                link.published = parseDate($x(publishedExp, meta)[0].title);
                link.meta = meta;
                link.parent = parent;
                link.parentTD = span.parentNode.parentNode;
                link.dimension = { x: event.pageX, y: event.pageY };
                RepliesContext.Controller.getUpdates(link);
            }, false);
            reply.parentNode.insertBefore(icon, reply.nextSibling);
        });
    });
};
// -- View
RepliesContext.View = function() {};
RepliesContext.View.icon = function() {
    var icon = document.createElement('img');
    icon.src = [
        'data:image/gif;base64,',
        'R0lGODlhDgAOANU8AH2Un0Ws4Z+wuTWk3XWNmSWb2Uuv4rG/x6vh+nPE7Gi/6ZPV9Fd0gmi+6keu',
        '4YqfqoSZpJSnsmuFklGy5IufqSGZ2GF9ikhod1ZygExreoqfqWaBjUet4YSapSSc2Smd2ofP8Z+w',
        'uktqeYfP8kWs4BuW11Ky45SosYCAgFOz5JTV9JPV9Wi+6XLE7ByW1oSapIufqjaj3FO05SWc2ZSn',
        'sYjP8YfO8Sie2nHD7IbO8RGR1D09Pf///wAAAAAAAAAAACH5BAEAADwALAAAAAAOAA4AAAaAQJ6Q',
        't9sNj8cdjGAsIomaw4OxsyWMSQKFOUKAUtjhjpHZJWotTpjYKaJ2Msd6dxJEADtccYDdQQQHAjs5',
        'CzksATNNADQheSoIKzgGHzpFEgAvOw2EOQokBZU7GBYbOyYNOAoTMS6VRBciOwMBBgEDFTquREU7',
        'BTceJblrYrxOPEEAOw=='
    ].join('');
    icon.className = 'rc-icon';
    icon.alt = icon.title = '縺薙�Reply縺ｮ譁�ц繧定ｦ九ｋ';
    return icon;
};
RepliesContext.View.loading = function() {
    return  [
        'data:image/gif;base64,',
        'R0lGODlhEAAQAPIAAP///weq9sPq/IXU+geq9gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh',
        '/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADGwi6MjRiSenI',
        'm9hqPOvljAOBZGmeaKqubOu6CQAh+QQJCgAAACwAAAAAEAAQAAADHAi63A5ikCEek2TalftWmPZF',
        'U/WdaKqubOu+bwIAIfkECQoAAAAsAAAAABAAEAAAAxwIutz+UIlBhoiKkorB/p3GYVN1dWiqrmzr',
        'vmkCACH5BAkKAAAALAAAAAAQABAAAAMbCLrc/jDKycQgQ8xL8OzgBg6ThWlUqq5s604JACH5BAkK',
        'AAAALAAAAAAQABAAAAMbCLrc/jDKSautYpAhpibbBI7eOEzZ1l1s6yoJACH5BAkKAAAALAAAAAAQ',
        'ABAAAAMaCLrc/jDKSau9OOspBhnC5BHfRJ7iOXAe2CQAIfkECQoAAAAsAAAAABAAEAAAAxoIutz+',
        'MMpJ6xSDDDEz0dMnduJwZZulrmzbJAAh+QQJCgAAACwAAAAAEAAQAAADGwi63P4wRjHIEBJUYjP/',
        '2dZJlIVlaKqubOuyCQAh+QQJCgAAACwAAAAAEAAQAAADHAi63A5ikCEek2TalftWmPZFU/WdaKqu',
        'bOu+bwIAOwAAAAAAAAAAAA=='
    ].join('');
};
RepliesContext.View.context = function() { this.initialize.apply(this, arguments); };
RepliesContext.View.context.prototype = {
    initialize: function() {
        this.element = $N('div', { class: 'rc-contexts'    });
        this.contexts = [];
        this.children = [];
        this.parent = null;
        this.icon = null;
    },

    success: function() {
        var tbody = document.createElement('tbody');
        var table = $N('table', {
            class: 'doing',
            cellspacing: 0,
            style: {
                border: '3px solid #e0e0e0'
            }
        }, [
            tbody
        ]);
        this.contexts.forEach(function(ctx) {
            var source = document.createElement('span');
            source.innerHTML = ctx.source;
            var text = $N('span', { class: 'entry-title entry-content' });
            text.innerHTML = replaceLink(ctx.text);
            var row = $N('tr', { class: 'hentry' }, [
                $N('td', { class: 'thumb vcard author' }, [
                    $N('a', {
                        class: 'url',
                        href: 'http://twitter.com/' + ctx.user.screen_name
                    }, [
                        $N('img', {
                            class: 'photo fn',
                            src: ctx.user.profile_image_url
                        })
                    ])
                ]),
                $N('td', { class: 'content' }, [
                    $N('strong', {}, [
                        $N('a', {
                            title: ctx.user.name,
                            href: 'http://twitter.com/' + ctx.user.screen_name
                        }, ctx.user.screen_name)
                    ]),
                    text,
                    $N('span', { class: 'meta entry-meta' }, [
                        $N('a', {
                            class: 'entry-date',
                            rel: 'bookmark',
                            href: 'http://twitter.com/' + ctx.user.screen_name + '/statuses/' + ctx.id
                        }, [
                            $N('abbr', {
                                class: 'published',
                                title: ctx.created_at
                            }, (new Date(ctx.created_at)).toString())
                        ]),
                        'from',
                        source
                    ])
                ])
            ]);
            tbody.appendChild(row);
        });
        this.element.appendChild(table);
        this.setPosition();
        this.render();
        this.addCloseButton();
        this.parentTD.style.backgroundColor = '#F9F6BA';
        RepliesContext.Controller.insert(this.element, this);
    },

    nonexistence_contexts: function() {
        var ctx = this.contexts;
        this.element.appendChild(
            $N('h4', {}, 'Sorry, this reply was so old that you could not reach.')
        );
        this.element.appendChild(
            $N('p', {}, [
                '@',
                $N('a', {
                    title: ctx.user.name,
                    href: 'http://twitter.com/' + ctx.user.screen_name
                }, ctx.user.screen_name)
            ])
        );
        this.addCloseButton();
        this.setPosition();
        this.render();
    },

    nonexistence_user: function() {
        //TODO
    },

    protected: function() {
        //TODO
    },

    addCloseButton: function() {
        var close = $N('a', {
            title: 'Close',
            href: 'javascript:void(0);',
            class: 'rc-close'
        }, 'x');
        var self = this;
        close.addEventListener('click', function(e) {
            self.parentTD.style.backgroundColor = '#fff';
            self.remove_child();
            this.parentNode.parentNode.removeChild(this.parentNode);
        }, false);
        this.element.appendChild(close);
    },

    setPosition: function() {
        var elm = elementPosition(this.parentTD);
        with(this.element.style) {
            left = elm.__x + 35 + 'px';
            top = elm.__y + elm.offsetHeight - 5 + 'px';
            width = elm.offsetWidth + 'px';
        };
    },

    render: function() {
        document.getElementById('content').appendChild(this.element);
    },

    remove_child: function() {
        var children = this.children;
        if(children.length == 0) return;
        children.forEach(function(child) {
            child.remove_child();
            if(child.element && child.element.parentNode)
                child.element.parentNode.removeChild(child.element);
        });
        if(this.parent) {
            var self = this;
            var tmp = [];
            this.parent.children.forEach(function(child) {
                if(child != self) tmp.push(child);
            });
            this.parent.children = tmp;
        }
    }
};
RepliesContext.View.error = function(res, obj) {
    var parent_div = obj.meta.parentNode.parentNode.parentNode.parentNode;
    var div = $N('div', {
        class: 'rc-contexts',
        style: {
            left: parent_div.offsetLeft + 35 + 'px',
            top: obj.dimension.y + 30 + 'px',
            width: parent_div.offsetWidth + 'px',
            zIndex: '10'
        }
    }, [
        $N('h4', {}, res.error),
        $N('p', {}, [
            '@',
            $N('a', {
                href: 'http://twitter.com/' + obj.name
            }, obj.name)
        ])
    ]);
    var close = $N('a', {
        title: 'Close',
        href: 'javascript:void(0);',
        class: 'rc-close'
    }, 'x');
    close.addEventListener('click', function(e) {
        this.parentNode.parentNode.removeChild(this.parentNode);
    }, false);
    div.appendChild(close);
    $x('//div[@class="tab"]')[0].appendChild(div);
};

// Style
GM_addStyle(<><![CDATA[
    .rc-icon {
        cursor: pointer;
        margin-left: 0.2em;
        vertical-align: top;
    }
    .rc-contexts {
        position: absolute;
        background-color: #fff;
        border: #3a3 1px solid;
        z-index: 3;
    }
    .rc-contexts > h4 {
        padding-left: 3px;
    }
    .rc-close {
        background-color: #f88;
        border: 1px solid #fff;
        color: #fff;
        font-weight: bold;
        line-height: 1;
        padding: 0.18em 0.25em;
        position: absolute;
        right: 4px;
        text-decoration: none;
        top: 4px;
    }
]]></>);

// Main
var i=4;
function addFilter() {
    if(window.AutoPagerize && window.AutoPagerize.addFilter) {
        window.AutoPagerize.addFilter(RepliesContext.Controller.insert);
    } else if(i-- > 0) {
        setTimeout(arguments.callee, 500);
    }
}
RepliesContext.Controller.insert(document);
addFilter();

// Utility
function $x(xpath, context) {
    context = context || document;
    var res = document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    for(var i, nodes = [] ; i=res.iterateNext() ; nodes.push(i));
    return nodes;
}

function $N(name, attr, childs) {
    var ret = document.createElement(name);
    for(k in attr) {
        if(!attr.hasOwnProperty(k)) continue;
        if(k == "class") {
            ret.className = attr[k];
        } else if(k == "style" && typeof(attr[k]) == "object") {
            for(j in attr[k]) ret.style[j] = attr[k][j];
        } else {
            ret.setAttribute(k, attr[k]);
        }
    }
    switch(typeof childs) {
    case "string": {
        ret.appendChild(document.createTextNode(childs));
        break;
    }
    case "object": {
        for(var i=0,len=childs.length; i<len; i++) {
            var child = childs[i];
            if(typeof child == "string") {
                ret.appendChild(document.createTextNode(child));
            } else {
                ret.appendChild(child);
            }
        }
        break;
    }
    }
    return ret;
}

function elementPosition(elem) {
    var targetElem = elem;
    for(elem.__x = elem.__y = 0; targetElem && targetElem.id != 'container'; targetElem = targetElem.offsetParent) {
        elem.__x += targetElem.offsetLeft;
        elem.__y += targetElem.offsetTop;
    }
    //var body = document.getElementsByTagName('body')[0];
    //elem.__x += 2 * (parseInt(window.getComputedStyle(body, "").getPropertyValue("border-left-width")) || 0);
    //elem.__y += 2 * (parseInt(window.getComputedStyle(body, "").getPropertyValue("border-top-width")) || 0);
    return elem;
}

function replaceLink(text) {
    text = text.replace(/@([a-zA-Z0-9_]+)/g, "@<a href=\"/$1\">$1</a>");
    text = text.replace(/(http[s]?:\/\/[;/?:@&=+\$,A-Za-z0-9\-_.!~*'()%]+)/g, "<a href=\"$1\">$1</a>") //']));
    return text;
}

/*
function escapeHTML(text) {
    var ESCAPE = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }
    var result = '', source = text, match;
    while(source.length > 0) {
        if(match = source.match(/[&<>"']/)) {  //'"]/)) {
            result += source.slice(0, match.index);
            result += ESCAPE[match[0]];
            source = source.slice(match.index + match[0].length);
        } else {
            result += source, source = '';
        }
    }
    return result;
}
*/

function timeDifference() {
    var dd = new Date();
    return( ( dd.getHours() - dd.getUTCHours() ) % 24 );
}

// based on the W3CDTF2Date
// http://www.kawa.net/works/js/date/w3cdtf.html
// Date/W3CDTF.js -- W3C Date and Time Formats
/* COPYRIGHT AND LICENSE

Copyright (c) 2005-2006 Yusuke Kawasaki. All rights reserved.
This program is free software; you can redistribute it and/or
modify it under the Artistic license. Or whatever license I choose,
which I will do instead of keeping this documentation like it is.
*/

Date.W3CDTF = function ( dtf ) {
    var dd = new Date();
    dd.setW3CDTF = Date.W3CDTF.prototype.setW3CDTF;
    dd.getW3CDTF = Date.W3CDTF.prototype.getW3CDTF;
    if ( dtf ) dd.setW3CDTF( dtf );
    return dd;
};

Date.W3CDTF.VERSION = "0.04";

Date.W3CDTF.prototype.setW3CDTF = function( dtf ) {
    var sp = dtf.split( /[^0-9]/ );

    // invalid format
    if ( sp.length < 6 || sp.length > 8 ) return;

    // invalid time zone
    if ( sp.length == 7 ) {
        if ( dtf.charAt( dtf.length-1 ) != "Z" ) return;
    }

    // to numeric
    for( var i=0; i<sp.length; i++ ) sp[i] = sp[i]-0;

    // invalid range
    if ( sp[0] < 1970 ||                // year
         sp[1] < 1 || sp[1] > 12 ||     // month
         sp[2] < 1 || sp[2] > 31 ||     // day
         sp[3] < 0 || sp[3] > 23 ||     // hour
         sp[4] < 0 || sp[4] > 59 ||     // min
         sp[5] < 0 || sp[5] > 60 ) {    // sec
        return;                         // invalid date
    }

    // get UTC milli-second
    var msec = Date.UTC( sp[0], sp[1]-1, sp[2], sp[3], sp[4], sp[5] );

    // time zene offset
    if ( sp.length == 8 ) {
        if ( dtf.indexOf("+") < 0 ) sp[6] *= -1;
        if ( sp[6] < -12 || sp[6] > 13 ) return;    // time zone offset hour
        if ( sp[7] < 0 || sp[7] > 59 ) return;      // time zone offset min
        msec -= (sp[6]*60+sp[7]) * 60000;
    }

    // set by milli-second;
    return this.setTime( msec );
};

Date.W3CDTF.prototype.getW3CDTF = function() {
    var year = this.getFullYear();
    var mon  = this.getMonth()+1;
    var day  = this.getDate();
    var hour = this.getHours();
    var min  = this.getMinutes();
    var sec  = this.getSeconds();

    // time zone
    var tzos = this.getTimezoneOffset();
    var tzpm = ( tzos > 0 ) ? "-" : "+";
    if ( tzos < 0 ) tzos *= -1;
    var tzhour = tzos / 60;
    var tzmin  = tzos % 60;

    // sprintf( "%02d", ... )
    if ( mon  < 10 ) mon  = "0"+mon;
    if ( day  < 10 ) day  = "0"+day;
    if ( hour < 10 ) hour = "0"+hour;
    if ( min  < 10 ) min  = "0"+min;
    if ( sec  < 10 ) sec  = "0"+sec;
    if ( tzhour < 10 ) tzhour = "0"+tzhour;
    if ( tzmin  < 10 ) tzmin  = "0"+tzmin;
    var dtf = year+"-"+mon+"-"+day+"T"+hour+":"+min+":"+sec+tzpm+tzhour+":"+tzmin;
    return dtf;
};

function parseDate(string) {
    var date = new Date(string);
    if(date == 'Invalid Date') date = new Date.W3CDTF(string);
    return date;
}

// Auto Update Checking
function UpdateChecker() {};
UpdateChecker.prototype = {
    script_name: 'Twitter - Replies Context',
    script_url: 'http://blog.fulltext-search.biz/files/twitterrepliescontext.user.js',
    current_version: '0.1.5',
    more_info_url: 'http://blog.fulltext-search.biz/pages/twitter-replies-context',

    remote_version: null,

    // Render update information in HTML
    render_update_info: function() {
        var self = this;
        var new_version = $N('div', {
            class: 'yellow-box',
            id: 'gm_update_alert'
        }, [
            $N('h3', {}, 'Your Greasemonkey UserScript Update Available'),
            $N('p', {}, [
                [
                    'There is an update available for "',
                    this.script_name,
                    '".'
                ].join(''),
                $N('br',{}),
                [
                    'You are currently running version ',
                    this.current_version,
                    '. The newest version is ',
                    this.remote_version,
                    '.'
                ].join('')]),
            $N('h4', {}, 'What do your want to do?')
        ]);

        var update_link = $N('a', {
            id: 'gm_update_alert_link',
            href: this.script_url
        }, [
            'Update to version ',
            this.remote_version
        ].join(''));
        update_link.addEventListener('click', function(e) {
            var u = document.getElementById('gm_update_alert');
            u.parentNode.removeChild(u);
        }, false);

        var nonupdate_link = $N('a', { href: 'javascript:void(0);' },
            'Don\'t remind me again until tomorrow');
        nonupdate_link.addEventListener('click', function(e) {
            GM_setValue('last_check_day', self.days_since_start());
            var u = document.getElementById('gm_update_alert');
            u.parentNode.removeChild(u);
        }, false);

        new_version.appendChild(update_link);
        new_version.appendChild(nonupdate_link);

        if(this.more_info_url) {
            new_version.appendChild(
                $N('a', {
                    href: this.more_info_url,
                }, 'Show Update Info')
            );
        }

        var after_sibling = document.getElementById('timeline');
        after_sibling.parentNode.insertBefore(new_version, after_sibling);
    },

    add_update_info_style: function() {
        GM_addStyle(<><![CDATA[
            /* style(like CSS) for update information */
            #gm_update_alert p {
                margin: 0pt;
            }

            #gm_update_alert a:link {
                text-decoration: underline;
            }

            #gm_update_alert > a:link {
                margin: 0.5em 1em 0pt 1em;
            }

            #gm_update_alert h4 + a:link {
                font-weight: bold;
            }
        ]]></>);
    },

    // Check script update remote
    check_update: function() {
        if(!this.has_need_for_check) return;
        var user_script = this;
        GM_xmlhttpRequest({
            method: 'GET',
            url: this.script_url,
            onload: function(res) {
                user_script.remote_version = user_script.check_version(res.responseText);
                if(user_script.remote_version && user_script.remote_version > user_script.current_version) {
                    user_script.add_update_info_style();
                    user_script.render_update_info();
                } else {
                    GM_setValue('last_check_day', user_script.days_since_start());
                }
            },
            onerror: function(res) { GM_log(res.status + ':' + res.responseText); }
        });
    },

    // Check the necessity for update: [Boolean]
    // return [true] if necessary
    has_need_for_check: function() {
        var last_check_day = GM_getValue('last_check_day');
        var current_day = this.days_since_start();
        if(typeof last_check_day == 'undefined' || current_day > last_check_day) {
            return true;
        } else {
            return false;
        }
    },

    // Check version in remote script file: [String]
    check_version: function(string) {
        if(/\/\/\s?@version\s+([\d.]+)/.test(string)) {
            return RegExp.$1;
        } else {
            return null;
        }
    },

    days_since_start: function() {
        var DAYS_IN_MONTH = [31,59,90,120,151,181,212,243,273,304,334,365];
        var now = new Date();
        return(now.getYear() * 365 + DAYS_IN_MONTH[now.getMonth()] + now.getDate());
    }
};

var user_script = new UpdateChecker();
user_script.check_update();
