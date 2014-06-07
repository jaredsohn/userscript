// ==UserScript==
// @name			Dirty Justice (beta)
// @description		Poor Dirty Voting
// @namespace		http://*dirty.ru/*
// @namespace		http://*d3.ru/*
// @include			http://*dirty.ru/*
// @include			http://*d3.ru/*
// @namespace		http://217.106.233.10/*
// @include			http://217.106.233.10/*
// @namespace		http://*leprosorium.ru/*
// @include			http://*leprosorium.ru/*
// @author			G (agel) <agel.selena@gmail.com>, idea by kotuko
// @date			2008-07-31 [0:12 AM]
// @version			0.0.1G
// ==/UserScript==

function dj(){
var st = document.createElement("style"); st.setAttribute("type", "text/css");
st.innerHTML = ".dd a[href *=\"/users/\"]{display:none!important} .vote div .rating {visibility:hidden!important} .tree .vote div .rating {visibility:visible!important} .tree .vote div .rating em {display:none} .comments #content .inuse .vote div span, .news #content .inuse .vote div span, .comments #content .mine .vote div span, .news #content .mine .vote div span {background:none} .comments #content .dd .vote div a.plus, .news #content .dd .vote div a.plus {top:15px}";
var sc = document.createElement("script"); sc.setAttribute("type", "text/javascript");
sc.innerHTML = "function $(id){return document.getElementById(id);}function displayInPlaceReplyForm(replyLink, userlink){replyLink.blur();whereShowBox = replyLink.parentNode.parentNode.parentNode;whereShowBox.appendChild (replyForm);replyForm.replyto.value = whereShowBox.parentNode.getAttribute('id'); if(userlink){replyForm.comment.value = replyForm.comment.value;}$('reply_link_default').style.display = 'block';replyForm.style.display = \"block\";replyForm.comment.focus();return false;}function commentIt(e, reply_link, user_link){if(!e) e = window.event;e.cancelBubble = true;if (e.stopPropagation) e.stopPropagation();if(typeof replyForm == 'undefined') {return false;} else {return displayInPlaceReplyForm(reply_link, user_link);}}";
document.getElementsByTagName("head")[0].appendChild(st); document.getElementsByTagName("head")[0].appendChild(sc);}dj();