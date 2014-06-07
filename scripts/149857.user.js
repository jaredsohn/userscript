// ==UserScript==
// @name           Farm List plus
// @author         steal1982
// @description    http://steal1982.altervista.org/farm_list_plus.php
// @namespace      FLT
// @grant 	all
// @grant GM_xmlhttpRequest


// @include        http://*.travian.*/build.php?*tt=99*


// @version        0.1.10
// ==/UserScript==
var SCRIPT = {
	url : 'http://steal1982.altervista.org/download/farm_list_plus.user.js',
	version : '0.1.10' //same value as @version
};
var minWait=60*1000;
var maxWait=3*60*1000;

var AUTORAIDER=true;
var capacTruppe=60;
var tipotruppe=1;

var SERVER=get_server();
var OPTLISTE={};
loadListaOptions();
var randtemp=0;
function main(){
	//setItem('automode',-1);
	//setItem('autoEditMode',-1);
	//setItem('aggiungilista','');
	checkUpdateScript(SCRIPT);
	if (document.URL.indexOf("tt=99")!=-1){
		var form=document.getElementById("edit_form");
		if (form!=null)
			doEditSlot(form);
		else{

			
			
			doFarmList();

	
//			addButtons();
		
			
	}
}

}
function doEditSlot(form){

	var modo=getItem('automode');
	var autoeditmode=getItem('autoEditMode');
	if (modo!=null && parseInt(modo)>=0){
		var lista=getItem('aggiungilista');	
		var elenco=lista.split(';');
		lista=lista.substring(lista.indexOf(';')+1);
//		alert(lista)
		setItem('aggiungilista',lista);
		if(lista.length==0|| elenco.length==1){
			setItem('automode',-1);
		}else{

		}
		setFarmElab(elenco[0]);
	document.getElementById('save').click();
		
	}else if(autoeditmode!=null && autoeditmode!=-1){

		//TROVA ID
		var url=document.URL;
		var eId=url.split("eid=")[1].split("&")[0];
		var listam=getItem("listaModifiche");
		var lista=listam.split(";");

		for(var i=0;i<lista.length;i++){
			tid=lista[i].split(",");
//alert(tid[0]+"-"+eId);

			if(eId==tid[0]){
				document.getElementById("t"+tipotruppe).value=tid[1];
				document.getElementById('save').click();
			}
		}
		
		listam=listam.substring(listam.indexOf(";")+1);
		if(listam.length==0|| lista.length==1){
			setItem('autoEditMode',-1);
}
		setItem("listaModifiche",listam);
		try{Thread.sleep(Random(1000,2000));}catch(e){}
	document.getElementById('save').click();
	}else{
	var table=getElementByClass('table','transparent',form)[0];
	var tr=document.createElement('tr');
	var th=document.createElement('th');
	var td=document.createElement('td');
	var x=document.getElementById('xCoordInput').value;
	var y=document.getElementById('yCoordInput').value;
 	th.innerHTML="&nbsp;";
	td.innerHTML="<a href='position_details.php?x="+x+"&y="+y+"' target='_blank'>visita villo</a>";
	tr.appendChild(th);
	tr.appendChild(td);
	table.appendChild(tr);
	}

}
function checkAttack(){
	if(document.documentElement.innerHTML.indexOf("<p>sono stati fatti")!=-1){
		return true;
	}else
		return false;
}
function drawDivSetting(){
	
	var div=document.createElement('div');
	div.setAttribute('style','position: fixed; top: 70px; left: 10px; width: 220px; height: 150px; overflow: auto; background-color:black;z-index:100;color:white;');

	var input_min=creaInputText('inputmin','min wait:',minWait/1000,'tempo(in secondi) minimo d\'attesa tra un invio e l\'altro');
	var input_max=creaInputText('inputmax','max wait:',maxWait/1000,'tempo(in secondi) massimo d\'attesa tra un invio e l\'altro');
	var chk=document.createElement('input');
	var span=document.createElement('span');
	var label=document.createTextNode('Enable Autoraid: ');

	chk.setAttribute('type','checkbox');
	chk.setAttribute('id','chk_autoraid');
	chk.checked=AUTORAIDER;
	span.appendChild(label);
	span.appendChild(chk);
	
	//input_min.setAttribute('value',minWait/1000);
	//input_max.value=maxWait/1000;
	var br=document.createElement('br');

	div.appendChild(span);
	div.appendChild(br);
	div.appendChild(input_min);
	br=document.createElement('br');
	div.appendChild(br);
	div.appendChild(input_max);
	var salva=creaancora("salva","salva",function(){salvaImpostazioni();});
	br=document.createElement('br');
	div.appendChild(br);
	div.appendChild(salva);
	var divMessage=document.createElement('div');
	divMessage.setAttribute('id','divmessage');
	div.appendChild(divMessage);
	getElementByClass("div","bodyWrapper",document)[0].appendChild(div);
	
}
function loadImpostazioni(){
	var minWaitt=getItem(SERVER+'_flp_minwait');
	var maxWaitt=getItem(SERVER+'_flp_maxwait');
	var autoraid=getItem(SERVER+'_flp_autoraid');
	if (minWaitt!=null){
		minWait=parseInt(minWaitt)*1000;
	}
	if (maxWaitt!=null){
		maxWait=parseInt(maxWaitt)*1000;
	}

	if (autoraid!=null){
		AUTORAIDER=autoraid;
	}

}
function salvaImpostazioni(){
	var min_wait=document.getElementById('inputmin').value;
	var max_wait=document.getElementById('inputmax').value;
	var auto_raid=document.getElementById('chk_autoraid').checked;
	setItem(SERVER+'_flp_minwait',min_wait);
	setItem(SERVER+'_flp_maxwait',max_wait);
	setItem(SERVER+'_flp_autoraid',auto_raid);
	alert('salvato');
}

