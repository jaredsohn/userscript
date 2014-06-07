// ==UserScript==
// @name           	OAN Ogame Alert Notifier
// @namespace      	OAN Ogame Alert Notifier
// @description    	Un script qui actualise la page et emet des sons en cas de danger
// @author         	Lidmaster
// @include			http://*.ogame.*/*

// @history         1.1.0 Actualisation de la page durée reglable + son pour messages
// @history         1.0 versio ogame

// ==/UserScript==

var sMIN		=  getVar("sMIN",60);
var sMAX		=  getVar("sMAX",180);
var autofresh	=  getVar("autof",'OFF');
var s_h_snd2	=  getVar("s_h_snd2",0);
var s_h_snd		=  getVar("s_h_snd",0);
var sndcity		=  getVar("SWsndcity",'OFF');
var sndarmy		=  getVar("SWsndarmy",'OFF');
var sndarmyD	=  getVar("SWsndarmyD",'ON');
var sndchch		=  getVar("SWsndchch",'OFF');
var sndmsg		=  getVar("SWsndmsg",'OFF');
var body 		=  document;
var a 			=  1;
var 		   p,h,n1,n2,n3;
var sURL = unescape(window.location.pathname);

p = document.body; 						  
h = document.createElement('div'); 						 
h.id = "alerteur"; 	
h.setAttribute('style','z-index:0;position:relative;top:10px;left:10px;margin:0px auto 00px;width:800px;'); 
p.appendChild(h);

p = document.getElementById("alerteur"); 
h = document.createElement('div'); 						 
h.id = "menu_alert"; 	
h.setAttribute('style','z_index:0;padding:7px 0px 7px 0px; position:relative;width:100%;auto 0px;clear:both;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background-image: url(skin/input/button.png) ;text-decoration:none;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;text-align:left;'); 
h.innerHTML = '<table align="left" width="100%"><tr><td "GLon" id="GLon_off" align="center" width="10%"></td><td id="cel_alert_1" align="center">Ogame Alert Notifier</td><td id="cel_alert_2" align="center" width="10%"></td><td id="cel_alert_33" align="center" width="10%"></td><td id="cel_alert_4" align="center" width="10%"></td><td id="cel_alert_5" align="center" width="10%"></td><td id="cel_alert_6" align="center" width="10%" class="leftmenu"></td></tr></table>'; 
p.appendChild(h);

p = document.getElementById("alerteur"); 
h = document.createElement('div'); 
h.className = 'table_alert'; 
h.id = "optTable";		
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background-image: url(skin/input/button.png) ;text-decoration:none;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;');
p.appendChild(h);

p = document.getElementById("alerteur"); 
h = document.createElement('div'); 
h.className = 'table_alert';
h.id = "sndTable"; 	
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border:0px;'); 
p.appendChild(h);

p = document.getElementById("alerteur"); 
h = document.createElement('div'); 
h.className = 'table_alert'; 
h.id = "sndTable2";	
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border:0px;');
p.appendChild(h);

/*
p = document.body;
h = document.createElement('div');
h.id = "backgroundalert";
h.setAttribute('style','z-index:-50;position:relative;overflow:visible;left:0px;top:-110px;height:1200px;width:1920;background-size:1920,1200;background-position:center;background-image: url(http://gf2.geo.gfsrv.net/cdnaf/061a8c84d2d5c470a7d049f9d90cb8.jpg) ;');
h.innerHTML = '' 
p.appendChild(h);

p = document.body;
h = document.createElement('div');
h.id = "backgroundalert2";
h.setAttribute('style','z-index:-1;overflow:visible;position:relative;top:-110px;;height:600px;;width:1920;background-size:1920,600;background-position:center;background-image: url(http://gf2.geo.gfsrv.net/cdn7d/6f875d52eb0d7fad05feca40164375.jpg) ;');
h.innerHTML = ''
p.appendChild(h);
*/


