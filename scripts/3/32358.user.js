// ==UserScript==
// @name           Reply Forums Using Shift+R Awsome for Shrenik
// @namespace      OUG ROCKS 
// @author         Mr.Nobody Published In here By Shrenik
// @description    Credits : Mr Nobody and WWW.NBFUN.NET Press Shift +R To Reply Forums of orkut :) with signature Edit Ur Sign using savelink option or u might get my signature :) 
// @include        http://www.orkut.com*/CommMsgs.aspx?*
// ==/UserScript==
function nb() {
    var header = "[B][I][purple]√ƺ™'s :  ̲̅ร̲̅h̲̅я̲̅є̲̅и̲̅i̲̅k̲̅  [8)]\n[blue]шε αгε τнε Θгιgιπαlš [8)]\n\n[silver][maroon]ÐrÃ9Øñ ƒIr£s[navy]☞ [violet] ";//Header : ,  : 
    var footer = "\n\n\n\n\n [olive]πΘ, |šнгεπικ| ιš πΘτ мγ гεαl παмε. ι αм вгεακιπg ιτ ιπ ƒΘг α ƒгιεπ∂ [/)] [:D]";// Footer
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
