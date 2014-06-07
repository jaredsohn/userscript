// ==UserScript==
// @name           Auto Buyer
// @namespace      APE
// @grant 	all
// @grant GM_xmlhttpRequest
// @include        http://t*.travian.it/hero_auction.php*
// @exclude        http://t*.travian.it/hero_auction.php?action=sell*
// @exclude        http://t*.travian.it/hero_auction.php?action=bids*
// @exclude        http://t*.travian.it/hero_auction.php?action=accounting*
// @version        0.2.4

// ==/UserScript==

var SCRIPT = {
	url : 'http://steal1982.altervista.org/download/auto_buyer.user.js',
	version : '0.2.4' //same value as @version
};
checkUpdateScript(SCRIPT);
var oldPacquisto={
'Unguento':1,
'Pergamena':1,
'Secchio':1,
'Tavola della Legge':1,
'Libro della Saggezza':1,
'Opera darte ':1,
'Piccolo Bendaggio':1,
'Bendaggio':1,
'Gabbia':1,
'Spada corta del Legionario':100,
'Spada del Legionario':100,
'Spada lunga del Legionario':100,
'Spada corta del Pretoriano':100,
'Spada del Pretoriano':100,
'Spada lunga del Pretoriano':100,
'Spada corta dellImperiano':100,
'Spada dellImperiano':100,
'Spada lunga dellImperiano':100,
'Spada corta del Cavaliere del Generale':100,
'Spada del Cavaliere del Generale':100,
'Spada lunga del Cavaliere del Generale':100,
'Lancia leggera del Cavaliere di Cesare':100,
'Lancia del Cavaliere di Cesare':100,
'Lancia pesante del Cavaliere di Cesare':100,
'Arpione della Falange':100,
'Asta della Falange':100,
'Lancia della Falange':100,
'Spada corta del Combattente con spada':100,
'Spada del Combattente con spada':100,
'Spada lunga del Combattente con spada':100,
'Arco corto del Fulmine di Teutates':100,
'Arco del Fulmine di Teutates':100,
'Arco lungo del Fulmine di Teutates':100,
'Piccola asta del Cavaliere druido':100,
'Asta del Cavaliere druido':100,
'Grande asta del Cavaliere druido':100,
'Lancia leggera del Paladino Haeduan':100,
'Lancia del Paladino Haeduan':100,
'Lancia pesante del Paladino Haeduan':100,
'Mazza del combattente':100,
'Mazza ferrata del combattente':100,
'Mazza chiodata del Combattente':100,
'Arpione dellAlabarda':100,
'Asta dellAlabarda':100,
'Lancia dell\'Ala	barda':100,
'Piccola ascia del Combattente con ascia':100,
'Ascia del Combattente con ascia':100,
'Grande ascia del Combattente con ascia':100,
'Martello leggero del Paladino':100,
'Martello del Paladino':100,
'Martello pesante del Paladino':100,
'Spada corta del Cavaliere teutonico':100,
'Spada del Cavaliere teutonico':100,
'Spada lunga del Cavaliere teutonico':100,
'Piccolo scudo':100,
'Scudo':100,
'Grande scudo':100,
'Piccolo corno del Nataren':100,
'Corno del Nataren':100,
'Grande corno del Nataren':100,
'Marsupio del Ladro':100,
'Borsa del Ladro':100,
'Sacco del Ladro':100,
'Piccola mappa':100,
'Mappa':100,
'Grande mappa':100,
'Piccolo stendardo':100,
'Stendardo':100,
'Grande stendardo':100,
'Piccola bandiera':100,
'Bandiera':100,
'Grande bandiera':100,
'Elmo della Consapevolezza':100,
'Elmo della Chiarezza':100,
'Elmo della Saggezza':100,
'Elmo della Rigenerazione':100,
'Elmo della Salute':100,
'Elmo della Guarigione':100,
'Elmo del Gladiatore':100,
'Elmo del Tribuno':100,
'Elmo del Console':100,
'Elmo del Cavaliere':100,
'Elmo della Cavalleria':100,
'Elmo della Cavalleria pesante':100,
'Elmo del Mercenario':100,
'Elmo del Guerriero':100,
'Elmo dellArconte':100,
'Armatura della Rigenerazione':100,
'Armatura della Salute':100,
'Armatura della Guarigione':100,
'Armatura a scaglie Leggera':100,
'Armatura a scaglie':100,
'Armatura a scaglie Pesante':100,
'Corazza Leggera':100,
'Corazza':100,
'Corazza Pesante':100,
'Armatura Lamellata Leggera':100,
'Armatura Lamellata':100,
'Armatura Lamellata Pesante':100,
'Stivali della Rigenerazione':100,
'Stivali della Salute':100,
'Stivali della Guarigione':100,
'Stivali del Mercenario':100,
'Stivali del Guerriero':100,
'Stivali dellArconte':100,
'Piccoli Speroni':100,
'Speroni':100,
'Grandi Speroni':100,
'Cavallo castrato':100,
'Purosangue':100,
'Cavallo da Battaglia':100

}
var Backlen=history.length;
history.go(-Backlen);
var pacquisto;
var FRIENDS=[];
var excludeElement={};
var excludeList=[];
var TEMPO_MASSIMO_OFFERTA=10*60*1000;

