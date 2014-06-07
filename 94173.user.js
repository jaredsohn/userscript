// ==UserScript==
// @name           Szybka odp.
// @namespace      http://darkwarez.pl
// @include        http://darkwarez.pl/forum/*
// ==/UserScript==

 	if(/viewtopic\.php/.test(window.location))
{
	var elements = document.getElementsByName('search_topic');
	var topicid = elements[0].value;

	var elements = document.getElementsByTagName("td");
	for(i=0;i<elements.length;i++)
	{
		if(elements[i].className == "catBottom") {var targetd = elements[i].parentNode;break;}
	}
	
	var elements = document.getElementsByTagName("img");
	for(i=0;i<elements.length;i++)
	{
		if(elements[i].alt == "Odpowiedz do tematu") {var open = 1;break;}
	}

	var elements = document.getElementsByTagName("a");
	for(i=0;i<elements.length;i++)
	{
		if(/logout/.test(elements[i].href) ) {arr = elements[i].href.split(/sid=/);sid=arr[1];break;}
	}

	if(topicid && targetd && sid && open)
	{
		var td = document.createElement("td");
		td.setAttribute("colspan","2");
		td.setAttribute("style","padding:0");
		td.className = "row2";
		td.innerHTML = '<form action="posting.php" method="post" name="post" style="margin-bottom:0"><table width="100%" cellspacing="1" cellpadding="3" border="0"><th colspan="2">Szybka odpowiedź</th><tr><td width="150" id="emotki" align="center"><table width="100" cellspacing="0" cellpadding="5" border="0"><tbody><tr align="center"> <td class="gensmall" colspan="4"><b>Emotikony</b></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :D \';txtarea.focus();" name="emotka"><img border="0" title="" alt="" src="images/smiles/big_smile.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :) \';txtarea.focus();" name="emotka"><img border="0" title="Smile" alt="Smile" src="images/smiles/smile.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :( \';txtarea.focus();" name="emotka"><img border="0" title="Sad" alt="Sad" src="images/smiles/sad.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :o \';txtarea.focus();" name="emotka"><img border="0" title="Surprised" alt="Surprised" src="images/smiles/yikes.png"/></a></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' 8) \';txtarea.focus();" name="emotka"><img border="0" title="Cool" alt="Cool" src="images/smiles/cool.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :lol: \';txtarea.focus();" name="emotka"><img border="0" title="Laughing" alt="Laughing" src="images/smiles/lol.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :x \';txtarea.focus();" name="emotka"><img border="0" title="Mad" alt="Mad" src="images/smiles/mad.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :P \';txtarea.focus();" name="emotka"><img border="0" title="Razz" alt="Razz" src="images/smiles/tongue.png"/></a></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :oops: \';txtarea.focus();" name="emotka"><img border="0" title="Embarassed" alt="Embarassed" src="images/smiles/icon_redface.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :cry: \';txtarea.focus();" name="emotka"><img border="0" title="Crying or Very sad" alt="Crying or Very sad" src="images/smiles/icon_cry.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :evil: \';txtarea.focus();" name="emotka"><img border="0" title="Evil or Very Mad" alt="Evil or Very Mad" src="images/smiles/icon_evil.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :twisted: \';txtarea.focus();" name="emotka"><img border="0" title="Twisted Evil" alt="Twisted Evil" src="images/smiles/icon_twisted.gif"/></a></td></tr><tr valign="middle" align="center"><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :roll: \';txtarea.focus();" name="emotka"><img border="0" title="Rolling Eyes" alt="Rolling Eyes" src="images/smiles/roll.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :wink: \';txtarea.focus();" name="emotka"><img border="0" title="Wink" alt="Wink" src="images/smiles/wink.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :| \';txtarea.focus();" name="emotka"><img border="0" title="Neutral" alt="Neutral" src="images/smiles/neutral.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :mrgreen: \';txtarea.focus();" name="emotka"><img border="0" title="Mr. Green" alt="Mr. Green" src="images/smiles/icon_mrgreen.gif"/</a></td></tr></tbody></table></td><td id="poletxt"><textarea class="post" tabindex="3" style="width: 100%;background-color:#0c0c0c;" wrap="virtual" rows="10" name="message" id="message"/></textarea></td></tr><tr><td style="padding:0"></td><td style="padding:0" id="opcje"><table width="100%"><tr><td><input type="checkbox" name="disable_bbcode"/> <span class="gen">Wyłącz BBCode</span> <input type="checkbox" name="disable_smilies"/> <span class="gen">Wyłącz Uśmieszki</span> <input type="checkbox" checked="checked" name="attach_sig"/> <span class="gen">Dodaj podpis</span></td><td align="right"><input type="hidden" name="mode" value="reply" /><input type="hidden" name="sid" value="'+sid+'" /><input type="hidden" name="t" value="'+topicid+'" /><input type="submit" accesskey="s" tabindex="5" name="post" class="mainoption" value="Wyślij" id="post" /></td></tr></table></td></tr></table></form>';
		var tr = document.createElement("tr");
		tr.appendChild(td);
		targetd.parentNode.insertBefore(tr, targetd.nextSibling);
		//targetd.parentNode.removeChild(targetd);
	}
}
