// ==UserScript==
// @name           RT Tidy
// @namespace      http://userscripts.org/users/pstray
// @description    Script to fix various RT annoyances.
// @require        http://ninja.no/jquery-gm-1.4.2.min.js
// @include        https://hjelp.uio.no/*
// ==/UserScript==

(function($) {

  var RTTidy = {

  init: function(doc) {
      var body = $('body', doc);
      if (!body || body.hasClass('rttidy')) {
	return;
      }
      body.addClass('rttidy');

      // Add timestamp to page
      var qb = $('#quick-personal', body);
      if (qb) {
	var now = new Date();
	qb.prepend('<span id="rttidy_loadtime"><span class="rttidy_content">' + 
		   now.toLocaleTimeString() +
		   '</span> | </span>');
      }

      // remove Email-transactions
      var th = $('#ticket-history', body);
      if (th) {
	$(th).children('div.EmailRecord').remove();
	$(th).children('div.CommentEmailRecord').remove();
	$(th).children('div.ticket-transaction').removeClass('even').removeClass('odd').each(function(i,e){ $(e).addClass(i%2?'even':'odd')});
      }




    }
  };

  return RTTidy;
 })(jQuery).init();
