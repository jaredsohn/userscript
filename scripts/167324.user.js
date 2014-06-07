// ==UserScript==
// @name	   Google Translator Plus
// @author	   Keyser Söze
// @namespace	   http://userscripts.org/users/KeyserSoze
// @description	   Traduce el texto seleccionado o la página completa. Translates selected text into a tooltip and/or translates a complete page. 
// @icon	   http://img11.hostingpics.net/pics/450440GoogleIcon.png
// @updateURL	   https://userscripts.org/scripts/source/145282.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/145282.user.js
// @version	   1.6
// @include	   http://*
// @include	   https://*
// @include	   *:*
// Basado en	   "GoogleTranslatorTooltip Pier's Mod", "GTranslator" & "Click Search Now Also As"... Así que, muchas gracias a los autores originales!
// Based on 	   "GoogleTranslatorTooltip Pier's Mod", "GTranslator" & "Click Search Now Also As"... So, many thanks to original authors
// ==/UserScript==

(function() {

const HREF_NO = 'javascript:void(0)';
var imgLookup, txtSel, currentURL, languagesGoogle;
var initialized = false;
var Upd = false;
//var TLD = "com";//GM_getValue('TLD') ? GM_getValue('TLD') : "com";

//setup events
document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);

function mousedownCleaning(evt){

	var divDic = getId('divDic');
	var divLookup = getId('divLookup');

	if(divDic)
	{
		if(!clickedInsideID(evt.target,'divDic'))
			divDic.parentNode.removeChild(divDic);
	}	
	if(divLookup)
	{
		if(!clickedInsideID(evt.target,'divLookup'))
			divLookup.parentNode.removeChild(divLookup);			
			
	}	
		
}


function showLookupIcon(evt){

	if(!evt.ctrlKey && GM_getValue('ctrl'))//ctrl key
		return;
	
	if(evt.button == 2){
		mousedownCleaning(evt)
		return;
	}
	
	
	
	if(!initialized){
		images();
		checkupd();
		css();	
		initialized = true;
	}
	
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
		//possible cleanup
	if(divDic)
	{
		if(!clickedInsideID(evt.target,'divDic'))
			divDic.parentNode.removeChild(divDic);
		return;
	}

	
	//remove div if exists
	if(divLookup)
	{
		if(!clickedInsideID(evt.target,'divLookup'))
			divLookup.parentNode.removeChild(divLookup);
		return
	}	
	txtSel = getSelection(evt);
	
	//exit if no text is selected
	if(!txtSel || txtSel=="")
	{
		if(divDic)
		{
			if(!clickedInsideID(evt.target,'divDic'))
				divDic.parentNode.removeChild(divDic);
		}
		if(divLookup)
		{	
			if(!clickedInsideID(evt.target,'divLookup'))
				divLookup.parentNode.removeChild(divLookup);
		}
		return;
	}



	
	if(!txtSel || txtSel=="")
	{
		if(divLookup)
		{	
			if(!clickedInsideID(evt.target,'divLookup'))
				divLookup.parentNode.removeChild(divLookup);
		}
		return;
	}
	else{
		
	//div container
	divLookup = createElement('div', {id:'divLookup', style:'background: rgba(0, 0, 0, 0); color:#FFFFFF; position:absolute; top:'+(evt.clientY+window.pageYOffset-35)+'px; left:'+(evt.clientX+window.pageXOffset+35)+'px; padding:0px; width:42px; height:16px; z-index:999999999;'});
	
	var gg = createElement('span');
	//var gURL= ";
	gg.innerHTML = "<a href=\"https://www.google.com/search?q="+encodeURIComponent(txtSel)+" \" > <img src=\"data:image/png;base64,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\" style=\" border:1px solid rgba(240,240,255,0.1); \" > </a>";
	divLookup.appendChild(gg);
	
	divLookup.appendChild(imgLookup.cloneNode(false));
	divLookup.lastChild.addEventListener('mouseover', lookup, false);
	document.body.appendChild(divLookup);	
	
	}

}


function lookup(evt){

	var divResult = null;
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	var top = divLookup.style.top;
	var left = divLookup.style.left;

	//no text selected
	if(!txtSel || txtSel=="")
	{
		
		if(divDic = getId('divDic'))
			divDic.parentNode.removeChild(divDic);
		if(divLookup = getId('divLookup'))
			divLookup.parentNode.removeChild(divLookup);
		return;
	}
	
	
	//cleanup divs
	if(divDic = getId('divDic'))
	{
		divDic.parentNode.removeChild(divDic);
	}	
	divLookup.parentNode.removeChild(divLookup);
	
	
	//div container
	divDic = createElement('div', {id:'divDic', style:'background: rgba(0, 0, 0, 0.9); color:#55F0F5; position:absolute; top:'+top+'; left:'+left+'; min-width:250px; min-height:50px; max-width:50%; padding:5px; font-size:small; text-align:left; z-index:999999999; border-width:2px; border-style:solid; -moz-border-radius:6px;'});



	divDic.addEventListener('mousedown', dragHandler, false);
	document.body.appendChild(divDic);

	
	//div result
	divResult = createElement('div', {id:'divResult', style:'overflow:auto; padding:3px;'}, null, 'Loading...');
	divDic.appendChild(divResult);	
	

	
	//options link
	divDic.appendChild(createElement('span', {id:'optionsLink', title:'options', href:HREF_NO, style:'position:absolute; bottom:3px; right:5px; font-size:small; text-decoration:none; cursor:pointer;'}, 'click options false', '==>>'));

	//lookup
	if( (txtSel+" ").search(/^\s*https?:\/\//) > -1 ) 
	{
		divResult.innerHTML = '<a class="gootranslink" href="'+txtSel+'" target="_blank" >'+txtSel+'</a>';
	}
	else if( (txtSel+" ").search(/^\s*\S+(\.\S+)+/) > -1 ) // site.dom
	{
		divResult.innerHTML = '<a class="gootranslink" href="http://'+txtSel+'" target="_blank" >'+txtSel+'</a>';
	}
	else 
	{
		var sl, tl, lang;
		sl = GM_getValue('from') ? GM_getValue('from') : "auto";
		tl = GM_getValue('to') ? GM_getValue('to') : "auto";
		lang = sl + "|" + tl;
		currentURL = "http://translate.google.com/?hl="+tl+"&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang;
		GM_xmlhttpRequest({
			method: 'GET',
			url: currentURL,
			onload: function(resp) {
				try{
					extractResult(resp);

				}catch(e){
					GM_log(e);
				}
			}
		});	
	}
	
	
	//store query as attribute
	getId('divDic').setAttribute('query', txtSel);
	
	if (Upd){
		
		divDic.appendChild(createElement('div',{id:'UpdateGTT', title:'Update', style:'background: rgba(255, 0, 0, 0.6); color:#FFFFFF; text-align: center; padding:5px; border-width:2px; border-style:solid; -moz-border-radius:6px; max-width:300px; overflow-y:auto; overflow-x:hidden; '}, null ,'<a  style="background: none !important; color:#FFFFFF; font-size:13px; "  href="http://userscripts.org/scripts/show/145282" target="_blank" >New version! Click here to install</a>'));	
		divDic.appendChild(createElement('br'));
	}
		
	
	//other searches
	divDic.appendChild(createElement('span',{id:'spanOtherSearches', title:'search other sites', style:'position:absolute; left:5px; bottom:3px; cursor:pointer; font-size:small;'},'mouseover otherSites false','[+]'));	
}


function quickLookup(){

	getId('divResult').innerHTML = 'Loading...'
	var tl = getId('optSelLangTo').value;
	currentURL = "http://translate.google.com/?hl="+tl+"&text=" + encodeURIComponent(document.getElementById('divDic').getAttribute('query',2)) + "&langpair=" + getId('optSelLangFrom').value + "|" + tl;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: currentURL,
		onload: function(resp) {
			try{
				extractResult(resp);

			}catch(e){
				GM_log(e);
			}
		}
	});	
}


function otherSites(evt){

	var ul, li, query = getId('divDic').getAttribute('query').replace(/\s+$/,'').replace(/^\s+/,'');

	var sites = [
	
		{name:'Google Search', href:'http://www.google.com.mx/search?hl=auto&q='+query.replace(/\s+/g,'+')},
		{name:'Google Images', href:'http://www.google.com.mx/images?hl=auto&q='+query.replace(/\s+/g,'+')},
		{name:'Google Scholar', href:'http://scholar.google.com.mx/scholar?q='+query.replace(/\s+/g,'+')},
		{name:'Google Videos', href:'http://www.google.com.mx/search?hl=auto&safe=off&tbo=1&sout=1&prmdo=1&tbs=dur:l&tbm=vid&q='+query.replace(/\s+/g,'+')},
		{name:'Blogs', href:'http://www.google.com.mx/search?hl=auto&q=(RAR|ISO|Zip|BDRip|MKV|FLAC|MP3|DJVU|PDF|MirrorCreator|ZippyShare|ShareBeast|PutLocker|SkyDrive) site:blogspot.com OR site:blogster.com OR site:wordpress.com OR site:blogger.com OR site:livejournal.com OR site:blog.com OR site:freeblogit.com OR site:edublogs.org OR site:typepad.com OR site:tumblr.com OR site:blogsome.com OR site:blogetery.com OR site:bravejournal.com OR site:blogdrive.com OR site:scienceblogs.com OR site:blog.co.uk '+query.replace(/\s+/g,'+')},
		{name:'Cinema & TV: Vídeos, Series, Films...', href:'http://www.google.com.mx/search?hl=auto&q=-MegaUpload (MKV|AVI|MP4|RMVB|DVDRip|BDRip|DVD|BluRay|BlogSpot) "Ge.Tt" OR "MediaFire" OR "SendSpace" OR "DepositFiles" OR "DivShare" OR "ZippyShare" OR "2Shared" OR "Mega" OR "RapidShare" OR "FileFlyer" OR "MyUpload" OR "JumboFiles" OR "PutLocker" OR "BillionUploads" OR "SockShare" OR "DropBox" '+query.replace(/\s+/g,'+')},
		{name:'Definition, Sentences, Synonyms...', href:'http://www.google.com.mx/search?hl=auto&q=site:iate.europa.eu OR site:en.glosbe.com OR site:imtranslator.net OR site:woxikon.com OR site:bab.la OR site:wordreference.com OR site:thefreedictionary.com OR site:linguee.com OR site:tatoeba.org '+query.replace(/\s+/g,'+')},
		{name:'Docs, Papers, Journals, Magazines, Books...', href:'http://www.google.com.mx/search?hl=auto&q=-MegaUpload (DJVU|CHM|CBR|SkyDrive|BlogSpot|XLS|PPT|DOC|NFO|DVI|EPUB|PDF) "MediaFire" OR "PutLocker" OR "SendSpace" OR "ZippyShare" OR "DivShare" OR "FileFlyer" OR "ShareBeast" OR "Mega" OR "BillionUploads" OR "DropBox" OR "2Shared" OR "Ge.Tt" OR "GDrive" OR "MyUpload" OR "SockShare" OR "SkyDrive" '+query.replace(/\s+/g,'+')},
		{name:'File Hosting Links', href:'http://www.google.com.mx/search?hl=auto&q=-MegaUpload "Ge.Tt" OR "MediaFire" OR "PutLocker" OR "SendSpace" OR "DepositFiles" OR "SendMyWay" OR "ZippyShare" OR "DivShare" OR "FileFlyer" OR "ShareBeast" OR "Mega" OR "BillionUploads" OR "DropBox" OR "2Shared" OR "JumboFiles" OR "Uploading" OR "RapidShare" OR "BlogSpot" OR "GDrive" OR "MyUpload" OR "SockShare" OR "SkyDrive" OR "RGHost" '+query.replace(/\s+/g,'+')},
		{name:'FTP Folder', href:'http://www.google.com.mx/search?hl=auto&q=(ISO|RAR|MP3|DOC|MKV|DJVU|7Z|FLAC|PPT|AVI|EPUB|ZIP|M4A|XLS|MP4|PDF|EXE) "Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp '+query.replace(/\s+/g,'+')},
		{name:'Music, Audio (Download Direct Links)', href:'http://www.google.com.mx/search?hl=auto&q=-MegaUpload (SkyDrive|GDrive|MP3|FLAC|M4A|LossLess|BlogSpot) "Ge.Tt" OR "MediaFire" OR "Mega" OR "BillionUploads" OR "SendSpace" OR "DepositFiles" OR "SendMyWay" OR "ZippyShare" OR "FileFlyer" OR "MyUpload" OR "PutLocker" OR "DropBox" OR "2Shared" OR "DivShare" OR "ShareBeast" OR "RapidShare" '+query.replace(/\s+/g,'+')},
		{name:'Scientific Search', href:'http://www.google.com.mx/search?hl=auto&q=site:techxtra.ac.uk OR site:tdx.cat OR site:scitation.aip.org OR site:doaj.org OR site:pesquisa.bvsalud.org OR site:ncbi.nlm.nih.gov OR site:agu.org OR site:afe.org OR site:electrochem.org OR site:springerlink.com '+query.replace(/\s+/g,'+')},
		{name:'Subtitles', href:'http://www.google.com.mx/search?hl=auto&q=(SRT|SUB|IDX|SSA|TXT|RT|ASS|PSB|S2K|LRC|SMI|MKS|SMIL|SSF|USF) site:all4divx.com OR site:subdivx.com OR site:subscene.com OR site:divxtitles.com OR site:divxsubtitles.net OR site:opensubtitles.com '+query.replace(/\s+/g,'+')},
		{name:'GrooveShark', href:'http://grooveshark.com/#!/search?q='+query.replace(/\s+/g,'+')},
		{name:'Identi', href:'http://www.identi.li/index.php?action=buscador&search='+query.replace(/\s+/g,'+')},
		{name:'IMDb', href:'http://www.imdb.com/find?s=all&q='+query.replace(/\s+/g,'+')},
		{name:'InterActive Terminology', href:'http://iate.europa.eu/iatediff/SearchByQuery.do?method=search&saveStats=true&screenSize=1280x800&valid=Search+&sourceLanguage=s&targetLanguages=s&domain=0&typeOfSearch=s&request=&query='+query.replace(/\s+/g,'+')},
		{name:'Science Research', href:'http://www.scienceresearch.com/scienceresearch/result-list/collections:SCRNATGEONEWS,SCRRSP,SCRSPIR,MED-FDAD,SCRAMS,SCRNSCAN,SCRGEOSA,SCRIUPAC,SCRARST,SCRCDER,SCIDERDA,INTUTE,SCRSD,SCRTHIEME,CDER,SCRENVSE,ESN-CRS,MEDLINEPLUS-2,SCRCDC,SCRNPDB,SCRSN,SCRNIH,SCRNASWEB,SCRTRIS,DTIC-RDDS,SCRNATACS,SCRWWS,SCRPIX,SCRNGESPI,SCRFAOUN,SCRDERDP,ASMINTL,DOE-PATENT-XML,HEL-COCLIB,SCRAME,SCRELSD,NGC,EF-NSR,SCRYANWS,DTIC-SCAMPI,SCRBIOONE,SCRNSF,SCIGOV-SIMPLE,SCRCHMID,HEL-FEDST,SCRDTICST,SCRNCI,SCRAAOB,SCRHIPUBC,SCRUPTO,SCRJOURW,SCRASJOUR,SUSMS,SCRCIPO,SCROXPRESS,SCREPAOD,SCRNBIOII,SCRAAELIB,SCREPRINT,SCRBIOCEN,SCRNIHCA,SCRWINS,MED-EKNIH,MEDHM,SCRSPACE,SCRCALAS,SCRDOEIB,SCRASCE,MRS-NOPR,MED-WEB,SCRASM,SCRELESOC,SCREPAPF,SCRSPD,SCRACM,EPOJP,SCREPATIP,SCRASLOC,SCRBLD,SCRHUBST,SCRACS,SCRSCONP,SCRMMMS,SCRBAND,SCRUGCS,EPOEP,CANRESCOUNCIL,HEL-NPRATD,SCRAGRB,AMA-JAMA,SCRNNIE,SCRENHP,SCRNOAAPL,TOXNETTOXLINE,NSSN,SCREPRI,SCRAGRA,SCRBENVRAD,SCRBIJOUR,HEL-MAYO,SCRTEKTRAN,SCRESWIB,SCROEP,SCRIEA,SCRSCH,MEDPUBMED,SCRAAPHY,SRCGISDB,SCRUDLOS,SCRANNRE,EPOWIPO,SCRIAEA,SCRRSCPUB,SCRENVPA,SCRASPB,SCRUCPJ,SCRBITERA,SCRSSCTR,HEL-WHO,FDA-CBER,SIAM,DOD-WST,SCREIA,SCRSCIMAG,SCRMSE,SCRUSGSPUBS,SCRSEGEO,SCREVMGR,SCRDOAR,SCRSPEXP,SCRNTIS,SCRKARPUB,SCRIGCNT,SCRNATAP,SCRNACE,SCRWMW,SCREPASI,SCRDODBIOR,SCRCELLPR,SRBIOMB,SCRARMP,SCRNICHWBK,SCRBIOIO,SCRNASTRS,SCRSCIA,SCRAPI,SCRGPD,SCRUSECS,SCRBFIN,SCRCFSAN,SCRNASADS,SCRFERM,PUBMED,SCITOPIA,SCRMCB,AACR,SCRERSD,SCROAISTER,SCRHRD,SCRPROSOC,SCRANS,DTIC-AULIMP,SCRPLANDS,SCRESCU,SCRNISTDG,SCRNATPUGR,SCRTFGRP,DOE-RDPROD,SCRUSDEPD,CLINICALTRIALS,SCRPOP,SCISPR,HEL-IMPRO,SCRIEEE,SCRSSSAJ,NLSWED-KAROLINSKA,SCRHWPRE,SCREF/fullRecord:'+query.replace(/\s+/g,'+')},
		{name:'Taringa', href:'http://www.taringa.net/buscar/?q='+query.replace(/\s+/g,'+')},
		{name:'The Free Dictionary', href:'http://es.thefreedictionary.com/'+query.replace(/\s+/g,'+')},
		{name:'WorldWide Science', href:'http://worldwidescience.org/wws/result-list/fullRecord:'+query.replace(/\s+/g,'+')},
		{name:'YouTube', href:'http://www.youtube.com/results?search_query='+query.replace(/\s+/g,'+')}

	];
	
	getId('divDic').appendChild(createElement('br'));
	getId('divDic').appendChild(document.createTextNode('Search "'+(query.match(/^[\s\S]{15}/) ? query.match(/^[\s\S]{15}/)[0]+'...' : query.match(/^[\s\S]+/)[0] )+'" at:'));
	ul = getId('divDic').appendChild(createElement('ul'));
	
	for(var i=0; i<sites.length; i++){
		li = ul.appendChild(createElement('li'));
		li.appendChild(createElement('a', {style:'color:#EEEEEE;',target:'_blank', href:sites[i].href}, null, sites[i].name));
	}
	
	evt.target.parentNode.removeChild(evt.target);


}


function extractResult(resp){	

	//select body and remove some tags
	var html = resp.responseText.match(/\<body[^\>]*\>([\s\S]+)\<\/body\>/)[1];
	html = html.replace(/\<script[^\<]+\<\/script\>/ig, '');
	html = html.replace(/\<iframe[^\<]+\<\/iframe\>/ig, '');
	
	//append requested page as hidden iframe
	var iframe = document.body.appendChild(createElement('iframe', {style:'visibility:hidden;'}));	
	var divExtract = iframe.contentWindow.document.body.appendChild(createElement('div', {id:'divExtract'}, null, html));
	divExtract = document.importNode(divExtract, true);
	iframe.parentNode.removeChild(iframe);
 
	//gather info
	var translation = trim( xp('.//span[@id="result_box"]', divExtract)[0].textContent );
	var dict = xp('.//div[@id="gt-res-dict"]', divExtract)[0];

	if(dict){
		try{
			dict = dict.outerHTML.replace(/<div><div>/ig, ": </span><span> ").replace(/<\/div><div>/ig, ", ").replace(/<li>/ig, "<li><span>").replace(/<\/div><\/div>/ig, "</span>");
		}catch(e){
			dict = null;
		}
	}
	
	//parse info
	getId('divResult').innerHTML = '<a class="gootranslink" href="'+currentURL+'" target="_blank">' + translation + '</a><br><br>';
	if ( dict.length > 80 ){
		
		getId('divResult').innerHTML += '<div id="dict" style="background: rgba(0, 0, 0, 0.6); color:#FFFFFF; padding:5px; border-width:2px; border-style:solid; -moz-border-radius:6px; margin-bottom:10px; max-width:300px; overflow-y:auto; overflow-x:hidden; font-size:small;">'+dict+'</div>';

	}
	else if(translation == txtSel)
	otherSites({target:getId('spanOtherSearches')});//no translation?
	 
	
}

function trim(str){
	return str.replace(/^\s+/,'').replace(/\s+$/,'');
}


function getSelection(evt){

	var txt = null;
	//get selected text
	if(evt && evt.target.nodeName=='TEXTAREA')
	{
		 //var begin = evt.target.value.substr(0, evt.target.selectionStart); 
		 txt = evt.target.value.substr(evt.target.selectionStart, evt.target.selectionEnd - evt.target.selectionStart); 
		 //var end = evt.target.value.substr(evt.target.selectionEnd); 
		 //myArea.value = begin + text1 + selection + text2 + end; 		
	}
	else if (window.getSelection)
	{
		txt = window.getSelection();
	}
	else if (document.getSelection)
	{
		txt = document.getSelection();
	}
	else if (document.selection)
	{
		txt = document.selection.createRange().text;
	}
	//txt = encodeURIComponent(txt);//toString().replace(/\n/ig, '%0D%0A');
	return txt;
}


function options(evt){

	if(!languagesGoogle){
		languagesGoogle = '<option selected value="auto">Detect language</option><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bn">Bengali</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="eo">Esperanto</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="gu">Gujarati</option><option value="ht">Haitian Creole</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="kn">Kannada</option><option value="ko">Korean</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="ms">Malay</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="ta">Tamil</option><option value="te">Telugu</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option>';
	}
		
	var divOptions = getId('divOpt');
	
	if(!divOptions)//show options
	{
		divOptions = createElement('div', {id:'divOpt', style:'background-color:FFFFFF; position:relative; padding:5px;'});
		getId('divDic').appendChild(divOptions);
		getId('optionsLink').style.visibility = 'hidden';

		
		//from
		divOptions.appendChild(createElement('span', null, null,'From:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangFrom'}, null, languagesGoogle));
		getId('optSelLangFrom').value = GM_getValue('from') ? GM_getValue('from') : "auto";
		getId('optSelLangFrom').addEventListener('change', quickLookup, false);
		
		//to
		divOptions.appendChild(createElement('span', null, null,' To:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangTo'}, null, languagesGoogle));
		getId('optSelLangTo').value = GM_getValue('to') ? GM_getValue('to') : "auto";
		getId('optSelLangTo').addEventListener('change', quickLookup, false);
		
		//tld
		//divOptions.appendChild(createElement('br'));
		//divOptions.appendChild(createElement('span', null, null,'<br> Search on Google.'));
		//divOptions.appendChild(createElement('input', {id:'optSelTLD', type:'text'}, null, null));//http://translate.google.com/?hl=et&tab=wT
		//getId('optSelTLD').value = GM_getValue('TLD') ? GM_getValue('TLD') : "com";
		//getId('optSelTLD').addEventListener('change', quickLookup, false);
		
		//use ctrl 
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkCtrl', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'Use Ctrl key'));
		getId('checkCtrl').checked = GM_getValue('ctrl');
		
		//save
		//divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click saveOptions false', '<br>- SAVE -'));
		
		//cancel
		divOptions.appendChild(createElement('span', null, null,'&nbsp; &nbsp; &nbsp;'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click options false', 'Cancel <br>'));
		


	}
	else//hide options
	{
		divOptions.parentNode.removeChild(divOptions);
		getId('optionsLink').style.visibility = 'visible';
	}
}

function saveOptions(evt){

	var from = getId('optSelLangFrom').value;
	var to = getId('optSelLangTo').value;
	//TLD = getId('optSelTLD').value;
	var ctrl = getId('checkCtrl').checked;
	
	GM_setValue('from', from);
	GM_setValue('to', to);
	GM_setValue('ctrl', ctrl);
	//GM_setValue('TLD', TLD);
	
	getId('divDic').removeChild(getId('divOpt'));
	getId('optionsLink').style.visibility = 'visible';
}



function css(){

	var style = createElement('style',{type:"text/css"},null,""+	
	
		'a.gootranslink:link {color: #99FF66 !important; text-decoration: none !important;}'  +  
		'a.gootranslink:visited {color: SkyBlue !important; text-decoration: none !important;}'+ 
		'a.gootranslink:hover {color: YellowGreen !important; text-decoration: none !important;}'  +
		'a.gootranslink:active {color: Sienna !important; text-decoration: underline !important;}' +
		'#dict span:first-child {color: #3399FF;}'+
		'#dict h3{ background: none !important; color:#FFFFFF; font-size:13px; margin: 4px 4px 4px 4px;}'+
		'#dict ol{ background: none !important; color:#FFFFFF; font-size:13px;  margin-left: 8px; list-style: none;}'
		


	);
	getTag('head')[0].appendChild(style);
}


function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) 
		node.innerHTML = html;
	
	return node;
}

