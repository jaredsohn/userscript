// ==UserScript==

// @name           Link Preview

// @namespace      Link Preview

// @include        http://*bungie.net/*posts.aspx*
// @include        http://*bungie.net/*createpost.aspx*
// ==/UserScript==

var script = document.createElement("script");
var text = document.createTextNode("var savedText; var ref = -1; function showText(obj){if(ref==obj){ref = -1; obj.innerHTML=savedText;}} function showLink(obj){if(ref==obj){return;} if(ref!=-1){ref.innerHTML=savedText;} ref = obj; savedText=obj.innerHTML; obj.innerHTML=obj.innerHTML+\" (\"+obj.href+\")\";}");
script.type = "text/javascript";
script.appendChild(text);
document.body.appendChild(script);

var divs = document.getElementsByTagName("div");
for (var i = 0; i<divs.length; i++)
{
	if(divs[i].getAttribute("class") == "postbody")
	{
		var newHTML = "";
		var previousIndex = divs[i].innerHTML.lastIndexOf("<p");
		var workingIndex = previousIndex;
		newHTML = newHTML + divs[i].innerHTML.substring(0,workingIndex);
		while (divs[i].innerHTML.indexOf("<a",previousIndex) != -1)
		{
			workingIndex = divs[i].innerHTML.indexOf("<a",previousIndex);
			workingIndex = divs[i].innerHTML.indexOf(">",workingIndex);
			newHTML = newHTML + divs[i].innerHTML.substring(previousIndex,workingIndex);
			newHTML = newHTML + " onmouseover=\"showLink(this)\" onmouseout=\"showText(this)\"";
			previousIndex = workingIndex;
		}
		newHTML = newHTML + divs[i].innerHTML.substring(previousIndex);
		divs[i].innerHTML = newHTML;
	}
}
			