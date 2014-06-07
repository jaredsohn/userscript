// ==UserScript==
// @name	Tatoeba Linker
// @description	Adds a box below Tatoeba sentences to add translations which don't appear in the indirect translations
// @author	Zifre[http://tatoeba.org/user/profile/Zifre]
// @version	0.0.4
// @match http://tatoeba.org/*
// @include http://tatoeba.org/*
// ==/UserScript==

function gotoLink(id) {
	var link = document.getElementById("addLink_" + id).value;
	if(link != null && link != "")
		document.location = "http://tatoeba.org/sentences/show/" + link;
}
function addLink(id) {
	var link = document.getElementById("addLink_" + id).value;
	if(link != null && link != "")
		document.location = "http://tatoeba.org/links/add/" + id + "/" + link;
}
var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = gotoLink.toString() + addLink.toString();
document.body.appendChild(script);
var divs = document.getElementsByTagName("div");
for(i = 0; i < divs.length; i++) {
	var idiv = divs[i];
	if(idiv.className == "sentences_set") {
		var id = idiv.id.substring(idiv.id.search("[1-9]"));
		for(j = 0; j < idiv.children.length; j++) {
			var jdiv = idiv.children[j];
			if(jdiv.className == "translations") {
				jdiv.innerHTML += '<div class="sentence indirectTranslation"><a class="show button" href="javascript:gotoLink(' + id + ');"><img src="http://flags.tatoeba.org/img/indirect_translation.png" width="18" height="16" /></a><a class="add link button" href="javascript:addLink(' + id + ');"><img src="http://flags.tatoeba.org/img/link.png" width="16" height="16" /></a><input type="number" min="1" size="10" id="addLink_' + id + '" /></div>';
				break;
			}
		}
	}
}

