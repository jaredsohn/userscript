// ==UserScript==
// @name       Wunderlist Tagger
// @namespace  http://popel-studio.com/
// @version    1.0
// @description  adds support for tags
// @match      https://www.wunderlist.com/*
// @copyright  2013, Anton Suprun
// ==/UserScript==

(function (global) {

    var fn_add_style = function (css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) return;
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    };

    var Tagger = function ($element) {
        this.init($element);
    };

    Tagger.prototype = {
        constructor: Tagger,

        init: function ($element) {
            this.$element = $element;
            this.activeTag = GM_getValue('wunderlist.tagger.active-tag', false);
            this.tagHash = {};

            var self = this,
                tid;

            this.$element.addEventListener('DOMNodeInserted', function () {
                if (tid) global.clearTimeout(tid);
                tid = global.setTimeout(function () {
                    self.refresh();
                }, 100);
            });

            this.$element.addEventListener('DOMNodeRemoved', function () {
                if (tid) global.clearTimeout(tid);
                tid = global.setTimeout(function () {
                    self.refresh();
                }, 100);
            });

            this.refresh();
        },

        refresh: function () {
            var $group = this.$element.querySelector('.grouped-tasks'),
                rel = $group.getAttribute('rel'),
                $$items = this.items(),
                tags = [];

            if (rel === this.rel && this.itemLength && this.itemLength == $$items.length) return;

            this.rel = rel;
            this.itemLength = $$items.length;

            var self = this;

            Array.prototype.forEach.call($$items, function ($item) {
                var title = $item.querySelector('.title').innerText,
                    matches = /^\(([^\)]+)\)/.exec(title);

                if (!matches || matches.length < 1) return;

                var _tags = matches[1].split(',').map(function (value) {
                    return String.prototype.trim.call(value);
                });

                if ($item.dataset.tagger != 'tagged') {
                    $item.setAttribute('data-tagger', 'tagged');
                    var rel = $item.getAttribute('rel');
                    self.tagHash[rel] = _tags;
                }

                _tags.forEach(function (v) {
                    if (tags.indexOf(v) < 0) tags.push(v);
                });
            });

            this.setTags(tags.sort());
            if (this.activeTag) this.setTag(this.activeTag);
        },

        setTags: function (tags) {
            var $tags = this.tags();

            $tags.classList[tags.length > 0 ? 'remove' : 'add']('hidden');
            $tags.innerText = '';

            var df = document.createDocumentFragment();

            tags.forEach(function (v) {
                var el = document.createElement('div');
                el.setAttribute('data-tagger', 'tag');
                el.innerText = v;
                df.appendChild(el);
            });

            $tags.appendChild(df);
        },

        click: function ($el) {
            var tag = $el.innerText;

            this.setTag(this.activeTag == tag ? false : tag);
        },

        setTag: function (tag) {
            var self = this,
                $$tags = this.tags().querySelectorAll('[data-tagger="tag"]');

            this.activeTag = tag;

            GM_setValue('wunderlist.tagger.active-tag', tag);

            Array.prototype.forEach.call($$tags, function ($t) {
                $t.classList[tag && $t.innerText == tag ? 'add' : 'remove']('active');
            });

            Array.prototype.forEach.call(this.taggedItems(), function ($v) {
                var rel   = $v.getAttribute('rel'),
                    _tags = self.tagHash[rel];

                $v.classList[!tag || _tags.indexOf(tag) >= 0 ? 'remove' : 'add']('hidden');
            });
        },

        tags: function () {
            var self = this;

            if (!this.$tags) {
                var $tags = this.$tags = document.createElement('div');
                $tags.setAttribute('data-tagger', 'tags');
                $tags.addEventListener('click', function (event) {
                    var $el = event.target;
                    while (!$el.hasAttribute('data-tagger') && $el.dataset.tagger !== 'tags') {
                        $el = $el.parentElement;
                    }
                    self.click($el);
                });
                document.body.appendChild($tags);
            }

            return this.$tags;
        },

        taggedItems: function () {
            return this.$element.querySelectorAll('[data-tagger="tagged"]');
        },

        items: function () {
            return this.$element.querySelectorAll('.tasks .task-item');
        }
    };

    fn_add_style('[data-tagger="tags"]{opacity:.5;border-radius:0 0 5px 5px;background:#eee;position:fixed;top:0;right:140px;box-shadow:-1px 0 2px rgba(0,0,0,0.3);transition:opacity .1s ease-in-out}[data-tagger="tags"]:hover{opacity:1}[data-tagger="tag"]{color:#999;font-size:13px;cursor:pointer;padding:7px 12px 8px;display:inline-block}[data-tagger="tag"]:hover{color:#423e3e}[data-tagger="tag"].active{color:#fff;background:#5aa9e4;box-shadow:inset 0 1px 2px rgba(0,0,0,0.3)}[data-tagger="tag"]:first-child{border-bottom-left-radius:5px}[data-tagger="tag"]:last-child{border-bottom-right-radius:5px}[data-tagger="tags"].hidden{display:none}[data-tagger="tagged"]{transition:height .1s ease-in-out;display:block}[data-tagger="tagged"].hidden{height:0}');

    var iid = global.setInterval(function () {
        var $taskList = document.querySelector('.task-list');
        if (!$taskList) return;
        global.clearInterval(iid);
        new Tagger($taskList);
    }, 100);

}(window));