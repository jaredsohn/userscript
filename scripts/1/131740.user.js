// ==UserScript==
// @name           Jappy Green Garden - InfoSystem
// @namespace      jappy
// @developer      Benjamin Buhler - www.freiken-douhl.de
// @version        0.5.3
// @description    Benachrichtigt bei fertigen Ernten. Fuer den optimalen Support wird zusaetzlich das Mozilla Firefox AddOn "HTML Desktop Notifications" (https://addons.mozilla.org/en-US/firefox/addon/html-notifications/) empfohlen.
// @include        http://www.jappy.*/user/*/garden/garden
// ==/UserScript==

var originalTitel= unsafeWindow.document.title;
var notification, window_focus, blink=false, readyBefore=0;
var desktop_notification_enabled= !(typeof window.webkitNotifications == "undefined");
var sett={}, itemNames=[];

 // Chrome given greasemonkey function fix
	if(!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1))
	{
	    this.GM_getValue= function(key,def)
	    {
	        return localStorage[key] || def;
	    };
	    this.GM_setValue= function(key,value)
	    {
	        return localStorage[key]=value;
	    };
	    this.GM_deleteValue= function(key)
	    {
	        return delete localStorage[key];
	    };
	}

 // Settings
	GM_addStyle("#game_notify_setttings label {position:absolute;margin-left:22px;margin-top:-17px} #game_notify_setttings input {display:block;margin-top:4px}");
	var gn_settings= document.createElement('div');
		gn_settings.id= "game_notify_setttings";
		gn_settings.className="caretakerHelp";
		gn_settings.style.position= 'absolute';
		gn_settings.style.width= '155px';
		gn_settings.style.height= '85px';
		gn_settings.style.right= '115px';
		gn_settings.style.top= '475px';
		gn_settings.style.color= '#333';
		gn_settings.style.backgroundColor= '#EFEFEF';
		gn_settings.style.boxShadow= '0px 0px 5px #666';
		gn_settings.style.zIndex= '99';
		gn_settings.style.cursor= 'default';
		gn_settings.appendChild(document.createTextNode("Benachrichtige mich ..."));
	unsafeWindow.document.getElementById("game").appendChild(gn_settings);
	
	function settingPoint(varName, textString)
	{
		sett[varName]= GM_getValue(varName, false); 
		var chk= document.createElement('input');
			chk.type="checkbox";
			chk.id= "gn_"+varName;
			chk.checked= sett[varName];
			chk.onchange= function(){ sett[varName]= this.checked; GM_setValue(varName, this.checked); };
		gn_settings.appendChild(chk);
		var lbl= document.createElement('label');
			lbl.appendChild( document.createTextNode(textString) );
			lbl.setAttribute('for', "gn_"+varName);
		gn_settings.appendChild(lbl);
	}

	settingPoint('inactiv_win', "nur wenn Tab inaktiv");
	settingPoint('prob_duenger', "bei Dünger-Problemen");
	settingPoint('prob_wasser', "bei Bewässerung-Prob.");

 // Notification-Loop
	with (unsafeWindow)
	{
		window.onblur= function(){ window_focus=false; };
		window.onfocus= function(){ window_focus=true; };
		setInterval(function()
		{
			if(!sett.inactiv_win || (!window_focus && sett.inactiv_win))
			{
				if(itemNames.length==0)
				if(MyGarden.resourceStock)
				{
					var stock= MyGarden.resourceStock;
					for(var i in stock)
					{
						itemNames[ stock[i].icon.match(/\/([a-zA-Z]+).png/i)[1] ]= stock[i].name;
					}
				}
			 // Ernte
				var ranges= document.getElementsByClassName("rangeG3");
				var ready= 0, lastImage= false;
				for( var i= 0, len= ranges.length; i < len; i++)
				{
					if(ranges[i].parentNode.parentNode.style.backgroundImage.search(/B\.png/) != -1)
					{
						ready++;
						lastImage= ranges[i].parentNode.parentNode.parentNode.previousSibling.childNodes[1].firstChild.firstChild.src;
					}
				}
			 // Duenger
				var duenger= document.getElementsByClassName('iconLackOfDung');
				var dung_anz=sett.prob_duenger? duenger.length : 0;
				if (dung_anz>0)
				var dung_lastImage= duenger[dung_anz-1].parentNode.parentNode.parentNode.previousSibling.childNodes[1].firstChild.firstChild.src;
			 // Wasser
				var water= document.getElementsByClassName('iconLackOfWater');
				var water_anz= sett.prob_wasser? water.length : 0;
				if (water_anz>0)
				var water_lastImage= water[water_anz-1].parentNode.parentNode.parentNode.previousSibling.childNodes[1].firstChild.firstChild.src;
			 // Meldungen
				var gesamt= ready + dung_anz + water_anz;
				if(gesamt>0)
				{
					blink= !blink;
					document.title = (blink?'{'+gesamt+'} ':'') + originalTitel;
					if(gesamt>readyBefore)
					if(ready>0)
					{
						if(desktop_notification_enabled)
						{
							if(sett.use_notifications)
							{
								notification= window.webkitNotifications.createNotification
								(
									lastImage.replace('.png','_small.png'), "Eine Ernte ist reif!",
									itemNames[ lastImage.match(/\/([a-zA-Z]+).png/i)[1] ] + (ready>1 ? " und "+(ready-1)+" weitere." : "")
								);
								notification.show();
							}
						}
						else if(sett.use_alert)
						{
							alert("Eine Ernte ist reif:\n"+itemNames[ lastImage.match(/\/([a-zA-Z]+).png/i)[1] ] + (ready>1 ? " und "+(ready-1)+" weitere." : ""));
						}
					}
					else if(dung_anz>0)
					{
						if(desktop_notification_enabled)
						{
							if(sett.use_notifications)
							{
								notification= window.webkitNotifications.createNotification
								(
									dung_lastImage.replace('.png','_small.png'), "Ein Feld benötigt Dünger!",
									itemNames[ dung_lastImage.match(/\/([a-zA-Z]+).png/i)[1] ] + (dung_anz>1 ? " und "+(dung_anz-1)+" weitere." : "")
								);
								notification.show();
							}
						}
						else if(sett.use_alert)
						{
							alert("Ein Feld benötigt Dünger:\n"+itemNames[ dung_lastImage.match(/\/([a-zA-Z]+).png/i)[1] ] + (dung_anz>1 ? " und "+(dung_anz-1)+" weitere." : ""));
						}
					}
					else if(water_anz>0)
					{
						if(desktop_notification_enabled)
						{
							if(sett.use_notifications)
							{
								notification= window.webkitNotifications.createNotification
								(
									water_lastImage.replace('.png','_small.png'), "Ein Feld benötigt Wasser!",
									itemNames[ water_lastImage.match(/\/([a-zA-Z]+).png/i)[1] ] + (water_anz>1 ? " und "+(water_anz-1)+" weitere." : "")
								);
								notification.show();
							}
						}
						else if(sett.use_alert)
						{
							alert("Ein Feld benötigt Wasser:\n"+itemNames[ water_lastImage.match(/\/([a-zA-Z]+).png/i)[1] ] + (water_anz>1 ? " und "+(water_anz-1)+" weitere." : ""));
						}
					}
				}
				else
				{
					document.title = originalTitel;
					if(desktop_notification_enabled && notification)
					{
						notification.close();
					}
				}
				readyBefore= gesamt;
			}
			else
			{
				document.title = originalTitel;
			}
		}, 1000);

		if(!desktop_notification_enabled)
		{
			settingPoint('use_alert', "mit einem PopUp / Alert");
		}
		else
		{
			settingPoint('use_notifications', "mit Desktop PopUp");
			if(window.webkitNotifications.checkPermission() != 0)
			{
			    window.webkitNotifications.requestPermission();
			}
		}
	}