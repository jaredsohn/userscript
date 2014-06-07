// ==UserScript==
// @name        View DDB
// @namespace   nplay.viewDDB
// @description Permet de voir quels messages ont été DDB sur les forums de JeuxVideo.com / JVC.
// @include     http://www.jeuxvideo.com/forums/1-*
// @include     http://www.jeuxvideo.com/forums/3-*
// @exclude     http://www.jeuxvideo.com/forums/1-103-*
// @exclude     http://www.jeuxvideo.com/forums/3-103-*
// @version     1
// ==/UserScript==

(function() {
	var messages = document.getElementById('col1').getElementsByClassName('msg'),
		 numMode = location.href.split('/forums/')[1].split('-')[0];

	for(var i = 0; i < messages.length; ++i) {
		if(messages[i].getElementsByClassName('suite_sujet').length === 0) {
			var message_contenu		= messages[i].getElementsByClassName('post')[0].innerHTML.slice(0,-1);
			var message_pseudo		= messages[i].getElementsByClassName('pseudo')[0].getElementsByTagName('strong')[0].innerHTML;
			var message_date		= messages[i].getElementsByClassName('date')[0];
			
			if(numMode === '1') {
				var message_ancre	= messages[i].getElementsByClassName('ancre')[0].getElementsByTagName('a')[0];
			}
			
			(function(i) {
				var liens = messages[i].getElementsByClassName('date')[0].getElementsByTagName('a');
				var lienDDB = liens[liens.length-1].href;
				
				var xhr = new XMLHttpRequest();
				
				xhr.onreadystatechange = function() {
					if (xhr.readyState==4 && xhr.status==200) {
						var statutDDB = getInfoDDB(xhr.responseText);
						
						if(statutDDB & 1) {
							messages[i].className += " msg_alerte";
						}
						if(statutDDB & 2) {
							liens[liens.length-1].parentElement.removeChild(liens[liens.length-1]);
						}
						if(statutDDB & 4) {
							messages[i].getElementsByClassName('post')[0].style.display = 'none';
							
							var suffixe = ' - ', li_ancre, lienMasquer, texteAfficher;
							
							if(numMode === '3') {
								li_ancre			=	document.createElement('li');
								li_ancre.className	=	"ancre";
								messages[i].getElementsByTagName('ul')[0].appendChild(li_ancre);
								suffixe = '';
							}
							
							li_ancre			=	messages[i].getElementsByClassName('ancre')[0];
								
							texteAfficher = document.createTextNode(suffixe+'Afficher ce message');
								
							lienMasquer			=	document.createElement('a');
							lienMasquer.href	=	'#'+messages[i].id;
							lienMasquer.appendChild(texteAfficher);
							lienMasquer.onclick = function(){
								this.parentElement.parentElement.getElementsByClassName('post')[0].style.display = 'block';
								this.style.display = 'none';
								return false;
							};
							
							li_ancre.appendChild(lienMasquer);

						}
						
					}
				}
				xhr.open("GET",lienDDB,true);
				xhr.send();
			})(i);
		}
	}
})();









function getInfoDDB(str) {
	if(str.indexOf('Le formulaire est expiré') > -1) {
		return 0;
	}
	if(str.indexOf('Signalement déjà fait, apportez votre voix') > -1) {
		return 1;
	}
	if(str.indexOf('Ce message a déjà été traité') > -1) {
		return 2;
	}
	if(str.indexOf('Autosignalement déjà effectué.') > -1) {
		return 3;
	}
	if(str.indexOf('Autosignalement déjà effectué, aucun boost possible.') > -1) {
		return 3;
	}
	if(str.indexOf('Vous avez déjà effectué un boost pour cette alerte !') > -1) {
		return 7;
	}
	if(str.indexOf('Vous êtes à l\'origine de l\'alerte, vous ne pouvez pas booster.') > -1) {
		return 7;
	}
	if(str.indexOf('Veuillez vous connecter') > -1 ) {
		return 8;
	}
	return 0;
}