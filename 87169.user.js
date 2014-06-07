// ==UserScript==
// @name           fiveta.com icon bar
// @namespace      http://www.fiveta.com
// @description    fiveta.com iconlarinin imdb.com'a uyarlanmasi
// @include       http://*.imdb.com/title/*
// @include       http://*.imdb.com/title/*/
// @include       http://*.imdb.com/title/*/#*
// @include       http://*.imdb.com/title/*/combined*
// @include       http://*.imdb.com/title/*/maindetails*
// @include       http://imdb.com/title/*/
// @include       http://imdb.com/title/*/#*
// @include       http://imdb.com/title/*/combined*
// @include       http://imdb.com/title/*/maindetails*
// @grant       none
// @require     https://userscripts.org/scripts/source/87169.user.js
// ==/UserScript==





var siteler = new Array();

siteler.push(new sitem("Film Veri Tabanı", "http://fiveta.com/film/%imdb-id", true, "http://fiveta.com/favicon.ico"));
siteler.push(new sitem("Divxplanet", "http://divxplanet.com/cse.php?q=tt%imdb-id&cx=009015947334585847211:6djglhionb4&ie=ISO-8859-9&oe=ISO-8859-9&cof=FORID:9&hl=tr&sa=Ara#204", true, "http://www.divxplanet.com/favicon.ico"));
siteler.push(new sitem("Sinemalar", "http://www.sinemalar.com/ara/?type=all&page=1&q=%title", false, "http://www.sinemalar.com/favicon.ico"));
siteler.push(new sitem("Youtube", "http://www.youtube.com/results?search_query=%22%title%22&search=Search", false, "http://s.ytimg.com/yt/favicon-vfl122048.ico"));
siteler.push(new sitem("Kick Ass", "http://kickass.to/usearch/%title/", false, "http://kastatic.com/images/favicon.ico"));
siteler.push(new sitem("Torrentz", "http://www.torrentz.com/search?q=%title", false, "http://www.torrentz.com/favicon.ico"));
siteler.push(new sitem("Movie Poster", "http://www.movieposterdb.com/movie/%imdb-id", true, "http://www.movieposterdb.com/favicon.ico"));
siteler.push(new sitem("DVD Release", "http://videoeta.com/search/?s=%title", false, "http://videoeta.com/favicon.ico"));
siteler.push(new sitem("Rapidshare", "http://www.google.com/search?q=%title http://rapidshare.com/files", false, "http://images3.rapidshare.com/img/favicon.ico"));


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
		var html = "<a href=\"" + this.getadres(title, id) + "\" target=_blank><img src=\"" + this.icon + "\" title=\"" + this.ad + "\" style=\"border:1px solid #ccc; padding:5px 4px;\"><\/a>&nbsp;";
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
 var iconbar = xpath("//div[@class='social']", document);
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