// ==UserScript==
// @name           Nedercom
// @namespace      Nedercom
// @description    Bot voor Nedercom die automatisch oefeningen maakt.
// @include        *nedercom.rocfriesepoort.nl*
// ==/UserScript==

/**
 * DIT IS DE BRONCODE VAN NEDERSCRIPT
 * -----------------------------------------------------
 * Dit is de broncode van Nederscript. Deze is openbaar
 * beschikbaar, maar bij het aanpassen van het script
 * kunnen wij je geen ondersteuning meer bieden.
 * -----------------------------------------------------
 * PROBEER JE NEDERSCRIPT TE INSTALLEREN? => Als je de
 * broncode te zien krijgt, betekent dat, dat je een
 * browser zonder Greasemonkey gebruikt, of dat
 * Greasmonkey is uitgeschakeld.
 */

/*************************************************************************************************************/

var ScriptVersie = "1.6.2.1";
var Server = "http://nederscript.meth0d.org";

var VraagNummer = 0;
var Fouten = new Array;
var NietOpgeslagen = 0;

var dbLeesKlaar = false;
var dbSchrijfKlaar = false;
var dbFails = 0;

/*************************************************************************************************************/

function $(id)
{
	return document.getElementById(id);
}

function isInt(x)
{
   var y = parseInt(x);
   if (isNaN(y)) return false;
   return x == y && x.toString() == y.toString();
} 

function Versie2Int()
{
	var v = ScriptVersie;
	
	while (v.indexOf('.') > -1)
	{
		v = v.replace('.', '');
	}
	
	return parseInt(v);
}

function MasterReset()
{
	if (confirm('Weet je ZEKER dat je dit wilt doen? Dit zal AL je opgeslagen oefeningen en instellingen RESETTEN. Deze actie kan niet ongedaan worden gemaakt.'))
	{
		GM_setValue('ncom_announce', '');
		GM_setValue('ncom_data', '');
		GM_setValue('ncom_fouten', '');
		GM_setValue('ncom_laatsteoefening', 0);
		GM_setValue('ncom_laatsteupdatecheck', 0);
		GM_setValue('ncom_opgeslagenoef', '');
		GM_setValue('ncom_opties_autoupdate', true);
		GM_setValue('ncom_opties_foutenmax', 4);
		GM_setValue('ncom_opties_foutenmin', 0);
		GM_setValue('ncom_opties_updateom', 5);
		GM_setValue('ncom_server_versie', 0);
		GM_setValue('ncom_update_alerts', false);
		GM_setValue('ncom_opties_aapjes', true);
		GM_setValue('ncom_opties_checkboxes', true);
		GM_setValue('ncom_opties_autostart', true);
		GM_setValue('ncom_opties_zelftoets', true);
		GM_setValue('ncom_gecheckt', '');
		GM_setValue('ncom_db_user', '');
		GM_setValue('ncom_db_pass', '');
		
		alert('Nederscript is gereset.\nDe pagina wordt nu opnieuw geladen.');
		
		location.reload(true);
	}
}

function CheckUpdates()
{
	var nu = Number(new Date);
	var toen = parseInt(GM_getValue('ncom_laatsteupdatecheck', '0'));
	var diff = nu - toen;

	if (diff >= (GM_getValue('ncom_opties_updateom', 5) * 60000))
	{
		DoUpdates();
	}
}

function OptiesCheckUpdates()
{
	GM_setValue('ncom_update_alerts', true);
	DoUpdates();
}

function DoUpdates()
{
	GM_setValue('ncom_laatsteupdatecheck', Number(new Date) + '');

	try
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: Server + '/versie.php',
			headers: {'Cache-Control': 'no-cache'},
			onload: function(resp)
			{
				var ServerVersie = parseInt(resp.responseText);
				
				if (ServerVersie > Versie2Int() && GM_getValue('ncom_opties_autoupdate', 'true'))
				{
					if (ServerVersie > GM_getValue('ncom_server_versie', 0) || GM_getValue('ncom_update_alerts', false))
					{
						if (confirm('Er is een nieuwe versie van Nederscript beschikbaar. Nu updaten?'))
						{
							window.location = Server + '/nedercom.user.js';
						}
					}
				}
				else if (GM_getValue('ncom_update_alerts', false))
				{
					if (ServerVersie == Versie2Int())
					{
						alert('Nederscript is up-to-date. Er zijn geen updates beschikbaar.');
					}
					else if (ServerVersie < Versie2Int())
					{
						alert('Deze versie van Nederscript is nieuwer dan de server versie. Knap!');
					}
				}
				
				GM_setValue('ncom_server_versie', ServerVersie);
			}
		});
	}
	catch (err) { }
	
	try
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: Server + '/mededeling.php',
			headers: {'Cache-Control': 'no-cache'},
			onload: function(resp)
			{
				GM_setValue('ncom_announce', resp.responseText);
			}
		});
	}
	catch (err) { }		
}

function PakStukje(input, start, end)
{
	var pos = input.indexOf(start, 0);
	var rest = input.substring(pos);
	var pos2 = rest.indexOf(end, 0);
	var rest2 = rest.substring(0, pos2);
	return rest2;
}

