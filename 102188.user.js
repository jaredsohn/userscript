// ==UserScript==
// @name          FarmTownGift AutoClose Farmtown Gifts Links
// @namespace     http://userscripts.org/users/327989
// @author        Titou le lapinou (edited by mashadow)
// @description	  Close the gift page so you can accept more gifts faster and easier from http://www.FarmTownGift.co.cc . /!\ Close ALL Farmtown Gifts pages from Facebook. 
// @version       1.0.1
// --------------------------------------------------------------[ FF ]-
// @include       http://apps.facebook.com/farmtown/play/?type=*
// @include       http://apps.facebook.com/farmtown/play/?rcid=gift&type=*
// @include       http://apps.facebook.com/farmtown/?cid=*
// @include       http://www.FarmTownGift.*
// ----------------------------------------------------------[ CHROME ]-
// @matches       http://apps.facebook.com/farmtown/play/?type=*
// @matches       http://apps.facebook.com/farmtown/play/?rcid=gift&type=*
// @matches       http://apps.facebook.com/farmtown/?cid=*
// @matches       http://www.FarmTownGift.*
// @run_at        document_end
// ==/UserScript==

if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}
GM_log("Start Using FarmTownGift Script");

var SUC_script_num = 102188; 
function updateCheck(forced)
{
	if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 3600000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
	{
		try
		{
			GM_log("CALL XMLHttpRequest Update");
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
								//GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
								GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js');
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
GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'FarmTownGift AutoClose Farmtown Gifts Links') + ' - Manual Update Check', function()
{
	updateCheck(true);
});
	
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome');
var ref = document.URL;
ref = ref.toLowerCase();
GM_log("URL ="+ref);
try
{

	var resultit = ref.indexOf("www.FarmTownGift.");
	GM_log("RES1 : Contient 'www.FarmTownGift.' ? ="+resultit);
	if( resultit != "-1"){
		GM_log("RES1 : Oui!");
		if(is_chrome == "-1"){
			updateCheck(false);
		}else{
			GM_log("Chrome Detected ! No Update possible");
		}
		
	}else{
		GM_log("RES1 : Non!");
		var resultit2 = ref.indexOf("&farmtown-links-autoclose=1");
		GM_log("RES2 : Contient '&farmtown-links-autoclose=1' ? ="+resultit2);
		if( resultit2 != "-1"){
			GM_log("RES1 : Oui!");
			window.open('', '_self', '');
			window.close();
			GM_log("Fermeture de la page");
		}else{
			GM_log("RES1 : Non!");
			if(is_chrome == "-1"){
				GM_log("CALL XMLHttpRequest Send");
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://lelien='+encodeURIComponent(document.URL),
					headers: {
						'User-agent': 'Greasemonkey+Farmtown-Links.Com','Cache-Control': 'no-cache'
					},
					onload: function(responseDetails) {
				  // send ! thank's - Chrome NOK - FF OK - Opera ?
					}
				});
			}else{
				GM_log("Chrome Detected ! No Send possible");
			}
			window.open('', '_self', '');
			window.close();
			GM_log("Fermeture de la page");
			
		}
	}
}
catch (err)
{
console.log(err);
}