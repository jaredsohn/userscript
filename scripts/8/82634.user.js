// ==UserScript==
// @name           OGame Redesign: Reply to Circular Messages
// @description    Allows the player to reply directly to circular messages.
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        1.08
// @date           2012-08-12
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=showmessage") < 0)
		return;
	var myFunc = (function ()
	{
		if ($ ("#messagebox > div.infohead span.playerName").text ().indexOf ("[" + $ ("[name='ogame-alliance-tag']").attr ("content") + "]") > 0)
		{
			var textWrapper = $ ("#messagebox > div.showMsgNavi + div[class^=textWrapper]");
			if (textWrapper.length > 0)
			{
				$ (textWrapper).removeClass ("textWrapper").addClass ("textWrapperSmall").after (
					'<div class="answerHeadline open">' +
						'answer' +
						'<a href="javascript:void(0);" id="openCloseForm"></a>' +
					'</div>' +
					'<div class="textWrapperSmall" id="answerForm" style="display: block;">' +
						'<form action="index.php?page=allianceBroadcast" method="post" target="_self">' +
							'<input type="hidden" value="200" name="empfaenger">' +
							'<div class="answerText">' +
								'<textarea onkeyup="javascript:cntchar(2000)" class="mailnew" name="text" tabindex="3"></textarea>' +
							'</div>' +
							'<div class="answerText">' +
								'<span class="count textBeefy">(<span id="cntChars">0</span> / 2000)</span>' +
								'<span class="buttonbox" style="float: right;">' +
									'<input type="submit" value="Send" class="button188" tabindex="4">' +
								'</span>' +
								'<br class="clearfloat">' +
							'</div>' +
						'</form>' +
					'</div>'
				);
				$ ("#answerForm form").submit (function ()
				{
					$ ("#answerForm").attr ("circularReply", 1)
				});
				$ (window).unload (function ()
				{
					if ($ ("#answerForm").attr ("circularReply"))
						$ ("#contentPageNavi a.closeTB").click ();
				});
			}
		}
		if ($ ("#messagebox .answerHeadline").length > 0)
		{
			$ ("#messagebox ul.toolbar > li.delete").after (
				'<li class="quotation" style="background-image: url(/cdn/img/icons/refresh.gif);">' +
					'<a class="tipsStandard" title="|Quote this message" href="javascript:void(0);">quote</a>' +
				'</li>'
			);
			$ ("#messagebox ul.toolbar > li").css ("width", 190);
			$ (".quotation a").click (function ()
			{
				var messageText = $ ("#messagebox .note").text ().trim ();
				var colonPos = messageText.indexOf (":") + 1;
				$ ("#answerForm textarea").val ("[background color=#1C232C][list][*]" + messageText.substring (0, colonPos) + "\n" + messageText.substring (colonPos) + "[/list][/background]");
			});
		}
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
}) ();
