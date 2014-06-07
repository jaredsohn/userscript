// ==UserScript==
// @name           Hype Machine Playlists
// @namespace      mattymc99@gmail.com
// @description    Adds playlists to The Hype Machine
// @include        http://hypem.com/*
// ==/UserScript==

var debug = false;

/*
 * Images
 */

 var imgPlay = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAEBAQEdHR0tLS1BQUF1dXWVlZXR0dIWFhY6OjpSUlJeXmJqZlJqbm6Shm6CgoKWmp6yorqysq6+vr7KysbS0tLe3t7q5uby8vL+/wMPDw8XGxsjIyMvLy87NzdDQ0NPT09fX1tra2t7e3uHh4ePj4+bm5ufn5+jo6Onp6ezr6+7t7e/v7/Hx8fPz8/b19vf39/n5+fz8/P7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALMF+nAAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS41SYr84AAABANJREFUGBkFwdtuFAcSANBT1d0z4ysXGUxghbQiCcrl/38kmIdERIp2EbbRGmM8HpuZrtpzogEAAAAAACMAgJ/ubx8aVg7nwz8BAKIBgNNvDQDi0dMzABANAE83IESjgdWrdwCIBuDNeRFimA0lmaMaHp0DEA3gZI2hp+lgytDf66HuVbe2vAYQDXj7aUsspqMn2aGyo5LbzfWutOU1QDTw9j9NDo9PK0uCDlR9uZq7LV+dAdHgp/8SOZ0eVTYCgO77j7tq8e8zEA2//lMij37IzkroTgDuPtau5RpEw+EsxoN/dagsqSIAKjvWFw+lH51Dwg+zGA9fdpSU0Z1RAIGD18tR3PwMCdfE9DLhooioSoDoqM6DGvkMiRNyeBWlsi7fXzQRALSM9Xwwj/HwGiPWIp5Oksrui88nz1MHoLNy3gyxepD/Q/KSGJ9mtc4S6vL9JwAI36pzZTC9JrkRjrKT7NSoz+8u0JSo2DyEyFWlNem3mTiOAAB1+cdFRcmS81oOPSy1+Xfpjpz2CwCgL87Os2TP1zXoNI4ddSetyT0JAqDRl398LrGuYY5B5JRiY3Qnaq8SAB0dtKjzy5P9bdaoUk+bHLZGFdEH0SFAh0AHLepTHj5JHcRItBFhCkCLRrSGnnv+uj54nB2MiN/zZ9GZBQgdQQM9N3ZfLwVSJeMUQmUHKBqgu1u05bNl62hJGM8OQqVoAg10d4eOtjzZn1sPlV1jVo8kKkOr3lZDB9HB8vlCCdGhkWejxazuV+bdbm4aBITli0mLQEfPItJotc5ar7YbhEZooi1PFyVbd3Zn5TanGIxWm8j7eYNoIeholqdjZE3bMHRlzjl8N+RkdHDN5tsQEALROb1YZnVMPeqKcd4N8X07hD3Rnu18f/yIDvwpKqfT/TYPKjta6FRxe7U/+Wjk+CqH9eFUSSeWL/abGBkEsiPmwU1OsWTkw7MetrePY9jFuIvF8+OdqLEAaY7OoW93e0OvGHH8dehv+8vd2DW+3o+ZyA5ADUMP1f01Fz2dEY3nsXuYXvWgepwjoBKAjsrzu+Mx/kHCYY+r7ZeBHOZMTSUAqfN6PU0miIZX23zYPn0cHVFSZRRA9LyYby4XRzl8gBE8uu49V+Nh6rE6hqoEqNF89WU6ylyBaPD2W8dme3wSQ4mWCiC6Pm2mw8nfQDTwZhPxcDc9eTIPVLbOSvNQdXu1Wx5F/A2IBvyy3uV2Y3iyvwBRYR7nq5tdH6/SB4BogF/u5uyH79tp/2CxjG5D3dxttrm/GuRfAKIBeLNrsbubzdOC2G0rc3kQLN8DEA2AX++LqHmetxhMe0Eu3wFANADw4xwdCB2QfwEAogEAftuaIRimdwAAogEAAAAAAP8HzEkktJ5MDpsAAAAASUVORK5CYII%3D" style="width:20px;height:20px;vertical-align:middle;">';
 
/*
 * Common Stuff
 */

function KillSession() {
	unsafeWindow.SetCookie('playlist', '');
	GM_setValue('session', '');
}
 
unsafeWindow.SetCookie = function(name, value) {
	var expire = '';
    return (document.cookie = escape(name) + '=' + escape(value || '') + expire);
}

