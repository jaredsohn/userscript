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
// @id             AvatarsEnhancernInYourCircles44
// @name          Avatars Enhancer and In Your Circles for Google+ (4×4 Version)
// @version        4.0.1
// @namespace      gplus.avatarsEnhancer
// @author         Jackson Tan and Simon Chan
// @description    Everything seems a little bit better after you installed this userscript! Repleace all avatars with their HD version, display them on your G+ and restore In your circles section. Now with integrated GIF avatars support and other great stuff!
// @include        https://plus.google.com/*
// @exclude        /https://plus\.google\.com(/u/\d+)?/?stream/circles/.+/i
// @exclude	       /https://plus\.google\.com(/u/\d+)?/?b/.+/i
// @run-at         document-end
// ==/UserScript==

var css_Your_Profile_Photo = ".k-pu-NS {\nheight: 72px !important;\nmargin-right: 10px !important;\nwidth: 72px !important;\n}\n}";

var css_Stream_Profile_Photo = ".Wl .tg {\nheight: 69px !important;\nmargin-left: -74px !important;\nwidth: 69px !important;\n}\n\n.Yl {\nheight: 48px !important;\nwidth: 48px !important;\nmargin: 0 6px 0 0 !important;\n}\n}";

var css_Stream_Notification_Comment_Profile_Photo = ".hf.tg, .hf.sf {\nheight: 42px !important;\nmargin-top: -3px !important;\nmargin-left: -46px !important;\nwidth: 42px !important;\n}\n\n.Rb .We {\nmargin-left: 0px !important;\n}\n\n.Rb .Ul.We {\nmargin-left: -46px !important;\n}\n\n.gemAid {\nmargin-left: 46px;\n}\n\n.lzqA1d .gemAid {\nmargin-left: 0px; !important;\n}\n}";

var css_Notification_Your_Profile_Photo = ".Rb .Wl .tg, .Rb .Wl .sf {\nmargin-left: -42px !important;\n}\n\n.Rb .ug, .Rb .hf {\nheight: 42px !important;\nwidth: 42px !important;\n}\n}";

var css_Upper_Right = ".k-Ja-Qh, .k-Ja-Rh {\nwidth: 42px !important;\nheight: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(1) {\npadding-top: 0px;\npadding-right: 0px;\n}\n\n.k-Ja-Qh:nth-child(1), .k-Ja-Qh:nth-child(1) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(2) {\npadding-top: 0px;\n}\n\n.k-Ja-Qh:nth-child(2), .k-Ja-Qh:nth-child(2) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(3) {\npadding-top: 0px;\n}\n\n.k-Ja-Qh:nth-child(3), .k-Ja-Qh:nth-child(3) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(4), .k-Ja-Qh:nth-child(4) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(5), .k-Ja-Qh:nth-child(5) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(6), .k-Ja-Qh:nth-child(6) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(7), .k-Ja-Qh:nth-child(7) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(8), .k-Ja-Qh:nth-child(8) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(9), .k-Ja-Qh:nth-child(9) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(10), .k-Ja-Qh:nth-child(10) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(11), .k-Ja-Qh:nth-child(11) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(12), .k-Ja-Qh:nth-child(12) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(13), .k-Ja-Qh:nth-child(13) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(14), .k-Ja-Qh:nth-child(14) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(15), .k-Ja-Qh:nth-child(15) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n\n.k-Ja-Qh:nth-child(16), .k-Ja-Qh:nth-child(16) .k-Ja-Rh {\nheight: 42px !important;\nwidth: 42px !important;\n}\n}";

var css_Hover_Card = ".Sj {\nheight: 28px !important;\nwidth: 28px !important;\n}\n\n.Rj {\npadding: 5px 6px 0 0 !important;\n}\n\n.Tj {\nheight: 28px !important;\n}\n\n.bk {\nheight: 96px !important;\nmargin: 8px 8px 8px 8px !important;\nwidth: 96px !important;\n}\n}";

