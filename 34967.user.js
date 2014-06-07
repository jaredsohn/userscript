// ==UserScript==
// @name           Additional Plurk Emoticons
// @namespace      tag:kris7topher@gmail.com,2008-01-07:AdditionalPlurkEmoticons
// @description    Extends Plurk's emoticon set (hopefully)
// @include        http://www.plurk.com/user/*
// ==/UserScript==

(function() {
reset = function(silent) {
if (!silent) {
if (!confirm('This will erase all custom emoticons and cannot be undone. Are you sure?')) return;
if (confirm('Click YES to cancel the reset. Click NO to proceed and load the default set.')) return;
}
GM_setValue('pref1','is.gd/3ylw#.gif|is.gd/3yoW#.gif|is.gd/3yp0#.gif|is.gd/3ypt#.gif|is.gd/3ypv#.gif|is.gd/3ypy#.gif|is.gd/3ypz#.gif|is.gd/3ypA#.gif');
GM_setValue('pref2','http://mysmiley.net/imgs/smile/sign/sign0110.gif|http://mysmiley.net/imgs/smile/happy/happy0126.gif|http://mysmiley.net/imgs/smile/party/party0024.gif|http://mysmiley.net/imgs/smile/ashamed/ashamed0001.gif|http://mysmiley.net/imgs/smile/innocent/innocent0004.gif|http://mysmiley.net/imgs/smile/animals/animal0018.gif|http://mysmiley.net/imgs/smile/fighting/fighting0004.gif|http://mysmiley.net/imgs/smile/cool/cool0044.gif');
if (!silent) document.location.reload();
};
if (GM_getValue('pref1','NULL')=='NULL') {
reset(true);
}
GM_registerMenuCommand('Reset all emoticons (use with care!)', reset);
style = document.createElement("style");
style.setAttribute("type", "text/css");
style.innerHTML = ".pictureservices[href$=gif] {display: inline !important} .pictureservices img[src$=gif] {vertical-align: top; border: 0; padding: 0 !important; margin: 0 !important} #emoticon_selecter td {text-align: center}";
document.getElementsByTagName("head")[0].appendChild(style);
setTimeout(function() {
cont = document.getElementById("emoticon_selecter");
if (cont == null) {
setTimeout(arguments.callee, 1000);
return;
}
tfoot = document.createElement("tfoot");
txt = '<tr>';
pref1 = GM_getValue('pref1').split('|');
pref2 = GM_getValue('pref2').split('|');
for (i=0;i<pref1.length;i++) {
if (i % 8 == 0 && i != 0) txt += "</tr><tr>";
txt += '<td><a href="#"><img style="vertical-align:middle" alt="' + pref2[i] + '" src="' + (pref2[i].indexOf('http://') < 0 ? 'http://' + pref2[i] : pref2[i]) + '" onclick="Ismiley(\'' + pref1[i] + '\')"></a><a style="font-size:9px;color:#888" href="#" id="remover' + i + '">[X]</a></td>';
}
txt += '</tr><tr><td style="text-align:left;padding-left:15px"><a style="font-size:10px;color:#888" href="#" id="adder">[add]</a></td><td colspan=7 style="text-align:right;padding-right:15px"><span style="font-size:10px;color:#888">Additional Plurk Emoticons v0.2</span></tr>';
cont.firstChild.appendChild(tfoot);
tfoot.innerHTML = txt;
Ismiley = function(href) {
if (document.getElementById("form_holder").style.display == "none") x = document.getElementById("input_big");
else x = document.getElementById("input_small");
x.value += " " + href + " ";
x.focus();
};
unsafeWindow.Ismiley = Ismiley;
Rsmiley = function(one, two) {
if (!confirm('Are you sure? This action udone be reversed!')) return;
GM_setValue('pref1', GM_getValue('pref1').replace(one + '|', '').replace('|' + one, ''));
GM_setValue('pref2', GM_getValue('pref2').replace(two + '|', '').replace('|' + two, ''));
document.location.reload();
};
for (i=0;i<pref1.length;i++) {
document.getElementById('remover' + i).addEventListener('click', (function(one, two){return function(){Rsmiley(one, two)};})(pref1[i], pref2[i]), true);
}
Asmiley = function() {
one = window.prompt("Text to be insterted to the plurk:\n(should end with #.gif if it is a picture link)");
if (one == undefined || one == null || one == '') return;
two = window.prompt("Image or plain text to be shown in the emoticon selecter:\n(leave blank to use the text insterted)");
if (two == undefined || two == null || two == '') two = one;
GM_setValue('pref1', GM_getValue('pref1') + '|' + one);
GM_setValue('pref2', GM_getValue('pref2') + '|' + two);
document.location.reload();
};
document.getElementById('adder').addEventListener('click', Asmiley, true);
}, 1000);
})();