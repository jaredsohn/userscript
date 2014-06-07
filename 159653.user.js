// ==UserScript==
// @name 微博收藏
// @namespace Ashitaka
// @description 让收藏的微博不再被“删除”
// @include http://weibo.com*
// @include http://www.weibo.com*
// @version 0.2
// ==/UserScript==



function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addanime(){
	css="@-webkit-keyframes NodeInserted {\
from {}\
}\
\
@keyframes NodeInserted {\
from {\
clip: rect(0px, auto, auto, auto);\
}\
to {\
clip: rect(0px, auto, auto, auto);\
}\
}\
\
li {\
-webkit-animation-duration: .001s;\
animation-duration: .001s;\
-webkit-animation-name: NodeInserted;\
animation-name: NodeInserted;\
}";

	style=document.createElement("style");
	style.type="text/css";
	style.innerHTML=css;
	//head.appendChild(style);
	document.getElementsByTagName('head')[0].appendChild(style);
}

function myinfo() {
	my=xpath("//a[@class='gn_name']");
	for (i=0;i<my.snapshotLength;i++) {
		curr=my.snapshotItem(i);
		title=curr.getAttribute('title');
		addr=curr.getAttribute('href');
	}
	return title;
}
function myid(){
	m=xpath("//a[@class='gn_name']");
	
		curr=m.snapshotItem(0);
		temp=curr.getAttribute('href');
	
	id=temp.split("/");
	
	return id[1];	
}
function mymark(aa)
{
	str=aa.parentNode.childNodes[1].getAttribute('action-data');
	pos=str.lastIndexOf("=");
	mid=str.substr(pos+1);
	who=myinfo();
	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://weibomark.duapp.com/elitemark.php?mid='+mid+'&who='+who,
	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
	onload: function(responseDetails) {
		if (responseDetails.responseText=="succ") 
		{
			aa.innerHTML="已收藏";
			
		}
	}
	});
}
function addmark(idtemp,chandle)
{
	newElement=null;
	newElement=document.createElement('a');
	newElement.innerHTML="收藏助手";
	newElement.href="javascript:void(0);"
	newElement.setAttribute("data",idtemp);
	newElement.setAttribute("action-type","elitemark");
	newElement.onclick=function(){ mymark(this);}
	chandle.parentNode.insertBefore(newElement,chandle)

	separator=document.createElement('i');
	separator.setAttribute("class","S_txt3");
	

	separator.innerHTML="|";
	chandle.parentNode.insertBefore(separator,chandle);
}
function gethandle() {
	allhandle=xpath("//a[@action-type='feed_list_comment']")
	for (i=0;i<allhandle.snapshotLength;i++){
		thishandle=allhandle.snapshotItem(i);
		dd=thishandle.getAttribute('action-data');
		wid=myid();
		
		isadded=thishandle.parentNode.childNodes[10].getAttribute('action-type');
		if (dd.indexOf(wid)>=0) continue;
		if (isadded=="elitemark") continue;
		idtemp=thishandle.getAttribute('action-data')
		addmark(idtemp,thishandle);
	}
	
	
}

addanime();
window.addEventListener(
	'load', 
	function() { 
		gethandle();
		var nodeInserted = function( event ) {
			if ( 'NodeInserted' === event.animationName ) {
				gethandle();
			}
		}
		document.addEventListener( 'webkitAnimationStart', nodeInserted, false )
		document.addEventListener( 'animationstart', nodeInserted, false )
	},
	true);


		
		