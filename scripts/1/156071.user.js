// ==UserScript==
// @name        去除看图脚本
// @author     527836355
// @license  GPL 2.0
// @description  去除度娘脑残的连续看图
// @namespace   http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
// @run-at document-start
// @updateURL   https://userscripts.org/scripts/source/156071.meta.js
// @downloadURL https://userscripts.org/scripts/source/156071.user.js
// @include     http://tieba.baidu.com/*
// @version     1.3
// ==/UserScript==
GM_addStyle('.BDE_Smiley{width:auto!important;max-width:560px!important;height:auto;}.BDE_Image{cursor:auto!important},#pic_to_album_tip{display:none!important;}');
window.addEventListener('DOMContentLoaded',function(){
document.getElementById('wd1').select=null;
var $=unsafeWindow.$;
var overlay=document.createElement('div');
overlay.id='overykantu';
overlay.setAttribute('style','overflow:auto;display:none;position:fixed;left:0px;top:0px;background:rgba(0,0,0,0.8);z-index:3311111111111;');
document.body.appendChild(overlay);

var imgs=new Array();
overlay.addEventListener('DOMMouseScroll',function(e){e.stopPropagation();},false);
overlay.addEventListener('click',function(){if(!overlay.firstChild.hasAttribute('zoom')){$(overlay).fadeOut();overlay.innerHTML='';document.body.style.overflow='auto';}},false);
overlay.addEventListener('dblclick',function(){$(overlay).fadeOut();overlay.innerHTML='';document.body.style.overflow='auto';},false);
function  picview(src)
			{ 
			
			window.getSelection().removeAllRanges();
			document.body.style.overflow='hidden';
			overlay.style.height=window.innerHeight+'px';
			overlay.style.width=window.innerWidth+'px';
			$(overlay).fadeIn('fast');
			var image=new Image();
			image.style.position='absolute';
			image.style.left='10px';
				image.style.top='10px';
			image.style.width='auto';
				overlay.appendChild(image);
			
			image.src=src;			
			
			image.onload=function()
				{
			if(image.height>window.innerHeight)
			{var oheight=image.height;
				image.width=(image.width)*(window.innerHeight)/oheight;
				image.height=window.innerHeight;
				image.style.cursor='-moz-zoom-in';
				image.setAttribute('zoom','in');
				image.onclick=function()
				{
				if(image.getAttribute('zoom')=='in')
					{
				image.height=oheight;
				image.style.cursor='-moz-zoom-out';
				if((window.innerWidth-image.width)>0)
				image.style.left=(window.innerWidth-image.width)/2+'px';
				else image.style.left='0px';
				image.style.top='0px';
				image.setAttribute('zoom','out');
					
					}
				else
					{
					image.height=window.innerHeight;
					image.style.cursor='-moz-zoom-in';
					image.style.left=(window.innerWidth-image.width)/2+'px';
					image.style.top=(window.innerHeight-image.height)/2+'px';
					image.setAttribute('zoom','in');

					}
				

					
				};
			}
			
			image.style.left=(document.body.clientWidth-image.width)/2+'px';
			image.style.top=(window.innerHeight-image.height)/2+'px';
			
			
				}
			
			}

$('.BDE_Image').each(function(index){
var n=this;
var img=document.createElement('img');img.src=n.src;img.width=n.width;img.height=n.height;
if(img.width>=560)
{
img.width=560;img.style.height='auto';
$(n).wrap('<span class="imgwrap" target="_blank"></span>');
var s='';
if(n.src.indexOf('imgsrc.baidu.com/forum/pic/item/')!=-1)
{s=n.src;}
//http://imgsrc.baidu.com/forum/w%3D580/sign=cf855ae4bf096b6381195e583c318733/77b84236acaf2edd660fd4228c1001e93b0193b4.jpg
else  s='http://imgsrc.baidu.com/forum/pic/item/'+n.src.match(/\/([a-z0-9]{20,}\.[jpg|png|gif]+$)/)[0];
n.parentNode.replaceChild(img,n);
img.style.cursor='pointer';
imgs.push(s);
img.parentNode.addEventListener('click',function()
										{
										
										picview(s);
										
										},false);


}

else { 
imgs.push(img.src);
n.parentNode.replaceChild(img,n);
}

});


$('a.tb_icon_ypic').live('click',function(e){
e.preventDefault();
e.stopPropagation();
var d=this.href;
var start=d.indexOf('pic_id')+7;
var end=d.indexOf('&',start);
var pic='http://imgsrc.baidu.com/forum/pic/item/'+d.substring(start,end)+'.jpg'
window.open(pic);

})




},false);

