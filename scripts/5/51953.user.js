// ==UserScript==
// @name           Tycoon Reloader
// @namespace      tycoon
// @description    Auto reload to be a tycoon
// @include		http://apps.facebook.com/beatycoon/*
// @include		http://apps.new.facebook.com/beatycoon/*
// @version 1.0.3
// @Author LeoXavior
// ==/UserScript==
var minTime = 3;
var maxTime = 5;

//var SUC_script_num = 51953; // Change this to the number given to the script by userscripts.org (check the address bar)
//try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*7) <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GenRandomTime()
{
	var hrs = 60000 * 60;
	var x;
	var y;
	var low;
	var high;
	// set y to be minTime in hours
	x = Math.floor( hrs * minTime );
	
	// set x to be minTIme times two in hours
	y = Math.floor(hrs * ( minTime * 2 ) );	
	
	// Set a random min time
	low = getRandomInt(x,y); 
	
	// set x to be maxTime divided by two in hours
	x = Math.floor( hrs * ( maxTime / 2 ) ); 
	
	// set y to be MaxTime in hours
	y = Math.floor( hrs * maxTime ); 
	
	// Set a random max time	
	high = getRandomInt(x ,y); 
	
	// return a random time between low and high
	return getRandomInt(low,high); 
}

function EnvCheck()
{	
	var bRet = false;
	var parentDiv = document.getElementsByClassName('environment')[0];
	if(parentDiv){
		bRet = true;
		//window.alert("Environment crap?");
	}
	return bRet;
}
function pageReload()
{ 
	var nTime = 0;
	if(EnvCheck() == true){
		nTime = 500;
	} else {
		nTime = GenRandomTime();
	}
	window.setTimeout("location.reload()", nTime);
}

window.onload = pageReload(); 