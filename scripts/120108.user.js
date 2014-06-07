// ==UserScript==
// @id             Wywalenie Sponsorowane z FB [tylko polska wersja]
// @name           Remove_FB_Sponsored_PL
// @version        2.0
// @namespace      remove_fb_sponsored_pl
// @author         
// @description    
// @include        http://*.facebook.com/*
// @run-at         document-start
// ==/UserScript==

/*  @run-at         window-load    */
/*  @run-at         document-start */
/*  @run-at         document-end */

/*
 * Note: this is an exact copy of sizzlemctwizzle's script. 
 * http://userscripts.org/scripts/review/46560
 * I used it because my old script didn't work in all cases and 
 * I already broadcasted the code among friends, so i had to use another working solution quickly
*/

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