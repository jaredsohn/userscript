// ==UserScript==
// @name           nuwanda
// @namespace      
// @description    asdasjasdhkakjsdhskj
// @version        1.0
// @include        
// ==/UserScript==


function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent = "(" + tag.textContent + ")();";
	document.body.appendChild(tag);
}

function getMute()
{
	var mute = localStorage.getItem("tmute");
	if (mute == null) 
		return [];
	else
	{
		mute = mute.split(',');
		return mute;
	}
}

function addMute(id)
{
	var mutePosts = getMute();
	mutePosts.push(id);
	localStorage.setItem("tmute", mutePosts);
}

function delMute(id, post)
{
	var mutePosts = getMute();
	mutePosts.splice(mutePosts.indexOf(id),1);
	localStorage.setItem("tmute", mutePosts);
	
	/*$('tunmute-' + post).up().setAttribute('class', 'post not_mine');
	$('tunmute-' + post).fade();
	$('tmuted-' + post).toggle();*/
	$('tunmute-' + post).innerHTML = 'Post görünür hale getirildi. Postu görebilmek için sayfayı <a style="cursor: pointer;" onclick="window.location.reload(false);">yenileyiniz</a><a href="#">.</a> ';
}

function tmute(post, id, newID)
{
	hidePost = $$('a[data-root-post-id="' + id + '"]');
	for (var i = 0; i < hidePost.length; i++)
	{
		var mutePost = hidePost[i].up().up();
		//if (hidePost[i].up().up().readAttribute('class').search('same_user_as_last') == -1 && hidePost[i].up().up().next().readAttribute('class').search('same_user_as_last') > -1)
		if (mutePost.readAttribute('class').search('same_user_as_last') == -1)
		{
		// mutePost.next().readAttribute('class').search('same_user_as_last') > -1
			var nextPost = mutePost.next();
			while (nextPost.readAttribute('tmute') != null)
				nextPost = nextPost.next();
			if (mutePost.next().readAttribute('class') == null)
				nextPost = nextPost.next();
			
			if (nextPost.readAttribute('class').search('same_user_as_last') > -1)
			{
				nextPost.setAttribute('class', nextPost.readAttribute('class').replace('same_user_as_last', ''));
				
				var newPost = nextPost.readAttribute('id').substring(nextPost.readAttribute('id').search('_')+1);
				var newMenu = $('user_menu_' + post);
				newMenu.setAttribute('id', 'user_menu_' + newPost);
				nextPost.insert(newMenu);
			}
		}
		
		mutePost.setAttribute('tmute', true);
	
		mutePost.setAttribute('class', 'notification   single_notification ');
		mutePost.innerHTML = '<span id="tmuted-' + post + '" style="display:none">' + mutePost.innerHTML + '</span><span id="tunmute-' + post + '"> Post Gizlendi. <a onclick="delMute('+ id + ', ' + post + ')" style="cursor: pointer;">- Eski haline getir -</a></span>';
		//mutePost.fade();
		if (newID)
			addMute(id);
	}

	return;
}

function getPosts(startNum, mutePosts)
{
	var allPosts = document.getElementById("posts").getElementsByTagName('li');
	var postContainer = [], postControls = [];
	
	for (var i = startNum; i < allPosts.length; i++)
	{
		if (allPosts[i].innerHTML.search('post_') > -1)
		{
			postContainer.push(allPosts[i]);
			postControls.push(postContainer[postContainer.length - 1].getElementsByTagName('a'));
		}
	}

	for (var i = 0; i < postControls.length; i++)
	{
		for (var j = 0; j < postControls[i].length; j++)
		{
			if (postControls[i][j].getAttribute('id') != null)
			{
				if (postControls[i][j].getAttribute('id').search('like_button') >= 0)
				{
					checkPost(postControls[i][j].getAttribute('id'), mutePosts);
					if (i+1 < postControls.length) 
						i++;
					else 
						break;
					j = 0;
				}
			}
		}
	}
	
	return allPosts.length + startNum;
}

function checkPost(postID, mutePosts)
{
	var rootID = $(postID).readAttribute('data-root-post-id');
	
	if (mutePosts.indexOf(rootID) != -1)
	{
		var postIDNum = postID.substring('like_button_'.length);
		tmute(postIDNum, rootID, false);
	}
	else
		addX(postID, rootID);
}

function addX(postID, rootID)
{
	var postIDNum = postID.substring('like_button_'.length);
	if ($(postID).previous().innerHTML == "&#x2715;") return;
	
	var postX = document.createElement('a');
		postX.setAttribute('id', 'tmute-' + postIDNum);
		postX.setAttribute('onclick', 'tmute(' + postIDNum + ', ' + rootID + ', true)');
		postX.setAttribute('style', 'font-size:20px; vertical-align:-3px; margin-left: 5px; cursor: pointer;');
		postX.innerHTML = '&#215;';
	
	if ($(postID).parentNode.innerHTML.search('tmute-' + postIDNum) > -1)
		return;
		
	$(postID).parentNode.insertBefore(postX, $(postID)); 
}	

function main()
{
	var mutePosts = getMute();

	var startNum = 0;
	var pageLength = document.getElementById("posts").getElementsByTagName('li').length;

	startNum = getPosts(startNum, mutePosts);

	Ajax.Responders.register({
		onLoaded: function() 
		{
		checkPage = setInterval(function() {
			var newLength = document.getElementById('posts').getElementsByTagName('li').length;
			if (pageLength < newLength)
			{
				getPosts(pageLength, mutePosts);
				pageLength = newLength;
			}
			window.clearInterval(checkPage);
			return;
		}, 5000);		
			
		},
	});




}

embedElement("script", checkPost, false);
embedElement("script", delMute, false);
embedElement("script", addMute, false);
embedElement("script", getMute, false);
embedElement("script", tmute, false);
embedElement("script", getPosts, false);
embedElement("script", addX, false);
embedElement("script", main, true);
Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy