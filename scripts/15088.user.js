// ==UserScript==
// @name           Visordown
// @namespace      http://www.visordown.com/forum/
// @description    This script customises the visordown foums to how it should be
// @include        http://www.visordown.com/forum/*
// ==/UserScript==

removeElement('podsLeft');
removeElement('banner');
removeElement('nav');
removeElement('searchbar');
removeElement('footer');

//Get the logout link, then remove the subnav bar
var logoutlink = getElementsByClassName(document.getElementById('subnav') , 'a', 'titlecontrol');
removeElement('subnav');


//Delete two subscriber only content, by getting the inner history bar div and deleting the right links
var historybar = document.getElementById('historybar');
historybar.childNodes[0].removeChild(historybar.childNodes[0].childNodes[1]);

//Delete the fuckoff red bar telling me I am in a forum.... when i already know
var forumbar = getElementsByClassName(document.getElementById("maincontentcell"), "table", "contentTabs");
if (forumbar) forumbar[0].parentNode.removeChild(forumbar[0]);


//Add shortcut links to the header
if(logoutlink != ''){
var logo = document.getElementById('logo');
var navDiv = document.createElement('div');
navDiv.innerHTML = '<div id="userLinks"><a href="' + logoutlink + '">[Log Out]</a>&nbsp;&nbsp;<a href="/members/AllMyPages.asp?sp=%22&v=2">[User CP]</a>&nbsp;&nbsp;<a href="/community/inbox.aspx?sp=%22&v=2">[Private Messages]</a></div>';
addGlobalStyle('#userLinks, #userLinks a:link, #userLinks a:visited {color: #fff; font-size:1.2em;} #userLinks{position: absolute; left: 335px; top: 15px; }');
logo.parentNode.insertBefore(navDiv, logo.nextSibling);
}


addGlobalStyle('#logo img {margin: 10px 0 0 25px;} body{background-image: none;} #header{background-repeat: repeat-x; height: 55px;} #historybar .left {text-align: left; float: none; padding: 5px 0 5px 15px;} #historybar{height: auto;} td#maincontentcell div{ margin: 0 10px;} .dividertitle, .topiclisttitle{ font-size:1.2em;} #container table { width: 100%; } .topicrowlight img {height: 16px;} .threadrowfolder img, .threadrowfolderlight img {height: 16px;} ');


function removeElement(id){
	var element = document.getElementById(id);
	if(element) element.parentNode.removeChild(element);
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

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}