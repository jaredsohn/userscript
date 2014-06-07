// ==UserScript==
// @name        10C Legacy Forum Style
// @namespace   http://mikedeep.com
// @description Changes the appearance of the new Pearl Jam forums to better match the old design.
// @include     http://community.pearljam.com/*
// @version     1
// @grant       none
// ==/UserScript==

// overriding css
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// add participated button if logged in
check = document.getElementsByClassName('MeMenu')[0];
if(check != null) {
    var element = document.createElement('span');
    element.className = "Static";
    document.getElementsByClassName('MeMenu')[0].appendChild(element);
    var element2 = document.createElement('a');
    element2.className = "MeButton";
    document.getElementsByClassName('Static')[0].appendChild(element2);
    element2.href = "http://community.pearljam.com/discussions/participated";
    element2.title = "Participated Discussions";
    var element3 = document.createElement('span');
    element3.className = "Sprite Sprite16 SpParticipated";
    document.getElementsByClassName('MeButton')[4].appendChild(element3);
}

// add forum icons
var forums = document.getElementsByClassName('CategoryName');
var forumicon = [];
for (var i = 0; i < forums.length; i++) {
    forumicon[i] = document.createElement('div');
    forumicon[i].innerHTML = "&nbsp;";
    forumicon[i].className = "threadicon";
    forums[i].appendChild(forumicon[i]);
}

// add thread icons
var threads = document.getElementsByClassName('DiscussionName');
var threadicon = [];
for (var i = 0; i < threads.length; i++) {
    threadicon[i] = document.createElement('div');
    threadicon[i].innerHTML = "&nbsp;";
    threadicon[i].className = "threadicon";
    threads[i].appendChild(threadicon[i]);
}

// add thread icons (participated)
var discussions = document.querySelectorAll('li.ItemDiscussion');
var threadicon = [];
for (var i = 0; i < discussions.length; i++) {
    threadicon[i] = document.createElement('div');
    threadicon[i].innerHTML = "&nbsp;";
    threadicon[i].className = "threadicon";
    discussions[i].appendChild(threadicon[i]);
}

