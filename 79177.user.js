// ==UserScript==
// @name           SkinnedGitHub
// @include        *github.com*
// ==/UserScript==
GM_addStyle(".title{display:inline!important}.locales,.security,.sidebar,.help,.infotip,input[type='image'],.avatared,.logo,.pagehead userspace,#missing-readme,.rule,.legend,h2,th,#footer,.filter-bar,.feed,object,.tip,.notification-settings,.octofication,.arrow,.mini-icon-public-repo,.mini-icon-private-repo,.mini-icon-search-input,.mini-icon-time,.mini-icon-text-file,.mini-icon-arr-right,.mini-icon-arr-right-mini,.mega-icon-public-repo,.mega-icon-private-repo,.repo-label,.mini-icon-diff{display:none!important}")
b=document.getElementsByClassName("btn-branch")
if(b.length)b[0].innerHTML=b[0].innerHTML.replace("<i>branch:</i> ","")