function AntwoordOpVraag(vraag)
{
	var data = GM_getValue('ncom_data', '').split('|%|');
	
	for (i = 0; i < data.length; i++)
	{
		if (data[i] == '')
		{
			continue;
		}
		
		var data2 = data[i].split('<|>');
		
		var _vraag = data2[0];
		var antwoord = data2[1];
		
		if (vraag == _vraag)
		{
			return antwoord;
		}
	}
	
	return undefined;
}

function KentAntwoorden(idtje)
{
	var data = GM_getValue('ncom_opgeslagenoef', '').split(';');
	
	for (k = 0; k < data.length; k++)
	{
		if (data[k] == '')
		{
			continue;
		}	
	
		if (parseInt(data[k]) == idtje)
		{
			return true;
		}
	}
	
	return false;
}

function IsAntwoordBekend(vraag)
{
	if (AntwoordOpVraag(vraag) != undefined)
	{
		return true;
	}
	
	return false;
}

function SchrijfHulp(hulp)
{
	var div = document.createElement('div');
	div.setAttribute('id', 'nedercom-helpendehand');
	div.setAttribute('style', 'width: 100%; font-size: 70%; text-align: center;');
	div.innerHTML = hulp;
	$('content').appendChild(div);
}

Array.prototype.indexOf = function(VraagNummer)
{
    if (VraagNummer)
    {   
        i = 0;
		
        while (this[i])
        {
            if (this[i] == VraagNummer)
            {
                return i;
                break;
            }
			
            i++;
        }
    }
	
    return -1;
}

function trim(stringToTrim)
{
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function BouwFouten()
{
    Fouten = new Array;
    aantal = Math.round(GM_getValue('ncom_opties_foutenmin', 0) + Math.random() * parseInt(GM_getValue('ncom_opties_foutenmax', '4')) - parseInt(GM_getValue('ncom_opties_foutenmin', '0')));
	
    i = 0;
	
    while (i < aantal)
    {
        vraagft = Math.round((Math.random() * 19) + 1);
		if (!Fouten.indexOf(vraagft) > -1){
			Fouten[i] = vraagft;
			i++;
		}
    }
	
    GM_setValue("ncom_fouten", Fouten.toString());
}

function MaakAapje(blij)
{
	var data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAIAAABGNLJTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAjhJREFUKFNtkl1IU2EYx9/uurSLukiyoIg6QsYwsZQYTekipI/tTmJ+ME1kZLSKPsiaa2i4/Jhza6TvXKVzqaeVqXRjgWuMQbk0V5tzZ7Zln9e7fPofNkzCl4eHh+f/O+85z/88W4iIbXYW341/i4Teh0Lhhc8j/nQOAb3xSJ9mxfs1Fk1+cwk7uY8p97B+k/7Pzy9Zhm1ExQ5tq5Ihqg/JHOL0AdajKzlfnv8/bdUeBNel3tZYzLSHWb2CXT4mh1pgb6eGfv9Yku8OTtq4ocJlqBhpKczMt1H0wYehajyGjBod9F0GFTeogpNWZqzaMaBXQJbRWDfF+2nFmZi+gkxxO8V6M/MmqGCMVduZ9YLCZz7FG/ZSrAsy99Ryt46ST/loA3fX0cpDivVABQOSWfVlw9fKptuO03IfJR4pLyrzyvMoNZErEhxvgzrWqgLJrqoLQQfsZ+RvkFxsP2O7GK3N5IqkG9cH7GdBg2Qib79xYmsmfC9Lc1sTt7XQ99fcfon3NVPyMehM2AxG5GaWigfhGkUt3TfPfXx1l1aHKTVOaR+lJ2jVszBl7L2lgTkY9NfaokxnDZFmb9dXFmmFAlOp4DgqdJQKOmF3Y2WR9OYOVDC5f+lsOiJeL6ZoJ/yiuAOzUmKQEgOyIRg9aoEKJkcvBcY6NTthU8RbI/u4bJUh5Fh3xFuLPlQw//ZEivqfmOva1QXZPVkPdNBPRuc22aqA/6XvuevZqBPh9Th84mBg7sVXKbS+eX8B7aGrCYg5Sd0AAAAASUVORK5CYII%3D';
	
	if (!blij)
	{
		data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAIAAABGNLJTAAAABGdBTUEAALGPC/xhBQAAAhNJREFUKFNtkmlT2lAUhtPf2y9tv7S1Lqh0YRNCwmZIaCtRtiCLKZVAQLYQwEwthCkESCCobbW/gZ4MjPLBO++cOfOe59w799z7bLFYIE+toVz/d393fX3z5+/98xfbKwTo9TXXpFI+dhJy+pwm+4cNq/kNl4s8AMg6WjqPkvg+yG3btJhfgw4+vU2eeP2YeYk90okwDhxN2jwHO5h9C3dsB9DdAGpyWja6P/gV3ZV49pQCpWN+Ra6oQ0EoJ6ENojYUFPkiHfOxpySoK3FImLCycQzKgGpKczpqzcbtq3YeIuSaAg0VEt9j4+4wYUEyEbSaIxga14YGypcYnmfmqlQqJ4vFxHRsNDA0Vs0dZiIuBJq4lDef/TJVxNm4k0h9tTh2bqZXy0SfwAliPvu5dOZn4yhCUw6gK1wUNtYnl5umV++2Xt7Oe8tEVy/BrxaiQNOUDRFrZ5THrPSrS7qQjxc55vdcLhaSkC/pUb9CefbFWsaYIB20qoNGVyqSPrvf9f6YcCVCeCSIEujHUMABvjqok9ju3W3PoElsT+ldpBlKan7Xx535RIJbgiCXxPNMklJ6ZaBXr5OKelnmEDaAAU+V5swYYsuIIxEc8KGainpW9KhfOyZtiSO3WEmpvxrqQNAGAIEa4IAPVWAeX15XOxwbPgraCNS0ph1wwH/6V8ndcqv5TahnDdUyLYGVf/K61n6g/wNKiQ1E/9Gm6QAAAABJRU5ErkJggg%3D%3D';
	}
	
	return '<img src="' + data + '">';
}

function StartOefening()
{
	var id = parseInt(this.href.substring(61));	
	GM_setValue('ncom_laatsteoefening', id);
}

function LeesGebruiker()
{
	return trim(PakStukje(PakStukje(document.body.innerHTML, 'Gebruiker:', 'Programma:'), '<div class="line">', '</div>').substring(26));
}

function IkWeetHetNiet(Lengte)
{
	var chars = "abcdefghiklmnopqrstuvwxyz";
	var randomstring = '';
	
	for (var i = 0; i < Lengte; i++)
	{
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum + 1);
	}
	
	return randomstring;
}

