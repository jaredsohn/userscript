// ==UserScript==
// @name           Kill All Links
// @namespace      http://userscripts.org/users/fuzzyrp/
// @description    Randomly (5% chance) disables all links on a page.
// @include        http://*/*
// @include        https://*/*
// ==/UserScript==


function delinkify()
{
    var links = document.getElementsByTagName("a");
    for(i=0;i<links.length;i++)
    {
      var link = links[i];
      /*
      var attrs=link.attributes;
      for (j=0;j<attrs.length; j++)
      {
	    var attr = attrs.item(j);
        link.removeAttribute(attr.name);
      }
      */
      link.removeAttribute("href");
      link.removeAttribute("target");
      link.removeAttribute("onmousedown");
      link.removeAttribute("onclick");
      link.removeAttribute("jsaction");
      link.style.cursor = "crosshair";
    }
}

if (Math.random() < 0.05)
{
    delinkify();
    setTimeout(delinkify, 5000);
}
