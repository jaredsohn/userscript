// ==UserScript==
// @name          	Easy Scrap (Bypass the Orkut Image Verification)
// @author	  	Sergio Abreu (Portuguese Version) | Bean (English Version Translation) | Heruka+Bean (Additional Programming)
// @description   	Enables you to scrap links without encountering image verification, by making them dead.
// @include       	http://*.orkut.com/Scrapbook.aspx*
// @include       	http://orkut.com/Scrapbook.aspx*
// @include       	http://*.orkut.com/CommMsgPost.aspx*
// @include       	http://orkut.com/CommMsgPost.aspx*
// ==/UserScript==

// Function definition.
function easyScrap()
{
	if(self != top)
		return;
	if(!(document.getElementById('captchaTextbox')))
	{
		if(location.href.indexOf('Scrapbook.aspx') > -1)	// If Scrapbook.aspx...
		{	
			// Add [disable links] button to top scrapText area.
			document.getElementById('scrapText').parentNode.innerHTML	+=	"<table class=\"btn\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" onClick='var tx = document.getElementById(\"scrapText\"); scr= tx.scrollTop; var x = tx.value; x = x.replace(/http/gi, \"h[red][/red]t[red][/red]t[red][/red]p[red][/red]\"); x = x.replace(/www\\./gi, \"w[red][/red]w[red][/red]w[red][/red].\"); x = x.replace(/\\./gi, \"&\"+\"#46;\");x = x.replace(/com/gi, \"c[red][/red]o[red][/red]m[red][/red]\");x = x.replace(/:\\/\\/\/gi, \"&\"+\"#58;\/\/\"); tx.value = x; tx.scrollTop = scr;' onmouseout=\"this.className=\'btn\'\" onmouseover=\"this.className=\'btnHover\'\" valign=\"bottom\" align=\"left\"><tbody><tr style=\"cursor: pointer;\"><td><img alt=\"\" src=\"http://img2.orkut.com/img/bl.gif\"/></td><td nowrap=\"nowrap\" style=\"background: transparent url(http://img2.orkut.com/img/bm.gif) repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;\"> disable links </td><td><img alt=\"\" src=\"http://img3.orkut.com/img/br.gif\"/></td></tr></tbody></table>";
	
			// Add [disable links] button to all scrapText areas in rest of page.
			var i;
			var scrap;
			var scrapHTML; 
			var appendHTML;
			var objectID;

			for(i=1; i<=30; i++)	// Maximum number of scrapText areas per page is 30.
			{	objectID	=	"scrap_"+i;	
				scrap		=	document.getElementById(objectID); 
				if(scrap)
				{
					scrapHTML	=	document.getElementById(objectID).innerHTML;
					appendHTML	=	"<table class=\"btn\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" onClick='var tx = document.getElementById(\"scrapText_" + i + "\"); scr= tx.scrollTop; var x = tx.value; x = x.replace(/http/gi, \"h[red][/red]t[red][/red]t[red][/red]p[red][/red]\"); x = x.replace(/www\\./gi, \"w[red][/red]w[red][/red]w[red][/red].\"); x = x.replace(/\\./gi, \"&\"+\"#46;\");x = x.replace(/com/gi, \"c[red][/red]o[red][/red]m[red][/red]\");x = x.replace(/:\\/\\/\/gi, \"&\"+\"#58;\/\/\"); tx.value = x; tx.scrollTop = scr;' onmouseout=\"this.className=\'btn\'\" onmouseover=\"this.className=\'btnHover\'\" valign=\"bottom\" align=\"left\"><tbody><tr style=\"cursor: pointer;\"><td><img alt=\"\" src=\"http://img2.orkut.com/img/bl.gif\"/></td><td nowrap=\"nowrap\" style=\"background: transparent url(http://img2.orkut.com/img/bm.gif) repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;\"> disable links </td><td><img alt=\"\" src=\"http://img3.orkut.com/img/br.gif\"/></td></tr></tbody></table>";
					scrapHTML	=	scrapHTML + appendHTML;
					scrap.innerHTML	=	scrapHTML;
				}
			}
		}
		else if(location.href.indexOf('CommMsgPost.aspx') > -1)	// If CommMsgPost.aspx...
		{
			// Add [disable links] button to the page.
			document.getElementById('messageBody').parentNode.innerHTML	+=	"<br><table class=\"btn\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" onClick='var tx = document.getElementById(\"messageBody\"); scr= tx.scrollTop; var x = tx.value; x = x.replace(/http/gi, \"h[red][/red]t[red][/red]t[red][/red]p[red][/red]\"); x = x.replace(/www\\./gi, \"w[red][/red]w[red][/red]w[red][/red].\"); x = x.replace(/\\./gi, \"&\"+\"#46;\");x = x.replace(/com/gi, \"c[red][/red]o[red][/red]m[red][/red]\");x = x.replace(/:\\/\\/\/gi, \"&\"+\"#58;\/\/\");  tx.value = x; tx.scrollTop = scr;' onmouseout=\"this.className=\'btn\'\" onmouseover=\"this.className=\'btnHover\'\" valign=\"bottom\" align=\"right\"><tbody><tr style=\"cursor: pointer;\"><td><img alt=\"\" src=\"http://img2.orkut.com/img/bl.gif\"/></td><td nowrap=\"nowrap\" style=\"background: transparent url(http://img2.orkut.com/img/bm.gif) repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;\"> disable links </td><td><img alt=\"\" src=\"http://img3.orkut.com/img/br.gif\"/></td></tr></tbody></table>";
		}
	}
}

// Function call.
easyScrap();