// ==UserScript==
// @author         ARAoA
// @name           Gaia Gold Hider
// @description    Hides your gold amount to make it easier to resist spending gold. 
// @email          arandomacts@live.com
// @include        http://www.gaiaonline.com/
// @include        http://www.gaiaonline.com/*
// @include        https://www.gaiaonline.com/*
// ==/UserScript==

		document.getElementById('gold_amt').innerHTML = '0';
		document.getElementById('inventoryGoldAmount').innerHTML = '0';