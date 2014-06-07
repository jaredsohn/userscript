// ==UserScript==
// @name           Carma police
// @namespace      ru.lepra.klen
// @include        http://leprosorium.ru/
// @include        http://www.leprosorium.ru/
// @include        http://leprosorium.ru/pages/*
// @include        http://www.leprosorium.ru/pages/*
// ==/UserScript==

// TODO: Сделать ограничение на 30 постов

BAN_TYPE_NONE = 0;
BAN_TYPE_KARMA = 1;
BAN_TYPE_HIDE = 2;
BAN_TYPE_DELETE = 3;

STR_KARMA = "Кармопеттинг";
STR_OFF = "Не показывать";
STR_HIDE = "Скрыть";
STR_SHOW = "Посмотреть";
STR_GOOD = "Показывать";
STR_DELETE = "Удалить";

BAD_WORDS = new Array(' карм',' минус',' плюс',' дрочер','карма');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function Police(post, id) {
	cnt = BAD_WORDS.length;
	for(var i = 0; i < cnt; i++) {
		if(post.childNodes[1].innerHTML.toLowerCase().indexOf(BAD_WORDS[i]) != -1) {
			setBan(id, BAN_TYPE_KARMA);
			postHide(post, id, '<span class="irony">кармапеттинг</span>');
			createButtons(post, id, 3);
			createButtons(post, id, 2);
			return false;
		}
	}
	return true;
};

function setBan(id, type) {
	GM_setValue("lepra.killpost."+id, type);
}

function getBan(id) {
	return GM_getValue("lepra.killpost."+id);
}

function postHide(post, id, s){
	post.childNodes[1].innerHTML = '<div id="h'+ id +'" class="hide">' + post.childNodes[1].innerHTML + '</div>' + s;
}

function showPost(id) {
	document.getElementById('h'+id).className = '';
}

function createButtons(post, id, type){

	p = document.evaluate("div[@class='dd']/div[@class='p']/span", post, null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	click=document.createElement("span")
 	p.parentNode.insertBefore(click, p);
	click.setAttribute("class", "killpost")
	
	switch(type){
		case 1 :
			click.appendChild( document.createTextNode("["+STR_OFF+"] "));
			click.addEventListener("click", function(e){ 
				setBan(id, BAN_TYPE_HIDE);
				postHide(post, id, '<sup>скрыт</sup>');
				this.parentNode.removeChild(this);
				return false;
			}, true);
			break;
		case 2 : 
			click.appendChild( document.createTextNode("["+STR_SHOW+" | "));
			click.addEventListener("click", function(e){ 
				showPost(id);
				this.parentNode.removeChild(this);
				createButtons(post, id, 4);
				return false;
			}, true);
			break;
		case 3 : 
			click.appendChild( document.createTextNode(STR_GOOD+"] "))
			click.addEventListener("click", function(e){ 
				showPost(id);
				setBan(id, BAN_TYPE_NONE);
				this.parentNode.removeChild(this);
				return false;
			}, true);
			break;
		case 4 : 
			click.appendChild( document.createTextNode("[" +STR_HIDE+" | "))
			click.addEventListener("click", function(e){ 
				postHide(post, id, '');
				this.parentNode.removeChild(this);
				createButtons(post, id, 2);
				return false;
			}, true);
			break;
		case 5 : 
			click.appendChild( document.createTextNode(" [" +STR_DELETE+"] "))
			click.addEventListener("click", function(e){ 
				if(window.confirm('Точно?')){
					setBan(id, BAN_TYPE_DELETE);
					post.style.display = 'none';					
				}
				return false;
			}, true);
	}
}

var posts = document.evaluate("//div[contains(@class,'post')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
addGlobalStyle("span.killpost { cursor:pointer;}");
addGlobalStyle("div.hide { display:none; }");

for(var i = 0; i<posts.snapshotLength; i++){
	post=posts.snapshotItem(i);
	id=post.getAttribute("id");
	kill=getBan(id);
	switch(kill){
		case BAN_TYPE_KARMA :
			postHide(post, id, '<span class="irony">кармапеттинг</span>');
			createButtons(post, id, 3);
			createButtons(post, id, 2);
			break;
		case BAN_TYPE_HIDE :
			postHide(post, id, '<sup>скрыт</sup>');
			createButtons(post, id, 3);
			createButtons(post, id, 2);
			break;
		case BAN_TYPE_NONE :
			createButtons(post, id, 5);
			createButtons(post, id, 1);
			break;
		case BAN_TYPE_DELETE :
			post.style.display = 'none';
			break;
		default :
			if(Police(post, id)) {
				createButtons(post, id, 5);
				createButtons(post, id, 1);
			}
	}
}