var css_Settings_Card_Your_Photo = "#gbmpi {\nheight: 128px !important;\nwidth: 128px !important;\n}\n}";

var css_In_Your_Circles_Profile_Page_Photos = ".KWCY0b{\nwidth: 48px !important;\nheight: 48px !important;\n}\n\n.kM5Oeb-wsYqfb.kM5Oeb-Ko96kbUpTnud{\nwidth: 48px !important;\nheight: 48px !important;\n}\n}";

var css_Photo_Wall = ".B0n3ab {\nmargin: 27px 0 0 0px !important;\n}\n\n.cPNSIc {\nmin-height: 150px !important;\nwidth: 750px !important;\n}\n\n.MWS50d {\nheight: 150px !important;\nwidth: 150px !important;\nmargin-right: 0px !important;\n}\n\n.G3royc {\nheight: 150px !important;\nwidth: 150px !important;\n}\n\n.mbKrWe {\nwidth: 750px !important;\n}\n\n.kM5Oeb-ad9sbb.KSB3fe {\nwidth: 770px !important;\n}\n\n.kM5Oeb-SyjYle.mTMQOd.IzbGp {\nmargin-left: 0px !important;\n}\n\n.Gw1Uxf.IzbGp.kM5Oeb-TIIicd {\nmargin: 0 0 0 0; !important;\n}\n\n.pHchB {\nmargin: 6px -15px 10px 20px !important;\n}\n}";

var css_Mention_List = ".z-ea-N {\nheight: 48px !important;\nwidth: 48px !important;\n}\n}";

var css_Notification_Photos_and_Border = ".Z2Pj3d.Xm.Lu {\nborder: 0px solid #444 !important;\nheight: 56px !important;\nwidth: 56px !important;\nmargin-top: -6px !important;\n}\n\n.Wm {\nheight: 56px !important;\nwidth: 56px !important;\n}\n\n.WtbUqb.Wm.F76eVc.Gf {\nborder: 0px solid black !important;\ntop: -2px !important;\nleft: 4px !important;\n}\n\n.WtbUqb.Wm.G31rIe.Gf {\nborder: 0px solid #3D3D3D !important;\ntop: -4px !important;\nleft: 2px !important;\n}\n\n.Gf.Lu {\nheight: 56px !important;\nwidth: 56px !important;\nmargin-top: -6px !important;\n}\n\n.WtbUqb.Wm.F76eVc {\nborder: 0px solid black !important;\ntop: -2px !important;\nleft: 4px !important;\n}\n\n.WtbUqb.Wm.G31rIe {\nborder: 0px solid #3D3D3D !important;top: -4px !important;\nleft: 2px !important;\n}\n\n.wE.dPbJNd.iK.ek {\nwidth: 56px !important;\nheight: 56px !important;\n}\n\n.dPbJNd.iK.ek.Lu {\nwidth: 56px !important;\nheight: 56px !important;\n}\n}";

var css_Suggestions_Photos = ".sG {\nheight: 48px !important;\nwidth: 48px !important;\n}\n\n.rG {\nheight: 48px !important;\nwidth: 48px !important;\n}\n}";

GM_addStyle(css_Your_Profile_Photo);
GM_addStyle(css_Stream_Profile_Photo);
GM_addStyle(css_Stream_Notification_Comment_Profile_Photo);
GM_addStyle(css_Notification_Your_Profile_Photo);
GM_addStyle(css_Upper_Right);
GM_addStyle(css_Hover_Card);
GM_addStyle(css_Settings_Card_Your_Photo);
GM_addStyle(css_In_Your_Circles_Profile_Page_Photos);
GM_addStyle(css_Photo_Wall);
GM_addStyle(css_Mention_List);
GM_addStyle(css_Notification_Photos_and_Border);
GM_addStyle(css_Suggestions_Photos);

