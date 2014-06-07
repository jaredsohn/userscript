// ==UserScript==
// @name           mitx-player-goodies
// @namespace      thomasloch
// @version        0.12c
// @description    Add some extra features to the video player
// @include        https://6002x.mitx.mit.edu/courseware/*
// ==/UserScript==

/*

MITx Player Goodies
-------------------

Add some extra features to the video player:
- quality selector
- volume control
- Youtube link and "pop out" button
- retain volume setting across (some) video changes
- fix video changes when using firefox' flashblock addon
- Auto-play
- add keyboard shortcuts:
	Left arrow: Seek reverse
	Rigth arrow: Seek forward
	Up arrow: Volume up
	Down arrow: Volume down
	+ key: Next faster playback speed
	- key: Next slower playback speed
	M key: Toggle mute
	P key: Toggle play/pause
	Page Up: Previous item in lecture sequence
	Page Down: Next item in lecture sequence

*/


unsafeWindow.console.log('Player goodies loading...');


var volume_setting = -1;
var volume_restore = true;

var autoplay_commencing = false;
var autoplay_enabled = true;

function decorate_player(player, wrapper) {
	var cell, control, row;
	unsafeWindow.console.log('Adding decoration to player ' + player);

	// initialize variables
	volume_restore = true;
	autoplay_commencing = false;


	// create toolbar for extra controls
	var table = document.createElement("table");
	table.setAttribute('id', 'extracontrols');
	table.setAttribute('class', 'extracontrols');
	wrapper.appendChild(table);

	row = document.createElement("tr");
	table.appendChild(row);




	// add volume controls:
	cell = document.createElement("td");
	cell.appendChild(document.createTextNode('Volume:'));
	cell.appendChild(document.createElement('br'));

	control = document.createElement("input"); // Mute
	control.setAttribute('type', 'button');
	control.onclick = function() {
		var player = XPCNativeWrapper.unwrap( document.getElementById('myytplayer') );
		if(player.isMuted()) player.unMute(); else player.mute();
	};
	control.value = 'Mute';
	cell.appendChild(control);

	control = document.createElement("input"); // Vol down
	control.setAttribute('type', 'button');
	control.onclick = function() {
		var player = XPCNativeWrapper.unwrap( document.getElementById('myytplayer') );
		player.setVolume(player.getVolume() - 10);
	};
	control.value = 'V--';
	cell.appendChild(control);

	control = document.createElement("input"); // Vol display
	control.setAttribute('type', 'button');
	control.setAttribute('id', 'volumelabel');
//	control.setAttribute('style', 'margin-left: 10px; margin-right: 10px;');
	control.onclick = function() {
		var player = XPCNativeWrapper.unwrap( document.getElementById('myytplayer') );
		if(player.isMuted()) player.unMute(); else player.mute();
	};
	if(volume_setting != -1) {
		control.value = '' + volume_setting + "%";
	} else {
		control.value = '---';
	}
	cell.appendChild(control);

	control = document.createElement("input"); // Vol up
	control.setAttribute('type', 'button');
	control.onclick = function() {
		var player = XPCNativeWrapper.unwrap( document.getElementById('myytplayer') );
		player.setVolume(player.getVolume() + 10);
	};
	control.value = 'V++';
	cell.appendChild(control);

	row.appendChild(cell);


	// add quality controls:
	cell = document.createElement("td");
	cell.appendChild(document.createTextNode('Quality:'));
	cell.appendChild(document.createElement('br'));

	control = document.createElement("select");
	control.setAttribute('id', 'qualityselect');
	control.setAttribute('keystr', '');
	control.onclick = function() {
		var player = XPCNativeWrapper.unwrap( document.getElementById('myytplayer') );
		var c = document.getElementById("qualityselect");
		player.setPlaybackQuality(c.options[c.selectedIndex].value);
	};

	cell.appendChild(control);

	row.appendChild(cell);


	// add autoplay control:
	cell = document.createElement("td");
	//cell.appendChild(document.createTextNode('Autoplay:'));
	cell.appendChild(document.createElement('br'));

	control = document.createElement("input");
	control.setAttribute('type', 'button');
	control.setAttribute('id', 'aplabel');
	control.onclick = function() {
		var c = document.getElementById("aplabel");
		autoplay_enabled = !autoplay_enabled;
		c.style.textDecoration = autoplay_enabled ? 'none' : 'line-through';
	};
	control.style.textDecoration = autoplay_enabled ? 'none' : 'line-through';
	control.value = 'Autoplay';
	cell.appendChild(control);

	row.appendChild(cell);


	// add youtube link and pop-out button:
	cell = document.createElement("td");

	// Do this with a plain link so the browser's "open in new window/tab/whatever" functions work properly
	control = document.createElement("a");
	control.setAttribute('href', '#');
	control.setAttribute('id', 'youtubelink');
	control.innerHTML = '---';
	cell.appendChild(control);

	cell.appendChild(document.createElement('br'));

	control = document.createElement("input");
	control.setAttribute('type', 'button');
	control.onclick = function() {
		var player = XPCNativeWrapper.unwrap( document.getElementById('myytplayer') );
		var vid = player.getVideoUrl().match("v=[^&]*")[0].substring(2);
		player.pauseVideo();
		//https://www.youtube.com/embed/eX6HhcKJUUM?html5=1&autoplay=1
		window.open("https://www.youtube.com/embed/" + vid +"?html5=1&autoplay=1&start=" + player.getCurrentTime(),
			"mitx-popoutvideo", "width=550,height=450,resizable=yes").focus();
	};
	control.value = 'Pop out';
	cell.appendChild(control);

	row.appendChild(cell);



	row = document.createElement("tr");
	table.appendChild(row);

	// add shortcut legend:
	cell = document.createElement("td");
	cell.setAttribute('colspan', '4');
	cell.setAttribute('class', 'keybshortcuts');
	cell.setAttribute('style', 'font-size: 80%; font-style: italic; text-align: center;');
	cell.innerHTML = 'Keyboard shortcuts: ' + 
		'<span><b>&#x2190;</b> Seek rev</span> ' +
		'<span><b>&#x2192;</b> Seek fwd</span> ' +
		'<span><b>&#x2191;</b> Vol up</span> ' +
		'<span><b>&#x2193;</b> Vol dn</span> ' +
		'<span><b>+</b> Faster</span> ' +
		'<span><b>-</b> Slower</span> ' +
		'<span><b>P</b> Play/Pause</span> ' +
		'<span><b>M</b> Mute</span> ' +
		'<span><b>PgUp</b> Prev Item</span> ' +
		'<span><b>PgDn</b> Next Item</span> ' +
	'';
	row.appendChild(cell);


	unsafeWindow.console.log('done.');
}


