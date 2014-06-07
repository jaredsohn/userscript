/*
 Draugiem.lv profila bildes palielinatajs // Draugiem.lv profile picture enlarger
 v 1.1 / 15.02.2009
 (c) Friiks (aka Matiss Bisofs)
 http://portfolio.snowmoons.com
*/


// ==UserScript==
// @name           profilePicEnlarger
// @namespace      drLvProfilePicEnlarger
// @description    Adds a button next to all of the other actions for enlarging profile picture without need to visit users profile
// @include        http://*.draugiem.lv/*
// ==/UserScript=='

    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
		
		
    function letsJQuery() {
		$(".dbx").each(function(i){
		var string = $(this).find("a.spec").attr("href");
		if($(this).find("tr").find("td").length > 0){
		$(this).find("tr").find("td:last").after("<td><a href='/profile/picture.php?pid="+string.split("?")[1]+"' onclick=\"return profpic(this, "+string.split("?")[1]+")\"><img style='border:0' src='http://img132.imageshack.us/img132/931/viewimageoe4.png' title='PalielinÄt lietotÄja bildi' alt='PalielinÄt' /></a></td>");
		}else{
		$(this).find("tr").append("<td><a href='/profile/picture.php?pid="+string.split("?")[1]+"' onclick=\"return profpic(this, "+string.split("?")[1]+")\"><img style='border:0' src='http://img132.imageshack.us/img132/931/viewimageoe4.png' title='PalielinÄt lietotÄja bildi' alt='PalielinÄt' /></a></td>");
		}
		});

		
}