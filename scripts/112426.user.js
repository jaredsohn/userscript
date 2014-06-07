// ==UserScript==
// @name GTool
// @description Check Ice status
// @author Grean^2 Development
// @version 2.0
// @include http://mwlists.com/Bucket/index.php?bucket=kaMiZIGXMtEDPWcuBW8TdvBdJLMWFajr2*
// @include http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include http://facebook.mafiawars.com/mwfb/remote/html_server.php?*
// ==/UserScript==

/*
Change Log 2.0
- Fix Request issue (change from GET method to POST)
- Show More Information in SS
*/

function uVar(URL,yourvar) {
var first=URL.indexOf(yourvar) + yourvar.length + 1;
var last=URL.indexOf("&",URL.indexOf(yourvar));

if (last==-1) {
last=URL.length;
}
return URL.substring(first,last);
}

function request(request_url,target){
GM_xmlhttpRequest(
{ method: 'POST', url: request_url,
data: 'ajax=1&liteload=1&sf_xw_user_id='+sf_xw_user_id+'&sf_xw_sig='+sf_xw_sig,
headers: {
"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
},
onload: function (resp) {
if(/You can\'t add/.test(resp.responseText))
result = '<div style="background-color:#FFC0C0;">'+target.innerHTML+'</div>';
else if(/Bounty Amount/.test(resp.responseText))
result = '<div style="background-color:#C0FFC0;">'+target.innerHTML+'</div>';
else
result = '<div style="background-color:#C0C0C0;">'+target.innerHTML+'</div>';

target.innerHTML = result;

i++;
iceCheck();
}
}
);
}

function iceCheck() {
if(enermy.length > i) {
var enermy_id = enermy[i].innerHTML;

if(/^[0-9]+$/.test(enermy_id)& enermy_id.length > 5)
{

if(sf_xw_sig && sf_xw_user_id)
request('http://'+hostname+'/mwfb/remote/html_server.php?xw_controller=hitlist&xw_action=set&ajax=1&liteload=1'+ '&sf_xw_sig=' + sf_xw_sig + '&sf_xw_user_id=' + sf_xw_user_id + '&target_id=' + enermy_id, enermy[i]);
else
alert("Please Login to Mafia Wars and Refresh this Page.");
}
else
{
i++;
iceCheck();
}
}
}

//Get Session in Game
if( (window.location.host == 'mwfb.zynga.com' || window.location.host == 'facebook.mafiawars.com') && uVar(window.location.href,'GTool')=='IceCheck') {

document.getElementById('content_row').innerHTML= "<div align='center'><h2>G Tool Ice Check Current Config</h2>" +
" <table><tr> <th>User</th><td><span id='IC_User'>" + GM_getValue('sf_xw_user_id') + "</span></td></tr>"+
" <tr> <th>Session</th><td><span id='IC_Sig'>" + GM_getValue('sf_xw_sig') + "</span></td></tr>"+
" <tr align=center> <td colspan=2><a style='width:100%;' id='IC_Update' class='sexy_button_new' onClick='document.getElementById(\"IC_User\").innerHTML=flashvars.mw_user_id;document.getElementById(\"IC_Sig\").innerHTML=local_xw_sig;document.getElementById(\"IC_Save\").style.display=\"block\";this.style.display=\"none\"'><span><span>Update Config</span></span></a>" +
" <a style='width:100%;display:none' id='IC_Save' class='sexy_button_new'><span><span>Save Config</span></span></a></td>" +
"</tr></table></div>";

function saveIC_Config()
{
GM_setValue("sf_xw_sig",document.getElementById("IC_Sig").innerHTML);
GM_setValue("sf_xw_user_id", document.getElementById("IC_User").innerHTML);
GM_setValue("hostname", window.location.host);

alert("Saved");
}

document.getElementById('IC_Save').addEventListener('click',saveIC_Config , true);

}

//Ice Check on SS
else if(window.location.host == 'spreadsheets.google.com') {

var sf_xw_sig = GM_getValue('sf_xw_sig');
var sf_xw_user_id = GM_getValue('sf_xw_user_id');
var hostname = GM_getValue('hostname');

var i=0;
var enermy = document.getElementsByTagName('td');

var sheethead, GToolHead;

sheethead = document.getElementById('header');
if (sheethead) {
GToolHead = document.createElement('div');
GToolHead.innerHTML = "<table><tr><td><img src='http://profile.ak.fbcdn.net/hprofile-ak-snc4/hs338.snc4/41815_128791113815496_9939_n.jpg' width=50></td>" +
"<td><br><b>GTool Installed</b> [ <a href='http://apps.facebook.com/inthemafia/track.php?next_controller=index&next_action=view&next_params=%7B%22GTool%22%3A%22IceCheck%22%7D' target='_blank'>update session</a> ] (your must update session about every 30 minutes)<br>" +
"<b>Session</b> :" + sf_xw_sig + " <b>User</b> :" + sf_xw_user_id+ " <b>Host</b> :" + hostname +
"<p><span style='background-color:#C0FFC0'>___</span> ALIVE!!, <span style='background-color:#FFC0C0'>___</span> ICED!!, <span style='background-color:#C0C0C0'>___</span> Unknown Status!! (1. Try to Update Session 2.Target Maybe already HL 3.Your HP below 20)</td></tr></table>";
sheethead.parentNode.insertBefore(GToolHead, sheethead);
}

if(sf_xw_sig && sf_xw_user_id)
iceCheck();
}

















