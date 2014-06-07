// ==UserScript==
// @name           Serenic Index forum fejlesztes
// @description    Index fórumok modositasara
// @version        0.3
// @author         serenic
// @include        http://forum.index.hu/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/jquery-ui.min.js
// @resource       jqueryuicss http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/themes/ui-lightness/jquery-ui.css
// ==/UserScript==

var igen = true, ok = true, rendben = true, van = true;
var nem = false, nincs = false;

// ------------- A következő változók értékét szabadon változtathatod: 
var trolList = new Array(
"troll1", "troll2", "troll3", "troll4", "troll5"
); // A trollistában szereplő nickek hozzászólásai teljesen eltűnnek

var ignoreList = new Array(
"nick1", "nick2", "nick3", "nick4", "nick5"
); // az ignore listában szereplő nickek hozzászólásai helyén csak egy tájékoztató szöveg lesz

var ellensegek = new Array(
"ellenseg1", "ellenseg2", "ellenseg3"
); // az ellenségek listában szereplő nickek hozzászólásait megjelöli

var baratok = new Array(
"barat1", "barat2", "barat3", "barat4", "barat5"
); // a barátok listában szerepló nickek hozzászólásait kiemeli


var baratokKeretszin = "red";
var baratokKeretstilus = "dotted"; // Lehetséges értékek: "none",  "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"
var baratokKeretvastagsag = "3px"; // Mértékegységek: "px" - pixel, "pt" - point, "pc" - pica

var trollszuro = van; // Ha értéke igen, ok, rendben vagy van, akkor szűri a trollokat, ha nem vagy nincs, akkor nem
var ignoralas = van; // Ha értéke igen, ok, rendben vagy van, akkor ignorálja a listában lévőket, ha nem vagy nincs, akkor nem
var ellensegszuro = van; // Ha értéke igen, ok, rendben vagy van, akkor megjelöli az ellenségeket, ha nem vagy nincs, akkor nem
var baratokjelzes = igen; // Ha értéke igen, ok, rendben vagy van, akkor kiemeli a barátokat, ha nem vagy nincs, akkor nem
var ignoreSzoveg = "moderálva"; // Ez jelenik meg az ignorált hozzászólás helyén

var szin_1 = "#FEF2C8"; // A "twin" és "serenic" kinézetek egyik színe
var szin_2 = "#FFE2A2"; // A "twin" és "serenic" kinézetek másik színe
var hatterszin = "#FFFFDD"; // A "twin", "serenic" és színkódos kinézetek háttérszíne
var megjelenes = "serenic"; // Lehetséges nevek: "index" (Az eredeti index színharmónia), "twin", "serenic", v.milyen szín név (pld. "lightgreen") vagy v.milyen színkód (pl. "#FFCC99")

var figyelmeztetoSzoveg = "Az én index fórumom :-)";
var figyelmeztetesStilus = 'style="margin-top: 3px; margin-bottom: 3px; background: #990000; text-align: center; color: white; font-size: 12pt; font-weight: bold; font-family: Arial, Helvetica, sans-serif"';

var csupaszIndex = igen; // Ha értéke igen, ok, rendben vagy van, akkor az index fórumok kinézetéből kiveszi a felesleges dolgokat, ha nem vagy nincs, akkor nem
var loginBoxAthelyezes = igen; // Ha értéke igen, ok, rendben vagy van, akkor a bejelentkező formot átrakja a jobb oldalra. 
// Ha a csupaszIndex be van állítva, akkor enélkül a bejelentkező doboz eltűnik. 
var ujKeresoAthelyezes = igen; // ugyanúgy értelmezendő, mint a loginBoxAthelyezes
var regiKeresoAthelyezes = igen; // ugyanúgy értelmezendő, mint a loginBoxAthelyezes
var kedvencekAthelyezes = igen; // ugyanúgy értelmezendő, mint a loginBoxAthelyezes

var hozzaszolasStilus = "sereinput"; // A hozzászólás mező kinézete. Lehetséges értékek: "sereinput", "index" (ez ez eredeti)

var rangokMegjelenitese = van; // Ha értéke igen, ok, rendben vagy van, akkor a nicknevek mellett a rangok is kijelzésre kerülnek
var rangok_hszam = new Array(500, 2000, 5000, 10000, 20000, 40000, 80000, 150000); // Az egyes rangokat mennyi hozzászólásra emelje meg 
var rangok_jel = new Array("újonc", "*", "**", "***", "****", "5*", "6*", "7*"); // Az egyes rangok elnevezései

