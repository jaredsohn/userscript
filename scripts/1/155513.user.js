// ==UserScript==
// @name         blocage forumeurs doctissimo
// @include      http://forum.doctissimo.fr/*
// ==/UserScript==

// version 2.1
// inspired from Rllmuk User Ignore List.

/*
Copyright (c) 2005 JSON.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var JSON = {
    org: 'http://www.JSON.org',
    copyright: '(c)2005 JSON.org',
    license: 'http://www.crockford.com/JSON/license.html',
    stringify: function (arg) {
        var c, i, l, s = '', v;

        switch (typeof arg) {
        case 'object':
            if (arg) {
                if (arg.constructor == Array) {
                    for (i = 0; i < arg.length; ++i) {
                        v = this.stringify(arg[i]);
                        if (s) {
                            s += ',';
                        }
                        s += v;
                    }
                    return '[' + s + ']';
                } else if (typeof arg.toString != 'undefined') {
                    for (i in arg) {
                        v = arg[i];
                        if (typeof v != 'undefined' && typeof v != 'function') {
                            v = this.stringify(v);
                            if (s) {
                                s += ',';
                            }
                            s += this.stringify(i) + ':' + v;
                        }
                    }
                    return '{' + s + '}';
                }
            }
            return 'null';
        case 'number':
            return isFinite(arg) ? String(arg) : 'null';
        case 'string':
            l = arg.length;
            s = '"';
            for (i = 0; i < l; i += 1) {
                c = arg.charAt(i);
                if (c >= ' ') {
                    if (c == '\\' || c == '"') {
                        s += '\\';
                    }
                    s += c;
                } else {
                    switch (c) {
                        case '\b':
                            s += '\\b';
                            break;
                        case '\f':
                            s += '\\f';
                            break;
                        case '\n':
                            s += '\\n';
                            break;
                        case '\r':
                            s += '\\r';
                            break;
                        case '\t':
                            s += '\\t';
                            break;
                        default:
                            c = c.charCodeAt();
                            s += '\\u00' + Math.floor(c / 16).toString(16) +
                                (c % 16).toString(16);
                    }
                }
            }
            return s + '"';
        case 'boolean':
            return String(arg);
        default:
            return 'null';
        }
    },
    parse: function (text) {
        var at = 0;
        var ch = ' ';

        function error(m) {
            throw {
                name: 'JSONError',
                message: m,
                at: at - 1,
                text: text
            };
        }

        function next() {
            ch = text.charAt(at);
            at += 1;
            return ch;
        }

        function white() {
            while (ch) {
                if (ch <= ' ') {
                    next();
                } else if (ch == '/') {
                    switch (next()) {
                        case '/':
                            while (next() && ch != '\n' && ch != '\r') {}
                            break;
                        case '*':
                            next();
                            for (;;) {
                                if (ch) {
                                    if (ch == '*') {
                                        if (next() == '/') {
                                            next();
                                            break;
                                        }
                                    } else {
                                        next();
                                    }
                                } else {
                                    error("Unterminated comment");
                                }
                            }
                            break;
                        default:
                            error("Syntax error");
                    }
                } else {
                    break;
                }
            }
        }

        function string() {
            var i, s = '', t, u;

            if (ch == '"') {
outer:          while (next()) {
                    if (ch == '"') {
                        next();
                        return s;
                    } else if (ch == '\\') {
                        switch (next()) {
                        case 'b':
                            s += '\b';
                            break;
                        case 'f':
                            s += '\f';
                            break;
                        case 'n':
                            s += '\n';
                            break;
                        case 'r':
                            s += '\r';
                            break;
                        case 't':
                            s += '\t';
                            break;
                        case 'u':
                            u = 0;
                            for (i = 0; i < 4; i += 1) {
                                t = parseInt(next(), 16);
                                if (!isFinite(t)) {
                                    break outer;
                                }
                                u = u * 16 + t;
                            }
                            s += String.fromCharCode(u);
                            break;
                        default:
                            s += ch;
                        }
                    } else {
                        s += ch;
                    }
                }
            }
            error("Bad string");
        }

        function array() {
            var a = [];

            if (ch == '[') {
                next();
                white();
                if (ch == ']') {
                    next();
                    return a;
                }
                while (ch) {
                    a.push(value());
                    white();
                    if (ch == ']') {
                        next();
                        return a;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad array");
        }

        function object() {
            var k, o = {};

            if (ch == '{') {
                next();
                white();
                if (ch == '}') {
                    next();
                    return o;
                }
                while (ch) {
                    k = string();
                    white();
                    if (ch != ':') {
                        break;
                    }
                    next();
                    o[k] = value();
                    white();
                    if (ch == '}') {
                        next();
                        return o;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad object");
        }

        function number() {
            var n = '', v;
            if (ch == '-') {
                n = '-';
                next();
            }
            while (ch >= '0' && ch <= '9') {
                n += ch;
                next();
            }
            if (ch == '.') {
                n += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    n += ch;
                }
            }
            if (ch == 'e' || ch == 'E') {
                n += 'e';
                next();
                if (ch == '-' || ch == '+') {
                    n += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    n += ch;
                    next();
                }
            }
            v = +n;
            if (!isFinite(v)) {
                ////error("Bad number");
            } else {
                return v;
            }
        }

        function word() {
            switch (ch) {
                case 't':
                    if (next() == 'r' && next() == 'u' && next() == 'e') {
                        next();
                        return true;
                    }
                    break;
                case 'f':
                    if (next() == 'a' && next() == 'l' && next() == 's' &&
                            next() == 'e') {
                        next();
                        return false;
                    }
                    break;
                case 'n':
                    if (next() == 'u' && next() == 'l' && next() == 'l') {
                        next();
                        return null;
                    }
                    break;
            }
            error("Syntax error");
        }

        function value() {
            white();
            switch (ch) {
                case '{':
                    return object();
                case '[':
                    return array();
                case '"':
                    return string();
                case '-':
                    return number();
                default:
                    return ch >= '0' && ch <= '9' ? number() : word();
            }
        }

        return value();
    }
};
// end of JSON import.

Function.prototype.bind = function(object)
{
    var __method = this;
    return function()
    {
        __method.apply(object, arguments);
    }
};



var UIL =
{
    init: function()
    {
        this.processPage();
        this.registerControls();
    },


    processPage: function()
    {
		var blockedUsers=UIL.Config.getIgnoredUsers();

		var allMessages= document.evaluate(
			"//table[@class='messagetable']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

		for (var i=0; i < allMessages.snapshotLength; ++i) {
			var message = allMessages.snapshotItem(i);
			for (var j=0; j < blockedUsers.length; ++j) {
				var user = blockedUsers[j];
				if (message.innerHTML.match('Envoyer un message priv. . '+user)) {
					//message.parentNode.removeChild(message);
					message.style.display='none';
					break;
				}
			}
			
		}

		var allMessagesToolBars= document.evaluate(
			"//div[@class='toolbar']//div[@class='left']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

		for (var i=0; i < allMessagesToolBars.snapshotLength; ++i) {
			var toolbar = allMessagesToolBars.snapshotItem(i);
			var profileLink = toolbar.getElementsByTagName("a")[0].href;
			if(profileLink.substring(0,26)!="http://club.doctissimo.fr/"){
				continue;
			}
			var pseudo=profileLink.substring(26);
			var currentUser=pseudo.substring(0,pseudo.length-1);
			var image=document.createElement("img");
			image.src=UIL.Resources.stopImage;
			image.title="ignorer cet utilisateur";
			image.alt="ignorer cet utilisateur";
			toolbar.appendChild(this.createLinkControl(
                image,
                this.createIgnoreUserHandler(currentUser)));

		}

		console.log("Users bloqués: %s", blockedUsers);
		var allMessages= document.evaluate(
			"//table[@class='messagetable']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

		for (var i=0; i < allMessages.snapshotLength; ++i) {
			var message = allMessages.snapshotItem(i);
			var del = false;
			if (message.innerHTML.match('<b class="s2">Profil supprimé</b>') || message.innerHTML.match('<div class="toolbar">(Publicité)</div>'))
			{
				del = true;
			}
			else for (var j=0; j < blockedUsers.length; ++j) {
				var user = blockedUsers[j];
				if (message.innerHTML.match('http://club.doctissimo.fr/'+user)) {
					del = true;
					break;
				}
			}
			if (del == true)
				message.parentNode.removeChild(message);
		}

		// Virer les "profil supprimé"

    },

    createIgnoreUserHandler: function(userName)
    {
        return function()
        {
            if (confirm("Êtes vous sur de vouloir ignorer " + userName + " ?"))
            {
                UIL.Config.addIgnoredUser(userName);
            }
        }.bind(this);
    },


    createLinkControl: function(element, handler)
    {
        var a = document.createElement("a");
        a.href = "#";
        a.appendChild(element);
        a.addEventListener("click", handler, false);
        return a;
    }
};

/**
 * Configuration.
 */
