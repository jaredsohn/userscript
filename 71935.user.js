// ==UserScript==
// @name         GWO Linkified Logo
// @namespace    gwoLinkifiedLogo
// @include      https://www.google.com/analytics/siteopt/*
// @match        https://www.google.com/analytics/siteopt/*
// @datecreated  2010-03-20
// @lastupdated  2010-03-20
// @version      0.1.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will linkify the GWO logo.
// ==/UserScript==

(function(d){
  var logo=d.evaluate("//img[contains(@src,'website_optimizer_logo_sm.gif')]",d,null,9,null).singleNodeValue;
  if(!logo) return;

  var url=d.evaluate("//a[contains(text(),'Website Optimizer') and contains(@href,'exptlist?account=')]",d,null,9,null).singleNodeValue;
  if(!url){
    if(d.location.href.match(/\/exptlist\?account=/i)){
      url=d.location.href;
    }
    else return;
  }
  else url=url.href

  var link=d.createElement("a");
  link.href=url;
  link.innerHTML="<img border='0' src='https://www.google.com/images/logos/website_optimizer_logo_sm.gif' />";

  logo.parentNode.replaceChild(link,logo);
})(document);
