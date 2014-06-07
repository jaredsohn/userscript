// ==UserScript==
// @name           Google Static Nav Bar v1.24
// @namespace      none
// @description    Duplicate Previous/Next links in fixed position at top of page
// @include        http://www.google.com/*
// ==/UserScript==

//basic CSS from: http://www.javascriptkit.com/javatutors/static4.shtml

//Thanks to GreaseWizard Joe Simmons for help with getting it working without 
// unsafeWindow and for code optimization

(function(){

//get starting number from url:
var getStart = window.location.href.slice(window.location.href.indexOf('&start=') + 7).split('&');
getStart = Number(getStart[0])
if (!getStart) getStart = 0

//number each result in red:
var allResults = document.getElementsByTagName('li') ;
var paidResults = 0, classRef
for( i=0; i<allResults.length ; i++ ){
	classRef = allResults[i].getAttribute("class")
	if (classRef && classRef.indexOf("g")==0){ //can have appendages such as "g w0"
		allResults[i].innerHTML = "<font color=red>"+(i+getStart+1-paidResults)+"</font> " + allResults[i].innerHTML
	}
	else {
		paidResults++ ;
		//removed in v1.23: allResults[i].innerHTML = allResults[i].innerHTML.replace(/return clk/gi,'return fakeClk') ;
	}
}


	//alert("pre-function")
//func to duplicate and configure the nav bar:
var intv=setInterval(newfunc = function(){
//setTimeout(function(){
//unsafeWindow.waitforload = function(){
	//alert("no oldnav")
var oldnav = document.getElementById("nav")
if (oldnav){
	clearInterval(intv);
	var newStyleDiv = document.createElement("div")
	newStyleDiv.innerHTML = '<style style="text/css">#staticcontent{position:fixed;left: 490px;top: -23px;}</style>'
	//top was 5px -28px to hide out of view; set to 5px to see Goooogle graphic
	//set left to desired width of your screen or write a 
	var newStaticDiv = document.createElement("div")
	newStaticDiv.innerHTML = '<div id="staticcontent" style=" background-color: #FFFFFF;"></div>' 
	var insertpos = document.getElementsByTagName("body")[0]
	insertpos.appendChild(newStyleDiv);
	insertpos.appendChild(newStaticDiv); 
	//alert(newStaticDiv.clientWidth)
	//when cloneNode used, offsetWidth/clientWidth are inherited from former parent:
	//var newnav = oldnav.cloneNode(true); //so opaque area is unnecessarily wide
	//instead create and fill a fresh table with no inherited clientWidth:
	var newnav = document.createElement("table")
	newnav.setAttribute("style","margin: 0 0 0; border-collapse: collapse; text-align: center; direction: ltr;")
	newnav.innerHTML = oldnav.innerHTML;
	document.getElementById("staticcontent").appendChild(newnav)
	var newnavLastTd = document.getElementById("staticcontent")
	newnavLastTd = newnavLastTd.getElementsByTagName("td")
	//ensure there is always a page 1 link available:
	if (getStart>0 && newnavLastTd.length>0 && newnavLastTd[1].innerHTML.indexOf('</span>1<')<0){
		newnavLastTd[1].innerHTML = newnavLastTd[1].innerHTML.replace(/start=[\s\S]*\&/ig, "start=0&")
		newnavLastTd[1].innerHTML = newnavLastTd[1].innerHTML.replace(/\/span>[\s\S]*</ig, "/span>1<")
	}
	//remove unwanted "margin-right: 34px" from original last <td>
	newnavLastTd = newnavLastTd[newnavLastTd.length-1]
	newnavLastTd = newnavLastTd.getElementsByTagName("span")[0]
	newnavLastTd.setAttribute("style","margin-right: 0px;")
	//alert(document.getElementById("staticcontent").clientWidth)
}
},100)
//alert(newfunc)
newfunc(); //this makes it work with Script Skipper add-on

//old code works with GM 0.7:
//setTimeout(unsafeWindwo.waitforload,4000) // nav bar not painted until onload
//window.addEventListener('DOMNodeInserted', waitforload, false); //infinite loop!!!

// NOTE: this func (refer to line 26) is an attempt to circumvent google clicktracking.
// Whether it accomplishes that is not fully known (see: http://userscripts.org/topics/34754)
/* http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener
says: "When a Node is copied using the cloneNode method the EventListeners attached to the source Node are not attached to the copied Node. If the user wishes the same EventListeners to be added to the newly created copy the user must add them manually."

fakeClk removed in v1.23 due to the Clk() function being only a Google decoy!
unsafeWindow.fakeClk = function(){
	//alert("go nowhere")
	return false
}
*/
})()