// ==UserScript==
// @name           skinnedWikia
// @namespace      skinned
// @include        http://*.wikia.com/*
// ==/UserScript==
GM_addStyle(".edit-pencil,.LatestPhotosModule,.search,.FollowedPagesModule,.WikiaActivityModule,.WikiaPagesOnWikiModule,.editpage-widemode-trigger,.UserProfileMasthead,.AdminDashboardHeader,.AdminDashboardTabs,.AdminDashboardGeneralHeader,.QuickStatsWidget,.arrow-icon-ctr,.gear-icon,#WikiaFooter header,#WikiaSpotlightsModule,#SPOTLIGHT_FOOTER,.CorporateFooter,#GlobalNavigation,.WikiaLogo,.likes,#ca-share_feature,#wikia-mediawiki-recentchangestext,legend,fieldset hr,.mw-rc-label-legend,label[for=namespace],.wikia-button{display:none!important}.special{list-style-type:none!important}")
s=document.getElementById("WikiaArticle").innerHTML
h=document.getElementById("WikiHeader")
h.innerHTML=h.innerHTML.replace("Novelas",s.substr(0,s.indexOf("<!-- \n")).replace(/<script>.*?<\/script>|<.*?>|&[^;]*/g,"").replace(/\s\s+/," ").replace(/^\s+|\s+$/,"").length-(document.getElementById("mw-previewheader")?88:0))