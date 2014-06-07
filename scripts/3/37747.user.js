// ==UserScript==
// @name          SoftPedia AdBot Remover
// @author	      http://itXpert.org
// @namespace	  http://userscripts.org/users/73643
// @description   Removes the post with ads from forum.softpedia.com topics
// @include       http://forum.softpedia.com/*showtopic=*
// ==/UserScript==

// Remove AdBot Post
document.getElementById('post-member-0').parentNode.parentNode.parentNode.innerHTML='';

// Remove Banners
var da = document.getElementsByTagName('div');
for (var el=0;el<da.length;el++) {
    if (da[el].id.substr(0,7) == 'bmone2n') {
        if(da[el].parentNode.nodeName == 'CENTER' ) 
            da[el].parentNode.innerHTML = '';
        else if(da[el].parentNode.nodeName == 'DIV';
                 da[el].parentNode.parentNode.innerHTML = '';
    }
}
// Remove TextAds from Google 
var node;
var parent;
var l = document.getElementsByName('google_ads_frame').length; 
while(l) {
    node = document.getElementsByName('google_ads_frame')[l-1];
    parent = node.parentNode;
    parent.removeChild(node);
    l--;
}