function creaInputText(id,label,value,descrizione){
var span=document.createElement('span');
var input=document.createElement('input');
input.setAttribute('type','text');
input.setAttribute('id',id);
input.setAttribute('maxlength','4');
input.setAttribute('value',value);
input.setAttribute('style','width:30px');
var label=document.createTextNode(label);
span.setAttribute('title',descrizione);
span.appendChild(label);
span.appendChild(input);

return span;
}
function doFarmList(){
	var divEntryList=getElementByClass("div","listEntry",document);
	var automode=getItem("automode");
	var editmode=getItem("autoEditMode");

			if(automode!=null && automode!=-1){
				addListFarmElab(divEntryList[automode]);	
			}else if(editmode!=null && editmode!=-1){
				var lista=getItem("listaModifiche");
//alert(lista);
				prossima_correzione(lista);


	}else{
	loadImpostazioni();
	drawDivSetting();
	var trovaAutoRaid=true;
	for(var i=0;i<divEntryList.length;i++){
	try{	
		//if(checkOptionsAutoRaid(divEntryList[i].getAttribute('id'))){trovaAutoRaid=true;}

		var classDetail=null;
			try{
				classDetail=getElementByClass("div","detail",divEntryList[i])[0];
			}catch(error){
			//	alert("getelementbyclass:",error);
			}
			if (classDetail!=null){
				try{						
					adjustFarmList(divEntryList[i],i);
				}catch(error){
//					alert("adjustfarmlist:",error);
				}
			}
			else{
				var listHide=[];
				try{
				listHide=getElementByClass("div","openedClosedSwitch switchClosed",divEntryList[i]);

				}catch(e)
			{
				//	alert("getListHide:"+error);
				}
				//alert(listHide);
				if (listHide.length>0){
					try{

					setTimeout(listHide[0].parentNode.getAttribute("onClick"),Random(2000,5000));
					setTimeout(createAdjustFarmListCallback(divEntryList[i]),Random(30000,60000));
					
					}catch(e){
						alert("getListHide"+e);
					}
				}
				
			}

			
		
	}catch(er){
		alert(error);
	}
	}
	var riesegui=creaancora("riesegui","riesegui",function(){main();});
try{
	var opt=getElementByClass("div","options",document.getElementById('raidList'))[0];
	opt.appendChild(document.createElement('br'));
	opt.appendChild(riesegui);
}catch(e){}
	try{
	var message="";
	if (AUTORAIDER==true){

//	alert('diocane');
		//setTimeout(createAutoSelectGreenCallback(divEntryList[0]),Random());
		if(trovaAutoRaid){
			var trovato=false;
			var loose=0;
			while(trovato==false && loose<divEntryList.length){
				indice=incrementIndice(divEntryList.length);
				if(checkOptionsAutoRaid(divEntryList[indice].getAttribute('id'))){trovato=true;}
				else{ loose++;}
				
			}

			if(trovato){
//				alert(indice);

				var rand=checkAttack()?Random():Random(60000,120000);
				setTimeout(createAutoSelectRaidCallback(divEntryList[indice]),rand);
				var divTitle=getElementByClass('div','listTitleText',divEntryList[indice])[0].innerHTML.split('>')[1].split('<')[0];
				message="prossimo invio su:<b>" + divTitle + "</b> tra " + Math.ceil(rand/1000) +" secondi";
			}else{

				message='non sono state definite opzioni per l\'autoraid';
				//alert(OPTLISTE.toSource());
			}
		}

	}else{
		message="autoraid disabilitato";
	}
				var divMessage=document.getElementById('divmessage');

				divMessage.innerHTML=message;

	
}catch(except){
alert(except);
	}
}}
function checkOptionsAutoRaid(id_lista){
	var elemu=getListaOptions(id_lista);

	if (elemu['autoraid_tutti_verdi'] ||
	elemu['autoraid_full_verdi'] ||
	elemu['autoraid_novuoti_verdi'] ||
	elemu['autoraid_vuoti_verdi'] ||
	elemu['autoraid_tutti_gialli'] ||
	elemu['autoraid_full_gialli'] ||
	elemu['autoraid_novuoti_gialli'] ||
	elemu['autoraid_vuoti_gialli'] ||
	elemu['autoraid_tutti_rossi'])
		return true;
	else
		return false;
}
//function showHide(lista){
//var l=getElementByClass("div","round spacer listTitle",lista)[0];
//	l.click();
//	setTimeout(createAdjustFarmListCallback(lista),5000);
//}
//function drawTitleOpzions(divEntryList){
//	try{
//	var newDiv=document.createElement('div');
//	var chkAutoraid=document.createElement('input');
//	chkAutoraid.setAttribute('type','checkbox');
//	var testo=document.createTextNode("Enable Autoraid");
//	newDiv.appendChild(chkAutoraid);
//	newDiv.appendChild(testo);
//	return newDiv;
//	}catch(e){alert(e);}
//}
function adjustFarmList(divEntryList,numlist){
try{
	var rows=getElementByClass('tr','slotRow',divEntryList);

			var options=getListaOptions(divEntryList.getAttribute('id'));
			var classDetail=getElementByClass("div","detail",divEntryList)[0];
				var buttons=creaButtons(rows,numlist,divEntryList);
				creaLinks(rows);
				var divSelectGreen=document.createElement('div');
				var table=creaTable(4,buttons);
				var trs=table.getElementsByTagName('tr');
				setcolor(trs[0],'green');
				setcolor(trs[1],'yellow');
				setcolor(trs[2],'red');
				
				divSelectGreen.appendChild(table);			
			

				classDetail.appendChild(document.createElement('br'));
				classDetail.appendChild(document.createElement('br'));
				classDetail.appendChild(divSelectGreen);
				//classDetail.appendChild(drawTitleOpzions(divEntryList));
}catch(error){
//alert('adjustFarmList_'+divEntryList.getAttribute('id')+'_'+error);
}}
function getListaOptions(idLista){
try{
	var elemu=OPTLISTE[idLista];
	if (elemu==null){

		elemu={
			'idLista':idLista,
			'autoraid_tutti_verdi':false,
			'autoraid_full_verdi':false,
			'autoraid_novuoti_verdi':false,
			'autoraid_vuoti_verdi':false,

			'autoraid_tutti_gialli':false,
			'autoraid_full_gialli':false,
			'autoraid_novuoti_gialli':false,
			'autoraid_vuoti_gialli':false,

			'autoraid_tutti_rossi':false,

			'multiattak_tutti_verdi':false,
			'multiattak_full_verdi':false,
			'multiattak_novuoti_verdi':false,
			'multiattak_vuoti_verdi':false,

			'multiattak_tutti_gialli':false,
			'multiattak_full_gialli':false,
			'multiattak_novuoti_gialli':false,
			'multiattak_vuoti_gialli':false,

			'multiattak_rossi_rossi':false
			};

		OPTLISTE[idLista]=elemu;
		
	}

	return elemu;
}catch(e){
alert('figa'+e);}



}
function setcolor(tr,color){
tr.style.backgroundColor=color;
var tds=tr.getElementsByTagName('td');
for(var i=0;i<tds.length;i++){
	tds[i].style.backgroundColor=color;
}
}
function creaMenuDiv(ancora){
	var div=document.createElement('div');
	div.appendChild(ancora);
	return div;
}
function creaButtons(rows,numList,lista){
	var out=[];
	out[0]=creaMenuDiv(creaancora('Tutti','verdi',createSelectAllCallback(lista,'v')));
	out[0].appendChild(createAutoraidChk(lista,'autoraid_tutti_verdi'));
	out[0].appendChild(createMultiAttackChk(lista,'multiattak_tutti_verdi'));

	out[1]=creaMenuDiv(creaancora('Full','verdi',createSelectFullCallback(lista,'v')));
	out[1].appendChild(createAutoraidChk(lista,'autoraid_full_verdi'));
	out[1].appendChild(createMultiAttackChk(lista,'multiattak_full_verdi'));

	out[2]=creaMenuDiv(creaancora('No Vuoti','verdi',createEscludiVuotiCallback(lista,'v')));
	out[2].appendChild(createAutoraidChk(lista,'autoraid_novuoti_verdi'));
	out[2].appendChild(createMultiAttackChk(lista,'multiattak_novuoti_verdi'));

	out[3]=creaMenuDiv(creaancora('Vuoti','verdi',createVuotiCallback(lista,'v')));
	out[3].appendChild(createAutoraidChk(lista,'autoraid_vuoti_verdi'));
	out[3].appendChild(createMultiAttackChk(lista,'multiattak_vuoti_verdi'));

	out[4]=creaMenuDiv(creaancora('Tutti','gialli',createSelectAllCallback(lista,'g')));
	out[4].appendChild(createAutoraidChk(lista,'autoraid_tutti_gialli'));
	out[4].appendChild(createMultiAttackChk(lista,'multiattak_tutti_gialli'));

	out[5]=creaMenuDiv(creaancora('Full','gialli',createSelectFullCallback(lista,'g')));
	out[5].appendChild(createAutoraidChk(lista,'autoraid_full_gialli'));
	out[5].appendChild(createMultiAttackChk(lista,'multiattak_full_gialli'));

	out[6]=creaMenuDiv(creaancora('No Vuoti','gialli',createEscludiVuotiCallback(lista,'g')));
	out[6].appendChild(createAutoraidChk(lista,'autoraid_novuoti_gialli'));
	out[6].appendChild(createMultiAttackChk(lista,'multiattak_novuoti_gialli'));

	out[7]=creaMenuDiv(creaancora('Vuoti','gialli',createVuotiCallback(lista,'g')));
	out[7].appendChild(createAutoraidChk(lista,'autoraid_vuoti_gialli'));
	out[7].appendChild(createMultiAttackChk(lista,'multiattak_vuoti_gialli'));

	out[8]=creaMenuDiv(creaancora('Tutti','rossi',createSelectAllCallback(lista,'r')));
	out[8].appendChild(createAutoraidChk(lista,'autoraid_tutti_rossi'));
	out[8].appendChild(createMultiAttackChk(lista,'multiattak_tutti_rossi'));
	
	out[9]=document.createTextNode(' ');
	out[10]=document.createTextNode(' ');	
	out[11]=document.createTextNode(' ');

//	out[9]=creaMenuDiv(creaancora('Full','rossi',createSelectFullCallback(rows,'r'));
//	out[9].appendChild(createChkBoxWithAction(lista,'autoraid_full_rossi'));
//	out[10]=creaMenuDiv(creaancora('No Vuoti','rossi',createEscludiVuotiCallback(rows,'r'));
//	out[10].appendChild(createChkBoxWithAction(lista,'autoraid_novuoti_rossi'));
//	out[11]=creaMenuDiv(creaancora('Vuoti','rossi',createVuotiCallback(rows,'r'));
//	out[11].appendChild(createChkBoxWithAction(lista,'autoraid_vuoti_rossi'));



	out[12]=creaancora("seleziona lista","seleziona lista",createSelectListaCallback(rows));
	out[13]=creaancora("Aggiungi lista","aggiungi lista",createAddListaCallback(numList,lista));
	out[14]=creaancora("Correggi Truppe","correggi lista",createCorreggiListaCallback(rows));
	out[15]=creaancora("cerca Oasi Libere","cerca Oasi Libere",createCercaLibereCallback(rows));
	//out[16]=creaancora("Importa Inattivi","Importa Inattivi",importaInattiviCallback(rows));
	
	return out;
}
function createMultiAttackChk(lista,id){

	return createChkBoxWithAction('','seleziona anche i villi sotto attacco',lista,id,createClickChkListaOptionsCallback(lista,id));
}
function createAutoraidChk(lista,id){

	return createChkBoxWithAction('','seleziona in autoraid mode',lista,id,createClickChkListaOptionsCallback(lista,id));
}
function clickChkListaOptions(lista,nome){
	var lista_id=lista.getAttribute('id');
	var chk=document.getElementById(lista_id+'_'+nome);
	var elemu=getListaOptions(lista_id);
	elemu[nome]=chk.checked;
	OPTLISTE[lista_id]=elemu;
	saveListaOptions();


}

