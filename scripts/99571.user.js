// ==UserScript==
// @name           Fhu Feliratkereso Myepisodes.com-hoz
// @namespace      http://freeforum.n4.hu/feliratok
// @description    Feliratkereso linket szur be a myepisodes.com-on listazott epizodok melle, az oldalon belul megjeleniti a talalatokat.
// @include        http://myepisodes.com/views.php*
// @include        http://www.myepisodes.com/views.php*
// @author         priv_sec
// @version        0.1.7
// ==/UserScript==

//Verzio
var version = '0.1.7';

// Ikon (nagyito)
// http://findicons.com/files/icons/2015/24x24_free_application/24/find.png
var srchImg = 'data:image/gif;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEX0lEQVQYGa3BW4hUdRzA8e/v/z+3' +
'mdlZZ3ds1c3RQlK6urormb2EhlqEFWW1G2VFUUkP+SBFJoEkUUhUdKELpD7UBl0UuocPoYVdXTEy' +
'2TXbWWt3Td2ZHedyzplz/vmwhEhMF/t8hNM8van3YgvWW7asVKIJdJImy0dpnRetXlh15zVP8S8I' +
'p3h8/at9JCfNtaeeg2Qn47k2pm6o+CG14gmkeJSZqXEQ3XPn3Sve5B8QJqxb8/xQ8/kXTs/Nu4jm' +
'pBDVY8IgJopjwgjCMOZEOWZ0eIxM6RBph+57V1/Xy98QTlqzelPftHmdczuWdGHFdY4WfAoFn7Na' +
'XZqbHCJjiI1QqQYUxuv0/1Km7cgebEt3PrBm5fc0YN13z5MrdVPT3MuuvhSiOuPjEZ4jtE9LMnVy' +
'kqNjNWZMTVE3UC47WLqCiQw/FM5lRnBwF5CkAVUtVW64ZPEiMmmNpYXWVpdsJkF7NkW5GtKStGhL' +
'WGRdRabJJtPs4SUV02dN4XjZJJ7YuPlcGlDlcuXm+YvmoCJIJxyaEw6plE06pWlyLCKErKNJOxaO' +
'BZ6rsC2hOWVTsVoIquFdNKBqfkAm7WBr8CxwNCQshQYyaYdYCftGylSDCBFFseRjKYXW4LqCX6vO' +
'ogHLD0I8wGhBIYAhMuDHMW2eRZSyGR4PGBgoUCrWmD41hYiglGAnHEq1mEasWhDiAcZSKECMEBqD' +
'iGK0WiflWsxoVUxptqi0pxjMj+OHBsfSFMbKRIHfTwPKxOzd23eQlKNJaIWnFY5W2EpwtVAK6xSC' +
'gOFCyGB+nGKpjudpQgMnBn/GD+pf04ASbTZseWk7CcDTgm0JtghKQAQEQYvGUoJYQjbrYNuawQO/' +
'Ujk2Wn5187oPaEDt/OK1d7/evefwtvd3I4AxYIzBGMDwp9hAwtGkkw7HinX6tr9DTTI38TcUJ7kJ' +
'd84jazfx2c592AKxUsRGiIwhjg2RifFcTUtLE8cKdd7c+CzT2s+m5+JvNh/awAYaECZ0dt42s1yu' +
'7py/oCP34KOrOG/2dKoG/Aj8Ovx+vMK2LZ/w5faPWLLsCpbPGWDKwGO4sxZwfN83b3U8yS38BeE0' +
'l8ztuTWs+RsTieTM2R0XQAwjv41QHD2Cbdtbli1fHHZl++6eMfIM59+/FdudxODHGxjZu6d30XNx' +
'N6cRGujo6FmoRGKl9di3327tZ8KuOzDzHnoOt/kcTBhgKsMc+vRFhn4c6L3ylbCbUwj/wYerdE5E' +
'5S+/fy1eZiYmCoiLAxzYsZ3DB4d7r3nd72aC8B+93WPnRMgvub0bd1IbJq5A6SD7d/bR31/sveWt' +
'WjcnCWdg6/VODi35q67tJJlNg64SnxhieP9vfP6d/uye9ypLhTP08lVeDi35FUsnk2oziDUKUcjI' +
'fotPv9I/WZyhez+qDQFSC47kl3XFufZZIToBJb/O8XpTu/A/Wr/Qy69c6OeGxjT7x3O8cXjxEeF/' +
'9nCXcyAGd4fcmg+C6MY/AHq4wkECy6zjAAAAAElFTkSuQmCC';

// Ikon (kereszt)
// http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/delete.png (modositott)
var closeImg = 'data:image/gif;base64,' +
'R0lGODlhEAAQANUAAPPz8/Ly8vHx8fDw8NnZ2djY2NTU1NPT06Ojo6KioqGhoaCgoJubm4iIiICA' +
'gH9/f319fXZ2dnV1dXJycnFxcWdnZ2VlZWNjY1hYWFVVVVJSUlFRUVBQUExMTEpKSkdHR0FBQT8/' +
'Pz4+Pjs7Ozk5OTc3NzY2NjU1NTMzMy4uLioqKicnJyQkJCMjIyEhISAgIB0dHRwcHBoaGhkZGRUV' +
'FRISEg4ODgsLCwgICAQEBP///wAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAQABAAAAaNQJ1w' +
'SCwOCSIMoIh8DAujVCqzFEKlEGFJxVVpArrCttvQcVZoNEdxSqMVukCnRa/bW5FhwPPq+/0SRQEf' +
'MYWGMRNGOgwzjY4zAkYGLDSVljQgkUMHLjWen58hmgcwNqanqDYjkTI3rq4VAiSvrhg6Fji5OBZC' +
'Aia6OAhCFzk5F0QDKMUJRBQORgMbC0JBADs=';

