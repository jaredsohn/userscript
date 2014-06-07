// ==UserScript==
// @name					 Better	Profile	Link
// @namespace			 pendevin
// @description		 turns the profile link	into a drop-down menu	of multiple	locations.
// @include				 http://boards.endoftheinter.net/*
// @include				 http://links.endoftheinter.net/*
// @include				 http://endoftheinter.net/*
// @include				 https://boards.endoftheinter.net/*
// @include				 https://links.endoftheinter.net/*
// @include				 https://endoftheinter.net/*
// @include				 http://archives.endoftheinter.net/*
// @include				 https://archives.endoftheinter.net/*
// ==/UserScript==

function readCookie(name)
{
	var	nameEQ = name	+	"=";
	var	ca = document.cookie.split(';');
	for(var	k=0;k	<	ca.length;k++)
	{
		var	c	=	ca[k];
		if	(c.indexOf(" ")==0)
		{
			c	=	c.substring(1);
		}
		if (c.indexOf(nameEQ)==0)
		{
			return c.substring(nameEQ.length,c.length);
		}
	}
	return null;
}

function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

//returns a new element with (tag, id(optional), classname(optional), innerHTML(optional))
//if you want any other attributes, add arrays to the end of the arguments with [attribute,value]
//this might be cooler using JSON, but i could be wrong---probably
//for the attributes, use the html versions not the dom versions
function addElm(tag,id,className,innerHTML){
	var newElm=document.createElement(tag);
	if(id!=undefined&&id!=null)newElm.id=id;
	if(className!=undefined&&className!=null)newElm.className=className;
	if(innerHTML!=undefined&&innerHTML!=null)typeof innerHTML=="string"?newElm.innerHTML=innerHTML:newElm.appendChild(innerHTML);
	for(var i=4;i<arguments.length;i++)newElm.setAttribute(arguments[i][0],arguments[i][1]);
	return newElm;
}

function menu(link)
{
	var span;
	var menu={
		link:link.parentNode.removeChild(link),
		box:function(){
			span=addElm("span","profile_menu_box");
			span.appendChild(link);
			span.appendChild(addElm("ul","profile_menu"));
			document.getElementsByClassName("userbar")[0].insertBefore(span,document.getElementsByClassName("userbar")[0].firstChild);
		},
		items:[
			{name:"Edit My Profile",href:"editprofile.php"},
			{name:"Edit My Site Display Options",href:"editdisplay.php"},
			{name:"View My Posted Messages",href:"history.php"},
			{name:"View	Links	I\'ve Added",href:"links.php?mode=user&userid="+readCookie("userid")},
			{name:"View My LUELink Comment History",href:"links.php?mode=comments"},
			{name:"View	My Available Tokens",href:"mytokens.php?user="+readCookie("userid")},
			{name:"View	My Stats",href:"loser.php?user="+readCookie("userid")},
			{name:"Enter The Token Shop",href:"shop.php"},
			{name:"View My Tagged Topics",href:"showfavorites.php"},
			{name:"Check My Private Messages",href:"priv.php"},
			{name:"View My Wiki Community Page",href:"//wiki.endoftheinter.net/index.php/"+link.innerHTML.substring(0,link.innerHTML.indexOf(" (")).replace(/	/g,"_")},
			{name:"View My Wiki User Page",href:"//wiki.endoftheinter.net/index.php/User:"+link.innerHTML.substring(0,link.innerHTML.indexOf(" (")).replace(/ /g,"_")},
			{name:"View My Imagemap",href:"imagemap.php"}
		]
	};
	if(readCookie("slickvars")!=null)menu.items[menu.items.length]={name:"Edit My Slick Settings",href:"editprofile.php?slick=settings"};
	menu.box();
	for(var i in menu.items)span.lastChild.appendChild(addElm("li","menu"+i,"profile_menu_item","<a class='menu_link' href='"+menu.items[i].href+"'>"+menu.items[i].name+"</a>"));

	window.addEventListener("load",function(){buildMenu(span);},false);
	document.addEventListener("DOMNodeInserted",function(){menuPos(span);},false);

	//based on function found at http://www.dynamicdrive.com/style/csslibrary/item/suckertree-menu-horizontal/
	//menu is the multi-level menu object you want to appear/disappear
	function buildMenu(menu){
		var ultags=menu.getElementsByTagName("ul")
		for(var i in ultags){
			ultags[i].parentNode.addEventListener("mouseover",function(){this.getElementsByTagName("ul")[0].style.visibility="visible";},false);
			ultags[i].parentNode.addEventListener("mouseout",function(){this.getElementsByTagName("ul")[0].style.visibility="hidden";},false);
		}
	}

	//this belongs with the buildMenu function
	//if i ever add more menus to this or another script, i should incorporate them together
	function menuPos(menu){
		var ultags=menu.getElementsByTagName("ul")
		for(var i in ultags){
			//if this is a first level submenu dynamically position first level submenus to be height of main menu item
			if(ultags[i].parentNode==menu){
				ultags[i].style.top=ultags[i].parentNode.offsetTop+ultags[i].parentNode.offsetHeight-1+"px";
				ultags[i].style.left=ultags[i].parentNode.offsetLeft-4+"px";
			}
			//else if this is a sub level menu (ul) position menu to the right of menu item that activated it
			//i'll probably have to do something with the positioning for this if i ever use submenus
			else{
				ultags[i].style.left=ultags[i-1].getElementsByTagName("a")[0].offsetWidth+"px";
			}
		}
	}

	var css="\
			#profile_menu{visibility:hidden;text-align:left;font-size:11.5pt;position:absolute;font-weight:bold;background-color:"+getStyle(menubar,'background-color')+";list-style-type:none;padding:3px 5px;margin:0px;}\
			.profile_menu_item>a{opacity:.7;margin-bottom:3px;color:"+getStyle(menubar,'color')+"!important;text-decoration:none;}\
			.profile_menu_item:hover>a{opacity:1;cursor:pointer;text-decoration:underline;color:"+getStyle(menubar,'color')+"!important;}\
			.profile_menu_item{border-bottom:1px solid "+getStyle(userbar,'background-color')+";}\
			";
	GM_addStyle(css);

if(document.getElementsByClassName("userbar")[0])menu(document.getElementsByClassName("userbar")[0].getElementsByTagName("a")[0]);