// ==UserScript==
// @name           	OAN
// @namespace      	OAN 
// @description    	Un script qui actualise la page et emet des sons en cas de danger
// @author         	Lidmaster
// @include			http://*.ogame.*/*
// @history         1.1.0 Actualisation de la page durée reglable + son pour messages
// @history         1.0 versio ogame

// ==/UserScript==

{/////////########################VARIABLE####################	
var sMIN		=  getVar("sMIN",60);
var sMAX		=  getVar("sMAX",180);
var autofresh	=  getVar("autof",'OFF');
var s_h_snd2	=  getVar("s_h_snd2",0);
var s_h_snd		=  getVar("s_h_snd",0);
//var s_h_oan		=  getVar("s_h_oan",1);
var sndcity		=  getVar("SWsndcity",'OFF');
var sndarmy		=  getVar("SWsndarmy",'OFF');
var sndarmyD	=  getVar("SWsndarmyD",'ON');
var sndchch		=  getVar("SWsndchch",'OFF');
var sndmsg		=  getVar("SWsndmsg",'OFF');
var body 		=  document;
var a 			=  1;
var 		   p,h,n1,n2,n3;
var sURL = unescape(window.location.pathname);}/////////#############################	


//#############################################################################################################
{/////////###############BOUTON AFFICHER REGLAGE###############################################################
p = document.getElementById("menuTable"); 
h = document.createElement("a");
h.id = "b_s_h_oan";
if		( getVar("s_h_oan")==0){	h.innerHTML = '<li><a class="menubutton" href="javascript:void(0)" accesskey="" target="_self"><span class="textlabel">Afficher OAN</span></a></li>';	}
else	{ h.innerHTML = '<li><a class="menubutton" href="javascript:void(0)" accesskey="" target="_self"><span class="textlabel">Masquer OAN</span></a></li>';									}
h.addEventListener("click",function(){f_s_h_oan();},false);
p.appendChild(h);
}/////////######################################################################################################
//#############################################################################################################

//#############################################################################################################
{/////////################Onoff################################################################################
p = document.getElementById("links"); 
h = document.createElement("div");
h.id = "resourcesontransitWrapper";
n1 = "<table border='2px'id='resourcesontransitHeader'><tr>";
n1 +="<td><h4 style='color: #6F9FC8; font-size: 11px; margin: 0; padding: 9px 0 0;'>Alert Notifier</h4></td>";
n1 +="<td><select size='1' id='autofresh'><option selected value='"+autofresh+"'>"+autofresh+"</option><option value='ON'>ON</option><option value='OFF'>OFF</option></select></td>";
n1 +="<td id='btn1'></td>";
n1 +="</tr></table>";
n2 = "<div id='optdiv'></div>";
h.innerHTML = n1 + n2;
p.appendChild(h);
}/////////################Onoff################################################################################
//#############################################################################################################

//#############################################################################################################
{/////////#############BOUTON SAVE#############################################################################
p = document.getElementById("btn1");	
h = document.createElement("a");
h.id = "save_time";
h.innerHTML = 'Save';
h.addEventListener("click",function(){save_timer();},false);
p.appendChild(h);
}/////////#############################	#######################################################################
//#############################################################################################################

//#############################################################################################################
{/////////#############opt################	
p = document.getElementById("optdiv");
h = document.createElement("div");
h.id = "optdiv2";
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background-image: url(skin/input/button.png) ;text-decoration:none;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;');
n1 = '<table align="center">';
n1 += '<tr>';
n1 +='<td align="center">Refresh <br><input id="Smin" name="Smin" type=\"input\" size=\"3\" value=\"'+sMIN+'\">sec à <input  id="Smax" name="Smax" type=\"input\" size=\"3\" value=\"'+sMAX+'\">sec </td>';
n1 +='</tr>';
n1 +='<tr>';
n1 +='<td align="center"><select size="1" id="sndarmyD"><option selected value="'+sndarmyD+'">'+sndarmyD+'</option><option value="ON">ON</option><option value="OFF">OFF</option></select>Alert Attack</td>';
n1 +='<td rowspan="3" id="cel_alert_3" align="center" width="10%"></td>';
n1 +='</tr>';
n1 +='<tr>';
n1 +='<td align="center"><select size="1" id="sndcity"><option selected value="'+sndcity+'">'+sndcity+'</option><option value="ON">ON</option><option value="OFF">OFF</option></select>Alert message</td>';
n1 +='</tr>';
n1 +='</table>';
h.innerHTML = n1 ;	
p.appendChild(h);
}/////////#############################	
//#############################################################################################################





