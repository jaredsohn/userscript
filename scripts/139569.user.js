// ==UserScript==
// @name        Show Timecops posts
// @namespace   rcgroups
// @include     http://www.rcgroups.com/forums/*
// @version     2
// @author      Mulder_
// ==/UserScript==


if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

var hreftags = document.getElementsByTagName("a");


for ( var n = 0; n < hreftags.length; n ++) {
          script = hreftags[n].getAttribute('onclick');
          if ( script != null && script.length > 0 && script.startsWith('return display_post') ) {
             //eval('unsafeWindow.'+script.split(' ')[1]);
             if ( unsafeWindow.display_post ) {
               eval('unsafeWindow.'+script.split(' ')[1]);
             } else {
               createScript(script.split(' ')[1]);
             }
          }
}

function createScript(scriptText) {
  var rwscript = document.createElement("script");
  rwscript.type = "text/javascript";
  rwscript.textContent = scriptText;
  document.documentElement.appendChild(rwscript);
  rwscript.parentNode.removeChild(rwscript);
}
