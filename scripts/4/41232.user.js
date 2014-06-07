// ==UserScript==
// @name           Favotter Filter using Following Info
// @namespace      http://fuba.moaningnerds.org/
// @include        http://favotter.matope.com/*
// @require        http://gist.github.com/3238.txt
// ==/UserScript==

var FOLLOWING_URL = 'http://twitter.com/statuses/friends.json';
var VERIFY_CREDENTIALS_URL = 'http://twitter.com/account/verify_credentials.json';
var CACHE_LIFESPAN = 1000 * 60 * 60 * 24 * 5;
var MAX_RETRY = 5;

var list_buf = [];
var dict_buf = {};
var page = 1;
var page_max = 0;
var next_cursor = -1;
var load_flag = false;

var Dialog = {
    show: function (message, is_strong) {
        this.create();
        if (!message) message = 'text';
        this.element.innerHTML = ((is_strong) ? '<strong>' : '')+
            message.replace(/\&/g, '&amp;').
            replace(/</g, '&lt;').
            replace(/>/g, '&gt;').
            replace(/\"/g, '&quot;')+
            ((is_strong) ? '</strong>' : '');
    },
    error: function (message) {
        this.done(message, true);
    },
    done: function (message) {
        if (!message) message = 'done';
        this.show(message);
        window.setTimeout(function () {
            document.body.removeChild(document.getElementById('dialog'));
        }, 5000);
    },
    create: function () {
        if (this.element) return this.element;
        var div = document.createElement('DIV');
        div.id = 'dialog';
        document.body.appendChild(div);
        this.element = div;
        return this.element;
    },
    element: false
};

var request = function (re) {
    GM_log(VERIFY_CREDENTIALS_URL); // TODO: better UI
    GM_xmlhttpRequest({
        method: 'GET',
        url: VERIFY_CREDENTIALS_URL,
        onload: parseUserdata,
        // TODO: onerror:
    });
};

var parseUserdata = function (res) {
    var userdata;
    eval("userdata = "+res.responseText);
    if (userdata) {
        list_buf.push(userdata['screen_name']);
        page = 1;
        page_max = parseInt(userdata['friends_count'] / 100) + 1;
        Dialog.show('fetching your following info: '+page+'/'+page_max);
        getFriendsList(1);
    }
    else if (userdata.error) {
        Dialog.error(userdata.error);
    }
};

var parseFriendList = function (res) {
    var obj;
    if (res.responseText.match(/^\<!DOCTYPE/)) {
        //getFriendsList();
        Dialog.error(res.responseText);
        load_flag = true;
        favotterFilter(document.body);
        return;
    }
    
    eval("obj = "+res.responseText);
    if (obj && (obj.users && (obj.users.length > 1))) {
        obj.users.forEach(function (item) {
            if (!dict_buf[item['screen_name']]) {
                list_buf.push(item['screen_name']);
                dict_buf[item['screen_name']] = 1;
            }
            else {
                GM_log( item['screen_name'] + ' ' + dict_buf[item['screen_name']] );
            }
        })
        page++;
        next_cursor = obj.next_cursor;
    }
    else if (obj.error) {
        Dialog.error(obj.error);
    }
};

var requestFriendList = function (re) {
    var url = FOLLOWING_URL+'?cursor='+next_cursor;
    GM_log(url); // TODO: better UI
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: parseFriendList,
        // TODO: onerror:
    });
};

var getFriendsList = function (page_offset) {
    if (page_offset) page = page_offset;
    var page_now = page;
    
    if (page_offset) {
        frameRequest({
            url: 'http://twitter.com/statuses/update.xml',
            onload: requestFriendList,
        });
    }
    else {
        Dialog.show('fetching your following info: '+page+'/'+page_max);
        requestFriendList();
    }
    
    window.setTimeout(function(){
        if (page > page_now) {
            if (page_max >= page) getFriendsList()
            else {
                Dialog.done();
                load_flag = true;
                favotterFilter(document.body)
            }
        }
        else window.setTimeout(arguments.callee, 50);
    }, 50);
};

