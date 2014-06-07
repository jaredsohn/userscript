// ==UserScript==
// @name          Magnetic Stripe Reader
// @description   Add button for Magnetic Stripe Reader
// @author        Marco Ratto
// @version       0.2
// @date          2009-11-27
// @namespace     marcoratto
// @homepage      http://userscripts.org/scripts/show/39157
// @license       GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include       http://127.0.0.1/Greasemonkey/Magnetic_Stripe/*
// @include       http://marcoratto.co.uk/Greasemonkey/Magnetic_Stripe/*
// @include       https://arbd.ebay.it/*
// @include       https://www.paypal.com/*
// ==/UserScript==

/*
This script add a button "Magnetic Stripe" near to the input textbox for writing the number of the Credit Card.
If you press the button, it will be opened a MsgBox.
Stripe the Credit Card and, if all is ok, it will be copy in the textbox.

I tested the script with the following Credit Card:
	* Visa Barclaycard
	* Blu American Express
	* Alitalia Maestro
	* Toyota Card Mastercard
	* Deutch Bank Credit Card
	* CartaSi San Paolo Card

The site supported are the following:
	* http://127.0.0.1/Greasemonkey/Magnetic_Stripe/ (Development Environment)
	* http://marcoratto.co.uk/Greasemonkey/Magnetic_Stripe/ (Test Environment)
	* www.ebay.com
	* www.paypal.com

For more infos about the Magnetic Stripe Reader search on Google or you can buy one of this item on ebay for few Euros.

Please see the script's home page for updates:
  http://userscripts.org/scripts/show/39157
*/

/**
 * Set this true to see more details about the errors encountered.
 * @type {Boolean}
 */
var DEBUG = true;

/**
 * Displays the error message if DEBUG is set to true.
 * Uses GM_log where available or alerts otherwise.
 * @param {String} message The error message to display.
 * @see DEBUG
 * @see ERROR
 */
function debug(message) {
    if (DEBUG) {
        if (typeof GM_log == 'function') {
            GM_log(message); //greasemonkey specific function
        } else {
            alert(message);
	}
    }
    
}

var SUC_script_num = 39157; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js',
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Magnetic Stripe Reader') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	debug("Check for update...");
	updateCheck(false);
} catch(err) {
	debug(err.description);
}

function checkCreditCard(s) {
	var total = 0;
	for (var j=0; j<s.length; j++) {
      	var digit = parseInt(s.substring(j, j+1), 10);
      	if ((j+1) % 2 == 0) {
		digit *= 2;
      	}
      total += digit;
   }
   return total;
}

function generate(item) {
	var helper = document.createElement('input');
	helper.type = 'button';
	helper.value = 'Magnetic Stripe';
	helper.addEventListener('click', function(event) {
		ccField = prompt("Magnetic Stripe:", "");

		if (ccField.length == 0) {
			alert("ERROR 1: The input string is not a valid magnetic stripe.");
			return;
		}	
		if (ccField.substr(0,2).toUpperCase() != "%B" ) {
			alert("ERROR 2: The input string is not a valid magnetic stripe.");
			return;
		}
        	var containsCaret = ccField.search('&');
		if( containsCaret == -1 ) {
			alert("ERROR 3: The input string is not a valid magnetic stripe.");
			return;
		}
		var pieces = ccField.split('&');
	        if( pieces.length < 2 ) {
			alert("ERROR 4: The input string is not a valid magnetic stripe.");
			return;
		}		
		var pieceZero = pieces[0];
		var cardNumber = pieceZero.substr(2,(pieceZero.length-1));
		// alert("sumString(reverseString(cardNumber)=" + sumString(reverseString(cardNumber)));
		if ((checkCreditCard(cardNumber) % 10) != 0) {
			var answer = confirm("ERROR 5: " + cardNumber + " could not be a valid Credit Card. Continue?");
			if (answer) {
				item.value = cardNumber;
			}
   		} else {
			item.value = cardNumber;
		}
	}, false);
	return helper;
}

// find the form field
var items = document.body.getElementsByTagName('input');
for(i in items) {
	var item = items[i];
	if ((item.name == 'ccnumber') || 
	    (item.name == 'ccNum') || 
 	    (item.name == 'cc_number') || 
	    (item.name == 'cccard')) {
		// build our 'scan barcode' helper button
		// then insert it after the query form field
		var helper = generate(item);
		item.parentNode.insertBefore(helper, item.nextSibling);
	}
}
