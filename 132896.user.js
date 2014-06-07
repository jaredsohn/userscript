// ==UserScript==
// @name           Onirovéritécie
// @description    Nous naissons tous égaux mais malheureusement certains développent vite des goûts de chiottes, nous devons nous prémunir.
// @include        http://www.rpg-maker.fr/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @namespace	   http://userscripts.org/users/349422
// @grant          none
// @version        1.0
// ==/UserScript==

var ids = [20002, 9843, 4, 13549, 3632, 16718, 13156, 21400];
var messages = [
"<br/>Par contre on m'a toujours dit que j'avais mauvais goûts dans ce domaine donc bon.",
"<br/>Toutefois dois-je vous rappeler que je dis dlm ?",
"<br/>Diseur de merde depuis 1728.",
"<br/>Après faut pas oublier que j'ai de sacrés goûts de chiottes.",
"<br/>Haha lol caca. <img src='smileys/feu.gif'/>",
"<br/>M'enfin mon avis inférieur ne mérite pas votre attention.",
"<br/>Dites donc ? C'est-y pas moi qui viens de dire de la grosse merde ?",
"<br/>Cependant je dois avouer que ça fait trois jours que j'ai pas chié et que je viens de tout lâcher dans ce message.",
"<br/>N'écoutez pas ce que je dis c'est une perte de temps. :)",
"<br/>Mais mes goûts sont à jeter aux toilettes, n'en tenez pas compte."
];
$("table.tableposts").each(function() {
	if($(this).find("td.postshaut > div.margecinqc > a").attr("href").match(/(\d+)$/) && $.inArray(parseInt(RegExp.$1), ids) != -1) {
		$(this).find("td.postsmilieu > p:last-child").append(messages[Math.floor(Math.random() * messages.length)]);
	}
});