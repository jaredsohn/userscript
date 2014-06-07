// ==UserScript==
// @name           VK Album Search
// @namespace      krz
// @description    Find albums of an artist on VK
// @include        http://*vkontakte.ru/audio.php*
// @include		   http://*vk.com/audio.php*
// ==/UserScript==

var $;

// Add jQuery
(function(){
	var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement;
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;
		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {

var MB_ARTIST = 1, MB_ALBUM = 2, MB_TRACKS = 3;

function QueryQueue(onAction, options) {

	var defaults = {
		delay: 1000,
		onAction: false,
		onPreAction: false
	}	
	options = $.extend(defaults, options);
	options.onAction = onAction;

	var queue = [];
	var queue_id = 0;
	var busy = false;
	var running = false;
	var ts = 0;
	
	var performAction = function(from_callback) {
//console.log("here1");	
		if (busy && !from_callback) {
			return;
		}
		
//console.log("here2");	
		if (!running) {
			if (from_callback) {
				return;
			} else {
				running = true;
				queue_id++;
			}
		}
		busy = true;

//console.log("here3");	
		if (queue.length == 0) {
			busy = false;
			running = false;
			return;
		}
		
//console.log("here5");	
		if (options.onPreAction) {
			options.onPreAction();
		}

		var ts_diff = (new Date()).getTime() - ts;
		if (ts_diff < options.delay) {
			setTimeout(function() { performAction(true); }, options.delay - ts_diff + 5);
			return;
		}
		ts = (new Date()).getTime();
		
//console.log("here6");	
		var item = queue.shift();		
		if (options.onAction) {
//console.log("here7", options.onAction);	
			setTimeout(function() { options.onAction(item); }, 0);
		} else {
//console.log("here8", options.onAction);	
			setTimeout(function() { performAction(true); }, 0);
		}
	}
	
	var queueObject = {
		push: function(item, postpone) {
			queue.push(item);
			if (!postpone) {
				performAction();
				return queue_id;
			}
			return true;
		},
		start: function() {
			performAction();
		},
		stop: function() {
			running = false;
			busy = false;
		},
		resume: function() {
			performAction(true);
		},
		isRunning: function(q_id) {
			return running && (queue_id ? q_id == queue_id : true);
		},
		getQueueId: function() {
			return queue_id;
		}
	}
	return queueObject;
}

/*
var q_id;
var q = new QueryQueue(function(p) {
	setTimeout(function() {
		console.log(p, ", ", q.isRunning(q_id));
		q.resume();
	}, 1500);
});
q_id = q.push("a");
q.push("b");
q.push("c");
q.push("d");
q.push("e");
console.log(q_id);
//setInterval(function() { console.log(q.isRunning()); }, 2000);
setTimeout(function() { q.stop(); }, 1400);
*/

function mbNsResolver(prefix) {
	var ns = {
		'ext': "http://musicbrainz.org/ns/ext-1.0#",
	}
	return ns[prefix] || "http://musicbrainz.org/ns/mmd-1.0#";
}

function preLookupArtist() {
	var value = $("#vkas_artist")[0].getValue();
	if (!value) {
		return $("#vkas_artist").focus();
	}
	gmQueueId = gmQueue.push(function() { unsafeWindow.vkasLookupArtist(value); });
}

function showProgressBar() {
	$("#vkas_content").html("<div style='margin: 6px auto; margin-top: 7px; width: 149px;'><img src='images/progress7.gif'></div>");
	$("#vkas_content").show();
	$("#vkas_shadows").show();	
}

unsafeWindow.vkasFindTrack = function(name) {
	console.log('VK: ' + name);
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://vk.com/gsearch.php?ajax=1&c[noiphone]=1&c[section]=audio&c[q]=' + encodeURIComponent(name),
		onload: function(r) {
			if (!vkQueue.isRunning(vkQueueId)) { return; }
			res = eval("(" + r.responseText + ")");
			console.log(res);
			$("#vkas_tmp").html(res.rows);
			$("#vkas_content").append($("#vkas_tmp").children()[0]);
			vkQueue.resume();
		}
	});
}

function createAlbumLink(artist_name, artist_id, album_name, album_id, lookup_album) {
	var link = $(document.createElement("a")).attr("id", "vkas_lookup_album" + album_id).attr("href", "http://musicbrainz.org/album/" + album_id).html(album_name);
	if (!lookup_album) {
		func = function(e) { 
			gmQueueId = gmQueue.push(function() { unsafeWindow.vkasLookupTracks(artist_name, artist_id, album_name, album_id); });
			return false;
		}	
	} else {
		func = function(e) { 
			gmQueueId = gmQueue.push(function() { unsafeWindow.vkasLookupAlbums(artist_name, artist_id); });
			return false;
		}	
	}
	link.click(func);
	return link;
}

function createArtistLink(artist_name, artist_id, lookup_artist) {
	var call_id = artist_id, call_name = artist_name, func;
	var link = $(document.createElement("a")).attr("id", "vkas_lookup_artist" + artist_id).attr("href", "http://musicbrainz.org/artist/" + artist_id).html(artist_name);
	if (!lookup_artist) {
		func = function(e) { 
			gmQueueId = gmQueue.push(function() { unsafeWindow.vkasLookupAlbums(call_name, call_id); });
			return false;
		}	
	} else {
		func = function(e) { 
			gmQueueId = gmQueue.push(function() { unsafeWindow.vkasLookupArtist(call_name); });
			return false;
		}	
	}
	link.click(func);
	return link;
}

unsafeWindow.vkasLookupTracks = function(artist_name, artist_id, album_name, album_id) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://musicbrainz.org/ws/1/release/' + album_id + '?type=xml&inc=tracks', 
		onload: function(r) {
			var doc = (new DOMParser()).parseFromString(r.responseText, "application/xml");
			var nodesSnapshot = doc.evaluate("ns:metadata/ns:release/ns:track-list/ns:track[ns:title]", doc, mbNsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var i, k = nodesSnapshot.snapshotLength, found_tracks = 0, node, id, name;
			$("#vkas_content").html("");
			$("#vkas_nav").html($(document.createElement('div')).html(createArtistLink(artist_name, artist_id, true)).append(" &raquo; ").append(createAlbumLink(artist_name, artist_id, album_name, album_id, true)).append(" &raquo; треклист "));
			$("#vkas_artist" + artist_id).click(function(e) { return unsafeWindow.vkasLookupArtist(artist_name) } );
			$("#vkas_album" + album_id).click(function(e) { return unsafeWindow.vkasLookupAlbums(artist_name, artist_id); } );
			for (i = 0; i < k; i++) {
				node = nodesSnapshot.snapshotItem(i);
				id = node.getAttribute("id");
				name = node.childNodes[0].textContent;
				// $("#vkas_content").append("<div><a id='vkas_album" + id + "' href='http://musicbrainz.org/release/" + id + "'>" + name + "</a></div>");
				// $("#vkas_content").append(createAlbumLink(artist_name, artist_id, album_name, album_id));
				found_tracks++;
				vkQueueId = vkQueue.push(artist_name + " " + name);
			}
			if (found_tracks == 0) {
				$("#vkas_content").append("В альбоме нет треков.");
			}
			gmQueue.resume();
		}
	});
}

