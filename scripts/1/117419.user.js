// ==UserScript== 
// @author 		Matt Parker
// @name		Hipusic Plugin
// @version		2.7
// @description		Sends your listening habits (or as last.fm would call it "scrobbes") to Hipusic.com.  Supported sites: Google Play, Grooveshark, Jango, SoundOwl, Pandora, SiriusXM, Turntable.fm.
// @namespace		Hipusic
// @include		http://grooveshark.com/*
// @include		http://www.grooveshark.com/*
// @include		http://retro.grooveshark.com/*
// @include		http://pandora.com/*
// @include		http://www.pandora.com/*
// @include		https://pandora.com/*
// @include		https://www.pandora.com/*
// @include		http://turntable.fm/*
// @include		http://www.turntable.fm/*
// @include		http://www.jango.com/*
// @include		http://jango.com/*
// @include		http://play.google.com/music/*
// @include		https://play.google.com/music/*
// @include		http://soundowl.com/*
// @include		https://www.siriusxm.com/player/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require		http://www.hipusic.com/plugins/req_files/officialbundle-2.js
// @icon 		http://www.hipusic.com/images/H.png

// ==/UserScript==

/*

==========================
=== Supported Websites ===
==========================

* Grooveshark.com (new and retro)
* Pandora.com
* Turntable.fm
* Google Play
* Jango
* SoundOwl 
* SiriusXM

Want this script to support another site? e-mail me: matt [at] hipusic [dot] com.


==========================
=== How disable a site ===
==========================

Need to disable a website?  Simply delete the lines above where you see "include *website here"


=========================
======== Thanks =========
=========================

The following scripts helped me in the process of making this one:
http://userscripts.org/scripts/review/99088

MD5 function is by Paul Johnston and was updated by Greg Holt.


*/
				
var debug = GM_getValue("debug"); // Set this to 1 to see some fun stuff in the error console

var plugin_text, plugin_id, plugin_secret, url, song, artist, album, fso, far, fal, saved_song, cur_song, tt_current_song, tt_current_artist, existing_track_message, track_message, chat_message;

var nosubmit = false;

var time = 0;

// Get the user's token and user id
var saved_user_token = GM_getValue("token");
var saved_user_id = GM_getValue("uid");

var working = new Object(); // Stores working copy of metadata changes

// Menu items
GM_registerMenuCommand("Setup Script", setup);

// If we're in debug mode allow us to see some extra stuff.
if (debug == 1) {
	GM_registerMenuCommand("Check Current Song", debug_return_song);
	GM_registerMenuCommand("Check User Info", check_user_info);
	GM_registerMenuCommand("Turn Debugging Off", toggleDebug);
}
else {
	GM_registerMenuCommand("Turn Debugging On", toggleDebug);
}

GM_registerMenuCommand("Manual Check", check_new_song);


// On page load check to see if the user has validated.  Also, check to see if there is a new song.
$(document).ready(function() {
	if ((window.location.href.match('siriusxm.com/player')) && (window.top == window.self)) {
			GM_log("Redirect");
			window.location.href = 'http://www.hipusic.com/plugins/sirius/player.php'; // redirect to the SiriusXM plugin
	}
	else {
		$('title').append(' - Hipusic');
		if ((!saved_user_token) || (!saved_user_id)) {
			alert("It looks like you have not setup the Hipusic script yet.  Let's set up the script now.  Press OK to continue.");
			setup();
		}
		if (window.location.href.match('turntable.fm')) {
			window.setInterval(check_new_song, 1000);
		}
		else {
			window.setInterval(check_new_song, 30000);
		}
	}
});

function toggleDebug ()
{
	if (debug == 1) 
	{
		debug = 0;
		GM_setValue("debug", 0);
		alert("Debugging has been turned OFF. Refresh the page for changes to take effect.");
	}
	else 
	{
		debug = 1;
		GM_setValue("debug", 1);
		alert("Debugging has been turned ON. Refresh the page for changes to take effect.");
	}
}

