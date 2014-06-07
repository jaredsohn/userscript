// ==UserScript==
// @name           CSFD_Features
// @namespace	     mjano
// @description    (http://www.csfd.cz) Rozne vylepsenia webu
// @include        http://www.csfd.cz/*
// @include        http://csfd.cz/*
//
// @require        http://userscripts.org/scripts/source/57756.user.js
//
// @version 0.10
//
// @history 0.10 zobrazuje v tooltipe aj reziu a hercov
// @history 0.10 odstranuje z webu niektore reklamy
// @history 0.10 tooltip sa zobrazuje nad linkom, ak sa pod link nezmesti
// @history 0.10 nastavenie roznych funkcii CSFD_Features priamo na webe csfd
// @history 0.9 opravene chyby pre prihlasenych uzivatelov
// @history 0.8 opravena chyba v info pre Script Updater
// @history 0.7 zobrazovanie obrazkov hercov a reziserov - napad som si pozical (ukradol) od uzivatela gog.
// @history 0.7 pridana kontrola na nove verzie pomocou Script Updater-u
// @history 0.7 moznost logovania - zobrazuje priebezny stav nacitavania dat
// @history 0.7 komplet prepisany zdrojak
// @history 0.6 interna uprava parametrov User-Agent a Accept po zmene csfd
// @history 0.5 vytiahnute nastavenia parametrov na zaciatok kodu
// @history 0.4 oprava chybnych linkov po prihlaseni
// @history 0.3 do tooltipu pridany zaner, krajina a dlzka filmu. 
// @history 0.3 zrusene nacitavanie dat k filmom, ktore su na stranke skryte
// @history 0.3 na stranke samotneho filmu zrusene nacitavanie dat k tomuto filmu
// @history 0.2 rozsirene hodnotenie na vsetky linky k filmom
// @history 0.2 zobrazovanie obsahu pri nabehnuti mysi na link filmu
// @history 0.2 opravene niektore chyby
// @history 0.1 percentualne hodnotenie niektorych filmov
// ==/UserScript==

ScriptUpdater.check(52380, "0.10");

// nacitaj jQuery a SimpleModal
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var GM_JQM = document.createElement('script');
GM_JQM.src = 'http://simplemodal.googlecode.com/files/jquery.simplemodal-1.3.4.min.js';
GM_JQM.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQM);

function GM_wait_JQ() {
	if (typeof unsafeWindow.jQuery == 'undefined' || typeof unsafeWindow.jQuery.modal == 'undefined') {
		window.setTimeout(GM_wait_JQ, 100);
	} else {
		$ = unsafeWindow.jQuery;
		letsJQuery();
	}
}
GM_wait_JQ();