var hosszuSzovegekKezelese = van; // Ha értéke igen, ok, rendben vagy van, akkor a nagyon hosszú szövegeket megvágjuk.
var hosszuSzoveg = 2000; // Hány karakter felett nyilvánítsuk hosszú szövegnek a hozzászólást.
var maxSor = 20; // Hány sor felett legyen ugyancsak hosszú szövegnek nyilvánítva?

var elozmenyekMegjelenitese = igen; // Ha értéke igen, ok, rendben vagy van, akkor az előzmények megjelennek külön is az egyes hozzászólásoknál
var elozmenyekForma = "hozzászólásban"; // Értéke lehet: "hozzászólásban" vagy "ablakban". Csak akkor érdekes, ha az elozmenyekMegjelenitese értéke igen, ok, rendben vagy van
var elozmenyekStilus = "background-color: #FEFECC; color: #777; border-style: dashed; border-color: #777; border-width: 1px; font-size: 10px; padding: 10px";
var elozmenyekAblakStilus = ""; // fejlesztés alatt!
var elozmenyekSzoveg = "Erre válaszol: ";
var elozmenyekbenMultimedia = nem; // Ha igen, akkor megjelennek az előzményekben is a videók, képek. Ha nem, akkor csak egy link jelenik meg helyettük. Alapértelmezés: nem.

var videoBeagyazas = igen; // A youtube videólinkek helyére betegye-e magát a videót?
var hibasLinkekJavitasa = igen; // A csak sima szövegként szereplő webcímeket linkké alakítsa?

var figyelhetoTopicok = igen; // Meg lehessen-e jelölni figyelhető topikokat?
var figyelesIdokoze = "1 perc"; // Mennyi időnként nézze át a figyelendő topikokat, változtak-e? Csak a "perc" egység alkalmazható. 
var felugroAblakValtozaskor = igen; // Figyelmeztessen-e, ha történt változás?
var taroltAdatokTorlese = nem; // Ha be van állítva, törli az eddig tárolt adatokat a böngészőből.
// --------------------------------------------------------------------------------------------------
// Innentől kezdve NE MÓDOSITSD!

var firstH1 = document.getElementsByTagName("h1")[0];
if (firstH1 != undefined)
	if (firstH1.innerHTML.indexOf("500") > -1 || firstH1.innerHTML.indexOf("Service Temporarily Unavailable") > -1) {
		document.body.innerHTML = '<h1>Újratöltöm, kis türelmet...</h1>';
		location.reload();
	} // end if

var disableTrolls = trollszuro;
var disableIgnores = ignoralas;
var showEllensegek = ellensegszuro;
var showBaratok = baratokjelzes;
var ignoreText = ignoreSzoveg;
var firstColor = szin_1;
var secondColor = szin_2;
var backColor = hatterszin;
var skin = megjelenes;
var alert_ = figyelmeztetoSzoveg;
var alertStyle = figyelmeztetesStilus;
var nakedSite = csupaszIndex;
var inputTextSkin = hozzaszolasStilus;

var mouseX, mouseY;

document.addEventListener('mousemove',getMousePos,true);

function getMousePos(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
// idióta egy dolog, de működik...
} // end function

function messageHeaders() {
	return $(".art_h");
} // end function

function messageHeaderContents() {
	return $(".art_h_l");
} // end function

function messageHeaderInformations() {
	return $(".art_h_r");
} // end function

function messageHeaderContents2() {
	return $(".art_h_m");
} // end function

function messageContent(messageHeaderContent) {
	return messageHeaderContent.parentNode.parentNode.rows[1].cells[0];
} // end function

function messageBoxes() {
	return $(".art");
} // end function 

function messageContentBoxes() {
	return $(".art_b");
} // end function

function messageFooters() {
	return $(".art_f");
} // end function

function toc() {
	return $("#content1col");
} // end function

function tocElements1() {
	return $(".tl_elem_0");
} // end function

function tocElements2() {
	return $(".tl_elem_1");
} // end function

function remove(element) {
	element.remove();
} // end function

function replaceClassContent(origElement, newElement, className) {
	if (origElement && newElement)
		newElement.innerHTML = '<div class="' + className + '">' + origElement.innerHTML + '</div>';
} // end function

function appendContent(element, container) {
	if (element && container)
		container.innerHTML = container.innerHTML + element.innerHTML;
} // end function

function appendClassContent(element, container, className) {
	if (element && container)
		container.innerHTML = container.innerHTML + '<div class="' + element.innerHTML + '</div>';
} // end function

// -------- megkeressük ez egyes változtatni kívánt elemeket az oldalon 
var mBoxes = messageBoxes();
var msgHContents = messageHeaderContents();
var msgHeaders = messageHeaders();
var msgCBoxes = messageContentBoxes();
var msgContBoxes = messageContentBoxes();
var msgFooters = messageFooters();
var userNames = new Array();
var userCodes = new Array();
var hozzaszolasok = new Array();
var elozmenyek = new Array();
var multimediaTags = new Array("object", "img");
var figyeltTopicok = [];
 
