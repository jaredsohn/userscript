// ==UserScript==
// @name		-	Snap Links - for opera
// @author		-	Ayush
// @version		-	1.5.6
// @description	-	Select the links by drawing a box around links then leave the mousebutton to open the links in that box/region.
//					Hold -Shift- key to select all links in rectangle and hold down -Alt- key while dragging to move rectangle.
//					You can change the tab opening behaviour(in background tab,in new window etc.) by changing the Middle-Click settings (Shift+Middle-Click in opera)
// @download        http://files.myopera.com/AyushJ/scripts/snap-links.js
// ==/UserScript==

//code based on ff extension but improved
(function(opera,getSelection,addEventListener,selNode,getBoundingClientRect,window){var 
//..//
	showStatus=1 , // show # of selected links in status bar
	selAllLinks=0, // select all links
	dupLinks=0,  // select duplicate links (links with same href)
	inSameTab=0, // open the first or last link in same tab: 1=first link in same tab , -1=last link in same tab , 0=open all in new tabs
	reqAltKey=0, // run script only when alt key is pressed
	rectBorder='2px dashed #1E90FF', rectBG='transparent', linksOutline='1px solid #ef0006'
//..//
	;var mdown,copyDIV,outRect,elms,mdElm,updateTimeout,visElms,x,y,x2,y2,ctKey,shKey,scrTm,visMinY=-1,visMaxY=-1,docMaxX,docMaxY,winFocused=1,eventsAttached,
	lastTp,
	events={
		mousedown:function(ev){
			if(ev.dynamicEvent)return;
			sl.clear(0,0,1);
			if(ev.which!==1 || ev.altKey!=reqAltKey || selNode.call(ev.target,'ancestor-or-self::node()[contains(",input,textarea,img,button,select,a,object,embed,",concat(",",local-name(),",")) and (local-name()!="a" or @href)]'))return;
			x=x2=ev.pageX;y=y2=ev.pageY;
			//docMaxX=getComputedStyle(document.documentElement).width;docMaxY=getComputedStyle(document.documentElement).height;
			mdElm=[ev.srcElement];mdElm.push(mdElm[0].offsetLeft,mdElm[0].offsetTop,mdElm[0].offsetWidth,mdElm[0].offsetHeight,getComputedStyle(mdElm[0],null).backgroundPosition);
			var cSty,pos;if((mdElm[0].tagName!='BODY' && mdElm[0].tagName!='HTML') && ((cSty=getComputedStyle(mdElm[0],null)).overflow!='visible' && cSty.overflow!='hidden') && ((((pos=sl.getPos(mdElm[0])).x+parseInt(cSty.borderLeftWidth,10)+mdElm[0].clientWidth)<ev.pageX && (pos.x2-parseInt(cSty.borderRightWidth,10))>ev.pageX) || ((pos.y+parseInt(cSty.borderTopWidth,10)+mdElm[0].clientHeight)<ev.pageY && (pos.y2-parseInt(cSty.borderBottomWidth,10))>ev.pageY)))return;
			mdown=1;
			sl.events(1);
		},
		mousemove:function(ev){
			if(!mdown)return;
			if(reqAltKey!=ev.altKey)
				if(!reqAltKey){
					x+=ev.pageX-x2;
					y+=ev.pageY-y2;
				}else
					return(sl.clear());
			x2=ev.pageX;
			y2=ev.pageY;
			
			ctKey=ev.ctrlKey;shKey=ev.shiftKey;
			
			var rect=sl.getRealXY([x,x2],[y,y2]);
			if(!outRect){
				if( reqAltKey || ((rect.x[1]-rect.x[0])>4 && (rect.y[1]-rect.y[0])>10 && !getSelection().rangeCount)){
					if( winFocused && mdElm && mdElm[1]==mdElm[0].offsetLeft && mdElm[2]==mdElm[0].offsetTop && mdElm[3]==mdElm[0].offsetWidth && mdElm[4]==mdElm[0].offsetHeight && mdElm[5]==getComputedStyle(mdElm[0],null).backgroundPosition)
						sl.createRect();
					else
						return sl.clear(0,0,1);
				}else
					return;
			};

			if(getSelection().rangeCount)getSelection().removeAllRanges();
			
			sl.setRectSize(rect,docMaxX,docMaxY)
			
			if(!updateTimeout)
			 updateTimeout=setTimeout(function(){updateTimeout=null;sl.selLinks()},66);
		},
		mouseup:function(ev){
			if(ev.which===1 && mdown){
			  var linksOpened;
			  ev.preventDefault();//ev.stopPropagation();
			  sl.selLinks();
			  if(elms && (!reqAltKey || ev.altKey)){
			  	var mEv=document.createEvent('MouseEvent');mEv.initMouseEvent('mousedown',0,0,document.defaultView,1,0,0,0,0,0,0,0,0,1,null);mEv.dynamicEvent=1;
				for(var iX=0,elm,link=!inSameTab?0:(inSameTab==-1?elms.pop():elms.shift());elm=elms[iX];iX++){
					window.open(elm);
					elm.style.outline="none";
				}
				if(linksOpened=(iX && showStatus)){
					window.status=iX+" link" + (iX>1?'s':'') + " opened";
					setTimeout(function(){status=''},1456);
				}
				if(link){ sl.clear();location.href=link.href;return }
			  }
			  sl.clear(0,0,linksOpened);
			}
		},
		keydown:function(ev){
			if(!mdown)return
			var kc=ev.keyCode;
			if(kc==16)
				shKey=1;
			else if(kc==17)
				ctKey=1;
			else if(kc==67 && ctKey){
				copyDIV=document.createElement('div');
				var urls='';
				for(var iX=0, elm; elm=elms[iX]; iX++)
					urls+=elm.href+'<br>';
				copyDIV.innerHTML=urls;
				copyDIV.style='opacity:0!important;max-width:0!important;max-height:0!important;overflow:hidden!important;border:0!important;position:absolute!important';
				(document.body||document.documentElement).appendChild(copyDIV);
				var r=document.createRange();
				r.selectNodeContents(copyDIV);
				getSelection().removeAllRanges();
				getSelection().addRange(r);
				return;
			}else{
			  if(kc==27)
				sl.clear();
				//ev.preventDefault();
			  return
			};
			sl.selLinks();
		},
		keypress:function(ev){
			if(!mdown)return;
			var kc=ev.keyCode;
			if(kc==67 && shKey && ctKey)
				ev.preventDefault()
		},
		keyup:function(ev){
			if(!mdown)return;
			var kc=ev.keyCode;
			if(kc==16)
				shKey=0;
			else if(kc==17)
				ctKey=0;
			else if(kc==67 && copyDIV){
				copyDIV.parentNode.removeChild(copyDIV);
				copyDIV=null;
				return;
			}else return;
			sl.selLinks();
		},
		scroll:function(){
			if(mdown && outRect){
			  if(scrTm)clearTimeout(scrTm);
			  scrTm=setTimeout(function(){
				if(mdown)sl.createRect(lastTp,0,0,visElms,1);
				sl.selLinks()
			  },66+6);
			}
		},
		blur:function(){
			winFocused=0;
			//if(mdown)sl.clear(0,0,1)
		},
		focus:function(){
			winFocused=1;
			//if(mdown)sl.clear(0,0,1)
		}
	},
	sl={
		events:function(attach){
			if(attach){
				if(!eventsAttached){
					for(var i in events)
						addEventListener(i, events[i], true);
					eventsAttached = 1;
				}
			}else if(eventsAttached){
				for(var i in events)
					removeEventListener(i, events[i], true);
				eventsAttached = 0;
			}
		},
		clear:function(noOutRect,noElms,noStat,noMDown){
			if(!noOutRect){
				if(outRect){
					outRect.parentNode.removeChild(outRect);
					outRect=null;
				}
				if(!noMDown){mdown=ctKey=shKey=mdElm=0;sl.events(0)}
			};
			if(!noElms && elms){
				for(var iX=0;iX<elms.length;iX++)
					elms[iX].style.outline="none";
				elms=null;
			}
			if(!noStat)status='';
		},
		createRect:function(loopElms,minY,maxY,addToElms,noNewRect){
			if(!noNewRect){
			  outRect=document.createElementNS("http://www.w3.org/1999/xhtml","outRect");
			  outRect.style='border:'+rectBorder+'!important;background:'+rectBG+'!important;opacity:1!important;margin:0!important;padding:0!important;position:absolute!important;z-index:9999!important;left:'+x+'px!important;top:'+y+'px!important;';
			  if(linksOutline.indexOf('!important')==-1)linksOutline+='!important';
			  (document.documentElement||document).appendChild(outRect);
			};
			
			minY=minY||pageYOffset;
			maxY=maxY||pageYOffset+(document.documentElement.clientHeight);
			if(visMinY==-1 || visMaxY==-1){
				visMinY=minY
				visMaxY=maxY
			}else if(minY<visMinY){
				maxY=visMinY;
				visMinY=minY;
			}else if(maxY>visMaxY){
				minY=visMaxY
				visMaxY=maxY;
			}else return;
			
			var elms=loopElms||document.links,i=0,elm;visElms=addToElms||visElms||{sizes:[],elms:[],pos:[]};
			var eSty,elFS,pos;
			var iX=0,cLnk,vEls=visElms.elms;
			wOLoop:while(elm=elms[i++]){
				if(addToElms)while(cLnk=vEls[iX++])if(cLnk==elm)continue wOLoop;
				eSty=getComputedStyle(elm,null);
				if(eSty.visibility=="hidden")continue;
				pos=sl.getPos(elm);
				if( pos.y2<minY || pos.y>maxY || pos.y2==pos.y || pos.x2==pos.x)
					continue;
				if((eSty=eSty.fontSize).indexOf('px')!=-1)elFS=parseFloat(eSty);else elFS=0;
				visElms.sizes.push(elFS);visElms.elms.push(elm);visElms.pos.push(pos);
			};
			lastTp=loopElms;
		},
		setRectSize:function(rect,maxX,maxY,oRect){
			var tmpsty=(oRect||outRect).style;
			if(!maxX || rect.x[1]<maxX){
			  tmpsty.setProperty('left',rect.x[0]+"px",'important');
			  tmpsty.setProperty('width',(rect.x[1]-rect.x[0])+"px",'important');
			}
			if(!maxY || rect.y[1]<maxY){
			  tmpsty.setProperty('top',rect.y[0]+"px",'important');
			  tmpsty.setProperty('height',(rect.y[1]-rect.y[0])+"px",'important');
			}
		},
		getPos:function(el,arr){
			var pos;
			if(getBoundingClientRect){
				pos = getBoundingClientRect.apply(el);
				pos = {x:pageXOffset+pos.left,y:pageYOffset+pos.top,x2:pageXOffset+pos.right,y2:pageYOffset+pos.bottom}
			}else{
				pos = {x:0,y:0,x2:el.offsetWidth,y2:el.offsetHeight};
				while (el) {
					pos.x += el.offsetLeft;	pos.y += el.offsetTop;el = el.offsetParent;
				}
				pos.x2+=pos.x;pos.y2+=pos.y;
			}
			return (arr?[pos.x,pos.x2,pos.y,pos.y2]:pos);
		},
		getRealXY:function(x,y){
			return {x:(x[0]<x[1]?x:x.reverse()),y:(y[0]<y[1]?y:y.reverse())};
		},
		selLinks:function(allLinks,DupLinks){
			if(!outRect)return;
			var allLinks=allLinks || (selAllLinks?!shKey:shKey),DupLinks=DupLinks/*||(dupLinks?!ctKey:ctKey)*/,dLinkStr={};
			var rect=sl.getRealXY([x,x2],[y,y2]),X=rect.x[0],X2=rect.x[1],Y=rect.y[0],Y2=rect.y[1],
			iX=-1,Elms=visElms.elms,Elm,Poss=visElms.pos,Sizes=visElms.sizes,
			ePos,eX,eWid,eY,eHeight,sz,elNotInRect,largSz=0;elms=[];
			while(Elm=Elms[++iX]){
				ePos=Poss[iX];eX=ePos.x;eX2=ePos.x2;eY=ePos.y;eY2=ePos.y2;sz=Sizes[iX];
				elNotInRect=(eY > Y2 || eY2 < Y || eX2 < X ||eX > X2);
				if(elNotInRect || (!DupLinks && (Elm.href in dLinkStr))){
					Elm.style.outline="";
				}else{
					if(!allLinks){
					  if(largSz>sz){
						Elm.style.outline="";
						continue
					  }else if(largSz<sz){
						sl.clear(1);elms=[];largSz=sz
					  };
					};
					Elm.style.outline=linksOutline;
					elms.push(Elm);
					if(!DupLinks)dLinkStr[Elm.href]=001;
				}
			};
			if(showStatus)window.status='Links in selection: '+ elms.length;
		}
	};
	if(opera && opera.addEventListener)
		opera.addEventListener('BeforeEvent.mousedown',function(mdev){ return function(ujsev){ if(ujsev.event.dynamicEvent){ ujsev.preventDefault();return } mdev(ujsev.event) } }(events.mousedown),false);
	else
		addEventListener('mousedown',events.mousedown,true);
	addEventListener('focus', events.focus, true);
	addEventListener('blur', events.blur, true);
	delete events.mousedown; delete events.focus; delete events.blur;
})(opera,getSelection,addEventListener,Node.prototype.selectSingleNode,Element.prototype.getBoundingClientRect,window)