// ==UserScript==
// @name           Auto Friend Categorizer
// @author 	   Sergio Abreu (Portuguese version) | Bean (English Version Translation)
// @description    Automatically Adds a Person to Your Friend List: No need to categorize them!
// @include        http://www.orkut.com/FriendAdd.aspx?*
// ==/UserScript==


	function add_amigo()
	{
	  var bt = document.createElement('input');
	  bt.setAttribute("type", "submit");
	  bt.setAttribute("value", "Clicando, aguarde...");
	  bt.setAttribute("style", "background:#ccffcc");
	  bt.setAttribute("name", "Action.yes");
	  document.forms[1].appendChild(bt);
	  bt.click();
	}

	add_amigo();