// ==UserScript==
// @name           lastpage
// @namespace      lastpage
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

function lastPages(moderateur) {

	// On récupère toutes les balises <tr> puisque pas d'id sur celle qu'on cherche
	var trTopics = document.getElementsByTagName('tr');
	
	for (var i = 1; trTopics[i]; i++) // On éxecute l'opération autant de fois qu'il y a de balises <tr>
	{
		// Si on est sur le <tr> d'un topic (repérable grâce aux classes)
		if (trTopics[i].className == 'tr1' || trTopics[i].className == 'tr2')
		{
			if (moderateur == 'on')
			{
				try {
				var nbrePages = trTopics[i].getElementsByTagName('td')[4].innerHTML;
				var href = trTopics[i].getElementsByTagName('a')[1].href;
				var tdDossier = trTopics[i].getElementsByTagName('td')[0];
				var pages = Math.floor(nbrePages / 20 + 1);
				href = href.replace(/http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/, 'http://www.jeuxvideo.com/forums/1-$2-$3-' + pages + '-$5-$6-$7-$8.htm');
	
				tdDossier.innerHTML = tdDossier.innerHTML.replace(/<img src="(.*)" alt="">/, '<a href="' + href + '"><img src="$1" alt=""></a>');
				
				} catch(err) {
				
				var nbrePages = trTopics[i].getElementsByTagName('td')[4].innerHTML;
				var href = trTopics[i].getElementsByTagName('a')[0].href;
				var tdDossier = trTopics[i].getElementsByTagName('td')[0];
				var pages = Math.floor(nbrePages / 20 + 1);
				href = href.replace(/http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/, 'http://www.jeuxvideo.com/forums/1-$2-$3-' + pages + '-$5-$6-$7-$8.htm');
	
				tdDossier.innerHTML = tdDossier.innerHTML.replace(/<img src="(.*)" alt="">/, '<a href="' + href + '"><img src="$1" alt=""></a>');
				}
			}
			else
			{
				var nbrePages = trTopics[i].getElementsByTagName('td')[3].innerHTML;
				var href = trTopics[i].getElementsByTagName('a')[0].href;
				var tdDossier = trTopics[i].getElementsByTagName('td')[0];
				var pages = Math.floor(nbrePages / 20 + 1);
				href = href.replace(/http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/, 'http://www.jeuxvideo.com/forums/1-$2-$3-' + pages + '-$5-$6-$7-$8.htm');

				tdDossier.innerHTML = tdDossier.innerHTML.replace(/<img src="(.*)" alt="">/, '<a href="' + href + '"><img src="$1" alt=""></a>');
			}
		}
	}
}

function init() {

	var urlInfos = window.location.href.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/);
	
	if (urlInfos[1] == 0) // Si on est sur la liste des sujets
	{
		var lineTopicTd = document.getElementById('liste_topics').getElementsByTagName('tr'); // On vérifie si il y a la ligne de modération
		if (lineTopicTd[0].getElementsByTagName('th')[1].className == 'col_moder')
		{	
			var moderateur = 'on';
			lastPages(moderateur);
		}
		else
		{
			var moderateur = 'off';
			lastPages(moderateur);
		}
	}
}

init();