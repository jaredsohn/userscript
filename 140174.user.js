// ==UserScript==
// @name           WeBopSync
// @namespace      nowhere
// @description    Syncs tags across firefox browsers
// @include        http://webop.me/torrent*
// @include        http://webop.me/tags*
// @include        http://webop.me/users/*
// @match        http://webop.me/torrent*
// @match        http://webop.me/tags* 
// @match        http://webop.me/users/*
// ==/UserScript==

var wbts = {
	PREFIX: "wb_sync_",
	userPrefix: "",
	version: "1.01",
	checkUpdates: 1,
	init: function() {
		
		var $ = unsafeWindow.jQuery;

		//validate that a user key is set

		wbts.userPrefix = wbts.getItemLocal("userPrefix", "");
		wbts.checkUpdates = wbts.getItemLocal("checkTagSyncUpdates", 1);

		if (wbts.userPrefix == "") {
			wbts.setKey();
			return;
		}

		$("img.favcommand, img.newTorrent, input[value='Clear New'], #stickyNew").live("click", function() { //any time a new tag is added, or reset new is clicked, save to cloud
			setTimeout(function() { 
				wbts.syncLocalToServer();
			}, 50 );
		});

		if ( $("#tags").size() > 0 ) {
			var buttonContainer = $("<div></div>");

			var upload = $('<p><br />Sync:</p> <span>[<a href="javascript:void(0)">Upload</a>] </span>');
			$(buttonContainer).append( upload ); 
			$(upload).bind("click", function () {
				setTimeout(function() { 
					wbts.syncLocalToServer();
				}, 1 );
			});

			var download = $('<span>[<a href="javascript:void(0)">Download</a>] </span>');
			$(buttonContainer).append( download ); 
			$(download).bind("click", function () {
				setTimeout(function() { 
					wbts.syncServerToLocal();
				}, 1 );
			});

			var setKey = $('<span>[<a href="javascript:void(0)">Set Key</a>] </span>');
			$(buttonContainer).append( setKey ); 
			$(setKey).bind("click", function () {
				setTimeout(function() { 
					wbts.setKey();
				}, 1 );
			});

			$("#tags").append( buttonContainer );
		}

		wbts.getItem("syncObject", [], function(syncObject) {

			syncObject = unsafeWindow.JSON.parse(syncObject);
			if (syncObject.error) {
				if (confirm("There is no data on the server for " + wbts.userPrefix + "\nWould you like to send your local settings to the cloud now?")) {
					wbts.syncLocalToServer();
				} 
				return;
			}
			var serverDate = syncObject.syncDate.toString();
			var lastSync = wbts.getItemLocal("lastSync", 0);

			if (lastSync == 0 ) { //There is nothing on the server or local, wait for user
				alert("To initiate the first sync, click Sync: [Upload] or [Download]. Sync will be automatic following first sync.");
				return;
			}
			
			if (serverDate > lastSync && serverDate != 1) { //if the server has a bigger date than local, replace local with server
				wbts.replaceLocalDataWithServerData(syncObject);
			}


			wbts.checkForUpdateToNewTorrrentSign(syncObject);


		});

		wbts.checkUpdates = wbts.getItemLocal("checkTagSyncUpdates", 1);

		if ( wbts.checkUpdates == 1) {
			setTimeout(function() {
				wbts.checkforScriptUpdate();
			}, 3000);
		}
			
	},
	checkForUpdateToNewTorrrentSign: function(syncObject) {
		if ( localStorage.getItem("last_torrent_id") !== null ) {
			if (syncObject.lastTorrent > localStorage.getItem("last_torrent_id")) { //the server has a newer torrent sign
				//kill the image tags
				var imgs = document.evaluate("//img[@class='newTorrent']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				for (var i=0; i<imgs.snapshotLength; i++) {
					var img = imgs.snapshotItem(i)
					if ( (img.parentNode.parentNode.getAttribute("id").substr(2)*1) <= syncObject.lastTorrent ) {
						img.setAttribute("style", "display:none");
					}		
				}
			}
		}
	},
	getSyncData: function() {
		var lastTorrent = localStorage.getItem("last_torrent_id");
		if (lastTorrent === null) {
			lastTorrent = 0
		}
		var syncObject = {
			"syncDate": wbts.toEpoch(new Date()),
			"lastTorrent": lastTorrent,
			"tags" : [
				{"name": "good_users", "value": ""},
				{"name": "warn_users", "value": ""},
				{"name": "bad_users", "value": ""},
				{"name": "good_tags", "value": ""},
				{"name": "warn_tags", "value": ""},
				{"name": "bad_tags", "value": ""}
			]
		};

		for (var i = 0; i < syncObject.tags.length; i++) {
			var item = syncObject.tags[i].name;
		    if (localStorage.getItem(item) !== null) {
		    	var j = unsafeWindow.JSON.stringify( unsafeWindow.JSON.parse(localStorage.getItem(item)) );
		    	syncObject.tags[i].value = j;
		    }
		}
		return syncObject;
	},
	syncLocalToServer: function() {
		var syncObject = wbts.getSyncData();
		wbts.setItemLocal("lastSync", syncObject.syncDate.toString() );
		var toSync = unsafeWindow.JSON.stringify(syncObject);
		wbts.setItem("syncObject", toSync, null);
		wbts.message("Saved data to the cloud.");
	},
	syncServerToLocal: function() {
		wbts.getItem("syncObject", [], function(syncObject) {
			syncObject = unsafeWindow.JSON.parse(syncObject);
			wbts.replaceLocalDataWithServerData(syncObject);
		});

	},
	replaceLocalDataWithServerData: function(syncObject) {
		var serverDate = syncObject.syncDate.toString();
		for (var i = 0; i < syncObject.tags.length; i++) {
			var item = syncObject.tags[i].name;
			var val = syncObject.tags[i].value;
			
			//delete the tag
			try {
				localStorage.removeItem(item);
			} catch(e) {}
			//and save it back
			if (val !== "" && val !== null) {
				localStorage.setItem(item, val);
			}
			
		}
		wbts.setItemLocal("lastSync", serverDate.toString() );
		wbts.message("Local Settings have been replaced by the cloud using " + wbts.fromEpoch(serverDate) + ", reload page to view new tags");
	},
	setKey: function() {
		var newPrefix = prompt("In order to sync tags and new torrents between computers, all of your computers must share the same key.\nIf two different users use the same key, THEY WILL OVERWRITE EACH OTHER.\nSo dont make your key 'tits', because some other asshat might have that already. \nEnter your private unique case sensitive key now.");
		if (newPrefix !== "" && newPrefix !== null) {
			wbts.setItemLocal("userPrefix", newPrefix);
			window.location.reload();
		}
	},
	setItem: function(key, val, callback) {
		if (callback == null) {
			callback = function() {}
		}
		key = wbts.makeKey(key);
		//save it locally too.. ynot
		wbts.setItemLocal(key, val);

		GM_xmlhttpRequest({
			method: "POST",
			url: "http://api.openkeyval.org/",
			data: encodeURIComponent(key) + "=" + encodeURIComponent(val),
			headers: {
			"Content-Type": "application/x-www-form-urlencoded"
			},
			onerror: function() {
				console.log("Error saving: " + key );
				callback( {status: "error"} );
			},
			onload: function(response) {
				callback( {status: "success", data: response} );
			}
		});
	},
	getItem: function(key, defaultVal, callback) {
		if (callback == null) {
			callback = function() {}
		}
		key = wbts.makeKey(key);

		GM_xmlhttpRequest({
			method: "GET",
			url: "http://api.openkeyval.org/" + encodeURIComponent(key),
			onerror: function() {
				callback( {status: "error", data: null} )
			},
			onload: function(response) {
				var result = response.responseText;

			  	if (result == null || result == "" ) {
			  		data = defaultVal;
			  	}
			    callback( result );
			}
		});
	},
	deleteItem: function(key) {
		key = wbts.makeKey(key);
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://api.openkeyval.org/",
			data: encodeURIComponent(key) + "=",
			headers: {
			"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				
			}
		});
	},
	setItemLocal: function(key, val) {
		wbts.deleteItemLocal(key);
		localStorage.setItem(key, val);
	},
	getItemLocal: function(key, defaultVal) {
		//key = wbts.makeKey(key);
		if (localStorage.getItem(key) === null) {
			return defaultVal;
		} else {
			return localStorage.getItem(key);
		}
	},
	deleteItemLocal: function(key) {
		try {
			localStorage.removeItem(key);
		} catch(e) {}
	},
	message: function(s) {
		var $ = unsafeWindow.jQuery;
		if ( $("#tags").size() > 0 ) {
			var info = $('<div style="display: none; background: green;font-size: 100%; margin-top: 10px" class="menubox"><p class="title">' + s + '</p></div>');
			$("#tags").append( info );
			$(info).fadeIn("slow").delay(3000).fadeOut("slow");
		}
	},
	makeKey: function(key) {
		return wbts.PREFIX + wbts.userPrefix + "_" + key;
	},
   	fromEpoch: function(ts){
        return new Date(ts*1000);
	},
   	toEpoch: function(d){
        return (d.getTime()-d.getMilliseconds())/1000;
	},

	checkforScriptUpdate: function() {
		var $ = unsafeWindow.jQuery;
		var sversion = wbts.version;
		var scriptid = "140174";
		var yql = 'http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20%20html%20where%20url%20=%20%27http%3A%2F%2Fuserscripts.org%2Fscripts%2Fshow%2F' + scriptid + '%27%20and%20xpath=%27//div[@id=%22full_description%22]/div[1]/p[1]%27&format=xml&callback=?';
		
		$.getJSON(yql,{},function(data) {
			// Handle response here
			data = data.results[0].replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').toString();
			data = $("" + data).text();

			if (data != sversion && data != "") {
				if ( confirm("There is an updated version (" + data + ") of the sync script. Go there now?") ) {
					window.location.href = "http://userscripts.org/scripts/show/" + scriptid;
				} else {
					if ( confirm("Press OK to disable update checking permanently") ) {
						wbts.setItemLocal("checkTagSyncUpdates", 0);
					}
				}
			}
		});
	}

}

setTimeout(function() { 
	wbts.init();
}, 250 );