function letsJQuery() {

	function SkryReklamu() {
		/*		var elms = $("div[id^='bmone2n']");
					for (var i = 0; i < elms.length; i++) {
					elms[i].parentNode.removeChild(elms[i]);
					}*/
		$("div[id^='bmone2n']").remove();
		$("iframe[id$='banner']").remove();
		$("div[role='button']").remove();
		$('div.#ads').remove();
	}

	// ********* nastavenia *********
	var cfgPriehladnost = GM_getValue('CSFD_Features.cfgPriehladnost',100)/100.0;
	var cfgFarbaPozadia = GM_getValue('CSFD_Features.cfgFarbaPozadia','#d0e0d0');
	var cfgFarbaOkraja = GM_getValue('CSFD_Features.cfgFarbaOkraja','#b0b0b0');
	var cfgSirka = GM_getValue('CSFD_Features.cfgSirka','450px');
	var cfgVyska = GM_getValue('CSFD_Features.cfgVyska','600px');
	var cfgTypPisma = GM_getValue('CSFD_Features.cfgTypPisma','Arial');
	var cfgVelkostPisma = GM_getValue('CSFD_Features.cfgVelkostPisma','10px');
	var cfgLogovanie = GM_getValue('CSFD_Features.cfgLogovanie',true);
	var cfgZanerKrajina = GM_getValue('CSFD_Features.cfgZanerKrajina',true);
	var cfgRezia = GM_getValue('CSFD_Features.cfgRezia',true);
	var cfgHerci = GM_getValue('CSFD_Features.cfgHerci',true);
	var cfgHerciObrazky = GM_getValue('CSFD_Features.cfgHerciObrazky',true);
	var cfgObsah = GM_getValue('CSFD_Features.cfgObsah',true);
	var cfgReklama = GM_getValue('CSFD_Features.cfgReklama',false);
	// ******************************
	
	if (cfgReklama == false) {
		SkryReklamu();
	}

	$('<a href="#" id="CSFD_Features">CSFD_Features</a>').prependTo('body')[0];
	$('#CSFD_Features').offset($('.hlavicka').offset());

	$('#CSFD_Features').click(function(event) {
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgSirka')[0].value = GM_getValue('CSFD_Features.cfgSirka', cfgSirka);});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgVyska')[0].value = GM_getValue('CSFD_Features.cfgVyska', cfgVyska);});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgFarbaPozadia')[0].value = GM_getValue('CSFD_Features.cfgFarbaPozadia', cfgFarbaPozadia);});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgFarbaOkraja')[0].value = GM_getValue('CSFD_Features.cfgFarbaOkraja', cfgFarbaOkraja);});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgPriehladnost')[0].value = GM_getValue('CSFD_Features.cfgPriehladnost', cfgPriehladnost) / 100.0;});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgTypPisma')[0].value = GM_getValue('CSFD_Features.cfgTypPisma', cfgTypPisma);});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgVelkostPisma')[0].value = GM_getValue('CSFD_Features.cfgVelkostPisma', cfgVelkostPisma);});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgLogovanie').attr('checked', GM_getValue('CSFD_Features.cfgLogovanie', cfgLogovanie));});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgZanerKrajina').attr('checked', GM_getValue('CSFD_Features.cfgZanerKrajina', cfgZanerKrajina));});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgRezia').attr('checked', GM_getValue('CSFD_Features.cfgRezia', cfgRezia));});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgHerci').attr('checked', GM_getValue('CSFD_Features.cfgHerci', cfgHerci));});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgHerciObrazky').attr('checked', GM_getValue('CSFD_Features.cfgHerciObrazky', cfgHerciObrazky));});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgObsah').attr('checked', GM_getValue('CSFD_Features.cfgObsah', cfgObsah));});
			setTimeout(function(){$('div.CSFD_Features_Settings #cfgReklama').attr('checked', GM_getValue('CSFD_Features.cfgReklama', cfgReklama));});

			$('div.CSFD_Features_Settings').show();
			$('div.CSFD_Features_Settings').modal({onClose: function () {
				$.modal.close();
				$('div.CSFD_Features_Settings').hide();
				}});
			event.preventDefault();
			});

	$('<style type="text/css"> #simplemodal-overlay {background-color:#000;} #simplemodal-container {background-color:#333;} .CSFD_Features_Settings { font-family: Arial; font-size: 12px; } div.CSFD_Features_Settings { border-style: solid; border-width: 1px; border-color: #b0b0b0; border-collapse: collapse; background-color: #d0e0d0; float: left; padding: 5px; outline-style: outset; outline-width: 1px; outline-color: #909090; } input.CSFD_Features_Settings { border-style: solid; border-width: 1px; border-color: #b0b0b0; background-color: #f0f0f0; } fieldset.CSFD_Features_Settings { font-family: Verdana; margin: 2px; } td.CSFD_Features_Settings { width: 90px; } b.CSFD_Features_Settings { color: #509090; margin: 10px; font-size: 14px; } #CSFD_Features {position: absolute; z-index: 100; color: darkgreen; padding-left: 10px; font-weight: bold;}</style>').prependTo('head');

	$('<div class="CSFD_Features_Settings"> <b class="CSFD_Features_Settings">CSFD_Features Nastavenia</b> <fieldset class="CSFD_Features_Settings"> <legend>Rozmery</legend> <table class="CSFD_Features_Settings"> <tr> <td class="CSFD_Features_Settings">Šírka:</td> <td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="text" name="cfgSirka" id="cfgSirka" value="" size="6" /></td> </tr> <tr> <td class="CSFD_Features_Settings">Výška:</td> <td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="text" name="cfgVyska" id="cfgVyska" value="" size="6" /></td> </tr> </table> </fieldset> <fieldset class="CSFD_Features_Settings"> <legend>Farby</legend> <table class="CSFD_Features_Settings"> <tr> <td class="CSFD_Features_Settings">Farba pozadia:</td> <td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="text" name="cfgFarbaPozadia" id="cfgFarbaPozadia" value="" size="6" /></td> </tr> <tr> <td class="CSFD_Features_Settings">Farba okraja:</td> <td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="text" name="cfgFarbaOkraja" id="cfgFarbaOkraja" value="" size="6" /></td> </tr> <tr> <td class="CSFD_Features_Settings">Priehľadnosť:</td> <td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="text" name="cfgPriehladnost" id="cfgPriehladnost" value="" size="6" /></td> </tr> </table> </fieldset> <fieldset class="CSFD_Features_Settings"> <legend>Písmo</legend> <table class="CSFD_Features_Settings"> <tr> <td class="CSFD_Features_Settings">Typ písma:</td> <td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="text" name="cfgTypPisma" id="cfgTypPisma" value="" size="6" /></td> </tr> <tr> <td class="CSFD_Features_Settings">Veľkosť písma:</td> <td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="text" name="cfgVelkostPisma" id="cfgVelkostPisma" value="" size="6" /></td> </tr> </table> </fieldset> <fieldset class="CSFD_Features_Settings"> <legend>Zobrazovať</legend> <table class="CSFD_Features_Settings"><tr><td class="CSFD_Features_Settings">Žáner+krajina:</td><td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="checkbox" name="cfgZanerKrajina" id="cfgZanerKrajina" /></td></tr> <tr><td class="CSFD_Features_Settings">Réžia:</td><td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="checkbox" name="cfgRezia" id="cfgRezia" /></td></tr><tr><td class="CSFD_Features_Settings">Zoznam hercov:</td><td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="checkbox" name="cfgHerci" id="cfgHerci" /></td></tr><tr><td class="CSFD_Features_Settings">Obsah:</td><td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="checkbox" name="cfgObsah" id="cfgObsah" /></td></tr><tr><td class="CSFD_Features_Settings">Obrázky hercov:</td><td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="checkbox" name="cfgHerciObrazky" id="cfgHerciObrazky" /></td></tr><tr><td class="CSFD_Features_Settings">Reklama:</td><td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="checkbox" name="cfgReklama" id="cfgReklama" /></td></tr><tr> <td class="CSFD_Features_Settings">Logovanie:</td> <td class="CSFD_Features_Settings"><input class="CSFD_Features_Settings" type="checkbox" name="cfgLogovanie" id="cfgLogovanie" /></td> </tr> </table> </fieldset> <table class="CSFD_Features_Settings"> <tr> <td class="CSFD_Features_Settings"><button type="button" id="Accept">Potvrdiť</button></td> <td class="CSFD_Features_Settings" align="right"><button type="button" id="Cancel">Zrušiť</button></td> </tr> </table> </div>').prependTo('body');

	$('div.CSFD_Features_Settings').hide();

	$('.CSFD_Features_Settings #Cancel').click(function() {
			$.modal.close();
			$('div.CSFD_Features_Settings').hide();
			});

	function CSFD_Features_SetVal(cfg, val) {
		GM_setValue(cfg, val);
	}

	$('.CSFD_Features_Settings #Accept').click(function() {

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgSirka',$('div.CSFD_Features_Settings #cfgSirka')[0].value);
			$('#CSFD_Features_Tooltip').css('maxWidth',$('div.CSFD_Features_Settings #cfgSirka')[0].value);

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgVyska',$('div.CSFD_Features_Settings #cfgVyska')[0].value);
			$('#CSFD_Features_Tooltip').css('maxHeight',$('div.CSFD_Features_Settings #cfgVyska')[0].value);

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgFarbaPozadia',$('div.CSFD_Features_Settings #cfgFarbaPozadia')[0].value);
			$('#CSFD_Features_Tooltip').css('backgroundColor',$('div.CSFD_Features_Settings #cfgFarbaPozadia')[0].value);

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgFarbaOkraja',$('div.CSFD_Features_Settings #cfgFarbaOkraja')[0].value);
			$('#CSFD_Features_Tooltip').borderColor = $('div.CSFD_Features_Settings #cfgFarbaOkraja')[0].value;

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgPriehladnost',Math.floor($('div.CSFD_Features_Settings #cfgPriehladnost')[0].value*100));
			$('#CSFD_Features_Tooltip').opacity = $('div.CSFD_Features_Settings #cfgPriehladnost')[0].value;

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgTypPisma',$('div.CSFD_Features_Settings #cfgTypPisma')[0].value);
			$('#CSFD_Features_Tooltip').fontFamily = $('div.CSFD_Features_Settings #cfgTypPisma')[0].value;

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgVelkostPisma',$('div.CSFD_Features_Settings #cfgVelkostPisma')[0].value);
			$('#CSFD_Features_Tooltip').fontSize = $('div.CSFD_Features_Settings #cfgVelkostPisma')[0].value;

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgLogovanie',$('div.CSFD_Features_Settings #cfgLogovanie').is(':checked'));
			cfgLogovanie = $('div.CSFD_Features_Settings #cfgLogovanie').is(':checked');

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgZanerKrajina',$('div.CSFD_Features_Settings #cfgZanerKrajina').is(':checked'));
			cfgZanerKrajina = $('div.CSFD_Features_Settings #cfgZanerKrajina').is(':checked');

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgRezia',$('div.CSFD_Features_Settings #cfgRezia').is(':checked'));
			cfgRezia = $('div.CSFD_Features_Settings #cfgRezia').is(':checked');

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgHerci',$('div.CSFD_Features_Settings #cfgHerci').is(':checked'));
			cfgHerci = $('div.CSFD_Features_Settings #cfgHerci').is(':checked');

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgHerciObrazky',$('div.CSFD_Features_Settings #cfgHerciObrazky').is(':checked'));
			cfgHerciObrazky = $('div.CSFD_Features_Settings #cfgHerciObrazky').is(':checked');


			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgObsah',$('div.CSFD_Features_Settings #cfgObsah').is(':checked'));
			cfgObsah = $('div.CSFD_Features_Settings #cfgObsah').is(':checked');

			setTimeout(CSFD_Features_SetVal, 0, 'CSFD_Features.cfgReklama',$('div.CSFD_Features_Settings #cfgReklama').is(':checked'));
			cfgReklama = $('div.CSFD_Features_Settings #cfgReklama').is(':checked');

			$.modal.close();
			$('div.CSFD_Features_Settings').hide();
	});

	if (cfgLogovanie) {
		var log = document.createElement('div');
		log.style.position = 'absolute';
		log.style.top = '0px';
		log.style.left = '0px';
		document.body.appendChild(log);
		var pocet = 0;
		var start = new Date().getTime();
	}

	$('<div id="CSFD_info"></div>').prependTo('body').css({'position':'absolute', 'top':'20px', 'left':'0px'});

	$("<script type='text/javascript'>function isScrolledIntoView(elem) { var docViewTop = $(window).scrollTop(); var docViewBottom = docViewTop + $(window).height(); var elemTop = $(elem).offset().top; var elemBottom = elemTop + $(elem).height(); return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop)); } function CSFD_Features_SetPos(e) { $('#CSFD_Features_Tooltip').offset({top:$(e).offset().top+20, left:$(e).offset().left+20}); if (!isScrolledIntoView($('#CSFD_Features_Tooltip'))) { $('#CSFD_Features_Tooltip').offset({top:$(e).offset().top-20-$('#CSFD_Features_Tooltip').height(), left:$(e).offset().left+20}); } }</script>").prependTo('head');

	var filmy = new Array();
	var herci = new Array();

	function ZiskajPoziciu(oElement) {
		// ziska poziciu elementu na stranke

		var position = new Object;
		position.x = 0;
		position.y = 0;
		var iReturnValue = 0;
		while( oElement != null ) {
			position.x += oElement.offsetLeft;
			position.y += oElement.offsetTop;
			oElement = oElement.offsetParent;
		}
		return position;
	}

	function ZiskajLinky() {
		// ziska linky z aktualnej stranky

		var results = document.evaluate("//a[not(img)][contains(@href,'/film/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; i < results.snapshotLength; i++) {
			if (results.snapshotItem(i).parentNode.style.display != 'none') {
				filmy[i] = new Object;
				filmy[i].href = results.snapshotItem(i).href;
				filmy[i].elem = results.snapshotItem(i);
			}
		}

		var results = document.evaluate("//a[contains(@href,'/herec/')]|//a[contains(@href,'/reziser/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; i < results.snapshotLength; i++) {
			if (results.snapshotItem(i).parentNode.style.display != 'none') {
				herci[i] = new Object;
				herci[i].href = results.snapshotItem(i).href;
				herci[i].elem = results.snapshotItem(i);
			}
		}

	}

	function NacitajFilm(index) {
		// nacita stranku s filmom

		GM_xmlhttpRequest({
method: 'GET'
,url: filmy[index].href
,headers: {
	'User-agent': navigator.userAgent
	,'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}
,onload: function(responseDetails) {

var locText = responseDetails.responseText.match(/javascript['"]\s*>\s*location.replace\(['"].*?['"]\)/gi);
if (locText) {
	filmy[index].href = 'http://www.csfd.cz' + locText[0].toString().match(/\/[^'"]*/gi)[0].toString();
	NacitajFilm(index);
	return;
}

var doc = document.createElement('div');
doc.innerHTML = responseDetails.responseText;

filmy[index].hodnotenie = '';
var results = document.evaluate("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[starts-with(@style,'padding: 10px')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (results.snapshotLength != 0) {
			filmy[index].hodnotenie = results.snapshotItem(0).textContent.replace(/\s/g,'');
		}

filmy[index].obsah = '';
var results = document.evaluate("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/span/span/div[@style=starts-with(@style,'float: left')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (results.snapshotLength == 1) {
	filmy[index].obsah = results.snapshotItem(0).textContent.replace(/"/g,'&quot;').replace(/'/g,'&apos;').replace(/\n/g,'<br>');
}

filmy[index].zaner = '';
var results = document.evaluate("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/h1/following-sibling::b[1]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (results.snapshotLength == 1) {
	filmy[index].zaner = results.snapshotItem(0).innerHTML.replace(/"/g,'&quot;').replace(/'/g,'&apos;').replace(/\n/g,'<br>');
}

filmy[index].rezia = '';
var results = document.evaluate("//table[@id='hlavni_tabulka']/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/h1/following-sibling::b[2]/following-sibling::a[following-sibling::b]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < results.snapshotLength; i++) {
	filmy[index].rezia += ', ' + results.snapshotItem(i).textContent;
}
filmy[index].rezia = filmy[index].rezia.substring(2,filmy[index].rezia.length).replace(/"/g,'&quot;').replace(/'/g,'&apos;').replace(/\n/g,'<br>');

filmy[index].herci = '';
var results = document.evaluate("//table[@id='hlavni_tabulka']/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/h1/following-sibling::b[3]/following-sibling::a", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < results.snapshotLength; i++) {
	filmy[index].herci += ', ' + results.snapshotItem(i).textContent;
}
filmy[index].herci = filmy[index].herci.substring(2,filmy[index].herci.length).replace(/"/g,'&quot;').replace(/'/g,'&apos;').replace(/\n/g,'<br>');

if (filmy[index].hodnotenie != '') {
	var bold = document.createElement('b');
	bold.appendChild(document.createTextNode(' [' + filmy[index].hodnotenie + '] '));
	bold.style.color = 'green';
	filmy[index].elem.parentNode.insertBefore(bold, filmy[index].elem);
}

var pos = ZiskajPoziciu(filmy[index].elem);
filmy[index].elem.setAttribute('onmouseover',";var e=document.getElementById('CSFD_Features_Tooltip');e.innerHTML='" + (cfgZanerKrajina == true ? "<b>" + filmy[index].zaner + "</b><br><hr>" : '') + (cfgRezia == true ? "<b>Režie: </b>" + filmy[index].rezia + "<br>" : '') + (cfgHerci == true ? "<b>Hrají: </b>" + filmy[index].herci + "</b>" : '') + (cfgObsah == true ? "<hr><br>" + filmy[index].obsah : '') + "';e.style.visibility='visible';CSFD_Features_SetPos(this);");
filmy[index].elem.setAttribute('onmouseout',"var e=document.getElementById('CSFD_Features_Tooltip');e.style.visibility='hidden'");

if (cfgLogovanie) {
	log.innerHTML = (++pocet) + '/' + filmy.length;
	if (pocet == filmy.length) {
		var stop = new Date().getTime();
		log.innerHTML = log.innerHTML + ' (' + Math.round((stop - start) / 1000.0) + ' sec)';
	}
}
}
});
}

function UpravStranku() {
	// ziska data o filmoch a doplni ich na hlavnu stranku

	var toolTip = document.createElement('div');
	toolTip.id = 'CSFD_Features_Tooltip';
	toolTip.style.borderColor = cfgFarbaOkraja;
	toolTip.style.borderStyle = 'solid';
	toolTip.style.borderWidth = '1px';
	toolTip.style.maxWidth = cfgSirka;
	toolTip.style.maxHeight = cfgVyska;
	toolTip.style.backgroundColor = cfgFarbaPozadia;
	toolTip.style.opacity = cfgPriehladnost;
	toolTip.style.overflow = 'auto';
	toolTip.style.zIndex = '100';
	toolTip.style.visibility = 'hidden';
	toolTip.style.position = 'absolute';
	toolTip.style.padding = '5px';
	toolTip.style.fontFamily = cfgTypPisma;
	toolTip.style.fontSize = cfgVelkostPisma + 'px';
	toolTip.style.top = '10px';
	toolTip.style.left = '10px';
	toolTip.style.outlineStyle = 'outset';
	toolTip.style.outlineWidth = '1px';
	document.body.appendChild(toolTip);

	for (var i = 0; i < filmy.length; i++) {
		NacitajFilm(i);
	}

	if (cfgHerciObrazky == true) {
		for (var i = 0; i < herci.length; i++) {
			if ((!window.location.href.match(/herec|reziser/))
					|| (herci[i].href.substring(0, window.location.href.length) != window.location.href)) {
				herci[i].link = 'http://img.csfd.cz/photos/herci/' + herci[i].href.match(/\d+/)[0].toString() + '.jpg';
				var pos = ZiskajPoziciu(herci[i].elem);
				herci[i].elem.setAttribute('onmouseover',"var e=document.getElementById('CSFD_Features_Tooltip');e.style.top='" + (pos.y + 20) + "px';e.style.left='" + (pos.x + 20) + "px';e.innerHTML='<img src=" + herci[i].link + "></img>';e.style.opacity=1.0;e.style.visibility='visible'");
				herci[i].elem.setAttribute('onmouseout',"var e=document.getElementById('CSFD_Features_Tooltip');e.style.opacity=" + cfgPriehladnost + ";e.style.visibility='hidden'");
			}
		}
	}
}

ZiskajLinky();
UpravStranku();
}
