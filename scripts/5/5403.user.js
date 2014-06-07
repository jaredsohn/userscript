// ==UserScript==
// @name            CHAT-MMOCentral
// @include         *http://forum.mmocentral.com.br/* 
// @include         http://gabbly.com/http://forum.mmocentral.com.br/*
// @description    Link para o Chat-Os
// ==/UserScript==
// Autor: Marcelo - Nkr
	
	var temp=document.createElement("script");
	temp.text = "JSFX.Rollover(\"chatMMO\",    \"http://img73.imageshack.us/img73/7180/chatoverme1.gif\");";

	var newdiv = document.createElement('div');
	newdiv.innerHTML = '<table width="78"  border="0" cellpadding="0" cellspacing="0"><tr><td style="background:#FFFFFF url(http://img109.imageshack.us/img109/264/chatef1.gif);"><a href="http://gabbly.com/http://forum.mmocentral.com.br/index.php" accesskey="5" onmouseover="JSFX.fadeIn(\'chatMMO\')" onmouseout="JSFX.fadeOut(\'chatMMO\')"><img src="http://img109.imageshack.us/img109/264/chatef1.gif" name="chatMMO"  width="78" height="39" border="0" class="imgFader" id="chatMMO" alt="" /></a></td></tr></table>';
	newdiv.appendChild(temp);

	var primeiroTd=document.createElement("td");
	primeiroTd.setAttribute("width","78");
	primeiroTd.appendChild(newdiv);
	

	insertLink();
	
	//var mlink = document.getElementById("mmolink");
	//var mimg = document.getElementById("mmochat");	
	//mlink.onmouseover = new Function('mimg.src = \'http://img73.imageshack.us/img73/7180/chatoverme1.gif\';');
	//mlink.onmouseout = new Function('mimg.src = \'http://img109.imageshack.us/img109/264/chatef1.gif\';');	
	
	function insertLink()
	{
		var img=document.getElementById("search");	

		var theTd=img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

		theTd.parentNode.insertBefore(primeiroTd,theTd);				
	
	}	
		
 