// ==UserScript==
// @name          share2weibo
// @description   Web Content Sharing Enhancement suite for the t.qq.com
// @author        hiwanz princeb4d@gmail.com
// @version       1.0
// @history       1.0 test script
// ==/UserScript==
document.onmouseup = popText;
function $$id(id){
	return document.getElementById(id);
}

function popText(ev)
{	
	if(!$$id('weiboicon')){
		weiboicon=document.createElement('a');
		weiboicon.setAttribute('id','weiboicon');
		weiboicon.href='javascript:;';
		weiboicon.style.display='none';
		weiboicon.style.position='absolute';
		weiboimg=document.createElement('img');
		weiboimg.src='http://v.t.qq.com/share/images/s/weiboicon24.png';
		weiboimg.style.border='0 none';
		weiboicon.appendChild(weiboimg);
		document.body.appendChild(weiboicon);
	}
	var ev= ev || window.event; 
	var mousePos = mouseCoords(ev);
	var texts = getSelectionText();
	var weiboicon = $$id('weiboicon');
	if(texts){
		weiboicon.style.left=mousePos.x+10+'px';
		weiboicon.style.top=mousePos.y-20+'px';
		weiboicon.style.display='block';
		weiboicon.onclick=function(){
			postToWb({title:getSelectionText()});return false;
		}
	}else{
		weiboicon.style.display='none';
	}
}
function getSelectionText() { 
	if(window.getSelection) { 
		return window.getSelection().toString(); 
	} else if(document.selection.createRange) { 
		return document.selection.createRange().text; 
	} 
	return ''; 
} 
function postToWb(info){
	var _t = encodeURI(document.title);
	if(info.title){
		_t = encodeURI(info.title);
	}
	var _url = encodeURIComponent(document.location);
	var _appkey = encodeURI('9625c32c65ef42e49277d325e3858b87');//appkey
	var _pic = encodeURI('');//var _pic='url1|url2|url3....
	var _site = 'http://i.wanz.im';
	var _u = 'http://v.t.qq.com/share/share.php?url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic+'&title='+_t;
	window.open( _u,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
}
function mouseCoords(ev){ 
	if(ev.pageX || ev.pageY){ 
		return {x:ev.pageX, y:ev.pageY}; 
	}
	return { 
		x:ev.clientX +  document.documentElement.scrollLeft, 
		y:ev.clientY +  document.documentElement.scrollTop
	}; 
} 