// ==UserScript==
// @name           New Forum
// @namespace      My Prizee
// @include        http://*.prizee.com/forum/index.php
// @include        http://*.prizee.com/forum/index.php?/index
// ==/UserScript==

document.getElementById('categories').style.display='none';

nbforum =document.getElementById('categories').getElementsByTagName('h3').length;
texte = "";
for(i=0;i<nbforum;i++)
{
if(document.getElementById('categories').getElementsByTagName('table')[i].innerHTML.search('f_unread.png')!= -1){color='#67625C';}else{color='#a4998c';}
texte += "<b style='cursor:pointer;color:"+color+";' onclick=\"codesrc = document.getElementById('categories').getElementsByTagName('div')["+i*2+"].innerHTML;document.getElementById('contenuforum').innerHTML ='<div class=\\'category_block block_wrap\\'>'+codesrc+'</div>';\">"+document.getElementById('categories').getElementsByTagName('h3')[i].getElementsByTagName('a')[1].innerHTML+"</b><br />";

}

document.getElementById('board_index').innerHTML += '<div class="category_block block_wrap" id="listeforum"><h3 class="maintitle" id="category_3">Liste des forums</h3><div class="table_wrap"><table summary="Liste des forums" class="ipb_table"><tbody><tr class="header"><th id="listecon">Script "Forum Mix\'" By matheod (matheoland)<span style="float:right;"><a href="#" style="color:#67625C;" onclick="document.getElementById(\'contenuforum\').innerHTML = document.getElementById(\'categories\').innerHTML;">Afficher tout les forums</a> - <a href="http://userscripts.org/scripts/show/58697" style="color:#67625C;">Infos</a></span></th></tr><tr class="row1"><td>'+texte+'</td></tr></tbody></table></div></div><div id="contenuforum"></div>';