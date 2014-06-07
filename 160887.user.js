// ==UserScript==
// @name       Improve Layout on PCGHX
// @namespace  http://arvid-gerstmann.de
// @version    0.1
// @description  
// @match      http://extreme.pcgameshardware.de/*
// @copyright  2013+, Arvid Gerstmann
// ==/UserScript==

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

function addCss() {
    var url = window.location.href;
    
    if (url.endsWith("usercp.php")) {
        var css = ".threadbit .threadinfo { padding: 2px 0px !important; } .threadbit .nonsticky, .threadbit .discussionrow { background: !important; }";
        
    } else {
        var css = ".threadbit .threadinfo { padding: 0px !important; } .threadbit .nonsticky, .threadbit .discussionrow { background: !important; }";
    }

	var htmlDiv = document.createElement('div');
	htmlDiv.innerHTML = '<p></p><style type="text/css">' + css + '</style>';
	document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[1]);
}

addCss();
