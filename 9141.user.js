// Flickr Photo Magnifier
// Copyright (c) 2007, Pierre Andrews.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name	Flickr Photo Magnifier
// @namespace	http://6v8.gamboni.org/Flickr-Photo-Magnifier.html
// @description Add a magnifier to the photo pages. Click+mouse drag will zoom in and out. You can configure the quality of the image through the greasemonkey user script menu. (magnifier code by Janos Pal Toth).
// @version        1.2
// @date           2007-06-26
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/photos/*/*
// @exclude http://*flickr.com/photos/*/organize*
// @exclude http://*flickr.com/photos/*/tags*
// ==/UserScript==



(function () {


	function M8_log() {
	  if(unsafeWindow.console)
	  unsafeWindow.console.log(arguments);
	  else
	  GM_log(arguments);
	}

		function $x1(xpath) {
		return document.evaluate(
								 xpath,
								 document,
								 null,
								 XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
	}


	/***********************************************************************
	 * Flickr Localisation
	 **********************************************************************/

	var FlickrLocaliser = function(locals) {
		this.init(locals);
	}
	FlickrLocaliser.prototype = {
		selectedLang: undefined,
		localisations: undefined,
		getLanguage: function() {
			if(!this.selectedLang) {
				var langA = $x1("//p[@class='LanguageSelector']//a[contains(@class,'selected')]");
				if(langA) {
					var matches = /\/change_language.gne\?lang=([^&]+)&.*/.exec(langA.href);
					if(matches && matches[1]) {
						this.selectedLang = matches[1];
						return this.selectedLang;
					}
				}
				return false;
			} else return this.selectedLang;
		},

		init: function(locals) {
			this.localisations = locals;
		},

		localise: function(string, params) {
			if(this.localisations && this.getLanguage()) {
				var currentLang = this.localisations[this.selectedLang];
				if(!currentLang) currentLang = this.localisations[this.localisations.defaultLang];
				var local = currentLang[string];
				if(!local) {
					local = this.localisations[this.localisations.defaultLang][string];
				} 
				if(!local) return string;
				for(arg in params) {
					var rep = new RegExp('@'+arg+'@','g');
					local = local.replace(rep,params[arg]);
				}
				local =local.replace(/@[^@]+@/g,'');
				return local;
			} else return undefined;
		}

	}

	/*****************************Flickr Localisation**********************/

	
	var localiser =  new FlickrLocaliser({
			'en-us' : {
				'loading' : 'loading ...',
				'switch' : 'switch on/off magnifier',
				'about' : 'The Flickr Magnifier is a little tool to add in place magnifier on flickr images. The original magnifier code has been provided by @jpl@, you can make him a donation at:@paypal@ The adaptation to Flickr photos has been made by @pa@.',
				'lower_quality' : 'Use lower quality zoom',
				'magnifier_width' : 'Magnifier width',
				'magnifier_height' : 'Magnifier height',
				'quality_note' : 'If you choose to use a lower quality zoom, the loading time for the magnifier will be faster, but the definition of the magnified area will be less',
				'menu_item' : 'Configure Flickr Photo Magnifier',
				'save' : 'Save',
				'cancel' : 'Cancel',
			},
			'fr-fr': {
				// A
				'about' : 'La Loupe Flickr (Flickr Magnifier) est un petit outil qui offre une loupe pour les images Flickr. Le code original de la loupe &agrave; &eacute;t&eacute; &eacute;crit par @jp@, vous pouvez lui faire un don &agrave;: @paypal@.L\'adaptation aux photos Flickr &agrave; &eacute;t&eacute; cod&eacute;e par @pa@.',
				// C
				'cancel' : 'Annuler',
				// L
				'loading' : 'Chargement ...',
				'lower_quality' : 'Utiliser une image de petite qualit&eacute;',
				// M
				'magnifier_height' : 'Hauteur de la loupe',
				'magnifier_width' : 'Largeur de la loupe',
				'menu_item' : 'Configurer la Loupe Flickr',
				// Q
				'quality_note' : 'Si vous utilisez une qualit&eacute; d\'image plus petite, le temps de chargement sera plus rapide, mais la qualit&eacute; de la loupe sera moindre',
				// S
				'save' : 'Sauver',
				'switch' : 'Activer/D&eacute;sactiver la loupe'
			},
			defaultLang: 'en-us'
		});

	//**********************************************************************

// TJPzoom 3 * JÃ¡nos PÃ¡l TÃ³th
// 2007.05.18
// Docs @ http://valid.tjp.hu/tjpzoom/ 
// News @ http://tjpzoom.blogspot.com/

function TJPzoomswitch(obj) {
 TJPon[obj]=((TJPon[obj])?(0):(1));
 return TJPon[obj];
}

function TJPzoomif(obj,highres) {
 if(TJPon[obj]) {TJPzoom(obj,highres);}
}
function TJPzoom(obj,highres) {
 TJPzoomratio=TJPzoomheight/TJPzoomwidth;
 if(TJPzoomoffsetx > 1) {
  TJPzoomoffset='dumb';
  TJPzoomoffsetx=TJPzoomoffsetx/TJPzoomwidth;
  TJPzoomoffsety=TJPzoomoffsety/TJPzoomheight;
 }
 if(!obj.style.width) {
  if(obj.width > 0) {
   //educated guess
   obj.style.width=obj.width+'px';
   obj.style.height=obj.height+'px';
  }
 }
 if(typeof(highres) != typeof('')) {highres=obj.src}
 var TJPstage=document.createElement("div");
 TJPstage.style.width=obj.style.width;
 TJPstage.style.height=obj.style.height;
 TJPstage.style.overflow='hidden';
 TJPstage.style.position='absolute';
 if(typeof(TJPstage.style.filter) != typeof(nosuchthing)) {
  //hi IE
  if(navigator.appVersion.indexOf('Mac') == -1) { //hi Mac IE
   TJPstage.style.filter='alpha(opacity=0)';
   TJPstage.style.backgroundColor='#ffffff';
  }
 } else {
  //hi decent gentlemen
  TJPstage.style.backgroundImage='transparent';
 }
 TJPstage.addEventListener('mousemove',function(event) {TJPhandlemouse(event,this);},true);
 TJPstage.addEventListener('mousedown',function(event) {TJPhandlemouse(event,this);},true);
 TJPstage.addEventListener('mouseup',function(event) {TJPhandlemouse(event,this);},true);
 TJPstage.addEventListener('mouseout',function(event) {TJPhandlemouse(event,this);},true);

 if(navigator.userAgent.indexOf('MSIE')>-1) {
  TJPstage.onmousemove = function() {TJPhandlemouse(event,this);}
  TJPstage.onmousedown = function() {TJPhandlemouse(event,this);}
  TJPstage.onmouseup = function() {TJPhandlemouse(event,this);}
  TJPstage.onmouseout = function() {TJPhandlemouse(event,this);}
 }
 obj.parentNode.insertBefore(TJPstage,obj);
 
 TJPwin=document.createElement("div");
 TJPwin.style.width='0px';
 TJPwin.style.height='0px';
 TJPwin.style.overflow='hidden';
 TJPwin.style.position='absolute';
 TJPwin.style.display='none';
 tw1='<div style="position:absolute;overflow:hidden;margin:';
 TJPwin.innerHTML= 
 tw1+TJPshadowthick+'px 0 0 '+TJPshadowthick+'px; background-color:'+TJPbordercolor+'; width:'+(TJPzoomwidth-TJPshadowthick*2)+'px;height:'+(TJPzoomheight-TJPshadowthick*2)+'px"></div>' +
 tw1+(TJPshadowthick+TJPborderthick)+'px 0 0 '+(TJPshadowthick+TJPborderthick)+'px; width:'+(TJPzoomwidth-TJPshadowthick*2-TJPborderthick*2)+'px;height:'+(TJPzoomheight-TJPshadowthick*2-TJPborderthick*2)+'px;"><img src="'+highres+'" style="margin:0;padding:0;border:0; width:'+(TJPzoomamount*parseInt(obj.style.width))+'px;height:'+(TJPzoomamount*parseInt(obj.style.height))+'px;" '+((highres != obj.src)?('onload="if(this.parentNode) {this.parentNode.parentNode.getElementsByTagName(\'div\')[2].style.display=\'none\';}"'):(''))+'/></div>';
 if(highres != obj.src) {
  TJPwin.innerHTML+='<div style="position:absolute; margin:'+(TJPshadowthick+TJPborderthick)+'px 0 0 '+(TJPshadowthick+TJPborderthick)+'px;">'+TJPloading+'</div>';
 }
 if(TJPshadowthick>0) {
  st1='<span style="position:absolute; display:inline-block; margin: ';
  st2='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=\'scale\',src='
  st3='filter:alpha(opacity=0);margin:0;padding:0;border:0;"/></span>';
  TJPwin.innerHTML+=
  st1+'0 0 0 0    ; width:'+TJPshadowthick*2+'px; height:'+TJPshadowthick*2+'px;'+st2+'\''+shadowNW+'.png\')"><img src="'+shadowNW+'.png" style="width:'+TJPshadowthick*2+'px; height:'+TJPshadowthick*2+'px;'+st3 +
  st1+'0 0 0 '+(TJPzoomwidth-TJPshadowthick*2)+'px; width:'+TJPshadowthick*2+'px; height:'+TJPshadowthick*2+'px;'+st2+'\''+shadowNE+'.png\')"><img src="'+shadowNE+'.png" style="width:'+TJPshadowthick*2+'px; height:'+TJPshadowthick*2+'px;'+st3 +
  st1+''+(TJPzoomheight-TJPshadowthick*2)+'px 0 0 0px; width:'+TJPshadowthick*2+'px; height:'+TJPshadowthick*2+'px;'+st2+'\''+shadowSW+'.png\',sizingMethod=\'scale\')"><img src="'+shadowSW+'.png" style="width:'+TJPshadowthick*2+'px; height:'+TJPshadowthick*2+'px;'+st3 +
  st1+''+(TJPzoomheight-TJPshadowthick*2)+'px 0 0 '+(TJPzoomwidth-TJPshadowthick*2)+'px; width:'+TJPshadowthick*2+'px; height:'+TJPshadowthick*2+'px;'+st2+'\''+shadowSE+'.png\',sizingMethod=\'scale\')"><img src="'+shadowSE+'.png" style="width:'+TJPshadowthick*2+'px; height:'+TJPshadowthick*2+'px;'+st3 +
  st1+'0 0 0 '+(TJPshadowthick*2)+'px; width:'+(TJPzoomwidth-TJPshadowthick*4)+'px; height:'+TJPshadowthick*2+'px;'+st2+'\''+shadowN+'.png\',sizingMethod=\'scale\')"><img src="'+shadowN+'.png" style="width:'+(TJPzoomwidth-TJPshadowthick*4)+'px; height:'+TJPshadowthick*2+'px;'+st3 +
  st1+''+(TJPshadowthick*2)+'px 0 0 0; width:'+(TJPshadowthick*2)+'px; height:'+(TJPzoomheight-TJPshadowthick*4)+'px;'+st2+'\''+shadowW+'.png\',sizingMethod=\'scale\')"><img src="'+shadowW+'.png" style="width:'+(TJPshadowthick*2)+'px; height:'+(TJPzoomheight-TJPshadowthick*4)+'px;'+st3 +
  st1+''+(TJPshadowthick*2)+'px 0 0 '+(TJPzoomwidth-TJPshadowthick*2)+'px; width:'+(TJPshadowthick*2)+'px; height:'+(TJPzoomheight-TJPshadowthick*4)+'px;'+st2+'\''+shadowE+'.png\',sizingMethod=\'scale\')"><img src="'+shadowE+'.png" style="width:'+(TJPshadowthick*2)+'px; height:'+(TJPzoomheight-TJPshadowthick*4)+'px;'+st3 +
  st1+''+(TJPzoomheight-TJPshadowthick*2)+'px 0 0 '+(TJPshadowthick*2)+'px; width:'+(TJPzoomwidth-TJPshadowthick*4)+'px; height:'+TJPshadowthick*2+'px;'+st2+'\''+shadowS+'.png\',sizingMethod=\'scale\')"><img src="'+shadowS+'" style="width:'+(TJPzoomwidth-TJPshadowthick*4)+'px; height:'+TJPshadowthick*2+'px;'+st3;
 }
 ;
 //marker - zoomer
 obj.parentNode.insertBefore(TJPwin,TJPstage);

 //TJPmark=document.createElement("div");
 //TJPmark.style.width=(TJPzoomwidth-TJPborderthick*2-TJPshadowthick*2)/TJPzoomamount+'px';
 //TJPmark.style.height=(TJPzoomheight-TJPborderthick*2-TJPshadowthick*2)/TJPzoomamount+'px';
 //TJPmark.style.margin='30px 0 0 50px';
 //TJPmark.style.position='absolute';
 //TJPmark.style.backgroundColor='#ffee00';
 //TJPmark.style.opacity='.3';

 //obj.parentNode.insertBefore(TJPmark,TJPstage);


 TJPresize(obj);
}

function TJPresize(obj) {
 sbr=0; sbl=0;
 if(TJPzoomwidth-2*TJPborderthick-3*TJPshadowthick < 22) {sbr=1}
 if(TJPzoomheight-2*TJPborderthick-3*TJPshadowthick < 22) {sbr=1}
 if(TJPzoomwidth > parseFloat(obj.style.width)) {sbl=1;}
 if(TJPzoomheight > parseFloat(obj.style.height)) {sbl=1}
 
 if(sbr==1 && sbl == 1) {
  TJPzoomwidth=parseFloat(obj.style.width)/2;
  TJPzoomheight=parseFloat(obj.style.height)/2;
  TJPzoomratio=TJPzoomheight/TJPzoomwidth;
 }

 if(sbr==1) {
  if(TJPzoomwidth<TJPzoomheight) {
   TJPzoomheight=TJPzoomheight/TJPzoomwidth*(22+2*TJPborderthick+3*TJPshadowthick); TJPzoomwidth=22+2*TJPborderthick+3*TJPshadowthick;
  } else {
   TJPzoomwidth=TJPzoomwidth/TJPzoomheight*(22+2*TJPborderthick+3*TJPshadowthick); TJPzoomheight=22+2*TJPborderthick+3*TJPshadowthick;
  }
 }
 

 if(sbl==1) {
  if(parseFloat(obj.style.width)/parseFloat(obj.style.height) > TJPzoomwidth/TJPzoomheight) {
   TJPzoomheight=parseFloat(obj.style.height);
   TJPzoomwidth=TJPzoomheight/TJPzoomratio;
  } else {
   TJPzoomwidth=parseFloat(obj.style.width);
   TJPzoomheight=TJPzoomratio*TJPzoomwidth;
  }
 }

 TJPzoomwidth=Math.floor(TJPzoomwidth/2)*2;
 TJPzoomheight=Math.floor(TJPzoomheight/2)*2;

 ww=obj.parentNode.getElementsByTagName('div')[0];
 ww.style.width=TJPzoomwidth+'px';
 ww.style.height=TJPzoomheight+'px';
 w=ww.getElementsByTagName('div')[0];
 w.style.width=TJPzoomwidth-TJPshadowthick*2+'px';
 w.style.height=TJPzoomheight-TJPshadowthick*2+'px';
 w=ww.getElementsByTagName('div')[1];
 w.style.width=TJPzoomwidth-TJPshadowthick*2-TJPborderthick*2+'px';
 w.style.height=TJPzoomheight-TJPshadowthick*2-TJPborderthick*2+'px';
 if(TJPshadowthick > 0) {
  w=ww.getElementsByTagName('span')[1]; w.style.margin='0 0 0 '+(TJPzoomwidth-TJPshadowthick*2)+'px';
  w=ww.getElementsByTagName('span')[2]; w.style.margin=(TJPzoomheight-TJPshadowthick*2)+'px 0 0 0px';
  w=ww.getElementsByTagName('span')[3]; w.style.margin=(TJPzoomheight-TJPshadowthick*2)+'px 0 0 '+(TJPzoomwidth-TJPshadowthick*2)+'px';

  w=ww.getElementsByTagName('span')[6]; w.style.margin=(TJPshadowthick*2)+'px 0 0 '+(TJPzoomwidth-TJPshadowthick*2)+'px';
  w=ww.getElementsByTagName('span')[7]; w.style.margin=(TJPzoomheight-TJPshadowthick*2)+'px 0 0 '+(TJPshadowthick*2)+'px';

  www=(TJPzoomwidth-TJPshadowthick*4)+'px';
  w=ww.getElementsByTagName('span')[4]; w.style.width=www;
  w=w.getElementsByTagName('img')[0]; w.style.width=www;
  w=ww.getElementsByTagName('span')[7]; w.style.width=www;
  w=w.getElementsByTagName('img')[0]; w.style.width=www;
  
  www=(TJPzoomheight-TJPshadowthick*4)+'px';
  w=ww.getElementsByTagName('span')[5]; w.style.height=www;
  w=w.getElementsByTagName('img')[0]; w.style.height=www;
  w=ww.getElementsByTagName('span')[6]; w.style.height=www;
  w=w.getElementsByTagName('img')[0]; w.style.height=www;
 }
}

function TJPfindposy(obj) {
 var curtop = 0;
 if(!obj) {return 0;}
 if (obj.offsetParent) {
  while (obj.offsetParent) {
   curtop += obj.offsetTop
   obj = obj.offsetParent;
  }
 } else if (obj.y) {
  curtop += obj.y;
 }
 return curtop;
}

function TJPfindposx(obj) {
 var curleft = 0;
 if(!obj) {return 0;}
 if (obj && obj.offsetParent) {
  while (obj.offsetParent) {
   curleft += obj.offsetLeft
   obj = obj.offsetParent;
  }
 } else if (obj.x) {
  curleft += obj.x;
 }
 return curleft;
}


function TJPhandlemouse(evt,obj) {
 var evt = evt?evt:window.event?window.event:null; if(!evt) { return false; }
 if(evt.pageX) {
  nowx=evt.pageX-TJPfindposx(obj)-TJPadjustx;
  nowy=evt.pageY-TJPfindposy(obj)-TJPadjusty;
 } else {
  if(document.documentElement && document.documentElement.scrollTop) {
   nowx=evt.clientX+document.documentElement.scrollLeft-TJPfindposx(obj)-TJPadjustx;
   nowy=evt.clientY+document.documentElement.scrollTop-TJPfindposy(obj)-TJPadjusty;
  } else {
   nowx=evt.x+document.body.scrollLeft-TJPfindposx(obj)-TJPadjustx;
   nowy=evt.y+document.body.scrollTop-TJPfindposy(obj)-TJPadjusty;
  }
 }
 if(evt.type == 'mousemove') {
  TJPsetwin(obj,nowx,nowy);
 } else if(evt.type == 'mousedown') {
  TJPmouse=1; //left: 1, middle: 2, right: 3
  TJPmousey=nowy;
  TJPmousex=nowx;
 } else if(evt.type =='mouseup') {
  TJPmouse=0;
 } else if(evt.type =='mouseout') {
  TJPmouse=0;
  if(navigator.appVersion.indexOf('Mac') == -1 || navigator.appVersion.indexOf('MSIE') == -1) { //hi Mac IE
   x=obj.parentNode;
   x.removeChild(x.getElementsByTagName('div')[0]);
   x.removeChild(x.getElementsByTagName('div')[0]);
   //x.removeChild(x.getElementsByTagName('div')[0]); //AAAAAAAAAAAAAAAAAAAAAAAAAA
  }
 }
}


// TJPzoom 3 * JÃ¡nos PÃ¡l TÃ³th
// Docs @ http://valid.tjp.hu/tjpzoom/ 
// News @ http://tjpzoom.blogspot.com/


function TJPsetwin(obj,nowx,nowy) {
 obj.parentNode.getElementsByTagName('div')[0].style.display='block';
 if(TJPzoomoffset=='smart') {
  TJPzoomoffsetx=nowx/parseFloat(obj.style.width);
  TJPzoomoffsety=nowy/parseFloat(obj.style.height);
 }

 stage=obj.parentNode.getElementsByTagName('div')[0];
 if(TJPmouse == 1) {
  if(Math.abs(nowy-TJPmousey) >= 1) {
   TJPzoomamount*=((nowy>TJPmousey)?(0.909):(1.1));
   TJPmousey=nowy;
   if(TJPzoomamount < TJPzoomamountmin) {TJPzoomamount=TJPzoomamountmin;}
   if(TJPzoomamount > TJPzoomamountmax) {TJPzoomamount=TJPzoomamountmax;}
   stage.getElementsByTagName('div')[1].getElementsByTagName('img')[0].style.width=  parseInt(obj.style.width)*TJPzoomamount+'px';
   stage.getElementsByTagName('div')[1].getElementsByTagName('img')[0].style.height=  parseInt(obj.style.height)*TJPzoomamount+'px';
  }
  if(Math.abs(nowx-TJPmousex) >= 12 && TJPzoomwindowlock==0) {
   TJPzoomwidth*=((nowx>TJPmousex)?(1.1):(0.909));
   TJPzoomheight=TJPzoomwidth*TJPzoomratio;
   TJPresize(obj);
   TJPmousex=nowx;
  }
 }
 stage.style.marginLeft=nowx-(TJPzoomwidth -2*TJPborderthick-2*TJPshadowthick)*TJPzoomoffsetx-TJPborderthick-TJPshadowthick+'px';
 stage.style.marginTop= nowy-(TJPzoomheight-2*TJPborderthick-2*TJPshadowthick)*TJPzoomoffsety-TJPborderthick-TJPshadowthick+'px';
 clip1=0; clip2=TJPzoomwidth; clip3=TJPzoomheight; clip4=0;
 nwidth=TJPzoomwidth; nheight=TJPzoomheight;
 /*tmp=(1-2*TJPzoomoffsetx)*(TJPborderthick+TJPshadowthick);
 
 if(nowx-TJPzoomwidth*TJPzoomoffsetx < tmp) {
  clip4=TJPzoomwidth*TJPzoomoffsetx-nowx + tmp;
 } else if(parseFloat(nowx-TJPzoomwidth*TJPzoomoffsetx+TJPzoomwidth) > parseFloat(obj.style.width)+tmp) {
  clip2= TJPzoomwidth*TJPzoomoffsetx - nowx + parseFloat(obj.style.width)+tmp;
  nwidth=TJPzoomwidth*TJPzoomoffsetx-nowx+parseInt(obj.style.width)+TJPborderthick+TJPshadowthick;
 }
 
 tmp=(1-2*TJPzoomoffsety)*(TJPborderthick+TJPshadowthick);
 
 if(nowy-TJPzoomheight*TJPzoomoffsety < tmp) {
  clip1=TJPzoomheight*TJPzoomoffsety-nowy+tmp;
 } else if(parseFloat(nowy-TJPzoomheight*TJPzoomoffsety+TJPzoomheight) > parseFloat(obj.style.height)+tmp) {
  clip3= TJPzoomheight*TJPzoomoffsety - nowy + parseFloat(obj.style.height)+tmp;
  nheight=TJPzoomheight*TJPzoomoffsety - nowy + parseFloat(obj.style.height)+TJPborderthick+TJPshadowthick;
  }*/
 stage.style.width=nwidth+'px';
 stage.style.height=nheight+'px';
 
 // stage.style.clip='rect('+clip1+'px,'+clip2+'px,'+clip3+'px,'+clip4+'px)';

 if(nowy-TJPzoomoffsety*(TJPzoomheight-2*TJPborderthick-2*TJPshadowthick) < 0) { t=-(nowy-TJPzoomoffsety*(TJPzoomheight-2*TJPborderthick-2*TJPshadowthick))} 
 else if(nowy-TJPzoomoffsety*(TJPzoomheight-2*TJPborderthick-2*TJPshadowthick) > parseFloat(obj.style.height)-TJPzoomheight+TJPborderthick*2+TJPshadowthick*2) { t=-TJPzoomamount*parseFloat(obj.style.height)+TJPzoomheight-TJPborderthick*2-TJPshadowthick*2-((nowy-TJPzoomoffsety*(TJPzoomheight-2*TJPborderthick-2*TJPshadowthick))-(parseFloat(obj.style.height)-TJPzoomheight+TJPborderthick*2+TJPshadowthick*2)); }
 else { t=(-TJPzoomamount*parseFloat(obj.style.height)+TJPzoomheight-TJPborderthick*2-TJPshadowthick*2)/(parseFloat(obj.style.height)-TJPzoomheight+TJPborderthick*2+TJPshadowthick*2)*(nowy-TJPzoomoffsety*(TJPzoomheight-2*TJPborderthick-2*TJPshadowthick)) }
 stage.getElementsByTagName('div')[1].getElementsByTagName('img')[0].style.marginTop=t+'px';

 if(nowx-TJPzoomoffsetx*(TJPzoomwidth-2*TJPborderthick-2*TJPshadowthick) < 0) { t=-(nowx-TJPzoomoffsetx*(TJPzoomwidth-2*TJPborderthick-2*TJPshadowthick))} 
 else if(nowx-TJPzoomoffsetx*(TJPzoomwidth-2*TJPborderthick-2*TJPshadowthick) > parseFloat(obj.style.width)-TJPzoomwidth+TJPborderthick*2+TJPshadowthick*2) { t=-TJPzoomamount*parseFloat(obj.style.width)+TJPzoomwidth-TJPborderthick*2-TJPshadowthick*2-((nowx-TJPzoomoffsetx*(TJPzoomwidth-2*TJPborderthick-2*TJPshadowthick))-(parseFloat(obj.style.width)-TJPzoomwidth+TJPborderthick*2+TJPshadowthick*2)); }
 else { t=(-TJPzoomamount*parseFloat(obj.style.width)+TJPzoomwidth-TJPborderthick*2-TJPshadowthick*2)/(parseFloat(obj.style.width)-TJPzoomwidth+TJPborderthick*2+TJPshadowthick*2)*(nowx-TJPzoomoffsetx*(TJPzoomwidth-2*TJPborderthick-2*TJPshadowthick)) }
 stage.getElementsByTagName('div')[1].getElementsByTagName('img')[0].style.marginLeft=t+'px';
 
 
 //document.getElementsByTagName('h1')[0].innerHTML=;
}

function TJPinit() {
 TJPadjustx=0; TJPadjusty=0;
 if(navigator.userAgent.indexOf('MSIE')>-1) {TJPadjustx=2;TJPadjusty=2;}
 if(navigator.userAgent.indexOf('Opera')>-1) {TJPadjustx=0; TJPadjusty=0;}
 if(navigator.userAgent.indexOf('Safari')>-1) {TJPadjustx=1; TJPadjusty=2;}
}

// configuration - do not modify the following, instead read the behaviors.html file in the tutorial!
var TJPon=new Array();
var TJPadjustx,TJPadjusty;
var TJPmouse=0; var TJPmousey;
var TJPloading='<div style="background-color: #ffeb77; color: #333333; padding:2px; font-family: verdana,arial,helvetica; font-size: 10px;">'+localiser.localise('loading')+'</div>';

var TJPzoomwidth= 160;
var TJPzoomheight= 120;
var TJPzoomratio;
var TJPzoomwindowlock=0;

var TJPzoomoffsetx=TJPzoomwidth/2;
var TJPzoomoffsety=TJPzoomheight/2;
var TJPzoomoffset;

var TJPzoomamount=4;
var TJPzoomamountmax=12;
var TJPzoomamountmin=1;

var TJPborderthick=1;
var TJPbordercolor='#000000';

var TJPshadowthick=8;

var shadowN = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%D7%04%1A%16%1E9%9A%24%FF%19%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%15IDATx%DAc%60%18%05%C3%000B%F1(%18%05%14%01%00%08%9E%00%03%83%17%0BH%00%00%00%00IEND%AEB%60%82";
var shadowNE = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%D7%04%1A%16%1C1%A6%C9%15%A9%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%88IDATx%DA%ED%90%CB%0A%830%10E%13M%AA(t%D7%AD%82%FF%FFk%BA%F0I%F1%11o%E0%06B7%8E%DB%E2%C0a%20d%CE%3C%94z%E2%0FB%93%3B%E1~%05W%F1b%3E%A2%EC%82(%15%08%DE%C0%02%03%92%A8%A9XP%81%1Cd%D1%FF%B0%863%02A%0DV%B0%80%01%F4%D1*%87D%D0%80%2F%18A%CB7%2F%DC%C0.%9D%C0w%EF8%FAL%99%CFZ%22%F8%80%89%C5%13%EFa%C3A%25%82%92%C5%05%0FiyL%2FP'%B6%E5%1E%5D%DCX%24%10%00%00%00%00IEND%AEB%60%82";
var shadowE = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%D7%04%1A%16%1D%0F~%B39C%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%2BIDATx%DAcd%20%0C%D6%02%F1%17%20~%05%C4%0F%80%F8%0E%94~%0D%12g%22%C2%00%BC%60%D4%80Q%03F%0D%18%2C%06%00%00l%95%07%26%D9%C2%1F%9D%00%00%00%00IEND%AEB%60%82";
var shadowSE = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%D7%04%1A%16%1D(%DB%B9%8C(%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%9EIDATx%DA%ED%92A%0E%83%20%10E%B11%3D%40%EF%7F%85%DE%C8%85k%9B%D8%C4%9AR%A32~%F0O3%2B%60%D5U'y%40L%E6%F1A%1AW%AE%3B%98%C1%00z%D0q~%C4%EF%97%0AA%B6%FE%82%1F%09%02%11%83%D3u%EB%CE%FF%9Ck%5E%C9%06v%23K%15%05sA%10%1B%DFd%A1LEI0d%04B%81%07O%F0%02%1FJ%82%1E%A1%2F%DC%C1%C6%9Dc%D2%91%92%C5%0A%BAB%02%E1%8E%9E%CD%93IQ%95%40xfM%E2m%82%06%C3%ADB%20lP%D1N%92%E0%EA%EA*%98%F9%FB%1E%0E%F1sO6%10%CB%E6%9B%00%00%00%00IEND%AEB%60%82";
var shadowS = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%D7%04%1A%16%1D8%C6%0E%9CL%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%000IDATx%DAc%60%18%05%A3%80%81%81%11%88%D7Rb%00%0B%10%7F%A1%D4%80W%94%1A%F0%80R%03%EE%0C%A8%0B%40%B1%20D%A9%01l%94%18%00%002V%05W%11%99%89%DE%00%00%00%00IEND%AEB%60%82";
var shadowSW = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%D7%04%1A%16%1E%13A%9F6%CF%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%89IDATx%DA%ED%92K%0A%800%0CD%5B%AB%A2%E0R%B7%BA%F0%FE%97%13%2B%FEu%22%11%A5%0B%1B%10%5C9%F0%08%FDM%9A%B4J%3DK%7B%D6U%E0%DB%F0%1B%7C%60%F0Z%DEw%86%22%90%81%02%94%A0%06%15%C8i%3E%14%26Z%C1%02%260%80%8E%D1F%D8'J%14%83%14%24%3C%26%8D%12%03*%D38%D0%8Dz%D0J%0D%EEq%E6%C3%164%92%1El%9Cq%B8%19X.%C3H%5E%C1-%23%E4H%BD%D1R%83%D3D%AB%EB%F3%1Dq%07%2C%D4%13%98%99%83%B5%22%00%00%00%00IEND%AEB%60%82";
var shadowW = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%D7%04%1A%16%1E%20%FEOW%D9%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%1CIDATx%DAc%60%C0%0F%18%09%C830%11R0j%C0%A8%01%A3%06%0C%15%03%00D%F0%00%20zzK%0C%00%00%00%00IEND%AEB%60%82";
var shadowNW = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%D7%04%1A%16%1E%2Fn%F0JH%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%15IDATx%DAc%60%18%05%C3%000%D2I%CF(%18%E6%00%00%08n%00%03%9BHo7%00%00%00%00IEND%AEB%60%82";

if(GM_getValue('zoomwidth')) {
	TJPzoomwidth = GM_getValue('zoomwidth');
	TJPzoomoffsetx=TJPzoomwidth/2
}
if(GM_getValue('zoomheight')) {
	TJPzoomheight = GM_getValue('zoomheight');
	TJPzoomoffsety=TJPzoomheight/2;
}


TJPinit();



// TJPzoom 3 * Jï¿½nos Pï¿½l Tï¿½th
// Docs @ http://valid.tjp.hu/tjpzoom/ 
// News @ http://tjpzoom.blogspot.com/


//**********************************************************************

	//======================================================================
	//to do the closure and get the right this.
	//adapted from http://persistent.info/greasemonkey/gmail.user.js

	function getObjectMethodClosure2(object, method,args,args1,args2) {
		return function() {
			return object[method](args,args1,args2); 
		}
	}
	function getObjectMethodClosure1(object, method,args,args1) {
		return function() {
			return object[method](args,args1); 
		}
	}

	function getObjectMethodClosure0(object, method,args) {
		return function() {
			return object[method](args); 
		}
	}

	function getObjectMethodClosure(object, method) {
		return function(args) {
			return object[method](args); 
		}
	}

		/*
	  Xpath trickery, from:
	  http://ecmanaut.blogspot.com/2006/07/expressive-user-scripts-with-xpath-and.html
	 */
	function $x( xpath, root )
		{
			var doc = root ? root.evaluate?root:root.ownerDocument : document;
			var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
			var result = [];
			while( next = got.iterateNext() )
				result.push( next );
			return result;
		}


	function $x1(xpath) {
		return document.evaluate(
								 xpath,
								 document,
								 null,
								 XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
	}

	function foreach( xpath, cb, root )
	{
		var nodes = $x( xpath, root ), e = 0;
		for( var i=0; i<nodes.length; i++ )
			e += cb( nodes[i], i ) || 0;
		return e;
	}

	var useLarge = !!GM_getValue('useLarge');

	var init = function() {
		var img_div = $x1("//div[@class='photoImgDiv']/img");
		if(img_div && (img_div.parentNode.childNodes.length == 1)) {
			var med_width;
			var med_height;
			var med_src;
			var big_width;
			var big_height;
			var big_src;
			var found_large = false;
			var listener = {
				flickr_photos_getSizes_onLoad: function(success, responseXML, responseText, params){
					try{
						var rsp = responseText.replace(/jsonFlickrApi\(/,'');
						rsp = eval('('+rsp);
						if(rsp.stat == 'ok') {
							var lrg_src;
							var lrg_width;
							for(var i=0;i<rsp.sizes.size.length;i++) {
								var size = rsp.sizes.size[i];
								if(size.label == 'Medium') {
									med_src = size.source;
									med_width = size.width;
								} else if(size.label == 'Large') {
									lrg_src = size.source;
									lrg_width = size.width;
								} else if(size.label == 'Original') {
									big_src = size.source;	
									big_width = size.width;								
								}
									
							}
							if(lrg_src && ((!useLarge && !big_src) || useLarge)){
								big_src = lrg_src;
								big_width = lrg_width;
							}

							if(med_src && big_src) {
								TJPzoomamount = big_width/med_width;
								img_div.addEventListener('mouseover',function(event) {
									TJPzoomif(img_div,big_src)
										}
														 ,true);
								var buttonBar = document.getElementById('button_bar');
								var divbut = buttonBar.appendChild(document.createElement('span'));
								divbut.setAttribute('style','height:24px;font-size:90%;');
								var magButton = divbut.appendChild(document.createElement('img'));
								magButton.setAttribute('style','height:24px;');
								//Icon by Janos Pal Toth
								var offButton = magButton.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%001%00%00%00%18%08%02%00%00%00%DC%5D%82%B5%00%00%00%07tIME%07%D7%05%09%10%05%0E%F0%EE%3C%FF%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%011IDATx%DA%ED%96%C1%0E%820%0C%86%87%E1%19%7C%01O%5E%7C6%0F%5E%09%04%8Ez%F0%D9%E0%40H%F4%05%7C%89%D9%A4%A1%19m77c%00%13%FE%90%A5ec%7CiKGf%AD5%2B%D3ni%80%8D%E9k%E5%BE%89%5B%D3%A0q)%8A%E5%99%90%86P%98%3B%87%ECT%D7%BAF%A3%1D%C5%EE%A3%CA%B2%A4%91%19(f%93%2B%D7%CB%95z%3Du%5D%07%E3%BD%DD%A3%8D%AE%AA%AA%AA%5C%9BDS4%BAS%F2A%F7%CE%24w%90%26%C8%91Jp8%1EqV2%B9%AFa%BB%FB%E8%D9%83Lz%8Dc%84%C88%9F%5E%91%95%E0F%C57%F5q%13%9D%09!%00(%86F%86'%E6%C5%81Pe%EClq%D3GL%8Fax%F6%BD%99%EB%EB%D3k%1C%20(Zh%CF%06%A4%C4%C9%8C%0D%09%8A%1A%5D%8CP%18%8BeMM%A5%2C5o%99%5B%8F%A0!%D1%E5%BA%D6%2F%B5i%A9%AD%88%B5%2B%26%EFy%07!%A1%CB%88%B6%AE%86*%A9%B4%03%8B%13%CE%E0%00V%3C%10%CB%B5%AA%3Cv%9B%11%0B%81%24%04%EB%D7F%14P%02%B4M%97%AF%0E~%25%E5%BB%5B%5Ck%FC%A7%DB%98%FE%97%E9%0DW%1B94%E9%07%06%FD%00%00%00%00IEND%AEB%60%82";
								var overButton = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%001%00%00%00%18%08%02%00%00%00%DC%5D%82%B5%00%00%00%07tIME%07%D7%05%09%10%05!%5B%3F%01%A6%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%01qIDATx%DA%ED%97%3DN%C40%10%85m%B4%02q%81%3DB%1A%24z~%9A%E5%0EHt%14%1C%83%9AKD%A2%A0C%E2%0ElC%B5%25%12H%7B%05.%80%A0%09%D6%3E%E9iv~%82%B3Bd%8B%7DE4%8E'%F1%E7%F1x%E2%E4%AE%EB%D26%A9m%DB%BD%B1%19%1C%ED%98%EA4%89%3A%0E%0F%F6a%7C~%7D%8F%CF%04%1A%A2%A8%E6%08L%85%00%C3%BF%BC%BE%C98%F1%3E%94s.%1B%16W6a%C0%01%BD%B4%D9e%FD%AD%A7%9FO%00%BA%BC%FF%80M%3E%2B%BE%8E%03%40%1C%40%8E-%87%97%0FJO%CD%84%60%B8%04w%0F%8F%CC0)5%CB%BCRD%AF8%22O%3F%C7%11!%1AO7%D3T'%B54n%D7%AF%2F%F1%99%00Q%80jh8c%95%16%F5%0F*%AD%AD%5DY%B8%B2%40%E7%C7G%CAi%F1%BE%BC%BD%BE%B2%93%E6%D8l2%99%14%9C%F5%8C%1CR%94%E3%05%82%D1%82%9D%FE%B1%1C%E8%B5C%A8%D2*%A9q%87%11R%E5%40%AAg%DB%A7%A0%0A%A4%20%ED%92%9BO%2CH%164%C2%92(%B6%F6%F4%D7%A4*%26IV%8F%15M%DA%9D%40%3F%D6%80o%B0%FA%DAl%06%24%E3%1Ai%D8%B9%80X%17%B3%99%C5b%DE%C0%E6%16%93%CD%1A%0D%3E%AB%14%AC%93%D3%B3%E7%F9%5C%CD%5BV%01%5B%11%DC%3D%1FQnr~R%40%7F%AEm%3C%D3%ED%98%EA4)%FF.c3%AC%A9i%9A%1F%A5%C3%3A%C6%DCQW%10%00%00%00%00IEND%AEB%60%82";
								var onButton = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%001%00%00%00%18%08%06%00%00%00S%3F%15%E2%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%07tIME%07%D7%05%09%15%3B%15%3D%85%2C%85%00%00%01%ACIDATX%C3%ED%97%3Bn%C2%40%10%86%FFA%A9%B8%82%5Br%02%94%9E%0B%D0%A3%B4%96CI%C1%05r%01%0A%CA%80%DC%A2%F4%BE%00%A9%23N%90%B4%CE%11h7%05%5E%7Bv3%FB%B0-%25%8E%E4%91%2C%EF%5B%F3%CDxf%D6%C0(%C3%10%F2%CE%A6%9F%0F%00%A6l%E4%8A%7C%F6%FE%3F%20%1A%E53%00%09%9B)%01%1C%87%06C%0E%80%8DV%FE%25%DF.%F4%D4%3A%DD%9D%19%CC~(%20%E4%02%D0%CA%3F-%1F%EB%E9Cq%E20%83%01%B9%B3%FAS%0DP%2B_%7C%D4%93%F5X%BE%5DT%20%3C%5ETe%14%C5%8Cc%B7%B9%F1%94%60L%25%F4I8%DF%D87%B1%BC%90%19H%15%00%A5%AB%A6%CF%A0%00d%D5%3E%5B%94%D0'%F6%40x%F35%CAs%96%BD%8FA%D8%5E0%955d%8ED%C7Jby%C3gi%25(%24%C1%AB%C0Y%C1%CF%C9%DC%AD%3D%C0%DA*%7F%ED%1B%7F%CA%93%DA%C9a%7Dt%86%D0%0AS%BA%EA%A2%3C%B7%A0%8A%AEM%E1%B3~%C8%C4(d%40%B9Nw%E7Cq%02%96%F7%E2%86%0B%BEpA%E9%B3%229%C6H%00%A0%40%9B%22%D62%88%5B%AA%3C%DA%0As%8F%E8%BE%95f%AF%83%AF%13sV%B0m%0FD%D4%8B%984%1AJ%AD%A18jW%B1%B5%E2B%15%0F%15%3E_%0D%F1%D5%02r%40%F7%BA%3B%E9%2BG%D2%02DE%14%2F%D7%98%B4%A6%F7-V'%80M%24%88%EF%B3%88%F5%0E%FAA%F8%E1%5C%20%CF%C8go%BF%19%13%93N%107K%EFuJ%F6d%2B)%B5%BAR-y%8CK%DD%7F%8AZx%E4%2Fo%B5%D4%FB%84%26n%06%F9%D77%CA(-%E5%1B%DA%09%D6%07%83%D7%5C%25%00%00%00%00IEND%AEB%60%82";
								magButton.alt = localiser.localise('switch');
								magButton.addEventListener('mouseover', function() {
															   if(magButton.src != onButton) {
																   magButton.src = overButton;
															   }
														   },true);
								magButton.addEventListener('mouseout', function() {
															   if(magButton.src != onButton) {
																   magButton.src = offButton;
															   }
														   },true);
								divbut.addEventListener('click',function() {
									if(TJPzoomswitch(img_div)) {
										magButton.src=onButton;
										img_div.parentNode.style.zIndex = 2000;
										img_div.parentNode.style.position = 'relative'; 
									} else {
										magButton.src=offButton;
										img_div.parentNode.style.zIndex = '';
										img_div.parentNode.style.position = ''; 
												
									}
								}, true);
								//								divbut.appendChild(document.createTextNode('Flickr Magnifier'));					
							}
						}
						else
						M8_log("Error2 "+responseText);							
					} catch (e) {
						M8_log("Error1 "+responseText);
						M8_log(e);
					}
				}
			};
				
			unsafeWindow.F.API.callMethod('flickr.photos.getSizes', {
				photo_id: unsafeWindow.page_photo_id,
							  format: 'json'
							  }, listener);
		}
	};

	var prompt_conf = function() {
		var back = document.body.appendChild(document.createElement('div'));
		back.id="poolCleaningBack";
		back.setAttribute('style',"position:absolute;background-color: black;opacity: 0.35; display: block; left: 0pt;");
		back.style.width = document.body.clientWidth+'px';
		back.style.height = document.body.clientHeight+'px';
		back.style.top = document.body.scrollTop+'px';
		var modal = document.body.appendChild(document.createElement('div'));
		modal.id="poolCleaning";
		modal.setAttribute('style',"z-index:3000;position:absolute;background:white;border: 3px solid black;display: block;");
		modal.style.width = (document.body.clientWidth*2/3) +'px';
		modal.style.left = (document.body.clientWidth*1/6) +'px';
		modal.innerHTML = '<div style="padding:12px;background-color: #EEEEEE;clear:both;font-size: 14px;">'+localiser.localise('menu_item')+'</div>';
		modal.style.top = document.body.scrollTop+(document.body.clientHeight/2)+'px';
		
		var dialog = modal.appendChild(document.createElement('div'));
		dialog.setAttribute('style',"padding: 18px 16px;clear:both; width:70%;overflow:auto;margin-left:15%;");
		var content = dialog.appendChild(document.createElement('div'));

		var pAbout = content.appendChild(document.createElement("p"));
		pAbout.setAttribute('style',"padding: 18px 16px;clear:both; width:100%;overflow:auto;");
		pAbout.innerHTML = localiser.localise('about',{
				'jpl' : '<a href="http://valid.tjp.hu">J&aacute;nos P&aacute;l T&oacute;th</a>',
				'paypal' : '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input name="cmd" value="_s-xclick" type="hidden"><input src="https://www.paypal.com/en_US/i/btn/x-click-but21.gif" name="submit" alt="Make payments with PayPal - it\'s fast, free and secure!" border="0" type="image"><img alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" border="0" height="1" width="1"><input name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----" type="hidden"></form><br/>',
				'pa' : '<a href="http://6v8.gamboni.org">Pierre Andrews</a>'
			});

		var spanForm = content.appendChild(document.createElement("div"));
		spanForm.setAttribute('style',"padding: 18px 16px;clear:both; width:100%;overflow:auto;");
		spanForm.innerHTML = '<form><input type="checkbox" name="gm_mag_shoulduselarge" id="gm_mag_shoulduselarge" '+(useLarge?'checked="on"':'')+'/><label for="gm_mag_shoulduselarge">'+localiser.localise('lower_quality')+'*.</label><br/><input name="gm_mag_zoomwidth" id="gm_mag_zoomwidth" value="'+TJPzoomwidth+'"/><label for="gm_mag_zoomwidth">'+localiser.localise('magnifier_width')+'.</label><br/><input name="gm_mag_zoomheight" id="gm_mag_zoomheight" value="'+TJPzoomheight+'"/><label for="gm_mag_zoomheight">'+localiser.localise('magnifier_height')+'.</label></form><p>(*)'+localiser.localise('quality_note')+'.</p>'
		
		var buttons = dialog.appendChild(document.createElement('div'));
		var ok = buttons.appendChild(document.createElement('button'));
		ok.type ='button';
		ok.className='Butt';
		ok.innerHTML = localiser.localise('save');
		var cancel = buttons.appendChild(document.createElement('button'));
		cancel.type ='button';
		cancel.className = 'Butt';
		cancel.innerHTML = localiser.localise('cancel');
		
		cancel.addEventListener('click',function() {
									document.body.removeChild(back);
									document.body.removeChild(modal);
								},true);
		
		
		ok.addEventListener('click',function() {
			var inp = document.getElementById("gm_mag_shoulduselarge");
			if(inp) {
				GM_setValue('useLarge',inp.checked);
				useLarge = inp.checked;
			}
			inp = document.getElementById("gm_mag_zoomheight");
			if(inp) {
				GM_setValue('zoomheight',inp.value);
				TJPzoomheight = inp.value;
				TJPzoomoffsety=TJPzoomheight/2;
			}
			inp = document.getElementById("gm_mag_zoomwidth");
			if(inp) {
				GM_setValue('zoomwidth',inp.value);
				TJPzoomwidth = inp.value;
				TJPzoomoffsetx=TJPzoomwidth/2;
			}
			
							
			document.body.removeChild(back);
			document.body.removeChild(modal);
		},true);
		
		modal.style.top = document.body.scrollTop+((document.body.clientHeight-modal.scrollHeight)/2)+'px';
	};
	GM_registerMenuCommand( localiser.localise("menu_item"), prompt_conf);


	//======================================================================
											

	try {
		window.addEventListener("load", function () {

			init();
		}, false);
	} catch (ex) {}


})();
