// ==UserScript==
// @name           bangumi novel reader plugin
// @namespace      com.ruocaled.bangumi
// @description    A simple index for famous bangumi novel "zhong"
// @include        http://*/topic/group/20245
// @include        http://*/group/topic/20245
// ==/UserScript==

var contentNode = document.getElementsByClassName("topic_content")[0];
var article = contentNode.innerHTML;
var new_article = article.replace( new RegExp('(<span style="font-size:25px; line-height:25px;">)(.*)(</span>)',"gm"),
	'</div>$1<a class="anchorTag" style="cursor: pointer">$2</a>$3<br/><div style="display:none">');
contentNode.innerHTML = '<div>' +new_article;

var anchors = document.getElementsByClassName('anchorTag');
for (var i=0;i<anchors.length;i++){
	anchors[i].onclick = function(e){
		var next_chapter = this.parentNode.nextSibling.nextSibling;
		next_chapter.style.display = next_chapter.style.display ? '' : 'none';
	}
}