function setSkin(skinName) {
switch (skinName) {
case "index":
	break;
case "twin":
	for (var i=0; i<msgHeaders.length; i++) {
		color = firstColor;
		if (i%2 == 0)
			color = secondColor;
		msgHeaders[i].css('background-color', color);
		msgBoxes[i].css('border-color', color);
		msgContBoxes[i].css('background', backColorÖ;
	} // end for
	break;
case "serenic":
	var toc1 = tocElements1();
	var toc2 = tocElements2();
	for (var i=0; i<msgHeaders.length; i++) {
		var color = firstColor;
		if (i%2 == 0)
			color = secondColor;
		mBoxes[i].css('backgound-color', color);
		mBoxes[i].css('border-color', color);
		msgHeaders[i].css('background', color);
		msgContBoxes[i].css('background', color);
		msgFooters[i].css('background', color);
	} // end for
	var tocLength = toc1.length;
	if (toc2.length > tocLength)
		tocLength = toc2.length;
	for (var i=0; i<tocLength; i++) {
		toc1[i].css('background', firstColor);
		toc2[i].css('background', secondColor);
	} // end for
	$("head").append('<style type="text/css"> \n\
	a { \n\
		text-decoration: none; \n\
		border-bottom-style: dashed; \n\
		border-bottom-width: 1px; \n\
		color: #813816; \n\
	} \n\
	a:link:hover, #content1col a:link:hover { \n\
		color: #6373FF; \n\
		border-bottom-style: solid; \n\
	} \n\
	a:visited:hover, #content1col a:visited:hover { \n\
		color: #6373FF; \n\
		border-bottom-style: solid; \n\
	} \n\
	a:visited { \n\
		color: #813816; \n\
	} \n\
	a:link { \n\
		color: #813816; \n\
	} \n\
	.art_h_l a, .art_h_r a, .art_f a, .navilinks a, #rightcol a, #content1col a { \n\
		border-bottom-style: none; \n\
	} \n\
	.tl_elem_0 a:visited, .tl_elem_1 a:visited { \n\
		text-decoration: underline; \n\
	} \n\
	#controls a, #controls a:hover, #controls a:link:hover, #controls a:visited:hover { \n\
		text-decoration: none; \n\
		border-bottom-style: none; \n\
	} \n\
	</style>');
	break;
default:
	msgHeaders.css('background', skinName);
	msgBoxes.css('border-color', skinName);
} // end switch
} // end function

// Kigyűjti a user neveket és a user számokat az oldalról
function getUsers() {
	var username, usercode;
	var unique;	
	for (var i=0; i<msgHContents.length; i++) {
		username = msgHContents[i].innerHTML.split('"')[4];
		username = username.replace("<strong>", "");
		username = username.replace("</strong></a>", "");
		username = username.replace(">", "");
		unique = true;
		for (var j=0; j<userNames.length; j++) {
			if (userNames[j] == username)
				unique = false;
		} // end for
		if (unique) {
			userNames[userNames.length] = username;
			usercode = msgHContents[i].innerHTML.split('"')[3];
			usercode = usercode.replace("/User/UserDescription?u=", "");
			userCodes[userCodes.length] = usercode;
		} // end if
	} // end for
} // end function

alertText = document.createElement("div");
alertText.innerHTML = '<div ' + alertStyle +'><p>' + alert_ + '</p></div';
document.body.insertBefore(alertText, document.body.firstChild);

var headID = document.getElementsByTagName("head")[0];
switch (inputTextSkin) {
case "sereinput":
headID.innerHTML = headID.innerHTML + ' <style type="text/css"> \n\
  \n\
textarea { \n\
    background-color : #e6e6fa; \n\
    border-bottom-color : #3346f2; \n\
    border-bottom-style : dotted; \n\
    border-left-color : #3346f2; \n\
    border-left-style : dotted; \n\
    border-right-color : #3346f2; \n\
    border-right-style : dotted; \n\
    border-top-color : #3346f2; \n\
    border-top-style : dotted; \n\
    cursor : text; \n\
    font-family : sans-serif; \n\
    font-size : 10pt; \n\
    padding-bottom : 3px; \n\
    padding-left : 3px; \n\
    padding-right : 3px; \n\
    padding-top : 5px; \n\
    width : 400px; \n\
  } \n\
</style>';
break;
} // end switch

var rightCol = document.getElementById("rightcol");

if (loginBoxAthelyezes) {
	var loginBox = getElementsByClass("passbox")[0];
	var loginBox2 = getElementsByClass("darkbox")[0];
	if (loginBox)
		replaceClassContent(loginBox, rightCol, 'passbox');
	else {
		var userSelector = document.getElementsByName("userselector")[0];
		userSelector.style.width = "auto";
		replaceClassContent(loginBox2, rightCol, 'darkbox');
	}
} // end if

if (kedvencekAthelyezes) {
	var favBox = document.getElementById("favourite_box");
	appendContent(favBox, rightCol);
} // end if

if (ujKeresoAthelyezes) {
	var ujKereso = document.getElementById("inda_forumkereso");
	appendClassContent(ujKereso, rightCol, "fs_boxform_login");
} // end if

if (regiKeresoAthelyezes) {
	var regiKereso = getElementsByClass("normalbox")[0];
	appendClassContent(regiKereso, rightCol, "normalbox");
} // end if

if (nakedSite) {
	remove(document.getElementById("site_header"));
	remove(document.getElementById("header"));
	remove(document.getElementById("leftcol"));	
} // end if

function getTopicNumberFromUrl(url) {
	var tn = new RegExp('^[0-9]*');
	if (url.indexOf('showArticle') > -1)
		return tn.exec(url.replace("http://forum.index.hu/Article/showArticle?t=", ""));
	else
		return false;
} // end function

var figyeltTopicok = [];
var legutobbiLatogatasok = [];
var topicNumber = 0;

if (taroltAdatokTorlese) {
	GM_deleteValue('figyeltTopicok');
	GM_deleteValue('topicLatogatas');
	alert("Tárolt adatok törölve!");
} // end if

function figyeld() { 
	var most = new Date();
	figyeltTopicok.push(topicNumber); 
	legutobbiLatogatasok.push(most.getTime());
	GM_setValue('figyeltTopicok', uneval(figyeltTopicok)); 
	GM_setValue('topicLatogatas', uneval(legutobbiLatogatasok)); 
	location.reload();
}; // end function

if (figyelhetoTopicok) {
	figyeltTopicok = eval(GM_getValue('figyeltTopicok', '[]')); 
	legutobbiLatogatasok = eval(GM_getValue('topicLatogatas', '[]')); 
	var cimsor = document.getElementById("navilast");
	topicNumber = getTopicNumberFromUrl(String(location.href));
	if (cimsor && topicNumber) {
		var figyelt = false;
		for (var i=0; i<figyeltTopicok.length; i++)
			if (topicNumber*1 == figyeltTopicok[i]*1) {
				figyelt = true;
				var most = new Date();
				legutobbiLatogatasok[i] = most.getTime();
				GM_setValue('topicLatogatas', uneval(legutobbiLatogatasok));
			} // end if
		if (figyelt) {
			cimsor.innerHTML = cimsor.innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-weight: bold; font-size: 12px">Figyelt topic</span>';
		}
		else {
			cimsor.innerHTML = cimsor.innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="topicfigyeles" style="font-size: 10px; cursor: pointer">Topic figyelése</a>';
			document.getElementById("topicfigyeles").addEventListener('click', figyeld, false);
		} // end if
	} // end if
} // end if

if (disableIgnores) {
	for (var i=0; i<msgHContents.length; i++) {
		for (var j=0; j<ignoreList.length; j++) {
			if (msgHContents[i].innerHTML.indexOf('>' + ignoreList[j] + '<') > 0) 
				messageContent(msgHContents[i]).innerHTML = ignoreText + " <!-- removed by IndexForum GreaseMonkey script -->";
		} // end for
	} // end for
} // end if

if (disableTrolls) {
	var trollBoxes = new Array();
	for (var i=0; i<mBoxes.length; i++) {
		for (var j=0; j<trolList.length; j++) {
			if (msgHContents[i].innerHTML.indexOf('>' + trolList[j] + '<') > 0)
				trollBoxes[trollBoxes.length] = mBoxes[i];
		} // end for
	} // end for
	for (var i=0; i<trollBoxes.length; i++)
		trollBoxes[i].style.display = "none";
} // end if

if (showEllensegek) {
	if (mBoxes.length > 0)
		var normalCBoxWidth = mBoxes[0].offsetWidth;
	for (var i=0; i<mBoxes.length; i++) {
		for (var j=0; j<ellensegek.length; j++) {
			if (msgHContents[i].innerHTML.indexOf('>' + ellensegek[j] + '<') > 0) {
				mBoxes[i].style.width="70%";
				var newCBoxWidth = mBoxes[i].offsetWidth;
				mBoxes[i].style.paddingLeft= String(normalCBoxWidth - newCBoxWidth) + "px";
				mBoxes[i].style.borderStyle="none";
				msgCBoxes[i].style.fontSize="80%";
			} // end if
		} // end for
	} // end for
} // end if

if (hosszuSzovegekKezelese) {
	var tartalom;
	var sorokSzama;
	var pos;
	var start;
	var maxSorPos;
	var linkHtml;
	var msgHContents2 = messageHeaderContents2();
	var msgHContents2_links;
	for (var i=0; i<msgHContents.length; i++) {
		tartalom = messageContent(msgHContents[i]);
		sorokSzama = 0;
		pos = 0;
		maxSorPos = 0;
		start = -1;
		while (pos > -1) {
			pos_br = tartalom.innerHTML.toLowerCase().indexOf("<br>", start+1);
			pos_p = tartalom.innerHTML.toLowerCase().indexOf("</p>", start+1);
			pos = pos_br;
			if (pos_p > -1 && pos_p < pos_br)
				pos = pos_p;
			if (pos > -1) {
				sorokSzama += 1;
				start = pos;
			} // end if
			if (sorokSzama == maxSor)
				maxSorPos = pos;
		} // end while
		if (tartalom.innerHTML.length > hosszuSzoveg || sorokSzama > maxSor) {
			if (msgHContents2[i] != undefined) {
				msgHContents2_links = msgHContents2[i].getElementsByTagName("a");
				linkHtml = '...&nbsp;&nbsp;&nbsp;<a href="' + msgHContents2_links[1].href + '" target="_blank">[Teljes&nbsp;szöveg]</a>';
				if (maxSorPos > 0)
					tartalom.innerHTML = tartalom.innerHTML.substr(0, maxSorPos) + linkHtml;
				else
					tartalom.innerHTML = tartalom.innerHTML.substr(0, hosszuSzoveg) + linkHtml;
			} // end if
		} // end if
	} // end for
} // end if

setSkin(skin);

if (showBaratok) {
	for (var i=0; i<mBoxes.length; i++) {
		for (var j=0; j<baratok.length; j++) {
			if (msgHContents[i].innerHTML.indexOf('>' + baratok[j] + '<') > 0) {
				mBoxes[i].style.borderColor = baratokKeretszin;
				mBoxes[i].style.borderStyle = baratokKeretstilus;
				mBoxes[i].style.borderWidth = baratokKeretvastagsag;
			} // end if
		} // end for
	} // end for
} // end if

if (figyelhetoTopicok) {
	var naviHeader = document.getElementById("naviheader");
	if (naviHeader) {
		naviHeader.innerHTML = naviHeader.innerHTML + '<div id="figyeltTopicok" style="color: red"><br />Változott topicok: </div>\n';
	}
	else {
		var mainTable = document.getElementById("content2col");
		mainTable.innerHTML = '<div id="figyeltTopicok" style="font-weight: bold; color: red">Változott topicok: </div><br />\n' + mainTable.innerHTML;
	} // end if
	for (var f=0; f<figyeltTopicok.length; f++) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://forum.index.hu/Article/showArticle?t=' + String(figyeltTopicok[f]),
			onload: function(response) {
				var rText = response.responseText;
				var elsoDatumPoz = rText.indexOf('art_h_r');
				var elsoDatum = rText.substr(elsoDatumPoz + 9, 19);
				var topicDatum = new Date();
				topicDatum.setFullYear(elsoDatum.substr(0,4)*1, (elsoDatum.substr(5,2)*1)-1, elsoDatum.substr(8,2)*1);
				topicDatum.setHours(elsoDatum.substr(11,2)*1, elsoDatum.substr(14,2)*1, elsoDatum.substr(17,2)*1);
				var topicDatumNum = topicDatum.getTime();
				var topicSzamPoz = rText.indexOf('navilast');
				var topicSzam = rText.substr(topicSzamPoz + 42, 10);
				var idezojelPoz = topicSzam.indexOf('"');
				if (idezojelPoz > -1)
					topicSzam = topicSzam.substring(0, idezojelPoz);
				var legutobbiDatumNum;
				for (var lv=0; lv<figyeltTopicok.length; lv++)
					if (figyeltTopicok[lv] == topicSzam)
						legutobbiDatumNum = legutobbiLatogatasok[lv]*1;
				if (topicDatumNum > legutobbiDatumNum) {	
					var titlePoz = rText.indexOf('<title>');
					var titleVegPoz = rText.indexOf('</title>');
					var topicNev = rText.substring(titlePoz + 7, titleVegPoz);
					topicNev = topicNev.replace(" - Index Fórum", "");
					var fdiv = document.getElementById("figyeltTopicok");
					fdiv.innerHTML = fdiv.innerHTML + '<a href="http://forum.index.hu/Article/showArticle?t=' + topicSzam + '" target="_blank">' + topicNev + '</a>&nbsp;&nbsp;';
				} // end if
			} // end onload function
		}) // end ajax_get
	} // end for 
} // end if

