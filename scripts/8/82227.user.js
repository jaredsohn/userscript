// ==UserScript==
// @name          Skyrock Enhancer
// @namespace     http://boverie.eu/skyblog/greasemonkey/
// @description   Rajoute quelques fonctions utiles sur Skyrock (aperçu live des articles, smileys cachés, planification des articles, blog collaboratifs, blocage des publicités, menu d'administration avancé, raccourcis claviers, graphiques de statistiques exportables,...)
// @version       2.0.1
// @include       http://*.skyrock.com/*
// @include       http://skyrock.com/*
// ==/UserScript==

// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// Modifications globales


// Suppression des publicités
log('Préférences pub : '+GM_getValue('blockpub'));
if(GM_getValue('blockpub', true) == true)
{
var pubs = ["promos_skyrock", "promos_ads","oasx10_flash_file","pub_up","promos_ads_left","FinContentTop1","cybercop","FinContentRight21","pub300_home","FinContentRight31","pub180","pub_x11"];
pubs.forEach(function(p){
	if ((pub = document.getElementById(p)))
	{
		pub.parentNode.removeChild(pub);
	}
});

var classpubs = ["pub180"];
classpubs.forEach(function(cp)
{
	if((class = document.getElementsByClassName(cp)[0]))
	class.innerHTML = '';
});

}
// Où sommes nous ?
if(unsafeWindow.pub_sky_page)
{
	if(unsafeWindow.pub_sky_page == "blog/admin")
	{
	inadmin = true;
	log('Vous êtes dans l\'interface d\'administration');
	}
	else
	inadmin = false;
}
else
inadmin = false;

if(unsafeWindow.user_pseudo && unsafeWindow.blog_pseudo)
{
	if(unsafeWindow.user_pseudo == unsafeWindow.blog_pseudo)
	{
	athome = true;
	log('Vous êtes sur votre blog');
	}
	else
	athome = false;
}
else
athome = false;

if(unsafeWindow.pub_sky_page)
{
	if(unsafeWindow.pub_sky_page == "blog/consultation")
	{
	onablog = true;
	log('Vous êtes sur un blog');
	}
	else
	onablog = false;
}
else
onablog = false;

if(unsafeWindow.pub_sky_page)
{
	if(unsafeWindow.pub_sky_page == "home")
	{
	skyrockhome = true;
	log('Vous êtes sur la home');
	}
	else
	skyrockhome = false;
}
else
skyrockhome = false;


if(unsafeWindow.blog_is_music)
{
	if(unsafeWindow.blog_is_music == 1)
	{
	blogmusic = true;
	log('Vous êtes sur un blog music');
	}
	else
	blogmusic = false;
}
else
blogmusic = false;


// document.location sans compter paramètres
var url = ''+document.location+'';
var reg=new RegExp("[\?]+", "g");
var adresse=url.split(reg);

// Fin où sommes-nous

// Menu admin amélioré et ajout d'un lien vers les stats
if(unsafeWindow.user_pseudo && adresse[0] != 'http://www.skyrock.com/blog/add_comment.php') // Si on est connecté
{
	var menu, menua, alerts,newMenu;
	if((menua = document.getElementById('header_right')))
	{
		var messagerie = menua.getElementsByTagName('span')[2];
		alerts = getElementsByAttribute(messagerie,'strong','class','unread');
		if(alerts != '')
		messagerie.innerHTML = '<a href="http://www.skyrock.com/m/messages/">Messagerie</a><a href="http://www.skyrock.com/m/messages/messages_index.php?unread=1"><strong style="text-decoration:blink;color:red !important;">'+alerts[0].innerHTML+'</strong></a>';
		
		var amis = menua.getElementsByTagName('span')[3];
		alerts = getElementsByAttribute(amis,'strong','class','unread');
		if(alerts != '')
		amis.innerHTML = '<a href="http://www.skyrock.com/m/friends/">Amis</a><a href="http://www.skyrock.com/m/friends/invit_receive.php"><strong style="text-decoration:blink;color:red !important;">'+alerts[0].innerHTML+'</strong></a>';
		
		var coms = menua.getElementsByTagName('span')[4];
		alerts = getElementsByAttribute(coms,'strong','class','unread');
		if(alerts != '')
		coms.innerHTML = '<a href="http://www.skyrock.com/m/blog/">Gérer mon blog</a><a href="http://www.skyrock.com/m/blog/unread_comments.php"><strong style="text-decoration:blink;color:red !important;">'+alerts[0].innerHTML+'</strong></a>';
		
		var profil = menua.getElementsByTagName('span')[5];
		alerts = getElementsByAttribute(profil,'strong','class','unread');
		if(alerts != '')
		profil.innerHTML = '<a href="http://www.skyrock.com/m/profile/profil.php">Gérer mon profil</a><a href="http://www.skyrock.com/m/profile/commentaires.php"><strong style="text-decoration:blink;color:red !important;">'+alerts[0].innerHTML+'</strong></a>';
		
 		if (!skyrockhome && (menu = menua.getElementsByTagName('span')[5]))
		{
			newMenu = document.createElement('span');
			newMenu.innerHTML = '<a href="http://boverie.eu/skyblog/">Outils Anothertime</a> ';
			menu.parentNode.insertBefore(newMenu, menu);
		}
	}
}

// Fin menu admin amélioré

// Pagination javascript sur les blogs
log('Préférences raccourcis claviers : '+GM_getValue('keyboardshortcuts'));
if(GM_getValue('keyboardshortcuts', true) == true)
{
	if(unsafeWindow.blog_nb_page && unsafeWindow.blog_cur_page && onablog == true)
	{
		var cur = unsafeWindow.blog_cur_page;
		var tot = unsafeWindow.blog_nb_page;
		log('Page : '+cur+'/'+tot);
		var tailleTableau = unsafeWindow.articles_ids.length;
	
		if(tailleTableau <= 10)
		{
			if(cur == 1)
			{
			shortcut("j",function() {
			location.href = '/2.html';
			});
			}
			else if (cur == tot)
			{
			shortcut("k",function() {
			var prec = cur - 1;
			location.href = '/'+prec+'.html';
			});
			}
			else
			{
			shortcut("k",function() {
			var prec = cur - 1;
			location.href = '/'+prec+'.html';
			});
			shortcut("j",function() {
			var suiv = cur + 1;
			location.href = '/'+suiv+'.html';
			});
			}
		}
	}
}
// Fin pagination javascript blog


