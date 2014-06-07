// ==UserScript==
// @name          Codice Fiscale Reader
// @description   Add button for reading the Italian Fiscale Code using a Magnetic Stripe Reader
// @author        Marco Ratto
// @version       0.2
// @date          2009-11-27
// @namespace     marcoratto
// @license       GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage      http://userscripts.org/scripts/show/39883
// @include       http://127.0.0.1:8080/~rattom/Greasemonkey/Codice_Fiscale_Reader/*
// @include       http://marcoratto.co.uk/Greasemonkey/Codice_Fiscale_Reader/*
// @include       https://www.intesasanpaolo.com/*
// ==/UserScript==

/*
This script add a button "CF Reader..." near to the input textbox for writing the Italian Fiscale Code.
If you press the button, it will be opened an InputBox.
Pass the card on the barcode reader and, if all is ok, it will be copy the following information:
 * Codice Fiscale
 * Nome
 * Cognome
 * Sesso (M o F)
 * Data di nascita

The card supported are the following:
 * Tessera Sanitaria
 * Codice Fiscale

The sites supported are the following:
 * Banca Intesa San Paolo
	* F24
	* Bollettino ICI

Please see the script's home page for updates:
http://userscripts.org/scripts/show/39883

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

var SUC_script_num = 39883; // Change this to the number given to the script by userscripts.org (check the address bar)

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
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Codice Fiscale Reader') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	debug("Check for update...");
	updateCheck(false);
} catch(err) {
	debug(err.description);
}


function trim(value) {
    var val = new Array();
    var len = value.length;
    var st = 0;
    var off = 0;

    for (var j=0; j<len; j++) {
      val[j] = value.substring(j, j+1);
    }

    while ((st < len) && (val[off + st].indexOf(" ") != -1)) {
        st++;
    }
    while ((st < len) && (val[off + len - 1].indexOf(" ") != -1)) {
        len--;
    }
    return ((st > 0) || (len < value.length)) ? value.substring(st, len) : value;
}


function validate(s) {
    var codiceFiscale = s.toUpperCase();
    var soloCodiceFiscale = codiceFiscale.substring(0, 15);
    var carControllo = codiceFiscale.substring(15, 16);
    var car = calcolaControllo(soloCodiceFiscale);
    return (carControllo == car);
}

function calcolaControllo(s) {
        var ctrl = 0;

        for (var j=1; j<=13; j+=2) {
          ctrl += calcolaControllo1(s.substring (j, j+1));
        }
        for (var j=0; j<=14; j+=2) {
          ctrl += calcolaControllo2(s.substring (j, j+1));
        }

        var pos = (ctrl % 26);
        var valore = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(pos, pos+1);
        return valore;
 }

function calcolaControllo1(c) {
   var valore = 0;

   var controlli1 = [0,1,2,3,4,5,6,7,8,9, 0,1,2,3,4,5,6,7,8,9, 10,11,12,13,14,15,16, 17,18,19,20,21,22,23,24,25];
   var quale = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c);

   if (quale != -1) {
        valore = controlli1[quale];
        }
    return valore;
}

function calcolaControllo2(c) {
   var valore = 0;

   var controlli2 = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23];
   var quale = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c);

   if (quale != -1) {
          valore = controlli2[quale];
   }
        return valore;
 }

    // decodifica anno
  function decodeYear(s) {
    var out = parseInt(s, 10) % 100;
    out += 1900;
    return out;
  }

   // codifica mese
  function decodeMonth(s) {
    var out = "ABCDEHLMPRST".indexOf(s);
    out++;
    out = (out < 10 ? "0" : "") + out;
    return out;
  }

  // codifica giorno
  function decodeDay(s) {
    var out = parseInt(s, 10) % 100;
    if (out > 31) {
         out -= 40;
    }
    out = (out < 10 ? "0" : "") + out;
    return out;
  }


  // decodifica Sesso
  function decodeSex(s) {
    var out = parseInt(s, 10) % 100;
    if (out > 31) {
	return "F";
    }
    return "M";
  }

function writeItem(name, value) {
	var items = document.body.getElementsByTagName('input');
	for(i in items) {
        	var item = items[i];
	        if (item.name == name) {
                	item.value = value;
        	}
	}
}

function chooseCombo(name, value) {
  var items = document.body.getElementsByTagName('select');
  for(j in items) {
       var item = items[j];
       if (item.name == name) {
         for (var i=0;i<item.options.length; i++) {
		if (item.options[i].value == value) {
  			item.options[i].selected = true;
		}
	 }
       }
  }
}

function generate(item) {
	var helper = document.createElement('input');
	helper.type = 'button';
	helper.value = 'CF Reader...';
	helper.addEventListener('click', function(event) {
		raw = prompt("Codice Fiscale Reader:", "");

		if (raw.length == 0) {
			alert("ERROR 1: The input string is ZERO length.");
			return;
		}	
		if (raw.substr(0,1).toUpperCase() != "%" ) {
			alert("ERROR 2: The input string is not valid.");
			return;
		}

		codicefiscale = raw.substr(1,16);

		var answer = false;
	        if ( validate(codicefiscale)) {
			answer = true;
   		} else {
			answer = confirm("ERROR 5: " + barcode + " could not be a valid Italian Fiscal Code. Continue?");
		}
		if (answer) {
		        item.value = codicefiscale;
			
			if (item.name == 'codiceFiscaleCoobbligato') {
				return;
			}

			anno = decodeYear(codicefiscale.substr(6, 2));
			mese = decodeMonth(codicefiscale.substr(8, 1));
			giorno = decodeDay(codicefiscale.substr(9, 2));
			ggmmaaaa = giorno + mese + anno;
			writeItem('dataNascita', ggmmaaaa);

			var sex = decodeSex(codicefiscale.substr(9, 2));

			chooseCombo("sesso", sex);

			var sections = new Array();
	                sections = raw.split("_");

			cognomeNome = sections[0].substring(17, sections[0].length);
			doppioSpazioIndex = cognomeNome.indexOf("  ");

			cognome = cognomeNome.substring(0, doppioSpazioIndex);
			nome = trim(cognomeNome.substring(doppioSpazioIndex, cognomeNome.length));
			writeItem('cognome', cognome);
			writeItem('nome', nome);
		}
	}, false);
	return helper;
}

// find the form field
var items = document.body.getElementsByTagName('input');
for(i in items) {
	var item = items[i];
	if ((item.name == 'codiceFiscaleCoobbligato') || 
	    (item.name == 'codiceFiscale') || 
	    (item.name == 'codFiscalePIVA') || 
	    (item.name == 'ccNum')) {
		// build our 'scan barcode' helper button
		// then insert it after the query form field
		var helper = generate(item);
		item.parentNode.insertBefore(helper, item.nextSibling);
	}
}
