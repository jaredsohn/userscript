// filefactory ads remover and download helper
// written by Julio Matus
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// This script removes all ads, and helps to automate downloading in filefactory.com
//
// ==UserScript==
// @name          filefactory ads remover and download helper
// @namespace     http://www.rikijpn.co.cc/
// @description   This script removes all ads, and helps to automate downloading in filefactory.com. Go to http://www.rikijpn.co.cc/en/auto_window_opener.php to automate it even more...
// @include       http://www.filefactory.com/file/*
// @include       http://www.filefactory.com/dlf/*
// ==/UserScript==


//start of helper functions
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

function showOrHideClass(className, display){
    var classArray = document.getElementsByClassName(className);
    if (classArray.length == 0) return false;
    else if (classArray.length == 1) classArray[0].style.display = display;
    else {
        for(var index = 0; index < classArray.length; index++){
            classArray[index].style.display = display;
        }
    }
}

//end of helper functions

function removeAnnoyingCode(){
    showOrHideClass('b-4', 'none');
    showOrHideClass('b-3', 'none');
    var idsToDelete = new Array (
				 'info',
				 'aContainer',
				 'premium',
				 'tableFooters',
				 'priceTable');
    for (var i = 0; i < idsToDelete.length ; i++){
	currElement = document.getElementById(idsToDelete[i]);
	currElement.style.display = "none";
    }

    var partWithNoId = document.getElementsByTagName('div')[120];
    partWithNoId.style.display = "none";
}

window.alertAndDownload = function(){
    //to use after waiting (no need for input)
    //    alert("Filefactory wait time is over!");
    var downloadLink = document.getElementById('downloadLinkTarget');
    window.location.replace(downloadLink);
}

//document.getElementById('ffRecaptcha').style.display = "inline";
//document.getElementById('downloadLink') //guess what?
removeAnnoyingCode();

var startWait;

//check if waiting...
if (startWait = document.getElementById('startWait')){
    setTimeout('alertAndDownload()', startWait.value * 1000);
//download link click button part here
}
else{
    var basicDownloadLink;
    if( basicDownloadLink = document.getElementById('basicLink')){
	clickLink(basicDownloadLink);
	alert("Filefactory wants you to type now");
    }
}
