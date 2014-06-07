// ==UserScript==
// @name           	VIGO 2.2
// @namespace      VIGO 2.2
// @description    	VIGO 2.2
// @author         	OMINN
// @include		http://*.ogame.*/*
// @exclude		http://*.ogame.fr/game/index.php?page=fleet*
// @exclude		http://*.ogame.fr/game/index.php?page=galaxy*
// @exclude 		http://*.ogame.fr/game/index.php?page=messages*
// @exclude 		http://*.ogame.fr/game/index.php?page=traderOverview*
// @exclude 		http://*.ogame.fr/game/index.php?page=preferences
// @exclude 		http://uni122.ogame.fr/game/index.php?page=alliance*
// @history             2.2 Busca eventos 
// @history             2.2 Version new
// @history             2.2 version
// ==/UserScript==

var sMIN				=  getVar("sMIN",75);
var sMAX				=  getVar("sMAX",240);
var autofresh           =  getVar("autof",'OFF');
var alrt_mess           =  getVar("stt_alrt_mess",'OFF');
var alrt_atak           =  getVar("stt_alrt_atak",'OFF');
var s_h_snd2            =  getVar("s_h_snd2",0);
var s_h_snd				=  getVar("s_h_snd",0);
var body 				=  document;
var a 					=  1;
var                        p,h,n1,n2,n3;
var sURL                = unescape(window.location);
var url 				= location.href;
var serveur 			= url.split('/')[2];


{//Division OAN											div_oan
p = document.getElementById("menuTable");
h = document.createElement("div");
h.id = "div_oan";
h.setAttribute('style',';position:relative;width:170px;text-align:center;');
n1 = "<br>";
n1 += '<span id="div_rfr" width="170px"></span>';
n1 += '<span id="div_alrt_mess"></span>';
n1 += '<span id="div_alrt_atak"></span>';
n1 += '<span id="div_timer"></span>';
n1 += '';
h.innerHTML = n1 ;
p.appendChild(h);
}//Division OAN

{//Division Bouton ON OFF refresh						bt_sttrfr in div_rfr
p = document.getElementById("div_rfr");
h = document.createElement("div");
h.id = "b_stop";
h.setAttribute('style',';width:145px;border: 1px outset black;color: #6f9fc8;background-color: #0d1014;text-align:center;padding-top: 5px;padding-bottom: 5px;');
if ( getVar("autof")=="ON"){
    h.innerHTML = 'Refresh : <input type="hidden" id="autofresh" value="'+autofresh+'"><font color="green">[ON]</font> - <font color="red">OFF </font> ';
}else	{
    h.innerHTML = 'Refresh : <input type="hidden" id="autofresh" value="'+autofresh+'"><font color="red">ON</font> - <font color="green">[OFF]</font> ';
}
h.addEventListener("click",function(){
    b_stop();
},false);
p.appendChild(h);

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
}//Division Bouton ON OFF refresh

{//Division Bouton ON OFF alerte messages				bt_alrt_mess in div_alrt_mes
p = document.getElementById("div_alrt_mess");
h = document.createElement("div");
h.id = "bt_alrt_mess";
h.setAttribute('style',';width:145px;margin-top : 5px;padding-top: 5px;padding-bottom: 5px;border-top: 1px outset black;border-left: 1px outset black;border-right: 1px outset black;color: #6f9fc8;background-color: #0d1014;text-align:center;');
if ( getVar("stt_alrt_mess")=="ON"){
    h.innerHTML = 'Son Message : <br><input type="hidden" id="alrt_mess" value="'+alrt_mess+'"><font color="green">[ON]</font> - <font color="red">OFF </font> ';
}else	{
    h.innerHTML = 'Son Message : <br><input type="hidden" id="alrt_mess" value="'+alrt_mess+'"><font color="red">ON</font> - <font color="green">[OFF]</font> ';
}
h.addEventListener("click",function(){
    b_alrt_mess();
},false);
p.appendChild(h);

function b_alrt_mess(){
    var stt_alrt_mess = document.getElementById("alrt_mess").value;
    if	( getVar("stt_alrt_mess")=="ON"){
        setVar("stt_alrt_mess",'OFF');
    }
    else{
        setVar("stt_alrt_mess","ON");
    }
    reload();
}
}//Division Bouton ON OFF alerte messages

{//Division Bouton ON OFF alerte atak					bt_alrt_atak in div_alrt_atak
p = document.getElementById("div_alrt_atak");
h = document.createElement("div");
h.id = "bt_alrt_atak";
h.setAttribute('style',';width:145px;padding-top: 5px;padding-bottom: 5px;border-bottom: 1px outset black;border-left: 1px outset black;border-right: 1px outset black;color: #6f9fc8;background-color: #0d1014;text-align:center;');
if ( getVar("stt_alrt_atak")=="ON"){
    h.innerHTML = 'Son Attaque : <br><input type="hidden" id="alrt_atak" value="'+alrt_atak+'"><font color="green">[ON]</font> - <font color="red">OFF </font> ';
}else	{
    h.innerHTML = 'Son Attaque : <br><input type="hidden" id="alrt_atak" value="'+alrt_atak+'"><font color="red">ON</font> -<font color="green">[OFF]</font> ';
}
h.addEventListener("click",function(){
    b_alrt_atak();
},false);
p.appendChild(h);

function b_alrt_atak(){
    var stt_alrt_atak = document.getElementById("alrt_atak").value;
    if	( getVar("stt_alrt_atak")=="ON"){
        setVar("stt_alrt_atak",'OFF');
    }
    else{
        setVar("stt_alrt_atak","ON");
    }
    reload();
}
}//Division Bouton ON OFF alerte atak

