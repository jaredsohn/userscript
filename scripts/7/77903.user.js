// ==UserScript==
// @name           Sam's Job script
// ==/UserScript==

/*************************************************************************

javascript:(function (){


 if (navigator.appName == 'Microsoft Internet Explorer') {
  alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
 }
 else if (document.getElementsByName('mafiawars')[0]) {
  window.location.href=document.getElementsByName('mafiawars')[0].src;
  return;
 }
 else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
  window.location.href=document.getElementsByClassName('canvas_iframe_util')[0].src;
  return;
 }
 else if (document.getElementById('some_mwiframe')) {
  //new mafiawars.com iframe
  window.location.href=document.getElementById('some_mwiframe').src;
  return;
 }
 else {
  document.body.parentNode.style.overflowY="scroll";
  document.body.style.overflowX="auto";
  document.body.style.overflowY="auto";
 }
        var version='Unlock Bangkok';
        var xmlHTTP,content=document.getElementById('popup_permanence'),debug=false;

 var setup_html =
        '<center><table width="737" border="1" background=""><tr><td>Created By: Arch-Angel Nemesis - Bangkok Unlocked v3.16 - (ajax - live)</td><td style="text-align:right" width="210"><a href="http://www.facebook.com/pages/Arch-Angel-Nemesis-Mafia-Tools/118935738127570" target="_blank">Arch-Angel Nemesis Mafia Tools</a></td><td style="text-align:right"><a href=# id="close"><img src="http://www.pyrabytemedia.com/mafia/exit.png"></a></td></tr><tr><td style="text-align=center" colspan="3"><table height="260"></td><td width="200" style="text-align:center"><font size="2">Welcome To Bangkok Unlocked! To use this tool you must have Episode 3 Ch.2 open to Farm Sat Phones & Episode 6 Ch.3 open To Farm These Items. Your Faction Choice Does Not Matter, This tool unlocks either faction.</td><td width="179" style="text-align:center"><img id="Satellite_Phoneitem" style="width: 75px; height: 75px; border: 0px none;" title="Satellite Phone" alt="Satellite Phone" src="http://mwfb.static.zynga.com/mwfb/graphics/item_royalthaimarine_01.gif"><br><a href=# style="cursor: pointer;" class="sexy_button_new short_black short_green" onclick="tryDoJob(\'\lbox_job_energy_43\'\, \'remote/html_server.php?xw_controller=story&amp;xw_action=dojob&amp;xw_city=4&amp;job=135&amp;tab=\'\, 1); return false;"><span><span><span>Farm Marine Phones</span></span></span></a><br>Yakuza<td width="179" style="text-align:center"><img style="width: 75px; height: 75px;" title="Titanium Mesh Jacket" alt="Titanium Mesh Jacket" src="http://mwfb.static.zynga.com/mwfb/graphics/item_titaniummeshjacket_01.gif"><br><a href=# style="cursor: pointer;"  class="sexy_button_new short_black short_white" onclick="tryDoJob(\'\lbox_job_energy_121\'\, \'remote/html_server.php?xw_controller=story&amp;xw_action=dojob&amp;xw_city=4&amp;job=121&amp;tab=\'\, 1); return false;"><span><span><span>Titanium Jacket</span></span></span></a></td><td width="179" style="text-align:center"><img style="width: 75px; height: 75px;" title="Raed Armored Sedan" alt="Raed Armored Sedan" src="http://mwfb.static.zynga.com/mwfb/graphics/item_raedarmoredsedan_01.gif"><br><a href=# style="cursor: pointer;"  class="sexy_button_new short_black short_white" onclick="tryDoJob(\'\lbox_job_energy_124\'\, \'remote/html_server.php?xw_controller=story&amp;xw_action=dojob&amp;xw_city=4&amp;job=124&amp;tab=\'\, 1); return false;"><span><span><span>Raed Sedan</span></span></span></a></td></tr><tr><td style="text-align:center"><img style="width: 75px; height: 75px; border: 0px none;" title="Forest Scorpion" alt="Forest Scorpion" src="http://mwfb.static.zynga.com/mwfb/graphics/item_bangkok_scorpion_b.gif"><br><a href=# style="cursor: pointer;"  class="sexy_button_new short_black short_white" onclick="tryDoJob(\'\lbox_job_energy_63\'\, \'remote/html_server.php?xw_controller=story&amp;xw_action=dojob&amp;xw_city=4&amp;job=63&amp;tab=\'\, 1); return false;"><span><span><span>Forest Scorpions</span></span></span></a></td><td style="text-align:center"><img id="Satellite_Phoneitem" style="width: 75px; height: 75px; border: 0px none;" title="Satellite Phone" alt="Satellite Phone" src="http://mwfb.static.zynga.com/mwfb/graphics/item_bangkok_satellitephone_b.gif"><br><a href=# style="cursor: pointer;"  class="sexy_button_new short_black short_green" onclick="tryDoJob(\'\lbox_job_energy_46\'\, \'remote/html_server.php?xw_controller=story&amp;xw_action=dojob&amp;xw_city=4&amp;job=46&amp;tab=\'\, 1); return false;"><span><span><span>Farm Sat Phones</span></span></span></a><br>Triad</td><td style="text-align:center"><img style="width: 75px; height: 75px;" title="Ninja" alt="Ninja" src="http://mwfb.static.zynga.com/mwfb/graphics/item_ninja_01.gif"><br><a href=# style="cursor: pointer;"  class="sexy_button_new short_black short_white" onclick="tryDoJob(\'\lbox_job_energy_126\'\, \'remote/html_server.php?xw_controller=story&amp;xw_action=dojob&amp;xw_city=4&amp;job=126&amp;tab=\'\, 1); return false;"><span><span><span>Ninjas</span></span></span></a></td><td style="text-align:center"><img style="width: 75px; height: 75px;" title="Nak Kha Shotgun" alt="Nak Kha Shotgun" src="http://mwfb.static.zynga.com/mwfb/graphics/item_nakkhashotgun_01.gif"><br><a href=# style="cursor: pointer;"  class="sexy_button_new short_black short_white" onclick="tryDoJob(\'\lbox_job_energy_129\'\, \'remote/html_server.php?xw_controller=story&amp;xw_action=dojob&amp;xw_city=4&amp;job=129&amp;tab=\'\, 1); return false;"><span><span><span>Nak Kha Shotgun</span></span></span></a></td></td></tr><tr><td colspan="4" style="text-align:center"><font size="2">*As long as you have Ch. 3 open in Episode 6, You can run this tool on ANY Episode with a Lower Mastery Level! You can do all these jobs for Lower Energy! ex. My Episode 7 is still at level 1 Mastery, I do all these jobs for less energy! Try it!*</table></td></tr></table></center>';
         function create_div() {
  if(document.getElementById('nemesisdiv')) {
   document.getElementById('nemesisdiv').innerHTML = setup_html;
  }
  else {
   var nemesis_div=document.createElement("nemesisdiv");
   nemesis_div.id = 'nemesisdiv';
   nemesis_div.innerHTML = setup_html;
   content.insertBefore(nemesis_div, content.firstChild);
  }
 }
 create_div();
 document.getElementById('close').onclick=function(e) {
  run = 0;
  delete xmlHTTP['onreadystatechange'];
  document.getElementById("popup_permanence").removeChild(document.getElementById("nemesisdiv"));
  return false;
 } 
        function get_xmlHTTP () {
   if (window.XMLHttpRequest)
  return new XMLHttpRequest();
   if (window.ActiveXObject)
  return new ActiveXObject('Microsoft.XMLHTTP');
   return null;
 }
 xmlHTTP = get_xmlHTTP();
 if (!xmlHTTP) {
   alert('Your browser does not support XMLHTTP.');
   return;
 }
window.setInterval(setupPage, 500);
setupPage();
setup_html();
}())