// ==UserScript==
// @name Anti Flood (15-18 UNIQUEMENT !)
// @namespace AsterionJV
// @description Mais j'encule le bot ! Beau flood mon cul !!
// @author Arthur Speer
// @version 1.0
// @include http://www.jeuxvideo.com/forums/1-50-*
// @include http://www.jeuxvideo.com/forums/3-50-*
// ==/UserScript==

function toggle() {
	var post = this.parentNode.getElementsByClassName("post").item(0);
	this.removeChild(this.firstChild);
	if(post.getAttribute("hidden")) {
		post.removeAttribute("hidden");
		var hiddenmsg_text = document.createTextNode("Cliquer à nouveau pour cacher le message.");
	} else {
		post.setAttribute("hidden", "true");
		var hiddenmsg_text = document.createTextNode("Ce message a déclenché un filtre anti-flood et a été bloqué. (cliquer pour afficher)");
	}
	this.appendChild(hiddenmsg_text);
}

(function() {
	var ddb = localStorage.getItem("asterionjv.antiflood.ddb");
	if(ddb == null) {
		ddb = confirm("AsterionJV/Anti Flood - Demande d'autorisation\n\nCe script peut envoyer automatiquement une DDB (Demande De Bannissement) lorsqu'il détecte du flood.\nLe script n'envoie qu'une seule DDB par message, même si vous actualisez la page, et seulement pour les filtres qui génèrent peu de faux positifs.\n\nNous préférons néanmoins demander votre autorisation avant d'effectuer ce type d'action en votre nom.\n\nVoulez-vous activer les DDB automatiques ?");
		localStorage.setItem("asterionjv.antiflood.ddb", ddb);
	}
	var ddbed = localStorage.getItem("asterionjv.antiflood.ddbedmsgs");
	if(ddbed != null) {
		ddbed = JSON.parse(ddbed);
	} else {
		ddbed = [];
	}
	var posts = document.getElementsByClassName("msg");
	var i = 0;
	while(i < posts.length) {
		var post = posts.item(i).getElementsByClassName("post").item(0);
		if(post.textContent.match(/[wv@%]{10,}/i)) {
			post.setAttribute("hidden", "true");
			var hiddenmsg = document.createElement("li");
			hiddenmsg.addEventListener("click", toggle, false);
			hiddenmsg.setAttribute("id", "hiddenmsg");
			hiddenmsg.style.fontSize = "7pt";
			hiddenmsg.style.color = "#AAAAAA";
			hiddenmsg.style.fontStyle = "italic";
			hiddenmsg.style.cursor = "pointer";
			var hiddenmsg_text = document.createTextNode("Ce message a déclenché un filtre anti-flood et a été bloqué. (cliquer pour afficher)");
			hiddenmsg.appendChild(hiddenmsg_text);
			post.parentNode.insertBefore(hiddenmsg, post);
			if(ddb) {
				var msgid = posts.item(i).getAttribute("id").split("_")[1];
				if(ddbed.indexOf(msgid) == -1) {
					ddbed.push(msgid);
					localStorage.setItem("asterionjv.antiflood.ddbedmsgs", JSON.stringify(ddbed));
					var xhr = new XMLHttpRequest();
					xhr.open("POST", "http://www.jeuxvideo.com/cgi-bin/jvforums/avertir_moderateur.cgi");
					xhr.send(posts.item(i).getElementsByClassName("date").item(0).getElementsByTagName("a").item(0).getAttribute("href").split("?")[1] + "&motif=Flood");
				}
			}
		} else if(post.textContent.match(/^\s*$/) || post.textContent.match(/madgicforum/i) || post.textContent.match(/m4dgicforum/i)) {
			post.setAttribute("hidden", "true");
			var hiddenmsg = document.createElement("li");
			hiddenmsg.addEventListener("click", toggle, false);
			hiddenmsg.setAttribute("id", "hiddenmsg");
			hiddenmsg.style.fontSize = "7pt";
			hiddenmsg.style.color = "#AAAAAA";
			hiddenmsg.style.fontStyle = "italic";
			hiddenmsg.style.cursor = "pointer";
			var hiddenmsg_text = document.createTextNode("Ce message a déclenché un filtre anti-flood et a été bloqué. (cliquer pour afficher)");
			hiddenmsg.appendChild(hiddenmsg_text);
			post.parentNode.insertBefore(hiddenmsg, post);
		}
		i++;
	}
})();
