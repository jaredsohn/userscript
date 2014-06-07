// ==UserScript==
// @name          facebook.com create application form fixer
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Makes the form required to get filled a litte bit more comfortable
// @include       http://*facebook.*/developers/editapp.php*
// ==/UserScript==

// Change the width of some input boxes
document.getElementById('short_app_name').style.width = '175px';
document.getElementById('callback_url').style.width = '308px';
document.getElementById('post_authorize_redirect_url').style.width = '308px';