// ==UserScript==
// @name           G+ Ergonomy+
// @namespace      gplus_ergonomyplus
// @description    Change some ergonomy issues in Google+
// @include        http://plus.google.com/*
// @include        https://plus.google.com/*
// ==/UserScript==

// Developped by Sebastien Bartoli

// Thanks to Romeni Webdesign ( http://userscripts.org/users/289850 ) for its Beautify G+ Script ( http://userscripts.org/scripts/show/105879 ) 
// on which the style part is based

// Thanks to Jarett ( http://userscripts.org/users/jarett ) for its Script Update Checker script ( http://userscripts.org/scripts/show/20145 )
// which is used for the update part.




var SUC_script_num = 105957; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
style.type = 'text/css';
style.innerHTML = ".a-Eo-T {left: 0px !important; position: fixed !important; top: 0px !important; width: 100% !important;} .a-U-T {margin-top: 30px !important;}";

function ChangeTitle(){
	
	var notifs_nb = document.getElementById('gbi1').innerHTML ;
	if( notifs_nb == 0 || notifs_nb == "&nbsp;" || notifs_nb == null ){
		document.title = 'Google+' ;
	} else {
		document.title = 'Google+ (' + notifs_nb + ')' ;
		if( popup ){
			popup.show();
			setTimeout(function(){
				popup.cancel();
			}, '10000');
		}
	}	
}

var icon  = 'http://www.google.com/mobile/images/mgc3/plus48.png';
var title = 'New Notification from Google+';
var body   = 'Someone did something on your Google+ account, you should check it out';
var popup = window.webkitNotifications.createNotification(icon, title, body);

window.setInterval(function(){ ChangeTitle(); }, '10000');
//document.getElementById('gbi1').addEventListener('change', ChangeTitle, false);
//document.getElementById('gbi1').onchange(ChangeTitle);


if (!window.webkitNotifications){
	alert('Sorry , your browser does not support desktop notification. Try Google Chrome.');
} else {
	if (window.webkitNotifications.checkPermission() > 0) {
		RequestPermission(notification);
	}
}

function RequestPermission (callback){
	window.webkitNotifications.requestPermission(callback);
}

