// ==UserScript==
// @name           Pandora Playlist.com Links
// @namespace      pandoraStreamViaPlaylist
// @description    Does what it says on the tin
// @include        http://*pandora.com/music/song/*
// @include        http://*pandora.com/music/album/*
// @include        http://*pandora.com/people/*
// ==/UserScript==

//Get the title of the page
var song = document.title;

if (song.indexOf('Profile for')<0){
	if (window.location.href.indexOf('music/album/')<0){
		//This code is only for song pages
		var div = document.getElementById('buttons_container');
		song = song.split('-',1)[0];
		song = song.trim();

		//Add "play with" link
		var pl = document.createElement('div');
		pl.setAttribute('id','button');
		pl.innerHTML = "<a href='http://www.playlist.com/searchbeta/tracks#"+escape(song)+"/all/1' target='_blank'>Play with Playlist</a>";
		div.appendChild(pl);
		
		//Add "similar songs" links
		var spans = document.getElementsByTagName('span');
		for (i=0;i<spans.length;i++){
			var sID = spans[i].getAttribute('id');
			if (sID&&sID=='similar_song'){
				var songName = spans[i].getElementsByTagName('a')[0];
				if (songName){
					songName=songName.innerHTML;
					var plL = document.createElement('a');
					plL.setAttribute('href',"http://www.playlist.com/searchbeta/tracks#"+escape(songName)+"/all/1");
					plL.setAttribute('target',"_blank");
					plL.innerHTML="<img src='/images/next.gif' alt='PL' style='border-style: none; margin-top: -10px;' />";
					plL.setAttribute('style','float:left;');
					spans[i].insertBefore(plL,spans[i].firstChild);
				}
			}
		}
	}else{
		//Album pages
		var divs = document.getElementsByTagName('div');
		for (i=0;i<divs.length;i++){
			if (divs[i].getAttribute('id')=="track"){
				var playButton = divs[i].getElementsByTagName('span')[0];
				var link = divs[i].getElementsByTagName('a')[0];
				
				playButton.innerHTML = "<a href='http://www.playlist.com/searchbeta/tracks#"+escape(link.innerHTML)+"/all/1' target='_blank'><img src='/images/next.gif' alt='PL' style='border-style: none; margin-top: -4px;' width='20' height='20' /></a>";
			}
		}
	}
}else{
	//Now for profile pages
	var rows = document.getElementsByTagName('tr');
	for (i=0;i<rows.length;i++){
		if (rows[i].getAttribute('class')=='table_row'){
			if (rows[i].getElementsByTagName('span').length){
				var songName = rows[i].getElementsByTagName('span')[1];
				songName = songName.getElementsByTagName('a')[0];
				var amBuy = rows[i].getElementsByTagName('a')[2];
				amBuy.innerHTML = "<img src='../images/next.gif' width='16' height='16' style='border-style: none;' />";
				amBuy.setAttribute('href',"http://www.playlist.com/searchbeta/tracks#"+escape(songName.innerHTML)+"/all/1");
				amBuy.setAttribute('target',"_blank");
				
				var iTunes = rows[i].getElementsByTagName('a')[3];
				iTunes.innerHTML = "";
			}
		}
	}
}