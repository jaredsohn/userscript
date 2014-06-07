// ==UserScript==
// @name           tvshack beautifier
// @namespace      http://neuefolgen.grabs.eu
// @description    makes the show subscriptions page more useful
// @include        http://tvshack.cc/account
// @copyright      pgr
// @version        0.4
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==
(function(){
//written by petergrabs@yahoo.com



var green  = "#99ff99";
var yellow = "#ffff66";
var red    = "#ff9999";


var parent = null;
var items = null; //to be created in function prepare, TODO: add/eremove all at once, either in span(.chrildren.sort()?) or DocumentFragment

function overrideWidth(node){ if(node){ node.style.maxWidth = node.offsetWidth+"px"; node.style.width = "auto"; } }

var sizer = document.evaluate(".//div[@id='wrap-inner']", document.body, null, 8, null).singleNodeValue;
overrideWidth(sizer);
sizer = document.evaluate(".//div[@id='full-width']", sizer||document.body, null, 8, null).singleNodeValue;
overrideWidth(sizer);
parent = document.evaluate(".//ul[h3='Subscriptions']", sizer||document.body, null, 8, null).singleNodeValue;
if(!parent){ alert("subscriptions list not found"); return; }


function remove(){
	for(var i=items.length; i--; ){ //removing from the end might reduce "movement"
		parent.removeChild(items[i]); 
	}
}
function append(){
	for(var i=0, len=items.length; i<len; ++i){ 
		parent.appendChild(items[i]); 
	}
}
function sort(greater){ remove(); items.sort(greater); append(); } 

function greaterAge(item1, item2){ return (item1.age-item2.age) || greaterShow(item1,item2); } 
function greaterShow(item1, item2){ var a = item1.show; var b = item2.show; return (b<a)-(a<b); }
function greaterOrig(item1, item2){ return item1.orig-item2.orig; }

var sorters = {
	age:  function(){ sort( greaterAge  ); },
	name: function(){ sort( greaterShow ); },
	undo: function(){ sort( greaterOrig ); } //original sorting seems to be by id number (in unsubscribe link)
};
function forEachProp(obj, func){ for(var prop in obj){ func(prop, obj[prop]); } } //order isnt guaranteed, chrome seems to keep it
function linkButton(parent, name, onclick){
	var b = document.createElement("a");
	b.appendChild(document.createTextNode(name));
	b.addEventListener("click", onclick, false);
	b.style.cursor="pointer";
	parent.appendChild(document.createTextNode(" "));
	parent.appendChild(b);
}
function createMenu(){
	var caption = parent.children[0]; 
	caption.appendChild(document.createTextNode(" (sort:")); 
	forEachProp(sorters, function(prop, val){ linkButton(caption, prop, val); });
	caption.appendChild(document.createTextNode(")"));
}
function transformLi1(li1){ //make series-link visible, li.b.(a-span.a) -> li.(b.a-_-a)
	//rearrange, TODO: how do we get rid of the stupid .list-list li:hover css?
	li1.appendChild(document.createTextNode(" \u00a0 "));
	var li1_b = li1.children[0];
	var li1_a2 = li1.appendChild(li1_b.removeChild(li1_b.children[1]).children[0]); //remove span with css float:right and top-margin:-16
	li1_a2.innerHTML = "x";  //replace 'unsubscribe' by something more discrete
	//adjust style
	li1.removeAttribute("id"); //prevent strange css behavior which displays them on top of each other
	li1_b.children[0].style.display="inline"; //prevent newline after this
	li1_a2.style.display="inline"; //prevent newline before this
	li1_a2.style.fontSize = "xx-small"; //more discrete
	li1_a2.style.color = red; //more discrete
	li1_a2.style.lineHeight = "normal";//TODO: without this, li1_a2.style.display="inline" adds a pix, TODO: why doesnt li1.offsetHeight work?
}
	
function prepare(){
	var hours = { hours:1, days: 24, weeks: 24*7, months: 24*7*30, years: 24*7*30*12 }; //each unit in hours (as they appear in the page)
	var cols = { hours:green, days:yellow, weeks:red };                                 //what unit gets what color?
	var ageRegex = /^(\d+?) (.+?) ago$/;                                                 

	var snapshot = document.evaluate("./li[@id='list-hover-parent']", parent, null, 6, null);
	var len = snapshot.snapshotLength;
	if(!(len>0)){ alert("no subscriptions found"); return; }

	items = new Array(len);
	for(var i=0; i<len; ++i){
		//collect
		var li1 = snapshot.snapshotItem(i);    //li.b.(a[show]-span.a[unsubscribe]) 
		var li2 = li1.nextSibling;             //li.a.span[age]
		var age = li2.children[0].children[0]; //li.a.span
		//analyze
		var res = ageRegex.exec(age.innerHTML);
		if(!res){ alert("unrecognized age: "+li2.outerHTML); continue; }
		var newSpan = document.createElement("span");
		var number = res[1];
		var unit = res[2];
		newSpan.age = number*hours[unit];
		newSpan.show = li1.children[0].children[0].innerHTML; //li.b.a.linktext
		newSpan.orig = i;
		//remove from dom
		items[i] = newSpan;
		newSpan.appendChild(parent.removeChild(li1)); 
		newSpan.appendChild(parent.removeChild(li2));
		//transform "offline"
		transformLi1(li1);
		var col = cols[unit]; if(col){ age.style.background = col; }  //transform li2
	}
	createMenu();
	append();	
}
	

prepare();
sorters.age();








})();