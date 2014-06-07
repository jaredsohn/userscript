// ==UserScript==
// @name           GLB Mass Equipment Fund
// @namespace      GLB
// @include        http://goallineblitz.com/game/team_item_fund.pl?team_id=*
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

function update() {
	var updatevalue = newbox.value
	for(var i=0,j=boxes.length-3; i<j; i++) {
		test = boxes[i].getAttribute("type")
		if (test == 'text') {boxes[i].setAttribute('value', updatevalue)}
	}
}

var container = document.getElementById('allowances')
var boxes = container.getElementsByTagName('input')
var title = getElementsByClassName('medium_head', container)[0]
title.innerHTML = title.innerHTML + '<br>'
var newbox = document.createElement('input')
title.appendChild(newbox)
var test = 'test'
var newbutton = document.createElement('input')
newbutton.setAttribute('type', 'button')
title.appendChild(newbutton)
newbutton.addEventListener('click', update, false)
newbutton.setAttribute('value', 'Update')