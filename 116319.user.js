// ==UserScript==
// @name           LtUaE Spoilers
// @namespace      LtUaESpoilers
// @description    <spoiler>Surprise!</spoiler>
// @include        http://www.gamefaqs.com/boards/*-*/*
// @include        http://www.gamefaqs.com/boards/post.php?board=*
// @include        http://www.gamefaqs.com/boards/moddetl.php?board=*
// ==/UserScript==

var bAgreed = GM_getValue("Agreed", false);

if ( bAgreed == false )
{
	var s = "This script implements \"spoiler\" tags for the GameFAQs message boards.  Using the script with the padding option is the only way to mark spoilers without being moderated.  You take fully responsibility for your account and/or karma by using this script.  If you do not agree, please uninstall or disable this script to get rid of this message.";
	GM_setValue("Agreed", confirm(s));
	if ( GM_getValue("Agreed", false) == false )
	{
		return;
	}
}

var rMatch = /<span class="fspoiler">(.*?)<\/span>|&lt;spoiler&gt;(.*?)&lt;\/spoiler&gt;/gi;
if ( document.location.toString().match(/^http:\/\/www\.gamefaqs\.com\/boards\/post\.php\?board=\d.*?$/) )
{
	var aRawPosts = new Array(document.evaluate("//table[@class='board message']//tr//td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0));
}
else if ( document.location.toString().match(/^http:\/\/www\.gamefaqs\.com\/boards\/moddetl\.php\?board=\d.*?$/) )
{
	var aRawPosts = new Array(document.evaluate("//table[@class='board message']//tr//td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1));
}
else
{
	var aRawPosts = document.getElementsByClassName("msg_body");
}
for ( var i = 0; i < aRawPosts.length; i++ )
{
	if ( aRawPosts[i] && aRawPosts[i].innerHTML.match(rMatch) )
	{
		aRawPosts[i].innerHTML = aRawPosts[i].innerHTML.replace(/<br\/>\*<br\/>\*<br\/>\*<br\/>\*<br\/>\*<br\/>/gi, ''); // Original breaks, use GameFOX LMOA!
		aRawPosts[i].innerHTML = aRawPosts[i].innerHTML.replace(/<br>\*<br>\*<br>\*<br>\*<br>\*<br>/gi, ''); // GameFOX breaks
		aRawPosts[i].innerHTML = aRawPosts[i].innerHTML.replace(rMatch, "<span><span onclick=\"this.nextSibling.style.display = ( ( this.nextSibling.style.display == 'none' ) ? '' : 'none' );\" style=\"font-weight: bold; text-decoration: underline;\">&lt;spoiler&gt;</span><span style=\"display: none;\">$1$2<span onclick=\"this.parentNode.style.display = ( ( this.parentNode.style.display == 'none' ) ? '' : 'none' );\" style=\"font-weight: bold; text-decoration: underline;\">&lt;/spoiler&gt;</span></span></span>");
	}
}

var sPadding = "\n*\n*\n*\n*\n*\n";
var sPaddingReg = "\n\\*\n\\*\n\\*\n\\*\n\\*\n";
window.addEventListener("load", function(e)
{
	var oText = ( ( document.getElementById("gamefox-message") ) ? document.getElementById("gamefox-message") : document.getElementsByName("messagetext")[0] );
	oText.form.appendChild(document.createElement("br"));
	oText.form.appendChild(document.createTextNode("Pad Spoilers: "));
	var oCheckbox = document.createElement("input");
	oCheckbox.type = "checkbox";
	oCheckbox.value = "1";
	oCheckbox.name = "spoilers-pad-opt";
	oCheckbox.checked = GM_getValue("padding", true);
	oCheckbox.addEventListener("click", function(e)
	{
		oText.focus();
	}, true);
	oText.form.appendChild(oCheckbox);
	oText.form.appendChild(document.createTextNode(' '));
	var oWarning = document.createElement("span");
	oWarning.style.color = "#FF0000";
	oWarning.innerHTML = "<b>WARNING:</b> Real spoilers must be padded!";
	oText.form.appendChild(oWarning);
	if ( document.getElementById("gamefox-quickpost-btn") )
	{
		var oQuickBtn = document.getElementById("gamefox-quickpost-btn");
		var oQuickSpoilBtn = document.createElement("input");
		oQuickSpoilBtn.type = "button"
		oQuickSpoilBtn.value = "Post Message";
		oQuickSpoilBtn.name = "spoilers-quickpost-btn";
		if ( !document.location.toString().match(/^http:\/\/www\.gamefaqs\.com\/boards\/post\.php\?board=\d.*?$/) )
		{
			oQuickSpoilBtn.tabIndex = 3;
		}
		oQuickBtn.accessKey = null;
		oQuickSpoilBtn.accessKey = 'z';
		oQuickSpoilBtn.addEventListener("click", function(e)
		{
			if ( document.getElementsByName("spoilers-pad-opt")[0].checked )
			{
				oText.value = oText.value.replace(/<spoiler>/gi, "<spoiler>" + sPadding);
				oText.value = oText.value.replace(/<\/spoiler>/gi, sPadding + "</spoiler>");
			}
			GM_setValue("padding", document.getElementsByName("spoilers-pad-opt")[0].checked);
			oQuickBtn.click();
		}, true);
		oQuickBtn.parentNode.insertBefore(oQuickSpoilBtn, oQuickBtn);
		oQuickBtn.style.display = "none";
	}
	if ( document.getElementById("gamefox-html-buttons") || document.getElementsByClassName("gamefox-html-buttons").length > 0 )
	{
		var oBar = ( ( document.getElementById("gamefox-html-buttons") ) ? document.getElementById("gamefox-html-buttons") : document.getElementsByClassName("gamefox-html-buttons")[0] );
		var oSpoilerBtn = document.createElement("input");
		oSpoilerBtn.type = "button";
		oSpoilerBtn.value = "Spoiler";
		oSpoilerBtn.name = "spoiler";
		oSpoilerBtn.tabIndex = 5;
		oSpoilerBtn.addEventListener("click", function (e)
		{
			var s = oText.value.substr(oText.selectionStart, ( oText.selectionEnd - oText.selectionStart ));
			var i = oText.selectionStart;
			oText.value = oText.value.substring(0, oText.selectionStart) + "<spoiler>" + s + "</spoiler>" + oText.value.substr(oText.selectionEnd, ( oText.selectionStart + s.length ));
			oText.focus();
			oText.setSelectionRange(( ( i + 9 ) + s.length ), ( ( i + 9 ) + s.length ));
		}, true);
		oBar.appendChild(document.createTextNode(" | "));
		oBar.appendChild(oSpoilerBtn);
	}
	oText.value = oText.value.replace(new RegExp(sPaddingReg, "gi"), '');
	oText.form.addEventListener("submit", function (e)
	{
		if ( document.getElementsByName("spoilers-pad-opt")[0].checked )
		{
			oText.value = oText.value.replace(/<spoiler>/gi, "<spoiler>" + sPadding);
			oText.value = oText.value.replace(/<\/spoiler>/gi, sPadding + "</spoiler>");
		}
		GM_setValue("padding", document.getElementsByName("spoilers-pad-opt")[0].checked);
	}, true);
}, false);