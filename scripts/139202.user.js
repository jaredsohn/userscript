// ==UserScript==
// @name          JV Mod
// @namespace     http://perdu.com/jvmod
// @description   Signaler sur le topic de modération en 1 clic.
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/forums/3-*
// @version       1.0
// ==/UserScript==

var topicsDeMod, numForum, numTopicDeMod;
var forumsCgi = 'http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi';

// Fonction pour mettre à jour la liste des topics de mod.

function majTopicsDeMod(firstLauch)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ocrlol.alwaysdata.net/topics.txt?_=' + (new Date().getTime()),
		
		onload: function(response)
		{
			if(response.responseText.substr(0, 2) === '1|')
			{
				unsafeWindow.localStorage.setItem('topicsDeMod', response.responseText);
				topicsDeMod = response.responseText.split(' ');
				
				if(firstLauch === true)
				{
					ajouterBouton();
				}
			}
		}
	});
}

// Fonction pour envoyer un message de signalement.

function traiterForm(responseText, url, img)
{
	var formData = '';
	var inputs = responseText.split('id="post"')[1].split('</form>')[0];
	inputs = inputs.match(/<input[^>]*?(?:name|value)=".+?"[^>]*?(?:name|value)=".+?"[^>]*?>/g);
	var keyval = {};

	for(var i = 0, len = inputs.length; i < len; i++)
	{
		formData += inputs[i].split('name="')[1].split('"')[0] + '=' + inputs[i].split('value="')[1].split('"')[0] + '&';
	}
	
	formData += 'yournewmessage=' + url;
	
	var timeout = 1000;
	if(responseText.indexOf('moins de dix secondes') !== -1)
	{
		timeout *= 10;
	}
	else if(responseText.indexOf('pas valide') === -1 && responseText.indexOf('code de confirmation') === -1)
	{
		alert(responseText.split('<p class="alerte">')[1].split('<')[0]);
		img.style.cursor = 'pointer';
		img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAA2UlEQV' +
				  'Qoz4XRMUtCYRiG4etTozhCUjmESzTXULjmP62/0dJ6hoKkpYagLXJJCPWcT6LiazhH1EUfeIeb9+' +
				  'ZZnvB4JNmS/rhSWtC/GmyUh92gP06VrJxtbr68MOwGDTCP1d09mc5mfmO5xn+xhIU8rw77928+Jg' +
				  'X5K8jHE9MiLuVUFlJZgOvjtpPnkZfTDhgV0U/9a0H++QUGeC+im05QJs5qfvim16zl1TQDhw16K7' +
				  'xIY1W8PQgy7KIdltys/2vNWeB8hz2EQGbJEFJKadgN4pYds1DLi5W25R+frFloPfzg6gAAAABJRU' +
				  '5ErkJggg==';
		return;
	}
	
	window.setTimeout(function()
	{
		if(responseText.indexOf('code de confirmation') !== -1)
		{
			var ccode = responseText.split('<img src="http://www.jeuxvideo.com/cgi-bin/')[1].split('"')[0].replace('&amp;', '&');
			ccode = 'http://www.jeuxvideo.com/cgi-bin/' + ccode;
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://bidequest.alwaysdata.net/tesseract.cgi?' + ccode,
				onload: function(response)
				{
					formData += '&code=' + response.responseText;
					
					/*
					 * Début du copier-coller sale
					 */
					
					var xhr = new XMLHttpRequest();
					xhr.open('POST', forumsCgi);
					
					xhr.onreadystatechange = function()
					{
						if(xhr.readyState == 4)
						{
							if(xhr.responseText.indexOf('class="form_err"') !== -1)
							{
								traiterForm(xhr.responseText, url, img);
							}
							else
							{
								img.style.cursor = 'pointer';
								img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAA2UlEQV' +
										  'Qoz4XRMUtCYRiG4etTozhCUjmESzTXULjmP62/0dJ6hoKkpYagLXJJCPWcT6LiazhH1EUfeIeb9+' +
										  'ZZnvB4JNmS/rhSWtC/GmyUh92gP06VrJxtbr68MOwGDTCP1d09mc5mfmO5xn+xhIU8rw77928+Jg' +
										  'X5K8jHE9MiLuVUFlJZgOvjtpPnkZfTDhgV0U/9a0H++QUGeC+im05QJs5qfvim16zl1TQDhw16K7' +
										  'xIY1W8PQgy7KIdltys/2vNWeB8hz2EQGbJEFJKadgN4pYds1DLi5W25R+frFloPfzg6gAAAABJRU' +
										  '5ErkJggg==';
							}
						}
					};
					xhr.send(formData);
					
					/*
					 * Fin du copier-coller sale
					 */
				}
			});
			return;
		}
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', forumsCgi);
		
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4)
			{
				if(xhr.responseText.indexOf('class="form_err"') !== -1)
				{
					traiterForm(xhr.responseText, url, img);
				}
				else
				{
					img.style.cursor = 'pointer';
					img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAA2UlEQV' +
							  'Qoz4XRMUtCYRiG4etTozhCUjmESzTXULjmP62/0dJ6hoKkpYagLXJJCPWcT6LiazhH1EUfeIeb9+' +
							  'ZZnvB4JNmS/rhSWtC/GmyUh92gP06VrJxtbr68MOwGDTCP1d09mc5mfmO5xn+xhIU8rw77928+Jg' +
							  'X5K8jHE9MiLuVUFlJZgOvjtpPnkZfTDhgV0U/9a0H++QUGeC+im05QJs5qfvim16zl1TQDhw16K7' +
							  'xIY1W8PQgy7KIdltys/2vNWeB8hz2EQGbJEFJKadgN4pYds1DLi5W25R+frFloPfzg6gAAAABJRU' +
							  '5ErkJggg==';
				}
			}
		};
		xhr.send(formData);
	}, timeout);
}

