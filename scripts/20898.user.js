// ==UserScript==
// @name           ConquerClub - Filter
// @namespace      http:/klupar.com
// @description    Filters out select words
// @include        http://*conquerclub.com/*
// ==/UserScript==

//for emergency reset only
//GM_setValue('number',0);

var n = GM_getValue('number',0);
var word = GM_getValue('Filter'+0,null);

// the menus
GM_registerMenuCommand('Add New Filter',addWord);
GM_registerMenuCommand('Remove Filter',removWord);


var Page = document.getElementById('middleColumn');

if(document.getElementById('chat')){
	Page = document.getElementById('chat');
}


if (Page){
	Page.innerHTML=Page.innerHTML;
	
	for (i=0; i<n; i++){
		word=GM_getValue('Filter'+i,null);
		for (g=0; g<Page.innerHTML.lastIndexOf(word); g += (word.length)){			
			//find any 'bad word' and replace with •
			Page.innerHTML=Page.innerHTML.replace(GM_getValue('Filter'+i,null),'•');
			
		}
	}
}

function addWord()
{
	var addw = prompt("Please enter the word you wish to be filtered");
	if (addw!="" && addw != null) {
		// add to end of array
		GM_setValue('Filter'+n, addw);
		n+=1;
		GM_setValue('number',n);
	}
}

function removWord()
{
	var removw = prompt("Please enter the word you wish to remove");
	if (removw!="" && removw != null) {
		for (i=0; i<n; i++){
			if (GM_getValue('Filter'+i,null) == removw){
				GM_setValue('Filter'+i,'∆');//set to unpopular char
			}
			if (GM_getValue('Filter'+i,null) == '∆'){//check for un popular char
				//remove from array
				GM_setValue('Filter'+i,GM_getValue('Filter'+(i+1),null));
				n = n - 1;
				GM_setValue('number',n);
			}
		}
	}
}