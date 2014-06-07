// ==UserScript==
// @name           LDRize
// @namespace      http://white.s151.xrea.com/
// @description    j,k,v,p,o,:,f,? + l,s,i
// @include        http://*
// @include        https://*
// @include        file:///*
// ==/UserScript==

const SCRIPT_VERSION = "2010.10.27"
const SCRIPT_URL     = "http://userscripts.org/scripts/show/11562"

// ------------------------------------------------------------------
// user siteinfo
// ------------------------------------------------------------------
/* template

     domain    : URL or XPath
     paragraph : XPath
     link      : XPath
     focus     : XPath
     height    : Number
     disable   : true

    {
        domain:    '',
        paragraph: '',
        link:      '',
    },
*/
const SITEINFO = [
]

const KEYBIND = {
	'j' : 'Next',
	'k' : 'Prev',
	'p' : 'Pin',
	'l' : 'List',
	'f' : 'Focus',
	'v' : 'View',
	'o' : 'Open',
	'i' : 'Iframe',
	's' : 'Siteinfo'
}
const KEYBIND_DESCRIPTION = {
	'Next'           : 'Scroll next item',
	'Prev'           : 'Scroll previous item',
	'Pin'            : 'Pin',
	'List'           : 'Toggle pinned items list',
	'Focus'          : 'Focus on search box',
	'Iframe'         : 'Open in iframe',
	'Siteinfo'       : 'Change Siteinfo',

	'View'           : 'Open in current tab',
	'Open'           : 'Open pinned items or current item',
	'OpenForeground' : 'Open in new tab (foreground)'
}
// ------------------------------------------------------------------
// URLS
// ------------------------------------------------------------------
const SITEINFO_URLS = ["http://wedata.net/databases/LDRize/items.json"];

// ------------------------------------------------------------------
// height
// ------------------------------------------------------------------
const DEFAULT_HEIGHT = 0

// ------------------------------------------------------------------
// scroll measure by j/k in iframe
// ------------------------------------------------------------------
const IFRAME_SCROLL = 400

