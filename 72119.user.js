// ==UserScript==
// @name           otrkeyfinder.com Thumbnail Linker
// @namespace      http://userscripts.org/users/99643
// @include        http://www.otrkeyfinder.com
// @include        http://otrkeyfinder.com
// @include        http://www.otrkeyfinder.com/
// @include        http://otrkeyfinder.com/
// @include        http://www.otrkeyfinder.com/index.php?search=*
// @include        http://www.otrkeyfinder.com/?search=*
// @include        http://otrkeyfinder.com/index.php?search=*
// @include        http://otrkeyfinder.com/?search=*
// @version        0.5
// ==/UserScript==

var results = document.getElementsByClassName("searchResult");
for (var i = 0; i < results.length; i++) {
	var result = results[i];
	var name = result.title;
	name = name.substr(0,name.indexOf('_TVOON_DE.mpg.')+9);
	var myRegexp = /(\d\d\.\d\d\.\d\d)_/g;
	var match = myRegexp.exec(name);
	var date = match[1];
	GM_log(date+"\t"+name);
	var thumb1 = document.createElement("img");
	thumb1.src = "http://thumbs.onlinetvrecorder.com/"+date+"/"+name+"____3.jpg";
	thumb1.title = name;
	thumb1.alt = "Thumbnail";
	thumb1.style.position = "absolute";
	thumb1.style.right = "10px"; 
	thumb1.style.top = "7px";
	thumb1.style.borderWidth = "0px";
	thumb1.style.height = "55px";
	result.style.height = "67px";
	result.lastElementChild.style.height = "65px";
	result.lastElementChild.lastElementChild.style.height = "65px";
	result.lastElementChild.style.backgroundColor = "#BDCFEE";
	result.lastElementChild.lastElementChild.appendChild(thumb1);

	var thumb2 = document.createElement("img");
	thumb2.src = "http://thumbs.onlinetvrecorder.com/"+date+"/"+name+"____1.gif";
	thumb2.title = name;
	thumb2.alt = "Thumbnail";
	thumb2.style.float = "right";
	thumb2.style.position = "absolute";
	thumb2.style.right = "30px"; 

	result.nextElementSibling.firstElementChild.insertBefore(thumb2,result.nextElementSibling.firstElementChild.firstChild);
	result.nextElementSibling.firstElementChild.nextElementSibling.style.minHeight = "55px";
	
	var count = result.lastElementChild.lastElementChild.firstElementChild;
	var type = count.nextElementSibling.firstElementChild;
	
	count.className = count.className + " " + type.className;
	
}

//code from http://diveintogreasemonkey.org/patterns/add-css.html
var head, style;
head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = "a.cutlist, a.otrComments, a.before, a.after {margin-right:20px;padding-left:25px;}";
head.appendChild(style);


var pages = document.getElementsByClassName("pages");
if(pages.length > 0){
	var pagination = pages[0];
	var cloneNode = pagination.cloneNode(true);
	cloneNode.style.marginBottom = "0px";
	cloneNode.style.marginTop = "20px";
	pagination.parentNode.appendChild(cloneNode);
}
