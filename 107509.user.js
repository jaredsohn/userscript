// ==UserScript==
// @name           Kerbal Space Program Forum Top Meny
// @namespace      KSP
// @description    Adds a topmenu for navigation on the Kerbal Space Program Forum
// @include        http://kerbalspaceprogram.com/forum/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var sourcecode = "\
<ul id='nav'>\
		<li>\
			<a href='http://kerbalspaceprogram.com/forum/index.php' title='Return home'>Index</a>\
		</li>\
		<li>\
			<a href='http://kerbalspaceprogram.com/forum/index.php#c1' title='General'>General</a>\
			<ul>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=3.0'>Announcements</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=1.0'>General Discussion</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=4.0'>KSP Development</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=10.0'>How To...</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=6.0'>Support</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=15.0'>The Spacecraft Exchange</a></li>\
			</ul>\
		</li>\
		<li>\
			<a href='http://kerbalspaceprogram.com/forum/index.php#c2' title='Addon Making'>Addon Making</a>\
			<ul>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=14.0'>Projects and Releases</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=7.0'>Texturing</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=8.0'>Part Modelling</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=9.0'>CFG tweaking</a></li>\
			</ul>\
		</li>\
		<li>\
			<a href='http://kerbalspaceprogram.com/forum/index.php#c4' title='Other Forums'>Other Forums</a>\
			<ul>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=12.0'>Off-Topic</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=13.0'>International</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=17.0'>The Wiki Forum</a></li>\
				<li><a href='http://kerbalspaceprogram.com/forum/index.php?board=16.0'>The Forum Forum</a></li>\
			</ul>\
		</li>\
	</ul>";



$(document).ready(function(){
	$("body").prepend(sourcecode);
});

	GM_addStyle((<><![CDATA[
/*------------------------------------*\
	NAV
\*------------------------------------*/
#nav{
	list-style:none;
	font-weight:bolder;
	position: fixed;
	margin: 0px;
	padding: 0px;
	top: 0px;
	width: 400px;
	z-index:5;
	padding-left: 200px;
}
#nav li{
	float: left;
	margin-right:10px;
	position:relative;
}
#nav a{
	display:block;
	padding:5px;
	color: #FF8426;
	background: #C9D7E7;
	text-decoration:none;
	margin: 3px;
	margin-top: 0px;
}
#nav a:hover{
	color:#fff;
	background:#6b0c36;
	text-decoration:underline;
}

/*--- DROPDOWN ---*/
#nav ul{
	/* Adding a background makes the dropdown work properly in IE7+. Make this as close to your page's background as possible (i.e. white page == white background). */
	list-style:none;
	position:absolute;
	left:-9999px; /* Hide off-screen when not needed (this is more accessible than display:none;) */
	margin: 0px;
}
#nav ul li{
	padding-top:1px; /* Introducing a padding between the li and the a give the illusion spaced items */
	float:left;
}
#nav ul a{
	white-space:nowrap; /* Stop text wrapping and creating multi-line dropdown items */
}
#nav li:hover ul{ /* Display the dropdown on hover */
	left:0; /* Bring back on-screen when needed */
	margin: 0px;
	padding: 0px;
}
#nav li:hover a{ /* These create persistent hover states, meaning the top-most link stays 'hovered' even when your cursor has moved down the list. */
	background: #D5DEE9;
	border: 2px solid black;
	margin: 0px;
	text-decoration:underline;
}
#nav li:hover ul a{ /* The persistent hover state does however create a global style for links even before they're hovered. Here we undo these effects. */
	text-decoration:none;
}
#nav li:hover ul li a:hover{ /* Here we define the most explicit hover states--what happens when you hover each individual link. */
	background: #788A9E;
}





/*------------------------------------*\
	TYPE
\*------------------------------------*/
h1{
	font-family:Calibri, Arial, Verdana, sans-serif;
	font-size:2em;
	width:520px;
}
	
]]></>).toString());