//  Accès rapide à la modification des articles et à la modération des commentaires de son blog (fastedit)
log('Préférences fastedit : '+GM_getValue('fastedit'));
if(GM_getValue('fastedit', true) == true)
{
	if(athome == true && onablog == true)
	{
		if(unsafeWindow.blog_cur_page)
		{
			if(unsafeWindow.blog_cur_page >= 50000)
			{
				var tableau = new Array();
				tableau.push(unsafeWindow.blog_cur_page);
				var hx = 1;
			}
			else if(unsafeWindow.articles_ids)
			{
				var tableau = unsafeWindow.articles_ids;
				var hx = 2;
			}
			else
			var tableau = new Array();
						
			tableau.forEach(function(el)
			{
				navbar = '', newElement = '';
				navbar = document.getElementById('a-'+el).getElementsByTagName('h'+hx)[0];
				newElement = document.createElement('p');
				newElement.innerHTML = '<a href="http://www.skyrock.com/m/blog/article_edit.php?id='+el+'"><img src="http://static.v41.skyrock.com/img/icons/adm-edit.png" alt="Modifier" title="Cliquer ici pour modifier cet article" /></a> <a href="http://www.skyrock.com/m/blog/comments.php?id_article='+el+'"><img src="http://static.v41.skyrock.com/img/icons/commentaires.png" alt="Modérer" title="Cliquer ici pour modérer les commentaires" /></a>';
				navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
			});
		}
	}
}

//Spécifique page nouvel article ou modification

if((document.location == 'http://www.skyrock.com/m/blog/article_new.php' || adresse[0] == 'http://www.skyrock.com/m/blog/article_edit.php') && inadmin == true)
{
	log('Préférences livepreview : '+GM_getValue('livepreview'));
	if(GM_getValue('livepreview', true) == true)
	{
		var f_text, apercu;
		f_text = document.getElementsByTagName('fieldset')[1];
		if (f_text)
		{
			apercu = document.createElement('fieldset');
			f_text.parentNode.insertBefore(apercu, f_text.nextSibling);
			apercu.innerHTML = '<p style="width:630px;" id="apercu"></p>';
		}
		function update()
		{
			document.getElementById('apercu').innerHTML = convert(document.getElementById('f_text').value);
		}
		var timer = setInterval(update,500);
	}
	
	
	// Ajouter smilies cachés
	log('Préférences smileys cachés : '+GM_getValue('smilies'));
	if(GM_getValue('smilies', true) == true)
	{
		
		if(document.location == 'http://www.skyrock.com/m/blog/article_new.php')
		var n = 1;
		else
		var n = 2;
		
		document.getElementsByClassName('content')[n].innerHTML = '';
		var smiley_default = '<p><img onclick="javascript:TAinsert(\':)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/smile.png" alt=":)"><img onclick="javascript:TAinsert(\';)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/wink.png" alt=";)"><img onclick="javascript:TAinsert(\':(\', \'\');" src="http://static.v41.skyrock.com/img/smileys/sad.png" alt=":("><img onclick="javascript:TAinsert(\':o\', \'\');" src="http://static.v41.skyrock.com/img/smileys/oops.png" alt=":o"><img onclick="javascript:TAinsert(\':$\', \'\');" src="http://static.v41.skyrock.com/img/smileys/blush.png" alt=":$"><img onclick="javascript:TAinsert(\'8-p\', \'\');" src="http://static.v41.skyrock.com/img/smileys/suntongue.png" alt="8-p"><img onclick="javascript:TAinsert(\'8-)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/nerd.png" alt="8)"><img onclick="javascript:TAinsert(\':D\', \'\');" src="http://static.v41.skyrock.com/img/smileys/bigsmile.png" alt=":D"><img onclick="javascript:TAinsert(\'^^\', \'\');" src="http://static.v41.skyrock.com/img/smileys/nice.png" alt="^^"><img onclick="javascript:TAinsert(\':|\', \'\');" src="http://static.v41.skyrock.com/img/smileys/bored.png" alt=":|"><img onclick="javascript:TAinsert(\'%-)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/crazy.png" alt="%)"><img onclick="javascript:TAinsert(\':-#\', \'\');" src="http://static.v41.skyrock.com/img/smileys/angry.png" alt=":-#"><img onclick="javascript:TAinsert(\'$)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/lovely-eyes.png" alt="$)">';
		var smiley_new = '<img onclick="javascript:TAinsert(\'(l)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/heart.png" alt="(l)"><img onclick="javascript:TAinsert(\'(u)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/heartbroken.png" alt="(u)"><img onclick="javascript:TAinsert(\'(ninja)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/ninja.png" alt="(ninja)"><img onclick="javascript:TAinsert(\'(ange)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/angel.png" alt="(ange)"><img onclick="javascript:TAinsert(\'(diable)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/evil.png" alt="(diable)"><img onclick="javascript:TAinsert(\'(h)\', \'\');" src="http://static.v41.skyrock.com/img/smileys/halloween.png" alt="(h)"></p>';
		document.getElementsByClassName('content')[n].innerHTML = smiley_default + smiley_new + '</p><div class="submit"><input type="reset" value="Fermer" id="resetLink" name="resetLink" class="close" /></div>';
	}
	
	//Raccourcis clavier pour la page ecrire/modifier un article
	if(GM_getValue('keyboardshortcuts', true) == true)
	{
		shortcut("Ctrl+B",function() {
		insert('[g]', '[/g]');
		});
		shortcut("Ctrl+I",function() {
		insert('[i]', '[/i]');
		});
		shortcut("Ctrl+U",function() {
		insert('[s]', '[/s]');
		});
		shortcut("Ctrl+S",function() {
		insert('[strike]', '[/strike]');
		});
	
		shortcut("Alt+R",function() {
		insert('[c=#ff0000]', '[/c]');
		});
		shortcut("Alt+V",function() {
		insert('[c=#44ff00]', '[/c]');
		});
		shortcut("Alt+J",function() {
		insert('[c=#ffff00]', '[/c]');
		});
		shortcut("Alt+B",function() {
		insert('[c=#0011ff]', '[/c]');
		});
	
		shortcut("Alt+F4", function() {
		return false;
		});
		shortcut("Ctrl+W", function() {
		return false;
		});
	}
}
// Fin des scripts spécifiques à la page ecrire/modifier
else
{	
	if(GM_getValue('keyboardshortcuts', true) == true)
	{
		// Raccourcis clavier sur toutes les autres pages
		shortcut("Ctrl+E",function() {
		location.href = 'http://www.skyrock.com/m/blog/article_new.php';
		});
		shortcut("Ctrl+S",function() {
		location.href = 'http://www.skyrock.com/m/blog/stats.php';
		});
		shortcut("Ctrl+M",function() {
		location.href = 'http://www.skyrock.com/m/messages/';
		});
		shortcut("Ctrl+B",function() {
		location.href = 'http://www.skyrock.com/m/blog/';
		});
		shortcut("Ctrl+P",function() {
		location.href = 'http://www.skyrock.com/m/profile/';
		});
		shortcut("Ctrl+G",function() {
		location.href = 'http://www.skyrock.com/m/groups.php';
		});
		shortcut("Ctrl+F1",function() {
		location.href = 'http://boverie.eu/skyblog/';
		});
		shortcut("F1",function() {
		location.href = 'http://boverie.eu/skyblog/greasemonkey/';
		});
		shortcut("Ctrl+F2",function() {
		location.href = 'http://anothertime.skyrock.com/';
		});
	}
}

