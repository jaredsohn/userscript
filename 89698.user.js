// ==UserScript==
// @name           Hydras Click Exchange
// @namespace      Brix
// @include        *
// @exclude       *google*
// ==/UserScript==

var url = window.location.href;
var sound_path = "http://www.ringelkater.de/Sounds/2geraeusche_gegenst/beeper_alarm.wav";

var critical_credits = 100;


if (GM_getValue('login', 'none') == 'none')								// LoginStatus festlegen
{
	var login = confirm("Auto-Login?");
	if (login)
	{
		GM_setValue('login', 1);
	}
	else
	{
		GM_setValue('login', 0);
	}
}

if (GM_getValue('login', 0) == 1)										// Erstes Login
{
		var username = GM_getValue('username', 'none');
		var password = GM_getValue('password', 'none');

		while (username == "" || username == 'none')
		{
			var username = prompt("Your username:");
			GM_setValue('username', username);
		}

		while (password == "" || password == 'none')
		{
			var password = prompt("Your password:");
			GM_setValue('password', password);
			$("login").value = username;
			$("passwd").value = password;
			document.forms[0].submit();
		}
		GM_setValue('login', 2);
}

if (url.indexOf("idarionis.com:9500/index.php") > -1 || url.indexOf("217.197.73.122:9500") > -1)
{
	var error = document.evaluate("//p[contains(@class,'NoLinksCont')]", document, null,7, null).snapshotItem(0);
	if (error)
	{
		error = error.innerHTML;
	}

	// Login
	if (GM_getValue('login', 0) == 2)
	{
		if ($("login") && $("passwd"))
		{
			$("login").value = GM_getValue('username');
			$("passwd").value = GM_getValue('password');
			document.forms[0].submit();
		}
	}
	if(!$("login") && !$("passwd"))
	{
		// Linklimit erreicht
		if (error && error.indexOf("reset") > -1)
		{
			//if (GM_getValue('end', 0) == 1)
			//{
				alert("All work done!");
			//}
		}
		// Noch keine neuen Links geholt
		else if (url.indexOf("Con&Cid") > -1)
		{
			setTimeout(closeTab, 10000, 'bar');
		}
		else if (error && error.indexOf("refreshes") > -1)
		{
			error = error.split('[');
			error = error[1].split(']');
			error = error[0];
			setTimeout(refresh, (parseInt(error)*1000)+2, 'bar');
		}
		// Datenbank leer
		else if (error && error.indexOf("database") > -1)
		{
			GM_openInTab(sound_path);
		}
		// Alles OK, Links aufrufen
		else
		{
			var counter = 0;
			var is_credits = document.evaluate("//p[contains(@class,'Kredyt')]", document, null,7, null).snapshotItem(0);
			
			if (is_credits)
			{
				is_credits = is_credits.innerHTML;
				if (parseInt(is_credits) <= critical_credits)
				{
					GM_openInTab(sound_path);
				}
					
				var all_links = window.document.links;
					
				for (i=0;i<= all_links.length-1;i++)
				{
					var link = all_links[i].getAttribute("href");
					if (link.indexOf("Con&Cid") > -1)
					{
						GM_openInTab(all_links[i]);
						counter++;
					}
				}
				//if (counter == 25)
				//{
				setTimeout(refresh, 8000, 'bar');
				//}
			}
			else
			{
				GM_registerMenuCommand("Reset Logininformation", reset_login, "a", "control");
				GM_registerMenuCommand("Start ALL", start_all);
				GM_registerMenuCommand("Start MANUAL MAX", start_max);
			}
		}
	}
}
else
{
	setTimeout(closeTab, 5000, 'bar');
}


function start_max()
{
	GM_openInTab("http://www.idarionis.com:9500/index.php?ak=Lin&MyExchangeTryb=Max");
}

function start_all()
{
	GM_openInTab("http://www.idarionis.com:9500/index.php?ak=Lin&MyExchangeTryb=Max");
	GM_openInTab("http://www.idarionis.com:9500/index.php?ak=Lin&MyExchangeTryb=Act");
	GM_openInTab("http://www.idarionis.com:9500/index.php?ak=Lin&MyExchangeTryb=Adv");
	GM_openInTab("http://www.idarionis.com:9500/index.php?ak=Lin&MyExchangeTryb=Var");
}

function reset_login(){    GM_deleteValue('login'); GM_deleteValue('username'); GM_deleteValue('password');    }	// Logindaten resetten
function refresh(){    location.reload();	} 								// Seite neuladen
