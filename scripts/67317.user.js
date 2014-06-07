// ==UserScript==
// @name           Lyrics
// @namespace      Youtube
// @description    fetch lyrics for youtube video
// @include        http://www.youtube.com/watch*
// @include        http://www.youtube.com/disco*
// @include				 http://www.last.fm/music/*/_/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// ==/UserScript==

function fetch_lyrics(u){
	GM_xmlhttpRequest({
		method: 'GET',
		url: u,
		onload: function(response) {
			var data = response.responseText.replace("\n","","g").replace("<p>","","g").replace("</p>","","g").replace('<br/>', '<br>', 'g').replace('<br />', '<br>', 'g').toLowerCase();
			var l = data.match(/(<br>)?(([^><]*?)(<br>)+){10,}/);
			if (l != null) {
				var i = l.indexOf('</script>');
				if (i != -1) {
					l = l.substring(i+7, l.length);
				}
				display_lyrics(l);
			} else {
				var i = data.indexOf('<pre>');
				l = data.substring(i+5, data.indexOf('</pre>'));
				display_lyrics("<pre>" + l + "</pre>");
			}
		}
	});
}

function display_lyrics(lyricscontent) {
	lyricscontent = "<div class='lyrics' style='background-color:#FFFFAA;'>" + lyricscontent + "</div>";
	$('.resetlyrics').html('');
	$('#watch-video-details-inner').append(lyricscontent);
}

function lyrics(query) {
	GM_log("http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + escape(query).replace(" ","+","g") + "&rsz=large&cx=005255931714745978492:jxq1v0daaj8");
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + escape(query).replace(" ","+","g") + "&rsz=large&cx=005255931714745978492:jxq1v0daaj8",
		onload: function(response) {
			var data = (new Function('return ' + response.responseText))();
			if (data.responseData.results.length == 0) {
				return lyrics(query.replace(/"[^"]*"/,'').replace(/\([^\)]*\)/,''));
			}
			for(var i=0;i<data.responseData.results.length;i++){
				GM_log(data.responseData.results[i]['url']);
				fetch_lyrics(data.responseData.results[i]['url']);
				break;
			}
		}
	});	
}

function wikia_lyrics(artist, osong) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://lyrics.wikia.com/api.php?action=lyrics&artist=" + escape(artist) + "&song=" + escape(osong) + "&fmt=json&func=getSong",
		onload: function(response) {
			var data = (new Function('return ' + response.responseText))();
			try{song['url'];}catch(e){song=data;}
			var lurl = song['url'];
			GM_log(lurl);
			if (lurl == null || song['lyrics'] == 'Not found' || song['url'] == 'http://lyrics.wikia.com') {
				return lyrics(artist + " " + osong);
			} else {
				tokens = lurl.split('/');
				lurl = tokens[tokens.length - 1];
				GM_xmlhttpRequest({
					method: 'GET',
					url: "http://lyrics.wikia.com/api.php?action=query&prop=revisions&titles=" + lurl + "&rvprop=content&format=json",
					onload: function(response) {
						var i = response.responseText.indexOf('<lyrics>');
						var j = response.responseText.indexOf('<\\/lyrics>');
						lyricscontent = "<b>Title: " + osong + "</b><br/>" + response.responseText.substring(i, j).replace("\\n","<br/>","g");
						display_lyrics(lyricscontent);
					}
				});
			}
		}
	});
}

var lelem = ($('#watch-next-list').length == 0) ? $('#watch-passive-QL') : $('#watch-next-list');
if (lelem.length == 0) { lelem = $('#artist-videos-notfound');}
lelem.after("<div id='watch-video-details-inner' class='resetlyrics'></div>");
$('#LastAd_TopRight').before("<h2 class='heading'><span class='h2Wrapper'>Lyrics</a></span></h2><div id='watch-video-details-inner' class='resetlyrics'></div>");

if (window.location.hostname.match(/last.fm/) != null) {
	var query = $('title').text();
	var i = query.indexOf('–');
	var j = query.indexOf('–', i+1);
	var artist = query.substring(0,i);
	var song = query.substring(i+2, j);
	wikia_lyrics(artist, song);
} else {
  if ($('#find-mix-watch-wrapper').length == 0) {
	  var q = $('h1').text().toLowerCase();
	  q = q.replace('full song','').replace(' hd ', '').replace('track','');
		lyrics(q);
	} else {
		// for youtube disco
		$('#video-title').bind('DOMSubtreeModified', function(){
			window.setTimeout(function(){
				if($('#video-title').text() != "" && $('#video-artist-name').text() != "") {
					wikia_lyrics($('#video-artist-name').text(), $('#video-title').text());
				}
			}, 0);
		});
	}
}