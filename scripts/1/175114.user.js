// ==UserScript==
// @name           Soccerway - change left items' block
// @namespace      XXN
// @description    add link for moldovan championship
// @include        *soccerway*
// @version        5
// ==/UserScript==

// V.1 , cu Jquery
var $ = unsafeWindow.jQuery;
$('#page_home_1_block_home_competitions_2-results').prepend('<li><a class="flag_16 left_16 moldova_16_left" href="/national/moldova/divizia-naional/20122013/regular-season/r18672/?ICID=SN_02_124">Moldova</a></li>');

/* V.2 , JS pur, prea mult cod))

var e = document.createElement('a');
	e.href = '/national/moldova/divizia-naional/20132014/regular-season/r21678/';
	e.class = 'flag_16 left_16 moldova_16_left';
	e.appendChild(document.createTextNode('MDVA'));
	
var o = document.getElementById('page_home_1_block_home_competitions_2-results');
	o.insertBefore(e, o.firstChild);
	*/


/* V.3 , dezactivat , JS pur , adauga la sfarsit

document.getElementById("page_home_1_block_home_competitions_2-results").innerHTML+='\
<li><a class="flag_16 left_16 moldova_16_left" href="/national/moldova/divizia-naional/20132014/regular-season/r21678/"> mdaaa</a></li>';
*/