// Check if a new song is playing
function check_new_song () {
	if (saved_user_token && saved_user_id) {
		getSAA();
		saved_song = GM_getValue("cur_song");
		if ((saved_song != song) && song && (!window.location.href.match('turntable.fm'))) { // turntable is a PITA
			GM_setValue("cur_song", song);
			GM_log("New song: " + artist + " - " + song);
			
			send_play();
		}
	}
}

// Debug function to show the user's info
function check_user_info () {
	alert("User ID:" + saved_user_id);
	alert("User Token:" + saved_user_token);
}

// Get the current Song, Album, and Artist.
function getSAA() {
	nosubmit = false;
	if (window.location.href.match('grooveshark.com')) {
		if (debug == 1) {GM_log("Grooveshark Detected"); }
		// Set the correct plugin_id and secret
		plugin_id = plugin_id_gs;
		plugin_secret= plugin_secret_gs;
				
		
			/* Support for old version of Grooveshark */
			if (window.location.href.match('retro.grooveshark.com')) {
				if (debug == 1) {GM_log("Retro GS detected"); }
		
				if ($('#player_elapsed').text()) {
						time = parseInt($('#player_elapsed').text().replace(/[^\d.]/g, ""), 10);
				}
				else {
					time = 0;
				}
					
				if (debug == 1) {GM_log("Time: " + time); }

				if (time > 30) {
				
					if (debug == 1) {GM_log("Time is > 30"); }

					var playing = document.getElementById("playerDetails_nowPlaying");
					var id = playing.attributes.getNamedItem("rel") ? playing.attributes.getNamedItem("rel").value : false;
					
					if (id !== false && id != "null") {
						var parser = new DOMParser();
						
						if (working.so && working.so[id]) {
							song = working.so[id];
							fso = true; }
						if (working.ar && working.ar[id]) {
							artist = working.ar[id];
							far = true; }
						if (working.al && working.al[id]) {
							album = working.al[id];
							fal = true; }
						
						var curSongDat = parser.parseFromString("<song>" + playing.innerHTML + "</song>", "text/xml");
						var attrs = curSongDat.getElementsByTagName("a");
						var gotil = attrs.length;
						for (var i = 0; i < gotil; i++) {
							if (fso !== true && attrs[i].attributes.getNamedItem("class").value.indexOf("song") != -1) {
								song = attrs[i].attributes.getNamedItem("title").value; }
							if (far !== true && attrs[i].attributes.getNamedItem("class").value == "artist") {
								artist = attrs[i].attributes.getNamedItem("title").value; }
							if (fal !== true && attrs[i].attributes.getNamedItem("class").value == "album") {
								album = attrs[i].attributes.getNamedItem("title").value; } } 
					}
				}
			}	
			else 
			{
				if (debug == 1) {GM_log("New version of GS"); }
				
				if ($('#time-elapsed').text()) {
						time = parseInt($('#time-elapsed').text().replace(/[^\d.]/g, ""), 10);
				}
				else {
					time = 0;
				}
				
				if (time > 30) {
				
					if (debug == 1) {GM_log("Time is > 30"); }
				
					if ($('#time-elapsed').text() != $('#time-total').text())
					{
						if (debug == 1) {GM_log($('#time-elapsed').text() + ' - ' + $('#time-total').text()); }
						song = $('#now-playing-metadata').children('.song').text();
						artist = $('#now-playing-metadata').children('.artist').text();
						album = $('#now-playing-metadata').children('.album').text();						
					}
					else 
					{
						if (debug == 1) {GM_log("Song is over - not submitting"); }
						nosubmit = true;
					}
				}
			}
					
		
	}
	/*
	else if (window.location.href.match('spapps.com')) {
		if (debug == 1) {GM_log("Spotify Detected"); }
		// Set the correct plugin_id and secret
		plugin_id = plugin_id_sp;
		plugin_secret= plugin_secret_sp;
		
		if ($("#track-name").length > 0){
			alert('found it');
		}
		
	    song = $('#track-name').children('a').text();
        artist = $('#track-artist').children('a').text();
        album = '';

		song = encodeURIComponent(song);
		artist = encodeURIComponent(artist);
		
	} 
	*/
	else if (window.location.href.match('pandora.com')) {
		if (debug == 1) {GM_log("Pandora Detected"); }
		// Set the correct plugin_id and secret
		plugin_id = plugin_id_p;
		plugin_secret= plugin_secret_p;
		
		
	    song = $('.playerBarSong').text();
        artist = $('.playerBarArtist').text();
        album = $('.playerBarAlbum').text();
		url = window.location.href;
		url = encodeURIComponent(url);
		
		plugin_text = url;
		
		song = encodeURIComponent(song);
		artist = encodeURIComponent(artist);
		album = encodeURIComponent(album);
	}
	else if (window.location.href.match('jango.com')) {

		if (debug == 1) {GM_log("Jango Detected"); }
		// Set the correct plugin_id and secret
		plugin_id = plugin_id_j;
		plugin_secret= plugin_secret_j;
		
		
		song = $('#current-song').text();
        artist = $('#player_current_artist').text();
		url = window.location.href;
		url = encodeURIComponent(url);
		
		plugin_text = url;
		
		album = " ";
		song = encodeURIComponent(song);
		artist = encodeURIComponent(artist);
		
	}
	else if (window.location.href.match('soundowl.com')) {

		if (debug == 1) {GM_log("SoundOwl Detected"); }
		// Set the correct plugin_id and secret
		plugin_id = plugin_id_so;
		plugin_secret= plugin_secret_so;
		
		var playing = $('#now-playing').text().split(' - ', 2);
		
		artist = playing[0];
		song = playing[1];
				
		album = " ";
		song = encodeURIComponent(song);
		artist = encodeURIComponent(artist);
		
	}
	else if (window.location.href.match('play.google.com')) {

		if (debug == 1) {GM_log("Google Play Detected"); }
		// Set the correct plugin_id and secret
		plugin_id = plugin_id_gp;
		plugin_secret= plugin_secret_gp;
	 
		if ($('#currentTime').text()) {
			time = parseInt($('#currentTime').text().replace(/[^\d.]/g, ""), 10);
		}
		else {
			time = 0;
		}
		
		if (debug == 1) {GM_log("Time: " + time); }

		if (time > 30) {
		
		if (debug == 1) {GM_log("Time is > 30"); }
		
		song = $('#playerSongTitle').text();
        artist = $('#player-artist').text();
		album = $('#player-album').text();

		album = encodeURIComponent(album);
		song = encodeURIComponent(song);
		artist = encodeURIComponent(artist);
		
		
		}
	}
	else if (window.location.href.match('turntable.fm')) {
		// Set the correct plugin_id and secret
		plugin_id = plugin_id_tt;
		plugin_secret= plugin_secret_tt;

		chat_message = $(".messages > .message:last > .text").text();
			
		var room_url = window.location.pathname;
		room = $('.name').html()
		room = room_url + '~' + room;
		
		plugin_text = room;

		if (chat_message.length > 0) {
			
			// if (debug == 1) { GM_log("PING: Existing is: "+existing_track_message + " New is: "+chat_message); /* very spammy */ }
						
			if (chat_message != existing_track_message && chat_message.indexOf("started playing") == 1) {
				existing_track_message = chat_message;
				
				//Figure out the artist and track
				var track_string_begins = chat_message.indexOf('"');
				var track_string_ends = chat_message.indexOf('"',track_string_begins + 1);
				song = chat_message.substr(track_string_begins+1,track_string_ends - track_string_begins-1);
				artist = chat_message.substr(track_string_ends+5);
				
				// Logic is a bit different for turntable
				
				saved_song = GM_getValue("cur_song"); 
				
				if ((saved_song != song) && song) {			
					GM_setValue("cur_song", song);
					GM_log("New song: " + artist + " - " + song);
				
					send_play();		
				} 
			}
		}
	}
}

