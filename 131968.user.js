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

	// Add Facebook
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://www.facebook.com/"><span class="gbtb2"></span><span class="gbts">Facebook</span></a></li>';
	// Add Gmail
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://mail.google.com"><span class="gbtb2"></span><span class="gbts">Gmail</span></a></li>';
	// Add Drive
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://drive.google.com/"><span class="gbtb2"></span><span class="gbts">Drive</span></a></li>';
	// Add Recherche
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://www.google.com/"><span class="gbtb2"></span><span class="gbts">Recherche</span></a></li>';
	// Add Youtube
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="http://www.youtube.com/"><span class="gbtb2"></span><span class="gbts">Youtube</span></a></li>';	
	// Add Maps
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="http://maps.google.ca/maps?hl=fr&tab=wl"><span class="gbtb2"></span><span class="gbts">Maps</span></a></li>';	
	// Add Calendar
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://calendar.google.com/"><span class="gbtb2"></span><span class="gbts">Calendar</span></a></li>';
	// Add News
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://news.google.com"><span class="gbtb2"></span><span class="gbts">News</span></a></li>';
	// Add Finance
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://finance.google.com"><span class="gbtb2"></span><span class="gbts">Finance</span></a></li>';

	// Add the OL to the DOM
	divContainingOrderedList.appendChild(newOrderedList);
}

reformatList();