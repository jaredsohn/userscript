// ==UserScript==
// @name           omgPanel
// @namespace      http://sxentertainment.com/home/
// @description    Quick access to OMG It's a Ninja's Features in the Brand new omgPanel!! 
// @include        *
// ==/UserScript==
// Coded by Ryan of SX Entertainment Inc.
// Designed by Rylea of SX Entertainment Inc.



var remember    = false;
var defaultOpen = false; 

var list = '&nbsp;&nbsp;<a target="_self" class="greasefontweight" href="http://omgitsaninja.com/">Home &#187;</a>&nbsp;|&nbsp;' + 
'<a target="_self" class="greasefontweight" href="http://omgitsaninja.com/task/forums">Forums &#187;</a>&nbsp;|&nbsp;' +
           '<a target="_self" class="greasefontweight" href="http://omgitsaninja.com/task/randomgame">Random Game &#187;</a>&nbsp;|&nbsp;'+
	   '<a target="_self" class="greasefontweight" href="http://omgitsaninja.com/task/allnews">News &#187;</a>&nbsp;&nbsp;';
var button = '<a href="#togglemenu" style="display:block; height:50px; width: 20px;"></a>';
var css  = '#greasemonkeymenu {font-family: Verdana; position: fixed; z-index: 9001; bottom:5%; right:0;}' + 
           '#greasemonkeymenulink { background-image: url(http://omgitsaninja.com/ExternalData/omgPanel/omgPanel_tab.png); float: left; height:50px; width: 20px;text-decoration: none; font-size: 10px; line-height: 110%; display: block;}' +
           '#greasemonkeymenulist { background-image: url(http://omgitsaninja.com/ExternalData/omgPanel/omgPanel_bg.png); height:35px; float: left; padding: 0; }' +
		   '.greasefontweight {font-weight: bold;color: #FFF;}' +
           '#greasemonkeymenulist { font-size: 14px; color: #FFF; padding-top:15px; }';

           
document.addEventListener('click', function(event) {
  var clicked = String(event.target);
  var clickedToggleLink = clicked.search(/togglemenu/);
  if (clickedToggleLink > -1) {
    toggle();
    event.stopPropagation();
    event.preventDefault();
  }
}, true);

function toggle(){
  list = document.getElementById("greasemonkeymenulist")
  if ("none" == list.style.display) {
    list.style.display="block";
    GM_setValue(status, "open");
  } else {
    list.style.display="none";
    GM_setValue(status, "closed");
  }
}

var menu = document.createElement("div");
menu.innerHTML =  '<style type="text/css">' + css + '</style>' +
                  '<div id="greasemonkeymenu" class="outerbox"><div class="innerbox">' +
                  '<div id="greasemonkeymenulink">' + button + '</div>' +
                  '<div id="greasemonkeymenulist">' + list + '</div>' +
                  '</div></div>';

if(window.location == window.parent.location){
document.body.insertBefore(menu, document.body.firstChild);
}

if (defaultOpen) {
  document.getElementById("greasemonkeymenulist").style.display = "block";
} else {
  document.getElementById("greasemonkeymenulist").style.display = "none";
}

if (remember) {
  if ("open" == GM_getValue(status, "closed")) {
    document.getElementById("greasemonkeymenulist").style.display = "block";
  } else {
    document.getElementById("greasemonkeymenulist").style.display = "none";
  }
}

var SUC_script_num = 69910; // Change this to the number given to the script by userscripts.org (check the address bar)

try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}