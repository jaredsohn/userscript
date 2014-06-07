// ==UserScript==
// @name          Muhterem IMDB Yeni
// @namespace     Bu da mı gol değil?
// @description   Bunu da mı aramadım ha!
// @include       http://*.imdb.com/title/*
// @include       http://*.imdb.com/title/*/
// @include       http://*.imdb.com/title/*/#*
// @include       http://*.imdb.com/title/*/combined*
// @include       http://*.imdb.com/title/*/maindetails*
// @include       http://imdb.com/title/*/
// @include       http://imdb.com/title/*/#*
// @include       http://imdb.com/title/*/combined*
// @include       http://imdb.com/title/*/maindetails*
// ==/UserScript==



var siteler = new Array();

siteler.push(new sitem("Divxplanet", "http://divxplanet.com/cse.php?q=tt%imdb-id&cx=009015947334585847211:6djglhionb4&ie=ISO-8859-9&oe=ISO-8859-

9&cof=FORID:9&hl=tr&sa=Ara#204", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC

+0lEQVR4nKWTXWhTZxzGn/d9z0eTNl9N0iS2SZs2fnW1yrSsEymDOnVuF5tOGANRURDvVBhuMHc1dO7j1u1iA/FCGILix4bKLIqoII6pnU2UmURLbWLTJienyTkn57zn7Ernx0DE5/IP/x888HuI4zh4nQj/d

zS5SQrqo1hBqcVlgRjJUPSuR/bUXwrgNsfZ0evv/XT89p5qSVgScDd5tIbJq7peXLHcf3T3h0MHot5w8ekf8riCaZnk2xNnvh65UN8zvChIEmERhBFUVRtqnWOiYiJdGb+/f8fQ+qUd8/96AihUy

+Frk2MDV9MTQyPn7M/e6gyCSxzUxxASHTgqhc/PUFYt5CoabuUfZA99uerjoqa0vZNYfIGcyd/enH2k/HL9Vg197UHcuFPGtF5DpLUFdVNHzC0C4Biv2TAaHL3RMFSpaBqSevOHleuGaZPIbKnhwtSUjprewL

x4AGG3jK5WLwzNxoKuKBJzImgiFDGZoDvSgjfDXWKHR8pKAmkIss0mxqen7s

+NhzpLVQ0P/ynh78kGqEjRH/fiUroAgxMoswCtcVxJZ1CaUbFze6jNsGwXHexInTdV/VT27jSoDYhUhN8roazaEB0CyXGB8iaYkzouHykgc6wIJVcxP+rt3eF3uRUBAN5v/

+ONDcwApGaMpuZg1FgKcm8EraKIlN+CYTEgkMMHayXw2SKkRJBOTeS+SAa+3yYAQDQoe6jmAtcVvNsjoCd/DKnVEQiEgzoWZjlFrFvATEsf/vwtg8SSJBPk

+BgllAsAwEJD3x28ltuSSfevGeiogNhdODzmwCnMor3TDX80Bp/jQt1muFgcrO9K9ezrS67/mVH2n0jlmuL75MDJ3/OFtkFfwIWGUoGlGPDPiwAmASwLpZmiuXtT666ty4d/ZIw9ayIAlOuK96tfz35z

+lLjU9l2eYJtXpQUG3Wt5sTCSmbvxoWfr+0fOM0oe1Hlp/eQn3mYvJzOrnhQ0hcIgq0t645deTs192qz3Kw9P6YXAK+afwFFBlABNzEZ7AAAAABJRU5ErkJggg%3D%3D"));
siteler.push(new sitem("ShareBus", "http://www.sharebus.com/index.php?act=Search&CODE=01&forums=all&search_in=imdbid&result_type=topics&keywords=tt%imdb-id", 

true, "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwUlEQVQ4jWWSa0jTURjGf+fftv

+slW5O02mpZEhmWJhF2YUCo5KCosQuYGVgUVFYRPSh6EoRBVlQRPQpELvZ1UJMK03IrlbeyjScZhenbVluzu30oZw6X3jgnPec5znneXkEIPCrzzV7w0qfPEuo

+/Aj1uWC6cmBzW63q6b8fGXLhZf0+t8XfcjNjVVfVmSeOXY4xa2qSPgHvV6RazNiZWPdplpr04W5Azk+gcLCRSF1b7Jfr82YIAFpMuokIKOjRsjCm

+ny7fMsaWvbL9vbjnlsbafX9/EUgEu5s80nT1SV37hdMznvai0ABoOG8eNMZGUm8qDoPcHmYEAgcCrw6+KzstUrAIYBosctLxeVtKY8LG1Gyn++7A43lnAVu72LJWkTiYuL

+e8IwCtU1TD9t7P8rLh/a2HchuxHdW1fnYMGo9EIli2NITLChBASVaewM2fx/6kJBApfvr5boCl7+j3DnwwQPTYQu72byhfVBOg1eLyCdZnJmM2hAEjpISQ4YZrmfXV7kD85db6Fc2eWYxg5gu/fOqmutfKpo

QOHo5vHZa+w2f4QYRlJQrwlXuNyuYe8HhM1CqPJDEBEZAARkRZ653k4eCifopIvfGzoAmDTxslBSnSU2esvcLWgic1b86iqavD17I4e8q83+sgAOq2nRUlKDLodoFcGCXT

+dHHlej1btt/hl6MTEOzafY12W38ItVqYGG8qVrp6myqnTjG/GuID+NjYhdMJ0gtvqloHnSUnhbYYR/fcBRDncudMMRpVN/THtw8F+atkU/0eqdP190YHq54j

+5LSGBjlrPWTssPDAz3+Atu2zJBrMib59mEhes/RXcm+KDNgIa7k7UhbszLRahyuDPmJwaCVC1PHfDp+ICV1IMen0ldW6yl9RUlR

+q179bNc3V6Loh2OJSyweea0sOLWjheFOTktg1L3F21WIL5Z0YKNAAAAAElFTkSuQmCC"));
siteler.push(new sitem("Ekşi", "http://sozluk.sourtimes.org/show.asp?t=%title", false, "http://wwww.eksisozluk.com/favicon.ico"));
// ==UserScript==
// @name          Muhterem IMDB Yeni
// @namespace     Bu da mı gol değil?
// @description   Bunu da mı aramadım ha!
// @include       http://*.imdb.com/title/*
// @include       http://*.imdb.com/title/*/
// @include       http://*.imdb.com/title/*/#*
// @include       http://*.imdb.com/title/*/combined*
// @include       http://*.imdb.com/title/*/maindetails*
// @include       http://imdb.com/title/*/
// @include       http://imdb.com/title/*/#*
// @include       http://imdb.com/title/*/combined*
// @include       http://imdb.com/title/*/maindetails*
// ==/UserScript==



var siteler = new Array();

siteler.push(new sitem("Divxplanet", "http://divxplanet.com/cse.php?q=tt%imdb-id&cx=009015947334585847211:6djglhionb4&ie=ISO-8859-9&oe=ISO-8859-

9&cof=FORID:9&hl=tr&sa=Ara#204", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC

+0lEQVR4nKWTXWhTZxzGn/d9z0eTNl9N0iS2SZs2fnW1yrSsEymDOnVuF5tOGANRURDvVBhuMHc1dO7j1u1iA/FCGILix4bKLIqoII6pnU2UmURLbWLTJienyTkn57zn7Ernx0DE5/IP/x888HuI4zh4nQj/d

zS5SQrqo1hBqcVlgRjJUPSuR/bUXwrgNsfZ0evv/XT89p5qSVgScDd5tIbJq7peXLHcf3T3h0MHot5w8ekf8riCaZnk2xNnvh65UN8zvChIEmERhBFUVRtqnWOiYiJdGb+/f8fQ+qUd8/96AihUy

+Frk2MDV9MTQyPn7M/e6gyCSxzUxxASHTgqhc/PUFYt5CoabuUfZA99uerjoqa0vZNYfIGcyd/enH2k/HL9Vg197UHcuFPGtF5DpLUFdVNHzC0C4Biv2TAaHL3RMFSpaBqSevOHleuGaZPIbKnhwtSUjprewL

x4AGG3jK5WLwzNxoKuKBJzImgiFDGZoDvSgjfDXWKHR8pKAmkIss0mxqen7s

+NhzpLVQ0P/ynh78kGqEjRH/fiUroAgxMoswCtcVxJZ1CaUbFze6jNsGwXHexInTdV/VT27jSoDYhUhN8roazaEB0CyXGB8iaYkzouHykgc6wIJVcxP+rt3eF3uRUBAN5v/

+ONDcwApGaMpuZg1FgKcm8EraKIlN+CYTEgkMMHayXw2SKkRJBOTeS+SAa+3yYAQDQoe6jmAtcVvNsjoCd/DKnVEQiEgzoWZjlFrFvATEsf/vwtg8SSJBPk

+BgllAsAwEJD3x28ltuSSfevGeiogNhdODzmwCnMor3TDX80Bp/jQt1muFgcrO9K9ezrS67/mVH2n0jlmuL75MDJ3/OFtkFfwIWGUoGlGPDPiwAmASwLpZmiuXtT666ty4d/ZIw9ayIAlOuK96tfz35z

+lLjU9l2eYJtXpQUG3Wt5sTCSmbvxoWfr+0fOM0oe1Hlp/eQn3mYvJzOrnhQ0hcIgq0t645deTs192qz3Kw9P6YXAK+afwFFBlABNzEZ7AAAAABJRU5ErkJggg%3D%3D"));
siteler.push(new sitem("ShareBus", "http://www.sharebus.com/index.php?act=Search&CODE=01&forums=all&search_in=imdbid&result_type=topics&keywords=tt%imdb-id", 

true, "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwUlEQVQ4jWWSa0jTURjGf+fftv

+slW5O02mpZEhmWJhF2YUCo5KCosQuYGVgUVFYRPSh6EoRBVlQRPQpELvZ1UJMK03IrlbeyjScZhenbVluzu30oZw6X3jgnPec5znneXkEIPCrzzV7w0qfPEuo

+/Aj1uWC6cmBzW63q6b8fGXLhZf0+t8XfcjNjVVfVmSeOXY4xa2qSPgHvV6RazNiZWPdplpr04W5Azk+gcLCRSF1b7Jfr82YIAFpMuokIKOjRsjCm

+ny7fMsaWvbL9vbjnlsbafX9/EUgEu5s80nT1SV37hdMznvai0ABoOG8eNMZGUm8qDoPcHmYEAgcCrw6+KzstUrAIYBosctLxeVtKY8LG1Gyn++7A43lnAVu72LJWkTiYuL

+e8IwCtU1TD9t7P8rLh/a2HchuxHdW1fnYMGo9EIli2NITLChBASVaewM2fx/6kJBApfvr5boCl7+j3DnwwQPTYQu72byhfVBOg1eLyCdZnJmM2hAEjpISQ4YZrmfXV7kD85db6Fc2eWYxg5gu/fOqmutfKpo

QOHo5vHZa+w2f4QYRlJQrwlXuNyuYe8HhM1CqPJDEBEZAARkRZ653k4eCifopIvfGzoAmDTxslBSnSU2esvcLWgic1b86iqavD17I4e8q83+sgAOq2nRUlKDLodoFcGCXT

+dHHlej1btt/hl6MTEOzafY12W38ItVqYGG8qVrp6myqnTjG/GuID+NjYhdMJ0gtvqloHnSUnhbYYR/fcBRDncudMMRpVN/THtw8F+atkU/0eqdP190YHq54j

+5LSGBjlrPWTssPDAz3+Atu2zJBrMib59mEhes/RXcm+KDNgIa7k7UhbszLRahyuDPmJwaCVC1PHfDp+ICV1IMen0ldW6yl9RUlR

+q179bNc3V6Loh2OJSyweea0sOLWjheFOTktg1L3F21WIL5Z0YKNAAAAAElFTkSuQmCC"));
siteler.push(new sitem("Ekşi", "http://sozluk.sourtimes.org/show.asp?t=%title", false, "http://wwww.eksisozluk.com/favicon.ico"));
siteler.push(new sitem("Google", "http://www.google.com.tr/search?q=%title", false, "http://www.google.com/favicon.ico"));
siteler.push(new sitem("Vikipedi","http://tr.wikipedia.org/w/index.php?search=%title", false. "http://tr.wikipedia.org/favicon.ico"));

function xpath(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function sitem(ad, adres, imid, icon) {
	this.ad = ad;
	this.adres = adres;
	this.imid = imid;
	this.icon = icon;
	
	this.getHTML = function (title, id) {
		var html = "<a href=\"" + this.getadres(title, id) + "\" target=_blank><img border=\"0\" src=\"" + this.icon + "\" title=\"" + this.ad + 

"\"><\/a>&nbsp;";
		return html;
	}
	
	this.getadres = function (title, id) {
		var adres = this.adres;
		if (this.imid) {
			adres = adres.replace(/%imdb\-id/, id);
		}
		else {
			adres = adres.replace(/%title/, encodeURIComponent(title));
		}
		
		return adres;
	}	
}


function baslikal() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];	
	return title;
}


function idal() {
	with (location.href) {
		var id = match(/title\/tt(.*?)\//i)[1];
	}
	return id;
}


function iconekle(title, id, siteler) {
 var iconbar = xpath("//h1[@class='header']", document);
    if (!iconbar || iconbar.snapshotLength != 1) {
    GM_log("Hata! Icon bar bulunamadi.");
    return;
  }

	iconbar = iconbar.snapshotItem(0);
	iconbar.id = "iconbar";
	
   var tdimg;
  for (var i = 0; i < siteler.length; i++) {
    tdimg = document.createElement("span");
    tdimg.innerHTML = siteler[i].getHTML(title, id);
    iconbar.appendChild(tdimg);
	}

}

var title = baslikal();
var id = idal();
iconekle(title, id, siteler);
function xpath(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function sitem(ad, adres, imid, icon) {
	this.ad = ad;
	this.adres = adres;
	this.imid = imid;
	this.icon = icon;
	
	this.getHTML = function (title, id) {
		var html = "<a href=\"" + this.getadres(title, id) + "\" target=_blank><img border=\"0\" src=\"" + this.icon + "\" title=\"" + this.ad + 

"\"><\/a>&nbsp;";
		return html;
	}
	
	this.getadres = function (title, id) {
		var adres = this.adres;
		if (this.imid) {
			adres = adres.replace(/%imdb\-id/, id);
		}
		else {
			adres = adres.replace(/%title/, encodeURIComponent(title));
		}
		
		return adres;
	}	
}


function baslikal() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];	
	return title;
}


function idal() {
	with (location.href) {
		var id = match(/title\/tt(.*?)\//i)[1];
	}
	return id;
}


function iconekle(title, id, siteler) {
 var iconbar = xpath("//h1[@class='header']", document);
    if (!iconbar || iconbar.snapshotLength != 1) {
    GM_log("Hata! Icon bar bulunamadi.");
    return;
  }

	iconbar = iconbar.snapshotItem(0);
	iconbar.id = "iconbar";
	
   var tdimg;
  for (var i = 0; i < siteler.length; i++) {
    tdimg = document.createElement("span");
    tdimg.innerHTML = siteler[i].getHTML(title, id);
    iconbar.appendChild(tdimg);
	}

}

var title = baslikal();
var id = idal();
iconekle(title, id, siteler);