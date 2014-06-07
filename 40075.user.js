// ==UserScript==
// @name          GasBuddy
// @namespace     http://localhost
// @description   Show bigger prices.
// @include       http://*gasprices.com/*
// @version       0.0.1
// ==/UserScript==

src = document.body.innerHTML;
	
	src = src.replace(/<div class=\"p(\d)\"><\/div>/g,"$1");
	src = src.replace(/<div class=\"pd\"><\/div>/g,".");
	src = src.replace(/Thanks/,"Time");
	src = src.replace(/a href=\"\/update_form/g,"!\"");
	src = src.replace(/>update[^>]*</g,"><");
	GM_addStyle(<><![CDATA[
			th.p_low, .sp_p { 
				font-size: 35px !important; 
				font-family: "Segoe Black" !important; 
				font-weight: bolder !important;
				color: blue !important;
				margin: 0 0 0 0 !important;
				height: auto !important;
				width: auto !important;
			 }
			dd { 
				font-size: 10px !important; 
			 }
			]]></>.toString());

document.body.innerHTML = src;
