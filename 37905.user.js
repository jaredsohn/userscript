// sub2menu user script
// version 0.3 BETA!
// 28-12-2008
// ==UserScript==
// @name          	sub2menu
// @description  	Removes the subreddit bar from the reddit page and relocates the subscribed subreddit list to the tabmenu
//@description	also relocates the reddit alien image and title/username out of the tabmenus' way.
// @include       	http://www.reddit.com/*
// @include       	http://*.reddit.com/*
// @include 	http://reddit.com/*
// ==/UserScript==

var srheader, headerleft, node, headerimg, div, span;

srheader = document.getElementById("sr-header-area");

if(srheader)
{
	srheader = srheader.parentNode.removeChild(srheader);
	srheader.childNodes[0].className = "dropdown tabdrop";
	
	//A source code new line is also seen as a node in Firefox so to find the right childNode ( thanks to jerone @ userscripts.org for this)
	node = srheader.childNodes[1];  
	while(node.nodeType==3 || !/\S/.test(node.nodeValue))
	{
		node=node.nextSibling;
	}
	node.className = "drop-choices tabdrop";
	
	headerleft = document.getElementById("header-bottom-left");
	headerleft.appendChild(srheader.childNodes[0]);
	headerleft.appendChild(node);
	
	
	//Relocate the reddit alien image and title/username
	//This done because the title/username is of variable length and it pushes the tabmenu to the right
	// which sometimes means that the myreddits tab is not visible.
	headerimg = document.getElementById("header-img-a");
	div = document.createElement("div");
	headerleft.replaceChild(div,headerimg);
	div.appendChild(headerimg);
		
	span = document.getElementsByClassName("pagename")[0];
	if(span) 
	{
		div.appendChild(span);
		div.style.marginBottom = "2px";
	}else
	{
		div.style.marginBottom = "5px";
	}
	
	//add rewritten reddit function open_menu to make sure it only opens the next and not all the siblings
	var head=null, script=null;
	head = document.getElementsByTagName('head')[0];
	script = document.createElement('script');
	script.type = "text/javascript";
	script.innerHTML = 'function open_menu(menu){$(menu).next().not(".inuse").css("top",menu.offsetHeight+"px").each(function(){$(this).css("left",$(menu).offset().left+"px").css("top",($(menu).height()+$(menu).offset().top)+"px");}).addClass("active inuse");};';
	head.appendChild(script);
}
