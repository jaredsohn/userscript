// ==UserScript==
// @name           Bootroom Extended Ignore Feature
// @namespace      bootroom.ignore.hobnobs.gm
// @description    Ignore quoted replies from the more spectacular oxygen thieves
// @include        http://theanfieldbootroom.co.uk/viewtopic.php*
// @include        http://www.theanfieldbootroom.co.uk/viewtopic.php*
// ==/UserScript==


var removedPostText='<strong><center>Post removed because it quoted a person you are ignoring &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</center></strong></td></tr>';


	page = document.body.innerHTML;
	posts = document.body.innerHTML.split('<td class="row-post-top" width="100%">');
	parsePosts(posts);
	
function parsePosts(posts) {
	for (i=1; i < posts.length; i++) {
		post = posts[i].split('<td class="spacer" colspan="2">')[0];
		if (post.match('">RedGeezer85 ')) {
			page = page.replace(post,removedPostText);
		}
		else if (post.match('">Highasakuyt2 ')) {
			page = page.replace(post,removedPostText);
		};
	}
};

document.body.innerHTML = page;
