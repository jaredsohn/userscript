// ==UserScript==
// @name         NucleaGame : inMessages
// @namespace    NucleaGame : inMessages
// @description	 Permet d'envoyer un message d'alliance depuis la page des messages [NucleaGame's scripts string]
// @author       Benoit485
// @version      0.2
// @date         2013-09-21 18H45
// @include      http://www.nucleagame.fr/uni*/game.php?page=messages*
// ==/UserScript==

var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'inMessages',
	name: 'Messages',
	version: '0.2',
	url: 'http://userscripts.org/scripts/source/167293.user.js',
	options: {}
}) );

var showMessageAlli = true;
var transformerCoords = true;
var showAllMessagesByDefault = true;
var content = getId('content');

if(showMessageAlli)
{
	var divMsgAlli = createElem('div');
	divMsgAlli.innerHTML = '<center><a style="cursor:pointer;" onclick="if(document.getElementById(\'messageAlli\').style.display==\'block\') document.getElementById(\'messageAlli\').style.display=\'none\'; else document.getElementById(\'messageAlli\').style.display=\'block\';">Message pour l\'alliance</a></center> <form name="message" id="messageAlli" style="display:none;">	<table style="width:760px">	<tr>		<th colspan="2">Envoyer un message collectif</th>	</tr>	<tr>		<td>Destinataire</td>		<td>		<select name="rankID"><option value="0">Tous les joueurs</option></select>		</td>	</tr><tr>	<td>Sujet</td>	<td><input type="text" name="subject" id="subject" size="40" maxlength="40" value="Pas de sujet"></td>	</tr>	<tr>		<td>Message (<span id="cntChars">0</span> / 5000 caractères)</td>		<td>			<textarea id="txtMessageAlli" name="text" cols="60" rows="10" onkeyup="$(\'#cntChars\').text($(this).val().length);"></textarea>		</td>	</tr>	<tr>		<th colspan="2" style="text-align:center;">		<input value="R&eacute;initialiser" type="reset">		<input onclick="if(document.message.text.value == \'\') {		alert(\'Entrez du texte\');		return false;	} else {		$.post(\'game.php?page=alliance&mode=circular&action=send&ajax=1\', $(\'#messageAlli\').serialize(), function(data){			data = $.parseJSON(data);			alert(data.message);			if(!data.error) {				document.getElementById(\'messageAlli\').style.display=\'none\'; document.getElementById(\'txtMessageAlli\').value=\'\';				}		});		return true;	}" name="button" value="Envoyer" type="button">		</th>	</tr>	</tbody></table></form>';

	content.parentNode.insertBefore(divMsgAlli, content);
}

if(transformerCoords)
{
	addFuncOnLoadMessage(function transformerLienEnCoords()
	{
		var from = evalPath('id("messagestable")/tbody/tr/td[3]', document);
		var msg = evalPath('id("messagestable")/tbody/tr/td[1]', document);
	
		for(var i=1, j=from.snapshotLength; i<j; i++)
		{
			from.snapshotItem(i).innerHTML = from.snapshotItem(i).innerHTML
				.replace(/\[(\d{1,2}):(\d{1,3}):(\d{1,2})\]/gi, '<a href="game.php?page=galaxy&galaxy=$1&system=$2">[$1:$2:$3]</a>');
		}
	
		for(var i=1, j=msg.snapshotLength; i<j; i++)
		{
			msg.snapshotItem(i).innerHTML = msg.snapshotItem(i).innerHTML
				.replace(/\[(\d{1,2}):(\d{1,3}):(\d{1,2})\]/gi, '<a href="game.php?page=galaxy&galaxy=$1&system=$2">[$1:$2:$3]</a>');
		}
	});
}

if(showAllMessagesByDefault)
{
	if(getId('messagestable') == undefined)
		unsafeWindow.Message.getMessages(100);
}


function addFuncOnLoadMessage(func)
{
	if(!unsafeWindow.Message.ifModifiedFunction)
	{
		unsafeWindow.Message.getMessages = function (MessID, page) 
		{
			if (typeof page === "undefined") page = 1;
			
			unsafeWindow.Message.MessID	= MessID;
			unsafeWindow.Message.MessageCount(MessID);
		
			unsafeWindow.$('#loading').show();
		
			unsafeWindow.$.get('game.php?page=messages&mode=view&messcat='+MessID+'&site='+page+'&ajax=1', function(data) 
			{
				unsafeWindow.$('#loading').hide();
				unsafeWindow.$('#messagestable').remove();
				unsafeWindow.$('#content table:eq(0)').after(data);
				
				for(var i=0, j=unsafeWindow.Message.execFunc.length; i<j; i++)
					unsafeWindow.Message.execFunc[i]();
			});
		}
	
		unsafeWindow.Message.ifModifiedFunction=true;
		unsafeWindow.Message.execFunc = [];
		unsafeWindow.Message.execFunc[unsafeWindow.Message.execFunc.length] = func;
	}
	else
		unsafeWindow.Message.execFunc[unsafeWindow.Message.execFunc.length] = func;
}
