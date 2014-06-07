/*

Following code belongs to In Your Circles for Google+.
Copyright (C) 2012 Jackson Tan
Copyright (C) 2012 Keita Kagurazaka
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @id             InYourCircles880
// @name          In Your Circles for Google+ (880 People Ver.)
// @version        1.0.2
// @namespace      gplus.inYourCircles
// @author         Jackson Tan
// @description    Restore In your circles section (880 people version)
// @include        https://plus.google.com/*
// @exclude        /https://plus\.google\.com(/u/\d+)?/?stream/circles/.+/i
// @exclude	       /https://plus\.google\.com(/u/\d+)?/?b/.+/i
// @run-at         document-end
// ==/UserScript==

var languagePairs = {
    '简体中文': { head: '您圈子中的成员', foot: '查看全部 ›' },
    '繁體中文': { head: '在你的社交圈中', foot: '檢視全部 ›' },
    '日本語': { head: 'あなたのサークル内', foot: 'すべて表示 ›' },
    'Default': { head: 'In your circles', foot: 'View all ›' }
}

if (document.URL.match(/https:\/\/plus\.google\.com(\/u\/\d)?/)) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: document.URL.match(/https:\/\/plus\.google\.com(\/u\/\d)?/)[0] + '/_/socialgraph/lookup/circles/?ct=2&m=true&tag=fg&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j',
        onload: function (response) {
            var arr = eval('//' + response.responseText);
            var userptr = arr[0][1][2];
            var matchPair;
            if (document.getElementsByClassName('Rz7Px').length > 0) {
                matchPair = languagePairs[document.getElementsByClassName('Rz7Px')[0].innerHTML];
                if (!matchPair)
                    matchPair = languagePairs['Default'];
            }
            else
                matchPair = languagePairs['Default'];
            var container = document.querySelector('div[class="GPInYc KBMoYc c-wa-Da Yf96sb"]');
                var html = '<div class="ECUHhe UINLIb"><div class="LrhLj"><div class="FdQ1nc oIZr7 jxootc" rowindex="0"><div><div class="mB4rMc">';
                for (var i = 0; i < Math.min(userptr.length, 880) ; i++) {
                    var userid = userptr[i][0][2];
                    var username = userptr[i][2][0];
                    var userimg = userptr[i][2][8];
                    userimg = userimg.replace('/photo.jpg', '/s96-c-k/photo.jpg');
                    var tmp1 = '<div class="zydNib c-wa-Da bR9QU k-U-C" colindex="6"><a href="./' + userid + '" class="k-Qf-C-RySO6d oP" oid="' + userid + '"><img src="' + userimg + '" width="48px" height="48px" alt="' + username + '" class="aVKJCc w6iMxb" oid="' + userid + '"></a></div>';
                    html += tmp1;
                }
                html += '</div></div><div class="bTN3xe"></div></div></div></div>';
                var nav_wrap = document.createElement('div');
                nav_wrap.innerHTML += '<div class="fdNnh v0FITe" componentid="0"><div class="cQL36b w5faHc"><div class="wE0Ho aBjVhf"><span class="p539Qb p4GMSe mxeerd"><span>' + matchPair.head + '</span></span><span role="button" class="c-C FbRuFf USIcmb" title="View all" tabindex="0">' + '<a href="/circles/" asrc="circleproperties">' + matchPair.foot + '</a>' + '</span></div>' + html + '</div></div>';
				container.insertBefore(nav_wrap, container.childNodes[0]);
        }
    });
}

document.addEventListener("click", function(_event) {
	var o = document.querySelector('div[class="mB4rMc"]');
	setTimeout(function() {
	if (typeof(o) == 'undefined') {
		container.insertBefore(nav_wrap, container.childNodes[0]);
		}
	}, 1000);
}, false);

var css_Upper_Right = ".mB4rMc {\nwidth: 400px !important;\n}\n\n.Yf96sb {\npadding-top: 20px !important;\n}\n\n.Gn.AkM0qf.c-wa-Da, .uVaJZ {\nwidth: 48px !important;\nheight: 48px !important;\n}";

GM_addStyle(css_Upper_Right);