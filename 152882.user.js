// ==UserScript==
// @name			New Kaskus Anti Lag Dev
// @namespace		http://userscripts.org/scripts/show/152882
// @version			1.2.1
// @description		Biar Kaskus gak berat gan!
// @include			http://kaskus.co.id/*
// @include			http://*.kaskus.co.id/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant			GM_addStyle
// @copyright		2012 mixmix
// ==/UserScript==
function removeElement(ElementXpath) {
    var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
    for (i=0; i<alltags.snapshotLength; i++) { 
        element = alltags.snapshotItem(i); 
        element.parentNode.removeChild(element); // Remove this element from its parent. 
    } 
}
removeElement("//div[@class='skin']");
removeElement("//div[@class='kasad-wrapper']");
removeElement("//a[@class='l-link']");
removeElement("//a[@class='r-link']");
removeElement("//div[@class='baloon-track']");
removeElement("//span[@class='counter']");
$("#reply-messsage").off();
GM_addStyle('body { background-image: none !important; }');
GM_addStyle('.meta-header { position: static !important; }');
GM_addStyle('#hot-cat .dropdown.open:after { background-color: rgba(0,0,0,0) !important; }');
GM_addStyle('.meta-header, .noticed > strong, .banner-top-ads, .user-content-wrapper, #subforum, #edit, #signup-form, .dropdown-menu, .sorting.open > a, .tools-panel.open > a, #user-profile-main header, #hot-c, #hot-r, #hot-cat, .category-bar, .category-tab, .category-tab a.current, .category-bar ul li ul, #breadcrumbs-wrap, #forum-listing, .banner-notice, #site-footer, .pagination .active a, input, textarea, select, .thread-prevnext, .hfeed .author .control a, .hfeed .entry-head, .white.button, .purple.button, .turqoise.button, .blue.button, .orange.button, .red.button, .green.button, .black.button, .grey.button, .pagination, #details-header, .item-content, .item-content figure { box-shadow: none !important; -webkit-box-shadow: none !important; }');