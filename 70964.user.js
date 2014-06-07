// ==UserScript==
// @name           Direct link to post
// @namespace      www.bungie.net
// @include        http://*bungie.net/Forums/posts.aspx?postID=*
// @include        http://*bungie.net/fanclub/*/Forums/posts.aspx?postID=*
// ==/UserScript==
if(document.URL.search('#end') > -1){
var thread = document.URL.replace("#end", "");
}
else{var thread = document.URL}

var i=0;
for (i=0;i<13;i++)
{
var post = document.getElementsByClassName('forum_item').item(i);
if(post==null){break;}
var post_actions = post.getElementsByClassName('post-actions').item(0);
var postID = post.getElementsByTagName('a').item(0).name;
var linky = thread+"#"+postID;
post_actions.getElementsByClassName('date').item(0).innerHTML += '<br><div style="position:relative; left:95%;margin-bottom:0px;font-size:8px;width:500px;">'+linky+'</div>'

}
//robby smells
var e = 0;
for (e=0;e<13;e++)
{
var post_2 = document.getElementsByClassName('forum_alt_item').item(e);
if(post_2==null){break;}
var post_actions_2 = post_2.getElementsByClassName('post-actions').item(0);
var postID_2 = post_2.getElementsByTagName('a').item(0).name;
var linky_2 = thread+"#"+postID_2;
post_actions_2.getElementsByClassName('date').item(0).innerHTML += '<br><div style="position:relative; left:95%;margin-bottom:0px;font-size:8px;width:500px;">'+linky_2+'</div>'
}
//thats all