// Ikon (loader)
var loaderImg = 'data:image/gif;base64,' +
'R0lGODlhEAAQAIAAAAQCBPz+/CH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBgABACwAAAAAEAAQAAAC' +
'KIwfAMio2sxLcx4L6brZ9Qg+GyhZESSSqEmWo5oyr0hrHJ29dtzyRwEAIfkECQYAAQAsAAAAABAA' +
'EAAAAiiMj6kGsNwgdKdRZHFM+fmwfWC3RNalbKHIlCs5qed8Vib9xiOqrUYBACH5BAkGAAEALAAA' +
'AAAQABAAAAInjI+pBrDc4HGo0RpnTvf5rVhih42kFoGc5UEdW25wKqKBCa/06Z4FACH5BAkGAAEA' +
'LAAAAAAQABAAAAIpjI+pBsCNmgtQwjePzTLt5V1g1ImKRWVnN2Iq+LKkylYoltqvVo83UgAAIfkE' +
'CQYAAQAsAAAAABAAEAAAAiiMDwnHrauceRSlQB9bTrcffaJ2iVhUjqE5rSyYWlw7y9tFxrdu8kEB' +
'ACH5BAkGAAEALAAAAAAQABAAAAIpjA8Jx6H+HFM0wWWqjrXFbDWSSIJmSUHlha2nS35ICLazzWGy' +
'Z7s0UwAAIfkECQYAAQAsAAAAABAAEAAAAiaMDwnHof4aVHQiWuNMTVvJVCC0jZgXnou5jq4DeuiH' +
'XMZsv3lTAAAh+QQJBgABACwAAAAAEAAQAAACKIwfAMhpqtqLcMFT7UoRd3SBElONYChRaKN+5rS9' +
'GfnNZzx3a+i+ZgEAOw==';

// Aloldal
var siteType = '';
if (window.location.href.match(/type=(.*)&/))
	siteType = window.location.href.match(/type=(.*)&/)[1]
else if (window.location.href.match(/type=(.*)/))
	siteType = window.location.href.match(/type=(.*)/)[1]

