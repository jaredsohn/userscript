// ==UserScript==
// @name           NicoMylist poster with XML-RPC
// @namespace      http://efcl.info/
// @include        http://www.nicovideo.jp/mylist*
// @require        https://raw.github.com/gist/310354/b2adc95e35f53cfb8162490b938639ab66db5ea9/GM_config.js
// ==/UserScript==
// http://d.hatena.ne.jp/jimo1001/20090601/1243782686
var ShortcutKey = function() {
    this.list = [];
    this.init();
}
ShortcutKey.prototype.keys = {
    8: 'BS',
    9: 'TAB',
    10: 'RET',
    13: 'RET',
    32: 'SPC',
    27: 'ESC',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12'
}
ShortcutKey.prototype.skeys = {
    8: 'BS',
    10: 'RET',
    13: 'RET',
    32: 'SPC'
}
ShortcutKey.prototype.mkeys = {
    'altKey' : 'A',
    'ctrlKey' : 'C',
    'metaKey' : 'M',
    'shiftKey' : 'S'
}
ShortcutKey.prototype.init = function() {
    var self = this;
    window.addEventListener('keydown', function(evt) {
        var key = self.get(evt);
        self.list.forEach(function(a) {
            if (a.key == key && (a.element == evt.target || a.element == evt.view)) {
                // 				console.log(a.key +"=="+ key);
                a.func();
            }
        });
    }, false);
}
ShortcutKey.prototype.add = function(elm, key, func) {
    this.list.push(
    {
        'element' : elm,
        'key' : key,
        'func' : func
    }
            );
}
ShortcutKey.prototype.get = function(evt) {
    var key = [], k = '';
    for (mk in this.mkeys) {
        if (evt[mk])
            key.push(this.mkeys[mk]);
    }
    if (evt.which) {
        k = this.keys[evt.which] || String.fromCharCode(evt.which).toLowerCase();
        key.push(key.length ? '-' + k : k);
    } else if (evt.keyCode) {
        k = this.keys[evt.keyCode];
        key.push(key.length ? '-' + k : k);
    }
    return key.join("");
}
/* ショートカット */
var shortcut = new ShortcutKey();
GM_config.init('Configuration for Post', {
    endPoint:    { label: 'EndPoint:', type: 'text' , "default": 'http://' },
    blogid:    { label: 'Blogid:', type: 'text' , "default": '' },
    username:    { label: 'username:', type: 'text' , "default": '' },
    password:    { label: 'password:', type: 'text' , "default": '' },
    titlePre:    { label: '投稿title prefix:', type: 'text' , "default": '' },
    category:    { label: '投稿category:', type: 'text' , "default": '' },
    ShortCutKey:    { label: 'ShortcutKey:', type: 'text' , "default": 'CS-RET' }
}, "#config_header {font-size:16pt !important;} .config_var {margin:5px 0 5px 20% !important;} #header {margin-bottom:30px !important;} .indent40 {margin-left:20% !important;}", // to add your CSS - replace this with configStyle
{
    open: function() {
        var iframe = document.getElementById("GM_config");
        iframe.contentDocument.getElementById("field_ShortCutKey").addEventListener('keydown', function(evt) {
            evt.preventDefault();
            this.value = shortcut.get(evt);
        }, false);
    },
    save: function() {

    } // reload the page when configuration was changed
});
GM_registerMenuCommand('Post Setting', GM_config.open);

/* 投稿先のメタ情報 */
var metaBlog = {
    "endPoint" : GM_config.get("endPoint"),
    "blogid"   : GM_config.get("blogid"),
    "username" : GM_config.get("username"), //空だとblogidを使用
    "password" : GM_config.get("password")
}

