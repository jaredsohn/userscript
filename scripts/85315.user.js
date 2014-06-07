// ==UserScript==
// @name           Dagbladet Nice! (CSS by @mrkolby)
// @namespace      no.synth.henrik
// @include        http://*.dagbladet.no/*
// @include        http://dagbladet.no/*
// @include        http://db.no/*
// @include        http://*.db.no/*
// ==/UserScript==

GM_addStyle((<><![CDATA[
#menu .loft,
.front-rss,
#menu .rss,
#menu .menu-title,
#header,
#ad-top,
.centerAd,
#solBox,
.l-color-tax,
.skattesok2009,
.article-tools,
.text-zoom,
.l-blue-s .xbottom,
.l-blue-s .xtop,
.ddBox.geodata.module-box,
.tagBox,
#dzGroup .ad {
	display: none !important;
}

#article-text .article-tools,
#article-text .text-zoom {
	display: inline !important;
}

#menuwrapper {
	border-bottom: 6px #d60000 solid !important;
	background: none;
	padding-bottom: 5px;
}

div#doc.adjust-left,
#menuwrapper.adjust-left .db-search-10,
#menuwrapper.adjust-left div#menu {
	margin: 0 auto !important;
}

.mod-100 .ref {
	padding-top: 1px;
	border-top: none !important;
}

.upper {
	background: #000 !important;
	-webkit-border-top-left-radius: 5px !important;
	-webkit-border-top-right-radius: 5px !important;
}

.upper a {
	color: #fff !important;
	font-size: 13px;
}

.lower {
	background: #f5f5f5 !important;
	border-bottom: 1px #ddd solid;
	line-height: 10px;
	padding: 0 2px !important;
	width: 992px !important;
}

.lower a {
	color: #333 !important;
}

.nav.lower a:hover {
	background: transparent url(images/pilulf.gif) no-repeat center top !important;
}

.db-logo,
.db-logo-small,
.db-search-10,
.userlinks {
	margin: 0 5px !important;
}

.extraTitle {
	background: #eee !important;
	color: #333 !important;
}

.black .extraTitle {
	background: #000 !important;
	color: #fff !important;
}

.horisontal-lf {
	margin-top: 10px !important;
}

.horisontal-lf a {
	text-decoration: none;
}

.l-blue-s {
	background: none !important;
	padding: 10px 0 !important;
	border-top: 1px #cbcbcb solid !important;
	border-bottom: 1px #cbcbcb solid !important;
}

.l-blue-s ul {
	margin: 0 0 0 8px !important;
}

.l-blue-s ul li {
	list-style-type: square !important;
	margin-bottom: 5px !important;
}
]]></>).toString());

