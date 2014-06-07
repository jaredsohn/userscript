// ==UserScript==
// @name           Home
// @namespace      Home Shortcut
// @description    Home Shortcut
// @include        *erepublik.com/en
// ==/UserScript==


(function(){
 
var clickEvent = document.createEvent('MouseEvent');
clickEvent.initEvent('click',true,true);

document.addEventListener('keydown', function(e) {
 switch (e.keyCode)
		{
			case 219:	//[
				 var a = document.getElementById("fundRW_btn");
				a.dispatchEvent(clickEvent);
				return false;
				break;
			case 221:	//]
				 var a = document.getElementById("fundRW_btn2");
				a.dispatchEvent(clickEvent);
				return false;
				break;
		}
}, false);
})();