UIL.Config =
{
    getIgnoredUsers: function()
    {
        var ignoredUsers = [];
        var config = GM_getValue("ignoredUsers");
        if (config !== undefined && /^\[.*\]$/.test(config))
        {
            ignoredUsers = JSON.parse(config);
        }
        else
        {
            // Set up initial array, or reset if the config is invalid
            GM_setValue("ignoredUsers", "[]");
        }
        return ignoredUsers;
    },

    setIgnoredUsers: function(userNames)
    {
        GM_setValue("ignoredUsers", JSON.stringify(userNames));
    },

    addIgnoredUser: function(userName)
    {
        var added = false;
        var ignoredUsers = this.getIgnoredUsers();
        if (ignoredUsers.indexOf(userName) == -1)
        {
            ignoredUsers.push(userName);
            ignoredUsers.sort();
            this.setIgnoredUsers(ignoredUsers);
            added = true;
        }
        return added;
    },

    removeIgnoredUser: function(userName)
    {
        var ignoredUsers = this.getIgnoredUsers();
        ignoredUsers.splice(ignoredUsers.indexOf(userName), 1);
        this.setIgnoredUsers(ignoredUsers);
    },


    _getBooleanConfig: function(configName, defaultValue)
    {
        var config = GM_getValue(configName);
        if (config === undefined)
        {
            GM_setValue(configName, defaultValue);
            config = defaultValue;
        }
        return config;
    }
};

UIL.Resources =
{
    stopImage:"data:image/gif;base64,R0lGODlhDQANAJH/AP///8wAAAAAAMDAwCH5BAEAAAMALAAAAAANAA0AQAInnBeZhwEKYlROvnQZDaxVqTQgNnGQFRobdZDj4l4VVX4ZjXLqugwFADuRaJ4CADvzjZUnFYkhelg+Gtsl49o8IMQEADs="
};


UIL.init();