var XMLRPC = (function() {
    this.initialize.apply(this, arguments);
});
XMLRPC.prototype = {
    /*
     * @arg
     {
     "endPoint": "endPoint",
     "blogid"   : "blogid",
     "username" : "username",//空だとblogidを使用
     "password" : "password"
     }
     */
    initialize : function(arg) { //引数は{}オブジェクト
        this.endPoint = arg.endPoint;
        this.blogid = arg.blogid;
        this.username = (arg.username) ? arg.username : arg.blogid;
        this.password = arg.password;
    },
    /* *
     * @title 記事タイトル
     * @desc 記事内容
     * @tags タグ(カンマ区切り)
     * @callback 更新成功時のコールバック関数
     */
    post : function (title, desc, categories, tags, callback) {
        var postURI = this.endPoint;
        this.tags = (tags.length == 0) ? "" : tags.join(",");
        var XMLbody = '<?xml version="1.0"?>\n';
        XMLbody += this.template(title, desc, this.tags);
        //		console.info(XMLbody);
        GM_xmlhttpRequest({
            method : "POST",
            headers : {
                'Content-type' : 'text/xml'
            },
            url : postURI,
            data : this.template(title, desc, categories, tags),
            onload : callback,
        })
    },
    template : function (title, desc, categories, tags) {
        var request = <methodCall>
            <methodName>metaWeblog.newPost</methodName>
            <params>
                <param>
                    <value>
                        <string>{this.blogid}</string>
                    </value>
                </param>
                <param>
                    <value>
                        <string>{this.username}</string>
                    </value>
                </param>
                <param>
                    <value>
                        <string>{this.password}</string>
                    </value>
                </param>
                <param>
                    <value>
                        <struct>
                            <member>
                                <name>title</name>
                                <value>
                                    <string>{title}</string>
                                </value>
                            </member>
                            <member>
                                <name>description</name>
                                <value>
                                    <string>{desc}</string>
                                </value>
                            </member>
                            <member>
                                <name>categories</name>
                                <value>
                                    <array>
                                        <data>
                                            <value>{categories}</value>
                                        </data>
                                    </array>
                                </value>
                            </member>
                            <member>
                                <name>mt_keywords</name>
                                <value>
                                    <string>{tags}</string>
                                </value>
                            </member>
                            <member>
                                <name>mt_allow_comments</name>
                                <value>
                                    <boolean>1</boolean>
                                </value>
                            </member>
                            <member>
                                <name>mt_convert_breaks</name>
                                <value>
                                    <string>0</string>
                                </value>
                            </member>
                        </struct>
                    </value>
                </param>
                <param>
                    <value>
                        <boolean>1</boolean>
                    </value>
                </param>
            </params>
        </methodCall>;
        return request.toString();
    }
}
/*
 * Draggable
 *
 * @website http://clonedoppelganger.net/
 * @version 0.0.2
 */
/**
 * Constructor
 * @param {String|Element} element - element id or element object
 */
var Draggable = function(element) {
    this.initialize(element);
}

/**
 * remove EventListeners
 */
Draggable.prototype.destroy = function() {
    this.detach(this.element, "mousedown", this.observers["mousedown"]);
    this.detach(this.html, "mouseup", this.observers["mouseup"]);
    this.detach(this.html, "mousemove", this.observers["mousemove"]);
}

Draggable.prototype.initialize = function(element) {
    this.isIE = navigator.appVersion.lastIndexOf("MSIE") > 0;
    this.isFF = navigator.userAgent.toLowerCase().indexOf("firefox") > 0;
    this.html = document.getElementsByTagName("html").item(0);
    if (typeof element == "string") {
        this.element = document.getElementById(element);
    } else {
        this.element = element;
    }
    this.style = this.element.style;
    this.thisBaseX;
    this.thisBaseY;
    this.pageBaseX;
    this.pageBaseY;
    this.scrollBaseY;
    this.isMoving = false;
    this.observers = {};
    var self = this;
    // Mousedown
    this.observers["mousedown"] = this.observe(this.element.firstChild, "mousedown", function(event) {
        if (self.isMoving) return;
        event = event || window.event;
        //self.disableSelect(event);
        var position = self.getPosition();
        self.thisBaseX = position["x"];
        self.thisBaseY = position["y"];
        self.pageBaseX = event.pageX || event.clientX;
        self.pageBaseY = event.pageY || event.clientY;
        if (self.isIE) self.scrollBaseY = document.body.scrollTop;
        self.isMoving = true;
    });
    // Mousemove
    this.observers["mousemove"] = this.observe(this.html, "mousemove", function(event) {
        if (!self.isMoving) return;
        event = event || window.event;
        var x = (event.pageX || event.clientX) - self.pageBaseX + self.thisBaseX;
        var y = (event.pageY || event.clientY) - self.pageBaseY + self.thisBaseY;
        if (self.isIE) y += (parseInt(document.body.scrollTop) - self.scrollBaseY);
        self.setPosition(x, y);
    });
    // Mouseup
    this.observers["mouseup"] = this.observe(this.html, "mouseup", function(event) {
        if (!self.isMoving) return;
        self.enableSelect();
        self.isMoving = false;
    });
}