function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getTag(name, parent){
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}

function xp(p, context, doc) {
  if (!context) 
	context = document;
  if (!doc) 
	doc = document;	
  var i, arr = [], xpr = doc.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++)
	arr.push(item);
	return arr;
}

function debug(str)
{
	
	var d = document.getElementById('debugg');
	if(!d){
		var div = document.createElement('div');
		div.setAttribute('id','divdebug');
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px; border-width:2px; border-style:solid; width:50%; z-index:999999999;');
		
		var closeButton = document.createElement('input');
		closeButton.setAttribute('id','closedebug');
		closeButton.setAttribute('type', 'button');
		closeButton.setAttribute('value', 'close');
		closeButton.setAttribute('onClick', 'this.parentNode.parentNode.removeChild(this.parentNode);');
		
		d = document.createElement('textarea');
		d.setAttribute('id','debugg');
		d.setAttribute('style',"height:150px; width:99%; margin:2px;");
		
		div.appendChild(d);
		div.appendChild(document.createElement('br'));
		div.appendChild(closeButton);
		document.body.appendChild(div);
	}
	d.innerHTML += '\n'+str;
	d.scrollTop = d.scrollHeight;
}



/*
 * Drag and drop support adapted fom http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
 */

var savedTarget=null;                           // The target layer (effectively vidPane)
var orgCursor=null;                             // The original mouse style so we can restore it
var dragOK=false;                               // True if we're allowed to move the element under mouse
var dragXoffset=0;                              // How much we've moved the element on the horozontal
var dragYoffset=0;                              // How much we've moved the element on the verticle

