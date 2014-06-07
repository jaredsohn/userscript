// ==UserScript==
// @name           Berater-Helper
// @namespace      made by Mdna
// @include        http://*.ikariam.com/*
// ==/UserScript==

var div = document.getElementById('advisors');
Stadtberater(div);
Militaerberater(div);
Forscher(div);
Diplomat(div);

function Stadtberater(div){
  var status = GM_getValue('Stadtberater', 'leuchtet');
  if (status == "leuchtet"){
    var berater = div.getElementsByTagName('a')[0].className;
    if (berater == "undefined"){}
    else if (berater == "normal"){}
    else if (berater == "normalactive"){alert('In unseren Städten ist etwas passiert!');GM_setValue('Stadtberater', 'leuchtet nicht');}
    else if (berater == "premium"){}
    else if (berater == "premiumactive"){alert('In unseren Städten ist etwas passiert!');GM_setValue('Stadtberater', 'leuchtet nicht');}
  }
  else if (status == "leuchtet nicht"){
    var body = document.getElementsByTagName('body')[0].id;
    if (body == 'tradeAdvisor'){
      GM_setValue('Stadtberater', 'leuchtet');
    }else{
      GM_setValue('Stadtberater', 'leuchtet nicht');
    }
  }
}

function Militaerberater(div){
  var berater = div.getElementsByTagName('a')[2].className;
  if (berater == "undefined"){}
  else if (berater == "normal"){}
  else if (berater == "normalactive"){alert('Unsere Truppen sind in einen Kampf verwickelt!');}
  else if (berater == "normalalert"){var sound = document.createElement("embed"); sound.innerHTML = '<embed src="http://www.afn.org/~skywarn/emwin/sounds/smokealarm.wav" autostart="true" loop="false" hidden="true" height="0" width="0">';document.body.insertBefore(sound, document.body.lastChild);}
  else if (berater == "premium"){}
  else if (berater == "premiumactive"){alert('Unsere Truppen sind in einen Kampf verwickelt!');}
  else if (berater == "premiumalert"){var sound = document.createElement("embed"); sound.innerHTML = '<embed src="http://www.afn.org/~skywarn/emwin/sounds/smokealarm.wav" autostart="true" loop="false" hidden="true" height="0" width="0">';document.body.insertBefore(sound, document.body.lastChild);}
}

function Forscher(div){
  var berater = div.getElementsByTagName('a')[4].className;
  if (berater == "undefined"){}
  else if (berater == "normal"){}
  else if (berater == "normalactive"){alert('Wir haben eine Entdeckung gemacht!');}
  else if (berater == "premium"){}
  else if (berater == "premiumactive"){alert('Unsere Forschungen sind wieder ein Stück vorangekommen!');}
}

function Diplomat(div){
  var berater = div.getElementsByTagName('a')[6].className;
  if (berater == "undefined"){}
  else if (berater == "normal"){}
  else if (berater == "normalactive"){var sound = document.createElement("embed");sound.innerHTML = '<embed src="http://www.tradebit.de/usr/sound-effekte/pub/9003/637/270-3877Preview.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';document.body.insertBefore(sound, document.body.lastChild);
}
  else if (berater == "premium"){}
  else if (berater == "premiumactive"){var sound = document.createElement("embed");sound.innerHTML = '<embed src="http://www.tradebit.de/usr/sound-effekte/pub/9003/637/270-3877Preview.mp3" autostart="true" loop="false" hidden="true" height="0" width="0">';document.body.insertBefore(sound, document.body.lastChild);}
}

var SUC_script_num = 979057; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