Draggable.prototype.observe = function(element, name, observer) {
    if (element.addEventListener) {
        element.addEventListener(name, observer, true);
    } else if (element.attachEvent) {
        element.attachEvent("on" + name, observer);
    }
    return observer;
}

Draggable.prototype.detach = function(element, name, observer) {
    if (element.removeEventListener) {
        element.removeEventListener(name, observer, true);
    } else if (element.detachEvent) {
        try {
            element.detachEvent("on" + name, observer);
        } catch (e) {
        }
    }
}

Draggable.prototype.setPosition = function(x, y) {
    this.style.left = x + "px";
    this.style.top = y + "px";
}

Draggable.prototype.getPosition = function() {
    var x, y;
    // First you acquire from css style information.
    if (this.style.top == "" || this.style.left == "") {
        if (this.element.currentStyle) {
            x = this.element.currentStyle["left"];
            y = this.element.currentStyle["top"];
        } else {
            var computedStyle = document.defaultView.getComputedStyle(this.element, null);
            x = computedStyle["left"];
            y = computedStyle["top"];
        }
    } else {
        x = this.style.left;
        y = this.style.top;
    }
    return {"x": parseInt(x.replace("px", "")) || 0, "y": parseInt(y.replace("px", "")) || 0};
}

Draggable.prototype.disableSelect = function(event) {
    if (this.isIE) {
        document.getElementsByTagName("body").item(0).onselectstart = function(e) {
            return false
        };
    } else {
        try {
            event.preventDefault();
        } catch(e) {
        }
    }
}

Draggable.prototype.enableSelect = function() {
    if (this.isIE) document.getElementsByTagName("body").item(0).onselectstart = "";
}

/**
 * ポップアップを作成する
 * @title {str} ウィンドウタイトル
 * @defaultInput {str} テキストエリアのデフォルト値
 * @callback {function} callback関数 引数に入力した文字列
 * */