function MaakCheckOefeningen()
{
	var gecheckt = '';
	var checkAmount = 0;
	var i = 0;
	var checks = document.getElementsByName('oef');
	
	while (checks[i])
	{
		if (checks[i].checked)
		{
			gecheckt += ';' + checks[i].value;
			checkAmount++;
		}
	
		i++;
	}
	
	if (checkAmount > 0)
	{
		GM_setValue('ncom_gecheckt', gecheckt);
		location.reload(true);
	}
	else
	{
		alert('Selecteer eerst een of meerdere opdrachten.');
	}
}

function InvertSelection()
{
	var x = 0;
	var xelements = document.getElementsByName('oef');
	
	while (xelements[x])
	{
		xelements[x].click();
		x++;
	}
}

function dbLeesData(Mode, User, Pass, Data, ExId)
{
	GM_xmlhttpRequest (
	{
		method: "POST",
		url: Server + "/db.php",
		data: "mode=" + Mode + "&sender=" + User + "&sender_password=" + Pass + "&ex_id=" + ExId + "&data=" + Data,
	  
		headers:
		{
			"Content-Type": "application/x-www-form-urlencoded"
		},
	  
		onload: function(response)
		{	  
			var resp = response.responseText;
		
			switch (Mode)
			{
				case "issaved":
				
					if (resp == "SAVED")
					{
						if ($('aap-' + ExId))
						{
							$('aap-' + ExId).innerHTML += "&nbsp;<img src='http://famfamfam.com/lab/icons/silk/icons/database_save.png' alt='Opgeslagen' title='Opgeslagen in database'/>";
						}
					}
					
					break;
			
				case "readex":
				
					if (resp != "" && resp != "LOGIN_ERR" && resp != "EXID_ERR" && resp != "NO_OR_INVALID_MODE_ERR")
					{
						var vragen = resp.split('|%|');
						var count = 0;
						
						for (var i = 0; i < vragen.length; i++)
						{
							var bits = vragen[i].split('<|>');
							var xvraag = bits[0];
							var xantwoord = bits[1];
							
							if (!IsAntwoordBekend(xvraag))
							{
								GM_setValue('ncom_data', GM_getValue('ncom_data', '') + '|%|' + xvraag + '<|>' + xantwoord);
							}
							
							count++;
						}
						
						if (count >= 20 && GM_getValue('ncom_opgeslagenoef', '').indexOf(ExId) == -1)
						{
							GM_setValue('ncom_opgeslagenoef', GM_getValue('ncom_opgeslagenoef', '') + ';' + ExId);
						}
					}
					
					dbLeesKlaar = true;
					break;
			
				case "checklogin":
		
					switch (resp)
					{
						case "OK":
						
							$('db-status').innerHTML = "<span style='color: darkgreen;'>OK - database gegevens kloppen. Je neemt nu deel aan het database systeem.</span>";
							break;

						case "BLOCKED":
						
							$('db-status').innerHTML = "<span style='color: darkred;'>Deze account is geblokkeerd.</span>";
							break;
							
						case "NOTOK":
						default:
						
							$('db-status').innerHTML = "<span style='color: darkred;'>Login fout. Controleer gebruikersnaam/wachtwoord.</span>";
							break;
					}
					
					break;		
			}
		}
	});	
}

function dbSendData(ExId, Mode, Data, User, Pass)
{
	GM_xmlhttpRequest (
	{
		method: "POST",
		url: Server + "/db.php",
		data: "mode=" + Mode + "&sender=" + User + "&sender_password=" + Pass + "&ex_id=" + ExId + "&data=" + Data,
	  
		headers:
		{
			"Content-Type": "application/x-www-form-urlencoded"
		},
	  
		onload: function(response)
		{	  
			var ResponseData = response.responseText;
			
			switch (Mode)
			{
				case "submitex":

					dbSchrijfKlaar = true;
					break;
			}
		} 
	});		
}

