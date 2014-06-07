// ==UserScript==
// @name           My Prizee - Avatar
// @namespace      My Prizee
// @include        http://*.prizee.com/view_profil_*_1_profil.html
// ==/UserScript==

/*
//document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace("<!-------------------------- AFFICHAGE DE LA BIBLIOTHEQUE D'AVATARS -------------------->", "");
//document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace("<!-- Fin ajout gestion abus avatars -->", "</div></div>");
//document.getElementById('bodyWrapper').innerHTML = "test";
while(document.getElementById('bodyWrapper').innerHTML.search('<!--') != -1){document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace('<!--', '');}
while(document.getElementById('bodyWrapper').innerHTML.search('-->') != -1){document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace('-->', '');}
while(document.getElementById('bodyWrapper').innerHTML.search('--&gt;') != -1){document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace('--&gt;', '');}
function enleve(cherche)
{document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace(cherche, '');}
enleve("DECOMMENTER");
enleve("------------------------ AFFICHAGE DE LA BIBLIOTHEQUE D'AVATARS ------------------");
enleve("------------------------ VALIDATION DE L'AVATAR ------------------");
enleve("&gt;");
enleve("------------------------ AFFICHAGE DE L'AVATAR DE LA BLIBLIO DU JOUEUR ------------------");
enleve("	&lt;!---------------------------- SIGNALEZ UN ABUS --------------------------------");*/

//http://img25.imageshack.us/img25/7582/avatarxra.png

document.body.innerHTML = '<div style="width:557px;height:144px;background-image:url(http://img25.imageshack.us/img25/7582/avatarxra.png);repeat:background-repeat;position:absolute;top:35%;left:31%;"><form action="forum_profil.php" method="post" enctype=\'multipart/form-data\' style="position:relative;top:50px;left:50px;">				<input type="hidden" name="act2" value="modifier" /><input type="hidden" name="cat" value="" /><input type="hidden" name="MAX_FILE_SIZE" value="2048000" /><input type="hidden" name="ancien_avatar" value="0"><input type="file" name="image" size="30" /><br /><br /><br /><input style="position:relative;left:400px;" name=\'valider\' type=\'submit\' value=\'Valider\' /></form></div>';