function createPopup(title, defaultInput, defaultTags, callback, altLead) {
    if (typeof altLead == 'undefined') altLead = true;
    var GM_popup_container = document.createElement("div");
    GM_popup_container.id = "GM_popup_container";
    GM_popup_container.class = "ui-draggable";
    var GM_popup_title = document.createElement("input");
    GM_popup_title.id = "GM_popup_title";
    GM_popup_title.value = title;
    var GM_popup_content = document.createElement("div");
    GM_popup_content.id = "GM_popup_content";
    GM_popup_content.setAttribute("class", "comfirm");
    var GM_popup_message = document.createElement("div");
    GM_popup_message.id = "GM_popup_message";
    GM_popup_message.textContent = "コメントの入力"
    var GM_popup_br = document.createElement("br");
    var GM_popup_prompt = document.createElement("textarea");
    GM_popup_prompt.id = "GM_popup_prompt";
    if (altLead && defaultInput) {// 先頭にカーソル
        GM_popup_prompt.value = defaultInput;
    } else {
        GM_popup_prompt.value = defaultInput + " ";
    }
    var GM_popup_tags = document.createElement("input");
    GM_popup_tags.type = "text";
    GM_popup_tags.id = "GM_popup_tags";
    GM_popup_tags.value = defaultTags || "";
    var GM_popup_panel = document.createElement("div");
    GM_popup_panel.id = "GM_popup_panel";
    var GM_popup_ok = document.createElement("input");
    GM_popup_ok.type = "Button"
    GM_popup_ok.id = "GM_popup_ok";
    GM_popup_ok.value = "　OK　"
    var GM_popup_cancel = document.createElement("input");
    GM_popup_cancel.type = "Button"
    GM_popup_cancel.id = "GM_popup_cancel";
    GM_popup_cancel.value = "　Cancel　";
    var GM_popup_counter = document.createElement("p");
    GM_popup_counter.id = "GM_popup_counter";
    GM_popup_counter.textContent = 140 - defaultInput.length;
    GM_popup_ok.addEventListener("click", function() {
        this.removeEventListener("click", arguments.callee, false);
        document.body.removeChild(GM_popup_container);
        callback(GM_popup_title.value, GM_popup_prompt.value, GM_popup_tags.value);
    }, false);
    GM_popup_cancel.addEventListener("click", function() {
        this.removeEventListener("click", arguments.callee, false);
        document.body.removeChild(GM_popup_container);
        callback(false);
    }, false);
    GM_popup_prompt.addEventListener("keypress", function(e) {
        var c = (e.ctrlKey)
        var v = (e.keyCode == 13)
        if (c && v) {
            this.removeEventListener("keypress", arguments.callee, false);
            document.body.removeChild(GM_popup_container);
            callback(GM_popup_title.value, GM_popup_prompt.value, GM_popup_tags.value);
        } else {
            var counter = 140 - GM_popup_prompt.value.length;
            GM_popup_counter.textContent = counter;
        }
    }, false);

    GM_popup_panel.appendChild(GM_popup_ok);
    GM_popup_panel.appendChild(GM_popup_cancel);
    GM_popup_message.appendChild(GM_popup_br);
    GM_popup_message.appendChild(GM_popup_prompt);
    GM_popup_message.appendChild(GM_popup_tags);
    GM_popup_message.appendChild(GM_popup_counter);
    GM_popup_content.appendChild(GM_popup_message);
    GM_popup_content.appendChild(GM_popup_panel);
    GM_popup_container.appendChild(GM_popup_title);
    GM_popup_container.appendChild(GM_popup_content);

    document.body.appendChild(GM_popup_container);
    // フォーカスを先頭に
    var d = document.getElementById("GM_popup_prompt");
    setTimeout(function() {
        d.focus();
        if (altLead) {// 先頭にカーソル
            d.setSelectionRange(0, 0);
        } else {
            d.setSelectionRange(GM_popup_prompt.value.length, GM_popup_prompt.value.length);
        }
    }, 100)
}

