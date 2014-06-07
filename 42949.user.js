// ==UserScript==
// @name           Hide Ask.com Advertisements
// @author           Billy DiStefano
// @namespace      shwuzzle.com
// @include        http://www.ask.com/*
// ==/UserScript==

//hide the google adwords from the search results
(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)
with (tags[key])
if (
tags[key].getAttribute('class') == 'spl_shd_plus' || 
tags[key].getAttribute('class') == 'spl_shd_plus bb' || 
tags[key].getAttribute('class') == 'spl_ad_plus' || 
tags[key].getAttribute('class') == 'spl_ad_plus staticAds'
) tags[key].style.display = 'none';
})();

//Hide the 'Nascar Toolbar' advertisement at the bottom of the search results page
(function () {
var tags = document.getElementsByTagName('a');
for (var key in tags)
with (tags[key])
if (
tags[key].getAttribute('href') == 'http://sp.ask.com/toolbar/nascartb/tbdownload.php?tb=NSC-A&trackid=aks-503'
) tags[key].style.display = 'none';
})();