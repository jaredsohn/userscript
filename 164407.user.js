// ==UserScript==
// @id             rapidmoviez.com-f3753b69-c7e3-4a90-8e20-a3c1b6d02e21@faceb
// @name           Rapidmoviez premium4.me integration script
// @version        1.1
// @namespace      meh
// @author         Yanksy
// @description    
// @include        http://rapidmoviez.com/*
// @run-at         document-idle
// @noframes
// ==/UserScript==

var getLinks = document.querySelectorAll('.blog-details>pre>a[href*="extabit.com"],.blog-details>pre>a[href*="uploaded.net"],.blog-details>pre>a[href*="ul.to"]');

[].forEach.call(getLinks, function(item,index,arr){

	item.href = "http://premium.to/getfile.php?link="+item.href;

});