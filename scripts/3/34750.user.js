// ==UserScript==
// @name           vBulletin Block User Script
// @namespace      TangShanDaXiong
// @description    Block user that you don't want to see.
// @include        http://*.twforum.com/forums/showthread.php?*
// ==/UserScript==

(function()
{
	var	block_user = 'greatma';
		
	var	posts_node = document.getElementById('posts');
	if(!posts_node)		return;
	
	for(i=0; i<posts_node.childNodes.length; i++)
	{
		var post = posts_node.childNodes[i];
		if(post.nodeType != 1)		continue;		// ELEMENT_NODE == 1
		if(post.tagName != 'DIV')	continue;
		if(post.id == 'lastpost')	continue;
		
		var post_user_name	= GetPostUserName(post);
		if(IsBlockUser(post_user_name) == false)	continue;
		var post_user_id	= GetPostUserId(post);
		var post_id		= GetPostId(post);
		var post_ord	= GetPostOrd(post, post_id);
		var post_time	= GetPostTime(post);
		
		var html = GetFillHTML(post_user_name, post_user_id, post_id, post_ord, post_time);
		if(html && html.length > 0)
		{
			post.innerHTML = html;
		}
	}

	function IsBlockUser(user_name)
	{
		if(user_name == block_user)
			return true;
		
		return false;
	}

	function GetPostUserName(post)
	{
		var list = post.getElementsByClassName('vbmenu_popup');
		if(list.length == 1)
		{
			list = list[0].getElementsByClassName('thead');
			if(list.length == 1)
			{
				return list[0].innerHTML;
			}
		}
		
		return '';
	}
	
	function GetPostUserId(post)
	{
		var list = post.getElementsByClassName('vbmenu_popup');
		if(list.length == 1)
		{
			var parts = list[0].innerHTML.match(/member\.php\?u=(\d+)/);
			
			return parts[1];
		}
	}
	
	function GetPostId(post)
	{
		var list = post.getElementsByClassName('vbmenu_popup');
		if(list.length == 1)
		{
			var menuId = list[0].id;
			
			if( menuId.substring(0, 'postmenu_'.length) == 'postmenu_' &&
				menuId.substring(menuId.length - '_menu'.length, menuId.length) == '_menu')
			{
				return menuId.substring('postmenu_'.length, menuId.length - '_menu'.length);
			}
		}
	}
	
	function GetPostTime(post)
	{
		var	chrPos_1 = post.innerHTML.indexOf('<!-- status icon and date -->');
		var	chrPos_2 = post.innerHTML.indexOf('<!-- / status icon and date -->');
		if(chrPos_1 != -1 && chrPos_2 > chrPos_1)
		{
			var	html = post.innerHTML.substring(chrPos_1+'<!-- status icon and date -->'.length, chrPos_2);
			html = html.replace(/<a[^>]*>.*<\/a>/, '');
			html = html.replace(/(^\s*)|(\s*$)/g, '');
			
			return html;
		}
	}
	
	function GetPostOrd(post, postId)
	{
		var list = post.getElementsByTagName('A');
		for(var i=0; i<list.length; i++)
		{
			var herf = list[i];
			
			if(herf.id == 'postcount' + postId)
				return herf.name;
		}
		
		return '';
	}
	
	function GetFillHTML(user_name, user_id, post_id, post_ord, post_time)
	{
		var html = '';
		
		html = html
			+ '\n<!-- post #<post_id> -->'
			+ '\n<!-- open content container -->'
			+ '\n<div align="center">'
			+ '\n	<div class="page" style="width:100%; text-align:left">'
			+ '\n		<div style="padding:0px 20px 0px 20px">'
			+ '\n			<div id="edit<post_id>" style="padding:0px 0px 6px 0px">'
			+ '\n				<!-- this is not the last post shown on the page -->'
			+ '\n<table id="post<post_id>" class="tborder" cellpadding="6" cellspacing="1" border="0" width="100%" align="center">'
			+ '\n'
			+ '\n<tr title="文章 <post_id>">'
			+ '\n	<td class="thead" style="font-weight:normal" >'

			+ '\n		<a style="float:right" href="showpost.php?p=<post_id>&amp;postcount=<post_ord>" target="new" rel="nofollow" id="postcount<post_id>" name="<post_ord>"><strong>#<post_ord></strong></a>'

			+ '\n		<a style="float:right" href="showpost.php?p=<post_id>" target="_blank" rel="nofollow" onclick="return display_post(<post_id>);">瀏覽文章</a>'
			+ '\n		<a name="post<post_id>"><img class="inlineimg" src="images/statusicon/post_old.gif" alt="舊" border="0" /></a>'
			+ '\n		<post_time> '
			+ '\n	</td>'
			+ '\n</tr>'
			+ '\n'
			+ '\n<tr>'
			+ '\n	<td class="alt2">'
			+ '\n		<div class="smallfont" style="float:right"><a href="profile.php?userlist=ignore&amp;do=removelist&amp;u=<post_user_id>">將用戶從屏蔽名單中移除</a></div>'
			+ '\n		<a href="member.php?u=<post_user_id>"><span style=\'color:#4C661A\'><post_user_name></span></a>'
			+ '\n	</td>'
			+ '\n</tr>'
			+ '\n'
			+ '\n<tr>'
			+ '\n	<td class="alt1">'
			+ '\n		<div class="smallfont">'
			+ '\n			此篇文章被穩藏了。因為 <strong><post_user_name></strong> 在您的 <a href="profile.php?do=ignorelist" target="_blank"> 黑名單列表</a>。'
			+ '\n		</div>'
			+ '\n	</td>'
			+ '\n</tr>'
			+ '\n'
			+ '\n<!-- / main bar -->'
			+ '\n</table>'
			+ '\n'
			+ '\n			</div>'
			+ '\n		</div>'
			+ '\n	</div>'
			+ '\n</div>'
			+ '\n<!-- / close content container -->'
			+ '\n<!-- / post #<post_id> -->'
			+ '\n';

		html = html.replace(/<post_id>/g, post_id);
		html = html.replace(/<post_time>/g, post_time);
		html = html.replace(/<post_user_name>/g, user_name);
		html = html.replace(/<post_user_id>/g, user_id);
		html = html.replace(/<post_ord>/g, post_ord);

		return html;
	}
	
})();
