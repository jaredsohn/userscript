// ==UserScript==
// @name          spiegel_forum_fix
// @author        mp3-terroristin
// @description   quick fix to add missing blog forum links to forum.spiegel.de
// @match 	  http://forum.spiegel.de/*
// @match 	  https://forum.spiegel.de/*
// @version       0.0.3
// @history       0.0.3 2011-12-12
// ==/UserScript==

if(location.href.match('forum.spiegel.de')) //I don't trust @match in Chromium
{

if(document.body) //first load body
{

var li, div, img, a, alink, href, bold, middle, hr, popuplist, popupmenu, descendants;

var gen1 = document.getElementById("yui-gen1");

// drop-down list
if  (gen1 != null)
{
	descendants = gen1.getElementsByTagName("li");
	if ( descendants.length > 10 )
	{
	popupmenu = document.getElementById("yui-gen1");     
	}
	else
	{
	popupmenu = document.getElementById("yui-gen0");
	}

popuplist = document.createElement( "li" );

alink = document.createElement("a");
alink.href="/f22/";
alink.appendChild(document.createTextNode("Blogs"));

popuplist.appendChild(alink);
popupmenu.appendChild( popuplist );

} //drop-down list end


// forums start page
if (document.getElementById("forums")) //check if exists
{

var forenliste = document.getElementById("forums");

li = document.createElement( "li" );
li.id ="forum22";
li.class ="forumbit_post L1";

div = document.createElement( "div" );
div.class="forumbit_post L2";

li.appendChild( div );

img = document.createElement("img");
img.class="forumicon";
img.id="forum_statusicon_22";
img.src = "http://www.spiegel.de/static/forum/images/statusicon/forum_old.gif";
img.hspace="10";
div.appendChild(img);

a = document.createElement("a");
a.href="/f22/";

bold = document.createElement("b");
middle = document.createElement("b");

bold.appendChild(document.createTextNode("BLOGS"));

// hidden picture as spacer cuz im too lazy for this :P
img = document.createElement("img");
img.class="forumicon";
img.id="forum_statusicon_22";
img.src = "http://www.spiegel.de/static/forum/images/statusicon/forum_old.gif";
img.height="0";
img.width ="0";
img.style.width = "115px";
bold.appendChild(img);

middle.appendChild(document.createTextNode("Versteckte BLOG Foren"));

div.appendChild(a);
a.appendChild(bold);
a.appendChild(middle);

forenliste.appendChild( li );

hr = document.createElement( "hr" );
forenliste.appendChild( hr );
} // endif


} // load body end

} // href.match end