// ==UserScript==
// @name       Leopets: Kadoatery Links
// @namespace   http://userscripts.org/users/517817
// @include     http://www.leopets.org/games/kadoatery.phtml
// @include	http://www.leopets.org/market.phtml?type=wizard*
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$("div:contains('The Kadoatery'):last strong:first").after("<br><br><a href='http://www.leopets.org/boards/board.php?boardset=public&boardid=fun&spec=1368812498'>Games Board</a>");

$page = document.URL;

$.urlParam = function(name){
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
}

if($page.indexOf("type=wizard") != -1){
	if($.urlParam('submit') == "true"){
		// alert("it worked, bitches!");
		$("form[action='market.phtml']").submit();
	}
}

$("td:contains('is very sad.')").each(function(){
	$itemName = $(this).find('strong:last').text();
	$itemName = $itemName.replace(/ /g,'+');
	$item = $(this).find('strong:last').wrap("<a href='http://www.leopets.org/market.phtml?type=wizard&string=" + $itemName +"&submit=true' target='_blank'>");
});