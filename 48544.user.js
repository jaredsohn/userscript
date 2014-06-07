// ==UserScript==
// @name           WYHT Cleaner
// @namespace      wouldyouhitthis.com
// @description    Removes the gift elements on wouldyouhitthis.com.
// @include        http://wouldyouhitthis.com/*
// @include        http://www.wouldyouhitthis.com/*
// ==/UserScript==
// 1.0
// Removes all useless elements.
{
var shit1 = document.getElementById('mycredits');
var shit2 = document.getElementById('mycreditbalance');
var shit3 = document.getElementById('giftofthedayCTA');
var shit4 = document.getElementById('giftingalert');
shit1.parentNode.removeChild(shit1);
shit2.parentNode.removeChild(shit2);
shit3.parentNode.removeChild(shit3);
shit4.parentNode.removeChild(shit4);
}