// Fonction pour signaler un message.

function signaler()
{
	this.removeEventListener('click', signaler, true);
	this.style.cursor = 'default';
	this.src = 'data:image/gif;base64,R0lGODlhCwAMAIQSAD8/P1NTU1hYWFlZWVpaWl5eXl9fX2FhY' +
	           'WRkZGZmZn19fYODg4yMjI6OjpKSkpeXl56env///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
	           'AAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAfACwAAAAACwA' +
	           'MAAAFOmAijmMUJVCqpsn5vDAsOnRdi02u66Kp+D5EKwIwFYmFBAEACDCdgKSBQChQrQThYc' +
	           'vlthLd7pBEDgEAIfkECQoAHwAsAAAAAAsADAAABTxgIo5jFCVQqqbJ+bwwLDp0XYvmwjQ8j' +
	           '0cCk0KISBAAAFMyAigkDATCABlAOg9YKKEQLWK/4FYCHDaRziEAIfkECQoAHwAsAAAAAAsA' +
	           'DAAABT1gIo5jFCVQqqbJ+bwwLDp0XYtNbi5MLpoKkwCIaEUAAQDABCgkCMoBgTBQOg1Tw+G' +
	           'AJRS34HArERabSOgQACH5BAkKAB8ALAAAAAALAAwAAAU8YCKOYxQlUKqmyfm8MCw6dF2LTa' +
	           '6bC9JGClMwIij8ACZAAAAwEphLwIBA8BmoBarhcBBxv+BWAhw2kc4hADs=';
	var url = location.href.split('#')[0];
	var numTopic = url.split('-')[2];
	var id = this.parentNode.parentNode.parentNode.id;
	
	if(id.split('_')[1] !== numTopic)
	{
		url += '#' + id;
	}
	url = encodeURIComponent(url);
	
	var img = this;
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', forumsCgi + '?mode=5&forum=' + numForum + '&topic=' + numTopicDeMod, true);
	
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4)
		{
			traiterForm(xhr.responseText, url, img);
		}
	};
	xhr.send(null);
}

// Vérifier que le forum a bien un topic de mode listé.

if(unsafeWindow.localStorage.getItem('topicsDeMod') === null)
{
	majTopicsDeMod(true);
}
else
{
	topicsDeMod = unsafeWindow.localStorage.getItem('topicsDeMod').split(' ');
	majTopicsDeMod(false);
	ajouterBouton();
}

// Ajouter le bouton sur chaque message.

function ajouterBouton()
{
	numForum = location.href.split('-')[1];
	
	for(var i = 0; i < topicsDeMod.length; i++)
	{
		if(topicsDeMod[i].split('|')[0] === numForum)
		{
			numTopicDeMod = topicsDeMod[i].split('|')[1];
			
			var img = document.createElement('img');
			img.style.cursor = 'pointer';
			img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAA2UlEQV' +
					  'Qoz4XRMUtCYRiG4etTozhCUjmESzTXULjmP62/0dJ6hoKkpYagLXJJCPWcT6LiazhH1EUfeIeb9+' +
					  'ZZnvB4JNmS/rhSWtC/GmyUh92gP06VrJxtbr68MOwGDTCP1d09mc5mfmO5xn+xhIU8rw77928+Jg' +
					  'X5K8jHE9MiLuVUFlJZgOvjtpPnkZfTDhgV0U/9a0H++QUGeC+im05QJs5qfvim16zl1TQDhw16K7' +
					  'xIY1W8PQgy7KIdltys/2vNWeB8hz2EQGbJEFJKadgN4pYds1DLi5W25R+frFloPfzg6gAAAABJRU' +
					  '5ErkJggg==';

			var msgs = document.getElementsByClassName('msg');

			for(var i = 0, len = msgs.length; i < len; i++)
			{
				var clone = img.cloneNode(false);
				clone.addEventListener('click', signaler, true);
				
				var date = msgs[i].getElementsByClassName('date')[0];
				date.appendChild(document.createTextNode(' '));
				date.appendChild(clone);
			}
			return;
		}
	}
}