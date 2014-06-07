// filesonic ads remover and download helper
// written by Julio Matus
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// This script makes filesonic a bit easier to read, and helps to automate downloads
//
// ==UserScript==
// @name          filesonic ads remover and download helper
// @namespace     http://www.rikijpn.co.cc/
// @description   This script makes filesonic a bit easier to read, and helps to automate downloads. Go to http://www.rikijpn.co.cc/en/auto_window_opener.php to automate it even more...
// @include       http://www.filesonic.*/file/*
// ==/UserScript==

function clickLink(link) {
    var cancelled = false;

    if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0,
            false, false, false, false,
            0, null);
        cancelled = !link.dispatchEvent(event);
    }
    else if (link.fireEvent) {
        cancelled = !link.fireEvent("onclick");
    }

    if (!cancelled) {
        window.location = link.href;
    }
}

function hideStuffs(){
    var idToDelete = document.getElementById('buyPremium');
    var tableToDetele = document.getElementsByTagName('table')[0].children[2];
    tableToDetele.style.display = "none";
    idToDelete.style.display = "none";
}

window.waitForCountdown = function(waitingForCountdown){
    if (document.getElementById('countdown'))
	return setTimeout('waitForCountdown(true)', 1 * 1000);
    if (waitingForCountdown) // leaving countdown
	alert('filesonic wants you to type');
    return true;
}
window.waitForDownloadLink = function(){
    if(! document.getElementById('downloadLink'))
	return setTimeout('waitForDownloadLink()', 0.5 * 1000);
    else{
	var downloadLink = document.getElementById('downloadLink').children[1].children[0];
	clickLink(downloadLink);
    }
}
function clickOnDownloadButton(){
    //click on slow download button (free)
    var downloadButton = document.getElementsByClassName('freeAccount')[0].children[0];
    clickLink(downloadButton);
}

//main
hideStuffs();
clickOnDownloadButton();
setTimeout('waitForCountdown(false)', 3 * 1000);
//waitForCountdown(false); //wait as long as you have to...
waitForDownloadLink(); //also clicks it

