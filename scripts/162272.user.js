// ==UserScript==
// @name       Neopets: Kadoatery Links
// @namespace   http://userscripts.org/users/470425
// @include     http://www.neopets.com/games/kadoatery/index.phtml
// @include	http://www.neopets.com/market.phtml?type=wizard*
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$("div:contains('The Kadoatery'):last strong:first").after("<br><br><a href='http://www.neopets.com/neoboards/boardlist.phtml?board=23'>Games Board</a>");

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
	$item = $(this).find('strong:last').wrap("<a href='http://www.neopets.com/market.phtml?type=wizard&string=" + $itemName +"&submit=true' target='_blank'>");
});