// ==UserScript==
// @name           mataniconicomiteru
// @namespace      http://efcl.info/
// @description    ニコニコ動画の動画ページからTwitterへ投稿(OAuth)
// @include        http://www.nicovideo.jp/watch/*
// @require https://raw.github.com/azu/OAuth-for-Greasemonkey/master/oauth.js
// @require https://raw.github.com/azu/OAuth-for-Greasemonkey/master/sha1.js
// @require https://raw.github.com/azu/OAuth-for-Greasemonkey/master/GMwrap.js
// @resource oauthbutton http://a0.twimg.com/images/dev/buttons/sign-in-with-twitter-d.png
// @run-at document-end
// ==/UserScript==
(function () {
    // http://dev.twitter.com/apps
    var clientInfo = {
        name: 'Greasemonkey',
        consumerKey: 'xd5X7ErA1TSvk53fTeqttg',
        consumerSecret: 'BziZTjDYv1v68bxuuuDn7oVeJLwt7YRB5RtuCVvzhFE'
    };
    var tw = new TwitterOauth(clientInfo);
    if (!tw.isAuthorize()) {
        (function () {
            var iframeDoc;
            var listner = function (iframe, win, doc) {
                iframeDoc = doc;
                iframe.height = "200";
                iframe.width = "350";
                iframe.style.position = "fixed";
                iframe.style.bottom = iframe.style.right = "0";
                var message = doc.createElement("div");
                message.id = "message";
                message.textContent = "Now Loading..."
                doc.body.appendChild(message);
                tw.getRequestToken(createAuthorizationMenu);
                addCSS(doc, '#GM_iframe_Oauth {' + 'font-size:22px;' + 'margin : 20px;' + '}' + '#GM_iframe_Oauth img{' + 'margin : 10px 0;' + 'box-shadow: 8px 4px 8px #808080;' + '-moz-box-shadow: 8px 4px 8px #808080;' + '}' + '#close {' + 'background-color:red;border:5px;position:fixed;top:0px;right:0px;' + '}');
            };
            GM_registerMenuCommand("またニコ見てる:OAuth Authorization", function () {
                makeFrame(listner);
            });
            function createAuthorizationMenu(authorizeURL) {
                var div = iframeDoc.createElement("div");
                div.id = "GM_iframe_Oauth";
                var imgOauth = iframeDoc.createElement("img");
                // http://dev.twitter.com/pages/sign_in_with_twitter
                imgOauth.src = GM_getResourceURL("oauthbutton");
                imgOauth.addEventListener("click", function () {
                    GM_openInTab(authorizeURL);
                }, false);
                var message = iframeDoc.getElementById("message");
                message.innerHTML = '<ol>' + '<li>認証ボタンをクリックし認証を行う</li>' + '<li>認証後に表示されるPINコードをコピー</li>' + '<li>下記のテキストボックスに入力し保存</li>' + '</ol>'
                var submitDiv = iframeDoc.createElement("div");
                var inputPin = iframeDoc.createElement("input");
                var submitBt = iframeDoc.createElement("Button");
                submitBt.textContent = "SAVE";
                submitBt.addEventListener("click", function (e) {
                    tw.getAccessToken(inputPin.value.replace(/\s/g, ""), function () {
                        div.innerHTML += "success!";
                        location.reload();
                    });
                }, false)
                submitDiv.appendChild(inputPin);
                submitDiv.appendChild(submitBt);
                div.appendChild(imgOauth);
                div.appendChild(submitDiv);
                iframeDoc.body.appendChild(div);
            }

            function addCSS(context, css) {
                if (!context) {
                    context = document;
                }
                if (context.createStyleSheet) { // for IE
                    var sheet = context.createStyleSheet();
                    sheet.cssText = css;
                    return sheet;
                } else {
                    var sheet = context.createElement('style');
                    sheet.type = 'text/css';
                    var _root = context.getElementsByTagName('head')[0] || context.documentElement;
                    sheet.textContent = css;
                    return _root.appendChild(sheet).sheet;
                }
            }

            function makeFrame(callback/*(iframeTag, window, document)*/, name, debug) {
                function testInvasion() {
                    iframe.removeEventListener("load", done, true);
                    var message = ((new Date) - load.start) + "ms passed, ";
                    try { // probe for security violation error, in case mozilla struck a bug
                        var url = unsafeWindow.frames[framename].location.href;
                        message += url == "about:blank" ? "but we got the right document." :
                                   "and we incorrectly loaded " + url;
                        done();
                    } catch (e) {
                        document.body.removeChild(iframe);
                        makeFrame(callback, name);
                    }
                }

                function done() {
                    clearTimeout(load.timeout);
                    var win = unsafeWindow.frames[framename];
                    var doc = iframe.contentWindow.document;
                    var esframeName = "'" + framename + "'";
                    var xImg = doc.createElement("img");
                    xImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAATElEQVQoka2RSQ4AIAgD+f+jp96M0aq49AgdUiB0qZCkONQ/EBAwDOrrU7A1uZqN2hodtNwRqNdz0VOg62+jzuDUcVzkf+/I6h28UQHjW25Gob5AIAAAAABJRU5ErkJggg=="
                    xImg.setAttribute("onclick", "parent.document.getElementsByName(" + esframeName + ")[0].style.display='none';");
                    xImg.id = "close";
                    doc.body.appendChild(xImg);
                    callback(iframe, win, doc);
                }

                var iframe = document.createElement("iframe");
                var framename = iframe.name =
                    typeof name != "undefined" ? name : ("pane" + (makeFrame.id = (makeFrame.id || 0) - 1));
                iframe.setAttribute("style", "overflow:auto;z-index:25678; border:1px solid; margin:0; padding:15px;top:auto; right:auto; bottom:auto; left:auto;background-color:#fff;");
                iframe.src = "about:blank";
                iframe.addEventListener("load", done, true);
                var frames = makeFrame.data || {};
                var load = frames[framename] || {
                    start: new Date,
                    sleepFor: 400
                };
                load.timeout = setTimeout(testInvasion, load.sleepFor);
                load.sleepFor *= 1.5;
                frames[framename] = load;
                makeFrame.data = frames;
                document.body.appendChild(iframe);
            }
        })();
        return;
    } else {
        GM_registerMenuCommand("またニコ見てる:OAuth reset", function () {
            tw.deleteAccessor();
            alert("delete OAuth token");
        });
    }
    // ↓↓↓↓Your Script↓↓↓↓
    function format0(str, len) {
        return ('_' + Math.pow(10, len) + str).slice(-len);
    }

    GM_addStyle('.matanico_button {' + 'border-radius:3px 3px 3px 3px;' + 'background-color:#F7F7F7;' + 'background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACXUlEQVQ4jY2TP2gTYRiHbygiqKO04KibgSI46w1OUnCrU0RoF4NXbEtDJRTrkKLoEP8UCdkOYgVDI+1ip5Ro9axQ21xyiWlrEmiSmlybkGsvd5f3u59D0tZgLH3h4Vs+Hn7v+70fx7XK5/N1K4rypPy7sKJuF7+l0+kxl8t1ljtJ8Tx/eldVgwCQqQNbJgAA0WjUeyJBMBi8BptpXyvAaJzgUQjrOlDf07a8Xq+D4zgukUicikQiXR0F8/MfbluWxYJ54N4awbVGWCjZgE2sVtn5bOzvh/W92nxFVWeTyaTgdrvPtQnC4XC/ZZo0UwDuxwhDMuHdFiGnAzkDyOjALx1QG83WYrHYK57nuzoKhBhhNE4YSxDGlSPcCcJEkrCqAcwya1NTU9ePFQzHm0n+ZvAHIZgHGBHeTE/f/a9gJE54qBAmU4RHLSaSBG+aIaUDDaOuCYJw49gZzBYZKpaNsmGj1EIjwDLNhiiKfo7jzhwK5ubm+k3TpLctgRAjLJQYOlV0cTHscDi6215BFMWbZFlmePsowYtNhmIdMBigUxOTAdSwdpeWPg21CQRBuMiMek7ZA0ZkwgOZMCwTJlMMzzcYnm0wPF1neLnJkDEAZhpFQRCutEmWJek1ALwv2IcphuRmOwcMrhJm8gCjBgKBwJ02wcDAwCW1XFphAD6WgccphtE4HTLc2g2pCoAsy+Px3PpnpZ1O59VsJvMFAGo28FMHZA2Ia80zZzQHKUnSQk9Pz/mO/6Kvr++C3+8f/74sRQq5rFKr7qRr1Z20Vq2s53NZJRQKib29vZcP7v8ByrZxV1MiGtUAAAAASUVORK5CYII=");' + 'background-repeat:no-repeat;' + 'background-position:5px 3px;' + 'float:left;' + 'border:1px solid #D8D8D8;' + 'color:#555555 !important;' + 'font-size:12px;' + 'height:22px;' + 'width:70px;' + 'line-height:22px;' + 'margin-right:6px;' + 'padding:0 6px 0 26px;' + 'cursor:pointer;' + 'text-decoration:none !important;' + '}' + '/* clearfix ハック */' + '.clearfix:after {' + 'content: ".";  /* 新しい要素を作る */' + 'display: block;  /* ブロックレベル要素に */' + 'clear: both;' + 'height: 0;' + 'visibility: hidden;/*表示はしない*/' + '}');
    var videoTitle = document.querySelector(".videoHeaderTitle");
    if (!videoTitle) {
        return;
    }
    var div = document.createElement("div");
    div.setAttribute("class", "clearfix");
    var pTag = document.createElement('p');
    pTag.setAttribute("class", "matanico_button");
    pTag.textContent = "+また見てる";
    pTag.addEventListener('click', function miteruClick(evt) {
        var videoJSON = JSON.parse(document.querySelector("#watchAPIDataContainer").innerHTML);
        var videoDetail = videoJSON["videoDetail"];
        if (typeof videoDetail === "undefined") {
            GM_log("プレイヤーの初期化が済んでないがまたニコがバグってます");
            return;
        }
        evt.currentTarget.removeEventListener('click', miteruClick, false);
        var url = "http://nico.ms/" + videoDetail["v"];
        var subject = videoDetail["title"];
        var len = videoDetail["length"];
        var lmin = Math.floor(len / 60);
        var lsec = len % 60;
        var vinfo = 'またニコニコ動画見てる : ' + subject + ' ' + url + ' (' + format0(lmin, 2) + ':' + format0(lsec, 2) + ')';
        var text = document.createElement('input');
        text.type = 'text';
        text.value = '';
        text.size = 40;
        text.setAttribute('maxlength', 140);
        text.style.marginTop = "2px";
        pTag.textContent = "また見てる";
        var counter = document.createElement('span');
        counter.textContent = vinfo.length;
        text.addEventListener("keyup", function () {
            counter.textContent = vinfo.length + text.value.length;
        }, false);
        pTag.addEventListener('click', function () {
            tw.xhr({
                method: 'POST',
                url: 'https://api.twitter.com/1.1/statuses/update.json',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    status: vinfo + ((text.value.length > 0) ? ' ' + text.value : '')
                },
                onload: function (res) {
                    GM_log(res.status + ':' + res.statusText);
                },
                onerror: function (res) {
                    GM_log(res.status + ':' + res.statusText);
                }
            });
            div.parentNode.removeChild(this.parentNode);
        }, false);
        div.appendChild(text);
        div.appendChild(counter);
        text.focus();
    }, false);
    div.appendChild(pTag);

    var apPoint = document.querySelector("#videoHeader");
    apPoint.insertBefore(div, apPoint.firstChild);
})();
