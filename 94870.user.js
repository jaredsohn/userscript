// ==UserScript==
// @name          Facebook Photo Album
// @namespace     http://jeffpalm.com/fbphotoalbum
// @description   Shows all the images in a facebook album at once.
// @include       http://*facebook.com/album.php*
// ==/UserScript==

const LIMIT = -1;
var shownAllPhotos = false;
var viewAllLink;
var statusLink;
var totalPhotos = 0;
var currentPhoto = 0;

function newOnloadfunction(_a) {
    var a = _a;
    return function(res) {
	currentPhoto += 1;
	setStatus(currentPhoto + " / " + totalPhotos);
	var html = res.responseText;
	lines = html.split(/\n/);
	if (!lines) return;
	for (var i=0; i<lines.length; i++) {
	    var line = lines[i];
	    var res;
	    // <img src="http://sphotos.ak.fbcdn.net/....32412695_7925396_n.jpg" 
	    //      width="600" height="400" id="myphoto" />
	    if (res = line.match(/<img src="([^"]+)"[^\/]*id="myphoto"\s*\/>/)) {
		var src = res[1];

		// Replace the small image with the larger one. FB
		// uses an I node with a background image, but we'll
		// just use an IMG node.
		while (a.childNodes.length > 0) {
		    a.removeChild(a.firstChild);
		}
		var img = document.createElement("IMG");
		img.src = src;
		a.appendChild(img);

		// These are table rows, so remove the TD from it's
		// parent TR, and create a new TR row
		var td = a;
		while (td && td.nodeName != "TD") td = td.parentNode;
		var tr = td.parentNode;
		var newTr = document.createElement("TR");
		tr.removeChild(td);
		newTr.appendChild(td);
		tr.parentNode.insertBefore(newTr,tr);
	    }
	}
	if (currentPhoto == totalPhotos) {
	    setStatus("Done");
	}
    }
}

function showAllPhotos() {
    if (shownAllPhotos) return;
    shownAllPhotos = true;
    viewAllLink.parentNode.removeChild(viewAllLink);
    var as = document.getElementsByTagName("A");
    var links = [];
    for (var i=0; i<as.length; i++) {
	var a = as[i];
	if (a.href && a.href.match(/http:\/\/[^\/]*facebook\.com\/photo\.php.*/)) {
	    links.push(a);
	}
    }
    totalPhotos = links.length;
    setStatus("0 / " + totalPhotos);
    for (var i=0; i<links.length; i++) {
	var link = links[i];
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: link.href,
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: newOnloadfunction(link)
	});	
	if (LIMIT > 0 && i>=LIMIT-1) break;
    }
}

function setStatus(str) {
    statusLink.innerHTML = str;
}

function main() {

    // Add the link to the title
    var h2 = document.getElementsByTagName("H2")[0];
    var d = document.createElement("SPAN");
    var a = document.createElement("A");
    var status = document.createElement("SPAN");
    a.innerHTML = "View all";
    a.addEventListener("click",function(e) {showAllPhotos();},true);
    a.href = "#";
    d.appendChild(document.createTextNode(" [ "));
    d.appendChild(a);
    d.appendChild(status);
    d.appendChild(document.createTextNode(" ]"));
    h2.appendChild(d);

    // Save these for later
    viewAllLink = a;
    statusLink = status;
}

main();