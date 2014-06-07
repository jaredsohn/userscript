// ==UserScript==
// @name           	UPBAN PromoBlink Alert Notifier
// @namespace      	UPBAN PromoBlink Alert Notifier
// @description    	Un script qui actualise la page et emet des sons en cas de danger
// @author         	Lidmaster
// @version			1.3.1
// @include			http://cogdev.net/blink/*
// @exclude			http://cogdev.net/blink/?act=gigablink

// ==/UserScript==

(function () 
{
	if (document.title == '502 Bad Gateway' )
	{window.location.reload(true);}
	else if (document.title == 'Website currently unavailable' )
	{window.location.reload(true);}
	else if (document.title == 'Website is currently unreachable' )
	{window.location.reload(true);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == 'Website currently unavailable')
	{window.location.reload(true);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == 'Website is currently unreachable')
	{window.location.reload(true);}
})();










//###########################
{//Variables//###############
var sMIN =  getVar("sMIN",30);var sMAX =  getVar("sMAX",45);
var autofresh = getVar("autof",'OFF');
var autoblink = getVar("autob",'OFF');
var s_h_snd = getVar("s_h_snd",0);
var sndpromo = getVar("SWsndpromo",'ON');
var body = document;var a =  1;var p,h,n1,n2,n3;
var sURL = "http://cogdev.net/blink/?act=home";
var url = location.href;
var a = 1 ;
//var serveur = url.split('/')[2];
}//Variables//###############
//###########################
//#winnings{text-align:right;float:right;font-size:1.5em;font-family:Cambria, Georgia, serif;color:#6d6d6d;font-style:italic;margin-top:-70px;}

//###########################
{//Affichage##################
{// Refresh page d erreur //
if ( url == 'http://cogdev.net/blink/error.php' ){ window.location.replace( sURL ) }
}//Refresh page d erreur//
{//Tableau des Divisions //
p = document.getElementById("blink_login");
h = document.createElement("span");
h.id = "tbl_pban";
h.setAttribute('style',';display:inline;float:left;width:950px;background:black;font-size:1.5em;font-family:Cambria, Georgia, serif;color:#6d6d6d;font-style:italic;');
n1 = "";
n1 += "";
n1 += "<div id='div_auto_pb' ></div>";
n1 += "<div id='div_auto_fresh'></div>";
n1 += "<div id='div_titre' ></div>";
n1 += "<div id='div_opt_bt'align='left'></div>";
n1 += "";
n1 += "";
n1 += "";
//n1 += "<span id=''>|<span style='color:white;'>|</span>|</span>";
n1 += "";
h.innerHTML = n1 ;
p.appendChild(h);
}//
{// Contenu de div_titre (content_div_titre) //
p = document.getElementById("div_titre");
h = document.createElement("div");
h.id = "content_div_titre";
h.setAttribute('style',';float:right;display:inline;');
n1 = "|<span style='color:white;'>|</span>|<span style='color:white;'> Promo Blink Alert Notifier </span>|<span style='color:white;'>|</span>";
h.innerHTML = n1 ;
p.appendChild(h);
}// Contenu de div_titre (content_div_titre)
{// Contenu de div_auto_fresh (status_auto_fresh) //
p = document.getElementById("div_auto_fresh");
h = document.createElement("span");
h.id = "status_auto_fresh";
h.setAttribute('style',';float:right;display:block;');
n1 = "| Refresh ("+(getRefreshTime()/1000)+"sec) : <span id='status'></span> ";
h.innerHTML = n1 ;
p.appendChild(h);
}// Contenu de div_auto_fresh (status_auto_fresh)
{// Contenu de div status (b_refresh) //
p = document.getElementById("status");
h = document.createElement("span");
h.id = "b_refresh";
if ( getVar("autof")=="ON"){   
		h.innerHTML = '<input type="hidden" id="autofresh" value="'+autofresh+'"><span style="color:white;">[ON]</span>-OFF |<span style="color:white;">|</span>';
	}
else{    
		h.innerHTML = '<input type="hidden" id="autofresh" value="'+autofresh+'">ON-<span style="color:white;">[OFF]</span> |<span style="color:white;">|</span>';
	}
h.addEventListener("click",function(){    b_refresh();},false);
p.appendChild(h);
}//Bouton marche arret rapide de l alarme dans div status//
{// Contenu de div_auto_pb (status_auto_pb) //
p = document.getElementById("div_auto_pb");
h = document.createElement("span");
h.id = "status_auto_pb";
h.setAttribute('style',';float:right;display:block;');
n1 = "| Auto Promo : <span id='status2'></span> |<span style='color:white;'>|</span>|";
h.innerHTML = n1 ;
p.appendChild(h);
}// Contenu de div_auto_pb (status_auto_pb)
{// Contenu de div status2 (b_autoblink) //
p = document.getElementById("status2");
h = document.createElement("span");
h.id = "b_autoblink";
if ( getVar("autob")=="ON"){
		h.innerHTML = '<input type="hidden" id="autoblink" value="'+autoblink+'"><span style="color:white;">[ON]</span>-OFF';
	}
else{    
		h.innerHTML = '<input type="hidden" id="autoblink" value="'+autoblink+'">ON-<span style="color:white;">[OFF]</span>';
	}
h.addEventListener("click",function(){    b_autoblink();},false);
p.appendChild(h);
}//Bouton marche arret rapide de l auto blink dans div status 2//
{//Tableau des options //
p = document.getElementById("tbl_pban");
h = document.createElement("span");
h.id = "tbl_opt";
h.setAttribute('style',';display:none;');
n1 = "";
n1 += '<br>Refresh Delay = <input id="Smin" name="Smin" type="input" size="2" value="'+sMIN+'"> à <input  id="Smax" name="Smax" type="input" size="2" value="'+sMAX+'">sec';
n1 += '<br>Alert son Promo = <select size="1" id="sndpromo"><option selected value="'+sndpromo+'">'+sndpromo+'</option><option value="ON">ON</option><option value="OFF">OFF</option></select>';
n1 += '<br><span id="btn1"></span>';
h.innerHTML = n1 ;
p.appendChild(h);
}//
{// Boutton Sauvegarder //
p = document.getElementById("btn1");
h = document.createElement("span");
h.id = "save_time";
h.innerHTML = '<input type="button" value="save">';
h.addEventListener("click",function(){save_timer();},false);
p.appendChild(h);
}
{//Boutton Option//
p = document.getElementById("div_opt_bt");
h = document.createElement("button");
h.id = "bopt";
h.setAttribute('style',';border:2px solid #6d6d6d;background:black;color:#6d6d6d;');
if( getVar("sh_optdiv")==0){h.innerHTML = 'PbAn options';document.getElementById("tbl_opt").style.display="none";}
else{h.innerHTML = 'PbAn options';document.getElementById("tbl_opt").style.display="inline";}
h.addEventListener("click",function(){ fsh_optdiv();},false);p.appendChild(h);
}//Boutton Option//
{//Division du player d'alarme//
snd1 = document.getElementById("blink_logged_out");
h = document.createElement('div');
h.id = "sndTable";
h.setAttribute('style',';display:none;position:relative;clear:both;width:100%;float:left;border:0px;');
snd1.appendChild(h);
tabla ='';
document.getElementById("sndTable").innerHTML = '';
tabla += '<EMBED NAME="CS1224981463558" SRC="http://cd.textfiles.com/10000soundssongs/WAV/ALARM.WAV" LOOP="true" AUTOSTART="true" HIDDEN="true" WIDTH="0" HEIGHT="0"></EMBED>';
document.getElementById("sndTable").innerHTML  = tabla;
}//Division du player d'alarme//
}//Affichage##################
//###########################
//###########################




