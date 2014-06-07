// ==UserScript==
// @name	豆瓣的楼层菜单- =
// @include http://www.douban.com/group/topic/*
// ==/UserScript==
(function( window, undefined ) {
	var vvMenuStyleSheet=document.createElement('style'),text = document.createTextNode('div.vvBtn{float: right;position: relative;padding-right: 36px;font-size: 22px;cursor: pointer}div.vvBtn b{position: absolute;right: 0;top: 8px;border-width: 4px 4px;border-style: solid;border-color: #666 #fff #fff #fff;width: 0;height: 0;font-size: 0;line-height: 0;-webkit-transition: -webkit-transform 0.2s ease-in;-moz-transition: -moz-transform 0.2s ease-in;-o-transition: -o-transform 0.2s ease-in;transition: transform 0.2s ease-in}div.vvMenu:hover b{-moz-transform: rotate(180deg);-moz-transform-origin: 50% 20%;-webkit-transform: rotate(180deg);-webkit-transform-origin: 50% 20%;-o-transform: rotate(180deg);-o-transform-origin: 50% 20%;transform: rotate(180deg);transform-origin: 50% 20%;filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=2);top: -8px/9}div.vvMenu-Db{left: 5px;top: 18px;background: none repeat scroll 0 0 #FFF;border: 1px solid #C0C0C0;display: none;padding: 5px 0;position: absolute;text-align: center;width: 69px;z-index: 100}div.vvMenu-Db a{font-size: 12px;line-height: 12px;margin: 3px 5px 0;padding: 2px;white-space: nowrap;display: block;float: none;margin: 0;padding: 5px}');
	vvMenuStyleSheet.appendChild(text);
	document.body.appendChild(vvMenuStyleSheet);
	
	var reply=document.getElementsByClassName('reply-doc'),i=0,temp,vvBtn,vvMenu,menu,quote,quoteText,query=location.search.substring(1).match(/start=([0-9]+)/),
		getCookie=function (c_name){
			if (document.cookie.length>0){
				c_start=document.cookie.indexOf(c_name + "=");
				if (c_start!=-1){
					c_start=c_start + c_name.length+1;
					c_end=document.cookie.indexOf(";",c_start);
					if (c_end==-1){
						c_end=document.cookie.length;
					}
					return unescape(document.cookie.substring(c_start,c_end));
				}
			}
		return "";
		},removeNode=function(id){
			var target=document.getElementById(id);
			if(target){
				target.parentNode.removeChild(target);
			}
		},getPosition = function(el) {
			var ua = navigator.userAgent.toLowerCase();
			var isOpera = (ua.indexOf('opera') != -1);
			var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
			if (el.parentNode === null || el.style.display == 'none') {
				return false;
			}

			var parent = null;
			var pos = [];
			var box;

			if (el.getBoundingClientRect) //IE
			{
				box = el.getBoundingClientRect();
				var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
				var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);

				return {
					x: box.left + scrollLeft,
					y: box.top + scrollTop
				};
			} else if (document.getBoxObjectFor) // gecko
			{
				box = document.getBoxObjectFor(el);

				var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
				var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;

				pos = [box.x - borderLeft, box.y - borderTop];
			} else // safari & opera
			{
				pos = [el.offsetLeft, el.offsetTop];
				parent = el.offsetParent;
				if (parent != el) {
					while (parent) {
						pos[0] += parent.offsetLeft;
						pos[1] += parent.offsetTop;
						parent = parent.offsetParent;
					}
				}
				if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
					pos[0] -= document.body.offsetLeft;
					pos[1] -= document.body.offsetTop;
				}
			}

			if (el.parentNode) {
				parent = el.parentNode;
			} else {
				parent = null;
			}

			while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
				pos[0] -= parent.scrollLeft;
				pos[1] -= parent.scrollTop;

				if (parent.parentNode) {
					parent = parent.parentNode;
				} else {
					parent = null;
				}
			}
			return {
				x: pos[0],
				y: pos[1]
			};
		},show_dialog=function(element,width){
			var target=document.getElementById('dialog'),overlay=document.getElementById('overlay');
			if(!target){
				target=document.createElement('div');
				target.setAttribute('id','dialog');
				target.style.width=(width||550)+'px';
				target.appendChild(element);
				document.body.insertBefore(target,document.body.firstChild);
			}
			if(!overlay){
				overlay=document.createElement('div');
				overlay.setAttribute('id','overlay');
				document.body.insertBefore(overlay,document.body.firstChild);
				var oHeight=('v' == '\v'?11: 26),left=(document.body.offsetWidth-target.offsetWidth)/2+"px";
				overlay.style.height=target.offsetHeight+oHeight+'px';
				overlay.style.width=target.offsetWidth+26+'px';
				overlay.style.left=left;
			}
			target.style.left=left;
			
		},close_dialog=function(){
			var target=document.getElementById('dialog'),overlay=document.getElementById('overlay');
			if(target){
				removeNode(target);
			}
			if(overlay){
				removeNode(overlay);
			}
		},name;
	for(i=0;i<reply.length;i++){
		temp=reply[i].getElementsByTagName('h4')[0];
		name=temp.getElementsByTagName('a')[0].innerHTML;
		quoteText=reply[i].getElementsByTagName('p')[0].innerHTML.replace(/<[^>]*>/g,'');
		vvBtn=document.createElement('div');
		vvBtn.setAttribute('class','vvBtn');
		vvBtn.appendChild(document.createElement('b'));
		temp.innerHTML='#'+((query?parseInt(query[1]):0)+i+1)+' '+temp.innerHTML;
		vvMenu=document.createElement('div');
		vvMenu.style.cssFloat='right';
		vvMenu.style.height='22px';
		vvMenu.setAttribute('class','vvMenu');
		vvMenu.setAttribute('id','vvMenu'+i);
		vvMenu.onmouseover=function(quoteText,name){
			return function(){
				var floatMenu=document.getElementById('vv_menu');
				if(!floatMenu){
					menu=document.createElement('div');
					menu.setAttribute('id','vv_menu');
					menu.setAttribute('class','vvMenu-Db');
					this.appendChild(menu);
				}
				if(menu.getElementsByTagName('a').length<1){
					quote=document.createElement('a');
					quote.href='javascript:void(0);';
					quote.addEventListener('click',function(){
						var form=document.createElement('form');
						form.setAttribute('action','add_comment');
						form.setAttribute('method','post');
						form.innerHTML='<input type="hidden" name="ck" value='+getCookie('ck')+' />'+
										'<span class="gact rr"><a onclick="close_dialog()" href="javascript:void(0)">x</a></span>'+
										'<h2>你的回应 &nbsp; ·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;</h2>'+
										'<ul><li><textarea id="rv_comment" class="w450 h65" style="height:144px" name="rv_comment">Re:@'+name+': \r\n'+quoteText+'\r\n——————————————————————————————\r\n'+'</textarea></li><li><input type="submit" value="加上去" /></li></ul>';
						show_dialog(form);
					},false);
					quote.innerHTML='引用';
					menu.appendChild(quote);
				}
				
				var p=getPosition(document.getElementById(this.id));
				menu.style.top=parseInt(p.y)+12+'px';
				menu.style.left=parseInt(p.x)-4+'px';
				menu.style.display="block";
				menu.onmouseout=function(){
					removeNode('vv_menu');
				}
			}
		}(quoteText,name);
		vvMenu.appendChild(vvBtn);
		temp.appendChild(vvMenu);
	}
	document.body.addEventListener('click',function(e){if(e.target.id!=='vv_menu')removeNode('vv_menu');},false);
	
})(window);