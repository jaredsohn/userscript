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

	// Add Plus
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://plus.google.com"><span class="gbtb2"></span><span class="gbts">+</span></a></li>';
	// Add Gmail
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://mail.google.com"><span class="gbtb2"></span><span class="gbts">Gmail</span></a></li>';
	// Add Voice
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://voice.google.com/"><span class="gbtb2"></span><span class="gbts">Voice</span></a></li>';
	// Add Calendar
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://calendar.google.com/"><span class="gbtb2"></span><span class="gbts">Calendar</span></a></li>';
	// Add Contacts
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://www.google.com/contacts"><span class="gbtb2"></span><span class="gbts">Contacts</span></a></li>';
	// Add Reader
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://reader.google.com"><span class="gbtb2"></span><span class="gbts">Reader</span></a></li>';
	// Add News
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://news.google.com"><span class="gbtb2"></span><span class="gbts">News</span></a></li>';
	// Add Finance
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://finance.google.com"><span class="gbtb2"></span><span class="gbts">Finance</span></a></li>';

	// Add the OL to the DOM
	divContainingOrderedList.appendChild(newOrderedList);
}

reformatList();