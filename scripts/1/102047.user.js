// ==UserScript==
// @name           Notizblock
// @namespace      made by Mdna
// @include        http://s*.*.ikariam.com/index.php*
// ==/UserScript==

var frame = document.createElement('iframe');
frame.setAttribute('scrolling', 'no');
frame.setAttribute('height', '0');
frame.setAttribute('width', '0');
frame.setAttribute('name', 'frame');
var body = document.getElementsByTagName('body')[0];
body.appendChild(frame);
var divalign = document.createElement('div');
divalign.setAttribute('align', 'center');
var h3 = document.createElement('h3');
h3.innerHTML = '<h3 class="header">Notizblock</h3>';
var divcontent = document.createElement('div');
divcontent.setAttribute('class', 'content');
var form = document.createElement('form');
form.setAttribute('target', 'frame');
var text = document.createElement('textarea');
text.setAttribute('id', 'text');
var divbutton = document.createElement('div');
divbutton.setAttribute('class', 'centerButton');
var input = document.createElement('input');
input.setAttribute('type', 'submit');
input.setAttribute('value', 'Speichern');
input.setAttribute('class', 'button');
input.setAttribute('id', 'safe');
input.addEventListener('click',function(e){_Speichern(document.getElementById('text').value);},false);
var divfooter = document.createElement('div');
divfooter.setAttribute('class', 'footer');
divbutton.appendChild(input);
form.appendChild(text);
form.appendChild(divbutton);
divcontent.appendChild(form);
divalign.appendChild(h3);
divalign.appendChild(divcontent);
divalign.appendChild(divfooter);
var information = document.getElementById('information');
var stadtberater = document.getElementById('viewCityImperium');
var general = document.getElementById('viewMilitaryImperium');
var forscher = document.getElementById('researchLibrary');
var diplomat = document.getElementById('islandBoardOverview');
var upgrade = document.getElementById('buildingUpgrade');
var options = document.getElementById('reportInboxLeft');
var highscore = document.getElementById('highscoreswitch');
var help = document.getElementById('civilopedia_menu');
var back = document.getElementById('backTo');
if(information != null){information.appendChild(divalign);}
if(stadtberater != null){stadtberater.appendChild(divalign);}
if(general != null){general.appendChild(divalign);}
if(forscher != null){forscher.appendChild(divalign);}
if(diplomat != null){diplomat.appendChild(divalign);}
if(upgrade != null){upgrade.appendChild(divalign);}
if(options != null){options.appendChild(divalign);}
if(highscore != null){highscore.appendChild(divalign);}
if(help != null){help.appendChild(divalign);}
if(back != null){back.appendChild(divalign);}
_Lesen();
function _Speichern(text){GM_setValue('Notiz', text);}
function _Lesen(){var text = GM_getValue('Notiz', '');var schreiben = document.getElementById('text').value = text;return text;}

var SUC_script_num = 102047; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}