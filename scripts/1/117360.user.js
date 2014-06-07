// ==UserScript==
// @name           Erepublik - Fight Shortcuts
// @namespace      Erep Fight Shortcuts
// @description    Erepublik Fight Shortcuts
// @include        *erepublik.com*/military/battlefield*
// ==/UserScript==


(function(){
 
var clickEvent = document.createEvent('MouseEvent');
clickEvent.initEvent('click',true,true);

document.addEventListener('keydown', function(e) {
 switch (e.keyCode)
		{
			case 70:	//F
				 var a = document.getElementById("fight_btn");
				a.dispatchEvent(clickEvent);
				return false;
				break;
			case 65:	//A
				 var a = document.getElementById("add_damage_btn");
				a.dispatchEvent(clickEvent);
				return false;
				break;
			case 83:	//S
				 var a = document.getElementById("change_weapon");
				a.dispatchEvent(clickEvent);
				return false;
				break;
			case 69:	//E
				 var a = document.getElementsByClassName("food_btn")[0];
				a.dispatchEvent(clickEvent);
				return false;
				break;
		}
}, false);
})();