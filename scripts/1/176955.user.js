// ==UserScript==
// @name			testoan
// @namespace      	testoan
// @description    	testoan
// @author         	Lidmaster
// @version			1.1
// @include		file:///C:/countdown/index.html
// @include		file:///C:/countdown/index2.html
// ==/UserScript==

/**/
var sURL                	= unescape(window.location);
var url 					= location.href;
var body 					=  document;
var a 						=  1;
var serveur 				= url.split('/')[2];
var                     	   p,h,n1,n2,n3;
var s_h_oan = getVar("s_h_oan",1);
var sMIN					=  getVar("sMIN",60);
var sMAX					=  getVar("sMAX",180);
var sMAX					=  getVar("sMAX",180);
var autofresh           	=  getVar("autof",'OFF');







{//## Affichage division ##//
p = document.getElementById('norm');
h = p.insertBefore(document.createElement("div" ),p.firstChild);
h.id = 'div_oan';
n1  = '<div id="div_titre"></div>';
n1 += '<div id="div_contenu"></div>';
h.innerHTML = n1;

p = document.getElementById("div_titre");
h = document.createElement("div");
h.id = 'ins_div_titre';
h.setAttribute('style',';margin: -20px 0px 3px 0px;padding: 1px 0px 3px 0px;text-align:center;line-height:15px;font-family:Verdana,Arial,SunSans-Regular,Sans-Serif;font-size:10px;color: #d39343;background:url("http://imageshack.com/scaled/medium/405/gkc2.png") no-repeat;background-size:137px 20px;');
h.innerHTML = '<b>Ogame Alert Notifier</b>' ;
h.addEventListener("click",function(){fn_sh_oan();},false);
p.appendChild(h);


if( s_h_oan == 1){
p = document.getElementById("div_contenu");
h = document.createElement("div");
h.id = 'ins_div_contenu';
h.innerHTML = '' ;
p.appendChild(h);
}

p = document.getElementById("ins_div_contenu");
h = document.createElement("div");
h.id = 'timettt';
h.setAttribute('style',';margin: 0px 0px 3px 0px;padding: 1px 0px 3px 0px;text-align:center;line-height:15px;font-family:Verdana,Arial,SunSans-Regular,Sans-Serif;font-size:10px;color: #d39343;background:url("http://imageshack.com/scaled/medium/405/gkc2.png") no-repeat;background-size:137px 20px;');
n1 += '<table width="137px"><tr>';
n1 += '<td><span id="bt_refresh"></span></td>';
n1 += '<td><span id="bt_alerte_mess"></span></td>';
n1 += '<td><span id="bt_alrt_atak"></span></td>';
n1 += '<td><span id="div_bt_timer"></span></td>';
n1 += '</tr></table>';
h.innerHTML = n1 ;
p.appendChild(h);
p = document.getElementById("bt_refresh");
h = document.createElement("a");
h.id = "ins_bt_refresh";
if(autofresh == 'ON'){	h.innerHTML = '<input type="hidden" id="autofresh" value="'+autofresh+'"><img title="On/Off Auto Refresh" class="tooltip" style="display:inline;" width="18px" height="18px" src="http://imageshack.com/scaled/large/534/osn.gif">';}
else{					h.innerHTML = '<input type="hidden" id="autofresh" value="'+autofresh+'"><img title="On/Off Auto Refresh" class="tooltip" style="display:inline;" width="18px" height="18px" src="http://imageshack.com/scaled/large/690/lofq.png">';	}
h.addEventListener("click",function(){fn_refresh();},false);
p.appendChild(h);



}//## Affichage division ##//

function fn_refresh(){
	var autof = document.getElementById("autofresh").value;
	if	( getVar("autof")=="ON"){setVar("autof",'OFF');}
	else{setVar("autof","ON");}
	reload();}

function fn_sh_oan(){
    if	( getVar("s_h_oan")==1){setVar( "s_h_oan" ,0);reload();}
    else{setVar( "s_h_oan" ,1);reload();	}
}
function reload() {	window.location.replace( sURL );}
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


