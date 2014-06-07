// ==UserScript==
// @name          Retro Tested - Advanced
// @namespace     thanks to http://clarketk.com
// @description   header replacement script, and more!
// @include       http://www.tested.com/*
// @match         http://www.tested.com/*
// @version       2.9.8
// ==/UserScript==

document.getElementById("header").getElementsByTagName("img")[0].src = "http://i.imgur.com/kgPoe.png";

document.getElementById("footer").getElementsByTagName("img")[0].src = "http://i.imgur.com/kgPoe.png";

document.getElementsByTagName('head')[0].getElementsByTagName('link')[1].href = "http://web.archive.org/web/20110726112327/http://www.tested.com/favicon.ico";

var sheet = document.createElement('style')
sheet.innerHTML = "#header img { margin-bottom:42px; }body { background:url(http://tothebasement.com/tested/bg.png); background-repeat:repeat; }.flair{ display:none; }#header section.social { height:0; }html body #header nav a:hover { color:#b1d4e3; }html body #header nav li.on a { color:#b1d4e3; }#header section.social .social-inner { position:absolute; left:800px; top:20px; width:475px; }html body section.section-content p { color:#1f1f1f; }html body section.section-content section.info p.description { color:#1f1f1f; }body section.section-content section { background-color:#dedede; color:#1b1b1b; }#header nav { width:100%; height:20px; clear:both; background-color:#2E669E; box-shadow:rgba(0,0,0,0.35) 0 2px 10px; background-image:0; background-image:0; background-image:0; background-image:0; background-image:linear-gradient(#2E669E,#224C77); display:0; display:0; display:box; }.section-content.forum>section.two-columns>section,.section-content.forum>section.two-columns>aside { background:#dedede; }section.podcast-player section.img {background-image: url(http://tothebasement.com/tested/cfw.png);}section.podcast-player section.img span.title {color: #c41616;text-shadow: 1px 1px 3px #040404;}section.podcast-player section.img span.schedule {color: #B1D4E3;text-shadow: 1px 1px 3px #040404;}html a.title{color: #000000;}a{color: #910707;}html a:hover{color: #224C77;}html section.contact a:hover{color: #b1d4e3;}html footer a:hover{color: #b1d4e3;}html body .topics-browse header .create-topic:hover{color: #b1d4e3;}html body section.info-site {background: none;}body .topics-browse header .create-topic::after {background: url(http://tothebasement.com/tested/arrow-sprite.png) -8px 0;width:8px;height:9px;position:absolute;top:50%;right:3px;margin-top:-4px;}section.two-columns, section.featured-publishable.featured-video, section.promo-carousel, .forum section.two-columns section, section.two-columns aside, section.section-content.forum section.two-columns aside {outline: 3px solid #000000;}section.section-content.forum section.two-columns, .forum section.two-columns section.topics-browse, .forum section.two-columns section.top-posters, .forum section.two-columns section.boards, html body section.two-columns section.pagination, section.section-content section.two-columns aside, section.two-columns section section.forum-thread, section.two-columns section section.forum-thread section.forum-thread-posts, section.forum-thread section.forum-thread-posts ul li.forum-thread-post section {outline: none;}";
document.body.appendChild(sheet);