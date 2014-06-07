// ==UserScript==
// @name           SkinnedUserscripts
// @include        *://userscripts.org*
// ==/UserScript==
GM_addStyle('em,.help,.clear,#footer,h6,.share,.discuss,#avatar,.a2a_dd,.noreviews,.none{display:none!important}')
a=document.evaluate('//img[@alt]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(i=0;i<a.snapshotLength;i++)if((b=a.snapshotItem(i)).alt.match(/_32/))b.parentNode.removeChild(b);