var didDrag=false;								//set to true when we do a drag
	
	
function moveHandler(e){
	if (e == null) return;// { e = window.event } 
	if ( e.button<=1 && dragOK ){
		savedTarget.style.left = e.clientX - dragXoffset + 'px';
		savedTarget.style.top = e.clientY - dragYoffset + 'px';
		return false;
	}
}

function dragCleanup(e) {
	document.removeEventListener('mousemove',moveHandler,false);
	document.removeEventListener('mouseup',dragCleanup,false);
	savedTarget.style.cursor=orgCursor;

	dragOK=false; //its been dragged now
	didDrag=true;
	
}

function dragHandler(e){

	var htype='-moz-grabbing';
	if (e == null) return;//{ e = window.event;}  // htype='move';} 
	var target = e.target;// != null ? e.target : e.srcElement;
	orgCursor=target.style.cursor;

	if(target.nodeName!='DIV')
		return;
	else if(clickedInsideID(target, 'dict'))
		return;

	if (target = clickedInsideID(target, 'divDic')) {
		savedTarget=target;       
		target.style.cursor=htype;
		dragOK=true;
		dragXoffset = e.clientX-target.offsetLeft;
		dragYoffset = e.clientY-target.offsetTop;
		
		//set the left before removing the right
		target.style.left = e.clientX - dragXoffset + 'px';
		target.style.right = null;
		
		
		document.addEventListener('mousemove',moveHandler,false);
		document.addEventListener('mouseup',dragCleanup,false);
		return false;
	}
}

