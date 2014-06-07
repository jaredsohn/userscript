// ==UserScript==
// @name           Download Blip Music
// @description    Add to Blip.fm an easy DOWNLOAD button after NEXT button on page bottom. Enjoy!
// @include        http://www.blip.fm/*
// @include        http://blip.fm/*
// ==/UserScript==

//unsafeWindow.BlipControl.events.play.subscribe(isPlaying);
unsafeWindow.Blip.control.events.play.subscribe(isPlaying);

_debug = false;

/*
	Util: Get elements by classname
*/
function getElementsByClassName(clsName) {
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for (var i = 0;i < elements.length;i++) {
        if (elements[i].className.indexOf(" ") >= 0) {
            var classes = elements[i].className.split(" ");
            for (var j = 0;j < classes.length;j++) {
                if (classes[j] == clsName) retVal.push(elements[i]);
            }
        }
        else if (elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}

/*
	Capture play event
*/
function isPlaying(action, args) {
	if (args.length && args[0].url.indexOf('http://') == 0) {

		if (_debug) {
			console.log('blipdownload | Loading music info...')
			console.log('blipdownload | ID: '+args[0].id)
			console.log('blipdownload | URL: '+args[0].url)
		}
		
		// remove old download button
		var p = getElementsByClassName('controls')[0];
		if (document.getElementById('dDownload'))
			p.removeChild(document.getElementById('dDownload'));

		// show download button after "Next" button on page bottom
        showDownloadButton(args[0].id, args[0].url);
    }
}

/*
	Show download button
*/
function showDownloadButton(musicID, musicURL) {
	var controls = getElementsByClassName('controls')[0];
	var newHTML = controls.innerHTML + '<span id="dDownload"> | <a href="'+musicURL+'">Download</a></span>';
    controls.innerHTML = newHTML;
}
