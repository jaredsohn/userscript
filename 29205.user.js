// ==UserScript==
// @name           KDS Helper
// @namespace      unogz
// @include        http://club.pchome.net/forum_*.html
// ==/UserScript==

// Helper defination
var hiColor = "#f00";
var hiBgColor = "#eee";
String.prototype.trim=function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
}
function showOwner(evt)
{
	var loginInfo = document.getElementById("login_info");
	if (loginInfo == null) return;
	var nickName = loginInfo.childNodes[1].childNodes[1].textContent.trim();
	var items = document.getElementsByTagName("ul");
	for (var i = 0; i < items.length; i ++)
	{
		var item = items[i];
		if (item.childNodes.length == 17 &&
			item.className.indexOf("list_item") >= 0)
		{
			var owner = item.childNodes[9].childNodes[1];
			if (owner != null && owner.textContent == nickName)
			{
				hiLightItem(item, owner);
			}
			var reply = item.childNodes[13].childNodes[1];
			if (reply != null && reply.textContent == nickName)
			{
				hiLightItem(item, reply);
			}
		}
	}
}
function hiLightItem(item, subitem)
{
	var index = subitem.parentNode.className == "i5" ? 11 : 15;
	item.childNodes[index].style.color = hiColor;
	item.childNodes[index].style.fontWeight = "Bold";
	item.childNodes[index].style.backgroundColor = hiBgColor;
	subitem.style.color = hiColor;
	subitem.style.fontWeight = "Bold";
	subitem.style.backgroundColor = hiBgColor;
}

function clone_pager()
{
	var leftContent = document.getElementById("left_content");
	if (leftContent == null) return;
	var list = leftContent.childNodes[45];
	if (list == null) return;
	var pager = leftContent.childNodes[51];
	if (pager == null) return;
	var pager2 = pager.cloneNode(true);
	var obj = leftContent.insertBefore(pager2, list);
}

// Helper Starting
showOwner(null);
clone_pager();
