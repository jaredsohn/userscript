// ==UserScript==
// @name        Vimeo Auto Download
// @namespace   Vimeo
// @description Auto download when open player page
// @include     http://vimeo.com/*
// @include     https://vimeo.com/*
// @include     http://www.vimeo.com/*
// @include     https://www.vimeo.com/*
// @version     1
// @grant       none
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {

    //
    function download(){
        var b = document.createElement('a');
        var linkText = document.createTextNode("Download");
        b.appendChild(linkText);
        b.id = 'dl';
        document.body.appendChild(b);
        
        var dl = document.getElementById('dl');
        var url = document.getElementsByTagName('video')[0].src;
        
        dl.setAttribute('download',  document.title + '.mp4');
        dl.setAttribute('style', 'display:none; position: fixed;font-size: 32px;right: 1em;top: 1em;background-color: yellow;line-height: normal;text-decoration: none;padding:.5em;border-radius: 7px;');
        dl.setAttribute('href', url);
        dl.click();
    }
    window.setTimeout(download, 3000);
}

addJQuery(main);