// ==UserScript==
// @name           Quick Reply in Topics (With signature)
// @namespace      Nbfun.net
// @author         popoye the code|Mr.Nobody
// @description    Reply in any orkut community with Shift+R
// @include        http://www.orkut.*/CommMsgs.aspx?*
// ==/UserScript==
function nb() {
    var header = " ";           //HEADER , Keep it as blank if u don't need it, Write your header between the quotes, use \n for a line space. 
    var footer = " \n\n\n\n\n[b]==>[red]∑∫[√H@CKER]<= $ØÚVïĊÔ[/red] \n\n[b]==>[teal]:::I WaNnA KnOw SoMeThInG oF eVeRyThInG:::[/teal]\n\n==>[navy]tHe MaveRiCk WhO hAlLuCiNaTe SaTaNiSm[/navy] \n\n==>[red]Join :::WHC:: --- http://www.orkut.co.in/Community.aspx?cmm=29279263  ";//FOOTER , Write your footer between the quotes, use \n for a line space.
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
fnCheckShortcut = function (e) {if (e.shiftKey && e.keyCode == 82) {nb();}};
document.addEventListener("keydown", fnCheckShortcut, 0);
