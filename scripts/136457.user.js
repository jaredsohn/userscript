// ==UserScript==
// @name          WBB3 Blue Theme
// @namespace     http://userstyles.org
// @description	  Blue Theme for WBB v3
// @author        LinuxTrance
// @homepage      http://userstyles.org/styles/67787
// @include       http://www.warez-bb.org*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "html, body {\n	font: 12px Tahoma, Geneva, sans-serif;\n	background-color: #9CC4E4;\n	color: #2F3B48;	\n}\n\n#header-wrapper {\n	display: table;\n	border-bottom: 1px #F4F7F7solid;\n}\n\n#header {\n	position: relative;\n	overflow: hidden;\n	background: url(\"http://img9.warez-bb.org/wbb3_theme/images/wbb3/headerbar.gif\") repeat-x;\n	display: table-row;\n}\n\n#navigation {\n	background: url(\"http://i2.lulzimg.com/89acbe03d9.jpg\") repeat-x;\n	height: 29px;\n	border-top: 1px #fff solid;\n	margin-bottom: 12px;\n	box-shadow: 0 3px 4px #fff;\n}\n\n#navigation li {\n	background: url(\"http://i2.lulzimg.com/89acbe03d9.jpg\") right no-repeat;\n	color: #F4F7F7;\n	float: left;\n	font-family: Tahoma, Geneva, sans-serif;\n	font-size: 12px;\n	font-weight: bold;\n	height: 26px;\n	line-height: 24px;\n	padding: 0 12px 0 10px;\n	text-shadow: 0 1px #FFF;	\n}\n\n\n#new-pm, #javascript-error, .errorline, .postrow .post-report {\n	color: #FFF;\n	background-color: #FF6AA5;\n	border: 1px #AB1D21 solid;\n	text-decoration: none;\n	text-align: center;\n	padding: 10px 0;\n	margin: 15px 0;\n	font-weight: bold;\n	text-shadow: 0 1px #000;\n	-moz-border-radius: 4px;\n	-webkit-border-radius: 4px;\n	border-radius: 4px;\n	-moz-box-shadow: 0 2px 2px #DDD, inset 0 1px rgba(255, 255, 255, 0.5);\n	-webkit-box-shadow: 0 2px 2px #DDD, inset 0 1px rgba(255, 255, 255, 0.5);\n	box-shadow: 0 2px 2px #DDD, inset 0 1px rgba(255, 255, 255, 0.5);\n}\n\n#general, .main-legend {\n	background: #F4F7F7;\n	color: #333;\n	padding: 6px 8px;\n	margin: 20px 0 10px;\n	overflow: hidden;\n	font-size: 11px;\n	border: 1px #D5D5D5 solid;\n	-moz-border-radius: 5px;\n	-webkit-border-radius: 5px;\n	border-radius: 5px;\n}\n\n.cat-row, table .cat {\n	background-color: #fff;\n	border-top: 1px #FFF solid;\n	border-bottom: 1px #A2B2CC solid;\n	position: relative;\n	font-size: 11px;\n	font-weight: bold;\n	width: 100%;\n}\n.row .icon, .row .description, .row .topics, .row .posts, .row .last-post, .topicrow .forum, .topicrow .icon, .topicrow .description, .topicrow .topics, .topicrow .posts, .topicrow .views, .topicrow .last-post, tr.row td {\n	background-color: #fff;\n	vertical-align: middle;\n	font-size: 10px;\n}\n\n.row .topics, .row .posts, .row .last-post, .topicrow .topics, .topicrow .posts, .topicrow .last-post, .topicrow .views, .topicrow .forum, .blank {\n	text-align: center;\n	background-color: #fff;\n}\n\n.row .topics, .row .posts, .row .last-post, .topicrow .topics, .topicrow .posts, .topicrow .last-post, .topicrow .views {\n	border-bottom: 1px #9CC4E4 solid;\n	border-right: 1px #E3E9F0 solid;\n}\n\n.row .topics, .row .posts, .topicrow .topics, .topicrow .posts, .topicrow .views, .subforumrow .topics, .subforumrow .posts {\n	width: 10%;\n	color: #515151;\n	font-weight: bold;\n	font-family: \"Lucida Grande\", Verdana, Helvetica, Arial, sans-serif;\n}\n\n.row .last-post, .topicrow .last-post {\n	width: 18%;\n	line-height: 18px;\n	color: #333;\n}\n\n.subforumrow {\n	background-color: #F4F7F7;\n}";
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
