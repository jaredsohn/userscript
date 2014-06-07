// ==UserScript==
// @name What.cd Request Bounty Calculator
// @author GrecKo
// @version 0.5
// @include http*://*what.cd/requests.php?action=view&id=*
// @include http*://*what.cd/requests.php?action=new*
// @description This script lets you chose the actual bounty that will be added to a request, and preview the new total bounty.
// ==/UserScript==


// provides a properly unsafe, unsafeWindow -- in a cross-browser way
// from http://stackoverflow.com/a/10945153
var bGreasemonkeyServiceDefined     = false;

try {
    if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
        bGreasemonkeyServiceDefined = true;
    }
}
catch (err) {
    //Ignore.
}

if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.setAttribute ('onclick', 'return window;');
        return dummyElem.onclick ();
    } ) ();
}

var newRequest = document.URL.indexOf("action=new") !== -1

var voting = document.getElementById('voting');
voting.childNodes[1].innerHTML = voting.childNodes[1].innerHTML.replace(' (MB)', '');

var taxDisclaimer = voting.childNodes[3].childNodes[7];
var tax;
if (taxDisclaimer.innerHTML.match(/\s*(\d+)\s*%/))
	tax = RegExp.lastParen/100;
taxDisclaimer.innerHTML = '';

var cost = document.getElementById('new_bounty');
cost.parentNode.previousSibling.textContent = 'This will cost you ';
cost.parentNode.nextSibling.textContent = ', your new stats will be :';

var amount_box = document.getElementById('amount_box');
var unit = document.getElementById('unit');
var button = document.getElementById('button');

var br = document.createElement('br');
var txt = document.createTextNode('The new total bounty will be ');
var new_total_bounty_span = document.createElement('span');
new_total_bounty_span.id = 'new_total_bounty';
var txt2 = document.createTextNode(' ');

if (!newRequest) {
    var request_form = document.getElementById('request_form');
	new_total_bounty_span.innerHTML = unsafeWindow.get_size(document.getElementById('total_bounty').value);
	request_form.insertBefore(br, button);
	request_form.insertBefore(txt, button);
	request_form.insertBefore(new_total_bounty_span, button);
	request_form.insertBefore(txt2, button);
}
else {
    amount_box.value = 90;
}


//modified from what.cd javascript
unsafeWindow.Calculate = function () {
	var mul = ((unit.options[unit.selectedIndex].value == 'mb') ? (1024*1024) : (1024*1024*1024));
	var bounty = amount_box.value * mul;
	var amt = Math.floor(bounty / (1-tax));
	var uploaded = document.getElementById('current_uploaded').value;
	var total_bounty = newRequest ? 0 : parseInt(document.getElementById('total_bounty').value);
	if(amt > uploaded) {
		document.getElementById('new_uploaded').innerHTML = "You can't afford that request!";
		cost.innerHTML = "0.00 MB";
		if (!newRequest)
		    new_total_bounty_span.innerHTML = unsafeWindow.get_size(total_bounty);
		button.disabled = true;
	} else if(isNaN(amount_box.value)
			|| (newRequest && amt < 100*1024*1024)
			|| (!newRequest && amt < 10*1024*1024)) {
		document.getElementById('new_uploaded').innerHTML = unsafeWindow.get_size(uploaded);
		cost.innerHTML = "0.00 MB";
		if (!newRequest)
		    new_total_bounty_span.innerHTML = unsafeWindow.get_size(total_bounty);
		button.disabled = true;
	} else {
		button.disabled = false;
		document.getElementById('amount').value = amt;
		document.getElementById('new_uploaded').innerHTML = unsafeWindow.get_size(uploaded - amt);
		document.getElementById('new_ratio').innerHTML = unsafeWindow.ratio(uploaded - amt, document.getElementById('current_downloaded').value);
		cost.innerHTML = unsafeWindow.get_size(amt);
		new_total_bounty_span.innerHTML = unsafeWindow.get_size(total_bounty + bounty);
	}
}