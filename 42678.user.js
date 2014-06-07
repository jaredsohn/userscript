// ==UserScript==
// @name           Lerpa: Mark as Read
// @namespace      *.leprosorium.ru/*
// @description    Adds Mark as Read Button
// @include        http://*leprosorium.ru/*
// ==/UserScript==

(function() {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function removeElement(post){
	post.parentNode.removeChild(post);
}


function createButtons(post){
	var p = post;
	click = document.createElement("span");
	p.parentNode.insertBefore(click, p.nextSibling);
	click.setAttribute("class", "markreadpost");
	click.appendChild( document.createTextNode(" [Убрать новые] "));
	click.addEventListener("click", function(e){ 
		//p = document.evaluate("div[@class='dd']/div[@class='p']/span/a[contains(@href,'new')]", post, null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		loadPost(p);
		return false;
		}, true);
}

function removeElement(post){
	post.parentNode.removeChild(post);
}

function loadPost(post){
	var p = post;
	
	if (p.getAttribute('href').indexOf('leprosorium.ru') > 0){
		var url = p.getAttribute('href');
	}else{
		var url = "http://leprosorium.ru" + p.getAttribute('href');
	}
	
	click = document.createElement("span");
	click.setAttribute('id','loaderRead');
	click.innerHTML = '<img src="http://codezen.ru/playground/small-ajax.gif">';
	p.parentNode.insertBefore(click, p.nextSibling.nextSibling);
	
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) { 
			if(response.status == 200){	
				removeElement(p.previousSibling);
				removeElement(p.nextSibling.nextSibling);
				removeElement(p.nextSibling);
				removeElement(p);
			}else{
				removeElement(p.nextSibling.nextSibling);
				alert("Какие-то проблемы. Попробуйте еще раз?");
			}
		}
	});
}

function action(){
	addGlobalStyle("span.markreadpost { cursor:pointer; }");

	posts = document.evaluate("//div[contains(@class,'post')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var i = 0; i<posts.snapshotLength; i++){
		post = posts.snapshotItem(i);
		p = document.evaluate("div[@class='dd']/div[@class='p']/span/a[contains(@href,'new')]", post, null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		if (p != null)
			createButtons(p);
	}
}

action();
})();