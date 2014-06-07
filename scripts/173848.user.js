// ==UserScript==
// @name         NucleaGame : inMessages
// @namespace    NucleaGame : inMessages
// @description	 Permet d'envoyer un message d'alliance depuis n'importe quel page.
// @author       Néo
// @version      0.2
// @date         2013-07-21 18h05
// @include      http://www.nucleagame.fr/uni1/*
// ==/UserScript==

var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'inMessages',
	name: 'Messages',
	version: '0.2',
	url: 'http://userscripts.org/scripts/source/173848.user.js',
	options: {}
}) );

var content = getId('content');

var divMsgAlli = createElem('div');
divMsgAlli.innerHTML = '<center><a style="cursor:pointer;" onclick="if(document.getElementById(\'messageAlli\').style.display==\'block\') document.getElementById(\'messageAlli\').style.display=\'none\'; else document.getElementById(\'messageAlli\').style.display=\'block\';">Message pour l\'alliance</a></center> <form name="message" id="messageAlli" style="display:none;">	<table style="width:760px">	<tr>		<th colspan="2">Envoyer un message collectif</th>	</tr>	<tr>		<td>Destinataire</td>		<td>		<select name="rankID"><option value="0">Tous les joueurs</option></select>		</td>	</tr><tr>	<td>Sujet</td>	<td><input type="text" name="subject" id="subject" size="40" maxlength="40" value="Pas de sujet"></td>	</tr>	<tr>		<td>Message (<span id="cntChars">0</span> / 5000 caractères)</td>		<td>			<textarea id="txtMessageAlli" name="text" cols="60" rows="10" onkeyup="$(\'#cntChars\').text($(this).val().length);"></textarea>		</td>	</tr>	<tr>		<th colspan="2" style="text-align:center;">		<input value="R&eacute;initialiser" type="reset">		<input onclick="if(document.message.text.value == \'\') {		alert(\'Entrez du texte\');		return false;	} else {		$.post(\'game.php?page=alliance&mode=circular&action=send&ajax=1\', $(\'#messageAlli\').serialize(), function(data){			data = $.parseJSON(data);			alert(data.message);			if(!data.error) {				document.getElementById(\'messageAlli\').style.display=\'none\'; document.getElementById(\'txtMessageAlli\').value=\'\';				}		});		return true;	}" name="button" value="Envoyer" type="button">		</th>	</tr>	</tbody></table></form>';

content.parentNode.insertBefore(divMsgAlli, content);



