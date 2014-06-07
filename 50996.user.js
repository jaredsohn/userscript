// LeproRefresh advanced user script
// version 1.3
// Copyright (c) 2008-2009, babka_sotona
// Released under the GPL license
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          LeproRefresh advanced
// @namespace     http://leprosorium.ru/*
// @description   Показывает плавающую кнопочку "обновить комментарии"
// @include       http://*.leprosorium.ru/comments/*
// @include       http://leprosorium.ru/comments/*
// ==/UserScript==

var css = "\
	.refresh-block { \
		position: fixed; \
		bottom: 160px; \
		right: 0px; \
		z-index: 100; \
	} \
	.refresh-block span { \
		display: block; \
		color: #ccc; \
		border: 1px solid #ccc; \
		padding: 5px 10px; \
		margin-bottom: 1px; \
		cursor: pointer; \
	} \
	.refresh-block span:hover { \
		color: #000; \
		border: 1px solid #000; \
	} \
	.refresh-block a { \
		color: #ccc; \
		font-size: 10px; \
	} \
	.refresh-block a:hover { \
		color: #000; \
		font-size: 10px; \
	} \
";

InitializeNavLink();

function InitializeNavLink() {
	var refreshBlock = document.createElement("DIV");
	refreshBlock.className = "refresh-block";
	
	var re = new RegExp(/comments\/(.+)/gi);
	var m = re.exec(location.href);
	var postid = m[1];
	postid = postid.split('#')[0]; 
	
	refreshLink = document.createElement("SPAN");
	refreshLink.innerHTML = '<img id="refreshimg" onclick="removeNewPosts(false); commentsHandler.refreshAll('+postid+', {button:this}); return false;" src="http://codezen.ru/playground/refresh.png">';
	refreshLink.appendChild(document.createTextNode(""));
	
	refreshBlock.appendChild(refreshLink);
	document.body.appendChild(refreshBlock);
}

style = document.createElement("STYLE");
style.type = "text/css";
style.innerHTML = css;
document.body.appendChild(style);

function removeNewPosts(timer) {
	if( timer == false ){
		// set loading ico
		document.getElementById("refreshimg").src = "http://codezen.ru/playground/refresh_ani.gif";
	
		// remove new posts style
		var posts = document.getElementsByTagName("DIV");
		var postsLength = posts.length;
		for(var i = 0; i < postsLength; i++) {
			if(posts[i].className.indexOf("new") != -1) {
				posts[i].className = posts[i].className.replace("new", "");
			}
		}
		
		// set timer
		timerID = setTimeout("removeNewPosts(true)", 1000);
	}else{
		if ( document.getElementsByClassName("js–loading").length < 1 ){
			document.getElementById("refreshimg").src = "http://codezen.ru/playground/refresh.png";
			clearTimeout ( timerID );
		}
	}
}
embedFunction (removeNewPosts);

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

delete style;