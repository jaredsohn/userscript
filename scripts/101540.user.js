// Ultibot's Chat Misfire Blocker
// Copyright (c) 2011, Ultimater at gmail dot com 
// You can reach me at the above email address if you have inquiries regarding this script
// Released under the GNU General Public License
// http://www.gnu.org/copyleft/gpl.html
// http://www.gnu.org/licenses/gpl.html

// ==UserScript==
// @name	Ultibot's Chat Misfire Blocker
// @description	Prevents common chat misfires proceeded by a backslash, period or if the message is too big.
// @include	http://*.kingdomofloathing.com/lchat.php*
// @include	http://kingdomofloathing.com/lchat.php*
// @include	http://127.0.0.1:*/lchat.php*
// @include	http://*.kingdomofloathing.com/main.php*
// @include	http://kingdomofloathing.com/main.php*
// @include	http://127.0.0.1:*/main.php*
// @namespace	http://ultimater.net/kol/public/namespaces/chatmisfireblocker
// @license	GNU-GPL http://www.gnu.org/licenses/gpl.html
// @version 	1.1
// ==/UserScript==
/*	Notes:
		Inspired by Byung Kim's unfinished "Chat Misfire Stopper" script
		http://userscripts.org/scripts/review/54213

		Compatible with Chris Theron's "Activechat" script
		http://userscripts.org/scripts/show/83477
*/
//=================== Change Log ===================
/* v1.0 - 04/21/2011 - Initial Release */
/* v1.1 - 04/21/2011 - Added support for old or weird Firefox versions or configurations which lack E4X support due to a clannie having issues with some GM scripts*/


//==================== Script Support Checker =====================

if(typeof GM_xmlhttpRequest !='function'){alert("Unsupported Function GM_xmlhttpRequest.\nPlease update your GreaseMonkey version.");}
if(typeof GM_addStyle !='function'){alert("Unsupported Function GM_addStyle.\nPlease update your GreaseMonkey version.");}

//================= Wrap entire script in a try-catch ==================
try
{

//========================= Globals ==========================
scriptInfo={
	version:"1.1",
	id:"101540",
	name:"Ultibot's chat misfire blocker"
};

scriptOptions={
	disableUpdateChecker:false		//set this to true if you don't want your script to check for updates. Alternatively, remove main.php from the UserScript includes.
};

scriptGlobals={
	version:scriptInfo.version,
	name:scriptInfo.name,
	installLink:"http://userscripts.org/scripts/source/"+scriptInfo.id+".user.js",
	downloadPage:"http://userscripts.org/scripts/show/"+scriptInfo.id,
	installLinkMirror:"http://ultimater.net/kol/public/scripts/source/"+scriptInfo.id+".user.js",
	scriptMetaLink:"http://userscripts.org/scripts/source/"+scriptInfo.id+".meta.js",
	updateCheckInterval:1000*60*60*3,	/* every 3 hours */
	disableUpdateChecker:scriptOptions.disableUpdateChecker,
	ERRORS:{},
	ALERTS:{},
	IMGS:{
		GM_ICON:"data:image/gif;base64,R0lGODlhDwAQAMZiAAAdAAAmAEAgAEQiAEckAEkkAE8oABA8EFMqAFsuAF8qHlwuAGUqH18wAGMyAGc0AGg0AGs2AHM6AHQ6AGU+E3g8AIQ4Kn0/AH4/AIk4Kn9AAHpCCGNFL2dFL3tDCZg5Ko9TEUBvQJNoMp9mI5NtO51tMqdwK5B7UqZ3O5J8VK95NKx/Q7eDPrGGS5+Ua5+VaZ+VcJ+XcceXUMeXUZ+iYp+iZZ+oYZ+pZs+hW9eqYNeqYdK1gdO2gt+3deC/fuDAgPfQg/fQhPfRhffRhv/ajP/ajf/ajv/bj//bkP/bkf/bkv/ck//clP/dlv/dl//dmP/emf/emv/fnP/fnf/fnv/fn//goP/hov/ho//hpf/ipv/iqP/krf/krv/lrv/lsf/nuP/ouv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAH8ALAAAAAAPABAAAAe9gH+Cg4QLA4SIGhoRBAKIg4oaCQICBhMFiRogDw0OEhIIhBcYJkBGOBo4RkAmGBd/HiUaQEhNUT1RTkpBGiUeIi0jR042NVk3NFBJIy0iJCgsTFIhB13UVU0sKyQUKDJNVgEAYOJXUDMrFH8bQuAvMGExLlhQQxuCIEUnO1pcX15beKQwokHQLB8cFFj4kIFBhx9ACv7RoIKIkidSqEyBwqSICokTR+Q4soTJEiQ6RoAUBKFCJEUVIDyaiSgQADs="
	}
};


//=============== jQuery knockoff - my Personal lightweight "framework"  ===============
try{
	$=(function(){
		var ulti=function(){return ulti.fn.init.apply(new ulti.fn.init(),arguments);};
		var fns={};
		fns.init=function(){if(!arguments.length||!arguments[0])return this;var ret=this||[];Array.prototype.push.apply(ret,arguments);return ret;};
		fns.hasClass=function(c){var e=this[0];return new String(" "+e.className+" ").replace(/[\n\t]/g," ").indexOf(" "+c+" ")>-1;}
		fns.addClass=function(a){var e=this[0];if(!a || typeof a!="string" || $(e).hasClass($.trim(a)))return $(e);e.className=$.trim(" "+new String(e.className||"")+" "+$.trim(a));return $(e);}
		fns.removeClass=function(a){var e=this[0];if(!a || typeof a!="string" || !$(e).hasClass($.trim(a)))return $(e);e.className=$.trim(new String(" "+e.className+" ").replace(/[\n\t]/g," ").replace(" "+a+" "," "));return $(e);}
		ulti.fn = ulti.prototype=fns;
		ulti.fn.init.prototype = ulti.fn;
		ulti.trim=function(str) {return new String(str||"").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"");};
		return ulti;
	})();
}catch(E){
	var props=new Array();
	for(j in E){props[props.length]=j+": "+E[j];}
	alert("Error: Failed to initialize jQuery knockoff personalized lightweight \"framework\"\nError details:\n\n"+props.join("\n"));
}
//======================== The CSS styling ===============================

