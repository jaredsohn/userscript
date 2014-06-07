// ==UserScript==
// @name			Oevac
// @namespace      	Oevac
// @description    	Oevac
// @author         	Lidmaster
// @version			1
// @include			http://*.ogame.*/*
// ==/UserScript==


{//Variables
var url 			= location.href;
var body 			=  document;
var bodyId 			= document.getElementsByTagName("body")[0].id;
var sURL 			= 'http://uni122.ogame.fr/game/index.php?page=fleet1';
var evac_step 		= getVar("evac_step",0);
var sp 				= 	document.getElementById("planetList");
var pm 				= sp.getElementsByTagName("a")[0];
}//####

{//Division - Maxievac								
p = document.getElementById('norm');
h = p.insertBefore(document.createElement("div" ),p.firstChild);
h.id = "maxi_evac";
}//####
{//Division - bt_evac									
p = document.getElementById("maxi_evac");
h = document.createElement("div");
h.id = "bt_evac";
h.setAttribute('style',';width:150px;height:20px;margin:0px 0px 2px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = '';
n1 += 'Evacuation PM'+evac_step;
h.innerHTML = n1;
h.addEventListener("click",function(){start_evac_pm();},false);
p.appendChild(h);
}//####
/*{//Division - bt_reset									
p = document.getElementById("maxi_evac");
h = document.createElement("div");
h.id = "bt_reset";
h.setAttribute('style',';width:150px;height:20px;margin:0px 0px 2px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:150px 20px;');
n1 = '';
n1 += 'reset';
h.innerHTML = n1;
h.addEventListener("click",function(){setVar("evac_step",0);},false);
p.appendChild(h);
}//####
*/

function start_evac_pm(){
setVar("evac_step",1);
pm.click();
}
if (evac_step == 1){
setVar("evac_step",2);
window.location.replace( sURL );
}
if (evac_step == 2){
p = 	document.getElementById("sendall");
p.click();
setVar("evac_step",3);
p = 	document.getElementById("continue");
p.click();
}
if (evac_step == 3){
p = 	document.getElementById("dbutton");
p.click();
setVar("evac_step",4);
p = 	document.getElementById("continue");
p.click();

}
if (evac_step == 4){
p = 	document.getElementById("allresources");
p.click();
setVar("evac_step",0);
document.getElementById("metal").value = '99.999.999';
document.getElementById("crystal").value = '99.999.999';
document.getElementById("deuterium").value = '99.999.999';
h = 	document.getElementById("start");
h.click();
}

function getVar(varname, vardefault) {
    var res = GM_getValue(document.location.host+varname);
    if (res == undefined) {return vardefault;}
    return res;
}
function setVar(varname, varvalue) {    GM_setValue(document.location.host+varname, varvalue);}
