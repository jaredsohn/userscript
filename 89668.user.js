// ==UserScript==
// @author		   Amarok
// @version        1.1.2
// @name           TK Munka
// @namespace      TK Munka
// @description    TK munkák és hozzájuk kapcsolódó szakértelmek kijelzése
// @include        http://www.thrillion.hu/action/work.php
// @include        http://thrillion.hu/action/work.php
// ==/UserScript==


var waitSmall = 250;
var TableWidth = 700;

var charPage = "/char.php";

// Mágiavizsgához szükséges tulajdonságok kijelzése
var isMagicExam = false;
// Automatikus kitoltes
var autoFill = true;

var examPage = "/action/exam.php";
var mExamColor = "lightblue";
var examMsg = "Nem elegendő a tudásod";

var charID = "";
var tNev = new Array("Erő","Ügyesség","Egészség","Észlelés");
//var mExam = new Array(0,18,17,8,19,25,4);
var mExam = new Array();
var tErtek = new Array(tNev.length);
var isRefresh = false;
var isExamRes = false;


var munka = new Array("ács","ágyas","alkimista","állatidomár","artista","asztrológus",
					"bányász","bárd","besúgó","betegápoló","borbély","börtönőr","cipész",
					"diplomata","ékszerészinas","építész","favágó","felderítő","felfedező",
					"festő","filozófus","földműves","fuvaros","gulyás","gyógyító","halász",
					"hentes","herbalista","hírnök","hivatalnok","hordókészítő","írnok","jós",
					"juhász","karavánvezető","katona","kertész","kínzó","kirurgus","kobzos",
					"kocsis","kocsmai felszolgáló","kocsmáros-segéd","koldus","kósza","kovácsinas",
					"kőműves","könyvkötő","kötélverő","matróz","molnár","papi inas","pék","remete",
					"serfőző","szabó","szakács","szatócs","szemétszedő","szerzetes","szeszfőző",
					"színész","szobrász","szolgáló","szűcs","takács","tanító","térképész","tetőfedő",
					"udvari bolond","udvaronc","vadász","vajákos","versenybíró","vértkovács-tanonc",
					"vízhordó");
										
var szakertelem = new Array("Akaraterő","Állatismeret","Bányászat","Divatdiktátor","Empátia",
					"Erőszakosság","Főzetek","Hidegvér","Hit","Kézügyesség","Koldulás","Lopózás",
					"Megfélemlítés","Megfigyelés","Meggyőzés","Munkabírás","Művészet","Precizitás",
					"Rejtőzés","Szikra-használat","Szívósság","Tájékozódás","Taktika","Természetjárás",
					"Testépítés","Tudomány","Tudomány ","Ugrás","Futás","--x--");
					
					
var munk_szak1 = new Array(15,14,25,1,27,17,2,16,13,4,3,12,15,14,17,15,23,22,0,16,14,20,21,1,19,1,20,25,
					7,7,15,9,8,1,21,22,4,5,4,16,1,13,13,10,21,9,15,9,15,15,15,8,15,6,6,16,6,3,15,8,15,
					18,16,9,3,9,19,21,15,11,3,1,19,7,9,20);

var munk_szak2 = new Array(29,4,6,14,24,4,20,3,18,6,15,5,9,7,3,29,24,21,21,9,29,29,1,29,8,23,29,6,28,29,
					29,26,4,29,29,24,19,14,25,29,29,14,15,29,23,15,25,29,24,29,24,19,29,23,29,3,15,17,29,
					29,25,4,29,0,15,15,14,13,29,16,4,7,29,13,19,29);

var result;		


String.prototype.ltrim = function() {
	return this.replace(/^\s+/g,"");
}

function findMagic() {

	var body = document.getElementsByTagName("body")[0].innerHTML;
	
	body = body.substring(body.indexOf("Szint:"));
	body = body.substring(0, body.indexOf("TP:"));
	
	return (body.indexOf("Mágia") != -1);
}

function IOexamArray(data) {

	// input type is Array
	if (typeof data == "object") {
		var ret = "";
		for (var i=0; i<data.length; i++)
			ret += "," + data[i];
			
		ret = ret.substring(1).ltrim();
	} else { // input type is String
		var ret = new Array();
		ret = data.split(",");
		for (var i=0; i<ret.length; i++)
			ret[i] = ret[i].ltrim();
	}

		return ret;	
}