try{
var css=".valid-chat-command{background-color:#ddd;}\n"		/* forward-slash */
	+".invalid-chat-command-leading-back-slash{color:red;}\n"	/* back-slash */
	+".invalid-chat-command-leading-period{color:red;}\n"		/* period */
	+".no-more-characters{color:orange;}";			/* when all 200 characters are full*/
GM_addStyle(css);
}catch(E){
	var props=new Array();
	for(j in E){props[props.length]=j+": "+E[j];}
	alert("Error: Failed to add CSS to page\nError details:\n\n"+props.join("\n"));
}

//============================ Main Script ===============================

if(location.pathname == "/lchat.php")
(function(){
var areYouSure=false;
	var e=document.getElementsByName('graf')[0];if(!e)return;
	var callback=function(){
		try{
			var hasLFS=$.trim((this.value||'')).indexOf('/')==0;
			var hasLBS=$.trim((this.value||'')).indexOf("\\")==0;
			var hasLP=$.trim((this.value||'')).indexOf(".")==0;
			var noMoreCharacters=this.value.length>=200;
			hasLFS?$(this).addClass('valid-chat-command'):$(this).removeClass('valid-chat-command');
			hasLBS?$(this).addClass('invalid-chat-command-leading-back-slash'):$(this).removeClass('invalid-chat-command-leading-back-slash');
			hasLP?$(this).addClass('invalid-chat-command-leading-period'):$(this).removeClass('invalid-chat-command-leading-period');
			noMoreCharacters?$(this).addClass('no-more-characters'):$(this).removeClass('no-more-characters');
			if(!$.trim((this.value||""))){$(this).removeClass('valid-chat-command').removeClass('invalid-chat-command-leading-back-slash').removeClass('invalid-chat-command-leading-period').removeClass('no-more-characters');}
			if(hasLBS||hasLP||noMoreCharacters){areYouSure=true}else{areYouSure=false;}
		}catch(E){
			var props=new Array();
			for(j in E){props[props.length]=j+": "+E[j];}
			alert("Error: Something went wrong within the callback function\nError details:\n\n"+props.join("\n"));
		}
	}//function
	e.addEventListener('input',callback,false);
	e.addEventListener('keyup',callback,false);
	e.addEventListener('onchange',callback,false);
	with(unsafeWindow)
	{
		var orginalFunction=unsafeWindow.submitchat;
		unsafeWindow.submitchat=function()
		{
			try{
				var e=document.getElementsByName('graf')[0];
				var hasLBS=$.trim((e.value||'')).indexOf("\\")==0;
				var hasLP=$.trim((e.value||'')).indexOf(".")==0;
				var noMoreCharacters=e.value.length>=200;
				if(areYouSure){if(!confirm("Your message may cause an undesirable misfire in chat.\nAre you sure you want to send it?"))return false;}
			}catch(E){}
			var result=orginalFunction.apply(this,arguments);
			try{
				setTimeout(function(){callback.apply(e,[]);},1);
			}catch(E){}
			return result;
		}
	}
	
})();//function