function update_controls(player) {
	var c, d;
	var i;
	//unsafeWindow.console.log('Updating controls: ' + player);


	// restore volume
	if(volume_restore && (volume_setting != -1) ) {
		unsafeWindow.console.log('Restoring volume setting');
		player.setVolume(volume_setting);
		volume_restore = false;
	}

	// update volume
	c = document.getElementById('volumelabel');
	volume_setting = player.getVolume();
	c.value = '' + volume_setting + '%';
	c.style.textDecoration = player.isMuted() ? 'line-through' : 'none';

	// update quality
	c = document.getElementById('qualityselect');
	var ql = player.getAvailableQualityLevels();

	// create key string to keep
	var keystr = '';
//	for each(var q in ql) {
	for(var q, j = 0; (q = ql[j]) != null; j++) {
		keystr = keystr + q + ',';
	}

	var currentkeystr = c.getAttribute('keystr');
	if(currentkeystr != keystr) {
		// list of available quality values has changed!
		c.setAttribute('keystr', keystr);
		c.innerHTML = '';
		var currentq = player.getPlaybackQuality();

		// update list, select current quality setting
//		for each(var q in ql) {
		for(var q, j = 0; (q = ql[j]) != null; j++) {
			var qo = document.createElement("option");
			qo.setAttribute('value', q);
			if(currentq == q) qo.setAttribute('selected', 'selected');
			qo.innerHTML = q;
			c.appendChild(qo);
		}
	}

	// insert link if it has changed
	c = document.getElementById('youtubelink');
	var link = player.getVideoUrl();
	if(c.getAttribute('href') != link) {
		c.setAttribute('href', link.replace('&feature=player_embedded', '') );
		//c.innerHTML = 'Watch video<br />directly on youtube';
		c.innerHTML = 'Youtube link';
	}

	// check autoplay
	if(autoplay_enabled && (!autoplay_commencing)) {
		unsafeWindow.console.log(
			'AP check... ' + player.getCurrentTime() + ' / ' + player.getDuration() +
			' (' + player.getPlayerState() + ')'
		);

		// disable auto-play if the video isn't loaded yet or is paused/buffering (or is very short!)
		if(player.getDuration() < 10) return;
		// unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5)

		// did we run out of video yet?
		//if(player.getCurrentTime() != player.getDuration()) return;
		if(player.getPlayerState() != 0) return;

		unsafeWindow.console.log('Autoplay continue!');

		// figure out which sequence item we are at right now
		var current_vid;
		var v = document.getElementsByTagName('a');
	//	for each(var e in v) {
		for(var e, j = 0; (e = v[j]) != null; j++) {
			if(e.getAttribute('class') && e.getAttribute('class') == 'seq_video_active') {
				current_vid = e;
				break;
			}
		}
		var current_id = parseInt(current_vid.id.replace(/^tt_/, ''));

		// click on next sequence item
		document.getElementById('tt_' + (current_id + 1)).click();
		autoplay_commencing = true;
	}

	//unsafeWindow.console.log('done.');
}


