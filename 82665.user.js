// ==UserScript==
// @name           SH
// @namespace      SH
// @description    SH improvements
// @include        http://www.sodahead.com/*
// ==/UserScript==

//Do this without delay
var footer = document.getElementById('footerLinkContainer');
footer.parentNode.removeChild(footer);

//var log = unsafeWindow.console.log;
var $;
// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
      var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
      GM_JQ = document.createElement('script');
      GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
      GM_JQ.type = 'text/javascript';
      GM_JQ.async = true;
      GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();
// Check if jQuery's loaded
function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery.noConflict(true);
    main();
  }
}
function addCss(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function main() {
  fixCss();
  removeJunk();
  menuHover();
  fixRaves();
  fixReply();
  fixSodaFeed();
  fixComments();
  fixPaging();
}

function fixCss(){
  addCss([
      '#comments .ajaxReply{ background-position: center -1025px;color:#000; width:70px;}',
      '#sodastars{ display:none;}'
  ].join(''));
}
function menuHover(){
  $('#appsMenu ul li').hover(function(){
      $(this).find('ul').css('display', 'block');
  }, function(){
    $(this).find('ul').css('display', 'none');
  });
}
function removeJunk(){
  // Ads
  $('ins').html('').css('height', 0);
  unsafeWindow.kosmix = {};
  // Annoying shit
  $('.subContent iframe, #relatedTopics, #shareScripts, div.pagingAd').remove();
  // Remove 'frequency links'
  $('#summaryDescription a').each(function(){
      if($(this).attr('href').indexOf('frequency.com') != -1){
        $(this).remove();
      }
  });
}
function fixRaves(){
  $('.unRavedUp').css('width', '72px').find('.raveGrow').css('width', '70px');
}
function fixReply(){
}
function fixSodaFeed(){
  var oldTT = unsafeWindow.SH.remote.toolTips;
  unsafeWindow.SH.remote.toolTips = function(str){
    if(str != 'sodaFeedBody'){
      oldTT(str);
    }
  };
}
function fixComments(){
  $('#comments img, #topcomments img, #summaryDescription img').each(function(){
      if(this.naturalWidth > 350){
        $(this).css({'width': 'auto', 'maxWidth': '570px', 'height': 'auto'});
      }
  });
}
function fixPaging(){
  $('div.pagingBottom .paging').clone().css({'padding': 0, 'overflow': 'auto'}).prependTo('#comments #comments');
  $('#category div.paging').clone().css({'padding': 0, 'overflow': 'auto'}).prependTo('#contentListing');
}
