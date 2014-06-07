// ==UserScript==
// @name           Post v2
// @namespace      Post v2
// @include        http://s*.gladiatus.fr/game/index.php?mod=overview&sh=*
// ==/UserScript==

function $(d) { return document.getElementById(d); }
GM_xmlhttpRequest({
	method: "post",
	url: "http://s*.gladiatus.fr/game/index.php?mod=guild_main&submod=admin_mail&sh=*",
	headers: { "Content-type" : "application/x-www-form-urlencoded" },
	data: encodeURI("Gladiatus=*"+$("Gladiatus").value+"&playerName=*"+$("playername").value+"&simstats=*"+$("simstats").value+"&guildName=*"+$("GuildName").value+"&message=Test"+$("message").value+"&sendmails=Envoyer"+$("sendmails").value);
	onload: function(e) { alert(e.responseText); }
});