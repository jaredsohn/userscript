// ==UserScript==
// @name           E-UniverS Quote Messages
// @description    Repondre aux messages avec historique
// @include        *beta*e-univers.org*messages*
// @include        *beta*e-univers.org*ecriremessages*
// ==/UserScript==



// Si vous posseder UniFox passer a true, si vous ne le posseder pas passer a false
// Si vous posseder UniFox mais que le script ne marche quand meme pas, passer a false
var unifox = false;




var action = uf_getGET('action', document.location.href); // Recupere l'action de la page

if(action == 'messages') // Dans le cas ou on est sur la page des messages
{
	MESSAGES_modifier_lien_ajouter_historique(document);
}
else if(action == 'ecriremessages') // Dans le cas ou on veut ecrire un message
{
	MESSAGES_ajouter_historique_dans_message(document);
}


function MESSAGES_modifier_lien_ajouter_historique(document) // Permet d'ajouter l'historique a l'URL des messages de joueurs, ou d'alliance
{
	var objetLien = ufEval("id('divpage')/form["+(unifox ? '3' : '2')+"]/table/tbody/tr/td[2]/a", document); // Recupere tous les messages qui ont un URL dedans (Messages de joueurs, ou d'alliance)

	for(var i=0; i < objetLien.snapshotLength; i++) // Passe la boucle pour tous les messages trouvé
	{
		var lien = objetLien.snapshotItem(i); // Recupere les infos sur la balise de l'URL
		
		var lienHref = lien.href; // Recupere l'URL
		
		var msg = lien.parentNode.parentNode.nextSibling.getElementsByTagName('th')[0].innerHTML; // Recupere le message sur le tr suivant (parentNode permet de remonter les elements au dessus, jusqu'a etre dans le tr, et nextSibling permet de changer de tr

		// Remplace les ( et les ) par un "truc encoder" car sinon elle plante le script PHP du jeu
		msg =  msg.replace(/\(/g, '%sdzbkf'); 
		msg =  msg.replace(/\)/g, '%sdzbkg'); 
		msg = msg.replace(/=/g, '%fraufhzreu'); // On remplace les = aussi
		msg = msg.replace(/&/g, '%tzrezrrer'); // On remplace aussi les & car sinon il termine le $_GET['historique']
		msg = msg.replace(/#/g, '%fefefeqfqd');
		
		lienHref += '&historique='+encodeURI(msg); // On encore le message pour qu'il puisse etre envoyé par URL
		
		lien.setAttribute('href', encodeURI(lienHref)); // On change le lien (En le ré-encodant encore une fois, sinon ca deconne)
	}
}

function MESSAGES_ajouter_historique_dans_message(document) // Permet d'ecrire l'historique dans le message
{
	var getHistorique = uf_getGET('historique', document.location.href); // Recupere l'historique du message
	
	if(getHistorique) // On effectue l'action que si un historique existe (Ce qui est simplement dans le cas d'une reponse a un message)
	{
		var formTextarea = document.getElementById('message'); // Recupere le textarea qui contient le message
		
		var msgQuote = decodeURI (decodeURI ( getHistorique ) ); // Decode l'URL (On effectue le decode deux fois, puisque on la encoder deux fois)

		// Remplace les ( et les ) par un "truc decoder" apres qu'elle est été transmise par un "truc encoder"
		msgQuote =  msgQuote.replace(/%sdzbkf/g, '('); 
		msgQuote =  msgQuote.replace(/%sdzbkg/g, ')'); 
		msgQuote = msgQuote.replace(/%fraufhzreu/g, '='); 
		msgQuote = msgQuote.replace(/%tzrezrrer/g, '&');
		msgQuote = msgQuote.replace(/%fefefeqfqd/g, '#');
		
		msgQuote = msgQuote.replace(/<br>/g, ''); // On remplace tous les <br> par du vide pour ne pas les afficher
		
		// On remplace chaque balise img des emoticones par les symboles des emoticones
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/mellow.gif">/g, ':mellow:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/huh.gif">/g, ' :huh:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/happy.gif">/g, '^_^');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/ohmy.gif">/g, ':o');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/wink.gif">/g, ';)');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/tongue.gif">/g, ':P');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/biggrin.gif">/g, ':D');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/laugh.gif">/g, ':lol:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/cool.gif">/g, 'B)');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/rolleyes.gif">/g, ':rolleyes:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/sleep.gif">/g, '-_-');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/smile.gif">/g, ':)');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/wub.gif">/g, ':wub:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/dry.gif">/g, '<_<');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/angry.gif">/g, ':angry:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/sad.gif">/g, ':(');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/unsure.gif">/g, ':unsure:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/wacko.gif">/g, ':wacko:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/blink.gif">/g, ':blink:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/ph34r.gif">/g, ':ph34r:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/blush.gif">/g, ':blush:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/excl.gif">/g, ':excl:');
		msgQuote = msgQuote.replace(/<img src="img\/emoticons\/mad.gif">/g, ':mad:');
		
		// On supprime les span du code
		msgQuote =  msgQuote.replace(/<span style=".+">/g, ''); 
		msgQuote =  msgQuote.replace(/<\/span>/g, ''); 

		// On ecrit le message dans le textarea
		formTextarea.innerHTML = 'Reponse \u00E0 : \n\n' + msgQuote + '\n\n======================================================\n\n';
	}
}
	
	

	
	
	
// Debut Fonction UniFox, Merci a Jormund		http://jormund.free.fr/e-univers

function ufEvalnode(path,document,node) {
	var ret = document.evaluate(path,node,null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return ret;

}
function ufEval(path,document) {
	return ufEvalnode(path,document,document);
}


function uf_getGET (name,url)
{
	if (url.indexOf("#")!=-1)//si il y a un # on le retire
	url = url.substring(0,url.indexOf("#"));

	url = "&"+url.substring(url.indexOf("?")+1, url.length)+"&";

	var retour="";
	name = "&"+ name + "=";
	//alert(url+"\n"+name);
	if (url.indexOf(name)!=-1)
	{
		url = url.substring(url.indexOf(name)+name.length,url.length);//on prend ce qui est après le = recherché
		retour = url.substring(0,url.indexOf("&"));//et on s'arrete à la variable suivante
	}
	return retour;
}

// Fin Fonction UniFox, Merci a Jormund		http://jormund.free.fr/e-univers



