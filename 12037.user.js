/*
One thing that annoys me about Gmail is how slow it can be to load. This becomes a real problem when you force all mailto: links to open in Gmail. Gmail Quick Compose redirects all "compose mode" links to have the tf=0 parameter.

This script does *NOT* make mailto: links open in Gmail!!! I recommend using the Google Toolbar to do that.

It would be nice if there was a way to get them to compose with m.gmail.com. The mobile interface is much quicker.

Related Links:

How to access Gmail when it is blocked at work or school
http://internetducttape.com/2006/10/04/how-to-access-gmail-when-its-blocked-at-work-or-school/

Forwarding multiple Gmail accounts to one account
http://internetducttape.com/2006/09/11/guide-on-how-to-setup-two-or-more-gmail-accounts-to-use-one-account-create-forward-link/

 */

// ==UserScript==
// @name           Gmail Quick Compose
// @namespace      http://InternetDuctTape.com
// @description    Turns off clutter when directly composing gmail messages (IE: clicking on a mailto link)
// @include        http*//mail.google.com/mail/?view=cm&*
// @exclude        http*//mail.google.com/mail/?view=cm&*tf=0*
// ==/UserScript==

(function() {
    var url = location.href;
    url = url.replace(/&tf=1/ig, "");
    url = url.replace(/view=cm/ig, "view=cm&tf=0");
    location.replace(url);
 })();
