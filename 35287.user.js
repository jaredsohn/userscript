// ==UserScript==
// @name           More Plurk Smilies
// @namespace      tag:@lidsa,2008-09-10:MorePlurkSmilies
// @description    More Plurk's Smilies set (credit for kris7topher@gmail.com)
// @include        http://www.plurk.com/*
// ==/UserScript==

(function() {
emoticons = [

// ==CONFIGURATION==
/* SYNTAX:
 *
 * ["text inserted", "image url"],
 *
 */
// ==/CONFIGURATION==

];
style = document.createElement("style");
style.setAttribute("type", "text/css");
style.innerHTML = ".pictureservices[href$=gif] {display: inline !important; cursor:default} .pictureservices[href$=jpg] {cursor:default} .pictureservices[href$=png] {cursor:default} .pictureservices img[src$=gif] {vertical-align: top; border: 0; padding: 0 !important; margin: 0 !important} #emoticon_selecter td {text-align: center; width:100%}";
document.getElementsByTagName("head")[0].appendChild(style);
setTimeout(function() {
cont = document.getElementById("emoticon_selecter");
if (cont == null) {
setTimeout(arguments.callee, 1000);
return;
}
tfoot = document.createElement("tfoot");
txt = '<tr>';
for (i=0;i<emoticons.length;i++) {
if (i % 8 == 0 && i != 0) txt += "</tr><tr>";
txt += '<td><a href="#"><img src="' + emoticons[i][1] + '" onclick="Csmiley(\'' + emoticons[i][0] + '\')"></a></td>';
}
txt += '</tr>';
cont.firstChild.appendChild(tfoot);
tfoot.innerHTML = txt;
Csmiley = function(href) {
if (document.getElementById("form_holder").style.display == "none") x = document.getElementById("input_big");
else x = document.getElementById("input_small");
x.value += " " + href + "#.gif ";
x.focus();
};
unsafeWindow.Csmiley = Csmiley;
}, 1000);
})();