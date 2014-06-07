// ==UserScript==
// @name 			Kongregate Admin Itentifier
// @namespace 		http://matthewammann.com
// @description 		Identifies staff members in the Kongregate forums.
// @version     		1.0
// @date          		08/15/09
// @author			Matthew Ammann
// @include 			http://www.kongregate.com/forums/*
// ==/UserScript==

//Original script by arcaneCoder:
/*
Created by arcaneCoder
www.kongregate.com/accounts/arcaneCoder

Leave these headers intact if you modify this script.

*/

var pattn = new RegExp ( "-row$" );
var elem = document.getElementsByTagName ( "tr" );
var nameSave 	= new Array ( elem.length );
var table;

function update ()
{

	MainLoop: for ( var i=0; i < elem.length; i++)
	{
		var obj = elem[i];
		
		if ( pattn.test ( obj.id ) ) 
		{
			if ( !table ) table = obj.parentNode;
		
			var postID = obj.id.split ("-")[1];
			var username =  obj.getElementsByTagName("img")[0].title;
			nameSave[i] = username;
			
			//INSERT NAMES OF ADMINS HERE (alphabetically):
			//The list of admins can be found here: http://www.kongregate.com/accounts/Stafffriend/friends
			
			//As of August 15th, 2009, there are 28 staff accounts
			if(username == "Alison" || username == "AlisonClaire" || username  == "andrew" || username == "anthony" ||
			username  == "BenV" || username  == "bofar" || username  == "cpasley" || username  == "Curator" ||
			username  == "Ducklette" || username  == "duncanbeevers" || username  == "emily_greer" || username  == "greg" ||
			username  == "GregLoire" || username  == "GregMcClanahan" || username  == "Jim7" || username  == "jimgreer" ||
			username  == "Jonathan" || username  == "jvoorhis" || username  == "Kongregate" || username  == "kwasnick" ||
			username  == "matt" || username  == "Phoenix00017" || username  == "Prizes" || username  == "richpixel" ||
			username  == "Runescape_Jagex" || username  == "TheresaC" || username  == "whenderson" || username  == "yukster")
			{
				//alert("Admin found!");
				obj.cells[0].innerHTML += "<p style='font-size: 0.4em;' >&nbsp;</p><p style='font-size: 0.4em;' >&nbsp;</p><p style='font-size: 0.7em; color: #666;'><img src='http://cdn4.kongregate.com/images/presentation/staff_icon.gif?1249450185' />Staff</p>";
			}
		}
	}
}
update();

