// ==UserScript==
// @name           What Album Info
// @namespace      what_CdAlbumInfo
// @description    A test version
// @include        http*://*what.cd/artist.php?id=*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var box = $(document.createElement('div'));
$('body').append(box);
box.css({
	'background-color' : '#DCE2E7',
	'border':'solid 1px #000',
	'position':'absolute',
	'padding':'10px',
	'color':'#333',
	'font-size':'80%',
	'-moz-border-radius':'7px',
	'-moz-box-shadow' : '1px 1px 3px #000',
	'box-shadow' : '1px 1px 3px #000',
	'display':'none',
});

artist = $('h2').text();
releases = $('table.torrent_table tr.group strong');
releases.each(function(index, el){
	$(this).hover(
		function(){
			showInfo($(this));
		},
		function(){
			hideInfo();
		}
	);
});
	

function showInfo(el){
	title = el.children('a').text();
	year = el.text().substr(0,4);
	box.html(loadingImage());
	box.css({
		'display':'block',
		'top': (el.offset().top+15)+'px',
		'left': (el.offset().left+15)+'px'
	});
	mbUrl = "http://musicbrainz.org/ws/1/release/?inc=tracks&query="+
				"artist:" + artist.replace(/\s/g,'+') + "+AND+" +
				"release:" + title.replace(/\s/g,'+') + // "+AND+" +
				// Date sometimes blocks MB from giving results // "date:" + year +
				"&type=xml";
	log('Request URL: '+mbUrl);
	GM_xmlhttpRequest({
	  method: "GET",
	  url: mbUrl,
	  onload: function(response) {
		box.empty();
		parseReleases($(response.responseText));
	  }
	});

}

function hideInfo(){
	box.fadeOut();
}

function parseReleases(xml){
	MBID = null
	releases = $(xml).find("release");
	if(releases == undefined || releases.length == 0){
		box.append('No extra information found on MusicBrainz for <em>'+title+'</em>');
	}
	else{
		MBID = releases.attr("id");
		box.append( "<div class='first' style='display:none'>First hit:</div>"+
					"<h2>"+releases.find('title:first').html()+"</h2>"+
					"<h3>Tracks:</h3>" +
					"<ol class='tracklist'>Searching..</ol>"
					);
		if(releases.length > 1){
			box.find('div.first').css({display : 'block'});
			box.append("<h3>Other hits:</h3><ul class='other'>");
			releases.each(function(){
				box.append("<li>"+$(this).find('title').text() + "</li>");
			});
			box.append("</ul>");
		}
		else{
			MBID = releases.attr('id');
			box.append(releases.find('title').text() + "<br />");
		}
		log('MBID: ' + MBID);
		
		// set up a new request for the track list:
		if(MBID != null){
			mbUrl = "http://musicbrainz.org/ws/1/release/"+MBID+"?inc=tracks&type=xml";
			log('Track List Request URL: '+mbUrl);
			GM_xmlhttpRequest({
			  method: "GET",
			  url: mbUrl,
			  onload: function(response) {
				parseTracks($(response.responseText));
			  }
			});
		}
	}
}

function parseTracks(xml){
	tracks = $(xml).find("track-list>track");
	ol = box.find('ol.tracklist');
	ol.empty();
	if(tracks != undefined && tracks.length > 0){
		tracks.each(function(){
			d = new Date(parseInt($(this).find('duration').text()));
			date = '';
			if(d.getMinutes()>0)
				date += d.getMinutes()+"&#39;";
			if(d.getSeconds()>0)
				date += d.getSeconds()+"&quot;";
			if(date.length >0)
				date = " ("+ date +")";
			ol.append("<li>"+$(this).find('title').text() + date + "</li>");
		});
	}
	else{
		ol.text("No tracks found.");
	}
}

//only for dev:
function log(text){
	inDev = null;
	if(inDev != null){
		var console = unsafeWindow.console;
		if(console != undefined)
			console.log(text);
		GM_log(text);
	}
}

function loadingImage(){
	var img = document.createElement('img');
	img.src = 'data:image/gif;base64,'+
"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"+
"YwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==";
	return img;
}