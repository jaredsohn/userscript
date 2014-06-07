// ==UserScript==
// @name	(KDS)“只看楼主”所有楼层合并查看
// @namespace	unogz
// @include	http://club.pchome.net/thread_*_*_*___*.html
// @exclude	http://club.pchome.net/thread_*_*_*___.html
// @version	1.2
// ==/UserScript==
function getMessage(item)
{
	if (item == null) return null;
	var o = item.childNodes[7];
	if (o == null) return null;
	var o = o.childNodes[9];
	if (o == null) return null;
	var o = o.childNodes[3];
	if (o == null) return null;
	return o;
}

function hide(element)
{
	if (element == null) return;
	element.style.display = "none";
}

function remove_floors()
{//if(!confirm("是否立刻合并显示帖子？")) return;
	var leftContent = document.getElementById("left_content");
	if (leftContent == null || leftContent.childNodes.length == 0) return;
	var first = null;
	var range = null;
	for (var i = 0; i < leftContent.childNodes.length; i ++)
	{
		item = leftContent.childNodes[i];
		if (item.nodeName != "DIV") continue;
		if (item.className != "item" && item.className != "item odd") continue;
		
		var html = "<div style=\"clear:both;text-align:right\">" + item.childNodes[13].innerHTML + "</div>";
		if (first == null)
		{
			hide(item.childNodes[13]);
			hide(item.childNodes[19]);
			first = getMessage(item);
			range = first.ownerDocument.createRange();
			range.setStartAfter(first.lastChild);
		}
		else
		{
			var following = getMessage(item);
			html = "<hr/>" + following.innerHTML + html;
			item.style.display = "none";
		}

		try
		{
			var frag = range.createContextualFragment(html);
			first.appendChild(frag);
		}
		catch (ex)
		{
			alert(ex);
		}
	}
}

remove_floors();
