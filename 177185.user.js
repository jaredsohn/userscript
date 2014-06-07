// ==UserScript==
// @name		TrueAchievements Dark Theme
// @description	This theme is dark
// @version		1.4
// @date		2013-09-03
// @creator		Loran Lewis (kegonomics)
// @homepage	http://loranlewis.com/
// @include		http://www.trueachievements.com/*
// ==/UserScript==

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle('body,div.smallpanel h4,h1, h2,.newswrapper a.mainlink,h1.block, h2.block, h3.block, h4.block, h5.block, h6.block, .helppage h4,div.gamescore div.TA,div.blogpost h5,div.avatarmotto,#txtInviteLink,span.forumfilter,div.datalist table.header a,div.friendfeed,span.dlcpacktype,#sidebar div.loggedin h4 a.name{color:#FFFEFE;}');
addGlobalStyle('#page-wrap{background-color:#000000;}');
addGlobalStyle('#page,div.tabs,#breadcrumbs,.inputform,div.mscol,div.leaderboardadmin,#divChatBody{background-color:#222222;}');
addGlobalStyle('#main-wrap,#sidebar div.smallpanel,div.tabs li.selected,table.maintable td.comments,.menuitems li,div.datalist table.dl td,#chlAchievements tr.odd td{background-color:#333333;}');
addGlobalStyle('.newsdetails h3,div.tabs li a{color:#999999;}');
addGlobalStyle('h3,.walkthroughpage div.disclaimer,.walkthroughpage h3,#main div.itemright h3.status,table.maintable span.achdesc,table.comparison div.description{color:#AAAAAA;}');
addGlobalStyle('a, .itemright a, .panelcontent a, .maintable a,#main h1 a.mainlink, #main h1 a.mainlink:visited, #main h2.header a.mainlink, #main h2.header a.mainlink:visited,#divChatHolder span.admin{color:#61CCFF;}');
addGlobalStyle('.itemright a:hover, .panelcontent a:hover, .maintable a:hover, .friendfeed a:hover, .walkthroughsummary a:hover, .friendfeeditem span a:hover{border-color:#AAFFAA;color:#AAFFAA;}');
addGlobalStyle('div.community h5, div.newswrapper div.community p, div.site-news h5, div.newswrapper div.site-news p{color:#BF5FFF;}');
addGlobalStyle('div.xbox-one h5, div.newswrapper div.xbox-one p,div.tabs .tab_xbox_one a u, div.tabs .tab_darkgreen a u{color:#00FF66;}');
addGlobalStyle('div.tabs .tab_xbox_one a, div.tabs .tab_darkgreen a{border-color:#00FF66;}');
addGlobalStyle('div.tabs li.selected a, div.tabs a:hover{color:#FFFEFE;}');
addGlobalStyle('textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"], .uneditable-input,select{background-color:#444444;border-color:#555555;}');
addGlobalStyle('select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"], .uneditable-input,.smallpanel table td.pos,table.maintable span.sitestatus, table.reviews span.sitestatus,.categories h5, .categories h5 a,table.maintable td.author div.info{color:#BBBBBB;}');
addGlobalStyle('.filter textarea, .filter input[type="text"], .filter input[type="password"], .filter input[type="datetime"], .filter input[type="datetime-local"], .filter input[type="date"], .filter input[type="month"], .filter input[type="time"], .filter input[type="week"], .filter input[type="number"], .filter input[type="email"], .filter input[type="url"], .filter input[type="search"], .filter input[type="tel"], .filter input[type="color"], .filter .uneditable-input,.filter select{background-color:#222222;border-color:#555555;}');
addGlobalStyle('div.panelpurple h4,div.tabs .tab_kinect a, div.tabs .tab_purple a,div.kinect h5, div.newswrapper div.kinect p{border-color:#9B30FF;}');
addGlobalStyle('div.panelpurple h4 u, div.panelpurple h4 a.name u,div.tabs .tab_kinect a u, div.tabs .tab_purple a u,div.kinect h5, div.newswrapper div.kinect p{color:#9B30FF;}');
addGlobalStyle('.ih,#main div.buttonpanel,.menuitems{background-color:#555555;border-color:#999999;}');
addGlobalStyle('div.paneltabs a.selected{background-color:#333333 !important;border-bottom-color:#333333;}');
addGlobalStyle('div.paneltabs a, div.paneltabs a:visited,div.paneltabs a:hover, div.paneltabs a:active{background-color:#444444 !important;}');
addGlobalStyle('.button{border-bottom-color:#222222 !important;}');
addGlobalStyle('.button:hover{border-color:rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;}');
addGlobalStyle('h1.pagetitle, h2.pagetitle, h3.pagetitle, h4.pagetitle, .helppage h3{color:#FFFEFE;}');
addGlobalStyle('table.filter,table.maintable th,.adv_editbox .toolbar,.menuitems li:hover,div.grey,div.filter{background-color:#444444;}');
addGlobalStyle('table.maintable tr.odd td,.messageboardholder table.messageboard tr.odd td,#chlAchievements tr.even td{background-color:#222222;border-bottom:none;}');
addGlobalStyle('table.maintable tr.even td,.messageboardholder table.messageboard tr.even td{background-color:#333333;border-bottom:none;}');
addGlobalStyle('.messageboardholder table.messageboard tbody tr{border-bottom:none;}');
addGlobalStyle('span.quote, .podcast_related{background-color:#555555 !important;border-color:#AAAAAA !important;}');
addGlobalStyle('table.maintable td.posted, table.maintable td.author, table.maintable td.voting, table.maintable td.subject{border-top: 5px solid #222222;}');
addGlobalStyle('table.solutions,.blogpost{border-bottom: 5px solid #222222;}');
addGlobalStyle('div.news div.details, div.bloglist div.blogpost{background-color:#333333;border-bottom: 5px solid #222222;}');
addGlobalStyle('#divNewsDateFilter,.walkthroughsummary h4{color:inherit;}');
addGlobalStyle('#main div.links span.achsame a{color:inherit !important;');
addGlobalStyle('label.filterheader{background-color:#444444;color:inherit;}');
addGlobalStyle('.taCal td.selected{box-shadow: 0 0 15px 5px #CDAD00 inset;background-color:inherit;}');
addGlobalStyle('#main .red h1, #main .red h2{background-color:#9B4D4D;padding-left: 5px !important;}');
addGlobalStyle('#main .green h1, #main .green h2{background-color:#4D844D;padding-left: 5px !important;}');
addGlobalStyle('table.maintable tr.myrow td, table.maintable tr.green td, table.maintable tr.selected td, table.gamertags tr.green td{background-color:#4D844D;border-top:2px solid #333333;border-bottom:2px solid #333333;}');
addGlobalStyle('div.datalist table.header td{background-color:#333333;color:inherit}');
addGlobalStyle('div.friendfeeditem span.red,table.comparison td.red{background-color:#9B4D4D;}');
addGlobalStyle('div.friendfeeditem span.green,tr.myrow td, tr.selected td,table.comparison td.green{background-color:#4D844D;');
addGlobalStyle('div.friendfeeditem span.purple{background-color:#4D4D9B;');
addGlobalStyle('div.friendfeeditem span.purple a{color:#B4B4D5 !important;');
addGlobalStyle('div.friendfeeditem span.blue{background-color:#006BB2;');
addGlobalStyle('div.friendfeeditem .Comment, #divAddComment,div.friendfeeditem .OtherComments p{background-color:#777777;');
addGlobalStyle('div.friendfeeditem .Comment, #divAddComment{margin-left:150px;');
addGlobalStyle('table.comparison tr.header td,div.friendfeeditem span.yellow{background-color:#DB864D;');
addGlobalStyle('table.comparison tr.header td a,div.friendfeeditem span.yellow a{color:#F6E1D2 !important;');
addGlobalStyle('div.friendfeeditem span.pink{background-color:#FF4D94;}');
addGlobalStyle('div.friendfeeditem span.pink a{color:#FFCADF !important;}');
addGlobalStyle('div.friendfeed h6.eventsum{background-color:#006060;}');
addGlobalStyle('div.friendfeed h6.eventsum a{color:#C0D8D8 !important;}');
addGlobalStyle('div.friendfeeditem span.achdesc{color:#CCCCCC;}');
addGlobalStyle('.friendfeed a,div.friendfeeditem .OtherComments p a{color:#61CCFF !important;');
addGlobalStyle('div.friendfeed h6,div.friendfeeditem span{background-color:#555555;color:#FFFEFE;}');
addGlobalStyle('ul.chartlist li{border-color:#111111;}');
addGlobalStyle('ul.chartlist .index{background-color:#111111;}');
addGlobalStyle('#main .red a, #main .red a{color:#FFAAAA !important;}');
addGlobalStyle('#main .green a, #main .greeb a,tr.myrow td a{color:#AAFFAA !important;}');
addGlobalStyle('.informationpanel, div.information{background-color:#DB864D;color:#FFFEFE;text-shadow:0 1px 0 #000000;');
addGlobalStyle('table.maintable td.subject{border-top:none;');