// ==UserScript==
// @name           Q
// @namespace      O
// @author         A
// @description    Reply in any orkut community with Shift+R
// @include        http://www.orkut.*/CommMsgs.aspx?*
// ==/UserScript==
function nb() {
    var header = " ";//HEADER , keep it as blank if u dont need it 
    var footer = "\n\n\n\n[b][silver]\n----------------------------------\n [b][8)] ♫ ♪ Ðєєקąɲкąг Şђąгмą ♪ ♫ [8)][/silver][/b][silver][b] \n\----------------------------------[/silver][/b]";// Footer
    //Dont change anything below
    f = prompt("Enter Your Reply:", "");
    body = encodeURIComponent(header + f + footer);
    cmm = location.href.match(/cmm.*/);
    a = document.forms[1];
    a = document.forms[1];
    a.action = "/CommMsgPost.aspx?" + cmm + "&bodyText=" + body + "&Action.submit";
    a.submit();
}

var bodies;
var fnCheckShortcut;
fnCheckShortcut = function (e) {if (e.shiftKey && e.keyCode == 82) {nb();}};
document.addEventListener("keydown", fnCheckShortcut, 0);