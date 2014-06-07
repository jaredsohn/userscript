// ==UserScript==
// @name           Twitcleaner Un-Follow
// @namespace      http://thetwitcleaner.com/greasemonkey.php
// @description    Allows you to load your TwitCleaner report while on Twitter.com to then process the results
// @include        http*://twitter.com/*
// @date           2010-08-14
// @version        0.1
// @GM_version     0.8.20100408.6
// ==/UserScript==

GM_TCUF = {
	url : null,
	user : null,
	processConfirm : false, 

	init : function(){
        	alert("Grease Monkey Hello World!");
		// Register Command
		GM_registerMenuCommand("TCUF: Load TwitCleaner Report", GM_TCUF.loadReport);

		// Find out which twitter user we are current logged in as
		GM_TCUF.user = document.getElementById('me_name').innerHTML;
	},

	loadReport : function(){
		// Load the report data from http://thetwitcleaner.com/reports/show.php?user=[user]&type=xml
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://thetwitcleaner.com/reports/show.php?user="+GM_TCUF.user+"&type=xml",
			headers:{
				"User-Agent":"Mozilla/5.0",
				"Accept":"text/xml"
			},
			onload:GM_TCUF.handle
		});

	},

	handle : function(response){
		var r = eval("("+response.responseText+")");

		if( r.results && r.results.length > 0 ){
			alert('Report Loaded');
		} else {
			alert('Report Load Failed');
		}
	}

};


// Initialize
GM_TCUF.init();

//Check for updates
var SUC_script_num = 83652; // Change this to the number given to the script by userscripts.org (check the address bar)

try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand('TSR: Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
