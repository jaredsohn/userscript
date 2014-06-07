// ==UserScript==
// @name  No-Facebook sign-up on Quora
// @namespace http://pattaya-fight.ru
// @description Removes '?ref=fb' from quora address, so facebook sign-up will not be required.
// @copyright 2013, Stanislav Katkov (http://geek.era.ee)
// @license Creative Commons Attribution 3.0; http://creativecommons.org/licenses/by/3.0/
// @include http://quora.com/*
// @include http://www.quora.com/*
// ==/UserScript==
if (location.href.indexOf('?ref=fb') != -1){
  var new_location = location.href.replace('?ref=fb', '');
  //wait little bit - so server can recieve all responces and not show errors
  setInterval(function(){location.href = new_location}, 5000); 
}
