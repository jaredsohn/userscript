// ==UserScript==
// @name	   prohardver.hu : forum : hide user posts
// @namespace	   http://www.prohardver.hu/
// @include	   http://www.prohardver.hu/tema/*
// @include	   http://prohardver.hu/tema/*
// ==/UserScript==
users = "username1,username2".split(","); // case sensitive, comma separated list
window.addEventListener(
	"load", 
	function() 
	{
		var posts = document.evaluate("//div[@class = 'hlist head flc']/p/a[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var n = 0; n < posts.snapshotLength; n++)
		{
			var post = posts.snapshotItem(n);
			for (var n1 = 0; n1 < users.length; n1++)
			{
				if (post.innerText == users[n1])
				{
					var text = document.evaluate("../../../div[@class = 'text']", post, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					if (text)
					{
						text.original = text.innerHTML;
						text.innerHTML = "<a onclick=\"this.parentNode.innerHTML=this.parentNode.original\">[hozz\u00e1sz\u00f3l\u00e1s megjelen\u00edt\u00e9se]</a>";
					}

				}
			}
		}
	},
	false);
