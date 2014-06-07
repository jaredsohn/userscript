// ==UserScript==
// @name        10C Fix for Users with Eyes (Inverted)
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
".SpParticipated {" +
"   background: url('http://community.pearljam.com/applications/dashboard/design/images/sprites.png') -64px -228px no-repeat;" +
"}" +
".MeButton:hover {" +
"   background: #222;" +
"}" +
".Main.Container div.Row {" +
"   color: #fff !important;" +
"   background: #000 !important; " +
"}" +
"a.FlyoutButton:hover {" +
"   background: #222; " +
"}" +
".SpNotifications {" +
"   background-position: -32px -212px;" +
"}" +
".SpInbox {" +
"   background-position: 0 -228px;" +
"}" +
".SpBookmarks {" +
"   background-position: -80px -244px;" +
"}" +
".SpOptions {" +
"   background-position: 0 -212px;" +
"}" +
".SpSearch {" +
"   background: url('http://vanillicon.com/sprites/sprites-14-ffffff.png') -220px -100px no-repeat !important;" +
"}" +
".UserSignature {" +
"   border-top: 1px solid #999;" +
"}" +
".DiscussionsTable .Read {" +
"   background: #222 !important;" +
"}" +
".OptionsTitle {" +
"   background: url('http://vanillicon.com/sprites/sprites-14-ffffff.png') -176px -59px no-repeat !important;" +
"}" +
"div.Comment div.Options * {" +
"   color: #000 !important;" +
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
"	background: #555;" +
"	border-radius: 8px;" +
"}" +
"a.ReactButton.Quote:hover {" +
"	color: #000 !important;" +
"	background: #00c8fb;" +
"}" +
".Panel .MeBox a, .BreadcrumbsWrap, .BreadcrumbsWrap a, .NumberedPager a {" +
"	font-size: 14px !important;" +
"	color: #fff !important;" +
"}" +
".Panel .MeBox ul a {" +
"   color: #000 !important;" +
"}" +
".CommentInfo a, .DiscussionMeta a {" +
"	font-size: 14px !important;" +
"   color: #999 !important;" +
"}" +
".DiscussionMeta .MItem.Category {" +
"    display: none;" +
"}" +
"h2.CommentHeading {" +
"   display: none;" +
"}" +
".Pager {" +
"   margin-bottom: 8px;" +
"}" +
"a.Highlight {" +
"	padding: 0 4px;" +
"	color: #fff !important;" +
"	background: #222;" +
"	border-radius: 4px;" +
"}" +
".NumberedPager a {" +
"	padding: 0 4px;" +
"	border-radius: 4px;" +
"}" +
"a.Highlight:hover, .NumberedPager a:hover {" +
"	color: #000 !important;" +
"	background: #00c8fb;" +
"}" +
"a.FlagContent {" +
"	float: right;" +
"	margin-top: -2em;" +
"	font-size: 10px !important;" +
"	color: #ff0000 !important;" +
"	text-transform: uppercase;" +
"}" +
".Panel {" +
"	float: left;" +
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
"}" +
".CategoryFilterTitle {" +
"	display: none !important;" +
"}" +
".Panel ul, .Panel h4, .Panel .PhotoGrid {" +
"	display: none;" +
"}" +
".Panel .Flyout ul {" +
"	display: block;" +
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
"h1.H {" +
"	margin-top: 30px;" +
"}" +
".DataListWrap h1 {" +
"	margin-top: -30px;" +
"}" +
"h1.H.HomepageTitle {" +
"	margin-top: 0 !important;" +
"}" +
".CategoryGroup h2.H {" +
"	margin: 8px 0 4px 0 !important;" +
"}" +
"table.DataTable.CategoryTable .Item.Depth2 {" +
"	background: rgba(255,255,255,0.2) !important;" +
"}" +
"table.DataTable.CategoryTable .Item.Alt.Depth2 {" +
"	background: rgba(255,255,255,0.1) !important;" +
"}" +
"section.Content {" +
"	margin-top: -30px !important;" +
"	width: 100% !important;" +
"	padding-left: 0 !important;" +
"   font-family: Verdana,Helvetica,Arial,sans-serif !important;" +
"}" +
"div.DataTableWrap table a {" +
"   color: #fff !important;" +
"}" +
".ItemDiscussion {" +
"	padding: 0 !important;" +
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
"	background: #333;" +
"	border: 2px solid #999 !important;" +
"	border-radius: 8px;" +
"	clear: both;" +
"}" +
".Message a, .Reactions a {" +
"	color: #8fb4ec !important;" +
"}" +
".Message a:hover, .Reactions a:hover {" +
"	color: #00c8fb !important;" +
"}" +
"div.AuthorWrap {" +
"	color: #fff !important;" +
"	background: #555 !important;" +
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
"div.Message {" +
"	font-size: 14px !important;" +
"	clear: both;" +
"}" +
".UserQuote {" +
"   border: 1px solid #999;" +
"   border-left: 10px solid #999 !important;" +
"}" +
".PostEdited {" +
"   display: none;" +
"}" +
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
"}" +
".MiniPager a {" +
"	padding: 2px 4px;" +
"	color: #fff !important;" +
"   font-size: 10pt;" +
"	background: #222;" +
"	border-radius: 4px;" +
"}" +
".MiniPager a:hover {" +
"   color: #000 !important;" +
"	background: #00c8fb;" +
"}" +
".Tag-Poll {" +
"   background: #2d679c !important" +
"}" +
".HasNew {" +
"   position: relative;" +
"   top: -2px;" +
"   background: none !important;" +
"   color: #fff000;" +
"   border: 1px solid #fff000 !important;" +
"	border-radius: 4px;" +
"}" +
".Content ul.DataList * {" +
"   color: #fff !important;" +
"}" +
"div.ItemContent.Discussion {" +
"   margin-bottom: -1px !important;" +
"   padding: 1em 0.5em;" +
"   border-bottom: 1px solid #444;" +
"}" +
"li.Read {" +
"   background: #222 !important;" +
"}"
);