addGlobalStyle (
"/***************************************************/" +
"/* GENERAL                                         */" +
"/***************************************************/" +
".Main.Container div.Row {" +
"   color: #fff !important;" +
"   background: #000 !important; " +
"}" +
"div.BreadcrumbsWrap {" +
"   margin-bottom: 1em !important;" +
"   padding-bottom: 0.5em;" +
"   border-bottom: 1px dashed #790000;" +
"   font-size: 12px;" +
"   font-weight: bold;" +
"   font-family: Verdana,Helvetica,Arial,sans-serif !important;" +
"}" +
"section.Content {" +
"	margin-top: -30px !important;" +
"	width: 100% !important;" +
"	padding-left: 0 !important;" +
"   font-family: Verdana,Helvetica,Arial,sans-serif !important;" +
"}" +
".Panel .MeBox a, .BreadcrumbsWrap a {" +
"   color: #fff;" +
"}" +
".DiscussionMeta a {" +
"	color: #000 !important;" +
"}" +
".CommentInfo a {" +
"	font-size: 10px !important;" +
"	color: #000 !important;" +
"}" +
".Message a, .Reactions a, .UserSignature a {" +
"	color: #005ea6 !important;" +
"}" +
"a.Highlight {" +
"	color: #fff !important;" +
"	background: #790000 !important;" +
"}" +
"div.DataTableWrap {" +
"   margin: 1em 0;" +
"   padding: 0.5em 1em 1em 1em;" +
"   color: #000 !important;" +
"   background: #fff;" +
"   border-radius: 8px;" +
"}" +
"h1.H {" +
"   margin: 40px 0 0 0;" +
"   font-size: 16pt !important;" +
"   font-family: 'Trebuchet MS',Arial,Helvetica,sans-serif !important;" +
"}" +
"h1.H.HomepageTitle, div.MessageList.Discussion h1 {" +
"	margin: 0.5em 0 0 0 !important;" +
"}" +
"h2.H {" +
"   font-size: 10pt;" +
"   font-weight: bold;" +
"}" +
".Button {" +
"   background: #790000;" +
"}" +
"/***************************************************/" +
"/* PAGINATION                                      */" +
"/***************************************************/" +
".Pager {" +
"   margin-bottom: 8px;" +
"}" +
".NumberedPager a {" +
"   margin: 2px;" +
"   line-height: 10pt !important;" +
"	padding: 0 2px !important;" +
"   color: #000;" +
"   font-size: 8pt;" +
"   font-weight: normal;" +
"   background: #fff;" +
"   border: 1px solid #790000;" +
"}" +
"a.Highlight:hover, .NumberedPager a:hover {" +
"	color: #fff !important;" +
"	background: #790000;" +
"}" +
"a.QuickSearchButton, a.QuickSearchButton:hover {" +
"   position: relative;" +
"   top: -1px;" +
"   left: -1px;" +
"   background: none;" +
"   border: 0;" +
"}" +
".QuickSearch .Sprite {" +
"   background: url('http://vanillicon.com/sprites/sprites-14-ffffff.png') -220px -100px no-repeat;" +
"   border: 0;" +
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
"	top: 30px;" +
"	left: 721px;" +
"}" +
".Panel .MeBox {" +
"	margin-top: -29px;" +
"	min-width: 250px;" +
"}" +
".Panel .MeBox ul a {" +
"   color: #000 !important;" +
"}" +
".Panel .BoxButtons {" +
"	position: relative;" +
"	top: -60px;" +
"	left: 721px;" +
"}" +
".Panel .BoxButtons .Button.Primary {" +
    "   width: 80% !important;" +
"}" +
".Panel .BoxButtons .Button.Primary.Handle {" +
    "   width: 20% !important;" +
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
"   color: #fff !important;" +
"   background: #790000 !important;" +
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
".Panel .Button.NewConversation.Primary {" +
"	display: none;" +
"}" +
".CategoryFilterTitle {" +
"	display: none !important;" +
"}" +
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
"/***************************************************/" +
"/* FORUM INDEX                                     */" +
"/***************************************************/" +
"table.DataTable.CategoryTable div.threadicon {" +
"   float: left;" +
"   display: inline-block;" +
"   margin: 8px 8px 8px 0;" +
"   width: 27px;" +
"   height: 27px;" +
"}" +
"table.DataTable.CategoryTable tr.Depth2.Unread td.CategoryName div.threadicon {" +
"   background: #a0d047;" +
"}" +
"table.DataTable.CategoryTable tr.Depth2.Read td.CategoryName div.threadicon {" +
"   background: #00c7ee;" +
"}" +
"table.DataTable.CategoryTable thead div.threadicon {" +
"   display: none !important;" +
"}" +
"table.DataTable.CategoryTable tbody td.CategoryName div.Wrap {" +
"   display: inline-block;" +
"   width: 450px;" +
"	min-height: 42px;" +
"}" +
"div.CategoryGroup {" +
"   margin: 1em 0;" +
"   padding: 0.5em 1em 1em 1em;" +
"   color: #000 !important;" +
"   background: #fff;" +
"   border-radius: 8px;" +
"}" +
"div.CategoryGroup div.DataTableWrap {" +
"   margin: 0;" +
"   padding: 0;" +
"   background: none;" +
"   border: 0;" +
"   border-radius: 0;" +
"}" +
"div.CategoryGroup h2.H {" +
"	margin: 0 0 8px 0 !important;" +
"}" +
"table.DataTable.CategoryTable {" +
"   margin-top: -1em !important;" +
"	background: #fff !important;" +
"}" +
"table.DataTable.CategoryTable tr, table.DataTable.CategoryTable td {" +
"   border-bottom: 1px dashed #790000 !important;" +
"   background: none !important;" +
"}" +
"table.DataTable.CategoryTable a, a.BlockTitle.LatestPostTitle {" +
"   color: #790000 !important;" +
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
"   background: #fff;" +
"}" +
"table.DataTable.CategoryTable tbody td.BigCount {" +
"   font-size: 10pt !important;" +
"}" +
"/***************************************************/" +
"/* FORUM VIEW                                      */" +
"/***************************************************/" +
"table.DataTable.DiscussionsTable div.threadicon {" +
"   float: left;" +
"   display: inline-block;" +
"   margin: 8px 8px 8px 0;" +
"   width: 27px;" +
"   height: 27px;" +
"}" +
"table.DataTable.DiscussionsTable thead div.threadicon {" +
"   display: none !important;" +
"}" +
".ItemDiscussion div.threadicon {" +
"   background: #a0d047;" +
"}" +
".Read.ItemDiscussion div.threadicon {" +
"   background: #00c7ee;" +
"}" +
".Announcement.ItemDiscussion div.threadicon {" +
"   background: #821a18;" +
"}" +
".Closed.ItemDiscussion div.threadicon {" +
"   background: #c5c5c5;" +
"}" +
".Meta.Meta-Discussion {" +
"   display: none;" +
"}" +
"table.DataTable.DiscussionsTable tbody td.DiscussionName div.Wrap {" +
"   display: inline-block;" +
"   width: 565px;" +
"	min-height: 42px;" +
"}" +
"div.Wrap span.Options {" +
"   display: none;" +
"}" +
".PhotoWrap.PhotoWrapSmall {" +
"   display: none;" +
"}" +
".FirstUser {" +
"   display: none;" +
"}" +
"div.DataTableWrap table tr td div > a {" +
"   color: #790000 !important;" +
"}" +
"div.DataTableWrap table tr td div > a:hover {" +
"   color: #790000 !important;" +
"}" +
".ItemDiscussion td {" +
"	background: none !important;" +
"   border-bottom: 1px dashed #790000 !important;" +
"}" +
".Read.ItemDiscussion {" +
"   background: none !important;" +
"}" +
".ItemDiscussion td.BigCount {" +
"   font-size: 10pt !important;" +
"   font-weight: normal !important;" +
"}" +
"td.LastUser {" +
"   width: 150px !important;" +
"}" +
".HasNew {" +
"   position: relative;" +
"   top: -1px;" +
"   background: none !important;" +
"   border: 1px solid #ffae00 !important;" +
"	border-radius: 4px;" +
"}" +
".HasNew, .HasNew .Number {" +
"   color: #ffae00 !important;" +
"}" +
".Tag-Poll {" +
"   background: #2d679c !important" +
"}" +
"span.MiniPager {" +
"   float: right;" +
"   margin-top: 20px;" +
"}" +
".MiniPager a {" +
"	padding: 0 2px;" +
"	color: #000 !important;" +
"   font-size: 8pt;" +
"   border: 1px solid #790000;" +
"}" +
".MiniPager a:hover {" +
"   color: #fff !important;" +
"	background: #790000;" +
"}" +
"/***************************************************/" +
"/* THREAD VIEW                                     */" +
"/***************************************************/" +
"h2.CommentHeading {" +
"   display: none;" +
"}" +
"div.Discussion {" +
"   margin: 0 0 -2em -8px !important;" +
"   padding: 0 !important;" +
"}" +
"div.ItemContent.Discussion .Meta-Discussion span," +
"div.ItemContent.Discussion .Meta-Discussion span a {" +
"   color: #000;" +
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
"	border-radius: 8px;" +
"	clear: both;" +
"}" +
"div.AuthorWrap {" +
"	color: #000 !important;" +
"	background: #ffffcc !important;" +
"}" +
"div.AuthorWrap a {" +
"	color: #000 !important;" +
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
"   padding: 2px 2px 0 0;" +
"	font-size: 10px !important;" +
"	color: #ff0000 !important;" +
"	text-transform: uppercase;" +
"}" +
"div.Message {" +
"   color: #000;" +
"	font-size: 13px !important;" +
"	clear: both;" +
"}" +
"div.Signature {" +
"   color: #000;" +
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
"	border-radius: 4px;" +
"}" +
"a.ReactButton.Quote:hover {" +
"	background: #790000;" +
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
"div.MessageForm a {" +
"   color: #fff;" +
"}" +
"form#Form_Comment {" +
"   margin-top: -20px;" +
"}" +
".MessageList.Discussion div.Options {" +
"   margin-top: 8px;" +
"}" +
".PageTitle .OptionsTitle {" +
"   background: url('http://vanillicon.com/sprites/sprites-14-ffffff.png') -176px -59px no-repeat !important;" +
"}" +
".Comment .OptionsTitle {" +
"   margin-top: 4px;" +
"}" +
".PollForm {" +
"	color: #000 !important;" +
"}" +
".PollResults {" +
"   color: #000 !important;" +
"}" +
"/***************************************************/" +
"/* EDIT DISCUSSION                                 */" +
"/***************************************************/" +
"div#DiscussionForm h1.H {" +
"   margin-top: 60px;" +
"}" +
"div#DiscussionForm div.FormWrapper {" +
"   margin-top: -60px;" +
"}" +
"/***************************************************/" +
"/* PARTICIPATED DISCUSSIONS LIST                   */" +
"/***************************************************/" +
"ul.DataList.Discussions.Participated div.threadicon {" +
"   float: left;" +
"   display: inline-block;" +
"   margin: -15px 8px 8px 2px;" +
"   width: 27px;" +
"   height: 27px;" +
"}" +
"ul.DataList.Discussions.Participated div.Discussion {" +
"   padding-left: 50px !important;" +
"   width: 800px;" +
"}" +
"ul.DataList.Discussions.Participated div.Discussion div.Meta.Meta-Discussion {" +
"   display: block;" +
"}" +
"ul.DataList.Discussions.Participated div.Discussion div.Meta.Meta-Discussion .ViewCount," +
"ul.DataList.Discussions.Participated div.Discussion div.Meta.Meta-Discussion .Tag-Announcement," +
"ul.DataList.Discussions.Participated div.Discussion div.Meta.Meta-Discussion .Tag-Closed," +
"ul.DataList.Discussions.Participated div.Discussion div.Meta.Meta-Discussion .Category {" +
"   display: none;" +
"}" +
".Content ul.DataList.Participated {" +
"   margin-bottom: 1em;" +
"   color: #000;" +
"   background: #fff;" +
"   border-radius: 8px;" +
"}" +
".Content ul.DataList.Participated li {" +
"   margin: 0 1em;" +
"   padding: 1em;" +
"   min-height: 70px;" +
"   border-bottom: 1px dashed #790000;" +
"}" +
".Content ul.DataList li:last-child {" +
"   border: 0;" +
"}" +
"/***************************************************/" +
"/* PROFILE/PREFERENCES/MESSAGES                    */" +
"/***************************************************/" +
".Dashboard section.Content {" +
"	margin-top: -30px !important;" +
"	width: 720px !important;" +
"}" +
".Dashboard section.Content h1.H {" +
"   margin: 3em 0 -3em 20px;" +
"}" +
".Dashboard.preferences section.Content h1.H {" +
"   margin: 0 0 0 20px;" +
"}" +
".Dashboard section.Content h2.H {" +
"   margin: 3em 0 0 20px;" +
"}" +
".Dashboard .Panel {" +
"	float: none;" +
"}" +
".Dashboard.preferences .Panel {" +
"   margin-top: 3em;" +
"}" +
".Dashboard #Panel ul {" +
"   display: block !important;" +
"}" +
".Dashboard .Panel .SiteSearch {" +
"	display: none;" +
"}" +
".Profile.preferences .Main.Container .UserBox {" +
"	margin-top: -30px;" +
"}" +
".Profile.preferences h1.H {" +
"	position: relative;" +
"	top: 30px;" +
"}" +
"ul.DataList.Conversations li.Item.Read, ul.DataList.MessageList.Conversation {" +
"   background: #fff;" +
"   border-radius: 8px;" +
"}" +
"ul.DataList.Conversations a {" +
"   color: #790000;" +
"}" +
".DataListWrap h1.H {" +
"	margin: -30px 0 8px 0;" +
"}" +
".DataListWrap h1.H a {" +
"   color: #fff;" +
"}" +
"div.ProfileOptions * {" +
"   color: #fff;" +
"}" +
"dl.About dt {" +
"   color: #b9b9b9 !important;" +
"}" +
"a.NavButton.ProfileButtons {" +
"   color: #000;" +
"}"
);