GM_addStyle(String(<>
    <![CDATA[
	#GM_popup_container {
		padding: 0pt;
		position: fixed;
		overflow:auto;
		z-index: 99999;
		margin: 0pt;
		top: 330px;
		left: 450px;
		font-family: Arial, sans-serif;
		font-size: small!important;
		min-width: 300px; /* Dialog will be no smaller than this */
		width: 450px; /* Dialog will wrap after this width */
		min-height: 100px; /* Dialog will be no smaller than this */
		height:240px; /* Dialog will wrap after this width */
		background: #FFF;
		border: solid 5px #999;
		color: #000;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
		border-radius: 5px;
	}

	#GM_popup_title {
		width: 100%; /* Dialog will wrap after this width */
		font-size: medium;
		font-weight: bold;
		text-align: center;
		line-height: 1.75em;
		color: #666;
		background: #CCC url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAXCAYAAADDcYV1AAAA6klEQVQYlW3I23KCMBhF4f/9n60Y5BBTBEIIhxBF9AlWL2SclunFN2vPltfrxZH8ez6fT45ke2xs21+yPh6s68qn64rc73eOJN4iMUZuuxgjEpaFJQSWEAghsCwBmaaJeZ6Z5nnvhIzjyLAbh4FhGBHfe/re4/se73u894hzjq7rcK7DdQ7nHNJai21bbGtp2xZrLVLXDU1dU9cNdfMm1fVKVVV8WlWIMQZjDN97zbdB9EVz0Rq9u2iNlGVJUZQURfGp5HlOnmXkWUaWvbecz2eORCmFShVKpaRpilIKOZ1OHEmSJHwlCckvP7cioIs4K9DKAAAAAElFTkSuQmCC") top repeat-x;
		border: solid 0px #FFF;
		border-bottom: solid 1px #999;
		cursor: move;
		padding: 0em;
		margin: 0em;
	}

	#GM_popup_content {
		width: 95%;
		padding: 0.5em 1em 0.5em 0;
		margin: 0em;
	}


	#GM_popup_content.comfirm {
		background: 12px 12px no-repeat url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAGk0lEQVRYhe2Wa0yUZxqGP7IpJQNqMA0sSc3aZt0pxkpdSdlyKuJqEURR8QS1AkUiENaiZtGwEF0EXMA1iKhQUIsClqKIodLQHSswqKzGKSOMw2mBAVxORTmfPubaHyPDIo61ppv90zd5/n3Jdd3P8355H4H/8xF+EfgpH7d2DpJ1TU1YbCkfBRSwbF02Np4XcfX9ipAoGem5SuqbH//8Ao2tfYTFlvL26izmrchlaUAZqw5Ws/7wQzyiVDjtVWLte5P5DrlY2WfgF34dRU3XzyPw+WUVVvYZvOV9nU9Tmzku05JZCV/c01V6BRyXaYkuhOBsEY9DTSxYU4RkUQpxKXcYGxdfTUCc1LIvUY6x3Tk2xtWSWQmXqyC7Er64reVw/mP8E1V8fFTFvnNdRH/Zz/6sAT7LHiPgLPzhT7VIFqXgG1xIX9/oTxPQamFfohwThwuEne+iUKWDX7ijg0fm9BCfpaJK3c3d6g4iTinxS9awJ7ObXamP2HmiB58z8OFfujBdnM62wAKDnXiuwOeXVRjbndPDL93TJT9bIZJcMkZkZj2iOD6lS//AEP6JKnaldvLJ8UdsTWjBK6aZtUnj2P25G8miFKLjy15O4F9t/VjZZ7AxrnYGPLNc5Mx34xy5OkhsTqNuTOLkUxEtwSfq2J7QxvaENrximnGPamRlRD3OMSD1U2NimURFZduPC4TFlvKW9/UZM88sn+CUbIzjxSP87doQwSfq+PafjwAREMm90YZHlGoW3DH8IbZ7mngvEt5wvIq3Tx6iOGlYoLVzkLdXZ+GXrKFQpZt5Zrk4A37kygAHcp6wPV5NZGY94afr8IhS6dr+16aZ8NAa3g1UIA17wm8+acbEMgmFssOwQNY1NfNW5BKcLZJeobtwz8L3Z/XqZ+1xqIkVB+tYcbAOj0PTcIdwNbahNSwNeoDUT8GbO6v5XWgrZtIM4hLKDQuExZayNKAM77PgcHSIM9+Nk1IyDd+V+ojw03UkF2hIzNeQXKAhvaiF9KIWPKJUuBxo0Cefgi/0VWC29iYLA6v0YzAo8FFAAU57lXikTiD4duIQ08uxrwc5cmWA6C/72ZrQQmxOI2rNACCinRyFyWFA5OOEWmxDa3RtD6qehnvKEVwKsfC5j4WbDFu7NMMCy7yycY5Q4/z3cQTfTgTfTpZFdrM/q5fInB72ZHaz6WgLqw5Wo2zqY3R4kN7eXsZGh9ker+bdoGqWBj3A2l+pTy64FiG4FGK+6RYWbjKkS04aFrDxvKgXMNrRitGOVoStzVgEafCMb2f3qX8TcroD5wg1uTfaYHJYL7AlXo21vxJrfyVWWyoxdvuHDu5ahOB85eUEXH2/4v0wBS7HRvQCRjtaEbbUIWxW8etPa1m+t4HFwdXkybvQTgzoBdYffshcr3Ika0sR/vjNNNylECPHPMw33UIQBMHWLg2t1oBASJQMa9+beKRO6MDbGqZrswphYxXCursIq2/rBXq6uxkbHcY1QoHgVDILLjhfwcgxj/mb7zJneT4bNmQb7kB6rpL5Drl4nRjEIkijS/40veD9YJaAONpHV2fnTIFn4ILDJV778DIWPvd5fUEa0dEywwL1zY+xss/A5UADyyK7deD/gv/K696LBewLZyUXPriI6ZoSzN3LMJbEIJe3GBYA2Bl+nQVrivA4PoB5QL0u9VTyqVpVTp68i7GhH2hvb2dkZGha4Bn4VPtN3rmAm9v5Wa/iLIEqte71sg2twSGml9e8v58Jd5cjOJWQU9YzQ8D+s3sI712aARc+uMhcr3LmrLyBsSSG4uK6Z3HPf47jUu5gujgd+4gmbCLadK13l+tL6qdA2dTHQG8H7e3tjA39QGK+Bgs3mW7uT+Fma28yb91tTCyTCAkpnHH7XyggipP4Bhdiujid5XsbsIlow9S7EsGphM3HGqnvmmBgZIKuxwP66h/Tcq1qGMmarxEcLjHXq1wPd3XNMLgVGVzJ+vpG2RZYgGRRClI/Bb+PaOXNndUsDKzi/fDvsdld+dya61Wu++VW3tDDNZonhjAvXkrHxkWi48swsUxivkMuUj8Fv91di4XPfcw33cLMU47EvRSJeylmnnLM1ldi7l6GyTsXMJbEEBLy4n3wRwWmTkVlG94+eZhYJmEmzeANx6tYuMn0JQiCMGd5Pq8vSMNYEoOb23mKi+sQJ58z9FcRmDoKZQdxCeV4++Rha5eGdMlJpEtOYmuXxoYN2URHy5DLW14K/EoC/4vzi8B/AIMM+YmnQgpyAAAAAElFTkSuQmCC");
	}
	#GM_popup_message {
		width: 95%;
		font-size: small!important;
		text-align: center;
		padding-left: 24px;
	}

	#GM_popup_counter{
		position: absolute;
		margin: 3pt;
		button: 10px;
		left: 10px;
		font-size :large;
		color : #AAAAAA;
		font-family:'Helvetica Neue','Helvetica','Arial',sans-serif;
		line-height :1.9em
	}
	#GM_popup_panel {
		text-align: center;
		margin: 0.5em 0em 0em 1em;
	}
	#GM_popup_prompt{
      height:100px;
	  width: 90%;
	  margin-left: 32px;
	  margin-right: 16px;
	  font-size :small!important;
	  line-height :1.25;
	}
	#GM_popup_tags{
	  width: 90%;
	  margin-left: 32px;
	  margin-right: 16px;
	  font-size :small!important;
	}

]]></>));

