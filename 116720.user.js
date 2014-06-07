// ==UserScript==
// @name          XBW Quick Embed
// @description   Embed youtube links automatisch in quickreply veld, in het Wat luister je nu? en Funny filmpjes topic.
// @include       http://forum.xboxworld.nl/showthread.php?t=*
// @match 	  http://forum.xboxworld.nl/showthread.php?t=*
// ==/UserScript==

function useInTopic()
{
	if(document.title.indexOf("Wat luister je nu") != -1)
	{
		return true;
	}
	else if(document.title.indexOf("Funny Filmpjes") != -1)
	{
		return true;
	}
	return false;
}

if(useInTopic())
{
	messageBox = document.getElementById("vB_Editor_QR_textarea");
	messageBox.addEventListener("change", addYtTags, false);
	messageBox.addEventListener("focus", addYtTags, false);
	messageBox.addEventListener("keydown", addYtTags, false);
	messageBox.addEventListener("keyup", addYtTags, false);
	messageBox.addEventListener("click", addYtTags, false);
	messageBox.addEventListener("blur", addYtTags, false);

	var fieldset = document.getElementById("qrform").getElementsByTagName("fieldset")[1];
	var optionDiv = fieldset.getElementsByTagName("div")[0];
	var optionLabel = document.createElement("label");
	    optionLabel.htmlFor = "auto_embed";
	var optionInput = document.createElement("input");
	    optionInput.type = "checkbox";
	    optionInput.id = "auto_embed";
	optionLabel.appendChild(optionInput);
	optionLabel.innerHTML += "Embed youtube links automatisch";
	optionDiv.appendChild(optionLabel);
	document.getElementById("auto_embed").checked = true;
	document.getElementById("auto_embed").addEventListener("click", addYtTags, false);
}

function addYtTags()
{
	if(document.getElementById("auto_embed").checked)
	{
		messageBox.value = messageBox.value.replace(/http\:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9\-_]{11})(&[a-zA-Z0-9-_&%=]*)?/g,"[yt]$1[/yt]");
	}
}