function createLayer(no, x,y,width,height,headerStr,content) {
	var layer = document.createElement("div");
	layer.id = "layer" + String(no);
	layer.style.position = "absolute";
	layer.style.left = String(x);
	layer.style.width = String(width);
	layer.style.maxWidth = String(width);
	layer.style.maxHeight = window.innerHeight-100;
	layer.style.height = "auto";
	layer.style.zIndex = "10";
	layer.style.backgroundColor = "#FFFFAA";
	layer.style.visibility = "visible";
	layer.style.padding = "15px";
	layer.style.borderColor = "white";
	layer.style.borderStyle = "solid";
	layer.style.borderWidth = "5px";
	layer.innerHTML = content;
	document.body.appendChild(layer);
	var header = document.createElement("div");
	header.id = "layer"+ String(no+1);
	header.style.position = "absolute";
	header.style.left = String(x);
	header.style.width = String(width + 24);
	header.style.height = "auto";
	header.style.zIndex = "11";
	header.style.backgroundColor = "lightblue";
	header.style.borderColor = "white";
	header.style.borderStyle = "solid";
	header.style.borderWidth = "5px";
	header.style.borderBottomWidth = "0";
	header.style.padding = "3px";
	header.style.visibility = "visible";
	header.style.fontFamily = "sans-serif";
	header.style.fontSize = "12px";
	header.style.textAlign = "center";
	header.style.top = String(y);
	header.innerHTML = "El&#337;zmény:&nbsp;" + headerStr;
	layer.style.top = String(y + header.offsetHeight + 24);
	document.body.appendChild(header);
	if (layer.offsetTop + layer.offsetHeight > (window.innerHeight + window.pageYOffset)) {
		layer.style.top = layer.offsetTop - (layer.offsetTop + layer.offsetHeight - (window.innerHeight + window.pageYOffset));
		header.style.top = layer.offsetTop - header.offsetHeight;
	} // end if
} // end function

