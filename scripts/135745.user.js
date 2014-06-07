// ==UserScript==
// @name          Hateb Counter
// @namespace     http://laughingman7743.tumblr.com/
// @description   Show Hatena bookmark's count and comment.
// @include       http://*
// @author        laughingman7743
// @license       MIT License
// @version       1.6.1
// @grant         GM_xmlhttpRequest
// ==/UserScript==

(function() {

    try{ if(top !== self) throw 0;} catch(e) { return; }

    function addStyle(css) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'data:text/css,' + escape(css);
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    var css = [
        '.hateb { position: fixed; right: 0px; bottom: 0px; width: 600px; height: 200px; padding: 10px; margin: 0; font-size: 100%; color: #FFFFFF; background-color: #000000; opacity: 0.8; text-align: left; z-index: 10000; }'
        , '.hateb-list { position: relative; bottom: 0px; height: 200px; padding: 0px; margin: 0px; overflow: auto; font-size: 100%; color: #FFFFFF; background-color: #000000; list-style: none outside none; }'
        , '.hateb-list li { border-bottom: 1px solid #F0F0F0; line-height: 1.3; position: relative; margin: 0px; padding: 7px; background-color: #000000; }'
        , '.hateb-list-profile-image { float: left; }'
        , '.hateb-list-user { font-size: 85%; color: #FFFFFF !important; background-color: #000000; margin-right: 0.1em; font-weight: bold; text-decoration: none !important; }'
        , '.hateb-list-header { display: inline; padding: 0px 7px; }'
        , '.hateb-list-tags { color: #999999; padding-left: 7px; }'
        , '.hateb-list-tags a { color: #999999; background-color: #000000; font-size: 85%; letter-spacing: 0; text-decoration: none; }'
        , '.hateb-list-comment { font-size: 90%; padding-right: 7px; color: #FFFFFF; }'
        , '.hateb-list-timestamp { font-size: 80%; color: #999999; }'
        , '.hateb-counter { position: fixed; right: 0px; bottom: 0px; padding: 5px 10px; text-align: right; overflow: auto; font-size: 100%; color: #FFFFFF; background-color: #000000; opacity: 0.8; z-index: 20000; }'
        , '.hateb-counter a { background-color: #000000; }'
    ].join(' ');
    addStyle(css);

    function Container() {
        var _self = this;
        this.id = 'hateb';
        this.container = document.createElement('div');
        this.container.setAttribute('id', this.id);
        this.container.setAttribute('class', 'hateb');
        this.container.setAttribute('style', 'display: none;');
        this.container.addEventListener("mouseout", function(event){
            if(event.target.id == _self.id) {
                _self.hide();
            }
        }, false);
        document.body.appendChild(this.container);
        this.bookmarks = document.createElement('ul');
        this.bookmarks.setAttribute('class', 'hateb-list');
        this.counter = document.createElement('div');
        this.counter.setAttribute('class', 'hateb-counter');
        this.counter.setAttribute('style', 'display: none;');
        this.counter.parent = this.container;
        this.counter.addEventListener('mouseover', function(event){
            _self.show();
        }, false);
        document.body.appendChild(this.counter);
        this.init = function() {
            loadHateb(this);
        };
        this.show = function() {
            this.container.style.display = 'block';
        };
        this.hide = function() {
            this.container.style.display = 'none';
        };
        this.toggle = function() {
            if(this.container.style.display == 'none') this.show();
            else this.hide();
        };
        this.initBookmarks = function(bookmarks) {
            var html = '';
            bookmarks.sort(function(a, b) {
                return b.date - a.date;
            });
            bookmarks.forEach(function(bookmark) {
                html += bookmark.generateHtml();
            });
            this.bookmarks.innerHTML += html;
            this.container.appendChild(this.bookmarks);
        };
        this.initCounter = function(counter) {
            this.counter.innerHTML += counter.generateHtml();
            this.counter.style.display = 'block';;
        };
    }

    function Counter(countImage, link) {
        this.countImage = countImage;
        this.link = link;
        this.generateHtml = function() {
            return '<img src="http://b.hatena.ne.jp/favicon.ico" width="16px" height="16px"/>' +
                '<a href="' + this.link + '" target="_blank"><img src="' + this.countImage + '"></a>';
        };
        return this;
    };

    var formatDate = function(date, sep) {
        var yy = date.getYear();
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        if(yy < 2000) { yy += 1900; }
        if(mm < 10) { mm = '0' + mm; }
        if(dd < 10) { dd = '0' + dd; }
        return [yy, mm, dd].join(sep);
    };

    var htmlEscape = (function(){
        var map = {'<':'&lt;', '>':'&gt;', '&':'&amp;', '\'':'&#39;', '"':'&quot;', ' ':'&nbsp;', '　':'&#12288;'};
        var replaceStr = function(s){ return map[s]; };
        return function(str) { return str.replace(/<|>|&|'|"|\s|　/g, replaceStr); };
    })();

    function Bookmark(bookmark, eid) {
        this.user = bookmark.user;
        this.userLink = 'http://b.hatena.ne.jp/' + this.user + '/';
        this.profileImage = 'http://www.hatena.ne.jp/users/' + this.user.substring(0, 2) + '/' + this.user + '/profile_s.gif';
        this.date = new Date(bookmark.timestamp);
        this.bookmarkLink = this.userLink + formatDate(this.date, '') + '#bookmark-' + eid;
        this.tags = bookmark.tags;
        this.comment = bookmark.comment.replace(/^\s+|\s+$/g, "");
        this.generateHtml = function() {
            var tag = '';
            if(this.tags.length > 0) {
                var userLink = this.userLink;
                this.tags.forEach(function(val) {
                    if(tag.length > 0) {
                        tag += ', ';
                    }
                    tag += '<a href="' + userLink + encodeURIComponent(val) + '/" target="_blank">' + htmlEscape(val) + '</a>';
                });
                tag = '<span class="hateb-list-tags">' + tag + '</span>';
            }
            var comment = '';
            if(this.comment.length > 0) {
                comment = '<span class="hateb-list-comment">'+ htmlEscape(this.comment) + '</span>';
            }
            return '<li><div class="hateb-list-header"><a href="' + this.userLink + '" target="_blank">' +
                '<img width="16" height="16" title="' + this.user + '" alt="' + this.user + '" class="hateb-list-profile-image" src="' + this.profileImage + '"></a>' +
                '<a href="' + this.bookmarkLink + '" target="_blank" class="hateb-list-user">' + this.user + '</a>' + tag +
                '</div>' + comment + '<span class="hateb-list-timestamp">' + formatDate(this.date, '/') + '</span></li>';
        };
        return this;
    }

    function loadHateb(container) {
        var replaceUri = top.location.href.replace(/#/g, '%23');
        var api = "http://b.hatena.ne.jp/entry/jsonlite/";
        GM_xmlhttpRequest({
            method: "GET",
            url: api + "?url=" + encodeURIComponent(top.location.href),
            onload: function(response) {
                if(response.status == 200) {
                    var json = JSON.parse(response.responseText);
                    if(json) {
                        var entryPage = "http://b.hatena.ne.jp/entry/" + replaceUri;
                        var countImage = "http://b.hatena.ne.jp/entry/image/" + replaceUri;
                        container.initCounter(new Counter(countImage, entryPage));
                        var bookmarks = [];
                        for(var i=0; i<json.bookmarks.length; i++) {
                            var bookmark = json.bookmarks[i];
                            bookmarks.push(new Bookmark(bookmark, json.eid));
                        }
                        container.initBookmarks(bookmarks);
                    }
                }
            }
        });
    }

    var container = new Container();
    container.init();
})();
