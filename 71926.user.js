// ==UserScript==
// @name         Skip GWO A/B Validation
// @namespace    gwoABValidationSkip
// @include      https://www.google.com/analytics/siteopt/ab_installation_instructions?*
// @match        https://www.google.com/analytics/siteopt/ab_installation_instructions?*
// @datecreated  2010-03-20
// @lastupdated  2010-03-20
// @version      0.1.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will allow you to skip the validation of GWO A/B tests.
// ==/UserScript==

(function(d){
	var continueBtn=d.getElementById('continue-button');
	if(!continueBtn) return;

	var previewURL=d.location.href.replace("ab_installation_instructions","ab_preview_launch");

	var step3=d.evaluate("//td[contains(@class,'progressbarsteplabel') and contains(text(),'Preview and start experiment')]",d,null,9,null).singleNodeValue;
	if(step3){
		step3.innerHTML = "<a href='"+previewURL+"'>Preview and start experiment</a>";
	}

	var skipBtn=d.createElement('input');
	skipBtn.type="button";
	skipBtn.id="evgmSkipBtn";
	skipBtn.value="Skip >";
	skipBtn.addEventListener("click",function(){d.location.href=previewURL},false);

	continueBtn.parentNode.insertBefore(skipBtn,continueBtn);

	GM_addStyle("#evgmSkipBtn {font:100% Arial,Helvetica,sans-serif;padding:2px;margin-right:11px;}");
})(document);