ika_alert_notifier();
function ika_alert_notifier(){



if (a=1){

tabla ='';

	document.getElementById("optTable").innerHTML = '';
	tabla += '<table border="1" bordercolor="#c69262" width="100%">';
	LineStyle = 'style="max-height:20px;min-width: 20px; max-width: 30px; overflow: hidden;font-weight:bold;background-image: url(skin/input/button.png)"';
	tabla += '<tr style="max-height:20px;font-weight:bold;background-image: url(skin/input/button.png);">';
	tabla +='';
	tabla +='';
	tabla +='<td><select size="1" id="autofresh"><option selected value="'+autofresh+'">'+autofresh+'</option><option value="ON">ON</option><option value="OFF">OFF</option></select> = Refresh =  de <input id="Smin" name="Smin" type=\"input\" size=\"3\" value=\"'+sMIN+'\">sec à <input  id="Smax" name="Smax" type=\"input\" size=\"3\" value=\"'+sMAX+'\">sec </td>';
	tabla +='<td><select size="1" id="sndarmyD"><option selected value="'+sndarmyD+'">'+sndarmyD+'</option><option value="ON">ON</option><option value="OFF">OFF</option></select> = Alert Espionnage</td>';
	tabla +='';
	tabla +='<td rowspan="3" id="cel_alert_3" align="center" width="10%"></td>';
	tabla +='</tr>';
	tabla +='<tr>';
	tabla +='<td><select size="1" id="sndcity"><option selected value="'+sndcity+'">'+sndcity+'</option><option value="ON">ON</option><option value="OFF">OFF</option></select> = Alert Messages</td>';
	tabla +='<td><select size="1" id="sndarmy"><option selected value="'+sndarmy+'">'+sndarmy+'</option><option value="ON">ON</option><option value="OFF">OFF</option></select> = Alert attack Army</td>';
	tabla +='</td></tr>';
	tabla +='<tr><td></td></tr>';
	tabla +='';
	tabla +='';
	tabla +='';
	tabla +='</table>';
	document.getElementById("optTable").innerHTML  = tabla;
						
	tabla ='';
	document.getElementById("sndTable").innerHTML = '';
	tabla += '<table border="0"  width="100%" style="">';
	LineStyle = 'style="max-height:20px;min-width: 20px; max-width: 30px; overflow: hidden;font-weight:bold;"';
	tabla += '<tr style="max-height:20px;font-weight:bold;"><td><EMBED NAME=\'CS1224981463558\' SRC=\'http://stzoinfo.com/ouf/notifier/warning.wav\' LOOP=\'false\' AUTOSTART=\'true\' HIDDEN=\'true\' WIDTH=\'0\' HEIGHT=\'0\'></EMBED></td>';
	tabla +='</tr></table>';
	document.getElementById("sndTable").innerHTML  = tabla;

tabla ='';

	document.getElementById("sndTable2").innerHTML = '';
	tabla += '<table border="1" bordercolor="#c69262" width="100%"">';
	LineStyle = 'style="max-height:20px;min-width: 20px; max-width: 30px; overflow: hidden;font-weight:bold;background-image: url(skin/input/button.png)"';
	tabla += '<tr style="max-height:20px;font-weight:bold;background-image: url(skin/input/button.png);"><td>   <EMBED NAME=\'CS1224981463558\' SRC=\'http://stzoinfo.com/ouf/notifier/alarm.wav\' LOOP=\'true\' AUTOSTART=\'true\' HIDDEN=\'true\' WIDTH=\'0\' HEIGHT=\'0\'></EMBED></td>';
	tabla +='</tr></table>';
	document.getElementById("sndTable2").innerHTML  = tabla;
						
						}
else	{ document.getElementById("dealers").innerHTML  = "No Data to display"; }
						}
						

						
p = document.getElementById("cel_alert_3");
h = document.createElement('a');
h.setAttribute('class','factorbutton');
h.id = "save_time";
h.innerHTML = '<span class="button188">Sauver Option</span>';								
h.addEventListener("click",function(){save_timer();},false);p.appendChild(h);
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
//alert(autof);
reload();									
document.getElementById("save_time").innerHTML = 'Sauver Option';		}



						
p = document.getElementById("cel_alert_6");h = document.createElement('a');h.setAttribute('class','button');h.id = "b_s_h_opt";
if		( getVar("s_h_opt")==0){	h.innerHTML = '<span class="button188">Afficher Menu Option</span>';		document.getElementById("optTable").style.display="none"; }
else	{ h.innerHTML = '<span class="button188">Masquer Menu Option</span>';									document.getElementById("optTable").style.display="inline";	}
h.addEventListener("click",function(){f_s_h_opt();},false);p.appendChild(h);
function f_s_h_opt(){
	if	( getVar("s_h_opt")==1){		setVar("s_h_opt",0);	document.getElementById("b_s_h_opt").innerHTML = '<span class="button188">Afficher Menu Option</span>';		document.getElementById("optTable").style.display="none";}
	else{ setVar("s_h_opt",1);									document.getElementById("b_s_h_opt").innerHTML = '<span class="button188">Masquer Menu Option</span>';		document.getElementById("optTable").style.display="inline";	}
}

/*	*/				
p = document.getElementById("cel_alert_5");h = document.createElement('a');h.setAttribute('class','button');h.id = "b_s_h_snd";
if		( getVar("s_h_snd")==0){ h.innerHTML = 'ON Warning';document.getElementById("sndTable").style.display="none"; }
else	{ h.innerHTML = 'OFF Warning'; 						document.getElementById("sndTable").style.display="inline"; }
h.addEventListener("click",function(){f_s_h_snd();},false);p.appendChild(h);
function f_s_h_snd(){
	if	( getVar("s_h_snd")==1){ 		setVar("s_h_snd",0); 	document.getElementById("b_s_h_snd").innerHTML = 'ON Warning'; document.getElementById("sndTable").style.display="none"; }
	else{ setVar("s_h_snd",1); 									document.getElementById("b_s_h_snd").innerHTML = 'OFF Warning'; document.getElementById("sndTable").style.display="inline"; }
}

					
p = document.getElementById("cel_alert_4");h = document.createElement('a');h.setAttribute('class','button');h.id = "b_s_h_snd2";
if		( getVar("s_h_snd2")==0){ h.innerHTML = 'ON Alarm'; document.getElementById("sndTable2").style.display="none"; }
else	{ h.innerHTML = 'OFF Alarm'; 			document.getElementById("sndTable2").style.display="inline"; }

h.addEventListener("click",function(){f_s_h_snd2();},false);
p.appendChild(h);
function f_s_h_snd2()	{
	if(getVar("s_h_snd2")==1){ setVar("s_h_snd2",0); document.getElementById("b_s_h_snd2").innerHTML = 'ON Alarm'; document.getElementById("sndTable2").style.display="none"; }
	else{ setVar("s_h_snd2",1); document.getElementById("b_s_h_snd2").innerHTML = 'OFF Alarm'; document.getElementById("sndTable2").style.display="inline"; }
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
if ( sndarmy == 'ON' ){if (['advMilitary' ].some(function(e) 	{ if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true; })) document.getElementById("sndTable").style.display="inline";}
if ( sndarmyD == 'ON' ){if (['advMilitary' ].some(function(e)	{ if (document.evaluate('.//a[@class="normalalert"]', document.getElementById(e), null, 8, null).singleNodeValue) return true; })) document.getElementById("sndTable2").style.display="inline" ;}


