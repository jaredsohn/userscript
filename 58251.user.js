// ==UserScript==
// @name          GlassStyle for JV.COM
// @namespace     
// @description	  
// @homepage      
// @include        http://www.jeuxvideo.com/forums/*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==

if (!GM_getValue("installation_style_glass1.1revb",true)) {
	GM_setValue("installation_style_glass1.1revb",true);
	GM_setValue("imgfond",'http://hapshack.com/images/f5.jpg');
	GM_setValue('opac', '0.2')
	GM_setValue('opac_msg', '0.6')
	GM_setValue('form', 1)
}




Style();

function changeform() {
	valeur = prompt('Activer/Désactiver les effets sur les formulaires (1:Activé / 0:Désactivé):', GM_getValue('form'));
	if (valeur!=null)
		{
		if (!isNaN(valeur) && (valeur==0 || valeur==1)) {
		alert('Modification avec succès.\nNouveau : '+valeur+'\nLa page va se recharger...')
		GM_setValue('form', valeur)
		location.reload()
		}
		else{
		alert('Valeur incorrecte.')
		}
		}
}


function changefd() {
	valeur = prompt('URL de l\'image de fond :', GM_getValue('imgfond'));
	if (valeur!=null)
		{
		alert('Modification en cours.\nNouvelle image : '+valeur+'\nLa page va se recharger. Si le fond reste blanc, vérifez que vous avez bien entré une URL correcte !')
		GM_setValue('imgfond', valeur)
		document.getElementsByTagName('body')[0].style.background="transparent url(\""+GM_getValue('imgfond')+"\") no-repeat center fixed";
		}
}

function changeopac() {
	valeur = prompt('Opacité du fond (valeur entre 0 et 1, exemple 0.4) :', GM_getValue('opac'));
	if (valeur!=null)
		{
		if(valeur <=1 && valeur>=0 && !isNaN(valeur)) {
		GM_setValue('opac', valeur)
		alert('Modification avec succès.\nNouvelle opacité : '+valeur+'\nLa page va se recharger...')
		location.reload()
		}
		else{
		alert('Valeur incorrecte.')
		}
		}
}


function changeopacpost() {
	valeur = prompt('Opacité du fond des messages (valeur entre 0 et 1, exemple 0.4) :', GM_getValue('opac_msg'));
	if (valeur!=null)
		{
		if(valeur <=1 && valeur>=0 && !isNaN(valeur)) {
		GM_setValue('opac_msg', valeur)
		alert('Modification avec succès.\nNouvelle opacité : '+valeur+'\nLa page va se recharger...')
		location.reload()
		}
		else{
		alert('Valeur incorrecte.')
		}
		}
}

function enroule() {document.getElementById('glmenu').style.height = '15px';}
function deroule() {
document.getElementById('glmenu').style.height='300px';document.getElementById('glmenu').innerHTML='GlassStyle<br><br><input type="button" id="btnfd" value="Image de fond" style="width:100%;height:22px;font-size:10px;"><br><input style="font-size:10px;width:100%;height:22px;" type="button" id="btnopac" value="Opacité"><br><input style="font-size:10px;width:100%;height:22px;" type="button" id="btnopacpost" value="Opacité des posts"><br><input style="font-size:10px;width:100%;height:22px;" type="button" id="btnfo" value="Formulaires"></center>'
		document.getElementById('btnfd').addEventListener("click", changefd, false);
		document.getElementById('btnopac').addEventListener("click", changeopac, false);
		document.getElementById('btnopacpost').addEventListener("click", changeopacpost, false);
		document.getElementById('btnfo').addEventListener("click", changeform, false);}

