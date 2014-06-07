// ==UserScript==
// @name           Wikipedia - Find This Revision
// @namespace      http://davidjcobb.deviantart.com/
// @description    Quickly finds the URL to the archived copy of a Wikipedia article.
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==

/*window.modalnode=document.createElement("div");
window.modalnode.id="DJC-GM-WpFindRev";

var CSS=""+
"#DJC-GM-WpFindRev{z-index:999;display:none;position:fixed;left:50%;top:50%;margin:-100px 0 0 -150px;width:300px;height:200px;-moz-border-radius:30px;background:#000;background:rgba(0,0,0,.75);padding:10px;text-align:center;font-size:20px;color:#FFF;}\n"+
"#DJC-GM-WpFindRev>a:link,#DJC-GM-WpFindRev>a:hover,#DJC-GM-WpFindRev>a:visited,#DJC-GM-WpFindRev>a:active{color:#FFF}";
var S=document.createElement("style");
S.innerHTML=CSS;
document.body.appendChild(S);
document.body.appendChild(window.modalnode);*/

window.getHistoryURL=
function() {
   var $U=unsafeWindow,URL="http://";
   if($U.wgCurRevisionId&&$U.wgPageName) {
      URL+=($U.wgContentLanguage||"en")+".wikipedia.org/w/index.php?title="+$U.wgPageName+"&oldid="+$U.wgCurRevisionId;
      /*window.modalnode.style.display="block";
      window.modalnode.innerHTML="Permalink to this revision of this article:<br><br>"+URL+"<Br><Br><a onclick='this.parentNode.parentNode.removeChild(this.parentNode)'>Close</a>";*/
      prompt("Permalink to this revision of the article:",URL);
   } else {
      alert("Unable to retrieve the URL for this revision.");
   }
};

var X=document.createElement("div");
X.innerHTML='<li><a title="Permalink to this revision" href="" onclick="return false">Permalink</a></li>';
X=X.firstChild;
X.parentNode.removeChild(X);
document.getElementById("ca-history").parentNode.appendChild(X);
X.firstChild.addEventListener("click",window.getHistoryURL,false);


GM_registerMenuCommand("WP - Find This Revision in the Edit History",window.getHistoryURL);