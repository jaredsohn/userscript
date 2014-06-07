// ==UserScript==
// @name           Rinascente lista 
// @namespace      Rinascente lista
// @description    Avvia nuovo nome
// @include        http://www.rinascentelistanozze.it/listenozze/ita/area_riservata/sposi/totali_lista.aspx
// @include        http://www.rinascentelistanozze.it/listenozze/ita/area_riservata/sposi/articoli_regalare.aspx
// @include        http://www.rinascentelistanozze.it/listenozze/ita/area_riservata/sposi/articoli_regalati.aspx
// ==/UserScript==

//table[@id='ctl00_bodycontent_dlDonatori']/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[@class="tr_view"]/td[2]

var global_mess = 1;

function xpathEvaluate(xpathExpr) {
	return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
  //	return document.evaluate(xpathExpr, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
}

function xpathEvaluateInContext(context, xpathExpr) {
	return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}

function debug(txt) { if (global_mess==1) GM_log(txt); }

//GM_deleteValue("ListaNomi");
 
/* 
GM_log("Inizio unsafeWindow:\n"); 
for (var p in unsafeWindow) {
	try {
		  GM_log(p + ": " + unsafeWindow[p] + "\n"); 
		}
		catch (e) { } 
}
GM_log("Fine unsafeWindow:\n"); 
*/

var aa = xpathEvaluate('//*[@id="ctl00_bodycontent_UCIntestazione1_lbListaCodice"]');
if (aa.snapshotLength > 0 ) {
 var codice_lista = aa.snapshotItem(0).innerHTML;
}


if (location.href.indexOf('totali_lista') > 0){
 var appo_prima = '';
 var nuovi_nomi = '';
 if(GM_getValue('ListaNomi'+codice_lista)) {
 appo_prima = GM_getValue('ListaNomi'+codice_lista);
 appo_prima_arr= appo_prima.split(';');
 } 
 else appo_prima_arr =  Array();
 
 debug('appo_prima '+codice_lista+': '+appo_prima);
 var aa = xpathEvaluate('//table[@id="ctl00_bodycontent_dlDonatori"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[@class="tr_view"]/td[2]');
 var appo_dopo ='';

 //*[@id="ctl00_bodycontent_rptReparti_ctl02_rptRegali_ctl26_lbPrezzoTotale"]
 //html/body/form/div[2]/div[2]/table[4]/tbody/tr

 if (aa.snapshotLength > 0 ) {
  for(var i=0; i<aa.snapshotLength; i++) { 
   appo_dopo=appo_dopo+aa.snapshotItem(i).innerHTML+';';
   var trovato=0;
    for(var j=0; j<appo_prima_arr.length; j++) { 
     if (appo_prima_arr[j]==aa.snapshotItem(i).innerHTML) {
      trovato=1;
     break;
    }
   }
   if (trovato==0) nuovi_nomi=nuovi_nomi+aa.snapshotItem(i).innerHTML+',';
  }
  debug('appo_dopo '+codice_lista+': '+appo_dopo);
  GM_setValue("ListaNomi"+codice_lista, appo_dopo); 
  if (appo_prima!=appo_dopo) alert("Nuovo Nome per la lista "+codice_lista+" : "+nuovi_nomi);
 }
}

if ((location.href.indexOf('articoli_regalare') > 0) || (location.href.indexOf('articoli_regalati') > 0) )
{ celln=0;
  //var aa = xpathEvaluate('//div[@id='content-free']/table[4]/tbody/tr[1]/td[2]/text()' == Totali Rinascente 
  
  //html/body/form/div[2]/div[2]/table[4]/tbody/tr
  var bb = xpathEvaluate('//div[@id=\'content-free\']/table[4]/tbody/tr');
  debug('bb.snapshotLength: '+bb.snapshotLength);
  if (bb.snapshotLength > 0 ) {  
   for(var i=0; i<bb.snapshotLength; i++) { 
    var ap_contenuto = bb.snapshotItem(i);
    var cc = xpathEvaluateInContext(ap_contenuto, 'td[@class="txt_reparto"]');	
    if (cc.snapshotLength > 0) {
	 var appo_reperto = cc.snapshotItem(0);
	 appo_reperto.setAttribute('colspan', 5);		
     var cell = document.createElement("td");
	 cell.setAttribute('align','right');		
	 cell.setAttribute('class','txt_reparto');		
	 cell.innerHTML=celln;
	 celln=0;
	 dd1_appo='x';
	 dd1_appo_n=0;
	 //
     appo_reperto.parentNode.appendChild( cell );		
	 //debug('txt_reparto: '+cc.snapshotItem(0).innerHTML);	
	} 
	else
	{
     if (location.href.indexOf('articoli_regalati') > 0){
	 var dd  = xpathEvaluateInContext(ap_contenuto, 'td/table/tbody/tr[1]/td[4]/span');	
	 var dd1 = xpathEvaluateInContext(ap_contenuto, 'td/table/tbody/tr[1]/td[1]/span');	
	 var dd2 = xpathEvaluateInContext(ap_contenuto, 'td/table/tbody/tr[1]/td[6]/span');	
	 }
	 else
     {var dd  = xpathEvaluateInContext(ap_contenuto, 'td[6]/span');	
	  var dd1 = xpathEvaluateInContext(ap_contenuto, 'td[1]/span');
	  var dd2 = xpathEvaluateInContext(ap_contenuto, 'td[6]/span');
	 }
     
	 if (dd.snapshotLength > 0) {
	  var appo_articolo = dd.snapshotItem(0);
	  if (dd1_appo==dd1.snapshotItem(0).innerHTML ) 
	  {
	  dd1_appo_n=dd1_appo_n+parseFloat(appo_articolo.innerHTML.replace(/[^0-9,]/g,''));
	  if (location.href.indexOf('articoli_regalati') > 0) appo_dd2.innerHTML=dd1_appo_n;
	  }
	  else
	  { //if ( location.href.indexOf('articoli_regalati') < 0 && appo_dd2 ) {
	    //appo_dd2.innerHTML+='  ('+dd1_appo_n+')'; 
		//}
	   dd1_appo_n=0;	   
	   dd1_appo_n=dd1_appo_n+parseFloat(appo_articolo.innerHTML.replace(/[^0-9,]/g,'')); 
	   var appo_dd2 = dd2.snapshotItem(0);
	   if ( location.href.indexOf('articoli_regalare') < 0 ) 
	     appo_dd2.innerHTML=dd1_appo_n;	  
	   dd1_appo = dd1.snapshotItem(0).innerHTML;	   
	  }
	  //var appo_articolo = dd1.snapshotItem(0);
	  //debug('appo articolo: '+appo_articolo.innerHTML);
	  if (cell) celln=celln+  parseFloat(appo_articolo.innerHTML.replace(/[^0-9,]/g,''));
	  if (cell) cell.innerHTML=celln;
	  debug('celln: '+celln);
	 }
	}
   } 
  }  
}

//fine 