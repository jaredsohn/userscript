// ==UserScript==
// @name           check for updates easily
//
// @namespace      sebastian-lang.net
// @description    For script authors - Allow users to easily check for updates automatically and/or manually.
// @include		   *://*
//
// @author         Sebastian-Lang.net
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.5.3
// @lastupdated    2010-12-06
//
// @history        complete changelog can be found at https://userscripts.org/scripts/show/91984
//
// ==/UserScript==
// Paste all lines below into your script(s) /////////////////////////////////////////////////////////////////////////////////
//-------------------------------------------------------------------------------------------------------------------
// Start of "check for updates easily"
//-------------------------------------------------------------------------------------------------------------------
//	License: "check for updates easily" is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported license
//			 (http://creativecommons.org/licenses/by-sa/3.0/) by Sebastian Lang (http://sebastian-lang.net/).

//	Description: Paste this script (without the ==UserScript== block) into your userscript(s)
//				 to allow users to easily check for script updates, manually and/or automatically.

//	More information about this script can be found at https://userscripts.org/scripts/show/91984
//-----------------------------------------------------------------------------------------------------
//	To integrate "check for updates easily" into your script adapt the values of the three variables below,

	var cfue_ScriptHref = 'https://userscripts.org/scripts/show/91984';
	var cfue_msg_UpdateAvailable = 'There is an update available for "check for updates easily"! Do you want to install it now?';
	var cfue_msg_UpdateSuccessful = '"check for updates easily" has been successfully updated.';

//	... and paste the line below into the meta block of your script (adapt the path to fit with your script)

// @include		   https://userscripts.org/scripts/show/91984

//	... that`s it!
//-----------------------------------------------------------------------------------------------------

	if (!GM_getValue('cfue_Enable')) {
		GM_setValue('cfue_Enable','yes');
	};
	var cfue_Enable = GM_getValue('cfue_Enable');

	if (cfue_Enable == 'yes'){
		var cfue_Now = new Date();
		var cfue_Today = cfue_Now.getDay();

		if (!GM_getValue('cfue_LastCheck')) {
			GM_setValue('cfue_LastCheck',cfue_Today);
		};

		if (cfue_Today != GM_getValue('cfue_LastCheck') || !GM_getValue('cfue_ScriptVersion')){
			var cfue_IFrame = document.createElement('iframe');
				cfue_IFrame.src = cfue_ScriptHref;
				cfue_IFrame.name = 'cfue_IFrame';
				cfue_IFrame.id = 'cfue_IFrame';
				cfue_IFrame.style.display = 'none';
				cfue_IFrame.style.margin = '0 auto';
				cfue_IFrame.style.width = '1000px';
				cfue_IFrame.style.height = '1000px';
				document.body.appendChild(cfue_IFrame);

			if (window.location.href == cfue_ScriptHref) {

				if (!GM_getValue('cfue_ScriptVersion')){
					GM_setValue('cfue_ScriptVersion',document.getElementById("summary").childNodes[8].nodeValue);
				};
				var cfue_ScriptVersion = GM_getValue('cfue_ScriptVersion');

				if (document.getElementById("summary").childNodes[8].nodeValue != cfue_ScriptVersion){
					var cfue_ScriptVersion = document.getElementById("summary").childNodes[8].nodeValue;
					var cfue_ScriptDownloadHref = cfue_ScriptHref.replace(/show/,'source') + '.user.js';
					var cfue_RequestToInstall = confirm(cfue_msg_UpdateAvailable);
					if (cfue_RequestToInstall == true){
						open(cfue_ScriptDownloadHref,'Update');
						GM_setValue('cfue_ScriptVersion',cfue_ScriptVersion);
					};	
				};
				GM_setValue('cfue_LastCheck',cfue_Today);
			};
		};

		if (window.location.href != cfue_ScriptHref) {
			var cfue_ScriptVersion = GM_getValue('cfue_ScriptVersion');
		
			if (!GM_getValue('cfue_ScriptVersionCheck')) {
				GM_setValue('cfue_ScriptVersionCheck',cfue_ScriptVersion);
			};
			var cfue_ScriptVersionCheck = GM_getValue('cfue_ScriptVersionCheck');

			if (cfue_ScriptVersionCheck != cfue_ScriptVersion){
				alert(cfue_msg_UpdateSuccessful);
				GM_setValue('cfue_ScriptVersionCheck',cfue_ScriptVersion);
			};
		};	
	};

//-------------------------------------------------------------------------------------------------------------------
// End of "check for updates easily"
//-------------------------------------------------------------------------------------------------------------------