function keydown_handler(e) {
	var player = document.getElementById('myytplayer');
	if(player) player = XPCNativeWrapper.unwrap( document.getElementById('myytplayer') );

	var kc = e.keyCode;
	unsafeWindow.console.log("[KEY] " + kc);
	switch(kc) {
	case 37: // left
		player.seekTo(player.getCurrentTime() - 3, false);
		break;
	case 39: // right
		player.seekTo(player.getCurrentTime() + 3, false);
		break;

	case 38: // up
		player.setVolume(player.getVolume() + 10);
		break;
	case 40: // down
		player.setVolume(player.getVolume() - 10);
		break;

	case 61: // +
	case 109: // -
		var speeds = document.getElementById('video_speeds').childNodes;
		var spd_current, spd_faster, spd_slower;
		for(var h, j = 0; (h = speeds[j]) != null; j++) {
			if(h.nodeName != 'LI') continue;
			if(spd_current && !spd_faster) {spd_faster = h; break;}
			if(h.className == 'active') spd_current = h;
			if(! spd_current) spd_slower = h;
		}

		if(kc == 61) {
			if(spd_faster) spd_faster.click();
		} else {
			if(spd_slower) spd_slower.click();
		}
		break;

	case 80: // P
		// unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
		if(player.getPlayerState() == 1) player.pauseVideo(); else player.playVideo();
		break;

	case 77: // M
		if(player.isMuted()) player.unMute(); else player.mute();
		break;

	case 33: // PgUp
	case 34: // PgDn

		// figure out which sequence item we are at right now
		var current_vid;
		var v = document.getElementsByTagName('a');
		for(var e, j = 0; (e = v[j]) != null; j++) {
			if(!e.getAttribute('class')) continue;
			if(e.getAttribute('class') == 'seq_video_active') {
				current_vid = e;
				break;
			}
			if(e.getAttribute('class') == 'seq_problem_active') {
				current_vid = e;
				break;
			}
		}
		var current_id = parseInt(current_vid.id.replace(/^tt_/, ''));
		var next_id;
		if(kc != 33) next_id = current_id + 1; else next_id = current_id - 1;

		var link = document.getElementById('tt_' + next_id);
		if(link) link.click();
		break;

/*

	case 70: // F
		break;
	case 67: // C
		break;
*/
	default: return ;
	}
	return false;
}



function update_player() {

	// find player... we need that one to update anything!
	var pw = document.getElementById('myytplayer');
	var player;
	if(pw) player = XPCNativeWrapper.unwrap(pw);

	// find any existing decoration
	var con = document.getElementById('extracontrols');

	// find wrapper
	var wrapper;
	var sections = document.getElementsByTagName('div');
//	for each(var s in sections) {
	for(var s, j = 0; (s = sections[j]) != null; j++) {
		if(s.getAttribute('class') && (s.getAttribute('class') == 'video-wrapper') ) {
			wrapper = s;
			break;
		}
	}

	// here comes the magic!
	if(con && player) {
		// if we have already decorated the wrapper and we have a player, update the controls.
		update_controls(player);
	} else if(wrapper && (! con)) {
		// we have an undecorated wrapper, so add the extra controls on it
		decorate_player(player, wrapper);
	}

	//if(player) volume_restore = false; else volume_restore = true;
}


// this fixes a mild courseware bug and makes changing videos on the lecture
// sequence work as expected even when flashblock is being used
var playerfix = document.createElement('script');
playerfix.innerHTML = 'updateytplayerInfoInterval = 0; console.log("FIXED!");';
document.body.appendChild(playerfix);


// inject some extra CSS classes
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
head.appendChild(style);
style.innerHTML =
	'table.extracontrols {width: 100%;} ' + 
	'table.extracontrols td {border: 1px solid black; text-align: center; vertical-align: middle; padding: 4px;} ' + 

	'td.keybshortcuts {font-size: 120%; font-style: italic;} ' + 
	'td.keybshortcuts span {font-size: 80%; white-space: nowrap; margin-left: 8px;} ' + 
	'td.keybshortcuts b {font-family: monospace; border: 1px solid grey; background-color: lightgrey; ' + 
		'padding-left: 2px; padding-right: 2px; font-size: 120%;} ' + 

'';


// do the above once every second now. that should be a reasonable trade-off
// between low idle load and usability
setInterval(update_player, 1000);



/*function keydown_handler(e) {
	unsafeWindow.console.log("> " + e.keyCode);
}*/

document.onkeydown = keydown_handler;



