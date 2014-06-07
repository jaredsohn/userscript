// BBC Radio Player Extra Controls Graphics Version
// version 0.21 BETA!
// 07-07-2005
// Copyright (c) 2005, Michael Pritchard
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BBC Radio Player Play Externally", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BBC Radio Player Extra Controls Graphics Version2
// @namespace     http://www.blueghost.co.uk/bbc_rp2.html
// @description   Allows you to control playback more
// @include       http://www.bbc.co.uk/radio/aod/*
// ==/UserScript==

var more 	= document.getElementById('controls');
var emb		= document.getElementsByTagName('embed');
var base	= "http://www.bbc.co.uk";
for (var i=0; i < emb.length; i++){
	if (emb[i].type == "audio/x-pn-realaudio-plugin"){
		src = emb[i].src;
		i = emb.length; //endif
	}
}
if (more && (PlayerType =="music") && (src.length >0) ) { //if is "speech" then don't need extra controls, or "live" can't have them
	more.innerHTML = '<table cellpadding="0" cellspacing="0" border="0" width="247">'+
		'<tr>'+
			'<td rowspan="2" valign="top">'+
				'<embed src="'+base+src+'" type="audio/x-pn-realaudio-plugin" pluginspage="http://www.bbc.co.uk/webwise/askbruce/articles/download/howdoidownloadrealplayer_1.shtml" width="0" height="0" name="RP" autostart="true" console="one" nojava="true" />'+
				'<img src="images/pic_ctrlleftbar.gif" width="1" height="30" alt="" border="0" />'+
				'<a href="#" onclick="PlayPause();" accesskey="4"><img src="images/btn_play.gif" width="38" height="30" alt="Play and pause button." border="0" name="playpause" onmousedown="ImgChange(this.name);" /></a>'+
				'<a href="#" onclick="Rewind(15);" accesskey="5"><img src="images/btn_rew15.gif" width="38" height="30" alt="Rewind 15 mins" border="0" onmouseup="ImgChange(this.name);" onmousedown="ImgChange(this.name);" name="rew15" /></a>'+
				'<a href="#" onclick="Rewind(1);" accesskey="6"><img src="images/btn_rew1.gif" width="38" height="30" alt="Rewind 1 min" border="0" onmouseup="ImgChange(this.name);" onmousedown="ImgChange(this.name);" name="rew1" /></a>'+
				'<a href="#" onclick="FForward(1);" accesskey="7"><img src="images/btn_fwd1.gif" width="38" height="30" alt="Forward 1 min" border="0" onmouseup="ImgChange(this.name);" onmousedown="ImgChange(this.name);" name="fwd1" /></a>'+
				'<a href="#" onclick="FForward(15);" accesskey="9"><img src="images/btn_fwd15.gif" width="38" height="30" alt="Forward 15 mins" border="0" onmouseup="ImgChange(this.name);" onmousedown="ImgChange(this.name);" name="fwd15" /></a>'+
			'</td>'+
			'<td align="right">'+
				'<a href="#" onclick="VolChange(-20);" accesskey="w"><img src="images/btn_voldown.gif" width="18" height="19" alt="Volume down 20%" border="0" name="voldown" onmouseup="ImgChange(this.name);" onmousedown="ImgChange(this.name);" /></a><img src="images/txi_vol.gif" width="17" height="18" alt="volume" name="voltxt" /><a href="#" onclick="VolChange(20);" accesskey="q"><img src="images/btn_volup.gif" width="18" height="19" alt="Volume up 20%" border="0" name="volup" onmouseup="ImgChange(this.name);" onmousedown="ImgChange(this.name);" /></a>'+
			'</td>'+
		'</tr>'+
		'<tr>'+
			'<td align="right">'+
				'<img src="images/pic_vol0.gif" width="53" height="11" alt="Volume indicator" border="0" name="volume" />'+
			'</td>'+
		'</tr>'+
	'</table>';
}
