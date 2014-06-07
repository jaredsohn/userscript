// ==UserScript==
// @name        Scout.com Cleaner
// @namespace   http://userscripts.org/users/89142
// @description An attempt at keeping the site looking good
// @include     http://*.scout.com/*
// @updateURL   http://userscripts.org/scripts/source/156454.meta.js
// @downloadURL	https://userscripts.org/scripts/source/156454.user.js
// @version     1.4
// ==/UserScript==

// Version History:
// 1.0 - initial release
// 1.1 - minor styling fix
// 1.2 - remove iFrame ad
// 1.3 - added login links to top
// 1.4 - fixed problem in Chrome

var userMenu = document.getElementById('user-menu');
var headerMenu = document.getElementById('header-menu');
if(headerMenu != null && userMenu != null){ 
	var innerHeaderMenu = headerMenu.getElementsByTagName("div")[0];
	var innerHeaderMenuList = innerHeaderMenu.childNodes[1];
	var userMenuList = userMenu.getElementsByTagName("ul")[0];
	
	innerHeaderMenu.insertBefore(document.createElement("div"),innerHeaderMenuList);
	
	for(i=0; i<userMenuList.childNodes.length;i++){
		innerHeaderMenuList.appendChild(userMenuList.childNodes[i]);
		i--;
	}
	
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/* Changes the style elements for the tags */
addGlobalStyle(
	// header styles
	'#msn-header{display:none;}' + 
	'#header-top #header-top-menu{display:none;}' + 
	'#header-main-network .right .ad{display:none;}' +
	'#header-menu ul li a {padding:0 8px;}' +
	// footer styles
	'#footer .scout{display:none;}' + 
	// homepage
	'#wrapper1 #rightbar{display:none;}' + 
	'#wrapper1 #p1leftbar{display:none;}' + 
	'#wrapper1 #promoarea{display:none;}' + 
	'#wrapper1 #topleft{float:left; width:71em; padding-left:1em;}' + 
	'#wrapper1 #topleft #mainstory{ width: 40em; padding-bottom:1em; }' + 
	'#wrapper1 #topleft #adstrip {display:none;}' + 
	'#wrapper1 #topleft #teamnews, .teamnewscontents{ float: right;width:30em;}' +
	'#wrapper1 #topleft #stories{width: 42em;}' + 
	'#wrapper1 #topleft #stories .story{width: 12em; padding-right:1em;}' + 
	'#wrapper1 #topleft #forums{ float:right; width:30em;}' + 
	'#wrapper1 #topleft #forums li{width:29em;}' + 
	'#wrapper1 #modules{float:left; width:98%; padding-left:1em;}'+
	'#module1, #module2, #module3 {width:100%;}'+
	'#modules .belowfoldnewsmodule{width:35em;margin:0 1em 1em 0;}'+
	'#modules #recruiting .teamcommits{width:35em;}' +
	// story styles
	'#rightInfobox{display:none;}' + 
	'#p2rightbar{display:none;}' + 
	'#featureStory{margin:0 auto; float:none; width:80%; font-size:1.3em;}' +
	'#featureStory #p2maincontent{border:0px;}' +
	// player stats
	'#blipPlayerStats{width:98%}' + 
	'#blipPlayerStats #da728x90{display:none;}' + 
	// forum
	'#wrapper #promos{display:none;}' +
	'.messagebody blockquote {margin:5px 10px;}' +
	'.messagebody img {max-width:95%;}' +
	'#forumheader{margin-left:5px; margin-top:17px;}' +
	'#wrapper #announce{display:none;}' +
	// photo album
	'#pgMacro0 {width:750px;background:#000;}' +
	'#pgMacro0 .pgThumbHolder {width:660px;}' +
	'#pgMacro0 .pgThumbbanner {height:150px;}' +
	'#pgMacro0 .pgBottomcorners{background:#000;}' +
	''
);

function getElementsByClassName(classname, par) {
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
	var els = par.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) {       
		if(re.test(els[i].className)) {	
			a.push(els[i]);
		}
	}
    	return a;
};

var members = getElementsByClassName("forumtitle",document);
if (members.length > 0){
	firstRow = members[0].parentNode;
	newRow = document.createElement("tr");
	showCell = newRow.insertCell(0);
	showCell.setAttribute("colspan",6);
	showCell.addEventListener("click",
		function () {
			for(var i=0; i< members.length; i++){
				row = members[i].parentNode;
				row.style.display = '';
			}
			newRow.style.display = 'none';
		},
		false);
	
	pinCount = 0;
	for(var i=0; i< members.length && i<40; i++){
		if (members[i].innerHTML.indexOf('pin.gif') > 0){
			pinCount++;
			row = members[i].parentNode;
			row.style.display = 'none';
			//row.parentNode.removeChild(row);
			//alert("removed: "+members[i].innerHTML);
		}
	}
	if(pinCount > 0){
		showCell.innerHTML = "<a href='javascript:void(0)' >Show "+pinCount+" Pinned Items</a>";
		firstRow.parentNode.insertBefore(newRow,firstRow);
	}
}
