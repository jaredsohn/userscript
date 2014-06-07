// ==UserScript==
// @name number
// @description number
// @ujs:category site: enhancements
// @ujs:documentation n/a
// @ujs:download n/a
// @include http://*leprosorium.ru/users/*
// ==/UserScript==

document.addEventListener("DOMContentLoaded",

	function(e)
	{
		function getElementsByClass(searchClass,node,tag)
			{
				var classElements = new Array();

				if ( node == null )
					node = document;

				if ( tag == null )
					tag = '*';

				var els = node.getElementsByTagName(tag);
				var elsLen = els.length;
				var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');

				for (i = 0, j = 0; i < elsLen; i++)
				{
					if (pattern.test(els[i].className))
					{
						classElements[j] = els[i];
						j++;
					}
				}

				return classElements;
			}
		
		var usernumberdiv = getElementsByClass("vote")[0];
		var num = usernumberdiv.getAttribute('uid');
		var usernamediv = getElementsByClass("username")[0];
		if (num != null) { usernamediv.innerHTML += " ("+num+")"; }


	}

,false);

