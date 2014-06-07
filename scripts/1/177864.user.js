// ==UserScript==
// @name       Novandri_Cleaner
// @namespace  http://kuntau.org/
// @version    0.1
// @description  Clean & remove junks from http://novandri.blogspot.com
// @match 	   http://novandri.blogspot.com/*
// @copyright  2013+, Kuntau Inc.
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant	   unsafeWindow
// @noframes
// @run-at	   document-end
// ==/UserScript==

// In-case conflict with site's jquery
this.$ = this.jQuery = jQuery.noConflict(true);

// Stuff to blocks
var to_block_id = [
  'Followers1',
  'Image1',
  'HTML1',
  'HTML3',
  'Image9',
  'BlogList2',
  'BlogList3',
  'BlogList4',
  'rufus-sandbox',
  'navbar',
  'lws_0',
  'oauth2relay388745880'
];
var to_block_class = [
  'column-right-outer',
  'body-fauxcolumns',
  'fauxcolumn-outer.fauxcolumn-center-outer',
  'fauxcolumn-outer.fauxcolumn-left-outer',
  'fauxcolumn-outer.fauxcolumn-right-outer'
];

var removeId = function(ids) {
  for (var c=0; c < ids.length; c++) {
    var id = document.getElementById(ids[c]);
    if (id) { id.parentNode.removeChild(id); }
  }
};

var removeClass= function(elms) {
  for (var c=0; c < elms.length; c++) {
    var elm = document.getElementsByClassName(elms[c]);
    for (var i=0; i < elm.length; i++) {
      if (elm[i]) { elm[i].parentNode.removeChild(elm[i]); }
    }
  }
};

var removeElm = function (elm) {
  var elms = document.getElementsByTagName(elm);
  console.log(elms);
  for (var i = 0, len = elms.length; i < len; i++) {
    //console.log(elms[0] + " = " + len + " : " + i);
    elms[0].parentNode.removeChild(elms[0]);
  }
};

removeElm('iframe');
removeElm('footer');
removeId(to_block_id);
removeClass(to_block_class);

$('body').css({
  'margin': '0 auto'
});

$('#Header1_headerimg')
.css({
  'height': '90',
  'width': '930',
});

$('#main').css('width', '900');
$('.main-inner').css('padding-top', '0');
