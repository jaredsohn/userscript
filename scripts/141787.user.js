// ==UserScript==
// @name			MadgicforumKiller
// @version			0.9
// @include			/^http:\/\/www\.jeuxvideo\.com/forums\/.*$/
// @include			/^http:\/\/m\.jeuxvideo\.com/forums\/.*$/
// ==/UserScript==

(function() {
	String.prototype.arrayIndexOf = function(anArray) {
		for(var i=anArray.length-1; i >= 0; i--) {
			if(this.indexOf(anArray[i]) > -1)
				return true;
		}
		return false;
	}

	function getCookie(name) {
		if(document.cookie.length == 0)
			return null;

		var regSepCookie = new RegExp('(; )', 'g');
		var cookies = document.cookie.split(regSepCookie);

		for(var i=0; i < cookies.length; i++) {
			var regInfo = new RegExp('=', 'g');
			var infos = cookies[i].split(regInfo);
			if(infos[0] == name)
				return unescape(infos[1]);
		}
		return null;
	}

	function html_entity_decode(e){return e=e.replace(/&#039;/g,'\''),e=e.replace(/&eacute;/g,'é'),e}

	var listeTopics = document.getElementById('liste_topics');

	if(listeTopics != null) {

		/* Initialisation */
		if(!localStorage.getItem('cdv')) {
			var currentNick = getCookie('tehlogin');
			var nick = prompt("Première utilisation.\nVeuillez saisir le pseudonyme de la carte de visite à utiliser pour les topics à censurer (" + currentNick + " par défaut) :");
			nick = nick ? nick : currentNick;
			localStorage.setItem('cdv', nick);
		}

		var tr = listeTopics.querySelectorAll('tr'),
			topicsCaches  = 0,
			topicsACacher = [],
			listeName     = [];

		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://www.jeuxvideo.com/profil/' + localStorage.getItem('cdv') + '.html', false);
		xhr.onreadystatechange = function(e) {

			if(xhr.readyState==4 && xhr.status==200) {
				tmp = xhr.responseText.split("###<br />\n")[1].split("<br />\n###")[0];
				tmp = html_entity_decode(tmp);
				topicsACacher = tmp.split(',');
			}
		}
		xhr.send(null);

		for(var i=tr.length-1; i > 0; i--) {

			var td    = tr[i].querySelectorAll('td'),
				titre = td[1].querySelector('a');

			listeName.push(titre.name);

			if(titre.textContent.arrayIndexOf(topicsACacher)) {
				tr[i].parentNode.removeChild(tr[i]);
					topicsCaches++;
			}
		}

		var url          = document.location.href,
			nbPagesRecup = 0,
			nbPagesMax   = 15;

		while(topicsCaches > 0 && nbPagesRecup <= nbPagesMax) {

			nbPagesRecup++;

			var pageSuiv = url.split('-');
			pageSuiv[5]  = parseInt(pageSuiv[5]) + 25;
			url          = pageSuiv.join('-');

			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, false);

			xhr.onreadystatechange = function(e) {

				if(xhr.readyState == 4 && xhr.status == 200) {

					var listeTopicsPageSuiv = xhr.responseText.split('</th>\n</tr>\n')[1].split('</table>')[0].split('<tr');

					var i = 1;
					while(i <= topicsCaches && listeTopicsPageSuiv[i]) {

						badTopic = false;
						if(listeTopicsPageSuiv[i].arrayIndexOf(topicsACacher) || listeTopicsPageSuiv[i].arrayIndexOf(listeName))
							badTopic = true;

						if(!badTopic) {
							listeTopics.innerHTML += '<tr' + listeTopicsPageSuiv[i];
							topicsCaches--;
						}
						i++;
					}
				}
			}
			xhr.send(null);
		}
	}
})();