// ==UserScript==
// @match http://mog.com/m*
// @match https://mog.com/m*
// @include http://mog.com/m*
// @include https://mog.com/m*
// @name MOG Beta Enhancer
// @namespace http://mog.com/
// @description Adds various features to MOG Beta HTML5 App.
// @version 0.3
// ==/UserScript==

function main() {
	
	function pageChangeDispatch()
	{
		//cleanup()
		//Change in URL hash isn't enough - we need to wait for the main MOG pane to load. 
		//This is essentially a "ready" function made by looking for a key marker in the page
		var page = document.location.hash
		var currentDispatch = {}
		var dispatch = [
			{urlmatch:"#playlist",loadMarker:'#img_main',callback:addPlaylistSortButton},
			{urlmatch:"#album",loadMarker:'.album_pic',callback:addReviews}
			//more "pages" here
			]
			
		for (var i=0; i < dispatch.length; i++)
		{
			var re = new RegExp(dispatch[i].urlmatch);
			if(page.match(re))
			{
				currentDispatch = dispatch[i]
				setTimeout(makeshiftOnReady, 1000);
				break;
			}
		} 
		
		function makeshiftOnReady()
		{
			if ($(currentDispatch.loadMarker).length) //load marker is now in DOM
				currentDispatch.callback()
			else
				setTimeout(makeshiftOnReady, 1000);
		}	
	}
	
	function addPlaylistSortButton()
	{
		$("#delete_playlist").before("<a id=\"order_playlist_button\" class=\"playlist_menu_item\">Order Playlist</a>")
		$("#order_playlist_button")
			.attr({ "title" : "Order tracks in Queue"})
			.addClass("playlist_menu_item")
			.click(orderTracks);
	}
	
	function addReviews()
	{
		var page = document.location.hash
		var albumID = page.match(/#album\/(.*)/)[1]
		var url = "http://mog.com/albums/mn" + albumID
		
		$.ajax({
			url: url,
			dataType: "html",
			success: processData
		});
	}
	
	function processData(datastring)
	{
		var reviewcontent = $(datastring).find("div.reviewlist.pro").html()
		if(reviewcontent)
		{
			$("li.clrfx.album.extraMeta").after("<div class=\"imported_reviews\" style=\"width:385px;float:left;margin-top:3px;\">" + reviewcontent + "</div>")
			var stars = $(datastring).find("div.stars.inactive").attr("title")
			$("div.stars.inactive").html("AMG Rating: <span style=\"color:red\">" + stars + "</span> stars")
		} else
		{
			$("li.clrfx.album.extraMeta").after("<div class=\"imported_reviews\" style=\"width:540px;float:left;margin-top:3px;\">" + "No Reviews Yet" + "</div>")
		}
	}
			
    function randomPermute(l) {
		l.swap = function(i,j) { var t = this[i]; this[i] = this[j]; this[j] = t; };
		var n = l.length;
		for (var i = 0; i < n; i++) {
			var r = Math.floor(Math.random() * (n-i));
			l.swap(i, i + r);
			}
		return l;
    }

    function shuffleTracks() {
		var ul = $("#realized");
		var lis = ul.find(".track").detach();
		lis = randomPermute(lis);
		lis.appendTo(ul);
		Mog.detectWebDb() && Mog.ui.saveRealized();
    }
	
	function orderTracks()
	{
		if(!confirm("Tracks will be ordered by album and track at first appearance of artist in playlist. Duplicate tracks will be removed." + '\n\n' + "Are you good with that? "))
			return
			
		var sortArray = []
		var trackRegister = []
		var dupTracks = []
		var artistOrder = []
		var playlistID = document.location.hash.match(/#playlist\/(.*)/)[1]
					
		//function used in javascript sort call. Orders albums and tracks at first appearance of artist in the playlist.
		//Track id is usually but not always the same as sorting by track number on the disc. We could get the track number if it turns out to be necessary.
		function sortTrack(a,b)
		{
			if (a.artist != b.artist)
				return artistOrder.indexOf(a.artist) - artistOrder.indexOf(b.artist); //first appearance in playlist, not by artist id
			else if (a.album != b.album)
				return a.album - b.album;
			else if (a.track != b.track)
				return a.track - b.track
			else
				return 0
		}

		var $trackChunks = $("li.track.clrfx.ui-draggable.playlist_context")
		if($trackChunks.length > 0)
		{
			$trackChunks.each(
				function(){
					var artist = parseInt($(this).attr("artist_id"))
					var album = parseInt($(this).attr("album_id"))
					var track = parseInt($(this).attr("track_id"))
					var trackData = {"artist":artist,"album":album,"track":track}
					//Add each track to trackRegister so we can catch duplicates as we go through playlist
					if(trackRegister.indexOf(track) == -1)
					{
						sortArray.push(trackData)
						trackRegister.push(track); 
					} else
					{
						dupTracks.push($(this).attr("artist_name") + " - " + $(this).attr("album_name")+ " - " + $(this).attr("track_name"))
					}
					
					//Add artist in order of appearance so sort function can move all artist tracks at that location
					if(artistOrder.indexOf(artist) == -1)
					{
						artistOrder.push(artist)
					}
				}
			)
			sortArray.sort(sortTrack)
			
			if(dupTracks.length > 0)
				alert(dupTracks.length + " duplicate will be been removed: " + '\n\n' + dupTracks.join('\n'))
			
			//Repaint playlist with new order
			var $ul = $(".tracks.ui-sortable")
			for(var i = 0; i < sortArray.length; i++)
			{
				var $thisTrack = $('li[track_id="' + sortArray[i].track + '"]').detach()
				$ul.append($thisTrack[0]) //dedup = take first one if there are more than one
			}
			//Update backend MOG data with new order
			Mog.ui.updatePlaylistTracks(playlistID)
		}
	}
	
    function addShuffleButton() {
		$("<a/>")
			.attr({ "id" : "shuffle_button",
			   "title" : "Shuffle tracks in Queue"})
			.addClass("control")
			.css({ "float" : "right",
			   "padding" : "6px 5px",
			   "color" : "gray" })
			.html("Shuffle")
			.click(shuffleTracks)
			.appendTo($("#queue_controls"));
    }
	
	addShuffleButton()
	//handle initial load
	pageChangeDispatch()
	//handle subsequent non-page load content refreshes
	$(window).bind('hashchange', function() {
		pageChangeDispatch()
	});
}

var script = document.createElement("script");
script.appendChild(document.createTextNode("(" + main + ")();"));
(document.body || document.head || document.documentElement).appendChild(script);