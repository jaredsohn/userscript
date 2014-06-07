// ==UserScript==
// @name           JvCiterFlo
// @namespace       
// @description    Citation by Flo
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// ==/UserScript==

var mode = parseInt(self.location.href.toString().split("/")[4].charAt(0));
var urlRepondre = self.location.href.toString().replace(/(http:\/\/www.jeuxvideo.com\/forums\/)1(\-[^"]+)/, "$1" + "3" + "$2") + "#form_post";
	//urlRepondre = "http://www.jeuxvideo.com/cgi-bin/admin/logout.cgi?url=" + urlRepondre;

function format(nick) {
	return nick.substr(0, 1).toString().toUpperCase() + nick.substr(1);
}

function writeCitation() {
	var pseudo = GM_getValue("pseudo", "Inconnu");
	var date = GM_getValue("date", "à une date imaginaire");
	var post = GM_getValue("post", "Ce copier/coller n'a pas reçu de données de départ. :(");
	var ancre = GM_getValue("ancre", "Il n'y a pas de lien pour un post qui n'existe pas.");
	
	GM_setValue("pseudo", "");
	GM_setValue("date", "");
	GM_setValue("post", "");
	GM_setValue("ancre", "");
	GM_setValue("citation", 0);
	
	message = document.getElementById("newmessage");
	message.innerHTML = ":d) " + ancre + "\n";
	message.innerHTML += pseudo + ", " + date + "\n";
	message.innerHTML +=  "&laquo; " + post + " &raquo;";
	message.focus();
}

function citerMode1() {
	var pseudo = this.parentNode.getElementsByTagName("strong")[0].innerHTML;
		pseudo = format(pseudo);
	var date = this.parentNode.nextSibling.nextSibling.innerHTML.split("\n")[1].replace("Posté ", "");
	var post = this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
		post = post.replace(/ ?<img src="[^"]+" alt="([^"]+)" ?\/?> ?/gi, " $1 ");
		post = post.replace(/<a href="([^"]+)" target="_blank">[^"]+<\/a>/gi, "$1");
		post = post.replace(/\n/g, "");
		post = post.replace(/<br>/g, "\n");
		post = post.replace(/\n\n*/g, "\n");
	var ancre = this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
		ancre = ancre.replace(/<a href="([^"]+)">Lien permanent<\/a>/, "$1");
	
	GM_setValue("pseudo", pseudo);
	GM_setValue("date", date);
	GM_setValue("post", post);
	GM_setValue("ancre", ancre);
	GM_setValue("citation", 1);
	
	self.location.href = urlRepondre;
}

function citerMode3() {
	var pseudo = this.parentNode.getElementsByTagName("strong")[0].innerHTML;
		pseudo = format(pseudo);
	var date = this.parentNode.nextSibling.nextSibling.innerHTML.split("\n")[1].replace("Posté ", "");
	var post = this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
		post = post.replace(/ ?<img src="[^"]+" alt="([^"]+)" ?\/?> ?/gi, " $1 ");
		post = post.replace(/<a href="([^"]+)" target="_blank">[^"]+<\/a>/gi, "$1");
		post = post.replace(/\n/g, "");
		post = post.replace(/<br>/g, "\n");
		post = post.replace(/\n\n*/g, "\n");
	
	message = document.getElementById("newmessage");
	message.value += ":d) Voir plus haut. :o)) \n";
	message.value += pseudo + ", " + date + "\n";
	message.value +=  "« " + post + " »";
	message.focus();
}

function citerButton() {
	if (document.getElementById('col1')) {
		var lis = document.getElementById('col1').getElementsByTagName("li");
		for (var u = 0; lis[u]; u++) {
			if (lis[u].className == 'pseudo') {
				var img = document.createElement("img");
					img.title = "Citer";
					img.src = "http://www.noelshack.com/uploads/citer052028.gif";
				var a = document.createElement("a");
					a.style.cursor = "pointer";
				switch (mode) {
					case 1: a.addEventListener("click", citerMode1, false); break;
					case 3: a.addEventListener("click", citerMode3, false); break;
					}
				a.appendChild(img);
				lis[u].appendChild(a);
				}
			}
		}
}

function citer() {
	citerButton();
	if (GM_getValue("citation", 0) == 1) writeCitation();
}

citer();