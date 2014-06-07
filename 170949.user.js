// ==UserScript==
// @name        Fix "help" link with conf icon for username
// @namespace   http://userscripts.org/users/69817
// @include     http://wiki.ubuntu-br.org/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

anchor = $('#username li').get()[1].firstChild;

user = anchor.text;

icon = 'http://kobo.intelliresponse.com/uploads/Apple/settings.png';

tag = '<img src="'+icon+'" title="Configurações de '+user+'"/>';

anchor.innerHTML = tag;

anchor.parentNode.style.padding = '0px';
anchor.parentNode.style.height = '100%';

/*

<ul id="username">
<li><a href="/FrontPage">Ubuntu Brazil</a></li>
<li><a href="?action=userprefs">alexandre-mbm</a></li>
<li><a href="?action=logout&amp;logout=logout">Sair</a></li>
<li><a href="/Conte%C3%BAdoDaAjuda">Help</a></li>
</ul>

*/

anchor = $('#username li').get()[0].firstChild;

icon = 'http://brianpatrickkelly.com/images/icon_home.png';

tag = '<img src="'+icon+'" title="Página Inicial"/>';

anchor.innerHTML = tag;

anchor.parentNode.style.padding = '0px';
anchor.parentNode.style.height = '100%';
