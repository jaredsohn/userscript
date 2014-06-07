// ==UserScript==
// @name           Twitter Delete My Tweet
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @description    One-time tweet delete
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        0.0.3
// ==/UserScript==

/*
v0.0.3(20100211) .__delBtn__ + z-index


Recommend install the twitter.AutoPager(http://userscripts.org/scripts/show/47998).

If you have already installed the AutoPagerize,
add "http://twitter.com/*" and "https://twitter.com/*" to @exclude.


If the server is busy in twitter, some mistakes would be caused.
*/


var fnc = function(doc) {
  if(doc.nodeName == "#document") {
    var tw = doc.querySelectorAll(".mine");
    for(var i=0; i<tw.length; i++) {
      tw[i].addEventListener("click", toggleClass, false);
    }
  } else {
    if(/ mine /.test(doc.className)) {
      doc.addEventListener("click", toggleClass, false);
    }
  }
}
var toggleClass = function() {
  (/__delTw__/.test(this.className)) ? this.className = this.className.replace(/__delTw__/,"") : this.className += " __delTw__";
}
fnc(document);


if(window.AutoPagerize) {
  boot();
} else {
  window.addEventListener("GM_AutoPagerizeLoaded", boot, false);
}
function boot() {
  window.AutoPagerize.addFilter(function(docs) {
    docs.forEach(fnc);
  });
}


var btn = document.createElement("input");
btn.className = "__delBtn__";
btn.type = "button";
btn.value = "delete my tweet";
btn.addEventListener("click", btnEvent, false);
document.body.appendChild(btn);

function btnEvent(){
  var delTw = document.querySelectorAll(".__delTw__");
  if(delTw.length && !confirm(delTw.length + " select.\nSure you want to delete this tweet? There is NO undo!")) {return false;} 
  for(var i=0; i < delTw.length; i++) {
    (function(i){
      var D = "/status/destroy";
      var F = delTw[i].id.replace(/status_/, "");
      var E = /latest_status/.test(delTw[i].className);
      unsafeWindow.$.ajax({
        type : "POST", url : D + "/" + F, data : {
          authenticity_token : unsafeWindow.twttr.form_authenticity_token, latest_status : E
        },
        dataType : (D == "/status/destroy" ? "json" : null),
        beforeSend : function (){
          delTw[i].querySelector(".del").className = "del-throb";
        },
        success : function (G){
          setTimeout(function(){delTw[i].parentNode.removeChild(delTw[i]);}, 500);
          if (D == "/status/destroy") {
            if (E) {
              unsafeWindow.twttr.processJson(G);
              unsafeWindow.updateLatest();
            }
          }
        }
      });
    })(i);
  }
}


GM_registerMenuCommand("Twitter Delete My Tweet - Rerun", reRun);
function reRun() {
  var all = document.querySelectorAll(".mine");
  for(var i=0; i<all.length; i++) {
    all[i].removeEventListener("click", toggleClass, false);
    all[i].addEventListener("click", toggleClass, false);
  }
}

GM_registerMenuCommand("Twitter Delete My Tweet - Select all", selectAll);
function selectAll() {
  if(!confirm("Select all OK?")) {return false;}
  var all = document.querySelectorAll(".mine");
  for(var i=0; i<all.length; i++) {
    if(!/__delTw__/.test(all[i].className)) all[i].className += " __delTw__";
  }
}

GM_registerMenuCommand("Twitter Delete My Tweet - Unselect all", unselectAll);
function unselectAll() {
  if(!confirm("Unselect all OK?")) {return false;}
  var all = document.querySelectorAll(".mine");
  for(var i=0; i<all.length; i++) {
    if(/__delTw__/.test(all[i].className)) all[i].className = all[i].className.replace(/__delTw__/,"");
  }
}

addCSS(".__delTw__{opacity:0.3;} .__delBtn__{position:fixed; right:10px; bottom:10px; z-index:10000;}");
function addCSS(css){
  var style = document.createElement("style");
  style.type = "text/css";
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
  style.appendChild(document.createTextNode(css+"\n"));
}