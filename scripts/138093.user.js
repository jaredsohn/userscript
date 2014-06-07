// ==UserScript==
// @name Comment Tweaker for Patheos
// @namespace http://last-conformer.net/
// @version 0.1
// @description Add some functions to the comboxes of Patheos blogs (but not those using Disqus)
// @include http://www.patheos.com/blogs/*
// @exclude http://www.patheos.com/blogs/*/wp-admin*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

if(null==GM_getValue('authorlist',null)){GM_setValue('authorlist','[]')};
style=
".bypostauthor>.comment-content{"+
"	background-color:#FFFFA3;"+
"}"+
".collapsed-comment>.comment-content, .collapsed-comment>.reply, .collapsed-comment>ul {"+
"	display:none;"+
"}"+
".says>input{"+
"	display:none"+
"}"+
".inedit>input{"+
"	display:inline;"+
"}"+
".inedit>.displaypart{"+
"	display:none;"+
"}"+
".comment-controls{"+
"	float:right;"+
"}"+
".read-comment>.comment-content{"+
"	background-color:#E5E5E5;"+
"}"+
".important-comment>.comment-content{"+
"	background-color:#FA5858;"+
"}"
GM_addStyle(style);


comments=document.getElementsByClassName('comment');

function getCommentAuthorUri(comment){
    var retval=null;
    var comlink=comment.getElementsByClassName('comment-author')[0].getElementsByClassName('fn')[0].firstChild
    if (comlink.nodeName=='A'){retval=comlink.href};
    return retval;
}
function getCommentAuthorName(comment){
    return comment.getElementsByClassName('comment-author')[0].getElementsByClassName('fn')[0].firstChild.textContent
}

function getCommentPermalink(comment){
    return comment.getElementsByClassName("commentmetadata")[0].firstElementChild.href
}

function getAuthorList(){
    return JSON.parse(GM_getValue('authorlist'))
}
function setAuthorList(list){
    GM_setValue('authorlist',JSON.stringify(list));
}

function getCommenterNote(uri,name){
    var authorlist=getAuthorList();
    var ii;
    var length=authorlist.length
    for(ii=0;ii<authorlist.length;ii++){
        if(authorlist[ii].uri==uri&&authorlist[ii].name==name) return authorlist[ii].note;
    }
    return "";
}


function setCommenterNote(uri,name,note){
    var authorlist=getAuthorList();
    var ii;
    var length=authorlist.length
    for(ii=0;ii<authorlist.length;ii++){
        if(authorlist[ii].uri==uri&&authorlist[ii].name==name){
            authorlist[ii].note=note;
            setAuthorList(authorlist);
            return;
        }
    }
    var author=new Object();
    author.name=name;
    author.uri=uri;
    author.note=note;
    authorlist[length]=author;
    setAuthorList(authorlist)
}

function CommentReadP(comment){
	return GM_getValue("read_"+getCommentPermalink(comment),false);
}
function setCommentReadStatus(comment,status){
	if (status) GM_setValue("read_"+getCommentPermalink(comment),true)
	else GM_deleteValue("read_"+getCommentPermalink(comment))
}

function CommentImportantP(comment){
	return GM_getValue("important_"+getCommentPermalink(comment),false);
}
function setCommentImportantStatus(comment,status){
	if (status) GM_setValue("important_"+getCommentPermalink(comment),true)
	else GM_deleteValue("important_"+getCommentPermalink(comment))
}

function CommentRelevantP(comment){
    if(!CommentReadP(comment)||CommentImportantP(comment)) return true;
    var childcont=comment.getElementsByClassName('children')
    if (childcont.length==0) return false;
    var children=childcont[0].childNodes;
    var ii;
    for(ii=0;ii<children.length;ii++) 
        if(CommentRelevantP(children[ii]))
            return true;
    return false;
}

function getCommentNote(comment){
    return getCommenterNote(getCommentAuthorUri(comment),getCommentAuthorName(comment));
}

function setCommentNote(comment,note){
    setCommenterNote(getCommentAuthorUri(comment),getCommentAuthorName(comment),note)
}

function htmlFrame(note){
	return ''+
	'<span class="displaypart">'+
	'(<span>'+note+'</span>) says'+
	'</span>'+
	'<input type="text" size="50" value="'+note+'">';
}

