// ==UserScript==
// @name          Uncensored15-18
// @namespace     http://findme.eu5.org/
// @description   Merci à -KebabFrites- pour la création du script.
// @include       http://www.jeuxvideo.com/forums/0-50*
// @version       1.0
// @author        -KebabFrites-
// ==/UserScript==
 
var topiclist=document.getElementsByClassName('navig_pages topics')[1];
if(navigator.userAgent.toLowerCase().indexOf('firefox')>-1) {
	var iH=278
} else {
	var iH=268
}
topiclist.innerHTML+='<table id="uncensored" style="width:100%;border-spacing: 0px;"><tr><td><IFRAME style="margin-top:10px;" src="http://findme.eu5.org/forum-1-1.html" WIDTH="100%" HEIGHT="'+iH+'" Scrolling="yes" frameborder=0 >T\'as un navigateur de merde, d괯l鮠:noel:</IFRAME></td></tr></table>';
var checkifdeco=document.getElementById('login_pass');
if(checkifdeco) {
	var isdeco=true
} else {
	var isdeco=false
}
var switcher=document.getElementsByClassName('bloc_forum')[1];
switcher.getElementsByTagName('h3')[0].innerHTML+='<div id="cMode" style="float:right;margin-right:-10px;"><span id="switcherbtn" title="Clique ici pour passer en mode Uncensored 15-18">Mode Normal</span></div>';
document.getElementById('switcherbtn').style.cursor="pointer";
document.getElementById('post').innerHTML+='<input type="hidden" name="mode" value="newtopic">';
document.getElementById('switcherbtn').onclick=function() {
	var cC=document.getElementById('switcherbtn').innerHTML;
	if(cC=="Mode Normal") {
		document.getElementById('post').action="http://findme.eu5.org/forum-1-1.html";
		document.getElementById('switcherbtn').innerHTML="Mode Uncensored";
		document.getElementById('switcherbtn').title="Clique ici pour passer en mode Normal";
		document.getElementById('switcherbtn').style.color="red";
		if(isdeco==false) {
			document.getElementsByClassName('pseudo_uncensored')[0].style.display="list-item";
			document.getElementsByClassName('pseudo_uncensored')[1].style.display="list-item";
			document.getElementsByClassName('pseudo_normal')[0].style.display="none";
			document.getElementsByClassName('pseudo_normal')[1].style.display="none"
		} else {
			document.getElementsByClassName('password')[0].style.display="none";
			document.getElementsByClassName('retenir_id')[0].style.display="none";
			document.getElementById('mdpasse').value="ONCHE";
			document.getElementById('login_pass').getElementsByTagName('a')[0].style.display="none"
		}
	} else {
		document.getElementById('post').action="http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi";
		document.getElementById('switcherbtn').innerHTML="Mode Normal";document.getElementById('switcherbtn').title="Clique ici pour passer en mode Uncensored 15-18";
		document.getElementById('switcherbtn').style.color="white";
		if(isdeco==false) {
			document.getElementsByClassName('pseudo_uncensored')[0].style.display="none";
			document.getElementsByClassName('pseudo_uncensored')[1].style.display="none";
			document.getElementsByClassName('pseudo_normal')[0].style.display="list-item";
			document.getElementsByClassName('pseudo_normal')[1].style.display="list-item"
		} else {
			document.getElementsByClassName('password')[0].style.display="block";
			document.getElementsByClassName('retenir_id')[0].style.display="block";
			document.getElementById('mdpasse').value="";
			document.getElementById('login_pass').getElementsByTagName('a')[0].style.display="inline"
		}
	}
};
if(isdeco==false) {
	document.getElementsByClassName('login_memo')[0].getElementsByTagName('li')[0].className="pseudo_normal";
	var cP=document.getElementsByClassName('login_memo')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0].innerHTML;document.getElementsByClassName('login_memo')[0].getElementsByTagName('li')[1].className="pseudo_normal";
	document.getElementsByClassName('login_memo')[0].getElementsByTagName('ul')[0].innerHTML+='<li style="display:none;" class="pseudo_uncensored"><input type="radio" style="margin:0px 0px 0px -23px;position:absolute;" name="useid" value="1" checked><a href="http://www.jeuxvideo.com/moncompte/moncompte.php?oper=5&amp;pseudo='+cP+'" onmouseover="window.status=\'Cliquez ici pour modifier votre profil.\';return true" target="_blank">'+cP+'</a></li>';document.getElementsByClassName('login_memo')[0].getElementsByTagName('ul')[0].innerHTML+='<li style="display:none;" class="pseudo_uncensored"><input type="radio" style="margin:0px 0px 0px -23px;position:absolute;" name="useid" value="2">Anonymous</li>'
}