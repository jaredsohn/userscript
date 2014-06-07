// ==UserScript==
// @name           bH_ud
// @description    Automatikusan lenyitja az adatlapon a futtatott torrenteket
// @include        http://bithumen.be/userdetails.php*
// ==/UserScript==

	function open_list(what){
	var elem = document.getElementById(what);
	elem.target = '';
	elem.focus();
	// attempt 1
	try
	{
		if (elem.click()) {
		return true;
		}
	}
	catch(e) { /* This element does not support click */ }
	// attempt 2
	if (document.createEvent)
	{
		var evtObj = document.createEvent('MouseEvents');
		if (evtObj && elem.dispatchEvent && evtObj.initMouseEvent)
		{
			evtObj.initMouseEvent(
			'click',
			true, true, // Click events bubble and they can be cancelled
			document.defaultView, // Use the default view
			1, // Just a single click
			0, 0, 0, 0, // Don't bother with co-ordinates
			false, false, false, false, // Don't apply any key modifiers
			0, // 0 - left, 1 - middle, 2 - right
			null); // Click events don't have any targets other than
			// the recipient of the click
			return elem.dispatchEvent(evtObj);
		}
	}
	else if (document.createEventObject)
	{
		return elem.fireEvent('onclick');
	}
	// attempt 3
	if (elem.href)
	{
		location = elem.href;
		return true;
	}
	return false;
	}

	var leech = document.getElementById('leeched_list');
	if (leech) open_list('leeching_link');
	
	var seed = document.getElementById('seeded_list');
	if(seed) open_list('seeding_link');
