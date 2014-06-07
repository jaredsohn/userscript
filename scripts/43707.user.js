// ==UserScript==
// @name           Scavenger Hunt
// @namespace      ScavengerHunt
// @description    Auto finds stuff on the Scavenger Hunt game on facebook.
// @include        http://apps.*facebook.com/scavenge/*
// ==/UserScript==


var SUC_script_num = 43707; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


ScavengerHunt={

GetItem:function() {
	var divs=document.body.getElementsByTagName("a");
	var retrieveRe=new RegExp('Retrieve.*Item','i');
	for(var d=0; d<divs.length; d++) {
		var div=divs[d];
		var pdiv=div;
		var hidden=false;
		var count=0;
		while(pdiv && count<200) {
			if(pdiv.tagName=='BODY') {break; }
			if(pdiv.style.display=='none') {
				hidden=true;
				GM_log('Ignore hidden link:'+div.href);
				break;
			}
			pdiv=pdiv.parentNode;
			count++;
		}
		if((div.href.indexOf("/retrieveitem.php")>=0 || div.href.indexOf("/retrieveanitem.php")>=0)
		&& retrieveRe.exec(div.innerHTML)
		&& !hidden
		) {
			GM_log('click:'+div.href);
			location.href=div.href;
			return true;
		}
	}
	return false;
},
NextPage:function() {
	if(!GM_getValue('Strangers')) {
		document.location.href='peekatstrangers.php';
	} else if(!GM_getValue('Profiles')) {
		document.location.href='profiles.php';
	}
}

};

window.addEventListener("load", function(e) {
	var href=document.location.href;
	var strangers=href.indexOf("/peekatstrangers.php")>=0?true:false;
	var profiles=href.indexOf("/profiles.php")>=0?true:false;
	if(profiles || strangers) {
		var done=0;
		if(!ScavengerHunt.GetItem()) {
			done=1;
		}
		if(strangers) {
			GM_setValue('Strangers',done);
		}
		if(profiles) {
			GM_setValue('Profiles',done);
		}
		if(GM_getValue('Strangers') && GM_getValue('Profiles')) {
			GM_log('waiting');
			GM_setValue('Profiles',0);
			GM_setValue('Strangers',0);
			window.setTimeout(function() {
				window.history.go(0);
			},1000*60*10);
		} else {
			ScavengerHunt.NextPage();
		}
	} else if(href.indexOf("/retrieveitem.php")>=0) {
		ScavengerHunt.NextPage();
	}
},false);
