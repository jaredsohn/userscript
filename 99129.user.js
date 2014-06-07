// ==UserScript==
// @name           DeviantArt dALinkSystem by =MetalElf0
// @namespace      http://www.deviantart.com
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function da_link(){
  string = "===<br/>If you liked my work, I'm sure you'll also like:<br/>"
  string += $('div.details-section div.ll div input[value^=:thumb]').val();
  string += ' by :icon'
  string += $('div.hh div div div div h1 small a.u' ).text();
  string += ':</br>===</br>'
  string += 'Promote other artists\' work with :icondalinksystem:!'
  $('body').prepend('<div style="padding: 2em;">' + string + '</div>');
}
 
function featured_here(){
  string = "Wow, great artwork! This wonderful piece of art has been featured here: "
  string += $('div.details-section div.ll div:nth-child(1) input').val();
  string += '<br/>===<br/>Promote other artists\' work with :icondalinksystem:!'
  $('body').prepend('<div style="padding: 2em;">' + string + '</div>');
}
 
GM_registerMenuCommand('Show me deviation info', da_link);
GM_registerMenuCommand('Show me featured here code', featured_here);