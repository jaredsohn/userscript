// ==UserScript==
// @name Pinup
// @author Ryotsuke
// @description Fix post on page.
// @ujs:category site: enhancements
// @ujs:published 2008-04-08 14:31
// @ujs:modified 2009-06-19 02:36
// @ujs:documentation n/a
// @ujs:download n/a
// @include http://*leprosorium.ru*
// ==/UserScript==

document.addEventListener("DOMContentLoaded",

	function(e)
	{
		var cur_location = (window.location).toString();

		if (cur_location.indexOf("comments")!=-1 || cur_location.indexOf("inbox")!=-1)
		{
		
			document.getElementByClassName = function(cl){var myclass = new RegExp('\\b'+cl+'\\b');var elem = this.getElementsByTagName('*');for (var i = 0; i < elem.length; i++){var classes = elem[i].className;if(myclass.test(classes)){return elem[i]}}};
      
			var post = document.getElementByClassName('post');			
			post.getElementsByTagName('div')[0].id="theOne";
      post.innerHTML="<a href='#' onclick='document.getElementById(\"theOne\").style.position=\"fixed\";document.getElementById(\"theOne\").style.width=\"70%\";document.getElementById(\"theOne\").style.border=\"1px solid gray\";document.getElementById(\"theOne\").style.padding=\"5px\";document.getElementById(\"theOne\").style.background=\"white\";document.getElementById(\"theOne\").style.maxHeight=\"300\";document.getElementById(\"theOne\").style.overflow=\"auto\";document.getElementById(\"theOne\").style.top=\"0\";document.getElementById(\"theOne\").style.zIndex=\"1000\";this.display=\"none\"' alt='Фиксировать этот пост'><img alt='Фиксировать этот пост' src='http://leprastuff.ru/data/img/20090619/9e5ee6b283c2d5692b74c057acee0f75.gif' /></a>"+post.innerHTML;
      

			
		}

	}

,false);