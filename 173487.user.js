// ==UserScript==
// @name       Random Metafilter Favorite Post
// @namespace  http://userscripts.org/users/524901
// @version    0.3
// @description  Have lots of favorited posts on Metafilter? This script randomly redirects you to one of them.
// @match      http://www.metafilter.com/user/*
// @match      https://www.metafilter.com/user/*
// ==/UserScript==


function redirect_to_random_favorite()
{
	// cookie code from http://stackoverflow.com/questions/4003823/javascript-getcookie-functions/4004010#4004010
    if (typeof String.prototype.trimLeft !== "function") {
        String.prototype.trimLeft = function() {
            return this.replace(/^\s+/, "");
        };
    }
    if (typeof String.prototype.trimRight !== "function") {
        String.prototype.trimRight = function() {
            return this.replace(/\s+$/, "");
        };
    }
    if (typeof Array.prototype.map !== "function") {
        Array.prototype.map = function(callback, thisArg) {
            for (var i=0, n=this.length, a=[]; i<n; i++) {
                if (i in this) a[i] = callback.call(thisArg, this[i]);
            }
            return a;
        };
    }
    function getCookies() {
        var c = document.cookie, v = 0, cookies = {};
        if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
            c = RegExp.$1;
            v = 1;
        }
        if (v === 0) {
            c.split(/[,;]/).map(function(cookie) {
                var parts = cookie.split(/=/, 2),
                    name = decodeURIComponent(parts[0].trimLeft()),
                    value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
                cookies[name] = value;
            });
        } else {
            c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
                var name = $0,
                    value = $1.charAt(0) === '"'
                              ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                              : $1;
                cookies[name] = value;
            });
        }
        return cookies;
    }
    function getCookie(name) {
        return getCookies()[name];
    }
    
    user_id = getCookie("USER_ID");
    var url = window.location.href;
    var arr = url.split("/");
    var user_favs_url = arr[0] + "//" + arr[2] + "/favorites/" + user_id + "/posts/rss"  + "?" + +new Date();
    
    // http://greasemonkey.win-start.de/patterns/parse-xml.html
    GM_xmlhttpRequest({
        method: 'GET',
        url: user_favs_url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
            var favorites = dom.getElementsByTagName('item');
            var rand = favorites[Math.floor(Math.random() * favorites.length)];
            
            window.location.href = rand.getElementsByTagName('link')[0].textContent;
            
        }
    });
}

var mydiv = document.querySelector(":nth-child(2) .usertext");
var brTag = document.createElement('br');
var aTag = document.createElement('a');
aTag.setAttribute('href',"#");
aTag.setAttribute('target',"_self");
aTag.innerHTML = "Random Favorite";
aTag.addEventListener("click", redirect_to_random_favorite, false);
mydiv.appendChild(brTag);
mydiv.appendChild(aTag);