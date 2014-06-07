// ==UserScript==
// @name           doNotShowThisPost
// @namespace      ru.zagrebelin.lepra
// @include        http://leprosorium.ru/
// @include        http://leprosorium.ru/pages/*
// @description    Удаляет с лепры посты, которые не нравятся.
// ==/UserScript==
/*
	ver 0.2  Теперь с возможностью стать (хотя бы и на время) Каймерой. about:config, lepra.killpost.kaymero=true/false.
	ver 0.1  Первая рабочая версия.
*/
(function() {

// 0: show post
// 1: kill permanently
// 2: hide post
BAN_TYPE_NONE = 0
BAN_TYPE_KILL = 1
BAN_TYPE_HIDE = 2

STR_KILL = "Убить пост"
STR_HIDE = "Скрыть"
STR_SHOW = "Показать"

bKaymero = GM_getValue("lepra.killpost.kaymero", false);

STR_HIDE = STR_HIDE+"]"
STR_SHOW = STR_SHOW+"]"
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function getBan(id){
	if(bKaymero)
		return BAN_TYPE_KILL;
	return GM_getValue("lepra.killpost."+id, BAN_TYPE_NONE);
}

function switchBan(id){
	if(getBan(id)==BAN_TYPE_NONE)
		setBan(id, BAN_TYPE_HIDE);
	else
		setBan(id, BAN_TYPE_NONE);
		
}
function setBan(id, type){
	GM_setValue("lepra.killpost."+id, type)
}


function createButtons(post, id, type){
	p = document.evaluate("div[@class='dd']/div[@class='p']/span", post, null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

	click=document.createElement("span")
	p.parentNode.insertBefore(click, p);
	click.setAttribute("class", "killpost")
	click.appendChild( document.createTextNode("["+STR_KILL+" | "))
	click.addEventListener("click", function(e){ setBan(id, BAN_TYPE_KILL); removeElement(post); return false;}, true);;


	click=document.createElement("span")
	p.parentNode.insertBefore(click, p);
	click.setAttribute("class", "killpost")
	if(type==BAN_TYPE_HIDE){
		click.appendChild( document.createTextNode(STR_SHOW));
		addClass(click.parentNode.parentNode.parentNode, "shrinked")
//		shrinkPost(this);
	}
	else{
		click.appendChild( document.createTextNode(STR_HIDE))
	}
	click.addEventListener("click", function(e){ switchBan(id); shrinkPost(this); return false;}, true);;


}

function removeElement(post){
	post.parentNode.removeChild(post);
}
function matchClass( objNode, strCurrClass ) {
	return ( objNode && objNode.className.length && objNode.className.match( new RegExp('(^|\\s+)(' + strCurrClass + ')($|\\s+)') ) );
}
function removeClass( objNode, strCurrClass ) {
	replaceClass( objNode, '', strCurrClass );
}

function addClass( objNode, strNewClass ) {
	replaceClass( objNode, strNewClass, '' );
}
function replaceClass( objNode, strNewClass, strCurrClass ) {
	var strOldClass = strNewClass;
	if ( strCurrClass && strCurrClass.length ){
		strCurrClass = strCurrClass.replace( /\s+(\S)/g, '|$1' );
		if ( strOldClass.length ) strOldClass += '|';
		strOldClass += strCurrClass;
	}
	objNode.className = objNode.className.replace( new RegExp('(^|\\s+)(' + strOldClass + ')($|\\s+)', 'g'), '$1' );
	objNode.className += ( (objNode.className.length)? ' ' : '' ) + strNewClass;
}



function shrinkPost(link){
	var parent = link.parentNode.parentNode.parentNode;
	if(matchClass(parent, 'shrinked')){
		removeClass(parent, 'shrinked');
		addClass(parent, 'was_shrinked');
		link.oldHTML = link.innerHTML;
		link.innerHTML = STR_HIDE;
		link.blur();
	} else {
		removeClass(parent, 'was_shrinked');
		addClass(parent, 'shrinked');
		if(link.oldHTML){
			link.innerHTML = link.oldHTML;
		}
		else{
			link.innerHTML = STR_SHOW;
		}
		link.blur();
	}
	return false;
}

function action(){

	addGlobalStyle(".post.shrinked div.dt{ display:none; }");
	addGlobalStyle(".post.was_shrinked div.dt{ display:inline; }");
	addGlobalStyle("span.killpost { cursor:pointer; }");

	posts = document.evaluate("//div[contains(@class,'post')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var idx = 0; idx<posts.snapshotLength; idx++){
		post=posts.snapshotItem(idx);
		id=post.getAttribute("id")
		kill=getBan(id)
	
		switch(kill){
			case BAN_TYPE_KILL:
				removeElement(post);
				break;
			case BAN_TYPE_NONE:
				createButtons(post, id, kill);
				break;
			case BAN_TYPE_HIDE:
					createButtons(post, id, kill);
					break;
		}
	}
	if(bKaymero){
		ids=Array('measure', 'paginator', 'total_pages')
		for(var id in ids){
			div = document.evaluate("//div[@id='"+ids[id]+"']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			removeElement(div);
		}
	}
	GM_setValue("lepra.killpost.kaymero", false)
}


action();
})();