//Ajouter une case "Accepter tout (meilleur ami) sur la page ami en attente
if(document.location == 'http://www.skyrock.com/m/friends/invit_receive.php')
{

	var check_accept_all, newElement;
	check_accept_all = document.getElementById('check_accept_all');
	if (check_accept_all)
	{
	    newElement = document.createElement('span');
		newElement.innerHTML = '<input id="check_accept_all_best" onclick="select_all(this, \'accept-best\')" class="checkbox" type="checkbox"><label for="check_accept_all_best">Tout accepter (meilleur ami)</label>';
		check_accept_all.parentNode.insertBefore(newElement, check_accept_all);
	}
}

// Spécifiques page commentaires non lus et derniers commentaires
if(document.location == 'http://www.skyrock.com/m/blog/last_comments.php' || document.location == 'http://www.skyrock.com/m/blog/unread_comments.php'  || document.location == 'http://www.skyrock.com/m/blog/last_comments.php#' || document.location == 'http://www.skyrock.com/m/blog/unread_comments.php#')
{
	
if(document.getElementById('comment_list'))
{
	/*
	var commentaires = document.getElementById('comment_list').getElementsByTagName('li');
	for(var coms = 0; coms in commentaires; coms++)
	{
		// Ne pas valider les commentaires maintenant
		emplacement = commentaires[coms].getElementsByTagName('p')[0];
		emplacement.innerHTML = '<a href="#" onclick="javascript:document.getElementById(\'comment_list\').getElementsByTagName(\'li\')['+coms+'].innerHTML=\'&lt;a href=&quot;&quot;&gt;Recharger la page&lt;/a&gt;\';">Ne pas valider maintenant</a>'+emplacement.innerHTML;
	}
	*/
	
	var commentaires = document.getElementById('column_left').getElementsByTagName('li');
	for(var coms = 0; coms in commentaires; coms++)
	{
		//Répondre sur son blog
		emplacement2 = commentaires[coms].getElementsByTagName('p')[3];
		connectedComment = getElementsByAttribute(emplacement2,'a','class','submit blacklist');
		for(var i =0; i in connectedComment; i++)
		{
		pseudo = commentaires[coms].getElementsByTagName('p')[0].getElementsByTagName('a')[0].innerHTML;	
		log(pseudo);
			var blocklink, newElement;
			blocklink = connectedComment[i];
			if (blocklink)
			{
				newElement = document.createElement('span');
				newElement.innerHTML = ' <a class="submit change" href="http://boverieeu.appspot.com/comonlastarticle?blog='+pseudo+'" onclick="window.open(this.href); return false;">Répondre sur son blog</a> ';
				blocklink.parentNode.insertBefore(newElement, blocklink.nextSibling);
			}
		}
	}
}

}

//Liste d'amis complète
if(document.location == 'http://www.skyrock.com/m/friends/' || adresse[0] == 'http://www.skyrock.com/m/friends/' || document.location == 'http://www.skyrock.com/m/friends/best_friends.php' || adresse[0] == 'http://www.skyrock.com/m/friends/best_friends.php')
{
// Commenter les amis
var liste = document.getElementById('friends_list');

if(liste == null)
var liste = document.getElementById('bestfriends_list');


var friends = getElementsByAttribute(liste,'li','class','friend');
for(var friend = 0; friend in friends; friend++)
{
	var pseudo = friends[friend].getElementsByTagName('a')[1].innerHTML;
	
/*
friends[friend].getElementsByTagName('ul')[0].innerHTML = friends[friend].getElementsByTagName('ul')[0].innerHTML + '<li><a href="http://www.boverie.eu/skyblog/aleatoire/comonlastarticle.php?blog='+pseudo+'"onclick="window.open(this.href); return false;"><img src="http://static.v41.skyrock.com/img/icons/comment-add.png" /> Commenter</a></li>';
 */	

getElementsByAttribute(friends[friend],'p','class','actions')[0].innerHTML = getElementsByAttribute(friends[friend],'p','class','actions')[0].innerHTML + '<a class="submit change" href="http://www.boverie.eu/skyblog/aleatoire/comonlastarticle.php?blog='+pseudo+'"onclick="window.open(this.href); return false;">Commenter</a>';
log(pseudo);

}

}


