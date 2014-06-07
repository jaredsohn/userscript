// ==UserScript==
// @name           Pardus Chat Beeper
// @namespace      pardus.at
// @include        http://chat.pardus.at/chattext.php*
// @version        1.0
// @description    Beeps when new messages appear in the www.pardus.at chat.
// @author         Beigeman & Ratchetfreak
// @icon           http://i175.photobucket.com/albums/w159/Beigeman
// ==/UserScript==

// CUSTOMISATION
var beepSpamDelay = 30;
var beepDuration = 2;
var soundFile = "http://www.thewormlab.com/MiaowMusic/wav/Miaow-snip-Stirring of a fool.wav";
var volume=100;
// #TODO save settings in cookie, add to options page.


// DO NOT EDIT.
var isActive = false; // Wants to be true, false for testing.
var allowBeep = true;

var chatHeading = document;

// Check to see if there are new chat messages (by RatchetFreak).
var oldAjaxCallback = unsafeWindow.ajaxCallback;
if (oldAjaxCallback)unsafeWindow.ajaxCallback = function(result,errors) {
   if (result && result["first"] > unsafeWindow.lastMsg) {
       if ((allowBeep) && (!isActive))
		{
			audioTag.play();
			allowBeep = false;
			setTimeout(beepSpamTimeout, beepSpamDelay);
			setTimeout(stopBeep, beepDuration);
			GM_log("Playing audio..");
		}else
		{
			GM_log("Not playing audio: " + allowBeep + " " + isActive);
		}
   }
   return oldAjaxCallback(result,errors);
};

//Stop beeps happening if you're actually in the chat window. (didn't work for me)
/*document.addEventListener('focus', function() {
   isActive = true;
});

document.addEventListener('blur', function() {
   isActive = false;
});*/




// Make timeouts into miliseconds.
beepDuration *= 1000;
beepSpamDelay *= 1000;


// Adds a HTML audio element which will beep for beepDuration, then wait beepSpamDelay seconds before beeping again.

	var d = document.createElement('div');
	d.innerHTML = "<audio preload=\"auto\" src=\"" + soundFile + "\" type=\"audio/x-wav\"><br />Your browser does not support HTML5 audio</audio>";
	d.setAttribute('id','audio-support');
	//chatHeading.innerHTML = "<div id=\"audio-support\"><audio preload=\"auto\" src=\"" + soundFile + "\" type=\"audio/x-wav\"><br />Your browser does not support HTML5 audio</audio></div>"+chatHeading.innerHTML;
	audioTag = d.getElementsByTagName('audio')[0];
        audioTag.volume=volume;
	document.getElementById('ChatWnd').insertBefore(d,document.getElementById('ChatWnd').firstChild);





// Waits beepSpamDelay seconds before allowing another beep to be sounded.
function beepSpamTimeout() {
   allowBeep = true;
}

// Stops the beep from occurring. Happens after beepDuration seconds.
function stopBeep() {
	audioTag.pause();
	audioTag.currentTime=0;
	//audioTag.stop();
}