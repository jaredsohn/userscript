// ==UserScript==
// @name        Harmogram
// @namespace   http://userscripts.org/users/469064
// @description Download button.
// @author      ifugu
// @version     0.13
// @include     http://*harmogram.com/*
// @include     https://*harmogram.com/*
// @grant       GM_xmlhttpRequest
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


// polyfill for GM_addStyle
if (typeof GM_addStyle === 'undefined')
    GM_addStyle = function (css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) { return }
        style.type = 'text/css';
        try { style.innerHTML = css }
        catch (x) { style.innerText = css }
        head.appendChild(style);
    };

(function () {
    addStyles();
    addDownloadLink();
})();

function addStyles() {
    GM_addStyle('.header { width: 70rem; } .menu { width: 50rem; } .menu li { width: 20%; }');
}

function addDownloadLink() {
    $('NAV.menu UL').append('<li />');
    $('NAV.menu UL > LI:last-child').append(
		$('<a href="#download" data-icon="d" id="download-trigger">D <span class="menu_desc">Download</span></a>').click(downloadCurrentTrack)
	);
}

function downloadCurrentTrack() {
    initiateTrackDownload(constructTrackInfo());
    return false;
}

function constructTrackInfo() {
    var $trackInfo = $('.track__model.active:first'),
		trackInfo = {};
    trackInfo.song = $.trim($trackInfo.find('.track__info .track__title:first').text());
    trackInfo.artist = $.trim($trackInfo.find('.track__info .track__artist:first').text());
    trackInfo.filename = (trackInfo.artist + ' - ' + trackInfo.song).replace('/', '') + '.mp3';
    trackInfo.url = $.trim($trackInfo.find('AUDIO:first').attr('src'));
    return trackInfo;
}

function initiateTrackDownload(trackInfo) {
    console.log('trackurl: ' + trackInfo.url);
    if (typeof document.createElement('a').download == 'undefined') // Check for HTML5 download attribute support
        unsafeWindow.open(trackInfo.url, '_blank');
    else
        download(trackInfo.url, trackInfo.filename, 'audio/mpeg');
}

function download(src, filename, mime) {
    if ($.browser.mozilla) { // Works with Firefox Nightly as of 21.0a1 (2/12/2013)
        GM_xmlhttpRequest({
            method: 'GET',
            url: src,
            onload: function (respDetails) {
                var binResp = customBase64Encode(respDetails.responseText);
                var firstChild = document.querySelector('body *');
                var tag = document.createElement('a');
                tag.href = 'data:' + mime + ';base64,' + binResp;
                tag.download = filename;
                tag.target = '_blank';
                firstChild.parentNode.insertBefore(tag, firstChild);
                tag.click();
                firstChild.parentNode.removeChild(tag);
            },
            overrideMimeType: 'text/plain; charset=x-user-defined'
        });
    }
    else { // Works with Chrome as of 24.0.1312.57m (2/13/2013)
        var firstChild = document.querySelector('body *'),
	        tag = document.createElement('a');
        tag.href = src;
        tag.download = filename;
        tag.target = '_blank';
        firstChild.parentNode.insertBefore(tag, firstChild);
        tag.click();
        firstChild.parentNode.removeChild(tag);
    }
}

// http://emilsblog.lerch.org/2009/07/javascript-hacks-using-xhr-to-load.html
function customBase64Encode(inputStr) {
    var bbLen = 3,
		enCharLen = 4,
		inpLen = inputStr.length,
		inx = 0,
		jnx,
		keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
			+ '0123456789+/=',
		output = '',
		paddingBytes = 0,
		bytebuffer = new Array(bbLen),
		encodedCharIndexes = new Array(enCharLen);

    while (inx < inpLen) {
        for (jnx = 0; jnx < bbLen; ++jnx) {
            // Throw away high-order byte, as documented at:
            // https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
            if (inx < inpLen)
                bytebuffer[jnx] = inputStr.charCodeAt(inx++) & 0xff;
            else
                bytebuffer[jnx] = 0;
        }

        /*--- Get each encoded character, 6 bits at a time.
			index 0: first 6 bits
			index 1: second 6 bits
				(2 least significant bits from inputStr byte 1
				+ 4 most significant bits from byte 2)
			index 2: third 6 bits
				(4 least significant bits from inputStr byte 2
				+ 2 most significant bits from byte 3)
			index 3: forth 6 bits (6 least significant bits from inputStr byte 3)
		*/
        encodedCharIndexes[0] = bytebuffer[0] >> 2;
        encodedCharIndexes[1] = ((bytebuffer[0] & 0x3) << 4) | (bytebuffer[1] >> 4);
        encodedCharIndexes[2] = ((bytebuffer[1] & 0x0f) << 2) | (bytebuffer[2] >> 6);
        encodedCharIndexes[3] = bytebuffer[2] & 0x3f;

        //--- Determine whether padding happened, and adjust accordingly.
        paddingBytes = inx - (inpLen - 1);
        switch (paddingBytes) {
            case 1:
                // Set last character to padding char
                encodedCharIndexes[3] = 64;
                break;
            case 2:
                // Set last 2 characters to padding char
                encodedCharIndexes[3] = 64;
                encodedCharIndexes[2] = 64;
                break;
            default:
                // No padding - proceed
                break;
        }

        // Now grab each appropriate character out of our keystring,
        // based on our index array and append it to the output string.
        for (jnx = 0; jnx < enCharLen; ++jnx)
            output += keyStr.charAt(encodedCharIndexes[jnx]);
    }

    return output;
}
