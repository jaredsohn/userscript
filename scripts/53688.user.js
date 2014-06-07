// ==UserScript==
// @name           Dinosaur Comics extra text
// @namespace      http://miff.furopolis.org/
// @description    Displays extra text on dinosaur comics pages.
// @include        http://qwantz.com/index.php
// @include        http://qwantz.com/index.php?comic=*
// @include        http://www.qwantz.com/index.php
// @include        http://www.qwantz.com/index.php?comic=*
// ==/UserScript==

/*
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar
  14 rue de Plaisance, 75014 Paris, France
 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO. 
*/

function mk_p(text, style){
	var rv = document.createElement("p");
	rv.setAttribute("style", style + "text-align:center;font-style:italic;width:735px;margin:0.8em auto;");
	rv.appendChild(document.createTextNode(text));
	return rv;
}

function got_copy(e){
	var rx = /<span class="rss-title">([^<>]+)<\/span>/i;
	var result = rx.exec(e.responseText);
	if (result){
		//alert("Got copy: " + result[1]);
		var myp = mk_p(result[1], "font-weight:bold;color:white;");
		var td = mk_trtd(true);
		td.appendChild(myp);
	}
}

function get_by_class(el, tag, className){
	var els = el.getElementsByTagName(tag);
	for (var i in els){
		if (els[i].className == className){
			return els[i];
		}
	}
	throw "Cannot find element " + tag + "." + className;
}

function mk_trtd(above){
	var comictr = get_by_class(document, "img", "comic").parentNode.parentNode;
	var table = comictr.parentNode;
	//alert(table.tagName);
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.setAttribute("colspan", "3");
	tr.appendChild(td);
	if (above) table.insertBefore(tr, comictr); else table.appendChild(tr);
	return td;
}

try {

var comic_img = get_by_class(document, "img", "comic");
var comic = mk_trtd(false);


var links = get_by_class(document, "ul", "topnav").getElementsByTagName("a");
var contact_url = "(Cannot find contact link)";
for (var i in links){
	if ((/^mailto/i).test(links[i].href)){
		contact_url = links[i].href;
		break;
	}
}

var contact_subj = contact_url.substring(contact_url.indexOf('=') + 1);

comic.appendChild(mk_p(comic_img.title, "font-size: 0.9em;"));
comic.appendChild(mk_p(unescape(contact_subj), "font-size: 0.8em;"));

// I hate the redundancy, but it's the easiest way to get the title.
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
	if(request.readyState==4) { got_copy(request); }
}
request.open("GET", window.location.toString(), true);
request.send();

} catch (ex) {
	var r = confirm("Cannot find comic information:\n" + ex.toString() + "\n\nMaybe Ryan changed the site.  Do you want to see if there's an updated version?");
	if (r){
		window.open("http://userscripts.org/scripts/show/53688");
	}
}


