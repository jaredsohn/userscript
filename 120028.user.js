// ==UserScript==
// @name           Direct Image Links (imagevenue.com)
// @namespace      AmpliDude
// @description    Generates direct links to images on imagevenue.com
// @include        http://imagevenue.com/
// ==/UserScript==

var links, counter;
function getLinks() {
	counter = 0;
	if (document.getElementById("dil_ta").value == "") return;
	document.getElementById("dil_btn").setAttribute("disabled","");
	links = document.getElementById("dil_ta").value.split("\n");
	document.getElementById("dil_ta").value = "";
	getData();
}
function getData() {
	if (counter == links.length) {
		document.getElementById("dil_ta").value = links.join("\n");
		document.getElementById("dil_sb").value = "Done";
		document.getElementById("dil_btn").removeAttribute("disabled");
		return;
	}
	document.getElementById("dil_sb").value = "Please wait - processing link " + (counter+1) + " of " + links.length + "";
	if (!/http:\/\/img\d+\.imagevenue\.com\/img.php\?image=.+/.test(links[counter])) {
		links[counter] = "Error: This is not a valid imagevenue.com link: " + links[counter] + "";
		counter++;
		getData();
	}
	GM_xmlhttpRequest({
		method: "GET",
		url: links[counter],
		onload: function(response) {
			d = parseHTML(response.responseText);
			img = d.getElementById("thepic");
			if (img != null) {
				links[counter] = links[counter].substring(0, links[counter].indexOf("img.php")) + img.src;
			} else {
				links[counter] = "Error: Could not retrieve image link from: " + links[counter] + "";
			}
			counter++;
			getData();
		},
		onerror: function(response) {
			links[counter] = "Error: Could not retrieve image link from: " + links[counter] + "";
			counter++;
			getData();
		}
	});
}
function parseHTML(source) {
	dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	doc = document.implementation.createDocument('','', dt);
	html = doc.createElement('html');
	html.innerHTML = source;
	doc.appendChild(html);
	return doc;
}

var div = document.createElement('div');
	div.innerHTML = '<span id="dil_show_gui" style="font-size: 12px; border: solid 1px #0000aa; padding: 2px 2px 2px 2px; color: #0000aa; cursor: pointer;" onclick=\'document.getElementById("dil_gui").style.display = (document.getElementById("dil_gui").style.display == "none" ? "block" : "none");\'>Direct Image Links</span><div id="dil_gui" style="display: none; width: 70%;"><textarea id="dil_ta" style="width: 100%; height: 250px;  border: solid 1px #0000aa;"></textarea><br><input id="dil_sb" type="text" value="" style="width: 50%; border: solid 1px #999999; color: #888888;" readonly><input id="dil_btn" style="float: right; border: solid 1px #0000aa; color: #0000aa; background-color: #ffffff;" type="button" value="Get links"></div>';

document.body.insertBefore(div, document.body.firstElementChild);
document.getElementById("dil_btn").addEventListener("click", getLinks, false);