if(document.location == 'http://www.skyrock.com/m/account/api.php?ecrire')
{
var api = document.getElementById('column_left').getElementsByTagName('input')[1].value;
var pseudo = unsafeWindow.user_pseudo;
log(pseudo +' : '+api);
window.location.replace('http://boverie.eu/skyblog/ecrire/integration.php?blog='+pseudo+'&api='+api);
}
if(document.location == 'http://www.skyrock.com/m/account/api.php?gestion')
{
var api = document.getElementById('column_left').getElementsByTagName('input')[1].value;
var pseudo = unsafeWindow.user_pseudo;
log(pseudo +' : '+api);
window.location.replace('http://boverie.eu/skyblog/gestion/integration.php?blog='+pseudo+'&api='+api);
}

if(inadmin)
{
var create = document.getElementById('mainmenu').getElementsByTagName('li')[0];
if (create) {
    newitemmenu = document.createElement('li');
	newitemmenu.innerHTML = '<a href="http://www.skyrock.com/m/account/api.php?ecrire">Planifier</a>';
    create.parentNode.insertBefore(newitemmenu, create.nextSibling);
}
var create2 = document.getElementById('mainmenu').getElementsByTagName('li')[5];
if (create2) {
    newitemmenu = document.createElement('li');
	newitemmenu.innerHTML = '<a href="http://www.skyrock.com/m/account/api.php?gestion">Gestion</a>';
    create2.parentNode.insertBefore(newitemmenu, create2.nextSibling);
}
}

/* if(inadmin && athome)
{
var alerting = document.getElementById('alerting').getElementsByTagName('script')[0];
spoiler = document.createElement('span');
spoiler.innerHTML = '<a href="http://www.skyrock.com/m/blog/photoblog.php">Photo Blog</a> : Publie plusieurs photos d\'un coup !';
alerting.parentNode.insertBefore(spoiler, alerting.nextSibling);
} */

// Correction blog music
if(blogmusic)
{
	menuadmin = document.getElementById('mainmenu');
	mp3 = getElementsByAttribute(menuadmin,'a','href','/m/blog/music/');
	mp3 = mp3[0];
	mp3.innerHTML = '<img alt="" src="http://static.v41.skyrock.com/img/m/blog/icon-mp3.png"/> MP3';
}

// Graphiques de statistiques
if(document.location == 'http://www.skyrock.com/m/blog/stats.php')
{
	
var simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function simpleEncode(valueArray,maxValue) {

var chartData = ['s:'];
  for (var i = 0; i < valueArray.length; i++) {
    var currentValue = valueArray[i];
    if (!isNaN(currentValue) && currentValue >= 0) {
    chartData.push(simpleEncoding.charAt(Math.round((simpleEncoding.length-1) * currentValue / maxValue)));
    }
      else {
      chartData.push('_');
      }
  }
return chartData.join('');
}

String.prototype.replaceAll=function(s1, s2) {return this.split(s1).join(s2)}

/* Mois */

statsmois = document.getElementsByTagName('table')[0];

items = getElementsByAttribute(statsmois,'td','class','nb');
maxvalue = getElementsByAttribute(statsmois,'td','class','nb stat_highest')[0].innerHTML;
maxvalue = maxvalue.replace(" ","");
mivalue = Math.round(maxvalue/2);

log('Mois maximal : '+maxvalue+'. Milieu mois : '+mivalue)

itemsname = statsmois.getElementsByTagName('th');

// Tableau avec le nombre des visites
var valeurs = new Array();
for(var i = 0; i in items; i++)
{
	val = items[i].innerHTML.replace(" ","");
	valeurs.push(val);
	//alert(itemsname[i].innerHTML+' : '+items[i].innerHTML);
}
valeurs.reverse();
log('Visites par mois : '+valeurs);

valeursmois = simpleEncode(valeurs,maxvalue);

// Tableau avec les noms des mois
var mois = new Array();
for(var i = 0; i in itemsname; i++)
{
	mois.push(itemsname[i].innerHTML);
	//alert(itemsname[i].innerHTML+' : '+items[i].innerHTML);
}
mois.reverse();

log('Liste des mois : '+mois);

// Mois dans l'ordre au bon format
var nbmois = mois.length;
nbmois--;
var listemois = '';

milieu = Math.round(nbmois/2);

listemois += mois[0] + '|';
listemois += mois[milieu] + '|';
listemois += mois[nbmois];

var listemoiscomplete = '';
for(var i = 0; i in mois; i++)
{
	if(i != mois.length)
	listemoiscomplete += mois[i]+'|';
	else
	listemoiscomplete += mois[i];
}
	
listemois=listemois.replaceAll("é","e");
listemois=listemois.replaceAll("û","u");

listemoiscomplete=listemoiscomplete.replaceAll("é","e");
listemoiscomplete=listemoiscomplete.replaceAll("û","u");

if (statsmois)
{
    graph = document.createElement('p');
	graphmoisurl = 'http://chart.apis.google.com/chart?chf=bg,s,65432100&chco=0262DD&cht=lc&chs=600x300&chd='+valeursmois+'&chl='+listemois+'&chxt=y&chxl=0:|0|'+mivalue+'|'+maxvalue+'&chtt=Statistiques mensuelles de '+unsafeWindow.user_pseudo;
	graphmoisurlcamembert = 'http://chart.apis.google.com/chart?chf=bg,s,65432100&chco=0262DD&cht=p&chs=600x300&chd='+valeursmois+'&chl='+listemoiscomplete+'&chxt=y&chxl=0:|0|'+maxvalue+'&chtt=Statistiques mensuelles de '+unsafeWindow.user_pseudo;
	graph.innerHTML = '<a onclick="javascript:window.open(this.href);return false;" href="'+graphmoisurl+'">Lien vers un graphique exportable</a> (<a onclick="javascript:window.open(this.href);return false;" href="'+graphmoisurlcamembert+'">aussi en version camembert</a>)<br /><img src="'+graphmoisurl+'" />';
    statsmois.parentNode.insertBefore(graph, statsmois.nextSibling);
}


/* jours */
statsjours = document.getElementsByTagName('table')[1];

items = statsjours.getElementsByTagName('td');
maxvalue = getElementsByAttribute(statsjours,'tr','class','stat_highest')[0].getElementsByTagName('td')[0].innerHTML;
maxvalue = maxvalue.replace(" ","");
mivalue = Math.round(maxvalue/2);

log('Jour maximal : '+maxvalue+'. Milieu jour : '+mivalue)

itemsname = statsjours.getElementsByTagName('th');

// Tableau avec le nombre des visites
var valeurs = new Array();
for(var i = 0; i in items; i++)
{
	val = items[i].innerHTML.replace(" ","");
	valeurs.push(val);
	//alert(itemsname[i].innerHTML+' : '+items[i].innerHTML);
}
valeurs.reverse();

log('Visites par jour : '+valeurs);

valeursjours = simpleEncode(valeurs,maxvalue);

// Tableau avec les noms des jours
var jours = new Array();
for(var i = 0; i in itemsname; i++)
{
	jours.push(itemsname[i].innerHTML);
	//alert(itemsname[i].innerHTML+' : '+items[i].innerHTML);
}
jours.reverse();

log('Liste des jours : '+jours);

// jours dans l'ordre au bon format
var nbjours = jours.length;
nbjours--;
var listejours = '';
milieu = Math.round(nbjours/2);

listejours += jours[0] + '|';
listejours += jours[milieu] + '|';
listejours += jours[nbjours];

var listejourscomplete = '';
for(var i = 0; i in jours; i++)
{
	if(i != jours.length)
	listejourscomplete += jours[i]+'|';
	else
	listejourscomplete += jours[i];
}

listejours=listejours.replaceAll("é","e");
listejours=listejours.replaceAll("û","u");

listejourscomplete=listejourscomplete.replaceAll("é","e");
listejourscomplete=listejourscomplete.replaceAll("û","u");

//alert(listejours);

if (statsjours)
{
    graph = document.createElement('p');
	graphjoursurl = 'http://chart.apis.google.com/chart?chf=bg,s,65432100&chco=0262DD&cht=lc&chs=600x300&chd='+valeursjours+'&chl='+listejours+'&chxt=y&chxl=0:|0|'+mivalue+'|'+maxvalue+'&chtt=Statistiques des 15 derniers jours de '+unsafeWindow.user_pseudo;
	graphjoursurlcamembert = 'http://chart.apis.google.com/chart?chf=bg,s,65432100&chco=0262DD&cht=p&chs=600x300&chd='+valeursjours+'&chl='+listejourscomplete+'&chxt=y&chxl=0:|0|'+maxvalue+'&chtt=Statistiques des 15 derniers jours de '+unsafeWindow.user_pseudo;	
	graph.innerHTML = '<a onclick="javascript:window.open(this.href);return false;" href="'+graphjoursurl+'">Lien vers un graphique exportable</a> (<a onclick="javascript:window.open(this.href);return false;" href="'+graphjoursurlcamembert+'">aussi en version camembert</a>)<br /><img src="'+graphjoursurl+'" />';
    statsjours.parentNode.insertBefore(graph, statsjours.nextSibling);
}

}


