// ==UserScript==
// @name       Video ads/counter skipper
// @description  Skip video ads and counters
// @copyright  2013+, Lev Kitsis
// @namespace  http://www.kitsis.ca/
// @version    0.4
// @updateURL  http://userscripts.org/scripts/source/177173.meta.js
// @installURL http://userscripts.org/scripts/source/177173.user.js
// @grant      unsafeWindow
// @include    http://*/rc.php?Id=*
// @include    http://*/videos.php?Id=*
// @include    http://*.cc/pc/*/
// @include    http://*.ws/file/*
// @include    http://*.ws/video/*
// @include    http://*.me/video/*
// @include    http://*.co/video/*
// @include    http://*.co/play/*
// @include    http://*sharesix.*/*
// @include    http://*filenuke.*/*
// @include    http://daclips.in/*
// @include    http://nosvideo.com/*
// @include    http://mightyupload.com/*
// @include    http://www.watchfreeinhd.com/*
// @include    http://www.embedder.eu/frame.php?url=*
// ==/UserScript==



var redirected = false;
var btnNames = ['Video', 'Play', 'Yes', 'watch', 'Continue', 'Please', 'wait', 'Free'];
var url = location.href;

if(inArray(url, ['www.embedder.eu'])) {
  location.href = url.replace('http://www.embedder.eu/frame.php?url=', '');
} else if(inArray(url, ['/rc.php?'])) {
  location.href = url.replace('/rc.php?', '/videos.php?');
} else if(inArray(url, ['/pc/'])) {
  location.href = url.replace('/pc/', '/playerframe.php?Id=').replace(/\/$/,'');
} else if(findSubmit()) {
  
} else if(!redirected) {
  
  var arrFn = ['closead', 'player_start', 'hideOverlay'];
  for(var i in arrFn) {
    if(typeof unsafeWindow[arrFn[i]] === 'function') {
      unsafeWindow[arrFn[i]]();
    }
  }
  
}
  
function inArray(strData, arrFind) {
  for(var i in arrFind) {
    if(strData.indexOf(arrFind[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function findForm() {
  if(document.forms) {
    for(var x in document.forms) {
      if(document.forms[x] && document.forms[x].getElementsByTagName) {
        var inputs = document.forms[x].getElementsByTagName('input');
        if(inputs) {
          for(var y in inputs) {
            if(inputs[y] && inputs[y].getAttribute && inputs[y].getAttribute('type') === 'submit' && inArray(inputs[y].getAttribute('value'), btnNames)) {
              console.log(inputs[y], inputs[y].click);
              redirected = true;
              inputs[y].click();
              //document.forms[x].submit();
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

function findSubmit() {
  if(document.forms) {
    var inputs = document.getElementsByTagName('input');
    if(inputs) {
      for(var y in inputs) {
        if(inputs[y] && inputs[y].getAttribute && inputs[y].getAttribute('type') === 'submit' && inArray(inputs[y].getAttribute('value'), btnNames)) {
          redirected = true;
          if(inputs[y].mousedown) {
          	inputs[y].mousedown();
          } else if(inputs[y].click) {
          	inputs[y].click();
          }
          return true;
        }
      }
    }
  }
  return false;
}