// ==UserScript==
// @name           Nico mylist API
// @namespace      http://efcl.info/
// @include        http://www.nicovideo.jp/mylist/*
// ==/UserScript==
(function () {
    var w = unsafeWindow;
    Mylist = {
        // マイリストの属性
        /*
         Mylist.groupListのツリー
         id (number): マイリストID
         user_id (number): マイリストのユーザーID
         name (string): マイリストのタイトル
         description (string): マイリスト説明文
         public (boolean): true // 公開状況
         default_sort (number): 1 (1-17)
         create_time (number): UNIX時間(util.unix2で戻せる)
         update_time (number): UNIX時間
         icon_id (number): 0
         sort_order (number): 0
         */
        // Mylist.groupList - my.CurrentGroupのコピー
        groupList: function () {
            return w.my.currentGroup;
        },
        /*
         my.currentItemsのツリー
         item_type (number): 0
         item_id (string): 接頭辞がない動画番号(常時)
         description (string): マイリスト登録者による説明文
         item_data
         video_id (string): 接頭辞がある動画番号(sm数字)
         title (string):  動画タイトル
         thumbnail_url (string): サムネイルURL
         first_retrieve (number): 投稿日時(UNIX時間)
         update_time (number): 更新日時(UNIX時間)
         view_counter (string): 再生数
         mylist_counter (string): マイリスト数
         num_res (string): コメント数
         group_type (string): default
         length_seconds (string): 再生時間(秒)
         deleted (string): 0 (削除状態0-3?)
         last_res_body (string): 最近のコメント(文字列)
         watch_id (string): 接頭辞なしの動画番号(コミュ、マイメモリー以外だと接頭辞がある)
         watch (number): 0
         create_time (number): マイリスト登録日時(UNIX時間)
         update_time (number): マイリスト更新日時(UNIX時間)
         */
        // Mylist.itemList - my.currentItemsのコピー
        itemList : function() {
            return w.my.currentItems;
        }
    }

    // utility関数群
    utils = {
        playlength : transPlaylength,
        unix2 : unixTodate,
        clone : clone
    }


    // 再生時間を分秒に変換
    function transPlaylength(length) {
        return (length / 60).toFixed(2).toString().split(".").join("分") + "秒";
    }

    // 10桁の数字(UNIXTIME)から2009/10/1 00:00形式で返す
    function unixTodate(x) {
        var t = new Date(x * 1000);
        return t.getFullYear() + "/" + fillZero(t.getMonth() + 1) + "/" + fillZero(t.getDate()) + " " + fillZero(t.getHours()) + ":" + fillZero(t.getMinutes()) + ":" + fillZero(t.getSeconds());
    }

    // http://d.hatena.ne.jp/javascripter/20080514/1210791575
    // 先頭を0で埋める デフォルト2桁
    function fillZero(num, digit) {
        var n = (digit) ? digit : 2;// デフォルト値
        var zero = new Array(n).join('0');//0をn-1文字分つなげた文字列を作る。n==4だと'000'
        var str = zero + num;//zeroとthisをくっつけた文字列を作る。
        var result = str.substr(-n);//strの後ろから、n文字分の文字列を取ってくる。
        return result;
    }

    // オブジェクトのコピーのコピーを作成
    function clone(obj) {
        return (typeof uneval == "function") ? eval(uneval(obj)) : false;
    }

})();

