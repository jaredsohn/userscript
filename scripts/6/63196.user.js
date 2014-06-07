// ==UserScript==
// @name           n-SceneAccess
// @namespace      SCC
// @include        *sceneaccess.org/*
// @exclude        *sceneaccess.org/bookmarks.php*
// @description    Adds bookmarking functionality to torrent details pages, as well as other improvements
// @version 1.04
//
// @require        http://userscripts.org/scripts/source/111583.user.js
// @history	1.04 Removing bookmark links, as it's clear functionality wont be coming back.  Instead just removing donate link from torrent details.  Fixed titles.
// @history	1.03 Redundant update for SCCv2
// @history	1.02 Added settings to customize the functionality of the script
// @history	1.01 Modification of bookmark links to change bracket behaviour
// @history	1.00 Initial release
// ==/UserScript==

//Settings (As no settings interface is displayed, just edit the settings directly from about:config)
var changeTitle = GM_getValue("changeTitle", true);
var torrentPageBookmark = GM_getValue("torrentPageBookmark", true); //now just removes the donate link from torrent details

//Check for new versions
ScriptUpdater.check(63196,/*currentVersion*/'1.04');

//TITLE
if (changeTitle)
{
	var oldtitle = document.title;
	var newtitle;
	//SCCv1 titles
	//newtitle = oldtitle.replace(/SceneAccess :: Details for torrent /g,"");
	//document.title = newtitle + " :: SceneAccess";
	//SCCv2 titles
	newtitle = oldtitle.replace(/SceneAccess \| Details for /g,"");
	document.title = newtitle + " |	 SceneAccess";
}
/*
//Remove donate row
//<tr><td class=rowhead width=1%>Donate</td><td width=99% align=left><b><font color="#00FFFF">Keep this site alive </font> <a class="index" href="donate.php">donate</a>.</b></td></tr>
document.body.innerHTML = document.body.innerHTML.replace(/\<tr\>\<td class=rowhead width=1%\>Donate\<\/td\>\<td width=99% align=left\>\<b\>\<font color=\"#00FFFF\"\>Keep this site alive \<\/font\> \<a class=\"index\" href=\"donate\.php\"\>donate\<\/a\>\.\<\/b\>\<\/td\>\<\/tr\>/g,"");
*/
//Make bookmark torrent link
if (torrentPageBookmark)
{
	if (document.location.href != "https://sceneaccess.org/bookmarks.php")
	{
		//https://sceneaccess.org/bookmark.php?torrent=77969
		//https://sceneaccess.org/bookmark.php?torrent=#ID
		//replace Donate	Keep this site alive  donate.
		//with Bookmark	(+)
		//document.body.innerHTML= document.body.innerHTML.replace(/<td>10<span class=\"grey\">.<\/span>019<\/td>/g,"<td>done.<\/td>");
		//<td class=rowhead width=1%>Donate</td>
		//<td class=rowhead width=1%>Bookmark</td>
		
		//SCCv1 bookmark code
		//document.body.innerHTML= document.body.innerHTML.replace(/<td class=rowhead width=1\%>Donate<\/td>/g,"<td class=rowhead width=1\%\">Bookmark<\/td>");
		//document.body.innerHTML= document.body.innerHTML.replace(/<td class=rowhead width=1%>Donate<\/td>/g,"<td>Bookmark<\/td>");
		
		//SCCv2 bookmark code 
//		document.body.innerHTML= document.body.innerHTML.replace(/Donate<\/td>/g,"Bookmark<\/td>");
//		document.body.innerHTML= document.body.innerHTML.replace(/Keep this site alive/g,"");

		//SCCv2 no donate links (as no bookmark funcgtionalty exists)
		document.body.innerHTML= document.body.innerHTML.replace(/Donate<\/td>/g,"<\/td>");
		document.body.innerHTML= document.body.innerHTML.replace(/Keep this site alive/g,"");
		
		//Just remove donate link
		document.body.innerHTML= document.body.innerHTML.replace(/<a href="donate" class="keepalive">donate<\/a>\./g,"");
		
		//Only change text color to be less attention grabbing.
		//SCCv1 color change
		//document.body.innerHTML= document.body.innerHTML.replace(/<font color=\"\#00FFFF\">Keep this site alive <\/font>/g,"");
		//SSCv2 color change
		//document.body.innerHTML= document.body.innerHTML.replace(/<span class="keepalive">Keep this site alive<\/span>/g,"<font color=\"#FFFFFF\">Keep this site alive<\/font>");

		//<a class="index" href="donate.php">donate</a>
		//https://sceneaccess.org/details.php?id=138585
//		var torrentID = 0;
//		var urlPos = 0;
//		var sURL = window.location.href;
//		urlPos = sURL.lastIndexOf("id=");
//
//		sURL = sURL.substring(urlPos + 3);
//		urlPos = sURL.indexOf("&");
//		if (urlPos > 0){
//			sURL = sURL.substring(0,urlPos);
//		}
//
//		torrentID = sURL;
//		//debugging code
//		//torrentID = 0;
//		if (torrentID > 0){
//			//sccv1 document.body.innerHTML= document.body.innerHTML.replace(/<a class=\"index\" href=\"donate\.php\">donate<\/a>\./g,"(<a class=\"index\" href=\"bookmark.php\?torrent=" + torrentID + "\"><img border=0 src=\/pic\/bookmark.gif align=absmiddle alt=Bookmark title=Bookmark \/><\/a>)");
//			document.body.innerHTML= document.body.innerHTML.replace(/<a href=\"donate\" class=\"keepalive">donate<\/a>\./g,"(<a class=\"index\" href=\"bookmark.php\?torrent=" + torrentID + "\"><img border=0 src=\/pic\/bookmark.gif align=absmiddle alt=Bookmark title=Bookmark \/><\/a>)");
//		}
//		else //display error  that torrentID couldn't be parsed
//		{
//			 //<a class="index" href="donate.php">donate</a>
//			 //<font color="#00FFFF">Keep this site alive </font>
//			 //
//			 document.body.innerHTML= document.body.innerHTML.replace(/<a class=\"index\" href=\"donate\.php\">donate<\/a>/g,"<font color=\"#FF0000\">Error:<\/font> Unable to create bookmark link");
		}
//	}
}
GM_setValue('changeTitle', changeTitle);
GM_setValue('torrentPageBookmark', torrentPageBookmark);

