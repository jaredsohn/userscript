// ==UserScript==
// @name	klavogonki: hide_accaunt
// @namespace	klavogonki
// @include	http://klavogonki.ru*
// @author	Fenex
// @version     1.0
// @icon        http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
document.getElementsByTagName('body')[0].getElementsByTagName('div')[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[6].innerHTML='';//hide all block
document.getElementsByTagName('body')[0].getElementsByTagName('div')[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[6].getElementsByTagName('a')[1].innerHTML=''; //hide bottom of block