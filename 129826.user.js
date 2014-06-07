// ==UserScript==
// @name          Rearrange Google Apps Menu Bar
// @namespace     http://divergentblue.com
// @version       0.1
// @description   Customizes the google black bar
// @include       *
// ==/UserScript==


function reformatList()
{
	// Remove the OL containing the nav links
	var divContainingOrderedList = document.getElementById('gbz');
	var orderedList = document.getElementById("gbz").getElementsByTagName("ol")[0];
	divContainingOrderedList.removeChild(orderedList);
	var newOrderedList = document.createElement("ol");
	newOrderedList.setAttribute("class", "gbtc");

	// Add Images
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://google.com/imghp"><span class="gbtb2"></span><span class="gbts">Images</span></a></li>';
	// Add Gmail
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://mail.google.com"><span class="gbtb2"></span><span class="gbts">Gmail</span></a></li>';
	// Add Scholar
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://scholar.google.com//"><span class="gbtb2"></span><span class="gbts">Scholar</span></a></li>';
	// Add YouTube
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://youtube.com//"><span class="gbtb2"></span><span class="gbts">YouTube</span></a></li>';
	// Add Maps
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="http://maps.google.com/maps?hl=en&tab=wl"><span class="gbtb2"></span><span class="gbts">Maps</span></a></li>';
	// Add Translate
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://translate.google.com/?hl=en&tab=wT"><span class="gbtb2"></span><span class="gbts">Translate</span></a></li>';
	// Add News
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://news.google.com"><span class="gbtb2"></span><span class="gbts">News</span></a></li>';
	// Add Shopping
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://google.com/prdhp"><span class="gbtb2"></span><span class="gbts">Shopping</span></a></li>';
    // Add Video
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://google.com/videohp"><span class="gbtb2"></span><span class="gbts">Video</span></a></li>';

	// Add the OL to the DOM
	divContainingOrderedList.appendChild(newOrderedList);
}

reformatList();