// ==UserScript== 
// @name                Deleting Ads on Facebook
// @subname             Ads killer for Facebook
// @version		2.0
// @run-at              document-start
// @author		Taubda 
// @include             *facebook*.*
// ==/UserScript== 

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

function doAllTheHardWork()
{
  // Remove "regular" ticker
  var tickerDiv = null;
  if (tickerDiv = document.getElementById('pagelet_ego_pane_m'))
  {
    var reg = new RegExp('(\\s|^)tickerOnTop(\\s|$)');
    tickerDiv.parentNode.parentNode.className = tickerDiv.parentNode.parentNode.className.replace(reg, ' ');
    tickerDiv.parentNode.removeChild(tickerDiv);
  }

  // Remove ticker above chat sidebar
  var sidebarTickerDiv = null;
  if (sidebarTickerDiv = document.getElementById('pagelet_chbox'))
  {
    sidebarTickerDiv.parentNode.removeChild(sidebarTickerDiv);
  }

  if (document.addEventListener)
  {
    document.addEventListener("DOMNodeInserted", doAllTheHardWork, false);
  }
}

window.onload = doAllTheHardWork();