function clickedInsideID(target, id) {

	if (target.getAttribute('id')==id)
		return getId(id);
	
	if (target.parentNode) {
		while (target = target.parentNode) {
			try{
				if (target.getAttribute('id')==id)
					return getId(id);
			}catch(e){
			}
		}
	}
	
	return null;
}

//end drag code


/*
 * Images
 */
function images()
{
	imgLookup = createElement('img',{style:' border:1px solid rgba(50,50,255,0.3);'});
	imgLookup.src = 'http://img11.hostingpics.net/pics/450440GoogleIcon.png';
}


function checkupd(){
	var d = new Date();
	if (GM_getValue('lastcheck') == d.getDate()) {
		return
	}
	GM_setValue('lastcheck',d.getDate());
	
	GM_xmlhttpRequest({
		method:"GET",
		url:'http://userscripts.org/scripts/source/145282.meta.js',
		onload:function(result) {
			if (result.responseText.indexOf('@version        1.1') == -1) {
				Upd = true;
				imgLookup.src = 'http://www.animatedgif.net/science/majii_e0.gif';
			}
		}
	});
}

var targetLanguage = "en";

function load_jsapi() {
  var elem = document.createElement("script");
  elem.type = "text/javascript";
  elem.id = "google-jsapi";
  elem.src = "http://www.google.com.mx/jsapi?callback=jsapi_loaded";
  document.getElementsByTagName('head')[0].appendChild(elem); //document.body.appendChild(elem);

}