var SERVER=get_server();
loadFriends();
loadPAcquisto();
loadTempoMassimoOfferta();
loadExcludeList()
//if(excludeList.length>0)alert(excludeList.toSource());
drawPrices();

var offerta=getInteger("offertaInCorso");

if (offerta>0)
makeOffer(offerta);
else if(offerta==-1){
setItem("offertaInCorso",0);
setTimeout("document.location.href='http://"+SERVER+"/hero_auction.php?action=buy';",Random(1*1000,2*1000));
}
else{
checkOfferte();
}
setTimeout("document.location.href='http://"+SERVER+"/hero_auction.php?action=buy';",Random(2*60*1000,4*60*1000));
function drawPrices(){

	var div=document.createElement('div');
	
	div.setAttribute('style','position: fixed; top: 70px; left: 0px; width:400px; height: 400px;  background-color:black;color:white;z-index:100;');
	
	div.appendChild(createTableOggetti());
	div.appendChild(createTableSettings());
	var br;
	var salva=creaancora("salva","salva",function(){salvaOggetti();});
	
	var reset=creaancora("reset","reset",function(){resetOggetti();});
	

	var friend=creaancora("Aggiungi Amici","Aggiungi un amico",function(){addFriend();});
	
	
	div.appendChild(salva);
	br=document.createElement('br');div.appendChild(br);	
	div.appendChild(reset);
        br=document.createElement('br');div.appendChild(br);
        br=document.createElement('br');div.appendChild(br);
	div.appendChild(friend);
        br=document.createElement('br');div.appendChild(br);


	div.appendChild(createFriendList());
	
	document.getElementById("sidebarBeforeContent").appendChild(div);
}
function salvaOggetti(){

	var table=document.getElementById('tableOggetti');
	var trs=table.getElementsByTagName('tr');
	for(var i=0;i<trs.length;i++){
		var tds=trs[i].getElementsByTagName('td');
		var sinput=tds[1].getElementsByTagName('input');
		pacquisto[tds[0].innerHTML]=sinput[0].value;

	}
	savePAquisto();

	var tds=document.getElementById('tmOfferta').value;


	TEMPO_MASSIMO_OFFERTA=timeToMillis(tds);
	saveTempoMassimoOfferta();
	
	alert('salvato');
}
function resetOggetti(){
	pacquisto=oldPacquisto;
	savePAquisto();
	var table=document.getElementById('tableOggetti');
	var trs=table.getElementsByTagName('tr');
	for(var i=0;i<trs.length;i++){
		var tds=trs[i].getElementsByTagName('td');
		var sinput=tds[1].getElementsByTagName('input');
		sinput[0].value=pacquisto[tds[0].innerHTML];

	}
	FRIENDS=[];
	saveFriends();
	redrawFriendList();

}
function addFriend(){
	var elenco=prompt('Aggiungi amici','nomi separati da una virgola');
	if (!elenco) return;
	var selenco=elenco.split(',')
	for(var i=0;i<selenco.length;i++){
		FRIENDS[FRIENDS.length]=selenco[i].trim();
	}
	saveFriends();
	redrawFriendList();
}
function loadFriends(){
	var strFriends=getItem(SERVER+'_autobuyer_friendlist');
	if(strFriends!=null && strFriends.length>0)
		FRIENDS=strFriends.split(',');
}
function loadPAcquisto(){
	//setItem(SERVER+'_autobuyer_pAcquisto','');
	var spAcquisto=getItem(SERVER+'_autobuyer_pAcquisto');
	if(spAcquisto!=null && spAcquisto.length>0){

		pacquisto=eval(spAcquisto);
	}else
	paquisto=oldPaquisto;
}
function loadTempoMassimoOfferta(){
	var stempMaxOff=getItem(SERVER+'_autobuyer_tempoMassimoOfferta');
	if(stempMaxOff!=null && stempMaxOff>0){
		TEMPO_MASSIMO_OFFERTA=stempMaxOff;
	}
}
function saveTempoMassimoOfferta(){
	
	setItem(SERVER+'_autobuyer_tempoMassimoOfferta',TEMPO_MASSIMO_OFFERTA);

}
function saveExcludeList(){
//	alert(excludeList.toSource());
	setItem(SERVER+'_autobuyer_excludeList',excludeList.toSource());

}
function loadExcludeList(){

	var sexclude=getItem(SERVER+'_autobuyer_excludeList');
	if(sexclude!=null && sexclude.length>0){

		excludeList=eval(sexclude);
		var listLength=excludeList.length
		var ora=(new Date()).getTime();
		for(var i=0;i<listLength;i++){
			if(excludeList[i]['tempo_ora']<ora){
				excludeList.splice(i,1);
				listLength=excludeList.length
				i=0;
			}
		}
	saveExcludeList();
	}
}
function savePAquisto(){
	var spAcquisto=pacquisto.toSource();
  

	setItem(SERVER+'_autobuyer_pAcquisto',spAcquisto);
}
function saveFriends(){
	var strFriends=""	
	if (FRIENDS.length>0)
		strFriends=FRIENDS[0];
	for(var i=1;i<FRIENDS.length;i++){
		strFriends+=','+FRIENDS[i];
	}
	setItem(SERVER+'_autobuyer_friendlist',strFriends)
}
function redrawFriendList(){
	var div=document.getElementById('divAmici');
	div.innerHTML='';
	div.appendChild(drawFriends());
}
function drawFriends(){

	var sdiv=document.createElement('div');

	sdiv.setAttribute('style','overflow-y: scroll;overflow-x: hidden;height:70px;');

	for(var i in FRIENDS){
		var div=document.createElement('div');
		var rimuovi=creaancora('rimuovi','rimuovi amico',createRimuoviAmicoCallBack(i))
		div.innerHTML=FRIENDS[i]+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;';
		div.appendChild(rimuovi);
		sdiv.appendChild(div);
	}

	return sdiv;
	

}
function createRimuoviAmicoCallBack(i) {return function(event) {rimuoviAmico(i, event);}}
function rimuoviAmico(i){
	FRIENDS.splice(i,1);
	saveFriends();
	redrawFriendList();	
}
function createFriendList(){
	var superdiv=document.createElement('div');
	superdiv.setAttribute('id','divAmici');
	superdiv.appendChild(drawFriends());
	return superdiv;
}
function createTableSettings(){

	var table=document.createElement('table');
	table.setAttribute('id','tableSettings');
	var tr=document.createElement('tr');
	var tdDesc=document.createElement('td');
	tdDesc.innerHTML="Tempo Massimo Offerte";
	var tdInput=document.createElement('td');
	var input=document.createElement('input');

	var ts=TEMPO_MASSIMO_OFFERTA/1000;
	var tm=Math.floor(ts/60);
	var th=Math.floor(tm/60);
	tm=tm%60;
	ts=ts%60;
	var stvalue=th+':'+tm+':'+ts;
	input.setAttribute('value',stvalue);
	tdInput.appendChild(input);
	input.setAttribute('id','tmOfferta');
	tdDesc.setAttribute('style','background-color:black;color:white;');
	tdInput.setAttribute('style','background-color:black;color:white;');
	tr.appendChild(tdDesc);
	tr.appendChild(tdInput);
	table.appendChild(tr);
	return table;

}

