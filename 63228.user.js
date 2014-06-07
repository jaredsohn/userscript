// ==UserScript==
// @name           yobo
// @namespace      yobo
// @description    get music from yobo
// @include        http://www.yobo.com/
// ==/UserScript==

function showAllSongs()
{
    newWindow = window.open('', 'song list', 'scrollbars=yes');
    if (newWindow != null)
    {
        newWindow.document.write('<html>');
        for (var i = 0; i < songList.length; i++)
        {
            newWindow.document.write('wget "' + songList[i].url + '" -O "' + songList[i].title + '.mp3" <br />');
        }
        newWindow.document.write('</htm>');
        newWindow.focus();
    }
}

/**
 * Encrypt given plain text using the key with RC4 algorithm.
 * All parameters and return value are in binary format.
 *
 * @param string key - secret key for encryption
 * @param string pt - plain text to be encrypted
 * @return string
 */
function rc4Encrypt(key, pt) {
    s = new Array();
    for (var i=0; i<256; i++) {
        s[i] = i;
    }
    var j = 0;
    var x;
    for (i=0; i<256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }
    i = 0;
    j = 0;
    var ct = '';
    for (var y=0; y<pt.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        ct += String.fromCharCode(pt.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return ct;
}

/**
 * Decrypt given cipher text using the key with RC4 algorithm.
 * All parameters and return value are in binary format.
 *
 * @param string key - secret key for decryption
 * @param string ct - cipher text to be decrypted
 * @return string
 */
function rc4Decrypt(key, ct) {
    return rc4Encrypt(key, ct);
}

function decode64(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    } while (i < input.length);

    return output;
}

function decryptUrl(cypheredUrl)
{
    return rc4Decrypt('downloadNotSupported404', decode64(cypheredUrl));
}


var links = document.getElementsByTagName('a');
var songList = new Array();
var getAllDiv = null;
//alert('In greasemonkey script: links.length=' + links.length);
for (var i = 0; i < links.length; i++)
{
    var a = links[i];
    var handler = a.getAttribute('onclick');
    
    if ((handler != null) && (handler.indexOf('yobo_play_song') >= 0))
    {
        // yobo has two different format of playing scripts...
        var t = handler.substr(16);
        var cypheredUrl = t.substr(0, t.indexOf("'"));
        var actualUrl = decryptUrl(cypheredUrl) + ".mp3";
        //alert('Got cyphered url: ' + cypheredUrl);

        var elem = document.createElement('a');
        elem.href = actualUrl;
        elem.innerHTML = '<span class="textseq"> [Download]</span>';
        var titleNode = a.parentNode.parentNode.childNodes[2];
        songList.push({url: actualUrl, title: titleNode.textContent});
        //alert('url: ' + actualUrl + ', ' + titleNode.textContent);
        titleNode.appendChild(elem);
    }
    else if ((handler != null) && (handler.indexOf('play_song') >= 0))
    {
        // the first parameter of yobo_play_lite is the cyphered url
        var t = handler.substr(11);
        var cypheredUrl = t.substr(0, t.indexOf("'"));
        var actualUrl = decryptUrl(cypheredUrl) + ".mp3";
		var titleNode = a.parentNode.parentNode.childNodes[5];
        songList.push({url: actualUrl, title: titleNode.textContent});
        var node = document.createElement('a');
        node.innerHTML = '<span class="textseq">[Download]</span>';
        node.href = actualUrl;
        titleNode.appendChild(node);
    }
    if ((getAllDiv == null) && (a.getAttribute('class') == 'linkright'))
    {
        getAllDiv = a.parentNode;
    }
}

var getAllElem = document.createElement('a');
getAllElem.innerHTML = 'Download all';
getAllElem.href = 'javascript:void(0)';
getAllElem.addEventListener("click", showAllSongs, true);
getAllDiv.appendChild(getAllElem);
