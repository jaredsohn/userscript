// ==UserScript==

/**** METADATA ****/

// @name Rdio Playlist Sorter
// @description Sorts the current playlist in Rdio.
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @include http://www.rdio.com/*

/**** HEADER ****/

var DEFAULT_SORT_ORDER = "artist,album,title";

/**** BODY ****/

GM_registerMenuCommand("Sort Playlist", function () {
	var order = prompt("How would you like to sort this playlist?", DEFAULT_SORT_ORDER);
	order = typeof order == "string" ? order.replace(/\s+/g, "").toLowerCase() : "";

	if (/^(album|artist|title),(album|artist|title),(album|artist|title)$/.test(order)) {
		var tracks = [];
		order = order.split(",");

		// create an array of track objects by grabbing the information from the appropriate elements
		jQuery(".track").each(function () {
			var t = jQuery(this);
			var track = {
				album: t.find(".album_info a:last").text(),
				artist: t.find(".album_info a:first").text(),
				id: t.attr("track_id"),
				title: t.find(".title_info").text()
			};

			var album = typeof track.album == "string" ? jQuery.trim(track.album) : "";
			if (album != "") tracks.push(track);
		});

		// make sure there are tracks to sort before continuing
		if (tracks.length > 0) {
			// return a string that can be used to sort the tracks
			function format(track) {
				var pattern = /^(a|an|the)\b\s*/;
				var values = order.slice(0);

				for (var i = 0; i < values.length; i++)
					values[i] = track[values[i]].toLowerCase().replace(pattern, "");
				return values.join("|");
			}

			// actually sort the tracks
			tracks.sort(function (a, b) {
				var sa = format(a);
				var sb = format(b);

				if (sa < sb)
					return -1;
				else if (sa > sb)
					return 1;
				else
					return 0;
			});

			// translate the tracks array into an array of the track ID's
			var ids = jQuery.map(tracks, function (n, i) {
				return n.id;
			});

			// call the appropriate handler to finally update the playlist with the new track order
			unsafeWindow.asyncRequest({
				call: "savePlaylistOrder",
				content: {
					id: jQuery(".playlist_song_list").attr("sid"),
					order: ids
				},
				method: "POST",
				successCallback: function (data) {
					alert("The playlist has been sorted successfully.");
					location.reload();
				}
			});
		}
	}
});

// ==/UserScript==