// ==UserScript==
// @name           Rotate Image (waarbenjijnu)
// @namespace      armeagle.nl
// @include        http://sannemarjan.waarbenjij.nu/*
// @license        GNU/GPL
// @author         ArmEagle
// ==/UserScript==

/*
(Rotate) Image from: http://findicons.com/icon/229964/object_rotate_right?id=229964
Designer: New Moon
License: GNU/GPL
Modified by: ArmEagle
*/

// code namespace
if ( unsafeWindow.AEG === undefined ) {
	unsafeWindow.AEG = {};
}

function DOM_script() {
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	return script.textContent=DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");
	
	AEG.picturePlayer = document.getElementById('picturePlayer');
	AEG.currentPicture = document.getElementById('currentPicture');
	AEG.currentRotate = ''; // for easy style removal

	AEG.FrotateLeft = function() {
		AEG.currentRotate = '; -moz-transform: rotate(-90deg); margin-top: 73px';
		AEG.currentPicture.setAttribute('style', AEG.currentPicture.getAttribute('style') + AEG.currentRotate);
	}
	AEG.FrotateRight = function() {
		AEG.currentRotate = '; -moz-transform: rotate(90deg); margin-top: 73px';
		AEG.currentPicture.setAttribute('style', AEG.currentPicture.getAttribute('style') + AEG.currentRotate);
	}
	
	AEG.rotateLeft = document.createElement('div');
	AEG.rotateLeft.setAttribute('id', 'AEGrotateLeft');
	AEG.rotateLeft.addEventListener('click', AEG.FrotateLeft, true);
	AEG.picturePlayer.appendChild(AEG.rotateLeft);

	AEG.rotateRight = document.createElement('div');
	AEG.rotateRight.setAttribute('id', 'AEGrotateRight');
	AEG.picturePlayer.appendChild(AEG.rotateRight);
	AEG.rotateRight.addEventListener('click', AEG.FrotateRight, true);
	
	
	// extend the next/prevPicture functions to reset the rotation
	AEG.nextPicture = PictureBook.nextPicture;
	PictureBook.nextPicture = function(bool) {
		AEG.currentPicture.setAttribute('style', AEG.currentPicture.getAttribute('style').replace(AEG.currentRotate, ''));
		AEG.currentRotate = '';
		AEG.nextPicture(bool);
	}
	AEG.prevPicture = PictureBook.prevPicture;
	PictureBook.prevPicture = function(bool) {
		AEG.currentPicture.setAttribute('style', AEG.currentPicture.getAttribute('style').replace(AEG.currentRotate, ''));
		AEG.currentRotate = '';
		AEG.prevPicture(bool);
	}
}


var cssel = document.createElement("style");
cssel.setAttribute("type", "text/css");
cssel.textContent = 
"#AEGrotateLeft, #AEGrotateRight { z-index: 4; cursor: pointer; background:url(data:image/png;base64,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) }"+
"#AEGrotateLeft { background-position: 0px 0px; width: 40px; height: 41px; position: absolute; left: 0px; top: 20px }"+
"#AEGrotateRight { background-position: -40px 0px; width: 40px; height: 41px; position: absolute; right: 0px; top: 20px }"+
"#picturePlayer { height: 580px !important;}";
document.getElementsByTagName('head')[0].appendChild(cssel);

DOM_script();