function removeLayer(no) {
	var layer = document.getElementById("layer" + String(no));
	var header = document.getElementById("layer" + String(no+1));
	if (layer != undefined) {
		layer.style.visibility = "hidden";
		layer.parentNode.removeChild(layer);
	} // end if
	if (header != undefined) {
		header.style.visibility = "hidden";
		header.parentNode.removeChild(header);
	} // end if
} // end function

function mutasdElozmenyt() {
	if (document.getElementById("layer" + this.id) == undefined) {
		var elozmenyekIndex = this.id * 1;
		var headerStr = this.innerHTML;
		var content = elozmenyek[elozmenyekIndex];
		if (content == undefined)
			content = "Betöltés folyamatban...";
		createLayer(this.id, mouseX+10, mouseY+10, 500, 400, headerStr, content); 
	}
	else {	
		document.getElementById("layer" + this.id).style.visibility = "visible";
	} // end if
} // end function

function rejtsdElozmenyt() {
	var layer = document.getElementById("layer" + this.id);
	if (layer)
		removeLayer(this.id);

}

var marKeszElozmeny = new Array();

function elozmenyLetrehozasa(ind) {
	var el_header;
	if (elozmenyLinkek[ind] != undefined) {
		if (marKeszElozmeny[ind] == undefined) {
			if (elozmenyekForma == "ablakban") {
				elozmenyLinkek[ind].addEventListener('mouseover', mutasdElozmenyt, true);
				elozmenyLinkek[ind].addEventListener('mouseout', rejtsdElozmenyt, true);
				marKeszElozmeny[ind] = true;
			} // end if
			if (elozmenyekForma == "hozzászólásban") {
				messageContent(msgHContents[ind]).innerHTML = '<td><div id="elozmeny' + String(ind) + '" ' + 'style="margin-top: -10px; ' + elozmenyekStilus + '">' + elozmenyek[ind] + '</div></td> <br />\n' + messageContent(msgHContents[ind]).innerHTML;
				messageContent(msgHContents[ind]).innerHTML = '<td><div id="elozmeny_fejlec' + String(ind) + '" style="' + elozmenyekStilus + '">' + elozmenyekSzoveg +'<a style="border-bottom: none;" href="' + elozmenyLinkek[ind].href + '">' + elozmenyLinkek[ind].innerHTML + '</a>' + '</div></td>' + messageContent(msgHContents[ind]).innerHTML; 
				el_header = document.getElementById("elozmeny_fejlec" + String(ind));
				el_header.style.padding = "2px";
				el_header.style.borderStyle = "none";
				marKeszElozmeny[ind] = true;
			} // end if
		} // end if
	} // end if
} // end function

