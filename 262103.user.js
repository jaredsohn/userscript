// ==UserScript==
// @name        10C Fix for Users with Eyes
// @namespace   http://mikedeep.com
// @description Fixes the new Pearl Jam forums for people who want to be able to see.
// @include     http://community.pearljam.com/*
// @version     1
// @grant       none
// ==/UserScript==

var element = document.createElement("span");
element.className = "Static";
document.getElementsByClassName('MeMenu')[0].appendChild(element);

var element2 = document.createElement("a");
element2.className = "MeButton";
document.getElementsByClassName('Static')[0].appendChild(element2);
element2.href = "http://community.pearljam.com/discussions/participated";
element2.title = "Participated Discussions";

var element3 = document.createElement("span");
element3.className = "Sprite Sprite16 SpParticipated";
document.getElementsByClassName('MeButton')[4].appendChild(element3);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle (
"/***************************************************/" +
"/* GENERAL                                         */" +
"/***************************************************/" +
".SpParticipated {" +
"   background: url('http://community.pearljam.com/applications/dashboard/design/images/sprites.png') -80px -164px no-repeat;" +
"}" +
"section.Content {" +
"	margin-top: -30px !important;" +
"	width: 100% !important;" +
"	padding-left: 0 !important;" +
"   font-family: Verdana,Helvetica,Arial,sans-serif !important;" +
"}" +
".Panel .MeBox a, .BreadcrumbsWrap, .BreadcrumbsWrap a," +
".NumberedPager a, .CommentInfo a, .DiscussionMeta a {" +
"	font-size: 14px !important;" +
"	color: #000 !important;" +
"}" +
".Message a, .Reactions a {" +
"	color: #005ea6 !important;" +
"}" +
"a.Highlight {" +
"	padding: 0 4px;" +
"	color: #fff !important;" +
"	background: #999;" +
"	border-radius: 4px;" +
"}" +
".Pager {" +
"   margin-bottom: 8px;" +
"}" +
".NumberedPager a {" +
"	padding: 0 4px;" +
"	border-radius: 4px;" +
"}" +
"a.Highlight:hover, .NumberedPager a:hover {" +
"	color: #000 !important;" +
"	background: #00c8fb;" +
"}" +
".CategoryFilterTitle {" +
"	display: none !important;" +
"}" +
"div.CategoryGroup, div.DataTableWrap {" +
"   margin: 1em 0;" +
"   padding: 1em;" +
"   background: #f2f2f2;" +
"   border-radius: 8px;" +
"}" +
".DataListWrap h1 {" +
"	margin-top: -30px;" +
"}" +
"h1.H.HomepageTitle {" +
"	margin: 0 !important;" +
"}" +
"h2.H {" +
"   font-size: 10pt;" +
"   font-weight: bold;" +
"}" +
"div.CategoryGroup h2.H {" +
"	margin: 0 0 4px 0 !important;" +
"}" +
"/***************************************************/" +
"/* SIDE PANEL                                      */" +
"/***************************************************/" +
".Panel {" +
"	float: left;" +
"   margin-bottom: -1em !important;" +
"}" +
".Panel .SiteSearch {" +
"	position: relative;" +
"	top: 2px;" +
"	left: 500px;" +
"}" +
".Panel .MeBox {" +
"	margin-top: -29px;" +
"	min-width: 250px;" +
"}" +
".Panel .BoxButtons {" +
"	position: relative;" +
"	top: -54px;" +
"	left: 730px;" +
"}" +
".Panel .CategoryFilter {" +
"	position: relative;" +
"	top: -40px;" +
"   width: 300px;" +
"}" +
".Panel ul, .Panel h4, .Panel .PhotoGrid {" +
"	display: none;" +
"}" +
".Panel .Flyout ul {" +
"	display: block;" +
"}" +
".Panel .Flyout ul a:hover {" +
"   background: #008fb4 !important;" +
"}" +
".Panel .Button.Action {" +
"	position: relative;" +
"	top: -78px;" +
"	left: 263px;" +
"}" +
".Panel .Button.Danger.BigButton.ClearConversation {" +
"	position: relative;" +
"	top: -41px;" +
"	left: 215px;" +
"}" +
"/***************************************************/" +
"/* FORUM INDEX                                     */" +
"/***************************************************/" +
"table.DataTable.CategoryTable {" +
"   margin-top: -1em !important;" +
"	background: #f2f2f2 !important;" +
"}" +
"table.DataTable.CategoryTable tr, table.DataTable.CategoryTable td {" +
"   border-bottom: 1px dashed #222 !important;" +
"   background: none !important;" +
"}" +
"table.DataTable.CategoryTable a, a.BlockTitle.LatestPostTitle {" +
"   color: #004a79 !important;" +
"}" +
"table.DataTable.CategoryTable h3 {" +
"   font-size: 10pt;" +
"   font-weight: bold;" +
"}" +
"table.DataTable.CategoryTable h3 a {" +
"   margin-left: -9px !important;" +
"}" +
"table.DataTable.CategoryTable thead {" +
"   font-size: 10px;" +
"   text-transform: uppercase;" +
"   background: #f2f2f2;" +
"}" +
"table.DataTable.CategoryTable tbody td.BigCount {" +
"   font-size: 10pt !important;" +
"}" +
"/***************************************************/" +
"/* FORUM VIEW                                      */" +
"/***************************************************/" +
".FirstUser {" +
"   display: none;" +
"}" +
"div.DataTableWrap table tr td div > a {" +
"   color: #004a79 !important;" +
"}" +
"div.DataTableWrap table tr td div > a:hover {" +
"   color: #008fb4 !important;" +
"}" +
".ItemDiscussion td {" +
"	background: none !important;" +
"   border-bottom: 1px dashed #222 !important;" +
"}" +
".Alt.ItemDiscussion, .Read.Alt.ItemDiscussion {" +
"   background: rgba(0,0,0,0.05) !important;" +
"}" +
".Read.ItemDiscussion {" +
"   background: none !important;" +
"}" +
".ItemDiscussion td.BigCount {" +
"   font-size: 10pt !important;" +
"}" +
".HasNew {" +
"   position: relative;" +
"   top: -1px;" +
"   background: none !important;" +
"   color: #ffae00;" +
"   border: 1px solid #ffae00 !important;" +
"	border-radius: 4px;" +
"}" +
".Tag-Poll {" +
"   background: #2d679c !important" +
"}" +
".MiniPager a {" +
"	padding: 2px 4px;" +
"	color: #fff !important;" +
"   font-size: 10pt;" +
"	background: #999;" +
"	border-radius: 4px;" +
"}" +
".MiniPager a:hover {" +
"   color: #000 !important;" +
"	background: #00c8fb;" +
"}" +
"/***************************************************/" +
"/* THREAD VIEW                                     */" +
"/***************************************************/" +
"h2.CommentHeading {" +
"   display: none;" +
"}" +
"div.ItemContent.Discussion {" +
"   margin-bottom: 1em;" +
"   padding: 1em 0;" +
"}" +
"div.ItemContent.Discussion .Meta-Discussion span," +
"div.ItemContent.Discussion .Meta-Discussion span a {" +
"   color: #000 !important;" +
"}" +
".DiscussionMeta .MItem.Category {" +
"    display: none;" +
"}" +
".MessageList.Discussion .Discussion {" +
"	width: 920px !important;" +
"	padding: 4px 8px 8px 8px !important;" +
"}" +
".MessageList.Discussion .Discussion .Item-Body {" +
"	width: 900px !important;" +
"}" +
".MessageList.Discussion .Discussion, .ItemComment {" +
"	margin: 1em 0 !important;" +
"	background: #f2f2f2;" +
"	border: 2px solid #999 !important;" +
"	border-radius: 8px;" +
"	clear: both;" +
"}" +
"div.AuthorWrap {" +
"	color: #fff !important;" +
"	background: rgba(0,0,0,0.33) !important;" +
"}" +
"div.AuthorWrap a {" +
"	color: #fff !important;" +
"}" +
".PostCount {" +
"	display: none !important;" +
"}" +
".AuthorLocation {" +
"	padding-left: 1em;" +
"}" +
".ProfilePhotoMedium {" +
"	width: auto !important;" +
"	height: 47px !important;" +
"}" +
"a.FlagContent {" +
"	float: right;" +
"	margin-top: -2em;" +
"	font-size: 10px !important;" +
"	color: #ff0000 !important;" +
"	text-transform: uppercase;" +
"}" +
"div.Message {" +
"	font-size: 14px !important;" +
"	clear: both;" +
"}" +
".PostEdited {" +
"   display: none;" +
"}" +
"span.ReactSprite {" +
"	background: url('http://community.pearljam.com/applications/dashboard/design/images/sprites-14-ffffff.png') -316px -6px no-repeat;" +
"}" +
"a.ReactButton.Quote {" +
"	position: relative;" +
"	left: 818px;" +
"	padding: 4px 8px;" +
"	color: #fff !important;" +
"	font-size: 10pt;" +
"	font-weight: bold;" +
"	text-transform: uppercase;" +
"	background: #999;" +
"	border-radius: 8px;" +
"}" +
"a.ReactButton.Quote:hover {" +
"	color: #000 !important;" +
"	background: #00c8fb;" +
"}" +
"/***************************************************/" +
"/* MISC.                                           */" +
"/***************************************************/" +
".Button.Primary.Okay {" +
"	background: #00c8fb !important;" +
"}" +
".FormTitleWrapper h1 {" +
"	position: relative;" +
"	top: -30px;" +
"}" +
".FormTitleWrapper form {" +
"	position: relative;" +
"	top: 20px;" +
"	margin-bottom: 20px !important;" +
"}" +
".Panel .Button.NewConversation.Primary {" +
"	display: none;" +
"}" +
".Profile.preferences .Main.Container .UserBox {" +
"	margin-top: -30px;" +
"}" +
".Profile.preferences h1.H {" +
"	position: relative;" +
"	top: 30px;" +
"}"
);