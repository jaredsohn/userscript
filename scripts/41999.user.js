// ==UserScript== 
// @name           flickard
// @namespace      pratikpoddar@flickard
// @description    Use Flickard 
// @include        http://www.flickr.com/photos/*/*
// ==/UserScript==

l = document.getElementsByTagName("img").length;
list = document.getElementsByTagName("img");
for (i=0;i<l;i++)
{
if (list[i].hasAttribute("class") && list[i].getAttribute("class")=="reflect")
{
p = list[i].getAttribute("src");
}

}


link = "http://10.129.26.220/flickard/skin.php?img="+ p;
document.getElementById("About").innerHTML = "<div><a href=" + link+ ">Flickard It</a></div>" + document.getElementById("About").innerHTML;