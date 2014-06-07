// ==UserScript==
// @name           open tapuz pics with lightbox
// @namespace      www.tapuz.co.il
// @include        http://www.tapuz.co.il/*
// @date           2009-07-16
// @version        0.4
// ==/UserScript==


/*
takes the jpg from:
   javascript:show_attch('12345.jpg',12345)

and creates a new direct link for use with lightbox on these pages:
  http://img2.tapuz.co.il/forums/12345.jpg
  http://img2.tapuz.co.il/communafiles/12345.jpg

NOTICE:
  this script must run BEFORE lightbox (you can move the script in the list)
*/



if (document.location.href.toLowerCase().indexOf("forums2008") > 0)
{
	var links = document.getElementsByTagName('a');
	for(var i = 0; i < links.length; i++)
	{
		for(var j = 0; j < links[i].attributes.length; j++)
		{
			if (links[i].attributes[j].name == "onclick")
			{
				if (links[i].attributes[j].value.indexOf("goToMsgAtt") >= 0)
				{
					var res = links[i].attributes[j].value.match(/goToMsgAtt\(\'(.*)\'/)

					var createlink = document.createElement("a");
					var pickText = document.createTextNode(" [open_with_lightbox] ");
					createlink.setAttribute('href', res[1]);
					createlink.appendChild(pickText);
					links[i].parentNode.insertBefore(createlink, links[i]);
					i++; // skip the newly created
				}
			}
			break;
		}
	}
}
else
{
	var links = document.getElementsByTagName('a');
	for(var i = 0; i < links.length; i++)
	{
		var newlink;
		if (links[i].href.indexOf("show_attch") > 0)
		{
			var res = links[i].href.match(/javascript:show_attch\(\'\/\/images\/data\/IMG2\/Img\/Forums\/(.*)\'/);
			if (res == null)
			{
				res = links[i].href.match(/javascript:show_attch\(\'(.*)\'/);
			}
			if (document.location.href.indexOf("Communa") > 0)
			{
				newlink = "http://img2.tapuz.co.il/communafiles/" + res[1];
			}
			else
			{
				newlink = "http://img2.tapuz.co.il/forums/" + res[1];
			}
//			GM_log(newlink);
			var createlink = document.createElement("a");
			var pickText = document.createTextNode("[open with lightbox]");
			createlink.setAttribute('href', newlink);
			createlink.appendChild(pickText);
			links[i].parentNode.insertBefore(createlink, links[i]);
			i++; // skip the newly created
		}
	}
}