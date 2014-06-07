// ==UserScript==
// @name          RaagaAdSkipper
// @description   Skips Audio Ads while playing songs from Raaga.com 
// @version       2005-12-03
// @namespace     http://saravan.blogspot.com
// @include       http://www.raaga.com/playerV31/mainplay.asp*
// ==/UserScript==
//
// Comments/Suggestions ? saravanannkl at gmail dot com
//
// Tested with
//  Firefox 1.0.6/Greasemonkey 0.53
//  Firefox 1.5/Greasemonkey 0.6.4

// What it does
// 	- Skips Raaga Audio Ads
//	- Provides support for following Winamp keyboard shortcuts in Raaga Player
//		z - Previous Song
//		x - Play
//		c - Pause
//		v - Stop
//		b - Next Song
//		Up Arrow - Increase Volume
//		Down Arrow - Decrease Volume
//
// ChangeLog
// 2005-12-03
//	Updated script to support Firefox 1.5.
// 2005-09-10
//	First Release.



/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Saravana Kumar

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.txt
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

END LICENSE BLOCK */

var _gm_raaga_plyr_XPN = document.getElementsByName('raaga_ply')[0];
if(!_gm_raaga_plyr_XPN) {
	GM_log('No Player Object');
	return;
}

_gm_raaga_plyr = _gm_raaga_plyr_XPN.wrappedJSObject || _gm_raaga_plyr_XPN;

var _old_fn_setPlayTime = unsafeWindow.setPlayTime;

unsafeWindow.setPlayTime = function () {
	_old_fn_setPlayTime();
	try {
		if(_gm_raaga_plyr) {
			clipState = _gm_raaga_plyr.GetPlayState();
			if(clipState == 3) {
				var currSongTime = new Date(_gm_raaga_plyr.GetLength());
				var currSongLength = 60 * currSongTime.getMinutes() + currSongTime.getSeconds()
				if(currSongLength<40 && currSongLength>0)
					unsafeWindow.next();
			}
		}
	}
	catch(e) {
		GM_log('Exception in Skipping Ads(setPlayTime fn): ' + e.toString());
	}
}

function _gm_raaga_set_vol(x) {
	try {
		elmvolLyr = document.getElementById("volLayer");
		if(elmvolLyr) {
			var vol = parseInt(elmvolLyr.style.left);
			var newVol = vol - unsafeWindow.volStart + x;
			if(newVol < 0) newVol = 0;
			if(newVol > 100) newVol = 100;
			elmvolLyr.style.left = unsafeWindow.volStart + newVol;	
			_gm_raaga_plyr.SetVolume(newVol*1.1);
		}
		else
			GM_log('No Vol Layer');
	}
	catch(e) {
		GM_log('Exception in changing the volume(_gm_raaga_set_vol fn): ' + e.toString());
	}
}

document.addEventListener('keypress', 
		function (e) {
			try {
				var sPressedKey = String.fromCharCode(e.which).toUpperCase();
				switch(sPressedKey) {
					case 'Z':
						unsafeWindow.prev();
						break;
					case 'X':
						unsafeWindow.play();
						break;
					case 'C':
						unsafeWindow.play();
						break;
					case 'V':
						unsafeWindow.stop();
						break;
					case 'B':
						unsafeWindow.next();
						break;
				}

				switch (e.keyCode) {
					case e.DOM_VK_UP:
						_gm_raaga_set_vol(5); 
						break;
					case e.DOM_VK_DOWN: 
						_gm_raaga_set_vol(-5); 
						break;
				}
			}
			catch(e) {
				GM_log('Exception in Playback handler: ' + e.toString());
			}
		}
		, true);