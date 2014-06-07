// ==UserScript==
// @name			TurboForum
// @namespace		JV Flux
// @description		Naviguez plus rapidement sur les forums de jeuxvideo.com
// @version			1.4
// @include			http://www.jeuxvideo.com/*
// @include			http://*.forumjv.com/*
// @include			http://jvflux.com/turboforum/*
// ==/UserScript==

function geid(id) { return document.getElementById(id) }

if (location.href.indexOf('http://www.jeuxvideo.com/forums/') == 0) {

	var TurboForum = function() {
		"use strict"

		function geid(id) { return document.getElementById(id) }
		function getag(tag) { return document.getElementsByTagName(tag) }
		function geclass(className) { return document.getElementsByClassName(className) }

		var turboforum_version = '1.4'

		function mode_from_url(url) {
			if (url.indexOf('http://www.jeuxvideo.com/forums/') != 0) {
				return -1
			}
			return parseInt(url.substr('http://www.jeuxvideo.com/forums/'.length))
		}

		function no_hash(url) {
			if (url.indexOf('#') == -1) {
				return url
			}
			return url.substr(0, url.indexOf('#'))
		}
		
		function remove_element(elem) {
			if (typeof elem == 'string') {
				elem = geid(elem)
			}
			if (elem) {
				elem.parentNode.removeChild(elem)
			}
		}
		
		function storage(item, data) {
			if (data == undefined) {
				return localStorage['turboforum_' + item]
			}
			localStorage['turboforum_' + item] = data
		}

		var col1 = geid('col1'),
			current_pathname,
			yscroll = 0, // 211 pour sauter le header
			t_count = 0,
			update_img,
			update_img_src = 'http://jvflux.com/turboforum/version.gif',
			p_id = 0,
			opacity = '.85',
			p_history = {html: {}, title: {}},
			jvchat_on = -2,
			blacklist = []

		var p = [{}, {}]
		for (var i = 0; i < 2; i++) {
			p[i].xhr = new XMLHttpRequest()
			p[i].xhr.id = i
			p[i].xhr.addEventListener('readystatechange', readystatechange)
			p[i].url = false
			p[i].url_alias = false
			p[i].html = false
			p[i].title = false
			p[i].state = ''
			p[i].timing_start = false
			p[i].timing = false
		}

		function readystatechange(e) {
			var id = e.target.id
			if (p[id].xhr.readyState < 4) {
				return
			}
			/* Arrive quand une requête est complétée */

			if (p[id].xhr.status != 200) {
				if (p[id].xhr.status != 404) {
					window.console && console.log('p[' + id + '].xhr.status ≠ 200 (' + p[id].xhr.status + ') ' + p[id].url)
				}
				if (p[id].xhr.status == 0) {
					/* Arrive aléatoirement, quand ça arrive l’inspecteur réseau de Chrome ne montre pas de requête */

					/* Quand ça arrive, les requêtes futures vers cette page donneront la même erreur */
					/* Sauf si on crée une image avec comme src l’url du lien, les requêtes futures marchent (sous Chrome du moins) */
					new Image().src = p[id].url
				}
			}
			p[id].timing = new Date().getTime() - p[id].timing_start
			p[id].html = p[id].xhr.responseText.substring(p[id].xhr.responseText.indexOf('<div id="col1">') + ('<div id="col1">' + "\n").length, p[id].xhr.responseText.indexOf('<div id="col2">') - "\n</div>\n".length)
			p[id].html = add_goodies(p[id].html)
			p[id].title = p[id].xhr.responseText.substring(p[id].xhr.responseText.indexOf('<title>') + ('<title>').length, p[id].xhr.responseText.indexOf('</title>'))
			if (mode_from_url(p[id].url) == 26) {
				p[id].url_alias = p[id].html.substring(p[id].html.indexOf('<p id="rafraichir">'), p[id].html.indexOf('http://image.jeuxvideo.com/pics/forums/bt_forum_rafraichir.gif')).split('"')[3]
			}
			p_history.html[no_hash(p[id].url_alias)] = p[id].html
			p_history.title[no_hash(p[id].url_alias)] = p[id].title
		}

		function preload(url) {
			/* Arrive quand on passe la souris sur un lien en liste blanche
			Ou après que p[p_id].state == 'displayed' dans display (quand on clique une deuxième fois sur un forum préféré) */
			
			var id = p_id

			if (p[p_id].state == 'waiting') {
				/* Arrive quand on survole un lien alors qu’un autre (ou le même) est déjà en train de charger */
				id ^= 1
			}
			p[id].state = 'preloading'
			p[id].url = url
			p[id].url_alias = url
			p[id].html = false
			p[id].timing_start = new Date().getTime()
			p[id].timing = false
			p[id].xhr.open('GET', url, true)
			p[id].xhr.send()
		}

		function display(url, t) {
			/* Arrive quand on clique sur un lien en liste blanche
			Ou 50ms après que !p[p_id].html
			Ou 50ms après que p[p_id].state == 'displayed' */

			if (p[p_id].state == 'preloading') {
				/* Première fois */
				if (t < 1000) {
					/* On ne vient pas d’hover un autre lien */
					t += 1000
				}
			}
			else {
				/* On est plus en preloading, il y a eu au moins un setTimeout depuis */
				if (p[p_id].state == 'waiting' && t < 1000) {
					/* Il n’y a pas eu de preloading préalable, ça arrive quand on clique sur le même lien avant que celui-ci ai été displayed, p[p_id].state est directement en waiting et cette instance de display tourne en parralèle de la première */
					
					/* Ou alors on a cliqué sur un autre lien pendant qu’on en charge un */
					if (p[p_id].url != url && p[p_id ^ 1].url == url) {
						p_id ^= 1
						setTimeout("display('" + url + "', " + t + ")", 50)
					}

					return
				}
			}
			if (p[p_id].url != url) {
				/* Arrive quand on a swappé p_id, `url` est l’url précédente */
				return
			}
			if (!p[p_id].html) {
				/* La réponse du serveur n’a pas encore était reçu, ou il y a eu un problème avec la requête */
				p[p_id].state = 'waiting'
				if (!col1.style.opacity) {
					col1.style.opacity = opacity
				}
				setTimeout("display('" + url + "', " + t + ")", 50)
				return
			}
			if (p[p_id].state == 'displayed') {
				/* Ça arrive quand on clique à la suite sur les forums préférés */
				if (!col1.style.opacity) {
					col1.style.opacity = opacity
				}
				preload(url)
				// display(url)
				setTimeout("display('" + url + "', " + t + ")", 50)
				return
			}
			p[p_id].state = 'displayed'
			col1.style.opacity = ''
			col1.innerHTML = p[p_id].html
			document.title = p[p_id].title
			Utilisateur() // fonction de JVC pour mettre à jour les MP
			if (p[p_id].url == no_hash(location.href)) {
				/* Bouton rafraîchir, on rajoute de l’opacité un court moment pour montrer que le rafraîchissement a bien eu lieu. */
				col1.style.opacity = opacity
				setTimeout('col1.style.opacity = ""', 50)
			}
			if (p[p_id].url != location.href) {
				if (no_hash(p[p_id].url) != no_hash(location.href)) {
					if (p[p_id].url.indexOf('#') == -1) {
						scrollTo(0, yscroll)
					}
					else {
						var elem = p[p_id].url.substr(p[p_id].url.indexOf('#') + 1)
						if (geid(elem) || document.getElementsByName(elem).length > 0) {
							elem = geid(elem) || document.getElementsByName(elem)[0]
							var offset = 0
							for (; elem.offsetParent; elem = elem.offsetParent) {
								offset += elem.offsetTop
							}
							scrollTo(0, offset)
						}
						else {
							scrollTo(0, yscroll)
						}
					}
				}
				history.pushState(null, null, p[p_id].url_alias)
			}
			current_pathname = location.pathname
			speed_up_all() // À faire après history.pushState pour faire des conditions sur location.href dans speed_up_all
		}

		function speed_up_all(forums_prefs) {
			var links = getag('a'), a, mode
			for (var i = 0; i < links.length; i++) {
				a = links[i]
				if (a.href.indexOf('http://www.jeuxvideo.com/forums/') != 0) {
					/* On ne précharge pas en dehors des forums */
					continue
				}
				if (a.className == 'citer') {
					a.addEventListener('click', function(e) {
						store_quote(e.target.getAttribute('message'))
					})
				}
				if (a.className == 'add_blacklist') {
					a.addEventListener('click', blacklist_add_from_button)
				}
				mode = mode_from_url(a.href)
				if ([0, 1, 3, 26].indexOf(mode) == -1) {
					/* On précharge seulement liste des sujets, page d’un topic, formulaire de réponse, retour liste des sujets */
					continue
				}
				if (a.target) {
					continue
				}
				if (a.className == 'sup_pref') {
					/* Bouton pour supprimer un forum préféré */
					continue
				}
				if (a.parentNode.id && a.parentNode.id.indexOf('coeur_suppr_') == 0) {
					/* Forums préférés */
					if (!forums_prefs) {
						continue
					}
				}
				if (no_hash(a.href) == no_hash(location.href)) {
					if (a.href.indexOf('#') != -1) {
						/* Liens magiques (uploader noelshack, forum 1280px, etc.) et permanents */
						continue
					}
					/* Boutons Rafraîchir */
				}

				/* Le reste */
				speed_up(a)
			}

			/* Lien permanent en surbrillance */
			if (location.hash.indexOf('#message_') != -1) {
				if (geclass('msg_ancre').length) {
					geclass('msg_ancre')[0].classList.remove('msg_ancre')
				}
				geid(location.hash.substr(1)).classList.add('msg_ancre')
			}

			/* Autofocus sur le champ de réponse + affichage citation */
			if (location.hash == '#form_post') {
				mode = mode_from_url(location.href)
				if (mode == 3) {
					geid('newmessage').focus()
				}
				else if (mode == 0) {
					geid('newsujet').focus()
				}
				if (storage('quote')) {
					geid('newmessage').value = storage('quote')
					storage('quote', '')
				}
			}

			/* Bouton pour ajouter forum aux favoris */
			if (geid('coeur_ajouter')) {
				geid('coeur_ajouter').addEventListener('click', function(e) {
					e.preventDefault()
					coeur_ajouter() // Fonction de JVC
				})
			}
		}

		function speed_up(e) {
			e.addEventListener('mouseover', function() {
				preload(this.href)
			})
			e.addEventListener('click', function(e) {
				if (e.which > 1 || e.metaKey || e.ctrlKey) {
					return
				}
				e.preventDefault()
				display(this.href, ++t_count)
				if (t_count >= 1000) {
					t_count -= 1000
				}
			})
		}

		function store_quote(id) {
			if (!geid('message_' + id)) {
				window.console && console.log('can’t quote ' + id)
				return
			}

			var text
			if (geid('message_' + id).children[0].children[3].children.length == 2) {
				text = textToQuote(geid('message_' + id).innerHTML, geid('message_' + id).children[0].children[3].children[1].href)
			}
			else {
				text = textToQuote(geid('message_' + id).innerHTML)
			}
			if (geid('newmessage')) {
				if (geid('newmessage').value) {
					geid('newmessage').value += "\r\n\r\n" + text
				}
				else {
					geid('newmessage').value = text
				}
				geid('newmessage').focus()
				geid('newmessage').scrollTop = geid('newmessage').scrollHeight
				geid('newmessage').selectionStart = geid('newmessage').selectionEnd = geid('newmessage').value.length
			}
			else {
				storage('quote', text)
			}
		}

		function textToQuote(citation_html, lien_citation) {
			var pseudo = str_between(citation_html, 'title="Voir le profil de ', '"');
			// var de = 'aeiou'.indexOf(pseudo[0].toLowerCase()) == -1 ? 'de ' : 'd’';
			var de = 'de '
	
			var date = str_between(citation_html, '<li class="date">', '<a').replace(/<span>via mobile<\/span> /, '').replace(/\r?\n/g, '').replace('Posté le ', '').trim();
			var aujourdhui = ''
			var date_a = date.split(' ')
			var date_o = new Date()
			date_o = [
				date_o.getDate(),
				'janvier,février,mars,avril,mai,juin,juillet,août,septembre,octobre,novembre,décembre'.split(',')[date_o.getMonth()],
				date_o.getFullYear()
			]
			if (parseInt(date_a[0], 10) == date_o[0] && date_a[1] == date_o[1] && date_a[2] == date_o[2]) {
				aujourdhui = 'aujourdhui'
			}
			// date = date.replace(date_o[2] + ' ', '')
	
			citation_html = citation_html.substr(citation_html.indexOf('<li class="post">') + '<li class="post">'.length);
			citation_html = citation_html.substr(0, citation_html.indexOf('</li>'));
			citation_html = citation_html.trim();
	
			var citation_texte = "";
	
			citation_texte += '| ' + pseudo + '  -  ' + (aujourdhui ? ('aujourd’hui à ' + date.split('à ')[1].split(':')[0] + ':' + date.split('à ')[1].split(':')[1]) : ('le ' + date.split('à')[0])) + "\r\n"
			if (lien_citation) {
				citation_texte += '| ' + lien_citation + "\r\n";
			}
			citation_texte += '| ' + html_entity_decode(jvcHtmlToText(citation_html)) + "\r\n\r\n> ";
	
			return citation_texte;
		}
		function jvcHtmlToText(message_html) {
			var texte = message_html;
	
			/* Sauts de ligne */
			var texte_retour = "\r\n";
			while (texte.indexOf("\n") != -1) {
				texte = texte.replace("\n", "");
			}
			while (texte.indexOf("\r") != -1) {
				texte = texte.replace("\r", "");
			}
			while (texte.indexOf("<br />") != -1) {
				texte = texte.replace("<br />", texte_retour);
			}
			while (texte.indexOf("<br>") != -1) {
				texte = texte.replace("<br>", texte_retour);
			}
	
			/* Citation dans une citation */
			var lines = texte.split("\n")
			var last_line_citation = -2
			var lines2 = []
			for (var i = 0; i < lines.length; i++) {
				if (lines[i].substr(0, 2) == '| ') {
					if (last_line_citation != i - 1) {
						lines2.push('[Citation]')
					}
					last_line_citation = i
				}
				else {
					lines2.push(lines[i])
				}
			}
			
			texte = lines2.join("\n| ")
	
			/* Smileys */
			while (/ ?<img src="http:\/\/image.jeuxvideo.com\/smileys_img\/[^"]+" alt="([^"]+)"( \/)?>/.test(texte)) {
				texte = texte.replace(/ ?<img src="http:\/\/image.jeuxvideo.com\/smileys_img\/[^"]+" alt="([^"]+)"( \/)?>/, "$1");
			}
	
			/* Liens */
			while (/<a href="(mailto:)?([^"]+)".+<\/a>/.test(texte)) {
				texte = texte.replace(/<a href="(mailto:)?([^"]+)".+<\/a>/, '$2');
			}
	
			return texte;
		}
		function str_between(str, begin, end) {
			var _1 = str.split(begin)[1];
			if (typeof _1 == 'undefined') {
				return false;
			}
			var _2 = _1.split(end)[0];
			return _2;
		}
		function html_entity_decode(string) {
			var elem = document.createElement('div');
			elem.innerHTML = string;
			return elem.textContent;
		}

		function add_goodies(html) {
			/* Ignorer */
			/* Agit sur l’icône des dossiers, à faire avant Lastpage */
			html = blacklist_html(html)
			
			/* Lastpage */
			if (html.indexOf('<tr class="tr') != -1) {
				var trs = html.split('<tr class="tr'), tds, tr, nb, url, segments
				for (var i = 1; i < trs.length; i++) {
					tr = trs[i]
					tds = tr.split('<td>')

					nb = parseInt(tds[3])

					url = tds[2].split('"')[5]
					segments = url.split('-')
					segments[3] = parseInt(nb / 20) + 1
					url = segments.join('-')

					tds[1] = '<a href="' + url + '">' + tds[1].split('</td>')[0] + '</a></td>'
					trs[i] = tds.join('<td>')
				}
				html = trs.join('<tr class="tr')
			}
			
			/* Liens Citer - topic */
			if (html.indexOf('<li class="ancre">') != -1) {
				var ancres = html.split('<li class="ancre">'),
					url_repondre = html.split('<li class="ancre"><a href="')[1].split('"')[0] // Ne pas récupérer l’URL du bouton répondre : il n’y est pas sur les topics lockés
				url_repondre = url_repondre.split('/')
				url_repondre[4] = '3' + url_repondre[4].substring(1)
				url_repondre = url_repondre.join('/').split('#')[0] + '#form_post'
				for (var i = 1; i < ancres.length; i++) {
					ancres[i] = '<a href="' + url_repondre + '" message="' + parseInt(ancres[i].split('#message_')[1]) + '" class="citer">Citer</a> - ' + ancres[i]
				}
				html = ancres.join('<li class="ancre">')
			}
			
			/* Liens citer - formulaire de réponse */
			if (html.indexOf('<div id="message_') != -1 && html.indexOf('<li class="ancre"') == -1 && (html.indexOf("</li>\n</ul>\n</div>") != -1 || html.indexOf("</li>\r\n</ul>\r\n</div>") != -1)) {
				var char = html.indexOf("</li>\r\n</ul>\r\n</div>") != -1 ? "\r\n" : "\n"
				var posts = html.split("</li>" + char + "</ul>" + char + "</div>")
				for (var i = 0; i < posts.length; i++) {
					if (posts[i].indexOf('<div id="message_') == -1) {
						continue
					}
					var message = parseInt(posts[i].substr(posts[i].indexOf('<div id="message_') + '<div id="message_'.length, 10))
					posts[i] += '</li><li class="ancre"><a href="#form_post" message="' + message + '" class="citer">Citer</a>'
				}
				html = posts.join("</li>" + char + "</ul>" + char + "</div>")
			}
			
			/* Boutons JV Chat */
			if (jvchat_on < 0) {
				jvchat_on++
				if (html.indexOf('<a target="jvchat"') == -1) {
					var styles = document.getElementsByTagName('style')
					for (var i = 0; i < styles.length; i++) {
						if (styles[i].type == 'text/css' && styles[i].innerHTML.indexOf('.jvchat') != -1) {
							jvchat_on = 1
						}
					}
				}
			}
			if (jvchat_on == 1) {
				/* Liste des sujets */
				if (html.indexOf('<input id="newsujet"') != -1 && html.indexOf('<a class="p_debut"') == -1) {
					var url = str_between(html, '<p id="rafraichir">', '"><img').split('/').pop()
					html = html.replace(/<td class="navig_prec">\r?\n&#160;/g, '<td class="navig_prec"><a target="jvchat" class="jvchat" href="/jvchat#' + url + '">JV Chat</a>')
				}
				
				/* Topic */
				if (html.indexOf('alt="Répondre" width="80" height="17" />') != -1) {
					var url = str_between(html, 'alt="Répondre" width="80" height="17" />', '" class="bt_rafraichir"').split('/').pop()
					html = html.replace(/<\/td>\r?\n<td class="user">/g, '<a target="jvchat" class="jvchat" href="/jvchat#' + url + '">JV Chat</a></td>' + "\r\n" + '<td class="user">')
				}
			}
			
			return html
		}

		function check_update() {
			update_img = new Image()
			update_img.src = update_img_src + '?version=' + turboforum_version + '&time=' + (new Date().getTime())
			update_img.addEventListener('load', function() {
				if (update_img.height > 5) {
					show_update()
				}
				storage('lastupdatecheck', new Date().getTime())
			})
		}

		function show_update() {
			var bar = document.createElement('div')
			bar.id = 'tf_update_bar'
			bar.className = 'tf_update_bar'
			bar.innerHTML = '<span class="tf_update_bar_close">×</span><div><b>TurboForum</b> : Une <a href="http://jvflux.com/turboforum/?from=' + turboforum_version + '" target="_blank">nouvelle version</a> est désormais disponible.</div>'
			bar.children[0].addEventListener('click', function() {
				remove_element('tf_update_bar')
			})
			document.body.insertBefore(bar, geid('global'))
		}
		
		/** Ignorer **/
		function blacklist_load() {
			if (storage('blacklist')) {
				blacklist = storage('blacklist').split(';')
			}
		}
		
		function blacklist_save() {
			storage('blacklist', blacklist.join(';'))
		}
		
		function blacklist_add(pseudo) {
			if (blacklist_has(pseudo)) {
				return
			}
			pseudo = pseudo.toLowerCase()
			blacklist.push(pseudo)
			blacklist_save()
		}
		
		function blacklist_remove(pseudo) {
			if (!blacklist_has(pseudo)) {
				return
			}
			pseudo = pseudo.toLowerCase()
			var blacklist2 = []
			for (var i = 0; i < blacklist.length; i++) {
				if (blacklist[i] != pseudo) {
					blacklist2.push(blacklist[i])
				}
			}
			blacklist = blacklist2
			blacklist_save()
		}
		
		function blacklist_add_from_button(e) {
			e.preventDefault()
			var childs = e.target.parentNode.previousElementSibling.children
			for (var i = 0; i < childs.length; i++) {
				if (childs[i].tagName.toUpperCase() == 'STRONG') {
					if (e.target.title[0] == 'N') {
						blacklist_remove(childs[i].innerHTML)
						break
					}
					else {
						blacklist_add(childs[i].innerHTML)
						break
					}
				}
			}
			if (geid('newmessage')) {
				blacklist_dom()
				p_history.html[no_hash(location.href)] = col1.innerHTML
			}
			else {
				col1.innerHTML = blacklist_html(col1.innerHTML)
				p_history.html[no_hash(location.href)] = col1.innerHTML
				speed_up_all()
			}
		}
		
		function blacklist_has(pseudo) {
			pseudo = pseudo.toLowerCase()
			for (var i = 0; i < blacklist.length; i++) {
				if (blacklist[i] == pseudo) {
					return true
				}
			}
			return false
		}
		
		function blacklist_html(html) {
			if (html.indexOf('<a target="avertir"') != -1) {
				html = html.replace(/class="msg_blacklisted msg/g, 'class="msg')
				html = html.replace(/<a class="add_blacklist" [^>]+><\/a> /g, '')
				var messages = html.split('<div id="message_')
				for (var i = 1; i < messages.length; i++) {
					var message = messages[i]
					var id = message.substr(0, message.indexOf('"'))
					var pseudo = message.substr(message.indexOf('<strong'), 100).split('>')[1].split('<')[0]
					var has = blacklist_has(pseudo)
					if (has) {
						message = message.replace(/class="msg/, 'class="msg_blacklisted msg')
						if (message.indexOf('target="kick_user">') != -1) {
							message = message.replace(/(<a href="http:\/\/www\.jeuxvideo\.com\/cgi-bin\/jvforums\/kick_user\.cgi[^>]+target="kick_user">)/, '<a class="add_blacklist" href="#" title="Ne plus définir ' + pseudo + ' comme indésirable" message=' + id + '></a> $1')
						}
						else {
							message = message.replace(/<a target="avertir"/, '<a class="add_blacklist" href="#" title="Ne plus définir ' + pseudo + ' comme indésirable" message=' + id + '></a> <a target="avertir"')
						}
					}
					else {
						if (message.indexOf('target="kick_user">') != -1) {
							message = message.replace(/(<a href="http:\/\/www\.jeuxvideo\.com\/cgi-bin\/jvforums\/kick_user\.cgi[^>]+target="kick_user">)/, '<a class="add_blacklist" href="#" title="Définir ' + pseudo + ' comme indésirable" message=' + id + '></a> $1')
						}
						else {
							message = message.replace(/<a target="avertir"/, '<a class="add_blacklist" href="#" title="Définir ' + pseudo + ' comme indésirable" message=' + id + '></a> <a target="avertir"')
						}
					}
					messages[i] = message
				}
				html = messages.join('<div id="message_')
			}
			
			if (html.indexOf('<td><a class="ltopic"') != -1) {
				var topics = html.split('<td><a class="ltopic"')
				var dossiers = []
				for (var i = 1; i < topics.length; i++) {
					var fragments = topics[i].split('">')
					var pseudo = fragments[2].split('<')[0]
					if (blacklist_has(pseudo)) {
						var fragments1 = fragments[1].split('<')
						var title = fragments1[0]
						fragments[0] = fragments[0].substr(0, fragments[0].length) + '" title="' + title + ''
						fragments1[0] = ' '
						fragments[1] = fragments1.join('<')
						dossiers[i] = true
					}
					topics[i] = fragments.join('">')
				}
				
				html = topics.join('<td><a class="ltopic"')
				if (dossiers.length > 0) {
					topics = html.split('<td><img src="http://image.jeuxvideo.com/pics/')
					for (var i = 1; i < topics.length; i++) {
						if (dossiers[i]) {
							topics[i] = 'messages_prives/ico_black_on.png" class="dossier_blacklisted' + topics[i].substring(topics[i].indexOf('"'))
						}
					}
					
					html = topics.join('<td><img src="http://image.jeuxvideo.com/pics/')
				}
			}
			return html
		}
		
		function blacklist_dom() {
			/* Utilisé quand on ignore quelqu’un sur le formulaire de réponse, on ne peut recharger col1 sans perdre le message */
			var msgs = geclass('msg'), msg, childs, pseudo, has, button
			for (var i = 0; i < msgs.length; i++) {
				button = undefined
				msg = msgs[i]
				childs = msg.children[0].children[0].children
				for (var j = 0; j < childs.length; j++) {
					if (childs[j].tagName.toUpperCase() == 'STRONG') {
						pseudo = childs[j].innerHTML
					}
				}
				has = blacklist_has(pseudo)
				childs = msg.children[0].children[1].children
				for (var j = 0; j < childs.length; j++) {
					if (childs[j].className == 'add_blacklist' && childs[j].getAttribute('message') == msg.id.substring('message_'.length)) {
						button = childs[j]
					}
				}
				if (has) {
					msg.classList.add('msg_blacklisted')
					button.title = 'Ne plus définir ' + pseudo + ' comme indésirable'
				}
				else {
					msg.classList.remove('msg_blacklisted')
					button.title = 'Définir ' + pseudo + ' comme indésirable'
				}
			}
		}

		/** Action **/

		addEventListener('popstate', function() {
			/* Arrive quand on utilise les boutons précédent/suivant du navigateur */
			if (current_pathname == location.pathname) {
				/* Lien permanent */
				return
			}
			if (!p_history.html[no_hash(location.href)]) {
				/* Arrive quand on a rafraîchit la page au préalable et que TurboForum n’a plus ce lien en mémoire */
				location.href = location.href
				return
			}
			current_pathname = location.pathname
			col1.innerHTML = p_history.html[no_hash(location.href)]
			document.title = p_history.title[no_hash(location.href)]
			speed_up_all()
		})

		if (geid('fiche_infos2')) {
			/* On retire la pub pour Amazon/Fnac sur les forums de jeux, elle est dans col2 alors qu’on update uniquement col1 */
			remove_element('fiche_infos2')
		}
		if (geid('sponso_forum')) {
			/* Présent sur certains forums de jeux comme LoL */
			remove_element('sponso_forum')
		}

		blacklist_load()
		current_pathname = location.pathname
		col1.innerHTML = add_goodies(col1.innerHTML)
		p_history.html[no_hash(location.href)] = col1.innerHTML
		p_history.title[no_hash(location.href)] = document.title
		speed_up_all(true)

		if ((new Date().getTime() - storage('lastupdatecheck')) > 1000 * 60 * 60 * 12) {
			check_update()
		}

		var style = document.createElement('style')
		style.innerHTML = '.tf_update_bar { padding: 6px 0 8px; background: #ddd; box-shadow: 0 1px 3px rgba(0, 0, 0, .5); }\
		.tf_update_bar_close { float: right; border: 1px solid rgba(0, 0, 0, .5); border-radius: 2px; background: white; font-size: 120%; padding: 0 4px; margin-right: 5px; cursor: pointer; }\
		.msg .ancre { color: #666; }\
		.add_blacklist { display: none; background: url(http://image.jeuxvideo.com/pics/messages_prives/ico_black_on.png) no-repeat; margin-right: 3px; cursor: pointer; opacity: .9; }\
		.date:hover .add_blacklist { display: inline-block; height: 12px; width: 13px; }\
		.msg_blacklisted .post, .msg_blacklisted .ancre { display: none; }\
		.msg_blacklisted .pseudo { margin-bottom: 0; }\
		.msg_blacklisted .add_blacklist { display: inline-block; height: 12px; width: 13px; background-image: url(http://image.jeuxvideo.com/pics/messages_prives/ico_black_off.png); opacity: 1; }\
		.dossier_blacklisted { margin-left: 1px; }'
		document.head.appendChild(style)
	}

	var script = document.createElement('script')
	script.innerHTML = TurboForum.toString().substring("function () {\n".length, TurboForum.toString().length - "\t}".length)
	document.body.appendChild(script)
}

else if (geid('turboforum_derniere_version')) {
	var turboforum_version = '1.4'
	var derniere_version = geid('turboforum_derniere_version').innerHTML

	if (geid('turboforum_ma_version')) {
		geid('turboforum_ma_version').innerHTML = turboforum_version
	}

	if (turboforum_version == derniere_version) {
		document.body.classList.add('a_jour')
	}
	else {
		document.body.classList.add('pas_a_jour')
	}
}
