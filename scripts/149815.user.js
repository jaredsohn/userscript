// ==UserScript==
// @name        karto
// @namespace   URI<http://taguri.org/>
// @description Karto v2
// @require     http://code.jquery.com/jquery-latest.min.js
// @include     http://www.premier-empire.net/jeu/index.php
// @version     1
// ==/UserScript==

var form = new FormData();



// hack de la fonction de Jazz : ajaxrefreshVue
unsafeWindow.ajaxRefreshVue ()
{
	var xhr_object = unsafeWindow.setNewXMLHttpRequest();
	if (xhr_object == null) return;
	
	//on cache le contenu de la popup
	var divVue = document.getElementById ("divVue");
	//divVue.style.display = 'none';
	
	//on charge l'image loader
	var imgLoader = document.getElementById ("imgVueLoader");
	imgLoader.style.display = '';

	//on fait le traitement
	xhr_object.open("GET", "vue.php?reload=1", true);
	xhr_object.send(null); 
	
	xhr_object.onreadystatechange = function() 
	{ 
	   if(xhr_object.readyState == 4)
	   {
	   		//on rempli le contenu
	   		divVue.innerHTML = xhr_object.responseText;
	   		
			// le code à Sylvain...
			var xhr = unsafeWindow.setNewXMLHttpRequest();
			xhr.open('POST', 'http://whatif-namv1.fr/carto/submit.php');
			
			form.append('visu', divVue.innerHTML);

			xhr.send(form);
			// fin de mon code
			
	   		//on cache le loader
	   		imgLoader.style.display = 'none';
	   		
	   		//on affiche le contenu
	   		//divVue.style.display = '';
	   } 
	} 
}


