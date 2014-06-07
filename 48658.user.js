// ==UserScript==
// @name           better berkley webcasts
// @author         Matt Katz
// @namespace      berkley webcasts
// @description    every time I click on the background stupid thickbox closes so I changed it
// @include        http://webcast.berkeley.edu/course_details_new.php*
// @also           Nate Whitten added a new feature - save links are numbered so you can get sane filenames with a download manager
// ==/UserScript==

var urlRegex = /\b(https?:\/\/[^\s+\"\<\>]+)/i;
var allLinks, thisLink;
var fileUrl, row;
var clicktext;

function zPad(myNum,count) { // pads string with leading zeroes for ease of sorting
	var numzPad = myNum + ''; // force string var
	while(numzPad.length < count) {
		numzPad = "0" + numzPad;
	}
	return numzPad;
}

allLinks = document.evaluate(
    '//a[@class="hVlogTarget"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // remove the thickbox which is annoying
    clicktext = thisLink.getAttribute("onclick");
    thisLink.setAttribute("onclick", clicktext.replace("active=true","active=false"));

    //lets get the url from that text so folks can save this CC video and audio
    var match = urlRegex.exec(clicktext);
    fileUrl = match[0];
    fileUrl = fileUrl.replace("&autostart=true',",'');
    row = thisLink.parentNode.parentNode;
    var downloadLink = document.createElement('div');
    downloadLink.innerHTML = '<a href="' + fileUrl + '" >Save_' + zPad(i + 1,3) + '</a>';
    row.insertBefore(downloadLink,row.firstChild);   
}