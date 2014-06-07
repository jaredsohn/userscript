<span>// ==UserScript==

// @name          Hide Advertisement

// @description   An example Greasemonkey script that hides every image.

// @include       cyberghostvpn.com/go/browse.php

// ==/UserScript==



var advert = document.getElementByID('cgheaderleft').innerHTML="<a href="https://cyberghostvpn.com/advertiser/www/delivery/ck.php?oaparams=2__bannerid=318__zoneid=72__cb=1684db8ed8__oadest=http%3A%2F%2Fcyberghostvpn.com%2Fen%2Fproduct%2Fpurchase.html%26piwik_campaign%3DProxy%26piwik_kwd%3DBuyNowBanner" target="_blank"><img src="https://cyberghostvpn.com/advertiser/www/images/2ccb2947a2cf37cd71f2add81bf2f402.png" width="610" height="135" alt="" title="" border="0" class="quimby_search_image"></a>";

for (i=0; i<advert.length; i++)

{

  advert[i].style.visibility = 'hidden';

}

</span>