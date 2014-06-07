// ==UserScript==
// @name           ETI Keyboard Shortcuts
// @namespace      pendevin
// @description    Gives you several keyboard shortcuts for navigation
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// @include        http://boards.endoftheinter.net/showtopics.php?*
// @include        https://boards.endoftheinter.net/showtopics.php?*
// @include        http://links.endoftheinter.net/links.php?*
// @include        https://links.endoftheinter.net/links.php?*
// @include        http://links.endoftheinter.net/linkme.php*
// @include        https://links.endoftheinter.net/linkme.php*
// @include        http://archives.endoftheinter.net/showmessages.php?*
// @include        https://archives.endoftheinter.net/showmessages.php?*
// @include        http://archives.endoftheinter.net/showtopics.php?*
// @include        https://archives.endoftheinter.net/showtopics.php?*
// ==/UserScript==

function simulateClick(element){
  var evt=document.createEvent("MouseEvents");
  evt.initMouseEvent("click",true,true,window,1,0,0,0,0,false,false,false,false,0,null);
	element.dispatchEvent(evt);
}

//i totally improved this one
//variables that aren't present return null
//a variable with no value returns the true
function getUrlVars(urlz){
	//thanks for the function citizenray
	var vars=[];
	var hash="";
	var hashes=urlz.slice(urlz.indexOf('?')+1).split('&');
	for(var i=0;i<hashes.length;i++){
		hash=hashes[i].split('=');
		if(hash[1]!=null&&hash[1].indexOf("#")>=0)hash[1]=hash[1].substring(0,hash[1].indexOf("#"));
		if(hash[1]==undefined){
			hash[1]=true;
			if(hash[0].indexOf("#")>=0)hash[0]=hash[0].substring(0,hash[0].indexOf("#"));
		}
		vars.push(hash[0]);
		vars[hash[0]]=hash[1];
	}
	return vars;
}
var get=getUrlVars(window.location.href);

function prevPage(){
	var spot=document.getElementById("u0_2").getElementsByTagName("span")[0];
	var page=spot.previousSibling.textContent.match(/Page (\d+) of /)[1];
	if(page!=null&&page!="1")
		window.location=spot.previousElementSibling.href;
}

function nextPage(){
	if(document.getElementById("u0_3").lastChild.nodeName!="#text")
		window.location=get["page"]?window.location.href.replace(/page=\d+/,"page="+(parseInt(get["page"])+1)):window.location.href+"&page=2";
}

function firstPage(){
	var spot=document.getElementById("u0_2");
	var page=spot.getElementsByTagName("span")[0].previousSibling.textContent.match(/Page (\d+) of /)[1];
	if(page!=null&&page!="1")
		window.location=spot.firstChild.href;
}

function lastPage(){
	var spot=document.getElementById("u0_3").lastChild;
	if(spot.nodeName!="#text")
		window.location=spot.href;
}

function quote(){
	var as=document.getElementsByTagName("a");
	var quote=null;
	for(var i=0;i<as.length;i++)
		if(as[i].href.search(/\/postmsg\.php\?/)
		!=-1&&as[i].href.search(/quote=\d+/)!=-1)quote=as[i];
	simulateClick(quote);
}

function keyPress(e){
	if(e.ctrlKey&&e.keyCode==37)prevPage();
	else if(e.ctrlKey&&e.keyCode==39)nextPage();
	else if(e.ctrlKey&&e.keyCode==38)firstPage();
	else if(e.ctrlKey&&e.keyCode==40)lastPage();
	else if(e.altKey&&e.which==96)quote();
}

document.addEventListener('keypress',keyPress,true);