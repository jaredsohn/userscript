// ==UserScript==
// @name		JVC++
// @version		1.2
// @include		/^http:\/\/www\.jeuxvideo\.com\/forums\/.*/
// @author		Thiht
// ==/UserScript==

var jvcpp = {

	config: {
		version: '1.2',

		mods: {
			modFloodFilterOn : true,
			modPermalinkOn   : false,
			modLastPageOn    : false,
			modQuoteOn       : false,
			modUnshortenerOn : false,
			modTopicFilterOn : true
		},

		floodFilter: {
			badwords: [],
			enableBadwordFiltering: true,
			enableBlankFiltering: true,
			enableCapsFloodFiltering: true
		},

		permalink: {
			highlightBorder: '1px solid #FBCA91',
			highlightBackgroundColor: '#FEF1E2',
			highlightBorderMsg1: '1px solid #C0D7ED',
			highlightBorderMsg2: '1px solid #D1D1D1',
			highlightBackgroundMsg1: '#EFF4FC',
			highlightBackgroundMsg2: '#F9F9F9'
		},

		topicfilter: {
			topicsACacher: []
		}
	},

	init: function() {
		this.lastPage.init();
		this.permalink.init();
		this.quote.init();
		this.floodFilter.init();
		this.unshortener.init();
		this.topicfilter.init();
	},

	varGlob: {
		topicList  : document.querySelector('#liste_topics'),
		postList   : document.querySelectorAll('.post'),
		anchorList : document.querySelectorAll('.ancre')
	},

	floodFilter: {
		init: function() {
			if (jvcpp.config.mods.modFloodFilterOn)
				this.exec();
		},

		exec: function() {
			if (jvcpp.varGlob.postList != null) {
				for (var i=0, c=jvcpp.varGlob.postList.length; i < c; i++) {
					var censored = false;

					// Badwords
					if (jvcpp.config.floodFilter.enableBadwordFiltering) {
						for (var j=jvcpp.config.floodFilter.badwords.length-1; j >= 0; j--) {
							if (~jvcpp.varGlob.postList[i].textContent.indexOf(jvcpp.config.floodFilter.badwords[j])) {
								jvcpp.varGlob.postList[i].style.display = 'none';
								jvcpp.varGlob.postList[i].previousElementSibling.previousElementSibling.innerHTML += '<em>Badword détecté</em>';
								censored = true;
								break;
							}
						}
					}

					// Messages blancs
					if (jvcpp.config.floodFilter.enableBlankFiltering
						&& !censored
						&& /( ?<br( \/)?>( |\n)?){40}/.test(jvcpp.varGlob.postList[i].innerHTML))
					{
							jvcpp.varGlob.postList[i].style.display = 'none';
							jvcpp.varGlob.postList[i].previousElementSibling.previousElementSibling.innerHTML += '<em>Flood détecté</em>';
							censored = true;
					}

					// Flood majuscules
					if (jvcpp.config.floodFilter.enableCapsFloodFiltering
						&& !censored
						&& /([A-Z]+( *<br( \/)?>){2,}){3,}/.test(jvcpp.varGlob.postList[i].innerHTML))
					{
						jvcpp.varGlob.postList[i].style.display = 'none';
						jvcpp.varGlob.postList[i].previousElementSibling.previousElementSibling.innerHTML += '<em>Flood détecté</em>';
						censored = true;
					}

					// Toggle des messages
					if (censored) {
						var pseudo          = jvcpp.varGlob.postList[i].previousElementSibling.previousElementSibling;
						pseudo.style.cursor = 'pointer';
						pseudo.title        = 'Afficher / Masquer';
						pseudo.onclick      = function() {
							var post = this.nextElementSibling.nextElementSibling;
							post.style.display = (post.style.display == 'none') ? 'block' : 'none';
						};
					}
				}
			}
		}
	},

	permalink: {

		init: function() {
			if (jvcpp.config.mods.modPermalinkOn)
				this.exec();
		},

		exec: function() {
			document.body.onhashchange = function(e) {
				if (/^#message_[0-9]+$/.test(document.location.hash)) {
					var tokens = e.oldURL.split('#');
					var oldAnchor = '#' + tokens[tokens.length - 1];
					if (/^#message_[0-9]+$/.test(oldAnchor)) {
						var oldHash = document.querySelector(oldAnchor);
						oldHash.style.setProperty("border", ((oldHash.className.indexOf('msg1') != -1)
																? jvcpp.config.permalink.highlightBorderMsg1
																: jvcpp.config.permalink.highlightBorderMsg2), "important");
						oldHash.style.setProperty("background-color", ((oldHash.className.indexOf('msg1') != -1)
																		? jvcpp.config.permalink.highlightBackgroundMsg1
																		: jvcpp.config.permalink.highlightBackgroundMsg2), "important");
					}
					var post = document.querySelector(document.location.hash);
					post.style.border = jvcpp.config.permalink.highlightBorder;
					post.style.backgroundColor = jvcpp.config.permalink.highlightBackgroundColor;
				}
			};
		}
	},

	lastPage: {
		init: function() {
			if (jvcpp.config.mods.modLastPageOn)
				this.exec();
		},

		exec: function() {
			if (jvcpp.varGlob.topicList != null) {
				var tr = jvcpp.varGlob.topicList.querySelectorAll('tr');

				for (var i=tr.length-1; i > 0; i--) {
					var td      = tr[i].querySelectorAll('td'),
						lien    = td[1].querySelector('a').href,
						nbPages = parseInt(td[3].innerHTML/20+1),
						url     = (nbPages == 1)
								? lien
								: lien.replace(/\/1\-([0-9]+\-[0-9]+\-)[0-9]+(\-[^"]+)/g, '/1-$1' + nbPages + '$2');
					td[0].innerHTML = '<a href="' + url + '" title="Dernière page (' + nbPages + ')">' + td[0].innerHTML + '</a>';
				}
			}
		}
	},

	quote: {
		init: function() {
			if (jvcpp.config.mods.modQuoteOn)
				this.exec();
		},

		exec: function() {
			if (jvcpp.varGlob.anchor == '#form_post'
				&& localStorage.getItem('citation')) {
				var textarea = document.querySelector('#newmessage');
				textarea.value = localStorage.getItem('citation');
				textarea.focus();
				localStorage.removeItem('citation');
			}

			if (jvcpp.varGlob.anchorList != null) {
				for (var i=jvcpp.varGlob.anchorList.length-1; i >= 0; i--) {
					var citer = '<a href="#' + jvcpp.varGlob.anchorList[i].parentNode.parentNode.id + '">Citer</a>';
					jvcpp.varGlob.anchorList[i].innerHTML = citer + ' - ' + jvcpp.varGlob.anchorList[i].innerHTML;
					jvcpp.varGlob.anchorList[i].firstChild.onclick = function() {
						var anchor    = this.parentNode,
							pseudo    = anchor.previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim(),
							datePost  = anchor.previousElementSibling.previousElementSibling.textContent.replace(/\n+/g, ''),
							permalien = this.nextElementSibling.href,
							post      = anchor.previousElementSibling.textContent.trim(),
							citation  = "| Citation de " + pseudo +
										"\n| " + datePost +
										"\n| " + permalien +
										"\n------------------------------------------------\n" +
										"« " + post + " »" +
										"\n------------------------------------------------\n+> ";
						localStorage.setItem('citation', citation);
						window.location = document.querySelector('.bt_repondre').href;
					};
				}
			}
		}
	},

	unshortener: {
		init: function() {
			if(jvcpp.config.mods.modUnshortenerOn)
				this.exec();
		},

		exec: function() {
			console.log('Not implemented');
		}
	},

	topicfilter: {
		init: function() {
			if (jvcpp.config.mods.modTopicFilterOn) {
				if (!localStorage.getItem('cdv')) {
					var currentNick = this.getCookie('tehlogin');
					var nick = prompt("Première utilisation.\nVeuillez saisir le pseudonyme de la carte de visite à utiliser pour les topics à censurer (" + currentNick + " par défaut) :");
					nick = nick ? nick : currentNick;
					localStorage.setItem('cdv', nick);
				}
				this.exec();
			}
		},

		exec: function() {
			if (jvcpp.varGlob.topicList != null) {
				String.prototype.arrayIndexOf = function(anArray) {
					for (var i=anArray.length-1; i >= 0; i--) {
						if (this.indexOf(anArray[i]) > -1)
							return true;
					}
					return false;
				}

				var tr = jvcpp.varGlob.topicList.querySelectorAll('tr'),
					topicsCaches  = 0,
					listeName     = [];

				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'http://www.jeuxvideo.com/profil/' + localStorage.getItem('cdv') + '.html', false);
				xhr.onreadystatechange = function(e) {
					if (xhr.readyState == 4 && xhr.status == 200) {
						tmp = xhr.responseText.split("###<br />\n")[1].split("<br />\n###")[0];
						//tmp = this.html_entity_decode(tmp);
						jvcpp.config.topicfilter.topicsACacher = jvcpp.config.topicfilter.topicsACacher.concat(tmp.split(','));
					}
				}
				xhr.send(null);
				for (var i=tr.length-1; i > 0; i--) {
					var td    = tr[i].querySelectorAll('td'),
						titre = td[1].querySelector('a');

					listeName.push(titre.name);

					if (titre.textContent.arrayIndexOf(jvcpp.config.topicfilter.topicsACacher)) {
						tr[i].parentNode.removeChild(tr[i]);
							topicsCaches++;
					}
				}

				var url          = document.location.href,
					nbPagesRecup = 0,
					nbPagesMax   = 30;

				while (topicsCaches > 0 && nbPagesRecup <= nbPagesMax) {

					nbPagesRecup++;

					var pageSuiv = url.split('-');
					pageSuiv[5]  = parseInt(pageSuiv[5]) + 25;
					url          = pageSuiv.join('-');

					var xhr = new XMLHttpRequest();
					xhr.open('GET', url, false);

					xhr.onreadystatechange = function(e) {
						if (xhr.readyState == 4 && xhr.status == 200) {
							var listeTopicsPageSuiv = xhr.responseText.split('</th>\n</tr>\n')[1].split('</table>')[0].split('<tr');
							var i = 1;
							while (i <= topicsCaches && listeTopicsPageSuiv[i]) {

								badTopic = false;
								if (listeTopicsPageSuiv[i].arrayIndexOf(topicsACacher) || listeTopicsPageSuiv[i].arrayIndexOf(listeName))
									badTopic = true;

								if (!badTopic) {
									document.querySelector('#liste_topics').innerHTML += '<tr' + listeTopicsPageSuiv[i];
									topicsCaches--;
								}
								i++;
							}
						}
					}
					xhr.send(null);
				}
			}
		},

		getCookie: function(name) {
			if (document.cookie.length == 0)
				return null;

			var regSepCookie = new RegExp('(; )', 'g');
			var cookies = document.cookie.split(regSepCookie);

			for (var i=0; i < cookies.length; i++) {
				var regInfo = new RegExp('=', 'g');
				var infos = cookies[i].split(regInfo);
				if (infos[0] == name)
					return unescape(infos[1]);
			}
			return null;
		},

		html_entity_decode: function (e){
			return e=e.replace(/&#039;/g,'\''),e=e.replace(/&eacute;/g,'é'),e
		}
	}
};
jvcpp.init();