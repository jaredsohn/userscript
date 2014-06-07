// ==UserScript==
// @name           Save to Delicious
// @namespace      www.google.com
// @description    Save page to Delicious with Crtl+D
// @include        http://*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://js-hotkeys.googlecode.com/files/jquery.hotkeys-0.7.9.min.js
// ==/UserScript==

// delicious provides this at http://www.delicious.com/help/bookmarklets
var SaveToDelicious = function() {f='http://www.delicious.com/save?url='+encodeURIComponent(window.location.href)+'&title='+encodeURIComponent(document.title)+'&notes='+encodeURIComponent(''+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text))+'&v=6&';a=function(){if(!window.open(f+'noui=1&jump=doclose','deliciousuiv6','location=yes,links=no,scrollbars=no,toolbar=no,width=550,height=550'))location.href=f+'jump=yes'};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}};

var SaveToDeliciousInit = function () {
  $(document).bind('keydown', 'ctrl+d', 
    function (e) {
      e.preventDefault(); // skip FF Ctrl+D
      SaveToDelicious();
    }
  );
};

SaveToDeliciousInit();

