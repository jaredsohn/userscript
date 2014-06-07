// ==UserScript==
// @name           Mafiosi berichten checker en melder
// @namespace      Mafiosi berichten checker en melder
// @include        http://mafiosi.nl/mail.php
// @include        http://www.mafiosi.nl/mail.php
// @include        http://mafiosi.nl/inbox.php
// @include        http://www.mafiosi.nl/inbox.php
// ==/UserScript==

var link = GM_getValue('link');
	if(!link){
		GM_setValue('link', 'sUvzwLsjXgQ'); 
	}

if(window.location.href.indexOf('mafiosi.nl/mail.php') > 0){
	if(document.body.innerHTML.indexOf('(0)') < 0){
	var link = GM_getValue('link');
	document.body.innerHTML += '<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/'+link+'?autoplay=1" frameborder="0"></iframe>' + link;
	}
}


if(window.location.href.indexOf('mafiosi.nl/inbox.php') > 0){
	if(document.body.innerHTML.indexOf('verzender:')){

	var link = GM_getValue('link');

		function save(){
			var link2 = document.getElementById('link').value;
			GM_setValue('link', link2);
				alert("Instellingen succesvol aangepast.");
		}

	var link = GM_getValue('link');

document.body.innerHTML += "<br /><br /><center><div id='setting' name='setting'><table>"
+ "<tr><td>Sound: </td><td><input type='text' id='link' name='link' size='75' value='" + link + "'></td><td>Youtube video ID</td></tr>"
+ "<tr><td></td><td><input type='button' id='save' name='save' value='save'></td><td></td></tr>"
+ "</table><br />Voor gebruik kunt u het beste een korte video gebruiken, de video gaat door tot het einde, of tot u de pagina vernieuwd.</div></center>";


	var button = document.getElementById('save');
		button.addEventListener('click', save, false);
	}
}