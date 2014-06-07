/*
    Following code belongs to Emoji Support for Google+.
    Copyright (C) 2013 Jackson Tan
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @id		EmojiSupport
// @name		Emoji Support for Google+
// @version	0.7.1
// @namespace	gplus.emojisupport
// @author	Jackson Tan
// @description	Add Emoji Support for your Google+.
// @match	https://plus.google.com/*
// @run-at	document-end
// ==/UserScript==

if (localStorage["emtcnPack"] == 'undefined'||localStorage["emtcnPack"] == undefined)
    localStorage["emtcnPack"] = 'Default';
var emtcnPack = localStorage["emtcnPack"];

GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.textContent = css}
        head.appendChild(style);
    }
	
var css_Emoticons = ".hiddenTextField {\ndisplay: none;\n}\n\n.Emoticons {\nheight: 48px !important;\nwidth: 48px !important;\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n.Emoticons:hover {\n-webkit-transform:scale(2);\n-moz-transform:scale(2);\n-o-transform:scale(2);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n}";
var emtcnExt;
GM_addStyle (css_Emoticons);

var emtcnPairs = {
    'Default': { emtcn1: 'http://i.imgur.com/GyYUwho.png', emtcn2: 'http://i.imgur.com/yePimCe.png', emtcn3: 'http://i.imgur.com/Ib8DidH.png', emtcn4: 'http://i.imgur.com/KDQkLN9.png', emtcn5: 'http://i.imgur.com/dZ2DlFR.png', emtcn6: 'http://i.imgur.com/9TMKGbQ.png', emtcn7: 'http://i.imgur.com/FwTG8EC.png', emtcn8: 'http://i.imgur.com/TDswuc6.png', emtcn9: 'http://i.imgur.com/qCzmd8D.png', emtcn10: 'http://i.imgur.com/54mSqGk.png', emtcn11: 'http://i.imgur.com/KAeicxe.png', emtcn12: 'http://i.imgur.com/1KSdwJV.png', emtcn13: 'http://i.imgur.com/2LsS1jG.png', emtcn14: 'http://i.imgur.com/m8JseK8.png', emtcn15: 'http://i.imgur.com/qVAUbAo.png', emtcn16: 'http://i.imgur.com/BRfhs3k.png', emtcn17: 'http://i.imgur.com/bn5yMWH.png', emtcn18: 'http://i.imgur.com/BCLyuRx.png', emtcn19: 'http://i.imgur.com/vmWVlNs.png', emtcn20: 'http://i.imgur.com/WQB1QfQ.png', emtcn21: 'http://i.imgur.com/NqWWmCL.png', emtcn22: 'http://i.imgur.com/S0gTfMA.png', emtcn23: 'http://i.imgur.com/erXERjU.png', emtcn24: 'http://i.imgur.com/GoYB89d.png', emtcn25: 'http://i.imgur.com/xglbPI4.png', emtcn26: 'http://i.imgur.com/L2IJi53.png', emtcn27: 'http://i.imgur.com/zaVIAYd.png', emtcn28: 'http://i.imgur.com/xLAQmlR.png', emtcn29: 'http://i.imgur.com/3buqrIm.png', emtcn30: 'http://i.imgur.com/DNkZgqQ.png', emtcn31: 'http://i.imgur.com/5Ko4baB.png', emtcn32: 'http://i.imgur.com/wGqHEMH.png', emtcn33: 'http://i.imgur.com/IPoXNRP.png', emtcn34: 'http://i.imgur.com/2DjiU6x.png', emtcn35: 'http://i.imgur.com/oF6pjm2.png', emtcn36: 'http://i.imgur.com/2pfDbnq.png', emtcn37: 'http://i.imgur.com/wJLcqau.png', emtcn38: 'http://i.imgur.com/WmU7RJC.png', emtcn39: 'http://i.imgur.com/vOufNq3.png', emtcn40: 'http://i.imgur.com/0y5HG6c.png', emtcn41: 'http://i.imgur.com/4JU67Vv.png', emtcn42: 'http://i.imgur.com/FjykfQ7.png', emtcn43: 'http://i.imgur.com/rM7TJQA.png', emtcn44: 'http://i.imgur.com/A96YwcA.png', emtcn45: 'http://i.imgur.com/9iYE2ho.png', emtcn46: 'http://i.imgur.com/mZYJzbm.png', emtcn47: 'http://i.imgur.com/3qc0KKl.png', emtcn48: 'http://i.imgur.com/xpfK8mh.png', emtcn49: 'http://i.imgur.com/ZYOOz4e.png', emtcn50: 'http://i.imgur.com/y0eDVaB.png', bgm38: 'http://i.imgur.com/qQG4fNL.png' },
    'Colorful_11': { emtcn1: 'http://i.imgur.com/GyYUwho.png', emtcn2: 'http://i.imgur.com/yePimCe.png', emtcn3: 'http://i.imgur.com/Ib8DidH.png', emtcn4: 'http://i.imgur.com/KDQkLN9.png', emtcn5: 'http://i.imgur.com/dZ2DlFR.png', emtcn6: 'http://i.imgur.com/9TMKGbQ.png', emtcn7: 'http://i.imgur.com/FwTG8EC.png', emtcn8: 'http://i.imgur.com/TDswuc6.png', emtcn9: 'http://i.imgur.com/qCzmd8D.png', emtcn10: 'http://i.imgur.com/54mSqGk.png', emtcn11: 'http://i.imgur.com/KAeicxe.png', emtcn12: 'http://i.imgur.com/1KSdwJV.png', emtcn13: 'http://i.imgur.com/2LsS1jG.png', emtcn14: 'http://i.imgur.com/m8JseK8.png', emtcn15: 'http://i.imgur.com/qVAUbAo.png', emtcn16: 'http://i.imgur.com/BRfhs3k.png', emtcn17: 'http://i.imgur.com/bn5yMWH.png', emtcn18: 'http://i.imgur.com/BCLyuRx.png', emtcn19: 'http://i.imgur.com/vmWVlNs.png', emtcn20: 'http://i.imgur.com/WQB1QfQ.png', emtcn21: 'http://i.imgur.com/NqWWmCL.png', emtcn22: 'http://i.imgur.com/S0gTfMA.png', emtcn23: 'http://i.imgur.com/erXERjU.png', emtcn24: 'http://i.imgur.com/GoYB89d.png', emtcn25: 'http://i.imgur.com/xglbPI4.png', emtcn26: 'http://i.imgur.com/L2IJi53.png', emtcn27: 'http://i.imgur.com/zaVIAYd.png', emtcn28: 'http://i.imgur.com/xLAQmlR.png', emtcn29: 'http://i.imgur.com/3buqrIm.png', emtcn30: 'http://i.imgur.com/DNkZgqQ.png', emtcn31: 'http://i.imgur.com/5Ko4baB.png', emtcn32: 'http://i.imgur.com/wGqHEMH.png', emtcn33: 'http://i.imgur.com/IPoXNRP.png', emtcn34: 'http://i.imgur.com/2DjiU6x.png', emtcn35: 'http://i.imgur.com/oF6pjm2.png', emtcn36: 'http://i.imgur.com/2pfDbnq.png', emtcn37: 'http://i.imgur.com/wJLcqau.png', emtcn38: 'http://i.imgur.com/WmU7RJC.png', emtcn39: 'http://i.imgur.com/vOufNq3.png', emtcn40: 'http://i.imgur.com/0y5HG6c.png', emtcn41: 'http://i.imgur.com/4JU67Vv.png', emtcn42: 'http://i.imgur.com/FjykfQ7.png', emtcn43: 'http://i.imgur.com/rM7TJQA.png', emtcn44: 'http://i.imgur.com/A96YwcA.png', emtcn45: 'http://i.imgur.com/9iYE2ho.png', emtcn46: 'http://i.imgur.com/mZYJzbm.png', emtcn47: 'http://i.imgur.com/3qc0KKl.png', emtcn48: 'http://i.imgur.com/xpfK8mh.png', emtcn49: 'http://i.imgur.com/ZYOOz4e.png', emtcn50: 'http://i.imgur.com/y0eDVaB.png', bgm38: 'http://i.imgur.com/qQG4fNL.png' },
    'Colorful_12': { emtcn1: 'http://i.imgur.com/GyYUwho.png', emtcn2: 'http://i.imgur.com/yePimCe.png', emtcn3: 'http://i.imgur.com/Ib8DidH.png', emtcn4: 'http://i.imgur.com/KDQkLN9.png', emtcn5: 'http://i.imgur.com/dZ2DlFR.png', emtcn6: 'http://i.imgur.com/9TMKGbQ.png', emtcn7: 'http://i.imgur.com/FwTG8EC.png', emtcn8: 'http://i.imgur.com/TDswuc6.png', emtcn9: 'http://i.imgur.com/qCzmd8D.png', emtcn10: 'http://i.imgur.com/54mSqGk.png', emtcn11: 'http://i.imgur.com/KAeicxe.png', emtcn12: 'http://i.imgur.com/1KSdwJV.png', emtcn13: 'http://i.imgur.com/2LsS1jG.png', emtcn14: 'http://i.imgur.com/m8JseK8.png', emtcn15: 'http://i.imgur.com/qVAUbAo.png', emtcn16: 'http://i.imgur.com/BRfhs3k.png', emtcn17: 'http://i.imgur.com/bn5yMWH.png', emtcn18: 'http://i.imgur.com/BCLyuRx.png', emtcn19: 'http://i.imgur.com/vmWVlNs.png', emtcn20: 'http://i.imgur.com/WQB1QfQ.png', emtcn21: 'http://i.imgur.com/NqWWmCL.png', emtcn22: 'http://i.imgur.com/S0gTfMA.png', emtcn23: 'http://i.imgur.com/erXERjU.png', emtcn24: 'http://i.imgur.com/GoYB89d.png', emtcn25: 'http://i.imgur.com/xglbPI4.png', emtcn26: 'http://i.imgur.com/L2IJi53.png', emtcn27: 'http://i.imgur.com/zaVIAYd.png', emtcn28: 'http://i.imgur.com/xLAQmlR.png', emtcn29: 'http://i.imgur.com/3buqrIm.png', emtcn30: 'http://i.imgur.com/DNkZgqQ.png', emtcn31: 'http://i.imgur.com/5Ko4baB.png', emtcn32: 'http://i.imgur.com/wGqHEMH.png', emtcn33: 'http://i.imgur.com/IPoXNRP.png', emtcn34: 'http://i.imgur.com/2DjiU6x.png', emtcn35: 'http://i.imgur.com/oF6pjm2.png', emtcn36: 'http://i.imgur.com/2pfDbnq.png', emtcn37: 'http://i.imgur.com/wJLcqau.png', emtcn38: 'http://i.imgur.com/WmU7RJC.png', emtcn39: 'http://i.imgur.com/vOufNq3.png', emtcn40: 'http://i.imgur.com/0y5HG6c.png', emtcn41: 'http://i.imgur.com/4JU67Vv.png', emtcn42: 'http://i.imgur.com/FjykfQ7.png', emtcn43: 'http://i.imgur.com/rM7TJQA.png', emtcn44: 'http://i.imgur.com/A96YwcA.png', emtcn45: 'http://i.imgur.com/9iYE2ho.png', emtcn46: 'http://i.imgur.com/mZYJzbm.png', emtcn47: 'http://i.imgur.com/3qc0KKl.png', emtcn48: 'http://i.imgur.com/xpfK8mh.png', emtcn49: 'http://i.imgur.com/ZYOOz4e.png', emtcn50: 'http://i.imgur.com/y0eDVaB.png', bgm38: 'http://i.imgur.com/qQG4fNL.png' },
}

var matchPair = emtcnPairs[localStorage["emtcnPack"]];

function replaceEmoticons(content) {
	for(var i = 0; i < content.snapshotLength; i++) {
		var replaceContent = content.snapshotItem(i);
		if(replaceContent.hasAttribute("Emoticons")) return;
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/闪瞎/gi, "<img src='" + matchPair.emtcn1 + "' class = 'Emoticons' title = '闪瞎'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/噗/gi, "<img src='" + matchPair.emtcn2 + "' class = 'Emoticons' title = '噗'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/喷﻿/gi, "<img src='" + matchPair.emtcn2 + "' class = 'Emoticons' title = '喷﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/shock/gi, "<img src='" + matchPair.emtcn3 + "' class = 'Emoticons' title = 'shock'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/玩坏/gi, "<img src='" + matchPair.emtcn4 + "' class = 'Emoticons' title = '玩坏﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/盯/gi, "<img src='" + matchPair.emtcn5 + "' class = 'Emoticons' title = '盯'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/nyan/gi, "<img src='" + matchPair.emtcn6 + "' class = 'Emoticons' title = 'nyan'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/害羞﻿/gi, "<img src='" + matchPair.emtcn7 + "' class = 'Emoticons' title = '害羞﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn08/gi, "<img src='" + matchPair.emtcn8 + "' class = 'Emoticons' title = 'Emoticon 08﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/摔/gi, "<img src='" + matchPair.emtcn9 + "' class = 'Emoticons' title = '摔'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/汗/gi, "<img src='" + matchPair.emtcn10 + "' class = 'Emoticons' title = '汗'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn11/gi, "<img src='" + matchPair.emtcn11 + "' class = 'Emoticons' title = 'Emoticon 11'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/斜眼/gi, "<img src='" + matchPair.emtcn12 + "' class = 'Emoticons' title = '斜眼'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/眼神死/gi, "<img src='" + matchPair.emtcn12 + "' class = 'Emoticons' title = '眼神死'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/kira/gi, "<img src='" + matchPair.emtcn13 + "' class = 'Emoticons' title = 'kira'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/卢瑟/gi, "<img src='" + matchPair.emtcn14 + "' class = 'Emoticons' title = '卢瑟'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/渣渣/gi, "<img src='" + matchPair.emtcn14 + "' class = 'Emoticons' title = '渣渣'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn15﻿/gi, "<img src='" + matchPair.emtcn15 + "' class = 'Emoticons' title = 'Emoticon 15﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/一库﻿/gi, "<img src='" + matchPair.emtcn16 + "' class = 'Emoticons' title = '一库﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/鼻血/gi, "<img src='" + matchPair.emtcn17 + "' class = 'Emoticons' title = '鼻血'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/咳咳/gi, "<img src='" + matchPair.emtcn18 + "' class = 'Emoticons' title = '咳咳'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn19﻿/gi, "<img src='" + matchPair.emtcn19 + "' class = 'Emoticons' title = 'Emoticon 19﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn20/gi, "<img src='" + matchPair.emtcn20 + "' class = 'Emoticons' title = 'Emoticon 20﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/囧/gi, "<img src='" + matchPair.emtcn21 + "' class = 'Emoticons' title = '囧'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/baka/gi, "<img src='" + matchPair.emtcn22 + "' class = 'Emoticons' title = 'baka'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/呜/gi, "<img src='" + matchPair.emtcn23 + "' class = 'Emoticons' title = '呜'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/哈子卡西/gi, "<img src='" + matchPair.emtcn24 + "' class = 'Emoticons' title = '哈子卡西'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn25﻿/gi, "<img src='" + matchPair.emtcn25 + "' class = 'Emoticons' title = 'Emoticon 25'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/呵呵/gi, "<img src='" + matchPair.emtcn26 + "' class = 'Emoticons' title = '呵呵'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/塞钱/gi, "<img src='" + matchPair.emtcn27 + "' class = 'Emoticons' title = '塞钱'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn28﻿/gi, "<img src='" + matchPair.emtcn28 + "' class = 'Emoticons' title = 'Emoticon 28﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/哼/gi, "<img src='" + matchPair.emtcn29 + "' class = 'Emoticons' title = '哼'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn30/gi, "<img src='" + matchPair.emtcn30 + "' class = 'Emoticons' title = 'Emoticon 30﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn31﻿/gi, "<img src='" + matchPair.emtcn31 + "' class = 'Emoticons' title = 'Emoticon 31﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/GJ/gi, "<img src='" + matchPair.emtcn32 + "' class = 'Emoticons' title = 'GJ'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn33﻿/gi, "<img src='" + matchPair.emtcn33 + "' class = 'Emoticons' title = 'Emoticon 33'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn34﻿/gi, "<img src='" + matchPair.emtcn34 + "' class = 'Emoticons' title = 'Emoticon 34﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/泪奔/gi, "<img src='" + matchPair.emtcn35 + "' class = 'Emoticons' title = '泪奔'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn36﻿/gi, "<img src='" + matchPair.emtcn36 + "' class = 'Emoticons' title = 'Emoticon 36﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn37﻿/gi, "<img src='" + matchPair.emtcn37 + "' class = 'Emoticons' title = 'Emoticon 37﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn38﻿/gi, "<img src='" + matchPair.emtcn38 + "' class = 'Emoticons' title = 'Emoticon 38﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn39﻿/gi, "<img src='" + matchPair.emtcn39 + "' class = 'Emoticons' title = 'Emoticon 39﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn40﻿/gi, "<img src='" + matchPair.emtcn40 + "' class = 'Emoticons' title = 'Emoticon 40﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn41﻿/gi, "<img src='" + matchPair.emtcn41 + "' class = 'Emoticons' title = 'Emoticon 41﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn42﻿/gi, "<img src='" + matchPair.emtcn42 + "' class = 'Emoticons' title = 'Emoticon 42﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn43﻿/gi, "<img src='" + matchPair.emtcn43 + "' class = 'Emoticons' title = 'Emoticon 43﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn44﻿/gi, "<img src='" + matchPair.emtcn44 + "' class = 'Emoticons' title = 'Emoticon 44﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn45﻿/gi, "<img src='" + matchPair.emtcn45 + "' class = 'Emoticons' title = 'Emoticon 45﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn46﻿/gi, "<img src='" + matchPair.emtcn46 + "' class = 'Emoticons' title = 'Emoticon 46﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn47﻿/gi, "<img src='" + matchPair.emtcn47 + "' class = 'Emoticons' title = 'Emoticon 47﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn48﻿/gi, "<img src='" + matchPair.emtcn48 + "' class = 'Emoticons' title = 'Emoticon 48﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn49﻿/gi, "<img src='" + matchPair.emtcn49 + "' class = 'Emoticons' title = 'Emoticon 49﻿'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/emtcn50﻿/gi, "<img src='" + matchPair.emtcn50 + "' class = 'Emoticons' title = 'Emoticon 50'>");
		replaceContent.innerHTML = replaceContent.innerHTML.replace(/[.]*\/bgm38/gi, "<img src='" + matchPair.bgm38 + "' class = 'Emoticons' title = 'BGM38'>");
		replaceContent.setAttribute("Emoticons", "emoticonsReplaced");
	}
	delete content;
}

function replaceDateTime(content){
	for(var i = 0; i < content.length; i++) {
		var replaceContent = content[i];
		if(replaceContent.hasAttribute("DateTime")) return;
		replaceContent.textContent = replaceContent.title;
		replaceContent.setAttribute("DateTime", "dateTimeReplaced");
	}
	delete content;
}

//Find text in all posts and comments and replace them with corresponding images.
function processPosts(node) {
	if(!node || !node.querySelector) return;
	var post = document.evaluate('descendant-or-self::div[@class="vFgtwf"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var comment = document.evaluate('descendant-or-self::div[@class="Mi"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var dateTime = document.getElementsByClassName('g-M-n FW9qdb ik Bf');
	replaceEmoticons(post);
	replaceEmoticons(comment);
	//replaceDateTime(dateTime);
}
		
//First process of the toolbars
processPosts(document.body);

//Handle newly added posts
document.body.addEventListener('DOMNodeInserted', function(e) {
	if(!e) e = event;
	processPosts(e.target);
}, false);

//Listener enabled when you type something
function replaceShareComment() {
    var shareCommentBoxReg = /\/闪瞎|\/噗|\/喷|\/shock|\/玩坏|\/盯|\/nyan|\/害羞﻿|\/摔|\/汗|\/emtcn11|\/斜眼|\/眼神死|\/卢瑟|\/渣渣|\/一库|\/鼻血|\/咳咳|\/囧|\/baka|\/呜|\/哈子卡西|\/呵呵|\/塞钱|\/哼|\/GJ|\/泪奔|\/bgm38/gi;
    var shareComment_Box;
    if (document.getElementsByClassName("psY1T UTG4h").length > 0) {
        shareComment_Box = document.querySelector('div[class="EPlNT be c-B"]').childNodes[1];
    }
    else if (document.querySelector('div[class="be c-B"]') != null) {
        shareComment_Box = document.querySelector('div[class="be c-B"]').childNodes[0];
    }
    if (shareComment_Box != undefined && shareComment_Box != null) {
        if (shareComment_Box.textContent.indexOf("\/闪瞎") != -1 || shareComment_Box.textContent.indexOf("\/噗") != -1 || shareComment_Box.textContent.indexOf("\/shock") != -1 || shareComment_Box.textContent.indexOf("\/玩坏") != -1 || shareComment_Box.textContent.indexOf("\/盯") != -1 || shareComment_Box.textContent.indexOf("\/nyan") != -1 || shareComment_Box.textContent.indexOf("\/噗") != -1 || shareComment_Box.textContent.indexOf("\/emtcn08") != -1 || shareComment_Box.textContent.indexOf("\/摔") != -1 || shareComment_Box.textContent.indexOf("\/汗") != -1 || shareComment_Box.textContent.indexOf("\/emtcn11") != -1 || shareComment_Box.textContent.indexOf("\/眼神死") != -1 || shareComment_Box.textContent.indexOf("\/斜眼") != -1 || shareComment_Box.textContent.indexOf("\/kira") != -1 || shareComment_Box.textContent.indexOf("\/卢瑟") != -1 || shareComment_Box.textContent.indexOf("\/渣渣") != -1 || shareComment_Box.textContent.indexOf("\/鼻血") != -1 || shareComment_Box.textContent.indexOf("\/咳咳") != -1 || shareComment_Box.textContent.indexOf("\/emtcn20") != -1 || shareComment_Box.textContent.indexOf("\/囧") != -1 || shareComment_Box.textContent.indexOf("\/baka") != -1 || shareComment_Box.textContent.indexOf("\/呜") != -1 || shareComment_Box.textContent.indexOf("\/哈子卡西") != -1 || shareComment_Box.textContent.indexOf("\/呵呵") != -1 || shareComment_Box.textContent.indexOf("\/塞钱") != -1 || shareComment_Box.textContent.indexOf("\/哼") != -1 || shareComment_Box.textContent.indexOf("\/emtcn30") != -1 || shareComment_Box.textContent.indexOf("\/GJ") != -1 || shareComment_Box.textContent.indexOf("\/泪奔") != -1 || shareComment_Box.textContent.indexOf("\/泪奔") != -1 || shareComment_Box.textContent.indexOf("\/bgm38") != -1) {
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/闪瞎/gi, "<font class='hiddenTextField' style='display: none;'>\.\/闪瞎</font><img src='" + matchPair.emtcn1 + "' class = 'Emoticons' title = '闪瞎'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/噗/gi, "<font class='hiddenTextField' style='display: none;'>\.\/噗</font><img src='" + matchPair.emtcn2 + "' class = 'Emoticons' title = '噗'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/喷﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/喷</font><img src='" + matchPair.emtcn2 + "' class = 'Emoticons' title = '喷﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/shock/gi, "<font class='hiddenTextField' style='display: none;'>\.\/shock</font><img src='" + matchPair.emtcn3 + "' class = 'Emoticons' title = 'shock'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/玩坏/gi, "<font class='hiddenTextField' style='display: none;'>\.\/玩坏﻿</font><img src='" + matchPair.emtcn4 + "' class = 'Emoticons' title = '玩坏﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/盯/gi, "<font class='hiddenTextField' style='display: none;'>\.\/盯</font><img src='" + matchPair.emtcn5 + "' class = 'Emoticons' title = '盯'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/nyan/gi, "<font class='hiddenTextField' style='display: none;'>\.\/nyan</font><img src='" + matchPair.emtcn6 + "' class = 'Emoticons' title = 'nyan'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/害羞﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/害羞﻿</font><img src='" + matchPair.emtcn7 + "' class = 'Emoticons' title = '害羞﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn08/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn08</font><img src='" + matchPair.emtcn8 + "' class = 'Emoticons' title = 'Emoticon 08﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/摔/gi, "<font class='hiddenTextField' style='display: none;'>\.\/摔</font><img src='" + matchPair.emtcn9 + "' class = 'Emoticons' title = '摔'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/汗/gi, "<font class='hiddenTextField' style='display: none;'>\.\/汗</font><img src='" + matchPair.emtcn10 + "' class = 'Emoticons' title = '汗'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn11/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn11</font><img src='" + matchPair.emtcn11 + "' class = 'Emoticons' title = 'Emoticon 11'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/斜眼/gi, "<font class='hiddenTextField' style='display: none;'>\.\/斜眼</font><img src='" + matchPair.emtcn12 + "' class = 'Emoticons' title = '斜眼'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/眼神死/gi, "<font class='hiddenTextField' style='display: none;'>\.\/眼神死</font><img src='" + matchPair.emtcn12 + "' class = 'Emoticons' title = '眼神死'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/kira/gi, "<font class='hiddenTextField' style='display: none;'>\.\/kira</font><img src='" + matchPair.emtcn13 + "' class = 'Emoticons' title = 'kira'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/卢瑟/gi, "<font class='hiddenTextField' style='display: none;'>\.\/卢瑟</font><img src='" + matchPair.emtcn14 + "' class = 'Emoticons' title = '卢瑟'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/渣渣/gi, "<font class='hiddenTextField' style='display: none;'>\.\/渣渣</font><img src='" + matchPair.emtcn14 + "' class = 'Emoticons' title = '渣渣'>");;
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn15﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn15﻿</font><img src='" + matchPair.emtcn15 + "' class = 'Emoticons' title = 'Emoticon 15﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/一库﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/一库</font><img src='" + matchPair.emtcn16 + "' class = 'Emoticons' title = '一库﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/鼻血/gi, "<font class='hiddenTextField' style='display: none;'>\.\/鼻血</font><img src='" + matchPair.emtcn17 + "' class = 'Emoticons' title = '鼻血'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/咳咳/gi, "<font class='hiddenTextField' style='display: none;'>\.\/咳咳</font><img src='" + matchPair.emtcn18 + "' class = 'Emoticons' title = '咳咳'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn19﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn19﻿</font><img src='" + matchPair.emtcn19 + "' class = 'Emoticons' title = 'Emoticon 19﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn20/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn20</font><img src='" + matchPair.emtcn20 + "' class = 'Emoticons' title = 'Emoticon 20﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/囧/gi, "<font class='hiddenTextField' style='display: none;'>\.\/囧</font><img src='" + matchPair.emtcn21 + "' class = 'Emoticons' title = '囧'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/baka/gi, "<font class='hiddenTextField' style='display: none;'>\.\/baka</font><img src='" + matchPair.emtcn22 + "' class = 'Emoticons' title = 'baka'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/呜/gi, "<font class='hiddenTextField' style='display: none;'>\.\/呜</font><img src='" + matchPair.emtcn23 + "' class = 'Emoticons' title = '呜'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/哈子卡西/gi, "<font class='hiddenTextField' style='display: none;'>\.\/哈子卡西</font><img src='" + matchPair.emtcn24 + "' class = 'Emoticons' title = '哈子卡西'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn25﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn25﻿</font><img src='" + matchPair.emtcn25 + "' class = 'Emoticons' title = 'Emoticon 25'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/呵呵/gi, "<font class='hiddenTextField' style='display: none;'>\.\/呵呵</font><img src='" + matchPair.emtcn26 + "' class = 'Emoticons' title = '呵呵'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/塞钱/gi, "<font class='hiddenTextField' style='display: none;'>\.\/塞钱</font><img src='" + matchPair.emtcn27 + "' class = 'Emoticons' title = '塞钱'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn28﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn28﻿</font><img src='" + matchPair.emtcn28 + "' class = 'Emoticons' title = 'Emoticon 28﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/哼/gi, "<font class='hiddenTextField' style='display: none;'>\.\/哼</font><img src='" + matchPair.emtcn29 + "' class = 'Emoticons' title = '哼'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn30/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn30</font><img src='" + matchPair.emtcn30 + "' class = 'Emoticons' title = 'Emoticon 30﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn31﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn31﻿</font><img src='" + matchPair.emtcn31 + "' class = 'Emoticons' title = 'Emoticon 31﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/GJ/gi, "<font class='hiddenTextField' style='display: none;'>\.\/GJ</font><img src='" + matchPair.emtcn32 + "' class = 'Emoticons' title = 'GJ'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn33﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn33﻿</font><img src='" + matchPair.emtcn33 + "' class = 'Emoticons' title = 'Emoticon 33'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn34﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn34﻿</font><img src='" + matchPair.emtcn34 + "' class = 'Emoticons' title = 'Emoticon 34﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/泪奔/gi, "<font class='hiddenTextField' style='display: none;'>\.\/泪奔</font><img src='" + matchPair.emtcn35 + "' class = 'Emoticons' title = '泪奔'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn36﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn36</font><img src='" + matchPair.emtcn36 + "' class = 'Emoticons' title = 'Emoticon 36﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn37﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn37</font><img src='" + matchPair.emtcn37 + "' class = 'Emoticons' title = 'Emoticon 37﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn38﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn38</font><img src='" + matchPair.emtcn38 + "' class = 'Emoticons' title = 'Emoticon 38﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn39﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn39</font><img src='" + matchPair.emtcn39 + "' class = 'Emoticons' title = 'Emoticon 39﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn40﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn40﻿</font><img src='" + matchPair.emtcn40 + "' class = 'Emoticons' title = 'Emoticon 40﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn41﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn41</font><img src='" + matchPair.emtcn41 + "' class = 'Emoticons' title = 'Emoticon 41﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn42﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn42</font><img src='" + matchPair.emtcn42 + "' class = 'Emoticons' title = 'Emoticon 42﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn43﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn43</font><img src='" + matchPair.emtcn43 + "' class = 'Emoticons' title = 'Emoticon 43﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn44﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn44</font><img src='" + matchPair.emtcn44 + "' class = 'Emoticons' title = 'Emoticon 44﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn45﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn45</font><img src='" + matchPair.emtcn45 + "' class = 'Emoticons' title = 'Emoticon 45﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn46﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn46</font><img src='" + matchPair.emtcn46 + "' class = 'Emoticons' title = 'Emoticon 46﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn47﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn47</font><img src='" + matchPair.emtcn47 + "' class = 'Emoticons' title = 'Emoticon 47﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn48﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn48</font><img src='" + matchPair.emtcn48 + "' class = 'Emoticons' title = 'Emoticon 48﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn49﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn49</font><img src='" + matchPair.emtcn49 + "' class = 'Emoticons' title = 'Emoticon 49﻿'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/emtcn50﻿/gi, "<font class='hiddenTextField' style='display: none;'>\.\/emtcn50</font><img src='" + matchPair.emtcn50 + "' class = 'Emoticons' title = 'Emoticon 50'>");
	        shareComment_Box.innerHTML = shareComment_Box.innerHTML.replace(/\/bgm38/gi, "<font class='hiddenTextField' style='display: none;'>\.\/bgm38</font><img src='" + matchPair.bgm38 + "' class = 'Emoticons' title = 'BGM38'>");
	    }
	}
}
setInterval(replaceShareComment,3000);