// ==UserScript==
// @name          Gaia MarketPlace Linker
// @description   Makes it easy to copy+paste links to items in the MarketPlace
// @include       http://www.gaiaonline.com/marketplace/itemdetail/*
// @version       1.0.0
// @require       http://code.jquery.com/jquery-latest.min.js
// @require         http://sizzlemctwizzle.com/updater.php?id=104568
// ==/UserScript==

// todo:
// convert to regular javascript, since jQuery isn't really needed for this...

$('#arrow_wishlist').parent().before($('<p id="details_mplink"><strong>Link to this Item:</strong><br //><input onclick="this.select();" style="width: 459px; border: medium none; height: 16px; overflow: hidden;" type="text" readonly="readonly" value="[url='+document.URL+'][img]'+$('#item_thumb').children().first().attr('src')+'[/img] - '+$('title').text().split(' |')[0]+'[/url]" //><//p>'));