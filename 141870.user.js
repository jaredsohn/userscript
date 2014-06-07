// ==UserScript==
// @name            Comparateur 5 partis
// @author          Bruno Valentin
// @namespace       http://bvalentin.com
// @description     Optimization du comparateur de Le Devoir pour hautes resolutions d'écran (1450px de largeur ou +). Il vous permet de comparer les 5 partis en même temps au lieu de trois à la fois.
// @license         Creative Commons Attribution License
// @version	        0.1
// @include         http://elections.ledevoir.com/elections-quebec-2012
// @released        2012-08-20
// @compatible      Greasemonkey
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
 
/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/
var wwidth = $(window).width();
if(wwidth>=1450){
	fireScript();	
}
function fireScript(){
	$("#wrapper,#content,#navi_first,#navi_second,#comparator,#thermometer,.inner_content,.compare_wrapper").css("width","1446px");
	$("#navi_first,#navi_second,#comparator,#thermometer,.inner_content,.compare_wrapper,.inner_content > h1, .results_title, .inner_content > h2, #tutorial, .compare").css("margin","auto");
	$(".selector, .item_remove").css("display","none");
	$(".compare, #navi").css("width","1436px");
	$(" #pied").css("width","1426px");
	$(".compare").css("margin-top","28px");
	$(".compare").css("overflow","visible");
	$(".theme").css("background-color","#FFF");
	$("#navi_second, #navi_first").css("background-color","#F1F1F1");
	$("#navi_second > ul").css("width","1439px");
	$("#thermometer_inner").css("right","-54px");
	$("#completed").css("margin-left","auto");
	$("#completed").css("margin-right","auto");
	$(".mask").css("background","none repeat scroll 0 0 #F2F2F2");
	$("#footer_elections").css("margin","65px auto");
	$(".item").each(function(){
		if($(this).hasClass("hidden")){
			$(this).removeClass("hidden");
			$(this).addClass("show");	
		}	
	});
}