// Création menu
function blockpubs()
{
	if(confirm('Voulez vous vraiment bloquer les publicités ?\nOK pour activer et Annuler pour désactivers'))
	{
		setValue('blockpub', true); 
		alert('Vous bloquez les publicités !'); /* on affiche une alerte */
	}
	else
	{
		setValue('blockpub', false); 
		alert('Vous affichez les publicités !');/* sinon on en affiche une autre */
	}
}

function changelivepreview()
{
	if(confirm('Voulez vous vraiment activer la fonction live preview ?\nOK pour activer et Annuler pour désactiver'))
	{
		setValue('livepreview', true); 
		alert('Vous avez activé live preview !'); /* on affiche une alerte */
	}
	else
	{
		setValue('livepreview', false); 
		alert('Vous avez désactivé live preview !');/* sinon on en affiche une autre */
	}
}

function changesmilies()
{
	if(confirm('Voulez vous vraiment afficher les smilies cachés ?\nOK pour activer et Annuler pour désactiver'))
	{
		setValue('smilies', true); 
		alert('Vous affichez les smilies cachés !');
	}
	else
	{
		setValue('smilies', false); 
		alert('Vous n\'affichez pas les smilies cachés !');
	}
}

function changefastedit()
{
	if(confirm('Voulez vous vraiment activer le raccourcis d\'édition ?\nOK pour activer et Annuler pour désactiver')) 
	{
		setValue('fastedit', true); 
		alert('Vous affichez un lien dans vos articles vers sa page d\'édition !');
	}
	else
	{
		setValue('fastedit', false); 
		alert('Vous n\'affichez pas un lien dans vos articles vers sa page d\'édition !');
	}
}

function changeshortcuts()
{
	if(confirm('Voulez vous vraiment activer les raccourcis claviers ?\nOK pour activer et Annuler pour désactiver'))
	{
		setValue('keyboardshortcuts', true); 
		alert('Vous activez les raccourcis claviers !');
	}
	else
	{
		setValue('keyboardshortcuts', false); 
		alert('Vous désactivez les raccourcis claviers !');
	}
}

function changetextarea()
{
	if(confirm('Voulez vous vraiment activer sauvegarde des textarea ?\nOK pour activer et Annuler pour désactiver'))
	{
		setValue('savetextarea', true); 
		alert('Vous activez la sauvegarde des textarea !'); /* on affiche une alerte */
	}
	else
	{
		setValue('savetextarea', false); 
		alert('Vous désactivez la sauvegarde des textarea !');/* sinon on en affiche une autre */
	}
}

