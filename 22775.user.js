// ==UserScript==
// @name           leumit-appoint-search
// @description    leumit's bad javascript
// @include        https://online.leumit.co.il/leumit/appointSearch.jsp
// ==/UserScript==


scripts = document.getElementsByTagName("script");
for (var i in scripts)
{
	if (scripts[i].text)
	{
		str = scripts[i].text.replace(/this.F1/g, "document.F1");
		if (str != scripts[i].text)
		{
			scpt = document.createElement("script");
			scpt.setAttribute("type", "text/javascript");
			scpt.text = str;
			document.body.appendChild(scpt);
		}
	}
}
