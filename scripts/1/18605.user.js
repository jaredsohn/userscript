// ==UserScript==
// @name           Tumblr on Google Reader
// @namespace      http://userscripts.org/users/40991
// @description    Share and reblog to your tumblr from your google reader.
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// ==/UserScript==

var GoogleReader = {
    expanded: false,
    register: function() {
        $('chrome').addEventListener('DOMNodeInserted', function(e) {
            var box, content;
            if(e.target.id == 'scroll-filler') {
                if(!/http%3A%2F%2F/.test(location.href)) return;
                var link = 'http://' + decodeURIComponent(location.href.split(/http%3A%2F%2F/)[1]);
                Tumblr.checkUrl(link);
                return;
            } else if(/entry-actions/.test(e.target.className)) {
                content = getElementsByXPath('.//div[contains(@class,"entry-container")]', e.target.parentNode)[0];
                box = e.target, GoogleReader.expanded = false;
            } else if(/entry/.test(e.target.className)){
                var x = getElementsByXPath('.//div[contains(@class,"entry-actions")]', e.target);
                if(x) box = x[0], content = e.target, GoogleReader.expanded = true;
            }
            if(!box) return;
            window.setTimeout(function() {
                var a = (Tumblr.owns(getElementsByXPath('.//a[contains(@class,"entry-title-link")]', content)[0].href))? 
                    'reblog' : 
                    'share';
                GoogleReader.makeTumblrButton(a, box, content);
            }, ((GoogleReader.expanded)? 500 : 0));
        }, false);
        window.addEventListener('keypress', function(e) {
            if(e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') return;
            if(e.which == 27 && Tumblr.bezel) Tumblr.bezel.erase();
            var k = String.fromCharCode(e.which);
            if(!k) return;
            var forceReblog = (k == Tumblr.keyForAction)? false : (k == Tumblr.keyForForceReblog)? true : null;
            var c = $('current-entry');
            if(typeof(forceReblog) != 'boolean' || !c) return;
            var x = getElementsByXPath('.//span[contains(@class,"tumblr-button")]', c);
            if(!x) return;
            var a = (/tumblr-button-reblog/.test(x[0].className))? 'reblog' : 'share';
            Tumblr[a](c, forceReblog);
            
        }, false);
    },
    makeTumblrButton: function(action, target, content) {
        var t = document.createElement('span');
        t.className = 'tumblr-button-' + action + ' link';
        t.style.cssText = 'padding:1px 8px 1px 16px;'
            + 'background-image:url("' + Tumblr[action + 'ButtonImage'] + '");'
            + 'background-color:transparent; background-position:0pt 50%; background-repeat:no-repeat;';
        t.appendChild(document.createTextNode((action == 'share')? 'Share on Tumblr' : 'Reblog'));
        t.addEventListener('mousedown', function() { Tumblr[action](content) }, false);
        target.appendChild(t);
    }
};

var Tumblr = {
    reblogWithConfirm: true,
    keyForAction: 'T',
    keyForForceReblog: 'R',
    reblogUrlBase: 'http://www.tumblr.com/reblog/',
    shareUrlBase: 'http://www.tumblr.com/share',
    reblogButtonImage: ["data:image/png,",
        "%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%0",
        "2%00%00%00%90%91h6%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00",
        "%00%00%09pHYs%00%00%0E%C4%00%00%0E%C4%01%95%2B%0E%1B%00%00%01%2",
        "0IDATx%9C%95Q%B1%AA%83%40%10%DC%93%83h!%89%87%D8%5BXXI0%C4%C6O%",
        "C8%E7Z%F9%09%82(%A2%16%16%16B%02%A68%12%2C%8C%84%BB%7B%C5I%0A%C",
        "93%C9v%B3%3B%C30%B3H%08%01%BF%8C%F2%91q%BD%5E%7F%13%E4y~%3E%9F%",
        "BF%15PJ)%A5I%924M%237H%08Q%14E%5D%D7%1F%ADl%DB%0E%82%40%A1%94~%",
        "C3%06%00UU%01%00%23%84%24%3E%9DNoyQ%14i%9A%E6%FB%BE%AE%EB%00%80",
        "_%07%C6%18%E7%7C%C1V%14%C54%CD%FD~%8F1%BE%5C.%DB%EDv%168%8E%C39",
        "%7F%3E%9F%96e-B%1F%0E%07%00%A8%AA%AA%EB%3A%D7u%15%008%1E%8F%8E%",
        "E3%3C%1E%8F%3C%CF%17%0E%84%90%DDn'%84%E8%BANn%B0a%18%08%A1%BE%E",
        "F%CB%B2%9C%A6%89RJ%08Y%89%8E%01%A0i%9A%B6m%25%8E%E3x%85%0D%F2q%",
        "9B%CDf%9D%24%C7%F3%3C%90%8F%BB%DF%EF%C30%A4i%3A%8E%E3%7F%E5%0A!",
        "8%E7sK%8C1%5D%D7%C30%CC%B2%ECm%B9%2F%CD%EC%20%F1%EDv%03%00%CE%F",
        "9z%E8%3F%B4%19%8D%FE%40%00%9D%86%00%00%00%00IEND%AEB%60%82"
    ].join(''),
    shareButtonImage: ["data:image/png,",
        "%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%0",
        "2%00%00%00%90%91h6%00%00%00%06tRNS%00%EE%00%F0%00%EE%0B4%C2%80%",
        "00%00%00%09pHYs%00%00%0E%C4%00%00%0E%C4%01%95%2B%0E%1B%00%00%01",
        "%06IDATx%9C%9DR%3DO%C30%10%7D%C1%89rCE%D4%A1%B2%CA%C0%90%C1%03C",
        "7%8F%91%18%B23%F4%EFV%FC%81%8A%8D%01eBH%20%AC%8AB%22%3E.r-%18%0",
        "C%25q%0B(x%3A%9F%DF%BB%F7%EE%7C%D1%FAi%8D!%E7%60%10%FA%3F%84%B8",
        "%7B%B9%AE%AA%E6%99%0FG%14%C5)%80%F7M%0B%A0aV%B9%A2%11%85%84%FA%",
        "B1%BE%BC%AA%CC%CA%10%113%03%F0%01%11%A9%5C%B9%96EJ%3DK%FC%CAfeT",
        "%AE%E6gs%9F)OK%AD53%DF%DF%DD%EC%B1%F4%F6R%CB%89%D4Z'%09%B6%22%B",
        "3%93Y%FDP7%CCB%ECX%1AOdyt%9C%24%B0%16%1E%0D%C09.%8A%A2%0B%FC%26",
        "d%E3%CC%07%D6~6%00%40%08%EA%CF%E5%E7%B1z%11%E78%C8%FF%F1%0F~2%B",
        "F%11%5C%CB%8B%F3%85%B7%B4%BCX%9A%5B%83M%0F%10%07%04k!%A7RN%25%8",
        "0T%A4Y%16*D%7B%96o%5B2%FE%8A%3BeC%850%B7%F3%3Ex%F9%3E%00k%7Ca%0",
        "8%B1%9C%DF%ED%00%00%00%00IEND%AEB%60%82"
    ].join(''),
    loginUrl: 'http://www.tumblr.com/login?redirect_to=%2Fdashboard', 
    bezel: null,
    knownHosts: [/tumblr\.com/],
    unknownHosts: [],
    owns: function(link) {
        for(var x in Tumblr.unknownHosts) if(Tumblr.unknownHosts[x].test(link)) return false;
        for(var x in Tumblr.knownHosts) if(Tumblr.knownHosts[x].test(link)) return true;
        return false;
    },
    checkUrl: function(link) {
        for(var x in Tumblr.unknownHosts) if(Tumblr.unknownHosts[x].test(link)) return;
        for(var x in Tumblr.knownHosts) if(Tumblr.knownHosts[x].test(link)) return;
        var host = (/^.*:\/\/([^\/]*)/.test(link))? RegExp.$1 : '';
        setTimeout(function() {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://www.tumblr.com/check_domain?url=' + encodeURIComponent(host),
                onload: function(r) {
                    var e = new RegExp('^http://' + host);
                    var k = /This domain is configured correctly/.test(r.responseText); // Is it accurate?
                    if(k) Tumblr.knownHosts.push(e);
                    else Tumblr.unknownHosts.push(e);
                }
            });
        }, 0);
    },
    reblog: function(content, force) {
        force = force || !Tumblr.reblogWithConfirm;
        var link = getElementsByXPath('.//a[contains(@class,"entry-title-link")]', content)[0];
        var id = (/\/post\/(\d+)/.test(link.href))? RegExp.$1 : '';
        var url = link.href;
        GM_xmlhttpRequest({method:'GET', url:url, onload: function(r) {
            new RegExp('rk=([0-9a-zA-Z]*)').test(r.responseText);
            var token = RegExp.$1;
            var url = Tumblr.reblogUrlBase + id + '/' + token + '?redirect_to=%2F%20%2F';
            if(!force) Tumblr.prepare();
            else Tumblr.prepare().hide();
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(r) {
                    var h = Tumblr.modifyReblogHTML(r.responseText, force)
                    if(!force) Tumblr.show(h);
                    else Tumblr.bezel.src = 'data:text/html;,' + encodeURIComponent(h);
                }
            });
        }});
    },
    share: function(content) {
        var link = getElementsByXPath('.//a[contains(@class,"entry-title-link")]', content)[0];
        var s = window.getSelection().toString();
        var url = Tumblr.shareUrlBase + 
                '?v=3&u=' + encodeURIComponent(link.href) +
                '&t=' + encodeURIComponent(link.innerHTML.replace(/<[^>]*>/g, '')) +
                '&s=' + encodeURIComponent(s);
        Tumblr.prepare();
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(r) {
                Tumblr.show(Tumblr.modifyShareHTML(r.responseText));
            }
        });
    },
    prepare: function() {
        if(!Tumblr.bezel) {
            var f = Tumblr.bezel = document.createElement('iframe');
            f.id = 'tumblr-bezel';
            var b = document.createElement('div');
            b.id = 'tumblr-bezel-box';
            var x = document.createElement('div');
            x.id = 'tumblr-bezel-container';
            b.appendChild(f);
            document.body.appendChild(b);
            document.body.appendChild(x);
            
            var css = <><![CDATA[
              #tumblr-bezel-container {
                display: none;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                text-align: center;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1050;
                opacity: 0.8;
                background-color: #1c1428;
              }
              #tumblr-bezel-box {
                padding: 20px;
                display: none;
                margin: auto
                overflow: hidden;
                background-color: #f3f3f3;
                position: absolute;
                top: 8%;
                -moz-border-radius: 20px;
                opacity: 1;
                z-index: 1060;
                width: 450px;
                height: 430px;
              }
              #tumblr-bezel {
                border: 0;
                width:450px;
                height: 430px;
                overflow: hidden;
              }
            ]]></>;
            GM_addStyle(css.toString());
            f.show = function() {
                b.style.left = '';
                x.style.display = b.style.display = 'block';
            }
            f.hide = function() {
                b.style.left = '-9000px';
                x.style.display = 'none';
            }
            f.erase = unsafeWindow.eraseTumblrFrame = function() {
                b.style.left = '';
                x.style.display = b.style.display = 'none';
                f.src = 'about:blank';
                window.focus();
            }
            x.addEventListener('click', f.erase, false);
        }
        Tumblr.bezel.parentNode.style.marginLeft = ((document.body.clientWidth - 450) / 2) + 'px';
        Tumblr.show(Tumblr.loadingMessage());
        return Tumblr.bezel;
    },
    show: function(html) {
        Tumblr.bezel.src = 'data:text/html;,' + encodeURIComponent(html);
        Tumblr.bezel.show();
    },
    modifyShareHTML: function(s) {
        if(/<h1>[\s\n]*Log\s*in/.test(s)) return Tumblr.loginPrompt();
        s = s.replace(/<head>/, '<head><base href="' + Tumblr.shareUrlBase + '" />');
        s += 
        <script type="text/javascript">
        <![CDATA[
            var r = window.parent.eraseTumblrFrame;
            window.onunload = function() { if(saving) r() };
            window.addEventListener('keydown', function(e) { if(e.which == 27) r() }, false);
            window.focus();
        ]]>
        </script>.toXMLString();
        s = s.replace(/href="#"/g, 'href="javascript:;"');
        return s;
    },
    modifyReblogHTML: function(s, force) {
        if(/<h1>[\s\n]*Log\s*in/.test(s)) return Tumblr.loginPrompt();
        s = s.replace(/<head>/, '<head><base href="' + Tumblr.reblogUrlBase + '" />');
        s = s.replace(/\/javascript\/application\.js/, '');
        s = s.replace(/'_top'/, "''");
        s = s.replace(/urchinTracker\(\);/, '');
        if(!force) {
            s = s.replace(/global\.css/, '');
            s = s.replace(/background:.+center;/g, '');
            s = s.replace(/_500\.(\w+)"/g, '_100.$1"');  
            s += <>
            <style type="text/css">
            <![CDATA[
              #header, #footer, h1, 
              #header_container, #content_top, #content_bottom, #site_notice {
                display: none;
              }
              body {
                background-color: #f3f3f3;
                margin: 0px;
                padding: 0px;
                font: Normal 13px 'Lucida Grande', Verdana, Helvetica, sans-serif;
                width: 400px;
              }
              a {
                color: #007BFF;
                outline-width: 0px;
                -moz-outline-width: 0px;
              }
              div#container {
                background-color: #fff;
                border-right: solid 1px #ddd;
                border-bottom: solid 1px #ddd;
                position: absolute;
                top: 5px;
                left: 10px;
                right: 15px;
                padding: 0px 15px 0px 15px;
                overflow: auto;
                width: 400px;
                height: 420px;
              }
              div#container h2 {
                margin: 15px 0px 0px 0px;
                font-size: 15px;
              }
              div#container h2 span.optional {
                font-size: 10px;
                color: #bbb;
                font-style: italic;
                font-weight: normal;
              }
              div#container form {
                margin: 0px;
                padding: 0px;
              }
              textarea, input.text, input.text_field {
                width: 370px !important;
                font: Normal 12px 'Lucida Grande', Verdana, Helvetica, sans-serif;
                border: solid 1px #ccc;
                background-color: #f4f4f4;
              }
              .mceToolbarContainer {
                width: 380px !important;
              }
              div#left_column, div#right_column {
                width: 390px !important;
                margin: 5px;
              }
              div#right_column * {
                font-size: 100% !important;
                line-height: 1em;
              }
              div#right_column {
                display: none;
              }
            ]]>
            </style>
            <script type="text/javascript">
            <![CDATA[
                var saving = false;
                var r = window.parent.eraseTumblrFrame;
                window.onunload = function() { if(saving) r() };
                window.addEventListener('keydown', function(e) { if(e.which == 27) r() }, false);
                if($('save_button')) $('save_button').onclick = function() { saving = true; }
                if($('cancel_button')) $('cancel_button').onclick = function() {
                    saving = true;
                    location.href='about:blank';
                    return false;
                };
                window.focus();
            ]]>
            </script>
            </>.toXMLString();
        } else {
            s += 
            <script type="text/javascript">
            <![CDATA[
                window.onunload = window.parent.eraseTumblrFrame;
                document.getElementById('edit_post').submit();
            ]]>
            </script>.toXMLString();
        }
        return s;
    },
    loadingMessage: function() {
        var html = 
        <html>
        <head><title>Loading</title></head>
        <body style="background-color: #d5d5d5;">
          <p style="text-align:center;margin-top:200px;">
            <img src="http://assets.tumblr.com/images/loading.gif" /> loading...
          </p>
        </body>
        <script type="text/javascript">
        <![CDATA[
            var r = window.parent.eraseTumblrFrame;
            window.addEventListener('keydown', function(e) { if(e.which == 27) r() }, false);
            window.focus();
        ]]>
        </script>
        </html>;
        return html.toXMLString();
    },
    loginPrompt: function() {
        var html = 
        <html>
        <head><title>Log in</title></head>
        <body style="background-color: #d5d5d5;">
          <p style="text-align:center;margin-top:200px;">
            Please <a href={Tumblr.loginUrl} target="_blank">log in</a> first.
          </p>
        </body>
        <script type="text/javascript">
        <![CDATA[
            var r = window.parent.eraseTumblrFrame;
            window.addEventListener('keydown', function(e) { if(e.which == 27) r() }, false);
            window.focus();
        ]]>
        </script>
        </html>;
        return html.toXMLString();
    }
};

GoogleReader.register();


function $(e) {
    return document.getElementById(e);
}

function getElementsByXPath(xpath, context) {
    var nodes = [], context = context || document;
    try {
        var r = document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var i = 0; i < r.snapshotLength; nodes.push(r.snapshotItem(i++)));
    } catch(e) { log(e) }
    return nodes;
}

function log(s) { (console)? console.log(s) : GM_log(s) }
