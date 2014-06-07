// ==UserScript==
// @name           Ultimate getElement Function
// @description    This script can be used with @require
// @author         Awesomolocity [http://gaiaonline.com/p/King_Awesomolocity]
// @version        1.1.3
// @       *
// ==/UserScript==

function $(x, type, item, num, tag, attr){
	if(!num){
		var num = 0;
	}
	if(!type){
		var type = 'id';
	}
	var y;
	switch(type){
		case 'id':
			y = document.getElementById(x);
			break;
		case 'class':
			y = document.getElementsByClassName(x)[num];
			break;
		case 'name':
			y = document.getElementsByName(x)[num];
			break;
		case 'tag':
			y = document.getElementsByTagName(x)[num];
			break;
		case 'ele':
			y = document.evaluate('.//'+tag+'[@'+attr+'="'+x+'"]', document, null, 9, null).singleNodeValue;
			break;
		case 'xpath':
			y = document.evaluate(x, document, null, XPathResult.ANY_TYPE, null);
			break;
	}
	if(item){
		return y;
	}
	else{
		if(y){
			return true;
		}
		else{
			return false;
		}
	}
}