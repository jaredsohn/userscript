// ==UserScript==
// @name           EasyMPTopic
// @namespace      jvcscripts
// @description    Rajoute un lien à côté de chaque pseudo pour lui envoyer un MP + Sujet du MP = titre du topic
// @include        http://www.jeuxvideo.com/forums/1*
// @include        http://www.jeuxvideo.com/forums/3*
// @include		   http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=*
// ==/UserScript==

if(/jeuxvideo\.com\/messages\-prives\/nouveau\.php/.test(window.location.href)){
	if(GM_getValue("sujet")){
		document.getElementById("sujet").value = GM_getValue("sujet");
		GM_deleteValue("sujet");
	}
}else{
	if(GM_getValue("sujet")){
		GM_deleteValue("sujet");
	}
	
	var sujet = document.getElementsByClassName("sujet")[0].innerHTML.split("&nbsp;")[1];

	var span = document.createElement("span");
	span.innerHTML = "Lui envoyer un message !";
	span.style.display = "none";

	var lien = document.createElement("a");
	lien.style.display = "inline-block";
	lien.style.margin = "2px 0 0 5px";
	lien.style.width = "15px";
	lien.style.height = "10px";
	lien.style.background = 'url("http://image.jeuxvideo.com/css_img/defaut/mprives/enveloppe.png") no-repeat scroll -85px center transparent';
	lien.target = "_blank";
	lien.style.outline = "none";
	lien.style.position = "absolute";
	lien.appendChild(span);
		
	var pseudos = document.getElementsByClassName("pseudo");

	for(var i=0; i<pseudos.length; i++){
		var pseudo = pseudos[i].firstElementChild.innerHTML;
		var lienClone = lien.cloneNode(true);
		lienClone.href = "http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=" + pseudo;
		lienClone.onmouseover = function() {
			this.firstElementChild.setAttribute("style", "display:inline; text-indent: 2px; padding-left:20px; color:#0A77B8 !important; font-size:11px; font-weight:bold; line-height:12px;");
			this.style.width = "auto";
		};
		lienClone.onmouseout = function() {
			this.firstElementChild.style.display = "none";
			this.style.width = "15px";
		};
		lienClone.onclick = function() {
			GM_setValue("sujet", sujet);
		};
		pseudos[i].appendChild(lienClone);
	}
}