function changedebug()
{
	if(confirm('Voulez vous vraiment activer le mode debug (normallement, il est réservé à l\'auteur) ?\nOK pour activer et Annuler pour désactiver'))
	{
		setValue('debug', true); 
		alert('Vous activez le mode debug !');
	}
	else
	{
		setValue('debug', false); 
		alert('Vous désactivez le mode debug !');
	}
}

function deletetempprefs()
{
	if(confirm('Voulez vous vraiment supprimer les sauvegardes temporaires des champs de texte ?\nCliquer sur OK pour supprimer'))
	{
		di=0;
		GM_listValues().forEach(function(element) {
		if(element.substring(0,4) == 'http')
		{
			GM_deleteValue(element);
			di++;
		}
		});
		alert(di+' préférences effacées');
	}
	else
	{
		alert('Aucune action effectuée');
	}
}

GM_registerMenuCommand('Bloquer les pubs', blockpubs);
GM_registerMenuCommand('Activer/désactiver live preview', changelivepreview);
GM_registerMenuCommand('Activer/désactiver les smilies cachés', changesmilies);
GM_registerMenuCommand('Activer/désactiver le raccourcis d\'édition', changefastedit);
GM_registerMenuCommand('Activer/désactiver les raccourcis claviers', changeshortcuts);
GM_registerMenuCommand('Activer/désactiver la sauvegarde des champs de texte', changetextarea);
GM_registerMenuCommand('Effacer les sauvegardes temporaires', deletetempprefs);
GM_registerMenuCommand('Activer/désactiver le mode debug', changedebug);

// Fin du menu

// Ajout d'autres userscripts

/* General textarea Backup
(c) Dan Brook
This userscript is free software. It may be used, redistributed and/or modified under the same terms as Perl.
http://userscripts.org/users/24020
*/
log('Préférences savetextarea : '+GM_getValue('savetextarea'));
if(GM_getValue('savetextarea', true) == true)
{
function GM_getValueUTF8(key) {
  var value = GM_getValue(key);
  return (value && value.length) ? decodeURI(value) : '';
}

function setValueUTF8(key, value) {
  setValue(key, encodeURI(value));
}

function SaveTextArea(txta) {
  this.ta = typeof txta == 'string'
          ? document.getElementById(txta)
          : txta;

  this.initial_txt = this.ta.textContent;
  this.committed   = '';

  this.listen();
  this.restore();
}

SaveTextArea.prototype = {
  listen: function() {
    var self = this;
    // Save buffer every keystrokes.
    this.ta.addEventListener('keypress', function(e) {
      self.commit(self.ta.value);
    }, true);

    // Save buffer when the textarea loses focus.
    this.ta.addEventListener('blur', function(e) {
      self.commit();
    }, true);

    // Save buffer every second.
    this._stay_tuned();

    // Should be a method really but there'd be more code to get it to work as
    // expected with event handlers so I won't bother.
    var onsubmit = function(e) {
      self.committed = ''; 
      // Don't call commit() as that checks for an empty string.
      setValueUTF8( self.key(), self.committed )
    };  

    var theform = this.ta.form;
    // Delete buffer when the form has been submitted.
    theform.addEventListener('submit', onsubmit, true);

    // Keep a copy of the submit method.
    theform.the_actual_submit_method = theform.submit;
    // Catch direct calls to submit() which doesn't trigger the submit event.
    theform.submit = function() {
      onsubmit();
      self.ta.form.the_actual_submit_method();
    };  
  },

  _stay_tuned: function() {
    var self = this;
    setTimeout(function() {
      self.commit();
      self._stay_tuned();
    }, 1000);
  },

  restore: function() {
    // Stop here if there's nothing to restore.
    if(!this.is_significant( GM_getValueUTF8(this.key()) ))
      return;

    var buff = GM_getValueUTF8(this.key(), this.ta.textContent);
    // Only restore buffer if previously saved (i.e form not submitted).
    if(!this.is_significant(buff))
      return;

    // Check with user before overwriting existing content with backup.
    if(buff != this.ta.textContent && this.is_significant(this.ta.textContent))
	{
      this._confirm_restore(buff);
	 } 
    else
        this.ta.value = buff;

    this.previous_backup = this.ta.value;
    var self = this;
    GM_registerMenuCommand(
      'Restaurer backup précédent pour '+this.ref(),
      function() { self.ta.value = self.previous_backup }
    );
  },

  _confirm_restore: function(buff) {
    var to_restore = GM_getValueUTF8(this.key());
    // Keep existing border so it's not lost when highlighting.
    this.old_border = this.ta.style.border;

    var msg = "Le texte suivant a été sauvegardé précédemment, voulez-vous le restaurer ?\n\n";
    msg += to_restore.length > 750
         ? to_restore.substring(0, 500) + "\n..."
         : to_restore;

    this.confirming = true;
    this.ta.scrollIntoView();
    // Highlight the textarea that the confirm message refers to.
    this._highlight_textarea(this.old_border);

    // Let the user see the existing content as Firefox will sometimes
    // maintain the old value.
    this.ta.value = this.ta.textContent;
    if(window.confirm(msg))
	  {
	  unsafeWindow.TA_can_be_cleared = false;
      this.ta.value = buff;
	  }
    this.confirming = false;
    this.ta.style.border = this.old_border;
  },

  _highlight_textarea: function(border, toggle) {
    var self = this;
    
    setTimeout(function(ta_border, toggle) {
      if(self.confirming) {
        self.ta.style.border = ( toggle ? '3px red solid' : ta_border );
        self._highlight_textarea(ta_border, toggle);
      } else
        self.ta.style.border = this.old_border;
    }, 1000, border, !toggle);

    return this.ta.style.border;
  },

  commit: function() {
    this.committed = this.ta.value;
    // Only save if:
    // a) There's significant text in the <textarea>.
    // b) The text that was there when the page loaded has changed.
    if(this.is_significant(this.committed)
    && this.initial_txt != this.committed)
      setValueUTF8( this.key(), this.committed );
  },

  is_significant: function(str) {
    return typeof str == 'string'
        && str.replace(/\s+/g, '').length > 0;
  },

  // Rough'n'ready method which should be nicer.
  key: function() {
    // If there are two textareas and neither of them have a name or id
    // then they will collide, but a textarea without either would be useless.
    return this.ta.baseURI + ';' + this.ref();
  },

  // Attempt to return the most appropriate textarea reference.
  ref: function() {
    return this.ta.id || this.ta.name || '';
  }
};

var textareas = document.getElementsByTagName('textarea');
for(var i = 0; i < textareas.length; i++) {
  var ta = textareas[i];
  // Occasionally a textarea might not have a form, weird.
  if(ta['form'])
    new SaveTextArea(ta);
}
}
// Fin de General textarea Backup