if (elozmenyekMegjelenitese) {
var footers = msgFooters;
var elozmenyLinkek = new Array();
var elozmenyCounter = 0;
var msgInfos = messageHeaderInformations();
for (var i=0; i<footers.length; i++) {
	elozmenyLinkek[i] = footers[i].getElementsByTagName("a")[0];
	if (elozmenyLinkek[i] != undefined) {
		for (var j=0; j<msgInfos.length; j++) {
			var zarojel1 = msgInfos[j].innerHTML.indexOf("(");
			var zarojel2 = msgInfos[j].innerHTML.indexOf(")");
			var header_hszam = msgInfos[j].innerHTML.substring(zarojel1+1, zarojel2).replace('<strong>','').replace('</strong>','');
			if (header_hszam == 'topiknyito')
				header_hszam = '-';
			zarojel1 = elozmenyLinkek[i].innerHTML.indexOf("(");
			zarojel2 = elozmenyLinkek[i].innerHTML.indexOf(")");
			var footer_hszam = elozmenyLinkek[i].innerHTML.substring(zarojel1+1, zarojel2).replace('<strong>','').replace('</strong>','');
			if (footer_hszam == header_hszam) {
				elozmenyek[i] = messageContent(msgHContents[j]).innerHTML.replace('<span id="maskwindow">','').replace('</span>','').replace('<div class="art_t">','').replace('</div>','');
				elozmenyLetrehozasa(i);
			} // end if
		} // end for
	if (elozmenyek[i] == undefined) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: elozmenyLinkek[i].href.replace('jumpTree','viewArticle'),
			onload: function(response) {
				var elozmenyHTML = response.responseText;
				var spliText = elozmenyHTML.split('<div class="art_t">');
				var elozmenyText = spliText[1];
				var spliText1 = elozmenyHTML.split('"><strong>');
				var spliText2 = spliText1[1].split('EditArticle/ReplayEditArticle');
				var userText = spliText2[0].replace('</strong></a></td>', '');
				userText = userText.replace('<td class="art_h_m"><a href="', '');
				userText = userText.replace('\n    /', '');
				spliText1 = elozmenyHTML.split('(<strong>');
				var hsz = spliText1[1].split('</strong>)')[0];
				if (hsz == 'topiknyitó')
					hsz = '-'; 
				for (var q=0;  q<elozmenyLinkek.length; q++) {
					if (elozmenyLinkek[q] != undefined) {
						if (userText+ " (" + hsz +")" == elozmenyLinkek[q].innerHTML) {
							elozmenyek[q] = elozmenyText;
							elozmenyLetrehozasa(q);
						} // end if
						elozmenyLinkek[q].id = String(q);

					} // end if
				} // end for
			} // end onload function
		}) // end ajax_get
	} // end if undefined
	} // end if not undefined :-)
} // end for
var footers = msgFooters;
for (var i=0; i<footers.length; i++) {
	if (elozmenyekForma == "hozzászólásban")
		footers[i].innerHTML = '';
//	if (elozmenyekForma == "ablakban")
//		footers[i].innerHTML = footers[i].innerHTML.replace("Előzmény:", elozmenyekSzoveg);
} // end for
} // end if elozmenyekMegjelenitese

