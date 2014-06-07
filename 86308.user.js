// ==UserScript==
// @name           Schulterglatze Truppen/Spielersuche löschen
// @namespace      Schulterglatze Truppen/Spielersuche löschen
// @include        http://forum.schulterglatze.de/*
// ==/UserScript==




var SUC_script_num = 86308; // Change this to the number given to the script by userscripts.org (check the address bar)

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
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
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
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}



// ab hier hash auslesen
y = 0;

xmlHttp = new XMLHttpRequest();
if (xmlHttp) {
    xmlHttp.open('GET', 'http://forum.schulterglatze.de/index.php', true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            hallo = (xmlHttp.responseText);
			//alert(hallo);
						
							var temp = new Array();
							temp = hallo.split('</a>');
							//alert(temp[633]);
							//
						
							for (i = 0; i < temp . length; i++) {
								
								if (temp[i].match(/Alle Foren als gelesen markieren/)) {
								   var hash = temp[i].match(/hash=.{8}&/);
									//alert(temp[i]);
									// bis hier hash auslesen 
	  
  

										var link = document.evaluate('.//a[@href][. = "Ungelesene Beiträge"]',document.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
										if (link != null) {
													
													while ( y != 1 ) {
																		y = 1;
																		var eins = 'viewforum.php?';
																		//alert(hash);
																		var Spiele = document.createElement('a');
																		Spiele.href = eins + hash + 'f=108&mark=topics';
																		Spiele.appendChild(document.createTextNode('Forenspiele leeren'));
																		link.parentNode.insertBefore(Spiele, link.nextSibling);

																		var Truppe = document.createElement('a');
																		Truppe.href = eins + hash + 'f=120&mark=topics';
																		Truppe.appendChild(document.createTextNode('Truppensuche leeren'));
																		link.parentNode.insertBefore(Truppe, link.nextSibling);

																		var Spieler = document.createElement('a');
																		Spieler.href = eins + hash + 'f=121&mark=topics';
																		Spieler.appendChild(document.createTextNode('Spielersuche leeren'));
																		link.parentNode.insertBefore(Spieler, link.nextSibling);
																		
																		var trenner = document.createTextNode(" | ");
																		Truppe.parentNode.insertBefore(trenner, link.nextSibling);
																		var trenner2 = document.createTextNode(" | ");
																		Truppe.parentNode.insertBefore(trenner2, Spieler.nextSibling);
																		var trenner2 = document.createTextNode(" | ");
																		Truppe.parentNode.insertBefore(trenner2, Truppe.nextSibling);
																		
																		
																	}
										}
								}
							}	
		}
    };
    xmlHttp.send(null);
}
