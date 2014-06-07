// ==UserScript==
// @name           VCDQ <- IMDB
// @namespace      movies
// @description    Pulls IMDB stats to VCDQ
// @include        http://www.vcdq.com/index.php*
// ==/UserScript==

var imgs = document.getElementsByTagName("img");
var imdb_lnks = Array();

for each(var img in imgs)
	if(img.src != null)
		if(img.src.match(/imdb/i) != null)
			if(img.parentNode.href != null)
				imdb_lnks.push({a:img, b:img.parentNode, c:img.parentNode.parentNode});
				
var ddd = document.createElement("div");				
document.body.appendChild(ddd);
ddd.style.position = "absolute";
ddd.style.top = "0px";
function metaRequest() {
	GM_xmlhttpRequest({
	  method: "GET",
	  url: fst.b.href,
	  headers: {
		"User-Agent": "Mozilla/5.0",            // Recommend using navigator.userAgent when possible
		"Accept": "text/xml"
	  },
	  onload: function(response) {
		// Inject responseXML into existing Object if not present
		if (!response.responseXML)
		  response.responseXML = new DOMParser().parseFromString(response.responseText, "application/xml");
		try {
			var thisMeta = {
				rating:response.responseText.match(/(div\sclass=.meta.*\s*<b>)([^<]*)/mi)[2],
				title:response.responseText.match(/(tn15title.>)([^<]*)(<h1>)([^\w]*)([^<]*)/mi)[5].trim()
			};
			/*dbg*/unsafeWindow.thisMeta = thisMeta;
			if(thisMeta.rating != null) {
			  unsafeWindow.p = fst.c;
			  fst.b.innerHTML = metaImg(thisMeta.rating);
			  fst.c.innerHTML += " " + nzLink(thisMeta.title);
			  //alert(p.innerHTML);
			  //thisMeta.element.parentNode.parentNode.innerHTML += "&nbsp;&nbsp;" + nzLink(thisMeta.title);
			  //thisMeta.element.parentNode.innerHTML += " " ;
			}
		} catch (ex) {
			fst.b.innerHTML = '<span title="visit imdb">-/10</span>';
			try {
				fst.c.innerHTML += " " + nzLink(response.responseText.match(/(tn15title.>)([^<]*)(<h1>)([^\w]*)([^<]*)/mi)[5].trim());
			} catch(ex1) {}
		}
		fst = imdb_lnks.shift();
		if(fst != null)
		  setTimeout(metaRequest, 0);
	  }
	});
}

function nzLink(txt) {
	var l = "http://www.newzleech.com/?group=&minage=&age=&min=100&max=max&q=" + txt + "&m=search&adv=1";
	return '<a href="' + l + '" target="_blank" title="search newzeech">NZ</a>';
}

function metaImg(txt) {
	var spl = txt.split("/");
	if(parseFloat(spl[0]) > 6)
		return '<strong title="visit imdb">' + txt + "</strong>";
	return txt;
}

var fst = imdb_lnks.shift();
if(fst != null)
	metaRequest();