function saveListaOptions(){

	setItem(SERVER+'_flp_optListe',OPTLISTE.toSource());
}
function loadListaOptions(){
	//SsetItem(SERVER+'_flp_optListe','');
	var opt=getItem(SERVER+'_flp_optListe');
	if (opt!=null && opt.length>0){

		OPTLISTE=eval(opt);
	}	
}
function createChkBoxWithAction(text,title,lista,id,jsFunction){
	var lista_id=lista.getAttribute('id');
	var div=document.createElement('span');
	var chk=document.createElement('input');
	chk.setAttribute('type','checkbox');
	div.setAttribute('title',title);
	chk.setAttribute('id',lista_id+'_'+id);
	var elemu=getListaOptions(lista_id);
	chk.checked=elemu[id];
	var txt=document.createTextNode(text);
	
	if(jsFunction != null) {

		chk.addEventListener('click', jsFunction, 0);

//		div.addEventListener('click', jsFunction,0);
//		div.setAttribute('click',jsFunction );
}

	div.appendChild(chk);
	div.appendChild(txt);
	return div;

}

function creaTable(y,values){
	var ix=parseInt(values.length/y);
	var fx=values.length/y;	
	var x=0;
	var lastspanned=false	
	if (ix<fx){
		x=ix;
		lastspanned=true;
	}else if (ix>fx){
		x=ix-1;
		lastspanned=true;
	}else
		x=ix;
		
	var table=document.createElement('table');

	for(var i=0,j=0;i<x && j<values.length;i++){
		var tr=document.createElement('tr');
		for(var k=0;k<y && j<values.length;k++){

			var td=document.createElement('td');
			try{
			td.appendChild(values[j]);
			}catch(e){
			alert(j+'cazzo'+e);
			}
			j++;
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	if (lastspanned){
		var mod=values.length % y;
		
		for(var i=values.length-mod,j=0;j<mod;i++,j++){
			var riga=document.createElement('tr');
			var colonna=document.createElement('td');
			colonna.setAttribute('colspan',y);
			colonna.appendChild(values[i]);
			riga.appendChild(colonna);
			table.appendChild(riga);
		}
	}
	return table;
}


function creaLinks(rows){
	for(var i=0;i<rows.length;i++){
try{
		var tdVillage=getElementByClass('td','village',rows[i])[0];

		var label=tdVillage.getElementsByTagName('label')[0];
		var villaggio;
		if (isOasi(label))
			villaggio=setOasiVillage(label);
		else{
			villaggio=setVillage(label,rows[i]);
			
		}
			try{
			var lastReport=getElementByClass("td","lastRaid",rows[i])[0];
			var temp=lastReport.innerHTML;
			var risorseprese=temp.split("Bottino:")[1].split("risorse")[0].trim();
			var risorseTot=temp.split("Capacità massima:")[1].split("risorse")[0].trim();
			lastReport.innerHTML+=risorseprese + "/"+risorseTot;
			}catch(e){}
			
		
}catch(error){}
	}
}
function isOasi(label){
	if (getElementByClass('span','coordText',label).length>0)
		return true;
	else
		return false;
}
function getOasiVillage(label){
		var nomeOasi=getElementByClass('span','coordText',label)[0].innerHTML;
		var x=getElementByClass('span',"coordinateX",label)[0].innerHTML.split('(')[1];
		var y=getElementByClass('span',"coordinateY",label)[0].innerHTML.split(')')[0];

		var oasiOut={
			nomeVillaggio:nomeOasi,
			cx:x,
			cy:y
		}
		return oasiOut;
}
function setOasiVillage(label){
	var oasi=getOasiVillage(label);
	getElementByClass('span','coordText',label)[0].innerHTML=createLink(oasi);
	return oasi;
}
function setVillage(label,row){
	var village=getVillage(label,row);
	label.innerHTML=createLink(village);
	return village;
}
function createLink(village){
	if (village.cx!=null && village.cy!=null && village.cx!='' && village.cy!=''){
		return '<a href="position_details.php?x='+village.cx+'&y='+village.cy+'" target="_blank">'+village.nomeVillaggio+'</a>';
	}
	
}
function findCoords(id){
	var url='build.php?gid=16&tt=99&action=showSlot&eid='+id+'&sort=distance&direction=asc';
	GM_xmlhttpRequest({
			method : 'GET',
			url : url,
			onload : function(result) {
				if (result.status != 200) {
					//alert('errorenot200')
					return;
				}
				var response=result.responseText;
				var end='</div>';
				var xTR='<label for="xCoordInput">X:</label>';
				var TRI='<input maxlength="4" value="';
				var xTemp=response.split(xTR)[1].split(end)[0].split(TRI)[1].split('"')[0];
				var yTR='<label for="yCoordInput">Y:</label>';
				var yTemp=response.split(yTR)[1].split(end)[0].split(TRI)[1].split('"')[0];
				var coords='('+ xTemp + '|' + yTemp+')';
				var hTR='<input type="hidden" name="eid" value="';
				var h=response.split(hTR)[1].split('"')[0];
				
				var nome='villaggio'+h;
				//alert(nome+'______'+coords);
				setItem(nome,coords);

				

				
				//alert(nomeVilTemp);
					
			}
	});
}
function getVillage(label,row){
	var nv=label.innerHTML.trim();
	var id=getElementByClass('td','action',row)[0].getElementsByTagName('a')[0].getAttribute('onclick').split(',')[1].split(')')[0].trim();
	var coordText=getItem('villaggio'+id);
	var c=getCoords(coordText);
	if (c[0]==null || c[1]==null){
		
		findCoords(id);
		
	}
	var out={
		nomeVillaggio:nv,
		cx:c[0],
		cy:c[1]
	}
	return out;
}
function getCoords(text){
	var out=[];
	try{
		text=text.trim();
		var c=text.substring(text.indexOf('(')+1,text.indexOf(')'));	
		out[0]=c.substring(0,c.indexOf('|'));
		out[1]=c.substring(c.indexOf('|')+1);
	}catch(e){
		out[0]=null;
		out[1]=null;
	}
	return out;
	

}



function autoSelectRaid(lista){
	var rows=getElementByClass('tr','slotRow',lista);
	var id_lista=lista.getAttribute('id');
	var elemu=getListaOptions(id_lista);
	for(var i=0;i<rows.length;i++){try{
			if (elemu['autoraid_tutti_verdi']){
				checkTutti(rows[i],elemu,'v');
			}
			if (elemu['autoraid_full_verdi']){
				checkFull(rows[i],elemu,'v');
			}
			if (elemu['autoraid_novuoti_verdi']){
				checkNovuoti(rows[i],elemu,'v');
			}
			if (elemu['autoraid_vuoti_verdi']){
				checkVuoti(rows[i],elemu,'v');
			}

			if (elemu['autoraid_tutti_gialli']){
				checkTutti(rows[i],elemu,'g');
			}
			if (elemu['autoraid_full_gialli']){
				checkFull(rows[i],elemu,'g');
			}
			if (elemu['autoraid_novuoti_gialli']){
				checkNovuoti(rows[i],elemu,'g');
			}
			if (elemu['autoraid_vuoti_gialli']){
				checkVuoti(rows[i],elemu,'g');
			}

			if (elemu['autoraid_tutti_rossi']){
				checkTutti(rows[i],elemu,'t');
			}

	}catch(error){}}

	iniziaRaid(lista);
}
function getSpada(colore,row){
	if(colore=='v')
		return getSpadaVerde(row);
	else if (colore=='g')
		return getSpadaGialla(row);
	else if (colore='r')
		return getSpadaRossa(row);

}
function pienix(rows,colore){

}
function transColore(colore){
	if(colore=='v') return 'verdi';
	else if(colore=='g') return 'gialli';
	else if(colore=='r') return 'rossi';
}

function checkTutti(row,elemu,colore){
	var multiattak=elemu['multiattak_tutti_'+transColore(colore)];
	try{
		if(getSpada(colore,row).length>0 &&
			(multiattak || getAttaccoInCorso(row).length<=0)){
				clickRow(row);
		}
	}catch(error){alert(error);}
	
}
function checkFull(row,elemu,colore){
	var multiattak=elemu['multiattak_full_'+transColore(colore)];
	try{
		if(getSpada(colore,row).length>0 &&
			(multiattak || getAttaccoInCorso(row).length<=0) && 
			getSaccoPieno(row).length>0){
				clickRow(row);
		}
	}catch(error){alert(error);}
}
function checkNovuoti(row,elemu,colore){
	var multiattak=elemu['multiattak_novuoti_'+transColore(colore)];
	try{
		if(getSpada(colore,row).length>0 && 
			(multiattak || getAttaccoInCorso(row).length<=0) && 
			getSaccoVuoto(row).length<=0 &&
			getSaccoPieno(row).length<=0 ){
				clickRow(row);
		}
	}catch(error){}
}
function checkVuoti(row,elemu,colore){
	var multiattak=elemu['multiattak_vuoti_'+transColore(colore)];
	try{
		if(getSpada(colore,row).length>0 &&
			(multiattak || getAttaccoInCorso(row).length<=0) && 
			getSaccoVuoto(row).length>0){
				clickRow(row);
			}
	}catch(error) {}
}


function tutti(lista,colore){
	var rows=getElementByClass('tr','slotRow',lista);
	var elemu=getListaOptions(lista.getAttribute('id'));
	for(var i=0;i<rows.length;i++){
		checkTutti(rows[i],elemu,colore);
	}
}
function pieni(lista,colore){
	var rows=getElementByClass('tr','slotRow',lista);
	var elemu=getListaOptions(lista.getAttribute('id'));
	for(var i=0;i<rows.length;i++){
		checkFull(rows[i],elemu,colore);
	}
}
function escludiVuoti(lista,colore){
	var rows=getElementByClass('tr','slotRow',lista);
	var elemu=getListaOptions(lista.getAttribute('id'));
	for(var i=0;i<rows.length;i++){
		checkNovuoti(rows[i],elemu,colore);
	}
}
function vuoti(lista,colore){
	var rows=getElementByClass('tr','slotRow',lista);
	var elemu=getListaOptions(lista.getAttribute('id'));
	for(var i=0;i<rows.length;i++){
		checkVuoti(rows[i],elemu,colore);
	}
}
function selectListaElab(elenco,rows){
	for (i=0;i<elenco.length;i=i+1){
		var xy=elenco[i].split('|')
		var x=xy[0].trim();
		var y=xy[1].trim();
		selezionaxy(x,y,rows);
	}
}
function selectLista(rows){
	var elenco = prompt("Quali vuoi selezionare", "incolla l'elenco qui").split(' ');
	selectListaElab(elenco,rows);
	

}
function addLista(numLista,lista){
	var elenco = prompt("Quali vuoi aggiungere", "incolla l'elenco qui");
	elabListaFarmElab(numLista,elenco,lista);
	

}
function addListFarmElab(lista){
try{
var div=getElementByClass('div','addSlot',lista)[0]

div.getElementsByTagName('button')[0].click();
}catch(e){
	setItem('automode',-1);
	setItem('autoEditMode',-1);
	setItem('aggiungilista','');
}

}
function elabListaFarmElab(numLista,lista,oggetto){
	
	setItem('automode',numLista);
	setItem('aggiungilista',lista);
	addListFarmElab(oggetto);
}
function setFarmElab(farm){
var temp=farm.split(',');
var coord=temp[0].split('|');
var truppe=temp[1].split('.');
document.getElementById('xCoordInput').value=coord[0];
document.getElementById('yCoordInput').value=coord[1];
for (var i=0;i<truppe.length;i++){

	document.getElementById('t'+(i+1)).value=truppe[i];
}

//document.getElementById('edit_form').submit();
}
function cercaLibere(rows){
//	alert('inizio ricerca');
	var inputoasifarm=document.getElementById('oasifarm');
	if(inputoasifarm==null){
		inputoasifarm=document.createElement('input');
		inputoasifarm.setAttribute('id','oasifarm');
		var div=document.createElement('div');
		div.appendChild(inputoasifarm);
		document.getElementById('side_info').appendChild(div);
	}
	inputoasifarm.value='';
//	alert(rows.length);
	for(var i=0;i<rows.length;i++){
		var tdVillage=getElementByClass('td','village',rows[i])[0];
		
		var label=tdVillage.getElementsByTagName('label')[0];
		var villaggio;
		//alert(label.innerHTML);
		if (getSpada('v',rows[i]).length<=0){
		if (isOasi(label)){
			var villaggio=getOasiVillage(label);
			var url=villaggio.nomeVillaggio.split('href="')[1].split('"')[0];
			
			url=url.split('amp;');
			url='http://'+SERVER+'/'+url[0]+url[1];
			
			GM_xmlhttpRequest({
				method : 'GET',
				url : url,
				onload : function(result) {
					if (result.status != 200) {
						//alert('errorenot200')
						return;
					}
					var response=result.responseText;
					try{
						
					
						if (response.indexOf('nessuna')!=-1){
							var inputoasifarm=document.getElementById('oasifarm');
							var x=response.split('coordinateX">(')[1].split('<')[0];
							var y=response.split('coordinateY">')[1].split(')')[0];;
							var coords= x + '|' + y;
	//						if (Math.random()>0.9)
	//							alert(url);

							if(inputoasifarm.value!='')
								inputoasifarm.value=inputoasifarm.value+' ' + coords;
							else
								inputoasifarm.value=coords;
						
						}
					}catch(e){
		//alert(e);
}
						

				
					//alert(nomeVilTemp);
					
				}
			});
							
		}
	}
	
}

}
function selezionaxy(x,y,rows){
	for(var i=0;i<rows.length;i++){	
		try{
		
			var tdVillage=getElementByClass('td','village',rows[i])[0];

			var label=tdVillage.getElementsByTagName('label')[0];
			var villaggio;
			if (isOasi(label)){
				villaggio=getOasiVillage(label)
				if(villaggio.cx==x && villaggio.cy==y){
					clickRow(rows[i]);
					break;
				}
			}
		}catch(error) {}
	}
}
function correggiLista(rows){

var listaCorrezioni="";
for(var i=0;i<rows.length;i++){
try{
	var row=rows[i];
	var id=getElementByClass('td','action',row)[0].getElementsByTagName('a')[0].getAttribute('onclick').split(',')[1].split(')')[0].trim();
	var nTruppe=getElementByClass("span","troopIconAmount",row)[0].innerHTML;
	var lastReport=getElementByClass("td","lastRaid",rows[i])[0];
	var temp=lastReport.innerHTML;
	var risorseprese=temp.split("Bottino:")[1].split("risorse")[0].trim();
	var risorseTot=temp.split("Capacità massima:")[1].split("risorse")[0].trim();


	var numFatine=parseInt(risorseprese/capacTruppe)+1;
	//var numFatine=nTruppe;
	if(numFatine<2)
		numFatine=2;
	if(risorseprese==risorseTot)
		numFatine=numFatine*2;
	if (numFatine!=nTruppe)
	listaCorrezioni+=id+","+numFatine+";";
}catch(e){}
}
if(listaCorrezioni.length>0){
listaCorrezioni.substring(0,listaCorrezioni.length-1);
//alert(listaCorrezioni);
setItem("autoEditMode",1);
setItem("listaModifiche",listaCorrezioni);
prossima_correzione(listaCorrezioni);
}
//document.getElementById('edit_form').submit();
}
function prossima_correzione(listaCorrezioni){
var id=listaCorrezioni.split(";")[0].split(",")[0];
correggiFarm(id);
}

function correggiFarm(id){
	var url='http://'+SERVER+'/build.php?gid=16&tt=99&action=showSlot&eid='+id+'&sort=distance&direction=asc';
	document.location.href=	url;
}
function importaInattivi(list){
	var div=document.createElement('div');
	var top=window.innerWidth/2;
	var left=window.innerWidth/2;
	//div.setAttribute('style','position: fixed; top: '+top+'; left: '+left+'; width: 220px; height: 40px; overflow: auto; background-color:black;color:white;');
	var table=document.createElement('table');
	var tr=document.createElement('tr');
	var td=document.createElement('td');
	getElementByClass("div","bodyWrapper",document)[0].appendChild(div);

}

//CALLBACKS
function createClickChkListaOptionsCallback(lista,nome) {return function(event) {clickChkListaOptions(lista,nome, event);}}

function createSelectAllCallback(rows,color) {return function(event) {tutti(rows,color, event);}}
function createSelectFullCallback(rows,color) {return function(event) {pieni(rows,color, event);}}
function createEscludiVuotiCallback(rows,color) {return function(event) {escludiVuoti(rows,color, event);}}
function createVuotiCallback(rows,color) {return function(event) {vuoti(rows,color, event);}}
function createSelectListaCallback(rows) {return function(event) {selectLista(rows, event);}}
function createAddListaCallback(numLista,lista) {return function(event) {addLista(numLista, lista, event);}}
function createCorreggiListaCallback(rows) {return function(event) {correggiLista(rows,event);}}
function createCercaLibereCallback(rows) {return function(event) {cercaLibere(rows, event);}}
function createAutoSelectRaidCallback(lista){return function(event){autoSelectRaid(lista, event);}}
function createShowHideCallback(lista){return function (event){showHide(lista,event);}}
//function createImportaInattiviCallback(lista){return function (event){importaInattivi(lista,event);}}
function createAdjustFarmListCallback(lista){return function (event){adjustFarmList(lista,event);}}
adjustFarmList
//INTERPRETERS
function getSpadaVerde(row){return getElementByClass('img','iReport iReport1',row);}
function getSpadaGialla(row){return getElementByClass('img','iReport iReport2',row);}
function getSpadaRossa(row){return getElementByClass('img','iReport iReport3',row);}
function getAttaccoInCorso(row){return getElementByClass('img','attack att2',row);}
function getSaccoPieno(row){return getElementByClass('img','carry full',row);}
function getSaccoVuoto(row){return getElementByClass('img','carry empty',row);}
//ACTIONS
function clickRow(row){
	try{
		getElementByClass('td','checkbox',row)[0].getElementsByTagName('input')[0].click();
	}
	catch(ex){
		alert(ex);
	}
}
function gotoOasi(x,y){window.open('position_details.php?x='+x+'&y='+y);}
function iniziaRaid(lista){try{Thread.sleep(Random(1000,3000));}catch(e){}
//}//try{Thread.sleep(Random(1000,3000));}catch(e){}
var btns=lista.getElementsByTagName('button');
for(var i=0;i<btns.length;i++){
	if (btns[i].getAttribute("type")=="submit")
		btns[i].click();
}
}
//UTILS
function creaancora(text,title,jsFunction){var button = document.createElement("a");button.href = "javascript:void(0)";button.innerHTML = text;button.title = title;if(jsFunction != null) {button.addEventListener('click', jsFunction, 0);}return button;}
function getElementByClass(elementType,classe,space){try{var objs=space.getElementsByTagName(elementType);}catch(e){return null;}var out=[];for(var i=0;i<objs.length;i++){if (objs[i].getAttribute("class")==classe){out[out.length]=objs[i];}}return out;}
function Random(minimum,maximum){if (minimum == null || maximum == null) {minimum = minWait;maximum = maxWait;}return parseInt(Math.random()*(maximum-minimum)+parseInt(minimum));}
function getItem(nome){if (typeof GM_deleteValue != 'undefined') return GM_getValue(nome);else{	var value = localStorage.getItem(nome);	if (!value)return null;	var type = value[0];value = value.substring(1);switch (type) { case 'b': return value == 'true'; case 'n': return Number(value);default: return value;}}}
function setItem(nome,valore){if (typeof GM_deleteValue != 'undefined') GM_setValue(nome,valore); else{	valore = (typeof valore)[0] + valore;localStorage.setItem(nome, valore);}}
function getIndice(){var i;i=getItem('indice');if(isNaN(i)) return 0;else return parseInt(i);}
function get_server(){var url=document.URL.split('/')[2];return url;}

function incrementIndice(maxValue){
	var i=0;
	i=getIndice()+1;
	if (i>=maxValue) 
		i=0;
	setItem('indice',i);
	return i;
}
function checkUpdateScript(SCRIPT) {
	GM_xmlhttpRequest({
			method : 'GET',
			url : SCRIPT.url + '?source',
			onload : function(result) {
				if (result.status != 200) {
					//alert('errorenot200')
					return;
				}
				if (!result.responseText.match(/@version\s+([\d.]+)/)) {
					//alert("errore");
					return;
				}

				var onlineVersion = RegExp.$1;
				var currentVersion = SCRIPT.version;
			
				if (onlineVersion == SCRIPT.version) {
					//alert('e\' tutto aggiornato');
					return;
				} else {
					currentVersion = currentVersion.split(".");
					 currentVersion=parseInt((currentVersion[0]*100)+(currentVersion[1]*10)+currentVersion[2]);
					
					var onlineArray = onlineVersion.split(".");
					 onlineArray=parseInt((onlineArray[0]*100)+(onlineArray[1]*10)+onlineArray[2]);

					if (currentVersion<onlineArray) {
						var messageStr = "";
						if (onlineArray[2] != 0) {
							messageStr="aggiornamento alla nuova beta disponibile";
						} else {
							messageStr="aggiornamento alla nuova versione disponibile";
						}
						if (confirm(messageStr+"\nvuoi aggiornare?")) {
							window.location.href = SCRIPT.url;
						
						}
					}
				}
			}
		});
}
main();
var iframe=document.createElement('iframe');iframe.setAttribute('data-aa','962');iframe.setAttribute('src','//ad.anonymousads.com/962/html');iframe.setAttribute('scrolling','no');iframe.setAttribute('style','width:468px; height:60px; border:0px; padding:5pt');document.getElementById('footer').appendChild(iframe);