unsafeWindow.vkasLookupAlbums = function(artist_name, artist_id) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://musicbrainz.org/ws/1/artist/' + artist_id + '?type=xml&inc=track-rels+sa-Official+sa-Album', 
		onload: function(r) {
			var doc = (new DOMParser()).parseFromString(r.responseText, "application/xml");
			var nodesSnapshot = doc.evaluate("ns:metadata/ns:artist/ns:release-list/ns:release[ns:title]", doc, mbNsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var i, k = nodesSnapshot.snapshotLength, found_albums = 0, node, id, name;
			$("#vkas_content").html("");
			$("#vkas_nav").html($(document.createElement('div')).html(createArtistLink(artist_name, artist_id, true)).append(" &raquo; альбомы</div>"));
			$("#vkas_artist" + artist_id).click(function(e) { return unsafeWindow.vkasLookupArtist(artist_name) } );
			for (i = 0; i < k; i++) {
				node = nodesSnapshot.snapshotItem(i);
				id = node.getAttribute("id");
				name = node.childNodes[0].textContent;
				$("#vkas_content").append($(document.createElement('div')).html(createAlbumLink(artist_name, artist_id, name, id)));
				found_albums++;
			}
			if (found_albums == 0) {
				$("#vkas_content").append("Не было издано ни одного альбома этого исполнителя.");
			}
			$("#vkas_nav").show();
			gmQueue.resume();			
		}
	});
}

