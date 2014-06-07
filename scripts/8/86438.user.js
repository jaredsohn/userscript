// ==UserScript== 
// @author         VampiRUS 
// @name           Evernote clipper for Habrahabr.ru 
// @description    Adds Evernote Site Memory button on Habrahabr.ru 
// @namespace      http://userscripts.org/scripts/show/86438 
// @include        http://habrahabr.ru/blogs/*/*/* 
// @include        http://habrahabr.ru/qa/* 
// @include        http://habrahabr.ru/company/*/blog/*/* 
// @exclude        http://habrahabr.ru/blogs/*/page*/ 
// @exclude        http://habrahabr.ru/qa/page*/ 
// @exclude        http://habrahabr.ru/qa/hot/ 
// @exclude        http://habrahabr.ru/qa/popular/ 
// @exclude        http://habrahabr.ru/qa/unanswered/ 
// @exclude        http://habrahabr.ru/company/*/blog/page*/ 
// @version        0.0.6 
// @licence        LGPL 3 
// ==/UserScript== 
 
 
(function(){ 
	var w = window.wrappedJSObject || window; 
	var head = document.getElementsByTagName('head')[0]; 
	if (head) { 
		var evernoteJs = document.createElement("script"); 
		evernoteJs.type = "text/javascript"; 
		evernoteJs.src = "http://static.evernote.com/noteit.min.js"; 
		head.appendChild(evernoteJs); 
	} 
	var notebook = document.querySelector("a.blog_title"); 
	if (notebook) { 
		notebook = notebook.text; 
	} else { 
		notebook = ''; 
	} 
	var title = document.querySelector("span.post_title"); 
	if (title) { 
		title = title.firstChild.nodeValue; 
	} else { 
		title = document.querySelector("a.topic").text; 
	} 
	var tagLinks = document.querySelectorAll("ul.tags li a"); 
	var tags = new Array(); 
	for (var i in tagLinks) { 
		tags.push(tagLinks[i].text); 
	} 
	tags = tags.splice(0, 3).join(','); 
	var content = document.querySelector("div.content").innerHTML; 
	var comments = document.querySelector("div#comments"); 
	if (comments) { 
		comments = comments.innerHTML; 
		comments = comments.replace(/class="comment_item"/g,'style="margin-left:20px;"'); 
		comments = comments.replace(/<div class="reply">.*?<\/div>/g,'');
		comments = comments.replace(/class="voting.*?<\/div>/g,'></div>'); 
		content += comments; 
	}
	var comments = document.querySelector("div#answers"); 
	if (comments) { 
		comments = comments.innerHTML; 
		comments = comments.replace(/<div class="reply">.*?<\/div>/g,'');
		content += comments; 
	} 
	var evernoteClipper = document.createElement("div"); 
	var evernoteClipperLink = document.createElement("a"); 
	evernoteClipperLink.href = '#';
	evernoteClipper.style.cssFloat='left';
	evernoteClipper.style.marginRight='5px';
	evernoteClipper.style.padding='5px 0'; 
	evernoteClipperLink.addEventListener('click',function(e){ 
			e.stopPropagation(); 
			e.preventDefault(); 
			w.Evernote.doClip({ 
						'title':title, 
						'suggestNotebook':notebook, 
						'suggestTags': tags, 
						'styling':'full', 
						'content': content 
						}); 
			return false; 
		},true); 
	var img = document.createElement('img'); 
	img.src = "http://static.evernote.com/site-mem-16.png"; 
	evernoteClipperLink.appendChild(img); 
	evernoteClipper.appendChild(evernoteClipperLink); 
	document.querySelector("div.infopanel").insertBefore(evernoteClipper,document.querySelector("div.twitter")); 
 
})();
