// ==UserScript==
// Highlight Nick ver.2.3
// (c) 2006-2008 by Patric Peters <me@papet.de>
// 
// Credits: Dicope (M. Dreseler <markus@dreseler.de>) fuer den get/setValue Snippet :)
// @name          Highlight Nick 2.3
// @namespace	  http://www.papet.de
// @description   Sucht nach dem Nicknamen und hebt diese hervor.
// @version	      2.3 (01.01.2008)
// @include       http://forum.counter-strike.de/bb/thread.php*
// @include       http://forum.cstrike.de/bb/thread.php*
// @include       http://82.149.226.131/bb/thread.php*
// @include       http://forum.mods.de/bb/thread.php*
// ==/UserScript==

// Prompts
function conprom (e) {
  GM_setValue("hlnick", (prompt('Hervorzuhebende Nicknames eingeben, Werte mit ; trennen',GM_getValue("hlnick"))));
}
GM_registerMenuCommand("Highlight Nicks", conprom);

// Userleiste?
if(document.getElementById("infobar"))
{
	iIndex = 23;
	iTable = 22;
}
else
{
	iIndex = 19;
	iTable = 18;
}

// Gogogo
if(GM_getValue("hlnick") != null)
{
	// Style
	var sStyle = 'color:00ff00;font-weight:bold;';
	// Abgearbeitete Posts
	var postsDone = new Array;
	// Tabellen zerlegen
	var posts     = document.getElementsByTagName("td");
	var index     = iIndex;
	// Nicknames
	var nicknames = GM_getValue("hlnick").split(";").join("|");
	// Regex
	var evalProfileMatch = eval("/>("+nicknames+")</ig");
	var evalSaveURLs     = eval("/((openProfile\\(\"[0-9]*\",\\s*|src=|alt=|title=|href=)\"([^\"]*))("+nicknames+")([^\"]*\")/ig");
	var evalQuoted       = eval("/Zitat(.*)\\svon\\s("+nicknames+")/ig");
	// Counter
	var iPosts    = 0;
	var iQuotes   = 0;
	var iMatches  = 0;

	while(index < posts.length)
	{
		if(posts[index].innerHTML.match(/(<a name="reply_([0-9]*)"><\/a>)/ig))
		{
			var pid = RegExp.$1;
			if(postsDone[pid] != 1)
			{
				postsDone[pid] = 1;
				// Profil
				if(posts[index].parentNode.firstChild.nextSibling.innerHTML.match(evalProfileMatch))
				{
					posts[index].parentNode.firstChild.nextSibling.innerHTML = posts[index].parentNode.firstChild.nextSibling.innerHTML.replace(evalProfileMatch, '><span style=\"'+sStyle+'\">'+RegExp.$1+'</span><');
					iPosts++;
				}
				else
				{				
					// Post
					// Links entsch�rfen
					posts[index].parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML = posts[index].parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML.replace(evalSaveURLs,"$1#$4#$5");
					
					// Zitiert?
					if(posts[index].parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML.match(evalQuoted))
					{
						iQuotes++;
						iMatches--;
					}
					// Vorkommnisse
					if(posts[index].parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML.match(eval("/([^#])("+nicknames+")([^#])/ig")))
					{
						iMatches++;
						posts[index].parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML = posts[index].parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML.replace(eval("/([^#])("+nicknames+")([^#])/ig"),"$1<span style=\""+sStyle+"\">$2</span>$3");
					}
					// Links zur�ck wandeln
					posts[index].parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML = posts[index].parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML.replace(eval("/#("+nicknames+")#/ig"),"$1");
				}
			}
		}
		index++;
	}
	
	// Ausgabe
	if(iPosts > 0 || iQuotes > 0 || iMatches > 0)
	{
		var sMatches = "0";
		if(iMatches > 0)
		{
			sMatches = "<span style=\"color:00ff00;font-weight:bold;\">" + iMatches + "</span>";
		}

		var sQuotes = "0x";
		if(iQuotes > 0)
		{
			sQuotes = "<span style=\"color:00ff00;font-weight:bold;\">" + iQuotes + "x</span>";
		}
		
		var sPosts = "0x";
		if(iPosts > 0)
		{
			sPosts = "<span style=\"color:00ff00;font-weight:bold;\">" + iPosts + "x</span>";
		}
		posts[iTable].innerHTML = "<div align=\"center\" style=\"background-color:#091827;padding:3px;\">Dein Nick kommt auf dieser Seite in " + sMatches + " Posts vor. Du wurdest " + sQuotes + " Zitiert  und hast " + sPosts + " selbst gepostet.</div>" + posts[iTable].innerHTML;
	}
}