// ==UserScript==
// @name           Facebook MythMonger Turn Alerter
// @version        0.17
// @namespace      http://userscripts.org/users/69519
// @description    Alerts you when you can take your turn
// @include        http://apps.facebook.com/mythmonger/*
// @include        http://apps.new.facebook.com/mythmonger/*
// ==/UserScript==


var SUC_script_num = 69519;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 21600000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nClick OK to install it now'))
{GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js');GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}



var remainingTime = -1;
var timeOut = -1;
var retries = 0;
var timer = 0;
var originalTitle = document.title;

init();


function init() {
	if (originalTitle.toLowerCase().indexOf("puzzle") > -1) {
	  document.title = 'Puzzle | ' + originalTitle;
	  return;
	}

	remainingTime = unsafeWindow.a79378246206_remainingActiveTurnWaitSeconds;
	if (remainingTime == null) {
		++retries;

		if (retries == 300) {
			document.location = 'http://apps.facebook.com/mythmonger/';
		} else {
			setTimeout(init, 50);
		}
		return;
	}

	timeOut = parseInt(remainingTime);

	// the "click"
  if (timeOut) {
	  setTimeout(function() {
	    if (confirm('Ready! Take turn?')) {
	      document.location = 'http://apps.facebook.com/mythmonger/turn.php';
	    }
	  }, timeOut * 1000 + 250);
  }

	// timer
	timer = timeOut;

	// refresh the time
	setInterval(writeTime, 1000);
}

function writeTime() {
	if (timer > 0) {
	  var minute = parseInt(timer / 60).toString();
	  var second = parseInt(timer - (minute * 60)).toString();

	  if (minute.length == 1) minute = '0' + minute;
	  if (second.length == 1) second = '0' + second;
	  document.title = minute + ':' + second + ' | ' + originalTitle;

	  --timer;
  } else {
    document.title = 'READY! | ' + originalTitle;
  }
}


/*
	getElementByClassName
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com
*/
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}
