// ==UserScript==
// @name           root
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

function sup_page_topics(idRecherche) // Supprimer les topics sur la liste des sujets
{
	if (idRecherche == 4)
	{
		document.getElementById('menu_interactif').innerHTML = document.getElementById('menu_interactif').innerHTML.replace(/<\/ul>(\r?\n?)$/, "</ul>$1</div>\r\n<div id=\"menu_actions\">\r\n<h3 style=\"background: url(http://jvflux.com/noreferer/norepl/root/images/t_sommaire_actions.gif);\"><span>Actions</span></h3>\r\n<ul>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = true;} return false;\">Tout cocher</a></li>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {if (document.getElementById('msg_' + i).className == '&nbsp;') {document.getElementById('msg_' + i).checked = true;}} return false;\">Tout cocher (msg)</a></li>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = false;} return false;\">Tout d&eacute;cocher</a></li>\r\n</ul>\r\n");
		document.getElementById('menu_actions').innerHTML = document.getElementById('menu_actions').innerHTML.replace(/<\/ul>/, "<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Êtes-vous sûr(e) de vouloir effacer toute votre sélection ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) { if (document.getElementById('msg_' + i).checked) {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)}} return false;\">Effacer (s&eacute;lection)</a></li>\r\n<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Êtes-vous sûr(e) de vouloir effacer la totalité des topics et messages de cette page ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)} return false;\">Effacer (page)</a></li>\r\n</ul>");	
	}
	else
	{
		document.getElementById('menu_interactif').innerHTML = document.getElementById('menu_interactif').innerHTML.replace(/<\/ul>(\r?\n?)$/, "</ul>$1</div>\r\n<div id=\"menu_actions\">\r\n<h3 style=\"background: url(http://jvflux.com/noreferer/norepl/root/images/t_sommaire_actions.gif);\"><span>Actions</span></h3>\r\n<ul>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = true;} return false;\">Tout cocher</a></li>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = false;} return false;\">Tout d&eacute;cocher</a></li>\r\n</ul>\r\n");
		document.getElementById('menu_actions').innerHTML = document.getElementById('menu_actions').innerHTML.replace(/<\/ul>/, "<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Êtes-vous sûr(e) de vouloir effacer toute votre sélection ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) { if (document.getElementById('msg_' + i).checked) {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)}} return false;\">Effacer (s&eacute;lection)</a></li>\r\n<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Êtes-vous sûr(e) de vouloir effacer la totalité des topics de cette page ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)} return false;\">Effacer (page)</a></li>\r\n</ul>");
	}
	
	// On ajoute la colonne des cases à cocher
	var topics = document.getElementById('liste_topics').innerHTML;
	topics = topics.replace(/<tr>/, '<tr>\r\n<th style="width: 15px;">&nbsp;</th>');

	// On récupère toutes les balises <tr> puisque pas d'id sur celle qu'on cherche
	var trTopics = document.getElementsByTagName('tr');
	
	// Initialisation du tableau contenant les liens de suppression
	var supLien = new Array();
	p = 1;
	
	for (var l = 1; trTopics[l]; l++) // On éxecute l'opération autant de fois qu'il y a de balises <tr>
	{
		// Si on est sur le <tr> d'un topic (repérable grâce aux classes)
		if (trTopics[l].className == 'tr1' || trTopics[l].className == 'tr2')
		{
			// On récupère le lien de modération (1ere balise <a>)
			var lien = trTopics[l].getElementsByTagName('a');
			supLien[p] = lien[0];
			p++;
		}
	}
	
	// Si c'est une recherche par message, on vire les cases à cocher pour les topics
	if (idRecherche == 4)
	{
		// On incrémente à partir de 1 tous les messages, et implentation des liens de suppressions dans les value
		for (var id = 1; topics.search(/<tr class="(tr[12]|trinv)">\r?\n?<td>(<img|&nbsp;)/) != -1; id++)
		{
			// On ajoute les cases + ajout du lien de suppression dans le value
			topics = topics.replace(/(<tr class="tr[12]">\r?\n?)<td>(<img|&nbsp;)/, '$1<td><input type="checkbox" id="msg_' + id + '" value="' + supLien[id] + '" class="$2" /></td>\r\n<td>$2');
			// Topics invisibles
			topics = topics.replace(/(<tr class="trinv">\r?\n?)<td>(<img|&nbsp;)/, '$1<td><input type="checkbox" disabled="disabled" /></td>\r\n<td>$2');
		}
	}
	else
	{
		// On incrémente à partir de 1 tous les messages, et implentation des liens de suppressions dans les value
		for (var id = 1; topics.search(/<tr class="(tr[12]|trinv)">\r?\n?<td>(<img|&nbsp;)/) != -1; id++)
		{
			// On ajoute les cases + ajout du lien de suppression dans le value
			topics = topics.replace(/(<tr class="tr[12]">\r?\n?)<td>(<img|&nbsp;)/, '$1<td><input type="checkbox" id="msg_' + id + '" value="' + supLien[id] + '" /></td>\r\n<td>$2');
			// Topics invisibles
			topics = topics.replace(/(<tr class="trinv">\r?\n?)<td>(<img|&nbsp;)/, '$1<td><input type="checkbox" disabled="disabled" /></td>\r\n<td>$2');
		}
	}
	document.getElementById('liste_topics').innerHTML = topics;
}

