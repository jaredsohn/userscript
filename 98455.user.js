// ==UserScript==
// @name            S4W 
// @version         1.0
// @namespace       http://userscripts.org/users/257845
// @description     This script makes all 4chan boards safe for work by masking images on NSFW boards. The masked images will fade into visibility when your mouse hovers over them. Also curses masked out with ***. Text masking for racial slurs can be enabled as well. All masked text will appear when your mouse hovers over the stars "***". All the settings can be controlled from a small floating control tab located on the top right of the screen. Hovering your mouse over the tab will expand it showing the settings.
// @icon            data:image/png;base64,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
// @include         http://boards.4chan.org/*
// ==/UserScript==

if(document.title.indexOf('404')==-1)document.wrappedJSObject.S4W={
	filters:['image','curse','slur'],
	green:'#009700',
	light_green:'#A5F2A5',
	yellow:'#DDA800',
	light_yellow:'#FFECAE',
	red:'#D90000',
	light_red:'#FFBBBB',
	blue:'#0000D9',
	light_blue:'#BBBBFF',
	body:document.getElementsByTagName('body')[0],
	span:document.forms[1].getElementsByTagName('span'),
	blockquote:document.forms[1].getElementsByTagName('blockquote'),
	white:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi+P///waAAAMACawDrvCCI1YAAAAASUVORK5CYII=',
	yotsuba:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAEElEQVQIHWP48OAaEDFAKABKngqZGBApiQAAAABJRU5ErkJggg==',
	logo_out:'data:image/png;base64,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',
	logo_over:'data:image/png;base64,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',
	curses:[
		'[^l]ass',
		'tits',
		'titty',
		'tittie',
		'f[u]+ck',
		'boner',
		'hardon',
		'queer',
		'bastard',
		'sex',
		'pornography',
		' anus',
		'nipples',
		'nipple',
		'poop',
		'porn',
		'penis',
		'dick',
		'vagina',
		'slut',
		'cock',
		'pussy',
		'cunt',
		'shit',
		'bitch',
		'whore',
		'twat',
		'faggot',
		'fag',
		'douche',
		'bollocks',
		'wanker',
		'nigga',
		'nigger',
		'nigress',
		'niglet',
		'spic',
		'polack'
	],
	slurs:[
		'chink',
		'flip',
		'gook',
		'jew',
		'goyim',
		'goyum',
		'gringo',
		'hajji',
		'hadji',
		'haji',
		'halfbreed',
		'half.breed',
		'heeb',
		'hebe',
		'honky',
		'honkey',
		'honkie',
		'injun',
		'junglebunny',
		'jungle.bunny',
		'junglemonkey',
		'jungle.monkey',
		'kyke',
		'kike',
		'kraut',
		'limey',
		'raghead',
		'rag.head',
		'towelhead',
		'towel.head',
		'sambo',
		'slopehead',
		'spook',
		'wetback',
		'squaw ',
		'wop',
		'zipperhead',
		'nigga',
		'nigger',
		'nigress',
		'niglet',
		'spic',
		'polack'
	],
	image:{
		active:GM_getValue('image')!='disabled'?true:false,
		status:GM_getValue('image')?GM_getValue('image'):'enabled',
		enabled:{
			out:'images filtered',
			over:'disable image filter'
		},
		disabled:{
			out:'images unfiltered',
			over:'enable image filter'
		}
	},
	curse:{
		active:GM_getValue('curse')!='disabled'?true:false,
		status:GM_getValue('curse')?GM_getValue('curse'):'enabled',
		enabled:{
			out:'profanity filtered',
			over:'disable profanity filter'
		},
		disabled:{
			out:'profanity unfiltered',
			over:'enable profanity filter'
		}
	},
	slur:{
		active:GM_getValue('slur')!='enabled'?false:true,
		status:GM_getValue('slur')?GM_getValue('slur'):'disabled',
		enabled:{
			out:'racial slurs filtered',
			over:'disable racial slur filter'
		},
		disabled:{
			out:'racial slurs unfiltered',
			over:'enable racial slur filter'
		}
	},
	mask:function(string){
		if(string){
			var mask='';
			string=string.toString();
			for(var i=0;i<string.length;i++){
				mask+='*';
			}
			var out='<span class="S4W_curses" sfw="'+mask+'" nsfw="'+string+'" onmouseover="this.innerHTML=this.getAttribute(\'nsfw\')" onmouseout="this.innerHTML=this.getAttribute(\'sfw\')">'+mask+'</span>';
			return out;
		}
	},
	Opacity:function(who,OP){
		who.style.filter='progid:DXImageTransform.Microsoft.Alpha(Opacity='+OP+')';
		who.style.filter='alpha(opacity='+OP+')';
		if(OP==100)OP='1';
		else OP=this.opacity.toString().length<2?'.0'+OP:'.'+OP;
		who.style.MozOpacity=OP;
		who.style.KhtmlOpacity=OP;
		who.style.opacity=OP;
	},
	fadeIn:function(who,O){
		var next=function(){document.wrappedJSObject.S4W.fadeIn(who)}
		this.opacity++;
		this.speed-=2;
		this.Opacity(who,this.opacity);
		if(this.opacity<100)this.timeout=setTimeout(next,this.speed);
		else clearTimeout(this.timeout);
	},
	tab_over:function(){
		this.children[1].style.display='inline';
		this.children[0].children[0].src=document.wrappedJSObject.S4W.logo_over;
	},
	tab_out:function(){
		this.children[1].style.display='none';
		this.children[0].children[0].src=document.wrappedJSObject.S4W.logo_out;
	},
	button_over:function(){
		var who=this.id.replace(/S4W_/,'');
		var S4W=document.wrappedJSObject.S4W;
		var color='yellow';
		this.style.border='1px solid '+S4W[color];
		this.style.color='#9B7600';
		this.style.background=S4W['light_'+color];
		this.innerHTML=S4W[who][S4W[who].status].over;
	},
	button_out:function(){
		var who=this.id.replace(/S4W_/,'');
		var S4W=document.wrappedJSObject.S4W;
		var color=S4W[who].active?'green':'red';
		this.style.border='1px solid '+S4W[color];
		this.style.color=S4W[color];
		this.style.background=S4W['light_'+color];
		this.innerHTML=S4W[who][S4W[who].status].out;
	},
	button_down:function(){
		var S4W=document.wrappedJSObject.S4W;
		var color='blue';
		this.style.border='1px solid '+S4W[color];
		this.style.color=S4W[color];
		this.style.background=S4W['light_'+color];
	},
	img_over:function(){
		var S4W=document.wrappedJSObject.S4W;
		S4W.opacity=0;
		S4W.speed=75;
		S4W.Opacity(this,0);
		this.style.borderColor='#F0E0D6';
		this.src=this.wrappedJSObject.nsfw.src;
		S4W.fadeIn(this);
	},
	img_out:function(){
		var S4W=document.wrappedJSObject.S4W;
		S4W.opacity=100;
		clearTimeout(S4W.timeout);
		S4W.Opacity(this.wrappedJSObject,100);
		this.src=this.getAttribute('sfw');
		this.style.border='dotted #ffffff';
	},
	imageFilter:function(filter){
		var nsfw=false
		var links=document.getElementsByTagName('link');
		for(var i=0;i<links.length;i++){
			if(links[i].rel.toLowerCase()=='stylesheet' && links[i].title.toLowerCase()=='yotsuba'){
				nsfw=true;
				break;
			}
		}
		if(nsfw){
			if(filter){
				for(var i=0;i<document.images.length;i++){
					if(document.images[i].src.indexOf('thumbs.4chan.org')!=-1){
						document.images[i].wrappedJSObject.nsfw=new Image();
						document.images[i].wrappedJSObject.nsfw.src=document.images[i].src;
						document.images[i].setAttribute('sfw',this.yotsuba);
						document.images[i].setAttribute('class','S4W_image');
						document.images[i].src=this.yotsuba;
						document.images[i].style.border='dashed 2px #ffffff';
						document.images[i].addEventListener('mouseover',this.img_over,true);
						document.images[i].addEventListener('mouseout',this.img_out,true);
					}
				}
			}
			else{
				for(var i=0;i<document.images.length;i++){
					if(document.images[i].src.indexOf(this.yotsuba)!=-1){
						document.images[i].src=document.images[i].wrappedJSObject.nsfw.src;
						delete document.images[i].wrappedJSObject.nsfw;
						document.images[i].removeAttribute('sfw');
						document.images[i].removeAttribute('class');
						document.images[i].style.border='none';
						document.images[i].removeEventListener('mouseover',this.img_over,true);
						document.images[i].removeEventListener('mouseout',this.img_out,true);
					}
				}
			}
		}
	},
	textFilter:function(who,filter){
		if(filter){
			this.match=new RegExp('('+this[who+'s'].join('|')+')(?!" onmouseover="this)','gi');
			for(var i=0;i<this.blockquote.length;i++){
				this.blockquote[i].innerHTML=this.blockquote[i].innerHTML.replace(this.match,this.mask);
			}
			for(var i=0;i<this.span.length;i++){
				if(this.span[i].id!='navbot'&&this.span[i].getAttribute('class')!='filesize')this.span[i].innerHTML=this.span[i].innerHTML.replace(this.match,this.mask);
			}
		}
		else{
			this.match=new RegExp('<span.*('+this[who+'s'].join('|')+').*/span>','gi');
			for(var i=0;i<this.blockquote.length;i++){
				this.blockquote[i].innerHTML=this.blockquote[i].innerHTML.replace(this.match,'$1');
			}
			for(var i=0;i<this.span.length;i++){
				if(this.span[i].id!='navbot'&&this.span[i].getAttribute('class')!='filesize')this.span[i].innerHTML=this.span[i].innerHTML.replace(this.match,'$1');
			}
		}
	},
	toggle:function(){
		var who=this.id.replace(/S4W_/,'');
		var S4W=document.wrappedJSObject.S4W;
		var color=S4W[who].active?'red':'green';
		this.style.border='1px solid '+S4W[color];
		this.style.color=S4W[color];
		this.style.background=S4W['light_'+color];
		if(S4W[who].active){
			GM_setValue(who,'disabled');
			S4W[who].active=false;
			S4W[who].status='disabled';
			this.innerHTML=S4W[who].disabled.out;
			if(who=='image')S4W.imageFilter(false);
			else S4W.textFilter(who,false);
		}
		else{
			GM_setValue(who,'enabled');
			S4W[who].active=true;
			S4W[who].status='enabled';
			this.innerHTML=S4W[who].enabled.out;
			if(who=='image')S4W.imageFilter(true);
			else S4W.textFilter(who,true);
		}
	},
	load:function(){
		var tab=document.createElement('div');
		tab.setAttribute('id','S4W_tab');
		tab.style.right='0px';
		tab.style.border='solid 1px #000000';
		tab.style.top='30px';
		tab.style.MozBorderRadiusTopleft='5px';
		tab.style.MozBorderRadiusBottomleft='5px';
		tab.style.webkitBorderTopLeftRadius='5px';
		tab.style.webkitBorderBottomLeftRadius='5px';
		tab.style.borderTopLeftRadius='5px';
		tab.style.borderBottomLeftRadius='5px';
		tab.style.padding='5px';
		tab.style.position='fixed';
		tab.style.background='url('+this.white+')';
		var tab_html='<div style="float:left"><img src="'+this.logo_out+'" style="height:16px"/></div><div style="display:none;float:left">';
		for(var i=0;i<this.filters.length;i++){
			tab_html+='<span id="S4W_'+this.filters[i]+'"></span>';
		}
		tab.innerHTML=tab_html+'</div>';
		this.body.appendChild(tab);
		var S4W_tab=document.getElementById('S4W_tab');
		S4W_tab.addEventListener("mouseover",this.tab_over,true);
		S4W_tab.addEventListener("mouseout",this.tab_out,true);
		var element='';
		var color='';
		for(var i=0;i<this.filters.length;i++){
			if(this[this.filters[i]].active){
				if(this.filters[i]=='image')this.imageFilter(true);
				else this.textFilter(this.filters[i],true);
			}
			color=this[this.filters[i]].active?'green':'red';
			element=document.getElementById('S4W_'+this.filters[i]);
			element.innerHTML=this[this.filters[i]][this[this.filters[i]].status].out;
			element.style.MozBorderRadius='5px';
			element.style.webkitBorderRadius='5px';
			element.style.borderRadius='5px';
			element.style.cursor='pointer';
			element.style.marginLeft='5px';
			element.style.padding='1px 3px';
			element.style.border='solid';
			element.style.fontSize='12px';
			element.style.lineHeight='16px';
			element.style.border='1px solid '+this[color];
			element.style.color=this[color];
			element.style.background=this['light_'+color];
			element.addEventListener("click",this.toggle,true);
			element.addEventListener('mouseover',this.button_over,true);
			element.addEventListener('mouseout',this.button_out,true);
			element.addEventListener('mousedown',this.button_down,true);
		}
	}
}
if(document.wrappedJSObject.S4W)document.wrappedJSObject.S4W.load();