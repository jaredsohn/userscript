// ==UserScript==
// @name           Travian Simple Aliance Control
// @author         Paweenruk & Al.IvIlK
// @namespace      http://userscripts.org/
// @description    raising for alliance menu 
// @include        http://s*.travian.*
// @include        http://www.travian.org/*
// @exclude        http://shop.travian*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
   
$(document).ready(function() {
   


    $("#side_navi p:last-child a:last-child").after("<div id=box  <a>إحصائيات التحالف</a> </div>");

	$("#box").css({'background-color' : 'white', 'font-weight' : 'bolder'});

$('#box').click(function() {
 
	$('#box').html("<table id=alianca <td><a href=/allianz.php?s=3>ـآلهجمات</a></td><td><a href=/allianz.php?s=3&f=31>الهجوم</a></td><tr> <a href=/allianz.php?s=3&f=1>الناجحة</a></tr><tr><a href=/allianz.php?s=3&f=2>الناجحة مع خسارة</a></tr><tr><a href=/allianz.php?s=3&f=3>الفاشلة</tr><tr><a href=/allianz.php?s=3&f=9>تجسس</tr><td><a href=/allianz.php?s=3&f=32>ـآلدفاعات</td><tr><a href=/allianz.php?s=3&f=4>الناجحة</a></tr><tr><a href=/allianz.php?s=3&f=5>مع خسارة</a></tr><tr><a href=/allianz.php?s=3&f=7>الفاشلة</tr><tr><a href=/allianz.php?s=3&f=6>الفاشلة مع خسارة</tr><tr><a href=/allianz.php?s=3&f=10>تجسس</tr><td><a href=/allianz.php?s=4>ـالأخبآر</td></tr> </table>");

});		
});