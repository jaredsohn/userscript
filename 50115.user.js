// ==UserScript==
// @name           ASCII Forum Icons
// @namespace      OrigamiTech
// @include        http://asciimator.net/forum*
// ==/UserScript==


var dark = true;

var currentTime = new Date()
if(currentTime.getHours() <8 || currentTime.getHours() >=20)
{
	dark = true;
}
else
{
	dark = false
}


var ahrefs, images, img, content;

images = document.evaluate('//img[@alt]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 


for (var i = 0; i < images.snapshotLength; i++) 
{
	img = images.snapshotItem(i); 
	alt = img.alt.toUpperCase();
	if (alt == "NO NEW POSTS")
	{ 
		if(dark==false) 
		{
		img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/NoNewPosts.png";
		}
		else 
		{
		img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_NoNewPosts_dark.png";
		}
		img.width = 48;
		img.height = 48;
	}
	else if (alt == "NEW POSTS")
	{ 
		if(dark==false) 
		{
		img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/NewPosts.png";
		}
		else 
		{
		img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_NewPosts_dark.png";
		}
		img.width = 48;
		img.height = 48;
	}
	else if (alt == "THIS TOPIC IS LOCKED: YOU CANNOT EDIT POSTS OR MAKE REPLIES.")
	{ 
		if(dark==false) {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/Lock.png";}
		else {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_Lock_dark.png";}
		img.width = 48;
		img.height = 48;
	}
	else if (alt == "DELETE THIS TOPIC")
	{ 
		if(dark==false) {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/Delete.png";}
		else {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_Delete_dark.png";}
		img.width = 32;
		img.height = 32;
	}
	else if (alt == "LOCK THIS TOPIC")
	{ 
		if(dark==false) {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/Lock.png";}
		else {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_Lock_dark.png";}
		img.width = 32;
		img.height = 32;
	}
	else if (alt == "UNLOCK THIS TOPIC")
	{ 
		if(dark==false) {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/UnLock.png";}
		else {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_UnLock_dark.png";}
		img.width = 32;
		img.height = 32;
	}
	else if (alt == "MOVE THIS TOPIC")
	{ 
		if(dark==false) {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/Move-1.png";}
		else {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_Move_dark.png";}
		img.width = 32;
		img.height = 32;
	}
	else if (alt == "SPLIT THIS TOPIC")
	{ 
		if(dark==false) {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/Split.png";}
		else {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_Split_dark.png";}
		img.width = 32;
		img.height = 32;
	}
	else if (alt == "READ MESSAGE")
	{ 
		if(dark==false) {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/NoNewPosts.png";}
		else {img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_NoNewPosts_dark.png";}
		img.width = 24;
		img.height = 24;
	}
	else if (alt == "UNREAD MESSAGE")
	{ 
		if(dark==false) 
		{
		img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/NewPosts.png";
		}
		else 
		{
		img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_NewPosts_dark.png";
		}
		img.width = 24;
		img.height = 24;
	}
	else if (alt == "REPLY TO MESSAGE")
	{ 
		if(dark==false) 
		{
		img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_Reply-1.png";
		}
		else 	
		{
		img.src = "http://i210.photobucket.com/albums/bb98/origami-guy/th_Reply_dark-1.png";
		}
		img.width = 112;
		img.height = 48;
	}
}

ahrefs = document.evaluate('//a[@id]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 

var theHTML;

for (var i = 0; i < ahrefs.snapshotLength; i++) 
{
	content = ahrefs.snapshotItem(i); 
	if(content.id.toUpperCase() == "LOGO")
	{
		if(dark==false)
		{
theHTML = "<div style='background-image:url(http://i210.photobucket.com/albums/bb98/origami-guy/LogoBack.png);";
theHTML += "position:absolute;left:0;right:0;'>";
theHTML += "<IMG SRC='http://i210.photobucket.com/albums/bb98/origami-guy/Logo.png' border='0' ></div>";
theHTML += "<div style='height:79px;'></div>";
		}
		else
		{
theHTML = "<div style='background-image:url(http://i210.photobucket.com/albums/bb98/origami-guy/LogoBack_dark.png);";
theHTML += "position:absolute;left:0;right:0;'>";
theHTML += "<IMG SRC='http://i210.photobucket.com/albums/bb98/origami-guy/Logo_dark.png' border='0' ></div>";
theHTML += "<div style='height:79px;'></div>";
		}
		content.innerHTML = theHTML;
	}
}



if(dark == false)
{
GM_addStyle("#menu_main {background-image:url(http://i210.photobucket.com/albums/bb98/origami-guy/th_Center-1.png);background-repeat:repeat-x;list-style-image:none;list-style-position:outside;list-style-type:none;margin:0 0 0 0;padding:0 0 30px;}");
}
else
{
GM_addStyle("#menu_main {background-image:url(http://i210.photobucket.com/albums/bb98/origami-guy/Center_dark.png);background-repeat:repeat-x;list-style-image:none;list-style-position:outside;list-style-type:none;margin:0 0 0 0;padding:0 0 30px;}");
}


if(dark == true)
{
GM_addStyle("body {background:#000000 none repeat scroll 0 0;font-size:100%;margin:0 10%;padding:0 0 20px;text-align:center;}");
GM_addStyle(".gen, .genmed, .gensmall {color:#fff;}");
GM_addStyle("td.row1 {background-color:#111111;border:1px none black;padding:10px;}");
GM_addStyle("td.row2 {background-color:#0A0A0A;border:1px none black;padding:10px;}");
GM_addStyle("td.catBottom {background-color:#111111;border-width:0;height:29px;}");
document.body.style.color='White';
GM_addStyle(".ani_links, .ani_links a {color:#fff;text-decoration:none !important;}");
GM_addStyle(".ani_links a:visited {color:#fff;}");
GM_addStyle("a:link, a:active, a:visited {color:#fff;text-decoration:underline;}");
GM_addStyle(".postdetails {color:#fff;font-size:10px;}");
GM_addStyle(".nav {color:#fff;font-size:10px;text-align:left;}");
GM_addStyle("a.nav {color:#fff;font-size:10px;}");
GM_addStyle("a.nav:visited {color:#fff;}");
GM_addStyle("a.nav:hover {color:#fff;}");
GM_addStyle("a.topictitle:link {color:#fff;text-decoration:none;}");
GM_addStyle(".ani_links a:hover {background:transparent none repeat scroll 0 0;color:#fff;}");
}

//GM_addStyle("a#logo {cursor:pointer;display:block;text-decoration:none;margin:0;}");