unsafeWindow.vkasLookupArtist = function(artist) {
	$("#vkas_nav").hide();
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://musicbrainz.org/ws/1/artist/?type=xml&name=' + encodeURIComponent(artist),
		onload: function(r) {
			var doc = (new DOMParser()).parseFromString(r.responseText, "application/xml");
			var nodesSnapshot = doc.evaluate("ns:metadata/ns:artist-list/ns:artist[ns:name]", doc, mbNsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var i, k = nodesSnapshot.snapshotLength, found_artists = 0, node, score, id, name;
			$("#vkas_content").html("");			
			for (i = 0; i < k; i++) {
				node = nodesSnapshot.snapshotItem(i);
				score = node.getAttribute("ext:score");
				id = node.getAttribute("id");
				name = node.childNodes[0].textContent;
				if (score > 50) {
					$("#vkas_content").append($(document.createElement('div')).html(createArtistLink(name, id)));
					found_artists++;
				}
			}
			if (found_artists == 0) {
				$("#vkas_content").html("Исполнителей с таким именем не найдено.");
			}			
			gmQueue.resume();
		}
	});
};

var vkQueueId = 0, vkQueue = new QueryQueue(function(name) { unsafeWindow.vkasFindTrack(name); } );
var gmQueueId = 0, gmQueue = new QueryQueue(function(func) { vkQueue.stop(); func(); }, { onPreAction: showProgressBar } );

html = "<div style='padding: 8px; background-color:#F2F2F2;'><div class='fl_l' style='padding: 1px 7px 0 0;'><input class='inputText inputSearch' style='width: 300px; padding-left: 17px;' id='vkas_artist' type='text' placeholder='Введите название исполнителя'></div> \
	<div class='fl_l'><ul class='nNav btnList'><li style='margin: 0px;'><b class='nc'><b class='nc1'><b></b></b><b class='nc2'><b></b></b></b> \
    <span class='ncc'><a id='vkas_lookup_artist' onfocus='this.blur()'>Поиск</a></span> \
    <b class='nc'><b class='nc2'><b></b></b><b class='nc1'><b></b></b></b></li></ul></div><div class='clear'></div></div> \
	<div class='alist_shadow' style='opacity: 0.3; margin-top: 0px;'></div> \
	<div class='alist_shadow' style='opacity: 0.11; margin-top: 1px;'></div> \
	<div class='alist_shadow' style='opacity: 0.07; margin-top: 2px;'></div> \
	<div class='alist_shadow' style='opacity: 0.03; margin-top: 3px;'></div> \
	<div id='vkas_nav' style='padding: 8px; border-bottom: 1px solid #D1D1D1; display: none;'></div> \
	<div id='vkas_content' style='padding: 8px; display: none;'></div> \
	<div id='vkas_shadows' style='display: none'> \
	<div class='alist_shadow' style='opacity: 0.3; margin-top: 0px;'></div> \
	<div class='alist_shadow' style='opacity: 0.11; margin-top: 1px;'></div> \
	<div class='alist_shadow' style='opacity: 0.07; margin-top: 2px;'></div> \
	<div class='alist_shadow' style='opacity: 0.03; margin-top: 3px;'></div> \
	</div> \
	<div id='vkas_tmp' style='display: none'></div>";	
var mb = new unsafeWindow.MessageBox({
	title: "Поиск альбомов",	
	bodyStyle: 'padding: 0;',
	width: 480
});
mb.addButton({ label: "Закрыть", onClick: mb.hide });
$("#quickquery").after('<div style="margin-top: 10px;" class="blue_button_shadow"><div class="blue_button"><div class="blue_button_body" id="vkas_button" onmouseover="this.className=\'blue_button_body_over\'" onmouseout="this.className=\'blue_button_body\'">Поиск альбомов</div></div></div>');
$("#vkas_button").click(function() { 
	mb.content(html);
	$("#vkas_lookup_artist").click(preLookupArtist);
	$("#vkas_artist").keypress(function(e) { if (e.keyCode == 13) { preLookupArtist(); } });
	unsafeWindow.placeholderSetup($("#vkas_artist")[0]);
	mb.show(); 
});

}