var languagePairs = {
    '简体中文': { head: '您圈子中的成员', foot: '查看全部 ›' },
    '繁體中文': { head: '在你的社交圈中', foot: '檢視全部 ›' },
    '日本語': { head: 'あなたのサークル内', foot: 'すべて表示 ›' },
    'Default': { head: 'In your circles', foot: 'View all ›' }
}

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
batchReplace(document.body.getElementsByClassName('tg')); // Stream Profile Photo
batchReplace(document.body.getElementsByClassName('kM5Oeb-wsYqfb')); // In Your Circles Profile Page Photos

var intervalID = setInterval(function () {
    if (!replaceImg(document.getElementsByClassName('k-pu-NS')[0]))
        clearInterval(intervalID);
}, 1000);

document.body.addEventListener('DOMNodeInserted', function (e) {
    if (e.target.nodeType != 3 && e.target.tagName == 'DIV') {
        batchReplace(e.target.getElementsByClassName('tg')); // Stream Profile Photo
        batchReplace(e.target.getElementsByClassName('bk')); // Profile Photo in Hover Card
        batchReplace(e.target.getElementsByClassName('Lu')); // Notifications Profile Photos
        batchReplace(e.target.getElementsByClassName('k-Ja-Rh')); // Profile Photo in In Your Circles
        batchReplace(e.target.getElementsByClassName('SgDkYe')); // Large Profile Photo in Settings
        batchReplace(e.target.getElementsByClassName('Sj')); // Hover Card Small Profile Photos
        batchReplace(e.target.getElementsByClassName('z-ea-N')); // Profile Photos in Mention List
        batchReplace(e.target.getElementsByClassName('rG')); // Profile Photos in Suggestions
    }
}, false);

if (document.URL.match(/https:\/\/plus\.google\.com(\/u\/\d)?/)) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var arr = eval('//' + ajax.responseText);
            var userptr = arr[0][1][1][2];

            var matchPair;
            if (document.getElementsByClassName('Rz7Px').length > 0) {
                matchPair = languagePairs[document.getElementsByClassName('Rz7Px')[0].innerHTML];
                if (!matchPair)
                    matchPair = languagePairs['Default'];
            }
            else
                matchPair = languagePairs['Default'];

            var html = '<div class="k-Ja-Fh c-wa-Da"><div class="YS3xi"><div><div class="k-Ja-ses08e g2OQud c-wa-Da"><div class="k-Ja-Sh miSRXe">';
            for (var i = 0; i < Math.min(userptr.length, 16) ; i++) {
                var userid = userptr[i][0][2];;
                var username = userptr[i][2][0];
                var userimg = userptr[i][2][8];
                userimg = userimg.replace('/photo.jpg', '/s64-c-k/photo.jpg');
                var tmp1 = '<div class="k-Ja-Qh"><a href="./' + userid + '" class="k-Qf-C-RySO6d oP" oid="' + userid + '"><img src="' + userimg + '" width="24px" height="24px" alt="' + username + '\'s profile photo" class="k-Ja-Rh Y60pH" oid="' + userid + '"></a></div>'
                html += tmp1;
            }
            html += '</div></div></div></div><a href="/circles/" asrc="circleproperties" class="k-Ja-Me ICTk3e k-Qf-C-RySO6d c-wa-Da">' + matchPair.foot + '</a></div>';
            var nav_wrap = document.createElement('div');
            nav_wrap.style.marginTop = '-25px';
            nav_wrap.innerHTML += '<div class="k-ldzwdb-Kqlefe-Gb-za on3lSc">' + matchPair.head + '</div>';
            nav_wrap.innerHTML += html;
            var container = document.querySelector('div[class="k-ldzwdb-ue"]');
            container.insertBefore(nav_wrap, container.childNodes[1]);
        }
    };
    ajax.open('GET', document.URL.match(/https:\/\/plus\.google\.com(\/u\/\d)?/)[0] + '/_/socialgraph/lookup/socialbar/?c=%5B%221c%22%5D&mc=16&ms=35&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j', true);
    ajax.send();
}