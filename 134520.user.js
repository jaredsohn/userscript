// ==UserScript==
// @name           	OAN Ogame Alert Notifier
// @namespace      	OAN Ogame Alert Notifier
// @description    	Un script qui actualise la page et emet des sons en cas de danger
// @author         	Lidmaster
// @include		http://*.ogame.*/*
// @exclude		http://*.ogame.fr/game/index.php?page=fleet*
// @exclude		http://*.ogame.fr/game/index.php?page=galaxy*
// @exclude 		http://*.ogame.fr/game/index.php?page=messages*
// @exclude 		http://*.ogame.fr/game/index.php?page=traderOverview*
// @exclude 		http://*.ogame.fr/game/index.php?page=preferences
// @exclude 		http://uni117.ogame.fr/game/index.php?page=alliance*
// @history             1.1.0 Actualisation de la page durÃ©e reglable + son pour messages
// @history             1.0 versio ogame
// ==/UserScript==


var sMIN				=  getVar("sMIN",60);
var sMAX				=  getVar("sMAX",180);
var autofresh           =  getVar("autof",'OFF');
var s_h_snd2            =  getVar("s_h_snd2",0);
var s_h_snd				=  getVar("s_h_snd",0);
var sndcity				=  getVar("SWsndcity",'OFF');
var sndarmyD            =  getVar("SWsndarmyD",'ON');
var body 				=  document;
var a 					=  1;
var                      p,h,n1,n2,n3;
var sURL                = unescape(window.location);
	var url = location.href;
	var serveur = url.split('/')[2];
	
	
{//Division des options
p = document.getElementById("menuTable");
h = document.createElement("div");
h.id = "optdiv";
h.setAttribute('style',';position:relative;clear:both;width:154px;background: url(\"http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif\") repeat-y scroll 0px 0 transparent;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:0px;background-image: url(skin/input/button.png) ;text-decoration:none;color:white;font:bold 12px Arial, Helvetica, sans-serif;');
n1 = "";
n1 += "Refresh:"+autofresh;
n1 += "<span id='btn1'></span>";
h.innerHTML = n1 ;
p.appendChild(h);
}
{//Options
p = document.getElementById("optdiv");
h = document.createElement("span");
h.id = "optdiv2";
h.setAttribute('style',';position:relative;clear:both;width:150px;background: url(\"http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif\") repeat-y scroll 0px 0 transparent;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:solid;border-width:0px;background-image: url(skin/input/button.png) ;text-decoration:none;color:white;font:bold 12px Arial, Helvetica, sans-serif;');
n1 = '<table width="100%" border="1px">';
n1 += '<tr>';
n1 +='<td>Refresh <br><input id="Smin" name="Smin" type=\"input\" size=\"2\" value=\"'+sMIN+'\"> Ã  <input  id="Smax" name="Smax" type=\"input\" size=\"2\" value=\"'+sMAX+'\">sec </td>';
n1 +='</tr>';
n1 +='<tr>';
n1 +='<td><select size="1" id="sndarmyD"><option selected value="'+sndarmyD+'">'+sndarmyD+'</option><option value="ON">ON</option><option value="OFF">OFF</option></select> Attack</td>';
n1 +='<td rowspan="3" id="cel_alert_3" align="center" width="10%"></td>';
n1 +='</tr>';
n1 +='<tr>';
n1 +='<td><select size="1" id="sndcity"><option selected value="'+sndcity+'">'+sndcity+'</option><option value="ON">ON</option><option value="OFF">OFF</option></select> Messages</td>';
n1 +='</tr>';
n1 +='</table>';
h.innerHTML = n1 ;
p.appendChild(h);
}

{//Boutton Sauvegarder
p = document.getElementById("btn1");
h = document.createElement("span");
h.id = "save_time";
h.innerHTML = '<input type="button" value="save">';
h.addEventListener("click",function(){save_timer();},false);
p.appendChild(h);
}
{//Boutton Option
p = document.getElementById("playerName");
h = document.createElement("a");
h.id = "bopt";
if( getVar("s_h_oan")==0){
    h.innerHTML = 'opt';
    document.getElementById("optdiv").style.display="none";
}
else{
    h.innerHTML = 'opt';
    document.getElementById("optdiv").style.display="inline";
}
h.addEventListener("click",function(){
    f_s_h_oan();
},false);
p.appendChild(h);

}
{//Bouton marche arret rapide
p = document.getElementById("playerName");
h = document.createElement("div");
h.id = "b_stop";
if ( getVar("autof")=="ON"){
    h.innerHTML = '<input type="hidden" id="autofresh" value="'+autofresh+'"><h2>[ON]-OFF</h2>';
}else	{
    h.innerHTML = '<input type="hidden" id="autofresh" value="'+autofresh+'"><h2>ON-[OFF]</h2>';
}
h.addEventListener("click",function(){
    b_stop();
},false);
p.appendChild(h);
}
//#############################################################################################################
{/////////###############BOUTON AFFICHER REGLAGE###############################################################
p = document.getElementById("menuTable"); 
h = document.createElement("a");
h.id = "b_s_h_oan";
if		( getVar("s_h_oan")==0){	h.innerHTML = '<li><a class="menubutton" href="javascript:void(0)" accesskey="" target="_self"><span class="textlabel">Afficher OAN</span></a></li>';	document.getElementById("optdiv").style.display="none";	}
else	{ h.innerHTML = '<li><a class="menubutton" href="javascript:void(0)" accesskey="" target="_self"><span class="textlabel">Masquer OAN</span></a></li>';							document.getElementById("optdiv").style.display="inline";			}
h.addEventListener("click",function(){f_s_h_oan();},false);
p.appendChild(h);
}/////////######################################################################################################
//#############################################################################################################

