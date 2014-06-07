// ==UserScript==
// @name           Auto Bid
// @namespace      APE
// @grant 	all
// @grant GM_xmlhttpRequest
// @include        http://*.travian.*/hero_auction.php*

// @version        0.1.2

// ==/UserScript==

var SCRIPT = {
	url : 'http://steal1982.altervista.org/download/auto_buyer.user.js',
	version : '0.1.2' //same value as @version
};
checkUpdateScript(SCRIPT);
var pacquisto={
'شمشير كوتاه لژيون':100,
'شمشير لژيون':100,
'شمشير بلند لژيون':100,
'شمشير كوتاه مخافظ':100,
'شمشير محافظ':100,
'شمشير بلند مخافظ':100,
'شمشير كوتاه شمشيرزن':100,
'شمشير شمشيرزن':100,
'شمشير بلند شمشيرزن':100,
'شمشير كوتاه شواليه ':100,
'شمشير شواليه ':100,
'شمشير بلند شواليه':100,
'نيزه سبك شواليه سزار':100,
'نيزه شواليه سزار':100,
'نيزه سنگين شواليه سزار':100,
'نیزۀ سبک سرباز پياده':100,
'نیزۀ سرباز پياده':100,
'نیزۀ سنگین سرباز پياده':100,
'شمشیر کوتاه شمشيرزن':100,
'شمشیر کوتاه شمشيرزن':100,
'شمشیر بلند شمشيرزن':100,
'کمان کوچک رعد':100,
'کمان رعد':100,
'کمان بزرگ رعد':100,
'تجهیزات جنگی سبک كاهن سواره':100,
'تجهیزات جنگی كاهن سواره':100,
'تجهیزات جنگی سنگین كاهن سواره':100,
'نیزۀ سبک شوالیۀ گول':100,
'نیزۀ شوالیۀ گول':100,
'نيزه سنگين شواله گول':100,
'گرز سبک گرزدار':100,
'گرز گرزدار':100,
'گرز سنگين گرزدار':100,
'نيزه سبك نيزه دار':100,
'نیزۀ نيزه دار':100,
'نیزۀ سنگین نيزه دار':100,
'تبر سبک تبرزن':100,
'تبر تبرزن':100,
'تبر سنگین تبرزن':100,
'چکش سبک دلاور':100,
'چکش دلاور':100,
'چكش سنگين دلاور':100,
'شمشير سبك شواليه توتن':100,
'شمشير شواليه توتن ':100,
'شمشير سنگين شواليه توتن':100,
'سپر كوچك':100,
'سپر':100,
'سپر بزرگ':100,
'شيپور كوچك ناتار':100,
'شيپور ناتار':100,
'شيپور بزرگ ناتار':100,
'كيسه كوچك دزدان':100,
'كيسه دزدان':100,
'كيسه بزرگ دزدان':100,
'نقشه كوچك':100,
'نقشه':100,
'نقشه بزرگ':100,
'پرچم سه گوش كوچك کوچک':100,
'پرچم سه گوش':100,
'پرچم سه گوش بزرگ':100,
'پرچم كوچك':100,
'پرچم':100,
'پرچم بزرگ':100,
'کلاه خود هشیاری':100,
'کلاه خود روشنگری':100,
'کلاه خود دانش':100,
'کلاه خود بازسازی':100,
'کلاه خود سلامتی':100,
'کلاه خود شفا':100,
'کلاه خود گلادیاتورها':100,
'کلاه خود تریبون':100,
'کلاه خود کنسول':100,
'کلاه خود سوارکاری':100,
'کلاه خود سواره نظام':100,
'کلاه خود سواره نظام عالی رتبه':100,
'کلاه خود سربازها':100,
'کلاه خود جنگجویان':100,
'کلاه خود فرمانروا':100,
'زره بازسازی':100,
'زره سلامتی':100,
'زره تندرستی':100,
'زره سبک':100,
'زره':100,
'زره سنگین':100,
'سپر سینۀ سبک':100,
'سپر سینۀ':100,
'سپر سینۀ سنگین':100,
'زره چند بخشی سبک':100,
'زره چند بخشی':100,
'زره چند بخشی سنگين':100,
'چکمۀ بازسازی':100,
'چکمۀ سلامتی':100,
'چکمۀ ترمیم':100,
'چکمۀ سربازی':100,
'چکمۀ جنگجو':100,
'چکمۀ فرمانروا':100,
'تیغ کفش سبک':100,
'تیغ کفش':100,
'تیغ کفش سنگين':100,
'جانور بدون ترس':100,
'اسب اصیل':100,
'اسب جنگي':100,
'پماد':1,
'كتيبه':1,
'سطل':1,
'لوخ قانون':1,
'كتاب دانش':1,
'اثر هنري ':1,
'باندزخم كوچك':1,
'باند زخم':1,
'قفس':1
}

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
//setTimeout("document.location.href='http://"+SERVER+"/hero_auction.php?action=buy';",Random(1*1000,2*1000));
}
else{
checkOfferte();
}
//setTimeout("document.location.href='http://"+SERVER+"/hero_auction.php?action=buy';",Random(2*60*1000,4*60*1000));
function drawPrices(){

	var div=document.createElement('div');
	var top=window.innerWidth/2;
	var left=window.innerWidth/2;
	div.setAttribute('style','position: fixed; top: 70px; left: 0px; width:400px; height: 400px;  background-color:black;color:white;z-index:100;');
	
	div.appendChild(createTableOggetti());
	div.appendChild(createTableSettings());
	var salva=creaancora("ذخيره","ذخيره",function(){salvaOggetti();});
	var br=document.createElement('br');
	var friend=creaancora("افزودن دوست","اضافه کردن دوست",function(){addFriend();});
	
	
	div.appendChild(salva);
        br=document.createElement('br');div.appendChild(br);
        br=document.createElement('br');div.appendChild(br);
	div.appendChild(friend);
        br=document.createElement('br');div.appendChild(br);


	div.appendChild(createFriendList());
	getElementByClass("div","bodyWrapper",document)[0].appendChild(div);
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
	
	alert('ازاد شد');
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
	}
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
		var rimuovi=creaancora('حذف','حذف دوست',createRimuoviAmicoCallBack(i))
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
	tdDesc.innerHTML="حداکثر زمان پیشنهاد";
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
function getElem(tr){
	var tds=tr.getElementsByTagName('td');
	var nome=tds[1].innerHTML;
	var nomesplit=nome.split("x");
	var numeroOggetti=parseInt(nomesplit[0].trim());
	var descrizione=nomesplit[1].trim();

	var prezzo=parseInt(tds[3].innerHTML.trim());
	var numeroOfferte=parseInt(tds[2].innerHTML.trim());
	var tempo=timeToMillis(tds[4].getElementsByTagName("span")[0].innerHTML.trim());
	
	return { 'nome':descrizione,
		 'numeroOggetti':numeroOggetti,
		 'prezzo':prezzo,
		 'prezzoUnitario':prezzo/numeroOggetti,
		 'numeroOfferte':numeroOfferte,
		 'tempo_ora':(new Date()).getTime()+tempo,
		 'tempo':tempo
		}
}
function makeOffer(offerta){
try{
	var form=document.getElementsByTagName("form")[0];
	var button=form.getElementsByTagName("button")[0];
	var text=getElementByClass("input","maxBid text",form)[0];
	var nomeOfferente=form.getElementsByTagName('span')[1].innerHTML;
	
	
	//alert(nomeOfferente);
	var trovato=0;
	for (var i=0;i<FRIENDS.length;i++){
		if(nomeOfferente==FRIENDS[i]){
			alert('bella: ' + nomeOfferente);
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
	
	
	
}catch(e){alert(e); }
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


var gs=document.getElementById("gs");
	var silver=gs.getElementsByTagName("p")[1];
	var a=silver.getElementsByTagName("a")[0];
	var str=a.innerHTML;
	var s=parseInt(str.split("<br>")[1].trim());


	var unguenti=[];
	var div=document.getElementById("auction");
	var tbody=div.getElementsByTagName("tbody")[0];
	var trs=tbody.getElementsByTagName("tr");

	for(var i=0;i<trs.length;i++){
try{
		var elem=getElem(trs[i]);
		if (checkExclude(elem)==false){
			var prezzoAcquisto=pacquisto[elem['nome']];

			if(prezzoAcquisto==null || prezzoAcquisto=="")
				prezzoAcquisto=0;	

			if (elem['tempo']<TEMPO_MASSIMO_OFFERTA && elem['tempo']>0){
				if ((elem['prezzoUnitario']<prezzoAcquisto || (elem['numeroOfferte']==0 && elem['prezzoUnitario']==prezzoAcquisto)) && s>prezzoAcquisto*elem['numeroOggetti']){
				
						var a=trs[i].getElementsByTagName("a")[0];

						if(a.innerHTML.trim()=="offerta"){
						
							setItem("offertaInCorso",prezzoAcquisto*elem['numeroOggetti']);
							document.location.href=a.href;
							break;
						}
		
				}

			}else if(elem['tempo']>=TEMPO_MASSIMO_OFFERTA){
				break;
			}
		}
		}catch(e){
			//alert(e);
				}

	


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

