// ==UserScript==
// @name           Post numbers yo
// @namespace      www.bungie.net
// @include        http://*bungie.net/Forums/posts.aspx?postID=*
// @include        http://*bungie.net/fanclub/*/Forums/posts.aspx?postID=*
// @author         ApocalypeX
// ==/UserScript==
//For dazarobbo <3

GM_addStyle(".postnum{postion:absolute; color:#FFD65B; padding-left:500px; padding-bottom:10px;}");

var selected_page = document.getElementsByClassName('selected').item(0);
if(selected_page==null){
var i=0;
var postnum = 1;
for (i=0;i<13;i++)
{
var post = document.getElementsByClassName('forum_item').item(i);
if(post==null){break;}
var post_actions = post.getElementsByClassName('postbody').item(0);
post_actions.innerHTML += '<div class="postnum">'+postnum+'</div>';
postnum++
postnum++
}

var e = 0;
var postnum_2 = 2;
for (e=0;e<13;e++)
{
var post_2 = document.getElementsByClassName('forum_alt_item').item(e);
if(post_2==null){break;}
var post_actions_2 = post_2.getElementsByClassName('postbody').item(0);
post_actions_2.innerHTML += '<div class="postnum">'+postnum_2+'</div>';
postnum_2++
postnum_2++
}
}

else{
var posts = (selected_page.innerHTML-1)*25;
var i=0;
var postnum = posts+1;
for (i=0;i<13;i++)
{
var post = document.getElementsByClassName('forum_item').item(i);
if(post==null){break;}
var post_actions = post.getElementsByClassName('postbody').item(0);
post_actions.innerHTML += '<div class="postnum">'+postnum+'</div>';
postnum++
postnum++
}

var e = 0;
var postnum_2 = posts+2;
for (e=0;e<13;e++)
{
var post_2 = document.getElementsByClassName('forum_alt_item').item(e);
if(post_2==null){break;}
var post_actions_2 = post_2.getElementsByClassName('postbody').item(0);
post_actions_2.innerHTML += '<div class="postnum">'+postnum_2+'</div>';
postnum_2++
postnum_2++
}
}