// ==UserScript==
// @name           	LidOAN : Ogame Alert Notifier
// @namespace      	LidOAN : Ogame Alert Notifier
// @description    	LidOAN : Ogame Alert Notifier
// @author         	Lidmaster
// @version         6.32
// @include			http://*.ogame.*/*
// @copyright		Copyright (C) 2013 by Lidmaster (Italian translation by BoGnY | www.worldoftech.it)
// ==/UserScript==
var version = '6.32';
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
{// ##OAN3## 			Variables
var	p,h,n1,n2,n3;
var a				=  1;
var b				=  1;
var body			=	document;
var sURL            = 'http://uni122.ogame.fr/game/index.php?page=overview';
var url 			= location.href;
var serveur 		= url.split('/')[2];
var s_h_timer		=  getVar("s_h_timer",1);
var sMIN			=  getVar("sMIN",60);
var sMAX			=  getVar("sMAX",180);
var swt_stt			=  getVar("swt_stt",1);
var cnt_time 		= (parseInt(sMIN) + Math.round(Math.random() * (sMAX - sMIN)));
var snd_spy       	=  getVar("snd_spy",'OFF');
var snd_atak       	=  getVar("snd_atak",'OFF');
var snd_mess       	=  getVar("snd_mess",'OFF');
var bodyId 			= document.getElementsByTagName("body")[0].id;
var page_exclu 		= (bodyId != 'messages')&&(bodyId != 'resources')&&(bodyId != 'highscore')&&(bodyId != 'alliance')&&(bodyId != 'galaxy')&&(bodyId != 'preferences')&&(bodyId != 'traderOverview')&&(bodyId != 'fleet1')&&(bodyId != 'fleet2')&&(bodyId != 'fleet3');
var sp 				= document.getElementById("planetList");
var count 			= sp.getElementsByTagName('div').length;
var metas 			= document.getElementsByTagName('META');
}// ##OAN3## 			Variables
{// ##OAN3## 			Selection de la langue + Variable de texte
var i;for (i = 0; i < metas.length; i++)
if (metas[i].getAttribute('NAME') == "ogame-universe")break;
var meta_uni = metas[i].getAttribute('CONTENT');
var act_meta_uni= meta_uni
var lang = act_meta_uni.split('.')[2];

if( lang == 'fr'){
var txt_1 = 'Activer/Désactiver les alertes sonore des message';
var txt_2 = 'Activer/Désactiver les alertes sonore des espionnages';
var txt_3 = 'Activer/Désactiver les alertes sonore des attaque';
var txt_4 = 'Afficher/Masquer réglages de l\'auto-refresh';
var txt_5 = 'Temps de refresh';
var txt_6 = 'sec (min)';
var txt_7 = 'sec (max)';
var txt_8 = 'Sauvegarder';
var txt_9 = 'Pas de refresh';
var txt_10 = 'Refresh sur la planète active';
var txt_11 = 'Refresh sur la planète suivante';
var txt_12 = 'Refresh in ';
var txt_13 = 'No Refresh';
}

else if( lang == 'it'){
var txt_1 = 'Attiva/Disattiva avviso sonoro messaggio ricevuto';
var txt_2 = 'Attiva/Disattiva avviso sonoro spiata ricevuta';
var txt_3 = 'Attiva/Disattiva avviso sonoro attacco in corso';
var txt_4 = 'Mostra/Nascondi impostazioni auto-refresh';
var txt_5 = 'Impostazioni refresh';
var txt_6 = 'sec (min)';
var txt_7 = 'sec (max)';
var txt_8 = 'Salva';
var txt_9 = 'Disattiva auto-refresh';
var txt_10 = 'Attiva auto-refresh sul pianeta';
var txt_11 = 'Attiva auto-refresh sul pianeta successivo';
var txt_12 = 'Refresh in ';
var txt_13 = 'No Refresh';
}

else {
var txt_1 = 'Enable/Disable sound alert for message';
var txt_2 = 'Enable/Disable sound alert for spy';
var txt_3 = 'Enable/Disable sound alert for attack';
var txt_4 = 'Show/Hide settings for auto-refresh';
var txt_5 = 'Refresh settings';
var txt_6 = 'sec (min)';
var txt_7 = 'sec (max)';
var txt_8 = 'Save';
var txt_9 = 'Disable auto-refresh';
var txt_10 = 'Enable auto-refresh on planet';
var txt_11 = 'Enable auto-refresh on next planet';
var txt_12 = 'Refresh in ';
var txt_13 = 'No Refresh';
}
}// ##OAN3## 			Selection de la langue + Variable de texte
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
{// ##OAN3## 			Division - MaxiOAN								
p = document.getElementById('rechts');//rechts//myPlanets
h = p.insertBefore(document.createElement("div" ),p.firstChild);
h.id = "maxi_oan";
}// ##OAN3## 			Division - MaxiOAN		
{// ##OAN3## 			Division - Switch Sound									
p = document.getElementById("maxi_oan");
h = document.createElement("div");
h.id = "div_switch";
h.setAttribute('style',';width:150px;height:30px;margin:0px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 30px;');
p.appendChild(h);
}// ##OAN3## 			Division - Switch		
{// ##OAN3## 			Division - Switch - Boutton - Messages										
p = document.getElementById("div_switch");
h = document.createElement("a");
h.id = "div_switch_bt_message";
n1 = '';

if( snd_mess == 'ON' ){ 	n1 += '<img title="'+txt_1+'" class="tooltip" style="display:inline;" width="25px" height="25px" src="http://imageshack.com/scaled/large/268/c3yc.png">';}
else{ 						n1 += '<img title="'+txt_1+'" class="tooltip" style="display:inline;" width="25px" height="25px" src="http://imageshack.com/scaled/large/194/meza.png">';}
n1 += '<input type="hidden" id="snd_mess" value="'+snd_mess+'">';
h.innerHTML = n1;
h.addEventListener("click",function(){m_a_snd_mess();},false);
p.appendChild(h);
}// ##OAN3## 			Division - Switch - Boutton - Messages
{// ##OAN3## 			Division - Switch - Boutton - Espionnages										
p = document.getElementById("div_switch");
h = document.createElement("a");
h.id = "div_switch_bt_spy";
n1 = '';
if( snd_spy == 'ON' ){		n1 += '<img title="'+txt_2+'" class="tooltip" style="display:inline;" width="25px" height="25px" src="http://imageshack.com/scaled/large/849/3iyo.png">';	}
else{ 						n1 += '<img title="'+txt_2+'" class="tooltip" style="display:inline;" width="25px" height="25px" src="http://imageshack.com/scaled/large/5/9i2v.png">';}
n1 += '<input type="hidden" id="snd_spy" value="'+snd_spy+'">';
h.innerHTML = n1;
h.addEventListener("click",function(){m_a_snd_spy();},false);
p.appendChild(h);
}// ##OAN3## 			Division - Switch - Boutton - Espionnages
{// ##OAN3## 			Division - Switch - Boutton - Attaques										
p = document.getElementById("div_switch");
h = document.createElement("a");
h.id = "div_switch_bt_atak";
n1 = '';
if( snd_atak == 'ON' ){		n1 += '<img title="'+txt_3+'" class="tooltip" style="display:inline;" width="25px" height="25px" src="http://imageshack.com/scaled/large/11/a92e.png">';	}
else{ 						n1 += '<img title="'+txt_3+'" class="tooltip" style="display:inline;" width="25px" height="25px" src="http://imageshack.com/scaled/large/845/p3bk.png">';}
n1 += '<input type="hidden" id="snd_atak" value="'+snd_atak+'">';
h.innerHTML = n1;
h.addEventListener("click",function(){m_a_snd_atak();},false);
p.appendChild(h);
}// ##OAN3## 			Division - Switch - Boutton - Attaques
{// ##OAN3## 			Division - Switch - Boutton - Reglage Timer										
p = document.getElementById("div_switch");
h = document.createElement("a");
h.id = "div_switch_bt_timeset";
n1 = '';
n1 += '<img title="'+txt_4+'" class="tooltip" style="display:inline;" width="25px" height="25px" src="http://imageshack.com/scaled/large/24/5lth.png">';
h.innerHTML = n1;
h.addEventListener("click",function(){f_s_h_timer();},false);
p.appendChild(h);
}// ##OAN3## 			Division - Switch - Boutton - Reglage Timer
{// ##OAN3## 			Division - Timer
if	( s_h_timer == 1 ){
	p = document.getElementById("maxi_oan");
	h = document.createElement("div");
	h.id = "div_timer";
	h.setAttribute('style',';width:150px;height:100px;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 100px;');
	n1 = '';
//	n1 += '<div style="text-align:center;line-height:15px;font-family:Verdana,Arial,SunSans-Regular,Sans-Serif;font-size:10px;color: #FF9900;"><b>'+txt_5+'</b></div>';
	n1 += '<span style="padding:0px 0px 0px 10px;"><input id="Smin" name="Smin" type="input" size="1" value="'+sMIN+'"> '+txt_6+'<br></span>';
	n1 += '<span style="padding:0px 0px 0px 10px;"><input id="Smax" name="Smax" type="input" size="1" value="'+sMAX+'"> '+txt_7+'<br></span>';
	n1 += '<div style="text-align:center;margin: 3px 0px 3px 0px;" id="bt_save"><input type="button" value="'+txt_8+'" title="" ></div>';
	n1 += '<div style="text-align:center;line-height:15px;font-family:Verdana,Arial,SunSans-Regular,Sans-Serif;font-size:10px;color: #FF9900;"><b>'+txt_5+'</b></div>';
	h.innerHTML = n1 ;
	p.appendChild(h);
	n2 = document.getElementById("bt_save");
	n2.addEventListener("click",function(){save_timer();},false);}
}// ##OAN3## 			Division - Timer
{// ##OAN3##			Division - Switch Refresh								
p = document.getElementById("maxi_oan");
h = document.createElement("div");
h.id = "maxi_swt";
h.setAttribute('style',';width:150px;height:25px;padding:2px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 27px;');
n1 = '';
n1 += '<span id="swt_1"></span>';
n1 += '<span id="swt_2"></span>';
n1 += '<span id="swt_3"></span>';
h.innerHTML = n1;
p.appendChild(h);
}// ##OAN3##			Division - maxi_swt	
{// ##OAN3##			Division - ins_swt_1								
	p = document.getElementById("swt_1");
	h = document.createElement("a");
	h.id = "ins_swt_1";
	n1 = '<img title="'+txt_9+'" class="tooltip"  width="20px" height="20px" style="display:inline;" src="http://imageshack.us/a/img513/5736/e0p.png">';
	h.innerHTML = n1;
	h.addEventListener("click",function(){set_stt_1();},false);
	p.appendChild(h);
	function set_stt_1(){
		setVar("swt_stt",1);
		window.location.replace( unescape(window.location) );
	}
}// ##OAN3## 			Division - ins_swt_1	
{// ##OAN3## 			Division - ins_swt_2								
	p = document.getElementById("swt_2");
	h = document.createElement("a");
	h.id = "ins_swt_2";
	n1 = '<img title="'+txt_10+'" class="tooltip"  width="20px" height="20px" style="display:inline;" src="http://imageshack.us/a/img96/1693/dtik.png">';
	h.innerHTML = n1;
	h.addEventListener("click",function(){set_stt_2();},false);
	p.appendChild(h);
	function set_stt_2(){
		setVar("swt_stt",2);
		window.location.replace( unescape(window.location) );
	}
}// ##OAN3##			Division - ins_swt_2	
{// ##OAN3##			Division - ins_swt_3								
	p = document.getElementById("swt_3");
	h = document.createElement("a");
	h.id = "ins_swt_3";
	n1 = '';
	n1 += '';
	n1 += '<img title="'+txt_11+'" class="tooltip"  width="20px" height="20px" style="display:inline;" src="http://img27.imageshack.us/img27/7018/2ww1.png">';
	n1 += '';
	n1 += '';
	h.innerHTML = n1;
	h.addEventListener("click",function(){set_stt_3();},false);
	p.appendChild(h);
	function set_stt_3(){
		setVar("swt_stt",3);
		window.location.replace( unescape(window.location) );
	}
}// ###OAN3##			Division - ins_swt_3	
{// ##OAN3## 			Division - CountDown
if	( (swt_stt == 2)&&(page_exclu == true )  ){
var interval = setInterval(function() {document.getElementById('count').innerHTML = --cnt_time;if (cnt_time <= 0){clearInterval(interval);}},1000);
p = document.getElementById('maxi_oan');
h = document.createElement('div');
h.id = 'div_count';
h.setAttribute('style',';width:150px;height:20px;padding:1px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 21px;');
n1 = '';
n1 += '<b><img  width="15px" height="15px" style="display:inline;" src="http://imageshack.us/a/img96/1693/dtik.png">'+txt_12+'<span id="count"></span>s <img  width="15px" height="15px" style="display:inline;" src="http://imageshack.us/a/img96/1693/dtik.png"></b>';
h.innerHTML = n1 ;
p.appendChild(h);
	}
else if	( (swt_stt == 3)&&(page_exclu == true )  ){
var interval = setInterval(function() {document.getElementById('count').innerHTML = --cnt_time;if (cnt_time <= 0){clearInterval(interval);}},1000);
p = document.getElementById('maxi_oan');
h = document.createElement('div');
h.id = 'div_count';
h.setAttribute('style',';width:150px;height:20px;padding:1px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 21px;');
n1 = '';
n1 += '<b><img  width="15px" height="15px" style="display:inline;" src="http://img27.imageshack.us/img27/7018/2ww1.png">'+txt_12+' <span id="count"></span>s <img  width="15px" height="15px" style="display:inline;" src="http://img27.imageshack.us/img27/7018/2ww1.png"></b>';
h.innerHTML = n1 ;
p.appendChild(h);
	}
else if	( (swt_stt == 1)&&(page_exclu == true )  ){
p = document.getElementById('maxi_oan');
h = document.createElement('div');
h.id = 'div_count';
h.setAttribute('style',';width:150px;height:20px;padding:1px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 21px;');
n1 = '';
n1 += '<b><img  width="15px" height="15px" style="display:inline;" src="http://imageshack.us/a/img513/5736/e0p.png">'+txt_13+'<img  width="15px" height="15px" style="display:inline;" src="http://imageshack.us/a/img513/5736/e0p.png"></b>';
h.innerHTML = n1 ;
p.appendChild(h);
	}
}//####	
{// ##OAN3## 			Division - Titre							
p = document.getElementById('rechts');//rechts//myPlanets
h = p.insertBefore(document.createElement("div" ),p.firstChild);
h.id = "div_titre";
h.setAttribute('style',';text-align:center;line-height:18px;font-family:Verdana,Arial,SunSans-Regular,Sans-Serif;font-size:9px;color: #FF9900;width:150px;height:20px;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = '';
n1 += '<b>Ogame Alert Notifier '+version+'</b>';
h.innerHTML = n1;
}// ##OAN3## 			Division - Titre
{// ##OAN3## 			sndTable_spy
p = document.getElementById('rechts');//inhalt//rechts
h = document.createElement('div');
h.id = 'sndTable_spy';
h.setAttribute('style',';display:none;');
n1 ='';
n1 += '<table border="1"  width="100%" style="">';
n1 += '<tr><td><EMBED NAME="CS1224981463558" SRC="http://lideonradeon.byethost22.com/spy.mp3" LOOP="true" AUTOSTART="true" HIDDEN="true" WIDTH="0" HEIGHT="0" type="audio/mpeg"></EMBED></td>';
n1 +='</tr></table>';
h.innerHTML = n1;
p.appendChild(h);
}// ##OAN3## 			sndTable_spy
{// ##OAN3## 			sndTable_atak
p = document.getElementById('rechts');
h = document.createElement('div');
h.id = 'sndTable_atak';
h.setAttribute('style',';display:none;');
n1 ='';
n1 += '<table border="1"  width="100%" style="">';
n1 += '<tr><td><EMBED NAME="CS1224981463558" SRC="http://lideonradeon.byethost22.com/atak.mp3" LOOP="true" AUTOSTART="true" HIDDEN="true" WIDTH="0" HEIGHT="0" type="audio/mpeg"></EMBED></td>';
n1 +='</tr></table>';
h.innerHTML = n1;
p.appendChild(h);
}// ##OAN3## 			sndTable_atak
{// ##OAN3## 			sndTable_mess
p = document.getElementById('rechts');
h = document.createElement('div');
h.id = 'sndTable_mess';
h.setAttribute('style',';display:none;');
n1 ='';
n1 += '<table border="1"  width="100%" style="">';
n1 += '<tr><td><EMBED NAME="CS1224981463558" SRC="http://lideonradeon.byethost22.com/message.mp3" LOOP="false" AUTOSTART="true" HIDDEN="true" WIDTH="0" HEIGHT="0" type="audio/mpeg"></EMBED></td>';
n1 +='</tr></table>';
h.innerHTML = n1;
p.appendChild(h);
}// ##OAN3## 			sndTable_mess
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
{// ##OAN3## 			Creer URL planete suivante
var i;for (i = 0; i < metas.length; i++)
if (metas[i].getAttribute('NAME') == "ogame-planet-id")break;
var cpid = metas[i].getAttribute('CONTENT');
var actp= cpid
var i;for (var i=0; i<count; i++)	{var  ccc = sp.getElementsByTagName('div')[(i)].id;var  ddd = ccc.split('planet-')[1];setVar('pp_'+(i+1),ddd);}
if(actp==getVar("pp_1")){var lru = 'index.php?page=overview&cp='+getVar("pp_2");}
else if(actp==getVar("pp_"+(count-1))){var lru = 'index.php?page=overview&cp='+getVar("pp_"+(count));}
else if(actp==getVar("pp_"+(count-2))){var lru = 'index.php?page=overview&cp='+getVar("pp_"+(count-1));}
else if(actp==getVar("pp_"+(count-3))){var lru = 'index.php?page=overview&cp='+getVar("pp_"+(count-2));}
else if(actp==getVar("pp_"+(count-4))){var lru = 'index.php?page=overview&cp='+getVar("pp_"+(count-3));}
else if(actp==getVar("pp_"+(count-5))){var lru = 'index.php?page=overview&cp='+getVar("pp_"+(count-4));}
else if(actp==getVar("pp_"+(count-6))){var lru = 'index.php?page=overview&cp='+getVar("pp_"+(count-5));}
else if(actp==getVar("pp_"+(count-7))){var lru = 'index.php?page=overview&cp='+getVar("pp_"+(count-6));}
else if(actp==getVar("pp_"+(count-8))){var lru = 'index.php?page=overview&cp='+getVar("pp_"+(count-7));}
else if(actp==getVar("pp_"+count)){var lru = 'index.php?page=overview&cp='+getVar("pp_1");}
else{var lru = 'index.php?page=overview&cp='+getVar("pp_1");}
//p = document.getElementById('norm');
//h = document.createElement('div');
//h.id = "maxi_xxx2";
//h.innerHTML = lru;
//p.appendChild(h);
}// ##OAN3## 			Creer URL planete suivante
function m_a_autof(){
    var autofresh = document.getElementById("autofresh").value;
    if	( getVar("autofresh")=="ON"){ setVar("autofresh",'OFF'); }
    else{ setVar("autofresh","ON"); }
    reload();
}
function save_timer(){
    var sMIN = document.getElementById("Smin").value;
    var sMAX = document.getElementById("Smax").value;
    setVar("sMIN",sMIN);
    setVar("sMAX",sMAX);
	setVar("s_h_timer",0);
    reload();}
function f_s_h_timer(){
    if	(getVar("s_h_timer")==1){
	setVar("s_h_timer",0);
	reload();
	}
    else{ 
	setVar("s_h_timer",1);
	reload();
	}
}
function f_s_h_count(){
    if	( getVar("s_h_count")==1){
	setVar("s_h_count",0);
	reload(); 
	}
    else{ 
	setVar("s_h_count",1); 
	reload(); 
	}
}
function m_a_snd_mess(){
    var snd_mess = document.getElementById("snd_mess").value;
    if	( getVar("snd_mess")=="ON"){ setVar("snd_mess",'OFF'); }
    else{ setVar("snd_mess","ON"); }
    reload();
}
function m_a_snd_spy(){
    var snd_spy = document.getElementById("snd_spy").value;
    if	( getVar("snd_spy")=="ON"){ setVar("snd_spy",'OFF'); }
    else{ setVar("snd_spy","ON"); }
    reload();
}
function m_a_snd_atak(){
    var snd_atak = document.getElementById("snd_atak").value;
    if	( getVar("snd_atak")=="ON"){ setVar("snd_atak",'OFF'); }
    else{ setVar("snd_atak","ON"); }
    reload();
}
function reload() {    window.location.replace( url );}//sURL
function reloadn() {    window.location.replace( lru );}
function getVar(varname, vardefault) {
    var res = GM_getValue(document.location.host+varname);
    if (res == undefined) {return vardefault;}
    return res;
}
function setVar(varname, varvalue) {    GM_setValue(document.location.host+varname, varvalue);}
{// ##OAN3## 			IF swt_stt
if ( (swt_stt == 3)&&(page_exclu == true )  ){    setInterval(reloadn, cnt_time*1000);}
else if ( (swt_stt == 2)&&(page_exclu == true )  ){    setInterval(reload, cnt_time*1000);}
}// ##OAN3## 			IF swt_stt
{// ##OAN3## 			IF snd_spy
if ( snd_spy == 'ON' )
	{
		if (['eventListWrap' ].some(function(e)	{
			if (
			(document.evaluate('.//tr[@data-mission-type="6"]', document.getElementById(e), null, 8, null).singleNodeValue)
			&&
			(document.evaluate('.//td[@class="countDown hostile textBeefy ownespionage ago_panel_add"]', document.getElementById(e), null, 8, null).singleNodeValue)
			) return true;
		})) document.getElementById("sndTable_spy").style.display="inline" ;
	}
}// ##OAN3## 			IF snd_spy
{// ##OAN3## 			IF snd_atak
if ( snd_atak == 'ON' )
	{
		if (['eventListWrap' ].some(function(e)	{
			if (
				(document.evaluate('.//tr[@data-mission-type="1"]', document.getElementById(e), null, 8, null).singleNodeValue)
				&&
				(document.evaluate('.//td[@class="countDown hostile textBeefy ownattack ago_panel_add"]', document.getElementById(e), null, 8, null).singleNodeValue)
				) return true;
		})) document.getElementById("sndTable_atak").style.display="inline" ;
	}
}// ##OAN3## 			IF snd_atak
{// ##OAN3## 			IF snd_mess
if ( snd_mess == 'ON' )
	{
		if (['message-wrapper'   ].some(function(e)	{
			if (document.evaluate('.//a[@class="tooltip js_hideTipOnMobile "]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
		})) document.getElementById("sndTable_mess").style.display="inline";
	}
}// ##OAN3## 			IF snd_mess
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
//	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###	###
