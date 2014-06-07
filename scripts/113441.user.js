// ==UserScript==
// @name           anti silence yorumlayıcı
// @description    anti silence yorumlayıcı
// @version        1.0
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://www.eksibition.org/*
// ==/UserScript==


	function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
	
	
	var nodes = xpath(".//input[@class='b2']");
	if(nodes.snapshotLength > 1) {
		var parentel = nodes.snapshotItem(1).parentNode;
		var inputantiamac = document.createElement('input');
		inputantiamac.className = "b2";
		inputantiamac.type ="button";
		inputantiamac.addEventListener("click", function() {
								var commenttext = document.getElementById('commentText');
								commenttext.value += " amaç ne amk111111111111heheehhh";
													 },true);
		inputantiamac.value = "amaç ne amk";

		var inputantibira = document.createElement('input');
		inputantibira.className = "b2";
		inputantibira.type ="button";
		inputantibira.addEventListener("click", function() {
								var commenttext = document.getElementById('commentText');
								commenttext.value += " bira yok amk111111111111heheehhh";
													 },true);
		inputantibira.value = "bira yok";
		
		var inputantiamk = document.createElement('input');
		inputantiamk.className = "b2";
		inputantiamk.type ="button";
		inputantiamk.addEventListener("click", function() {
								var commenttext = document.getElementById('commentText');
								commenttext.value += " amk111111111111heheehhh";
													 },true);
		inputantiamk.value = "sadece amk";
		
		parentel.appendChild(inputantibira);
		parentel.appendChild(inputantiamac);
		parentel.appendChild(inputantiamk);
	}
