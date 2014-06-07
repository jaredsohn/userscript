// ==UserScript==
// @name        FistPumpFridaysExtras
// @namespace   http://www.facebook.com/ahkjeldsen
// @description Adds some extra functionality to the FistPumpFridays website
// @include     http://fistpumpfridays.net/*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
	var urls = [];
	var divs = $('div[class="fap-track-buttons"]');
	divs.each(function(index, value){
		var as = $('a', $(this)).each(function(aindex, avalue){
			var a = $(this).detach();
			var dl = window.atob(a.attr('href'));

			var cont = $('<div></div>');
			cont.append(a);
			
			var dla = $('<a></a>').attr('href', dl).attr('rel', a.attr('rel')).attr('class', a.attr('class')).text('DOWNLOAD').attr('title', "Right click -> Save as...").attr('alt', "Right click -> Save as...");
			cont.append(dla);

			$(divs[index]).append(cont);

			urls.push(a.attr('title') + ';;' + dl);
		});
	});

	$('div[class="postItem"]').each(function(index, value){
		var tx = $('<textarea rows="5" cols="70"></textarea>');
		for(var i in urls){
			var url = urls[i].split(';;');
			tx.html(tx.html()+url[0]+"\r\n"+url[1]+(i < urls.length - 1 ? "\r\n\r\n" : ""));
		}

		$(this).append($('<div></div>').append(tx));
	});
});