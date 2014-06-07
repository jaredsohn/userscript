// ==UserScript==// @name           Psyshop cd player// @namespace      http://none.none// @description    Play all the tracks on a cd page// @include        http://www.psyshop.com/shop/CDs/*

// ==/UserScript==


var links = window.document.getElementsByTagName ("a");
var tracklinks = Array ();
var k = 0;
for (var i = 0; i < links.length; i++)
{
	if (links [i].href.lastIndexOf ("m3u") == links [i].href.length - 3)
		tracklinks [k++] = links [i].href;
}
var mybtn = window.document.createElement ('a');
mybtn.appendChild (window.document.createTextNode ("Play this CD's Samples"));
mybtn.href = "#";
function play_song (tracklinks, i)
{
	if (i == tracklinks [i].length)
		return;

	setTimeout (function () {
		play_song (tracklinks, ++i);
	}, 50000);

	window.open (tracklinks [i], "dummy");
}
mybtn.addEventListener('click', function(event) {
    // event.target is the element that was clicked

	play_song (tracklinks, 0);

    // if you want to prevent the default click action
    // (such as following a link), use these two commands:
    event.stopPropagation();
    event.preventDefault();
}, true);
/*mybtn.onclick = function () {
};*/
window.document.body.appendChild (mybtn);
