// ==UserScript==
// @name            Ogame - amelioration visuelle de l'espace infini
// @author Call Of duty
// @include         http://*/game/index.php?page=galaxy*
// ==/UserScript==
(function(){
	var element = document.evaluate("//a[contains(@href,'target_mission=15')]/ancestor::th[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	element.setAttribute('style',"font-style: oblique;font-weight: bold;font-size: small;border-style: double;border-width: medium;border-color: green;height: 35px;width: 535px;");
})();