if (rangokMegjelenitese) {
getUsers();
var rangOk = new Array();
for (var i=0; i<msgHContents.length; i++)
	rangOk[i] = false; // még nincs kész egyetlen rang sem.
var userCounter = 0;
for (var i=0; i<userCodes.length; i++) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://forum.index.hu/User/UserDescription?u=" + userCodes[i],
		onload: function(responseDetails) {
			var userPageHTML;
			userPageHTML = responseDetails.responseText;
			var hozzaszolasokPos = userPageHTML.search(">Hozzászólások<");
			var testStr = userPageHTML.substr(hozzaszolasokPos, 50);
			var spliText1 = testStr.split("(");
			var spliText2 = spliText1[1].split(")");
			var hozzaszolasSzam = spliText2[0];
			var nicknamePos = userPageHTML.search(">Nick:<");
			testStr = userPageHTML.substr(nicknamePos, 80);
			spliText1 = testStr.split(">");
			var username = spliText1[3].replace('</td', '');
			for (var u=0; u<userNames.length; u++) {
				if (username == userNames[u])
					var userCount = u;
			} // end for
			hozzaszolasok[userCount] = hozzaszolasSzam;	
				for (var n=0; n<msgHContents.length; n++) {
					var rang = 0;
					var hszam = 0;
					var usercode = 0;
					for (var q=0; q<userNames.length; q++) {
						if (msgHContents[n].innerHTML.indexOf('>' + userNames[q] + '<') > 0) {
							usercode = userCodes[q];
							if (hozzaszolasok[q] != undefined) {
								hszam = hozzaszolasok[q] * 1;
								for (var w=0; w<rangok_hszam.length; w++) {
									if (hszam >= rangok_hszam[w]) {
										rang = w + 1;
										if (rang >= rangok_jel.length)
											rang = w;
									} // end if
								} // end for
							} // end if != undefined
						} // end if
					} // end for
					if (hszam > 0 && rangOk[n] == false) {
						msgHContents[n].innerHTML = msgHContents[n].innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://forum.index.hu/User/UserDescription?u=' + usercode +'" title="Hozzászólások száma: ' + hszam + '">[Rang: ' + rangok_jel[rang] + ']</a>';
						rangOk[n] = true;
					} // end if
				} // end for
				userCounter++;
		} // end onload function
	}) // end ajax_get
} // end for
} // end if rangokMegjelenitese