//Toutes les fonctions
function save_timer(){
    var sMIN = document.getElementById("Smin").value;
    var sMAX = document.getElementById("Smax").value;
    setVar("sMIN",sMIN);
    setVar("sMAX",sMAX);
    var SWsndpromo = document.getElementById("sndpromo").value;
    setVar("SWsndpromo",SWsndpromo);
    var autob = document.getElementById("autoblink").value;
    setVar("autob",autob);
    fsh_optdiv();
    reload();
    document.getElementById("save_time").innerHTML = 'Fait';
}
function fsh_optdiv(){
    if	( getVar("sh_optdiv")==1){ setVar("sh_optdiv",0); document.getElementById("tbl_opt").style.display="none";	}
    else{ setVar("sh_optdiv",1);  document.getElementById("tbl_opt").style.display="block";}
}
function b_refresh(){
    var autof = document.getElementById("autofresh").value;
    if	( getVar("autof")=="ON"){        setVar("autof",'OFF');    }
    else{        setVar("autof","ON");    }
    reload();
}
function b_autoblink(){
    var autob = document.getElementById("autoblink").value;
    if	( getVar("autob")=="ON"){        setVar("autob",'OFF');    }
    else{        setVar("autob","ON");    }
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
function reload() {window.location.replace( sURL );};
//Toutes les fonctions
//###########################

{// Detection Des Promos et activation alarme //
if ( sndpromo == 'ON' ){
    if (['blinks' ].some(function(e)	
		{
			if (document.evaluate('.//form[@id="featured_blink"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
		}
		)) document.getElementById("sndTable").style.display="inline" ;

    if (['featured_blink' ].some(function(e)	
		{
			if (document.evaluate('.//div[@class="span-4 prepend-1"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
		}
		)) document.getElementById("sndTable").style.display="none" ;
}
}// Detection Des Promos et activation alarme //

{// Detection premier ticket libre et affichage du bouton et clik auto dessus //
if ( autoblink == 'ON' ){

  if (['featured_blink' ].some(function(e)	
			{
				if (document.evaluate('.//li[@class="free"]', document.getElementById(e), null, 8, null).singleNodeValue) {
					tire_ticket_libre();
					p = document.getElementById("featured_scroll");
					h = document.createElement("span");
					h.id = "lide";
					h.setAttribute('style',';float:left;display:block;');
					n1 = '';
					n1 += ' <button type="submit" id="bt_tk_select" form="featured_blink" name="'+btk+'" value="2" >#'+tk+'</button>';
					h.innerHTML = n1;
					p.appendChild(h);
					document.getElementById("bt_tk_select").click();
				
				
					}
			}
		)) ;		
}
}// Detection premier ticket libre et affichage du bouton //




function tire_ticket_libre() {
	t_li = document.getElementById("featured_blink").getElementsByTagName("li");
	nb_li = t_li.length;
	rdm_tk = (parseInt(0) + Math.round(Math.random() * (nb_li - 0)));
	id_tk = t_li[rdm_tk].id;
	if ( id_tk == '' ){tire_ticket_libre();};	
	id_tk_nb=id_tk.substring(id_tk.lastIndexOf("-"));
	tk = id_tk_nb.replace('-', '');
	btk = 'buy['+tk+']';
}






