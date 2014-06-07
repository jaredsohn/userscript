/*
	GreaseMonkey userscript for showing prices in various currencies.
	To modify the currencies list, update the kofCurrencies object;
	Works on various Amazon shops and on many other sites - try to 
	add your favorite online stores.
	
	Exchange rates provided by Yahoo @ www.yahoo.com
	
	New to GreaseMonkey?  <URL: http://greasemonkey.mozdev.org/ >
	
	2005-04-17  Carl Henrik Lunde  chlunde+greasemonkey <at> ping.uio.no
	Modified:
	2005-08-07  Ori Avtalion  oavtal <at> bezeqint.net
	Modified:
	2005-08-17 (David *)Frenkiel dfl <at> beitar-jerusalem.org.il
*/

// ==UserScript==
// @name          AmAmaAmazon
// @namespace     http:/www.beitar-jerusalem.org.il/
// @description   Show prices in various currencies, on Amazon and many other sites.
// @include       http://www.amazon.*/*
// @include       http://*barnesandnoble*/*
// @include       http://amazon.*/*
// @include       http://*wallashops*/*
// @include       http://*zap.co.il/*
// ==/UserScript==

// Customize to fit:
var kofSiteCurrency = "USD";
var kofSiteCurrencySymbol = "\$";

var kofCurrencies = { 
	ILS: {name: unescape("%u20AA"), rates: {}, used: false, when: '' }, 
	CHF: {name: "CHF", rates: {}, used: false, when: ''}, 
	GBP: {name: unescape("%A3"), rates: {}, used: false, when: ''}, 
	EUR: {name: "&euro;", rates: {}, used: false, when: ''}, 
	USD: {name: "$", rates: {}, used: false, when: '' }, 
	JPY: {name: "Yen", rates: {}, used: false, when: '' }, 
	PLN: {name: "Zloti", rates: {}, used: false, when: '' }, 
	DKK: {name: "DK", rates: {}, used: false, when: '' } };
	
var kofPrefs = { tax: 0, folded: 0, x: 10, y: 10 }

var kofRequests = new Array;

var rate;
var gmKey = 'amznKofif1';
var undefined;

kofTrace  = function () {
	return;
	var str = '';
	for (var i = 0; i < arguments.length; i++) {
		str += arguments[i];
		str += ' ';
	}
	str += '\n';
	if (GM_log)
		GM_log(str);
	else if (dump)
		dump(str);
}

kofGetValue = function(key, def) {
	var ret = '';
	if (undefined == def)
		def = '';
	try {
		ret = GM_getValue(key);
		if (ret == undefined)
			ret = def;
	}
	catch(e) {
		kofTrace("exception in kofGetValue", e.message);
		ret = def;
	}
	return ret;
}

kofSetValue = function(key, val) {
	try {
		ret = GM_setValue(key, val);
		kofTrace("set value of key", key, "to", val);
	}
	catch(e) {
		kofTrace("exception in kofSetValue", e.message);
	}
}

function kofGetScroll() {
	var ret = new Object;
	if (typeof(window.pageYOffset) != 'undefined') {
		ret.offsetTop = window.pageYOffset;
		ret.offsetLeft = window.pageXOffset;
	}
	else if (document.documentElement && (typeof(document.documentElement.scrollTop) != 'undefined')) {
        ret.offsetLeft = document.documentElement.scrollLeft;
        ret.offsetTop = document.documentElement.scrollTop;
	}
	else if (document.body && (typeof(document.body.scrollTop) != 'undefined')) { // other Explorers
        ret.offsetLeft = document.body.scrollLeft;
        ret.offsetTop = document.body.scrollTop;
	}
	else {
        ret.offsetLeft = 0;
        ret.offsetTop = 0;
	}
	
	return ret;
}

