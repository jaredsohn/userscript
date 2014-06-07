// ==UserScript==
// @name           infoQ presentations
// @namespace      univerz
// @include        http://www.infoq.com/presentations/
// ==/UserScript==

var idx = 0;
(function() {
	
	
	var s = document.createElement('div')
	s.setAttribute('style','position: absolute; z-index: 999; visibility: visible; left: 700px; top: 500px;')
	s.setAttribute('id','O_o')
	
	var preB = document.createElement('input')
	preB.setAttribute('type','button')
	preB.setAttribute('value','pre')
	preB.setAttribute('style','color:red;opacity:0.6;');
	
	var nextB = document.createElement('input')
	nextB.setAttribute('type','button')
	nextB.setAttribute('value','next')
	nextB.setAttribute('style','color:red;opacity:0.6;');
	
	s.appendChild(preB)
	s.appendChild(nextB)
	
	var preF = function(){
		var pp = document.getElementById("slides")
		pp.src=unsafeWindow.slides[--idx]
		nextB.setAttribute('value','next('+idx+')')
		preB.setAttribute('value','pre')
	}
	var nextF = function(){
		var pp = document.getElementById("slides")
		pp.src=unsafeWindow.slides[++idx]
		nextB.setAttribute('value','next('+idx+')')
		preB.setAttribute('value','pre')
	}
	
	var inF = function(){
		this.style.opacity='1';
	}
	var outF = function(){
		this.style.opacity='0.6';
	}
	preB.addEventListener('click',preF,false)
	nextB.addEventListener('click',nextF,false)
	preB.addEventListener('mouseover',inF,false)
	nextB.addEventListener('mouseover',inF,false)
	preB.addEventListener('mouseout',outF,false)
	nextB.addEventListener('mouseout',outF,false)
	
	document.getElementsByTagName('body')[0].appendChild(s)	
}
)();