// ==UserScript==
// @name        Tumblr Tornado
// @namespace   https://github.com/poochin
// @version     1.2.9.87
// @description Tumblr にショートカットを追加するユーザスクリプト
// @include     /https?:\/\/www\.tumblr\.com\/dashboard(\/.*)?/
// @include     /https?:\/\/www\.tumblr\.com\/dashboard\?(tumblelog.*|oauth_token=.*)?/
// @include     /https?:\/\/www\.tumblr\.com\/(reblog|likes|liked\/by|blog|tagged)(\/.*)?/
// @include     /https?:\/\/www\.tumblr\.com\/search.*/
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// 
// @require     http://static.tumblr.com/lf1ujxx/bczmf4vbs/sha1.js
// @require     http://static.tumblr.com/lf1ujxx/5bBmf4vcf/oauth.js
//
// @author      poochin
// @license     MIT
// @updated     2013-03-20
// @updateURL   https://github.com/poochin/tumblrscript/raw/master/userscript/tumblr_tornado.user.js
// ==/UserScript==

// TODO: oauth_operator に add_exclude と remove_exclude と is_excluded を追加する
// TODO: LiteDialog に setTitle などを定義する
// TODO: self を that に変えます
// TODO: tumblelog_infos を gm_setvalue と gm_setvalue で入れたり戻したりできるようにします
// TODO: var CustomFuncs を定義し Tornado.customfuncs とつなげます

/**
 * oauth_config = {
 *   id: name,
 *   token: oauth_token,
 *   token_secret: oauth_token_secret,
 *   tumblelogs: [
 *     {
 *       name: name,
 *       hostname: hostname,
 *     },
 *     ...
 *   ],
 */
/**
 * @namespace TumblrTornado
 */
