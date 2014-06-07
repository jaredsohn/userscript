// ==UserScript==
// @name           Reply Forums Using Shift+R Awesome for Abhi
// @namespace      OUG ROCKS 
// @author         Mr.Nobody Published In here By King Ninja
// @description    Credits : Mr Nobody and WWW.NBFUN.NET Press Shift +R To Reply Forums of orkut :) with signature Edit Ur Sign using savelink option or u might get my signature :) 
// @include        http://www.orkut.*/CommMsgs.aspx?*
// ==/UserScript==
function nb() {
    var header = "[B][I][Teal]Abhi's Replyin so Listen Up  [maroon]: ";//Header : ,  : 
    var footer = "\n\n\n\n\n[blue]☻☻☻  : [red]·´`·.¸.Whëñ i'm gööd, i'm ®ëålly gøød, ?¿? ßut whëñ i'm ßåd, i'm ßëttë®·´`·.¸.
";// Footer
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
