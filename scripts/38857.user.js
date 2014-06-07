// ==UserScript==
// @name             livehotmail-utils
// @namespace        http://sam.intelunix.fr
// @description      continue on the 'upgrade your web browser' notice - close refresh login window
// @include          http://*mail.live.com/mail/browsersupport.aspx?*
// @include          http://mail.live.com/mail/refresh_auth.aspx?wa=wsignin1.0
// ==/UserScript==


( function () {

// http://*mail.live.com/mail/browsersupport.aspx?*
// Ok, firefox is not compatible to livehotmail, and what? don't bub me please {{{
if (document.location.pathname.match(/^\/mail\/browsersupport\.aspx\?/)) {
   var links = document.getElementsByTagName('a');
   for (var i=0, a ; a = links.item(i) ; i++) {
      if(a.href.match(/mail.live.com\//) && !a.href.match(/\.com\/mail\/(browsersupport\.aspx\?|logout)/)) {
         document.location.href = a.href;
         break;
      }
   }
}
// }}}

// http://mail.live.com/mail/refresh_auth.aspx?wa=wsignin1.0
// this window doesn't close automaticaly anymore after signin (due to auto-logout) {{{
if (document.location.href == 'http://mail.live.com/mail/refresh_auth.aspx?wa=wsignin1.0') {
   window.close();
}
// }}}

}) ();


/* vim: set et sts=3 sw=3 foldmethod=marker : */