// Function to try to get the SAA again.
var try_again = function () {
	GM_log("... trying again");
	send_play();
}

// Debug function to return the current song.
function debug_return_song () {
	getSAA();
	alert(artist + " - " + album + " - " + song);
}

function display_error (error) {
    switch (error)
    {
	case 0:
		alert("ERROR: Excess spam detected.  Your account is forbidden from submitting listening habits until you contact support. Error #0");
	break;

	case 1:
		alert("ERROR: Please be sure you have completed all fields. Error #1");
	break;

	case 2:
		alert("ERROR: Internal error, please contact support. Error #2");
	break

	case 3:
		alert("ERROR: Internal error, please contact support. Error #3");
	break;

	case 4:
		alert("ERROR: You have entered an invalid username and/or password. Error #4");
	break;

	case 5:
		alert("ERROR: You have entered an invalid username and/or password. Error #5");
	break;

	case 6:
		alert("ERROR: Please wait before submitting another track. We'll attempt again in 30 seconds. Error #6");
	break;
  }
}

// Setup the script
function setup () {
	GM_log("Running setup");
	var email = prompt("What is your e-mail address associated with your Hipusic account?");
	var pw = prompt("What is your password associated with your Hipusic account?");
	var enc_pw = calcMD5(pw);
		if ((pw) && (email)) {

		GM_xmlhttpRequest({
			  method: "POST",
			  url: "http://www.hipusic.com/api/get_token.php",
			  data: "user_email=" + email + "&user_pw=" + enc_pw + "&plugin_id=" + plugin_id_gs + "&plugin_secret=" + plugin_secret_gs,
			  headers: {
				"Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {
				parser=new DOMParser(); 
				xml=parser.parseFromString(response.responseText,"text/xml");
					if (xml.getElementsByTagName("error_code")[0]) {
						error = Number(xml.getElementsByTagName("error_code")[0].childNodes[0].nodeValue);
						GM_log("Error occured while setting up script: " + error);
						display_error(error);
					}
					else {
						user_token = xml.getElementsByTagName("token")[0].childNodes[0].nodeValue;
						user_id = xml.getElementsByTagName("uid")[0].childNodes[0].nodeValue;
						GM_setValue("token", user_token);
						GM_setValue("uid", user_id);
						saved_user_token = user_token;
						saved_user_id = user_id;
						GM_log("Script setup OK.  Token:" + saved_user_token + ", UID: " + saved_user_id);
						alert("You have successfully setup the script.");
					}
				}
			});
		} 
		else {
			GM_log("User did not complete all fields");
			alert("Setup failed.  Please complete all fields.");
	}
}

