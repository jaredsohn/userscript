// ==UserScript==
// @name           ljr disable comment
// @namespace      http://userscripts.org/users/48278
// @description    Отключает ссылку leave comment некоторых пользователей LJR
// @include        http://lj.rossia.org/users/*
// ==/UserScript==

var links=document.getElementsByTagName('a');
//for (var i = 0; i < 9; ++i)
for (var i = 0; i < links.length; ++i)
	if (links[i].innerHTML == "Leave a comment" && ShouldNotComment(links[i]))
		links[i].innerHTML = "<b> ЭТОГО НЕ КОММЕНТИТЬ </b>";

function ShouldNotComment (node) {
	var n = node.parentNode;
	var s = n.innerHTML;
	//alert (s.split('/'));
	var user = s.split('/')[4];
	//alert (user);
	//alert (UserBlocked(user));
	return UserBlocked(user);
}

function UserBlocked (user) {
	var blocks = {
'936' : true,
'a_borealis' : true,
'aantonov' : true,
'aenocyon' : true,
'aghast' : true,
'alt' : true,
'ammutbite' : true,
'andy_veksler' : true,
'arsenikum' : true,
'asterius' : true,
'barsilisa' : true,
'bobus' : true,
'bog_god' : true,
'boza' : true,
'brooklyn' : true,
'burunduk_' : true,
'cden' : true,
'climber' : true,
'contrinitiator' : true,
'dizorder' : true,
'dmitri_pavlov' : true,
'do_' : true,
'emmerdator' : true,
'flyingdutch' : true,
'freir' : true,
'fromnorth' : true,
'gerzog' : true,
'grushevsky' : true,
'klyuev' : true,
'koenig' : true,
'kot_ucheniy' : true,
'kroopkin' : true,
'lawal' : true,
'lenkasm' : true,
'levsha' : true,
'lqp' : true,
'madarka' : true,
'man_with_dogs' : true,
'master' : true,
'mia' : true,
'moher' : true,
'polter' : true,
'pornograf' : true,
'ppkk' : true,
'priest_dimitriy' : true,
'probegi' : true,
'proceedings' : true,
'prodigy' : true,
'qvies' : true,
'rahenna' : true,
'rromanov' : true,
'serge_lemon' : true,
'seroe_ozero' : true,
'smelding' : true,
'tais' : true,
'ttnl' : true,
'unbehagen' : true,
'urban_psyhotrop' : true,
'urbanaztec' : true,
'vilanin' : true,
'virh' : true,
'whitesun' : true,
'yjy' : true,
'z' : true,  
	};
	return blocks[user];
}