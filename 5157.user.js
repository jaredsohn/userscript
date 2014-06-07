// ==UserScript==
// @name           highlight paragraph
// @namespace      http://my.donews.com/firewood/
// @description    highlight the current paragraph to read more clearly
// @include        *
// ==/UserScript==


// version 0.22 @ 2006.8.18
// changelog: * the highlight paragraph will always be in the center of the browser window now(if it can be)
//                    * more paragraph,such as font,span tags in use,can be recongnized now
//                    * add some program annotations
// Having the experience of last two times,I have to say : though it is very suitable for me now,I'll update it if necessary

// version 0.21 @ 2006.8.15
// changelog : * in most times,the page scroll can catch up with the highlight block scroll now.If the left times,use the keyboard or mouse wheel. ^o^
// This time I won't update indeed

// version 0.20 @ 2006.8.15
// changelog : *  page can be scrolled with hightlight block scrolling now ( important )
//		   *   rename the method scroll()  to scrollBlock(),no conflict with the default window.scroll() method now
// The script satisfies my needs now,so I won't update the script unless someone ask for more functions.

// version 0.10 @ 2006.8.15
// copyleft @ Triton, Contact:Tritonzhu@gmail.com
// like the exsension Paragraph,highlight the current paragraph
// Ctrl+mouseclick to hight the current paragraph,( Firefox's default action for Ctrl+click on links is opening the link in new tab,so don't click on links. ) . Alt+Up/Down arrow to highlight previous/next paragraph,Alt+R to clear the highlight
// to be solved : scroll page togather with the highlight block scrolls

var GM_node = null;
var GM_color_back,GM_bg_back,GM_fw_back,GM_order;
var GM_p = document.getElementsByTagName("p");
var GM_disY = 0;

document.addEventListener("click",init,false);

//when click happens
function init(e){
	if(e.altKey == false && e.ctrlKey ==true && e.shiftKey == false){
		clean();
		GM_node = e.target;
		if(check()){
			store();
			getDisY();
			scrollTo(0,GM_disY + (GM_node.offsetHeight - window.innerHeight)/2);
			highlight();
			document.addEventListener("keydown",scrollBlock,false);
		}
		else GM_node = null;
	}
} 

//when keydown happens
function scrollBlock(e){
	//highlight the next paragraph
	if(e.altKey == true && e.ctrlKey ==false && e.shiftKey == false && e.keyCode == 40){
		if(GM_order < GM_p.length-1){
		clean();
		store();
		GM_node = GM_p[++GM_order];
		getDisY();
		scrollTo(0,GM_disY + (GM_node.offsetHeight - window.innerHeight)/2);
		highlight();
		}
	}
	
	//highlight the previous paragraph
	else if(e.altKey == true && e.ctrlKey ==false && e.shiftKey == false && e.keyCode == 38){
		if(GM_order > 0){
			clean();	
			store();
			GM_node = GM_p[--GM_order];
			getDisY();
			scrollTo(0,GM_disY + (GM_node.offsetHeight - window.innerHeight)/2);
			highlight();
		}
	}
	
	//clear the highlight
	else if(e.altKey == true && e.ctrlKey ==false && e.shiftKey == false && e.keyCode ==82){
		clean();
		document.removeEventListener("keydown",scrollBlock,false);
	}
}

//to check whether it is a paragraph ,still with some bug
function check(){
	if(GM_node.tagName == "P" || GM_node.tagName == "p"){
		getOrder();
		return true;
	}
	else if(GM_node.parentNode.tagName == "P" || GM_node.parentNode.tagName == "p"){
		GM_node = GM_node.parentNode;
		getOrder();
		return true;
	}	
	else return false;
}

//to hightlight the paragraph
function highlight(){
	GM_node.style.color = "#000000";
	GM_node.style.backgroundColor = "#ffff66";
	GM_node.style.fontWeight = "bold";
}

//to store the original style
function store(){
	if (GM_node != null){
		GM_color_back = GM_node.style.color;
		GM_bg_back = GM_node.style.backgroundColor;
		GM_fw_back = GM_node.style.fontWeight;
	}
}

//to clean the highlight
function clean(){
	if (GM_node != null){
		GM_node.style.color=GM_color_back;
		GM_node.style.backgroundColor=GM_bg_back;
		GM_node.style.fontWeight=GM_fw_back;
	}
}

//to get the order of the current paragraph in the p collection
function getOrder(){
	for(var i = 0;i < GM_p.length;i++){
		if(GM_p[i] == GM_node){
			GM_order = i;
		}
	}
}

//to get the distance between the top of the paragraph and the beginning of the document
function getDisY(){
	GM_disY = 0;
	var node = GM_node;
	while(node!=document.body){
		GM_disY += node.offsetTop;
		node = node.offsetParent;
	}
}
