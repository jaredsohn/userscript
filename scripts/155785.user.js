// ==UserScript==
// @name     Gmail Hide Inbox in Multiple Inboxes
// @include  https://mail.google.com/mail/u/0/#inbox*
// @require  http://code.jquery.com/jquery-latest.js
// ==/UserScript==
(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery); });
  }
  GM_wait();
  function letsJQuery($)
  {
	var inbox = $('#\\:rr > div > div:first-child > div > div > div > div:first-child > div > div:last-child');
	var title = $('#\\:rr > div > div:first-child > div > div > div > div:first-child > div > div:nth-child(3)');      
	removeDivs1 = inbox.get()[0];
	removeDivs2 = title.get()[0];      
	removeDivs1.style.display = "none";
	removeDivs2.style.display = "none";      
  }
})();
