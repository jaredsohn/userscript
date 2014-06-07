// ==UserScript==
// @name   Pool
// @include   *bumrise.com/overview/*
// @include   *pennergame.de/overview/*
// @include   *clodogame.fr/overview/*
// @include   *dossergame.com/overview/*
// @include   *faveladogame.com.br/overview/*
// @include   *mendigogame.es/overview/*
// ==/UserScript==

var poll_where = document.getElementsByClassName('zleft')[1];

var poll_link = '<a href="http://www.bumrise.info/index.php?go=polls" target="_blank"><img src="http://www.bumrise.info/images/poll_head.png" alt="Create your own BBcode poll" title="Create your own BBcode poll" width="50" height="50"/></a><a href="http://www.bumrise.info/index.php?go=donate" target="_blank"><img src="http://www.bumrise.info/images/money.png" alt="Underground Donate" title="Underground Donate" width="50" height="50"/></a>';

var mydiv = document.createElement('p');
mydiv.innerHTML = poll_link;

poll_where.parentNode.insertBefore(mydiv, poll_where.nextSibling);
