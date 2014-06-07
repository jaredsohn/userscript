// --------------------------------------------------------------------
// ==UserScript==
// @name          Favstar 
// @namespace     
// @description   A small script to make Favstar a little more readable.
// @include       http://favstar.fm/*
// ==/UserScript==

onload=function(){
if (document.getElementsByClassName == undefined) {
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
	}
}
}

// Click by JoeSimmons
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
	if(!e && typeof e=='string') e=document.getElementById(e);
	if(!e) {return;}
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
	e.dispatchEvent(evObj);
}


function addStyle(style) {
	var head = document.getElementsByTagName("HEAD")[0];
	var ele = head.appendChild(window.document.createElement('style'));
	ele.innerHTML = style;
	return ele;
}
addStyle('@import "http://dl.dropbox.com/u/504264/favstar.css";');  

var elements = document.getElementsByClassName('otherCount');
var element;
for (var i = 0; (element = elements[i]) != null; i++) {
	click(element, 'click');
}

var viewElements = document.getElementsByClassName('viewAll');
var viewElement;
for (var i = 0; (viewElement = viewElements[i]) != null; i++) {
	click(viewElement, 'click');
}

// An excellent little Script updater by Jarrett - http://userscripts.org/users/jarett
// Below is a compact version of the snippet with the main body of the code in one line so it's less distracting when looking through the script source.
// Simply uncomment and use like the above.
var SUC_script_num = 63607; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