(function TumblrTornado() {
    'use strict';

    var Tornado = {};
    var Etc; /* Tornado.etc へのショートハンドです */
    var Vals;
    // var Funcs;
    // var CustomFuncs;

    /*-- ここから Tornado オブジェクト の仮属性(ここ以外の場所で初期化されます) --*/
    Tornado.funcs = {};
    Etc = Tornado.etc = {};
    Vals = Tornado.vals = {};

    Tornado.customkeys = [];
    Tornado.customfuncs = {};

    Tornado.clientfuncs = [];
    Tornado.clientlaunches = [];

    Tornado.windows = {};

    Tornado.oauthconfigs = [
        {
            id: '',
            token: '',
            token_secret: '',
            tumblelogs: [
                {
                    name: '',
                    hostname: '',
                },
            ],
        },
    ];
    Tornado.exclude_tumblelogs = {}; // API 用であります
    Tornado.i18n = {};

    Tornado.tumblelog_configs = {
        name: {
            twitterOn: true || false,
        },
    };

    Tornado.tumblelogs = [
        /*
        {
            name: tumblelog name,
            title: tumblelog title
        }*/
    ];

    Tornado.oauth = {};
    /*-- /ここまで Tornado オブジェクトの仮属性 --*/

    /*---------------------------------
     * Fix
     *-------------------------------*/

    /* console が存在しない環境でもエラーで止まらないようにします */
    if (typeof console == 'undefined') {
        console = {log: function(){}};
    }

    /*---------------------------------
     * Const
     *-------------------------------*/

    Tornado.lang = window.navigator.language.split('-')[0];
    Tornado.gm_api = (typeof GM_info != 'undefined' ? true : false);

    Tornado.browser = (window.opera ? 'opera'
                    :  window.navigator.userAgent.match(/Chrome/) ? 'chrome'
                    :  window.navigator.userAgent.match(/Firefox/) ? 'firefox'
                    :  '');

    Tornado.vals.CONSUMER_KEY = 'kgO5FsMlhJP7VHZzHs1UMVinIcM5XCoy8HtajIXUeo7AChoNQo';
    Tornado.vals.CONSUMER_SECRET = 'wYZ7hzCu5NnSJde8U2d7BW6pz0mtMMAZCoGgGKnT4YNB8uZNDL';

    Tornado.vals.CONTENTTYPE_URLENCODED = ["Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"];

    Tornado.vals.KEY_MAX_FOLLOWS = 2;
    Tornado.vals.KEY_CONTINUAL_TIME = 2000;

    Tornado.vals.prev_cursor = null;
    Tornado.vals.state_texts = {
        '0': '',
        '1': 'draft',
        '2': 'queue',
        'private': 'private'
    };
    Tornado.vals.key_input_time = 0;
    Tornado.vals.key_follows = []

    Tornado.vals.last_publish_on_time = null;
    
    Vals.SHORTCUT_GROUPS = {
        OTHER: 0,
        DEFAULT: 1,
        REBLOG: 2,
        CHANNEL_REBLOG: 3,
        MINE_POST: 4,
        SCROLL: 5,
        VISIBLE: 6,
    };

    /*---------------------------------
     * Variable
     *-------------------------------*/

    Tornado.css = "";

    /* Pin Notification */
    Tornado.css += [
        "#pin_notification_board {",
        "    position: fixed;",
        "    right: 15px;",
        "    bottom: 0;",
        "}",
        ".pin_notification.error {",
        "    color: red;",
        "}",
        ".pin_notification {",
        "    -webkit-animation: pin_notification_animation 3s forwards;",
        "    -moz-animation: pin_notification_animation 3s forwards;",
        "    -o-animation: pin_notification_animation 3s forwards;",
        "    padding: 5px;",
        "    border-left: 2px solid #888;",
        "    border-right: 2px solid #888;",
        "    border-bottom: 1px dashed #696;",
        "    background: #efefef;",
        "}",
        ".pin_notification:first-child {",
        "    border-top-left-radius: 5px;",
        "    border-top-right-radius: 5px;",
        "    border-top: 2px solid #888;",
        "}",
        ".pin_notification:last-child {",
        "    margin-bottom: 8px;",
        "    border-bottom-left-radius: 5px;",
        "    border-bottom-right-radius: 5px;",
        "    border-bottom: 2px solid #888;",
        "}",
        ".pin_notification:last-child:after {",
        "    content: ' ';",
        "    display: block;",
        "    position: absolute;",
        "    height: 0;",
        "    width: 0;",
        "    margin-top: 5px;",
        "    margin-left: 5px;",
        "    border: 8px solid #efefef;",
        "    border-color: transparent;",
        "    border-top-color: #888;",
        "    border-bottom-width: 0px;",
        "}",
        "@-webkit-keyframes pin_notification_animation {",
        "    0%   { opacity: 0; }",
        "    5%   { opacity: 1; }",
        "    90%  { opacity: 1; }",
        "    100% { opacity: 0; }",
        "}",
        "@-moz-keyframes pin_notification_animation {",
        "    0%   { opacity: 0; }",
        "    5%   { opacity: 1; }",
        "    90%  { opacity: 1; }",
        "    100% { opacity: 0; }",
        "}",
        "@keyframes pin_notification_animation {",
        "    0%   { opacity: 0; }",
        "    5%   { opacity: 1; }",
        "    90%  { opacity: 1; }",
        "    100% { opacity: 0; }",
        "}",
    ].join('\n');

    /* Reblog Effect */
    Tornado.css += [
        /* Reblog Shutter */
        "#posts > .post_container > .post.shutter_base {",
        "    background-color: #F8ABA6;",
        "}",
        "#posts > .post_container > .post.shutter_base.shuttering {",
        "    -webkit-transition: background-color 0.08s ease;",
        "    -moz-transition: background-color 0.08s ease;",
        "    -o-transition: background-color 0.08s ease;",
        "    transition: background-color 0.08s ease;",
        "    background-color: #fff;",
        "}",
        /* Reblog Button */
        ".reblog.loading {",
        "    background-position: -530px -270px !important;",
        "    -webkit-animation: reblogging 1s infinite;",
        "    -moz-animation: reblogging 1s infinite;",
        "}",
        "@-webkit-keyframes reblogging {",
        "  0% { -webkit-transform: rotate(0deg) scale(1.5, 1.5); }",
        "  25% { -webkit-transform: rotate(360deg) scale(1, 1); }",
        "  40% { -webkit-transform: rotate(360deg) scale(1, 1); }",
        "  50% { -webkit-transform: rotate(360deg) scale(1.1, 1.1); }",
        "  55% { -webkit-transform: rotate(360deg) scale(1, 1); }",
        "  100% { -webkit-transform: rotate(360deg) scale(1, 1); }",
        "}",
        "@-moz-keyframes reblogging {",
        "  0% { -moz-transform: rotate(0deg) scale(1.5, 1.5); }",
        "  25% { -moz-transform: rotate(360deg) scale(1, 1); }",
        "  40% { -moz-transform: rotate(360deg) scale(1, 1); }",
        "  50% { -moz-transform: rotate(360deg) scale(1.1, 1.1); }",
        "  55% { -moz-transform: rotate(360deg) scale(1, 1); }",
        "  100% { -moz-transform: rotate(360deg) scale(1, 1); }",
        "}",
        ".reblogged {",
        "  background: url('http://assets.tumblr.com/images/dashboard_master_sprite.png?1a24f18dcb94fd4ba0eeaa09a2f950ce') -527px -268px;",
        "}",
    ].join('\n');

    /* Lite Dialog */
    Tornado.css += [
        ".lite_dialog {",
        "  background-color: #fff;",
        "  padding: 2px;",
        "  z-index: 10;",
        "  position: absolute;",
        "  top: 0;",
        "  left: 0;",
        "  border-radius: 3px;",
        "  -webkit-box-shadow: 0 0 6px #000;",
        "  -moz-box-shadow: 0 0 6px #000;",
        "  box-shadow: 0 0 6px #000;",
        "  opacity: 0.98;",
        "  z-index: 100;",
        "}",
        ".lite_dialog_sysbar { }",
        ".lite_dialog_sysbar:after {",
        "  content: '';",
        "  clear: both;",
        "  height: 0;",
        "  display: block;",
        "  visibility: hidden;",
        "}",
        ".lite_dialog_close {",
        "  line-height: 16px;",
        "  width: 16px;",
        "  color: #888;",
        "  border: 1px dashed #888;",
        "  border-radius: 3px;",
        "  float: right;",
        "  cursor: pointer;",
        "  font-family: monospace;",
        "  text-align: center;",
        "}",
        ".lite_dialog_close:hover {",
        "  background-color: #ddd;",
        "}",
        ".lite_dialog_close:active, .lite_dialog_close:focus {",
        "  color: #aaa;",
        "}",
        ".lite_dialog_caption {",
        "  font-weight: bold;",
        "  margin-right: 20px;",
        "  padding: 5px;",
        "  line-height: 16px;",
        "  font-size: 12px;",
        "  color: #444;",
        "  cursor: move;",
        "  border-radius: 3px;",
        "}",
        ".lite_dialog_caption:hover {",
        "  background-color: #f8f8f8;",
        "}",
        ".lite_dialog_body {",
        "  margin-top: 2px;",
        "  padding: 3px;",
        "  border-top: 1px dotted #000;",
        "  border-radius: 3px;",
        "}",
        ".lite_dialog_body input[type='button'] {",
        "  text-align: left;",
        "  font-size: 24px;",
        "  width: 100%;",
        "}",
        ".lite_dialog_body input[type='button']:focus {",
        "  font-weight: bold;",
        "}",
    ].join('\n');

    /* Lite Dialog, Tornado Extending */
    Tornado.css += [
        /* Channel Dialog */
        ".lite_dialog.channel_dialog {",
        "    min-width: 300px;",
        "    max-width: 300px;",
        "}",
        ".lite_dialog.channel_dialog .lite_dialog_body p {",
        "    margin: 0;",
        "}",
        /* Tornado Config Dialog */
        ".lite_dialog .lite_dialog_body .oauth_config label input[type=checkbox] + span {",
        "    color: #888;",
        "}",
        ".lite_dialog .lite_dialog_body .oauth_config label input[type=checkbox]:checked + span {",
        "    color: #000;",
        "}",
        /* Help Dialog */
        "#tornado_help_dialog {",
        "    height: 80%;",
        "    min-width: 700px;",
        "}",
        "#tornado_help_dialog .lite_dialog_body {",
        "    border-width: 1",
        "    width: 100%;",
        "    margin: 2px;",
        "    padding: 15px;",
        "    position: absolute;",
        "    left: 0;",
        "    right: 0;",
        "    top: 26px;",
        "    bottom: 0;",
        "    overflow: auto;",
        "}",
        "#tornado_help_dialog .tornado_help_list {",
        "    width: 100%;",
        "}",
        "#tornado_help_dialog .tornado_help_list th {",
        "    padding-top: 5px;",
        "}",
        "#tornado_help_dialog .tornado_help_list td {",
        "    padding: 1px;",
        "    border-width: 1px;",
        "}",
        "#tornado_help_dialog .tornado_help_list td p,",
        "#tornado_help_dialog .tornado_help_list td ul {",
        "    margin: 0;",
        "}",
        "#tornado_help_dialog .tornado_help_list .tornado_short_key {",
        "    font-family: monospace;",
        "}",
        "#tornado_help_dialog .tornado_help_list .tornado_short_desc .tornado_help_options {",
        "    margin: 0;",
        "    padding: 0;",
        "    color: #888;",
        "}",
        "#tornado_help_dialog .tornado_help_list .tornado_short_desc .tornado_help_options {",
        "    width: 200px;",
        "    list-style: none;",
        "    float: right;",
        "}",
    ].join('\n');

    /* Right column Information */
    Tornado.css += [
        /* Right column Help */
        "#tornado_rightcolumn_help {",
        // "  background-color: #344f68;",
        "  margin: 3px;",
        "  padding: 5px;",
        "  box-shadow: 0 0 3px inset;",
        "  border-radius: 3px;",
        "}",
        "#tornado_rightcolumn_help > p {",
        "  margin: 0;",
        "}",
        "#tornado_rightcolumn_help > p .show_tornado_config {",
        "  font-size: 12px;",
        "  color: #89BCF0;",
        "  cursor: pointer;",
        "}",
        "#tornado_rightcolumn_help > p .show_tornado_help {",
        "  font-size: 12px;",
        "  color: #89BCF0;",
        "  cursor: pointer;",
        "}",
        "#tornado_rightcolumn_help > ul {",
        "  margin: 0;",
        "  padding: 0;",
        "  list-style: none;",
        "}",
        "#tornado_rightcolumn_help > ul li:nth-of-type(4n) {",
        "  margin-bottom: 5px;",
        "}",
        "#tornado_shortcuts_help {",
        "  color: #abb;",
        "  font-size: 12px;",
        "  line-height: 1.2em;",
        "}",
        "#tornado_shortcuts_help dd {",
        "  width: 203px;",
        "  overflow: hidden;",
        "}",
        "#tornado_shortcuts_help .more {",
        "  font-size: 8px;",
        "  cursor: pointer;",
        "}",
        "#tornado_shortcuts_help .hide {",
        "  display: none;",
        "}",
        "#tornado_shortcuts_help dt + dd code {",
        "  border-radius: 3px 0 0 0;",
        "}",
        "#tornado_shortcuts_help dd:last-child code {",
        "  border-radius: 0 0 0 3px;",
        "}",
        "#tornado_shortcuts_help dd {",
        "  margin-left: 1em;",
        "  height: 1.2em;",
        "}",
        "#tornado_shortcuts_help code {",
        "}",
        "#tornado_shortcuts_help code:after {",
        "  content: ': ';",
        "}",
        /* Clean Posts */
        ".empty_post {",
        "  background: #fff;",
        "  border-radius: 10px;",
        "  margin-top: 20px;",
        "}",
        ".empty_post.same_user_as_last {",
        "  margin-top: 7px;",
        "}",
        /* Quote AA */
        "#posts .post.quote_aa .post_title {",
        "  width: 800px;",
        "  background-color: #fff;",
        "  padding: 10px;",
        "  font-size: 16px;",
        "  line-height: 1em;",
        "  font-family:'ＭＳ Ｐゴシック','ＭＳＰゴシック','MSPゴシック','MS Pゴシック', 'IPA MonaPGothic', 'Mona';",
        "}",
        "#posts .post.quote_aa span.quote {",
        "  display: block;",
        "  text-rendering: auto;",
        "}",
    ].join('\n');

    /* Prepend Page Link */
    Tornado.css += [
        "#posts li.pagelink {",
        "  font-size: 13px;",
        "  line-height: 13px;",
        "  margin: -15px 0 7px 0;",
        "  color: white;",
        "  opacity: 0.65;",
        "}",
        "#posts li.pagelink a {",
        "   color: white;",
        "}",
    ].join('\n');

    /**
     * Tornado で使用できる左クリックイベントです。
     * Element.dispatchEvent(Tornado.left_click) として使います。
     */
    Vals.left_click = Tornado.left_click = document.createEvent('MouseEvent');
    Vals.left_click.initEvent('click', true, true);

    /**
     * オブジェクトをシリアライズします
     * http://blog.stchur.com/2007/04/06/serializing-objects-in-javascript/
     * @param {Object} _obj 辞書型のオブジェクト.
     * @return {String} eval で復元できるシリアライズした文字列を返します.
     */
    Etc.serialize = function(_obj) {
       // Let Gecko browsers do this the easy way
       if (Tornado.browser != 'chrome' && typeof _obj.toSource !== 'undefined' && typeof _obj.callee === 'undefined')
       {
          return _obj.toSource();
       }
       // Other browsers must do it the hard way
       switch (typeof _obj)
       {
          // numbers, booleans, and functions are trivial:
          // just return the object itself since its default .toString()
          // gives us exactly what we want
          case 'number':
          case 'boolean':
          case 'function':
             return _obj;
             break;

          // for JSON format, strings need to be wrapped in quotes
          case 'string':
             return '\'' + _obj.replace("'", "\'") + '\'';
             break;

          case 'object':
             if (_obj instanceof RegExp) {
                /* RegExp return /regexp/ */
                return _obj.toString();
             }

             var str;
             if (_obj.constructor === Array || typeof _obj.callee !== 'undefined')
             {
                str = '[';
                var i, len = _obj.length;
                for (i = 0; i < len - 1; i++) { str += Etc.serialize(_obj[i]) + ','; }
                str += Etc.serialize(_obj[i]) + ']';
             }
             else
             {
                str = '{';
                var key;
                for (key in _obj) { str += key + ':' + Etc.serialize(_obj[key]) + ','; }
                str = str.replace(/\,$/, '') + '}';
             }
             return str;
             break;

          default:
             return 'UNKNOWN';
             break;
       }
    };

    /**
     * Copyright (c) 2011 David Mzareulyan
     * μDeferred library
     * https://github.com/davidmz/microDeferred
     */
    var $D; /* Etc.Deferred へのショートハンド */
    $D = Etc.Deferred = (function() {
        var Deferred;

        (function(){
            var e=window;
            Deferred=typeof e.jQuery!=="undefined"&&typeof e.jQuery.Deferred!=="undefined"?e.jQuery.Deferred:
                function(){if(this == window || this == undefined)return new e.Deferred;var i=[0,[],[]],c=0,j,b=null,g,d=this,h=function(a,f,b){if(!c){c=a;j=f;for(a=i[a];a.length;)a.shift().apply(b,j);i=null;return d}},k=function(a,b){c==a?b.apply(this,j):c||i[a].push(b);return this};d.promise=function(a){if(!a&&b)return b;b=a?a:b?b:{};for(var f in g)g.hasOwnProperty(f)&&(b[f]=g[f]);return b};d.resolve=function(){return h(1,arguments,b)};d.reject=function(){return h(2,arguments,b)};d.resolveWith=function(){var a=arguments.shift();return h(1,arguments,a)};d.rejectWith=function(){var a=arguments.shift();return h(2,arguments,a)};g={done:function(a){return k.call(this,1,a)},fail:function(a){return k.call(this,2,a)},then:function(a,b){return this.done(a).fail(b)},always:function(a){return this.then(a,a)},isResolved:function(){return c==1},isRejected:function(){return c==2}}}})();

        return Deferred;
    })();

    /**
     * Reblog 時 XHR のヘッダに埋め込む Content Type を指定する用の配列です
     */
    var HeaderContentType = ["Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"];
    
    /**
     * 配列同士を比較します 
     * @param {Array} another this と比較する配列
     * @returns {Bool} 同一なら true を、値が一つでも違えば false を返します
     */
    Array.prototype.cmp = function(another) {
        return ((this.length != another.length)
            ? false
            : this.every(
                function(v, k) { return v == another[k]; }
              ));
    };

    Etc.intRange = function intRange(min, value, max) {
        if (value <= min) {
            return min;
        }
        else if (max <= value) {
            return max;
        }
        return value;
    }

    Array.prototype.move = function(old_index, new_index) {
        old_index = Etc.intRange(0, old_index, Vals.oauth_operator.tumblelog_infos.length);
        new_index = Etc.intRange(0, new_index, Vals.oauth_operator.tumblelog_infos.length);

        var dst;
        var hanoi = this.splice(old_index);

        dst = hanoi.shift();
        hanoi = this.splice(new_index).concat(hanoi);

        /* apply を使えば while を使わなくて済むと思います */
        while (hanoi.length) {
            if (this.length == new_index) {
                this.push(dst);
            }
            this.push(hanoi.shift());
        }
    };

    /*---------------------------------
     * Class or Object
     *-------------------------------*/

    /**
     * KeyEventCache オブジェクト
     */
    Etc.KeyEventCache = {
        cache: [],
        cache_length: 3,
        expire_time: 2000,
        last_time: 0,
        clear: function() {
            this.cache.length = 0;
        },
        add: function(e) {
            var ch,
                key_with = "",
                key;

            if (112 <= e.keyCode && e.keyCode <= 123) {
                return; /* Function keys */
            }
            else if (!(65 <= e.keyCode && e.keyCode <= 90) &&
                     !(48 <= e.keyCode && e.keyCode <= 57)) {
                return; /* None Alphabet and Number */
            }

            /* 入力エリア、またはリッチテキスト内では無効にします */
            if (e.target.tagName   === 'INPUT' ||
                e.target.tagName   === 'TEXTAREA' ||
                /\bmceContentBody\b/.test(e.target.className)) {
                return;
            }

            ch = String.fromCharCode(e.keyCode);
            if (e.shiftKey) {
                key_with += "s";
            }
            if (e.ctrlKey) {
                key_with += "c";
            }
            if (e.altKey) {
                key_with += "a";
            }

            key = "";
            if (key_with.length) {
                key = key_with + '-';
            }
            key += ch.toLowerCase();

            if (this.last_time + this.expire_time < new Date()) {
                this.cache.length = 0;
            }
            this.last_time = (new Date() * 1);

            this.cache.push(key);
            this.cache = this.cache.slice(-this.cache_length);
        },
    };

    /**
     * ShareValue オブジェクト
     */
    Etc.ShareValue = {
        buildId: function(name) {
            return 'tornado_share_value_' + name;
        },
        addElement: function(name, value) {
            var root_elm;

            if ((root_elm = document.querySelector('#share_value')) === null) {
                root_elm = document.body.appendChild(((typeof Etc !== 'undefined') ? (Etc) : window).buildElement('div', {id: 'share_value'}));
            }

            var id = this.buildId(name);
            var elm;

            elm = ((typeof Etc !== 'undefined') ? (Etc) : window).buildElement('inpug', {
                    type: 'hidden',
                    id: id,
                    value: value});

            return root_elm.appendChild(elm);
        },
        set: function(name, value) {
            var id = this.buildId(name);
            var elm = document.querySelectorAll('#' + id)[0];

            if (elm === undefined) {
                elm = this.addElement(name, value);
            }

            elm.setAttribute('value', value);
        },
        get: function(name, default_value) {
            var id = this.buildId(name);
            var elm = document.querySelectorAll('#' + id)[0];

            if (elm === undefined) {
                elm = this.addElement(name, default_value);
            }

            return elm.getAttribute('value');
        },
        toggle: function(name, default_value) {
            var id = this.buildId(name);
            var elm = document.querySelector('#' + id);
            var value;

            if (elm === null) {
                elm = this.addElement(name, default_value);
            }
            else {
                value = elm.getAttribute('value');
                elm.setAttribute('value', value == 'false');
            }

            return elm.getAttribute('value');
        },
    };

    /**
     * CustomKey クラス
     */
    Etc.CustomKey = function(options) {
        this.key_bind     = options.key_bind;
        this.func         = options.func;

        this.url          = options.url;
        this.expr         = (options.expr && typeof options.expr === 'function') ? options.expr : function() {return true;};
        this.title        = options.title || options.func.name || options.func;
        this.group        = options.group || 0;
        this.grouporder   = options.grouporder;
        this.has_selector = options.has_selector || null;
        this.url          = options.url || null;
        this.usehelp      = (typeof options.usehelp == 'undefined') ? true : options.usehelp;
        this.desc         = options.desc || '';
        this.options      = options.options || {};
    };

    Etc.CustomKey.prototype = {
        urlTest: function() {
            return true; /* TODO */
            if (this.url !== null &&
                this.url.test(location) === false) {
                return false;
            }
        },
        keyTest: function(key_event_cache) {
            var cache = key_event_cache.cache;
            var self = this;

            if (cache.length === 0 || cache.length < this.key_bind.length) {
                return false;
            }

            var r = cache.slice(-(this.key_bind.length)).every(function(v, i) {
                var key = self.key_bind[i];

                /* key が正規表現である場合がある */
                var key_reg = RegExp('^' + RegExp(key).source + '$');

                return key_reg.test(v);
            });
            return r;
        },
        hasSelectorTest: function(post) {
            if (this.has_selector === null) {
                return true;
            }
            if (post && post.querySelector(this.has_selector)) {
                return true;
            }
            return false;
        },
        exprTest: function(post) {
            if (typeof this.expr === 'function') {
                return this.expr(post);
            }
            return true;
        },
    };

    /**
     * クライアントエリアの右下にピンバルーンメッセージを表示します
     */
    Etc.PinNotification = function PinNotification (message) {
        var board = document.querySelector('#pin_notification_board');
        if (!board) {
            board = document.body.appendChild(document.createElement('div'));
            board.id = 'pin_notification_board';
        }
    
        var elm = board.appendChild(document.createElement('div'));
        elm.className = 'pin_notification';
        elm.appendChild(document.createTextNode(message));
    
        setTimeout(function() { board.removeChild(elm); }, 3000);
    }

    /**
     * 軽量なダイアログボックスを表示します
     * @class
     * @name LiteDialog
     * @param {String} title タイトル
     */
    function LiteDialog(title) {
        /* ダイアログを移動する際にダイアログ左上からマウスまでの位置の差です */
        this.origin_offsetX = this.origin_offsetY = null;
    
        var dialog = this.dialog = document.createElement('div');
        dialog.object = dialog;
        dialog.className = 'lite_dialog';
        dialog.innerHTML = this.base_lite_dialog;
    
        var caption = dialog.querySelector('.lite_dialog_caption');
        caption.appendChild(document.createTextNode(title));
        caption.addEventListener('mousedown', Etc.preapply(this, this.mousedown));
    
        var close = dialog.querySelector('.lite_dialog_close');
        close.addEventListener('click', Etc.preapply(this, this.close));
    
        document.body.appendChild(dialog);
        this.centering();
    
        document.addEventListener('keydown', LiteDialog.prototype.keyevent, true);
    }
    
    LiteDialog.prototype = /** @lends LiteDialog.prototype */ {
        /**
         * lite_dialog のベース HTML
         * @TODO skelton
         */
        base_lite_dialog: [
            '<div class="lite_dialog_sysbar">',
            '  <div class="lite_dialog_sysmenus">',
            '    <span class="lite_dialog_close">× </span>',
            '  </div>',
            '  <div class="lite_dialog_caption">',
            '  </div>',
            '</div>',
            '<div classdiv class="lite_dialog_body">',
            '</div>'].join('')
        ,
        /**
         * LiteDialog のタイトルが掴まれた時の処理
         * @param {Object} e event
         */
        mousedown: function(e) {
            this.mousemove = Etc.preapply(this, this.mousemove);
            this.mouseup = Etc.preapply(this, this.mouseup);
      
            document.addEventListener('mousemove', this.mousemove);
            document.addEventListener('mouseup', this.mouseup);
      
            this.origin_offsetX = e.clientX - this.dialog.offsetLeft;
            this.origin_offsetY = e.clientY - this.dialog.offsetTop;
        },
        /**
         * LiteDialog を移動している最中の処理
         * @param {Object} e event
         */
        mousemove: function(e) {
            this.dialog.style.top = (e.clientY - this.origin_offsetY) + 'px';
            this.dialog.style.left = (e.clientX - this.origin_offsetX) + 'px';
            window.getSelection().removeAllRanges();
        },
        /**
         * LiteDialog の移動終了の処理
         * @param {Object} e event
         */
        mouseup: function(e) {
            document.removeEventListener('mousemove', this.mousemove);
            document.removeEventListener('mousemove', this.mouseup);
        },
        /**
         * LiteDialog を閉じる処理
         * @param {Object} e event
         */
        close: function(e) {
            this.dialog.parentNode.removeChild(this.dialog);
            this.dialog = undefined;
        },
        /**
         * LiteDialog 用のキーイベント
         * 同じイベントは何度登録しても重複(何度も)処理されません
         * @param {Object} e event
         */
        keyevent: function (e) {
            /* 数字キーが入力された際に対応したチャンネルのボタンをクリックします */
            if (document.querySelector('.lite_dialog')) {
                if (e.keyCode == 27) {
                    document.querySelector('.lite_dialog_close').dispatchEvent(Tornado.left_click);
                }
                else if (48 <= e.keyCode && e.keyCode <= 57) {
                    /* TODO: これは Lite Dialog が持つべき機能ではありません */
                    /* 48 == '0', 57 == '9' */
                    var number = parseInt(e.keyCode) - '0'.charCodeAt(0);
                    var name = 'button' + number;
                    document.querySelector('.lite_dialog input[type="button"].' + name).click();
                }
            }
        },
        /**
         * LiteDialog を画面中央に置きます
         */
        centering: function() {
            var elm = this.dialog,
                vr = Etc.viewportRect();
            elm.style.top = (vr.top + (vr.height / 2) - (elm.offsetHeight / 2)) + 'px';
            elm.style.left = (vr.left + (vr.width / 2) - (elm.offsetWidth / 2)) + 'px';
        },
        /**
         * LiteDialog 内容物の大きさにサイズを合わせます
         */
        resize: function() {
        },
    };

    /**
     * tParser
     * 構文:
     *   {{ A }}: 変数の代入
     *     ex: {{ A }}, {{A.B}}
     *   {{ iter A@B }}: 配列 A に B という名前を付けてループ
     *     ex: {{ iter A@B }} {{ B }} {{ /iter }}
     *         {{ iter A.a@B }} ... {{/iter}}
     * 
     * 自由度と制約:
     *   {{...}} で参照する際には、オブジェクトの階層を .(ドット) を用いて掘ることができます
     *   {{...}} の中括弧の直内は空白を自由に取って構いません
     *   {{ iter }} はネストできません
     *   {{ iter }} はインデックス番号を参照できません
     */
    Etc.tParser = function tParser(src) {
      var a = arguments;
      var self = this;
      var reg = /(?:{{\s*([A-Za-z0-9._]+)\s*}}|{{\s*iter\s+([A-Za-z0-9._]+)@([A-Za-z0-9_]+)\s*}}([\s\S]*){{\s*\/iter\s*}})/gm;
      var last_index = 0;
      var next_str = "";
      var nodes = [];
      
      /* ここでは置換ではなく字句解析目的で replace 関数を用いています */
      src.replace(reg,
        function(match_text, assign_key, iter_key, iter_as, iter_text, index, all_text){
          if (index !== 0) {
            nodes.push(self.tNode(all_text.slice(last_index, index), 'text'));
            last_index = index;
          }
          
          if (assign_key !== undefined &&
              assign_key.length) {
            nodes.push(self.tNode(assign_key, 'assign'));
            last_index += match_text.length;
          }
          else {
            nodes.push(self.tNode('', 'iter', {iter_key: iter_key, iter_as: iter_as, template: new Etc.tParser(iter_text)}));
            last_index += match_text.length;
          }
          next_str = all_text.slice(last_index);
        }
      );
      
      if (next_str.length) {
        nodes.push(self.tNode(next_str, 'text'));
      }
      
      this.nodes = nodes;
    }
     
    Etc.tParser.prototype = {
      digDict: function digDict(dict, keys) {
        if (keys.length === 1) {
          return dict[keys[0]];
        }
        
        return ((dict[keys[0]] !== undefined)
                ? (this.digDict(dict[keys[0]], keys.slice(1)))
                : (undefined));
      },
      textBuilder: function textBuilder(text, dict, iter_dict) {
        var self = this;
        var reg = /{{\s*([A-Za-z0-9._]+)\s*}}/gm;
        
        function replacer(a,b,c,d) {
          return self.digDict(iter_dict, b.split('.')) || self.digDict(dict, b.split('.')) || "";
        }
        
        return text.replace(reg, replacer);
      },
      tNode: function tNode(text, type, iter_options) {
        return {
          text: text,
          type: type, /* text, iter, assign */
          iter_options: iter_options, /* iter_key, iter_as */
        }
      },
      assign: function(dict) {
        var self = this;
        
        return this.nodes.map(
          function(tnode){
            var iter_array;
            var iter_results;
            
            switch(tnode.type) {
              case "iter":
                iter_array = self.digDict(dict, tnode.iter_options.iter_key.split('.'));
                
                iter_results = iter_array.map(function(src, index) {
                  /* FIXME: iter_dict と dict が重複した際に値が消えます */
                  var last_value, last_index, text;
                  
                  dict[tnode.iter_options.iter_as] = src;
                  dict['index'] = index.toString();
                  
                  text = tnode.iter_options.template.assign(dict);
                  
                  dict[tnode.iter_options.iter_as] = last_value;
                  dict['index'] = last_index;
                  
                  return text;
                });

                
                return iter_results.join('');
                
              case "assign":
              
                return self.digDict(dict, tnode.text.split('.')) || "";
            }
            
            return tnode.text;
          }
        ).join('');
      }
    };

    /**
     *
     */
    Etc.OAuthTumblelogInfo = function OAuthTumblelogInfo(base_account, tumblelog_title, hostname, oauth_token, oauth_token_secret) {
        this.base_account = base_account;
        this.tumblelog_title = tumblelog_title;
        this.hostname = hostname;
        this.oauth_token = oauth_token;
        this.oauth_token_secret = oauth_token_secret;
    };

    /**
     * OAuthOperator
     */
    Etc.OAuthOperator = function OAuthOperator() {
        this.tumblelog_infos = [];
        this.exclude_tumblelogs = [];
        this.enabled_tumblelogs = [];

        if (this.isAble() === false) {
            this.oauthconfigs = [];
            return;
        }

        this.reload();
    };

    Etc.OAuthOperator.prototype = {
        reload: function reload() {
            var self = this;

            this.tumblelog_infos = JSON.parse(GM_getValue('tumblelog_infos', '[]'));
            this.exclude_tumblelogs = JSON.parse(GM_getValue('exclude_tumblelogs', '[]'));
    
            this.enabled_tumblelogs = this.tumblelog_infos.filter(function (tumblelog_info){
                return !self.isExcluded(tumblelog_info);
            });
        },
        save: function save() {
            GM_setValue('tumblelog_infos', JSON.stringify(this.tumblelog_infos));
            GM_setValue('exclude_tumblelogs', JSON.stringify(this.exclude_tumblelogs));
        },
        isAble: function isAble() {
            return (typeof OAuth != 'undefined');
        },
        isEnabled: function isEnabled(tumblelog_info) {
            return this.enabled_tumblelogs.indexOf(tumblelog_info) >= 0;
        },
        isExcluded: function isExcluded(tumblelog_info) {
            return this.exclude_tumblelogs.some(function(ex) {
                return (ex.base_account == tumblelog_info.base_account &&
                        ex.hostname == tumblelog_info.hostname);
            });
        },
        addExclude: function addExclude(tumblelog_info) {
            if (this.isExcluded(tumblelog_info) === true) {
                return;
            }
            this.exclude_tumblelogs.push(tumblelog_info);
            this.save();
            this.reload();
        },
        removeExclude: function removeExclude(tumblelog_info) {
            this.exclude_tumblelogs = this.exclude_tumblelogs.filter(function(ex) {
                return !(ex.base_account == tumblelog_info.base_account &&
                         ex.hostname == tumblelog_info.hostname);
            });
            this.save();
            this.reload();
        },
        enabledLength: function() {
            return this.enabled_tumblelogs.length;
        },
        getRequestToken: function getRequestToken() {
            var deferred = new $D;

            var url = location.protocol + '//www.tumblr.com/oauth/request_token';
            var accessor = {
                consumerKey: Tornado.vals.CONSUMER_KEY,
                consumerSecret: Tornado.vals.CONSUMER_SECRET
            };
    
            var message = { method: 'GET', action: url};
            var request_body = OAuth.formEncode(message.parameters);
            OAuth.completeRequest(message, accessor);

            console.log(message);
            console.log(OAuth.getAuthorizationHeader('', message.parameters));

            GM_xmlhttpRequest({
                url: message.action,
                method: message.method,
                headers: {
                    'Authorization': OAuth.getAuthorizationHeader('', message.parameters),
                },
                onload: function(gm_response) {
                    console.log(gm_response);
                    var response = OAuth.decodeForm(gm_response.responseText);
                    var result = {};
    
                    result[response[0][0]] = response[0][1];
                    result[response[1][0]] = response[1][1];
                    result[response[2][0]] = response[2][1];
    
                    return deferred.resolve(result);
                },
            });

            return deferred.promise();

            /*
            var a = new Ajax(message.action, {
                method: message.method, 
                asynchronous: false,
                parameters: request_body,
                requestHeaders: [
                    'Authorization', OAuth.getAuthorizationHeader('', message.parameters),
                ],
            })
            */
    
            var response = OAuth.decodeForm(a.xhr.responseText);
            var result = {};
    
            result[response[0][0]] = response[0][1];
            result[response[1][0]] = response[1][1];
            result[response[2][0]] = response[2][1];
    
            return result;

        },
        getAccessToken: function getAccessToken() {
            var deferred = new $D;

            var tokens = OAuth.decodeForm(location.search.slice(1));
            var tokenSecret = GM_getValue('oauth_token_secret');
    
            var url = 'http://www.tumblr.com/oauth/access_token';
    
            var accessor = {
                consumerKey: Tornado.vals.CONSUMER_KEY,
                consumerSecret: Tornado.vals.CONSUMER_SECRET,
                token: tokens[0][1],
                tokenSecret: tokenSecret,
            };
    
            var parameters = {
                oauth_verifier: tokens[1][1],
            };
    
            var message = {
                method: 'POST',
                action: url,
                parameters: parameters,
            };
    
            var request_body = OAuth.formEncode(message.parameters);
            OAuth.completeRequest(message, accessor);

            GM_xmlhttpRequest({
                url: message.action,
                method: message.method,
                headers: {
                    'Authorization': OAuth.getAuthorizationHeader('', message.parameters)
                },
                onload: function(gm_response) {
                    var response = OAuth.decodeForm(gm_response.responseText);
                    var access_tokens = {};
    
                    access_tokens[response[0][0]] = response[0][1];
                    access_tokens[response[1][0]] = response[1][1];

                    deferred.resolve(access_tokens);
                },
            });

            return deferred.promise();

            var a = new Ajax(message.action, {
                method: message.method,
                parameters: message.parameters,
                asynchronous: false,
                requestHeaders: [
                    'Authorization', OAuth.getAuthorizationHeader('', message.parameters),
                ],
            });
    
            var response = OAuth.decodeForm(a.xhr.responseText);
            var access_tokens = {};
    
            access_tokens[response[0][0]] = response[0][1];
            access_tokens[response[1][0]] = response[1][1];
    
            return access_tokens;
        },
    };

    Vals.oauth_operator = new Etc.OAuthOperator();

    /*---------------------------------
     * Functions
     *-------------------------------*/
    Etc.tumblelogCollection = function tumblelogCollection() {
        var tumblelogs = [];

        /**
         * まず dashboard か確認します
         * dashboard である場合は
         * ul.blog_menu #popover_blogs .popover_menu_item
         * から取得します。
         * 取得したものは localStorage で活用します
         */

        if (/^\/dashboard/.test(location.pathname)) {
            tumblelogs = Array.apply(0, document.querySelectorAll('ul.blog_menu #popover_blogs .popover_menu_item:not(#button_new_blog)')).map(function(elm) {
                var channel_id = elm.id.slice(9);
                var title_elm = elm.querySelector('a');

                title_elm.textContent; /* この行を入れないと下行で textContent におけるエラーが発生します */
                var title = (title_elm.textContent || title_elm.innerText).replace(/^\s*|\s*$/g, '');

                return {
                    'name': channel_id,
                    'title': title
                };
            });

            localStorage.setItem('tornado_tumblelogs', JSON.stringify(tumblelogs));
        }
        else {
            tumblelogs = JSON.parse(localStorage.getItem('tornado_tumblelogs')) || [];
        }

        Tornado.tumblelogs = tumblelogs;
    };

    Etc.verifyAccessToken = function verifyAccessToken() {
        Vals.oauth_operator
            .getAccessToken()
            .done(function(access_tokens) {
                var base_account = document.querySelector('#search_field [name=t]').value,
                    oauth_token = access_tokens.oauth_token,
                    oauth_token_secret = access_tokens.oauth_token_secret;
     
                var tumblelog_infos = $$('#popover_blogs .item a').map(function(item){
                    return new Etc.OAuthTumblelogInfo(
                        base_account,
                        item.text.trim(),
                        item.href.split('/').slice(-1)[0] + '.tumblr.com',
                        oauth_token,
                        oauth_token_secret
                    );
                });
     
                var new_setting = new LiteDialog('New OAuth Settings');
                var setting_body = new_setting.dialog.querySelector('.lite_dialog_body');
     
                setting_body.appendChild(Etc.buildElement('p', {}, 'OAuth token: ' + access_tokens.oauth_token));
                setting_body.appendChild(Etc.buildElement('p', {}, 'OAuth token secret: ' + access_tokens.oauth_token_secret));
     
                var tumblelog_list = setting_body.appendChild(Etc.buildElement('ul'));

                tumblelog_infos.map(function(tumblelog) {
                    tumblelog_list.appendChild(Etc.buildElement('li', {},
                        'Name: ' + tumblelog.tumblelog_title + '<br />' +
                        'Host name: ' + tumblelog.hostname + '<br />'));
                });
     
                var ok = setting_body.appendChild(Etc.buildElement('button', {}, 'この設定を保存します'));
     
                ok.addEventListener('click', function() {
                    tumblelog_infos.map(function(tumblelog_info) {
                        Vals.oauth_operator.tumblelog_infos.push(tumblelog_info);
                    });
                    Vals.oauth_operator.save();
                    Vals.oauth_operator.reload();
     
                    GM_deleteValue('oauth_token_secret');
     
                    new_setting.dialog.parentNode.removeChild(new_setting.dialog);
     
                    new Etc.PinNotification('認証情報を保存しました。');
                    new Etc.PinNotification('3 秒後にリロードします。');
                    new Etc.PinNotification('設定は [conf] から確認できます。');
     
                    setTimeout(function(){location.href = '/dashboard'}, 3000);
                }, false);
     
                new_setting.centering();
            });
    };

    /**
     * ビデオの開閉トグル関数です。
     * Tumblr application.js を元に Tumblr Tornado でも動くように移植しました
     * @param {Node} post 対象のビデオポスト要素
     */
    Etc.toggleVideoEmbed =  function toggleVideoEmbed(post) {
        var post_id = post.id.match(/\d+/)[0],
            toggle = post.querySelector('.video_thumbnail'),
            embed = post.querySelector('.video_embed'),
            watch = post.querySelector('.video');
        if (watch.style.display == 'none') {
            embed.innerHTML = post.querySelector('input[id^="video_"]').value;
            toggle.style.display = 'none';
            watch.style.display = 'block';
        }
        else {
            embed.innerHTML = '';
            toggle.style.display = 'block';
            watch.style.display = 'none';
        }
    };
    
    /**
     * HTML 文字列から Node 群を返します
     * @param {String} html 作成した HTML 文字列.
     * @return {Object} HTML を元に作成した要素を持つ DocumentFragment.
     */
    Etc.buildElementBySource = function buildElementBySource(html) {
        var range = document.createRange();
        range.selectNodeContents(document.body);
        return range.createContextualFragment(html);
    };
    
    /**
     * Node を作成し各種データを同時にセットします
     * @param {String} tag_name タグ名.
     * @param {Object} propaties 辞書型のデータ.
     * @param {String} HTML 文字列.
     * @return {Object} 作成した Node を返します.
     */
    Etc.buildElement = function buildElement(tag_name, propaties, innerHTML) {
        var elm = document.createElement(tag_name);
    
        for (var key in (propaties || {})) {
            elm.setAttribute(key, propaties[key]);
        }
    
        elm.innerHTML = innerHTML || '';
        return elm;
    };
    
    /**
     * document.querySelectorAll へのショートハンド
     * @param {String} selector CSS Selector
     * @return {Array} NodeList の Array に変換したもの
     */
    var $$ = Etc.$$ = function $$(selector) {
        /* || [] を用いるのは、querySelector は要素を見つけられなかった際に null を返します */
        return Array.prototype.slice.call(document.querySelectorAll(selector) || []); 
    };
    
    /**
     * クライアント領域で Script を実行します
     * @param {String} code 実行したいコード
     */
    Etc.execScript = function execScript(code) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.innerHTML = code;
        script.addEventListener('onload', function(e) {
            (function letit(elm) {
                elm.parentNode.removeChild(elm);
            })(e.target);
        });
        document.body.appendChild(script);
    };
    
    /**
     * クライアントエリアのスクロール位置、画面サイズを取得します
     * @return {Object} left, top, width, height を備えた辞書を返します
     */
    Etc.viewportRect = function viewportRect() {
        return {
            left: document.documentElement.scrollLeft || document.body.scrollLeft,
            top: document.documentElement.scrollTop || document.body.scrollTop,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight};
    };
    
    /**
     * 要素の位置、サイズを取得します
     * @TODO absolute, fixed な要素の子要素などは再帰的に親へ辿る必要があります
     * @return {Object} 要素の left, top, width, height を備えた辞書を返します
     */
    Etc.nodeRect = function nodeRect (elm) {
        return {
            left: elm.offsetLeft,
            top: elm.offsetTop,
            width: elm.offsetWidth,
            height: elm.offsetHeight};
    };

    /**
     * ショートカットの一行ヘルプを作成して返します
     * @param {Object} shortcut customkey で作成したオブジェクト
     * @returns HTML 文字列を返します
     */
    Etc.buildShortcutLineHelp = function buildShortcutLineHelp(shortcut) {
        /* FIXME: shortcut の構造が変わった為このままだと動きません */
        var pre_spacing = ['&nbsp;', '&nbsp;', '&nbsp;'],
            key = [];
    
        key.push((shortcut.follows && shortcut.follows.join(' ')) || '');
        key.push((shortcut.shift && 's-') || '');
        key.push(shortcut.key_bind.join(''));
    
        key = key.join('');
        key = pre_spacing.slice(key.length).join('') + key;
    
        return [
            '<code>',
            key,
            '</code>',
            (shortcut.title || shortcut.desc || shortcut.func.name)].join('');
    };
    
    /**
     * 特定の関数は this があるオブジェクトを指している事を想定しています。
     * そのような関数を呼び出す際に self を指定すると func の this が self になったまま呼び出されます。
     * 使用目的として EventListener や setTimeout を想定しています。
     * @param {Object}   self func を呼び出した際 this にしたい変数
     * @param {Function} func 実行したい関数
     * @param {args}     デフォルトの引数
     * @returns 上記の目的を満たすクロージャ
     */
    Etc.preapply = function preapply(self, func, args) {
        return function() {
            func.apply(self, (args || []).concat(Array.prototype.slice.call(arguments)));
        };
    };
    
    /**
     * 辞書型オブジェクトをクエリ文字列に変換します
     * @param {Object} dict 辞書型オブジェクト
     * @return {String} クエリ文字列
     */
    Etc.buildQueryString = function buildQueryString(dict) {
        if (typeof dict == 'undefined') {
            return '';
        }
        var queries = [];
        for (var key in dict) {
            queries.push([encodeURIComponent(key),
                          encodeURIComponent(dict[key])].join('='));
        }
        return queries.join('&');
    };
    
    /**
     * prototype.js 風な Ajax 関数
     * @param {String} url URL.
     * @param {Object} options 各オプションを持った辞書型オブジェクト.
     * @todo Ajax.Request では parameters は文字列ではなく辞書型オブジェクトで入ってくるかどうか
     */
    function Ajax(url, options) {
        var options = options || {};

        var xhr = this.xhr = new XMLHttpRequest(),
            async = (options.asynchronous === undefined) || options.asynchronous;
    
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var status = parseInt(xhr.status);
                if ((status / 100) == 2) {
                    if (options.onSuccess) {
                        options.onSuccess(xhr);
                    }
                }
                else if ((status / 100) >= 4) {
                    if (options.onFailure) {
                        options.onFailure(xhr);
                    }
                }
                if (options.onComplete) {
                    options.onComplete(xhr);
                }
            }
        }

        if (options.parameters && (typeof options.parameters != 'string')) {
            options.parameters = Etc.buildQueryString(options.parameters);
        }
    
        if (options.method == undefined && options.parameters) {
            options.method = 'POST';
        }
        else if (options.method == undefined) {
            options.method = 'GET';
        }
    
        /* FIXME: PUT や DELETE にも対応 */
        if ('POST' != options.method.toUpperCase() && options.parameters) {
            url = [url, options.parameters].join('?');
            options.parameters = null;
        }
        else {
            if (options.requestHeaders == undefined ||
                options.requestHeaders.indexOf('Content-Type') < 0 ||
                options.requestHeaders.indexOf('Content-type') < 0 ||
                options.requestHeaders.indexOf('content-type') < 0) {
                options.requestHeaders = (options.requestHeaders || []).concat(HeaderContentType);
                // FIXME: ここ Content-Type 設定してても入っちゃいます
            }
        }
    
        xhr.open(options.method, url, async);
        for (var i = 0; options.requestHeaders && i < options.requestHeaders.length; i += 2) {
            xhr.setRequestHeader(options.requestHeaders[i], options.requestHeaders[i + 1]);
        }
        xhr.send(options.parameters);
    }
    

    /**
     * Object(dst) の名と値を Object(dict) へ更新します
     */    
    Etc.dictUpdate = function dictUpdate(dict, dst) {
        /* TODO: あとで外に出します */
        var name;
        for (name in (dst || {})) {
            dict[name] = dst[name];
        }
    };

    /**
     * form の有効な値を集めます
     */
    Etc.gatherFormValues = function gatherFormValues(form) {
        var values = {},
            items = form.querySelectorAll('input, textarea, select');
        Array.prototype.slice.call(items).filter(function(elm) {
            return (['checkbox', 'radio'].indexOf(elm.type) >= 0)
                ? elm.checked
                : !elm.disabled;
        }).map(function(elm){
            values[elm.name] = elm.value;
        });
        return values;
    };
    

    
    /**
     * Tornado のメイン機能部
     * @namespace
     */
    Tornado.buildCustomTweet = function buildCustomTweet(postdata) {
        function truncate(text, length, trunc) {
            if (text.length > length) {
                text = text.slice(0, length - trunc.length) + trunc;
            }
            return text;
        }
        function textIntoHTMLLike(html) {
            var text;
            var elm = document.createElement('div');
            elm.innerHTML = html;

            if (elm.textContent) {
                text = elm.textContent;
            }
            else if (elm.innerText) {
                text = elm.innerText;
            }
            else {
                text = "";
            }

            text = text.replace(/<[^>]+>/g, '');
            return text.replace(/( |\r|\n)+/g, ' ').replace(/(^ +| +$)/g, '');
        }

        var type;
        var prefix_list;
        var prefix, body, suffix;
        var length;

        var one, two, three;
        one = textIntoHTMLLike(postdata['post[one]']);
        two = textIntoHTMLLike(postdata['post[two]']);
        three = textIntoHTMLLike(postdata['post[three]']);

        type = postdata['post[type]'];
        length = 140 - 30;
        prefix = '';
        body = '';
        suffix = ' [URL]';

        prefix_list = {
            regular: '',
            quote: '',
            link: '',
            note: '', /* whether */
            answer: '', /* whether */
            photo: 'Photo: ',
            conversation: 'Overheard: ',
            audio: 'Audio: ',
            video: 'Video: '
        };
        prefix = prefix_list[type];
            
        switch (type) {
            case 'regular':
            case 'conversation':
                if (one && two) {
                    body = [one, two].join(' - ');
                }
                else if (one) {
                    body = one;
                }
                else {
                    body = two;
                }
                break;
            case 'photo':
            case 'video':
            case 'audio':
                body = two;
                break;
            case 'note':
                // what is note?
                body = one;
                break;
            case 'link':
                if (one && three) {
                    body = [one, three].join(' - ');
                }
                else if (one) {
                    body = one;
                }
                else if (three) {
                    body = three;
                }
                else {
                    body = two.match(/https?:\/\/([^\/]+)/)[1];
                }
                break;
            case 'quote':
                body = [
                    "\u201c",
                    truncate(one, length - 5, '\u2026'),
                    "\u201d"
                ].join('');
                if (one.length <= (length - 5) &&
                    two &&
                    body.length < (length - 5)) {
                    body += " - " + two;
                }
                break;
            default:
                break;
        }

        if (!body.length) {
            suffix = suffix.replace(/(^ +| +$)/g, '');
        }

        return prefix + truncate(body, length, '\u2026') + suffix;
    };

    Etc.elementOffsetLeft = function elementOffsetLeft(elm) {
        if (elm.offsetParent && elm.offsetParent.tagName != 'BODY') {
            return elm.offsetLeft + Etc.elementOffsetLeft(elm.offsetParent);
        }
        return elm.offsetLeft;
    }

    Etc.elementOffsetTop = function elementOffsetTop(elm) {
        if (elm.offsetParent && elm.offsetParent.tagName != 'BODY') {
            return elm.offsetTop + Etc.elementOffsetTop(elm.offsetParent);
        }
        return elm.offsetTop;
    }

    /**
      * 入力されたキーによってコマンドを実行します
      * @param {Object} e Eventオブジェクト
      */
    Tornado.keyevent = function keyevent(e) {
        var post,
            margin_top = 7,
            vr = Etc.viewportRect();

        Etc.KeyEventCache.add(e);

        /*
        post = $$('#posts>.post:not(.new_post)').filter(function(elm) {
            return Math.abs(vr.top - (elm.offsetTop - margin_top)) < 5;
        })[0];
        */
        post = $$('#posts > .post_container:not(.new_post) > .post,'+
                  '#search_posts > .post_container > .post').filter(function(elm) {
            var elm_offset_top = Etc.elementOffsetTop(elm);
            return Math.abs(vr.top - (elm_offset_top - margin_top)) < 5;
        })[0];
        if (!post) {
            console.info('Post not found');
        }

        Tornado.shortcuts.some(function(shortcut) {
            /*
             優先順位
             1. URL マッチ
             2, 所有セレクタ
             3, 前項入力キー
             4. Ctrl, Alt, Shift 組み合わせキー
            */
            if (!shortcut.urlTest()) {
                return false;
            }
            if (!shortcut.hasSelectorTest(post)) {
                return false;
            }
            if (!shortcut.exprTest(post)) {
                return false;
            }
            if (!shortcut.keyTest(Etc.KeyEventCache)) {
                return false;
            }

            shortcut.func(post, e, shortcut.options);
            Etc.KeyEventCache.clear();
            return true;
        });
    };

    Tornado.funcs = {
        /**
         * reblog を実行します。
         * @param {Node} post 対象の li.post
         * @param {Object} default_postdata 送信するポストデータ
         * @todo classList.add, remove を使ってみる
         */
        reblog: function reblog(post, default_postdata) {
            Tornado.funcs.shutterEffect(post);
        
            var reblog_button = post.querySelector('a.reblog');
            reblog_button.className += ' loading';

            var reblog_id, reblog_key, form_key;
            reblog_id = post.getAttribute('data-post-id');
            reblog_key = post.getAttribute('data-reblog-key');
            form_key = document.body.getAttribute('data-form-key');

            var parameters = JSON.stringify({
                reblog_id: reblog_id,
                reblog_key: reblog_key,
                form_key: form_key,
                post_type: false
            });

            if (Tornado.browser != 'opera') {
                new Ajax(location.protocol + '//www.tumblr.com/svc/secure_form_key', {
                    method: 'POST',
                    requestHeaders: ['X-tumblr-form-key', document.body.getAttribute('data-form-key')],
                    onSuccess: function(_xhr) {
                        var secure_form_key = _xhr.getAllResponseHeaders().match(/X-tumblr.*/i)[0].split(': ')[1];
                        var secure_form_key_header = ['X-tumblr-puppies', secure_form_key];

                        new Ajax(location.protocol + '//www.tumblr.com/svc/post/fetch', {
                            method: 'post',
                            parameters: parameters,
                            onSuccess: function(_xhr) {
                                var name;
                                var response_json = JSON.parse(_xhr.response);
    
                                var postdata = {
                                    channel_id: undefined,
                                    form_key: form_key,
                                    reblog_key: reblog_key,
                                    reblog_id: parseInt(reblog_id),
                                    reblog_post_id: reblog_id,
                                    detached: true,
                                    reblog: true,
                                    silent: true,
                                    context_id: "",
                                    // "is_rich_text[one]": "0",
                                    // "is_rich_text[two]": "0",
                                    // "is_rich_text[three]": "0",
                                    pre_upload: "",
                                    preuploaded_url: "",
                                    preuploaded_ch: "",
                                    "post[date]": "",
                                    "post[publish_on]": "",
                                    "post[state]": "0",
                                    "post[photoset_order]": "o1",
                                    valid_embed_code: "1",
                                    remove_album_art: "",
                                    album_art: "",
                                    MAX_FILE_SIZE: "10485760",
                                    custom_tweet: "[URL]",
                                };
                                Etc.dictUpdate(postdata, response_json);
    
                                for (name in postdata['post']) {
                                    postdata['post[' + name + ']'] = postdata['post'][name];
                                }
                                delete postdata['post'];
    
                                for (name in postdata['post[id3_tags]']) {
                                    postdata['id3_tags[' + name.toLowerCase() + ']'] = postdata['post[id3_tags]'][name];
                                }
                                delete postdata['post[id3_tags]'];

                                Etc.dictUpdate(postdata, default_postdata);

                                try {
                                    if (Tornado.tumblelog_configs[postdata['channel_id']]['data-twitter-on'] == "true") {
                                        postdata['send_to_twitter'] = 'on';
                                        postdata['custom_tweet'] = Tornado.buildCustomTweet(postdata);
                                    }
                                } catch (e) { }
    
                                new Ajax(location.protocol + '//www.tumblr.com/svc/post/update', {
                                    method: 'post',
                                    parameters: JSON.stringify(postdata),
                                    requestHeaders: ['Content-Type', 'application/json'].concat(secure_form_key_header),
                                    onSuccess: function(_xhr) {
                                        var dp, json;

                                        reblog_button.className = reblog_button.className.replace(/\bloading\b/, 'reblogged');

                                        json = JSON.parse(_xhr.responseText);

                                        if (json.errors) {
                                            console.log(json);
                                            if (typeof json.errors == 'string') {
                                                alert(json.errors);
                                            }
                                            else if (json.errors.length) {
                                                alert(json.errors[0]);
                                            }
                                            else {
                                                console.log(json.errors);
                                                alert(json.errors);
                                            }
                                        }
                                        else {
                                            var dp = default_postdata;
                                            new Etc.PinNotification([
                                                'Success: Reblogged',
                                                ((dp['post[state]'] && Tornado.vals.state_texts[dp['post[state]']]) ||
                                                 (dp['post[state]'] == 'on.2' && 'on ' + dp['post[publish_on]'])) || '',
                                                (dp['channel_id'] && dp['channel_id'] != '0' && 'to ' + dp['channel_id']) || ''].join(' '));
                                        }
                                    },
                                });
                            },
                        });
                    },
                });
            }
            else if (Tornado.browser == 'opera') {
                new Ajax(reblog_button.href, {
                    method: 'GET',
                    onSuccess: function(_xhr) {
                        var dummy_elm = Etc.buildElementBySource(_xhr.responseText);
            
                        /* 有効な form データを集めます */
                        var form = dummy_elm.querySelector('#content > form');
                        var postdata = Etc.gatherFormValues(form);
                        delete postdata['preview_post'];
                        for (var name in (default_postdata || {})) {
                            postdata[name] = default_postdata[name];
                        }
            
                        new Ajax(form.action, {
                            method: form.method,
                            parameters: Etc.buildQueryString(postdata),
                            requestHeaders: HeaderContentType,
                            onSuccess: function(_xhr) {
                                var response_elm = Etc.buildElementBySource(_xhr.responseText);
            
                                if (response_elm.querySelector('ul#errors')) {
                                    reblog_button.className = reblog_button.className.replace('loading', '');
                                    alert(response_elm.querySelector('ul#errors').textContent.trim());
                                }
                                else {
                                    reblog_button.className = reblog_button.className.replace(/\bloading\b/, 'reblogged');
            
                                    var dp = default_postdata;
                                    new Etc.PinNotification([
                                        'Success: Reblogged',
                                        (dp['post[state]'] && Tornado.vals.state_texts[dp['post[state]']]) || '',
                                        (dp['channel_id'] && dp['channel_id'] != '0' && dp['channel_id']) || ''].join(' '));
                                }
                            },
                        });
                    },
                });
            }
        },
        /**
            target_blog_info = {
                hostname: '',
                token: '',
                token_secret: ''
            }
         */
        apiReblog: function reblogAPI(post, target_blog_info, options) {
            var hostname = target_blog_info.hostname;
            var url = 'http://api.tumblr.com/v2/blog/' + (hostname) + '/post/reblog';
            var id, reblog_key;

            var accessor = {
                consumerKey    : Tornado.vals.CONSUMER_KEY,
                consumerSecret : Tornado.vals.CONSUMER_SECRET,
                token          : target_blog_info.oauth_token,
                tokenSecret    : target_blog_info.oauth_token_secret
            };

            var reblog_button = post.querySelector('a.reblog');
            var reblog_key = post.getAttribute('data-reblog-key'),
                reblog_id = post.getAttribute('data-post-id');
    
            var state;
            switch (options.state) {
                case '1': state = 'draft'; break;
                case '2': state = 'queue'; break;
                default:  state = options.state; break;
            }

            if (state == 'private') {
                alert('Sorry, private API reblog is not enabled.')
                return;
            }

            var parameters = {
                state: state,
                id: reblog_id,
                reblog_key: reblog_key,
            };

            if (state == 'on.2') {
                parameters.publish_on = options.publish_on;
            }

            var message = {method: 'POST', action: url, parameters: parameters};
            var request_body = OAuth.formEncode(message.parameters);

            OAuth.completeRequest(message, accessor);

            function receiveRequestToken(xhr) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 201) {
                        new Etc.PinNotification('Success: ' + ({'0': 'reblog', 'on.2': 'publish_on'}[state] || state || 'reblog') + ' to ' + hostname);
                    }
                    else {
                        var json = JSON.parse(xhr.responseText);
                        new Etc.PinNotification('Fails: ' + ({'0': 'reblog', 'on.2': 'publish_on'}[state] || state || 'reblog') + ' to ' + hostname + '\n' + json.meta.msg);
                        alert(json.response.errors[0]);
                    }
                    reblog_button.className = reblog_button.className.replace(/\bloading\b/, 'reblogged');
                }
            };
            var realm = "";
            var headers = {
                'Authorization':  OAuth.getAuthorizationHeader(realm, message.parameters),
                'Content-Type': "application/x-www-form-urlencoded"
            };

            Tornado.funcs.shutterEffect(post);
            reblog_button.className += ' loading';
        
            GM_xmlhttpRequest({
                url: message.action,
                method: message.method,
                headers: headers,
                data: request_body,
                onload: receiveRequestToken,
            });

            new Etc.PinNotification('Reblog ...');
        },
        channelDialog: function channelDialog(post, postdata) {
            if (Vals.oauth_operator.enabledLength()) {
                var state_text = Vals.state_texts[postdata["post[state]"]] || '';
                var title = ['Reblog', (state_text) ? ('as ' + state_text) : ('') , 'to [channel]'].join(' ');

                var dialog = new LiteDialog(title);
                dialog.dialog.className += ' channel_dialog';

                var dialog_body = dialog.dialog.querySelector('.lite_dialog_body');

                Vals.oauth_operator.enabled_tumblelogs.map(function(tumblelog_info, num) {
                        var button = Etc.buildElement('input', {
                            type: 'button',
                            class: 'button' + (num + 1),
                            name: 'button' + (num + 1),
                            value: '[' + (num + 1) + ']: ' + tumblelog_info.tumblelog_title + ' - ' + tumblelog_info.base_account
                        });

                        button.addEventListener('click', function(e) {
                            var num;
                            num = parseInt(e.target.name.match(/button(\d+)/)[1]) - 1;

                            Tornado.funcs.apiReblog(post, Vals.oauth_operator.enabled_tumblelogs[num], {state: state_text});
                            dialog.close();
                        });
                        dialog_body.appendChild(button);
                });
                dialog.dialog.style.top = (Etc.elementOffsetTop(post) + 37) + 'px';
                dialog.dialog.style.left = (Etc.elementOffsetLeft(post) + 20) + 'px';
    
                dialog_body.querySelector('input[type="button"]').focus();
            }
            else {
                var state_text = Tornado.vals.state_texts[postdata["post[state]"]] || '';
                var title = ['Reblog', (state_text) ? ('as ' + state_text) : ('') , 'to [channel]'].join(' ');
    
                var dialog = new LiteDialog(title);
                dialog.dialog.className += ' channel_dialog';
    
                var dialog_body = dialog.dialog.querySelector('.lite_dialog_body');

                Tornado.tumblelogs.map(function(obj, i) {
                    var channel_id = obj.name;
                    var button = Etc.buildElement('input', {
                            type: 'button',
                            class: 'button' + (i + 1),
                            name: channel_id,
                            value: ['[', i + 1, ']: ', obj.title].join('')});
                    button.addEventListener('click', function(e) {
                        postdata['channel_id'] = this.name;
                        Tornado.funcs.reblog(post, postdata);
                        dialog.close();
                    });
                    dialog_body.appendChild(button);
                });
        
                dialog.dialog.style.top = (post.offsetTop + 37) + 'px';
                dialog.dialog.style.left = (post.offsetLeft + 20) + 'px';
    
                dialog_body.querySelector('input[type="button"]').focus();
            }
        },
        /**
         * delete, publish, queue フォームを Ajax を用いて実行します
         * @param {Node} form delete, publish, queue フォーム要素
         * @param {Function} onSuccess 成功時に呼び出される関数
         * @param {Function} onFailure 失敗時に呼び出される関数
         * TODO: 必要かどうか見当
         */
        submitPublish: function(form, onSuccess, onFailure) {
            new Ajax(form.action, {
                method: form.method,
                requestHeaders: HeaderContentType,
                parameters: Etc.buildQueryString(Etc.gatherFormValues(form)),
                onSuccess: onSuccess,
                onFailure: onFailure});
        },
        submitSVC: function submitSVC(url, default_ajax_options) {
            var parameters = default_ajax_options.parameters || {};
            Etc.dictUpdate(default_ajax_options, {
                post_id: post.getAttribute('data-post-id'),
                channel_id: post.getAttribute('data-tumblelog-name'),
                form_key: document.body.getAttribute('data-form-key'),
            });

            new Ajax(url, default_ajax_options);
        },
        shutterEffect: function shutterEffect(post) {
            post.classList.remove('shutter_base');
            post.classList.remove('shuttering');

            post.classList.add('shutter_base');
            post.offsetHeight;
            post.classList.add('shuttering');
         },
         i18n: function i18n(message) {
            if (typeof message == 'string') {
                return message;
            }

            return message[Tornado.lang] ||
                   message['en'] ||
                   message['ja'] ||
                   message;
        },
    };

    var CustomFuncs = Tornado.customfuncs = {
        reblog: function reblog(post, e, options) {
            var params = {};

            if (Vals.oauth_operator.enabledLength()) {
                Etc.dictUpdate(params, {
                    state: options.default_values['post[state]']
                });
                if (params.state == 'on.2') {
                    Etc.dictUpdate(params, {
                        publish_on: options.default_values['post[publish_on]']
                    });
                }
                Tornado.funcs.apiReblog(post, Vals.oauth_operator.enabled_tumblelogs[0], params);
            }
            else {
                Etc.dictUpdate(params, options.default_values);
                Etc.dictUpdate(params, {
                    channel_id: Tornado.tumblelogs[0].name
                });

                Tornado.funcs.reblog(post, params);
            }
        },
        reblogToChannel: function reblogToChannel(post, e, options) {
            Tornado.funcs.channelDialog(post, options.default_values);
        },
        directReblogToChannel: function directReblogToChannel(post, e) {
            var channel_num = parseInt(String.fromCharCode(e.keyCode)) - 1;
            if (Vals.oauth_operator.enabledLength()) {
                if (Vals.oauth_operator.enabled_tumblelogs[channel_num] != undefined) {
                    Tornado.funcs.apiReblog(post, Vals.oauth_operator.enabled_tumblelogs[channel_num], {state: Vals.state_texts['0']});
                }
                else {
                    new PinNotification('Not found such a numbe of tumblelog: ' + (channel_num + 1));
                }
            }
            else {
                Tornado.funcs.reblog(post, {'post[state]': '0', 'channel_id': Tornado.tumblelogs[channel_num].name});
            }
        },
        publishOn: function publishOn(post, e, options) {
            function buildTime(epoch) {
                var d = (epoch ? new Date(epoch * 1000) : new Date());
                return [d.getFullYear(), d.getMonth()+1, d.getDate()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':');
            }
            var cur_date = buildTime(),
                date,
                prompt_time;

            prompt_time = (Tornado.vals.last_publish_on_time ? Tornado.vals.last_publish_on_time : cur_date);
            date = prompt('Input time to publish on?', prompt_time);

            if (prompt_time != date) {
                Tornado.vals.last_publish_on_time = date;
            }

            if (date === null) {
                new Etc.PinNotification('Cancel Publish on');
                return;
            }

            options.default_values['post[publish_on]'] = date;
            
            CustomFuncs.reblog(post, e, options);
        },
        publishLittleByLittle: function publishLittleByLittle(post, e, options) {
            function buildTime(epoch) {
                var d = (epoch ? new Date(epoch * 1000) : new Date());
                return [d.getFullYear(), d.getMonth()+1, d.getDate()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':');
            }
            function sliceUp(num, mod) {
                return num - (num % mod) + mod;
            }

            var t = localStorage.getItem('tornado_lbl_time');
            var next_t = 0;
            var date;

            if (isNaN(parseInt(t)) ||
                t < (new Date() / 1000)) {
                t = parseInt(new Date() / 1000);
            }

            next_t = sliceUp(t, 10 * 60);
            localStorage.setItem('tornado_lbl_time', next_t);

            date = buildTime(next_t);
            
            options.default_values['post[publish_on]'] = date;

            CustomFuncs.reblog(post, e, options);
        },
        halfdown: function halfdown() {
            var view_height = window.innerHeight;
            window.scrollBy(0, +view_height / 2);
        },
        halfup: function halfup() {
            var view_height = window.innerHeight;
            window.scrollBy(0, -view_height / 2);
        },
        goTop: function goTop(post) {
            Tornado.vals.prev_cursor = post;
            window.scroll(0, 0);
        },
        goBottom: function goBottom(post) {
            Tornado.vals.prev_cursor = post;
            // window.scroll(0, document.height || document.body.clientHeight);
            window.scroll(0, document.height || document.documentElement.scrollHeight);
        },
        jumpToLastCursor: function jumpToLastCursor() {
            var y = Tornado.vals.prev_cursor.offsetTop;
            Tornado.vals.prev_cursor = null;
            window.scroll(0, y - 7);
        },
        fast_reblog: function fastReblog(post) {
            var reblog_button = post.querySelector('a.reblog');
            var reblog_key = post.getAttribute('data-reblog-key'),
                reblog_id = post.getAttribute('data-post-id'),
                form_key = document.body.getAttribute('data-form-key');
    
            Tornado.funcs.shutterEffect(post);
            reblog_button.className += ' loading';
            new Ajax('/fast_reblog', {
                method: 'POST',
                parameters: Etc.buildQueryString({reblog_key: reblog_key, reblog_post_id: reblog_id, form_key: form_key}),
                onSuccess: function(_xhr) {
                    reblog_button.className = reblog_button.className.replace(/\bloading\b/, 'reblogged');
                    new Etc.PinNotification('Success: fast Reblogged');
                },
                onFailure: function(_xhr) {
                    alert('Error: ' + _xhr.responseText);
                    reblog_button.className = reblog_button.className.replace('loading', '')
                },
            });
        },
        notes: function notes(post) {
            var notes_link = post.querySelector('.reblog_count');
            notes_link.dispatchEvent(Tornado.left_click);
        },
        endlessSummer: function() {
            var name = 'endless_summer';
            var value = Etc.ShareValue.toggle(name, true);

            new Etc.PinNotification('Endless summer was turned ' + ({'true': 'On', 'false': 'Off'}[value]));
        },
        scaleImage: function scaleImage(post) {
            var type = post.getAttribute('data-type');

            if (type == "photo" || type == 'photoset') {
                (function letit(elm){
                    // from Tumblr.like_post http://assets.tumblr.com/javascript/jquery.application_src.js
                    // This is excellent code to fix redrew bug of chrome.
                    post.className += " force_redraw";
                    post.offsetHeight;
                    post.className = post.className.replace(/\b force_redraw\b/, '');

                    elm.dispatchEvent(Tornado.left_click);
                })(post.querySelector('img.image_thumbnail') ||
                   document.querySelector('#tumblr_lightbox') ||
                   post.querySelector('a.photoset_photo img'));
            }   
            else if (type == 'video') {
                Etc.toggleVideoEmbed(post);
            }   
            else if (type == 'quote') {
                if (post.classList.contains('quote_aa')) {
                    post.classList.remove('quote_aa');
                }
                else {
                    post.classList.add('quote_aa');
                }
            }
        },
        cleanPosts: function cleanPosts(/* post */) {
            var vr = Etc.viewportRect(),
                i = 0;
    
            $$('#posts > li:not(.new_post)').filter(function(post) {
                return (post.offsetTop - 7) < vr.top;
            }).map(function(src_post) {
                var post = document.createElement('li');
                post.className = ['empty_post', src_post.className.match(/\bsame_user_as_last\b/)].join(' ');
                post.style.cssText = [
                    'width:', src_post.offsetWidth, 'px;',
                    'height:', src_post.offsetHeight, 'px;'].join('');
                src_post.parentNode.replaceChild(post, src_post);
                i++;
            });
    
            new Etc.PinNotification(i + '件のポストを空にしました。');
        },
        removePosts: function removePosts(/* posts */) {
            var dsbd = document.querySelector('#posts'),
                vr = Etc.viewportRect(),
                del_count = 0;
    
            $$('#posts > li:not(.new_post_buttons_container)').filter(function(post) {
                return (post.offsetTop - 7) < vr.top;
            }).map(function(post) {
                del_count++;
                dsbd.removeChild(post);
            });
    
            var firstpost = document.querySelector('#posts > li:not(.new_post_buttons_container)');
            firstpost.className = firstpost.className.replace('same_user_as_last', '');
    
            window.scrollTo(0, document.querySelector('#posts>li.post_container:not(.new_post_buttons_container)').offsetTop - 7);
    
            new Etc.PinNotification(del_count + '件のポストを削除しました。');
        },
        removeBottomPosts: function removeBottomPosts(/* post */) {
            var dsbd = document.querySelector('#posts'),
                vr = Etc.viewportRect(),
                del_count = 0;
    
            Etc.execScript('next_page = null; loading_next_page = true;');
            document.body.style.marginBottom = '500px';
    
            $$('#posts > li:not(.new_post)').filter(function(post) {
                return (post.offsetTop - 7) > vr.top;
            }).map(function(post) {
                del_count++;
                dsbd.removeChild(post);
            });
    
            new Etc.PinNotification('現在より下のポストを' + del_count + '件のポストを削除しました。');
        },
        viewPostPageInBackground: function viewPostPageInBackground(post) {
            var permalink;
            if (permalink = post.querySelector('.post_permalink')) {
                window.open(permalink.href);
                window.focus();
            }
        },
        /**
         * @fixme "reblogged you:" の際には上手く動きません
         * @fixme private ポストでの取得には対応していません
         */
        rootInfo: function rootInfo(post) {
            if (Tornado.gm_api === false) {
                return;
            }

            var post_id = post.id.match(/\d+/)[0];
            var post_source = post.querySelector('.post_source');
            if (post_source == null) {
                post_source = document.createElement('div');
                post_source.className = 'post_source';
                post.querySelector('.post_header').appendChild(post_source);
            }
            if (post_source.querySelector('.root_info')) {
                return;
            }
    
            var root_info = document.createElement('span');
            root_info.className = 'root_info post_source_link';
            root_info.innerHTML = 'Root: <a href="">...</a>';
            post_source.insertBefore(document.createElement('br'), post_source.lastChild);
            post_source.insertBefore(root_info, post_source.lastChild);
            var root_link = root_info.querySelector('a');
    
            var script = document.createElement('script');
            script.id = 'showroot_' + post_id;
    
            var permalink = post.querySelector('a.post_permalink').href;
            var blog_name = permalink.match(/[^\/]*(?=\/(?:post|private))/)[0];
            var qs = Etc.buildQueryString({id: post_id , /* jsonp: 'jsonpRootInfo', */ reblog_info: 'true', api_key: Tornado.vals.CONSUMER_KEY});
            var url = [
                'http://api.tumblr.com/v2/blog',
                blog_name,
                'posts?' + qs].join('/');

            GM_xmlhttpRequest({
                url: url,
                method: 'GET',
                onload: function (xhr) {
                    var json = JSON.parse(xhr.response);

                    var post_info = json.response.posts[0];
                    var root_name = post_info.reblogged_root_name;
                    var root_url = post_info.reblogged_root_url;

                    var text_root_link = (root_name ? (['<a href="', root_url, '">', root_name, '</a>'].join('')) : 'missing');

                    root_link.setAttribute('href', root_url);
                    root_link.innerHTML = text_root_link;
                }
            });
            return;
            var a = new Ajax(url, {
                onSuccess: function (xhr) {
                    var json = JSON.parse(xhr.response);

                    var post_info = json.response.posts[0];
                    var root_name = post_info.reblogged_root_name;
                    var root_url = post_info.reblogged_root_url;
                    var text_root_link = (root_name ? (['<a href="', root_url, '">', root_name, '</a>'].join('')) : 'missing');
        
                    var root_info = post.querySelector('.root_info');
                    root_info.innerHTML = ' [' + text_root_link + ']';
                },
            });
        },
        topReload: function topReload() {
            var reg_top_path = /^https?:\/\/www.tumblr.com\/(?:dashboard|likes|(?:blog\/[^\/]+(?:\/(?:drafts|queue|activity))?)|(?:tagged\/[^?]+)|(?:show\/[^\/]+))/;
            var url = location.href.match(reg_top_path)[0];
            location.assign(url);
        },
        forceDelete: function forceDelete(post) {
            Tornado.funcs.shutterEffect(post);

            new Ajax(
                location.protocol + '//www.tumblr.com/svc/post/delete',
                {
                    method: 'POST',
                    parameters: JSON.stringify({
                        post_id: post.getAttribute('data-post-id'),
                        channel_id: post.getAttribute('data-tumblelog-name'),
                        form_key: document.body.getAttribute('data-form-key'),
                    }),
                    onSuccess: function(_xhr) {
                        new Etc.PinNotification('Success to delete post: ' + post.getAttribute('data-post-id'));
                    },
                    onFailure: function(_xhr) {
                        alert('Fail to delte post: ' + post.getAttribute('data-post-id'));
                    },
                }
            );
        },
        delete: function _delete(post) {
            Tornado.funcs.shutterEffect(post);

            if (!confirm('Delete this post?')) {
                return;
            }
            CustomFuncs.forceDelete(post);
        },
        publish: function publish(post) {
            Tornado.funcs.shutterEffect(post);
            new Etc.PinNotification('Publishing...');

            new Ajax(
                location.protocol + '//www.tumblr.com/publish',
                {
                    method: 'POST',
                    parameters: {
                        id: post.getAttribute('data-post-id'),
                        form_key: document.body.getAttribute('data-form-key'),
                    },
                    onSuccess: function(_xhr) {
                        new Etc.PinNotification('Success to publish post: ' + post.getAttribute('data-post-id'));
                    },
                    onFailure: function(_xhr) {
                        alert('Fail to publish post: ' + post.getAttribute('data-post-id'));
                    },
                }
            );
        },
        enqueue: function enqueue(post) {
            Tornado.funcs.shutterEffect(post);
            new Etc.PinNotification('Enqueueing...');

            new Ajax(
                location.protocol + '//www.tumblr.com/publish',
                {
                    method: 'POST',
                    parameters: {
                        id: post.getAttribute('data-post-id'),
                        form_key: document.body.getAttribute('data-form-key'),
                        queue: 'queue',
                    },
                    onSuccess: function(_xhr) {
                        new Etc.PinNotification('Success to enqueue post: ' + post.getAttribute('data-post-id'));
                    },
                    onFailure: function(_xhr) {
                        alert('Fail to enqueue post: ' + post.getAttribute('data-post-id'));
                    },
                }
            );
        },
        default: function _default() {
            return true;  /* threw up event */
        },
    };
    
    Tornado.shortcuts = [];

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['j'],
                // func: CustomFuncs.default, 
                func: function(post, e, options) {
                    var next_post = post;
                    while (next_post = next_post.nextSibling) {
                        if (next_post.nodeType === 1 && next_post.tagName === 'LI' && /\bpost\b/.test(next_post.className)) {
                            break;
                        }
                    }
                },
                title: 'Next',
                desc: {
                    ja: '次ポストへ移動',
                    en: 'Go to the next post'
                },
                group: 1,
                grouporder: 1,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['s-j'],
                func: CustomFuncs.halfdown,
                title: '下へ半スクロール',
                usehelp: 'hide',
                desc: {
                    ja: '下へ半スクロールします',
                    en: 'Half scroll down'
                },
                group: 5
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['k'],
                func: CustomFuncs.default,
                title: 'Prev',
                desc: {
                    ja: '前ポストへ移動',
                    en: 'Go the the previous post'
                },
                group: 1,
                grouporder: 2,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['s-k'],
                func: CustomFuncs.halfup,
                title: '上へ半スクロール',
                usehelp: 'hide',
                desc: {
                    ja: '上へ半スクロールします',
                    en: 'Half scroll up'
                },
                group: 5
        }),

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['l'],
                func: function like(post) {
                    var id = post.getAttribute('data-post-id');

                    Etc.execScript("Tumblr.Posts.get('" + (id) + "').toggleLike()");

                    return;

                    /* 以下今後のコード変更に耐えられるように残しておきます */
                    var like_button = post.querySelector('.like.post_control');
                    if (like_button.className.match(/\bliked\b/)) {
                        Etc.execScript("Tumblr.Posts.get('" + (id) + "').trigger('unlike:success')");
                    }
                    else {
                        Etc.execScript("Tumblr.Posts.get('" + (id) + "').trigger('like:success')");
                    }
                    post.querySelector('.like.post_control').dispatchEvent(Vals.left_click);
                },
                title: 'Like',
                desc: {
                    ja: 'Like します',
                    en: 'Like this post'
                },
                group: 1,
                grouporder: 3,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['g', 'g'],
                func: CustomFuncs.goTop,
                title: '一番上へ',
                usehelp: 'hide',
                desc: {
                    ja: '一番上へスクロールします',
                    en: 'Go Top',
                },
                group: 5,
                grouporder: 1,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['s-g'],
                func: CustomFuncs.goBottom, 
                title: '一番下へ',
                usehelp: 'hide',
                desc: {
                    ja: '一番下へスクロールします',
                    en: 'Go Bottom',
                },
                group: 5,
                grouporder: 2,
        });
        /*
        new Etc.CustomKey({
                key_bind: ['s-o'],
                func: CustomFuncs.jumpToLastCursor,
                title: '最後のカーソルへ飛ぶ',
                desc: {
                    ja: 'gg や G で移動した際に最後のカーソル位置へ戻ります',
                    en: 'Go back Last Cursor(when gg, G)'
                },
                usehelp: false,
                group: 5,
                grouporder: 3,
        }),
        */

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                title: 'Reblog',
                key_bind: ['t'],
                func: CustomFuncs.reblog,
                options: {
                    default_values: {
                        'post[state]': '0'
                    },
                },
                desc: {
                    ja: '通常のリブログを行います',
                    en: 'Reblog'
                },
                group: 2,
                grouporder: 1,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['h'],
                func: CustomFuncs.fast_reblog,
                title: 'fast Reblog',
                desc: {
                    ja: '高速リブログを行います',
                    en: 'Fast Reblog',
                },
                group: 2,
                grouporder: 2,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                title: 'Draft',
                key_bind: ['d'],
                func: CustomFuncs.reblog,
                options: {
                    default_values: {
                        'post[state]': '1'
                    }
                },
                desc: {
                    ja: '下書きへ送ります',
                    en: 'Save as draft'
                },
                group: 2,
                grouporder: 3,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['q'],
                func: CustomFuncs.reblog,
                title: 'Queue',
                options: {
                    default_values: {
                        'post[state]': '2'
                    }
                },
                desc: {
                    ja: 'キューへ送ります',
                    en: 'Add to queue'
                },
                group: 2,
                grouporder: 5,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['p'],
                func: CustomFuncs.reblog,
                title: 'Private',
                options: {
                    default_values: {
                        'post[state]': 'private'
                    }
                },
                desc: {
                    ja: 'プライベートなリブログを行います',
                    en: 'Private reblog'
                },
                group: 2,
                grouporder: 5,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['o'],
                func: CustomFuncs.publishOn,
                title: 'Publish on',
                options: {
                    default_values: {
                        'post[state]': 'on.2'
                    },
                },
                // func: function() {console.log('Publish on');}, // CustomFuncs.publishon,
                help: 'hide',
                desc: 'Publish on ... a post'
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['s-o'],
                title: 'Publishing Little by Little',
                func: CustomFuncs.publishLittleByLittle,
                // func: function () {console.log('not defined');}, // CustomFuncs.publishingLbL,
                options: {
                    default_values: {
                        'post[state]': 'on.2'
                    },
                },
                help: 'hide',
                desc: '少しずつ公開されるように Queue へ追加します',
        });


        /* FIXME */
    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: [/[1-9]/],
                func: CustomFuncs.directReblogToChannel,
                title: 'channel Reblog',
                desc: 'channel へすぐにリブログします',
                usehelp: 'hide',
                group: 3,
                grouporder: 5,
        });


    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['g', 't'],
                func: CustomFuncs.reblogToChannel,
                title: 'channel Reblog',
                options: {
                    default_values: {
                        'post[state]': '0',
                    },
                },
                desc: {
                    ja: 'channel へリブログ',
                    en: 'Reblog to channel',
                },
                group: 3,
                grouporder: 1,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['g', 'd'],
                func: CustomFuncs.reblogToChannel,
                title: 'channel Draft',
                options: {
                    default_values: {
                        'post[state]': '1',
                    },
                },
                desc: {
                    ja: 'channel へ下書き',
                    en: 'Save to channel as draft'
                },
                group: 3,
                grouporder: 2,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['g', 'q'],
                func: CustomFuncs.reblogToChannel,
                title: 'channel Queue',
                options: {
                    default_values: {
                        'post[state]': '2',
                    },
                },
                desc: {
                    ja: 'channel のキューへ送る',
                    en: 'Add to channel to queue'
                },
                group: 3,
                grouporder: 3,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['g', 'p'],
                func: CustomFuncs.reblogToChannel,
                title: 'channel Private',
                options: {
                    default_values: {
                        'post[state]': 'private',
                    },
                },
                desc: {
                    ja: 'channel の private でリブログ',
                    en: 'Private reblog'
                },
                group: 3,
                grouporder: 4,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['i'],
                func: CustomFuncs.scaleImage,
                title: 'photo, video 開閉',
                desc: {
                    ja: '画像や動画ポストを拡縮、開閉します',
                    en: 'Scale image or Open video'
                },
                group: 0
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['m'],
                func: CustomFuncs.rootInfo,
                title: 'Root 投稿者情報',
                desc: {
                    ja: 'Root 投稿者情報を取得します',
                    en: 'Get root post user',
                },
                usehelp: 'hide',
                group: 0
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['v'],
                func: CustomFuncs.viewPostPageInBackground,
                title: 'ポストを開く',
                desc: {
                    ja: '現在のポストを新タブで開きます',
                    en: 'Open new tab this post'
                },
                usehelp: 'hide',
                group: 5
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['c'],
                func: CustomFuncs.cleanPosts,
                title: '上ポストを空白',
                usehelp: 'hide',
                desc: {
                    ja: '現在より上のポストを空の状態にします',
                    en: 'Clean above post'
                },
                group: 6,
                grouporder: 1,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['s-c'],
                func: CustomFuncs.removePosts,
                title: '上ポストを削除',
                usehelp: 'hide',
                desc: {
                    ja: '現在より上のポストを画面から削除します',
                    en: 'Remove above post'
                },
                group: 6,
                grouporder: 2,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['g', 's-c'],
                func: CustomFuncs.removeBottomPosts,
                title: '下ポストを削除',
                usehelp: 'hide',
                desc: {
                    ja: '現在より下のポストを画面から削除します',
                    en: 'Remove following post'
                },
                group: 6,
                grouporder: 3,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['n'],
                func: CustomFuncs.default,
                title: 'Notes',
                usehelp: 'hide',
                desc: {
                    ja: 'Notes を開閉',
                    en: 'Open Notes'
                },
                group: 1,
                grouporder: 4,
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['s-r'],
                func: CustomFuncs.topReload,
                usehelp: 'hide',
                group: 0
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['s-s'],
                func: CustomFuncs.endlessSummer,
                title: 'Endless Summer',
                desc: {
                    ja: 'ダッシュボードの下降をランダムにします',
                },
                group: 0
        });

        /* FIXME */
    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['d'],
                func: CustomFuncs.delete,
                title: '自ポストを削除',
                desc: {
                    ja: 'Post が自分のものならばポストを削除します',
                    en: 'Delete my post'
                },
                has_selector: '.post_control.delete',
                usehelp: 'hide',
                group: 4
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['s-d'],
                func: CustomFuncs.forceDelete,
                title: '自ポストを強制削除',
                desc: {
                    ja: '確認ボックスを表示することなくポストを削除します',
                    en: 'Force delete my post',
                },
                has_selector: '.post_control.delete',
                usehelp: 'hide',
                group: 4
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['p'],
                func: CustomFuncs.publish,
                title: '自ポストを公開',
                desc: {
                    ja: 'Drafts か Queue のポストを公開します',
                    en: 'Publish my post drafted or queued'
                },
                has_selector: '.post_control.publish',
                usehelp: 'hide',
                group: 4
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['q'],
                func: CustomFuncs.enqueue,
                title: '下書きをキューに',
                desc: {
                    ja: 'Drafts を Queue へ納めます',
                    en: 'Enqueue my draft',
                },
                has_selector: '.post_control.queue',
                usehelp: 'hide',
                group: 4
        });

    Tornado.shortcuts[Tornado.shortcuts.length] = 
        new Etc.CustomKey({
                key_bind: ['s-l'],
                func: function() {
                    location.assign('/logout');
                },
                title: 'ログアウトします',
        });
    
    Tornado._shortcuts = Tornado.shortcuts.slice();  /* copy */
    Tornado._shortcuts.sort(function(a, b){
        return (a.group || 10) - (b.group || 10) ||
               (a.grouporder) - (b.grouporder);
    });

    Tornado.shortcuts.sort(function(a, b) {
        function nullToLength(str) {
            if (str === null) {
                return 0;
            }
            return str.length;
        }
        return ((b.key_bind.length - a.key_bind.length) ||
                (nullToLength(b.has_selector) - nullToLength(a.has_selector)) ||
                ((b.url || '').length - ((a.url || '').length)));
    });

    /**
     * クライアントページの情報を元に tumblelog の設定を回収します
     */
    Tornado.initTumblelogConfigs = function() {
        if ($$('#base_template').length == 0) {
            return;
        }

        var base_template = Etc.buildElementBySource($$('#base_template')[0].innerHTML);
        var config_elms = base_template.querySelectorAll('#tumblelog_choices .popover_post_options .option');

        Tornado.tumblelog_configs = {};

        Array.prototype.slice.call(config_elms).map(function(elm) {
            var i;
            var attrs = elm.attributes;
            var name = elm.getAttribute('data-option-value');

            Tornado.tumblelog_configs[name] = {};

            for (i = 0; i < attrs.length; ++i) {
                Tornado.tumblelog_configs[name][attrs[i].name] = attrs[i].value;
            }
        });
    };

    /*---------------------------------
     * Variable (2nd)
     *-------------------------------*/

    /**
     * クライアントページ領域に関数を定義させます
     */
    Tornado.clientfuncs = [
        /**
         * RootInfo用のAPIのデータを受け取り実際に埋め込む関数です
         * @param {Object} json Tumblr API が返す JSON オブジェクト
         */
        /* 
        // 役目を終えました
        function jsonpRootInfo(json) {
            var post = json.response.posts[0];
            var root_name = post.reblogged_root_name;
            var root_url = post.reblogged_root_url;
            var text_root_link = (root_name ? (['<a href="', root_url, '">', root_name, '</a>'].join('')) : 'missing');
        
            var node_post = document.querySelector('#post_' + post.id);
            var root_info = node_post.querySelector('.root_info');
            root_info.innerHTML = ' [' + text_root_link + ']';
        
            // var script = document.querySelector('#showroot_' + post.id);
            // script.parentNode.removeChild(script);
        },
        */
        /**
         * 次ページパスを訂正すべき場合は正常な次ページパスを返します
         * @return 次ページ path か null
         */
        function next_pageCorrection() {
            var m, type, pagenum;
            if (m = location.href.match(/show\/(photos|text|quotes|links|chats|audio|videos)\/?(\d+)?/)) {
                type = m[1];
                pagenum = (m[2] == undefined) ? 2 : parseInt(m[2]) + 1;
                next_page = '/show/' + type + '/' + pagenum;
            }
        },
        /**
         * pjax ライクにページの読み込みとロケーションバーを連動させます
         */
        function dsbdPjax() {
            next_pageCorrection();
            history.pushState('', '', next_page);
        },
        /**
         * Dashboard をランダムに降下する為の機能です
         */
        function endlessSummer() {
            var oldest_id = 264102; // http://ku.tumblr.com/post/264102
            var name = 'endless_summer';

            if (!/^\/dashboard/.test(location.pathname)) {
                return;
            }
            else if (ShareValue.get(name, false) === "false") {
                return;
            }

            var path = next_page.match(/\/dashboard(\/(\d+)\/(\d+))?/);
            var page, last_id;
            var page = (path[2] ? parseInt(path[2]) : 1),
                last_id = path[3];

            var next_id = parseInt(Math.random() * window.endless_summer_first_post_id + oldest_id);
            next_page = '/dashboard/' + (page + 1) + '/' + next_id;
            document.querySelector('#next_page_link').setAttribute('href', next_page);
        },
        function endlessSummer_Likes() {
            var likes_count,
                next_page_id;
            var name = 'endless_summer';

            if (!/^\/likes/.test(location.pathname)) {
                return;
            }
            else if (ShareValue.get(name, false) === "false") {
                return;
            }

            likes_count = +document.querySelector('.likes div').getAttribute('data-count');
            next_page_id = parseInt(Math.random() * (likes_count/10)) + 1;

            next_page = '/likes/page/' + next_page_id;
            document.querySelector('#next_page_link').setAttribute('href', next_page);
        },
        function endlessSummer_LikedBy() {
            var tumblelog_name;
            var likes_count,
                next_page_id;
            var name = 'endless_summer';

            if (!/^\/liked\/by\//.test(location.pathname)) {
                return
            }
            else if (ShareValue.get(name, false) === "false") {
                return;
            }

            tumblelog_name = location.pathname.match(/^\/liked\/by\/([^\/]+)/)[1];
            likes_count = +document.querySelector('.dashboard_header').textContent.match(/[\d,.]+/)[0].replace(/[,.]/g, '');
            next_page_id = parseInt(Math.random() * (likes_count/10)) + 1;

            next_page = '/liked/by/' + tumblelog_name + '/page/' + next_page_id;
            document.querySelector('#next_page_link').setAttribute('href', next_page);
        },
        /**
         * Page Link を挿入します
         */
        function prependPageLink(){
            var li = document.createElement('li'),
                page_info = document.createElement('div');
            li.className = 'pagelink';
            li.appendChild(page_info);
            page_info.innerHTML = ['page:<a href="', next_page ,'">', next_page.replace(/https?:\/\/www\.tumblr\.com/,'') ,'</a>'].join('');
            posts.appendChild(li)
        },
        /**
         * Url Container を常に表示し続けます
         */
        function UrlContainerAlways() { 
            (new MutationObserver(function(mutations) {
                if (mutations[0].addedNodes && document.querySelector('#post_form').getAttribute('data-post-type') == 'photo') {
                    var url_container_observer = new MutationObserver(function(mutations) {
                        if (mutations[0].target.style.display == 'none') {
                            mutations[0].target.style.display = 'block';
                        }
                    });
                    var config = { attributes: true, attributeFilter: ['style']};
                    url_container_observer.observe(document.querySelector('.url_container'), config);
                }
            })).observe(document.querySelector('.new_post_buttons'), {childList: true});
        },
        Etc.buildElement,
    ];

    /**
     * クライアントページ領域で実行させます
     * 文字列は文字列の成すように、関数は関数を実行します。
     */
    Tornado.clientlaunches = [
        'BeforeAutoPaginationQueue.push(dsbdPjax);',
        'BeforeAutoPaginationQueue.push(prependPageLink);',
        'BeforeAutoPaginationQueue.push(endlessSummer);',
        'BeforeAutoPaginationQueue.push(endlessSummer_Likes);',
        'BeforeAutoPaginationQueue.push(endlessSummer_LikedBy);',
        'if (/^\\/blog\\/[^\\/]+\\/queue/.test(location.pathname)) {' +
            'Tumblr.enable_dashboard_key_commands = true;' +
            'Tumblr.KeyCommands = new Tumblr.KeyCommandsConstructor();' + 
        '}',
        '(window.Tumblr) && (Tumblr.KeyCommands) && (Tumblr.KeyCommands.scroll_speed=20);',
        'window.ison_endless_summer = false;',
        'window.endless_summer_first_post_id = parseInt(document.querySelector("#posts>.post_container>.post[data-post-id],#search_posts>.post_container>.post").getAttribute("data-post-id"));',
        'ShareValue = ' + Etc.serialize(Etc.ShareValue) + ';',
        "setTimeout(function(){Tumblr.Events.unbind('post:like');}, 50);",
        'UrlContainerAlways();',
    ];


    /**
     * tornado の oauth 設定
     */
    Tornado.windows.tornado_config = function tornado_config(e) {
        var config_dialog = new LiteDialog('Tumblr Tornado Config');
        var dialog_body = config_dialog.dialog.querySelector('.lite_dialog_body');

        if (typeof OAuth == 'undefined') {
            dialog_body.innerHTML = 
                 '<p>この環境ではこの機能に対応していません。</p>'
               + '<p>Chrome では <a href="https://chrome.google.com/webstore/detail/ninjakit/gpbepnljaakggeobkclonlkhbdgccfek">NinjaKit</a> か'
               + ' <a href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo">Tampermonkey</a> を、'
               + ' Firefox では <a href="https://addons.mozilla.org/firefox/addon/greasemonkey/">Greasemonkey</a> の使用を推奨します。</p>';
            config_dialog.centering();
            return;
        }

        var request_button = dialog_body.appendChild(Etc.buildElement('button', {}, Tornado.funcs.i18n({ja: 'OAuth 認証します', en: 'Authorize OAuth'})));
        request_button.addEventListener('click', function() {
            Vals.oauth_operator
              .getRequestToken()
              .done(function(request_accessor) {
                console.log(request_accessor);
                GM_setValue('oauth_token_secret', request_accessor.oauth_token_secret);

                location.href = 'http://www.tumblr.com/oauth/authorize?oauth_token=' + request_accessor.oauth_token;
              });
            /*
            var request_accessor = Vals.oauth_operator.getRequestToken();
            GM_setValue('oauth_token_secret', request_accessor.oauth_token_secret);

            location.href = 'http://www.tumblr.com/oauth/authorize?oauth_token=' + request_accessor.oauth_token;
            */
        });

        var reset_button = dialog_body.appendChild(Etc.buildElement('button', {}, Tornado.funcs.i18n({ja: 'OAuth 情報を消去します', en: 'Clear OAuth information'})));
        reset_button.addEventListener('click', function() {
            Vals.oauth_operator.tumblelog_infos = [];
            Vals.oauth_operator.exclude_tumblelogs = [];
            Vals.oauth_operator.save();
            Vals.oauth_operator.reload();

            $$('.oauth_config li').map(function(elm) {
                elm.parentNode.removeChild(elm);
            });
        });

        Tornado.oauthconfigs = JSON.parse(GM_getValue('oauthconfigs', '[]'));
        Tornado.exclude_tumblelogs = JSON.parse(GM_getValue('exclude_tumblelogs', '{}'));

        var config_list = dialog_body.appendChild(Etc.buildElement('table', {class: 'oauth_config'}));

        Vals.oauth_operator.tumblelog_infos.map(function(tumblelog_info, i) {
            var tr = config_list.appendChild(Etc.buildElement('tr'));

            var td_check_exclude = tr.appendChild(Etc.buildElement('td'));
            var label = tr.appendChild(Etc.buildElement('label'));
            var check_exclude = label.appendChild(Etc.buildElement('input', {type: 'checkbox'}));

            label.appendChild(Etc.buildElement('span', {}, [tumblelog_info.base_account, tumblelog_info.tumblelog_title].join(' / ')));

            var group_button = tr.appendChild(Etc.buildElement('td'));
            var button_above = group_button.appendChild(Etc.buildElement('button', {class: 'above'}, '↑'));
            var button_down = group_button.appendChild(Etc.buildElement('button', {class: 'down'}, '↓'));
            var button_delete = group_button.appendChild(Etc.buildElement('button', {class: 'delete'}, 'Del'));

            check_exclude.checked = Vals.oauth_operator.isEnabled(tumblelog_info);

            check_exclude.addEventListener('change', function(e) {
                if (!Vals.oauth_operator.isExcluded(tumblelog_info)) {
                    Vals.oauth_operator.addExclude(tumblelog_info);
                }
                else {
                    Vals.oauth_operator.removeExclude(tumblelog_info);
                }
            });

            button_above.addEventListener('click', function(e) {
                var i;
                Vals.oauth_operator.tumblelog_infos.map(function(t, n) {
                    if (t.base_account == tumblelog_info.base_account &&
                        t.hostname == tumblelog_info.hostname) {
                        i = n;
                    }
                });
                if (i <= 0 ) {
                    return;
                }

                Vals.oauth_operator.tumblelog_infos.move(i, i - 1);
                tr.parentNode.insertBefore(tr, tr.previousSibling);

                Vals.oauth_operator.save();
                Vals.oauth_operator.reload();
            });

            button_down.addEventListener('click', function(e) {
                var i;
                Vals.oauth_operator.tumblelog_infos.map(function(t, n) {
                    if (t.base_account == tumblelog_info.base_account &&
                        t.hostname == tumblelog_info.hostname) {
                        i = n;
                    }
                })
                if (i >= Vals.oauth_operator.tumblelog_infos.length) {
                    return;
                }

                Vals.oauth_operator.tumblelog_infos.move(i, i + 1);
                tr.parentNode.insertBefore(tr, tr.nextSibling.nextSibling);

                Vals.oauth_operator.save();
                Vals.oauth_operator.reload();
            });

            button_delete.addEventListener('click', function(e) {
                var button = e.target;

                var dst = tumblelog_info;

                Vals.oauth_operator.tumblelog_infos = Vals.oauth_operator.tumblelog_infos.filter(function(t,n){
                    return !(t.oauth_token  == dst.oauth_token &&
                             t.base_account == dst.base_account &&
                             t.hostname     == dst.hostname);
                });
                Vals.oauth_operator.exclude_tumblelogs = Vals.oauth_operator.exclude_tumblelogs.filter(function(t) {
                    return !(t.oauth_token  == dst.oauth_token &&
                             t.base_account == dst.base_account &&
                             t.hostname     == dst.hostname);
                });

                Vals.oauth_operator.save();
                Vals.oauth_operator.reload();

                tr.parentNode.removeChild(tr);
            });
        });
        config_dialog.centering();
    };

    Tornado.windows.tornado_help = function tornado_help (e) {
        var help_dialog = new LiteDialog('Tumblr Tornado Help');
        var dialog_body = help_dialog.dialog.querySelector('.lite_dialog_body');
    
        help_dialog.dialog.id = 'tornado_help_dialog';

        var shortcut_groups = [
            {
                name: 'その他のコマンド',
                helps: [],
            },
            {
                name: '標準のコマンド',
                helps: [],
            },
            {
                name: 'Reblog コマンド',
                helps: [],
            },
            {
                name: 'チャンネル Reblog コマンド',
                helps: [],
            },
            {
                name: '自ポストへの操作コマンド',
                helps: [],
            },
            {
                name: 'スクロールコマンド',
                helps: [],
            },
            {
                name: 'ポストの表示操作',
                helps: [],
            },
        ];

        Tornado._shortcuts.map(function(shortcut, i, all) {
            var help = {};
            var options = [];

            help['title'] = shortcut.title || shortcut.func.name || (typeof shortcut.func == "string" ? shortcut.func : "No Title");
            help['key']   = shortcut.key_bind.join(', ');
            help['desc']  = (shortcut.desc && Tornado.funcs.i18n(shortcut.desc)) ||
                            shortcut.func.name;

            if (shortcut.has_selector) {
                options.push('<li>Selector: ' + shortcut.has_selector.replace('<', '&lt;') + '</li>');
            }
            if (shortcut.url) {
                options.push('<li>URL: ' + shortcut.url.toString().replace('<', '&lt;') + '</li>');
            }
            help['options'] = options.join('');

            shortcut_groups[shortcut.group].helps.push(help);
        });

        var base_html = [
            '<table border="1" class="tornado_help_list">',
            ' {{ iter shortcut_groups@group }}',
            ' <tr class="tornado_short_groupname" style="font-weight: bolc; font-size: 20px; text-align: center;">',
            '  <th colspan="3">{{ group.name }}</th>',
            ' </tr>',
            ' <tr style="text-align: center;">',
            '  <td class="tornado_short_title">Title</td>',
            '  <td class="tornado_short_key">Key</td>',
            '  <td class="tornado_short_desc">Description</td>',
            ' </tr>',
            ' {{ iter group.helps@help }}',
            ' <tr>',
            '  <td class="tornado_short_title">{{ help.title }}</td>',
            '  <td clsss="tornado_short_key" style="text-align: center;">{{ help.key }}</td>',
            '  <td class="tornado_short_desc">',
            '   <p>{{ help.desc }}</p>',
            '   <ul>{{ help.options }}</ul>',
            '  </td>',
            ' </tr>',
            ' {{ /iter }}',
            ' {{ /iter }}',
            '</table>',
            '<hr />',
            '<div style="text-align: right;">',
            'Tumblr Tornado Repositories',
            '(',
            '<a href="https://userscripts.org/scripts/show/137667">stable</a>',
            ', ',
            '<a href="https://github.com/poochin/tumblrscript/blob/master/userscript/tumblr_tornado.user.js">beta</a>',
            ', ',
            '<a href="https://github.com/poochin/tumblrscript/blob/dev/userscript/tumblr_tornado.user.js">alpha</a>',
            ')',
            '</div>',
        ].join('\n');

        var t = new Etc.tParser(base_html);
        var html = t.assign({shortcut_groups: shortcut_groups});

        var elm = Etc.buildElementBySource(html);
        dialog_body.appendChild(elm);

        help_dialog.centering();
    };

    /**
     * 右カラムにヘルプを表示します
     */
    function showShortcutHelp() {

        var base_html = [
            '<div id="tornado_rightcolumn_help">',
            ' <p>',
            '  Tumblr Tornado',
            '  <span class="show_tornado_config">[conf]</span> <span class="show_tornado_help">[ ? ]</span>',
            ' </p>',
            ' <ul id="tornado_shortcuts_help">',
            '  {{ iter linehelps@linehelp }}',
            '  <li>{{ linehelp }}</li>',
            '  {{ /iter }}',
            ' </ul>',
            '</div>',
        ].join('\n');

        var linehelps = Tornado._shortcuts.filter(function(shortcut) {
            return shortcut.usehelp !== false && shortcut.usehelp !== 'hide';
        }).map(function(shortcut) {
            return Etc.buildShortcutLineHelp(shortcut);
        });

        var t = new Etc.tParser(base_html);
        var html = t.assign({linehelps: linehelps});

        var elm = Etc.buildElementBySource(html);

        elm.querySelector('span.show_tornado_config').addEventListener('click', Tornado.windows.tornado_config);
        elm.querySelector('span.show_tornado_help').addEventListener('click', Tornado.windows.tornado_help);

        document.querySelector('#right_column').appendChild(elm);
    }

    /*---------------------------------
     * Boot
     *-------------------------------*/

    /**
     * ページロード時に一度だけ呼び出されます
     */
    function main() {
        if (document.body.id === 'tinymce') {
            return; /* リッチテキストエディタで起動されています */
        }

        Tornado.initTumblelogConfigs();

        Etc.tumblelogCollection();

        document.addEventListener('keydown', Tornado.keyevent, true);

        var style = document.head.appendChild(document.createElement('style'));
        style.className = 'tumblr_userscript';
        style.innerHTML = Tornado.css;

        try {
            showShortcutHelp();
        } catch (e) {
            console.error('Error: show shortcut help');
        }

        try {
            Etc.execScript(Tornado.clientfuncs.join(''));
        } catch (e) {
            console.error('Error: client funcs');
        }

        try {
            Etc.execScript(Tornado.clientlaunches.map(function(code) {
                if (typeof code === 'string') {
                    return code + ';\n';
                }
                else if (typeof code === 'function') {
                    return '(' + (code) + ')();\n';
                }
            }).join(''));
        } catch (e) {
            console.error('Error: client launches');
        }

        if (typeof OAuth != 'undefined' && /dashboard\?oauth_token=/.test(location)) {
            Etc.verifyAccessToken();
        }
    }

    /**
     * Opera 用に起動するべきページかどうかを判定しています
     */
    if (Tornado.browser == 'opera') {
        if (/^https?:\/\/www\.tumblr\.com\//.test(location)) {
            main();
        }
    }
    else {
        if (['complete', 'interactive'].indexOf(document.readyState) >= 0) {
            main(); /* 既に DOM 構築済みなので直接呼び出します  */
        }
        else {
            window.document.addEventListener('DOMContentLoaded', main, false);
        }
    }

})();
