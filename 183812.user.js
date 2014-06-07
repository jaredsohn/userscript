// ==UserScript==
// @name        Karachan.org Unlocker Official
// @namespace   http://userscripts.org/users/523668
// @description Karachan Unlocker without ads
// @include     *karachan.org/*
// @include     *64.120.230.218/*
// @version     -2
// @run-at document-start
// ==/UserScript==

clearInterval(2); // optimize mati's scripts in chrome

// remove mutation observer xD
window.MutationObserver = function() { return { observe: function() {} }; };

if (typeof localStorage.gimper2_version == "undefined") {
  if (typeof localStorage.gimper_version != "undefined") { // mati ty lisku chytrusku
    localStorage.gimper2_version = localStorage.gimper_version;
    localStorage.removeItem("gimper_version");
  }
}
localStorage.removeItem("gimper_version");

if (typeof localStorage.kunlock_version == "undefined") {
  if (typeof localStorage.gimper2_version != "undefined") { // mati ty lisku chytrusku
    localStorage.kunlock_version = localStorage.gimper2_version;
    localStorage.removeItem("gimper2_version");
  }
}
localStorage.removeItem("gimper2_version");

// Disable bible from working wherever beforescriptexecute event is not fired (eg. Chrome)
(function(z){
  window[z] = window.setInterval;
  window.setInterval = function(a, b) {
    if (b == 1) return true;
    else return window[z](a,b);
  };
})(Math.random());

(function(z){
  document[z] = document.getElementsByTagName;
  document.getElementsByTagName = function(a) {
    if (a == "blockquote") return [{ innerHTML: "r" }];
    else return document[z](a);
  }
})(Math.random());

(function(z){
  document[z] = document.getElementsByClassName;
  document.getElementsByClassName = function(a) {
    if (a == "boardSubtitle") return [{ innerHTML: "r" }];
    else return document[z](a);
  };
})(Math.random());

(function(z){
  document[z] = document.getElementById;
  document.getElementById = function(a, b) {
    if (a == "boardLinks" && (typeof b == "undefined" || b != 'gimper')) return { innerHTML: "r", nextSibling: {innerHTML: "r"}, textContent: "r" };
    else return document[z](a);
  };
})(Math.random());

(function(demati){

var uniqid = Math.random();

// Blacklist DOM Elements
var blacklist = 'script[src$="html5shiv.js"], iframe[src$="autoplay=1"], embed, object, div[style*="z-index:"][style*="fixed;"], link[title="Night"], option[value$="night.css"], style:not([data-source="gimper"]), #gimperOverlay, #gimperWarning, head script:not([src]), #regulamin';

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
      "margin-top: 32px;\n"+
    "}\n";

(document.head||document.documentElement).appendChild(s);



demati(uniqid, blacklist); // first fire

//var changed = 0;

window.addEventListener('beforescriptexecute', function(e) {    
        //src = e.target.src;
	//if (src.search(/html5shiv\.js/) != -1) {
        //  changed++;

        //alert(e.target.src);

        if (typeof e.target != "undefined" && typeof e.target.src != "undefined" && e.target.src == "http://karachan.org/js/jquery.js") {
          var t = document.createElement('script');
          t.setAttribute('src', 'https://raw.github.com/Gimperr/kara-js/master/combined.js');
          (document.head||document.documentElement).appendChild(t);
          e.preventDefault();
	  //e.stopPropagation()
        }
        else if (typeof e.target != "undefined" && typeof e.target.src != "undefined" && e.target.src == "https://raw.github.com/Gimperr/kara-js/master/combined.js") {
           // well okay
        }
        else if (typeof e.target != "undefined" && typeof e.target.src != "undefined" && e.target.src == "http://st2.freeonlineusers.com/on1.php?id=1460483") {
           // let zalgo count me xD   
        }
        else {
          e.preventDefault();
	  //e.stopPropagation();
	}

	//if(changed == 1) window.removeEventListener(e.type, arguments.callee, true);	
}, true);

window.addEventListener("DOMContentLoaded", function(){
if (typeof hidesnow != "undefined") { hidesnow(); }

demati(uniqid, blacklist); // second fire

if (typeof document.getElementById('boardLinks', 'gimper') !== "undefined" && document.getElementById('boardLinks', 'gimper')) {
document.getElementById('boardLinks', 'gimper').innerHTML += ' [tajne: <a href="/wykop/">wykop</a> / <a href="/&#1101;&#1083;&#1080;&#1090;&#1072;/">&#1101;&#1083;&#1080;&#1090;&#1072;</a>] [inne chany: <a href="http://heretichan.org/b/">heretichan</a> / <a href="https://kiwiszon.org/boards/b/">kiwiszon</a> / <a href="http://krochan.pl/b/">krochan</a> / <a href="http://cebulgrad.ml/chan/">minechan</a>]';
}

(function(jqf) {

var jqtest = function() {
  if (!jqf()) {
    setTimeout(jqtest, 100);
  }
};
setTimeout(jqtest, 250);

})
(function() {

// JQuery goodies
if (typeof $ != "undefined") {
  // Show captcha on page load
  $("#captchaClickHere").click();

  // Automatically update threads
  $(".updateCheck:first").click();

  // Fix settings location
  $('span[style="float:right;"]').detach().appendTo("div#boardLinks");
  // Try again later if unsuccessful
  $(function() {
    $('span[style="float:right;"]').detach().appendTo("div#boardLinks");
  });

  // Demote christmas seba
  $('#postform>img').css('z-index', '-1');

  // Fix background
  $('body').css('margin-top', '32px');

  // Let's check out how many users use Gimper's script
  $('<img src="http://st2.freeonlineusers.com/on2.php?id=1490605" style="width:0;height:0;" />').appendTo("i#counter");

  // Remove acception/rejection of rules
  //$.cookie("regulamin", "", { expires: -1024, path: '/' });

  // Enhancements to settings and version awareness
  if (typeof localStorage.kunlock_version == "undefined") {
    localStorage.kunlock_version = 39;

    localStorage.o_updater = 1;
    localStorage.o_imgexpand = 1;
  }
  if (localStorage.kunlock_version == 39 || localStorage.kunlock_version == 44) { // migrate 39->44->52
    localStorage.kunlock_version = 52;
    if (typeof $.cookie != "undefined") {
      $.cookie("mitsuba_style", "http://karachan.org/styles/roach.css", { expires: 1024, path: '/' });
      if (document.getElementById("switch") != "undefined") {
        document.getElementById("switch").href = "http://karachan.org/styles/roach.css";
      }
    }
  }
  if (localStorage.kunlock_version == 52) {
    localStorage.kunlock_version = 57;
//
    if (typeof localStorage.gimperr_version !== "undefined" || typeof localStorage.kunlock_version !== "undefined") {
//
    }
  }
  if (localStorage.kunlock_version == 57) {
    localStorage.kunlock_version = "";
  }
  return true;
}
return false;
});

}, false);

})(function(adsset, blacklist) {
  clearInterval(2); // optimize mati's scripts in chrome
  var embeds = document.querySelectorAll(blacklist);
  for (i in embeds) {
    var elem = embeds[i];
    if (elem.parentNode) elem.parentNode.removeChild(elem);
  }

  var title = document.querySelectorAll('.boardSubtitle');
  if (title.length > 0) {
    if (typeof window[adsset] == "undefined") {
      window[adsset] = true;
      title[0].innerHTML += "</iframe></center>";
    }
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

  //jebac_4okiego = function() { return true; };
  clearInterval(2); // optimize mati's scripts in chrome
});