// ------------------------------------------------------------------
// not open by iframe
// ------------------------------------------------------------------
const IFRAME_IGNORE = [/\.(?:pdf|mp3|wmv)(?:\?[^#]*)?(?:#.*)?$/i]

// ------------------------------------------------------------------
// image
// ------------------------------------------------------------------
const IMAGE_INDICATOR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAALCAIAAADN+VtyAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAtElEQVR42mP4////////Zxob/0cFDBDR5wsW1KqqIkswzTIx8cvN/ff9e2pKSp2aGgMMMKWdObNp8mQmTs6/P37E+/vD5ZgYGBggchzy8v++f4+ytobIMf7//x+iBGLmux07/n39uurGDSZk0fe7d//7+XPVjRtNt24xwUU/7N//7+fPVVeuNN26xcDAwCy1ZYtfbu7HQ4f+ff++8sIFiCgDAwPUH9eiotD8wQCh0ET///8PAI0Gmocmb3e4AAAAAElFTkSuQmCC'
const IMAGE_UP        = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAIAAACJ2loDAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYklEQVR42mNgIAOs5QxaweGPJsiEzNnHFcXCwPSb4d9sDk/sio5zxcHZv///62V3Rld0hTuFU0wAWfdvhr8NbLYIRbd5MljY2f68/ozuQDbmMjYLhEmMP/9ieuL3r18MVAYAAusZJ28GkW8AAAAASUVORK5CYII='
const IMAGE_DOWN      = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAIAAACJ2loDAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAfElEQVR42mNgoBZgZGBguM2T8e///88Mvz79//n5P4xk+Pn5/6/fDP+6fp1ggqj9z86MaQArGxuEwcTAwKD6Zcafn79YRHnRVf362/XrBFQRAwODztc53199QDGGgbnh12GESRBg+W0RQgUjU/HPvTg9spYzaAWHPzlBAABpZDIJZmWxzwAAAABJRU5ErkJggg=='

// ------------------------------------------------------------------
// CSS
// ------------------------------------------------------------------
const CSS_HIGHLIGHT_LINK   = false
const CSS_HIGHLIGHT_PINNED = 'outline: 2px solid #CC6060 !important;outline-offset: 1px !important;outline-radius: 3px !important;'

// ------------------------------------------------------------------
// !!! END OF SETTINGS !!!
// ------------------------------------------------------------------

var boot = function (){
var Class = function(){return function(){this.initialize.apply(this, arguments)}}
Object.extend = function(self, other){
	for(var i in other) self[i] = other[i]
	return self;
}
var LDRize = new Class();
LDRize.prototype = {
  scrollHeight: 10,
  indicatorMargin: 15,

  paragraphes: {},      // this.paragraphes[xpath] => instance of Paragraphes (not list)
  pinlist: null,        // instance of Paragraphes
  siteinfo_all: [],     // list of Siteinfo
  keybinds: [],         // list of Key
  html: {},             // pinlist_number pinlist_container pinlist help space
  img: {},              // indicator, up, down
  iframe_view: false,
  disable: false,       // disabled by siteinfo
  setup: false,         // whether setup has finished

  initialize: function(){
	  this.siteinfo_all = arguments[0];
	  var self = this;

	  window.LDRize = {
		getSiteinfo: function(){return self.getSiteinfo()},               // return current siteinfo
		setSiteinfo: function(a){self.setSiteinfo(a)},                    // specify instance of siteinfo
		getSiteinfoByName: function(a){return self.getSiteinfoByName(a)}, // specify name of siteinfo
		setSiteinfoByName: function(a){self.setSiteinfoByName(a)},        //
	  }

	  var res = this.initSiteinfo();
	  if(this.isIframe() && GM_getValue('iframe', '') == window.location.href){
		  GM_setValue('iframe', '');
		  if(!res){
			  this.initSubShortcutkey();
		  }else{
			  this.iframe_view = true;
		  }
	  }
	  if(!res) return;

	  this.initParagraph();
	  this.initLDRize();
  },

  initLDRize: function(){
	  if(this.setup) return;
	  var self = this;
	  this.setup = true;
	  this.initMinibuffer();
	  this.initShortcutkey();

	  var addFilterHandler = function(evt){
		       self.removeSpace();
		       setTimeout(function(){
		     	  self.initParagraph([evt.target]);
		       }, 0);
	  }
	  window.addEventListener('AutoPagerize_DOMNodeInserted', addFilterHandler, false);

	  var css = '';
	  css += [this.initHTML(),
			  this.initImage(),
			  this.initHelp(),
			  this.initCSS(),
			  this.initPinList(),
			  this.initSpace()
			  ].join('');
	  if(css != '') GM_addStyle(css);
  },

  initSubShortcutkey: function(){
	  var self = this;
	  var opt = {
		description: 'escape from iframe',
		command: function(){self.blurIframe()}
	  }
	  window.Minibuffer.addShortcutkey(Object.extend({key: "ESC"}, opt));
	  window.Minibuffer.addShortcutkey(Object.extend({key: "C-["}, opt));
	  if(this.disable) return;
	  for(var key in KEYBIND){
		  if(KEYBIND[key] == 'Iframe'){
			  window.Minibuffer.addShortcutkey({key:key, command: function(){self.blurIframe()}});
		  }else if(KEYBIND[key] == 'Next'){
			  window.Minibuffer.addShortcutkey({key:key, command: function(){self.bindScrollForward()}});
		  }else if(KEYBIND[key] == 'Prev'){
			  window.Minibuffer.addShortcutkey({key:key, command: function(){self.bindScrollBackward()}});
		  }
	  }
  },
  initShortcutkey: function(){
	  var self = this;
	  this.keybinds = [];
	  keys(KEYBIND).forEach(function(key){
		  var fn = KEYBIND[key];
		  var de = KEYBIND_DESCRIPTION[fn];
		  window.Minibuffer.addShortcutkey({key:key, command:function(e){self['bind'+fn].call(self, e)}, description: de});
	  });
	  if(this.isIframe()){
		  window.Minibuffer.addShortcutkey({key:'ESC', command: function(){self.blurIframe()}});
	  }
  },
  initMinibuffer: function(){
	  var self = this;
	  // register command as global MinibufferCommand
	  var lst = [
		  { name: 'LDRize::toggle-smooth-scroll',
			command: function(){GM_setValue('smooth', (!eval(GM_getValue('smooth', 'true'))).toString())}},
		  { name: 'LDRize::update-siteinfo',
			command: function(){SiteinfoOperator.prototype.updateSiteinfo.call()}},
		  { name: 'LDRize::paragraph-position-correct',
			command: function(){self.getParagraphes().reCollectAll()}},
		  { name: 'LDRize::paragraph-re-collect',
			command: function(){
				var xpath = self.getSiteinfo()['paragraph'];
				self.paragraphes[xpath] = null;
				self.initParagraph();
			}},
		  { name: 'LDRize::next',
			command: function(){self.bindNext()}},
		  { name: 'LDRize::prev',
			command: function(){self.bindPrev()}},

		  { name: 'pinned-node',
			command: function(stdin){
				return self.getPinnedItems().map(function(i){return i.node})}},
		  { name: 'pinned-link',
			command: function(stdin){
				var xpath = self.getSiteinfo()['link'];
				return xpath ? self.getPinnedItems().map(function(i){return i.XPath(xpath)}) : []}},
		  { name: 'pinned-or-current-node',
			command: function(stdin){
				return self.getPinnedItemsOrCurrentItem().map(function(i){return i.node})}},
		  { name: 'pinned-or-current-link',
			command: function(stdin){
				var xpath = self.getSiteinfo()['link'];
				return xpath ? self.getPinnedItemsOrCurrentItem().map(function(i){return i.XPath(xpath)}) : []}},
		  { name: 'current-node',
			command: function(stdin){return [self.getParagraphes().current.paragraph.node]}},
		  { name: 'current-link',
			command: function(stdin){return self.getCurrentLink() || []}},
		  { name: 'all-node',
			command: function(stdin){
				return self.getParagraphes().list.map(function(i){return i.node;});}},
		  { name: 'clear-pin',
			command: function(stdin){if(!!stdin) self.clearPinlist(); return stdin}},
		  { name: 'toggle-pin',
			command: function(stdin){self.togglePin(stdin); return stdin}},
		  { name: 'set-pin',
			command: function(stdin){self.setPin(stdin); return stdin}},
		  { name: 'unset-pin',
			command: function(stdin){self.unsetPin(stdin); return stdin}},
		  ];
	  lst.forEach(window.Minibuffer.addCommand);
  },
  initSiteinfo: function(){
	  var filter2 = function(arr, fn){
		  var res=[], tmp;
		  arr.forEach(function(arg){if(tmp=fn(arg)) res.push(tmp)});
		  return res;
	  }
	  try{
		  this.siteinfo_available = filter2(this.siteinfo_all, function(arg){
			  var s=new Siteinfo(arg);
			  return s.isAvailable() && s;
		  });
		  return this.siteinfo_current = this.siteinfo_available[0];
	  }catch(e){
		  this.disable = true;
		  return false;
	  }
  },

  initParagraph: function(pages){
	  var xpath = this.getSiteinfo()['paragraph'];
	  if(pages && this.paragraphes[xpath]){
		  this.paragraphes[xpath].setContext(pages).collect();
	  }else if(!this.paragraphes[xpath]){
		  var p = new Paragraphes(xpath);
		  p.collect();
		  this.paragraphes[xpath] = p;
	  }
  },
  initHTML: function(){
	  this.html.iframe_container = $N('div',{id:'gm_ldrize_iframe_container'});
	  this.html.container = $N('div',{id:'gm_ldrize'}, [this.html.iframe_container]);
	  document.body.appendChild(this.html.container);
	  return '';
  },
  initImage: function(){
	  this.img = {};
	  var self = this;
	  var cssc = ['margin: 0px',
	              'border: 0px',
	              'padding: 0px',
	              'z-index: 1000'].join(';');
	  var cssp = ['right:2px', 'position:fixed'].join(';');
	  var para = this.getParagraphes().getNth(0).paragraph;
	  this.img.indicator = $N('img',{
		id: "gm_ldrize_indicator",
		src: IMAGE_INDICATOR,
		style: [cssc, ";position:absolute;top:",
		        (para.y+this.getScrollHeight()-DEFAULT_HEIGHT),
		        "px; left:",
		        Math.max((para.x-this.indicatorMargin), 0),
			"px;"].join('')});
	  this.img.up = $N('img',{src: IMAGE_UP, id: "gm_ldrize_up_arrow"});
	  this.img.down = $N('img',{src: IMAGE_DOWN, id: "gm_ldrize_down_arrow"});

	  this.html.container.appendChild(this.img.indicator);
	  this.html.container.appendChild(this.img.up);
	  this.html.container.appendChild(this.img.down);
	  return ['img#', this.img.up.id,   '{top:15px;', cssp, ';', cssc, ';}\n',
	          'img#', this.img.down.id, '{bottom:5px;', cssp, ';', cssc, ';}\n',
	          'img#', this.img.down.id, '{', cssc, ';}\n',
	  ].join('') || '';
  },
  initHelp: function(){
	  var getKeyHTML = function(key, description){
		  return $N('div',{},
		            [$N('kbd',{},key.replace('S-','<shift> + ').replace('C-','<ctrl> + ').replace('A-','<alt> + ')),
		            $N('div',{},description)]);
	  }
	  var sig = $N('div',{id:'gm_ldrize_signature'}, [$N('a',{href:SCRIPT_URL},'LDRize'), SCRIPT_VERSION]);
	  var bind = [$N('h1',{},'Shortcut Keys')];
	  this.keybinds.forEach(function(key){
		  if(key.description) bind[bind.length] = getKeyHTML(key.key, key.description);
	  });
	  bind.push(sig);
	  var box = $N('div',{id:'gm_ldrize_help'}, bind);
	  this.html.help = box;
	  var id = 'div#' + box.id;
	  var inherit = 'background:inherit; background-image:inherit; background-color:inherit; color:inherit; text-align:inherit; font-size:inherit; font-style:inherit; font-weight:inherit; margin:inherit; opacity:inherit; text-decoration:inherit; border:0px; height:100%; padding:0; margin:inherit; font-family:inherit; vertical-align:inherit; line-height:inherit; font-stretch:inherit; font-variant:inherit; font-size-adjust:inherit; letter-spacing:inherit;';
	  return [id,'{', 'right: 10px;', 'left: 10px;', 'top: 10px;', 'line-height: 100%;', 'vertical-align: baseline;', 'border: 1px dotted #444;', 'font-family: sans-serif;', 'text-decoration: none;', 'font-weight: normal;', 'font-style: normal;', 'font-size: medium;', 'font-stretch: normal;', 'font-variant: normal;', 'font-size-adjust: none;', 'letter-spacing: normal;', 'background: none;', 'text-align: left;', 'position: fixed;', 'margin: 0;', 'padding: 20px;', 'background-color: #000;', 'background-image: none;', 'color: #aaa;', 'border-radius: 10px;-moz-border-radius: 10px;', 'opacity: 0.8;', 'z-index: 1000;', '}\n',
	          id,' div{', inherit, 'opacity: 1.0;', 'text-align: center;', '}',
	          id,' > div{', inherit, 'margin: 0px 20px 20px 0px;', 'opacity: 1.0;', 'text-align: center;', '}',
	          id,' a,', id,' a:visited,', id,' a:active,', id,' a:hover{', inherit, 'padding-right: 5px;', 'text-decoration: underline;', 'color: #CB6161;', '}\n',
	          id,' div#gm_ldrize_signature{', inherit, 'margin: auto;', 'text-align: right;', 'font-style: italic;', '}\n',
	          id,' div#gm_ldrize_signature a,', id,' div#gm_ldrize_signature a:active,', id,' div#gm_ldrize_signature a:hover', '{', 'font-style: italic;', '}',
	          id,' kbd{', inherit, 'font-size: 120%;', 'font-weight: bold;', 'color: #B83E3B;', 'text-align: right;', 'width: 50%;', 'float: left;', '}\n',
	          id,' kbd + div{', 'margin-left: 50%;', 'text-align: left;', '}\n',
	          id,' kbd + div:before{', 'content: ": ";', '}\n',
	          id,' h1{', inherit, 'margin: 20px auto;', 'background-image: none;', "opacity: 1.0;", 'font-weight: bold;', 'font-size: 150%;', 'color: #fff;', 'padding-left: 20px;', 'text-align: center;', '}\n',
	          id,' #gm_ldrize_toggle_detail {', 'cursor: pointer;', 'text-decoration: underline;', 'color: #CB6161;', '}',
	  ].join('');
  },
  initCSS: function(){
	  var css = '';
	  if(CSS_HIGHLIGHT_LINK) css += "\n.gm_ldrize_link {" + CSS_HIGHLIGHT_LINK + "}";
	  if(CSS_HIGHLIGHT_PINNED) css += "\n.gm_ldrize_pinned {" + CSS_HIGHLIGHT_PINNED + "}";
	  css += ".gm_ldrize_iframe { min-height:200px; position:fixed; bottom:0px; left:0px; right:0px; }";
	  return css;
  },
  initPinList: function(){
	  var number_container = $N('div',{id:'gm_ldrize_pinlist_number_container'},
				    [$N('div',{id:'gm_ldrize_pinlist_number'}),' item']);
	  var pin_container = $N('div',{style: 'display:'+GM_getValue('pinlist', 'block')});
	  var box = $N('div',{id:'gm_ldrize_pinlist', style:'display:none;'},
	               [number_container, pin_container]);

	  this.html.pinlist_number = number_container;
	  this.html.pinlist_container = pin_container;
	  this.html.pinlist = box;
	  this.html.container.appendChild(box);
	  var id = 'div#' + box.id;
	  var inherit = 'background:inherit; background-image:inherit; background-color:inherit; color:inherit; text-align:inherit; font-size:inherit; font-style:inherit; font-weight:inherit; margin:inherit; opacity:inherit; text-decoration:inherit; border:0px; height:100%; padding:0; margin:inherit; font-family:inherit; vertical-align:inherit; line-height:inherit; font-stretch:inherit; font-variant:inherit; font-size-adjust:inherit; letter-spacing:inherit;';
	  return [id,'{', 'line-height: 100%;', 'vertical-align: baseline;', 'border: 1px dotted #444;', 'font-family: sans-serif;', 'text-decoration: none;', 'font-weight: normal;', 'font-style: normal;', 'font-size: medium;', 'font-stretch: normal;', 'font-variant: normal;', 'font-size-adjust: none;', 'letter-spacing: normal;', 'background: none;', 'text-align: left;', 'position: fixed;', 'right: 20px;', 'bottom: 15px;', 'margin: 0px;', 'padding: 10px;', 'background-color: #000;', 'background-image: none;', 'color: #fff;', '-moz-border-radius: 10px;border-radius: 10px;', 'opacity: 0.7;', 'z-index: 1000;', '}\n',
	          id,' div{', inherit, 'margin: 10px;', 'opacity: 1.0;', '}',
	          id,' #gm_ldrize_pinlist_number_container > span {', 'color: #B83E3B;', 'font-size: 150%;', 'font-weight: bold;', 'display: inline;', '}',
	  ].join('');
  },
  initSpace: function(){
	  this.html.space = $N('div',{id:'gm_ldrize_space'},'dummy');
	  return [
		  'div#gm_ldrize_space {',
		  'visibility: hidden;',
		  'position: absolute;',
		  'height: ', window.innerHeight, 'px;',
		  '}'].join('');
  },
// end of initialize functions

// siteinfo
  getSiteinfoByName: function(name){
	  return this.siteinfo_available.find(function(s){return s.name==name});
  },
  setSiteinfoByName: function(name){
	  var siteinfo = this.getSiteinfoByName(name);
	  this.siteinfo_current = siteinfo;
	  this.initParagraph();
  },
  setSiteinfo: function(siteinfo){
	  if(Siteinfo.prototype.isPrototypeOf(siteinfo)){
		  this.siteinfo_current = siteinfo;
		  this.initParagraph();
		  this.initLDRize();
	  }
  },

  attachClassToNode: function(node, _class){
	  if(node){
		  var oldclass = node.getAttribute('class');
		  node.setAttribute('class', (oldclass ? oldclass + " " : "") + _class);
		  return true;
	  }
  },
  removeClassToNode: function(node, _class){
	  if(node && node.getAttribute('class')){
		  var re = new RegExp(' ?' + _class);
		  node.setAttribute('class', node.getAttribute('class').replace(re, ""));
		  if(node.getAttribute('class') == '') node.removeAttribute('class', 0);
	  }
  },

  // 一番下までスクロールしたときにもj/kで選んだ要素が上の方に表示されるように。
  appendSpace: function(){
	  if(!document.getElementById('gm_ldrize_space')){
		  this.html.space.style.top = Math.max(document.documentElement.scrollHeight,
											   document.body.scrollHeight) + 'px';
	  }
	  this.html.container.appendChild(this.html.space);
  },
  removeSpace: function(){if(document.getElementById('gm_ldrize_space')) this.html.container.removeChild(this.html.space)},

// navi (images at right side)
  naviUpdate: function(){
	  var p=this.getParagraphes();
	  var i=this.img, up=i.up, down=i.down;
	  if(p){
		  if(!p.getPrev()){up.style.display='none'; return;}
		  if(!p.getNext()){down.style.display='none'; return;}
	  }
	  up.style.display = 'block';
	  down.style.display = 'block';
  },

// indicator
  indicatorHide: function(){this.img.indicator.style.display = 'none'},
  indicatorUpdate: function(){
	  var p=this.getParagraphes().current.paragraph;
	  if(!p)return;
	  var i=this.img.indicator;
	  i.style.display = 'block';
	  i.style.top = (p.y+this.getScrollHeight()-DEFAULT_HEIGHT) + 'px';
	  i.style.left = Math.max((p.x-this.indicatorMargin), 0) + 'px';
  },

// getter
  getSiteinfo: function(){return this.siteinfo_current},
  getParagraphes: function(){return this.paragraphes[this.getSiteinfo().paragraph]},
  getScrollHeight: function(){
	  var h = this.getSiteinfo()['height'];
	  return DEFAULT_HEIGHT + ((typeof h != 'undefined') ? Number(h) : this.scrollHeight);
  },
  useSmoothScroll: function(){return eval(GM_getValue('smooth', 'true'))},
  scrollTo: function(x, y){
	  (this.useSmoothScroll() ? SmoothScroll: window).scrollTo(x, y);
  },

// iframe
  isIframe: function(){return self != top},
  blurIframe: function(){
	  window.top.focus();
  },

// pin
  setPin: function(nodes){
	  var self = this;
	  this.togglePin(nodes, function(node){return self.addPinToPinList(node);});
  },
  unsetPin: function(nodes){
	  var self = this;
	  this.togglePin(nodes, function(node){return self.removePinFromPinList(node);});
  },
  togglePin: function(nodes, fn){
	  var self = this;
	  if(typeof fn == 'undefined'){
		  fn = function(node){
			  return self.removePinFromPinList(node) || self.addPinToPinList(node);
		  }
	  }
	  toArray(nodes).forEach(function(node){
		  if ( fn(node) ) {
			  self.toggleClassForPin(node);
		  }
	  });
	  var a = this.html.pinlist_number;
	  var len = this.html.pinlist_container.childNodes.length;
	  if(len){
		  a.innerHTML =
			['<span>',
			 len,
			 '</span>item',
			 len==1 ?'':'s'].join('');
		  this.html.pinlist.style.display = 'block';
	  }else{
		  a.innerHTML = '';
		  this.html.pinlist.style.display = 'none';
	  }
  },
  toggleClassForPin: function(node){
	  var _class = node.getAttribute('class');
	  if(_class && (' ' + _class + ' ').indexOf(" gm_ldrize_pinned ") != -1){
		  this.removeClassToNode(node, 'gm_ldrize_pinned');
	  }else{
		  this.attachClassToNode(node, 'gm_ldrize_pinned');
	  }
  },
  addPinToPinList: function(node){
	  var res = [], text='';
	  var paragraph = this.getParagraphes().find(function(para){return node == para.node});
	  if(!paragraph.html){
		  var getCloneImage = function(node){
			  var clone = node.cloneNode(false);
			  if(node.width > 40)  clone.width  = 40;
			  if(node.height > 40) clone.height = 40;
			  clone.setAttribute('style', '');
			  return clone;
		  }
		  var appendText = function(node){
			  if(text.length > 30) return;
			  text = (text + node.nodeValue.replace(/\s+/g, '')).slice(0, 30);
		  }
		  var xpath = this.getSiteinfo()['view'];
		  var matches = xpath && $X(xpath, node);
		  if(matches){
			  matches.forEach(function(n){
				  if(n.nodeType == 3) appendText(n);
				  else if(n.nodeName.toLowerCase() == 'img') res.push(getCloneImage(n));
				  else res.push(n.cloneNode(false));
			  });
			  if(text) res.push(text);
		  }else{
			  xpath = '(descendant-or-self::img | descendant::text()[normalize-space(self::text()) != ""])';
			  matches = $X(xpath, node);
			  if(!matches.length) return false;
			  var height = new Paragraph(matches[0]).y;
			  res = [];
			  var allstringlength = 0;
			  matches.some(function(m){
				  if(m.nodeName.toLowerCase() == 'img' || m.nodeType == 3){
					  var h = new Paragraph(m).y;
					  if(Math.abs(height - h) >= 20) return true;
					  if(m.nodeType == 3){
						  var str = m.nodeValue.replace(/\s+/g, '');
						  allstringlength += str.length;
						  if(allstringlength > 30){
							  res.push(str.slice(0, 30) + '...');
							  return true;
						  }
						  res.push(m.nodeValue);
					  }else{
						  res.push(getCloneImage(m));
					  }
				  }
			  });
		  }
		  var div = $N('div',{},res);
		  paragraph.html = div;
	  }
	  this.html.pinlist_container.appendChild(paragraph.html);
	  return true;
  },
  removePinFromPinList: function(node){
	  var para = this.getParagraphes().find(function(para){return node == para.node});
	  var view = para.html;
	  if(!view) return false;
	  var children = toArray(this.html.pinlist_container.childNodes);
	  var html = children.find(function(arg){return arg == view});
	  if(!html) return false;
	  this.html.pinlist_container.removeChild(html);
	  return true;
  },
  clearClassForPin: function(){
	  var self = this;
	  var children = this.getPinnedItems();
	  children.forEach(function(child){
		  self.removeClassToNode(child.node, 'gm_ldrize_pinned');
	  });
  },
  clearPinlist: function(){
	  this.clearClassForPin();
	  this.html.pinlist_container.innerHTML = '';
	  this.html.pinlist_number.innerHTML = '';
	  this.html.pinlist.style.display = 'none';
  },
  pinIsEmpty: function(){return !this.html.pinlist_container.childNodes.length},
  getPinnedItems: function(){
	  var paragraphes = this.getParagraphes();
	  return toArray(this.html.pinlist_container.childNodes).map(function(view){
		  return paragraphes.find(function(arg){
			  return arg.html == view});
	  });
  },
  getPinnedItemsOrCurrentItem: function(){
	if(this.pinIsEmpty()){
		var para = this.getParagraphes().current.paragraph;
		return para ? [para] : [];
	}
	return this.getPinnedItems();
  },

// command

// j -- next paragraph
  bindNext: function(aEvent){
	  if(this.useSmoothScroll()) SmoothScroll.stop();
	  var scrollHeight = Math.max(document.documentElement.scrollHeight,
								  document.body.scrollHeight);
	  var scrollWidth = Math.max(document.documentElement.scrollWidth,
								  document.body.scrollWidth);
	  if(this.isIframe() && scrollHeight - window.self.innerHeight == window.self.scrollY){
		  this.blurIframe();
		  return;
	  }
	  var paragraphes = this.getParagraphes();
	  var next = paragraphes.setScrollY(window.self.scrollY + this.getScrollHeight())
							.getNextToMove();
	  if(next && !next.paragraph.check()){
		  this.getParagraphes().reCollectAll();
		  this.bindNext();
		  return;
	  }
	  if(next){
		  paragraphes.selectNth(next.position);
		  // this should execute before scroll
		  if(next.paragraph.y > (scrollHeight - window.self.innerHeight)) this.appendSpace();
		  // these shoud execute after selectNth
		  this.indicatorUpdate();
		  this.naviUpdate();
		  this.scrollTo((window.self.innerWidth < next.paragraph.x ? next.paragraph.x-this.indicatorMargin : window.self.pageXOffset)
								 , next.paragraph.y - this.getScrollHeight());
	  }else{
		  this.scrollTo(window.self.pageXOffset,
								 scrollHeight - window.self.innerHeight);
		  this.indicatorHide();
		  paragraphes.selectNth(paragraphes.length);
	  }
  },
  bindScrollForward: function(){
	  if(this.useSmoothScroll()) SmoothScroll.stop();
	  var scrollHeight = Math.max(document.documentElement.scrollHeight,
								  document.body.scrollHeight);
	  if(this.isIframe() && scrollHeight - window.self.innerHeight == window.self.scrollY){
		  this.blurIframe();
		  return;
	  }
	  this.scrollTo(window.scrollX, window.scrollY + IFRAME_SCROLL);
  },
  bindScrollBackward: function(){
	  if(this.isIframe() && window.self.scrollX==0 && window.self.scrollY==0) this.blurIframe();
	  this.scrollTo(window.scrollX, window.scrollY - IFRAME_SCROLL);
  },

// k -- previous paragraph
  bindPrev: function(){
	  var x, y;
	  if(this.useSmoothScroll()) [x, y] = SmoothScroll.stop();
	  if(this.isIframe() && window.self.scrollX==0 && window.self.scrollY==0) this.blurIframe();
	  var paragraphes = this.getParagraphes();
	  var prev = paragraphes.setScrollY(typeof y != 'undefined' ? y : window.scrollY + this.getScrollHeight())
							.getPreviousToMove();
	  paragraphes.selectNth(prev ? prev.position : -1);
	  if(prev && !prev.paragraph.check()){
		  this.getParagraphes().reCollectAll();
		  this.bindPrev();
		  return;
	  }
	  this.indicatorUpdate();
	  if(prev){
		  var x;
		  if(window.pageXOffset > 0 && prev.paragraph.x < window.innerWidth){
			  x = 0;
		  }else if(window.pageXOffset > 0){
			  x = prev.paragraph.x-this.indicatorMargin;
		  }else{
			  x = window.pageXOffset;
		  }
		  this.scrollTo(x, prev.paragraph.y - this.getScrollHeight());
	  }else{
		  this.scrollTo(0, 0);
	  }
  },

// p -- pin
  bindPin: function(){
	  var paragraphes = this.getParagraphes();
	  if(!paragraphes.currentIsValid()) this.bindNext();
	  if(!paragraphes.currentIsValid()) return;

	  var current = paragraphes.current.paragraph;
	  this.togglePin([current.node]);
	  this.bindNext();
  },

// l -- toggle pin list
  bindList: function(){
	  var val = GM_getValue('pinlist', 'block') == 'none' ? 'block' : 'none';
	  GM_setValue('pinlist', this.html.pinlist_container.style.display = val);
  },

// f -- focus on search field
  bindFocus: function(){
	  var xpath = this.getSiteinfo()['focus'] || '//input[@type="text" or not(@type)]';
	  var lst = $X(xpath);
	  if(!lst.length) return;
	  var elm = lst[0];

	  var shortcutkey = window.Minibuffer.getShortcutKey();
	  shortcutkey.addCommand({key:'ESC', command:function(aEvent){aEvent.target.blur()}});
	  shortcutkey.addCommand({key:'C-[', command:function(aEvent){aEvent.target.blur()}});
	  shortcutkey.addEventListener(elm, 'keypress', true);

	  elm.focus();
	  var para = new Paragraph(elm);
	  window.scrollTo(window.pageXOffset, para.y - this.getScrollHeight());
	  return true;
  },

// i -- view in iframe
  bindIframe: function(){
	  if(this.isIframe()){
		  this.blurIframe();
		  return;
	  }
	  var paragraphes = this.getParagraphes();
	  if(!paragraphes.currentIsValid()) this.bindNext();
	  if(!paragraphes.currentIsValid()) return;
	  var current = paragraphes.current.paragraph;
	  var node = current.node;
	  if(!node) return;
	  var iframe = current.getIframe();
	  if(iframe){
		  current.toggleIframe();
		  setTimeout(function(){
			  iframe.contentWindow.focus();
			  current.setIframeAutoHide();
		  }, 0);
		  return;
	  }
	  var links = this.getCurrentLink();
	  if(!links.length) return;
	  var url = links[0].href;
	  if(IFRAME_IGNORE.some(function(re){return re.test(url)})) return;
	  window.scrollTo(window.pageXOffset, current.y);
	  current.iframe = $N('iframe',{
		_class: 'gm_ldrize_iframe',
		src: url,
		style: 'top:'+current.node.offsetHeight+'px;'
	  });
	  GM_setValue('iframe', url);
	  this.html.iframe_container.appendChild(current.iframe);
	  current.iframe.contentWindow.focus();
	  current.iframe.addEventListener('load', function(){
		  current.setIframeAutoHide();
		}, false);
  },
  getCurrentLink: function(){
	  var xpath = this.getSiteinfo()['link'];
	  var paragraphes = this.getParagraphes();
	  var paragraph = paragraphes.current.paragraph || paragraphes.getNth(0).paragraph;
	  return xpath ? [paragraph.XPath(xpath)] : false;
  },

// o -- open in new tab
  bindOpen: function(){
	  var nopin = this.pinIsEmpty();
	  window.Minibuffer.execute('pinned-or-current-link | open | clear-pin');
	  if(nopin) this.bindNext();
  },
  bindOpenForeground: function(){
	  window.Minibuffer.execute('pinned-or-current-link | open blank | clear-pin');
  },

// v -- view in current tab
  bindView: function(){
	  window.Minibuffer.execute('current-link | open top | clear-pin');
  },

// s -- select siteinfo
  bindSiteinfo: function(){
	  var current = this.getSiteinfo();
	  var lst = this.siteinfo_available.remove(current);
	  if(lst.length == 0) return;
	  var self = this;
	  var callback = function(str){if(str) self.setSiteinfoByName(str)};
	  var minibuffer = window.Minibuffer.getMinibuffer()
							 .setPrompt('Change siteinfo ['+ current.name +'] :')
							 .setCandidates(lst.map(function(s){return s.name}))
							 .complete(callback);
  }
}

var Paragraphes = new Class();
Paragraphes.prototype = {
  initialize: function(){
	  this.list = new Array();
	  this.xpath = arguments[0];
	  this.context = [];
	  this.current = {
		paragraph: null,
		position:  null,
	  };
  },
  collect: function(){
	  var matches = $X(this.xpath);
	  if(!matches || !matches.length) return;
	  var list = this.list;
	  var self = this;
	  matches.forEach(function(node){
		  // when call by AutoPagerize, ignore old paragraphes
		  if(self.context.length &&
                     !self.context.some(function(e){
                                            return e == node || (document.DOCUMENT_POSITION_CONTAINS & node.compareDocumentPosition(e) )}))
                      return;

		  // add paragraph to cache
		  var para = new Paragraph(node);
		  if(!list.length || (list[list.length-1]).greaterThan(para)){
			  list[list.length] = para;
		  }else{
			  // if node is not next to previous node, insert into pertinent position
			  var idx = list.bsearch_upper_boundary(function(e){return e.compare(para)});
			  list = list.slice(0, idx).concat(para, list.slice(idx));
		  }
	  });
	  this.context = [];
  },
  setContext: function(arg){this.context = arg; return this},

  select: function(arg){this.selectNth(this.position(arg))},
  selectNth: function(n){
	  if(n == -1){
		  this.current = {position:-1, paragraph:null}
	  }else if(n == null || n === false){
		  this.current = {};
	  }else{
		  this.current = this.getNth(n);
	  }
  },
  bsearch_upper_boundary: function(fn){
	  var idx = this.list.bsearch_upper_boundary(fn);
	  if(this.length == idx) idx = this.length;
	  return this.getNth(idx);
  },

  getPrev: function(){
	  var n=this.current.position;
	  return (n == 0) ? false : this.getNth(n-1);
  },
  getNext: function(){
	  var n=this.current.position;
	  return (n == this.length-1) ? false : this.getNth(n+1);
  },
  currentIsValid: function(){
	  return this.current.position !== null && (this.current.position >= 0) && (this.current.position < this.length);
  },
  setScrollY: function(scrolly){
	  this.scrolly = scrolly;
	  return this;
  },
  getNextToMove: function(){
	  if(this.current.paragraph && this.current.paragraph.y == this.scrolly){
		  return this.getNext();
	  }
	  var res = this.getCorrected();
	  return (res.position == this.length) ? false : res;
  },
  getPreviousToMove: function(){
	  if(this.current.paragraph && this.current.paragraph.y == this.scrolly){
		  return this.getPrev();
	  }
	  var res = this.getCorrected();
	  return (res.position < 1) ? false : this.getNth(res.position - 1);
  },
  getCorrected: function(){
	  var self = this;
	  return this.bsearch_upper_boundary(function(para){
		  if(para.y == self.scrolly){
			  return 0;
		  }
		  return para.y - self.scrolly;
	  });
  },
  reCollectAll: function(){
	  this.list.forEach(function(para){para.setOffset()});
  },
// Array
  get length(){return this.list.length}, // getter
  add: function(paragraph){this.list[this.list.length] = paragraph},
  getNth: function(n){return {paragraph:this.list[n], position:n}},
  getAll: function(){return this.list},
  find: function(arg){return this.list.find(arg)},
  position: function(arg){return this.list.position(arg)},
  remove: function(arg){return this.list.remove(arg)},
  removeSelf: function(arg){return this.list = this.list.remove(arg)},
}

var Paragraph = new Class();
Paragraph.prototype = {
  initialize: function(){
	  this.node = arguments[0];
	  this.setOffset();
	  this.html = null;
	  this.iframe = null;
  },
  setOffset: function(){
	  var offsetx, offsety;
	  [offsetx, offsety] = this.getOffset();
	  this.x = offsetx;
	  this.y = offsety;
	  this.str = this.x+':'+this.y;
  },
  getOffset: function(){
	  var node=this.node, textnode;

	  if(node.nodeType==3){
		  textnode = node;
		  var span = $N('span');
		  node.parentNode.insertBefore(span, node);
		  node = span;
	  }

	  var offsetx = node.offsetLeft;
	  var offsety = node.offsetTop;
	  var count = 0;
	  var tmpnode=node;
	  while(tmpnode=tmpnode.offsetParent){
		  offsety += tmpnode.offsetTop;
		  offsetx += tmpnode.offsetLeft;
	  }
	  if(textnode) node.parentNode.removeChild(node);
	  return [offsetx, offsety];
  },

  check: function(){
	  var offsetx, offsety;
	  [offsetx, offsety] = this.getOffset();
	  if(offsetx != this.x || offsety != this.y) return false;
	  return true;
  },

  greaterThan: function(arg){
	  return this.y < arg.y || (this.y == arg.y && this.x < arg.x);
  },

  compare: function(e){
	  if(e.y < this.y || (e.y == this.y && e.x < this.x)) return 1;
	  if(e.y > this.y || (e.y == this.y && e.x > this.x)) return -1;
	  return 0;
  },

  XPath: function(xpath){
	  var links = $X(xpath, this.node);
	  if(!links || links.length == 0) return;
	  return links[0];
  },
  getIframe: function(){
	  var self = this;
	  var cantianer = document.getElementById('gm_ldrize_iframe_container');
	  var node = toArray(cantianer.childNodes).find(function(elm){return elm == self.iframe});
	  return node || false;
  },
  toggleIframe: function(){
	  var iframe = this.getIframe();
	  iframe.style.display = (iframe.style.display == 'block')?'none':'block';
	  return iframe;
  },
  hideIframe: function(){
	  var iframe = this.getIframe();
	  iframe.style.display = 'none';
  },
  setIframeAutoHide: function(){
	  var self = this;
	  var hide = function(){
		  self.hideIframe();
		  document.removeEventListener('focus', hide, false);
	  }
	  document.addEventListener('focus', hide, false);
  },
}

//// Siteinfo
var Siteinfo = new Class();
Siteinfo.prototype = {
  initialize: function(){
	  // ['name', 'domain', 'paragraph', 'link', 'view', 'height', 'focus', 'disable']
	  Object.extend(this, arguments[0]);
  },
  isAvailable: function(){
	  try{
		  if((this.domain == true || this.domain == 'microformats') &&
			 $X(this.paragraph).length){
			  return true;
		  }
		  if(location.href.match(this.domain) && (this.disable || $X(this.paragraph).length)){
			  if(this.disable) throw 0;
			  return true;
		  }
		  if($X(this.domain).length && (this.disable || $X(this.paragraph).length)){
			  if(this.disable) throw 0;
			  return true;
		  }
	  }catch(e){
//		  log(['errer', info]);
		  if(e==0) throw 0;
	  }
	  return false;
  }
}
var SiteinfoOperator = new Class();
SiteinfoOperator.prototype = {
  expire : 24 * 60 * 60 * 1000, // 24h
  counter : 0,
  cached_siteinfo : [], // to avoid save USER_SITEINFO
  initialize: function(){
	  // name, version, siteinfo, urls, initializer, parser, expire
	  // parser: function(response){return [list of siteinfo]}
	  Object.extend(this, arguments[0]);
	  this.init();
  },
  updateSiteinfo: function(){GM_setValue('cacheInfo', '({})')},
  getCache: function(){return eval(GM_getValue('cacheInfo', '({})'))},
  setCache: function(e){return GM_setValue('cacheInfo', uneval(e))},
  getCacheErrorCallback: function(url){
	  if(this.cached_siteinfo[url]){
		  this.cached_siteinfo[url]['expire'] = new Date(new Date().getTime() + this.expire),
		  this.setCache(this.cached_siteinfo);
	  }
	  this.initializerCaller();
  },
  getCacheCallback: function(res, url){
	  if(res.status != 200) return this.getCacheErrorCallback(url);
	  var info_list = this.parser(res);
	  if(info_list.length){
		  this.cached_siteinfo[url] = {
			url: url,
			expire: new Date(new Date().getTime() + this.expire),
			info: info_list
		  }
		  this.setCache(this.cached_siteinfo);
		  this.siteinfo = this.siteinfo.concat(this.cached_siteinfo[url].info);
	  }
	  this.initializerCaller();
  },
  initializerCaller: function(){
	  // only last call will be allowed
	  if(++this.counter == this.urls.length && this.siteinfo.length){
		  this.initializer(this.siteinfo);
	  }
  },
  init: function(){
	  if(window.Minibuffer){
		  window.Minibuffer.addCommand({
			name: this.name+'::update-siteinfo',
			command: this.updateSiteinfo
		  });
	  }
	  GM_registerMenuCommand(this.name + ' - update siteinfo', this.updateSiteinfo);
	  this.cached_siteinfo = this.getCache();
	  var self = this;
	  this.urls.forEach(function(url){
		  if(!self.cached_siteinfo || !self.cached_siteinfo[url] || self.cached_siteinfo[url].expire < new Date()){
			  var opt = {
				method: 'get',
				url: url,
				headers: {
					'User-agent': 'Mozilla/5.0 Greasemonkey ('+self.name+'/'+self.version+')',
				},
				onload:  function(res){self.getCacheCallback(res, url)},
				onerror: function(res){self.getCacheErrorCallback(url)},
			  }
			  GM_xmlhttpRequest(opt);
		  }else{
			  self.siteinfo = self.siteinfo.concat(self.cached_siteinfo[url].info);
			  self.initializerCaller();
		  }
	  });
  }
}

var SmoothScroll = {
  steps : 200,
  duration : 6000,
  destinationx: null,
  destinationy: null,
  id_list : [],
  stop : function(){
	  var x, y;
	  if(SmoothScroll.id_list.length){
		  SmoothScroll.clearTimer();
		  if(SmoothScroll.destinationx !== null||
			 SmoothScroll.destinationy !== null){
			  window.scrollTo(SmoothScroll.destinationx, SmoothScroll.destinationy);
			  x = SmoothScroll.destinationx;
			  y = SmoothScroll.destinationy;
			}
	  }
	  SmoothScroll.resetDestination();
	  return [x, y]
  },
  resetDestination : function(){
	  SmoothScroll.destinationx = null;
	  SmoothScroll.destinationy = null;
  },
  scrollTo : function(destX, destY){
	  SmoothScroll.destinationx = destX;
	  SmoothScroll.destinationy = destY;
	  var y = window.pageYOffset;
	  var x = window.pageXOffset;
	  var time;
	  for(var i=1; i<SmoothScroll.steps; i++){
		  x = destX-((destX-x)/2);
		  y = destY-((destY-y)/2);
		  time = (SmoothScroll.duration/SmoothScroll.steps) * i;
		  if((Math.abs(destY-y)<1 && Math.abs(destX-x)<1) || i+1 == SmoothScroll.steps){
			  var id = setTimeout(SmoothScroll.makeScrollTo(destX, destY), time);
			  var id2 = setTimeout(SmoothScroll.resetDestination, time);
			  SmoothScroll.id_list.push(id);
			  SmoothScroll.id_list.push(id2);
			  break;
		  }else{
			  var id = setTimeout(SmoothScroll.makeScrollTo(x, y), time);
			  SmoothScroll.id_list.push(id);
		  }
	  }
  },
  clearTimer: function(){
	  SmoothScroll.id_list.forEach(function(id){
		  clearTimeout(id);
	  });
	  SmoothScroll.id_list = [];
  },
  makeScrollTo: function(x, y){
	  return function(){
		  window.scrollTo(x, y);
	  }
  },
}

//// library
Function.prototype.later = function(ms){
	var self = this;
	return function(){
		var args = arguments;
		var thisObject = this;
		var res = {
			arg: args,
			complete: false,
			cancel: function(){clearTimeout(PID);},
			notify: function(){clearTimeout(PID);later_func()}
		};
		var later_func = function(){
			self.apply(thisObject, args);
			res.complete = true;
		};
		var PID = setTimeout(later_func, ms);
		return res;
	};
}
Array.prototype.position = function(obj){
	var f = (typeof obj == 'function') ? obj : function(a){return a == obj}; //===
	var idx;
	return this.some(function(v, i){idx = i; return f(v)}) ? idx : false;
}
Array.prototype.find = function(obj){
	var i = this.position(obj);
	return typeof i == 'number' ? this[i] : false;
}
Array.prototype.remove = function(obj){
	var test = (typeof obj == 'function') ? obj : function(a){return a == obj}; //===
	return this.filter(function(e){return !test(e)});
}

function addStyle(css, id){ // GM_addStyle is slow
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = 'data:text/css,' + escape(css);
	document.documentElement.childNodes[0].appendChild(link);
}

// %o %s %i
function log(){if(console) console.log(arguments);}
function group(){if(console) console.group(arguments)}
function groupEnd(){if(console) console.groupEnd();}

function hasKeys(hash){
	for(var key in hash) return true;
	return false;
}
function keys(hash){
	var tmp = [];
	for(var key in hash)if(hash.hasOwnProperty(key))tmp.push(key);
	return tmp;
}

function toArray(arg){
	var arr = new Array();
	for(var i=0,l=arg.length; i<l; arr.push(arg[i++]));
	return arr;
}

var $N = window.Minibuffer.$N
var $X = window.Minibuffer.$X

// ------------------------------------------------------------------
// binary search
// ------------------------------------------------------------------
//           0  1  2  3  4 (5) 6  7 (8) 9 (index)
// var a =  [1, 2, 2, 3, 3, 4, 4, 4, 5, 5];
// var i =  a.bsearch_lower_boundary(function(e){return e - 4})
// i     => 5 // compare 3 times
// var i =  a.bsearch_lower_boundary(function(e){return e - 4}, 5, 6)
// i     => 5 // compare 1 time
//
// var i =  a.bsearch_upper_boundary(function(e){return (e<4)?(-1): (e>4)?(1): 0})
// i     => 8 // compare 3 times
// var i =  a.bsearch_upper_boundary(function(e){return e - 4}, 8, 9)
// i     => 8 // compare 1 time
Array.prototype.bsearch_lower_boundary = function(compare, begin, end){
	var lower = (typeof begin == 'undefined') ? -1 : begin-1;
	var upper = (typeof end   == 'undefined' || end >= this.length) ? this.length : end;
	while(lower + 1 != upper){
		var mid = Math.floor((lower + upper) / 2);
		if(compare(this[mid]) < 0) lower = mid;
		else upper = mid;
	}
	return upper;
}
Array.prototype.bsearch_upper_boundary = function(compare, begin, end){
	var lower = (typeof begin == 'undefined') ? -1 : begin-1;
	var upper = (typeof end   == 'undefined' || end >= this.length) ? this.length : end;
	while(lower + 1 != upper){
		var mid = Math.floor((lower + upper) / 2);
		if(compare(this[mid]) <= 0) lower = mid;
		else upper = mid;
	}
	return lower+1;
}

//// livedoor Reader Fastladder only
if(/^http:\/\/(?:reader\.livedoor|fastladder)\.com\/(?:reader|public)\//.test(window.location.href) &&
	typeof unsafeWindow != "undefined"){
	var w = unsafeWindow;
	var _onload = w.onload;
	w.onload = function(){
		_onload();
		[
			{ name: 'pinned-or-current-link',
			  command: function(){
				  if(w.pin.pins.length){
					  return w.pin.pins.map(function(e){return e.url});
				  }
				  var item = w.get_active_item(true);
				  if(item) return [item.link];
			  }
			},
			{ name: 'pinned-link',
			  command: function(){return w.pin.pins.map(function(e){return e.url})}
			},
			{ name: 'current-link',
			  command: function(){
				  var item = w.get_active_item(true);
				  if(item) return [item.link];
			  }
			},
			{ name: 'clear-pin',
			  command: function(stdin){w.Control.clear_pin(); return stdin}},
			{ name: 'toggle-show-all',
			  command: function(stdin){w.Control.toggle_show_all(); return stdin}}
		].forEach(window.Minibuffer.addCommand);
	}
}


if(document.body){
	var ldrize = function(siteinfo){new LDRize(siteinfo)}

	var parser = function(response){
		var result = JSON.parse(response.responseText).map(function(o){
			var res = o.data;
			res.name = o.name;
			return res;
		});
		return result;
	}
	new SiteinfoOperator({
	  name:        'LDRize',
	  version:     SCRIPT_VERSION,
	  urls:        SITEINFO_URLS,
	  siteinfo:    SITEINFO,
	  initializer: ldrize,
	  parser:      parser
	});
}
};

if(window.Minibuffer){
	boot();
}else{
	window.addEventListener('GM_MinibufferLoaded', boot, false);
}
