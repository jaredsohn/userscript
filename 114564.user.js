// ==UserScript==
// @name           Facebook Notification Count in Favicon
// @description    Notifies the user (for pinned tabs where there's no title) they have a notifications by displaying a number on the facebook favicon
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

//Code borrowed from FFixer by Vaughan Chandler and Better YTFavico by Mr. Derpison

var favicons = [
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAX0lEQVQ4jWP4//8/AyUYTFhHzjgDxP9JxGeQDSBVMxgTbUBCxer/r999+Q8DJBuArJksA9A10s8AXIBoA0B+R/Y/jD+EwoBoA1yT5v3PbdmCE8MAshhID/UMoDgzUYIBj0Cgi7ar4coAAAAASUVORK5CYII=',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMVJREFUeNpi/P//PwMlgAVE2ETNPAOkjEnUe/bIsnQTJijHmAzLjeEuIATUFUUZeLnZGJ69+gzEnzC9gE9jZqQ5g4mONJg/fflJhqWbLxBngKO5EkNzvitxgYgNnLnyFOxckLOlxHiBmA+rOiZcBnz++pMhuXodQ0HbFrAhuAATPueBDCEEmBgoBANvADgWuDjZGDSUxHAq4uVmB9PS4vwMRtoyYPaNe6+o6IJv33+dPXf1Cc78kFz9BGtmAhGMlGZngAADACl8Oo05ryvbAAAAAElFTkSuQmCC',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQFJREFUeNpi/P//PwMlgAVE2ETNPAOkjEnUe/bIsnQTJijHmAzLjeEuQAfqiqJALMLAy80OF9t/8h7Ds1efsHsBHWRGmjOY6EijiMX4GTDUTtzNcObKU8IGnL78hOHz158MN+69ZuDjYWfwc9IEu8bJQpk4A5ZuvoDhJZCLpMT4MNQyERNavNxsYPrm/dekGxDtawB2AcxrJBkA8jsoQGHeQvc/XgNAfi5LsQOzQRqnLz+JVR0TrnTQnO8K9zco+vAmZS5ONgYNJTG4YHaUOTwRgQzbPjsBatgbhqnLIC65ce8V8bFAMDN9+/7r7LmrT+D5Ibn6CVGZCUQwUpqdAQIMAJDQVGRsnSe8AAAAAElFTkSuQmCC',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARFJREFUeNpi/P//PwMlgAVE2ETNPAOkjEnUe/bIsnQTJijHmAzLjeEuQAfqiqIMJjrScP7nrz8Z9p+8B6axegEdxPgZMDiaK2GIJVevwzAEqwEb915juHHvNZjNx8POEO1rwCAlxgd0mQjDmStPCRsAUoSsEGQA3ljABmBhwMvNjhQWv4g3YEKVDwofFIg377/GUMeEywCYN569+gR3ESgciHZBQdsWOHtuaxA4akExs3TzBeJcQFJS5uJkY9BQEoML+jlpMMhK8IPZXBysDLKSELYgPxeDkbYMmH3j3ivcXhAW4ALHOTLYc/wuw7Hzj7C74Nv3X2fPXX0Czw9ANjzgQFGHLfRBmQlEMFKanQECDADyGV0CIyjaLwAAAABJRU5ErkJggg==',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNpi/P//PwMlgAVE2ETNPAOkjEnUe/bIsnQTJijHmAzLjeEuwAWkxPiAmBfM/vz1F8PN+6+xewEXaM53YVBXFAWzz1x5ylDQtgVDDRMuzdG+BnDN+AATLqdnRpqD2Zv2XSccC+igLMUOTE9ffpJ0F4CcbqIjzfDs1SeGpZsvkGYAyOkxfgZgdtecQ8QnJIQBvAy83Oxg9oQqHxSFIFcBEw4o0eE2ABTXoOhCNxTkss9ffwLTwRvsLuDiZGPQUBIDCyzaiOpvF0tlBj8nPmCYfAbLGWnLgMVv3HuFPx2QlJm+ff919tzVJ1jzA1AcGKAHsWYmEMFIaXYGCDAAR8ZQdpz6ZLEAAAAASUVORK5CYII=',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPVJREFUeNpi/P//PwMlgAVE2ETNPAOkjEnUe/bIsnQTJijHmAzLjeEuQAe83OwM6ooiGOLPXn0G4k+YXkAHIM0TqnwwxKcvP8mwdPMFwgYggzNXnsLZn7/+xB6I+EBB2xa88kyEDFBXFCUcjfjA3NYgaAB+YqiduIfh5v3XhF3w+esvsN9hGASkxPgYYvwMiHMByBZkv2dGmjNE+xqAo5fkMCAqKXNxsjFoKInBBV0slRn8nDQYHj//CObLSvKD6V+//zIYacuA2TfuvcLtBS5OVhSNEG+9Ydi07waGWkZQbsSVmUBRyMvNhpKY0DMTI6XZGSDAAI1fVGkdByw4AAAAAElFTkSuQmCC',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARRJREFUeNpi/P//PwMlgAVE2ETNPAOkjEnUe/bIsnQTJijHmAzLjeEuwAWkxPgYTHSkGXi52cH8z19/Mmzadx3TC9hAZqQ5Q7SvAYrYmStPiTPAz0kTrhmk6fTlJ3AXYA1EdGCqKwPXXNC2hXAsoAOYn2/efw0OAxB49uozEH8izgAYAHkDORyWbr7AMH35SRQ1TPgMAPkZ5A2YzeiBStCAJZsugMOga84hnGrwGiAtzocSJjgDkYuTjUFDSQwuCAowWHQaakoxCAtygfmPn39kMNKGxNCNe69wu+DY+UfAGHgDZstK8jNwcbAyvP3wjWHF9svYXfDt+6+z564+QckPR87eB9OgaMQRhWdBBCOl2RkgwADnEWiebJr7fgAAAABJRU5ErkJggg==',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNpi/P//PwMlgAVE2ETNPAOkjEnUe/bIsnQTJijHmAzLjeEuQAa83OwM6ooiWHU8e/UZiD9hegEZgDRPqPLBasD05ScZlm6+gN+Az19/MZy58hRFzERHGn8gIoOb918zFLRtQdEMM2D/yXsYBjARCiknC2W4ZnT/EzQAFKB+Tppg9r4Td7GqwWsATDPIZmzOJ2iAvzPEgI17r+NUg9MAR3MlBikxPpyBhxILXJxsDBpKYigSQW46YPrY+UcMEqJ8YIwMbtx7hdsFwgJcDIaakmD2+evPCWemb99/nT139QlKfth99BbBzAQiGCnNzgABBgDh902kBclekwAAAABJRU5ErkJggg==',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAStJREFUeNpi/P//PwMlgAVE2ETNPAOkjEnUe/bIsnQTJijHmAzLjeEuwAZ4udkZHM2VwDQInLnylOHm/dfYvYBN86oJkXDNMLB08wWG6ctPoogxYTPAz0kTrPnz159gDZv2XYeLowMmfJ68ef8N2NZ9J+7CXUaUASCbQUBdUYTBREcaSIuiiBMMA5CTTXVlwIE4ocoHLt415xBxLgBpBGGIN17DbY7xMyDOAH9nLXioJ1evYwgrWA71kijYS0QH4qcvP3H6HSUMuDjZGDSUxOCCHz7/ANPxgUYMThbKDFwcrHA5QX5uBiNtGYYb917hDsQ9x+4yyErwg2MBhEHg24/fYPG3H75huuDb919nz119gpIfjpy9D6ZBfn726jMQf8LITCCCkdLsDBBgAEJVbIRkOgJrAAAAAElFTkSuQmCC',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARVJREFUeNpi/P//PwMlgAVE2ETNPAOkjEnUe/bIsnQTJijHmAzLjeEuwAakxPgYHM2V4Pz9J+8xPHv1CbsX0IGJjjTDhCofFLHMSHOG2om7wQYhAyZsBvg7a4Hpm/dfM0xffhJMI4sTdAEvNzuY3nfiHsPSzRfAbHVFUbDL0AETvlDi44EYJC3Ohz8a0cHnrz/BdLSvARjjA1hdAPI3cmBhC328LgBpAIU4DIBcAYoFol2ADjSURMH0mStPsbuAi5MNqEgMLmhlKMdgqCkJDX0RJJd9ZjDSlgGzb9x7hdsLXBysKBrffvjGcPTcI4Y9x+9id8G377/Onrv6BJ4fgGyGjXuvAdMDG1ZnwzITiGCkNDsDBBgA0otapEIIEOAAAAAASUVORK5CYII=',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUVJREFUeNpi/P//PwMlgAVE2ETNPAOkjEnUe/bIsnQTJijHmAzLjeEugAF1RVEGEx1pMPvz158M+0/eA9MEvQAC0b4GDJmR5iiSIH5y9TqGZ68+4TQA5gWGGD8DMA2ydfryk2CbebnZGRzNlfC6AG4ASDEIbNx7jWHp5gsMN++/AfNNdWWwehHDAGSDIJgNwzaQlyZU+WAPA5iTm/NdSYoKRlBCAqaD/yCngWwAORMW8iADz1x5iuQFERQxoB5GuAHoJoOcCjIUpBjd38gOYMImCrJFSowXzD59+QnIAjCG2Qzjw8OAi5ONoSzFjkFWgp+Bi4OVQVaSH27YP6DbjLRlUGIKxL9x7xVqIII0g/wIA4+ff2TYtP8GPDpBAMTnOs6KGQvfvv86m1y91hjk189ffwE1vcbq4XNXn6BkJngsUAIAAgwAugp5sPT6wscAAAAASUVORK5CYII=',
		];

function $(q, root, single) {
	if (root && typeof root == 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

function trim(str) {
    return str.match(/^\W*(.*?)\W*$/)[1];
}

function remove(node) {
    if (node.parentNode)
        node.parentNode.removeChild(node);
}

function processPage() {
var total = 0;

var count = $('//a[@name="mercurymessages"]/span/span', null, true);
if (!count) { count = 0 }
total = total + parseInt(count.innerHTML);
var count = $('//a[@name="requests"]/span/span', null, true);
if (!count) { count = 0 }
total = total + parseInt(count.innerHTML);
var count = $('//a[@name="notifications"]/span/span', null, true);
if (!count) { count = 0 }
total = total + parseInt(count.innerHTML);

if (total > 9) {
total = 10;
}

var head = document.getElementsByTagName('head')[0];
var lns = head.getElementsByTagName('link');

for (var i = 0; i < lns.length; i++) {
    v = lns[i];
    var relval = trim(v.getAttribute('rel'));
    if (relval == 'shortcut icon' || relval == 'icon')
        remove(v);
}
var newln = document.createElement('link');

newln.setAttribute('rel', 'icon');
newln.setAttribute('href', favicons[total]);
head.appendChild(newln);

}
processing = setInterval(processPage, 1000);
processPage();