function togglefunfactory(ii){
    return function(event){
		if(event.target==comments[ii].firstChild||event.target==comments[ii].firstChild.firstElementChild||event.target==comments[ii].children[1])$(comments[ii]).toggleClass('collapsed-comment');
	};
}
function starteditfunfactory(ii){
    return function(){
		var saysobj=$(comments[ii]).children(".comment-author").children(".says");
		saysobj.addClass("inedit");
		saysobj[0].lastChild.focus();
	}
}
function finisheditfunfactory(ii){
    return function(){
		var saysobj=$(comments[ii]).children(".comment-author").children(".says");
        var newval=saysobj[0].lastChild.value;
		saysobj[0].firstChild.firstElementChild.innerHTML=newval;
		saysobj.removeClass("inedit");
        setCommentNote(comments[ii],newval)
	}
}
function keypressfunfactory(finishfun){
	return function(event){
		if(13==event.keyCode) finishfun();
	};
}

function markreadfunfactory(ii){
	return function(){
		$(comments[ii]).addClass("read-comment");
		setCommentReadStatus(comments[ii],true);
	};
}

function markunreadfunfactory(ii){
	return function(){
		$(comments[ii]).removeClass("read-comment");
		setCommentReadStatus(comments[ii],undefined);
	};
}

function markimportantfunfactory(ii){
	return function(){
		$(comments[ii]).addClass("important-comment");
		setCommentImportantStatus(comments[ii],true);
	};
}

function markbulkfunfactory(ii){
	return function(){
		$(comments[ii]).removeClass("important-comment");
		setCommentImportantStatus(comments[ii],undefined);
	};
}


function hideCollapsedComments(){
    $('.collapsed-comment').hide();
}
function showHiddenComments(){
    $('.comment').show();
}
function markAllRead(){
	var ii;
	for (ii=0;ii<comments.length;ii++)
		markreadfunfactory(ii)();
}


function createPageControls(){
    var controls= document.createElement("div");
    controls.innerHTML="<a>hide collapsed comments</a><br><a>show hidden comments</a><br><a>mark all comments read</a><hr>";
    controls.firstChild.addEventListener("click",hideCollapsedComments,true);
    controls.children[2].addEventListener("click",showHiddenComments,true);
	controls.children[4].addEventListener("click",markAllRead,true);
    return controls
}
function createCommentControls(ii){
	var controls=document.createElement("span");
	controls.innerHTML='<b>mark </b><a>read</a>|<a>unread</a>|<a>important</a>|<a>bulk</a>';
	controls.className="comment-controls";
	controls.children[1].addEventListener("click",markreadfunfactory(ii));
	controls.children[2].addEventListener("click",markunreadfunfactory(ii));
	controls.children[3].addEventListener("click",markimportantfunfactory(ii));
	controls.children[4].addEventListener("click",markbulkfunfactory(ii));
	return controls;
}

function modifyPage(){
    var ii,comment, says, togfun, starteditfun, finisheditfun,keypressfun,insertionPoint;
    for(ii=0;ii<comments.length;ii++){
		comment=comments[ii];
		togfun= new togglefunfactory(ii);
		starteditfun= new starteditfunfactory(ii);
		finisheditfun= new finisheditfunfactory(ii);
		keypressfun=new keypressfunfactory(finisheditfun);
		comment.firstChild.addEventListener("click",togfun,true);
		comment.childNodes[1].addEventListener("click",togfun,true);
        says=comment.getElementsByClassName('comment-author')[0].getElementsByClassName('says')[0];
        says.innerHTML=htmlFrame(getCommentNote(comment));
		says.firstChild.addEventListener("click",starteditfun,true);
		says.lastChild.addEventListener("blur",finisheditfun,true);
		says.lastChild.addEventListener("keydown",keypressfun,true);
		comments[ii].getElementsByClassName('commentmetadata')[0].insertBefore(createCommentControls(ii),null)
		if(CommentReadP(comments[ii])) $(comments[ii]).addClass('read-comment');
		if(CommentImportantP(comments[ii])) $(comments[ii]).addClass('important-comment');
		if(!CommentRelevantP(comments[ii])) $(comments[ii]).addClass('collapsed-comment');
    }
	insertionPoint=document.getElementById("comments").firstChild
	insertionPoint.parentNode.insertBefore(createPageControls(),insertionPoint.nextSibling)
	insertionPoint.parentNode.insertBefore(createPageControls(),null)
}
modifyPage()
