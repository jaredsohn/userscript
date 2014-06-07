// ==UserScript==
// @name          Youtube Mp3 Download
// @namespace     Create by Igo
// @description	  
// @version       1
// @include       https://www.youtube.com/watch*
// @include       http://www.youtube.com/watch*
// ==/UserScript==

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
 
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
		hash[1] = unescape(hash[1]);
		vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
 
    return vars;
}

var teste = getUrlVars()
var t = teste['v'];
var x = document.getElementById("eow-title").innerHTML;
x = "| <a href=\"http://www.youtube-mp3.org/get?video_id="+t+"\" target=\"_blank\">Download Mp3</a> | "+x

document.getElementById("eow-title").innerHTML = x;