kofAddStyle = function(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function kofGetCurrencyData(cFrom, cTo) {
	kofOnCurrencyLoaded.currencyTo = cTo;
	kofOnCurrencyLoaded.currencyFrom = cFrom;
//http://finance.yahoo.com/d/quotes.csv?s=EURCHF=X&f=l1&e=.csv 
	var url = "http://finance.yahoo.com/d/quotes.csv?s=" + cFrom + cTo + "=X&f=l1&e=.csv";
//	kofTrace("accessing url", url);
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: kofOnCurrencyLoaded,
		onerror: kofOnCurrencyError
	});
}

function kofOnCurrencyError(responseDetails) {
	alert("Error fetching currency data");
}

function kofOnCurrencyLoaded(responseDetails) {
	rate = responseDetails.responseText;
	var cTo = arguments.callee.currencyTo;
	var cFrom = arguments.callee.currencyFrom
	var rec = kofCurrencies[cTo];
	rec.rates[cFrom] = rate;
	rec.when = kofGetToday();

	kofProcessNextRequest();
}

kofGetToday = function() {
	var today = new Date();
	var s = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
	return s;
}

// Convert desired currency
function kofConvertCurrency() {
//	kofTrace("running kofConvertCurrency");
	kofTax = document.getElementById("MaorTax").value;
	if (kofTax != kofPrefs.tax) {
		kofPrefs.tax = kofTax;
		kofWritePrefs();
	}
	if (kofTax != '' && (! isNaN(kofTax))) {
		kofTax = parseFloat(kofTax);
		kofTax = (100.0 + kofTax) / 100;
	}
	else {
		kofTax = 1;
	}
	var elnames = new Array("td", "font", "b", "span");
	for (elname in elnames) {
		var elems = window.document.getElementsByTagName(elnames[elname]);
//		kofTrace("found", elems.length, "elements of type", elname);
		for (i = 0; i < elems.length; ++i) {
			var price = elems[i];
			try {
				kofUpdatePrices(price);
			}
			catch(e) {}
		}
	}
}

kofUpdatePrices = function(elem) {
	if (elem.className == "MaorRate")
		return;

	var price;
	if (elem.kofPrice) {
		price = elem.kofPrice;
	}
	else {
		var idx = elem.innerHTML.indexOf(kofSiteCurrencySymbol);
//		kofTrace("currency", kofSiteCurrencySymbol, "found at index", idx);
		if (idx != -1 /*&& idx < 3*/ && elem.innerHTML.length < 32) {
			var str = kofLocatePrice(elem.innerHTML, idx);

//			str = str.replace(/[^0-9\.]/, '');
			price = parseFloat(str);
//			kofTrace("found element", elem.innerHTML, "string", str, "price", price);
		}
		else {
			if (idx >- 0) {
//				kofTrace("skipping element", elem.innerHTML.length);
			}
		}
	}

	if (elem.kofRates) {
		elem.removeChild(elem.kofRates);
		elem.kofRates = null;
	}

	if (price) {
		elem.kofPrice = price;
//		kofTrace("found price", price);
		var rec, newprice, arr = new Array;
		for (var key in kofCurrencies) {
			rec = kofCurrencies[key];
			if ((key != kofSiteCurrency) && rec && rec.used && rec.rates[kofSiteCurrency]) {
//				kofTrace("trying to convert price", price);
				newprice = Math.round(price * rec.rates[kofSiteCurrency] * kofTax);
				arr.push(String(newprice) + ' ' + rec.name);
			}
			else {
//				kofTrace("skipped element");
			}
		}
		if (arr.length) {
			elem.kofRates = window.document.createElement("SPAN");
			elem.kofRates.className = "MaorRate";
			elem.kofRates.innerHTML = '(' + arr.join(',') + ')';
			elem.appendChild(elem.kofRates);
		}
	}
}

