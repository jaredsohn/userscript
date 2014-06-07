// ==UserScript==
// @name          Newzbin Extended Movie Info
// @description   Shows IMDB info below each film
// @include       http://*.newzbin.com/browse/cat/p/movies/*
// ==/UserScript==

var films = [];
var links = document.evaluate(
	"//tr[@class='new']/td[3]/a|//tr[@class='odd']/td[3]/a|//tr[@class='even']/td[3]/a",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < links.snapshotLength; i++) {
	link = links.snapshotItem(i);
	var regex = new RegExp("^http:\/\/(www)?.*imdb\.com\/title\/.+$");
	if (regex.test(link.href)) {
		link.name = link.href.match(/\d{7}/);
		link.href = "#"+link.name;
		link.addEventListener("click",loadImdb,true);
	}
}

function loadImdb () {
	this.info= insertRow(this.parentNode.parentNode);
	this.removeEventListener("click",loadImdb,true);
	this.addEventListener("click",toggleRow,true);
	fillImdb(this);
}

function toggleRow () {
	if (this.info.style.display != 'none')
		this.info.style.display = 'none';
	else
		this.info.style.display = 'table-cell';
}
	
function insertRow (row) {
	var inforow = document.createElement('tr');
	var infocol = document.createElement('td');
	infocol.colSpan = 10;
	infocol.style.background = "#fff";
	inforow.appendChild(infocol);
	infocol.innerHTML = "&nbsp;";
	row.parentNode.insertBefore(inforow,row.nextSibling);
	return infocol;
}

function fillImdb (link) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://laylward.com/misc/imdbsrv/imdbsrv.pl?id="+link.name,
		onload: function (responseDetails) {
			if (responseDetails.status == 200) {
				link.info.innerHTML = responseDetails.responseText;
			}
			else {
				link.info.innerHTML = "<p>failed to download from imdb...</p>";
			}
		}
	});
}
