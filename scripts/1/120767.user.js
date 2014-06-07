// ==UserScript==
// @name           jenkins config on home page
// @namespace      jenkins
// @include        http://your_jenkins_host.com:jenkins_port
// ==/UserScript==

var imgLink = null;

function getConfigureImageLink()
{
	if (imgLink != null)
		return imgLink;

	var lnks = document.getElementsByTagName("a");
	for (var l in lnks)
	{
		var reg = /manage$/;
		if (lnks[l].href == undefined)
		   continue;
		if (lnks[l].href.match(reg))
		{
			var imgs = lnks[l].getElementsByTagName("img");
			for (var i in imgs)
			{
				var regex = /setting\.gif$/;
				if (imgs[i].src == undefined)
								continue;
				if (imgs[i].src.match(regex))
				{
					imgLink = imgs[i].src;
					return imgs[i].src;
				}
			}
		}
	}
}

// the elem is the <a> that links to the job
// you want to add a sibling <a> that links to job/configure
function addLink(element)
{
	var configLink = document.createElement("a");
	configLink.href = element.href + "configure";

	var configImage = document.createElement("img");
	configImage.src = getConfigureImageLink();
	configImage.width = 18;
	configImage.height = 18;
	configImage.parentNode = configLink;
	configImage.alt = "Configure Job"
	configLink.style.padding = "8px";

	configLink.appendChild(configImage);
	element.parentNode.insertBefore(configLink, element);
}



var tbl = document.getElementById("projectstatus").childNodes[0];

for (var i = 0; i < tbl.childNodes.length; i++)
{
	if (tbl.childNodes[i].tagName.toLowerCase() == "tr")
	{
		var tr = tbl.childNodes[i];
        var lnks = tr.getElementsByTagName("a");
        for (var j = 0; j < lnks.length; j++)
        {
			var url = lnks[j].href;
			var tail = url.substring(url.indexOf("8080") + 4);
		 	var regex = /^\/job\/[^\/]+\/$/;
		 	if (tail.match(regex))
		 	{
		 	    addLink(lnks[j]);
            	break;
            }
 	    }
	}
}
