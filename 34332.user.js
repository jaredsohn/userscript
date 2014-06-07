// ==UserScript==
// @name winfuture-ignore
// @namespace std
// @include *winfuture.de/news,*.html
// ==/UserScript==


// Hier innerhalb der Klammer kommen die Namen hinein ("Schnitzel","ist","lecker");
var blacklist = new Array("xxxxx","xxxxxxx");

// Viewmode
// = 1    - Kommentare werden komplett gelöscht
// = 2    - Hinweis erscheint, das Kommentar
// = 3    - Kopfzeile der Nachricht wird gelassen

var viewmode = 3;

function madeit()
{
var tables = document.getElementsByTagName("div");
for ( var i = 0; i < tables.length; i++ )
{
if (tables[i].id.substring( 0, 10)  != "comments_b")
{
 if ( tables[i].id.substring( 0, 7 )  == "comment" )
 {
  if ( tables[i].id.substring( 0, 9 )  != "comment_t" )
  {
   if ( tables[i].id.substring( 0, 9 )  != "comment_b" )
   {
		var a = tables[i].innerHTML;
		var suche = a.indexOf("</strong>");
		var suche2 = a.indexOf('<strong class="komsys_user"');
		var extrakt = a.slice(suche2, suche);
		var nickname = extrakt.slice(extrakt.indexOf(">")+1,extrakt.length);
		for ( var z = 0; z < blacklist.length; z++)
		{
			if (nickname == blacklist[z]) 
			{
				if (viewmode == 1) 
				{
					tables[i].parentNode.removeChild(tables[i]);
					i=i-5;
				}
				if (viewmode == 2)
				{
					tables[i].innerHTML='<span style="color: rgb(0, 0, 0); font-size: 11px; font-weight: bold;">Kommentar entfernt</span>';
					i=i-5;
				}
				if (viewmode == 3)
				{
					var commentstart = a.indexOf('class="newstext"');
					var newtext = a.slice (0,commentstart);
					tables[i].innerHTML=newtext;
				}
			}
		}
   }
  }
 }
}
}
}

window.setTimeout(function(){madeit();},2000);
