// ==UserScript==
// @name           NN Kanavapoliisi
// @description    Etsii kanavan jäsenistä ne henkilöt, jotka ovat lähettäneet sisältöä kanavaan.
// @namespace      nncontfind
// @include        http://*naurunappula.com/g/*
// ==/UserScript==

GM_registerMenuCommand("Etsi tähän kanavaan lisänneet", find);

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

	var users = getElementsByClass("user");
	var gname1 = document.getElementById("indexblock").innerHTML.split('<div class="indexheader">');
	var gname2 = gname1[1].split(">");
	var gname3 = gname2[4].split("<");
	var gname = gname3[0].replace(/(\s|\t|\n)*\s(?![^\s])(\s|\t|\n)*/gi, "");
	var gusers1 = /.+<th>J\u00E4seni\u00E4:<\/th>\n.+<td>[0-9]+ k\u00E4ytt\u00E4j\u00E4\u00E4<\/td>/
	var gusers2 = gusers1.exec(document.body.innerHTML);
	var gusers3 = /[0-9]+/
	var gusers = gusers3.exec(gusers2);
	var saalis = new Array();
	var j = 0;
	var i = 0;
	var re = new RegExp("<title>.+\\slis\\u00E4si\\slinkin\\s.+\\skanavalle\\s" + gname + "\\.</title>");

	
function find() {
if(i == 0) {
	var c = confirm("Etsitäänkö jonkin tietyn linkin lähettänyttä?");
	if(c) {
		var c = prompt("Linkin tarkka otsikko (kirjainkoolla ei väliä):", "");
		if(c == "")
			c = false;
		else
			re = new RegExp("<title>.+\\slis\\u00E4si\\slinkin\\s" + c + "\\skanavalle\\s" + gname + "\\.</title>", "i");
	}
}
	if(i < gusers) {
		var u = users[i] + "?rss=1";
				GM_xmlhttpRequest({ method: 'GET', url: u, 
					onreadystatechange: function(responseDetails) {
					if(responseDetails.readyState == 4) {
						var rss = responseDetails.responseText;
						if(rss.match(re)) {
							saalis[j] = users[i];
							j++;
						}
						i++;
						document.getElementById("localebar").innerHTML = "Etsitään... " + i + " / " + gusers;
						find();
					}
				}
			});
	}
	else {
		document.getElementById("localebar").innerHTML = "Valmis!";
		if(saalis.length == 0)
			alert("Yhtään lähettäjää ei löydetty.");
		else {
			var c = confirm("Löydettiin " + saalis.length + " lisääjää, avaataanko heidän profiilinsa välilehtiin?");
			if(c) {
				var liite = "";
			var c = confirm("Avataanko suoraan RSS- syötteet?");
			if(c)
				liite = "?rss=1";
				
					for(k = 0; k < saalis.length; k++)
						GM_openInTab(saalis[k] + liite);
				}
			}
		}

}