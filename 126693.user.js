// ==UserScript==
// @name          Homestuck Page Loader
// @namespace     http://www.mspaintadventures.com
// @description   Allows Homestuck pages to be loaded without the need for a page refresh
// @require       http://code.jquery.com/jquery-latest.js
// @include       http://mspaintadventures.com/*
// @author        AnonSan
// @version       0.3
// @date          02-24-12
// @license       GNU General Public License v3.0
// ==/UserScript==

jQuery.extend( {
	getParameter: function(name) {
		return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
	}
});

$(document).ready(function(){
	var sUrl = "index.php";
	var sTarget = "table:eq(2)";
	var sIcon = '<img style="margin:auto;text-align:center;" src="psicons/ps962_icon_S.gif" alt="loading..."/>';
	var nPage = $.getParameter('p');
	var sParameter;
	
	$.ajaxSetup ({
		cache: false
	});
	
	$('#nextPage').live('click', function(e) {
		e.preventDefault();
		nPage++;
		sParameter =  "s=6&p=00"+nPage;
		$('table:eq(2)').html(sIcon).load(sUrl+' '+sTarget, sParameter, function(){
		});
	});
	
	$('#previousPage').live('click', function(e) {
		e.preventDefault();
		nPage--;
		sParameter =  "s=6&p=00"+nPage;
		$('table:eq(2)').html(sIcon).load(sUrl+' '+sTarget, sParameter);
	});
	
	if ($.getParameter('s') == '6')
		$('table:eq(1)').append($('<div style="background-color:white;color:black"><a id="previousPage" href="#">Previous</a> - <a id="nextPage" href="#">Next</a></div>'));
});