// $X(exp);
// $X(exp, context);
// $X(exp, type);
// $X(exp, context, type);
function $X(exp, context, type /* want type */) {
    if (typeof context == "function") {
        type = context;
        context = null;
    }
    if (!context) context = document;
    exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        if (o) return o;
        return (document.contentType == "application/xhtml+xml") ? "http://www.w3.org/1999/xhtml" : "";
    });

    switch (type) {
        case String:  return exp.evaluate(context, XPathResult.STRING_TYPE, null).stringValue;
        case Number:  return exp.evaluate(context, XPathResult.NUMBER_TYPE, null).numberValue;
        case Boolean: return exp.evaluate(context, XPathResult.BOOLEAN_TYPE, null).booleanValue;
        case Array:
            var result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var ret = [], i = 0, len = result.snapshotLength; i < len; i++) {
                ret.push(result.snapshotItem(i));
            }
            return ret;
        case undefined:
            var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
            switch (result.resultType) {
                case XPathResult.STRING_TYPE : return result.stringValue;
                case XPathResult.NUMBER_TYPE : return result.numberValue;
                case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
                case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
                    // not ensure the order.
                    var ret = [], i = null;
                    while ((i = result.iterateNext())) ret.push(i);
                    return ret;
            }
            return null;
            default: throw(TypeError("X: specified type is not valid type."));
    }
}

function getElementsByAttr(tag, attr, value) {
    var arrayEl = new Array();
    var el = document.getElementsByTagName(tag);
    for (i = 0,j = 0; i < el.length; i++) {
        if (el[i].getAttribute(attr) == value) {
            arrayEl[j] = el[i];
            j++;
        }
    }
    return arrayEl;
}
function getVideoInfos(g) {
    var aryInfo = [];
    for (var i = 0,l = (g.length < 3) ? g.length : 3; i < l; i++) {
        var tmp = g[i].item_data;
        aryInfo[i] = {
            title : tmp.title,
            url : "http://www.nicovideo.jp/watch/" + tmp.video_id,
            imgSrc :tmp.thumbnail_url,
            videoLength : "再生時間" + utils.playlength(tmp.length_seconds),
            retrieve : "投稿日 : " + utils.unix2(tmp.first_retrieve)
        }
    }
    return aryInfo;
}
function makeFromTemplate(obj) {
    var result = [];
    for (var i = 0,l = obj.length; i < l; i++) {
        var title = obj[i].title;
        var url = obj[i].url;
        var imgsrc = obj[i].imgSrc;
        var videoLength = obj[i].videoLength;
        var retrieve = obj[i].retrieve;
        var request = <div class="nicovideo_div">
            <a href={url} title={title} class="nicovideo_href">
                <img src={imgsrc} class="nicovideo_img" />
            </a>
            <div class="nicovideo_info">
                <p class="nicovideo_retrieve">{retrieve}</p>
                <p class="nicovideo_length">{videoLength}</p>
                <p class="nicovideo_link">
                    <a href={url} title={title} class="nicovideo_link">{title}</a>
                </p>
            </div>
            <br class="float_clear" />
        </div>
        result.push(request);
    }
    return result
}