function ValideerDbLees()
{
	if (!dbLeesKlaar)
	{
		dbFails++;
		
		if (dbFails >= 5)
		{
			// 5x gefaald, we geven het op
			$('continueItem').click();
			return;
		}
		
		window.setTimeout(ValideerDbLees, 1000);
		return;
	}
	
	$('continueItem').click();
}

function ValideerDbSchrijf()
{
	if (!dbSchrijfKlaar)
	{
		dbFails++;
		
		if (dbFails >= 5)
		{
			// 5x gefaald, we geven het op
			document.location = $('continueItem').href;
			return;
		}
		
		window.setTimeout(ValideerDbSchrijf, 1000);
		return;
	}
	
	document.location = $('continueItem').href;
}

/*************************************************************************************************************/

GM_setValue('ncom_update_alerts', false);
//CheckUpdates();

/*************************************************************************************************************/

vraagnummer = parseInt(PakStukje(document.body.innerHTML, "Vraag", "van").replace("Vraag", ""));

if (vraagnummer == 1)
{
    BouwFouten();
}

if (!Fouten[0])
{
    if (GM_getValue("ncom_fouten"))
	{
        Fouten = GM_getValue("ncom_fouten", Math.random * 20).split(",");
    }
    else
	{
        BouwFouten();
    }
}

if (Fouten.indexOf(vraagnummer) != -1)
{
    doen = false;
}
else 
{
    doen = true;
}

/*************************************************************************************************************/

if ($('breadcrumbs'))
{
	$('breadcrumbs').innerHTML = "<a class='first' href='http://nederscript.blogspot.com/'><b>Nederscript</b> Versie " + ScriptVersie + "</a>";
	$('breadcrumbs').innerHTML += "<a href='http://www.nedercomweb.nl/2008/index.php/nederscript/opties'><b>Opties</b></a>";
	
	if (GM_getValue('ncom_server_versie', 0) > Versie2Int(ScriptVersie))
	{
		$('breadcrumbs').innerHTML += "<a href='" + Server + "/nedercom.user.js'><span style='color: darkred;'>Update beschikbaar!</span></a>";
	}
	
	if (GM_getValue('ncom_announce', '') != "")
	{
		$('breadcrumbs').innerHTML += "<span style='border-left: 1px solid; padding-left: 5px;'>Mededeling: " + GM_getValue('ncom_announce', '') + "</span>";
	}
}

/*************************************************************************************************************/

if (document.body.innerHTML.indexOf('loginview') > -1)
{
	$('schoolid').value = '24';
}

/*************************************************************************************************************/

function processInput()
{
	var element = this.id;
	var value = this.value;
	
	switch (element)
	{
		case 'db-user':
		
			GM_setValue('ncom_db_user', value);
			
			if (GM_getValue('ncom_db_user', '').length > 0 && GM_getValue('ncom_db_pass', '').length > 0)
			{
				$('db-status').innerHTML = "<i>Bezig met controleren van logingegevens..</i>";		
				dbLeesData('checklogin', GM_getValue('ncom_db_user', ''), GM_getValue('ncom_db_pass', ''), '', 0);
			}
			else
			{
				$('db-status').innerHTML = "<span style='color: darkred;'>Geen gebruikersnaam/wachtwoord ingevoerd!</span>";
			}
			
			break;
			
		case 'db-pass':
		
			GM_setValue('ncom_db_pass', value);
			
			if (GM_getValue('ncom_db_user', '').length > 0 && GM_getValue('ncom_db_pass', '').length > 0)
			{
				$('db-status').innerHTML = "<i>Bezig met controleren van logingegevens..</i>";		
				dbLeesData('checklogin', GM_getValue('ncom_db_user', ''), GM_getValue('ncom_db_pass', ''), '');
			}			
			else
			{
				$('db-status').innerHTML = "<span style='color: darkred;'>Geen gebruikersnaam/wachtwoord ingevoerd!</span>";
			}
			
			break;			
	
		case 'updateom':
		
			if (value == '')
			{
				return;
			}
			
			if (!isInt(value) || value <= 0)
			{
				alert('Waarde moet een cijfer zijn dat hoger dan 0 is.');
				this.value = GM_getValue('ncom_opties_updateom', 5);
				return;
			}
			
			GM_setValue('ncom_opties_updateom', value);			
			break;
			
		case 'zelftoets':
		
			GM_setValue('ncom_opties_zelftoets', this.checked);
			break;
			
		case 'checks':
		
			GM_setValue('ncom_opties_checkboxes', this.checked);
			break;
			
		case 'autostart':
		
			GM_setValue('ncom_opties_autostart', this.checked);
			break;

		case 'aapjesaan':
		
			GM_setValue('ncom_opties_aapjes', this.checked);
			break;			
			
		case 'updates-aan':
		
			GM_setValue('ncom_opties_autoupdate', this.checked);
			break;
	
		case 'foutenmin':
		
			if (value == '')
			{
				return;
			}
		
			if (!isInt(value))
			{
				alert('Waarde moet een cijfer zijn.');
				this.value = GM_getValue('ncom_opties_foutenmin', '0');
				return;
			}
			
			if (parseInt(value) > GM_getValue('ncom_opties_foutenmax', '4'))
			{
				alert('Waarde kan niet groter zijn dan het maximaal aantal fouten.');
				this.value = GM_getValue('ncom_opties_foutenmin', '0');
				return;
			}
			
			GM_setValue('ncom_opties_foutenmin', parseInt(value));
			break;
		
		case 'foutenmax':
		
			if (value == '')
			{
				return;
			}
		
			if (!isInt(value))
			{
				alert('Waarde moet een cijfer zijn.');
				this.value = GM_getValue('ncom_opties_foutenmax', '4');
				return;
			}
			
			if (parseInt(value) > 4)
			{
				alert('Waarde mag niet meer dan 4 zijn.');
				this.value = GM_getValue('ncom_opties_foutenmax', '4');
				return;
			}
			
			if (parseInt(value) < GM_getValue('ncom_opties_foutenmin', '0'))
			{
				alert('Waarde mag niet kleiner dan het minimaal aantal fouten zijn.');
				this.value = GM_getValue('ncom_opties_foutenmax', '4');
				return;			
			}
			
			GM_setValue('ncom_opties_foutenmax', parseInt(value));	
			break;		
	}
}

