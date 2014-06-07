// ==UserScript==
// @name 			Test-GrooveDown
// @namespace 		http://gs.pointlimit.com/
// @version  		0.02
// @notes			Changed download process. Again.
// @description    	Test - Don't use, please.
// @include        	http://*.grooveshark.com/*
// @include        	http://grooveshark.com/*
// @match        	http://*.grooveshark.com/*
// @match        	http://grooveshark.com/*
// @author         	Modified from NoFaTe. Test purposes.
// ==/UserScript==

// Script version
// TODO: Obtain this from metadata
var version = 0.02;

function GrooveDown() {

	var downloadEvent = document.createEvent('Event');
	downloadEvent.initEvent('downloadSong', true, true);

	jQuery.download = function(url, data, method){
		if( url && data ){ 
			data = typeof data == 'string' ? data : jQuery.param(data);
			var inputs = '';
			jQuery.each(data.split('&'), function(){ 
				var pair = this.split('=');
				inputs+='<input name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
			});
			jQuery('<form method="POST" action="'+ url +'" target="_blank">'+inputs+'</form>')
			.appendTo('body').submit().remove();
		};
	};
	
	// Check if a song is playing and if so download it
	function downloadSong() {
		var song = GS.player.getCurrentSong();
		alert("prova");
		if (song)
		{
			var secretKey = 'neverGonnaLetYouDown';
			var songID = song.SongID;
			
			for (var randomizer = "", q = 0; q < 6; q++)
			{
				randomizer += Math.floor(Math.random() * 16).toString(16);
			}
			
			var token = randomizer + hex_sha1("getStreamKeyFromSongIDEx:" + GS.service.currentToken + ":" + secretKey + ":" + randomizer);
			
			var postfields = '{\
				"method":"getStreamKeyFromSongIDEx",\
				"header":{\
					"country":' + JSON.stringify(gsConfig.country) + ',\
					"clientRevision":"20110722.11",\
					"privacy":0,\
					"token":"' + token + '",\
					"client":"jsqueue",\
					"uuid":"' + gsConfig.uuid + '",\
					"session":"' + gsConfig.sessionID + '"\
				},\
				"parameters":{\
					"country":' + JSON.stringify(gsConfig.country) + ',\
					"songID":' + songID + ',\
					"mobile":false,\
					"prefetch":false\
				}\
			}';
			
			$.ajax({
				contentType: "application/json",
				dataType: "json",
				type: "POST",
				data: postfields,
				url: "http://grooveshark.com/more.php?getStreamKeyFromSongIDEx",
				success: function(data) {
					var server = data.result.ip;
					var streamKey = data.result.streamKey;
					
					$('#serverIP').html(server);
					$('#streamKey').html(streamKey);
					$('#songInfo').html(song.SongName + " - " + song.ArtistName);

					message = "The song is now being downloaded and will be automatically saved.<br/>If you are in Firefox just save the page that will open as .mp3<br/>If you are in Chrome you will have to remove .dl from it's extension in order to listen to it.<br/>Also, you might want to click 'Leave Page' in the popup that will appear (no, it won't actually close this page).";
					options = { 'manualClose': true, 'styles': ['update']  };
					notice(message, options);
					
					if(/Chrome/.test(navigator.userAgent))
					{
						document.getElementById('serverIP').dispatchEvent(downloadEvent);
					}
					else
					{
						setTimeout( function() {
							$.download('http://' + server + '/stream.php', 'streamKey=' + encodeURI(streamKey));
						}, 4000);
					}					
				}
			});
		}
		else
		{
			message = 'Play a song before trying to download it';
            options = { 'type': 'error', 'manualClose': false };
            notice(message, options);
		}
	}

	var lastTitle = '';
	
	// Checks if the page has loaded in order to add the custom buttons
	function ready(isReady) { 
		if (!isReady) 
		{ 
			setTimeout(function() { 
				if (typeof GS === 'undefined' || typeof GS.player.player === 'undefined') 
				{ 
					ready(false); 
				} 
				else if (GS.user.isLoggedIn && !$('#userOptions').children().hasClass('first surveyLink')) 
				{
					ready(false); 
				}  
				else 
				{ 
					ready(true); 
				} 
			}, 200); 
		} 
		else 
		{
			// Adds the download button and makes sure it won't get removed
			$.subscribe('gs.player.queue.change', addDLButton);
			
			// Changes the page's title based on the current song
			setInterval(function() {
				if (GS.player.isPlaying)
				{
					var song = GS.player.getCurrentSong();
					document.title = song.SongName + " - " + song.ArtistName + " - Grooveshark";
					lastTitle = song.SongName + " - " + song.ArtistName + " - Grooveshark";
				}
				else
				{
					if (document.title == lastTitle)
					{
						document.title = 'Grooveshark - Listen to Free Music Online - Internet Radio - Free MP3 Streaming';
					}
				}
			}, 500);
	
			addDLButton();
		}
	}

	// Creates a notice at the bottom right corner of the page
	function notice(message, options) {
		options || (options = {});
		options.message = message;
		options.type = (options.type || '');
		options.styles = (options.styles || false);
		options.displayDuration = (options.displayDuration || 2500);
		options.manualClose = (options.manualClose || false);

		GS.notice.displayMessage(options);

		if (options.styles) 
		{
			options.styles = options.styles.join(' ');
			$('#notifications .notification:first-child').addClass(options.styles);
		}
	}

	// Add the 'Download Song' button
	function addDLButton() {
		addButton('#dlBtn', {
			  'label': 'Download Song'
			, 'onclick': downloadSong
		});
	}

	// Create a new button and add it to the player
	function addButton(uid, options) {
//init OFA 06/12/2011
		//Delete previously added button, if exist.
		var node =  document.getElementById(uid.slice(1));
		if (node)
		{
			var parent_node = node.parentNode;
			if (parent_node)
			{
				parent_node.removeChild(node);
			}	
		}
//end OFA 06/12/2011
//OFA - Modify reference button and previous button, since used before no longer exist.
		var buttonTag = $('#queue_save_button', '#playerDetails_queue').clone().attr('id', uid.slice(1)).html('<span>' + options.label + '</span>');

		$(buttonTag).click(options.onclick);
		$('#queue_save_button', '#playerDetails_queue').after(buttonTag);
    }

	ready(false);

}