function send_play () {
if (!saved_user_token || !saved_user_id) {
// document.ready prompt replaces this
// setup();
}
else {
if (nosubmit == false) 
{
	artist = encodeURIComponent(artist);
	album = encodeURIComponent(album);
	song = encodeURIComponent(song);

	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://www.hipusic.com/api/send_song.php",
	  data: "user_id=" + saved_user_id + "&user_token=" + saved_user_token + "&plugin_id=" + plugin_id + "&plugin_secret=" + plugin_secret + "&data_artist=" + artist + "&data_song=" + song + "&data_album=" + album + "&data_text=" + plugin_text,
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) {
		parser=new DOMParser();
		xml=parser.parseFromString(response.responseText,"text/xml");
		if (xml.getElementsByTagName("error_code")[0]) {
			error = Number(xml.getElementsByTagName("error_code")[0].childNodes[0].nodeValue);
			GM_log("Error occured while sending song: " + error);
				if (error == 6) {
					GM_log("We hit the rate limit, trying again in 30 secs.");
					window.SetTimeout(try_again, 30000);
				}
			display_error(error);
		}
		else {
			GM_log("Song sent successfully");
		}
	}
	});
	}
}
}

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */

/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";
function rhex(num)
{
  str = "";
  for(j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str)
{
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t)
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Take a string and return the hex representation of its MD5.
 */
function calcMD5(str)
{
  x = str2blks_MD5(str);
  a =  1732584193;
  b = -271733879;
  c = -1732584194;
  d =  271733878;

  for(i = 0; i < x.length; i += 16)
  {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i+10], 17, -42063);
    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = ff(d, a, b, c, x[i+13], 12, -40341101);
    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = gg(c, d, a, b, x[i+11], 14,  643717713);
    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = gg(c, d, a, b, x[i+15], 14, -660478335);
    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = gg(b, c, d, a, x[i+12], 20, -1926607734);
    
    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i+10], 15, -1051523);
    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = ii(d, a, b, c, x[i+15], 10, -30611744);
    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}