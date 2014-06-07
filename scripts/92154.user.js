// ==UserScript==
// @name           Userscripts.org quick admin
// @namespace      meh
// @description    mouseover admin link to show admin menu
// @include        http://userscripts.org/*
// ==/UserScript==



try{
	var admlink = xp('.//descendant::a[@class="admin" and starts-with(@href,"/scripts/admin/")]', getId('script-nav'))[0];
	admlink.addEventListener('mouseover', showMenu, false);
}catch(e){
}


function showMenu(evt){
	if(getId('divQuickAdmin'))
		return;
	var id = evt.target.href.match(/(\d+)$/)[1];
	var pos = findPos(evt.target);
	document.body.appendChild(createElement('div',{id:'divQuickAdmin', style:'position:absolute; left:'+pos[0]+'px; top:'+(pos[1]+25)+'px; z-index:9999999; background-color:#eeeeee; padding:7px;'},null,'<a title="Name, Description, Summary, ..." href="/scripts/edit/'+id+'">Edit Metadata</a> <br> <a href="/scripts/edit_src/'+id+'">Edit Code Online</a> <br> <a href="/scripts/upload/'+id+'">Upload New Version</a> <br> <a href="/scripts/images/'+id+'">Screenshots &amp; Icon</a>'));
	getId('divQuickAdmin').addEventListener('mouseover', hideMenu, false);
}


function hideMenu(evt){
	if(evt.target.getAttribute('id') && evt.target.getAttribute('id')=='divQuickAdmin'){
		getId('divQuickAdmin').removeEventListener('mouseover', hideMenu, false);
		document.addEventListener('mouseover', hideMenu, false);
		return;
	}
	if(isAncestor(evt.target, getId('divQuickAdmin')) || evt.target.getAttribute('class')=='admin')
		return;
	removeElement(getId('divQuickAdmin'));
	document.removeEventListener('mouseover', hideMenu, false);
}



function isAncestor(x, anc)
{		
	while(x.nodeName!='HTML' && x.parentNode!=anc){
		x = x.parentNode;
	}
	
	if(x.parentNode==anc)
		return true;
	else
		return false;
}


function findPos(obj){
	var curleft = curtop = 0;
	if (obj.offsetParent){
		do{
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}


function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) 
		node.innerHTML = html;
	
	return node;
}

function removeElement(el){
	try{
		el.parentNode.removeChild(el);
	}catch(e){
	}
}

function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getTag(name, parent){
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}

function xp(p, context, doc) {
  if (!context) 
	context = document;
  if (!doc) 
	doc = document;	
  var i, arr = [], xpr = doc.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) 
	arr.push(item);
  return arr;
}

function debug(str)
{
	
	var d = document.getElementById('debugg');
	if(!d){
		var div = document.createElement('div');
		div.setAttribute('id','divdebug');
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px; width:50%; z-index:999999999;');
		
		var closeButton = document.createElement('input');
		closeButton.setAttribute('id','closedebug');
		closeButton.setAttribute('type', 'button');
		closeButton.setAttribute('value', 'close');
		closeButton.setAttribute('onClick', 'this.parentNode.parentNode.removeChild(this.parentNode);');
		
		d = document.createElement('textarea');
		d.setAttribute('id','debugg');
		d.setAttribute('style',"height:150px; width:99%; margin:2px;");
		
		div.appendChild(d);
		div.appendChild(document.createElement('br'));
		div.appendChild(closeButton);
		document.body.appendChild(div);
	}
	d.innerHTML += '\n'+str;
	d.scrollTop = d.scrollHeight;
}