// frameRequest is from http://d.hatena.ne.jp/os0x/20080414/1208141006
var frameRequest = function (param) {
    var url = param.url;
    var node = param.node || document.body;
    var iframe = document.createElement('iframe');
    iframe.setAttribute('style','margin:0;padding:0;border:none;height:1px;width:1px;visibility:hidden;');
    iframe.addEventListener('load', function(){
        if (param.onload) {
            param.onload.call(iframe,url);
        }
        setTimeout(function(){node.removeChild(iframe);},1000);
    },false);
    iframe.name = param.name || '_blank';
    iframe.src = url;
    node.appendChild(iframe);
}

var TwitterFriends = function () {
    var cache = eval(GM_getValue('friends_list'));
    var list = {
        list: (cache) ? cache.list : {},
        expire: (cache) ? cache.expire : 0,
        dictbuf: false,
        dict: function () {
            if (!this.dictbuf) {
                var buf = {};
                this.list.forEach(function(user){buf[user] = true});
                this.dictbuf = buf;
            }
            return this.dictbuf;
        }
    };
    
    list.update = function () {
        load_flag = false;
        request();
        window.setTimeout(function(){
            if (load_flag) {
                list.expire = 
                    parseInt((new Date()).getTime())
                    + CACHE_LIFESPAN;
                list.list = list_buf;
                GM_setValue('friends_list', list.toSource());
            }
            else window.setTimeout(arguments.callee, 50);
        }, 50);
    };
    
    if (list.expire < (new Date()).getTime()) list.update()
    else load_flag = true;
    return list;
};

var friends = new TwitterFriends();

var favotterFilter = function (root) {
    if (load_flag) {
        var entries = [];
        
        if (root.className.match('hentry')) {
            entries = [root];
        }
        else {
            entries = $X('.//div[contains(@class, "hentry")]', root);
        }
        
        var dict = friends.dict();
        
        if (entries) {
            entries.forEach(function(entry){
                var newclassname = '';
                
                var users = $X('.//img[contains(@class, "fav_icon")]', entry);
                var friendsfavnum = 0;
                users.forEach(function(user){
                    if (dict[user.alt]) {
                        user.className += " friendicon";
                        friendsfavnum++;
                    }
                });
                if (friendsfavnum > 0) {
                    newclassname += " favotterfriendsfav";
                }
                
                var author = $X('.//img[contains(@class, "user_icon")]', entry);
                if (dict[author[0].alt]) {
                    newclassname += " favotterfriendspost";
                }
                
                // change tweet level
                var tweet = $X('.//div[contains(@class, "bubble")]', entry)[0];
                var tweetClassName = tweet.className.replace(/\sLV\d/, '');
                if (friendsfavnum >= 1) tweetClassName += ' LV'
                    + parseInt(
                        (friendsfavnum > 5)
                            ? 5
                            : friendsfavnum
                    );
                tweet.className = tweetClassName;
                
                entry.className += (newclassname) ? newclassname : ' favotterothers';
            });
        }
    }
    else {
        window.setTimeout(function(){
            favotterFilter(root);
        }, 50);
    }
};

GM_addStyle(['.hentry {padding: 4px !important; margin: 7px 22px 7px 2px !important;}']);
GM_addStyle(['.fav_icon {opacity: 0.3}']);
GM_addStyle(['.friendicon {border: 1px solid #BBB; opacity: 1 !important;}']);
GM_addStyle(['.favotterfriendsfav {border: 4px solid #BBB;}']);
GM_addStyle(['.favotterfriendspost {background-color: #CFA;}']);
GM_addStyle(['.favotterothers {opacity: 0.3;}']);
GM_addStyle(['.favotterothers * {font-size: 70%}']);
GM_addStyle(['#dialog {position: fixed; background-color: #BBB; left: 0; top: 0; z-index: 100000; font-size: 12pt; padding: 2pt;}']);
GM_addStyle(['#dialog strong {color: #f20;}']);

GM_registerMenuCommand('Favotter Filter using Following Info - load following info', function() {
    friends.update();
});

favotterFilter(document.body);
if (window.AutoPagerize)
    window.AutoPagerize.addFilter(function(docs){docs.forEach(favotterFilter);});
