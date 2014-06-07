// ==UserScript==
// @name           Signature
// @namespace      My Prizee
// @include        http://www.prizee.com/forum/index.php?/topic/*
// @include        http://www.prizee.com/forum/index.php?app=core&module=usercp&tab=forums
// ==/UserScript==

if(!GM_getValue('signature')){GM_setValue('avant','');GM_setValue('avant','');GM_setValue('signature','ok');alert("Rendez vous dans Mes Paramètres, puis Forum pour configurer votre signature.");};
$ = unsafeWindow.jQuery;

if(location=="http://www.prizee.com/forum/index.php?app=core&module=usercp&tab=forums"){
$("#usercp_content").html('<fieldset class="row1">	<h3>Signature</h3>	<ul>		<li class="field checkbox">			<input type="checkbox" class="input_check" value="1" id="gras"/> <label for="view_sigs">Gras</label>		</li>		<li class="field checkbox">			<input type="checkbox" class="input_check" value="1" id="italique"/> <label for="view_img">Italique</label>		</li>		<li class="field checkbox">			<input type="checkbox" class="input_check" value="1" id="souligne"/> <label for="view_avatar">Souligné</label>		</li>		<li class="field">			<label for="field_couleur">Couleur</label>			<input type="text" value="" name="field_6" class="input_text" size="40" id="field_couleur"/>		</li>		<li class="field">			<label for="field_police">Police</label>			<input type="text" value="" name="field_6" class="input_text" size="40" id="field_police"/>		</li>		<!--<li class="field">			<label for="post_per_page">Police :</label>			<select id="posts_per_page" class="input_select" name="postpage">			<option value="">Aucune</option>			<option value="">Test</option></select>		</li>-->		<li class="field">		<input type="button" class="input_submit" onclick="avant=\'\';apres=\'\';if(document.getElementById(\'gras\').checked){avant+=\'[b]\';apres=\'[/b]\'+apres;}if(document.getElementById(\'italique\').checked){avant+=\'[i]\';apres=\'[/i]\'+apres;}if(document.getElementById(\'souligne\').checked){avant+=\'[u]\';apres=\'[/u]\'+apres;}if(document.getElementById(\'field_couleur\').value){avant+=\'[color=\'+document.getElementById(\'field_couleur\').value+\']\';apres=\'[/color]\'+apres;}if(document.getElementById(\'field_police\').value){avant+=\'[font=\'+document.getElementById(\'field_police\').value+\']\';apres=\'[/font]\'+apres;}signature(avant,apres);alert(\'Enregistré !\');" value="Enregistrer la signature"> <input type="button" class="input_submit" onclick="signaturesupprimer();alert(\'Signature supprimé !\');" value="Supprimer la signature">		</li>	</ul></fieldset>'+$("#usercp_content").html());
unsafeWindow.signature = function (postavant,postapres)
{
window.setTimeout(GM_setValue,0,'avant', postavant);
window.setTimeout(GM_setValue,0,'apres', postapres);
}
unsafeWindow.signaturesupprimer = function ()
{
window.setTimeout(GM_setValue,0,'avant', '');
window.setTimeout(GM_setValue,0,'apres', '');
}
}
else{
avant = GM_getValue('avant');
apres = GM_getValue('apres');
$('#submit_post').click(function(){$('#fast-reply_textarea').val(avant+$('#fast-reply_textarea').val()+apres);});
}
/*
<fieldset class="row1">
	<h3>Signature</h3>
	<ul>
		<li class="field checkbox">
			<input type="checkbox" class="input_check" value="1" id="gras"/> <label for="view_sigs">Gras</label>
		</li>
		<li class="field checkbox">
			<input type="checkbox" class="input_check" value="1" id="italique"/> <label for="view_img">Italique</label>
		</li>
		<li class="field checkbox">
			<input type="checkbox" class="input_check" value="1" id="souligne"/> <label for="view_avatar">Souligné</label>
		</li>
		<li class="field">
			<label for="field_couleur">Couleur</label>
			<input type="text" value="" name="field_6" class="input_text" size="40" id="field_couleur"/>
		</li>
		<li class="field">
			<label for="field_police">Police</label>
			<input type="text" value="" name="field_6" class="input_text" size="40" id="field_police"/>
		</li>
		<!--<li class="field">
			<label for="post_per_page">Police :</label>
			<select id="posts_per_page" class="input_select" name="postpage">
			<option value="">Aucune</option>
			<option value="">Test</option></select>
		</li>-->
		<li class="field">
		<input type="button" class="input_submit" onclick="avant='';apres='';if(document.getElementById('gras').value){avant+='[b]';apres='[/b]'+apres;}if(document.getElementById('italique').value){avant+='[i]';apres='[/i]'+apres;}if(document.getElementById('souligne').value){avant+='[u]';apres='[/u]'+apres;}if(document.getElementById('field_couleur').value){avant+='[color='+document.getElementById('field_couleur').value+']';apres='[/color]'+apres;}if(document.getElementById('field_police').value){avant+='[font='+document.getElementById('field_police').value+']';apres='[/font]'+apres;}signature(avant,apres);" value="Enregistrer la signature">
		</li>
	</ul>
</fieldset>
*/