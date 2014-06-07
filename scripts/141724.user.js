// ==UserScript==
// @name        Golem multi-page fix
// @description fetches all the pages (up to 9) of a golem.de article to allow reading of articles
// @namespace   http://userscripts.org/users/407216
// @include     http://www.golem.de/*
// @version     0.01
// ==/UserScript==

if (window==window.top){
	var links = [];
	var regex_result = /^(.*)\.html$/.exec(document.URL);
	if (regex_result == null)
		return;
	for (var i=2;i<10;++i){
		var new_link = regex_result[1] + "-" + i + ".html";
		links.push(new_link);
	}

	//array containing the pages we insert
	var articleelements = [];
	var article = document.querySelector('article');
	for (link in links){
		var new_article = document.createElement('article');
		article.parentNode.insertBefore(new_article, article.nextSibling);
		articleelements.push(new_article);
	}
	
	for(var i=0;i<links.length;++i) {
		var iframe = document.createElement('iframe');
		iframe.style.visibility = "hidden";
		document.body.appendChild(iframe);
		iframe.sandbox =  "allow-scripts allow-same-origin allow-top-navigation";
		iframe.articleelement = articleelements[i];
		iframe.onload = function (){
			try {
				var article = this.contentDocument.querySelector('article');
				if (!article)
					throw 1;
				if (this.articleelement == null)
					throw 1;
				if (article.previousElementSibling)
					throw 1;
				if (this.articleelement.children.length)
					throw 1;
				this.articleelement.innerHTML = article.innerHTML;
			}
			catch(e){
				if (e != 1)
					console.log(e);
			}
			//clean-up this iframe
 			this.parentNode.removeChild(this);
		}
		iframe.onerror = function (){this.articleelement = null;};
		iframe.src = links[i];
	} 

}

var old_onload = window.onload;
window.onload = function(){
	
	if(old_onload){
		old_onload();
	}
	//remove the page navigators in all pages
	var next_page_links = document.querySelector('#table-jtoc');
	next_page_links.parentNode.removeChild(next_page_links);
	var next_page_links = document.querySelector('#list-jtoc');
	next_page_links.parentNode.removeChild(next_page_links);
}
