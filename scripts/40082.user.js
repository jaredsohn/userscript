// ==UserScript==
// @name           FogBugz Link Changer
// @namespace      cn.agatezone
// ==/UserScript==
//
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait,100);
  } else {
    $ = unsafeWindow.jQuery; letsJQuery();
  }
}
GM_wait();

// My code...
var OLD_VERSION = 2000;
var timer;

function letsJQuery() {
  timer = setInterval(change, 1000);
}

function change () {
  var jqLinksDiv = $('#idCVSOverflowDiv');
  if (jqLinksDiv.length == 0) return;
  var jqDivs = jqLinksDiv.find('div');
  jqDivs.each(function () {
    var jqLinks = $(this).find('>a');
    if (jqLinks.length < 1) return; 
    var jqLastLink = jqLinks.eq(jqLinks.length -1);
    var version = parseInt(jqLastLink.text());
    if (version < OLD_VERSION) {
      jqLinks.each(function () {
        this.href = this.href.replace(/viewvc.cgi\/code\/diamond/, "viewvc.cgi/projects/diamond");
      });
    }
  });

  clearInterval(timer);
}
