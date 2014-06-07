// ==UserScript==
// @name           Anuj
// @namespace      OUG ROCKS 
// @author         Mr.Nobody Published In here By King Ninja
// @description    Credits : Mr Nobody and WWW.NBFUN.NET Press Shift +R To Reply Forums of orkut :) with signature Edit Ur Sign using savelink option or u might get my signature :) 
// @include        http://www.orkut.*/CommMsgs.aspx?*
// ==/UserScript==
function nb() {
    var header = "[B][I][red]คиuj яєþlyz รσ Liรтєи Uþ [blue]: ";//Header : ,  : 
    var footer = "\n\n\n\n\n[b][teal]☻☻☻ Lifє iรи'т fคiя. Iт'ร juรт fคiяєя тhคи dєคтh, тhคт'ร คll.  [8)]☻☻☻";// Footer
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
