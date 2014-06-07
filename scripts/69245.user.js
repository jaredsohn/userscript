// ==UserScript==
// @name          Yahoo! Mail Cleanup
// @version       2.0.3
// @namespace     coolsoft.altervista.org
// @include       http://*.mail.yahoo.*/*
// @description		This script will hide the big Ad panel shown in new Yahoo! Mail. Will also resize and reorganize the top area, leaving more vertical space for your mailbox. 
// @require       http://sizzlemctwizzle.com/updater.php?id=69245&show
// @author        Claudio Nicora
// @homepage      http://coolsoft.altervista.org
// ==/UserScript==
var debug = false;

if (!debug) {
  var GM_log = function() {};
} else if (unsafeWindow.console) {
  var GM_log = unsafeWindow.console.log;
}
GM_log('Yahoo! Mail Cleanup script started');

// GM_addStyle fix for Chrome (thanks to Uldry for Chrome suggestion)
if(typeof(GM_addStyle) == 'undefined') {
  function GM_addStyle(css) {
    var style = document.createElement('style').setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].appendChild(style).innerHTML = css;
  };
}

// remove elements
//removeElementByID('ymail-image');
removeElementByID('theAd');
GM_log('Unneeded elements removed');

// move the search bar
x = document.getElementById("search");
if(x) {
  x.style.zIndex='100';
  GM_log('Search bar moved');
}

// add custom styles to document
var styles = "\
  .col-hd { background-color: #E0E0E0 !important } \
  .nav-bar div.tabs { padding-left:0px !important } \
  div.nav-bar { top:44px !important; } \
  #main { top: 72px !important } \
  #uh { height:44px !important } \
  #uh div.right { right:15px !important } \
  #shellnavigation, #shellcontent { top:107px !important; right:0px !important; } \
  #search { position:relative !important; margin-top:30px !important; } \
";
GM_addStyle(styles);
GM_log('Styles changed');

// remove an element found by ID
function removeElementByID(strId) {
  var elem = document.getElementById(strId);
  if(elem) {
    elem.parentNode.removeChild(elem);
    GM_log('Element "' + strId + '" removed.');
  } else {
    GM_log('WARNING: Element "' + strId + '" not found.');
  }
}
