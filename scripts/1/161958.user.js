// ==UserScript==
// @name              Hacker News - Dark Theme
// @namespace      http://userscripts.org/users/509235
// @description      A dark theme for Hacker News (YCombinator).
// @include           https://news.ycombinator.com*
// @grant             none
// @version          1.0
// ==/UserScript==

var loadScript = function (src, callback) {
  var elem = document.createElement('script');
  elem.type = 'text/javascript';
  elem.onload = callback;
  elem.src = src;
  document.body.appendChild(elem);
};

function start() {
  var locationIs = function (regex) {
    return window.location.href.match(regex);
  };
  
  var config = {
    textAreaBg: '#E0E0E0',
    textAreaLeftBorder: '12px solid #CCCCCC',
    inputColor: 'black',
    inputHoverOnBg: '#CCCCCC',
    inputHoverOffBg: '#DFDFDF',
    fontColor: '#CCCCCC',
    comheadDefaultColor: '#828282',
    comheadLinksColor: 'orange',
    topBarText: '&nbsp;',
    topBarColor: '#1A1A1A',
    bodyBg: '#1A1A1A',
    centreBg: '#2B2B2B',
    commonBorderSpacing: '1px solid #2B2B2B'
  };
  
  // Common
  
  //// Background colors
  jQuery('body').css('background-color', config.bodyBg);
  jQuery('table').css('background-color', config.centreBg);
  
  jQuery('input').css('background-color', config.inputHoverOffBg);
  jQuery('input').hover(function () {
    jQuery(this).css('background-color', config.inputHoverOnBg);
  }, function () {
    jQuery(this).css('background-color', config.inputHoverOffBg);
  });
  
  //// Text colors
  jQuery('body').css('color', config.fontColor);
  jQuery('table, tr, td').children().css('color', config.fontColor);
  jQuery('font').css('color', config.fontColor);  
  jQuery('a:link').css('color', config.fontColor);
  
  jQuery('.comhead, .subtext').css('color', config.comheadDefaultColor);
  jQuery('.subtext > a').css('color', config.comheadLinksColor);
  
  jQuery('input').css('color', config.inputColor);
  jQuery('.pagetop:eq(1)').children().css('color', 'yellow'); // Login button
  
  //// Spacing
  jQuery('td').css('border', config.commonBorderSpacing);
  
  if (locationIs(/.*ycombinator\.com\/rss.*/)) {
    // RSS -- No theme
  } else if (locationIs(/.*ycombinator\.com\/dmca.*/)) {
    // DMCA
    
  } else if (locationIs(/.*ycombinator\.com\/.*login.*/)) {
    // Login
    
  } else if (locationIs(/.*ycombinator\.com\/submit.*/)) {
    // Submit
    
  } else if (locationIs(/.*ycombinator\.com\/item.*/)) {
    // Discussions
    
    //// Background colors
    jQuery('textarea').css('background-color', config.textAreaBg);
    jQuery('textarea').css('border-left', config.textAreaLeftBorder);
    
    //// Text Colors
    jQuery('.comhead > a').css('color', config.comheadLinksColor);
    
    //// Bar at top
    jQuery('tr:eq(0)').next().html(config.topBarText);
    jQuery('tr:eq(0)').next().css('background-color', config.topBarColor);
  }  else {
    //// Bar at top
    jQuery('tr:eq(0)').next().html(config.topBarText);
    jQuery('tr:eq(0)').next().css('background-color', config.topBarColor);
  }
  
  //// Footer
  jQuery('.pagetop:eq(0)').append(' | <a href="http://www.github.com/dparpyani" style="color: cyan;">Hi there :)</a>');
}

// Load jQuery, if the current web page does not have it
if (typeof jQuery === 'undefined') {
  loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', start);
} else { start(); }

