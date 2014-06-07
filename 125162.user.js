// ==UserScript==
// @name          css desin
// @namespace     ocaldomain
// @include   *paste.org.ru/*


// ==/UserScript==

div.sdmenu {
	width: 150px;
	font-family: Arial, sans-serif;
	font-size: 12px;
	padding-bottom: 10px;
	background: url(https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-snc7/420377_228289920593798_100002383764577_494719_201415964_n.jpg) no-repeat  right bottom;
	color: #fff;
}
div.sdmenu div {
	background: url(title.gif) repeat-x;
	overflow: hidden;
}
div.sdmenu div:first-child {
	background: url(toptitle.gif) no-repeat;
}
div.sdmenu div.collapsed {
	height: 25px;
}
div.sdmenu div span {
	display: block;
	padding: 5px 25px;
	font-weight: bold;
	color: white;
	background: url(expanded.gif) no-repeat 10px center;
	cursor: default;
	border-bottom: 1px solid #ddd;
}
div.sdmenu div.collapsed span {
	background-image: url(collapsed.gif);
}
div.sdmenu div a {
	padding: 5px 10px;
	background: #eee;
	display: block;
	border-bottom: 1px solid #ddd;
	color: #066;
}
div.sdmenu div a.current {
	background : #ccc;
}
div.sdmenu div a:hover {
	background : #066 url(linkarrow.gif) no-repeat right center;
	color: #fff;
	text-decoration: none;
}