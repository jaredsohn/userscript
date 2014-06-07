// ==UserScript==
// @name          CueCat Decoder
// @description   Add button for CueCat Decoder
// @author        Marco Ratto
// @version       0.2
// @date          2009-11-27
// @namespace     marcoratto
// @license       GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage      http://userscripts.org/scripts/show/39268
// @include       http://127.0.0.1:8080/~rattom/Greasemonkey/CueCat_Decoder/*
// @include       http://marcoratto.co.uk/Greasemonkey/CueCat_Decoder/*
// @include       http://www.google.*/books*
// @include       http://www.librarything.*/search*
// @include       http://www.librarything.*/addbooks*
// ==/UserScript==

/*
This script add a button "CueCat Decoder" near to the input textbox for writing the number of the ISBN.
If you press the button, it will be opened a MsgBox.
Pass the reader on the barcode and, if all is ok, it will be copy in the textbox.

Sample of a RAW data:
.C3nZC3nZC3nYE3zYDhD6CNnY.cGen.ENr7E3TZD3z7C3PYCG.

00000000  1b 5b 32 31 3b 33 7e 2e  43 33 6e 5a 43 33 6e 5a  |.[21;3~.C3nZC3nZ|
00000010  43 33 6e 59 45 33 7a 59  44 68 44 36 43 4e 6e 59  |C3nYE3zYDhD6CNnY|
00000020  2e 63 47 65 6e 2e 45 4e  72 37 45 33 54 5a 44 33  |.cGen.ENr7E3TZD3|

The site supported are the following:
 * Google Books
 * Library Thing

Please see the script's home page for updates:
http://userscripts.org/scripts/show/39268

*/

/**
 * Set this true to see more details about the errors encountered.
 * @type {Boolean}
 */
const DEBUG = true;


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

var SUC_script_num = 39268; // Change this to the number given to the script by userscripts.org (check the address bar)

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
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'CueCat Decoder') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	debug("Check for update...");
	updateCheck(false);
} catch(err) {
	debug(err.description);
}

const seq = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-";

function validateBarcode(s) {
   var total = 0;
   for (var j=0; j<s.length; j++) {
      var digit = parseInt(s.substring(j, j+1), 10);
      if ((j+1) % 2 == 0) {
         digit *= 3;
      }
      total += digit;
   }
   return ((total % 10) == 0);
}

function decode(raw) {
    table = new Array();
    index = 0;
    for(n=0; n<raw.length; n++ ) {
        c = raw.substring(n, n+1);
        if(seq.indexOf(c) != -1 ) {
                table[index] = seq.indexOf(c);
                index++;
        }
    }
    l = index % 4;
    if (l > 0) {
        l = 4 - l;
    }

    r = "";
    for(j=0; j<index; j+=4 ) {
        n = ((table[j+0] << 6 | table[j+1]) << 6 | table[j+2]) << 6 | table[j+3];
        debug("n=" + n);
        r += String.fromCharCode((n >> 16) ^ 67) +
             String.fromCharCode((n >> 8 & 255) ^ 67) +
             String.fromCharCode((n & 255) ^ 67);
    }
    r = r.substring(0, r.length-l);
    return r;
}

function generate(item) {
	var helper = document.createElement('input');
	helper.type = 'button';
	helper.value = 'CueCat Decoder';
	helper.addEventListener('click', function(event) {
		raw = prompt("CueCat Decoder:", "");

		if (raw.length == 0) {
			alert("ERROR 1: The input string is ZERO length.");
			return;
		}	
		if (raw.substr(0,1).toUpperCase() != "." ) {
			alert("ERROR 2: The input string is not a valid magnetic stripe.");
			return;
		}

        	var sections = new Array();
        	sections = raw.split(".");

		barcode = decode(sections[3]);

	        if ( validateBarcode(barcode)) {
		        item.value = barcode;
   		} else {
			var answer = confirm("ERROR 5: " + barcode + " could not be a valid ISBN code. Continue?");
			if (answer) {
			        item.value = barcode;
			}
		}
	}, false);
	return helper;
}

// find the form field
var items = document.body.getElementsByTagName('input');
for(i in items) {
	var item = items[i];
	if ((item.name == 'q') || 
	    (item.name == 'form_find') ||
	    (item.name == 'ccNum')) {
		// build our 'scan barcode' helper button
		// then insert it after the query form field
		var helper = generate(item);
		item.parentNode.insertBefore(helper, item.nextSibling);
	}
}
