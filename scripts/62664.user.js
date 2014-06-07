// ==UserScript==
// @name          userscripts darker skin
// @namespace     http://userstyles.org
// @include       http://userscripts.org/*
// @include       https://userscripts.org/*
// @include       http://*.userscripts.org/*
// @include       https://*.userscripts.org/*
// ==/UserScript==
(function() {
 document.body.id='nodefaultstyle';
var css = "*{color#000;background-color:#033}li{background-color:#001337!important;color:#00fee1!important} body {background-color: #002727 !important; color: #0FF !important;}\nh1 img {display: none;}\nh3 {background-color: #033 !important; border: 1px solid #002727 !important;}\na:focus, a:hover {color: #0FF !important;}\na {color: #0075CE !important; text-decoration: underline !important;}\n#header {background-color: #002727 !important; border: 2px solid #033 !important;}\n  #header h1 {background: none!important; width:250px !important; height:36px !important;}\n  #header a {color: #0FF !important;}\n#content {background-color: #002727 !important; border-color: #002727 !important;}\ntable tr td.inv {background-color: #002727 !important; color: #0FF !important;}\n  th.la {border-color: #0FF !important;}\n  tr.by-author td, tr.by-author td.author {border-color: #099 !important;}\n  tr.by-author td.body {background: #033 !important;}\n  th {border-color: #0FF !important;}\ndiv.stats {background-color: #002727 !important; border: 1px solid #033 !important;}\ncode {background-color: #055 !important; color: #0FF !important;}\npre {background: #099 !important; border: 1px solid #0FF !important;}\np.error {background: #033 !important; border-color: #099 !important;}\n.wide_container h1 {color: #0FF !important;}\n.pagination {padding: 5px 0 !important;}\n#user_password_confirmation {margin-top: 5px !important;}\n.sh_javascript, .sh_sourceCode {font-family: inconsolas, courier !important; font-size: 1.1em !important; line-height: 1.5 !important;}\n.sh_string {color: #000 !important;}\n.sh_symbol {color: #0FF !important;}#right,#heading,#script-nav,#script-nav *,#tags,#subnav,#subnav *,#menu *,#nav,#site-logo,#navbox{background-color:#012!important;color:#069!important;image:none!important}";
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