if (hibasLinkekJavitasa) {
	var urlMinta = new RegExp("(http|https)://([a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\^\\&amp;\\*\\(\\)_\\-\\=\\+\\\\\\/\\?\\.\\:\\;\\'\\,]*)?", "g");
	var szoveg = "";
	var linkek, szovegLinkek, kepek, letezik;
	for (var i=0; i<msgHContents.length; i++) {
		szoveg = messageContent(msgHContents[i]).innerHTML;
		linkek = messageContent(msgHContents[i]).getElementsByTagName("a");
		kepek = messageContent(msgHContents[i]).getElementsByTagName("img");
		if (urlMinta.test(szoveg)) {
			szovegLinkek = szoveg.match(urlMinta);
			for (var j=0; j<szovegLinkek.length; j++) {
				letezik = false;
				for (var k=0; k<linkek.length; k++) {
					if (szovegLinkek[j].replace(/&amp;/g, "&") == linkek[k].href)
						letezik = true;
				} // end for
				for (var k=0; k<kepek.length; k++) {
					if (szovegLinkek[j].replace(/&amp;/g, "&") == kepek[k].src)
						letezik = true;
				} // end for
				if (szovegLinkek[j].indexOf("http://imgfrm.index.hu") > -1)
					letezik = true;
				if (!letezik) {
					messageContent(msgHContents[i]).innerHTML = szoveg.replace(szovegLinkek[j], '<a target="_blink" href="' + szovegLinkek[j] +'">' + szovegLinkek[j] + '</a>');
				} // end if
			} // end for
		} // end if
	} // end for
} // end if

var newObject;
if (videoBeagyazas) {
	var linkek = document.getElementsByTagName("a");
	var minta = new RegExp("http://(www.youtube.com/watch?)", "i");
	var tipus = "youtube";
	for (var l=0; l<linkek.length; l++) {
		if (minta.test(linkek[l].href)) {
			newObject = document.createElement("span");
			switch (tipus) {
				case "youtube":
					linkek[l].id = "youtubelink" + String[l];
					newObject.innerHTML = '<br /><br /><object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/' + linkek[l].href.split('?v=')[1] + '&hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + linkek[l].href.split('?v=')[1] + '&hl=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object><br />'
					break;
			} // end switch
			linkek[l].appendChild(newObject);
		} // end if
	} // end for
} // end if

if (!elozmenyekbenMultimedia) {
var elozmenyBox;
var elozmenyMultimedia = new Array();
var multimElemek;
for (var i=0; i<marKeszElozmeny.length; i++) {
	if (elozmenyekForma == "hozzászólásban") {
		elozmenyBox = document.getElementById("elozmeny" + String(i));
		if (elozmenyBox) {
			for (var mtag=0; mtag<multimediaTags.length; mtag++) {
				multimElemek = elozmenyBox.getElementsByTagName(multimediaTags[mtag]);
				if (multimElemek.length > 0) {
					for (var me=0; me<multimElemek.length; me++)
						elozmenyMultimedia.push(multimElemek[me]);
				} // end if
			} // end for
		} // end if
	} // end if
} // end for
for (var i=0; i<elozmenyMultimedia.length; i++) {
	if (elozmenyMultimedia[i].tagName == "OBJECT")
		elozmenyMultimedia[i].innerHTML = "";
	if (elozmenyMultimedia[i].tagName == "IMG") {
		elozmenyMultimedia[i].src = "";
		elozmenyMultimedia[i].alt = "[KÉP]";
	}
} // end for
} // end if

