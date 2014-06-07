// ==UserScript==
// @name          Google Reader: Unbold Unread Folders
// @namespace     http://userstyles.org
// @description	  Make unread folders and titles appear normal instead of bold. 
// @author        Lucas D
// @homepage      http://userstyles.org/styles/26480// 
// @include             http*://*.google.com*/reader/*


// ==/UserScript==
(function() {
var css = "body {\n    font-family: Lucida Grande, Helvetica, Arial, sans-serif !important; \n    background: #fff  !important;\n}\n\n\na,.link, #sub-tree .name {\n    text-decoration: none !important; \n    font-weight:normal;\n}\n\n#sub-tree li a .name-unread,\n#sub-tree li a,\n#selectors-box a {\n    color: #000 !important; \n    font-weight: normal !important; \n}";
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
