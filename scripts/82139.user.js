// ==UserScript==
// @name           Resize and Scroll "Message Sneak Peek" Gmail Labs
// @namespace      vidzbigger.com
// @description    Enlarges Gmail Previews provided by Gmail Labs "Message Sneak Peek" feature
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// ==/UserScript==

String.prototype.CSStoInteger=function(){
	return this.replace('px','')-0;
}

function getOffset( el ){
    var _x=0,_y=0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    		_x+=el.offsetLeft;
    		_y+=el.offsetTop;
        el=el.offsetParent;
    }return { y: _y, x: _x };
}
function getScroll(){
    if(document.all){
        return {x:document.body.scrollLeft,y:document.body.scrollTop};
    }else{
        return {x:window.pageXOffset,y:window.pageYOffset};
    }
}
function sizeSet(){
	elm = document.getElementsByClassName('yp')[0]
	elm.style.width=(elm.clientWidth+24)+'px';
	document.getElementsByClassName('yo')[0].style.width='auto';
}
function ssr(){
	sizeSet();
	sizenode=elm
}
function ssm(){
	movenode=document.getElementsByClassName('yo')[0]
}
function resetScroll(){
	document.getElementsByClassName('yp')[0].scrollTop=0;
}
function chk(){
	if(ismoving)return;
	window.setTimeout(function(){
		el=document.getElementsByClassName('yp');
		if(el.length> 0) el=el[0];
		else return;
		
		
		resz = document.getElementsByClassName('resize')
		
		if(!resz.length){
			btns = document.getElementsByClassName('yx')[0];
			
			rszh=document.createElement('div');
			rszh.setAttribute('style','float:right;');
			btns.appendChild(rszh);
			
			rsz=document.createElement('a');
			rsz.className='move';
			//rsz.setAttribute('href','javascript:void(0);');
			rsz.setAttribute('style','-webkit-user-select: none;-moz-user-select: none;cursor:move;');
			rsz.appendChild(document.createTextNode(' move'))
			btns.appendChild(rsz);
			rsz.addEventListener('mousedown',ssm,false);
			
			
			rsz=document.createElement('a');
			rsz.className='resize';
			//rsz.setAttribute('href','javascript:void(0);');
			rsz.setAttribute('style','-webkit-user-select: none;-moz-user-select: none;cursor:se-resize;');
			//position:relative;top:-22px;
			rsz.appendChild(document.createTextNode(' resize'))
			rszh.appendChild(rsz);
			rsz.addEventListener('mousedown',ssr,false);

			//var bar = document.getElementsByClassName('yz')[0]
			//bar.addEventListener('mousedown',ssm,false);
			//bar.setAttribute('style','-webkit-user-select: none;-moz-user-select: none;cursor:move;');
			
			
			var displa=document.getElementsByClassName('yp')[0];
			displa.style.overflow='auto';
			displa.style.overflowX='hidden';
			//console.log(navigator.userAgent + '=' + new String(navigator.userAgent).indexOf('Chrome/'));
			if(new String(navigator.userAgent).indexOf('Chrome/')>0){
				displa.style.marginRight='-18px';
			}
			//window.removeEventListener('mousemove',domove,false)
			//window.addEventListener('mousemove',domove,false)

			document.getElementsByClassName('Wx')[0].addEventListener('click',resetScroll,false);
			
			sizeSet()
		}
	},10);
}



var movenode=false;
var sizenode=false;
var sizeratio=0;
var ismoving=false
var sx,sy;

function domove(ev){
	if(sizenode){
		if(!ismoving){
			sx=ev.pageX
			sy=ev.pageY
			ismoving=true;
		}else{
			var dx=ev.pageX-sx
			var dy=ev.pageY-sy	
			sizenode.style.width=sizenode.style.width.CSStoInteger() +0 + dx +'px';
			sizenode.style.height=sizenode.style.height.CSStoInteger() -0 + dy +'px';
			sx=ev.pageX
			sy=ev.pageY
		}
	}else if(movenode){
		if(!ismoving){
			sx=ev.pageX
			sy=ev.pageY
			ismoving=true;
		}else{
			var dx=ev.pageX-sx
			var dy=ev.pageY-sy
			movenode.style.top=(movenode.style.top.CSStoInteger()+dy)+'px';
			movenode.style.left=(movenode.style.left.CSStoInteger()+dx)+'px';
			sx=ev.pageX
			sy=ev.pageY
		}
	}else{
		ismoving=false;
	}
	
	chk();
}

//cbody=document.getElementsByClassName('cP');
//if(cbody.length > 0 ){
//	cbody[0].addEventListener('DOMSubtreeModified',chk,false)
//}
window.addEventListener('mousemove',domove,false)
window.addEventListener('mouseup',function(){sizenode=false;movenode=false;},false)
