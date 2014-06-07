// ==UserScript==
// @name           Hide ads on vkontakte
// @namespace      vkontakte.ru/
// @include        *//vkontakte.ru/*
// @include        *//vk.com/*
// ==/UserScript==

function TryRemoveAds()
{
  // XXX: try/catch used for guarantee eval all steps and avoid all
  // checks
  
  // 1. we not need that ads
  try {
    document.getElementsByClassName("left_hide_new")[0].onclick();
    document.getElementsByClassName("left_hide_new")[0].onclick();
  } catch(e) {}
 
  // 2. hide ads block
  try {
    document.getElementById('left_blocks').style.display = 'none';
  } catch(e) {}
 
  // 3. deactivate ads_rotate.php#replaceBanner
  try {
    document.getElementById('banner1').id = 'nothing';
    document.getElementById('nothing').style.display = 'none';
  } catch(e) {}
 
  // 4. hide ads box too
  try {
    document.getElementById('ad_box_ad_0').style.display = 'none';
    document.getElementById('ad_box_ad_1').style.display = 'none';
  } catch(e) {}
}

// Ads loaded dynamicly, and we add listener to load event, ie. after
// full page loaded we clean it
window.addEventListener("load", TryRemoveAds, false);

// Some pages loaded so slowly, but ads very fast, we may delete ads
// before full page loaded
setTimeout(TryRemoveAds, 500);
setTimeout(TryRemoveAds, 1000);
setTimeout(TryRemoveAds, 2000);
