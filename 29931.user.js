// ==UserScript==
// @name           db_moviemusic
// @namespace      douban_music
// @description    add movie music link in movie page 
// @include        http://www.douban.com/subject/*
// ==/UserScript==


if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery 
}

function createBar(music_url){
    return $("<p class='pl'>原声大碟:<a href='"+ music_url +"' target='_blank'>"+ music_url +"</a></p>");
}

$(document).ready(function(){
	 if (($('#nav a.now span').text()) == "电影")
	 {
	
	 var music_name = $('h1:first').text();
	 music_name = encodeURIComponent(music_name);
     $.getJSON("http://api.douban.com/music/subjects?apikey=5b11cb53bb47c3a3113561fb31d74ae9&q="+music_name+"&start-index=1&max-results=1&alt=xd&callback=?",
	 function(result){
		 try
		 {
			var music_url = result['entry'][0]['link'][1]['@href'];
			var bar = createBar(music_url);
			bar.insertAfter($('#info .obmo>span:last')).show();
			//alert(music_url);
		 }
		 catch (e)
		 {
			//alert("error");
		 }
	 })
 }
})