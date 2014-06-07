// ==UserScript==
// @name           Slashdot - Remove Title Prefix
// @namespace	   http://userscripts.org/users/69620
// @description    Removes "Slashdot ***** Story| " prefixes from tab title
// @include        http://*slashdot.org/*
// ==/UserScript==

document.title = document.title.replace('Slashdot | ', '')
document.title = document.title.replace('Slashdot Apple Story | ', '')
document.title = document.title.replace('Slashdot Ask Slashdot Story | ', '')
document.title = document.title.replace('Slashdot Book Reviews Story | ', '')
document.title = document.title.replace('Slashdot Developers Story | ', '')
document.title = document.title.replace('Slashdot Entertainment Story | ', '')
document.title = document.title.replace('Slashdot Games Story | ', '')
document.title = document.title.replace('Slashdot Hardware Story | ', '')
document.title = document.title.replace('Slashdot Idle Story | ', '')
document.title = document.title.replace('Slashdot Interviews Story | ', '')
document.title = document.title.replace('Slashdot IT Story | ', '')
document.title = document.title.replace('Slashdot Linux Story | ', '')
document.title = document.title.replace('Slashdot Mobile Story | ', '')
document.title = document.title.replace('Slashdot News Story | ', '')
document.title = document.title.replace('Slashdot Politics Story | ', '')
document.title = document.title.replace('Slashdot Science Story | ', '')
document.title = document.title.replace('Slashdot Search Story | ', '')
document.title = document.title.replace('Slashdot Story | ', '')
document.title = document.title.replace('Slashdot Technology Story | ', '')
document.title = document.title.replace('Slashdot Your Rights Online Story | ', '')