unsafeWindow.GetCookie = function(name, defValue) {
    var cookie = document.cookie.match(new RegExp('(^|;)\\s*' + escape(name) + '=([^;\\s]*)'));
    return (cookie ? unescape(cookie[2]) : defValue);
}

unsafeWindow.toJSON = function (obj) {
	var t = typeof (obj);
	if (t != "object" || obj === null) {
		// simple data type
		if (t == "string") obj = '"'+obj+'"';
		return String(obj);
	}
	else {
		// recurse array or object
		var n, v, json = [], arr = (obj && obj.constructor == Array);
		for (n in obj) {
			v = obj[n]; t = typeof(v);

			if (t == "string") v = '"'+v+'"';
			else if (t == "object" && v !== null) v = JSON.stringify(v);

			json.push((arr ? "" : '"' + n + '":') + String(v));
		}
		return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
}

unsafeWindow.fromJSON = function (str) {
	if (str === "") str = '""';
	eval("var p=" + str + ";");
	return p;
}

unsafeWindow.get_unix_time = function() {
	var date_obj = new Date(); // Generic JS date object
	return parseInt(date_obj.getTime() / 1000); // Returns milliseconds since the epoch
}

unsafeWindow.trim = function(str) {
	return str.replace(/^\s*|\s*$/g, "");
}

unsafeWindow.startsWith = function(str, str2) {
	return (str.match("^"+str2)==str2)
}

unsafeWindow.positionPlaylistPopup = function() {
	if (unsafeWindow.$('playlistPopup'))
	{
		var obj = document.getElementById("playlistPopup");
		var objh = parseFloat(obj.style.height)/2;
		var objw = parseFloat(obj.style.width)/2;
		obj.style.top = Math.floor(Math.round((window.innerHeight/4)+window.pageYOffset)-objh)+'px';
		obj.style.left = Math.floor(Math.round((window.innerWidth/2)+window.pageXOffset)-objw)+'px';
	}
}

/*
 * Changed HypeM Methods
 */

 //OH HAI HypeM peepz! Why didn't you use activeList here! Makes it harder to play with :(

 unsafeWindow._set_track_bg = unsafeWindow.set_track_bg;
 unsafeWindow.set_track_bg = function (fileid, color) {
	GM_log('set_track_bg - IN (' + unsafeWindow.activeList + '/' + fileid +')');
	
	if (!unsafeWindow.startsWith(unsafeWindow.activeList, 'playlist-')) {
		unsafeWindow._set_track_bg(fileid, color);
		return;
	}
	
	if (unsafeWindow.activeList == 'playlist-0') {
		for(var i=0;i<session.playlists[0].tracks.length;i++)
		{
			var curId = session.playlists[0].tracks[i].id;
			if (curId == fileid) {
				GM_log(' - found ' + session.playlists[0].tracks[i].name);
				unsafeWindow.$('track_' + curId).className = unsafeWindow.$('track_' + curId).className + ' active-playing-green';
			} else {
				unsafeWindow.$('track_' + curId).className = unsafeWindow.$('track_' + curId).className.replace(/active\-playing\-green/g,'');
			}
		}
	}
}

unsafeWindow._setup_player_bar = unsafeWindow.setup_player_bar;
unsafeWindow.setup_player_bar = function (isPlaylistPage) {
	//I need a place to switch the activeList back to "document.location.href".
	//This method is called every time there is new content so I will add another parameter to show its me calling
	if (!isPlaylistPage) {
		//Should I clean the memory for the current array first??
		unsafeWindow.activeList = document.location.href;
	}

	if (!unsafeWindow.startsWith(unsafeWindow.activeList, 'playlist-'))
	{
		unsafeWindow._setup_player_bar();
		return;
	}
	
	var playableCount = 0;
	if (typeof(unsafeWindow.trackList[unsafeWindow.activeList]) != 'undefined') {
		for (var i = 0; typeof(unsafeWindow.trackList[unsafeWindow.activeList][i]) != 'undefined'; i++) {
			if (unsafeWindow.trackList[unsafeWindow.activeList][i].type != "") { unsafeWindow.playableCount++;}
		}
	}
	
	unsafeWindow.debug("Detected " + unsafeWindow.playableCount + " tracks on this page: " + unsafeWindow.activeList);
	
	if (unsafeWindow.playerStatus!="PLAYING") { 
		if (unsafeWindow.trackList[unsafeWindow.activeList] === undefined || unsafeWindow.trackList[unsafeWindow.activeList].length === 0 || unsafeWindow.playableCount==0) {
			if ( unsafeWindow.$('player') ) { unsafeWindow.$('player').style.visibility = "hidden"; }
			unsafeWindow.hide_player_bar();
			return false;
		} else if (unsafeWindow.$('player-container').style.height=="0px") {
			unsafeWindow.show_player_bar();
		}
		
		if ( unsafeWindow.trackList[unsafeWindow.activeList][0].type != "") {
			unsafeWindow.currentTrack = 0;			
		} else {
			for (var i = 0; unsafeWindow.trackList[unsafeWindow.activeList].length > i; i++) {
				if (unsafeWindow.trackList[unsafeWindow.activeList][i].type != "") { unsafeWindow.currentTrack = i; break; }
			}
		}
	
		unsafeWindow.set_now_playing_info(unsafeWindow.currentTrack);
		document.title = unsafeWindow.trackList[unsafeWindow.activeList].title;

		if (unsafeWindow.trackList[unsafeWindow.activeList][unsafeWindow.currentTrack].type=="imeem") {
			if (unsafeWindow.playerDisplayed=="normal") {
				unsafeWindow.initImeem(true);			
			} else {
				unsafeWindow.playerStatus = "STOP_ON_LOAD"; // this is to prevent the player from playing onload if it's the first track
				try { unsafeWindow.thisMovie('imeemPlayer').load(unsafeWindow.trackList[unsafeWindow.activeList][unsafeWindow.currentTrack].imeem_id); }
				catch(err) { unsafeWindow.debug('failed to execute imeemPlayer.load in setupPlayerBar'); }
			}
		}
		unsafeWindow.$('player-page').style.visibility = "hidden";		
	} else if (unsafeWindow.playerStatus=="PLAYING") {
		unsafeWindow.set_track_bg(unsafeWindow.trackList[unsafeWindow.activeList][unsafeWindow.currentTrack].id,"green");
		if ( unsafeWindow.$('play_track_' + unsafeWindow.currentTrack ) ) {	$('play_track_' + unsafeWindow.currentTrack ).className="pause"; }
		if ( unsafeWindow.$('player') ) { unsafeWindow.$('player-main-button' ).className="pause"; }
		unsafeWindow.$('player-page').style.visibility = "hidden"; // now we are again in sync with page
	}
	
	//unsafeWindow.$('player-page').style.visibility = "visible";
}

unsafeWindow._togglePlay = unsafeWindow.togglePlay;  
unsafeWindow.togglePlay = function (id) {
	GM_log('togglePlay - IN (activeList: ' + unsafeWindow.activeList + ')');
	
	if (!unsafeWindow.startsWith(unsafeWindow.activeList, 'playlist-'))
	{
		unsafeWindow._togglePlay(id);
		return;
	}
	
	//get instance so I dont need to call this longster so much
	GM_log(' - activeList: ' + unsafeWindow.activeList + ' - currentTrack: ' + unsafeWindow.currentTrack);
	var curTrackObj = unsafeWindow.trackList[unsafeWindow.activeList][unsafeWindow.currentTrack];
	
	if (curTrackObj != null &&
		(id == unsafeWindow.currentTrack || typeof(id)=='undefined') && // this is for spy page
		(curTrackObj.id == unsafeWindow.activeItem.id || typeof(id)=='undefined') &&  // either you clicked play on the same trk as is playing OR you clicked the big button
		typeof(unsafeWindow.currentTrack) != 'undefined' && // we are playing something, or trk is selected
		unsafeWindow.playerStatus != "" &&  // either playing or paused, not just-loaded
		unsafeWindow.activeList==document.location.href && // we are looking at the pg with the songs
		(unsafeWindow.playerStatus == "PAUSED" || unsafeWindow.playerStatus == "PLAYING")) 
	{ 
		if (unsafeWindow.playerStatus == "PAUSED") { //toggle pause->play
			if ( unsafeWindow.$('player-main-button') ) { unsafeWindow.$('player-main-button').className="pause"; }
			if (curTrackObj.type=="normal") {
				unsafeWindow.update_current_play_ctrl("pause");
				unsafeWindow.sendEvent('PLAY', true);
			} else if (curTrackObj.type=="imeem") {
				unsafeWindow.update_current_play_ctrl("pause");
				try { unsafeWindow.thisMovie('imeemPlayer').resumeTrack(); unsafeWindow.playerStatus = "PLAYING"; }
				catch(err) { unsafeWindow.debug('failed to execute imeemPlayer.resumeTrack in togglePlay'); }; 
			}
		} 
		else if (unsafeWindow.playerStatus == "PLAYING") // play -> pause
		{ 
			if ( unsafeWindow.$('player-main-button') ) { unsafeWindow.$('player-main-button').className=""; }
			if (curTrackObj.type=="normal") {
				unsafeWindow.update_current_play_ctrl("play");
				unsafeWindow.sendEvent('PLAY', false);
			} else if (curTrackObj.type=="imeem") {
				unsafeWindow.update_current_play_ctrl("play");
				try { unsafeWindow.thisMovie('imeemPlayer').pauseTrack(); unsafeWindow.playerStatus = "PAUSED"; }
				catch(err) { unsafeWindow.debug('failed to execute imeemPlayer.pauseTrack in togglePlay'); }; 
			}
		}
	} else { // a new item is played
		unsafeWindow.stopTrack();
		unsafeWindow.clearInterval(unsafeWindow.radio_notificationTimeout);
		unsafeWindow.radio_notificationTimeout=0;
		
		if (typeof(id) == 'undefined') { id = 0; }
		unsafeWindow.currentTrack = id;
		unsafeWindow.playback_manual = 1;
		
		//Why is not setting without this call?
		if (unsafeWindow.trackList[unsafeWindow.activeList][id]) {
			unsafeWindow.set_track_bg(unsafeWindow.trackList[unsafeWindow.activeList][id].id, 'green');
		} else {
			GM_log('Error playing track');
		}
		
		unsafeWindow.playTrack(1);
	}
	return false;
}

/*
 * Objects
 */
 
//Master Playlist list
var session;

function addTrack(playlistIndex, data) {
	GM_log('addTrack - IN');
	var track = newTrack(data);
	if (track == null || track == 'undefined') {
		alert('Error adding track to playlist');
	} else {
		this.playlists[playlistIndex].tracks[this.playlists[playlistIndex].tracks.length] = track;
	}
}
function newSession() {
	this.version = 1;
	this.playlists = new Array();
	this.addTrack = addTrack;
}
unsafeWindow.SaveSession = function() {
	if (false) { //CHECK VERSION
		//Get latest version before saving!!!
	}

	session.version = session.version+1;
	GM_setValue('session', unsafeWindow.toJSON(session));
	GM_log('Saving Session (version: ' + session.version + ')');
	
	unsafeWindow.SetCookie('session', unsafeWindow.toJSON(session));
}
function LoadCachedSession(){
	GM_log('LoadCachedSession - IN'); 
	var cookieObj = null;
	var cookieStr = unsafeWindow.GetCookie('session', '');
	if (cookieStr.length > 0) {
		cookieObj= unsafeWindow.fromJSON(cookieStr);
	}
	
	var gmObj = null;
	var gmStr = GM_getValue('session', '');
	if (gmStr.length > 0) {
		gmObj = unsafeWindow.fromJSON(gmStr);
	}
	
	GM_log('Cookie found? ' + (cookieObj == null ? 'false' : 'true (' + cookieObj.version + ')') + 
		'\r\nGM Obj found? ' + (gmObj == null ? 'false' : 'true (' + gmObj.version + ')')
	);
	
	if (cookieObj == null && gmObj == null) {
		session = new newSession();
	} else if (cookieObj == null && gmObj != null) {
		session = gmObj;
	} else if (gmObj == null && cookieObj != null) {
		session = cookieObj;
	} else if (cookieObj.version > gmObj.version) {
		session = cookieObj;
	} else if (gmObj.version > cookieObj.version) {
		session = gmObj;
	} else {
		session = gmObj;
	}
	
	//hack - make sure the session always has the addTrack method
	session.addTrack = addTrack;
	
	GM_setValue('session', unsafeWindow.toJSON(session));
}

//Playlist object

function newPlaylist(name) {
	 this.name = name;
	 this.tracks = new Array();
}
 
unsafeWindow.RemovePlaylist = function(index) { 
	if (confirm('Are you sure you want to delete "' + session.playlists[index].name + '"?')) {
		session.playlists.splice(index, 1);
		unsafeWindow.SaveSession();
		unsafeWindow.RefreshPlaylistTable();
	}
}

//Randomize the playlist with fisherYates shuffle
unsafeWindow.ShufflePlaylist = function  (index) {
	var myArray = session.playlists[index].tracks;
	var i = myArray.length;
	if ( i == 0 ) return false;
	while ( --i ) {
		var j = Math.floor( Math.random() * ( i + 1 ) );
		var tempi = myArray[i];
		var tempj = myArray[j];
		myArray[i] = tempj;
		myArray[j] = tempi;
	}
	session.playlists[index].tracks = myArray;
	
	unsafeWindow.SaveSession();
	unsafeWindow.loadPlaylist(index);
}
 
 //Playlist track
function newTrack(data){
	 GM_log('newTrack - IN');
	 
	 var track = {}; //id,key,postid,type,artist,song,time,imeem,fav
	 track.data = data;
	 
	 track.id = data.id;
	 track.artist = data.artist;
	 track.title = data.song;
	 
	 track.blogLink = '/go/track/' + track.id;
	 track.name = track.artist + ' - ' + track.title;
	 track.link = '/track/' + track.data.id;
	 track.img = "http://static.hypem.com/post_thumbs/" + track.data.postid + "_1024.jpg"
	 track.createdOn = new Date();
	 track.savedOn = new Date();
	 
	 return track;
}
 
unsafeWindow.RemoveTrack = function(pIndex, tIndex) { 
	if (confirm('Are you sure you want to delete "' + session.playlists[pIndex].tracks[tIndex].name + '"?')) {
		session.playlists[pIndex].tracks.splice(tIndex, 1);
		unsafeWindow.SaveSession();
		unsafeWindow.loadPlaylist(pIndex);
	}
}
 
 /*
 * Init Methods
 */
function InitPlaylist() {
	unsafeWindow.Event.observe(window, 'scroll', unsafeWindow.positionPlaylistPopup );
	
	//KillSession(); //temp
	unsafeWindow.Element.insert(unsafeWindow.$('menu-item-zeitgeist'), '<li id="menu-item-playlists"><a href="javascript:void()" onclick="showPlaylistSection();return false;" title="Hype Machine Playlists">playlists</a></li>');
	
	//temp
	LoadCachedSession();
	if (session.playlists.length == 0)
	{
		unsafeWindow.CreatePlayList();
		alert('Created ' + session.playlists[0].name + ' playlist!');
	}
	//temp
	
	GM_log('Loaded ' + session.playlists[0].name + ' playlist! (Session: ' + unsafeWindow.toJSON(session) + ')');
}
 
 /*
  * Methods
  */

function GeneratePlaylistLinks() {
	var TrackList = unsafeWindow.trackList[document.location.href];
	if (TrackList == undefined || TrackList.length < 1) {
		unsafeWindow.setTimeout(GeneratePlaylistLinks, 1000);
	} else {
		if (unsafeWindow.$$('.playlistLink').length < 1) {
			var index = 0;
			var tracks = unsafeWindow.$$('div.section-track ');
			
			//TODO Fix the selectors for the Twitter page
			tracks.each(function(element, index) {
				if (TrackList[index].key) {
					unsafeWindow.Element.insert(element.getElementsByClassName('act-info-loading')[0], {after: "<div class='meta'><span class='buy' style='border-bottom:none;padding-bottom:0;'>Extra Options: <a class='playlistLink' href='javascript:void()' onclick='showAddToPlaylist(" + index + ");return false;'>&lt;Ratings here&gt; | Add to Playlist</a> | <span class='in-playlists'>Playlists: " + unsafeWindow.GetTrackPlaylists(TrackList[index].id) + "</span></span></div>"});
				}
				index++;
			});
		}
	}
}

unsafeWindow.UpdateHypeMPlaylistObj = function(index) {
	GM_log('Setting HypeM Playlist to: ' + session.playlists[index].name + ' (' + index + ')');
	if (unsafeWindow.activeList!='playlist-' + index) { 
		unsafeWindow.trackList[unsafeWindow.activeList] = Array(); // free memory, yay!
		unsafeWindow.clearInterval(unsafeWindow.radio_notificationTimeout);
		unsafeWindow.radio_notificationTimeout=0;
	}
	
	unsafeWindow.activeList = 'playlist-' + index;
	unsafeWindow.currentTrack = 0;
	unsafeWindow.trackList[unsafeWindow.activeList]=new Array();
	unsafeWindow.trackList[unsafeWindow.activeList]['title'] = "Hype Machine Playlists: Your songs your way / The Hype Machine";
	unsafeWindow.trackList[unsafeWindow.activeList]['url'] = unsafeWindow.activeList;
	
	//check array
	var success = true;
	for(var i=0;i<session.playlists[index].tracks.length;i++)
	{
		if (session.playlists[index].tracks[i] == null || session.playlists[index].tracks[i] == 'undefined') {
			success = false;
		}
	}
	
	if (!success) {
		alert('Playlist Error!!');
	} else {
		for(var i=0;i<session.playlists[index].tracks.length;i++) {
			unsafeWindow.trackList[unsafeWindow.activeList][i] = session.playlists[index].tracks[i].data;
		}
	}
	
	GM_log('activeList set to ' + unsafeWindow.activeList);
}

unsafeWindow.showPlaylistSection = function(data) {
	GM_log('show playlist section start');
	
	unsafeWindow.loadPlaylist(0);
}

unsafeWindow.CreatePlayList = function(msg) {
	if (msg == null || msg == 'undefined') {
		msg = 'What do you want to call this playlist?';
	}
	
	var name = prompt(msg);
	if (name == null || name == 'undefined' || name == '') {
		return;
	}
	
	session.playlists[session.playlists.length] = new newPlaylist(name);
	unsafeWindow.RefreshPlaylistTable();
}

unsafeWindow.loadPlaylist = function(index) {
	GM_log('loadPlaylist - IN');
	
	unsafeWindow.$('player-loading').style.top = '-20px';
	unsafeWindow.$('player-loading').style.visibility="visible";
	
	url = '/';
	var start_pos = 1500;
	var end_pos = -1500;
	
	GM_log(' - Check content holder');
	if (! unsafeWindow.$('content-wrapper2')) { 
		var new_content_wrapper = new unsafeWindow.Element('div', { id: 'content-wrapper2', style: 'left:' + start_pos + 'px; display:none; position:relative; top:0; min-height: 0px;' });
		unsafeWindow.$('content-wrapper').parentNode.insertBefore(new_content_wrapper, unsafeWindow.$('content-wrapper'));
	}

	GM_log(' - Load new content');	
	
	unsafeWindow.set_nav_item_active('menu-item-playlist');
	if (unsafeWindow.playerStatus!="PLAYING") { document.title = "Hype Machine Playlists: Your songs your way / The Hype Machine"; }
	
	unsafeWindow.UpdateHypeMPlaylistObj(index);
		
	//head
	var content = '<div id="message" style="height:40px;"><p><a id="player" href="" onclick="togglePlay();return false;">Play<span id="player-main-button"></span></a>Hype Machine Playlists<br /><span>Personal playlists based on Hype Machine playlists.&nbsp;<a href="http://mattymc99.wordpress.com/">Learn more »</a></span></p><span><a href="javascript:void(0);" onclick="CreatePlayList();return false;">Create new playlist</a></span></div><div id="container"><div id="content-left"><div id="recently-posted"><div id="playlist-table" style="padding:0px 0 10px 0;"></div><h2><strong>Hype Machine Playlists:</strong> ' + session.playlists[index].name + ' (' + session.playlists[index].tracks.length + ' tracks)</h2><div id="track-notification" style="display: none;"></div>';
	
	for(var i=0;i<session.playlists[index].tracks.length;i++)
	{	
		var alternateClass = i%2 ? 'section-even' : 'section-odd';
		var id = session.playlists[index].tracks[i].id;
		var artist = session.playlists[index].tracks[i].artist;
		var artist_url = session.playlists[index].tracks[i].artist.toLowerCase().replace(' ', '_');
		var title = session.playlists[index].tracks[i].title;
		var link = session.playlists[index].tracks[i].link;
		var blogLink = 'go/track/' + session.playlists[index].tracks[i].id;
		var rowColor = i%2 ? '#FFFFFF' : '#F4F4F4';
				
		content += '<div id="track_' + id + '" style="padding-top:10px;height:30px;vertical-align:middle;background-color:' + rowColor + '">' + (i+1) + '. <a id="play_ctrl_' + id + '" onclick="togglePlay(\'' + i + '\');return false;" title="Play this!" href="javascript:void(0);">' + imgPlay + '</a>&nbsp;<a title="' + artist + ' - search hype machine for this artist" href="http://hypem.com/artist/' + artist_url + '">' + artist + '</a> - <a title="' + title + ' - go to page for this track" href="' + link + '">' + title + '</a> [<a onclick="RemoveTrack(\'' + index + '\', \'' + i + '\');return false;" title="Remove this!" href="javascript:void(0);">remove</a>] [<a href="javascript:void()" onclick="showAddToPlaylist(' + i + ');return false;">add to playlist</a>] [<a href="' + blogLink + '" target="_blank">blog post</a>]</div>'
	}
	
	//foot
	content += '</div></div><!-- oh look you are reading comments. well, we love you.  (I love you too HypeMers) --><div id="content-right"><div id="hypem-playlistnote" style="margin:0 0 20px;padding:5px 0 15px;clear:both;background:#FEF2EB;"><h3 style="text-transform:uppercase;background:transparent;margin:0 10px;color:#000;">Hype Machine Playlists!!</h3><iframe src="http://dl.dropbox.com/u/85710/hypem-playlists/descr.html" style="height:auto;"></iframe></div><div id="hypem-events"><a href="http://merch.hypem.com/"><span>The Hype Machine Store</span><br>Awesome new tees and sticker packs now in stock</a></div><!-- get-badge --><div id="get-badge"><a href="http://twitter.com/hypem"><span>Follow @hypem</span> for tweets of the hottest songs.</a><!-- get-badge --><hr class="brk"></div><div id="copyright"><h2>IMPORTANT</h2><p>Song listings that appear on this website are automatically gathered from music blogs all over the internet. We do this to let people discover new artists, fall in love, buy their CDs and go to their shows.</p><p>If you are an artist (or represent an artist) and are concerned about information in our listings, please see <a href="http://hypem.com/about#copyright">more information about our copyright policy</a> and feel free to  <a href="http://hypem.com/contact">contact us</a> directly.</p></div><br style="clear: both;" /></div><!-- container --></div>';
	
	unsafeWindow.$('content-wrapper2').update(content);
	unsafeWindow.RefreshPlaylistTable(index);
	
	e = new unsafeWindow.Effect.Move('content-wrapper', { x: end_pos, mode: 'relative', duration: 0.7, fps: '15' }); 
	unsafeWindow.$('player-loading').style.visibility="hidden";
			
	unsafeWindow.setup_player_bar(true);
	
	GM_log(' - Finish content thingers');	
	setTimeout(function() { 
		unsafeWindow.$('content-wrapper2').style.display="";
		e = new unsafeWindow.Effect.Move('content-wrapper2', { x: end_pos, mode: 'relative', duration: 0.5, fps: '15'});
		unsafeWindow.$('content-wrapper').remove();
		unsafeWindow.$('content-wrapper2').setAttribute('id', 'content-wrapper');
	}, 500);
	
	GM_log(' - Rewrite links');		
	unsafeWindow.rewrite_links();
	
	GM_log(' - done');
}

unsafeWindow.RefreshPlaylistTable = function(index) {
	if (unsafeWindow.$('playlist-table')) {
	
		var max=session.playlists.length;
		var pTable = '<table style="border:solid 1px black;width:640px;padding:2px;">';
		var colNum = 3;
		var colCur = 1;
		for(var i=0;i<max;i++)
		{
			var tdStyle = '';
			var tdLinkStyle = '';
			
			if (index == i) {
				tdStyle = ''; //'background-color:#85c441;border:solid 1px #000000;color:#FFFFFF;';
				tdLinkStyle = ''; //'color:#85c441;';
			}
			
			var playlistLink = '<a href="javascript:void(0);" onclick="loadPlaylist(' + i + ');return false;" style="font-size:13px;font-weight:bold;' + tdLinkStyle + '">' + session.playlists[i].name + ' (' + session.playlists[i].tracks.length + ')</a><br /><a style="font-size:9px;' + tdLinkStyle + '" href="javascript:void(0);">shuffle playlist</a> - <a style="font-size:9px;' + tdLinkStyle + '" href="javascript:void(0);">rename</a> - <a style="font-size:9px;' + tdLinkStyle + '" href="javascript:void(0);" onclick="RemovePlaylist(' + i + ');return false;">remove</a>';
			
			var row = '';
			var bgColor = (bgColor == '#F4F4F4' ? '#FFFFFF' : '#F4F4F4');
			
			if (colCur == 1) {
				row = '<tr style="background-color:' + bgColor + '">';
			} 
			
			row += '<td style="padding:5px;' + tdStyle + '">' + playlistLink + '</td>';
			
			if (colCur == colNum) {
				row += '</tr>';
				colCur = 1;
			} else if (i==max-1) {
				for(var n=0;n<(colNum-colCur);n++) {
					row += '<td>&nbsp;</td>';
				}
				row += '</tr>';
			} else {
				colCur++;
			}
			
			
			pTable += row;
		}
		pTable + '</table>';
		
		unsafeWindow.$('playlist-table').update(pTable);
	}
}

unsafeWindow.showAddToPlaylist = function(index) {
	var start_pos = 1500;
	var end_pos = -1500;
	
	if (unsafeWindow.$('playlistPopup')) unsafeWindow.$('playlistPopup').remove();
	var popup = new unsafeWindow.Element('div', { id: 'playlistPopup', style: 'left:' + start_pos + 'px; display:block; position:absolute; top:200px; left: 30%; width: 350px; height: 100px; background-color: #FFFFFF; border: solid 3px #000000; z-index: 500; text-align: left; padding: 10px;' });
	unsafeWindow.$('footer').parentNode.insertBefore(popup, unsafeWindow.$('footer'));
	
	var content = '<h3>Add song to playlist</h3><p>Which playlist?</p><select id="playlist-selector">'
	for(var i=0;i<session.playlists.length;i++)
	{
		content += '<option value="' + i + '">' + session.playlists[i].name + '</option>';
	}
	content += '</select> <a onclick="addToPlaylist(' + index + ');return false;" href="javascript:void(0);">[Add to Playlist]</a> - <a onclick="$(\'playlistPopup\').remove();return false;" href="javascript:void(0);" style="color:red;">[Cancel]</a>';
	unsafeWindow.$('playlistPopup').update(content);
	unsafeWindow.positionPlaylistPopup();
}

unsafeWindow.addToPlaylist = function(index) {
	var playlistIndex = unsafeWindow.$F('playlist-selector');
	
	var track;
	if (!unsafeWindow.startsWith(unsafeWindow.activeList, 'playlist-')) {
		track = unsafeWindow.trackList[window.location.href][index];
	} else {
		track = unsafeWindow.trackList[unsafeWindow.activeList][index];
	}
		
	session.addTrack(playlistIndex, track);
	unsafeWindow.$('playlistPopup').remove();
	
	unsafeWindow.SaveSession();
	
	if (unsafeWindow.activeList=='playlist-' + playlistIndex) { 
		unsafeWindow.loadPlaylist(playlistIndex);
	}
	
	//alert('"' + session.playlists[playlistIndex].tracks[session.playlists[playlistIndex].tracks.length-1].name + '" added to "' + session.playlists[playlistIndex].name + '"');
}

unsafeWindow.GetTrackPlaylists = function(trackId) {
	var playlists = '';
	for(var i=0;i<session.playlists.length;i++)
	{
		for(var n=0;n<session.playlists[i].tracks.length;n++)
		{
			if (session.playlists[i].tracks[n].id == trackId)
			{
				playlists += '<a href="javascript:void(loadPlaylist(' + i + '));">' + session.playlists[i].name + '</a> - ';
			}
		}
	}

	if (playlists.length < 1) {
		return 'None';
	} else {
		return playlists.substr(0, playlists.length-3);
	}
}

/* Code that could be used to update keys if they change (NOT NEEDED NOW)

unsafeWindow.updatePlaylist = function(index) {
	var interval = 2000;
	var i=0;
	for (var t in session.playlists[index].tracks)
	{
		setTimeout('updateTrack("' + session.playlists[index].tracks[t].link + '")', interval * i++);
	}
}

//Might no be needed? Does key ever change?
// Reminder: The Glitch Mob  -  The Glitch Mob vs. La Roux  http://hypem.com/serve/play/1186881/629d9f00146efe22c91bbfab47458ed0
// - Regardless there is a bug when you call this two times.
unsafeWindow.updateTrack = function(link) {
	GM_log('About to call');
	new unsafeWindow.Ajax.Request(link, { 
		parameters: 'ax=1&ts=' + unsafeWindow.get_unix_time(), 
		method: 'get',  
		onSuccess: function(response){
			GM_log('success');

			// !! make this a regex !!
			var curStr = response.responseText;
			while(curStr.indexOf('trackList[document.location.href].push') > 0)
			{
				//get data start
				var start = curStr.indexOf('trackList[document.location.href].push');
				
				//get id
				var curStr = curStr.substring(start);
				start = curStr.indexOf('id:\'') + 4;
				curStr = curStr.substring(start);
				var id = curStr.substring(0, curStr.indexOf("'"));  
				
				//get key
				curStr = curStr.substring(start);
				start = curStr.indexOf('key: \'') + 6;
				curStr = curStr.substring(start);
				var key = curStr.substring(0, curStr.indexOf("'"));  
				
				if (unsafeWindow)
					unsafeWindow.updateTrackKey(id, key);
				else
					updateTrackKey(id, key);
			}
			
		},
		asynchronous: false, 
		evalScripts: true 
	});
}

unsafeWindow.updateTrackKey = function(id, key) {
	for (var p in session.playlists)
	{
		for (var t in session.playlists[p].tracks)
		{
			var track = session.playlists[p].tracks[t];
			var id1 = new String(track.id);
			id1 = unsafeWindow.trim(id);
			var id2 = new String(id);
			id2 = unsafeWindow.trim(id2);
			
			if (id1 == id2)
			{
				GM_log('in update key');
				session.playlists[p].tracks[t].key = key;
				session.playlists[p].tracks[t].savedOn = new Date();
				if (debug) GM_log('Updating: ' + session.playlists[p].tracks[t].name + ' in playlist: ' + session.playlists[p].name);
			}
		}
	}
	unsafeWindow.SetCookie('playlist', unsafeWindow.toJSON(session));
}
*/

InitPlaylist();
GeneratePlaylistLinks();

// Display links after an Ajax update is complete
unsafeWindow.Ajax.Responders.register({
	onComplete: function(transport, response) {
		GeneratePlaylistLinks();
	}
})