// ==UserScript==
// @id             blocksomebadjavascript@abc.com
// @name           Block Some bad javascript
// @version        1.0
// @namespace      http://abc.com
// @author         dahui
// @description    封鎖內涵吧的警告訊息
// @include        http://www.neihan8.com/*
// @run-at         document-start
// ==/UserScript==
var changed = 0; // How many scripts need to be edited with

window.addEventListener('beforescriptexecute', function(e) {

	if(e.target.innerHTML.search("ins.length") > 0){
		// 0 is just an arbitrary number I took for example, change it to fit the situation. 
		changed++;
		e.stopPropagation();
		e.preventDefault();
		//alert(scrips[20].innerHTML.replace(/ins\.length/g, '1'));
		// the original script has been prevent from running
		// so you can add code you want to run here
		append(e.target.innerHTML.replace(/ins\.length/g, '1'));
		//e.target.innerHTML = ;
		//alert(e.target.innerHTML);
	}	

	if(changed == 1 ) window.removeEventListener(e.type, arguments.callee, true);

}, true);

function append(s) {	 
      document.body.appendChild(document.createElement('script'))
             .innerHTML = s;
}