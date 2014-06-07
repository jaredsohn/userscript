// ==UserScript==   
// @name            CustomScrollbar
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     Adds a custom scrollbar to chat with a snap-to-bottom button that glows when a new messages is received. The userlist scrollbar is hidden until you hover over the list and hides after the mouse leaves.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/121867
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {
window.location.assign("javascript:void(("+((function() {
	function addNow(a) {
		$$('head').invoke('insert', a);
	}
	(function(){
	function update(array, args) {
		var arrayLength = array.length, length = args.length;
		array.length += length;
		while (length--) array[arrayLength + length] = args[length];
		return array;
	}
	Element.addMethods({setTop:function(e,y){
		return Element.setStyle(e, {top:(y|0)+'px'});
	},setPosSvH:function(e,y,h){
		return Element.setStyle(e, {top:(y|0)+'px',height:(h|0)+'px'});
	},setHeight:function(e,y){
		return Element.setStyle(e, {height:(y|0)+'px'});
	},getTop:function(e){
		return parseInt(Element.getStyle(e, 'top'),10)|0;
	},removeClassNames:function(e,n){
		$A(arguments.length==2?$w(n):arguments.shift()).each(Element.removeClassName.curry(e));
		return $(e)
	} });
	Object.extend(Function.prototype,{bindArgs:function(thisObj, args){
		var __method = this;
		args = $A(args).slice(0);
		return function() {
			var a = update(args.slice(0), arguments);
			return __method.apply(thisObj, a);
		}
	},passiveWrap:function(wrapper){
		var __method = this;
		return function() {
			var a = $A(arguments);
			a.unshift(__method.bindArgs(this, arguments));
			return wrapper.apply(this, a);
		}
	}});
	})();
	addNow(("<style>.scrollbar,.scrollbar *{background-image:url(\""+($.jStorage.get("skyscrollbg")||'http://i.imgur.com/Fb8Hz.png')+"\");vertical-align:top;overflow:hidden;background-repeat:repeat-y;width:15px}.noyscroll {overflow-y:hidden!important;}" +
			".scrollbar *{position:absolute}.scroller *{height:3px;}.scroller .top{background-position:-48px 0;}.scroller .bot{bottom:0;background-position:-48px -13px;}.scroller:hover .top{background-position:-64px 0}" +
			".scroller .mid{height:10px;background-position:-48px -3px;top:50%;margin-top:-5px;}.scroller:hover .mid{background-position:-64px -3px;}.scrolldown{height:16px;background-position:0 -17px;bottom:16px}" +
			"#kong_game_ui .message_window_table .chat_message_window{margin-top:0;}.message_window_table{table-layout:fixed;width:100%}.message_window_table,.message_window_table td{border-spacing:0;border:0;}" +
			".scrolldown:hover{background-position:-16px -17px}.scrolldown.down{background-position:-32px -17px}.scroller:hover{background-position:-144px 0;}.scroller.down{background-position:-160px 0;}" +
			".bottomsnap.glow{background-position:-96px -17px}.bottomsnap.glow:not(.down):hover{background-position:-96px 0}.scrollup{height:16px;}.scroller:hover .bot{background-position:-64px -13px;}" +
			".scroller{background-position:-128px 0;min-height:16px;}.scrollbar{background-position:-112px 0;}.scrollup:hover{background-position:-16px 0;}.scrollup.down{background-position:-32px 0;}" +
			".bottomsnap{height:16px;background-position:-48px -17px;bottom:0}.bottomsnap:hover{background-position:-64px -17px}.bottomsnap.down{background-position:-80px -17px}" +
			".scroller.down .mid{background-position:-80px -3px}.scroller.down .top{background-position:-80px 0;}.scroller.down .bot{background-position:-80px -13px;}" +
			".bartop{background-position:-176px 0;height:33px;top:16px}.barbot{background-position:-192px 0;height:33px;bottom:32px}</style>"));
	document.observe('holodeck:ready', function(){
		var CD=ChatDialogue,p=CD.prototype;
		CD.SCROLL_INCREMENT = 15;
		CD.SCROLL_DELAY = .02;
		CD.SCROLL_HALT = 0.20;
		CD.WINDOW_SCROLL_DELAY = .5;
		p.initialize=p.initialize.passiveWrap(function(p,n){
			var t=this,c='noyscroll',r=p();
			function sa(e,t,h,p){e.scrollTop=(t+((p|0)*(t/h)))*(e.scrollHeight / h);};
			function f(t){t.scrolltimer2=0;var a=t.scrollTop,b=t.scrollHeight||1;t.removeClassName(c);setTimeout(sa,350,t,a,b,18);};
			function f2(t){t.scrolltimer=0;var a=t.scrollTop,b=t.scrollHeight||1;t.addClassName(c);sa(t,a,b);};
			function f3(){var t=this;if(t.scrolltimer2){clearTimeout(t.scrolltimer2);t.scrolltimer2=0;return;}if(!t.scrolltimer)t.scrolltimer=setTimeout(f2,1000,t)};
			function f4(){var t=this;if(t.scrolltimer){clearTimeout(t.scrolltimer);t.scrolltimer=0;return;}if(!t.scrolltimer2)t.scrolltimer2=setTimeout(f,500,t)};
			try{n.down('.users_in_room').addClassName(c).observe('mouseover',f4).observe('mouseout',f3);}catch(_){}
			function dv(c,h){return "<div class='"+c+"'>"+(h||'')+"</div>"}
			var mwt = new Element('table',{'class':'message_window_table'}),mwn=t._message_window_node;
			var d=new Element('td'),s=new Element('td',{'style':'width:15px;height:100%;','class':'scrollbar'});
			s.update(dv("scrollup")+dv("bartop nm")+dv("barbot nm")+dv("scroller",dv("top")+dv("mid")+dv("bot"))+dv("scrolldown")+dv("bottomsnap"));
			d.insert(mwn.addClassName(c).replace(new Element('div', {'style':'margin-top:3px;position:relative;'}).insert(mwt)));
			mwt.insert(new Element('tr').insert(d).insert(s));
			t._scrollbar_node = s;
			var bs = s.down('.bottomsnap'), sd = s.down('.scrolldown'), su = s.down('.scrollup'), sc = s.down('.scroller');
			function rcng(){if(mwn.scrollTop+mwn.getHeight()+(ChatDialogue.SCROLL_FUDGE/5)>=mwn.scrollHeight)bs.removeClassName('glow');}
			function usp(){
				var mwn=t._message_window_node,h=mwn.getHeight();
				if (h) {
					var sn = t._scrollbar_node, s=sn.down('.scroller');
					s.setTop(((mwn.scrollTop/(mwn.scrollHeight-h))*(h-48-s.getHeight())|0)+16);
					rcng();
				}
			}
			function udp2(d,p){(p = t._scroll_pe) && p.stop();t._scroll_pe = new PeriodicalExecuter(function(){t._message_window_node.scrollTop += d;usp()},CD.SCROLL_DELAY)}
			function upd(d,c){t._message_window_node.scrollTop+=d*=CD.SCROLL_INCREMENT;usp();if(!c)wrp(),t._scroll_pe=new PeriodicalExecuter(function(){t._message_window_node.scrollTop += d;usp();udp2(d)},CD.SCROLL_HALT)}
			function stp(p,e){Object.isFunction(p)&&p(e);e&&e.stop();return false}
			function wrp(p,e){Object.isFunction(p)&&p();(p=t._scroll_pe)&&p.stop();e&&this.stopObserving(e.eventName,arguments.callee);}
			bs.observe('mousedown',(function(e){if(e.isLeftClick())bs.addClassName('down'),document.observe('mouseup',(function(){t.scrollToBottom();bs.removeClassName('down');}).wrap(wrp))}).wrap(stp));
			sd.observe('mousedown', (function(e){if (e.isLeftClick()) { sd.addClassName('down');upd(+1);document.observe('mouseup', sd.removeClassName.bind(sd, 'down').wrap(wrp).wrap(stp))}}).wrap(stp));
			su.observe('mousedown', (function(e){if (e.isLeftClick()) { su.addClassName('down');upd(-1);document.observe('mouseup', su.removeClassName.bind(su, 'down').wrap(wrp).wrap(stp))}}).wrap(stp));
			function msmv(e){
				var p=sc.getHeight(),my=e.pageY-msmv.y,h=s.getHeight()-32-p;
				if(h>0){
					p=Math.min(Math.max(msmv.t+my,16),h);
					sc.setTop(p);
					(my=t._message_window_node).scrollTop = Math.max((p-16)/(h-16)*(my.scrollHeight-my.getHeight()),0);
				}
			}
			function somvrcn(){document.stopObserving('mousemove',msmv);sc.removeClassName('down');rcng();document.stopObserving('mouseup',somvrcn)}
			sc.observe('mousedown', (function(e){somvrcn();if(e.isLeftClick()){sc.addClassName('down');msmv.y=e.pageY,msmv.t=sc.getTop();document.observe('mousemove',msmv).observe('mouseup', somvrcn);}}).wrap(stp)).setTop(16);
			var rmsw=3;
			function msw(e,s,n){
				if (e.detail)
					s=e.detail;
				else if (e.wheelDelta)
					s=e.wheelDelta/-120;
				else throw new Error('Scrolling improperly supported.');
				if (((n=t._message_window_node),s>0)?rmsw&1||n.scrollTop<(n.scrollHeight-n.getHeight()):rmsw&2||n.scrollTop>0) {
					rmsw=3;
					stp(wrp,e);
					t._scroll_pe=new PeriodicalExecuter(me.wrap(wrp),CD.WINDOW_SCROLL_DELAY);
					upd(s,1);
					return false;
				}
			}
			mwt.observe('mousewheel', msw).observe('DOMMouseScroll', msw);
			function me(n){rmsw=(Number((n=t._message_window_node).scrollTop>0)<<1)|Number(n.scrollTop<(n.scrollHeight-n.getHeight()));}
			mwt.observe('mouseenter',me).observe('mouseleave',(function(){rmsw=0;}).wrap(wrp.bindAsEventListener(0,0,0)));
			s.observe('click',function(e,l){if((l=e.target)==s||l.hasClassName('nm'))msmv.y=sc.cumulativeOffset()[1],msmv.t=sc.getTop()+(e.pageY>msmv.y?-sc.getHeight():-16)+8,msmv(e),rcng()});
			return r;
		});
		p.insert=p.insert.passiveWrap(function(p){
			var t=this,mwn=t._message_window_node,h=mwn.getHeight();
			if (h) {
				var mwsh=mwn.scrollTop+h, sh=Math.max(Math.min((h/mwn.scrollHeight)*(h-48)|0, h-48), 16);
				var sn = t._scrollbar_node;
				if (mwsh+ChatDialogue.SCROLL_FUDGE<mwn.scrollHeight) {
					sn.down('.bottomsnap').addClassName('glow');
					sn.down('.scroller').setHeight(sh);
				} else {
					sn.down('.scroller').setPosSvH(h-32-sh, sh);
					sn.down('.bottomsnap').removeClassName('glow');
				}
			}
			return p();
		});
		p.scrollToBottom=p.scrollToBottom.passiveWrap(function(p){
			var r=p(),t=this,mwn=t._message_window_node,h=mwn.getHeight();
			if (h) {
				var mwsh=mwn.scrollTop+h, sh=Math.max(Math.min((h/mwn.scrollHeight)*(h-48)|0, h-48), 16);
				var sn = t._scrollbar_node;
				sn.down('.scroller').setPosSvH(h-32-sh, sh);
				sn.down('.bottomsnap').removeClassName('glow');
			}
			return r;
		});
		p.setMessageWindowHeight=p.setMessageWindowHeight.passiveWrap(function(p,h){
			var r,t=this,mwn=t._message_window_node;
			if (h) {
				var mwsh=mwn.scrollTop+h, sh=Math.max(Math.min((h/mwn.scrollHeight)*(h-48)|0, h-48), 16);
				var sn = t._scrollbar_node;
				if (mwsh+ChatDialogue.SCROLL_FUDGE<mwn.scrollHeight) {
					sn.down('.bottomsnap').addClassName('glow');
					sn.down('.scroller').setHeight(sh);
				} else {
					r=true;
				}
			}
			return r?(r=p(),t.scrollToBottom(),r):p();
		});
		p.clear=p.clear.passiveWrap(function(){
			var r,t=this,mwn=t._message_window_node,h=mwn.getHeight();
			if (h) {
				var sn = t._scrollbar_node;
				sn.down('.scroller').setPosSvH(16, h-48);
				sn.down('.bottomsnap').removeClassName('glow');
			}
			return p();
		});
		p = ChatWindow.prototype;
		p.showChatWindow = p.showChatWindow.passiveWrap(function(p) {p=p(); if (this._active_room) { this._active_room.show(); } return p});
		holodeck.addChatCommand("scrollskin", function(h,i){i=(i.replace(/\S+\s+(\S+)/,'$1')||'').strip();if(i){$.jStorage.set("skyscrollbg",i);addNow('<style>.scrollbar,.scrollbar *{background-image:url("'+i+'");</style>')}return false})
	});
}).toString().replace(/[\r\n\f]/g,''))+")())");
}, 1250);
}