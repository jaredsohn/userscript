// ==UserScript==
// @name			Temporary Video Fix for Charlierose.com
// @author			Erik Vold
// @namespace		charlieroseTempVideoFix
// @include			http://www.charlierose.com/view/interview/*
// @version			0.1.2
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-28
// @lastupdated		2009-09-04
// @description		This userscript fixes the videos made temporarily available at charlierose.com so that they are displayed when you click the screen shot image.
// ==/UserScript==

var charlieroseTempVideoFix = {};
charlieroseTempVideoFix.setup = function(){
	var videoMsgEM = document.evaluate("//div[@id='video-meta']/dl/dd/p/em[text()='Video can temporarily be seen by clicking ']", document, null, 9, null).singleNodeValue;
	if (!videoMsgEM) {
		videoMsgEM = document.evaluate("//div[@id='video-meta']/dl/dd/p/em[text()='Video can temporarily be seen ']", document, null, 9, null).singleNodeValue;
	}
	if( !videoMsgEM ) return false;
	var videoURL = videoMsgEM.nextSibling.href;
	var playBtn = document.getElementById('embedded_static_image');
	if( !playBtn ) return false;
	var wmvFile = videoURL.match(/[^\/]*\.wmv$/i);
	if(!wmvFile) return false;

	var newBtn = document.createElement("a");
	newBtn.id = "embedded_static_image";
	newBtn.href = "javascript:void(0);";
	newBtn.innerHTML = "play";

	newBtn.addEventListener("click", function(){
		unsafeWindow.$("#flash_container").html('' +
		'<object width="460" height="360" CLASSID="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" STANDBY="Loading Windows Media Player components..." TYPE="application/x-oleobject">' +
		'<param name="FileName" value="' +
		wmvFile +
		'">' +
		'<param name="autostart" value="true">' +
		'<param name="ShowControls" value="true">' +
		'<param name="ShowStatusBar" value="false">' +
		'<param name="ShowDisplay" value="false">' +
		'<embed type="application/x-mplayer2" src="' +
		videoURL +
		'" NAME="MediaPlayer" width="460" height="360" ShowControls="1" ShowStatusBar="0" ShowDisplay="0" autostart="1"></embed>' +
		'</object>');
	}, false);

	playBtn.parentNode.replaceChild(newBtn, playBtn);
}
charlieroseTempVideoFix.setup();