function fillExam(str) {

	var examNames = new Array();

	str = str.substring(str.indexOf(examMsg));
	str = str.substring(examMsg.length+2, str.indexOf(")")).ltrim();
	examNames = str.split(",");
	for (var i=0; i<examNames.length; i++)
		examNames[i] = examNames[i].ltrim();
	
	mExam = new Array(examNames.length);
	findExam(examNames);

	isMagicExam = true;

	GM_setValue("tk_mk_mexam", IOexamArray(mExam));


}

function findExam(examNames) {
	
	for (var i=0; i<examNames.length; i++)
		for (var j=0; j<szakertelem.length; j++) {
			if (examNames[i]==szakertelem[j]) {
				mExam[i] = j;
				break;
			}
		}
}


function findChar() {

	var as = document.getElementsByTagName("a");
	
	for (var i=0; i<as.length; i++) {
		if (as[i].getAttribute("title")=="Karakterlap") {
			
			charID = as[i].innerHTML;
			charID = charID.substr(charID.indexOf("#")+1);
			break;
		}
		
	}

}

function getID(h) {
	return h.slice(0,h.indexOf("_"));
}

function getAttribs() {
	var hash = GM_getValue("tk_mk_hash");
	var tmp = new Array(tNev.length);
	var soa = hash.substr(hash.indexOf("_")+1);
	
	tmp = soa.split("_");
	for (i=0; i<tmp.length; i++)
		tErtek[i] = parseInt(tmp[i]);

}

function isValid() {
	var vals = GM_listValues();
	
	if (vals.length==0) {
		return false;
	} else {
		for each (var val in vals) {		
			if (val=="tk_mk_hash") {
				if (charID==getID(GM_getValue("tk_mk_hash"))) {
					return true;					
				} else {
					return false
				}				
				break;
			}
		}
		return false;
	}
}

function makeHash() {
	var hash = charID;

	for (var i=0; i<tErtek.length; i++)
		hash += "_" + String(tErtek[i]).ltrim();

	GM_setValue("tk_mk_hash", hash);
}

function getAttrib(attrib) {
	var tmp = result.substr(result.indexOf(">" + attrib));
	tmp = tmp.substr(tmp.indexOf("<td"));
	tmp = tmp.substr(tmp.indexOf(">"));
	tmp = tmp.substr(tmp.indexOf("<td"));
	tmp = tmp.substr(tmp.indexOf(">")+1);
	tmp = parseInt(tmp.substr(0, tmp.indexOf("<")));
	
	return tmp;
}

function finalizeResult() {
	if (isExamRes) {
		isExamRes = false;
		if (result.indexOf(examMsg) != -1) fillExam(result);
		
		getResult(clearURL(document.URL) + charPage);
		
	} else {
		for (var i=0; i<tNev.length; i++)
			tErtek[i] = getAttrib(tNev[i]);

		makeHash();	
		
		if (!isRefresh) {
			printAttr();
		} else {
			location.reload();
		}	
	}
	
}
					
function getResult(inURL) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: inURL ,
		overrideMimeType: 'text/html; charset=iso-8859-2',
		onload: function(responseDetails) {
			result = responseDetails.responseText;
			window.setTimeout(finalizeResult, 0);
		}
	});	
	
}

function clearURL(inURL) {
	var dom = inURL.indexOf(".hu/");
	if (dom==-1) return inURL;
	
	return inURL.substring(0,dom+3);
}

function munkaKeres(munkaTag) {
	for (var i=0; i<munka.length; i++)
		if (munka[i]==munkaTag) return i;
		
	return -1;
}

function getMunkaTag(inStr) {
	inStr = inStr.substr(inStr.indexOf("Munka:")+7);
	inStr = inStr.substr(0, inStr.length-1);
	return inStr;
}

function newTd(text) {
    var td = document.createElement("td");
	td.innerHTML = text;
	return td;
}

function insertHeader(first) {
    var tr = document.createElement("tr");
	
	tr.appendChild(newTd("Munka"));
	tr.appendChild(newTd("Szakértelem"));
	tr.appendChild(newTd("Tulajdonság"));
	tr.appendChild(newTd("Fizetség"));
	
	first.parentNode.insertBefore(tr, first);
}


