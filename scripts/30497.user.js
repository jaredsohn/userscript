// ==UserScript==
// @name           Reply Forums Using Shift+R Awesome for Shrenik
// @namespace      OUG ROCKS 
// @author         Mr.Nobody Published In here By Shrenik
// @description    Credits : Mr Nobody and WWW.NBFUN.NET Press Shift +R To Reply Forums of orkut :) with signature Edit Ur Sign using savelink option or u might get my signature :) 
// @include        http://www.orkut.*/CommMsgs.aspx?*
// ==/UserScript==
function nb() {
    var header = "[B][I][Teal]Dragon Fires  [silver]: ";//Header : ,  : 
    var footer = "\n\n\n\n\n[blue]☻☻☻  : [red]·´`·.¸.®It's not that I'm always right, it's just that the rest of the world is always wrong®·´`·.¸.
"[8)] Shrenik[:)];// Footer
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
