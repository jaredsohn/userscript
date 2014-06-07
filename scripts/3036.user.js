// ==UserScript==
// @name         Pod Safe Music Network Music Download
// @description   Adds download links to PMN pages.
// @include       http://music.podshow.com/music/listeners/artistdetails.php*
// ==/UserScript==

/*var allCells, thisCell;
allCells = document.evaluate(
    "//td[@class='podcastListDescription']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allCells.snapshotLength; i+=5) {
    thisCell = allCells.snapshotItem(i);
    alert(thisCell.innerHTML);
}*/
var mp3extraction = new RegExp('button.swf.theFile=(/music/library/music/[^"]*\.mp3)"', "");
//var mp3extraction = new RegExp('(p)', "");


var cells = document.getElementsByTagName('td');
var inc = 1;
for (i=0;i<cells.length;i+=inc) {
	if (cells[i].getAttribute("class") == "podcastListDescription") {
		//GM_log(cells[i].innerHTML);
		mp3 = cells[i+4].innerHTML;
		//GM_log("1:" + mp3);
		mp3 = mp3extraction.exec(mp3);
		//GM_log("2:" + mp3);
		mp3 = mp3[1];
		//GM_log("3:" + mp3);
		mp3 = "http://music.podshow.com" + mp3;
		cells[i].innerHTML = '<a href="' + mp3 + '">' + cells[i].innerHTML + '</a>';
		inc = 5;
	} else {
		inc = 1;
	}
}
