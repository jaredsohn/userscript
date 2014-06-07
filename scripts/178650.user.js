// ==UserScript==
// @name         Mailman Moderation Made Manageable
// @namespace    http://www.tobez.org/download/greasemonkey/
// @description  Changes mailman moderation interface to be more compact
// @include      http://*/mailman/admindb/*
// ==/UserScript==

/**
 ** $Id: mailman-admindb.user.js,v 1.2 2013/09/26 14:28:38 tobez Exp $
 **
 ** Copyright (c) 2013 Anton Berezin. All rights reserved.
 **
 ** Redistribution and use in source and binary forms, with or without
 ** modification, are permitted provided that the following conditions
 ** are met:
 ** 1. Redistributions of source code must retain the above copyright
 **    notice, this list of conditions and the following disclaimer.
 ** 2. Redistributions in binary form must reproduce the above copyright
 **    notice, this list of conditions and the following disclaimer in the
 **    documentation and/or other materials provided with the distribution.
 ** 
 ** THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
 ** ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 ** IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ** ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
 ** FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 ** DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 ** OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 ** HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 ** LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 ** OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 ** SUCH DAMAGE.
 ** 
 **/

/*
 * !NB!NB!NB! Attention Opera users!
 * 
 * This script works in Opera, but since it uses addEventListener(),
 * you have to rename it from a file with .user.js extension into
 * a file with just .js extension.
 *
 */
 
(function( ) {

    // include jQuery
    var headID = document.getElementsByTagName("head")[0];         
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.id = 'myjQuery';
    newScript.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
    headID.appendChild(newScript);

    window.addEventListener('load', function (e)  {
		var i = 0;
		$("table[border='1']").each(function () {
			var $t = $(this);
			var from = $t.find("tr").first().find("center").text().replace(/^From:/,"");
			$t.find("table[border='0']")
			  .find("table[border='0']")
			  .each(function () {
				  var subj = $(this).find("tr")
					.first()
					.find("td")
					.eq(2)
					.text();
				  var $inserted = $("<div style='background-color:" +
					(i % 2 ? "#eee8d5" : "#fdf6e3") +
					"'>" +
					"<span style='width:25em;float:left;border-right-style:solid;border-right-width:1px;'>" +
					from +
					"</span><span style='width:100%;margin-left:5px;'>" +
					subj +
					"</span></div>");
				  $t.before($inserted);
				  $inserted.click(function () { $t.toggle(400); });
			});
			$t.hide();
			i++;
		});
    }, false);

})();