{///////////////snd1
snd1 = document.getElementById("resourcesontransitWrapper"); 
h = document.createElement('div'); 
h.id = "sndTable"; 	
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border:0px;'); 
snd1.appendChild(h);
tabla ='';
document.getElementById("sndTable").innerHTML = '';
tabla += '<table border="0"  width="100%" style="">';
LineStyle = 'style="max-height:20px;min-width: 20px; max-width: 30px; overflow: hidden;font-weight:bold;"';
tabla += '<tr style="max-height:20px;font-weight:bold;"><td><EMBED NAME=\'CS1224981463558\' SRC=\'http://stzoinfo.com/ouf/notifier/warning.wav\' LOOP=\'false\' AUTOSTART=\'true\' HIDDEN=\'true\' WIDTH=\'0\' HEIGHT=\'0\'></EMBED></td>';
tabla +='</tr></table>';
document.getElementById("sndTable").innerHTML  = tabla;
}////////////////////////
/*
{///////////////snd2
snd1 = document.getElementById("resourcesontransitWrapper"); 
h = document.createElement('div'); 
h.id = "sndTable2"; 	
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border:0px;'); 
snd1.appendChild(h);
tabla ='';
document.getElementById("sndTable").innerHTML = '';
tabla += '<table border="0"  width="100%" style="">';
LineStyle = 'style="max-height:20px;min-width: 20px; max-width: 30px; overflow: hidden;font-weight:bold;"';
tabla += '<tr style="max-height:20px;font-weight:bold;"><td><EMBED NAME=\'CS1224981463558\' SRC=\'http://stzoinfo.com/ouf/notifier/alert.wav\' LOOP=\'false\' AUTOSTART=\'true\' HIDDEN=\'true\' WIDTH=\'0\' HEIGHT=\'0\'></EMBED></td>';
tabla +='</tr></table>';
document.getElementById("sndTable").innerHTML  = tabla;
}////////////////////////
*/


function f_s_h_oan(){
	if	( getVar("s_h_oan")==1){		setVar("s_h_oan",0);	document.getElementById("b_s_h_oan").innerHTML = '<li><a class="menubutton" href="javascript:void(0)" accesskey="" target="_self"><span class="textlabel">Afficher OAN</span></a></li>';		document.getElementById("optdiv2").style.display="none";}
	else{ setVar("s_h_oan",1);									document.getElementById("b_s_h_oan").innerHTML = '<li><a class="menubutton" href="javascript:void(0)" accesskey="" target="_self" ><span class="textlabel">Masquer OAN</span></a></li>';		document.getElementById("optdiv2").style.display="inline";	}
}

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
var SWsndarmy = document.getElementById("sndarmy").value;
setVar("SWsndarmy",SWsndarmy);
var SWsndchch = document.getElementById("sndchch").value;
setVar("SWsndchch",SWsndchch);
var SWsndmsg = document.getElementById("sndmsg").value;
setVar("SWsndmsg",SWsndmsg);
alert();
reload();	
document.getElementById("save_time").innerHTML = 'Sauver Option';									
}

function getVar(varname, vardefault) { var res = GM_getValue(document.location.host+varname); if (res == undefined) { return vardefault; } return res; } 
function setVar(varname, varvalue) { GM_setValue(document.location.host+varname, varvalue); }
function getRefreshTime() { return (parseInt(sMIN) + Math.round(Math.random() * (sMAX - sMIN))) * 1000; };
function getstoptime() { return 60000; }; 
function getstoptime2() { return 60000; }; 
if ( autofresh == 'ON' ){setInterval(reload, getRefreshTime());}//
function reload() {     window.location.replace( sURL ); };//setTimeout(document.location.reload()) ;
setInterval(stopsnd, getstoptime());
function stopsnd() { document.getElementById("sndTable").style.display="none" ; };
setInterval(stopsnd2, getstoptime2());
function stopsnd2() { document.getElementById("sndTable2").style.display="none" ; };
if ( sndcity == 'ON' ){ if (['message-wrapper'   ].some(function(e)	{ if (document.evaluate('.//a[@class="tipsStandard "]', document.getElementById(e), null, 8, null).singleNodeValue) return true; })) document.getElementById("sndTable").style.display="inline";}
if ( sndarmy == 'ON' ){if (['attack_alert' ].some(function(e) 	{ if (document.evaluate('.//a[@class="tipsStandard "]', document.getElementById(e), null, 8, null).singleNodeValue) return true; })) document.getElementById("sndTable2").style.display="inline";}
if ( sndarmyD == 'ON' ){if (['attack_alert' ].some(function(e)	{ if (document.evaluate('.//a[@class="tipsStandard eventToggle"]', document.getElementById(e), null, 8, null).singleNodeValue) return true; })) document.getElementById("sndTable2").style.display="inline" ;}