//============================ Update Checker ============================
if(location.pathname == "/main.php" && !scriptOptions['disableUpdateChecker'])
(function(){
	var latestVersion=GM_getValue('latestVersion', '0.0');
	var scriptIsOutOfDate=GM_getValue('scriptIsOutOfDate', false);
	var lastChecked=GM_getValue('lastChecked', '0');
	var lastUpdateCheckNotRecent=Number(lastChecked)+scriptGlobals['updateCheckInterval'] < new Date().getTime();
	var scriptVersionIsOld=Number(scriptGlobals['version']) < Number(GM_getValue('latestVersion','0'));
	if(scriptIsOutOfDate && scriptVersionIsOld)notifyUserThatTheirScriptIsOutOfDate();
	try{
		if(!scriptIsOutOfDate && lastUpdateCheckNotRecent && !scriptVersionIsOld)
		GM_xmlhttpRequest({
			method:	'GET',
			url:	scriptGlobals['scriptMetaLink'],
			onload:	function(r)
				{
					if(r.status!=200)return;
					var regexp=/version\s*([^\r\n]+)/i;
					var m=r.responseText.match(regexp);
					if(!m)return;
					var latestVersion=m[1];
					GM_setValue('latestVersion', latestVersion);
					GM_setValue('lastChecked', new Date().getTime()+"");
					if(Number(scriptGlobals['version']) < Number(GM_getValue('latestVersion','0'))){
						GM_setValue('scriptIsOutOfDate', true);
						notifyUserThatTheirScriptIsOutOfDate();
					}else{
						GM_setValue('scriptIsOutOfDate', false);
					}
				}//callback
		});//xhr
	}catch(E){

			var props=new Array();
			for(j in E){props[props.length]=j+": "+E[j];}
			alert("Error: Something went wrong with the GM_xmlhttpRequest to check for script updates\nError details:\n\n"+props.join("\n"));
	}
	function notifyUserThatTheirScriptIsOutOfDate()
	{
		try{
			if(document.getElementById("notifyUserThatTheirChatMisfireBlockerScriptIsOutOfDate"))return;//notice is already there
			var div = document.createElement("div");
			div.id="notifyUserThatTheirChatMisfireBlockerScriptIsOutOfDate";
			div.innerHTML = "<center><table style='border: 1px solid orange; margin-bottom: 4px;' width=95% cellpadding=1 cellspacing=0><tr><td style=\"background-color:orange;\"><div></div></td></tr><tr><td><div></div></td></tr></table></center>";
			var e=document.createElement("div");
			e.style.color="white";
			e.style.textAlign="left";
			var img="<table style=\"width:100%;margin:0;padding:0;\" cellspacing=\"0\" cellpadding=\"0\"><tr><td><img src=\""+scriptGlobals['IMGS'].GM_ICON+"\" style=\"width:15px;height:16px;\" alt=\"GreaseMonkey\" title=\"GreaseMonkey\" /></td><td><center>Your <strong>Chat Misfire Blocker</strong> script is out of date.</center></td></tr></table>";
			e.innerHTML="<b>"+img+'</b>'
			var d1=div.getElementsByTagName("div")[1];
			div.getElementsByTagName("div")[0].appendChild(e);
			var e2=document.createElement("div");
			e2.style.textAlign="center";
			e2.style.color="black";
			e2.style.backgroundColor="white";
			e2.innerHTML="Please visit <a target=\"_new\" href=\""+scriptGlobals['downloadPage']+"\">the download page</a> and click \"install\" to update your script or <a target=\"_new\" href=\""+scriptGlobals['installLink']+"\">click here</a> to install it directly."
				+"<br />Alternatively, if the userscripts.org server is down, you can <a target=\"_new\" href=\""+scriptGlobals['installLinkMirror']+"\">click here</a> to install off my personal server.";
			d1.appendChild(e2);
			document.body.insertBefore(div, document.body.firstChild);
			//message = "Right click <a href='" + scriptURL + "' TARGET='_blank'>here</a> and select 'Install User Script' for Version " + webVer + ".";
		}catch(E){
			var props=new Array();
			for(j in E){props[props.length]=j+": "+E[j];}
			alert("Error: Something went wrong when trying to notify the user that their is a new script version available\nError details:\n\n"+props.join("\n"));
		}
	}
	//notifyUserThatTheirScriptIsOutOfDate();
})();


//================= Wrap entire script in a try-catch ==================
}//end try
catch(E)
{
	var props=new Array();
	for(j in E){props[props.length]=j+": "+E[j];}
	alert(props.join("\n"));
}