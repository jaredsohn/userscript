// ==UserScript==
// @name        EI Add-on
// @namespace   eiaddon
// @description Migliora alcune funzionalità su EragonItalia.it
// @include     http://www.eragonitalia.it/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     1
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function risposta_rapida(tid) {
$('table.forumline').after('<form action="forum-posting.html" target="ifjq" method="post" name="post"><table border="0" cellpadding="3" cellspacing="1" width="100%" class="forumline"><tr><th class="thHead" height="17"><a name="risposta_rapida"></a><b>Risposta rapida</b></th></tr><tr><td class="row1" align="center"><textarea name="message" style="width:80%;height:250px;padding:3px;font-size:120%" class="post"></textarea></td></tr><tr><td class="row1" align="center" height="28"><input type="hidden" name="mode" value="reply"><input type="hidden" name="t" value="'+tid+'"><input type="submit" name="post" class="mainoption" value="Invia messaggio" onclick="this.form.post.value=\'Attendi mentre viene caricata la pagina...\';setTimeout(\'location.reload()\',1000);"><iframe name="ifjq" src="" style="height:0;width:0;visibility:hidden"></iframe></td></tr></table></form>');
setTimeout("document.post.message.focus()",300);
}

$(document).ready(function() {
// Topics
if((ind=document.URL.match(/post[a-z]+[0-9]+/i))&&(tid=ind[0].match(/[0-9]+/))) {
	// - Risposta rapida
	$('a[href*="watch"]').replaceWith('<div style="display:inline;margin-right:20px"><a href="#risposta_rapida" id="rr'+tid[0]+'" style="font-size:120%;font-weight:bold;color:#F00">Risposta rapida</a></div>');
	document.getElementById('rr'+tid[0]).addEventListener("click",function(){risposta_rapida(tid[0])},false);
	// - Move mod topic options
	if ((mod=$('a[href*="file=modcp"], a[href*="forumsmerge-t"]'))&&mod.length==5) {
	$('<tr><td style="border:2px solid rgb(72,49,10);padding-left:8px" bgcolor=e3c38d class=mll id=newlinessm>').appendTo('#ssm table');
	mod.clone().appendTo($("#newlinessm"));	
	// - Lock: quick send with iframe
	$('#ssm a[href*="lock"]').attr('id','idlock');
	lockhref=$('#idlock').attr('href');
	$('#idlock').attr('href','javascript:return false;');
	$('body div:last-child').after('<iframe id="modjq" src="" style="height:0;width:0;visibility:hidden"></iframe>');
	document.getElementById('idlock').addEventListener("click",function(){document.getElementById("modjq").src=lockhref;$('#idlock').html('Attendi mentre viene caricata la pagina...');setTimeout('location.reload()',1000)},false);
	}
}

// Move link mod panel to ssm
if ((mod=$('a[href*="forumsmodcp-f"]'))&&mod.length==1) {
	$('<tr><td style="border:2px solid rgb(72,49,10);padding-left:8px;" bgcolor=e3c38d class=mll id=newlinessm><span></span>').appendTo('#ssm table');
	mod.clone().replaceAll($("#newlinessm span"));
	$('#newlinessm a').html('<b>• Modera sezione</b>');
}

// Mod panel
if (((ind=document.URL.match(/forumsmodcp-f-[0-9]+/i))||(ind=document.URL.match(/file=modcp&f=[0-9]+/i)))&&(fid=ind[0].match(/[0-9]+/))) {
	// Select all
	$('input[value="Ri-apri"]').after('&nbsp;<input type="button" class="liteoption" value="Seleziona tutti" id="selectall">');
	document.getElementById('selectall').addEventListener("click",function(){$(':checkbox').attr('checked','checked')},false);
	// Skip pages
	nrpag=$('a[href*="start="]').eq(-3).attr('href').match(/[0-9]+$/)[0]/50;
	tot='';
	for(i=0;i<=nrpag;i++) tot+='<a href="http://www.eragonitalia.it/modules.php?name=Forums&file=modcp&f='+fid[0]+'&start='+i*50+'">'+eval(i+1)+'</a>, ';
	$('#selectall').after('<p><b>Vai alla pagina: '+tot+'</b></p>');
}
 
// No shadow topic when you move one
if(document.URL.match(/mode=move/i)) $(':checkbox').removeAttr('checked');
});