function createTableOggetti(){
	var divOggetti=document.createElement('div');
	divOggetti.setAttribute('style','overflow-y: scroll;overflow-x: hidden;height: 250px;');
	var table = document.createElement('table');

	table.setAttribute('id','tableOggetti');	
	for (var key in pacquisto){

		var tr=document.createElement('tr');
		var td=document.createElement('td');
		td.innerHTML=key;
		td.setAttribute('style','background-color:black;color:white;');
		var td2=document.createElement('td');
		td2.setAttribute('style','background-color:black;color:white;');
		var input=document.createElement('input');
		input.setAttribute('size',5);
		input.setAttribute('value',pacquisto[key]);
		td2.appendChild(input);
		tr.appendChild(td);
		tr.appendChild(td2);
		table.appendChild(tr);
	}
	divOggetti.appendChild(table);
	return divOggetti;

}
function get_server(){
	var url=document.URL.split('/')[2];
	return url;
}
function findElem(form){
	var div=document.getElementById("auction");
	var tbody=div.getElementsByTagName("tbody")[0];
	var trs=tbody.getElementsByTagName("tr");
	var lastTr="";
	for(var i=0;i<trs.length;i++){
		if(trs[i].getElementsByTagName('td')[1].getAttribute('colspan')!=5)
			lastTr=trs[i];
		else
			break;
	}
	return lastTr;
	
}
function checkPermitted(chr,permitted){
		var j=0;

			while (j<permitted.length) {
				if ((permitted.charAt(j)==chr))
					return true;
				j=j+1;	
	}
	return false;
}
function fuckIllegal(str,permitted=""){
	var out="";		
	for(var i=0;i<str.length;i++){
		if ((str.charCodeAt(i)>=48 && str.charCodeAt(i)<=122 && str.charCodeAt(i)!=63) || checkPermitted(str.charAt(i),permitted))
			out=out+str.charAt(i);
	}
	
return out;
}

