// ==UserScript==
// @name           Gaia+
// @date           5/2/2012
// @version        1.0.1
// @include        http://www.gaiaonline.com/*
// ==/UserScript==


//ADD ITEMS TAB TO MENU
//---------------------------------
var shopMenu = document.getElementById('shopping_menu');

var itemMenu = document.createElement('div');
itemMenu.innerHTML = '<li class="megamenu-no-panel megamenu-menu-shopping selected"><a href="/inventory" class="megamenu-section-trigger">Items</a></li><li class="megamenu-divider"><!-- --></li>';

shopMenu.parentNode.insertBefore(itemMenu, shopMenu);


//ADD VIEW IN MARKETPLACE
//---------------------------------
var pathName = window.location.pathname;
if(pathName.indexOf('marketplace/mystore/sell') != -1)
{
  var itemId = document.getElementsByName('item_id')[0].getAttribute('value');
  var itemUrl = '<a href="/marketplace/itemdetail/' + itemId + '" target="_blank">View in Marketplace</a>';

  var sellForm = document.getElementById('sellform');
  sellForm.innerHTML += itemUrl;
}