// ==UserScript==
// @name          Gaia MarketPlace Linker
// @description   Makes it easy to copy+paste links to items in the MarketPlace
// @include       http://*.gaiaonline.com/marketplace/itemdetail/*
// @version       0.1.0
// ==/UserScript==
//My ultimate getElement function...compressed. Uncompressed is here:
//http://userscripts.org/scripts/show/100747
function $(x,a,b,c,d){var y;switch(a){case 0:y=document.getElementById(x);break;case 1:y=document.getElementsByClassName(x);break;case 2:y=document.getElementsByName(x);break;case 3:y=document.getElementsByTagName(x);break;case 4:y=document.evaluate('.//'+c+'[@'+d+'="'+x+'"]',document,null,9,null).singleNodeValue;break;case 5:y=document.evaluate(x,document,null,XPathResult.ANY_TYPE,null);break}if(b){return y}else{return(y)?true:false}}
var ele = document.createElement('p');
ele.id = 'marketPlace_link';
var image = document.getElementById('item_thumb').innerHTML.split('<div id="item_preview_div">')[0].split('src="')[1].split('" width="')[0];
ele.innerHTML = '<strong>Link to this Item:</strong><br /><input onclick="this.select();" style="width: 450px; border: medium none; overflow: auto; height: 16px; overflow: hidden;" type="text" readonly="readonly" value="[url='+document.URL+'][img]'+image+'[/img][/url]" />';
$('details_wishlist', 0, true).parentNode.insertBefore(ele, ($('details_wishlist', 0, true).previousSibling));