function Style() {
var css = "body {background: transparent url(\""+GM_getValue('imgfond')+"\") no-repeat center fixed;} h1 {display:none;}#header {position: relative;}#logo {height: 0px;width: 400px;margin-bottom:50px;}";
css = css + "#logo {display:none;height:0px;} #connexion {display:none;} #partenaires {display:none;} #header {display:none;height:0px; overflow:hidden;} #logo img {display:none;} #pub_carre1 {display:none;} #banner {display:none;} #col2{display:none;} #col1 {margin-left:5%;width:80%;margin-right:5%;}"
css = css + ".user {position:absolute;left:680px;margin-right:text-align:right;}  .navig_pages {background: rgba(255,255,255,0.3) !important; text-align:center;padding-left:20px;}#page {background: transparent!important;} #contenu {background: transparent !important;} #col1 {background: transparent !important;} #col2, .bloc_forum h3 {background: rgba(255,255,255,0.2) !important; } .bloc_inner {border: 0px white solid !important; } .bloc_forum {background: rgba(255,255,255,0.1) !important;} "
css = css + ".tr2{background: transparent !important;} #c2, #c4, #c1, #c3, #c5 {background: rgba(255,255,255,0.35) !important;} .tr1 {background: rgba(255,255,255,0.2) !important;} .bloc_inner {background: rgba(255,255,255,0.3) !important;} h2 {display:none;} #footer {display:none;} #sponsor_google {display:none;} #JVN_block {display:none;}"
css = css + ".msg {background: rgba(255,255,255,"+GM_getValue('opac_msg')+") !important; } .alerte {background:transparent !important;}#recherche_forum {width:300px;text-align:center;} #liste_topics {border:none;background: rgba(255,255,255,0.15) !important;} #col1 {background: rgba(255,255,255,"+GM_getValue("opac")+")!important;-moz-background-clip: padding !important;border: 8px solid transparent !important;-moz-border-bottom-colors:  #242417 #2cd3fe rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3)  #dbeaf6 #606d7a !important;-moz-border-left-colors: #2b4252 #f5f8fa rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) #dbeaf6 #606d7a !important;-moz-border-right-colors: #242417 #2cd3fe rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3)  #dbeaf6 #606d7a !important;-moz-border-top-colors:  #2b4252 #f5f8fa rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) #dbeaf6 #606d7a !important;-moz-border-radius: 6px !important;}"
css = css + ".form_err  {-moz-background-clip: padding !important;border:1px #acacac solid !important; -moz-border-radius: 3px !important;}"
css = css + ".sujet span {display:none;} .bloc1, .bloc2, .bloc3 {background : transparent !important; margin-bottom:0px !important;}"
css = css + ".menuspec {text-align:center;position:absolute;top:0px;left:90%;width:100px;font-size:12px;color:white;height:15px;overflow:hidden;margin:-4px;background: rgba(255,255,255,0.2) !important;-moz-background-clip: padding !important;border: 4px solid transparent !important;-moz-border-bottom-colors:  #242417 #2cd3fe rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3)  #dbeaf6 #606d7a !important;-moz-border-left-colors: #2b4252 #f5f8fa rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) #dbeaf6 #606d7a !important;-moz-border-right-colors: #242417 #2cd3fe rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3)  #dbeaf6 #606d7a !important;-moz-border-top-colors:  #2b4252 #f5f8fa rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) #dbeaf6 #606d7a !important;-moz-border-radius: 6px !important;}"
css = css + ".selected ";
if (GM_getValue('form') == 1) {
css = css + ", #recherche_forum:hover, #bouton_apercu:active, #bouton_post:active, .message:hover, .nouveau_sujet:hover, .login:hover, .password:hover  ";
}
css = css + "{margin:-4px;background: rgba(255,255,255,0.2) !important;-moz-background-clip: padding !important;border: 4px solid transparent !important;-moz-border-bottom-colors:  #242417 #2cd3fe rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3)  #dbeaf6 #606d7a !important;-moz-border-left-colors: #2b4252 #f5f8fa rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) #dbeaf6 #606d7a !important;-moz-border-right-colors: #242417 #2cd3fe rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3)  #dbeaf6 #606d7a !important;-moz-border-top-colors:  #2b4252 #f5f8fa rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) rgba(255,255,255,0.3) #dbeaf6 #606d7a !important;-moz-border-radius: 6px !important;}"
if (GM_getValue('form') == 1) {
css = css + " .login:hover, .password:hover {margin:-4px -4px 2px -4px !important;} .login, .password {height:30px;} .login:hover {margin-top:2px !important;margin-bottom:-4px !important;}";
}

var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
		div=document.createElement('div');
		div.className="menuspec";
		div.id='glmenu';
		inhtml = 'GlassStyle'
		div.appendChild(document.createTextNode(inhtml));
		
		document.getElementById('global').appendChild(div);

		document.getElementById('glmenu').addEventListener("mouseover", deroule, false);
		document.getElementById('glmenu').addEventListener("mouseout", enroule, false);

		/*
		document.getElementsByClassName('message')[0].innerHTML='<label for="newmessage">* Message : </label><iframe width="637" height="180" id="newmessage" class="form_err" style="background-color:white !important;"></iframe><br><input type="button" value="gras" id="sm1"><textarea id="hidtextarea" name="yournewmessage" style="display:none;">Ne postez pas d\'insultes, évitez les majuscules, faites une recherche avant de poster pour voir si la question n\'a pas déjà été posée...Tout message d\'incitation au piratage est strictement interdit et sera puni d\'un bannissement.</textarea>';
		document.getElementById('newmessage').addEventListener("mouseover", wysiwyg, false);
		document.getElementById('sm1').addEventListener("click", smiley, false);
		document.getElementById('newmessage').addEventListener("change", reporter, false);
		*/
	}
	else
	{
	alert('Erreur, impossible d\'utiliser le style. Veuillez le désinstaller de greasemonkey ! ');
	}
}