var isAddEvent = false;
shortcut.add(window, GM_config.get("ShortCutKey"), function() {
    var tagName;
    try {
        tagName = $X('id("TagCloud")//a[contains(@href, "http://www.nicovideo.jp/tag/")]', document);
    } catch(e) {
    }
    //タグ名 : タグ数
    var inputTags = [];
    var defTag = "";
    if (tagName) {
        var tagObj = [];
        tagName.forEach(function(t, i) {
            var m = t.textContent.match(/(^.*?)\((\d+)\)$/);
            tagObj[i] = {name:m[1],sum:m[2]};
            if (!isAddEvent) {
                t.addEventListener("click", function(evt) {
                    evt.preventDefault();
                    updateTag(t);
                }, false);
            }
        });
        isAddEvent = true;
        // 降順に並び替え
        tagObj.sort(function(a, b) {
            log(a, b);
            return b["sum"] - a["sum"];
        })
        for (var i = 0,len = (tagObj.length > 3) ? 3 : tagObj.length; i < len; i++) {
            inputTags.push(tagObj[i].name);
        }
        // タグに色をつける
        tagsColoring(tagName, inputTags)
    }
    // DOM my.currentGroupにアクセス
    var group = Mylist.groupList();
    /* init */
    createPopup(group.name, '', inputTags.join(" "), function(title, str, tags) {
        if (str) {

            // DOM my.currentItemsにアクセス
            var items = Mylist.itemList();
            // templateでまとめる
            var videoData = makeFromTemplate(getVideoInfos(items));
            if (!videoData)
                return;
            var postData = '<div class="nicovideo_mylist"><p class="nicomylist_title"><a href="http://www.nicovideo.jp/mylist/' + group.id + '">' + group.name + '</a></p><p class="nicomylist_description">' + group.description + '</p>'
                    + videoData.join("\n")
                    + '</div>';
            var tagAry = tags.split(/\s/);
            /* init メタ情報を使って投稿先決める*/
            var t = new XMLRPC(metaBlog);
            title = (title) ? title : group.name;
            t.post(
                    GM_config.get("titlePre") + title, // タイトル
                    str.split("\n").join("<br />") + "<br />" + postData,
                    GM_config.get("category"),
                    tagAry,
                    function(res) {//callback
                        console.log(res);
                    }
                    );

        }
    }, true);
    var popup = new Draggable("GM_popup_container");

    function tagsColoring(ele, tags) {
        for (var i = 0,len = ele.length; i < len; i++) {
            ele[i].style.backgroundColor = null;
            for (var j = 0,l = tags.length; j < l; j++) {
                if (decodeURI(ele[i].href.split("/").pop()) == tags[j]) {
                    ele[i].style.backgroundColor = "#00dddd";
                    break;
                }
            }
        }
    }

    function updateTag(ele) {
        var Tags = document.getElementById("GM_popup_tags");
        var GMTags = Tags.value.split(" ");
        var word = decodeURI(ele.href.split("/").pop());
        if (ele.style.backgroundColor) {
            GMTags = GMTags.filter(function(x) {
                return x != word
            });
            ele.style.backgroundColor = null;
        } else {
            GMTags.push(word);
        }
        Tags.value = GMTags.join(" ");
        tagsColoring(tagName, GMTags)
    }
});
function log(m) {
    if (unsafeWindow.console) {
        unsafeWindow.console.log(m);
    } else {
        console.log(m); //GM_log(m)でも同じ。
    }
}