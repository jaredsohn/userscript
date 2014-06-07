// ==UserScript==
// @name        iBL
// @namespace   iBL
// @include     *ibeautyleg.com/*
// @version     1
// @grant       none
// ==/UserScript==


// Grab all existing image URLs - Working
var jpgLinks = document.querySelectorAll ("a[href*='jpg']");


// Change thumbs to real image links - Working
for (var J = jpgLinks.length - 1;  J >= 0;  --J) {
	jpgLinks[J].href = jpgLinks[J].href.replace(/%5BBeautyleg/, 'albums/%5BBeautyleg');
}


// Remove existing thumbs
var paras = document.getElementsByClassName('slideset');
paras[0].parentNode.removeChild(paras[0]);


// get image count for entire gallery - Working
count = document.getElementsByClassName('count')[0].innerHTML;
count = count.replace(/[\s-]+$/,'').split(/[\s-]/).pop();
count = parseInt(count);


// Function to convert count to 4 digit number - Working
function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}


// Get base URL for images (remove '/0000.jpg') - Working
var typLink = jpgLinks[0].href;
typLink = typLink.substr(0, typLink.lastIndexOf("/"));
// Grab spot to write links into page
var newLinks = document.getElementsByClassName("main")[0];
var reverseCount = 0;
for (var J = count - 1;  J >= 0;  --J) {
	imageNum = leftPad(reverseCount, 4);
// add text links to page
//    newLinks.innerHTML += '<span style="float:left;padding:4px;"><a href="' + typLink + '/' + imageNum + '.jpg">' + imageNum + '</a></span>';
// add full images (also as links) to page
    newLinks.innerHTML += '<a href="' + typLink + '/' + imageNum + '.jpg"><img src="' + typLink + '/' + imageNum + '.jpg" style="width:10%;height:10%;float:left;padding:4px;"></a>';
    reverseCount++;
}



