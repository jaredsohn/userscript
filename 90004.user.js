// ==UserScript==
// @name           Subreddits re-order 
// @namespace      meh
// @description    Re-order subreddits by the ones you visit the most.
// @include        http://www.reddit.com/*
// ==/UserScript==
var subr, count;
var ul, ignoreList, showCount, sec;




//----------- Options -----------//
showCount = false;
ignoreList = ['gonewild','nsfw','funny','politics','science','WTF','programming','atheism','technology','worldnews'];
//...............................//




//count visit?
if( window.location.href.search(/^http:\/\/www\.reddit\.com\/r\/[^\/]+\/$/) > -1 )
{
	subr = getSubredditName(window.location.href);
	
	GM_registerMenuCommand('/r/'+subr+': erase counter', eraseCounter);
	
	//ignore ?
	if(!ignored(subr))
	{	
		//count visit
		count = getValueForId(subr,'count');
		if(isNaN(count)){
			count = 1; //first visit
		}else{
			count++;
		}
		setValueForId(subr,count,'count');
		//debug(subr+': '+count);
	}
	else 
	{
		try{
			removeById(subr,'count');
		}catch(e){}
		//debug('ignoring '+subr);
	}
}




sec=10;
waitHeader();
function waitHeader()
{
	if(getId('sr-header-area'))
	{
		ul = getTag('ul', getId('sr-header-area'));
		reorder(ul[1]); // reorder frontpage subr
		reorder(ul[2]); // reorder others subr
	}
	else
	{
		if(sec>0)
		{
			setTimeout(function(){waitHeader();}, 1000);	
			sec--;
		}
	}
}


function eraseCounter(e)
{
	var subr = getSubredditName(window.location.href);
	removeById(subr,'count');
}


function reorder(ul)
{
	var subr = subr2 = count = count2 = null;
	var lis = ul.getElementsByTagName('li');
	var i, j;
	
	for(i=0; i<lis.length-1; i++)
	{
		for(j=i+1; j<lis.length; j++)
		{
			subr = getSubredditName(lis[i].innerHTML);
			subr2 = getSubredditName(lis[j].innerHTML);
			count = parseInt(getValueForId(subr,'count'));
			count2 = parseInt(getValueForId(subr2,'count'));
			if(!count) 
				count = 0;
			if(!count2) 
				count2 = 0;
			
			//move
			if(count2 > count)
			{ 
				lis[i].parentNode.insertBefore(lis[j], lis[i]);
				
				//move separator
				if(i==0 && getTag('span',lis[i]))
				{
					//debug('separator moved');
					lis[i].nextSibling.insertBefore(getTag('span',lis[i])[0], lis[i].nextSibling.firstChild);
				}
			}
		}
		
		if(showCount)
			lis[i].getElementsByTagName('a')[0].innerHTML += '('+count+')';
	}
	if(showCount && lis[j-1])
		lis[j-1].getElementsByTagName('a')[0].innerHTML += '('+count2+')';
}



function getSubredditName(html)
{
	return html.match(/http:\/\/www\.reddit\.com\/r\/([^\/]+)\/?/)[1];
}



function ignored(sr)
{
	for(var i=0; i<ignoreList.length; i++)
	{
		if(ignoreList[i]==sr)
			return true;
	}
	return false;
}
















//values stored in format "id=value;..."
function getValueForId(id, gmkey)
{
	var info = GM_getValue(gmkey);
	if(!info || !id)
		return null;
	
	info = info.split(';');
	for(var i=0; i<info.length; i++)
	{
		if(info[i].split('=')[0]==id){
			return info[i].split('=')[1];
		}
	}
	
	return null;
}
function setValueForId(id, value, gmkey)
{
	var info = GM_getValue(gmkey);
	var i;	

	if(!id)
		return null;
	
	if(!info){
		GM_setValue(gmkey, id+"="+value);
		return;
	}
	
	info = info.split(';');
	for(i=0; i<info.length; i++)
	{
		if(info[i].split('=')[0]==id){
			info.splice(i,1,id+"="+value);
			GM_setValue(gmkey, info.join(';'));			
			return;
		}
	}
	
	info.splice(i,0,id+"="+value);
	GM_setValue(gmkey, info.join(';'));
	
}
function removeById(id, gmkey)
{
	if(!id || !gmkey)
		return null;
	var info = GM_getValue(gmkey).split(';');
	for(var i=0; i<info.length; i++)
	{
		if(info[i].split('=')[0]==id){
			info.splice(i,1);
			GM_setValue(gmkey,info.join(';'));
			return;
		}
	}
}


function xpathArray(p, context) {
  if (!context) 
	context = document;
  var i, arr = [], xpr = xpath(p, context);
  for (i = 0; item = xpr.snapshotItem(i); i++) 
	arr.push(item);
  return arr;
}

function xpath(p, context) {
  if (!context) 
	context = document;
  return document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
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


function debug(str)
{
	
	var d = document.getElementById('debugg');
	if(!d){
		var div = document.createElement('div');
		div.setAttribute('id','divdebug');
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px; width:50%; z-index:9999;');
		
		var closeButton = document.createElement('input');
		closeButton.setAttribute('id','closedebug');
		closeButton.setAttribute('type', 'button');
		closeButton.setAttribute('value', 'close');
		closeButton.setAttribute('onClick', 'this.parentNode.parentNode.removeChild(this.parentNode);');
		
		d = document.createElement('textarea');
		d.setAttribute('id','debugg');
		d.setAttribute('style',"height:200px; width:99%; margin:2px;");
		
		div.appendChild(d);
		div.appendChild(document.createElement('br'));
		div.appendChild(closeButton);
		document.body.appendChild(div);
	}
	d.innerHTML += '\n'+str;
	d.scrollTop = d.scrollHeight;
}