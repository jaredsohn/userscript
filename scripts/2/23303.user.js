// ==UserScript==
// @name            MarkScroll
// @namespace       tag:alserkli@inbox.ru,2008:gmscript
// @description     Puts a line after the previous end of page if you PageDown for
//                  the last page in the document. The mark is removed after a second,
//                  but if you use NoScript, then timeout does not work but you can
//                  press any key to remove the mark.
// ==/UserScript==

var separator = document.createElement("final");
document.body.appendChild(separator);
var markSet = false;
function mark(y){
	separator.setAttribute("style",	"position:absolute;z-index:500;"+
		"left:0px;top:"+y+"px;width:100%;height:5px;background-color:blue");
	markSet = true;
}
function clear(){
	if(markSet){
		separator.setAttribute("style","");
		markSet = false;
	}
}
function keypress(e){
	if(e.keyCode == e.DOM_VK_PAGE_DOWN
	   && !e.altKey && !e.ctrlKey && !e.shiftKey
	   // don't mark is too close to normal scroll
	   && window.scrollY > window.scrollMaxY - window.innerHeight + 50
	   && window.scrollY < window.scrollMaxY - 50){
		mark(window.scrollY + window.innerHeight - 10); // mark slightly above
		window.setTimeout(clear, 1000); // does not work with NoScript
	}else{
		clear();
	}
}
window.addEventListener('keypress', keypress, false);

