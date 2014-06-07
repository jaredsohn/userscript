// ==UserScript==
// @name           Hide All Facebook Ads
// @author         http://www.thatoneguy.net/
// @version        1.0
// @namespace      http://userscripts.org/users/63349/scripts
// @description    Hides banner ads as well as "sponsored" news feed and sidebar items from Facebook.
// @include        *facebook.com*
// ==/UserScript==

window.addEventListener("load", function(e) {
  mynewtext=document.createElement('style');
  mynewtext.innerHTML = '.ad_capsule, .admarket_ad, #announce, .below_social_ad,  .profile_sidebar_ads, .sidebar_ads, .social_ad, .social_ad_advert, .social_ad_advert_text, .sponsor, .sponsored_links, .ssponsor { display: none !important; }';
  document.getElementsByTagName("body")[0].appendChild(mynewtext);
  }, false);