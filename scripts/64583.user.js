// ==UserScript==
// @name           amazon internaional
// @namespace      http://cocococo.pecori.jp/
// @include        http://www.amazon.*/gp/*
// @include        http://www.amazon.*/dp/*
// ==/UserScript==

(function() {
	var domain = [['jp','co.jp'],['us','com'],['uk','co.uk'],['de','de'],['fr','fr'],['ca','ca'],['cn','cn']];
	var asin;
	
	var titleSpan = document.getElementById("btAsinTitle");
	
	if (document.getElementsByName("ASIN")){
		asin = document.getElementsByName("ASIN")[0].value;
	} else {
		asin = document.getElementsByName("ASIN.1")[0].value;
	}
	
	for (var i = 0;i < domain.length;i++){
		var link = document.createElement("a");
		link.textContent = domain[i][0];
		link.href = "http://www.amazon." + domain[i][1] + "/dp/" + asin;
		titleSpan.parentNode.parentNode.appendChild(link);

		var line = document.createTextNode(" | ");
		titleSpan.parentNode.parentNode.appendChild(line);
	}
})();