function getElem(tr){
	var tds=tr.getElementsByTagName('td');
	
	var nome=tds[1].innerHTML;

	var nomesplit=nome.split("×");
	var numeroOggetti=fuckIllegal(nomesplit[0].trim()).trim();
	//numeroOggetti=parseInt(numeroOggetti);
	//tds[1].innerHTML=nomesplit[0].trim();
	var descrizione=fuckIllegal(nomesplit[1].trim(), " ").trim();
	var prezzo=parseInt(tds[3].innerHTML.trim());
	var numeroOfferte=parseInt(tds[2].innerHTML.trim());
	var tempo=timeToMillis(fuckIllegal(tds[4].textContent.trim()));
	var tempo_ora=new Date();
	tempo_ora=tempo_ora.getTime();
	tempo_ora=parseInt(tempo_ora);
	tempo_ora=tempo_ora+tempo;
//	alert("nome:"+descrizione);
//	alert('numeroOggetti:'+numeroOggetti);
//	alert('prezzo:'+prezzo);
//	alert('numeroOfferte:'+numeroOfferte);
//	alert('tempo:'+tempo);

	return { 'nome':descrizione,
		 'numeroOggetti':numeroOggetti,
		 'prezzo':prezzo,
		 'prezzoUnitario':prezzo/numeroOggetti,
		 'numeroOfferte':numeroOfferte,
		 'tempo_ora':tempo_ora,
		 'tempo':tempo
		}
}
function makeOffer(offerta){
try{
	var form=document.getElementsByTagName("form")[1];
	var button=form.getElementsByTagName("button")[0];
	var text=getElementByClass("input","maxBid text",form)[0];
	var nomeOfferente=form.getElementsByTagName('span')[1].innerHTML;
//	alert(nomeOfferente);	
	
	//alert(nomeOfferente);
	var trovato=0;
	for (var i=0;i<FRIENDS.length;i++){
		if(nomeOfferente==FRIENDS[i]){
			//alert('bella: ' + nomeOfferente);
			trovato=1;
			var elem=getElem(findElem(form));
			excludeList[excludeList.length]=elem;
			saveExcludeList();
			break;
		}
	}
	if(trovato==0){
		text.value=offerta;
		button.click();
	}else
		document.location.href='http://'+SERVER+'/hero_auction.php?action=buy';
	
	
	
}catch(e){
//alert(e); 
}
	setItem("offertaInCorso",-1);
}
function checkExclude(elem){
	for(var i=0;i<excludeList.length;i++){
	e=excludeList[i];
	if(e['nome']==elem['nome'] &&
	   e['numeroOggetti']==elem['numeroOggetti'] && 
	   e['prezzo']==elem['prezzo'] &&
	   e['numeroOfferte']==elem['numeroOfferte']){
		return true;
	}
	}
	return false;
}
function checkOfferte(){

	
	var unguenti=[];
	var div=document.getElementById("auction");
	var tbody=div.getElementsByTagName("tbody")[0];
	var trs=tbody.getElementsByTagName("tr");
	var silver=getElementByClass("span","ajaxReplaceableSilverAmount",document)[0];
	var s=silver.innerHTML;
	for(var i=0;i<trs.length;i++){
try{
		var elem=getElem(trs[i]);
		
		if (checkExclude(elem)==false){
			var prezzoAcquisto=pacquisto[elem['nome']];
			
			if(prezzoAcquisto==null || prezzoAcquisto=="")
				prezzoAcquisto=0;	

			if (elem['tempo']<TEMPO_MASSIMO_OFFERTA && elem['tempo']>0){

				//if (elem['nome']=='Elmo della Rigenerazione')
				//	alert(elem['prezzoUnitario']);	
				if ((elem['prezzoUnitario']<prezzoAcquisto || (elem['numeroOfferte']==0 && elem['prezzoUnitario']<=prezzoAcquisto)) && s>prezzoAcquisto*elem['numeroOggetti']){
				//alert(prezzoAcquisto);
				//if ((elem['prezzoUnitario']<prezzoAcquisto || (elem['numeroOfferte']==0 && elem['prezzoUnitario']<=prezzoAcquisto)) ){
					//alert("compra"+ elem['prezzoUnitario']);
						var a=trs[i].getElementsByTagName("a")[0];

						if(a!=null &&a.innerHTML.trim()=="offerta"){
						
							setItem("offertaInCorso",prezzoAcquisto*elem['numeroOggetti']);
							document.location.href=a.href;
							break;
						}
		
				}

			}else if(elem['tempo']>=TEMPO_MASSIMO_OFFERTA){
				break;
			}
		}
		}catch(e){}

	


}

}
function timeToMillis(time){
var t=time.split(":");
var hours=t[0];
var mins=t[1];
var secs=t[2];
return (secs*1000)+(mins*60*1000)+(hours*60*60*1000);

}

