// ==UserScript==
// @match http://mog.com/chrome*
// @match https://mog.com/chrome*
// @include http://mog.com/chrome*
// @include https://mog.com/chrome*
// @name MOG Plus
// @namespace http://mog.com/
// @description Adds various features to MOG Chrome Player.
// @version 0.1
// ==/UserScript==

function main() {

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

    // handle loved tracks.
    // check if inside library : /{mogger}/track_listing/{album_id}
    // returns list of dd .track #track_{track_id}
    // add: /tracks/mn.../save_to_library
    // remove: /my_mog/remove_library_track/{track_id}

    function mogger() {
	var s = Mog.readCookie("mogger_state");
	return s.substring(s.indexOf("user_name%3D")+12);
    }

    // we use a cache to avoid requesting favorite tracks from
    // a specific album multiple times
    Mog.ui.trackLovedCache = {};

    function getLovedForAlbum(album_id, f) {

	if (album_id in Mog.ui.trackLovedCache) {

	    f( Mog.ui.trackLovedCache[album_id] );

	} else {

	    $.post("/" + mogger() + "/track_listing/" + album_id,
		   { api_key : Mog.api.API_KEY },
		   function (ret) {
		       
		       var lovedOnes = ret.match(/track_[0-9]+/g);
		       var lovedOnesSet = {};
		       
		       if (lovedOnes !== null)
			   $.each(lovedOnes, function() { lovedOnesSet[this.substring(6)] = 1; });
		       Mog.ui.trackLovedCache[album_id] = lovedOnesSet;
		       
		       f( lovedOnesSet );

		   });

	}


    }

    function isTrackLoved(t,f) {

	var album_id = t.attr("album_id");
	var track_id = t.attr("track_id");

	getLovedForAlbum(album_id, function(d) { f( track_id in d); });

    }

    function loveTrack(t,f) {
	var track_id = t.attr("track_id");
	var album_id = t.attr("album_id");

	$.post("/tracks/mn" + track_id + "/save_to_library",
	       { api_key : Mog.api.API_KEY },
	       function() {
		   if (album_id in Mog.ui.trackLovedCache) Mog.ui.trackLovedCache[album_id][track_id] = 1;
		   f();
	       });
    }

    function unloveTrack(t,f) {
	var track_id = t.attr("track_id");
	var album_id = t.attr("album_id");
	$.post("/my_mog/remove_library_track/" + track_id,
	       { api_key : Mog.api.API_KEY },
	       function() {
		   if (album_id in Mog.ui.trackLovedCache) delete Mog.ui.trackLovedCache[album_id][track_id];
		   f();
	       });
	
    }

    function addLoveButton(a) {

	if (a.find(".love_track").length == 0) {
	    var b = $("<a/>");
	    b
		.addClass("love_track").attr("title", "Love track")
		.append($("<span/>").addClass("love_ico"))
		.css("opacity", "0.1")
		.insertBefore($(a).find(".delete"));

	    isTrackLoved($(a),
			 function(isLoved) {
			     b.css("opacity", "1.0");
			     if (isLoved) {
				 b.addClass("active")
				     .toggle(function(c) { c.preventDefault(); unloveTrack($(a), function() { b.removeClass("active"); }); },
					     function(c) { c.preventDefault(); loveTrack($(a), function() { b.addClass("active"); }); });
			     } else {
				 b.removeClass("active")
				     .toggle(function(c) { c.preventDefault(); loveTrack($(a), function() { b.addClass("active"); }); },
					     function(c) { c.preventDefault(); unloveTrack($(a), function() { b.removeClass("active"); }); });
			     }
			 });
	}
	return a;

    }
    Mog.ui.addLoveButton = addLoveButton;

    function registerAddLove() {

	var oldRenderTrack = Mog.ui.renderTrack;
	Mog.ui.renderTrack = function (a,c) {
	    var ret = oldRenderTrack(a,c);
	    if (c == "play_queue") // comment this out if you want the ability to 'love' any track displayed.
		ret = addLoveButton(ret);
	    return ret;
	}

    }

    function updateTracksWithLove() {
	
	function aux(w) {
	    addLoveButton(w);
	    setTimeout(
		       function() {
			   var next = w.next(".track");
			   next.length != 0 ? aux(next) : registerAddLove();
			   return false;
		       }, 50);
	}

	if ($("#play_queue .track:first").length > 0) aux($("#play_queue .track:first"));
	else registerAddLove();
    }

    function threadThrough(l,fcons,fnil) {
	
	function aux(n) {
	    if (l.length <= n) typeof fnil == "function" && fnil();
	    else fcons(l[n], function() { aux(n+1); });
	}
	aux(0);

    }

    function getLovedTracks(f) {

	var favplaylist = { title : "(Favorites)",
			    name  : "(Favorites)",
			    tracks : [] };
	
	Mog.ui.renderLoadingMessage("Loading favorite artists...");
	$.post("/my_mog/library", function(ret) {

		var artists = $.map( $(ret).find("#my-library .artist") , function (b) { return $(b).attr("id").substring(7); } );

		threadThrough(artists,
			      function (artist_id, k_artist) {
				  
				  Mog.ui.renderLoadingMessage("Loading favorite albums for artist ID " + artist_id + "...");
				  $.post("/" + mogger() + "/album_listing/" + artist_id,
					 { api_key : Mog.api.API_KEY },
					 function (ret2) {
					     
					     var albums = ret2.match(/dl id=\"mn[0-9]+/g);
					     if (albums === null) k_artist();
					     albums = $.map(albums, function(b) { return b.substring(9); });

					     threadThrough(albums,
							   function (album_id, k_album) {

							       Mog.ui.renderLoadingMessage("Loading favorite tracks for album ID " + album_id + "...");
							       getLovedForAlbum(album_id,
										function (favids) {
										    
										    Mog.ui.renderLoadingMessage("Loading info for album ID " + album_id + "...");
										    Mog.api.getAlbumMeta(album_id,
													 function(d) {
													     if (d.tracks.length == 0) k_album();
													     $.each(d.tracks, function(i,t) {
														     if (t.track_id in favids)
															 favplaylist.tracks.push(t);
														 });
													     k_album();
													 });
										});

										//     threadThrough(tracks,
										// 		  function(track_id, k_track) {
												      
										// 		      Mog.ui.renderLoadingMessage("Loading info for track ID " + track_id + "...");
										// 		      Mog.api.getTrackMeta(track_id,
										// 					   function (tinfo) {
										// 					       favplaylist.tracks.push(tinfo);
										// 					       k_track();
										// 					   });
												      
										// 		  },
										// 		  k_album);

										// });
							       
							   },
							   k_artist);

					 });

			      },
			      function() { Mog.ui.hideLoadingMessage(); f(favplaylist); });
	    });
    }
    Mog.ui.getLovedTracks = getLovedTracks;


    // add batch search functionality
    function myRenderSearchResults(s,a,b) {

	var c = $(s);
	c.empty();
	var f = a[0],
        d = a[1],
        e = a[2],
        g = $("<ul/>").appendTo(c);

	// tracks
	if(e.length > 0) {
	    g.append($("<li/>").addClass("batch_search_category").append($("<span/>").html("Tracks")).append($("<span/>").addClass("count").html("(" + e.length + ")")));
	    var i = $("<ul/>");
	
	    $.each(e, function (m, k) {
		album = k[1];
		artist = k[0];
		var n = k[2][1],
		u = k[2][2],
		v = k[0][1],
		w = k[0][2],
		A = k[1][1],
		r = k[1][2];
		Mog.ui.renderTrack(n, u, v, w, A, r, "", true, Mog.ui.renderTrackControlsNotQueue).click(function () {
		    Mog.ui.enqueueTrack(n, u, v, w, A, r, "", true, true)
		}).appendTo(i)
	    });
	    i.appendTo(g);
	    
	}

	// albums
	if (d.length > 0) {
	    g.append($("<li/>").addClass("batch_search_category").append($("<span/>").html("Albums")).append($("<span/>").addClass("count").html("(" + d.length + ")")));
	    var j = $("<ul/>");
	    $.each(d, function (m, k) {
		m++;
		var n = k[0][1],
		u = k[0][2],
		v = k[1][1],
		w = k[1][2],
		A;
		A = Mog.isNatural(m / 4) ? "m last" : "m";
		Mog.ui.renderAlbum(v, w, n, u, "m", A).appendTo(j)
	    });
	    j.appendTo(g);
	    $("<span/>").css({"display":"block","clear":"both"}).appendTo(g);
	}

	// // artists
	if(f.length > 0) {

	    g.append($("<li/>").addClass("batch_search_category").append($("<span/>").html("Artists")).append($("<span/>").addClass("count").html("(" + f.length + ")")));
	    var h = $("<ul/>");
	    $.each(f, function (m, k) {
		Mog.ui.renderArtist(k[0][1], k[0][2], false).appendTo(h)
	    });
	    h.appendTo(g);

	}

    }

    function handleBatchSearch() {
	
	var v = $("#batch_search_field").val();
	var searches = v.split("\n");

	if ($("#batch_search_results").length > 0) { $("#batch_search_results").empty(); }
	else { $("#batchsearch").append($("<div/>").attr("id", "batch_search_results")); }


	$("#batch_search_results")
	    .append($("<h2/>")
		    .html("Batch Search Results"))
	    .append($("<ol/>"));
	
	$.each(searches, function(i,s) {

		s = s.replace(/(^\s+)|(\s+$)/g, '');
		if (s.length > 0) {
		    
		    $("#batch_search_results ol").
			append($("<li/>")
			       .append($("<span/>").text(s))
			       .append($("<div/>")
				       .attr("id", "search_results_" + i)
				       .css("margin-left", "1em")
				       ));

		}
	    });

	function aux(w) {

	    function next() {
		if ($(w).next("li").length > 0) aux($(w).next("li"));
		else Mog.ui.hideLoadingMessage();
	    }

	    if ($(w).length == 0) return;

	    var search = $(w).find("span");
	    var text = $(search).text();

	    Mog.ui.renderLoadingMessage("Searching for \"" + text + "\"...");
	    Mog.api.getSearchResults(text, 5,
				     function(a,b) {
					 myRenderSearchResults($(search).next("div"), a, b);
					 next();
				     } );

	}

	if (searches.length > 0) aux($("#batch_search_results li:first"));


    }

    function renderBatchSearchPanel() {

	$("#batchsearch")
	    .empty()
	    .append($("<h1/>")
		    .html("Batch Search"))
	    .append($("<form/>")
		    .submit(function(c){ c.preventDefault(); handleBatchSearch(); return false; })
		    .append($("<textarea/>").attr({ id : "batch_search_field" }))
		    .append($("<button/>").attr({ type : "submit" }).html("Search")));

    }


    // playlist functionality
    function saveAsPlaylist(name, id, tracks_ids) {

	var tracks = (tracks_ids).join(",");
	var playlist = { playlist_id : id,
			 name : name,
			 tracks : tracks,
			 screen_name : mogger(),
			 track_count : tracks.length };
	
	$.post(Mog.URI.get('playlist')(id),
	       playlist, function(r) {
		   dialog.dialog('close');
	       });


    }

    function newPlaylist(v) {
	$.post("/playlists/create",
	       {format:'js', name:v},
	       function (resp) {
		   if (resp.success) {
		       addToSavePlaylistDialog(v, resp.playlist_id);
		   }
	       },
	       'json');
    }


    function setup() {

	// add shuffle button
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

	// add batch search
	$("<li/>")
	    .append($("<a/>")
		    .attr({ "href" : "#batchsearch",
			    "id"   : "batchsearch_nav" })
		    .addClass("nav clrfx")
		    .click(renderBatchSearchPanel)
		    .append($("<span/>")
			    .addClass("nav_icon"))
		    .append($("<span/>")
			    .addClass("nav_text")
			    .html("Batch Search")))
	    .insertBefore($("#sign_out_nav_container"));

	$("<div/>")
	    .attr({ "id" : "batchsearch" })
	    .addClass("panel clrfx")
	    .css({ "display" : "none", "min-height" : "490px" })
	    .appendTo($("#main"));
			    

	// add styles
	var style = $("<style/>").appendTo($("head"));
	style.html("#play_queue .love_track .love_ico { background: url(http://images3.mog.com/images/player/sprite_global2.png) no-repeat -476px -12px; width:30px; height:22px; text-indent: -9999px; cursor: pointer; position: absolute; right: 40px; top: 5px; display: none; }\n" +
		   "#play_queue .love_track.active .love_ico { background: url(http://images3.mog.com/images/player/sprite_global2.png) no-repeat -476px -42px; }\n" +
		   "#play_queue .track:hover .love_track .love_ico { display: block; }\n" +
		   "textarea { display : block; margin: 5px; background: black; border: 1px solid #333333; color: white; width: 400px; height: 200px; }\n" +
		   "button   { display : block; margin: 5px; background: black; border: 1px solid #333333; color: white; padding: 10px; }\n" +
		   "#batch_search_results ol { list-style: decimal inside; margin-left: 2em; }\n" +
		   "#batch_search_results > h2 { margin-top: 2em; font-size: 1.7em; }\n" +
		   "#batch_search_results > ol > li { margin-top: 2em; }\n" +
		   "#batch_search_results > ol > li > span { font-size: 1.5em; margin-bottom: 0.2em; }\n" +
		   "#batch_search_results .batch_search_category { font-size: 1.3em; margin-top: 0.5em; margin-bottom: 0.2em; }\n"
		   );

	// add love button
	updateTracksWithLove();

	// Defer saving database
	var oldSaveRealized = Mog.ui.saveRealized;
	var savetimer = null;
	Mog.ui.saveRealized = function() { clearTimeout(savetimer); savetimer = setTimeout(oldSaveRealized, 500); }
	
	// Patch renderPanel for new panels
	var oldRenderPanel = Mog.ui.renderPanel;
	Mog.ui.renderPanel = function(a, b) {
	    oldRenderPanel(a,b);
	    switch(a) {
	    case "batchsearch":
		renderBatchSearchPanel(); break;
	    }
	}
	// $(window).trigger('hashchange');

    }

    setup();

}

var script = document.createElement("script");
script.appendChild(document.createTextNode("(" + main + ")();"));
(document.body || document.head || document.documentElement).appendChild(script);
