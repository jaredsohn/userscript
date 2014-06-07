// ==UserScript==
// @name           Spionage-helper (0.4.2)
// @namespace      made by Mdna
// @include        http://*.ikariam.com/*
// ==/UserScript==

var seite = document.getElementsByTagName('body')[0].id;

if (seite == "sendSpy"){
  var CityID = document.getElementById('citySelect').value;
GM_log(CityID);
  var maxSpys = GM_getValue('MaxSpys'+CityID, 0);
  var Agenten = GM_getValue('Agenten_Default', 0)
  var Ablenker = GM_getValue('Ablenker_Default', 0);
  var body = document.getElementById('sendSpy');
  body.setAttribute('onload', 'sliders["slider_missioncity'+CityID+'"].setActualValue('+Agenten+');sliders["slider_decoycity'+CityID+'"].setActualValue('+Ablenker+');');
  
}else if (seite == "safehouse"){
  var CityID = document.getElementById('citySelect').getElementsByTagName('option')[0].value;
  var div = document.getElementById('reportInboxLeft').getElementsByTagName('li')[1].firstChild.data.substring(0, 2);
  GM_setValue('MaxSpys'+CityID, div);
  
}else if (seite == "options"){
  var div = document.createElement('div');
  div.innerHTML = '<div class="contentBox01h"><h3 class="header">Spionage-Helper Einstellungen</h3>' +
  '<div class="content">' +
  '<table cellpadding="0" cellspacing="0"><tr><th>Standartanzahl Agenten</th><td><input type="text" size="4" id="Agenten" class="textfield">' +
  '<tr><th>Standartanzahl LockvÃƒÂ¶gel</th><td><input type="text" size="4" id="Ablenker" class="textfield"></table>' +
  '<div class="centerButton"><input type="submit" class="button" id="Speichern" value="Speichern"></div>' +
  '</div></div>';
  
  document.getElementById("mainview").insertBefore(div, document.getElementById("vacationMode"));
  var SpeichernButton = document.getElementById('Speichern');
  SpeichernButton.addEventListener('click',speichern,true);

}else if (seite == "spyMissions"){
  var CityID = document.getElementById('citySelect').getElementsByTagName('option')[0].value;
  var Agenten = GM_getValue('Agenten_Default', 0)
  var Ablenker = GM_getValue('Ablenker_Default', 0);
  var body = document.getElementById('spyMissions');
  body.setAttribute('onload', 'sliders["slider_missioncity'+CityID+'"].setActualValue('+Agenten+');sliders["slider_decoycity'+CityID+'"].setActualValue('+Ablenker+');');
}

function speichern(){
  var Agenten = document.getElementById('Agenten').value;
  var Ablenker = document.getElementById('Ablenker').value;
  GM_setValue('Agenten_Default', Agenten);
  GM_setValue('Ablenker_Default', Ablenker);
  alert('Daten gespeichert!');
  location.href=location;
}

function ButtonErsetzen(Button_new, Button_old, Click_event){
  Button_new.setAttribute('onclick', Click_event);
  Button_old.parentNode.insertBefore(Button_new, Button_old);
}

var SUC_script_num = 96275; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}