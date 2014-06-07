// ==UserScript==
// @name			TK harc AF
// @author			Amarok
// @version			1.0.0
// @namespace			Ted
// @description			TK harci mezők (listák) automatikus kitöltése
// @include			http://www.thrillion.hu/char.php*
// @include			http://www.thrillion.hu/action/dungeon.php*
// @include			http://www.thrillion.hu/action/bountypve.php*
// @include			http://www.thrillion.hu/action/arnylako.php*
// ==/UserScript==

String.prototype.ltrim = function() {
	return this.replace(/^\s+/g,"");
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.clear = function() {
	return this.replace(/[\r\n]+/g,"");
}

var waitSmall = 250;
var resultMode = "";

var hashTag = "tk_harc_";

var charID = "";
var hashData = new Array();

var charPage = "http://www.thrillion.hu/char.php";
var magicPage = "http://www.thrillion.hu/spellbook.php";
var trickPage = "http://www.thrillion.hu/trickbook.php";

var iconPath = "http://www.thrillion.hu/images/icons/icon_user.gif";

var HAnames = new Array("Taktika", "Varázslat", "Csel");
	
var htac = new Array("Normál", "Támadó", "Védő", "Roham");
var magic = new Array();
var trick = new Array();


function getElementByInnerHTML(parent, tag, text) {
	var tags = parent.getElementsByTagName(tag);
	
	for (var i=0; i<tags.length; i++)
		if (tags[i].innerHTML.indexOf(text)!=-1) return tags[i];

	return null;		
}

function getElementByAttrib(parent, tag, attib, value) {
	var tags = parent.getElementsByTagName(tag);
	
	for (var i=0; i<tags.length; i++)
		if (tags[i].getAttribute(attib)==value) return tags[i];

	return null;		
}

function getElementByAttribPart(parent, tag, attib, value) {
	var tags = parent.getElementsByTagName(tag);
	
	for (var i=0; i<tags.length; i++) {
		var tAttib = tags[i].getAttribute(attib);
		if ((tAttib!=null) && (tAttib.indexOf(value)!=-1)) return tags[i];
	}
	return null;
}

function getParent(pTag, child) {
	var parent = child.parentNode;
	if (parent==null) return null;
	if (parent.tagName==pTag) return parent;
	return getParent(pTag, parent);
}

function getTableFromTitle(title) {
	return getParent("TABLE", getElementByInnerHTML(document, "font", title));
}


function getParam(s){
	return getURLparam(document.location.href, s);
}

function getURLparam(tURL, s) {

	var h = tURL.indexOf(s);
	if (h == -1) return -1;
	var pURL = tURL.substring(h+s.length+1,tURL.length);
	
	if (tURL[h-1]=='?' || tURL[h-1]=='&') {
		h = pURL.indexOf('&');
		if (h==-1) return pURL;
		return pURL.substring(0,h);
	} else {
		return getURLparam(pURL,s);
	}
}

function gThisOpt(idx) {
	var name = HAnames[idx];
	for (var i=0; i<hashData.length; i++) {
		var hd = hashData[i];
		if ((hd.length>0) && (hd.substring(0, 1)==name.substring(0, 1))) return hd.substring(2);
	}
	
	return "";
}

function createP(idx, arr) {
	var name = HAnames[idx];
	var tOpt = gThisOpt(idx);

	var p = document.createElement("p");
	p.innerHTML = name + ":&nbsp;";
	p.appendChild(createSelect(name,arr, tOpt));
	return p;
}

function createSelect(name, obj, tOpt) {
	var sel = document.createElement("select");
	sel.setAttribute("id", "sel_" + name.substring(0, 3).toLowerCase());
	sel.setAttribute("class", "input");

	for (var i=0; i<obj.length; i++)
		sel.appendChild(createOption(obj[i], (obj[i].indexOf(tOpt)!=-1)));

	return sel;
}

function createOption(txt, isSelected) {
	var opt = document.createElement("option");
	opt.setAttribute("value",txt);
	if (isSelected) opt.setAttribute("selected","true");
	opt.innerHTML = txt;
	return opt;
}

function getResult(mode, inURL) {
	resultMode = mode;

	GM_xmlhttpRequest({
		method: 'GET',
		url: inURL ,
		overrideMimeType: 'text/html; charset=iso-8859-2',
		onload: function(response) {
			finalizeResult(response.responseText);
		}
	});	
	
}

function getRAWdata(str) {
	str = str.substring(str.indexOf(" neve"));
	str = str.substring(str.indexOf("<tr>"));
	str = str.substring(0, str.indexOf("</table>"));
	return str;
}

function getString(str, begin, end) {
	var pos = 0;

	if (begin!=null) {
		pos = str.indexOf(begin);	
		if (pos==-1) return "";	
		str = str.substring(pos+begin.length);
	}	

	if (end!=null) {
		pos = str.indexOf(end);
		if (pos==-1) return "";	
		str = str.substring(0, pos);
	}
	
	return str.clear().trim();	
}


function finalizeResult(response) {

	var str = getRAWdata(response);
	var pos = str.indexOf("&raquo;");
	while (pos!=-1) {
		str = str.substring(pos+7);
				
		var name = getString(str, null, "<a");
		str = str.substring(str.indexOf("<td>")+4);
		if (getString(str, null, "</td>")=="Harci") {
			str = str.substring(str.indexOf("</td>")+5);
			name += " (" + getString(str, "<td>", "</td>") + ")";
			
			if (resultMode=="magic")
				magic.push(name);
			else
				trick.push(name);
			
		}
				
		pos = str.indexOf("&raquo;");
	}

	if (resultMode=="magic") {
		if (!fillTrick())
				addSelects();
	} else {
		addSelects();
	}

}

function findCharAttr(aName) {
	var body = document.getElementsByTagName("body")[0].innerHTML;
	
	body = body.substring(body.indexOf("Szint:"));
	body = body.substring(0, body.indexOf("TP:"));
	
	return (body.indexOf(aName) != -1);
}

function clearCharpage() {
	var font = getElementByInnerHTML(document, "font", "Karakterlap - ");
	font.innerHTML = "<b>Harci taktika</b>";
	
	var dt = getParent("TABLE", getTableFromTitle("Általános"));
	dt.parentNode.removeChild(dt);
}

function addIcon() {
    var p = document.createElement("p");
    var a = document.createElement("a");
	a.setAttribute("href", charPage + "?ht_mode=1");	
	p.innerHTML = "Harci taktika: ";
    var img = document.createElement("img");
	img.setAttribute("src", iconPath);
	img.setAttribute("style", "border: none;");	
	a.appendChild(img);
	p.appendChild(a);
	
	
	getElementByInnerHTML(document, "b", "Bátorság").parentNode.appendChild(p);
}

function createLink(name, url) {
	var p = document.createElement("p");
	var a = document.createElement("a");
	a.setAttribute("href", url);	
	a.innerHTML = name;
	p.innerHTML = "[";
	p.appendChild(a);
	p.innerHTML += "]";
	return p;
}

function getSelectedVal(idx) {
	var sel = document.getElementById("sel_" + HAnames[idx].substring(0, 3).toLowerCase());
	if (sel==null) return "";
	var val = sel.options[sel.selectedIndex].innerHTML;

	switch(idx) {
	case 1:
		val = val.substring(0, val.indexOf("(")-1);
		break;
	case 2:
		val = val.substring(0, val.indexOf("[")-1);	
		break;
	}
	
	return HAnames[idx].substring(0, 1) + "_" + val;
}

function Save() {
	var hashData = getSelectedVal(0) + "," + getSelectedVal(1) + "," + getSelectedVal(2);
	GM_setValue(hashTag + charID, hashData);
}

function createButton() {
	var btn = document.createElement("input");
	btn.setAttribute("type","button");
	btn.setAttribute("name","btnSave");
	btn.setAttribute("value","Ment");
	btn.setAttribute("style","font-family: verdana, arial, helvetica, sans-serif; font-size: small; color: orange; background-color: #333333; border: 1px solid #CCCCCC;");
	btn.addEventListener( "click", Save, true );
	return btn;
}

function addSelects() {
	var div = document.createElement("div");
	
	div.appendChild(createP(0, htac));
	if (magic.length>0) div.appendChild(createP(1, magic));
	if (trick.length>0) div.appendChild(createP(2, trick));
	div.appendChild(createButton());
	
	div.setAttribute("style", "margin-left:30px;");
	div.appendChild(createLink("Vissza", charPage));
	
	getTableFromTitle("Harci taktika").parentNode.appendChild(div);
		
}

function fillMagic() {
	if (findCharAttr("Mágia")) {
		getResult("magic", magicPage);
		return true;
	}
	
	return false;
}

function fillTrick() {
	if (findCharAttr("Csel")) {
		getResult("trick", trickPage);
		return true;
	}
	return false;
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
			ret[i] = ret[i].trim();
	}

	return ret;	
}

function isValid() {
	var vals = GM_listValues();
	
	if (vals.length==0) {
		return false;
	} else {
		for each (var val in vals) {
			if (val==(hashTag + charID)) {
				hashData = IOexamArray(GM_getValue(hashTag + charID));
				return true;
			}
				
		}
	}
	return false;
}

function findOpt(sel, value) {
	var opts = sel.getElementsByTagName("option");
	
	for (var i=0; i<opts.length; i++)
		if (opts[i].innerHTML.indexOf(value)!=-1) return i;

	return 0;
}

function fillSelect(name, value) {
	var sel = document.getElementsByName(name)[0];
	sel.selectedIndex = findOpt(sel, value);
}

function fill() {
	fillSelect("tactic", gThisOpt(0));
	fillSelect("spell", gThisOpt(1));
	fillSelect("trick", gThisOpt(2));
}

function Main() {
	findChar();
	var valid = isValid();

	if (location.href.indexOf("char.php")==-1) {
		if (valid) fill();
	} else {
		if (getParam("ht_mode")==-1) {
			addIcon();
		} else {
			clearCharpage();
			if (!fillMagic())
				if (!fillTrick())
					addSelects();		
		}
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