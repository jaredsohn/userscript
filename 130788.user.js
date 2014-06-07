/*

Following code belongs to Avatars Enhancer and In Your Circles for Google+.
Copyright (C) 2012 Jackson Tan
Copyright (C) 2012 Simon Chan
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
// @id             AvatarsEnhancernInYourCircles
// @name          Avatars Enhancer and In Your Circles for Google+ (Lite)
// @version        4.6.6
// @namespace      gplus.avatarsEnhancer
// @author         Jackson Tan and Simon Chan
// @description    Everything seems a little bit better after you installed this userscript! Repleace all avatars with their HD version, display them on your G+ and restore In your circles section. Now with integrated GIF avatars support and other great stuff!
// @include        https://plus.google.com/*
// @exclude        /https://plus\.google\.com(/u/\d+)?/?stream/circles/.+/i
// @exclude	       /https://plus\.google\.com(/u/\d+)?/?b/.+/i
// @run-at         document-end
// ==/UserScript==

var languagePairs = {
    '中文（简体）': { head: '您圈子中的成员', foot: '查看全部 ›' },
    '中文（香港）': { head: '在你的社交圈中', foot: '檢視全部 ›' },
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
                for (var i = 0; i < Math.min(userptr.length, 54) ; i++) {
                    var userid = userptr[i][0][2];
                    var username = userptr[i][2][0];
                    var userimg = userptr[i][2][8];
	    var imgid = 'gbimg' + i
                    userimg = userimg.replace('/photo.jpg', '/s128-c-k/photo.jpg');
                    var tmp1 = '<div class="zydNib c-wa-Da bR9QU k-U-C" colindex="6"><a href="./' + userid + '" class="k-Qf-C-RySO6d oP" oid="' + userid + '"><img src="' + userimg + '" width="64px" height="64px" alt="' + username + '" class="aVKJCc w6iMxb" id="' + imgid + '" oid="' + userid + '"></a></div>';
                    html += tmp1;
                }
                html += '</div></div><div class="bTN3xe"></div></div></div></div>';
                var nav_wrap = document.createElement('div');
                nav_wrap.innerHTML += '<div class="fdNnh v0FITe" componentid="0"><div class="cQL36b w5faHc"><div class="wE0Ho aBjVhf"><span class="p539Qb p4GMSe mxeerd"><span>' + matchPair.head + '</span></span><span role="button" class="c-C FbRuFf USIcmb" title="View all" tabindex="0">' + '<a href="/circles/" asrc="circleproperties">' + matchPair.foot + '</a>' + '</span></div>' + html + '</div></div>';
	setInterval(function() {
		if (document.getElementsByClassName('mB4rMc').length == 0) {
           			var container = document.querySelector('div[class="GPInYc KBMoYc c-wa-Da Yf96sb"]');
			container.insertBefore(nav_wrap, container.childNodes[0]);
		}
	}, 2000);
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

var css_Stream_Profile_Photo = ".whEvwf, .AI5FJe {\nheight: 69px !important;\nmargin-left: -80px !important;\nwidth: 69px !important;\n}\n\n.Wl .tg:hover {\n-webkit-transform:scale(1.5);\n-moz-transform:scale(1.5);\n-o-transform:scale(1.5);\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\n}\n}";

var css_Profile_Photo_Animations = ".k-Qf-C-RySO6d.oP :hover {\n-webkit-transform:scale(1.5);\n-moz-transform:scale(1.5);\n-o-transform:scale(1.5);\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\n}\n}";

var css_Upper_Right = ".aBjVhf {\nwidth: 266px !important;\n}\n\n.mB4rMc {\nwidth: 266px;\n}\n\n.Yf96sb {\npadding-top: 20px !important;\n}\n\n.Gn.AkM0qf.c-wa-Da, .uVaJZ {\nwidth: 48px !important;\nheight: 48px !important;\n}\n\n#gbimg0, #gbimg1 {\nwidth: 128px;\nheight: 128px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n}\n\n#gbimg2, #gbimg3, #gbimg4 {\nwidth: 85.33px;\nheight: 85.33px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n}\n\n#gbimg5, #gbimg6, #gbimg7, #gbimg8 {\nwidth: 64px;\nheight: 64px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n}\n\n#gbimg9, #gbimg10, #gbimg11, #gbimg12, #gbimg13 {\nwidth: 51.2px;\nheight: 51.2px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n}\n\n#gbimg14, #gbimg15, #gbimg16, #gbimg17, #gbimg18, #gbimg19 {\nwidth: 42.66px;\nheight: 42.66px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n}\n\n#gbimg20, #gbimg21, #gbimg22, #gbimg23, #gbimg24, #gbimg25, #gbimg26 {\nwidth: 36.57px;\nheight: 36.57px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n}\n\n#gbimg27, #gbimg28, #gbimg29, #gbimg30, #gbimg31, #gbimg32, #gbimg33, #gbimg34 {\nwidth: 32px;\nheight: 32px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n}\n\n#gbimg35, #gbimg36, #gbimg37, #gbimg38, #gbimg39, #gbimg40, #gbimg41, #gbimg42, #gbimg43 {\nwidth: 28.44px;\nheight: 28.44px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n}\n\n#gbimg44, #gbimg45, #gbimg46, #gbimg47, #gbimg48, #gbimg49, #gbimg50, #gbimg51, #gbimg52, #gbimg53 {\nwidth: 25.6px;\nheight: 25.6px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n}\n}";

var css_Settings_Card_Your_Photo = "#gbmpi {\nheight: 128px !important;\nwidth: 128px !important;\n}\n}";

var css_Mention_List = ".z-ea-N {\nheight: 48px !important;\nwidth: 48px !important;\n}\n}";

var css_Notification_Photos_and_Border = ".Z2Pj3d.Xm.Lu {\nborder: 0px solid #444 !important;\nheight: 56px !important;\nwidth: 56px !important;\nmargin-top: -6px !important;\n}\n\n.Wm {\nheight: 56px !important;\nwidth: 56px !important;\n}\n\n.WtbUqb.Wm.F76eVc.Gf {\nborder: 0px solid black !important;\ntop: -2px !important;\nleft: 4px !important;\n}\n\n.WtbUqb.Wm.G31rIe.Gf {\nborder: 0px solid #3D3D3D !important;\ntop: -4px !important;\nleft: 2px !important;\n}\n\n.Gf.Lu {\nheight: 56px !important;\nwidth: 56px !important;\nmargin-top: -6px !important;\n}\n\n.WtbUqb.Wm.F76eVc {\nborder: 0px solid black !important;\ntop: -2px !important;\nleft: 4px !important;\n}\n\n.WtbUqb.Wm.G31rIe {\nborder: 0px solid #3D3D3D !important;top: -4px !important;\nleft: 2px !important;\n}\n\n.wE.dPbJNd.iK.ek {\nwidth: 56px !important;\nheight: 56px !important;\n}\n\n.dPbJNd.iK.ek.Lu {\nwidth: 56px !important;\nheight: 56px !important;\n}\n\nspan.Xm, img.Xm {\nborder: 0px solid #444 !important;\n}\n\ndiv.Gf.no {\nheight: 52px !important;\nwidth: 52px !important;\n}\n}";

var css_Notifications_Animations = "#gbgs1 {\n-webkit-transform:scale(1) rotate(-360deg);-moz-transform:scale(1) rotate(-360deg);-o-transform:scale(1) rotate(-360deg);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbgs1:hover {\n-webkit-transform:scale(2) rotate(360deg);-moz-transform:scale(2) rotate(360deg);-o-transform:scale(2) rotate(360deg);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n.yuRGNe.aErCSb.bpyJlc.pg:hover {\n background-color: red;\n -webkit-transition: background-color 1s linear, color 1s linear, width 1s linear;\n -moz-transition: background-color 1s linear, color 1s linear, width 1s linear;\n -o-transition: background-color 1s linear, color 1s linear, width 1s linear;\n-webkit-transition-duration:1s;\n-moz-transition-duration:1s;\n-o-transition-duration:1s;\n}\n\n.yuRGNe.aErCSb.bpyJlc:hover {\n background-color: aqua;\n -webkit-transition: background-color 1s linear, color 1s linear, width 1s linear;\n -moz-transition: background-color 1s linear, color 1s linear, width 1s linear;\n -o-transition: background-color 1s linear, color 1s linear, width 1s linear;\n-webkit-transition-duration:1s;\n-moz-transition-duration:1s;\n-o-transition-duration:1s;\n}\n}";

var css_Buttons_Animations = ".c-wa-Da.b-a.b-a-ga.b-a-x:hover, .c-wa-Da.b-a.b-a-G:hover, .c-wa-Da.b-a.b-a-ga:hover, .nfkPhe.dZtwwe:hover {\n-webkit-transform: scale(1.2);\n-moz-transform: scale(1.2);\n-o-transform: scale(1.2);\n-webkit-transition-duration:.0s;\n-moz-transition-duration:.0s;\n-o-transition-duration:.0s;\n}\n\n.nfkPhe.dZtwwe:hover {\n-webkit-transform: scale(1.2);\n-moz-transform: scale(1.2);\n-o-transform: scale(1.2);\n-webkit-transition-duration:.5s;\n-moz-transition-duration:.5s;\n-o-transition-duration:.5s;\n}\n}";

var css_Share_Box_Animations = ".e-dd {\nbackground: white;\n-webkit-transition: background-color 1s linear, color 1s linear, width 1s linear !important;\n-moz-transition: background-color 1s linear, color 1s linear, width 1s linear !important;\n-o-transition: background-color 1s linear, color 1s linear, width 1s linear !important;\n}\n\n.e-dd:hover {\nbackground: aqua;\n-webkit-transition: background-color 1s linear, color 1s linear, width 1s linear;\n-moz-transition: background-color 1s linear, color 1s linear, width 1s linear;\n-o-transition: background-color 1s linear, color 1s linear, width 1s linear;\n}\n}";

var css_Notifications_Resize_Arrangement = ".vI7nae.Xv6LFe {\nwidth: 600px !important;\n}\n\n#gbd1 {\nwidth: 600px !important;\n}\n\n#gbwc {\nright: 6px !important;\nwidth: 600px !important;\n}\n\n.fhESX.Vm.AE {\nmargin-left: 42px !important;\n}\n\n.UE {\nwidth: 560px !important;\n}\n\n.wo {\nmargin-left: 15px !important;\n}\n\n.b-a {\nmargin-left: 15px !important;\n}\n}";

var css_Remove_Photos_Border = ".VepHtd {\nbackground-color: white !important;\n}\n}";

var css_Comment_Box_Animations = ".Ln {\nheight: 30px;\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\n}\n\n.Ln:hover {\nheight: 58px;\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\n}\n}";

var css_Suggestions_Text_Arrangement = ".WjzT8d {\nmargin-left: 20px !important;\n}\n\n.oIZr7 {\nmargin-top: 20px !important;\n}\n}";

var css_Photo_Wall = ".cPNSIc {\nmin-height: 180px !important;\nwidth: 940px !important;\n}\n\n.MWS50d {\nheight: 180px !important;\nwidth: 180px !important;\nmargin-right: 0px !important;\n}\n\n.G3royc {\nheight: 180px !important;\nwidth: 180px !important;\n}\n\n.ZOU1gd {\nmargin-top: 0px !important;\n}\n\n.SyKwbb {\nwidth: 0px !important;\n}\n}";

GM_addStyle(css_Stream_Profile_Photo);
GM_addStyle(css_Profile_Photo_Animations);
GM_addStyle(css_Upper_Right);
GM_addStyle(css_Settings_Card_Your_Photo);
GM_addStyle(css_Mention_List);
GM_addStyle(css_Notification_Photos_and_Border);
GM_addStyle(css_Notifications_Animations);
GM_addStyle(css_Buttons_Animations);
GM_addStyle(css_Share_Box_Animations);
GM_addStyle(css_Notifications_Resize_Arrangement);
GM_addStyle(css_Remove_Photos_Border);
GM_addStyle(css_Comment_Box_Animations);
GM_addStyle(css_Suggestions_Text_Arrangement);
GM_addStyle(css_Photo_Wall);

function replaceImg(target) {
    if (target && target.src) {
        var distHeight = target.clientHeight != 0 ? target.clientHeight * 2 : 64;
        target.src = target.src.replace(/s\d{2,}-c-k/g, 's' + distHeight + '-c')
            .replace('photo.jpg', 'photo.gif')
            .replace(/\?sz=\d{2,}/, '');
        return target.src;
    }
}

function batchReplace(targets) {
    if (targets && targets.length)
        for (var i = 0; i < targets.length ; i++)
            replaceImg(targets[i]);
}

//Speacial preprocessing for Webkit Browsers.
batchReplace(document.body.getElementsByClassName('whEvwf')); // Stream Profile Photo
batchReplace(document.body.getElementsByClassName('AI5FJe')); // Others Stream Profile Photo
batchReplace(document.body.getElementsByClassName('kM5Oeb-wsYqfb')); // In Your Circles Profile Page Photos

document.body.addEventListener('DOMNodeInserted', function (e) {
    if (e.target.nodeType != 3 && e.target.tagName == 'DIV') {
        batchReplace(e.target.getElementsByClassName('whEvwf')); // Your Stream Profile Photo
        batchReplace(e.target.getElementsByClassName('AI5FJe')); // Others Stream Profile Photo
        batchReplace(e.target.getElementsByClassName('uVaJZ')); // Profile Photo in Comments and In Your Circles
        batchReplace(e.target.getElementsByClassName('FN51Rd')); // Profile Photo in Hover Card
        batchReplace(e.target.getElementsByClassName('Lu')); // Notifications Profile Photos
        batchReplace(e.target.getElementsByClassName('SgDkYe')); // Large Profile Photo in Settings
        batchReplace(e.target.getElementsByClassName('z-ea-N')); // Profile Photos in Mention List
        batchReplace(e.target.getElementsByClassName('aVKJCc')); // In Your Circles Profile Photos
    }
}, false);

var time_div = document.createElement('div');
time_div.className = "time"
time_div.style.font = '30px arial,sans-serif';
time_div.style.fontWeight="bold";
time_div.style.height = '12px';
time_div.style.color = '#656565';
time_div.style.margin = '25px 0 0 155px';
var H,M,S;
setInterval(function() {
	if (document.getElementsByClassName('time').length == 0) {
           		var time_container = document.querySelector('div[class="L9ru2b c-wa-Da"]');
		time_container.insertBefore(time_div, time_container.childNodes[0]);
	}
}, 2000);

function fillZero(v) {
	if(v<10){
	v='0'+v;
	}
	return v;
}

function setTime() {
var currentTime = new Date();
H = fillZero(currentTime.getHours());
M = fillZero(currentTime.getMinutes());
S = fillZero(currentTime.getSeconds());
time_div.innerHTML =H+':'+M+':'+S;
}
setInterval(setTime,1000);