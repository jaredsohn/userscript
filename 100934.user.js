// ==UserScript==
// @name           Slashdot Overview
// @namespace      http://griffeltavla.wordpress.com
// @description    Collapses stories on Slashdot
// @version        1.0.2
// @include        http://slashdot.org/*
// @include        http://*.slashdot.org/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==


function init($) {
  $('head').append('<style type="text/css">                '+
      '.article div.bh, .bh{ display: none !important; }   '+
      'article { margin: 0px !important;}                  '+
      '#mincb {float:right !important; margin-top:0.5em}   '+
    '</style>');
    
  var minimize = function(){
    $('article .hide').removeClass('hide')   // To give us show/hide control of this element as well
    $('div.daybreak').addClass('bh');        // Hide page pollution (cosmetic)
    
    $('article').each(function(){
      if( $(this).hasClass("fixedEl") ) return;
      
      var siblings = $(this).find('header > .details, header img, .body, footer, div[id ^= fhbody-]');
      $('header > h2',this).toggle(function(e){
        siblings.removeClass('bh');
        e.preventDefault();
      },function(e){
        siblings.addClass('bh');
        e.preventDefault();
      });
      siblings.addClass('bh');
      $(this).addClass("fixedEl");
    });

    if( $('#mincb')[0].checked )
      setTimeout(arguments.callee,500);
  };
  
  // Add checkbox to control monitor on/off
  $('<input type="checkbox" id="mincb" title="Monitor & minimize new items" checked="true"/>')
  .appendTo('nav[role=top-navigation]').click(function(){
    if(this.checked) minimize();
  });
  minimize();
}

function isApplicablePage(){
  return ! (window.location.pathname.split("/")[1] == "story");
}

if(isApplicablePage()) {
  init($);
}
