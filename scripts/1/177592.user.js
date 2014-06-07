// ==UserScript==
// @name			LidOCB : Ogame Calcul Du Butin
// @namespace      	LidOCB : Ogame Calcul Du Butin
// @description    	LidOCB : Ogame Calcul Du Butin
// @author         	Lidmaster
// @author         	Lidmaster
// @version        	1.33
// @include			http://*.ogame.*/*
// ==/UserScript==

{// ##OCB## 				Les Variables	
var url=location.href;					
var	p,p1,h,n1,n2,n3;
//var lid =getVar("lid",0);
//var a = 1 ;
var sURL            = 'index.php?page=messages';
var tt_rsr1			=  getVar("tt_rsr1",0);
var tt_rsr2			=  getVar("tt_rsr2",0);
var tt_rsr3			=  getVar("tt_rsr3",0);
var tp_msg			=  getVar("tp_msg",0);
var trsrt = (getVar("tt_rsr1",0)+getVar("tt_rsr2",0)+getVar("tt_rsr3",0));
var data_message_id_old = -1;
var metas 			= document.getElementsByTagName('META');
}// ##OCB## 			Les Variables	

{// ##OCB## 			Selection de la langue + Variable de texte
var i;for (i = 0; i < metas.length; i++)
if (metas[i].getAttribute('NAME') == "ogame-universe")break;
var meta_uni = metas[i].getAttribute('CONTENT');
var act_meta_uni= meta_uni
var lang = act_meta_uni.split('.')[2];

if( lang == 'fr'){
var txt_1 = 'Métal';
var txt_2 = 'Cristal';
var txt_3 = 'Deut';
var txt_4 = 'Total';
var txt_5 = 'Reset';
var txt_6 = 'Calculer';
var txt_7 = '';
var txt_8 = '';
var txt_9 = '';
var txt_10 = '';
}

else if( lang == 'it'){
var txt_1 = 'Métal';
var txt_2 = 'Cristal';
var txt_3 = 'Deutérium';
var txt_4 = 'Total';
var txt_5 = 'Reset';
var txt_6 = 'Calc';
var txt_7 = '';
var txt_8 = '';
var txt_9 = '';
var txt_10 = '';
}

else {
var txt_1 = 'Métal';
var txt_2 = 'Cristal';
var txt_3 = 'Deutérium';
var txt_4 = 'Total';
var txt_5 = 'Reset';
var txt_6 = 'Calc';
var txt_7 = '';
var txt_8 = '';
var txt_9 = '';
var txt_10 = '';
}
}// ##OCB## 			Selection de la langue + Variable de texte

