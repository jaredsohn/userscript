// ==UserScript==
// @name       Wiki Redesign
// @namespace  http://en.wikipedia.org/
// @version    0.1
// @description  Make things look better
// @match      http://en.wikipedia.org/*
// @copyright  2012+, Jeffrey Tong
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// Import Font
WebFontConfig = {
    google: { families: [ 'Alike::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

// the guts of this userscript
function main() {
  // Remove cluttered elements
  $('#mw-page-base').hide();
  $('#mw-head-base').hide();
  $('#mw-head').hide();
  $('.wikitable').hide();
    
  // Add whitespace
  $('#content').css('padding','70px 100px 70px 100px');
  $('#content').css('margin-right','22em');
    
  // Move and style Infobox
  infoboxHtml = $('.infobox');
  $('.infobox').css('position','absolute');
  $('.infobox').css('top','0');
  $('.infobox').css('right','0');
  $('.infobox').css('border','none');
  $('.infobox').css('margin','0');
  $('.infobox').css('background-color','transparent');
  $('.infobox').css('padding-top','30px');
  $('#content').append(infoboxHtml);
  $('th').css('background-color','transparent');
  $('#content').css('-webkit-box-shadow','0 0 20px rgba(0,0,0,0.1)');
  $('#content').css('-moz-box-shadow','0 0 20px rgba(0,0,0,0.1)');
  $('#content').css('box-shadow','0 0 20px rgba(0,0,0,0.1)');
}

// load jQuery and execute the main function
addJQuery(main);