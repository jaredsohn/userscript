// ==UserScript==
// @name		ETI Insult Generator
// @description	Adds an Insult button to quick post
// @namespace	shard
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// @include		http://boards.endoftheinter.net/showmessages.php*
// @include		https://boards.endoftheinter.net/showmessages.php*
// @grant       GM_xmlhttpRequest 
// ==/UserScript==

var quickpost = $('.quickpost-body');
var insult = $('<input id="insult" type="button" value="Insult"/>');
insult.insertAfter(quickpost.children().first());
$('#insult').click(getInsult);


function getInsult() {

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.insultgenerator.org/",
		onload: function(response) {
			
			var ins = $(response.responseText).find('tr').first().text();
			var msg = $('[name="message"]');
			var start = msg.prop('selectionStart');
			
			var before = msg.val().substring(0, start);
			var after = msg.val().substring(start);
			$('[name="message"]').val(before + ins + after);
		}
    });

}

