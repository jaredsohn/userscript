// ==UserScript==
// @name                Userscript Author ID
// @namespace    forsureitsme@gmail.com
// @version            1.0
// @description    Show the author's ID when browsing through script pages
// @match              http://userscripts.org/scripts*
// @match              https://userscripts.org/scripts*
// @copyright       2013, Pedro Cardoso da Silva
// @require            http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$author = $('.author').children('a');
if($author.length > 0)
{
    $id = $author.attr('user_id');
	$('.author').children('a').after('('+$id+')');
}