// ==UserScript==
// @name           [ RH + ] Radio Hunter ᴾˡᵘˢ
// @namespace      Brenno Lopes
// @include        *.orkut.tld/Home?rl=t
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// @require        http://userscripts.org/scripts/source/62957.user.js
// ==/UserScript==

setInterval(function(){
	Orkut.Community.Forum.Topic.Message.insert({
	"parameters" : {
		"commId" : "117249465",
		"topicId" : "5641622036729445585",
		// "subjectText" : "...",
		"bodyText" : "[b]Locutor[b] '[red]NO AR[/red]' na Radio Hunter ᴾˡᵘˢ !!!\n\n\n\n"+Math.floor(Math.random()*91839067),
	},
	"callback" : function(params)
	{
		// ...
	}
});
}, 600000);