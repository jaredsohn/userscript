// ==UserScript==
// @name          LDR Hatebu Comments
// @namespace     http://www.milk1000.cc/
// @include       http://reader.livedoor.com/reader/*
// ==/UserScript==

(function() {
    var w = this.unsafeWindow || window;

    var LDRHatebuComments = function() {
        this.initialize.apply(this, arguments);
    }

    LDRHatebuComments.bindedKey = 'l';

    LDRHatebuComments.style = {
        container: [
            'color: #747474',
            'margin: 0 10px',
            'border-top: 1px dotted #cbcbcb'
        ].join(';'),

        caption: [
            'font-size: 90%'
        ].join(';'),

        comments: [
            'list-style-type: none',
            'padding: 5px;',
            'margin: 0px',
            'list-style-type: circle',
            'list-style-position: inside',
            'font-size: 90%',
            'line-height: 150%'
        ].join(';'),

        image: [
            'border: 0px',
            'vertical-align: middle',
            'margin-right: 2px',
            'width: 16px',
            'height: 16px'
        ].join(';')
    };

    LDRHatebuComments._jsc = (new Date).getTime();

    LDRHatebuComments.prototype = {
        initialize: function() {
            this.bindKey();
        },

        bindKey: function() {
            var self = this;
            var handler = function() {
                w.Keybind.add(LDRHatebuComments.bindedKey, function() { self.onKeyDown(); });
            };

            if (typeof w.Keybind === 'undefined') {
                w.register_hook('after_init', function() {
                    handler();
                });
            } else {
                handler();
            }
        },

        onKeyDown: function() {
            var self = this;
            var item = w.get_active_item(true);
            var container;

            if (item) {
                if (container = w.$(this.getContainerId(item.offset))) {
                    this.toggleComments(container);
                } else {
                    this.requestComments(item, function(json) { self.createContainer(item, json); });
                }
            }
        },

        getContainerId: function(offset) {
            return 'ldr_hatebu_comments_' + offset;
        },

        toggleComments: function(container) {
            if (container.style.display !== 'none') {
                container.style.display = 'none';
                w.Control.scroll_to_px(container.parentNode.offsetTop);
            } else {
                container.style.display = 'block';
                this.scroll(container);
            }
        },

        requestComments: function(item, callback) {
            var uri = 'http://b.hatena.ne.jp/entry/json/?url=' + encodeURIComponent(item.link) + '&callback={callback}';
            var name = 'jsonp' + LDRHatebuComments._jsc++;
            var script = document.createElement('script');

            w.message('Loading HatebuComments ...');

            w[name] = function(json) {
                callback(json);
                w[name] = undefined;
                try { delete w[name]; } catch (e) {}
                document.getElementsByTagName('head')[0].removeChild(script);

                w.message('Loading HatebuComments ...Done');
            };
            script.type = 'text/javascript';
            script.src = uri.replace(/\{callback\}/, name);
            document.getElementsByTagName('head')[0].appendChild(script);
        },

        createContainer: function(item, json) {
            var container, caption, comments;

            if (!json) return;

            container = document.createElement('div');
            container.setAttribute('style', LDRHatebuComments.style.container);
            container.id = this.getContainerId(item.offset);

            caption = document.createElement('div');
            caption.setAttribute('style', LDRHatebuComments.style.caption);
            caption.innerHTML = '\u3053\u306e\u30a8\u30f3\u30c8\u30ea\u30fc\u3092\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3057\u3066\u3044\u308b\u30e6\u30fc\u30b6\u30fc (' + json.count + ')';
            container.appendChild(caption);

            comments = document.createElement('ul');
            comments.setAttribute('style', LDRHatebuComments.style.comments);
            json.bookmarks.forEach(function(bookmark) {
                var comment, image;
                var date = new Date(bookmark.timestamp);

                comment = document.createElement('li');
                comment.innerHTML = date.getFullYear() + '\u5e74' + (date.getMonth() + 1) + '\u6708' + date.getDate() + '\u65e5 ';

                image = document.createElement('img');
                image.setAttribute('style', LDRHatebuComments.style.image);
                image.src = 'http://www.hatena.ne.jp/users/' + bookmark.user.slice(0, 2) + '/' + bookmark.user + '/profile_s.gif';
                comment.appendChild(image);

                comment.innerHTML += '<a href="http://b.hatena.ne.jp/' + bookmark.user + '">' + bookmark.user + '</a>\u300e';
                bookmark.tags.forEach(function(tag) {
                    comment.innerHTML += '[<a href="http://b.hatena.ne.jp/' + bookmark.user + '/' + tag + '">' + tag + '</a>]';
                });
                comment.innerHTML += bookmark.comment + '\u300f';

                comments.appendChild(comment);
            });
            container.appendChild(comments);

            w.$('item_count_' + item.offset).appendChild(container);
            this.scroll(container);
        },

        scroll: function(container) {
            var top;
            var rightVisibleHeight = parseInt(w.$('right_container').style.height, 10);
            var entry = container.parentNode;  // entry includes container

            if (entry.offsetHeight < rightVisibleHeight) {
                top = entry.offsetTop;
            } else if (rightVisibleHeight < container.offsetHeight) {
                top = container.offsetTop;
            } else {  // container.offsetHeight <= rightVisibleHeight <= entry.offsetHeight
                top = entry.offsetTop + (entry.offsetHeight - rightVisibleHeight) + 25;  // go to last area of entry
            }

            w.Control.scroll_to_px(top);
        }
    };

    new LDRHatebuComments();
})();
