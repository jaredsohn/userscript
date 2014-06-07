// ==UserScript==
// @name        FPM script
// @namespace   SwePopeen (Proxym)
// @description Adds some FPM funktions to Rivality
// @Version     4
// @include     *rivality*?p*
// ==/UserScript==

//var add_str = "&sida=last";
//for(var i in window.document.links) {
//	window.document.links[i].href += add_str;
//}

//Laddar om sidan efter 30min
var time = 1800000;			
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;

//Toolbar
var navbar, newElement;
navbar = document.getElementById('menu_container');
if (navbar) {
    newElement = document.createElement('div');
    newElement.innerHTML = '<img src=http://i41.tinypic.com/x5uirn.png width=15 high=1></img><a title=AlliansForum  href=http://www.rivality.se/Index.asp?p=forum&nav=visak&kid=154 target=_blank><img src=http://i40.tinypic.com/2uo2q1z.png></img></a><img src=http://i41.tinypic.com/x5uirn.png width=15 high=1></img><a title=TheRivalityCalc  href=http://www.rivcalc.com target=_blank><img src=http://i42.tinypic.com/2d11ft.jpg></img></a></div><div id="menu_container"><a href=http://www.facebook.com>Facebook</a> - <a href=http://hotmail.com>Hotmail</a>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}


//Checks if there is any update avalible
document.getElementById('txtHint').innerHTML = '<iframe src="http://4fpm.webs.com/files/gm/forum/version4.htm" frameborder="0" height="0" width="0"></iframe> ';






//Allways sell max oil
var inputs = document.getElementsByTagName('input');
var pageDefault = 60;
var maxValue = 60;
var sixtyNode = null;
var maxNode = null;

	
for(i = 0 ; i < inputs.length ; i++ ){
	if(inputs[i].type=='radio' && !inputs[i].disabled){
		if(inputs[i].value==pageDefault){
	  		sixtyNode = inputs[i];
	  	}
		if(inputs[i].value>maxValue){
	  		maxValue = inputs[i].value;
	  		maxNode = inputs[i];
	  	}
	}
}
	
if(sixtyNode!=null && maxNode!=null){
		
	sixtyNode.checked=false;
	maxNode.checked=true;
}