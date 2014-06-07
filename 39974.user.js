// ==UserScript==
// @name           MB City Quantity Select
// @namespace      http://userscripts.org/users/777184
// @description    Adds additional quantity values to the quantity select fields
// @source         http://userscripts.org/scripts/show/39974
// @identifier     http://userscripts.org/scripts/source/39974.user.js
// @version        1.0
// @date           2009-01-07
// @creator        mattyp
// @include        http://apps.facebook.com/mobwars/city/
// @include        http://apps.new.facebook.com/mobwars/city/
// ==/UserScript==

// change all the select fields to text fields
for(i=0; i<document.getElementsByName('qty').length; i++) {
	document.getElementsByName('qty')[i].innerHTML = '<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>';
}