if (location.href.indexOf('http://www.nedercomweb.nl/2008/index.php/nederscript/opties') > -1)
{
	var updateCheck = "";
	var updateInfo = "Nederscript is up-to-date.";
	var aapjeCheck = "";
	var autostartCheck = "";
	var checkCheck = "";
	var zelftoetsCheck = "";
	var dbStatus = 'Onbekend';
	
	if (GM_getValue('ncom_opties_autoupdate', 'true'))
	{
		updateCheck = "checked";
	}
	
	if (GM_getValue('ncom_opties_aapjes', 'true'))
	{
		aapjeCheck = "checked";
	}	
	
	if (GM_getValue('ncom_opties_autostart', 'true'))
	{
		autostartCheck = "checked";
	}		
	
	if (GM_getValue('ncom_opties_checkboxes', 'true'))
	{
		checkCheck = "checked";
	}	
	
	if (GM_getValue('ncom_opties_zelftoets', 'true'))
	{
		zelftoetsCheck = "checked";
	}
	
	if (GM_getValue('ncom_server_versie', 0) > Versie2Int(ScriptVersie))
	{
		updateInfo = "<a href='" + Server + "/nedercom.user.js'>Er is een nieuwe versie van Nederscript beschikbaar!</a>";
	}
	
	if (GM_getValue('ncom_db_user', '').length > 0 && GM_getValue('ncom_db_pass', '').length > 0)
	{
		dbStatus = "<i>Bezig met controleren van logingegevens..</i>";		
		dbLeesData('checklogin', GM_getValue('ncom_db_user', ''), GM_getValue('ncom_db_pass', ''), '');
	}
	else
	{
		dbStatus = "<span style='color: darkred;'>Geen gebruikersnaam/wachtwoord ingevoerd!</span>";
	}

	document.body.innerHTML = '<style type="text/css" media="screen"><!--@import url( "http://www.nedercomweb.nl/2008/css/sheet.css" );//--></style><div style="width: 800px; margin: 0 auto; border: 1px solid; margin-top: 30px; padding: 15px; background-color: #fff; text-align: left;"><div><div class="content_body"><div class="main_row"><label class="icon"><img style="float: left;" src="data:image/png;base64,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%3D" width="32" height="32" /></label><div class="content"><h2>&nbsp;Nederscript opties</h2><br /><div style="clear: both;"></div><p>Hier kun je een aantal instellingen van Nederscript aanpassen. Zodra je een instelling aanpast, wordt dit meteen automatisch opgeslagen.</p><br /><p><strong><img src="http://famfamfam.com/lab/icons/silk/icons/connect.png" style="vertical-align: middle;"> Algemeen</strong></p><div class="info"><p><input type="checkbox" id="aapjesaan" ' + aapjeCheck + '> Laat zien of een oefening opgeslagen is in hoofdstuk overzicht</p><p><input type="checkbox" id="autostart" ' + autostartCheck + '> Maak automatisch oefeningen die opgeslagen zijn (en onvoldoende/niet gemaakt zijn)</p><p><input type="checkbox" id="checks" ' + checkCheck + '> Laat binnen het hoofdstuk checkboxes zien waarmee er meerdere oefeningen gemaakt kunnen worden</p><p><input type="checkbox" id="zelftoets" ' + zelftoetsCheck + '> Bevestig het maken van de zelftoets</p><p><input type="button" id="masterreset" value="Reset Nederscript"></p></div><br /><p><strong><img src="http://famfamfam.com/lab/icons/silk/icons/application_error.png" style="vertical-align: middle;"> Automatisch fouten maken</strong></p><div class="info"><p><b>Aantal fouten per oefening:</b><br /><input id="foutenmin" type="text" size="3" maxlength="1" value="' + GM_getValue('ncom_opties_foutenmin', '0').toString() + '"> tot <input id="foutenmax" type="text" size="3" maxlength="1" value="' + GM_getValue('ncom_opties_foutenmax', '4') + '"><br /><small>Je kunt maximaal 4 fouten instellen om onvoldoendes te voorkomen.</small></p></div><br /><p><strong><img src="http://famfamfam.com/lab/icons/silk/icons/arrow_refresh.png" style="vertical-align: middle;"> Update-instellingen</strong></p><div class="info"><p><input type="checkbox" id="updates-aan" ' + updateCheck + '> Schakel automatische updates in</p><p>Update elke <input type="text" id="updateom" size="3" maxlength="4" value="' + GM_getValue("ncom_opties_updateom", 5) + '" /> minuten <small>(Let op: Deze instelling tast ook aankondigingen aan!)</small></p><p><input type="button" id="updateknop" value="Check nu voor updates"></p></div><br /><p><strong><img src="http://famfamfam.com/lab/icons/silk/icons/database.png" style="vertical-align: middle;"> Database</strong></p><div class="info"><p>Door deel te nemen aan het database systeem kunnen de antwoorden die Nederscript in moet vullen van te voren worden gedownload, waardoor de oefening dus maar één keer gemaakt hoeft te worden.</p><br /><p>Vul, om deel te nemen aan dit systeem, hier onder je database account gegevens in:</p><br /><p>Username: <input type="text" id="db-user" style="margin-bottom: 5px;" value="' + GM_getValue('ncom_db_user', '') + '"><br />Password: <input type="password" id="db-pass" style="margin-left: 2px;" value="' + GM_getValue('ncom_db_pass', '') + '"></p><br /><p>Nog geen account? <a href="' + Server + '/db-reg.php">Maak er hier een aan.</a></p><br /><p><b>Huidige status:</b> <span id="db-status">' + dbStatus + '</span></p></div><br /><p><strong><img src="http://famfamfam.com/lab/icons/silk/icons/information.png" style="vertical-align: middle;"> Over</strong></p><div class="info"><b>Nederscript</b> Versie ' + ScriptVersie + '<br />Gemaakt door hele aardige mensen.<br /><br /><small>' + updateInfo + '</small><br /><br /><a href="http://nederscript.blogspot.com/">http://nederscript.blogspot.com</a><br /><a href="http://nederscript.blogspot.com/p/gebruiksvoorwaarden.html">Gebruiksvoorwaarden</a><br /><br />	<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="11004269"><input type="image" src="https://www.paypal.com/nl_NL/NL/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal, de veilige en complete manier van online betalen."><img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"></form></td></div><br /><a href="#" onclick="history.back(-1); return false"><b>Ga terug naar Nedercom</b></a></div></div></div></div></div><br />';
	document.title = "Nederscript opties";
	
	$('foutenmin').addEventListener('keyup', processInput, false);
	$('foutenmax').addEventListener('keyup', processInput, false);
	$('updateknop').addEventListener('click', OptiesCheckUpdates, false);
	$('updates-aan').addEventListener('click', processInput, false);
	$('updateom').addEventListener('keyup', processInput, false);
	$('masterreset').addEventListener('click', MasterReset, false);
	$('aapjesaan').addEventListener('click', processInput, false);
	$('autostart').addEventListener('click', processInput, false);
	$('checks').addEventListener('click', processInput, false);
	$('db-user').addEventListener('keyup', processInput, false);
	$('db-pass').addEventListener('keyup', processInput, false);
	$('zelftoets').addEventListener('click', processInput, false);
}
else if (location.href.indexOf('coursemenu/chapter') > -1 || location.href.indexOf('coursemenu/exercise') > -1)
{
	for (var I = 0; I <3; I++)
	{	
		document.body.innerHTML = document.body.innerHTML.replace('<div class="info"', '<div class="info" style="display: none;"');
	}

	if (GM_getValue('ncom_opties_aapjes', 'true'))
	{
		document.body.innerHTML = document.body.innerHTML.replace('<div class="coursemenu_iconfield">score</div>','<div class="coursemenu_iconfield">score</div><div class="coursemenu_iconfield" style="margin-left: 300px;">opgeslagen?</div>');
	}
	
	var linkjes = document.getElementsByTagName('a');
	var i = 0;
	var oefOmTeMaken = new Array();
	var eersteLink;
	
	while (linkjes[i])
	{
		if (linkjes[i].href.indexOf('coursemenu/exercise') > -1)
		{				
			var id = linkjes[i].href.replace('http://www.nedercomweb.nl/2008/index.php/coursemenu/exercise/', '');
			id = parseInt(id);
			
			if (id == -1)
			{
				i++;
				continue;
			}
			
			if (!eersteLink)
			{
				eersteLink = i;
			}
			
			var autostart = false;
			
			if (GM_getValue('ncom_opties_autostart', 'true'))
			{
				autostart = true;
			}
			
			if (GM_getValue('ncom_opties_checkboxes', 'true'))
			{
				autostart = true;
			}			
			
			if (id >= 1 && KentAntwoorden(id) && autostart)
			{
				var stuk = linkjes[i].parentNode.parentNode.innerHTML;
				
				if (stuk.indexOf('icons/resultA0') > -1 || stuk.indexOf('icons/resultA4') > -1 || stuk.indexOf('icons/resultA5') > -1)
				{
					document.location = linkjes[i].href;
					GM_setValue('ncom_laatsteoefening', id);
					return;
				}
			}
			
			if (GM_getValue('ncom_opties_aapjes', 'true'))
			{
				var aapje = document.createElement('div');
				aapje.id = 'aap-' + id;
				aapje.className = 'coursemenu_iconfield';
				aapje.setAttribute('style', 'position: absolute; left: 450px;');
				
				if (id > -2)
				{
					aapje.innerHTML = MaakAapje(KentAntwoorden(id));
					
					if (!KentAntwoorden(id))
					{
						NietOpgeslagen++;
					}
				}
				else
				{
					blij = true;
					
					if (NietOpgeslagen > 0)
					{
						blij = false;
					} 
				
					aapje.innerHTML = MaakAapje(blij);
				}
				
				linkjes[i].parentNode.parentNode.appendChild(aapje);	
			}
			
			if (GM_getValue('ncom_opties_checkboxes', 'true'))
			{
				var check = document.createElement('div');
				check.className = 'coursemenu_iconfield';
				check.setAttribute('style', 'position: absolute; left: 550px; font-weight: normal;');
				
				if (GM_getValue('ncom_gecheckt', '') == '')
				{
					var checkbox = document.createElement('input');
					checkbox.type = 'checkbox';
					checkbox.name = 'oef';
					checkbox.value = id;			
					check.appendChild(checkbox);
				}
				else
				{
					var moetGemaaktWorden = (GM_getValue('ncom_gecheckt', '').indexOf(id) > -1);
					
					check.innerHTML = ((moetGemaaktWorden) ? '<input name="oef" type="checkbox" checked readonly disabled locked>' : '<input name="oef" type="checkbox" readonly disabled locked>');
					
					if (moetGemaaktWorden)
					{
						oefOmTeMaken[oefOmTeMaken.length] = id;
					}
				}
				
				linkjes[i].parentNode.parentNode.appendChild(check);
			}			
			
			linkjes[i].addEventListener('click', StartOefening, false);
			
			if (id >= 0 && GM_getValue('ncom_db_user', '') != '' && GM_getValue('ncom_db_pass') != '')
			{
				dbLeesData('issaved', GM_getValue('ncom_db_user', ''), GM_getValue('ncom_db_pass', ''), '', id)
			}
		}
	
		i++;
	}
	
	if (document.getElementsByName('oef').length > 0)
	{	
		var invertLinkBlock = document.createElement('div');
		invertLinkBlock.setAttribute('style', 'color: #000; text-align: center; position: absolute; top: 58px; left: 530px; font-weight: bold;');			
	
		if (GM_getValue('ncom_opties_checkboxes', 'true') && GM_getValue('ncom_gecheckt', '') == '')
		{
			var knop = document.createElement('div');
			knop.setAttribute('style', 'position: relative; top: 0px; margin-top: -10px; padding-left: 542px;');
			knop.innerHTML = '<input type="button" id="knop" value="Maak">';
			knop.addEventListener('click', MaakCheckOefeningen, false);
			$('content').appendChild(knop);
			
			var invertLink = document.createElement('a');
			invertLink.href = '#';
			invertLink.innerHTML = 'Keer selectie om';
			invertLink.setAttribute('style', 'font-weight: normal; font-size: 80%;');
			invertLinkBlock.appendChild(invertLink);
			
			invertLinkBlock.innerHTML += "<br />";
		}

		invertLinkBlock.innerHTML += "oef maken";
		
		invertLinkBlock.addEventListener('click', InvertSelection, false);			
		linkjes[eersteLink].parentNode.appendChild(invertLinkBlock);			
		//$('content').appendChild(invertLinkBlock);
		
		if (oefOmTeMaken.length > 0)
		{
			var k = 0;
		
			while (oefOmTeMaken[k])
			{
				GM_setValue('ncom_laatsteoefening', oefOmTeMaken[k]);
				GM_setValue('ncom_gecheckt', GM_getValue('ncom_gecheckt', '').replace(';' + oefOmTeMaken[k], ''));	
				
				window.setTimeout("document.location = 'http://www.nedercomweb.nl/2008/index.php/coursemenu/exercise/" + oefOmTeMaken[k] + "';", 1000);
				
				break;
			}
		}
		else if (GM_getValue('ncom_gecheckt', '') != '')
		{
			GM_setValue('ncom_gecheckt', '');
			location.reload(true);
		}
	}
}

