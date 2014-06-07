// ==UserScript==
// @name           Demotywatory / mistrzowie / komixxy / ... - MasterPassword hack
// @description    Usunięcie pytania o masterpassword gdy jesteśmy już zalogowani na tych stronach
// @include        http://demotywatory.pl/*
// @include        http://mistrzowie.org/*
// @include        http://komixxy.pl/*
// @include        http://studentpotrafi.pl/*
// @include        http://piekielni.pl/*
// @include        http://atakklonow.pl/*
// @include        http://dawniejdzisiaj.pl/*
// @include        http://rodzynki.net/*
// @include        http://wezsietato.pl/*
// @include        http://kotburger.pl/*
// @include        http://wyciagamykarteczki.pl/*
// @include        http://analizersi.pl/*
// ==/UserScript==

if((u=unsafeWindow).logged_in)u.$('input[type=password]').remove();