// Debut autoupdate
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 name: 'Skyrock Enhancer', // Script Name
 version: '2.0.1', // Version
 id: '39106', // Script id on Userscripts.org
 quartdays: 1, // Days to wait between update checks

 // Don't edit after this line unless, you know what you're doing :-)
 time: new Date().getTime().toString(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('Une nouvelle version de '+this.xname+' est disponible. Voulez-vous mettre à jour ?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Voulez vous stoppez les mises à jour automatique ?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
	alert('Les mises à jour automatiques peuvent être réactivées à partir du menu commandes de scripts.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response == 'return') alert('Pas de mise à jour disponible');
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (parseInt(this.time) > (parseInt(GM_getValue('updated', 0)) + (1000*60*60*6*this.quartdays))) && (GM_getValue('updated', 0) != 'off') ) {
      this.call('none');
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Activer les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    } else {
      GM_registerMenuCommand("Vérifier les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    }
    }
};
if (self.location == top.location) CheckScriptForUpdate.check();

// Fin script de mise à jour

// Fin ajout autres scripts

//fonctions externes


/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
*/
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
			}
		}
	}
	return arrReturnElements;
}


/*
Parser javascript Skycode -> HTML 
Basé sur Blogwyg, (c) Elitwork
http://blogwyg.elitwork.com
*/

function doRegExp(string, regExp, pattern)
{
	while(regExp.test(string))
	string = string.replace(regExp, pattern);
	return string;
}

