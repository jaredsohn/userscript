// ==UserScript==
// @name           EZService Record Username Password
// @namespace      marcoratto
// @description    Save Username Password of EZService
// @version        0.4
// @date           2013-11-18
// @namespace      marcoratto
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include        https://ezservice.italycsc.com/arsys/shared/login.jsp*
// @include        https://ezservice.globalvalue.it/arsys/shared/login.jsp*
// ==/UserScript==

const DEBUG = true;

var SUC_script_num = 63118; // Change this to the number given to the script by userscripts.org (check the address bar)

try {

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

	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'EZService Record Username Password') + ' - Manual Update Check', function()

	{

		updateCheck(true);

	});

	debug("Check for update...");

	updateCheck(false);

} catch(err) {
	debug(err.description);
}

function main() {	
    debug("main():start");
    var flaggToAdd = true;
	var items = document.body.getElementsByTagName('input');
	for(i in items) {
		var item = items[i];
		if ((item.name == 'login') && (flaggToAdd == true)) {            
			debug("main():item login found.");
            flaggToAdd = false;
			var workaround = generateButtonWorkaround(item);
			item.parentNode.insertBefore(workaround, item.nextSibling);
			
			var buttonDeleteWorkaroundPassword = generateButtonDeleteWorkaroundPassword(workaround);
			workaround.parentNode.insertBefore(buttonDeleteWorkaroundPassword, workaround.nextSibling);
		}
	}
	debug("main():end");
}

function generateButtonWorkaround(item) {
	debug("generate():start");
	
	var helper = document.createElement('input');
	helper.type = 'button';
	helper.value = 'Workaround';
	helper.addEventListener('click', function(event) {
	
	var usernameObj = document.getElementById("username-id");
	var passwordObj = document.getElementById("pwd-id");	
	
	var user = GM_getValue('EzService_User');
	var pass = GM_getValue('EzService_Pass');
	
	debug("generate():user=" + user);
	debug("generate():pass=" + pass);
	
	if ((user == undefined) || (pass == undefined) || (pass == "")) {
		if (user == undefined) {
			user = "";
		}
		if (pass == undefined) {
			pass = "";
		}
		user = prompt("Enter the username:", user);
		pass = prompt("Enter the password:", pass);
		
		// For changing:
		// about:config
		// greasemonkey.scriptvals.marcoratto/RecordUsernamePassword
		GM_setValue('EzService_User', user);
		GM_setValue('EzService_Pass', pass);
	}
	
	usernameObj.value = user;
	passwordObj.value = pass;
	unsafeWindow.doLogin();
	
	}, false);

	debug("generate():end");	
	return helper;
}

function generateButtonDeleteWorkaroundPassword(item) {
	debug("generateButtonDeleteWorkaroundPassword(): start");
	
	var delete_pwd = document.createElement('input');
	delete_pwd.type = 'button';
	delete_pwd.value = 'Delete Password';
	delete_pwd.addEventListener('click', function(event) {
	
	GM_setValue('EzService_Pass', "");
	alert('Password deleted!');
	
	}, false);
		
	debug("generateButtonDeleteWorkaroundPassword(): end");	
	return delete_pwd;
}

/**
 * Displays the error message if DEBUG is set to true.
 * Uses GM_log where available or alerts otherwise.
 * @param {String} message The error message to display.
 * @see DEBUG
 * @see ERROR
 */
function debug(message){
    if (DEBUG) {
      if (typeof GM_log == 'function') {
         GM_log(message); //greasemonkey specific function
      } else {
         alert(message);
		}
   }   
}

window.addEventListener("load", main, false);
