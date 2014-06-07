// ==UserScript==
// @name           Bangumi Mute
// @namespace      http://netaba.re
// @description    Mutes user-selected posts.
// @version        0.1
// @include        http://bgm.tv/rakuen/topiclist
// @include        http://bangumi.tv/rakuen/topiclist
// @include        http://chii.in/rakuen/topiclist

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
	var mute = localStorage.getItem("bgm_mute");
	if (mute == null) 
		return [];
	else
	{
		mute = mute.split(',');
		return mute;
	}
}

function addMute(id,index)
{
	
	var mutePosts = getMute();
	mutePosts.push(id);
	localStorage.setItem("bgm_mute", mutePosts);
	var Posts = getPosts();
	Posts[index].innerHTML = '';
}

function delMute(id)
{
	var mutePosts = getMute();
	mutePosts.splice(mutePosts.indexOf(id),1);
	localStorage.setItem("bgm_mute", mutePosts);
}


function getPosts()
{
	var allPosts = document.getElementById("eden_tpc_list").getElementsByTagName('li');
    return allPosts;
}


function mute(mutePosts,post_id){
	for (var i = 0 ; i < mutePosts.length; i++){
		if (mutePosts[i] == post_id){
			return true;
		}
	}
	return false;
}


function main()
{
    var Posts = getPosts();
	var mutePosts = getMute();
    for (var i =0; i< Posts.length; i++){
	    var post_id = Posts[i].id.split('_');
		post_id = post_id[post_id.length-1];
		if (mute(mutePosts,post_id)){
			Posts[i].innerHTML = '';
		}
		else{
			Posts[i].lastChild.lastChild.innerHTML += '<span class="title"><a href="javascript:addMute('+ post_id +','+i+')"> [X]</a></span>';
		}
		
	}


}

embedElement("script", delMute, false);
embedElement("script", addMute, false);
embedElement("script", getMute, false);
embedElement("script", getPosts, false);
embedElement("script", mute, false);
embedElement("script", main, true);