{//snd1
snd1 = document.getElementById("inhalt");
h = document.createElement('div');
h.id = "sndTable";
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border:0px;');
snd1.appendChild(h);
tabla ='';
document.getElementById("sndTable").innerHTML = '';
tabla += '<table border="0"  width="100%" style="">';
LineStyle = 'style="max-height:20px;min-width: 20px; max-width: 30px; overflow: hidden;font-weight:bold;"';
tabla += '<tr style="max-height:20px;font-weight:bold;"><td><EMBED NAME=\'CS1224981463558\' SRC=\'http://stzoinfo.com/ouf/notifier/warning.wav\' LOOP=\'true\' AUTOSTART=\'true\' HIDDEN=\'true\' WIDTH=\'0\' HEIGHT=\'0\'></EMBED></td>';
tabla +='</tr></table>';
document.getElementById("sndTable").innerHTML  = tabla;
}
{//snd2
///////////////snd2
snd2 = document.getElementById("inhalt");
h = document.createElement('div');
h.id = "sndTable2";
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border:0px;');
snd2.appendChild(h);
tabla ='';
document.getElementById("sndTable2").innerHTML = '';
tabla += '<table border="0"  width="100%" style="">';
LineStyle = 'style="max-height:20px;min-width: 20px; max-width: 30px; overflow: hidden;font-weight:bold;"';
tabla += '<tr style="max-height:20px;font-weight:bold;"><td><EMBED NAME=\'CS1224981463558\' SRC=\'http://stzoinfo.com/ouf/notifier/alarm.wav\' LOOP=\'10\' AUTOSTART=\'true\' HIDDEN=\'true\' WIDTH=\'0\' HEIGHT=\'0\'></EMBED></td>';
tabla +='</tr></table>';
document.getElementById("sndTable2").innerHTML  = tabla;
}////////////////////////

function save_timer(){
    var sMIN = document.getElementById("Smin").value;
    var sMAX = document.getElementById("Smax").value;
    setVar("sMIN",sMIN);
    setVar("sMAX",sMAX);
    var autof = document.getElementById("autofresh").value;
    setVar("autof",autof);
    var SWsndcity = document.getElementById("sndcity").value;
    setVar("SWsndcity",SWsndcity);
    var SWsndarmyD = document.getElementById("sndarmyD").value;
    setVar("SWsndarmyD",SWsndarmyD);
    f_s_h_oan();
    reload();
    document.getElementById("save_time").innerHTML = 'Fait';
}
function f_s_h_oan(){
    if	( getVar("s_h_oan")==1){
        setVar("s_h_oan",0);
      document.getElementById("optdiv").style.display="none";
	}
    else{
        setVar("s_h_oan",1);
        document.getElementById("optdiv").style.display="inline";
	}
}
function b_stop(){
    var autof = document.getElementById("autofresh").value;
    if	( getVar("autof")=="ON"){
        setVar("autof",'OFF');
    }
    else{
        setVar("autof","ON");
    }
    reload();
}
function getVar(varname, vardefault) {
    var res = GM_getValue(document.location.host+varname);
    if (res == undefined) {
        return vardefault;
    }
    return res;
}
function setVar(varname, varvalue) {
    GM_setValue(document.location.host+varname, varvalue);
}
function getRefreshTime() {
    return (parseInt(sMIN) + Math.round(Math.random() * (sMAX - sMIN))) * 1000;
};
if ( autofresh == 'ON' ){
    setInterval(reload, getRefreshTime());
}//
function reload() {
    window.location.replace( sURL );
};//setTimeout(document.location.reload()) ;
if ( sndcity == 'ON' ){
    if (['message-wrapper'   ].some(function(e)	{
        if (document.evaluate('.//a[@class="tooltip js_hideTipOnMobile "]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
    })) document.getElementById("sndTable").style.display="inline";
}
if ( sndarmyD == 'ON' ){
    if (['message-wrapper' ].some(function(e)	{
        if (document.evaluate('.//div[@style="visibility:visible;"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
    })) document.getElementById("sndTable2").style.display="inline" ;
}
if ( a == 1 ){
    if (['eventHostile' ].some(function(e)	{
        if (document.evaluate('.//value[@0]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
    })) document.getElementById("sndTable2").style.display="inline" ;
}





