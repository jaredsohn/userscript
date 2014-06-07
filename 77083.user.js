// ==UserScript==
// @name   Bumrise Underground Donate Link
// @include   *bumrise.com/overview/*
// @include   *pennergame.de/overview/*
// @include   *clodogame.fr/overview/*
// @include   *dossergame.com/overview/*
// @include   *faveladogame.com.br/overview/*
// ==/UserScript==


var where = document.getElementsByClassName('icon ')[0];
var donate = document.getElementsByClassName('link')[0].value;
var url = '<a href = "http://www.bumrise.info/index.php?go=donate&url='+donate+'" target="_blank"><img src="http://www.bumrise.info/images/money.png" alt="Donate" title="" width="24" height="24"/><strong>&nbsp;</strong></a>';

var mydiv = document.createElement('li');
mydiv.innerHTML = url;

where.parentNode.insertBefore(mydiv, where.nextSibling);