// ==UserScript==
// @name       Lingr Niconico Expander
// @namespace  http://aycabta.github.io/
// @version    0.2.3
// @description  URL -> embedded player
// @include    http://lingr.com/
// @include    http://lingr.com/room/*/archives*
// @copyright  2014+, Code Ass
// ==/UserScript==

(function() {
    if (typeof Nicovideo == 'undefined') {
        Nicovideo = new Object();
    }

    if (typeof Nicovideo.Global == 'undefined') {
        Nicovideo.Global = {
            playerCount: 0,
            reserveCount: 0,
            embedMode: "noflash"
        };
        (function () {
            if (navigator.plugins && typeof navigator.plugins["Shockwave Flash"] === "object" && navigator.mimeTypes && navigator.mimeTypes.length) {
                Nicovideo.Global.embedMode = "embed";
            } else if (typeof ActiveXObject !== "undefined") {
                try {   
                    var ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if (ax) {   
                        Nicovideo.Global.embedMode = "object";
                    }           
                } catch (e) {}
            }   
        })();
    }

    Nicovideo.playerUrl = 'http://ext.nicovideo.jp/swf/player/thumbwatch.swf';

    Nicovideo.MiniPlayer = function (vars, width, height) {
        this.id          = Nicovideo.MiniPlayer.allocateId(this);
        this.attributes  = {};
        this.parameters  = {};
        this.variables   = vars || {};
        this.width = width ? width : '485';
        this.height = height ? height : '385';
        if (window.innerWidth && this.width > window.innerWidth) {
            var scale = (window.innerWidth - 20) / this.width;        if (scale > 0) {
                this.width = this.width * scale;
                this.height = this.height * scale;
            }
        }
    };

    Nicovideo.MiniPlayer.prototype = {
        defaultAttributes: {},
        defaultParameters: {
            allowScriptAccess: 'always',
            allowFullScreen: 'true',
            bgcolor: '#000000',
            quality: 'high'
        },

        _merge: function () {
            var o = {};
            for (var i = 0, len = arguments.length; i < len; i++) {
                var arg = arguments[i];
                if (typeof arg != "object") continue;
                for (var key in arg) {
                    o[key] = arg[key];
                }
            }
            return o;
        },
        _escape: function (s) {
            return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        getHTML: function () {
            var id = this.id,
                attrs = this._merge(this.defaultAttributes, this.attributes),
                params = this._merge(this.defaultParameters, this.parameters),
                vars = this.variables;

            var flashvars = [];
            for (var key in vars) {
                flashvars.push(key + '=' + encodeURIComponent(vars[key]));
            }
            params.flashvars = flashvars.join("&");

            var html;
            switch (Nicovideo.Global.embedMode) {
            case "embed":
                html =
                    '<embed type="application/x-shockwave-flash"'
                    + ' id="' + id + '"'
                    + ' name="' + id + '"'
                    + ' src="' + Nicovideo.playerUrl + '"'
                    + ' width="' + this.width  + '"'
                    + ' height="' + this.height + '"'
                    ;
                for (var key in params) {
                    html += ' ' + key + '="' + params[key] + '"';
                }
                for (var key in attrs) {
                    html += ' ' + key + '="' + attrs[key] + '"';
                }
                html += ' />';
                break;
            case "object":
                html =
                    '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
                    + ' id="' + id + '"'
                    + ' name="' + id + '"'
                    + ' width="' + this.width + '"'
                    + ' height="' + this.height + '"'
                    ;
                for (var key in attrs) {
                    html += ' ' + key + '="' + attrs[key] + '"';
                }
                 html += '>';
                html += '<param name="movie" value="' + Nicovideo.playerUrl + '" />';
                for (var key in params) {
                    html += '<param name="' + key + '" value="' + params[key] + '" />';
                }
                html += '</object>';
                break;
            }

            return html;
        }
    };

    Nicovideo.MiniPlayer.allocateId = function (player) {
        var id = 'external_nico_' + (Nicovideo.Global.playerCount++);
        return id;
    };
    
    if (document.all && !window.opera) {
        window.attachEvent("onbeforeunload", function () {
            window.attachEvent("onunload", function () {
                for (var i = 0, l = Nicovideo.Global.playerCount; i < l; i++) {
                    var id = 'external_nico_' + i, el = document.all ? document.all[id] : document.getElementById(id);
                    if (el && el.parentNode) {
                        for (var key in el) {
                            if (typeof el[key] == 'function')
                                el[key] = null;
                        }
                        el.parentNode.removeChild(el);
                    }
                }
            });
        });
    }

    function requestPlayerHTML(v, reservedID) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: "http://ext.nicovideo.jp/thumb_watch/" + v + "?w=490&h=307&n=1",
            onload: function(response) {
                wholeHit = response.responseText.match(/new Nicovideo\.MiniPlayer\(video, (\{[\s\S]+\}),/m);
                eval("params = " + wholeHit[1] + ";");
                player = new Nicovideo.MiniPlayer(params, 490, 307);
                var $span = $('span#niconico_reserve_' + reservedID)[0];
                if ($span) {
                    $span.innerHTML =
                        '<div class="mask" style="margin: 0px; padding: 0px; width: 490px; height: 307px;">' +
                        player.getHTML() +
                        '<div onclick="Modeless.showVideoModeless(this)"></div></div>';
                }
            }
        });
    }

    if (location.href == "http://lingr.com/") {
        Lingr.Text.oldNiconicoExpanderDecorate = Lingr.Text.decorate;
        Lingr.Text.decorate = function(str) {
            if (!str) {
                return Lingr.Text.oldNiconicoExpanderDecorate(str);
            }
            var newStr = Lingr.Text.oldNiconicoExpanderDecorate(str);
            var aaa = newStr.split('<\/p><p>').map(function(s) {
                hit = s.match(/^<a href.+>(?:http:\/\/)?www\.nicovideo\.jp\/watch\/([a-z]+[0-9]+)(?:\?.*)?<\/a>$/);
                if (hit != null) {
                    var reservedID = Nicovideo.Global.reserveCount++;
                    v = hit[1];
                    requestPlayerHTML(v, reservedID);
                    return '<span id="niconico_reserve_' + reservedID + '">' + s + '</span>';
                } else {
                    return s;
                }
            }).join('</p><p>');
            return aaa;
        };
    } else {
        var messages = $("div.decorated p");
        for (i = 0; i < messages.length; i++) {
            var oldMessage = messages[i].innerHTML;
            hit = oldMessage.match(/^<a href.+>(?:http:\/\/)?www\.nicovideo\.jp\/watch\/([a-z]+[0-9]+)(?:\?.*)?<\/a>$/);
            if (hit != null) {
                var reservedID = Nicovideo.Global.reserveCount++;
                v = hit[1];
                requestPlayerHTML(v, reservedID);
                messages[i].innerHTML = '<span id="niconico_reserve_' + reservedID + '">' + oldMessage + '</span>';
            }
        }
    }
})();
