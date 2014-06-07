// ==UserScript==
// @name         Automatically Choose To Manually Install And Validate GWO Tests
// @namespace    gwoAutoChooseManualInstall
// @include      /https:\/\/www\.google\.com\/analytics\/siteopt\/(ab|mv)_prepare_install?.*/i
// @include      https://www.google.com/analytics/siteopt/ab_prepare_install?*
// @include      https://www.google.com/analytics/siteopt/mv_prepare_install?*
// @match        https://www.google.com/analytics/siteopt/ab_prepare_install?*
// @match        https://www.google.com/analytics/siteopt/mv_prepare_install?*
// @datecreated  2010-03-21
// @lastupdated  2010-03-21
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will automatically choose the 'You will install and validate the JavaScript tags' when you are asked 'Who will install and validate the JavaScript tags?'
// ==/UserScript==

(function(d){
  var installRadio=d.getElementById('install-self');
  if(!installRadio) return;

  if(!installRadio.checked){
    installRadio.click();
  }

  setTimeout(function(){
    var continueBtn=d.getElementById('continue-button');
    continueBtn.click();
  },10);
})(document);
