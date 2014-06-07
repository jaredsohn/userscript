// ==UserScript==
// @name        Building/Research progress (For OGame Re-Desing)
// @description Displays graphic display of building / research progress
// @author      SolarAngel
// @include     http://*/game/index.php?page=research&*
// @include     http://*/game/index.php?page=buildings&*
// @include     http://*/game/index.php?page=station&*
// @include     http://*/game/index.php?page=resources&*
// ==/UserScript==

(function()
		  {
	var path = '//div[@class="pusher"]//span[@class="time"]';
	var obj = document.evaluate(path,document,null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (obj.snapshotLength == 0) return;
	var span = obj.snapshotItem(0);var span2 = document.createElement("span");span2.setAttribute("class", "time");span2.setAttribute("id", "prodPercent");span2.setAttribute("style","top:60px");span.parentNode.appendChild(span2);setTimeout(prodPercentUpdate,999);})();function prodPercentUpdate(){var span = document.getElementById('prodPercent');span.innerHTML = span.parentNode.parentNode.offsetHeight + "%";setTimeout(prodPercentUpdate,999);
}