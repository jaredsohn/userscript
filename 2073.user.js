Ã¯Â»Â¿// ==UserScript==
// @name           Thai Hotmail
// @namespace      urn:rotemliss:greasmonkey:scripts:hotmailthaiencoding
// @description    Make hotmail encoding to Thai
// @include        http://by*fd.bay*.hotmail.msn.com/cgi-bin/HoTMaiL*
// @include        http://by*fd.bay*.hotmail.msn.com/cgi-bin/getmsg*
// @include        http://by*fd.bay*.hotmail.msn.com/cgi-bin/compose*
// @include        http://by*fd.bay*.hotmail.msn.com/cgi-bin/hmhome*
// ==/UserScript==

(function()
{
	
	HTMLElement.prototype.fixEnglishToThai = function()
	{
		//Modify by ooooo - E-mail: stopeat@gmail.com
		//Original code by Rotem Liss and Liron Newman, http://eesh.net
		
		var html = this.innerHTML;
		html = html.replace(/ÃÂ¡/g,"Ã Â¸?");
		html = html.replace(/ÃÂ¢/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ£/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¤/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¥/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¦/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ§/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¨/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ©/g,"Ã Â¸Â");
		html = html.replace(/ÃÂª/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ«/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¬/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ­/g,"Ã Â¸?");
		html = html.replace(/ÃÂ®/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¯/g,"Ã Â¸?");
		html = html.replace(/ÃÂ°/g,"Ã Â¸?");
		html = html.replace(/ÃÂ±/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ²/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ³/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ´/g,"Ã Â¸Â");
		html = html.replace(/ÃÂµ/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¶/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ·/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¸/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¹/g,"Ã Â¸Â");
		html = html.replace(/ÃÂº/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ»/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¼/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ½/g,"Ã Â¸?");
		html = html.replace(/ÃÂ¾/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ¿/g,"Ã Â¸Â");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â ");
		html = html.replace(/Ã?/g,"Ã Â¸Â¡");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â¢");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â£");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â¤");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â¥");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â¦");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â§");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â¨");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â©");
		html = html.replace(/ÃÂ/g,"Ã Â¸Âª");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â«");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â¬");
		html = html.replace(/Ã?/g,"Ã Â¸Â­");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â®");
		html = html.replace(/ÃÂ¦/g,"Ã Â¹Â");
		html = html.replace(/Ã?/g,"Ã Â¸Â¯");
		html = html.replace(/ÃÂ§/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ­/g,"Ã Â¹?");
		html = html.replace(/ÃÂ/g,"Ã Â¸Âº");
		html = html.replace(/Ã?/g,"Ã Â¸Â°");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â±");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â²");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â³");
		html = html.replace(/ÃÂ¥/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â´");
		html = html.replace(/ÃÂ/g,"Ã Â¸Âµ");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â¶");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â·");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â¸");
		html = html.replace(/ÃÂ/g,"Ã Â¸Â¹");
		html = html.replace(/ÃÂ /g,"Ã Â¹Â");
		html = html.replace(/ÃÂ¡/g,"Ã Â¹?");
		html = html.replace(/ÃÂ¢/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ¤/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ£/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ¨/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ©/g,"Ã Â¹Â");
		html = html.replace(/ÃÂª/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ«/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ¬/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ°/g,"Ã Â¹?");
		html = html.replace(/ÃÂ±/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ²/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ³/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ´/g,"Ã Â¹Â");
		html = html.replace(/ÃÂµ/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ¶/g,"Ã Â¹ÂÃ Â¹Â");
		html = html.replace(/ÃÂ·/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ¸/g,"Ã Â¹Â");
		html = html.replace(/ÃÂ¹/g,"Ã Â¹Â");
		this.innerHTML = html;
	}
	
	function fixThaiToEnglish()
	{
		//Modify by ooooo - E-mail: stopeat@gmail.com
		//Original code by Rotem Liss and Liron Newman, http://eesh.net
		
		var html = this.value;
		html = html.replace(/Ã Â¸?/g,"ÃÂ¡");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¢");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ£");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¤");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¥");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¦");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ§");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¨");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ©");
		html = html.replace(/Ã Â¸Â/g,"ÃÂª");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ«");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¬");
		html = html.replace(/Ã Â¸?/g,"ÃÂ­");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ®");
		html = html.replace(/Ã Â¸?/g,"ÃÂ¯");
		html = html.replace(/Ã Â¸?/g,"ÃÂ°");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ±");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ²");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ³");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ´");
		html = html.replace(/Ã Â¸Â/g,"ÃÂµ");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¶");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ·");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¸");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¹");
		html = html.replace(/Ã Â¸Â/g,"ÃÂº");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ»");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¼");
		html = html.replace(/Ã Â¸?/g,"ÃÂ½");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¾");
		html = html.replace(/Ã Â¸Â/g,"ÃÂ¿");
		html = html.replace(/Ã Â¸Â /g,"ÃÂ");
		html = html.replace(/Ã Â¸Â¡/g,"Ã?");
		html = html.replace(/Ã Â¸Â¢/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â£/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â¤/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â¥/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â¦/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â§/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â¨/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â©/g,"ÃÂ");
		html = html.replace(/Ã Â¸Âª/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â«/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â¬/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â­/g,"Ã?");
		html = html.replace(/Ã Â¸Â®/g,"ÃÂ");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ¦");
		html = html.replace(/Ã Â¸Â¯/g,"Ã?");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ§");
		html = html.replace(/Ã Â¹?/g,"ÃÂ­");
		html = html.replace(/Ã Â¸Âº/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â°/g,"Ã?");
		html = html.replace(/Ã Â¸Â±/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â²/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â³/g,"ÃÂ");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ¥");
		html = html.replace(/Ã Â¸Â´/g,"ÃÂ");
		html = html.replace(/Ã Â¸Âµ/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â¶/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â·/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â¸/g,"ÃÂ");
		html = html.replace(/Ã Â¸Â¹/g,"ÃÂ");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ ");
		html = html.replace(/Ã Â¹?/g,"ÃÂ¡");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ¢");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ¤");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ£");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ¨");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ©");
		html = html.replace(/Ã Â¹Â/g,"ÃÂª");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ«");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ¬");
		html = html.replace(/Ã Â¹?/g,"ÃÂ°");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ±");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ²");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ³");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ´");
		html = html.replace(/Ã Â¹Â/g,"ÃÂµ");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ¶Ã Â¹Â");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ·");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ¸");
		html = html.replace(/Ã Â¹Â/g,"ÃÂ¹");
		this.value = html;
	}
	
	HTMLInputElement.prototype.fixThaiToEnglish = fixThaiToEnglish;
	HTMLTextAreaElement.prototype.fixThaiToEnglish = fixThaiToEnglish;
	
	function submitComposeForm(e) //Created by Rotem Liss
	{
		document.getElementById("alternateSubject").value = document.getElementById("subject").value;
		document.getElementById("alternateSubject").fixThaiToEnglish();
		
		document.getElementById("alternateBody").value = document.getElementById("body").value;
		document.getElementById("alternateBody").fixThaiToEnglish(); //Fix Body
	}
	
	if ((location.href.indexOf("compose") == -1) && (document.characterSet == "ISO-8859-1"))
	{
		if (document.characterSet == "ISO-8859-1")
		{
			if (document.getElementById("MsgTable"))
			{
				document.getElementById("MsgTable").fixEnglishToThai();
				document.body.childNodes[14].firstChild.firstChild.firstChild.firstChild.firstChild.
				 fixEnglishToThai();
			}
			else
			{
				document.body.fixEnglishToThai();
			}
		}
	}
	else
	{
		if (document.characterSet == "ISO-8859-1")
		{
			document.getElementById("HMTB").firstChild.childNodes[1].firstChild.firstChild.firstChild.
			 firstChild.childNodes[1].addEventListener("mousedown", submitComposeForm, true);
			
			var alternateSubject = document.getElementById("subject").cloneNode(true);
			alternateSubject.type = "hidden";
			alternateSubject.id = "alternateSubject";
			alternateSubject.name = "subject";
			document.forms["composeform"].appendChild(alternateSubject);
			document.getElementById("subject").name = "";
			
			//Find body
			var textareas = document.getElementsByTagName("textarea");
			var i;
			for (i = 1; (i <= textareas.length); i++)
			{
				if (textareas[i - 1].name == "body")
				{
					textareas[i - 1].id = "body";
					break;
				}
			}
			
			var alternateBody = document.getElementById("body").cloneNode(true);
			alternateBody.style.display = "none";
			alternateBody.id = "alternateBody";
			alternateBody.name = "body";
			document.forms["composeform"].appendChild(alternateBody);
			document.getElementById("body").name = "";
		
		}
	}
})();

