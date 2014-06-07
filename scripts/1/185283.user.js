// ==UserScript==
// @name       Dhingana Audio Downloader
// @namespace  http://userscripts.org/users/92937
// @version    0.2
// @description  Download from Dhingana with ease!
// @match      http://www.dhingana.com/*
// @copyright  2013, TJ Aditya
// ==/UserScript==

/**
 * Instructions: Load any respective page and click on "DD It!" on the top-right side of the page. The page then shall load all those songs with Download links.
 */

var data_module = $('#hidden-entity-data').attr('data-module');
var flag = false;
var i = 4;

$('div.right-header ul.nav').css('width', '366px');
var menub = $('<button/>', {
	'onClick'   : "location.reload();",
	'class'     : 'btn btn-blue',
	'html'		: "<b style='font-size:11px;'>DD It!</b>"
});
var listi = $('<li/>', { 
	'class' : 'nav-item'
});
$(listi).append(menub);
$('div.right-header ul.nav').prepend(listi);

if(data_module == 'top songs') {

	var data_type = $('#hidden-entity-data').attr('data-type');
	if(data_type == 'song') {
		$('div.actions').css('width', '270px');
		do_stuff(i-1);
	}
}
else {
	if(data_module == 'playlist details') {	i -= 1; }
	$('div.actions').css('width', '320px');
	do_stuff(i);
}


function do_stuff(ind) {
    $('ul.listing-rows li.listing-row').each(function(index, ele) {
		var data_id = $(ele).attr('data-id');
		
		$.get("http://www.dhingana.com/xhr/getSongDetails", {id: data_id, count: '1'}, function(data){
				
				var tmp1 = '';
				var url = data.songs[data_id]['Streams']['Mp3'];
				var bb = $('<button/>', {
							'onClick'   : "window.open('" + url + "', '_blank');",
							'class'     : 'btn btn-blue',
							'html'		: "<i><b>Download</b></i>"
				});
				$(ele).children().eq(ind).children().eq(4).after(bb);
				
		}, "json");
			
	});
}

