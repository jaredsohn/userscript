// ==UserScript==
// @name MooTales
// @description Changes the theme of vutales.com.
// @match http://*.vutales.vuii.co.uk/*
// @match http://*.vutales.com/*
// ==/UserScript==
function Get(Element) { 
	var object = (arguments.length > 1)? arguments[1]:document;
	switch(Element.charAt(0)) {
		case '#': 
		return object.getElementById(Element.substr(1));
		break;
	case '.':
		return object.getElementsByClassName(Element.substr(1));
		break;
	default:
		return object.getElementsByTagName(Element);  
	} 
}
//define some variables to make *my* life easier
var username,body, logo, logotext, logotext_a,navbar,navwrap,menu,menuitems,maintitle,likewraps,likecounts,lcountlikes,htwos,readables;
username = Get('.RegLog')[0].innerHTML.replace(/Welcome, /,""); //we'll use it later
//references to html elements
body = Get("body")[0];
logo = Get(".Logo")[0];
logotext = Get(".logoText")[0];
logotext_a = Get("a",logotext)[0];
navbar = Get(".navbar")[0];
navwrap = Get(".navWrap")[0];
menu = Get(".menu")[0];
menuitems = Get(".MenuItem",Get("ul")[0]);
maintitle = Get(".mainTitle")[0];
likewraps = Get(".lWrap");
likecounts = Get(".lCount");
lcountlikes = Get(".lCountLikes");
htwos = Get("h2");
readables = Get(".readable");
//Changes to body element
body.style.background="white";
body.style.width = "1000px";
body.style.marginLeft = "auto";
body.style.marginRight = "auto";
body.style.overflow = "hidden";
//Changes to logo
logo.style.background="none";
logo.style.height="50px"; //ovewrite the height value
logo.style.paddingBottom="10px";
logo.style.borderBottom = "#d7d7d7 solid 12px";
logotext.style.minHeight = "50px"; //then set the minimum
logotext.style.textIndent = "0em";
logotext_a.style.width="300px";
logotext_a.style.zIndex="2";
logotext_a.style.color = "black";
logotext_a.style.fontFamily = "Delicious";
logotext_a.style.fontWeight = "bold";
logotext_a.style.fontSize = "5em";
logotext_a.style.lineHeight="50px";
//menu
Get('ul')[0].removeChild(Get('.MenuItem')[0]) // this was just bothering me
Get('ul')[0].removeChild(Get('.MenuItem')[4]) // come on, no one reads the qotw

navwrap.removeChild(Get('.RegLog')[0]); // no room for hospitality here
navbar.style.background="none";
navbar.style.maxWidth="600px";
navbar.style.textAlign="right";
navbar.style.float="right";
navbar.style.marginTop="10px";
navbar.style.marginLeft="400px";
navbar.style.marginRight="0px";
navwrap.style.width="600px";
//create new menuitem, 'front page'
var frontpage = document.createElement("li");
frontpage.setAttribute("class","MenuItem");
var frontpage_menuitem = document.createElement("a");
frontpage_menuitem.href="/";
frontpage_menuitem.innerHTML="front page";
frontpage.appendChild(frontpage_menuitem);
Get('ul')[0].insertBefore(frontpage,menuitems[0]);
//somehow for(item in menuitems) didn't work for me. I'll just use a normal for loop instead:
for (i=0;i<menuitems.length;i++) {
	
	Item = Get('a',menuitems[i])[0];
	Item.style.color="#858585";
	Item.style.fontFamily="Delicious";
	Item.style.fontSize="1.5em";
	Item.style.fontWeight="bold";
	Span = Get('span',Item)[0];
	if(typeof Span != "undefined") {
		Span.style.color = "#006699";
	}
	Item.innerHTML = Item.innerHTML.toLowerCase();
	//put some background on the 
	var pathname = window.location.pathname;
	if(
		(pathname.indexOf("/forum") == 0 && i==1) ||
		(pathname.indexOf("/user/"+username) == 0 && i==2) ||
		(pathname.indexOf("/dashboard") == 0 && i==3) ||
		(pathname.indexOf("/mail") == 0 && i==4) ||
		(pathname.indexOf("/help") == 0 && i==5) ||
		(pathname == '/' && i==0)){
		Item.style.background="#34aaee";
		Item.style.padding="5px";
		Item.style.color="white";
	}
}

//main title
maintitle.style.color="#6f6f6f";
maintitle.style.textAlign="center";
maintitle.style.borderBottom="none";
maintitle.style.fontFamily="Delicious"; // http://i.imgur.com/I7Hox.jpg
maintitle.style.fontWeight="bold";
maintitle.style.fontSize="1.5em";
maintitle.innerHTML=(document.location.pathname != "/")? maintitle.innerHTML:"Featured blogs"; //seriously bryan, you wrote 'VuTales' three times in the front page and I'm not even halfway down the page.

//likes
for (i=0;i<likewraps.length;i++) {
	//In theory, likewraps.length = likecounts.length =lcountlikes
	Item = likewraps[i];
	Item.style.width="40px";
	Item.style.background="none";
	Item.style.border="none";
	Item.style.marginTop="30px";
	lCount = Get('div',likecounts[i])[0];
	lCount.style.fontFamily="Arial";
	lCount.style.fontWeight="bold";
	
	lCount.style.fontSize=(parseInt(lCount.innerHTML)>9)? "1.8em":"3em";
	lcountlikes[i].style.fontWeight="normal";
	lcountlikes[i].style.position="relative";
	lcountlikes[i].style.top="-10px";
}
//titles
for (z=0;z<htwos.length;z++) {
	if(pathname.indexOf("/dashboard") == 0) { continue; } //this loop would mess up the dashboard
	title=Get('a',htwos[z])[0];
	if(typeof title == 'undefined') {
		continue;
	}
	title.style.marginLeft="-40px";
	title.style.color="#ff7474";
}
for (x=0;x<readables.length;x++) {
	readables[x].style.background="#eeeeee";
	readables[x].style.padding="5px";
	readables[x].style.maxWidth="594px";
	readables[x].style.borderLeft="#dadada 1px solid";
	readables[x].style.color="#4d4d4d";
}
