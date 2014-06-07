// ==UserScript==
// @name           travian/simple aliance control
// @author         Paweenruk
// @namespace      http://userscripts.org/
// @description    raising for alliance menu 
// @include        http://s*.travian.*
// @include        http://www.travian.org/*
// @exclude        http://shop.travian*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
   
$(document).ready(function() {
   


    $("#side_navi p:last-child a:last-child").after("<div id=box  <a>control ally</a> </div>");

	$("#box").css({'background-color' : 'green', 'font-weight' : 'bolder'});

$('#box').click(function() {
 
	$('#box').html("<table id=alianca <td><a href=/allianz.php?s=3>Fighting</a></td><td><a href=/allianz.php?s=3&f=31>The attack </a></td><tr> <a href=/allianz.php?s=3&f=1>Success </a></tr><tr><a href=/allianz.php?s=3&f=2>Attack + Loss</a></tr><tr><a href=/allianz.php?s=3&f=3>Failed </tr><tr><a href=/allianz.php?s=3&f=9>Spy</tr><td><a href=/allianz.php?s=3&f=32>Defender </td><tr><a href=/allianz.php?s=3&f=4>The winner</a></tr><tr><a href=/allianz.php?s=3&f=5>Wins + Losses</a></tr><tr><a href=/allianz.php?s=3&f=7>Unsuccessfully </tr><tr><a href=/allianz.php?s=3&f=6>Unsuccessfully+Loss</tr><tr><a href=/allianz.php?s=3&f=10>Spy</tr><td><a href=/allianz.php?s=4>News</td></tr> </table>");

});		
});