function isEnough(attrib) {

	attrib = attrib.ltrim();

	var t = attrib.substr(0, attrib.indexOf(" "));
	var val = parseInt(attrib.substr(t.length + 1));

	var idx = 0;
	

	for (idx=0; idx<tNev.length; idx++)
		if (tNev[idx] == t) {
			break;
		}

	if (tErtek[idx] >= val) return true;
		else return false;
	
}

function isExam(szk) {
	for (var i=0; i<mExam.length; i++)
		if (szk == mExam[i])
			return true;
		
	return false;
}

function printSzk(obj, szk) {
	var ret = "";
	var iE = false;

	if (isMagicExam && isExam(szk)) {
		ret = "<span style='color:" + mExamColor + "'>" + szakertelem[szk] + "</span>";
		iE = true;
	} else {
		ret = szakertelem[szk];
	}

	obj.innerHTML += ret;
	return iE;
}

function selectThis(obj) {
	autoFill = false;
	obj.getElementsByTagName("input")[0].checked = true;	
}

function printAttr() {

	var trs = document.getElementsByName("wid")[0].parentNode.parentNode.parentNode.getElementsByTagName("tr");
	
	for (var i=0; i<trs.length; i++) {
		var isOK = isMagicExam && autoFill;
		var tds = trs[i].getElementsByTagName("td");
		var munkaT = munkaKeres(getMunkaTag(tds[0].innerHTML));

		tds[0].innerHTML = tds[0].innerHTML.replace("Munka: ","");
		if (!isEnough(tds[1].innerHTML)) {
			tds[1].setAttribute("style","color:red;");
			isOK = false;
		}
		tds[2].innerHTML = tds[2].innerHTML.replace("Fizetség: ","");

        var td = document.createElement("td");

		td.innerHTML = "";
		var mxVal = printSzk(td, munk_szak1[munkaT]);
		td.innerHTML += " / ";
		if (printSzk(td, munk_szak2[munkaT]) && mxVal && isOK)  {
			selectThis(trs[i]);
		}
	
		trs[i].insertBefore(td, tds[1]);
	}

	insertHeader(trs[0]);	
}


function createButton(nev, kiiras, fn) {
	var btn = document.createElement("input");
	btn.setAttribute("type","button");
	btn.setAttribute("name",nev);
	btn.setAttribute("value",kiiras);
	btn.setAttribute("style","font-family: verdana, arial, helvetica, sans-serif; font-size: small; color: orange; background-color: #333333; border: 1px solid #CCCCCC;");
	btn.addEventListener( "click", fn, true );
	return btn;
}

function refresh() {
	isExamRes = true;
	isRefresh = true;	
	getResult(clearURL(document.URL) + examPage);
}

function printQ() {
	var form = document.getElementsByTagName("form")[0];
	var table = form.parentNode;
	
	var small = document.createElement("small");
	small.innerHTML = "Tárolt statisztika:<br/>";
	for (var i=0; i<tErtek.length; i++)
		small.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;" + tNev[i] + ": " + String(tErtek[i]).ltrim() + "<br/>";
		
	small.innerHTML += "<br/>";
	
	table.insertBefore(small, form);

	table.insertBefore(createButton("refEr", "Frissít", refresh), form);

	small = document.createElement("small");
	small.innerHTML = "<br/><br/>";
	table.insertBefore(small, form);

	
}

function setTable() {
	var fChilds = document.getElementsByTagName("form")[0].childNodes;
	
	for (var i=0; i<fChilds.length; i++)
		if (fChilds[i].nodeName == "TABLE") {
			fChilds[i].width = TableWidth;
			return 0;
		}
}



function Main() {



 	setTable();
	findChar();	
	
	if (!isValid()) {

		if (findMagic()) {
			isExamRes = true;
			getResult(clearURL(document.URL) + examPage);
		} else {
			getResult(clearURL(document.URL) + charPage);
		}	
	
	} else {
	
		if (GM_getValue("tk_mk_mexam") != undefined) {
			isMagicExam = true;
			mExam = IOexamArray(GM_getValue("tk_mk_mexam"));
		}
	
		getAttribs();
		printQ();
		printAttr();
	}

}

function checkLoad() {
	var body = document.getElementsByTagName("body");
	
	if (body.length==0) {
		setTimeout(checkLoad, waitSmall);
	} else {
		Main();		
	}
}

checkLoad();