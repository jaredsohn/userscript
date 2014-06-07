// ==UserScript==
// @name           	LidRecolte
// @namespace      	LidRecolte
// @description    	LidRecolte
// @author         	Lidmaster
// @version         1.35
// @include			http://*.ogame.*/*
// @copyright		Copyright (C) 2013 by Lidmaster 
// ==/UserScript==
var version = '1.35';

{//var
var metas 			= document.getElementsByTagName('META');
var evac_step 		= getVar("evac_step",0);
var step 			= getVar("step",0);
var url 			= location.href;
var serveur 		= url.split('/')[2];
var sp 				= document.getElementById("planetList");
var count 			= sp.getElementsByTagName('div').length;
var colec_don 		= getVar("colec_don",0);
var div_pp			= sp.getElementsByTagName("div")[0];
var pm 				= div_pp.getElementsByTagName("a")[0];
var pm2 			= document.getElementById("logoLink");
var lru2 = 'http://'+serveur+'/game/index.php?page=overview&cp='+getVar("pp_1");

}//var

{//lru
var i;
for (i = 0; i < metas.length; i++)
if (metas[i].getAttribute('NAME') == "ogame-planet-id")break;
var cpid = metas[i].getAttribute('CONTENT');
var actp= cpid
var i;
for (var i=0; i<count; i++)	{
	var  ccc = sp.getElementsByTagName('div')[(i)].id;
	var  ddd = ccc.split('planet-')[1];
	setVar('pp_'+(i+1),ddd);}
if(actp==getVar("pp_1")){var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_2");}
else if(actp==getVar("pp_"+(count-1))){var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_"+(count));}
else if(actp==getVar("pp_"+(count-2))){var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_"+(count-1));}
else if(actp==getVar("pp_"+(count-3))){var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_"+(count-2));}
else if(actp==getVar("pp_"+(count-4))){var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_"+(count-3));}
else if(actp==getVar("pp_"+(count-5))){var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_"+(count-4));}
else if(actp==getVar("pp_"+(count-6))){var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_"+(count-5));}
else if(actp==getVar("pp_"+(count-7))){var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_"+(count-6));}
else if(actp==getVar("pp_"+(count-8))){var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_"+(count-7));}
else if(actp==getVar("pp_"+count)){var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_1");}
else{var lru = 'http://'+serveur+'/game/index.php?page=fleet1&cp='+getVar("pp_1");}
}//lru

{//maxi_recolte
p = document.getElementById('rechts');//rechts//myPlanets
h = p.insertBefore(document.createElement("div" ),p.firstChild);
h.id = "maxi_recolte";
}//Fin maxi_recolte
/*
{//div_reco_test
p = document.getElementById('maxi_recolte');//rechts//myPlanets
h = p.insertBefore(document.createElement("div" ),p.firstChild);
h.id = "div_reco_test";
h.setAttribute('style',';text-align:center;color: #FF9900;width:150px;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 200px;');
n1 = '';
n1 += '<table>';
n1 += '<tr><td>evac_step ='+evac_step+'</td></tr>';
//n1 += '<tr><td>step ='+step+'</td></tr>';
//n1 += '<tr><td>count= '+count+'</td></tr>';
n1 += '<tr><td>colec_don= '+colec_don+'</td></tr>';
//n1 += '<tr><td></td></tr>';
n1 += '</table>';
h.innerHTML = n1;
}//Fin div_reco_test
*/
{//div_reco_btn
p = document.getElementById('maxi_recolte');//rechts//myPlanets
h = p.insertBefore(document.createElement("div" ),p.firstChild);
h.id = "div_reco_btn";
h.setAttribute('style',';text-align:center;color: #FF9900;width:150px;height:40px;display:none;');//display:none;
n1 = '';
n1 += '<table width="148px">';
n1 += '<tr>';
n1 += '<td>';
n1 += '<span id="spn_go_pm"></span> - <span id="spn_nxt_pl"></span> - <span id="spn_rld"></span>';
n1 += '</td>';
n1 += '</tr>';
n1 += '<tr>';
n1 += '<td>';
n1 += '<span id="spn_rtn_col"></span> - <span id="spn_coord"></span> - <span id="spn_strt"></span>';
n1 += '</td>';
n1 += '</tr>';
n1 += '</table>';
h.innerHTML = n1;
}//Fin div_reco_btn
{//div_reco_titre
p = document.getElementById('maxi_recolte');//rechts//myPlanets
h = p.insertBefore(document.createElement("div" ),p.firstChild);
h.id = "div_reco_titre";
h.setAttribute('style',';text-align:center;color: #FF9900;width:150px;height:20px;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = '';
n1 += '<table width="148px">';
n1 += '<tr>';
n1 += '<td>';
n1 += '<span id="spn_btn_go"></span>';
n1 += '</td>';
n1 += '<td>';
n1 += 'Collecteur '+version+'';
n1 += '</td>';
n1 += '<td>';
n1 += '<span id="spn_btn_rst"></span>';
n1 += '</td>';
n1 += '</tr></table>';
h.innerHTML = n1;
}//Fin div_reco_titre
{//in_spn_btn_go
p = document.getElementById("spn_btn_go");
h = document.createElement("a");
h.id = "in_spn_btn_go";
h.setAttribute('style',';width:150px;height:20px;margin:0px 0px 2px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = 'Start ';
h.innerHTML = n1;
h.addEventListener("click",function(){
								start_colec();
							},false);
}//in_spn_btn_go
{//in_spn_btn_rst
p.appendChild(h);
p = document.getElementById("spn_btn_rst");
h = document.createElement("a");
h.id = "in_spn_btn_rst";
h.setAttribute('style',';width:150px;height:20px;margin:0px 0px 2px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;display:none;');
n1 = '';
n1 += 'reset';
h.innerHTML = n1;
h.addEventListener("click",function(){
								setVar("evac_step",0);
								setVar("colec_don",0);
								setVar("step",0);
								window.location.replace( 'http://'+serveur+'/game/index.php' );
							},false);
p.appendChild(h);
}//in_spn_btn_rst
{//in_spn_go_pm
p.appendChild(h);
p = document.getElementById("spn_go_pm");
h = document.createElement("a");
h.id = "in_spn_go_pm";
h.setAttribute('style',';width:150px;height:20px;margin:0px 0px 2px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = '';
n1 += 'go_pm';
h.innerHTML = n1;
h.addEventListener("click",function(){pm.click();},false);
p.appendChild(h);
}//in_spn_go_pm
{//in_spn_nxt_pl
p.appendChild(h);
p = document.getElementById("spn_nxt_pl");
h = document.createElement("a");
h.id = "in_spn_nxt_pl";
h.setAttribute('style',';width:150px;height:20px;margin:0px 0px 2px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = '';
n1 += 'nxt_pl';
h.innerHTML = n1;
h.addEventListener("click",function(){window.location.replace( lru );},false);
p.appendChild(h);
}//in_spn_nxt_pl
{//in_spn_rld
p.appendChild(h);
p = document.getElementById("spn_rld");
h = document.createElement("a");
h.id = "in_spn_rld";
h.setAttribute('style',';width:150px;height:20px;margin:0px 0px 2px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = '';
n1 += 'rload';
h.innerHTML = n1;
h.addEventListener("click",function(){
								window.location.replace( url );
							},false);
p.appendChild(h);
}//in_spn_rld
{//in_spn_rtn_col
p.appendChild(h);
p = document.getElementById("spn_rtn_col");
h = document.createElement("a");
h.id = "in_spn_rtn_col";
h.setAttribute('style',';width:150px;height:20px;margin:0px 0px 2px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = '';
n1 += 'rtn_col';
h.innerHTML = n1;
h.addEventListener("click",function(){
								p =document.getElementById("ago_fleet_routine_12");
								p.click();
							},false);
p.appendChild(h);
}//in_spn_rtn_col
{//in_spn_coord
p.appendChild(h);
p = document.getElementById("spn_coord");
h = document.createElement("a");
h.id = "in_spn_coord";
h.setAttribute('style',';width:150px;height:20px;margin:0px 0px 2px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = '';
n1 += 'coord';
h.innerHTML = n1;
h.addEventListener("click",function(){
								document.getElementById("galaxy").value = '4';	
								document.getElementById("system").value = '168';	
								document.getElementById("position").value = '10';	
								document.getElementById("continue").click();
							},false);
p.appendChild(h);
}//in_spn_coord
{//in_spn_strt
p.appendChild(h);
p = document.getElementById("spn_strt");
h = document.createElement("a");
h.id = "in_spn_strt";
h.setAttribute('style',';width:150px;height:20px;margin:0px 0px 2px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = '';
n1 += 'decol';
h.innerHTML = n1;
h.addEventListener("click",function(){
								p = 	document.getElementById("missions");
								pa = p.getElementsByTagName('a');
								pa[3].click();							
								p = 	document.getElementById("start");
								p.click();							
							},false);
p.appendChild(h);
}//in_spn_strt

function start_colec(){	
	p =document.getElementById("in_spn_go_pm");
	p.click();	
	setVar("evac_step",10);	
}
if(evac_step==10){p =document.getElementById("in_spn_btn_rst");p.click();	setVar("evac_step",1);	}
if(evac_step==0){}
if(colec_don <= (count-1)){
	if(evac_step==1){p =document.getElementById("in_spn_nxt_pl");p.click();	setVar("evac_step",2);	}
	if(evac_step==2){p =document.getElementById("in_spn_rtn_col");p.click();setVar("colec_don",(colec_don+1));setVar("evac_step",3);}
	if(evac_step==3){p =document.getElementById("in_spn_coord");p.click();setVar("evac_step",4);}
	if(evac_step==4){p =document.getElementById("in_spn_strt");p.click();setVar("evac_step",1);}
}
else{	
	p =document.getElementById("in_spn_btn_rst");p.click();	
	window.location.replace( 'http://'+serveur+'/game/index.php?page=overview&cp='+getVar("pp_1") );
}
function getVar(varname, vardefault) {
    var res = GM_getValue(document.location.host+varname);
    if (res == undefined) {return vardefault;}
    return res;
}
function setVar(varname, varvalue) {    GM_setValue(document.location.host+varname, varvalue);}