// ==UserScript==
// @name        vk mp3 download
// @namespace   replica_vk_mp3
// @description downloads vk mp3. pls don't download it
// @include     http://vk.com/audio*
// @version     6
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require       https://raw.github.com/inuyaksa/jquery.nicescroll/master/jquery.nicescroll.min.js
// ==/UserScript==

$(document).ready(function(){
  $.post(
		"http://vk.com/audio", 
		{ 
			"act"	: "load_audios_silent",
			"al" 	: 1,
			"gid"	: 0,
			"id"	: 215077,
			"please_dont_ddos": 2
		},
		function(data){
		    $download = false;
			$res = data.split("<!>");
			$tracks_string = $res[5].replace(/'/g, '"');
			$tracks = jQuery.parseJSON($tracks_string);
			
			$('.my-songs-list').remove();
            $panel = $('<ul />').css(
			 {
			     'position': "fixed",
			     'right': "0",
			     'top': "20px",
			     'background-color': '#fff',
			     'border': '1px solid #aeaeae',
			     'border-radius': '5px 0 0 5px',
			     'width': '300px',
			     'list-style': 'none',
			     'padding': '10px',
			     'margin': '0',
			     'height': '90%',
			     'overflow': 'hidden'
			 }
			).attr('class', 'my-songs-list');
			
			for($key in $tracks.all) {   
			     $song = $tracks.all[$key];
			     $song_li = $('<li />').html('<a href="'+$song[2]+'">'+$song[5]+' - ' + $song[6] + '</a>');
			     $song_li.appendTo($panel);
			}
			
			$panel.appendTo('body');
		    $panel.niceScroll({cursorcolor: "#1177aa", cursoropacitymin: 1});
		}
	);
});