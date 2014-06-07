// ==UserScript==
// @name           Buttons
// @namespace      www.myscript.com
// @include        http://*.pardus.at/main.php
// ==/UserScript==


var child = document.createElement("div");
   child.setAttribute("style", "position:relative; top:6px; margin-left: 12px; margin-top: 5px; margin-bottom: 7px;");
var cm = GM_getValue('combat_mode', 'unknown');//get current combat mode
//still need to find a way to set it :(
{
var IPloc = 'http://localhost:8080/';//set to own IP
child.innerHTML = child.innerHTML +
'<table align="center" border="0" cellpadding="0" cellspacing="0">'+
'<tbody>'+
'<tr>'+
'<td style="width: 14px; height: 9px; vertical-align: top;">'+
'  <img src="'+IPloc+'text1.png" style="width: 14px; height: 9px;" alt="">'+
'</td>'+
'<td style="background-color: rgb(0, 0, 28);">'+
'<table style="border: 0pt none; width: 100%; background-image: url('+IPloc+'text2.png); background-repeat: repeat-x;" cellpadding="0" cellspacing="0">'+
'<tbody>'+
'<tr>'+
'<td>'+
'  <img src="'+IPloc+'spacer9.gif" alt="">'+
'</td>'+
'</tr>'+
'</tbody>'+
'</table>'+
'</td>'+
'<td style="width: 14px; height: 9px; vertical-align: top;">'+
'  <img src="'+IPloc+'text3.png" style="width: 14px; height: 9px;" alt="">'+
'</td>'+
'</tr>'+
'<tr>'+
'<td style="background-image: url('+IPloc+'text4.png); background-repeat: repeat-y;">'+
'&nbsp;'+
'</td>'+
'<td>' +
//start div
" <div align='center' style='position:relative; margin-left: 5px; margin-right: 5px; margin-top: 5px; margin-bottom: 7px; '>"+
" <form action='overview_advanced_skills.php' Method='POST' style='display:inline'><input type='hidden' name='action' value='switch_combat_mode'><input type='hidden' name='combat_mode' value='Offensive'><input type='submit' value='OC' "+(cm=='off'?" disabled='disabled' ":"")+"></form>"+
" <form action='overview_advanced_skills.php' Method='POST' style='display:inline'><input type='hidden' name='action' value='switch_combat_mode'><input type='hidden' name='combat_mode' value='balanced'><input type='submit' value='Bal' "+(cm=='bal'?" disabled='disabled' ":"")+"></form>"+
" <form action='overview_advanced_skills.php' Method='POST' style='display:inline'><input type='hidden' name='action' value='switch_combat_mode'><input type='hidden' name='combat_mode' value='defensive' ><input type='submit' value='DC' "+(cm=='def'?" disabled='disabled' ":"")+"></form>"+

" <br><form action='overview_advanced_skills.php' Method='POST' style+'display:inline'><input type='hidden' name='action' value='boost'><input type='hidden' name='boost' value='agility'><input type='submit' value='Agility Boost' ></form>"+

" <form action='overview_advanced_skills.php' Method='POST' style='display:inline'><input type='hidden' name='action' value='deploy_timebomb'><input type='hidden' name='timebomb_type' value='type_1'><input type='submit' value='TB1' ></form>"+
" <form action='overview_advanced_skills.php' Method='POST' style='display:inline'><input type='hidden' name='action' value='deploy_timebomb'><input type='hidden' name='timebomb_type' value='type_2'><input type='submit' value='TB2' ></form>"+

"</div>"+
//end div
'</td>'+
'<td style="background-image: url('+IPloc+'text5.png); background-repeat: repeat-y;">'+
'&nbsp;'+
'</td>'+
'</tr>'+
'<tr>'+
'<td style="width: 14px; height: 14px; vertical-align: top;">'+
'  <img src="'+IPloc+'text6.png" style="width: 14px; height: 14px;" alt="">'+
'</td>'+
'<td style="background-image: url('+IPloc+'text7.png); background-repeat: repeat-x;">'+
'&nbsp;'+
'</td>'+
'<td style="width: 14px; height: 14px; vertical-align: top;">'+
'  <img src="'+IPloc+'text8.png" style="width: 14px; height: 14px;" alt="">'+
'</td>'+
'</tr>'+
'</tbody>'+
'</table>';


}
var table = document.getElementById("otherships");
table.parentNode.insertBefore(child,table);