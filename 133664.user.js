// ==UserScript==
// @name        Access page
// @namespace   GamersWolrd
// @description Accéder au formulaire de post au clique droit sur la balise de topic + accéder à une page en particulier en indiquant son numéro.
// @include     http://www.gamersworld.fr/forum-*-*-*-*.htm*
// @include     http://www.gamersworld.fr/topic-*-*-*-*.htm*
// @version     1
// ==/UserScript==

function acces() {
	if(self.location.href.match(/topic/)) {
			var pagi = document.getElementsByTagName('div');
				for (var i = 0; i < pagi.length; i++) {
					if(pagi[i].className == "pagination_posts") {
						var field = document.createElement('input')
							field.type = 'text';
							field.id = "acces";
							field.defaultValue = field.value = "Accès page";
							field.style.display = 'block';
							field.style.margin = 'auto';
							field.style.width = '60px';
							field.style.height = '12px';
							field.style.textAlign = 'center';
							field.style.fontSize = '11px';
							field.addEventListener("focus", function() {if (this.value == this.defaultValue) this.value = "";}, true);
							field.addEventListener("blur", function() {if (this.value == "") this.value = this.defaultValue;}, true);
							field.addEventListener("keyup", checkPage, false);
						var form = document.createElement('form');
							form.appendChild(field);
							form.addEventListener("submit", function() {var x = this.getElementsByTagName("input")[0].value; this.action = self.location.href.replace(/(http:\/\/www\.gamersworld\.fr\/topic\-[0-9]+\-[0-9]+\-)[0-9]+(\-[1|0]\.htm)/, '$1' + x + '$2');}, false);
						pagi[i].appendChild(form);
					}
				}
	}
}

function checkPage() {
	if(this.value != '') {
		if(isNaN(parseInt(this.value))) this.value = '';
	}
}

function getPost() {
	var td = document.getElementsByTagName('td');
	for(var v = 0; v < td.length; v++) {
		if(td[v].className == "icone_sujet") {
			td[v].addEventListener('contextmenu', toPost, false);
			td[v].setAttribute("oncontextmenu", "return false;");
		}
	}
}

function toPost() {
	var url = this.firstChild.href;
	url = url.replace(/([0-9]+\-[0-9]+\-[0-9]+\-)[0-9]/, '$1' + 1);
	window.location.href = url + '#form_post';
}

getPost();
acces();