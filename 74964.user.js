// ==UserScript==
// @name           Indowebster Direct Download Link
// @namespace      indowebster.com
// @include        http://beta.indowebster.com/*.html
// @include        http://beta.indowebster.com/*.html?*
// @include        http://www.indowebster.com/*.html
// @include        http://www.indowebster.com/*.html?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


// Dont need no Radio...
unsafeWindow.getRadioTitle = function() { 
  return false;
}

// sadly, jquery 1.4.2 can't be used with greasemonkey as of now. shucks. 
jQuery(function($) {
  $('body').append('<div id="direct-goodies"/>');
  $('div#direct-goodies').css('background-color',"#DDF8ED");
  $('div#direct-goodies').css('color',"green");
  $('div#direct-goodies').css('font-size',"2em");
  $('div#direct-goodies').css('left',"0");
  $('div#direct-goodies').css('padding',"5px 40px");
  $('div#direct-goodies').css('position',"fixed");
  $('div#direct-goodies').css('text-align',"center");
  $('div#direct-goodies').css('top',"0");
  $('div#direct-goodies').css('width',"100%");
  $('div#direct-goodies').css('z-index',"9999");

  //1. Text Area Variant
  link = $("textarea#mytextarea").html();
  
  // 2. Download Button Variant
  if (!link || link == '') {
    // following dont work, another quirks of greasemonkey jquery?
    // s = $("div#tombol").attr("onclick");
    s = $("div#tombol").parent().html();
    m = s.match(/location.href='([^']+)'/);
    if (m) { link = m[1] }
  }

  if (link) {  
    $('div#direct-goodies').append('<a href="' + link + '">' + link + '</a>');
    $('div#direct-goodies').append('<br /><br />');
  }

  s = $('div#origname').text();
  m = s.match(/Original name:\s+(.+)/);
  if (m) {
    $('div#direct-goodies').append('<b>' + $.trim(m[1]) + '</b>');
    $('div#direct-goodies').append('<br /><br />');
  }

});


