// ==UserScript==
// @name           Responder CC - Rediseño
// @author         Vesselin (modificado por DulcePerra)
// @description    Permite contestar Circulares desde el mensaje mismo
// @history        Button changed into spanish - Cambiado el botón en español.
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

(function ()
{
	// Este if no es necesario pero funciona con opera (translated comment)
	if (document.location.href.indexOf ("/game/index.php?page=showmessage") == -1)
		return;
	var wrapperDiv = document.getElementById ("wrapper");
	if (wrapperDiv == null)
		return;
	var theDivs = wrapperDiv.getElementsByTagName ("div");
	if (theDivs.length < 5)
		return;
	var infoHeadDiv = theDivs [1];
	var showMsgNaviDiv = theDivs [2];
	var theLis = showMsgNaviDiv.getElementsByTagName ("a");
	for (var i = 0; i < theLis.length; i++)
		if (theLis [i].className.indexOf ("answerHeadline") > -1)
			return;
	var textWrapperDiv = theDivs [4];
	var theTable = infoHeadDiv.getElementsByTagName ("table");
	if (theTable.length < 1)
		return;
	if (theTable [0].rows [0].cells [1].textContent.trim ().indexOf("[") == -1)
		return;
	var subject = theTable [0].rows [2].cells [1].textContent.trim ();
	var session = document.location.href.match (/\&session=([0-9a-fA-F]{1,12})\&/) [1];
	textWrapperDiv.className = "textWrapperSmall";
	var newDiv = document.createElement ("div");
        newDiv.innerHTML =
		'<div id="answerForm" class="textWrapperSmall">' +
			'<form target="_parent" method="post" action="index.php?page=networkkommunikation&session=' + session + '&empfaenger=0" name="asdf">' +
				'<input type="hidden" name="empfaenger" value="0" />'+
				'<div class="answerText">' +
					'<textarea tabindex="3" name="text" class="mailnew" onkeyup="javascript:cntchar(2000)""></textarea>' +
					'<input type="hidden" name="betreff" value="RE:' + subject + '" />' +
				'</div>' + 
   				'<div class="answerText">' +
					'<div class="fleft count textBeefy">(<span id="cntChars">0</span> / 2000)</div>' + 
					'<div class="fleft buttonbox">' +
						'<input tabindex="4" name="submitMail" type="submit" class="buttonsave" value="Enviar" />' +
					'</div>' +
					'<br class="clearfloat" />' +
				'</div>' +
			'</form>' +
		'</div>';
	wrapperDiv.appendChild (newDiv);


}
) ();
