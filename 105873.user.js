// ==UserScript==
// @name          Google+ : Facebook
// @namespace     http://userstyles.org
// @description	  Make Google+ look like Facebook
// @author        fabiogiolito
// @homepage      http://userstyles.org/styles/50051
// @include       http://plus.google.com/*
// @include       https://plus.google.com/*
// @include       http://*.plus.google.com/*
// @include       https://*.plus.google.com/*
// @include       https://plus.google.com*
// ==/UserScript==
(function() {
var css = ".a-Eo-T,\n  #gbx3,\n  #gbx4{\n    background-color: transparent;\n    height: 0;\n    margin-top: -2px;\n  }\n\n  #gbz{\n    display: none;\n  }\n  #gbg{\n    margin-top: 5px;\n  }\n\n  .gbgt-hvr{\n    background: transparent;\n  }\n\n  #gbi1.gbids{ color: #ccc; }\n\n  \n  .a-U-T{\n    background: #3b5998;\n    height: 40px;\n  }\n\n  .a-U-A{\n    padding: 8px 0 0 0;\n  }\n\n  .a-U-Pg-T img{\n    display:none;\n  }\n  .a-U-Pg-T .a-b-h-Jb{\n    display:block;\n    background: url(https://github.com/fabiogiolito/googleplusfacebook/raw/master/images/google-logo-plus-0fbe8f0119f4a902429a5991af5db563.png) no-repeat;\n    width: 103px;\n    height: 31px;\n  }\n\n  .a-b-d2Q2jb{\n    margin-left: -55px;\n  }\n\n  \n  .a-b-d2Q2jb a span,\n  .a-b-d2Q2jb a.a-MZ5lwb-Pa span,\n  .a-b-d2Q2jb a:hover span{\n    background-image: url(https://github.com/fabiogiolito/googleplusfacebook/raw/master/images/common-full-2fd6df831c52ccf15a88279322948103.png) !important;\n  }\n\n  .a-MZ5lwb, .a-MZ5lwb:active, .a-MZ5lwb.a-MZ5lwb-Pa{\n    background: transparent !important;\n    box-shadow: none;\n    border: 0;\n    margin-right: -10px;\n  }\n\n  .a-fi-T{\n    background: #627aad;\n    padding: 4px;\n    margin-left: 20px;\n  }\n\n  .a-fi-O{\n    border: 1px solid #3b5998;\n    height: 21px;\n    margin: 0;\n    font-size: 0.85em;\n  }\n\n\n\n  \n\n  .a-f-p a,\n  .a-f-i-bg span,\n  .a-f-i-ha div,\n  .a-f-i-Hg span,\n  .a-f-i-WXPuNd .d-h{\n    color: #3b5998;\n  }\n\n  .a-f-i.a-f-i-Rh,\n  .a-f-i.a-f-oi-Ai{\n    border-left-color: #a5bae5;\n  }\n\n  .a-f-i-W{\n    background: #edeff4;\n    border: 1px solid #fff;\n  }\n\n  .tk3N6e-e-qc.tk3N6e-e-X,\n  .tk3N6e-e-qc{\n  background: #627aad;\n  border: 1px solid #536996;\n  }\n\n  .a-f-i-W-O{\n    margin: 5px 0;\n    padding: 4px;\n    border: 4px solid #edeff4;\n    box-shadow: inset 0 0 1px #627aad;\n  }\n\n\n  \n  .a-b-Cs-T a,\n  .a-b-Cs-T span,\n  .a-Ja-h{\n    color: #3b5998;\n  }\n\n\n  \n\n  .a-la-h-ga:hover,\n  .a-la-hA:hover{\n    background: #eff2f7;\n  }\n  .a-la-Rb-h:hover{\n    background-color: transparent;\n  }\n\n  .a-la-h-Pa, .a-la-h-Pa:hover{\n    background: #d8dfea url(https://github.com/fabiogiolito/googleplusfacebook/raw/master/images/common-full-2fd6df831c52ccf15a88279322948103.png) no-repeat 5px bottom;\n    color: #3b5998 !important;\n  }\n\n  .a-la-Rb-h.a-la-h-Pa{\n    background: transparent;\n  }\n\n  .a-la-h-Pa, .a-la-h-Pa:hover{\n    background: #d8dfea;\n  }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
