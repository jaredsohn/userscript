// ==UserScript==
// @name           Gmail Sound Notify
// @namespace      blurg!
// @version      1.1
// @description    Plays a wav sound file to notify you when you receive new email in gmail.
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/a/*
// @include        http://mail.google.com/a/*
// @resource      GMwavaudio http://gmflowplayer.googlecode.com/files/notify.wav
// ==/UserScript==

var oggB64 = GM_getResourceURL("GMwavaudio");
var ausrc = 'data:audio/wav;base64,'+oggB64.split('data:application/octet-stream;base64,')[1];
var au = document.createElement('audio');
au.setAttribute('src', ausrc);
au.setAttribute('id', 'GMwavaudio');
document.body.appendChild(au);

var canvas_frame = document.getElementById('canvas_frame');
var unreadNum=0,newunreadNum=0,iB,tym = Date.now(),firstRun=true;
if(canvas_frame){
	var doc=canvas_frame.contentDocument;
	window.setInterval(function(){ 
		var iB = doc.querySelector('div[id$="s0"] a[href*="mail.google.com/mail/"][href$="#inbox"][title^="Inbox"]');
		if(iB){
			if(iB.innerHTML.indexOf('(')>-1){
				newunreadNum=Number(iB.innerHTML.split('(')[1].split(')')[0]);
				if(firstRun){
					unreadNum=newunreadNum;
				}
			}		
			 //check if new unread number is larger than old unread number - and if more than one new email update occurs quickly(within 5 seconds), don't play the sound twice
			if(newunreadNum>unreadNum && (Date.now()-tym) > 5000 ){
				au.play();
				tym = Date.now();
				unreadNum=newunreadNum;				
			}
			firstRun=false;
		}
	},2000);	//every two seconds seems reasonable
}