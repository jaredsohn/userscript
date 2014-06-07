// ==UserScript==
// @name	Ultibot's /idleoff Re-implementer
// @description	Re-implements the /idleoff command to prevent you from going /afk
// @namespace	http://ultimater.net/kol/public/namespaces/idleoffreimplementer
// @author	"Ultibot"<Ultimater at gmail dot com>
// @include	*kingdomofloathing.com/lchat.php
// @include	http://127.0.0.1:*/lchat.php
// @include	http://localhost:*/lchat.php
// @license	GNU-GPL http://www.gnu.org/licenses/gpl.html
// @version 	1.0
// ==/UserScript==

with(unsafeWindow){
submitchat=function(override)
{
	bicycles = 0;
	var justrestarted = false;
	if (paused) { 
		justrestarted = true;
		restartchat();
	}

	if (override)
		var postedgraf = override;
	else
		var postedgraf=document.chatform.graf.value;

	document.chatform.graf.value="";
	document.chatform.graf.focus();

	chistory.unshift(postedgraf);
	if (chistory.length > CHMAX) { chistory.pop(); }
	chpointer = -1;
	chcurrent = null;

	if (postedgraf == "/afk" || postedgraf == "/away")
	{
		if (!paused && !justrestarted) {
			document.getElementById("ChatWindow").innerHTML+="<font color=green>You are now in away mode, chat will update more slowly until you say something or <a href=\"javascript:restartchat();\">click Here</a> to mark yourself as active.</font><br>";
			paused=1;
		}
		postedgraf = "";
		document.chatform.graf.value="";
		document.chatform.graf.focus();
	}
	else if (postedgraf == "/clear" || postedgraf == "/cls")
	{
		document.getElementById("ChatWindow").innerHTML = "";
		postedgraf = "";
		document.chatform.graf.value="";
		document.chatform.graf.focus();
	}
	else if (postedgraf == "/help" || postedgraf == "/?")
	{
		//document.getElementById("ChatWindow").innerHTML = "";
		postedgraf = "";
		document.chatform.graf.value="";
		document.chatform.graf.focus();
		window.open("doc.php?topic=chat_commands","","height=400,width=500,scrollbars=yes,resizable=yes");
	}
	else if (postedgraf == "/mark")
	{
		//document.getElementById("ChatWindow").innerHTML += "<hr width=90%>";
		var d = new Date();
		document.getElementById("ChatWindow").innerHTML += "<center class=tiny>&mdash;&mdash;&mdash;&nbsp;" + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()) + "&nbsp;&mdash;&mdash;&mdash;</center>";
		postedgraf = "";
		document.chatform.graf.value="";
		document.chatform.graf.focus();
		document.getElementById("ChatWindow").scrollTop+=400;
	}
	else if (postedgraf == "/idleoff")
	{
		document.getElementById("ChatWindow").innerHTML += '<font color=green>Idle turned off.</font><br>';
		bicycles=0;
		try{setInterval('bicycles=0',60000);}catch(E){}
		postedgraf = "";
		document.chatform.graf.value="";
		document.chatform.graf.focus();
		document.getElementById("ChatWindow").scrollTop+=400;
	}

	if (postedgraf)
	{
		postedgraf=URLEncode(postedgraf);
		var url = "http://"+window.location.host+"/submitnewchat.php?playerid="+playerid+"&pwd="+pwdhash+"&graf="+postedgraf;
		$.get(url, function (resp) {
			document.getElementById("ChatWindow").innerHTML+=(resp);
			jstest = /<!--js\((.+?)\)-->/g;
			while (ev = jstest.exec(resp)) {
				var cmd = ev[1];
				if (cmd.indexOf('dojax') == -1) cmd += ';setTimeout(nextAction,3000)';
				todo.push(cmd);
			}
			nextAction();

			document.getElementById("ChatWindow").scrollTop+=600;
			document.chatform.graf.focus();
		});
	}
	return false;
};
}