{// ##OCB## 				SI url.indexOf('page=messages',0)  >= 0 
if (  url.indexOf('page=messages',0)  >= 0 ){	
	{// ##OCB## 			Grande Division - Total Pillage + Reset
	{// ##OCB## 			Division - Total Pillage + Reset		
	p = document.getElementById('vier');
	h = p.insertBefore(document.createElement("div" ),p.firstChild);
	h.setAttribute('style',';margin:0px 0px 0px 15px;width:600px;height:60px;');
	h.id = "maxi_swt";
	n1 = '<table align="left" width="100%"><tr>';
	n1 += '<td align="center"><span id="ins_div_met"></span></td>';
	n1 += '<td align="center"><span id="ins_div_cri"></span></td>';
	n1 += '<td align="center"><span id="ins_div_deut"></span></td>';
	n1 += '</tr><tr>';
	n1 += '<td align="center"><span id="ins_div_tst"></span></td>';
	n1 += '<td align="center"><span id="ins_div_trsrt"></span></td>';
	n1 += '<td align="center"><span id="ins_div_rst"></span></td>';
	n1 += '</tr></table>';
	h.innerHTML = n1;
	}// ##OCB## 			Division - Total Pillage + Reset
	{// ##OCB## 			Division - Total Pillage Metal
	p = document.getElementById("ins_div_met");h = document.createElement("div");
	h.setAttribute('style',';width:160px;height:20px;padding:4px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:160px 24px;');
	h.id = "div_met";
	h.innerHTML = txt_1+' : '+tt_rsr1;
	p.appendChild(h);	
	}// ##OCB## 			Division - Total Pillage Metal		
	{// ##OCB## 			Division - Total Pillage Cristal
	p = document.getElementById("ins_div_cri");h = document.createElement("div");
	h.setAttribute('style',';width:160px;height:20px;padding:4px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:160px 24px;');
	h.id = "div_cri";
	h.innerHTML = txt_2+' : '+tt_rsr2;
	p.appendChild(h);	
	}// ##OCB## 			Division - Total Pillage Cristal
	{// ##OCB## 			Division - Total Pillage Deut
	p = document.getElementById("ins_div_deut");h = document.createElement("div");
	h.setAttribute('style',';width:160px;height:20px;padding:4px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:160px 24px;');
	h.id = "div_deut";
	h.innerHTML = txt_3+' : '+tt_rsr3;
	p.appendChild(h);	
	}// ##OCB## 			Division - Total Pillage Deut
	{// ##OCB## 			Division - Total Pillage Total
	p = document.getElementById("ins_div_trsrt");h = document.createElement("div");
	h.setAttribute('style',';width:160px;height:20px;padding:4px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:160px 24px;');
	h.id = "div_trsrt";
	h.innerHTML = '<b>'+txt_4+' : '+trsrt+'</b>';
	p.appendChild(h);	
	}// ##OCB## 			Division - Total Pillage Total
	{// ##OCB## 			Division - Reset	
	p = document.getElementById("ins_div_rst");h = document.createElement("div");
	h.setAttribute('style',';width:160px;height:25px;padding:4px 0px 0px 0px;margin:0px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:160px 27px;');
	h.id = "div_sw2";
	h.innerHTML = txt_5;
	h.addEventListener("click",function(){reset();},false);
	p.appendChild(h);
	}// ##OCB## 			Division - Total Pillage Reset
	{// ##OCB## 			Division - Recalculer	
	p = document.getElementById("ins_div_tst");h = document.createElement("div");
	h.setAttribute('style',';width:160px;height:25px;padding:4px 0px 0px 0px;margin:0px 0px 0px 0px;text-align:center;color: #8ECEFF;background:url("http://imageshack.com/scaled/medium/15/aau6.png") no-repeat;background-size:160px 27px;');
	h.id = "div_tst";
	h.innerHTML = txt_6;
	h.addEventListener("click",function(){reload();},false);
	p.appendChild(h);
	}// ##OCB## 			Division - Recalculer
  }// ##OCB## 			Grande Division - Total Pillage + Reset
	{// ##OCB## 			Fonction Intervalle	
	function intervalRC(){
	{// ##OCB## 			If sujet message = exploitation
	tt_rsr1			=  getVar("tt_rsr1",0);
	tt_rsr2			=  getVar("tt_rsr2",0);
	tt_rsr3			=  getVar("tt_rsr3",0);
	var winwin = document.getElementsByClassName('note');  
	var xxd2 = winwin[0].innerHTML;
	var sasa = xxd2.split('</a>')[1];	
    var strReplaceAll2 = sasa;
    var intIndexOfMatch = strReplaceAll2.indexOf( "." );
    while (intIndexOfMatch != -1){
		strReplaceAll2 = strReplaceAll2.replace( ".", "" );
		intIndexOfMatch = strReplaceAll2.indexOf( "." );
    }
	var matches2 = strReplaceAll2.match(/\d+/g);
	var rs1s = parseFloat(matches2[0]);var rs2s = parseFloat(matches2[1]);
	var win11s = document.getElementsByClassName('showmessage'); 
	var xxdds = win11s[0];
	var win12s = xxdds.getAttribute('data-message-id');
	var add_rcs = 'Recy : <span id="addrcs" style="text-align:center;color: #FF9900;"><b><a>Ajouter au total</a></b></span>';
	var del_rcs = 'Recy : <span id="delrcs" style="text-align:center;color: #FF9900;"><b><a>Delete du total</a></b></span>';
	var tret = document.getElementsByClassName('toolbar'); 
	var tret1 = tret[0].getElementsByTagName('li');
	var teste = document.getElementsByClassName('infohead');
	var teste2 = teste[0].getElementsByTagName('td');
	var teste3 = teste2[2].innerHTML ;
	var pos = teste3.indexOf('exploitation');			
	if (pos >= 0) {			
		if (getVar("mid_"+(win12s))!=1) {
			tret1[0].innerHTML = add_rcs;
			p = document.getElementById("addrcs");
			p.addEventListener("click",function(){add_recy();},false);
			function add_recy(){ 
				setVar("tt_rsr1",((tt_rsr1)+(rs1s)));
				setVar("tt_rsr2",((tt_rsr2)+(rs2s)));
				setVar("mid_"+win12s,1);					
			}
		}
		else {
			tret1[0].innerHTML = del_rcs;
			p = document.getElementById("delrcs");
			p.addEventListener("click",function(){del_recy();},false);
			function del_recy(){ 
				setVar("tt_rsr1",((tt_rsr1)-(rs1s)));
				setVar("tt_rsr2",((tt_rsr2)-(rs2s)));
				setVar("mid_"+win12s,0);
			}
		}
	}
	}// ##OCB## 			If sujet message = exploitation
	{// ##OCB## 			If sujet message = combat			
	tt_rsr1			=  getVar("tt_rsr1",0);
	tt_rsr2			=  getVar("tt_rsr2",0);
	tt_rsr3			=  getVar("tt_rsr3",0);
	var win1 = document.getElementsByClassName('summary');  
	var xxd = win1[0].getElementsByTagName('td');
	var abc = xxd[2].innerHTML;
    var strReplaceAll = abc;
    var intIndexOfMatch = strReplaceAll.indexOf( "." );
    while (intIndexOfMatch != -1){
		strReplaceAll = strReplaceAll.replace( ".", "" );
		intIndexOfMatch = strReplaceAll.indexOf( "." );
    }
	var matches = strReplaceAll.match(/\d+/g);
	var rs1 = parseFloat(matches[0]);var rs2 = parseFloat(matches[1]);var rs3 = parseFloat(matches[2]);
	var win11 = document.getElementsByClassName('showmessage'); 
	var xxdd = win11[0];
	var win12 = xxdd.getAttribute('data-message-id');
	var add_rc = 'Butin : <div  id="addrc"style="text-align:center;color: #FF9900;"><b><a>Ajouter au total</a></b></div>';
	var del_rc = 'Butin : <div  id="delrc"style="text-align:center;color: #FF9900;"><b><a>Delete du total</a></b></div>';
	var t2este = document.getElementsByClassName('infohead');
	var t2este2 = t2este[0].getElementsByTagName('td');
	var t2este3 = t2este2[2].innerHTML ;
	var pos2 = t2este3.indexOf('combat');			
	if (pos2 >= 0) {	
		if (getVar("mid_"+(win12))!=1) {
			xxd[1].innerHTML = add_rc;
			p = document.getElementById("addrc");
			p.addEventListener("click",function(){add_cr();},false);
			function add_cr(){ 
				setVar("tt_rsr1",((tt_rsr1)+(rs1)));
				setVar("tt_rsr2",((tt_rsr2)+(rs2)));
				setVar("tt_rsr3",((tt_rsr3)+(rs3)));
				setVar("mid_"+win12,1);
			}
		}
		else {
			xxd[1].innerHTML = del_rc;
			p = document.getElementById("delrc");
			p.addEventListener("click",function(){del_cr();},false);
			function del_cr(){ 
				setVar("tt_rsr1",((tt_rsr1)-(rs1)));
				setVar("tt_rsr2",((tt_rsr2)-(rs2)));
				setVar("tt_rsr3",((tt_rsr3)-(rs3)));
				setVar("mid_"+win12,0);
			}
		}
	}
	}// ##OCB## 			If sujet message = combat
	}
	}// ##OCB## 			Fonction Intervalle	
	var int=setInterval(intervalRC, 500);
	int;
}// if (  url.indexOf('page=messages',0)  >= 0 ){
}// ##OCB## 			SI url.indexOf('page=messages',0)  >= 0	

			
function reset(){
//setVar("tt_rsr1",0);
//setVar("tt_rsr2",0);
//setVar("tt_rsr3",0);
var keys = GM_listValues();
for (var i=0, key=null; key=keys[i]; i++) {
  GM_deleteValue(key);
}
reload();
}
function reload() {    
window.location.replace( sURL );
}
function getVar(varname, vardefault) {
    var res = GM_getValue(document.location.host+varname);
    if (res == undefined) {return vardefault;}
    return res;
}
function setVar(varname, varvalue) {    GM_setValue(document.location.host+varname, varvalue);}



