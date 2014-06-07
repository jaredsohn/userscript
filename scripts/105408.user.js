// ==UserScript==
// @name           Ignore Bucks
// @description    Hide Troll Comments
// @version        v1.1 (modified from orginal posted by splashdown on TD)
// @include        http://www.tigerdroppings.com/*
// ==/UserScript==
// (modified from orginal posted by splashdown on TD)
// Refined parse and added additional trolls

function zapit()
{
	var myArray = getElementsByClassName('TopicMessName');
	var arLen=myArray.length;
	//alert('BUCKS POST BEING ZAPPED!');
	for ( var i=0, len=arLen; i<len; ++i )
	{
		var ele = myArray[i];
		if (ele.innerHTML.indexOf('Bucks') > 0) {
			
			hidediv(ele.parentNode); 
		} 
	};
	for ( var i=0, len=arLen; i<len; ++i )
	{
		var ele = myArray[i];
		if (ele.innerHTML.indexOf('auburntiger77') > 0) {
			
			hidediv(ele.parentNode); 
		} 
	};
	for ( var i=0, len=arLen; i<len; ++i )
	{
		var ele = myArray[i];
		if (ele.innerHTML.indexOf('AUoutlaw420') > 0) {
			
			hidediv(ele.parentNode); 
		} 
	};
	for ( var i=0, len=arLen; i<len; ++i )
	{
		var ele = myArray[i];
		if (ele.innerHTML.indexOf('EnterNewTrollUserHere') > 0) {
			
			hidediv(ele.parentNode); 
		} 
	};
	for ( var i=0, len=arLen; i<len; ++i )
	{
		var ele = myArray[i];
		if (ele.innerHTML.indexOf('EnterNewTrollUserHere') > 0) {
			
			hidediv(ele.parentNode); 
		} 
	};
}


function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function hidediv(ele) {
	if (document.getElementById) { // DOM3 = IE5, NS6
		ele.style.display = 'none';
	}
	else {
		if (document.layers) { // Netscape 4
			ele.display = 'none';
		}
		else { // IE 4
			ele.style.display = 'none';
		}
	}
}

zapit();