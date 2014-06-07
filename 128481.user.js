// ==UserScript==
// @name           9gagforever
// @namespace      d4rkv3nom
// @include        http://9gag.com*
// ==/UserScript==

function getElementsByClassName (className, tag, elm)
		{
			if (document.getElementsByClassName)
			{
				getElementsByClassName = function (className, tag, elm)
				{
					elm = elm || document;
					var elements = elm.getElementsByClassName (className),
						nodeName = (tag)? new RegExp ("\\b" + tag + "\\b", "i") : null,
						returnElements = [],
						current;
					for (var i = 0, il = elements.length; i < il; i++)
					{
						current = elements [i];
						if (! nodeName || nodeName.test (current.nodeName))
							returnElements.push (current);
					}
					return returnElements;
				};
			}
			else if (document.evaluate)
			{
				getElementsByClassName = function (className, tag, elm)
				{
					tag = tag || "*";
					elm = elm || document;
					var classes = className.split (" "),
						classesToCheck = "",
						xhtmlNamespace = "http://www.w3.org/1999/xhtml",
						namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
						returnElements = [],
						elements,
						node;
					for (var j = 0, jl = classes.length; j < jl; j++)
						classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes [j] + " ')]";
					try
					{
						elements = document.evaluate (".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
					}
					catch (e)
					{
						elements = document.evaluate (".//" + tag + classesToCheck, elm, null, 0, null);
					}
					while ((node = elements.iterateNext ()))
						returnElements.push (node);
					return returnElements;
				};
			}
			else
			{
				getElementsByClassName = function (className, tag, elm)
				{
					tag = tag || "*";
					elm = elm || document;
					var classes = className.split (" "),
						classesToCheck = [],
						elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName (tag),
						current,
						returnElements = [],
						match;
					for (var k = 0, kl = classes.length; k < kl; k++)
						classesToCheck.push (new RegExp ("(^|\\s)" + classes [k] + "(\\s|$)"));
					for (var l = 0, ll = elements.length; l < ll; l++)
					{
						current = elements [l];
						match = false;
						for (var m = 0, ml = classesToCheck.length; m<ml; m++)
						{
							match = classesToCheck [m].test (current.className);
							if (! match)
								break;
						}
						if (match)
							returnElements.push (current);
					}
					return returnElements;
				};
			}
			return getElementsByClassName (className, tag, elm);
		}
		
var tabup =getElementsByClassName("content-type", "ul");
if(tabup!=null && tabup!=""){
	tabup[0].innerHTML="<li style=\"background-image: url(http://img1.imagilive.com/0312/happy-grin.png);background-repeat: no-repeat\"> <a style=\"padding-left:50px\" href=\"/hot\"><strong>What's Hot</strong></a></li>	<li style=\"margin-left:10px;background-image: url(http://img1.imagilive.com/0312/angry-no.png);background-repeat: no-repeat\"> <a style=\"padding-left:50px\"  href=\"/discover\"><strong>Discover</strong></a></li><li style=\"background-image: url(http://img1.imagilive.com/0312/rip.png);margin-left:80px;background-repeat: no-repeat\"> <a style=\"padding-left:50px\"  href=\"/trending\"><strong>Trending</strong></a></li>	<li style=\"background-image: url(http://img1.imagilive.com/0312/rip.png);background-repeat: no-repeat\"> <a style=\"padding-left:50px\" href=\"/vote\"><strong>Vote</strong></a></li>	";
}

document.body.style.backgroundImage = "url(http://img1.imagilive.com/0312/memes-someone-was-bored2b17.jpg)";
document.body.style.backgroundAttachment ="fixed"; //document.body.bgProperties =  "fixed";

var popblock = document.getElementById("top-gag-stay");
if(popblock!=null && popblock!=""){
popblock.style.backgroundColor = "#DDD";
}


var popblock2 = document.getElementById("post-gag-stay");
if(popblock2!=null && popblock2!=""){
popblock2.style.backgroundColor = "#DDD";
}