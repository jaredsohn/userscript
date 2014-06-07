// ==UserScript==
// @name           Toast...
// @namespace      Shalenity
// @description    Compilation Smileys jeuxvideo.com
// @include        http://www.shalenity.com/forum-1.html*
// @include        http://www.shalenity.com/topic*
// @include        http://www.shalenity.com/news.htm*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:ahap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337610940-ahap.png' />");

var reg=new RegExp("(:tboll:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/tboll.gif' />");

var reg=new RegExp("(:death:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/death.gif' />");

var reg=new RegExp("(:dolan:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/Dolan.gif' />");

var reg=new RegExp("(:fp:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/facepalm.gif' />");

var reg=new RegExp("(:fdbb:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/302.gif' />");

var reg=new RegExp("(:wtf:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/wtf.gif' />");

var reg=new RegExp("(:tbollok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/tbollok.gif' />");

var reg=new RegExp("(:flip:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://i2.kym-cdn.com/profiles/icons/big/000/110/902/Flipping%20Tables.jpg' 

/>");

var reg=new RegExp("(:feel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/764a2cc2cdf5d7ce930a8152d659d462.png' 

/>");

var reg=new RegExp("(:wi:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/65b2950ba15300cb65b3843d056c250d.png' 

/>");

var reg=new RegExp("(:japfuck:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/cfc0840d41901718f9ad7e06e8e329ee.gif' 

/>");




document.body.innerHTML=chaine;

var options = {
	getAll: function() {
		var options = localStorage.getItem('options');
		options = options ? JSON.parse(options) : {};
		return options;
	},
	get: function(key) {
		var options = this.getAll();
		return(options[key]);
	},
	setAll: function(callback) {
		var options = this.getAll();
		callback(options);
		localStorage.setItem('options', JSON.stringify(options));
	},
	set: function(key, value) {
		var options = this.getAll();
		options[key] = value;
		localStorage.setItem('options', JSON.stringify(options));
	}
};

////////////////////////////////////////
// Initialisation
////////////////////////////////////////

(function() {
	var s = document.createElement('style');
	s.type = 'text/css';
	s.rel = 'stylesheet';
	s.innerHTML = 'p.blocHeader a { float: right; } p.blocHeader img { vertical-align: bottom; } div.optionsForm { 

background: url(http://image.jeuxvideo.com/css_img/defaut/sep_999.gif) left top repeat-x; margin-bottom: 1em; margin-top: 

6px; padding-top: 1em; } div.optionsForm p + p { margin-top: 1em; } div.optionsForm input { vertical-align: top; } 

div.optionsForm label { font-weight: normal; margin-left: 3px; vertical-align: middle; } li.pseudo strong.male { 

transition: color 200ms; -webkit-transition: color 200ms; -moz-transition: color 200ms; } li.pseudo strong.male:hover { 

color: #09F; } li.pseudo strong.female { transition: color 200ms; -webkit-transition: color 200ms; -moz-transition: color 

200ms; } li.pseudo strong.female:hover { color: #F39; } li.pseudo strong.banned { transition: text-decoration 200ms; -

webkit-transition: text-decoration 200ms; -moz-transition: text-decoration 200ms; } li.pseudo strong.banned:hover { text-

decoration: line-through; } li.pseudo span { background-image: url(http://image.noelshack.com/fichiers/2012/19/1336747077-

Rangs_Updated_By_Cartouchiere.png); display: inline-block; height: 13px; margin-left: 3px; width: 16px; } li.pseudo 

span.carton { background-position: 0px -248px; } li.pseudo span.bronze { background-position: 0px -278px; } li.pseudo 

span.argent { background-position: 0px -308px; } li.pseudo span.or { background-position: 0px -338px; } li.pseudo 

span.rubis { background-position: 0px -368px; } li.pseudo span.saphir { background-position: 0px -398px; } li.pseudo 

span.emeraude { background-position: 0px -428px; } li.pseudo span.diamant { background-position: 0px -458px; } div.msg 

div.profilePicture { position: absolute; right: 100%; top: -1px; transition: opacity 200ms; -webkit-transition: opacity 

200ms; -moz-transition: opacity 200ms; } div.msg div.profilePicture img { border: 1px solid white; box-shadow: 0px 0px 7px 

black; position: relative; right: 12px; } table.lightbox { background-color: rgba(0, 0, 0, 0); height: 100%; left: 0px; 

position: fixed; top: 0px; transition: background-color 500ms; -webkit-transition: background-color 500ms; -moz-transition: 

background-color 500ms; width: 100%; z-index: -1; } table.lightbox iframe { box-shadow: 0px 0px 30px black; height: 0px; 

transition: all 500ms; -webkit-transition: all 500ms; -moz-transition: all 500ms; width: 0px; } #liste_topics 

a.lastViewLink { display: inline; font-size: 100%; font-weight: normal; } #liste_topics a.lastViewLink:visited { color: 

#0A77B8; } div.msg:target { background-color: #EBFAEB; }';
	(document.head||document.documentElement).appendChild(s);
})();

(function() {
	options.setAll(function(options) {
		options['profileInfos'] = options['profileInfos'] == false ? false : true;
		options['lastViewLink'] = options['lastViewLink'] == false ? false : true;
		options['sameTimePosts'] = options['sameTimePosts'] == false ? false : true;
	});
})();

////////////////////////////////////////
// Bouton d'options
////////////////////////////////////////

(function() {
	var menu = document.querySelector('div#menu_interactif ul');
	if (menu == null) return;

	var li = document.createElement('li');
	var a = document.createElement('a');
	a.href = '?options';
	a.textContent = 'JVCPremium';
	li.appendChild(a);
	menu.insertBefore(li, menu.firstChild);
})();

////////////////////////////////////////
// Page d'options
////////////////////////////////////////

(function() {
	if(location.search == '?options') {
		var title = document.querySelector('title');
		title.textContent = 'JVCPremium : Page de configuration';
		var pseudo = document.querySelector('td#compte a strong') ? document.querySelector('td#compte a 

strong').textContent : 'jeune pomme';
		var href = location.protocol + '//' + location.host + location.pathname + location.hash;
		var html = '<h2 class="titre_page"><span>Les forums de JeuxVideo.com</span></h2>';
		html += '<div class="bloc_forum">';
		html += '<h1 class="titre_forum"><span class="txt">JVCPremium :</span> Page de configuration</h1>';
		html += '<div class="bloc_inner" style="padding-bottom: 0px;">';
		html += '<p class="blocHeader"><strong>Bonjour ' + pseudo + ' <img 

src="http://image.jeuxvideo.com/smileys_img/18.gif"></strong>';
		html += '<a href="' + href + '"><img src="http://image.noelshack.com/fichiers/2012/15/1334493015-

previousPage.gif"></a></p>';
		html += '<div class="optionsForm">';
		html += '<p><input id="profileInfos" name="profileInfos" type="checkbox"' + (function() { return 

options.get('profileInfos') ? ' checked' : '' })() + '>';
		html += '<label for="profileInfos">Infos de profil (genre, grade, image)</label></p>';
		html += '<p><input id="lastViewLink" name="lastViewLink" type="checkbox"' + (function() { return 

options.get('lastViewLink') ? ' checked' : '' })() + '>';
		html += '<label for="lastViewLink">Lien du dernier post visité pour chaque topic</label></p>';
		html += '<p><input id="sameTimePosts" name="sameTimePosts" type="checkbox"' + (function() { return 

options.get('sameTimePosts') ? ' checked' : '' })() + '>';
		html += '<label for="sameTimePosts">Surlignage des PEMT</label></p>';
		html += '</div></div></div>';
		var container = document.querySelector('div#col1');
		container.innerHTML = html;
		var inputs = document.querySelectorAll('div.optionsForm input');
		for(var i = 0; i < inputs.length; i++) {
			inputs[i].addEventListener('change', function() {
				options.set(this.name, this.checked);
			});
		}
	}
})();


var profileInfos = {
	get: function(profile, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', profile);
		xhr.send();
		xhr.addEventListener('readystatechange', function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				
				////////////////////////////////////////
				// Nettoyage du code
				////////////////////////////////////////
				
				var response = (function(response) {
					response = response.replace(/[\t\n\r]/g, '');
					response = response.replace(/<n?o?script.*?>.*?<\/n?o?script>/gi, '');
					/<body.*?>(.*?)<\/body>/i.exec(response);
					return RegExp.$1;
				})(xhr.responseText);
				
				////////////////////////////////////////
				// Récupération du DOM
				////////////////////////////////////////
				
				var response = (function(response) {
					var body = document.createElement('body');
					body.innerHTML = response;
					return body;
				})(response);
				
				////////////////////////////////////////
				// Extraction des infos
				////////////////////////////////////////
				
				callback((function(response) {
					var status = response.querySelector('p.banni') ? false : true;
					if(status) {
						var gender = response.querySelector('h1.sexe_f') ? false: true;
						var rank = response.querySelector('li#rang span').textContent;
						var picture = response.querySelector('div#pt_avatar div.portlet-content 

img').src;
						picture = picture == 'http://image.jeuxvideo.com/avatars/default.jpg' ? 

false : picture;
						return {
							gender: gender,
							rank: rank,
							picture: picture,
							html: response
						};
					}
					else {
						return false;
					}
				})(response));
			}
		});
	},
	setLightbox: function() {
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		var iframe = document.createElement('iframe');
		table.addEventListener('click', function() {
			iframe.style.height = '';
			iframe.style.width = '';
			table.style.backgroundColor = '';
			setTimeout(function() {
				table.style.zIndex = -1;
			}, 500);
		});
		table.classList.add('lightbox');
		iframe.addEventListener('load', function() {
			iframe.style.height = iframe.contentDocument.body.offsetHeight + 'px';
			iframe.style.width = iframe.contentDocument.body.scrollWidth + 'px';
		});
		iframe.setAttribute('frameborder', 0);
		iframe.setAttribute('scrolling', 'no');
		td.appendChild(iframe);
		tr.appendChild(td);
		table.appendChild(tr);
		document.body.appendChild(table);	
	}
};

(function() {
	if(options.get('profileInfos') && /^\/forums\/1|3/i.test(location.pathname) && location.search != '?options') {
		
		profileInfos.setLightbox();
		
		////////////////////////////////////////
		// Récupération des posts
		////////////////////////////////////////
		
		var lines = document.querySelectorAll('li.pseudo strong');
		var pseudos = (function() {
			var response = [];
			for(var i = 0; i < lines.length; i++) {
				response.push(lines[i].textContent);
			}
			return response;
		})();
		
		////////////////////////////////////////
		// Action pour chaque posts
		////////////////////////////////////////
		
		for(var i = 0; i < pseudos.length; i++) {
			(function(i) {
				profileInfos.get('http://www.jeuxvideo.com/profil/' + pseudos[i] + '.html', function

(response) {
					if(response) {
						
						////////////////////////////////////////
						// Affichage du genre et du rang
						////////////////////////////////////////
						
						lines[i].classList.add(response.gender ? 'male' : 'female');
						var span = document.createElement('span');
						span.classList.add(response.rank);
						lines[i].parentNode.appendChild(span);
						
						////////////////////////////////////////
						// Image de profil
						////////////////////////////////////////
						
						if(response.picture) {
							var div = document.createElement('div');
							var img = document.createElement('img');
							div.classList.add('profilePicture');
							div.style.opacity = 0;
							div.style.zIndex = -1;
							img.src = response.picture;
							div.appendChild(img);
							lines[i].parentNode.parentNode.appendChild(div);
							lines[i].addEventListener('mouseover', function() {
								div.style.zIndex = '';
								div.style.opacity = '';
							});
							lines[i].addEventListener('mouseout', function() {
								div.style.opacity = 0;
								setTimeout(function() {
									div.style.zIndex = -1;
								}, 200);
								
							});
						}
						
						////////////////////////////////////////
						// Bouton de lightbox
						////////////////////////////////////////
						
						var lightbox = document.querySelector('table.lightbox');
						var iframe = document.querySelector('table.lightbox iframe');

						var a = document.createElement('a');
						var img = document.createElement('img');
						a.addEventListener('click', function() {
							lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
							lightbox.style.zIndex = 10;
							iframe.src = 'http://www.jeuxvideo.com/profil/' + pseudos[i] + 

'.html';
							iframe.style.width = '727px'; // Firefox fix :p
							//iframe.style.height = '770px';
						});
						//a.href = 'javascript:void(0)';
						a.onclick = function() {
							return false;
						};
						a.style.marginRight = '5px';
						img.src = response.gender ? 

'http://image.noelshack.com/fichiers/2012/16/1334668105-profileMale.gif' : 

'http://image.noelshack.com/fichiers/2012/16/1334668105-profileFemale.gif';
						a.appendChild(img);
						lines[i].parentNode.insertBefore(a, lines[i].parentNode.querySelector('a

[target="profil"]'));
					}
					else {
						lines[i].classList.add('banned');
					}
				});
			})(i);
		}
	}
})();



var dataStorage = {
	get: function(key) {
		return JSON.parse(localStorage.getItem(key));
	},
	exec: function(key, callback) {
		var value = JSON.parse(localStorage.getItem(key)) || {};
		callback(value);
		localStorage.setItem(key, JSON.stringify(value));
	}
};
function lastViewLink() {
	var topics = document.querySelectorAll('tr.tr1, tr.tr2');
	var keys = (function() {
		var response = [];
		for(var i = 0; i < topics.length; i++) {
			var key = topics[i].querySelector('a.ltopic').name;
			response.push(key.replace('topic_', ''));
		}
		return response;
	})();
	var numbers = (function() {
		var response = [];
		for(var i = 0; i < topics.length; i++) {
			var cells = topics[i].querySelectorAll('td');
			response.push(cells[cells.length - 2]);
		}
		return response;
	})();
	var lastPosts = dataStorage.get('lastPosts');
	for(var i = 0; i < numbers.length; i++) {
		if(lastPosts[keys[i]]) {
			(function(i) {
				var textContent = numbers[i].textContent;
				var a = document.createElement('a');
				a.classList.add('lastViewLink');
				a.href = lastPosts[keys[i]];
				a.textContent = textContent;
				numbers[i].removeChild(numbers[i].firstChild);
				numbers[i].appendChild(a);
			})(i);
		}
	}
}

(function() {
	if(options.get('lastViewLink') && /^\/forums\/(0|1|3)/i.test(location.pathname) && location.search != '?options') {
		var forum = RegExp.$1 == 0 ? true : false;
		var pageId = (function() {
			if(RegExp.$1 == 0) {
				return document.querySelector('input[name="forum"]').value;
			}
			if(RegExp.$1 == 1) {
				/-([0-9]+).xml/i.exec(document.querySelector('p.rss a').href);
				return RegExp.$1;
			}
			if(RegExp.$1 == 3) {
				return document.querySelector('input[name="topic"]').value;
			}
		})();
		if(forum) {
			lastViewLink();
		}
		else {
			(function() {
				var posts = document.querySelectorAll('div[id^="message_"]');
				var lastPost = posts[posts.length - 1].querySelector('li.ancre a').href;
				dataStorage.exec('lastPosts', function(value) {
					if(value[pageId]) {
						var id = new RegExp('#message_([0-9]+)', 'i');
						id.exec(value[pageId]);
						var valueId = RegExp.$1;
						id.exec(lastPost);
						var lastPostId = RegExp.$1;
						if(lastPostId > valueId) { value[pageId] = lastPost; }
					}
					else { value[pageId] = lastPost; }
				});
			})();
		}
	}
})();


(function() {
	if(options.get('sameTimePosts') && /^\/forums\/1|3/i.test(location.pathname) && location.search != '?options') {
		var dates = document.querySelectorAll('li.date');
		for(var i = 1; i < dates.length; i++) {
			if(dates[i - 1].textContent == dates[i].textContent) {
				(function(posts) {
					for(var i = 0, span; i < posts.length; i++) {
						posts[i].firstChild.nodeValue = posts[i].firstChild.nodeValue.replace(/([0

-9]{2}:[0-9]{2}:[0-9]{2})/i, '');
						span = document.createElement('span');
						span.textContent = RegExp.$1 + "\n";
						posts[i].insertBefore(span, posts[i].firstChild.nextSibling);
					}
				})([dates[i - 1], dates[i]]);
			}
		}
	}
})();