kofLocatePrice = function(str, idx) {
	var ret = '';
	var i;
	var ch;
	var len = str.length;
	var idxf = -1, idxb = -1;
	for (i = idx + 1; i < len; i++) {
		ch = str.charAt(i);
		if (ch >= '0' && ch <= '9') {
			idxf = i;
			break;
		}
	}
	for (i = idx - 1; i >= 0; i--) {
		ch = str.charAt(i);
		if (ch >= '0' && ch <= '9') {
			idxb = i;
			break;
		}
	}
	var d1 = Math.abs(idx - idxf), d2 = Math.abs(idx - idxb);
	if (idxf >= 0 && (idxb < 0 || (d1 < d2))) 
		ret = str.substring(idx + 1);
	else
		ret = str.substring(0, idx);
	ret = ret.replace(/([0-9])[ - ]+([0-9])/g, '$1 $2');
	ret = ret.replace(/([0-9]),([0-9][0-9][^0-9])/g, '$1\.$2');
	ret = ret.replace(/([0-9]),([0-9][0-9][0-9])/g, '$1$2');
	ret = ret.replace(/[^0-9\. ]/g, '');
	return ret;
}

kofWritePrefs = function() {
	var cur = kofWriteCurrencies();
	var str = '', cookie;

	str += kofPrefs.tax + ',' + (kofPrefs.folded ? 1 : 0) + ',' + kofPrefs.x + ',' + kofPrefs.y;
	var cookie = str + "@" + cur;
	kofSetValue(gmKey, cookie);
}

function kofWriteCurrencies() {
	var cookie = '';
	try {
		var rec;
		var arr = [];
		var str, arrRates, strRates;
		for (var key in kofCurrencies) {
			arrRates = [];
			rec = kofCurrencies[key];
			for (var rate in rec.rates) {
				arrRates.push(rate + '=' + rec.rates[rate]);
			}
			if (arrRates.length)
				strRates = arrRates.join('~');
			else
				strRates = '';
			str = key + ',' + rec.when + ',' + strRates + ',' + (rec.used ? 1 : 0);
			arr.push(str);
		}
		cookie = arr.join('|');
//		kofTrace("setting key to", cookie);
	}
	catch (e) {
		kofTrace("exception in writecurrency", e.message);
	}
	return cookie;
}

kofReadPrefs = function() {
	var cookie = kofGetValue(gmKey);
	kofTrace("read cookie", cookie);
	if (cookie.length) {
		var arr = cookie.split('@');
		if (arr.length == 2) {
			var rec = arr[0];
			kofReadCurrencies(arr[1]);
			arr = arr[0].split(',');
			kofPrefs.tax = arr[0] ? parseFloat(arr[0]): 0;
			kofPrefs.folded = parseFloat(arr[1]) ? 1 : 0;
			kofTrace("found folded value", kofPrefs.folded);
			kofPrefs.x = parseFloat(arr[2]) ? parseFloat(arr[2]): 10;
			kofPrefs.y = parseFloat(arr[3]) ? parseFloat(arr[3]): 10;
		}
	}
}

function kofReadCurrencies(cookie) {
	try {
		if (cookie.length) {
			var arr = cookie.split('|');
			var rec, recarr;
			for (var i = 0; i < arr.length; i++) {
				recarr = arr[i].split(',');
				rec = kofCurrencies[recarr[0]];
				if (rec) {
					rec.when = recarr[1];
					var sRates = recarr[2];
					if (sRates.length) {
						var arrRates = sRates.split('~');
//						kofTrace("found", arrRates.length, "rates in", recarr[0]);
						for (var j = 0; j < arrRates.length; j++) {
							var oneRate = arrRates[j].split('=');
							rec.rates[oneRate[0]] = oneRate[1];
						}
					}
					else {
						
					}
					rec.used = Number(recarr[3]);
				}			
			}
		}
	}
	catch (e) {
		kofTrace("exception in kofReadCurrencies", e.message);
	}
}


function kofReadCurrency(cur) {
	var ret = 0;
	var rec = kofCurrencies[cur];
	if (rec) {
		var today = kofGetToday();
		if (rec.when == today)
			ret = rec.rates[kofSiteCurrency];
			if (! ret)
				ret = 0;
	}
	return ret;
}

kofProcessNextRequest = function() {
	if (kofRequests.length) {
		var name = kofRequests.pop();
		kofGetCurrencyData(kofSiteCurrency, name);
	}
	else {
		kofWritePrefs();
		kofConvertCurrency();
	}
}