function convert(string)
{
	string = doRegExp(string, /\[([\/]?)g\]/g, '<$1b>');
	string = doRegExp(string, /\[([\/]?)i\]/g, '<$1i>');
	string = doRegExp(string, /\[([\/]?)s\]/g, '<$1u>');
	string = doRegExp(string, /\[a=([^\[]*)\]/mg, '<a href="$1">');
	string = string.replace('[/a]', '</a>', 'g');
	string = doRegExp(string, /\[font=([^\[]*)\]/mg, '<span style="font-family:$1;">');
	string = string.replace('[/font]', '</span>', 'g');
	string = doRegExp(string, /\[size=([^\[]*)\]/mg, '<span style="font-size:$1;">');
	string = string.replace('[/size]', '</span>', 'g');
	string = doRegExp(string, /\[c=([^\[]*)\]/mg, '<span style="color:$1;">');
	string = string.replace('[/c]', '</span>', 'g');
	string = doRegExp(string, /\[f=([^\[]*)\]/mg, '<span style="background-color:$1;">');
	string = string.replace('[/f]', '</span>', 'g');
	string = doRegExp(string, /\[x=([^\[]*)\]/g, '<span class="x" title="$1">');
	string = string.replace('[/x]', '</span>', 'g');
	string = doRegExp(string, /\[strike]/g, '<span style="text-decoration: line-through;">');
	string = string.replace('[/strike]', '</span>', 'g');
	string = doRegExp(string, /\[pre]/g, '<pre>', 'g');
	string = string.replace('[/pre]', '</pre>', 'g');
	string = doRegExp(string, /\[y=([^\[]*)\]/g, '<span class="y" title="$1">');
	string = string.replace('[/y]', '</span>', 'g');
	//string = doRegExp(string, /(?:[\r\n]*)\[align=(left|center|right)\]/mg, '<br /><span style="text-align:$1;">');
	//string = string.replace('[/align]', '<br /></span>', 'g');
	string = doRegExp(string, /(?:[\r\n]*)\[align=(left|center|right)\]/mg, '</p><p style="text-align:$1;">');
	string = doRegExp(string, /\[\/align\](?:[\r\n]*)/mg, '</p><p>');
	string = '<p>' + string + '</p>';
	string = doRegExp(string, /(\r?\n)(\r?\n)/mg, '<br /><br />');
	string = doRegExp(string, /(\r?\n)/mg, '<br />');
	string = string.replace(':)', '<img src="http://static.v41.skyrock.com/img/smileys/smile.png" />', 'g');
	string = string.replace(':(', '<img src="http://static.v41.skyrock.com/img/smileys/sad.png" />', 'g');
	string = string.replace(':D', '<img src="http://static.v41.skyrock.com/img/smileys/bigsmile.png" />', 'g');
	string = string.replace(':o', '<img src="http://static.v41.skyrock.com/img/smileys/oops.png" />', 'g');
	string = string.replace(';)', '<img src="http://static.v41.skyrock.com/img/smileys/wink.png" />', 'g');
	string = string.replace(':-|', '<img src="http://static.v41.skyrock.com/img/smileys/bored.png" />', 'g');
	string = string.replace(':|', '<img src="http://static.v41.skyrock.com/img/smileys/bored.png" />', 'g');
	string = string.replace(':-$', '<img src="http://static.v41.skyrock.com/img/smileys/blush.png" />', 'g');
	string = string.replace(':$', '<img src="http://static.v41.skyrock.com/img/smileys/blush.png" />', 'g');
	string = string.replace(':-#', '<img src="http://static.v41.skyrock.com/img/smileys/angry.png" />', 'g');
	string = string.replace('8-)', '<img src="http://static.v41.skyrock.com/img/smileys/nerd.png" />', 'g');
	string = string.replace('8)', '<img src="http://static.v41.skyrock.com/img/smileys/nerd.png" />', 'g');
	string = string.replace('(l)', '<img src="http://static.v41.skyrock.com/img/smileys/heart.png" />', 'g');
	string = string.replace('(u)', '<img src="http://static.v41.skyrock.com/img/smileys/heartbroken.png" />', 'g');
	string = string.replace('(ninja)', '<img src="http://static.v41.skyrock.com/img/smileys/ninja.png" />', 'g');
	string = string.replace('(ange)', '<img src="http://static.v41.skyrock.com/img/smileys/angel.png" />', 'g');
	string = string.replace('(diable)', '<img src="http://static.v41.skyrock.com/img/smileys/evil.png" />', 'g');
	string = string.replace('8-p', '<img src="http://static.v41.skyrock.com/img/smileys/suntongue.png" />', 'g');
	string = string.replace('^^', '<img src="http://static.v41.skyrock.com/img/smileys/nice.png" />', 'g');
	string = string.replace('%-)', '<img src="http://static.v41.skyrock.com/img/smileys/crazy.png" />', 'g');
	string = string.replace('%)', '<img src="http://static.v41.skyrock.com/img/smileys/crazy.png" />', 'g');
	string = string.replace('$-)', '<img src="http://static.v41.skyrock.com/img/smileys/lovely-eyes.png" />', 'g');
	string = string.replace('$)', '<img src="http://static.v41.skyrock.com/img/smileys/lovely-eyes.png" />', 'g');
	string = string.replace('(h)', '<img src="http://static.v41.skyrock.com/img/smileys/halloween.png" />', 'g');
	return string;
}
//Fin parser javascript


/* Insertion dans le textarea
fonction utilisée sur Skyrock.com
(c) Skyrock */
function insert(text1, text2)
{
    function countInstances(ta, open, closed)
    {
        var opening = ta.value.split(open);
        var closing = ta.value.split(closed);
        return opening.length + closing.length - 2;
    }

    var ta = document.getElementById('f_text');
        
    if (document.selection)
    { // IE
        ta.focus();
        var sel = document.selection.createRange();
        var str = sel.text;
    /*    var ran = sel.duplicate();
        var hack;*/
        if (text2 != "")
        {
            if (str == "")
            {
                var instances = countInstances(ta, text1, text2);
                if (instances % 2 != 0)
                {
                    str = sel.text + text2;
                }
                else
                {
                    str = sel.text + text1;
                }
            }
            else
            {
                str = text1 + sel.text + text2;
            }
        }
        else
        {
            str = sel.text + text1;
        }
        sel.text = str;
    /*    hack = ta.value.replace(/\r/g, '');
        ran.moveStart("character", 0);
        ran.moveEnd("character",   str.length - hack.length);
        ran.select();
        ta.focus();*/
    }
    else if (ta.selectionStart | ta.selectionStart == 0)
    {
        if (ta.selectionEnd > ta.value.length) { ta.selectionEnd = ta.value.length; }

        var firstPos = ta.selectionStart;
        var secondPos = ta.selectionEnd+text1.length;

        ta.value=ta.value.slice(0,firstPos)+text1+ta.value.slice(firstPos);
        ta.value=ta.value.slice(0,secondPos)+text2+ta.value.slice(secondPos);

        ta.selectionStart = firstPos+text1.length;
        ta.selectionEnd = secondPos;
        ta.focus();
    }
    else
    { // Opera
        var sel = ta; // document.post.message;

        var instances = countInstances(ta,text1,text2);
        if (instances%2 != 0 && text2 != ""){ sel.value = sel.value + text2; }
        else{ sel.value = sel.value + text1; }
    }
    return false;
}
// Fin insertion

/* Raccourcis clavier javascript
http://www.openjs.com/scripts/events/keyboard_shortcuts/
By Binny V A
License : BSD
*/


function shortcut(shortcut,callback,opt) {
	//Provide a set of default options
	var default_options = {'type':'keydown','propagate':false,'target':document	}
	if(!opt) opt = default_options;
	else {
		for(var dfo in default_options) {
			if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
		}
	}

	var ele = opt.target
	if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
	var ths = this;

	//The function to be called at keypress
	var func = function(e) {
		e = e || window.event;

		//Find Which key is pressed
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;
		var character = String.fromCharCode(code).toLowerCase();

		var keys = shortcut.toLowerCase().split("+");
		//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
		var kp = 0;
		
		//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
		var shift_nums = {"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"}
		//Special Keys - and their codes
		var special_keys = {'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123}

		for(var i=0; k=keys[i],i<keys.length; i++) {
			//Modifiers
			if(k == 'ctrl' || k == 'control') {if(e.ctrlKey) kp++;

			} else if(k ==  'shift') {if(e.shiftKey) kp++;

			} else if(k == 'alt') {if(e.altKey) kp++;

			} else if(k.length > 1) { //If it is a special key
				if(special_keys[k] == code) kp++;

			} else { //The special keys did not match
				if(character == k) kp++;
				else {
					if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
						character = shift_nums[character]; 
						if(character == k) kp++;
					}
				}
			}
		}

		if(kp == keys.length) {
			callback(e);

			if(!opt['propagate']) { //Stop the event
				//e.cancelBubble is supported by IE - this will kill the bubbling process.
				e.cancelBubble = true;
				e.returnValue = false;

				//e.stopPropagation works only in Firefox.
				if (e.stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
				}
				return false;
			}
		}
	}

	//Attach the function with the event	
	if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
	else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
	else ele['on'+opt['type']] = func;
}
// Fin fonction raccourcis clavier

// Universalisation basique

function setValue(name,valeur)
{
if(GM_setValue)
   GM_setValue(name, valeur);
else if(PRO_setValue)
   PRO_setValue(name, valeur);
}

function log(message)
{
	if(GM_getValue('debug', false) == true)
	{
		if(unsafeWindow.console)
		   unsafeWindow.console.log(message);
		if(GM_log)
			GM_log(message);
		else if(PRO_log)
			PRO_log(message);
	}
}