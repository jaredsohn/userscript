// ==UserScript==
// @name           JvForumsAlerteSuiviTopic
// @namespace       
// @description    Ajoute une alerte sur le topic de notre choix via JVForumsAlerte
// @include        http://www.jeuxvideo.com/forums/0-*-0-1-0-*-0-*.htm
// ==/UserScript==


function copyclipboard(intext) {
   window.clipboardData.setData('Text', intext);
}

function superSuiviTopicURL(topicURL) {
	GM_log("superSuiviTopicURL for "+topicURL);
       // copy2Clipboard(topicURL);
 prompt("The current page's url is: ", topicURL);

}


function improve_page_topics() {
	if (document.getElementById('liste_topics')) {
		var lineTopicTd = document.getElementById('liste_topics').getElementsByTagName('tr');
		var lineTopicTdCount = lineTopicTd.length;
		var jvFoxActivated = (lineTopicTd[0].getElementsByTagName('th')[2].className=="col_moder") ? true : false;
		if (lineTopicTd[0].getElementsByTagName('th')[1].className=="col_moder" || jvFoxActivated) {
			for (var i=0; i<lineTopicTdCount ; i++) {
				if (i==0) { 
					var col_kickPlus = document.createElement('th');
					col_kickPlus.innerHTML = '&nbsp;';
					col_kickPlus.className = "col_moder";
					var indice = (jvFoxActivated) ? 4 : 3;
					lineTopicTd[i].insertBefore(col_kickPlus,lineTopicTd[i].getElementsByTagName('th')[indice]);
				}
				else if (lineTopicTd[i].className == "tr1" || lineTopicTd[i].className == "tr2") { 

					var topicURL = "";
					var indice = (jvFoxActivated) ? 2 : 1;
					var col_kickPlusCase = document.createElement('td');

					// Gestion des topics normaux
					if (lineTopicTd[i].getElementsByTagName('td')[indice].getElementsByTagName('a').length>0) {
						topicURL = lineTopicTd[i].getElementsByTagName('td')[indice].getElementsByTagName('a')[0].href;


						var kickPlusLink = document.createElement('a'); 
						kickPlusLink.href="#";
						kickPlusLink.target="_blank";


kickPlusLink.setAttribute("topicURL",topicURL);
kickPlusLink.addEventListener("click",function foo(e) {
								if (confirm("Suivre ce topic sur JForumsAlerte ? (v1.2.2 requise)")) {                                              superSuiviTopicURL(this.getAttribute("topicURL"));
								}}, false);
						var kickPlusImage = document.createElement('img');
						kickPlusImage.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_bann_48h.gif";
						kickPlusLink.appendChild(kickPlusImage);
						col_kickPlusCase.appendChild(kickPlusLink);
					} 
					// Gestion des topics normaux et splittés
					var indice = (jvFoxActivated) ? 4 : 3;                            
					lineTopicTd[i].insertBefore(col_kickPlusCase,lineTopicTd[i].getElementsByTagName('td')[indice]);
				}
			}
		}
	}
}


improve_page_topics();