function so_captureKeyDownEvent(e) {
  var keyCode = document.all?window.event.keyCode:e.keyCode;
  switch(keyCode) {

    case 123: // F12 (F12 redirects to translate.google.cn)

      var translation_url = "http://translate.google.com.hk/translate?hl=zh-CN&js=y&prev=_t&ie=UTF-8&layout=1&eotf=1&sl=auto&tl=auto&u=" + document.location.href
      document.location.href = translation_url;
      break;

    case 121: // F10 (F10 redirects to translate.google.it)

      var translation_url = "http://translate.google.it/translate?hl=it&js=y&prev=_t&ie=UTF-8&layout=1&eotf=1&sl=auto&tl=auto&u=" + document.location.href
      document.location.href = translation_url;
      break;

    case 120: // F9 (F9 redirects to translate.google.fr)

      var translation_url = "http://translate.google.fr/translate?hl=fr&js=y&prev=_t&ie=UTF-8&layout=1&eotf=1&sl=auto&tl=auto&u=" + document.location.href
      document.location.href = translation_url;
      break;

    case 119: // F8 (F8 redirects to translate.google.pt)

      var translation_url = "http://translate.google.pt/translate?hl=pt&js=y&prev=_t&ie=UTF-8&layout=1&eotf=1&sl=auto&tl=auto&u=" + document.location.href
      document.location.href = translation_url;
      break;

    case 117: // F6 (F6 redirects to translate.google.com.mx)

      var translation_url = "http://translate.google.com.mx/translate?hl=es&js=y&prev=_t&ie=UTF-8&layout=1&eotf=1&sl=auto&tl=auto&u=" + document.location.href
      document.location.href = translation_url;
      break;

    case 113: // F2 (F2 redirects to translate.google.de)

      var translation_url = "http://translate.google.de/translate?hl=de&js=y&prev=_t&ie=UTF-8&layout=1&eotf=1&sl=auto&tl=auto&u=" + document.location.href
      document.location.href = translation_url;
      break;

    case 112: // F1 (F1 redirects to translate.google.ru)

      var translation_url = "http://translate.google.ru/translate?hl=ru&js=y&prev=_t&ie=UTF-8&layout=1&eotf=1&sl=auto&tl=auto&u=" + document.location.href
      document.location.href = translation_url;
      break;

  }

};

(function() {

    load_jsapi();

    document.addEventListener('keydown', so_captureKeyDownEvent, true);
    window.addEventListener("load", autoTranslate, true);

     })();

})();