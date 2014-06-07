// Surfplaza user script
// version 0.3 BETA!
// 2005-04-25
// Copyright (c) 2009, myTSelection.blogspot.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Surfplaza", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Surfplaza
// @namespace     http://myTselection.blogspot.com
// @description   Little tweaks for Surfplaza.be
// @include       http://*.surfplaza.be/*
// @include       http://*.webtoday.be/*
// ==/UserScript==

//alert('Surfplaza');
var headerBar = document.getElementById('header');
if (headerBar) {
    headerBar.parentNode.removeChild(headerBar);
}

var combellBlock = document.getElementsByClassName('item style_b special', document.getElementById('homepage'));
if (combellBlock) {
//	alert('combellBlock');
	
	for(var i=0,j=combellBlock.length; i<j; i++) {
//    	combellBlock[i].parentNode.removeChild(combellBlock[i]);
		var combellH3 = getElementsByNodeNameWithinNode('H3', combellBlock[i]);
//		alert('combellH3: ' + combellH3[0].firstChild.textContent);
		combellH3[0].firstChild.data ="Weer";
		
		var combellSpecialBlock = document.getElementsByClassName('special', combellBlock[i])[1];
//		alert("special" + combellSpecialBlock.className);
		//combellBlock[i].removeChild(combellSpecialBlock);
		removeChildNodes(combellSpecialBlock);
	   var weatherImage = document.createElement('img');
	   weatherImage.setAttribute('width','199');
	   weatherImage.setAttribute('alt','Weer vandaag / morgen');
	   weatherImage.setAttribute('title','Weer vandaag / morgen');
	   weatherImage.setAttribute('name','weervandaag');
	   weatherImage.setAttribute('onmouseout',"document.weervandaag.src='http://services.vrt.be/data/weather/img/style_2/512x288/map_belgie_streken_huidig_dag.png';");
	   weatherImage.setAttribute('onmouseover',"document.weervandaag.src='http://services.vrt.be/data/weather/img/style_2/512x288/map_belgie_streken_morgen_dag.png';");
	   weatherImage.setAttribute('src','http://services.vrt.be/data/weather/img/style_2/512x288/map_belgie_streken_huidig_dag.png');
	   combellSpecialBlock.appendChild(weatherImage);
	}
}
 document.title="WebToday";
 setTimeout(function() { document.location.reload(); } , 100000);


function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('^' + classname + '$');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
	return a;
} 

function getElementsByNodeNameWithinNode(nodenamefilter, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('^' + nodenamefilter + '$');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].nodeName))a.push(els[i]);
	return a;
} 

function removeChildNodes(ctrl)
{
  while (ctrl.childNodes[0])
  {
    ctrl.removeChild(ctrl.childNodes[0]);
  }
}

var SUC_script_num = 59156; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}