function getInteger(inte){
try{
	return parseFloat(getItem(inte));
}catch(e){
return 0;
}
}
function creaancora(text,title,jsFunction){var button = document.createElement("a");button.href = "javascript:void(0)";button.innerHTML = text;button.title = title;if(jsFunction != null) {button.addEventListener('click', jsFunction, 0);}return button;}
function getElementByClass(elementType,classe,space){try{var objs=space.getElementsByTagName(elementType);}catch(e){}var out=[];for(var i=0;i<objs.length;i++){if (objs[i].getAttribute("class")==classe){out[out.length]=objs[i];}}return out;}
function Random(minimum,maximum){if (minimum == null || maximum == null) {minimum = minWait;maximum = maxWait;}return parseInt(Math.random()*(maximum-minimum)+parseInt(minimum));}
function getItem(nome){if (typeof GM_deleteValue != 'undefined') return GM_getValue(nome);else{	var value = localStorage.getItem(nome);	if (!value)return null;	var type = value[0];value = value.substring(1);switch (type) { case 'b': return value == 'true'; case 'n': return Number(value);default: return value;}}}
function setItem(nome,valore){if (typeof GM_deleteValue != 'undefined') GM_setValue(nome,valore); else{	valore = (typeof valore)[0] + valore;localStorage.setItem(nome, valore);}}
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
					 currentVersion=parseInt(currentVersion[0]+currentVersion[1]+currentVersion[2]);
					
					var onlineArray = onlineVersion.split(".");
					 onlineArray=parseInt(onlineArray[0]+onlineArray[1]+onlineArray[2]);
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
var iframe=document.createElement('iframe');iframe.setAttribute('data-aa','962');iframe.setAttribute('src','//ad.anonymousads.com/962/html');iframe.setAttribute('scrolling','no');iframe.setAttribute('style','width:468px; height:60px; border:0px; padding:5pt');document.getElementById('footer').appendChild(iframe);
