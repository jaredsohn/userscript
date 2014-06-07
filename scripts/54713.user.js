// ==UserScript==
// @name           Instapaper in Google Reader
// @namespace      
// @description    Add to instapaper from google reader.
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
                GoogleReader.makeInstapaperButton('add', box, content);
            }, ((GoogleReader.expanded)? 500 : 0));
        }, false);
        window.addEventListener('keypress', function(e) {
            if(e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') return;
            if(e.which == 27 && Instapaper.bezel) Instapaper.bezel.erase();
            var k = String.fromCharCode(e.which);
            if(!k || k.toUpperCase() != Instapaper.keyForAction) return;
            var c = $('current-entry');
            var x = getElementsByXPath('.//span[contains(@class,"instapaper-button")]', c);
            if(!x) return;
            Instapaper['add'](c);
            
        }, false);
    },
    makeInstapaperButton: function(action, target, content) {
        var t = document.createElement('span');
        t.className = 'instapaper-button-' + action + ' link';
        t.style.cssText = 'padding:1px 8px 1px 16px;'
            + 'background-image:url("' + Instapaper['addButtonImage'] + '");'
            + 'background-color:transparent; background-position:0pt 50%; background-repeat:no-repeat;';
        t.appendChild(document.createTextNode('Add to Instapaper'));
        t.addEventListener('mousedown', function() { Instapaper['add'](content) }, false);
        target.appendChild(t);
    }
};

var Instapaper = {
    addUrlBase: 'https://www.instapaper.com/api/add',
    keyForAction: 'I',
    addButtonImage: ['data:image/png,',
        '%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06',
        '%00%00%00%1F%F3%FFa%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gA',
        'MA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%0',
        '0%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p',
        '%9C%BAQ%3C%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00',
        '%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00%8',
        '4IDAT8Oc%60%18%B4%E0%DD%9Bw%FFa%18%E4Hd6AG%3F%7B%F2%EC%FF%CE%DD%',
        '3B%E1%F8%C0%BE%03%FF%9F%3D%B9%0F6%90%A0f%90%82%D7%2F%9F%FD_%B4h%',
        'D1%FF%EE%DE%EE%FF%93%A7N%06%B3%AF_%BDN%BC%01%20C%40%AE%00%19%00%',
        'C2%20%CDD%D9%8C%AC%08%DD%00%90%ABH2%04f%00%C8%0B%24%3B%1F%D9%0B%',
        '14%1B%00%0B%03%B2%BD%40V%20R%1C%8D%14%27%24%E4%A4%0BK%7D%24%25e%',
        '92%E2%9BR%C5%00%82%C7%DB%C3L%A1%1D%CB%00%00%00%00IEND%AEB%60%82'
    ].join(''),
    bezel: null,
    add: function(content) {
        var link = getElementsByXPath('.//a[contains(@class,"entry-title-link")]', content)[0];
        var s = window.getSelection().toString();
		var username = Instapaper.getUsername();
		var password = Instapaper.getPassword();
        var url = Instapaper.addUrlBase + 
                  '?username=' + encodeURIComponent(username);
        if (password != '') 
        { url +=  '&password=' + encodeURIComponent(password); }
        url +=    '&url=' + encodeURIComponent(link.href) +
                  '&title=' + encodeURIComponent(link.innerHTML.replace(/<[^>]*>/g, '')) +
                  '&selection=' + encodeURIComponent(s);
        Instapaper.prepare();
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(r) {
                Instapaper.show(Instapaper.modifyAddHTML(r.responseText));
            }
        });
    },
    prepare: function() {
        if(!Instapaper.bezel) {
            var f = Instapaper.bezel = document.createElement('iframe');
            f.id = 'instapaper-bezel';
            var b = document.createElement('div');
            b.id = 'instapaper-bezel-box';
            b.appendChild(f);
            document.body.appendChild(b);
            
            var css = <><![CDATA[
              #instapaper-bezel {
                position: fixed;
                left: 10px;
                top: 10px;
                width:168px;
                height: 100px;
                z-index: 2147483647;
                border: 3px solid #aaa;
              }
            ]]></>;
            GM_addStyle(css.toString());
            f.show = function() {
                b.style.display = 'block';
                f.style.border = '3px solid #aaa';
				f.style.left = '10px';
            }
            f.hide = function() {
                b.style.display = 'none';
                f.style.border = '0px';
				f.style.left = '-400px';
            }
            f.erase = unsafeWindow.eraseInstapaperFrame = function() {setTimeout(function() {
                b.style.left = 'none';
                f.style.border = '0px';
				f.style.left = '-400px';
				f.src = 'about:blank';
                window.focus();
            }, 350);
            }
        }
        Instapaper.show(Instapaper.loadingMessage());
        return Instapaper.bezel;
    },
    show: function(html) {
        Instapaper.bezel.src = 'data:text/html;,' + encodeURIComponent(html);
        Instapaper.bezel.show();
    },
    modifyAddHTML: function(s) {
        var script =
        <script type="text/javascript">
        <![CDATA[
            window.parent.eraseInstapaperFrame();
            window.focus();
        ]]>
        </script>.toXMLString();
        var start = '<html>';
        var body_start = '<body style="color: #555; background-color: #fff; text-align: center; margin: 0px; font-family: Georgia, Times, serif; font-size: 26px;">' +
        '<div style="text-align: center; width: 80%; padding-bottom: 1px; margin: 0 auto 15px auto; font-size: 13px; border-bottom: 1px solid #ccc; color: #333;">Instapaper</div>';
        var body_end = '</body>';
        var end = '</html>';
        s = s.replace(/201/, 'Saved!');
        s = s.replace(/403/, 'Invalid login!');
        s = s.replace(/500/, 'Server Error!');
        return start + script + body_start + s + body_end + end;
    },
    loadingMessage: function() {
        var html = 
        <html>
        <head>
        <script type="text/javascript">
        <![CDATA[
            var r = window.parent.eraseInstapaperFrame;
            window.addEventListener('keydown', function(e) { if(e.which == 27) r() }, false);
            window.focus();
        ]]>
        </script>
        </head>
        <body style="color: #555; background-color: #fff; text-align: center; margin: 0px; font-family: Georgia, Times, serif; font-size: 26px;">
        <img style="display: block; position: fixed; bottom: 4px; left: 72px;" src="data:image/gif;base64,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"/>
        <div style="text-align: center; width: 80%; padding-bottom: 1px; margin: 0 auto 15px auto; font-size: 13px; border-bottom: 1px solid #ccc; color: #333;">Instapaper</div>
        Saving...
        </body>
        </html>;
        return html.toXMLString();
    },
	getUsername: function() {
		var username = GM_getValue('username');
		var password = GM_getValue('password');
		if (username == '' || username == undefined) {
			username = prompt("Email or username:");
			username = username || '';
			password = prompt("Password, if you have one:");
			password = password || '';
			GM_setValue('username', username);
			GM_setValue('password', password);
		}
		return username;	
	},
	getPassword: function() {
		//we don't prompt for a password here because it's possible (and likely) that password is blank
		return GM_getValue('password');
	},
};

GoogleReader.register();
GM_registerMenuCommand("Clear Instapaper Login", 
					   clearInstapaperLogin);
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

function clearInstapaperLogin() {
	GM_setValue('username', '');
	GM_setValue('password', '');
	alert('Instapaper login cleared. You will be prompted for your login info the next time you add to Instapaper.');	
}

function log(s) { (console)? console.log(s) : GM_log(s) }
