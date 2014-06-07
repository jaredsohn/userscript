// ==UserScript==
// @name           Mod popup
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// ==/UserScript==

function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};

var content = getElementsByClassName('mod_box_content', document)
var button = getElementsByClassName('buttonSmall', document)[0].cloneNode(true)
var boxes = getElementsByClassName('post_mod_box', document)
button.innerHTML = '<span>Close</span>'
button.removeAttribute('href')
for(var i=0,j=boxes.length; i<j; i++) {
	var command = boxes[i].getAttribute('onmouseover')
	var command2 = boxes[i].getAttribute('onmouseout')
	boxes[i].setAttribute('onmousedown', command)
	boxes[i].removeAttribute('onmouseover')
	boxes[i].removeAttribute('onmouseout')
	var buttons = button.cloneNode(true)
	content[i].appendChild(button.cloneNode(true))
	content[i].lastChild.setAttribute('onclick', command2)
}