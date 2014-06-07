// ==UserScript==
// @name         4chan search by ID
// @author       Fidelis
// @description  Search an ID on 4chan and find the first-post, if it exists!
// @version      1.0
// @include      *4chan.org*
// ==/UserScript==

//#########################################
// jQuery
//-----------------------------------------
var $;

if (typeof unsafeWindow.jQuery == 'undefined') {
	var GM_Head = document.getElementsByTagName('head')[0];
	var	GM_JQ = document.createElement('script');

	GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	GM_JQ.type = 'text/javascript';
	GM_JQ.async = true;
	
	GM_Head.insertBefore(GM_JQ, GM_Head.lastChild);
}
GM_wait();


function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

var loc = location.toString();

function letsJQuery() {
	$.extend({
	  getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  vars.push(hash[0]);
		  vars[hash[0]] = hash[1];
		}
		return vars;
	  },
	  getUrlVar: function(name){
		return $.getUrlVars()[name];
	  }
	});

	$('#bd').before('Search for first-posts: <input type="text" id="searchbyid" width="200px"/><input type="button" id="searchbyidb" value="Search by ID"><span id="result"></span>');
	$('#searchbyidb').click(function(){
		var id = $('#searchbyid').attr('value');
		if(parseInt(id) != 0 && isNaN(parseInt(id)) == false){
			window.location = 'http://www.4chan.org/?id='+id;
		}
	});

	if(loc.indexOf('4chan.org/?id=') != -1){
		var id = $.getUrlVar('id');
		var boardarray = new Array('b', 'a', 'c', 'w', 'm', 'cgl', 'cm', 'f', 'n', 'jp', 'vp', 'v', 'co', 'g', 'tv', 'k', 'o', 'an', 'tg', 'sp', 'sci', 'int', 'i', 'po', 'p', 'ck', 'ic', 'wg', 'mu', 'fa', 'toy', '3', 'ic', 'ic', 'diy', 's', 'hc', 'h', 'e', 'u', 'd', 'y', 't', 'hr', 'gif', 'trv', 'fit', 'x', 'lit', 'adv', 'r', 'r9k', 'pol', 'soc');
		var link = false;
		var i = 0;
		
		function searchid(){
			var board = boardarray[i];
			var res = 'http://boards.4chan.org/'+board+'/res/'+id;
			var loaded = false;
			$('#result').html(' Searching /'+board+'/ ...');
			GM_xmlhttpRequest({
				method: 'GET',
				url: res,
				synchronous: true,
				headers: {
					'User-agent': 'Mozilla/4.0',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {
					var loaded = true;
					var html = responseDetails.responseText;
					if(html.indexOf('<h2>404 - Not Found</h2>') > -1 && i<boardarray.length){
						i++;
						searchid();
						$('#result').html(' No result!');
					}
					else if(i<boardarray.length){
						$('#result').html(' Found!');
						link = true;
						window.location = res;
					}
				}
			});
		}
		searchid();
	}
	
}