injectStyle('#notifications li.update { width:290px; margin:0 0 3px -40px; }');
injectScript('GrooveDown', GrooveDown);

// Check for updates
setTimeout(function() { 
	checkForUpdates();
}, 4000);

// Ad Removal Functions
var capital = document.getElementById("capital");
var application = document.getElementById("application");
var mainContainer = document.getElementById("mainContainer");

var removeAd = function() {
	if (application && capital) {
		try 
		{
			application.style.marginRight = "0px";
			capital.style.display = "none";
			mainContainer.removeChild(capital);
		}
		catch(error) { }
	}
}

mainContainer.addEventListener("DOMSubtreeModified", removeAd, true);
removeAd();

// Check for newer versions
function checkForUpdates() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://gs.pointlimit.com/?ver=' + version,
		onload: function(resp){
			if (resp.status == '200' && resp.responseText != '')
			{
				injectScript('GrooveUpdater', updateNotify);
			}
		}
	});
}

function updateNotify() {
	// Creates a notice at the bottom right corner of the page
	function notice(message, options) {
		options || (options = {});
		options.message = message;
		options.type = (options.type || '');
		options.styles = (options.styles || false);
		options.displayDuration = (options.displayDuration || 2500);
		options.manualClose = (options.manualClose || false);

		GS.notice.displayMessage(options);

		if (options.styles) 
		{
			options.styles = options.styles.join(' ');
			$('#notifications .notification:first-child').addClass(options.styles);
		}
	}

	// Notify the user that there are updates available
	message = 'It seems that GrooveDown is out-of-date.<br/>Click <a href="http://gs.pointlimit.com/?get=1" target="_blank">here</a> to obtain the latest version.';
	options = { 'type': 'error', 'manualClose': true, 'styles': ['update'] };
	notice(message, options);
}

// Song downloader
function downloadSongLocal() {
	var server = document.getElementById("serverIP").innerHTML;
	var streamKey = document.getElementById("streamKey").innerHTML;
	var songInfo = document.getElementById("songInfo").innerHTML;
	alert(songInfo);
	// This fails on Firefox
	// Gotta find out why
	
	var xhr = new XMLHttpRequest();

	xhr.open("POST", "http://" + server + "/stream.php", true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = 'arraybuffer';
	
	xhr.onload = function() 
	{
		if(xhr.status == 200) 
		{   
			var bb = new (window.BlobBuilder || window.WebKitBlobBuilder)();
			bb.append(this.response);
			var blob = bb.getBlob("application/octet-stream");
			saveAs(blob, songInfo + ".mp3");
		}
	}
	xhr.send("streamKey=" + encodeURI(streamKey));
}
	

if (window.attachEvent) {
	window.attachEvent('onload', injectCustomVars);
}
else if (window.addEventListener) {
	window.addEventListener('load', injectCustomVars, false);
}
else {
	document.addEventListener('load', injectCustomVars, false);
}

function injectCustomVars() {

	var serverIP = document.createElement("div");
	serverIP.style.display = "none";
	serverIP.id = "serverIP";

	document.body.appendChild(serverIP);
	
	var streamKey = document.createElement("div");
	streamKey.style.display = "none";
	streamKey.id = "streamKey";

	document.body.appendChild(streamKey);
	
	var songInfo = document.createElement("div");
	songInfo.style.display = "none";
	songInfo.id = "songInfo";

	document.body.appendChild(songInfo);
	
	serverIP.addEventListener('downloadSong', function() {
		downloadSongLocal();
	});
}

// Style injection functions
function injectStyle(css) {
	var head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

// Script injection functions
function injectScript(scriptID, func) {
	var container = document.body;
    var script = document.getElementById(scriptID);

    if (!script) {
        script = document.createElement('script');
        script.id = scriptID;
        script.textContent = '(' + func.toString() + ')();';
        container.appendChild(script);
    }
}

var saveAs = saveAs || (function(view) {
	"use strict";
	var
		  doc = view.document
		  // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, URL = view.URL || view.webkitURL || view
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			return node.dispatchEvent(event); // false if event was cancelled
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function (ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		, deletion_queue = []
		, process_deletion_queue = function() {
			var i = deletion_queue.length;
			while (i--) {
				var file = deletion_queue[i];
				if (typeof file === "string") { // file is an object URL
					URL.revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			}
			deletion_queue.length = 0; // clear queue
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, get_object_url = function() {
					var object_url = get_URL().createObjectURL(blob);
					deletion_queue.push(object_url);
					return object_url;
				}
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_object_url(blob);
					}
					target_view.location.href = object_url;
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_object_url(blob);
				save_link.href = object_url;
				save_link.download = name;
				if (click(save_link)) {
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					return;
				}
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".dl";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			} else {
				target_view = view.open();
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									deletion_queue.push(file);
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;
	
	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;
	
	view.addEventListener("unload", process_deletion_queue, false);
	return saveAs;
}(self));