function kofProcessPage() {
	kofRequests = new Array;
	var rec, rate;
	for (var key in kofCurrencies) {
		if (key != kofSiteCurrency) {
			rec = kofCurrencies[key];
			if (rec.used) {
//				kofTrace("kofProcessPage found used currency", key);
				rate = kofReadCurrency(key);
				if (rate == 0) {
					kofTrace("no rate for currency", key, "pushing request");
					kofRequests.push(key);
				}
			}
		}
	}
	kofProcessNextRequest();
}

kofTogglePanel = function() {
	var cont = arguments.callee.cont;
	var str;
	if (cont.style.display != 'block') {
		cont.style.display = 'block';
		kofPrefs.folded = false;
	}
	else {
		kofPrefs.folded = true;
		cont.style.display = 'none';
	}
	kofWritePrefs();
}

kofDetectCurrency = function() {
	try {
		var loc = window.location.host.toLowerCase();
		var ind = loc.indexOf(".com");
		if (ind == loc.length - 4) {
			kofSiteCurrency = "USD";
			kofSiteCurrencySymbol = "\$";
		}
		else if (loc.indexOf(".co.uk") > 0) {
			kofSiteCurrency = "GBP";
			kofSiteCurrencySymbol = unescape("%A3");
		}
		else if (loc.indexOf(".de") > 0 || loc.indexOf(".fr") > 0) {
			kofSiteCurrency = "EUR";
			kofSiteCurrencySymbol = "EUR";
		}
		else if (loc.indexOf(".co.il" > 0)) {
			kofSiteCurrency = "ILS";
			kofSiteCurrencySymbol = unescape("%u20AA");
		}
	}
	catch (e) {
		kofSiteCurrency = "USD";
		kofSiteCurrencySymbol = "\$";
	}
//	kofTrace("currency", kofSiteCurrencySymbol, kofSiteCurrency);
}

kofRepositionPanel = function() {
	var offset = kofGetScroll();
	var cont = arguments.callee.cont;
	cont.style.top = String(offset.offsetTop + cont.baseTop) + "px";
	cont.style.left = String(offset.offsetLeft + cont.baseLeft) + "px";
}

onCurrencyClick = function() {
	var rec = kofCurrencies[this.cName];
	if (rec) {
		rec.used = this.checked;
		kofProcessPage();
	}
}

kofStartDrag = function(e) {
	clearInterval(	kofInterval);
	kofEndDrag.moved = false;
	window.document.addEventListener("mousemove", kofDrag, false);
	window.document.addEventListener("mouseup", kofEndDrag, false);
	if (e)
		e.preventDefault();
}

kofEndDrag = function(e) {
	if (e)
		e.preventDefault();
	window.document.removeEventListener("mousemove", kofDrag, false);
	window.document.removeEventListener("mouseup", kofEndDrag, false);
	if (arguments.callee.moved) {
		var offset = kofGetScroll();
		var c = arguments.callee.cont;
		var top = parseInt(c.style.top);
		var left = parseInt(c.style.left);
		c.baseTop = top - offset.offsetTop
		c.baseLeft = left - offset.offsetLeft;
		kofPrefs.x = c.baseLeft;
		kofPrefs.y = c.baseTop;
		kofWritePrefs();
	}
//	kofTrace("top is", top, "left is", left, "new basetop is", c.baseTop, "new baseleft is", c.baseLeft);
	kofInterval = setInterval(kofRepositionPanel, 1500);	
}

kofDrag = function(e) {
	if (typeof e == 'undefined') 
		e = window.event;
	kofEndDrag.moved = true;
//	kofTrace("event x", e.clientY, "y", e.clientX);
	var c = arguments.callee.cont;
	var o = kofGetScroll();
	c.style.top = String(e.clientY + o.offsetTop) + "px";
	c.style.left = String(e.clientX + o.offsetLeft) + "px";
//	kofTrace("moving");
}

kofClickTax = function(e) {
	kofProcessPage();
	if (e)
		e.preventDefault();
}

