// ==UserScript==
// @name           Color Rank
// @namespace      My Prizee
// @include        http://www.prizee.com/forum/index.php?/topic/*
// @include        http://www.prizee.com/forum/index.php?app=core&module=usercp&tab=forums
// @author		   matheod (matheoland)
// ==/UserScript==

$ = unsafeWindow.jQuery;
color_moi = GM_getValue("moi","FFFFAA");
color_modo = GM_getValue("modo","AAAAFF");
color_admin= GM_getValue("admin","FFAAAA");
color_membres= GM_getValue("membres","matheoland|AAFFAA").split("|");
if(location=="http://www.prizee.com/forum/index.php?app=core&module=usercp&tab=forums"){
txt="";
for(i=0; i<color_membres.length-1; i=i+2)
{
txt+='<li class="field"><input type="text" value="'+color_membres[i]+'" class="input_text" size="40" id="color_pseudo_'+i+'"/> #<input type="text" value="'+color_membres[i+1]+'" class="input_text" size="40" id="color_couleur_'+i+'"/> <input type="button" class="input_submit" onclick="modifier(document.getElementById(\'color_pseudo_'+i+'\').value,document.getElementById(\'color_couleur_'+i+'\').value,\''+i+'\',\''+color_membres.join('|')+'\');alert(\'Modifié !\');location.reload();" value="Modifier"> <input type="button" class="input_submit" onclick="supprimer(\''+i+'\', \''+color_membres.join('|')+'\');alert(\'Supprimé !\');location.reload();" value="Supprimer"></li>';
}
$("#usercp_content").html('<fieldset class="row1"><h3>Color Rank</h3><ul><li class="field"><label for="field_admin">Admin : </label> #<input type="text" value="'+color_admin+'" name="field_6" class="input_text" size="40" id="field_admin"/></li><li class="field"><label for="field_modo">Modo : </label> #<input type="text" value="'+color_modo+'" name="field_6" class="input_text" size="40" id="field_modo"/></li><li class="field"><label for="field_moi">Moi : </label> #<input type="text" value="'+color_moi+'" name="field_6" class="input_text" size="40" id="field_moi"/></li><li class="field"><input type="button" class="input_submit" onclick="save(document.getElementById(\'field_moi\').value,document.getElementById(\'field_modo\').value,document.getElementById(\'field_admin\').value);alert(\'Sauvegardé !\');" value="Sauvegarder"> <input type="button" class="input_submit" onclick="defaut();alert(\'Remise des couleurs par défaut !\');" value="Defaut"></li>'+txt+'<li class="field"><input type="button" class="input_submit" onclick="ajouter(prompt(\'Pseudo du membre ?\',\'\'),prompt(\'Couleur de coloration ?\',\'AAFFAA\'),\''+color_membres.join('|')+'\');alert(\'Ajouté !\');location.reload();" value="Ajouter une coloration"> <input type="button" class="input_submit" onclick="defaut2();alert(\'Remis par défaut !\');location.reload();" value="Défaut"></li>	</ul></fieldset>'+$("#usercp_content").html());
unsafeWindow.save = function (moi,modo,admin)
{
window.setTimeout(GM_setValue,0,'moi', moi);
window.setTimeout(GM_setValue,0,'modo', modo);
window.setTimeout(GM_setValue,0,'admin', admin);
}
unsafeWindow.ajouter = function (pseudo, couleur, split)
{
if(split!=""){split+="|";}
split+=pseudo+"|"+couleur;
window.setTimeout(GM_setValue,0,'membres', split);
}
unsafeWindow.modifier = function (pseudo, couleur, id, split)
{
id=parseInt(id);
split = split.split('|');
split[id]=pseudo;
split[id+1]=couleur;
split = split.join('|');
window.setTimeout(GM_setValue,0,'membres', split);
}
unsafeWindow.supprimer = function (id, split)
{
id=parseInt(id);
split = split.split('|');
split[id]="34HJB349";
split[id+1]="34HJB349";
split = split.join('|');
split = split.replace('34HJB349|34HJB349','');
if(split.substr(0,1)=='|')
{split=split.substr(1,split.length)}
if(split.substr(split.length-1)=='|')
{split=split.substr(0,split.length-1)}
window.setTimeout(GM_setValue,0,'membres', split);
}
unsafeWindow.defaut = function ()
{
window.setTimeout(GM_setValue,0,'moi', "FFFFAA");
window.setTimeout(GM_setValue,0,'modo', "AAAAFF");
window.setTimeout(GM_setValue,0,'admin', "FFAAAA");
}
unsafeWindow.defaut2 = function ()
{
window.setTimeout(GM_setValue,0,'membres', "matheoland|AAFFAA");
}
}else{
pseudo = $('.pseudo_user').text();
$(".fn:contains('"+pseudo+"')").parent().parent().css('background-color','#'+color_moi);
$(".fn:contains('"+pseudo+"')").parent().parent().parent().css('background-color','#'+color_moi);
$(".fc > span:contains('Moderateurs')").parent().parent().parent().parent().prev().css('background-color','#'+color_modo);
$(".fc > span:contains('Moderateurs')").parent().parent().parent().parent().parent().css('background-color','#'+color_modo);
$(".fc > span:contains('Administrateurs')").parent().parent().parent().parent().parent().css('background-color','#'+color_admin);
$(".fc > span:contains('Administrateurs')").parent().parent().parent().parent().prev().css('background-color','#'+color_admin);
for(i=0; i<color_membres.length-1; i=i+2)
{
$(".fn:contains('"+color_membres[i]+"')").parent().parent().css('background-color','#'+color_membres[i+1]);
$(".fn:contains('"+color_membres[i]+"')").parent().parent().parent().css('background-color','#'+color_membres[i+1]);
}
}