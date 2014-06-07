// ==UserScript==
// @name           The-West Hide Details
// @namespace      http://www.the-west.ro
// @description    Hidding character, cash and other details. I use it when I want to take printscreens, and don't want to share my details.
// @include        http://*.the-west.*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==

function changeDetailOpacity(detail,opacity){
  var insertBeforeElement = document.getElementById('left_top');
  var newScriptElement = document.createElement('script');
  newScriptElement.setAttribute('type', 'text/javascript');
  var myScript = "window.addEvent('domready', function(){$('" +detail+ "').setOpacity(" +opacity+ "); });";
  newScriptElement.innerHTML = myScript;
  insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
}


changeDetailOpacity('health_text','0.0');
changeDetailOpacity('energy_text','0.0');
changeDetailOpacity('experience_text','0.0');

changeDetailOpacity('health_bar','0.0');
changeDetailOpacity('energy_bar','0.0');
changeDetailOpacity('experience_bar','0.0');

changeDetailOpacity('avatar','0.0');
changeDetailOpacity('current_task','0.0');
changeDetailOpacity('cash','0.0');
changeDetailOpacity('deposit','0.0');
changeDetailOpacity('task_time','0.0');

changeDetailOpacity('footer_server_time','0.0');

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_92', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_92', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=92&version=1.25';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();