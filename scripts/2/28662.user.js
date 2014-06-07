// ==UserScript==
// @name           Quick Reply in Topics (With signature)
// @namespace    Mr.jerry
// @author          Nobody
// @description    Reply in any orkut community with Shift+D
// @include         http://www.orkut.*/CommMsgs.aspx?*
// ==/UserScript==
function nb() {
    var header = "";           //HEADER , Keep it as blank if u don't need it, Write your header between the quotes, use \n for a line space. 
    var footer = "\n\n\n\n\n\n\n\n\n [i][b][purple]●▬╡‹¦[«-Mr.jєяяy-»]¦›╞▬● ";//FOOTER , Write your footer between the quotes, use \n for a line space.
    //Dont change anything below
    f = prompt("Enter Your Reply:", "");
    if(f!=null)
    {
    body = encodeURIComponent(header + f + footer);
    cmm = location.href.match(/cmm.*/);
    a = document.forms[1];
    a = document.forms[1];
    a.action = "/CommMsgPost.aspx?" + cmm + "&bodyText=" + body + "&Action.submit";
    a.submit();
    }
}

var bodies;
var fnCheckShortcut;
fnCheckShortcut = function (e) {if (e.shiftKey && e.keyCode == 68) {nb();}};
document.addEventListener("keydown", fnCheckShortcut, 0);
