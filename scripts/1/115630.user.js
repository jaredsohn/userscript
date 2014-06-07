// ==UserScript==
// @name           Test script
// @namespace      http://singlesanime.blogspot.com
// @description    Only for testing.
// @author         Delzon
// @icon           http://dl.dropbox.com/u/16954721/web/img/socialmemes.png
// @include     http://www.facebook.com/*
// @include     https://*.facebook.com/*
// @version        37.0
// ==/UserScript==


//Auto

var SUC_script_num = 115630; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 30000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab(http://userscripts.org/scripts/source/115630.user.js);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}



// ASD AD AD DF SDFDSFS 6D478G D6
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "50px";
	div.style.left = "0px";
	div.style.color = "#888";
	div.style.border = "0px solid #888";
	div.style.zIndex = "999999";
	div.style.padding = "0px";
	div.innerHTML = "<style></style><a title=\"Ver codigos\" style=\"text-decoration:none;color:#888;\" href=\"http://adf.ly/196180/memecodigos\" target=\"_blank\" onClick=\"window.open(this.href, this.target, 'scrollbars=yes,toolbar=no,menubar=no,status=no,width=800,height=500'); return false\"><img  src=\"http://dl.dropbox.com/u/16954721/img/btnmeme.png\" /></a>"
	body.appendChild(div);
}

	function replaceByClass(className, obj) {
		if(obj.getElementsByClassName) {
var nodes = obj.getElementsByClassName(className);
for(i in nodes) {
	if(typeof(nodes[i].innerHTML)=="string") {
		changeEmoticon(nodes[i]); 
	}
}
		}
	}
//212JOHOIHUIHOUIH+656+46541+65+54+54646546545641
function changeEmoticon(node) {
// See More Fix
node.innerHTML = node.innerHTML
.replace(/&quot;\)/g, '&quot; )');
node.innerHTML = node.innerHTML
//Reaction Faces

//--Mas++
.replace(/:cred:/g, "<img src=\'http://dl.dropbox.com/u/16954721/web/img/Credencial.png\' />")

.replace(/:imgur-/g, "<img src=\'http://i.imgur.com/")
.replace(/:minus-/g, "<img src=\'http://i.minus.com/")
.replace(/-:/g, "\' width=\'100%\' title='imgur-#####.(jpg)(png)(gif)'  />")
.replace(/src\=\"http:\/\/x3.fjcdn.com\/site\/funnyjunk\/images\/transparent_pixel.gif\"/g, "")
.replace(/original=\"/g, "src=\"");
	}
	
	function commonInsert(obj) {
		if(typeof(obj)=="object") {
replaceByClass('tweet-text', obj); //Twitter
replaceByClass('commentContent', obj); //Facebook
replaceByClass('mobile_status', obj); //Facebook
replaceByClass('uiStreamMessage', obj); //Facebook sadf dsafsd fsd ds 
replaceByClass('GBThreadMessageRow_Body_Content', obj); //Facebook
replaceByClass('UIStory_Message', obj); //Facebook
replaceByClass('t', obj); //FunnyJunk
replaceByClass('md', obj); //Reddit
replaceByClass('fbPhotosPhotoCaption', obj); //f
replaceByClass('statusUnit', obj); // npi
replaceByClass('commentBody', obj); //FunnyJunk
replaceByClass('comment even thread-even depth-1', obj); //MemeBase
replaceByClass('commentlist', obj); //MemeBase
replaceByClass('displayed', obj); //Can't Remember
replaceByClass('reply', obj); //Can't Remember
replaceByClass('fbQuestionsPollClickTarget', obj); //Facebook
replaceByClass('pas fbQuestionsPollResultsBar', obj); //Facebook
replaceByClass('inputboxusr', obj); //Facebook
replaceByClass('mvs answerText', obj); //Facebook
replaceByClass('fcg', obj); //Can't Remember
replaceByClass('fbPhotoCaptionText', obj); //Facebook
replaceByClass('uiHeaderTitle', obj);
replaceByClass('content', obj); //Various
replaceByClass('comment-content', obj); //Various
replaceByClass('box_cuerpo', obj); //Various
replaceByClass('post-contenido', obj); //Cabron
replaceByClass('cuerpocontainer', obj); //Cabron
replaceByClass('post-contenedor', obj); //Cabron
replaceByClass('highlighted', obj); //Cabron
replaceByClass('main', obj); //Cabron
replaceByClass('box   comment_box', obj); //Cabron
replaceByClass('post_content', obj); //tumblr
replaceByClass('post', obj); //tumblr
replaceByClass('cx-comment-display', obj);
replaceByClass('watch-expander yt-uix-expander  yt-uix-expander-collapsed', obj); //YouTube
replaceByClass('comment-list', obj); //YouTube
replaceByClass('comment', obj); //YouTube
replaceByClass('comment-text', obj); //YouTube
replaceByClass('comment last', obj); //YouTube
replaceByClass('a-f-i-W-p', obj); //Google Plus
replaceByClass('a-b-f-i-p-R', obj); //Google Plus
replaceByClass('zj', obj); //Google Plus
replaceByClass('wackmsg_new_sender', obj); // Google Plus
replaceByClass('wackmsg wackmsgtype_c', obj); //Google Plus
replaceByClass('chat_content', obj); // Google Plus
replaceByClass('youmsg', obj); //Omegle
replaceByClass('logwrapper', obj); //Omegle
replaceByClass('logbox', obj); //Omegle
replaceByClass('logitem', obj); //Omegle
replaceByClass('xg_sprite feed-quote', obj); //Trollr
replaceByClass('status-update', obj); //Trollr
replaceByClass('content-comment', obj); //Trollr
replaceByClass('message_content', obj); //Grou.ps
replaceByClass('timelineUnitContainer', obj); //NweF
replaceByClass('gi', obj); //GUP
		}
	}

function nodeInserted(event) {
    commonInsert(event.target);
}



commonInsert(document);

document.addEventListener('DOMNodeInserted', function(event) {

        commonInsert(event.target);

    }, false);
