

//

// --------------------------------------------------------------------

//

// This is a Greasemonkey user script.  To install it, you need

// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/

// Then restart Firefox and revisit this script.

// Under Tools, there will be a new menu item to "Install User Script".

// Accept the default configuration and install.

//

// To uninstall, go to Tools/Manage User Scripts,

// select "Hello World", and click Uninstall.

//

// --------------------------------------------------------------------

//

// ==UserScript==

// @name          PTM Ratio

// @namespace     http://diveintomark.org/projects/greasemonkey/

// @description   Display ratio on PTM

// @include       http://www.preto.me/*

// @include       http://preto.me/*

// @include       https://www.preto.me/*

// @include       https://preto.me/*


// ==/UserScript==


var divSearch, statsHTML, stats;


var footer = document.evaluate("//div[@class='credits']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

var theme = footer.innerHTML.match(/(.*) Theme/)[1];


if (theme == 'grKosta') {


divSearch = document.evaluate("//div[@class='user_info']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

stats = divSearch.snapshotItem(0);


var liArray = stats.getElementsByTagName('li');

var [upload,download,total,ratio] = parseStats(liArray[2].innerHTML);

//liArray[2].innerHTML = liArray[3].innerHTML;

if (ratio < 1.0) { ratio = '<font color="#990000">' + ratio + '</font>'; }

liArray[2].innerHTML = 'Up: <b>' + upload + '</b> Down: <b>' + download + '</b> Ratio: <b>' + ratio + '</b>';

}


else if ((theme == 'WinterHoliday') || (theme == 'Menicante') || (theme == 'Birthday')) {

stats = document.evaluate("//td[@class='row2']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


//alert(stats.snapshotItem(41).innerHTML);

for (var i=0;i<stats.snapshotLength;i=i+1) {


if (stats.snapshotItem(i).innerHTML.match(/^Total.*?up\)$/)) {

var [upload,download,total,ratio] = parseStats(stats.snapshotItem(i).innerHTML);

if (ratio < 1.0) { ratio = '<font color="#990000">' + ratio + '</font>'; }

stats.snapshotItem(i).innerHTML = 'Up: <b>' + upload + '</b> Down: <b>' + download + '</b> Ratio: <b>' + ratio + '</b>';

}


}



}




function parseStats(html) {

var data = html.match(/([\.\d]+ [MGT]B)/g);

var total = data[0];

var upload = data[1];

var download = fromBytes(toBytes(total) - toBytes(upload));

if (toBytes(download) > 0) { var ratio = (toBytes(upload)/toBytes(download)).toFixed(2); }

else { var ratio = 'Inf'; }

return [upload,download,total,ratio];

}


function toBytes (input) {

var data = input.match(/([\.\d]+) ([MGT]B)/);

if (data[2] == 'MB') { var bytes = data[1] * 1048576; }

if (data[2] == 'GB') { var bytes = data[1] * 1073741824; }

if (data[2] == 'TB') { var bytes = data[1] * 1099511627776; }

return Math.round(bytes);

}


function fromBytes (bytes) {


if ((bytes >= 0) && (bytes < 1073741824)) { return (bytes/1048576).toFixed(2) + ' MB'; }

if ((bytes >= 1073741824) && (bytes < 1099511627776)) { return  convert = (bytes/1073741824).toFixed(2) + ' GB'; }

if (bytes >= 1099511627776) { return  (bytes/1099511627776).toFixed(2) + ' TB'; }


}