function sup_page_messages() // Supprimer les messages dans un topic
{
    document.getElementById('menu_interactif').innerHTML = document.getElementById('menu_interactif').innerHTML.replace(/<\/ul>(\r?\n?)$/, "</ul>$1</div>\r\n<div id=\"menu_actions\">\r\n<h3 style=\"background: url(http://jvflux.com/noreferer/norepl/root/images/t_sommaire_actions.gif);\"><span>Actions</span></h3>\r\n<ul>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = true;} return false;\">Tout cocher</a></li>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = false;} return false;\">Tout d&eacute;cocher</a></li>\r\n</ul>\r\n");
    document.getElementById('menu_actions').innerHTML = document.getElementById('menu_actions').innerHTML.replace(/<\/ul>/, "<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Êtes-vous sûr(e) de vouloir effacer toute votre sélection ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) { if (document.getElementById('msg_' + i).checked) { if (document.getElementById('msg_' + i).value != '') {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)}}} return false;\">Effacer (s&eacute;lection)</a></li>\r\n<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Êtes-vous sûr(e) de vouloir effacer la totalité des messages de cette page ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) { if (document.getElementById('msg_' + i).value != '') {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)}} return false;\">Effacer (page)</a></li>\r\n</ul>");

	var divMessages = document.getElementsByTagName('div');
	// On initialise une autre variable pour les messages car i = pas fiable vu que ça teste TOUTES les div
	var j = 1;
	
	for (var i = 1; divMessages[i]; i++)
	{
		if (divMessages[i].className == 'msg msg1' || divMessages[i].className == 'msg msg2')
		{
			var url = window.location.href;
			var urlInfos = url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/);
			
			if (urlInfos[4] == 1 && j == 1) // Si c'est le tout premier post du topic
			{
				// On récupère le lien de suppression
				var supLien = divMessages[i].getElementsByTagName('a')[0].href;
				divMessages[i].innerHTML = divMessages[i].innerHTML.replace(/<li class="pseudo">\n/, '<li class="pseudo">\n<input type="checkbox" id="msg_' + j + '" disabled="disabled" value="" />\n');
				j++;
			}
			else
			{
				// On récupère le lien de suppression
				var supLien = divMessages[i].getElementsByTagName('a')[0].href;
				divMessages[i].innerHTML = divMessages[i].innerHTML.replace(/<li class="pseudo">\n/, '<li class="pseudo">\n<input type="checkbox" id="msg_' + j + '" value="' + supLien + '" />\n');
				j++;
			}
		}
	}
}

function init() // Repérer si on est sur la liste des sujets ou dans un topic et appeler la fonction appropriée
{
	var urlInfos = window.location.href.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/);
	
	if (urlInfos[1] == 0) // Si on est sur la liste des sujets
	{
		var lineTopicTd = document.getElementById('liste_topics').getElementsByTagName('tr'); // On vérifie si il y a la ligne de modération
		if (lineTopicTd[0].getElementsByTagName('th')[1].className == 'col_moder')
		{	
			sup_page_topics(urlInfos[7]);
		}
	}
	else
	{
		var lineMsgs = document.getElementsByTagName('td');

		if (lineMsgs[10].getElementsByTagName('a')[1].className == 'bloquer')
		{
			sup_page_messages();
		}
		else if (lineMsgs[10].getElementsByTagName('a')[0].className == 'debloquer')
		{
			sup_page_messages();
		}
	}
}

init();