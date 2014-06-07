// ==UserScript==
// @name          Custom Salesforce UI
// @namespace     http://userscripts.org/users/126885
// @description	  Changes the new (Spring 10) salesforce UI to remove white space and define separate areas better
// @author        TehNrd
// @homepage      http://www.tehnrd.com
// @include       https://*.salesforce.com/*
// ==/UserScript==
(function(){
	var css = '';
	
	//Uncomment next line to change background color to a softer grey
	//css+= "body.sfdcBody{background:none repeat scroll 0 0 #f0f0f0;} body .bPageFooter a, body .bPageFooter {color:#858585}";
	
	if(document.getElementById("ep") != null){
		document.getElementById("ep").setAttribute("class", "bPageBlock bEditBlock secondaryPalette");
		
		css+= ".bEditBlock.bPageBlock .detailList tr td, .bEditBlock.bPageBlock .detailList tr th {border-bottom-width:1px;}  .pbSubheader {margin-top:10px;}  body .bPageBlock{margin-bottom:13px;}   body .bPageBlock .pbBody .pbSubheader img {margin-top:-5px;}   body .bEditBlock .pbBody .pbSubheader, body .bWizardBlock .pbBody .pbSubheader {padding:2px 16px; border-top:0px solid #FFFFFF;}";
		
		//Uncomment the next line if you want to remove the blue table header for the related lists.
		//css+= "body .pbBody table.list tr.headerRow td, body .pbBody table.list tr.headerRow th {background:none; border-width:0 0 1px 1px; border-width:0 0 3px; font-size:1.0em;}";
	}


	if(typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	}else if(typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	}else if(typeof addStyle != "undefined") {
		addStyle(css);
	}else{
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}

})();