// ==UserScript==
// @name           post2get
// @namespace      post2get
// @description    changes post to get
// @include        http://search.digikey.com/scripts/DkSearch/dksus.dll*
// @include        http://search.digikey.com/us/en/cat/*
// ==/UserScript==

drilldownID = 'Only select from one box at a time';
contdiv = document.getElementById('content');
//alert(drilldownID);
if(doesExist(drilldownID,contdiv.innerHTML))
{window.addEventListener('load', postget(), true);}


function postget(){
//alert('postget');
var myforms = document.getElementsByTagName('form');
//alert(myforms.length);

	for (var i=0; i<myforms.length-1; i++){
		if (myforms[i].method == 'post'){
			myforms[i].method = 'get';
		} 
	}
//alert('end');
}

// doesExist pass it any substring and the innerHTML of the element you are looking in.
function doesExist(astring, inelement){
    return (inelement.indexOf(astring) != -1);
}