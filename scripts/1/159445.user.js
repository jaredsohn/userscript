// ==UserScript==
// @name           RU-Board WhosOnline
// @author         Wald + Artyom Shegeda
// @namespace      http://userscripts.org/scripts/show/159445
// @include        http*://forum.ru-board.com/*
// @include        http*://72.233.112.78/*
// @icon           http://forum.ru-board.com/favicon.ico
// @description    Highlights users online
// @updateURL	   https://userscripts.org/scripts/source/159445.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/159445.user.js
// @version        1.6
// @run-at	       document-end
// ==/UserScript==
// 
this.whosonline = ({
    autoHighlight: false,
    url: '/whosonline.cgi',
    load: function () {
        if (this.xmlHttp) return;
        try {
            this.xmlHttp = new XMLHttpRequest()
            if (this.xmlHttp.overrideMimeType && this.method == 'POST') this.xmlHttp.overrideMimeType('text/html');
        }
        catch (e) {
            var msv = ["Msxml2.XMLHTTP.7.0", "Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"]
            for (var j = 0; j <= msv.length; j++) {
                try {
                    this.xmlHttp = new ActiveXObject(msv[j])
                    break
                }
                catch (e) {}
            }
            if (!this.xmlHttp) return false
        }
        var self = this
        this.xmlHttp.onreadystatechange = function () {
                if (self.xmlHttp.readyState == 4) {
                    self.processResponse(self.xmlHttp.responseText)
                    self.xmlHttp = null;
                }
            }
        this.xmlHttp.open("GET", this.url + '?timestamp=' + Math.floor(new Date().valueOf() / 60000), true);
        this.xmlHttp.send(null);
    },
    processResponse: function (text) {
        var users = {};
        text.replace(/<a href="profile\.cgi\?action=show&member=.*?">(.*?)<\/a>/g, function (a, b) {
            users[b] = true;
        });
        this.users = users;
        this.autoHighlight && this.highlightUsers();
    },
    highlightUsers: function () {
        if (!this.users) {
            this.autoHighlight = true;
            if (!this.xmlHttp) {
                this.load();
            }
            return;
        }
        try {
            var elements = document.getElementsByTagName('B');
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].parentNode.className == 'm' && this.users[elements[i].innerText]) {
                    var onlinestatus = document.createElement('div');
                    onlinestatus.style.display = 'inline-block';
                    onlinestatus.style.width = '10px';
                    onlinestatus.style.height = '10px';
                    onlinestatus.style.background = '#80FF80';
                    onlinestatus.style.borderTop = '1px solid #c0ffc0';
                    onlinestatus.style.borderLeft = '1px solid #c0ffc0';
                    onlinestatus.style.borderRight = '1px solid #60bf60';
                    onlinestatus.style.borderBottom = '1px solid #60bf60';
                    onlinestatus.style.marginRight = '5px';
                    onlinestatus.title = 'User online';
                    elements[i].parentNode.insertBefore(onlinestatus, elements[i]);
                }
            }
        }
        catch (e) {
            alert(e.message);
        }
    },
    run: function () {
        return this;
    }
}).run();
whosonline && (whosonline.load(), window.onload = function () {
    whosonline.highlightUsers();
});