// Beallitasok
function setPref(setName,defValue){
	if (GM_getValue(setName,0) == 0)
		GM_setValue(setName,defValue);
	return GM_getValue(setName);
}
// Mod beallitasa 
// (1 - talalatok uj fulon jelennek meg, 2 - talalatok az oldalon jelennek meg)
var mode = setPref('Mode',2);
// Hasznalando oldal
var siteURL = setPref('SiteURL','http://www.feliratok.info/');
// Keresomezo lathatosaga
var srchFVisible = setPref('SrchFVisible',2);
// Keresotabla magassagaganak osztoja
var rTableHeightQ = setPref('RTableHeightQ',3);
// Kereses egyszerre tobb epizodra
var srchMulti = setPref('SrchMulti',2);
// Javitando sorozatcimek
var corTitles = setPref('CorTitles','Mr. Sunshine (2011){#}Mr. Sunshine (2010)\nSherlock{#}Sherlock (2010)\nLuther{#}Luther (2010) (UK)\nCastle (2009){#}Castle\nChaos{#}Chaos (2011)\nCSI: Miami{#}C.S.I. Miami\nCSI: NY{#}C.S.I. NY\nCSI: Crime Scene Investigation{#}C.S.I.\nBar Karma{#}Bar Karma (aka. TV You Control: Bar Karma)\nSanctuary (US){#}Sanctuary\nThe Killing{#}The Killing (2011)\nSkins{#}Skins (UK)');
// Keresomezo mindig lathato
var pinSrchRow = setPref('PinSrchRow',1);
// Csak acquiredra pipalt elemek keresese Osszetett keresesnel
var aOnly = setPref('AOnly',1);
// Meg nem leadott epizodok atugrasa keresolinkek beszurasakor
var skipNotAvEps = setPref('SkipNotAvEps',1);
// Kereses nyelve
var srchLang = GM_getValue("SrchLang","Magyar");
// Jav. sc. tomb
var a,b,c;
var corTA = new Array();
a = corTitles.split(/\n/);
for (i=0;i<a.length;i++) {
	if (/{#}/.test(a[i]) === false)
		continue
	b = a[i].split(/{#}/);
	c = b[0];
	corTA[c] = b[1];
}

// Zaszlok
var flagList = 'Albán$albania|Angol$uk|Bolgár$bulgaria|Cseh$czech|Dán$denmark|Finn$finland|Francia$france|Héber$israel|Görög$greece|Holland$netherland|Horvát$croatia|Koreai$korea|Lengyel$poland|Magyar$hungary|Német$germany|Norvég$norway|Olasz$italy|Orosz$russia|Portugál$portugalia|Román$romania|Spanyol$spain|Svéd$sweden|Szerb$serbia|Szlovák$slovakia|Szlovén$slovenia|Török$turkey';
a = flagList.split(/\|/);
var flagA = new Array();
for (i=0;i<a.length;i++){
	b = a[i].split(/\$/);
	c = b[0];
	flagA[c] = b[1];
}

// Segedfuggvenyek
function correctEpTitle(EpTitle) {
	return ((/^undefined$/.test(corTA[EpTitle])) ? EpTitle : corTA[EpTitle]);
}
function replaceFlag(txtFlag){
	return ((/^undefined$/.test(flagA[txtFlag])) ? txtFlag : '<img src="' + siteURL + 'img/flags/' + flagA[txtFlag] + '.gif" alt="' + txtFlag + '" border="0" width="30" title="' + txtFlag + '" />');
}
function constructURL(epStr,sLang) {
	return siteURL + 'index.php?search=' + epStr.replace(/(\t|\%20)/g,"+") + '&nyelv=' + sLang + '&searchB=Mehet';
}
function dbyId(eId) {
	return document.getElementById(eId);
}
function dcE(eNm) {
	return document.createElement(eNm);
}
function hideSavedTxt() {
	stnTxtSaved.setAttribute("style","display:none");
}
function hideSrchDiv(bShow) {
	if (bShow == 'show') {
		srchDivInner.style.display = '';
		srchDiv.style.display = 'inline';
		srchA.style.display = 'inline';
		srchDiv.style.width = '100%';
	} else {
		srchDivInner.style.display = 'none';
		srchA.style.display = 'none';
		srchDiv.style.height = '';
		srchDiv.style.width = '';
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
if (mode == 2) {
	addGlobalStyle('tr#vilagit:hover { color:#999 ! important; }');	
}
function isAcquired(obj) {
	var z, a;
	a = obj.parentNode.parentNode.getElementsByTagName('input');
	for (z=0;z<a.length;z++) {
		if (a[z].parentNode.getAttribute('class') == 'status' && /^A(.*?)$/.test(a[z].id) === true && a[z].checked === true)
			return true;
	}
	return false;
}
function exAquired() {
	var isChecked = document.getElementsByTagName('input');
	for (i=0;i<isChecked.length;i++){
		if (isChecked[i].getAttribute('type') != 'checkbox' || isChecked[i].getAttribute('class') != 'FhuMultiCheck' || isChecked[i].id == 'FhuMultiCheckAll')
			continue
		if (isChecked[i].checked === true && isAcquired(isChecked[i]) === true) {
			return true;
		}				
	}
	return false;
}
function isCheckedMS() {
	var isChecked = document.getElementsByTagName('input');
	for (i=0;i<isChecked.length;i++){
		if (isChecked[i].getAttribute('type') != 'checkbox' || isChecked[i].getAttribute('class') != 'FhuMultiCheck' || isChecked[i].id == 'FhuMultiCheckAll')
			continue
		if (isChecked[i].checked === true) {
			return true;
		}				
	}
	return false;
}
function checkAllMS(checkAll) {
	isChecked = document.getElementsByTagName('input');
	for (i=0;i<isChecked.length;i++){
		if (isChecked[i].getAttribute('type') != 'checkbox' || isChecked[i].getAttribute('class') != 'FhuMultiCheck')
			continue
	if (checkAll === true || (aOnly == 2 && isAcquired(isChecked[i]) === false))
		isChecked[i].checked = false;
	else 
		isChecked[i].checked = true;
	}
}	

// Beallitasok UI
var stnTxtSaved;
function addSettingsUI() {
	stnFont = "font-size: xx-small; font-family: Verdana,Arial,Helvetica,Geneva,Swiss,Sans-Serif; clear: both;"
	stnDiv = dcE('div');
	stnDiv.setAttribute('align','center');
	stnDiv.setAttribute('style', stnFont + ' background:#FFF');
	stnTxtSaved = dcE('div');
	stnTxtSaved.id = "FhuSettingsUITxtSaved";
	stnTxtSaved.setAttribute("style","display:none");
	stnTxtSaved.innerHTML = '<br><span style="color:#FF0000">(elmentve)<span>';
	stnA = dcE('a');
	stnA.innerHTML = 'Fhu Feliratkereső Beállítások';
	stnA.id = 'FhuSettingsUI';
	stnA.href = 'javascript:void(0);';
	stnInnerDiv = dcE('div');
	stnInnerDiv.align = 'center';
	stnInnerDiv.style.display = 'none';
	stnInnerDiv.style.width = '50%';
	stnInnerDiv.innerHTML = '<form action="javascript:void(0);" id="FhuSettingsUIForm" style="width:40%;text-align:left;line-height:35px">' +
	'<label style="'+ stnFont +';float:left" for="FhuSettingsUICheck">Keresés új ablakban:</label>' +
	'<div style="float:right"><input type="checkbox" id="FhuSettingsUICheck" value="Keresés új ablakban"></div><br>' +
	'<label style="'+ stnFont +';float:left" for="FhuSettingsUICheck2">Keresőmező megjelenítése:</label>' +
	'<input type="checkbox" id="FhuSettingsUICheck2" value="Keresőmező megjelenítése:" style="float:right"><br>' +
	'<label style="'+ stnFont +';float:left" for="FhuSettingsUICheck4">Keresőmező mindig látható:</label>' +
	'<input type="checkbox" id="FhuSettingsUICheck4" value="Keresőmező mindig látható:" style="float:right"><br>' +
	'<label style="'+ stnFont +';float:left" for="FhuSettingsUICheck3">Keresés több epizódra:</label>' +
	'<input type="checkbox" id="FhuSettingsUICheck3" style="float:right"><br>' +
	'<label style="'+ stnFont +';float:left" for="FhuSettingsSelect">Használt oldal:</label>' +
	'<select id="FhuSettingsSelect" style="float:right"><option class="FhuSettingsUISel">http://feliratok.ro.lt/</option><option class="FhuSettingsUISel">http://feliratok.na.tl/</option><option class="FhuSettingsUISel">http://feliratok.hs.vc/</option><option class="FhuSettingsUISel">http://www.feliratok.info/</option></select><br>' +
	'<label style="'+ stnFont +';float:left" for="FhuSettingsSelect2">Keresőtábla magassága:<br>(ablak magassága / megadott szám)</label>' +
	'<select id="FhuSettingsSelect2" style="float:right"><option class="FhuSettingsUISel2">2</option><option class="FhuSettingsUISel2">3</option><option class="FhuSettingsUISel2">4</option><option class="FhuSettingsUISel2">5</option></select><br>' +
	'<label style="'+ stnFont +';float:left" for="FhuSettingsSelect3">Keresés nyelve:</label>' +
	'<select id="FhuSettingsSelect3" style="float:right"><option class="FhuSettingsUISel3"></option></select><br>' +
	'<a id="FhuSettingsUIAdv" href="javascript:void(0);" style="'+ stnFont +';display:block">Haladó beállítások</a>' +
	'<div id="FhuSettingsUIDivAdv" style="display:none">' +
	'<label style="'+ stnFont +';float:left" for="FhuSettingsUICheck5">Csak (A)-pipások az Összetett keresésben:</label>' +
	'<input type="checkbox" id="FhuSettingsUICheck5" style="float:right"><br>' +
	'<label style="'+ stnFont +';float:left" for="FhuSettingsUICheck6">Még nem elérhető epizódok átugrása:</label>' +
	'<input type="checkbox" id="FhuSettingsUICheck6" style="float:right"><br>' +
	'<label style="'+ stnFont +'" for="FhuSettingsUITxt">Javított címek, formátum: Régicím{#}Újcím</label>' +
	'<textarea id="FhuSettingsUITxt" rows="10" style="width:100%" wrap="off">' + corTitles + '</textarea>' +
	'<br></div>' +
	'<a href="http://userscripts.org/scripts/show/99571" style="'+ stnFont +'" target="_blank">Segítség</a>' +
	'<input id="FhuSettingsUISubmit" type="submit" value="Mentés" default="default" style="float:right">' +
	'<br><div style="font-size:xx-small">v' + version + '</div><a href="#" id="scrBottom"></a></form>';
	stnDiv.appendChild(stnA);
	stnDiv.appendChild(stnTxtSaved);
	stnDiv.appendChild(stnInnerDiv);
	dbyId('divContainer').appendChild(stnDiv);
	stnChk = dbyId('FhuSettingsUICheck');
	stnChk2 = dbyId('FhuSettingsUICheck2');
	stnChk3 = dbyId('FhuSettingsUICheck3');
	stnChk4 = dbyId('FhuSettingsUICheck4');
	stnChk5 = dbyId('FhuSettingsUICheck5');
	stnChk6 = dbyId('FhuSettingsUICheck6');
	stnF = dbyId('FhuSettingsUIForm');
	stnAAdv = dbyId('FhuSettingsUIAdv');
	stnDivAdv = dbyId('FhuSettingsUIDivAdv');
	stnTxtAdv = dbyId('FhuSettingsUITxt');
	stnSubmit = dbyId('FhuSettingsUISubmit');
	stnChk.checked = (mode == 2 ? false : true);
	stnChk2.checked = (srchFVisible == 1 ? false : true);
	stnChk3.checked = (srchMulti == 1 ? false : true);
	stnChk4.checked = (pinSrchRow == 1 ? false : true);
	stnChk5.checked = (aOnly == 1 ? false : true);
	stnChk6.checked = (skipNotAvEps == 1 ? false : true);
	stnSelect = dbyId('FhuSettingsSelect');
	stnSelect2 = dbyId('FhuSettingsSelect2');
	stnSelect3 = dbyId('FhuSettingsSelect3');
	if (mode == 1) {
		stnChk2.disabled = 'disabled';
		stnChk3.disabled = 'disabled';
		stnChk4.disabled = 'disabled';
		stnChk5.disabled = 'disabled';
		stnSelect2.disabled = 'disabled';
	}
	a = flagList.split(/\|/);
	for (i=0;i<a.length;i++){
		b = a[i].split(/\$/);
		c = dcE('option');
		c.setAttribute('class','FhuSettingsUISel3');
		c.innerHTML = b[0];
		if (b[0] == srchLang)
			c.setAttribute('selected','selected');
		stnSelect3.appendChild(c);
	}
	for (i=0;i<8;i++) {
		if (stnF.getElementsByTagName('option')[i].innerHTML == siteURL)
			stnF.getElementsByTagName('option')[i].setAttribute('selected','selected');
		else if (stnF.getElementsByTagName('option')[i].innerHTML == rTableHeightQ && i >= 4)
			stnF.getElementsByTagName('option')[i].setAttribute('selected','selected');
	}
	//kattintaskor megjeleniti a beallitasokat
	stnA.addEventListener('click', function(event) { 
		if (stnInnerDiv.style.display == "none") {
			stnInnerDiv.style.display = "inline";
			stnDiv.style.background = "#E6E6E6";
			dbyId("scrBottom").focus();
		} else {
			hideSavedTxt();
			stnInnerDiv.style.display = "none";
			stnDiv.style.background = "#FFF";
		}
	}, true );
	stnAAdv.addEventListener('click', function(event) { 
		if (stnDivAdv.style.display == "none") {
			stnDivAdv.style.display = "inline";
			dbyId("scrBottom").focus();
		} else {
			stnDivAdv.style.display = "none";
		}
	}, true );
	//kattintaskor megvaltozatja a beallitasokat
	stnF.addEventListener('click', function(event) { 
		if (event.target == stnSubmit) {
			GM_setValue("SiteURL",stnSelect.value);
			GM_setValue("Mode",(stnChk.checked === false ? 2 : 1));
			GM_setValue("SrchFVisible",(stnChk2.checked === false ? 1 : 2));
			GM_setValue("SrchMulti",(stnChk3.checked === false ? 1 : 2));
			GM_setValue("PinSrchRow",(stnChk4.checked === false ? 1 : 2));
			GM_setValue("AOnly",(stnChk5.checked === false ? 1 : 2));
			GM_setValue("SkipNotAvEps",(stnChk6.checked === false ? 1 : 2));
			GM_setValue("CorTitles",stnTxtAdv.value);
			GM_setValue("RTableHeightQ",stnSelect2.value);
			GM_setValue("SrchLang",stnSelect3.value);
			srchLang = stnSelect3.value;
			stnTxtSaved.style.display = 'inline';
			window.setTimeout(hideSavedTxt,1500);
		}
	}, false );
}
addSettingsUI();

// Keresotabla az ablak aljan
var srchDivMS, srchDiv, srchDivInner, srchSrchDiv, srchMSIndicator, srchA, srchTable, srchTr, srchTd, srchSrchInput, srchSrchBtn, srchSrchSBtn, srchSrchSelect;
function createResultsTable() { 
	srchDivMS = dcE('div');
	srchDivMS.setAttribute('style','height:30px;position:fixed;top:0;right:0;display:none;text-align:right');
	srchDivMS.innerHTML = '<img src="' + srchImg + '" style="border:none;padding:10px;cursor:pointer" width="32" height="32" id="FhusrchDivTB">';
	dbyId('myepisodes_views').appendChild(srchDivMS);
	srchDiv = dcE('div');
	srchDiv.id = 'FhusrchDiv';
	srchDiv.setAttribute('style','height:200px;width:100%;position:fixed;bottom:0;left:0;display:none');
	srchDivInner = dcE('div');
	srchDivInner.setAttribute('style','overflow:auto;height:100%;width:100%;background-color:#FFF;border-top:solid #666 1pt;');
	srchSrchDiv = dcE('div');
	srchSrchDiv.setAttribute('style','float:left'); 
	if (srchFVisible == 1)
		srchSrchDiv.style.display = 'none';
	srchSrchDiv.innerHTML = '<form action="javascript:void(0);" id="FhuSrchForm"><input id="FhuSrchInput" type="text" size="30"><input id="FhuSrchBtn" type="submit" value="Keresés" default="default"><input id="FhuSrchSBtn" type="submit" value="Évad"><select id="FhuSrchSelect"><option class="FhuSrchSel"></option></select></form>';
	srchMSIndicator = dcE('img');
	srchMSIndicator.src = loaderImg;
	srchMSIndicator.setAttribute('style','display:none;float:left');
	srchA = dcE('a');
	srchA.href = 'javascript:void(0);';
	srchA.id = 'FhuHideFhusrchDiv';
	srchA.innerHTML = '<img src="' + closeImg + '" height="20" width="20" border="0" id="FhuHideFhusrchDiv">';
	srchA.setAttribute('style','float:right;font-weight:bold;text-decoration:none;font-size:1.2em');
	srchTable = dcE('table');
	srchTable.setAttribute('width','100%');
	srchTr = dcE('tr');
	srchTd = dcE('td');
	srchTd.setAttribute('width','100%');
	srchDiv.appendChild(srchSrchDiv);
	srchDiv.appendChild(srchMSIndicator);
	srchDiv.appendChild(srchA);
	srchDiv.appendChild(srchDivInner);
	srchDivInner.appendChild(srchTable);
	srchTable.appendChild(srchTr);
	srchTr.appendChild(srchTd);
	dbyId('myepisodes_views').appendChild(srchDiv);
	srchSrchInput = dbyId('FhuSrchInput');
	srchSrchBtn = dbyId('FhuSrchBtn');
	srchSrchSBtn = dbyId('FhuSrchSBtn');
	srchSrchSBtn.setAttribute('disabled','disabled');
	srchSrchSelect = dbyId('FhuSrchSelect');
	a = flagList.split(/\|/);
	for (i=0;i<a.length;i++){
		b = a[i].split(/\$/);
		c = dcE('option');
		c.setAttribute('class','FhuSrchSel');
		c.innerHTML = b[0];
		if (b[0] == srchLang)
			c.setAttribute('selected','selected');
		srchSrchSelect.appendChild(c);
	}
	if (pinSrchRow == 2) {
		hideSrchDiv();
		srchDiv.style.display = 'inline';
	}	
	srchSrchForm = dbyId('FhuSrchForm');
	srchSrchForm.addEventListener('click', function(event) {
		if (event.target.id == "FhuSrchBtn") {
			if (srchSrchInput.value != "(Összetett keresés)" && srchSrchInput.value != "") {
				srchLang = srchSrchSelect.value;
				doSearch(constructURL(encodeURI(srchSrchInput.value),srchSrchSelect.value),srchSrchInput.value);
			} else if (srchMulti == 2) {
				if (srchDivMS.style.display != 'inline') {
					checkAllMS(false);
					srchDivMS.style.display = 'inline';
				}
				srchLang = srchSrchSelect.value;
				doMultiSearch();
			}
		} else if (event.target.id == "FhuSrchSBtn") {
			doSearch(constructURL(encodeURI(srchSrchSBtn.getAttribute('episode')),srchSrchSelect.value),srchSrchSBtn.getAttribute('episode'));
			srchLang = srchSrchSelect.value;
		}
	}, false);
}
if (mode == 2)
	createResultsTable();
	
// Keresesi talalatok kodjat rakja rendbe
function processResults(resultObj,prcMode) { 
	resultObj.removeChild(resultObj.getElementsByTagName('tr')[0]);	
	if (prcMode != 'multi') {
		var prcHeadA = resultObj.getElementsByTagName('thead')[0].getElementsByTagName('a');
		for (var i=0;i<prcHeadA.length;i++) {
			prcHeadA[i].setAttribute('link',prcHeadA[i].href.replace(/http(?:.?)\:\/\/(.*?)\//,siteURL));
			prcHeadA[i].href = "javascript:void(0);";
			prcHeadA[i].getElementsByTagName('img')[0].src = prcHeadA[i].getElementsByTagName('img')[0].src.replace(/http(?:.?)\:\/\/(.*?)\//,siteURL);
			prcHeadA[i].getElementsByTagName('img')[0].id = "FhuOrder";
		}
	} else {
		var prcTbody = dcE('tbody');
	}
	var prcBodyTr = resultObj.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	resultObj.getElementsByTagName('tbody')[0].removeChild(prcBodyTr[prcBodyTr.length-1]);

	for (var i=0;i<prcBodyTr.length;i++) {
		if (prcBodyTr[i].id != "vilagit")
			continue;
		var prcBodyTrA = prcBodyTr[i].getElementsByTagName('a'); // linkek
		var _l = prcBodyTrA.length-1; // utolso link
		if (prcMode != 'multi'){ // sima kereses
			prcBodyTrA[_l].href = prcBodyTrA[_l].href.replace(/http(?:.?)\:\/\/(.*?)\//,siteURL);
			prcBodyTrA[_l].setAttribute('style','cursor:default');
			prcBodyTrA[_l].getElementsByTagName('img')[0].setAttribute('style','cursor:pointer');
			prcBodyTrA[_l].getElementsByTagName('img')[0].src = prcBodyTrA[_l].getElementsByTagName('img')[0].src.replace(/http(?:.?)\:\/\/(.*?)\//,siteURL);
			for (k=0;k<prcBodyTrA.length;k++) {
					prcBodyTrA[k].href = prcBodyTrA[_l].href;
			}
			var prcBodyTrTd = prcBodyTr[i].getElementsByTagName('td');
			for(k=0;k<prcBodyTrTd.length;k++){
				prcBodyTrTd[k].removeAttribute('onclick');
				prcBodyTrTd[k].removeAttribute('onmouseover');
				if (/^\s*<small>(.*?)<\/small>\s*$/.test(prcBodyTrTd[k].innerHTML) === true) {
					prcBodyTrTd[k].innerHTML = prcBodyTrTd[k].innerHTML.replace(/(\r\n|\n|\r|\t)/gm,"");
					prcBodyTrTd[k].innerHTML = replaceFlag(prcBodyTrTd[k].innerHTML.replace(/<small>(.*?)<\/small>/,"$1"));
				}
			}
			prcBodyTr[i].innerHTML = prcBodyTr[i].innerHTML.replace(/sorozat_cat\.php/,siteURL + "sorozat_cat.php");
			prcBodyTr[i].setAttribute('link',prcBodyTrA[_l].href); // kattinthato sorok
			prcBodyTr[i].setAttribute('style', prcBodyTr[i].getAttribute('style') + ';cursor:pointer'); // kattinthato sorok
		} else { // kereses egyszerre tobb epizodra
			prcTr = dcE('tr');
			prcTd1 = dcE('td');
			prcTd2 = dcE('td');
			prcTd2.style.width = '50px';
			prcTd2.align = 'left';
			prcBodyTrTd = prcBodyTr[i].getElementsByTagName('td');
			if (prcBodyTrTd[1].getAttribute('class') == 'lang')
				prcTd1.innerHTML = prcBodyTrTd[2].getElementsByTagName('div')[1].innerHTML;
			else
				prcTd1.innerHTML = prcBodyTrTd[1].innerHTML;
			if (prcTd1.getElementsByTagName('a').length > 0) {
				prcTd1.getElementsByTagName('a')[0].href = prcBodyTr[i].getElementsByTagName('a')[2].href.replace(/http(?:.?)\:\/\/(.*?)\//,siteURL);
				prcTd1.getElementsByTagName('a')[0].target = "_self";
			} else {
				prcTd1A = dcE('a');
				prcTd1A.href = prcBodyTrA[_l].href.replace(/http(?:.?)\:\/\/(.*?)\//,siteURL);
				prcTd1A.target = '_self';
				prcTd1A.innerHTML = prcTd1.innerHTML;
				prcTd1.innerHTML = "";
				prcTd1.appendChild(prcTd1A);
			}		
			for(k=0;k<prcBodyTrTd.length;k++){
				if (/^\s*<small>(.*?)<\/small>\s*$/.test(prcBodyTrTd[k].innerHTML) === true) {
					prcTd2.innerHTML = prcBodyTrTd[k].innerHTML.replace(/(\r\n|\n|\r|\t)/gm,"");
					prcTd2.innerHTML = replaceFlag(prcTd2.innerHTML.replace(/<small>(.*?)<\/small>/,"$1")); 
				}
			}
			prcTr.appendChild(prcTd2);
			prcTr.appendChild(prcTd1);
			prcTbody.appendChild(prcTr);
		}
	}
	// kattinhato sorok
	if (prcMode != 'multi') {
		resultObj.getElementsByTagName('tbody')[0].addEventListener("click",function(event){
			if (event.target.parentNode.id == "vilagit")
				window.open(event.target.parentNode.getAttribute('link'),"_self");
			else if (event.target.parentNode.parentNode.id == "vilagit" && event.target.tagName != "A")
				window.open(event.target.parentNode.parentNode.getAttribute('link'),"_self");
		}, false);
	}
	return (prcMode == 'multi' ? prcTbody : resultObj);
}

// Kereseskor frissiti az ablakot
function doSearch(searchStr,epStr) { 
	if (pinSrchRow == 2)
		hideSrchDiv('show');
	else 
		srchDiv.style.display = 'inline';
	//keresotabla autom. armeretezese minden kereseskor
	srchDiv.style.height = (window.innerHeight)/rTableHeightQ + 'px'; 
	srchDivInner.style.height = ((window.innerHeight)/rTableHeightQ)-20 + 'px';
	srchMSIndicator.style.display = 'inline'; //loader kep
	srchTd.innerHTML = ""; //elozo talalatok torlese
	dbyId('FhuSrchInput').value = epStr;
	//evad gomb aktivalasa
	if (/ - \d+x\d+/.test(epStr) === true) {
		var cT = epStr.split(/ - /);
		var d = cT[1].split(/x/);
		srchSrchSBtn.setAttribute('episode',cT[0] + " (Season " + d[0] + ")");
		srchSrchSBtn.removeAttribute('disabled');
	} else {
		srchSrchSBtn.setAttribute('disabled','disabled');
	}
	srchSrchSBtn.focus();
	GM_xmlhttpRequest({
			method: 'GET',
			url: searchStr,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html,application/xhtml+xml,application/xml;',
			},
			onload: function(responseDetails) {
				//szoveges talalatot dom objektumma alakitja
				var doc = dcE('div');
				doc.innerHTML = responseDetails.responseText;
				//tablazat a kereses eredmenyevel
				var rsltTable = dcE('table');
				var rsltTbody = doc.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
				if (rsltTbody.getElementsByTagName('tbody').length == 0) {
					rsltTable.align = 'center';
					rsltTable.style.height = (window.innerHeight)/rTableHeightQ-40 + 'px';
					rsltTable.innerHTML = '<tr><td width="100%" align="center">Nincs találat.</td></tr>';
				} else {
					rsltTable.appendChild(processResults(rsltTbody));
				}
				rsltTable.setAttribute('width','100%');
				srchTd.innerHTML = "";
				srchTd.appendChild(rsltTable);
				srchMSIndicator.style.display = 'none';
			}
	});
}

var _ctr, _ctri;
function doMultiSearch() {
	if (aOnly == 2 && exAquired() === false) {
		alert('Hiba: Nincs (A)-pipás epizód.\n\nJelenleg csak (A)-pipás epizódok között lehet keresni Összetett keresésnél.\n(Megváltoztatható a lap alján a Beállításokban.)')
		return
	}
	_ctr = _ctri = 0;
	isChecked = document.evaluate("//input[@class='FhuMultiCheck']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	srchMSIndicator.style.display = 'inline';
	srchDiv.style.height = (window.innerHeight)/rTableHeightQ + 'px'; 
	srchDivInner.style.height = ((window.innerHeight)/rTableHeightQ)-20 + 'px';
	for (i=0;i<isChecked.snapshotLength;i++) {
		cItem = isChecked.snapshotItem(i);
		if (cItem.id == 'FhuMultiCheckAll' || (aOnly == 2 && isAcquired(cItem) != true))
			continue
		if (cItem.checked === true) {
			_ctr++;
			if (pinSrchRow == 2)
				hideSrchDiv('show');
			else 
				srchDiv.style.display = 'inline';
			//keresotable autom. armeretezese minden kereseskor
			srchDiv.style.height = (window.innerHeight)/rTableHeightQ + 'px'; 
			srchTd.innerHTML = "";
			dbyId('FhuSrchInput').value = '(Összetett keresés)';
			srchSrchSBtn.setAttribute('disabled','disabled');
			GM_xmlhttpRequest({
					method: 'GET',
					url: cItem.getAttribute('link').replace(/\&nyelv=(.*?)\&/,'&nyelv=' + srchLang + '&'),
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'text/html,application/xhtml+xml,application/xml;',
					},
					onload: function(responseDetails) {
						//szoveges talalatot dom objektumma alakitja
						var doc = dcE('div');
						doc.innerHTML = responseDetails.responseText;
						//tablazat a kereses eredmenyevel
						var rsltTbody = doc.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
						if (rsltTbody.getElementsByTagName('tbody').length != 0) {
							var rsltTable = dcE('table');
							rsltTable.appendChild(processResults(rsltTbody,'multi'));
							rsltTable.setAttribute('width','100%');
							rsltTable.height = (window.innerHeight)/rTableHeightQ-20 + 'px';
							rsltTable.setAttribute('style','margin:5px 0 5px 0');
							srchTd.appendChild(rsltTable);
						}
						_ctri++;
						if (_ctri >= _ctr){
						srchMSIndicator.style.display = 'none';
							norsltDiv = dcE('div');
							norsltDiv.innerHTML = '<table height="' + ((window.innerHeight)/rTableHeightQ-40) + 'px" align="center"><tr><td width="100%" align="center">Nincs találat.</td></tr></table>';
							srchTd.innerHTML = (srchTd.innerHTML == "" ? norsltDiv.innerHTML : srchTd.innerHTML);
						}	
					}
			});
		}
	}
}

// Keresoikonokra kattintaskor elinditja a keresest
if (mode == 2) {
	document.addEventListener('click', function(event) { 
		if (event.target.id == 'FhuMultiCheckAll') {
			checkAllMS(isCheckedMS());
			srchSrchBtn.focus();
		}
		if (event.target.getAttribute('id') == "FhuSubdl" || event.target.getAttribute('id') == "FhuOrder") {
			srchLang = srchSrchSelect.value;
			srchLink = event.target.parentNode.getAttribute('link');
			srchLink = ((/\&nyelv=(.*?)\&/.test(srchLink) === false) ? srchLink + "&nyelv=" + srchLang : srchLink.replace(/\&nyelv=(.*?)\&/,'&nyelv=' + srchLang + '&'))
			doSearch(srchLink,event.target.parentNode.getAttribute('episode'));
		} else if (event.target.id == "FhuHideFhusrchDiv") {
			if (pinSrchRow == 2) {
				hideSrchDiv();
			} else {
				srchDiv.style.display = 'none';
			}
		} else if (event.target.getAttribute('class') == 'FhuMultiCheck') {
			iC = isCheckedMS();
			srchDivMS.style.display = (iC === true ? 'inline' : 'none');
			if (srchDiv.style.display == 'inline');
				srchSrchInput.value = (iC === true ? '(Összetett keresés)' : '')
			srchSrchBtn.focus();
		} else if (event.target.getAttribute('id') == 'FhusrchDivTB') {
			srchLang = srchSrchSelect.value;
			doMultiSearch();
		}
	}, true );
}

// Hozzaadja a keresoikonokat az epizodokhoz
var mylistTable, episodeTr, epTitle, epNr, epNewTh, epNewTd, epNewTdA;
function addSearchButtons() {
	mylistTable = document.evaluate(
		"//table[@class='mylist']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	episodeTr = mylistTable.snapshotItem(0).getElementsByTagName('tbody')[0].childNodes;
	// fejlechez ket mezo hozzaadasa
	nrTd = (siteType == 'epsbyshow' || siteType == 'quickcheck' ? 6 : 7)
	epNewTh = dcE('th');
	epNewTh.innerHTML = "Felirat";
	if (skipNotAvEps != 2)
		episodeTr[0].appendChild(epNewTh);
	else	
		episodeTr[0].insertBefore(epNewTh,episodeTr[0].getElementsByTagName('th')[nrTd-2]);
	if (srchMulti == 2 && mode == 2) {
		epNewTh2 = dcE('th');
		if (siteType != 'epsbyshow' && siteType != 'quickcheck')
			epNewTh2.innerHTML = '<div class="subtitles_ms"><input class="FhuMultiCheck" id="FhuMultiCheckAll" type="checkbox" style="background:#000"></div>';
		if (skipNotAvEps != 2)
			episodeTr[0].appendChild(epNewTh2);
		else
			episodeTr[0].insertBefore(epNewTh2,episodeTr[0].getElementsByTagName('th')[nrTd-1]);
	}
	// keresolinkek hozzaadasa
	for (i=2;i<episodeTr.length;i++) { //fejlecet atugorjuk 
		if (episodeTr[i].nodeType != 3 && /^header$/.test(episodeTr[i].getAttribute('class')) === true) {	
			if (skipNotAvEps != 2) {
				episodeTr[i].appendChild(dcE('th'));
				if (srchMulti == 2 && mode == 2)
					episodeTr[i].appendChild(dcE('th'));
			} else {
				episodeTr[i].insertBefore(dcE('th'),episodeTr[i].getElementsByTagName('th')[1]);
				if (srchMulti == 2 && mode == 2)
					episodeTr[i].insertBefore(dcE('th'),episodeTr[i].getElementsByTagName('th')[2]);
			}
		}
		if (episodeTr[i].nodeType == 3 || /^Episode(.*?)$/.test(episodeTr[i].getAttribute('class')) === false ) //text node-okat atugorjuk
			continue
		//sorozat cime, evad es epizod
		for (var k=0;k<episodeTr[i].getElementsByTagName('td').length;k++) {
			if (episodeTr[i].getElementsByTagName('td')[k].getAttribute('class') == "showname") {
				epTitle = correctEpTitle(episodeTr[i].getElementsByTagName('td')[k].innerHTML.replace(/<(.*?)>/g,""));
			} else if (episodeTr[i].getElementsByTagName('td')[k].getAttribute('class') == "longnumber") {
				epNr = episodeTr[i].getElementsByTagName('td')[k].innerHTML.replace(/<(.*?)>/g,"");
			}
		}
		if (epNr.substring(0,1) == "0") //elso nullat az evadszambol levagja, ha van: 02x01 --> 2x01
			epNr = epNr.substring(1,epNr.length);
		//keresolink beszurasa
		if ((/^Episode_(One|Two)$/.test(episodeTr[i].getAttribute('class')) === false  || skipNotAvEps != 2) || (siteType == 'epsbyshow' || siteType == 'quickcheck')) {
		epNewTd = dcE('td');
			epNewTd.setAttribute('class','subtitles');
			epNewTd.setAttribute('align','center');
			epNewTdA = dcE('a');
			if (mode == 1) {
				epNewTdA.setAttribute('href',siteURL + 'index.php?search=' + encodeURI(epTitle) + ' - ' + epNr + '&searchB=Mehet');
				epNewTdA.setAttribute('href',constructURL(encodeURI(epTitle) + '%20-%20' + epNr,srchLang));
				epNewTdA.setAttribute('target','kereses');
			} else {
				epNewTdA.setAttribute('link',constructURL(encodeURI(epTitle) + '%20-%20' + epNr,""));
				epNewTdA.setAttribute('href','javascript:void(0);');
				epNewTdA.setAttribute('episode',epTitle + ' - ' + epNr);
			}
			epNewTdA.innerHTML = '<img src="' + srchImg + '" style="border:none" width="16" height="16" id="FhuSubdl">';
			epNewTd.appendChild(epNewTdA);
		} 
		if (skipNotAvEps != 2)
			episodeTr[i].appendChild(epNewTd);
		else if ((((/^Episode_(One|Two)$/.test(episodeTr[i].getAttribute('class')) === false && (siteType != 'epsbyshow' && siteType != 'quickcheck')) || (siteType == 'epsbyshow' || siteType == 'quickcheck')) && skipNotAvEps == 2))
			episodeTr[i].insertBefore(epNewTd,episodeTr[i].getElementsByTagName('td')[nrTd-2]);
		else if ((/^Episode_(One|Two)$/.test(episodeTr[i].getAttribute('class')) === true && (siteType != 'epsbyshow' && siteType != 'quickcheck') && skipNotAvEps == 2))
			episodeTr[i].getElementsByTagName('td')[4].setAttribute('colspan','2');		

		//checkbox hozzaadasa, egyszerre tobb epizodra valo kereseshez 
		if (srchMulti == 2 && mode == 2) {
			if ((/^Episode_(One|Two)$/.test(episodeTr[i].getAttribute('class')) === false  || skipNotAvEps != 2) || (siteType == 'epsbyshow' || siteType == 'quickcheck')) {
				epNewTdMS = dcE('td');
				epNewTdMS.setAttribute('class','subtitles_ms');
				epNewTdMS.align = "center";
				epNewChkMS = dcE('input');
				epNewChkMS.setAttribute('type','checkbox');
				epNewChkMS.setAttribute('style','width:20px');
				epNewChkMS.setAttribute('class','FhuMultiCheck');
				epNewChkMS.setAttribute('link',constructURL(encodeURI(epTitle) + '%20-%20' + epNr,""));
				epNewChkMS.setAttribute('episode',epTitle + ' - ' + epNr);
				epNewTdMS.appendChild(epNewChkMS);
			} 
			if (skipNotAvEps != 2)
				episodeTr[i].appendChild(epNewTdMS);	
			else if ((((/^Episode_(One|Two)$/.test(episodeTr[i].getAttribute('class')) === false && (siteType != 'epsbyshow' && siteType != 'quickcheck')) || (siteType == 'epsbyshow' || siteType == 'quickcheck')) && skipNotAvEps == 2))
				episodeTr[i].insertBefore(epNewTdMS,episodeTr[i].getElementsByTagName('td')[nrTd-1]);
			else if ((/^Episode_(One|Two)$/.test(episodeTr[i].getAttribute('class')) === true && (siteType != 'epsbyshow' && siteType != 'quickcheck') && skipNotAvEps == 2))
				episodeTr[i].getElementsByTagName('td')[nrTd-3].setAttribute('colspan','3');
		}
	}
}
addSearchButtons();