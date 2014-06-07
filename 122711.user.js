// ==UserScript==
// @name           ohouicensuresmoi
// @namespace      sarkofreewall
// @author         Censuré 
// @version        1.0
// @description    Reposte les messages censurés sur le mur de Nicolas Sarkozy toutes les minutes. Vous pouvez changer, ajouter ou supprimer des messages en éditant ce script.
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// ==/UserScript==

var messages = {
		texte1: 'http://www.ladepeche.fr/article/2011/11/08/1210846-g20-la-nuit-a-37-000-de-sarkozy.html',
		texte2: 'Présentes toi donc aux présidentielles plutôt que de continuer à payer ta campagne avec les impôts des francais !',
		texte3: 'Oh oui censures moi !'
    };
	
var anticensure = function(){
	//if(document.getElementById('profile_minifeed').firstChild.innerHTML.indexOf('Oh oui ! Censures moi !')==-1){
	var dernierePublication = document.getElementsByName('post_form_id')[2].parentNode.innerHTML;
	for (message in messages)
	{
		if(dernierePublication.indexOf(messages[message])==-1){
			document.getElementsByTagName('textarea')[0].focus();
			document.getElementsByName('add_comment_text')[0].value=messages[message];
			document.getElementsByName('comment')[0].click();
		}
	}
}

if (window.location.href!="http://www.facebook.com/nicolassarkozy")
	return false;

try{
	document.getElementsByName('view_all[1]')[0].click();
	setTimeout(anticensure,4000);
}catch(e){
	document.getElementsByName('like')[0].nextSibling.nextSibling.childNodes[0].click();
	anticensure();
}

setTimeout("window.location.reload()",60000);