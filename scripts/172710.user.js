// ==UserScript==
// @name		Jeuxvideo.com création rapide Version 1.0
// @namespace		ByMarioK
// @version		1.1
// @description		Crée un compte sur Jeuxvideo.com rapidement.
// @include		http://www.jeuxvideo.com/moncompte.php
// ==/UserScript==

(function() {
    if(location.hash == '#n' && ~location.toString().indexOf('oper=4')) {
        
        // Un peu de CSS pour virer le header et adapter le background à la classe bloc3.bloc_inner
        document.querySelector('#new_header #header').setAttribute('style','margin:86px');
        document.body.style.background = '#EDEDED';
        
        if(!document.getElementsByClassName('success')[0]) {
                        // Impossible de transmettre les machines dans l'URL apparemment
			var a = document.createElement('input');
				a.type = 'hidden';
				a.name = 'machine__1';
				a.value = '2';
				document.querySelector('#form').insertBefore(a, document.querySelector('input[name="tz_val"]'));
        
			// Encore du CSS, pour l'adaptation du code de confirmation au sein de la frame
			document.querySelector('.code_confirm2').setAttribute('style','position:absolute;top:0;left:0;z-index:58247524485;margin-left:1px!important;');
			document.querySelector('.code_confirm2 p+p').setAttribute('style','margin:4px 0!important;');
        }
      
    } else if(location.pathname == '/moncompte.htm') {
        
        // Création du formulaire
        document.querySelector('#col2').innerHTML = '<div class="bloc3"><h3 class="titre_bloc"><span>Création rapide de compte</span></h3><div class="bloc_inner"><input id="n" type="text" placeholder="Pseudo"><input id="a" type="password" placeholder="Passwort"><input id="p" type="text" placeholder="Mail"><input style="margin-top:1px;display:block;" type="image" src="http://image.jeuxvideo.com/pics/recherche_bt_valider.gif" id="i"></div></div>';
        
        // Création de la frame pour le code de confirmation, permet au passage de faire passer le paramètre machine__1 (obligatoire)
        document.querySelector('#i').onclick = function() {
            var pseudo = document.querySelector('#n'), mdp = document.querySelector('#a'), mail = document.querySelector('#p');
            if(pseudo.value.length >= 3 && mdp.value.length >= 3 && mail.value.length >= 3) {
                this.parentNode.innerHTML += '<iframe id="f" style="background:#EDEDED;height:78px;width:225px;overflow:hidden;margin-top:2px;" frameborder="0" scrolling="no" src="http://www.jeuxvideo.com/moncompte/moncompte.php?oper=4&pseudo='+pseudo.value+'&password='+mdp.value+'&new_pass_confirm='+mdp.value+'&email='+mail.value+'&nom=bymariok&prenom=Taks&jour=1&mois=1&annee=1993&sexe=1&cp=01240&ville=Certines&mon_pays=FR&ck_charte=1&machine__1=2&machine__1=2&machine__1=2&partenaires=0&newsletter=0#n"></iframe>';
            }

        var f = document.querySelector('#f');
            f.onload = function() {
                // Apparition magique du pseudo et du mot de passe
		var l = f.contentDocument.querySelectorAll('#editcompte4 #pseudo .important');
                f.style.display = 'block!important';
                f.contentDocument.querySelector('#new_header #header').setAttribute('style','margin:86px');
                f.contentDocument.body.style.background = '#EDEDED';
                l[0].setAttribute('style','position:absolute;top:0;left:0;');
                l[1].setAttribute('style','position:absolute;top:22px;left:0;');
            }
        }
    } 
}());