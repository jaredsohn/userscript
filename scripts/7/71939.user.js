// ==UserScript==
// @name           Quick Quote
// @namespace      www.bungie.net
// @include        http://*bungie.net/Forums/createpost.aspx?postID=*&act=reply&apx=quote
// @include        http://*bungie.net/Forums/posts.aspx?postID=*
// ==/UserScript==

if(document.URL.search("apx=quote") > -1){
var OPuser = document.getElementById('ctl00_mainContent_postForm_skin_originalPost_skin_usernameLink').innerHTML
var GetPost = document.getElementById('ctl00_mainContent_postForm_skin_originalPost_skin_PostBlock').innerHTML
var BBcode = GetPost.replace(/<u>/g, '\[u\]').replace(/<\/u>/g, '\[\/u\]').replace(/<i>/g, '\[i\]').replace(/<\/i>/g, '\[\/i\]').replace(/<b>/g, '\[b\]').replace(/<\/b>/g, '\[\/b\]').replace(/<br>/g, '\n').replace(/<b>/g, '\[b\]').replace(/<span class="IBBquotedtable">/g, '\[quote]').replace(/<\/span>/g, '\[\/quote]').replace(/<a target="_blank" href="/g, '\[url=').replace(/">/g, '\]').replace(/<\/a>/g, '\[\/url\]');
var Final = "[quote][b]Posted by:[/b] "+OPuser+"\n"+BBcode+ "[/quote]";
function quotey(){
document.getElementById('ctl00_mainContent_postForm_skin_body').value = Final;
}
addEventListener("load", quotey, true);
}

else{
var i=0;
for (i=0;i<30;i++)
{
var replybutton = document.getElementsByClassName('forum_post_reply_button').item(i);
if(replybutton==null){break;}
var quotebutton = document.createElement('a'); 
quotebutton.innerHTML = '<a class="forum_post_quote_button" href="'+replybutton.href+'\&apx=quote"></a>' 
replybutton.parentNode.insertBefore(quotebutton, replybutton);
}
}
//Duardo yo