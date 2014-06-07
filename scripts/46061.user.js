// ==UserScript==
// @name           Mob Wars Discussion Enhancer
// @namespace      http://www.mwturbo.com/
// @description    Add's enhancements to the Mob Wars Discussion Forums
// @include        *.facebook.com/apps/application.php?id=8743457343*
// @include        *.facebook.com/board.php?uid=8743457343*
// @include        *.facebook.com/topic.php?uid=8743457343*
// ==/UserScript==
var updating=true;
function insertAfter(reference,node)
{
	reference.parentNode.insertBefore(node,reference.nextSibling);
	return;
};
function add_links()
{
	Array.forEach(getElementsByClassName('author_post'),function(link)
	{
		if('1'==link.getAttribute('mw_link'))return;
		if(user_id=link.href.match(new RegExp('id=(.*)')))
		{
			var mw_link=document.createElement('a');
			mw_link.href="http://apps.facebook.com/mobwars/profile/?user_id="+user_id[1]+"#stop";
			mw_link.innerHTML='[Mob Wars Profile]';
			mw_link.style.margin='0 0 0 3px';
			insertAfter(link,mw_link);
			link.setAttribute('mw_link','1');
		}
		return;
	});
	updating=false;
	return;
};
function getElementsByClassName(className,parent)
{
	parent=parent||document;
	if(array=parent.getElementsByClassName(className))
	{
		return array;
	}
	else
	{
		var array=[];
		Array.forEach(parent.getElementsByTagName('*'),function(element)
		{
			if(element.className.match(new RegExp('\\b'+className+'\\b')))
			{
				array.push(element);
			}
			return;
		});
		return array;
	}
	return;
};
window.addEventListener('DOMNodeInserted',function()
{
	if(updating)return;
	updating=true;
	add_links();
	return;
},false);
add_links();