/*************************************************************************************************************/

if (document.body.innerHTML.indexOf('Einde oefening') > -1)
{
	if (GM_getValue('ncom_opgeslagenoef', '').indexOf(GM_getValue('ncom_laatsteoefening', '')) == -1)
	{
		GM_setValue('ncom_opgeslagenoef', GM_getValue('ncom_opgeslagenoef', '') + ';' + GM_getValue('ncom_laatsteoefening', ''));
	}
	
	if (GM_getValue('ncom_db_cache', '') != '' && GM_getValue('ncom_db_user', '') != '' && GM_getValue('ncom_db_pass', '') != '' && GM_getValue('ncom_laatsteoefening', '0') != "-2" && GM_getValue('ncom_laatsteoefening', '0') != "-1")
	{
		dbSendData(parseInt(GM_getValue('ncom_laatsteoefening', '0')), 'submitex', GM_getValue('ncom_db_cache', ''), GM_getValue('ncom_db_user', ''), GM_getValue('ncom_db_pass', ''));
		GM_setValue('ncom_db_cache', '');
		
		var dbDivje = document.createElement('div');
		dbDivje.innerHTML = "Bezig met versturen naar database, even geduld..";
		
		$('continueItem').parentNode.appendChild(dbDivje);
		$('continueItem').style.display = 'none';
		
		window.setTimeout(ValideerDbSchrijf, 1000);
	}
	else
	{
		document.location = $('continueItem').href;
	}
}
else if (document.body.innerHTML.indexOf('Zo maak je de oefening') > -1)
{
	GM_setValue('ncom_db_cache', '');

	if (GM_getValue('ncom_laatsteoefening', '') == "-2" && GM_getValue('ncom_opties_zelftoets', true))
	{
		if (!confirm("Let op - je gaat nu de zelftoets maken. Deze mag je niet zonder toestemming van de leraar maken.\n\nWeet je zeker dat je dit wilt doen?"))
		{
			document.location = 'http://www.nedercomweb.nl/2008/index.php/coursemenu/exercise';
			return;
		}
	}
	else if (parseInt(GM_getValue('ncom_laatsteoefening', '')) > 0 && GM_getValue('ncom_opgeslagenoef', '').indexOf(GM_getValue('ncom_laatsteoefening', '')) == -1)
	{
		if (GM_getValue('ncom_db_user', '') != '' && GM_getValue('ncom_db_pass', '') != '')
		{
			dbLeesData('readex', GM_getValue('ncom_db_user', ''), GM_getValue('ncom_db_pass', ''), '', parseInt(GM_getValue('ncom_laatsteoefening', '')));
			
			$('continueItem').style.display = 'none';
			
			var dbDivje = document.createElement('div');
			dbDivje.innerHTML = "Bezig met lezen uit DB, even geduld...";
			$('continueItem').parentNode.appendChild(dbDivje);
			
			window.setTimeout(ValideerDbLees, 1000);
			return;
		}
	}

	$('continueItem').click();
}
else if (location.href.indexOf('exercise_fillin') > -1)
{
	var mode = document.forms[0].elements[0].value;
	var vraag = '';
	
	if (document.body.innerHTML.indexOf('q_maxheight') > -1)
	{
		vraag = $('q_maxheight').innerHTML;
	}
	else
	{
		vraag = PakStukje(document.body.innerHTML, '<div class="question">', '</div>');
	}
	
	vraag = PakStukje(vraag, '<p>', '</p>');
	
	switch (mode)
	{
		case 'selftest': // Zelftoets
		case 'minimalanswer': // Tikfout
		case 'question':
		
			var antwoord = AntwoordOpVraag(vraag);
			
			if (antwoord != undefined && antwoord.indexOf('<strong class="subhead">') > -1)
			{
				GM_setValue('ncom_db_cache', GM_getValue('ncom_db_cache', '') + '|%|' + vraag + '<|>' + antwoord);
			}
			
			if (doen && antwoord != undefined && antwoord.indexOf('<strong class="subhead">') > -1)
			{				
				var mooiAntwoord = antwoord.substring(48);
				mooiAntwoord.replace('</strong>');					
				
				SchrijfHulp(antwoord);
					
				if (document.body.innerHTML.indexOf('<input id="answer"') > -1)
				{				
					$('answer').value = mooiAntwoord;
				}
				else if (document.body.innerHTML.indexOf('exercise_mc') > -1)
				{
					for (j = 2; j < document.forms[0].elements.length; j++)
					{
						if (document.forms[0].elements[j].value == mooiAntwoord)
						{
							document.forms[0].elements[j].click();
						}
					}
				}	
			}
			else
			{
				if (antwoord == undefined)
				{
					SchrijfHulp('<i>Sorry, het antwoord op deze vraag is nog onbekend...</i>');
				}
				else
				{
					SchrijfHulp('Deze vraag wordt bewust fout ingevuld.');
				}
				
				if (document.body.innerHTML.indexOf('<input id="answer"') > -1)
				{
					$('answer').value = IkWeetHetNiet(8); // om minimalanswer te voorkomen en dat de zelftoets vast loopt
				}
				else if (mode == 'selftest' && document.body.innerHTML.indexOf('exercise_mc') > -1)
				{
					if (antwoord == undefined)
					{
						document.forms[0].elements[2].click(); // om te voorkomen dat de zelftoets vastloopt
					}
					else
					{
						var mooiAntwoord = antwoord.substring(48);
						mooiAntwoord.replace('</strong>');	
					
						if (mooiAntwoord == "A")
						{
							document.forms[0].elements[3].click();
						}
						else
						{
							document.forms[0].elements[2].click();
						}
					}
				}
			}
			
			document.forms[0].submit();			
			break;
	
		case 'answer':
			
			var antwoord = PakStukje(document.body.innerHTML, '<div class="question_result', '</div>');
			antwoord = PakStukje(antwoord, '<strong class="subhead">', '</strong>');
			
			if (!IsAntwoordBekend(vraag) && antwoord.indexOf('GOED') == -1)
			{
				GM_setValue('ncom_data', GM_getValue('ncom_data', '') + '|%|' + vraag + '<|>' + antwoord);
				GM_setValue('ncom_db_cache', GM_getValue('ncom_db_cache', '') + '|%|' + vraag + '<|>' + antwoord);
				
				document.body.innerHTML = document.body.innerHTML.replace('<strong class="head">FOUT</strong>', '<strong class="head">Antwoord opgeslagen!</strong>');
				document.body.innerHTML = document.body.innerHTML.replace('result_incorrect', 'result_correct');
				
			}
			
			document.forms[0].submit();	
			break;
			
		case 'ok': // Melding
		
			document.forms[0].submit();	
			break;
			
		case 'diagnosis': // Diag. toets
		
			break;
			
		default:
		
			alert('(Nederscript) Onbekende pagemode: "' + mode + '"');
			break;
	}
}

/*************************************************************************************************************/