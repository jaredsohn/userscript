// ==UserScript==
// @name           LR Forums Skin
// @namespace      /tmp
// @include        http://forums.legitreviews.com/*
// ==/UserScript==
// Beta v0.1

// backup needed elements
var pagebody = document.getElementById('page-body').cloneNode(true)
var sbox = document.getElementById('search-box').cloneNode(true)

// remove body
var d=document.getElementById('phpbb')
while (d.hasChildNodes()) {
	d.removeChild(d.firstChild)}

// define navigation DIVs
var globalnav = document.createElement("div");
var secondnav = document.createElement("div");
globalnav.id = 'global-nav'
secondnav.id = 'second-nav'

// build navigation DIVs
globalnav.innerHTML = '<UL>'
+		  '<LI class="home"><A href="http://www.legitreviews.com/">Home</A></LI>'
+		  '<LI class="forums"><A href="http://forums.legitreviews.com/">Board Index</A></LI>'
+		  '<LI class="fav"><A onclick="addToFavorites(this);" href="javascript: void(0);">Favorite</A></LI>'
+		  '<LI class="feed"><A href="http://www.legitreviews.com/rss.php">RSS Feed</A></LI>'
+		  '<LI class="shop"><A href="http://legitreviews.pgpartner.com/">Shopping</A></LI>'
+	  '</UL>'

secondnav.innerHTML = '<UL>'
+		  '<LI class="nav2un"><A href="/search.php?search_id=unanswered">Unanswered</A></LI>'
+		  '<LI class="nav2un"><A href="/search.php?search_id=newposts">New Posts</A></LI>'
+		  '<LI class="nav2un"><A href="/search.php?search_id=active_topics">Active Topics</A></LI>'
+		  '<LI class="nav2un"><A href="http://vspx27.stanford.edu/cgi-bin/main.py?qtype=teampage&teamnum=38296">Folding Stats</A></LI>'
+		  '<LI class="nav2un"><A href="/faq.php">FAQ</A></LI>'
+		  '<LI class="nav2un"><A href="/memberlist.php">Members</A></LI>'
+		  '<LI class="end"><A href="/ucp.php">Profile</A></LI>'
+	  '</UL>'

// Build Page
d.appendChild(sbox)
d.appendChild(pagebody)
d.appendChild(globalnav)
d.appendChild(secondnav)

GM_addStyle( // CSS style
	'#global-nav ol, #global-nav ul, #second-nav ol, #second-nav ul {list-style: none; text-align: left; font: 12px normal "Helvetica Neue", Helvetica, Arial, sans-serif; line-height: 1.5em; font-weight: bold;}'
+	':focus {outline: 0;}'
+	'#global-nav, #second-nav { position: absolute; top: 0; left: 50%; width: 960px; margin-left: -480px; text-transform: uppercase;}'
+	'#global-nav, #second-nav a { display: block;}'
+	'#global-nav { background: transparent url("http://www.legitreviews.com/images/new/gn_bg.png") 0 -12px no-repeat; height: 67px;}'
+	'#global-nav ul li { position: absolute; top: 8px; padding-left: 24px;}'
+	'#global-nav ul li.home { left: 8px; background: transparent url("http://www.legitreviews.com/images/new/gn_home.png") no-repeat;}'
+	'#global-nav ul li.forums { left: 91px; background: transparent url("http://www.legitreviews.com/images/new/gn_forums.png") no-repeat;}'
+	'#global-nav ul li.fav { left: 546px; /*should be removed for drupal rollout */ left: 670px; background: transparent url("http://www.legitreviews.com/images/new/gn_fav.png") no-repeat;}'
+	'#global-nav ul li.news { left: 645px; background: transparent url("http://www.legitreviews.com/images/new/gn_news.png") no-repeat;}'
+	'#global-nav ul li.feed { left: 766px; background: transparent url("http://www.legitreviews.com/images/new/gn_rss.png") no-repeat;}'
+	'#global-nav ul li.shop { right: 8px; background: transparent url("http://www.legitreviews.com/images/new/gn_shop.png") no-repeat;}'
+	'#global-nav ul li a { color: #fff; text-decoration: none;}'
+	'#global-nav ul li a:hover { text-decoration: underline;}'

+	'#second-nav { top: 32px; margin-left: -472px;}'
+	'#second-nav ul { width: 942px; background: transparent url("http://www.legitreviews.com/images/new/gn_bg.png") -16px no-repeat; border: 1px solid #000; height: 26px;}'
+	'#second-nav ul li { float: left; width: 134px; text-align: center; line-height: .5em; border-right: 1px solid #000;}'
+	'#second-nav ul li.end { width: 131px;}'
+	'#second-nav ul li:last-child { border: 0;}'
+	'#second-nav ul li a { color: #fff; padding: 10px 8px; text-decoration: none;}'
+	'#second-nav ul li a:hover { color: #e0e0da; background: url("http://www.legitreviews.com/images/new/gn_bg.png") -10px -160px no-repeat;}'

+	'#nav2un #second-nav ul li a { background: url("http://www.legitreviews.com/images/new/gn_bg.png") -10px -160px no-repeat;}'

// search box
+	'#search-box {position: absolute; margin-top: 60px; left: 50%; width: 960px; margin-left: -480px; background: none;}'
+	'#page-body {position: absolute; margin-top: 100px; left: 50%; width: 960px; margin-left: -480px; background: none;}'

+	'body { background-color: transparent; background: url("http://img19.imageshack.us/img19/6280/bodybgo.png") repeat-x; }'
)