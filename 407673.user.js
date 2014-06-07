// ==UserScript==
// @name Tagpro Mobile Control Testing Script
// @include 
// @description Tilt your mobile device to play TagPro!

function simulateKeyPress(character) {
  jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
}

$(function() {
  $('body').keypress(function(e) {
    alert(e.which);
  });

  simulateKeyPress("e");
});

window.addEventListener("devicemotion",onDeviceMotion,false);

function onDeviceMotion(ev){
	var chx = ev.accelerationIncludingGravity.x;
	var chy = ev.accelerationIncludingGravity.y;
	if(chx<=0.2){
		simulateKeyPress(37);
	}
}

// ==/UserScript==