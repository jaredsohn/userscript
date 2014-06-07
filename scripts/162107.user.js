// ==UserScript==
// @name        Neopets Shop Wizard Link
// @namespace   userscripts.org
// @description Adds shop wizard links to items names
// @include     http://www.neopets.com/market.phtml?*type=your*
// @include	http://www.neopets.com/market.phtml?type=your
// @include	http://www.neopets.com/market_your.phtml
// @include	http://www.neopets.com/market.phtml?type=wizard*
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$counter = 0;
$items = $("tbody:contains('Your Price'):last").children().length - 4;

$page = document.URL;

$.urlParam = function(name){
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
}

if($page.indexOf("type=wizard") != -1){
	if($.urlParam('submit') == "true"){
		$("form[action='market.phtml']").submit();
	}
}

$("tbody:contains('Your Price'):last tr").each(function(){
	if($(this).find('td:eq(0) b').text() == "Name"){
	}
	else{
		if($counter > 0 && $counter <= $items){
			$itemName = $(this).find('td:eq(0) b').text();
			$itemName = $itemName.replace(' ','+');
			$item = $(this).find('td:eq(0) b').wrap("<a href='http://www.neopets.com/market.phtml?type=wizard&string=" + $itemName +"&submit=true' target='_blank'>");
		}	
	}
	$counter++;
});