function kofRevealPanel() {
	kofRepositionPanel();
	var t = document.getElementById("MaorContent");
	t.style.display = kofPrefs.folded ? 'none' : 'block';
	kofTrace("setting display of content to", t.style.display);

	var c = document.getElementById("Maor");
	c.style.visibility = "visible";
	kofInterval = setInterval(kofRepositionPanel, 1500);	
}

function kofShowPanel() {
	var doc = window.document;
	kofAddStyle('#Maor { position:absolute; top:10px; left:10px; width: 110px; z-index:10; visibility: hidden;}\
	#MaorTB { background-color:#444444; color:#ffffcc; width: 100%; font-size:10px; border:1px solid black; border-bottom:1px solid #AA8855; cursor:pointer;}\
	#MaorContent { background-color:#ffee88; border:1px outset #222222; font-size:10px; }\
	.MaorCB { width:10px; height:10px;}\
	#MaorTitle { float: left; }\
	#MaorCloseBox { float: right; text-align:center; color:black; padding:0px 1px 0px 1px; background-color:#ffffff; border:1px solid black; width:15px; font-family:courier; }\
	.MaorRate { background-color:#ffff99; }\
	#MaorTax { font-size:9px; width:35px; }\
	#MaorTaxDiv { padding-left:5px; padding-right:4px; border-bottom:1px solid black; background-color:#ffff77; font-size:10px; }');

	var c = doc.createElement("DIV");
	c.id = "Maor";
	c.baseTop = kofPrefs.y;
	c.baseLeft = kofPrefs.x;

	var tb = doc.createElement("DIV");
	tb.id = "MaorTB";
	tb.style.height = 15;

	var spn = doc.createElement("DIV");
	spn.id = "MaorTitle";
	spn.innerHTML = "Kof Money &nbsp; &nbsp; &nbsp; &nbsp;";
	tb.appendChild(spn);
	spn.onmousedown = kofStartDrag;
	kofDrag.cont = c;
	kofEndDrag.cont = c;
	kofStartDrag.cont = c;

	spn = doc.createElement("SPAN");
	spn.id = "MaorCloseBox";
	spn.kofText = doc.createTextNode(" X");
	spn.appendChild(spn.kofText);
	tb.appendChild(spn);
	spn.addEventListener("click", kofTogglePanel, true);


	c.appendChild(tb);
	var tab = doc.createElement("DIV");
	tab.id = "MaorContent";
	var taxdiv = doc.createElement("DIV");
	taxdiv.id = "MaorTaxDiv";
	taxdiv.innerHTML = "tax: %<input type='text' maxlength=4 size=3 ID='MaorTax' value='" + kofPrefs.tax + "' />";
	var a = doc.createElement("A");
	a.href = '#';
	a.appendChild(doc.createTextNode("Go " + unescape("%u221A")));
	a.addEventListener("click", kofClickTax, false);
	taxdiv.appendChild(a);
	tab.appendChild(taxdiv);
	var rec;
	for (var key in kofCurrencies) {
		rec = kofCurrencies[key];
		var curdiv = doc.createElement("DIV");
		var cb = doc.createElement("INPUT");
		cb.type = "checkbox";
		cb.className = "MaorCB";
		cb.onclick = onCurrencyClick;
		cb.cName = key;
		cb.checked = rec.used;
		curdiv.appendChild(cb);
		var dd = doc.createElement("SPAN");
		dd.innerHTML = rec.name;
		curdiv.appendChild(dd);
		tab.appendChild(curdiv);
	}
	c.appendChild(tab);

	kofTogglePanel.cont = tab;
	tab.indicator = spn;
	kofRepositionPanel.cont = c;

	var body = doc.getElementsByTagName("BODY")[0];
	body.appendChild(c);
//	kofTrace("body", body, "maor: ", doc.getElementById("Maor"));
	setTimeout(kofRevealPanel, 1500);
}

if (window.document.getElementById("Maor"))
	return;

kofReadPrefs();
kofDetectCurrency();
kofShowPanel();
kofProcessPage();