{//Division timer										stt_timer
p = document.getElementById("div_timer");
h = document.createElement("div");
h.id = "stt_timer";
h.setAttribute('style',';width:140px;margin-bottom : 5px;margin-top : 5px;border: 1px outset black;color: #6f9fc8;background-color: #0d1014;text-align:left;padding-top: 5px;padding-bottom: 5px;padding-left: 5px;');
n1 = '';
n1 += 'Refresh ';
n1 += '<input id="Smin" name="Smin" type=\"input\" size=\"1\" value=\"'+sMIN+'\"> sec mini<br>';
n1 += 'Refresh ';
n1 += '<input id="Smax" name="Smax" type=\"input\" size=\"1\" value=\"'+sMAX+'\"> sec maxi';
n1 += '<div id="bt_save"></div>';
n1 += '';
h.innerHTML = n1 ;
p.appendChild(h);

{//Boutton Sauvegarder									bt_save
p = document.getElementById("bt_save");
h = document.createElement("div");
h.id = "save_time";
h.setAttribute('style',';text-align:center;padding-top: 5px;');
h.innerHTML = '<input type="button" value="save" title=""  class="btn_blue" >';
h.addEventListener("click",function(){save_timer();},false);
p.appendChild(h);
}//Boutton Sauvegarder

}//Division timer

{//snd1 son message
snd1 = document.getElementById("inhalt");
h = document.createElement('div');
h.id = "sndTable";
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border:0px;');
snd1.appendChild(h);
tabla ='';
document.getElementById("sndTable").innerHTML = '';
tabla += '<table border="0"  width="100%" style="">';
LineStyle = 'style="max-height:20px;min-width: 20px; max-width: 30px; overflow: hidden;font-weight:bold;"';
tabla += '<tr style="max-height:20px;font-weight:bold;"><td><EMBED NAME=\'CS1224981463558\' SRC=\'http://xlx.ogame.free.fr/sons/sirene1.mp3\' LOOP=\'false\' AUTOSTART=\'true\' HIDDEN=\'true\' WIDTH=\'0\' HEIGHT=\'0\'></EMBED></td>';
tabla +='</tr></table>';
document.getElementById("sndTable").innerHTML  = tabla;
}//snd1 son message
{//snd2 son attaque
snd2 = document.getElementById("inhalt");
h = document.createElement('div');
h.id = "sndTable2";
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border:0px;');
snd2.appendChild(h);
tabla ='';
document.getElementById("sndTable2").innerHTML = '';
tabla += '<table border="0"  width="100%" style="">';
LineStyle = 'style="max-height:20px;min-width: 20px; max-width: 30px; overflow: hidden;font-weight:bold;"';
tabla += '<tr style="max-height:20px;font-weight:bold;"><td><EMBED NAME=\'CS1224981463558\' SRC=\'http://www.coreybarksdale.com/Music/Punk%20Floyd/03%20-%20Maison%20D%27etre.mp3\' LOOP=\'\' AUTOSTART=\'true\' HIDDEN=\'true\' WIDTH=\'0\' HEIGHT=\'0\'></EMBED></td>';
tabla +='</tr></table>';
document.getElementById("sndTable2").innerHTML  = tabla;
}//snd2 son attaque

{//Boutton Option
p = document.getElementById("playerName");
h = document.createElement("a");
h.id = "bopt";
if( getVar("s_h_oan")==0){
    h.innerHTML = 'Emy';
    document.getElementById("div_oan").style.display="none";
}
else{
    h.innerHTML = 'VeoVeo';
    document.getElementById("div_oan").style.display="inline";
}
h.addEventListener("click",function(){
    f_s_h_oan();
},false);
p.appendChild(h);

}//Boutton Option

{//BOUTON AFFICHER REGLAGE
p = document.getElementById("menuTable"); 
h = document.createElement("a");
h.id = "b_s_h_oan";
if		( getVar("s_h_oan")==0){	h.innerHTML = '<li><a class="menubutton" href="javascript:void(0)" accesskey="" target="_self"><span class="textlabel">Abrir</span></a></li>';	document.getElementById("div_oan").style.display="none";	}
else	{ h.innerHTML = '<li><a class="menubutton" href="javascript:void(0)" accesskey="" target="_self"><span class="textlabel">CERRAR</span></a></li>';							document.getElementById("div_oan").style.display="inline";			}
h.addEventListener("click",function(){f_s_h_oan();},false);
p.appendChild(h);
}//BOUTON AFFICHER REGLAGE


function save_timer(){
    var sMIN = document.getElementById("Smin").value;
    var sMAX = document.getElementById("Smax").value;
    setVar("sMIN",sMIN);
    setVar("sMAX",sMAX);
    reload();
    document.getElementById("save_time").innerHTML = '<br>Fait';
}

function f_s_h_oan(){
    if	( getVar("s_h_oan")==1){
        setVar("s_h_oan",0);
		reload();
      document.getElementById("div_oan").style.display="none";
	}
    else{
        setVar("s_h_oan",1);
		reload();
        document.getElementById("div_oan").style.display="inline";
	}
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

if ( alrt_mess == 'ON' ){
    if (['message-wrapper'   ].some(function(e)	{
        if (document.evaluate('.//a[@class="tooltip js_hideTipOnMobile "]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
    })) document.getElementById("sndTable").style.display="inline";
}

if ( alrt_atak == 'ON' ){
    if (['message-wrapper' ].some(function(e)	{
        if (document.evaluate('.//div[@class="tooltip eventToggle soon"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
    })) document.getElementById("sndTable2").style.display="inline" ;
}

if ( a == 1 ){
    if (['eventHostile' ].some(function(e)	{
        if (document.evaluate('.//value[@0]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
    })) document.getElementById("sndTable2").style.display="inline" ;
}