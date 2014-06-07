// ==UserScript==
// @name           Ressource variations
// @namespace      Ikariam
// @include        http://*.ikariam.fr/*
// ==/UserScript==

if(location.toString().substr(-13)=="saveressource"){date = new Date();idv=document.getElementById('citySelect').value;GM_setValue(idv+"date",date.getTime().toString());GM_setValue(idv+"value_gold",document.getElementById('value_gold').innerHTML.replace(",",""));GM_setValue(idv+"value_wood",document.getElementById('value_wood').innerHTML.replace(",",""));GM_setValue(idv+"value_wine",document.getElementById('value_wine').innerHTML.replace(",",""));GM_setValue(idv+"value_marble",document.getElementById('value_marble').innerHTML.replace(",",""));GM_setValue(idv+"value_crystal",document.getElementById('value_crystal').innerHTML.replace(",",""));GM_setValue(idv+"value_sulfur",document.getElementById('value_sulfur').innerHTML.replace(",",""));alert('saved');location.replace(location.toString().substr(0,location.toString().length-14));}
if(location.toString().substr(-9)=="variation"){
function diff(id)
{
idv=document.getElementById('citySelect').value;
ress = document.getElementById(id).innerHTML.replace(",","");
change = parseInt(ress)-parseInt(GM_getValue(idv+id));
if(change>0){document.getElementById(id).innerHTML="<b style='color:green;'>+"+change+"</b>";}
if(change<0){document.getElementById(id).innerHTML="<b style='color:red;'>"+change+"</b>";}
if(change==0){document.getElementById(id).innerHTML="<b style='color:blue;'>=0</b>";}
}
diff("value_gold");diff("value_wood");diff("value_wine");diff("value_marble");diff("value_crystal");diff("value_sulfur");
idv=document.getElementById('citySelect').value;
date = new Date();
ref = date.getTime()-parseInt(GM_getValue(idv+'date'));
//ref = ref/60/60/1000;
//ref = ref.toFixed(2);
ref = ref/1000;
heure = parseInt(ref/(60*60));
minute = parseInt((ref-(60*60*heure))/60);
document.getElementById('cityResources').innerHTML+='<br /><br /><b style="color:yellow;font-size:80%;position:relative;bottom:2px;" onmouseover="this.style.background=\'black\';" onmouseout="this.style.background=\'\';">Date de référance : Il y a '+heure+' heure(s) et '+minute+' minute(s)</b>';
}
node = document.getElementById('cityResources');
node = node.childNodes[2];
//node = node.getElementsByTagName('li')[6];
node.innerHTML += '<li class="sulfur" style="padding-left: 70px;"> <b style="color: red; cursor: pointer;" onclick="signe=\'&\';if(location.search==\'\'){signe=\'?\'}location.replace(location+signe+\'saveressource\');">!</b> <b style="color: green; cursor: pointer;" onclick="signe=\'&\';if(location.search==\'\'){signe=\'?\'}location.replace(location+signe+\'variation\');">?</b></li>';