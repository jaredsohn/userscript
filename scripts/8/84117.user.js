// ==UserScript==
// @name           Basecamp Side by Side Todos
// @namespace      side_by_side
// @description    Side by Side
// @include        https://*.basecamphq.com/*/todo_lists
// ==/UserScript==
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

leftCol = false;
rightCol = false;

function move() {
	//initialize all the lists
	var lists = document.getElementsByClassName('list_wrapper');
	for(i = 0; i < lists.length; i++) {
		var list = lists[i];
		list.style.left = "0px";
		list.style.top = "0px";
		removeClass(list, 'active');
	}
	
	//move all items to their appropriate spot
	var top = 0;
	for(i = 0; i < lists.length; i++) {
		var list = lists[i];
		if(list.id == leftCol) {
			list.style.top = (0-list.offsetTop)+"px";
			list.style.left = (350-list.offsetLeft) + "px";		
			addClass(list, 'active');
		}
		else if (list.id == rightCol) {
			list.style.top = (0-list.offsetTop)+"px";
			list.style.left = (700-list.offsetLeft) + "px";		
			addClass(list, 'active');
		}
		else {		
			 list.style.left = (0-list.offsetLeft)+"px";
			 list.style.top = (0-list.offsetTop+top)+"px";
			 top+=list.offsetHeight;
		}
	}
	
}

function moveLeft() {
	leftCol = this.getAttribute('list_id');
	move();
}
function moveRight() {
	rightCol = this.getAttribute('list_id');
	move();
}



function init() {
	addGlobalStyle(' \
	#swap_from .Left { width:1000px; } \
	#swap_from .Left .col { width:1100px; height:2000px; } \
	body.todos div.list_wrapper { float:left; width:300px; } \
	body.todos div.list_wrapper .listdesc { display:none; } \
	body.todos div.list_wrapper .item_wrapper { display:none; } \
	body.todos div.list_wrapper .completed_items_todo_list { display:none; } \
	body.todos div.list_wrapper .add_item { display:none; } \
	body.todos div.list_wrapper .viewallcomplete { display:none; } \
	body.todos div.list_wrapper .compare1 { float:left; display:block; cursor:pointer; } \
	body.todos div.list_wrapper .compare2 { float:left; display:block; cursor:pointer; } \
	body.todos div.list_wrapper.active .listdesc { display:block; } \
	body.todos div.list_wrapper.active .item_wrapper { display:block; } \
	body.todos div.list_wrapper.active .completed_items_todo_list { display:block; } \
	body.todos div.list_wrapper.active .add_item { display:block; } \
	body.todos div.list_wrapper.active .viewallcomplete { display:block; } \
	body.todos div.list_wrapper.active .compare1 { display:none; } \
	body.todos div.list_wrapper.active .compare2 { display:none; } \
	');
	
	
	
	var lists = document.getElementsByClassName('list_wrapper');

	for(i = 0; i < lists.length; i++) {
			var list = lists[i];
			var showlist = list.children[0];
	
			var newdiv = document.createElement('div');
			newdiv.setAttribute('class', 'compare1');
			newdiv.innerHTML = '1';
			newdiv.setAttribute('list_id', list.id);
			newdiv.addEventListener("click", moveLeft, false);
			showlist.appendChild(newdiv);
	
			var newdiv = document.createElement('div');
			newdiv.setAttribute('class', 'compare2');
			newdiv.innerHTML = '2';
			newdiv.setAttribute('list_id', list.id);
			newdiv.addEventListener("click", moveRight, false);
			showlist.appendChild(newdiv);
	}
	
	move();

}

init();