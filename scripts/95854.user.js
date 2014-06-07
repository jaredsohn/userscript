// ==UserScript==
// @name           Nameless Politopia 
// @namespace      KarlSRuher
// @description   Removes the author's details to the left of postings
// @include        http://www.politopia.de/*
// @match          http://*.politopia.de/*
// ==/UserScript==



// Javascript has no getElementsByClassName, let'S write our own
	document.getElementsByClassName = function(classname, tag)
	{
		var retnode = [];
		var myclass = new RegExp('\\b'+classname+'\\b');
		var elem = this.getElementsByTagName(tag);
		for (var i = 0; i < elem.length; i++) 
		{
			var classes = elem[i].className;
			if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
	};

// remove 
var names = document.getElementsByClassName('alt2', 'td');
for (var i = 0; i < names.length; i++)
{
   if (names[i].width == 175) // without this, quotes are removed, too
      names[i].innerHTML = "";
}
