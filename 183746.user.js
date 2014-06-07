// ==UserScript==
// @name        Karachan.org Unlocker
// @namespace   http://userscripts.org/users/523668
// @description Blocks .js before page renders, adds some functions and generally makes the board more usable
// @include     *karachan.org/*
// @include     *64.120.230.218/*
// @version     56
// @author      Tomasz Działowy (Gimper)
// @run-at document-start
// ==/UserScript==

// Disable bible from working wherever beforescriptexecute event is not fired (eg. Chrome)
if (typeof document.origGEBTN == "undefined") {
  document.origGEBTN = document.getElementsByTagName;
  document.getElementsByTagName = function(a) {
    if (a == "blockquote") return [];
    else return document.origGEBTN(a);
  }
}

// Blacklist DOM Elements
var blacklist = 'script[src$="html5shiv.js"], iframe[src$="autoplay=1"], embed, object, div[style*="z-index:"][style*="fixed;"], link[title="Night"], option[value$="night.css"], style:not([data-source="gimper"])';

//try to inject css
var s = document.createElement('style');
s.setAttribute('data-source', 'gimper');
s.setAttribute('type', 'text/css');
s.innerText = 
    blacklist+" {\n"+
      "visibility: hidden !important;\n"+
      "display: none !important;\n"+
    "}\n"+
    
    "body {\n"+
      "background-image: none !important;\n"+
      "display: block !important;\n"+
    "}\n";


(document.head||document.documentElement).appendChild(s);

function demati() {
  var embeds = document.querySelectorAll(blacklist);
  for (i in embeds) {
    var elem = embeds[i];
    if (elem.parentNode) elem.parentNode.removeChild(elem);
  }

  var title = document.querySelectorAll('.boardSubtitle');
  if (title.length > 0) {
    title[0].innerHTML += "<div style='text-align: center'><iframe data-aa='10315' src='//ad.a-ads.com/10315?size=468x60' scrolling='no' style='width:468px; height:60px; border:0px; padding:0;overflow:hidden' allowtransparency='true'></iframe></div>";
  }

  if (typeof document.getElementById("switch") != "undefined") {
    if (document.getElementById("switch").href == "http://karachan.org/styles/night.css" ||
        document.getElementById("switch").href == "../styles/night.css" ||
        document.getElementById("switch").href == "") {
      document.getElementById("switch").href = "http://karachan.org/styles/roach.css";
    }
  }

  var boardDesc=document.querySelectorAll("div.boardTitle")[0];
  if (typeof boardDesc != "undefined" && boardDesc.innerHTML.split(" ")[0]=="/b/") {
    boardDesc.innerHTML = "/b/ - Random";
    document.title="/b/ - Random";
  }
}

demati(); // first fire

var changed = 0;

window.addEventListener('beforescriptexecute', function(e) {    
        src = e.target.src;
	if (src.search(/html5shiv\.js/) != -1) {
                changed++;
		e.preventDefault();
		e.stopPropagation();
	};

	if(changed == 1) window.removeEventListener(e.type, arguments.callee, true);
	
}, true);

function Main(){
demati(); // second fire

document.querySelector('div#bottom').innerHTML = "<br><div style='text-align: center'><iframe data-aa='10315' src='//ad.a-ads.com/10315?size=468x60' scrolling='no' style='width:468px; height:60px; border:0px; padding:0;overflow:hidden' allowtransparency='true'></iframe><br />Donate some Bitcoins for Karachan.org Unlock script creators: 1PSEhALQA4Y62uPhyCxnHibAAXAD6kobsQ<br /></div>";

document.getElementById('boardLinks').innerHTML += ' [tajne: <a href="/wykop/">wykop</a> / <a href="/&#1101;&#1083;&#1080;&#1090;&#1072;/">&#1101;&#1083;&#1080;&#1090;&#1072;</a>] [inne chany: <a href="https://pl.vichan.net/">vichan</a> / <a href="http://heretichan.org/b/">heretichan</a> / <a href="https://kiwiszon.org/boards/b/">kiwiszon</a> / <a href="http://krochan.home.pl/b/">krochan</a> / <a href="http://cebulgrad.ml/chan/">minechan</a>] [<a href="https://kiwiirc.com/client?settings=1dbff5e2beb19457ab5080f9f75b5158">Chat</a>] ';

// JQuery goodies
if (typeof $ != "undefined") {
  // Show captcha on page load
  $("#captchaClickHere").click();

  // Automatically update threads
  $(".updateCheck:first").click();

  // Fix settings location
  $('span[style="float:right;"]').detach().appendTo("#boardLinks");

  // Enhancements to settings and version awareness
  localStorage.gimper_version = 0;
  localStorage.o_updater = 1;
  localStorage.o_imgexpand = 1;
  if (typeof $.cookie != "undefined") {
    $.cookie("mitsuba_style", "http://karachan.org/styles/roach.css", { expires: 1024, path: '/' });
    if (document.getElementById("switch") != "undefined") {
      document.getElementById("switch").href = "http://karachan.org/styles/roach.css";
    }
  }
}

}
window.addEventListener("DOMContentLoaded", Main, false);