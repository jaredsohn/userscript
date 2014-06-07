// ==UserScript==
// @name           	BBCodePL H3PO4
// @namespace      	11235813[Bande:Dritteliga Penner] mod LeonBuzz
// @description    	Erweiterter BB-Code Editor mit Vorschaufunktion
// @include        	http://*game*/gang/
// @include        	http://*bumrise*/gang/
// @include        	http://*game*/settings/
// @include        	http://*bumrise*/settings/
// @include        	http://*game*/messages/write/*
// @include        	http://*bumrise*/messages/write/*
// @include        	http://*clodogame.fr/gang/forum/editpost*
// @include        	http://*clodogame.fr/gang/forum/viewthread*
// @include        	http://*pennergame.de/gang/forum/editpost*
// @include        	http://*pennergame.de/gang/forum/viewthread*
// @include        	http://*bumrise.com/gang/forum/editpost*
// @include        	http://*bumrise.com/gang/forum/viewthread*
// @exclude		   	*change*
// @version			0.3.2 leon4: ajouts de nouveaux smileys
// @version			0.3.2 leon3: remise en forme des boutons
// @version			0.3.2 leon2: corrections traduction fr
// @version			0.3.2 leon1: ajout des include forum
// ==/UserScript==

var language = {
	de: {
		change_text:'*Mir Spenden*',
		quote:'Zitat von',
		chose_color:'Farbwahl:',
		preview_window:'Vorschau-Bereich',
		send:'Abschicken',
		preview:'Vorschau',
		help: {
			url:'Bitte die URL(Adresse) eingeben',
			color:'Bitte die Farbe als Hex-Wert eingeben',
			quote:'Bitte den Namen(Autor) des Zitats angeben',
		},
	},
	fr: {
		change_text:'*Me faire un don*',
		quote:'Citation de',
		chose_color:'Couleur:',
		preview_window:'zone d\'aperçu',
		send:'Envoyer',
		preview:'Aperçu',
		help: {
			url:'Entre l\'adresse',
			color:'Entre la couleur (HEX)',
			quote:'Entre le nom de l\'auteur de la citation',
		},
	},
	en: {
		change_text:'*Donate me*',
		quote:'Quote by',
		chose_color:'Chose the color:',
		preview_window:'Preview-Area',
		send:'Post',
		preview:'Preview',
		help: {
			url:'Please enter the link\'s URL',
			color:'Please enter a HEX-Format color',
			quote:'Please enter the author\'s name',
		},
	},
};

function update_check(obj) {
	GM_xmlhttpRequest
	({
    	method: 'get',
   		url: obj.url,
		headers: {
        	'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.8',
        	'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(response) {
			var cont = response.responseText;
			var parser = new DOMParser();
			var dom = parser.parseFromString(cont,'text/xml');
			var dom = dom.getElementsByTagName(obj.name)[0];
			var vers = dom.getElementsByTagName('current')[0].textContent;
			var info = dom.getElementsByTagName('info')[0].textContent;
			var changes = dom.getElementsByTagName('changes')[0].textContent;
			if(vers!=obj.version) {
				updateIt = '<span class="bann"><a style="text-decoration:none !important;" href="'+obj.download+'">Update Installieren</a></span><br /><i>'+info+'</i><br /><small>'+changes+'</small>';
			} else {
				updateIt = '<span class="on" style="text-decoration:none !important;">Keine Updates!</span>';
			}
			document.getElementById('update').appendChild(createElement('style',{type:'text/css'},'.bann,.bann a{font-weight:bold;color:#C00!important;}.on,.on a{font-weight:bold;color:#090!important;}.bann,.on{font-family:Georgia,"TimesNewRoman",serif;font-weight:bold;font-variant:small-caps;}'));
			document.getElementById('update').innerHTML += updateIt;
		}
	});	
}



var url = document.location.hostname;
var language_code = url.match(/pennergame/) ? 'de' : (url.match(/clodogame/) ? 'fr' : 'en');
var language = language[language_code];
function $(id) {
	return document.getElementById(id);
}
editor = {
  init:function(node,smilenode,buttonnode) {
	  if(!smilenode) smilenode = node.parentNode;
	  if(!buttonnode) buttonnode = node.parentNode;
	  editor.area = node;
	  editor.smilies = smilenode;
	  editor.buttons = buttonnode;
	  editor.smilies_ob = {};
	  editor.offered_codes = [];
  },
  getArea:function() {
	  return editor.area;
  },
  addBBCode:function(typ) {
	  var ele = editor.createElement('input',typ);
	  editor.buttons.appendChild(ele);
  },
  addSmilie:function(src,short) {
	  var ele = editor.createElement('img',src,false,false,short);
	  ele.style.padding='1px';
	  editor.smilies.appendChild(ele);

	  if(short) editor.smilies_ob[short] = src;
  },
  addExtendetBBCode:function(typ,title) {
	  var ele = editor.createElement('input',typ,true,title);
	  editor.buttons.appendChild(ele);
  },
  insertCode:function() {
	if(!this) return false;
	var area = editor.getArea();
	var start = area.selectionStart;
	var ende = area.selectionEnd;
	var text = area.value;
	var vor = text.substr(0,start);
	var sel = text.substr(start,ende-start);
	var nach = text.substr(ende,text.length);
	area.value = vor+'['+this.value+']'+sel+'[/'+this.value+']'+nach;
  },
  insertExtCode:function() {
	if(!this) return false;
	if(this.value=='color'&&editor.color_input) arg = "#"+editor.color_input.value;
	else arg = window.prompt(this.title);
	var area = editor.getArea();
	var start = area.selectionStart;
	var ende = area.selectionEnd;
	var text = area.value;
	var vor = text.substr(0,start);
	var sel = text.substr(start,ende-start);
	var nach = text.substr(ende,text.length);
	if(arg==null || arg=='') {
		txt ='['+this.value+']';
	} else {
		if(this.value=='url') {
			if(sel!='') {
				txt = '['+this.value+'='+arg+']';			
			} else {
				txt = '['+this.value+']'+arg;
			}
		} else {
			txt = '['+this.value+'='+arg+']';
		}
	}
	
	
	area.value = vor+txt+sel+'[/'+this.value+']'+nach;
  },
  insertSmilie:function() {
	if(!this.src) return false;	
	else code = '[img]'+this.src+'[/img]';
	if(this.alt) code = this.alt;
	var area = editor.getArea();
	var start = area.selectionStart;
	var ende = area.selectionEnd;
	var text = area.value;
	var vor = text.substr(0,start);
	var nach = text.substr(ende);
	area.value = vor+code+nach;
  },
  createElement:function(typ,value,ext,title,alt) {
	  var ele = document.createElement(typ);
	  if(typ=='img') {
		  ele.src = value;
		  if(alt) ele.alt = alt;
		  edit = editor.insertSmilie;
	  } else if(typ=='input') {
		  ele.value = value;
		  ele.type = 'button';
		  if(title) ele.title = title;
		  edit = editor.insertCode;
		  editor.offered_codes.push(value);
	  }
	  if(ext==true) {
		  edit = editor.insertExtCode;		  
	  }
	  editor.lastele = ele;
	  ele.addEventListener('click',edit,false);
	  return ele;
  },
  lineBreak:function() {
	  editor.lastele.parentNode.appendChild(document.createElement('br'));
  },
  addPreview:function(ele,div) {
	  editor.preview_div = div;
	  ele.addEventListener('click',editor.triggerPreview,false);
  },
  triggerPreview:function() {
	  code = editor.area.value;
	  code = code.replace(/</g,'&lt;').replace(/>/g,'&gt;');
	  code = code.replace(new RegExp("\\n","g"),"<br />");
	 
	  editor.preview_code = code;
	  editor.replaceSmilies();
	  for(var a=0;a<editor.offered_codes.length;a++) {
		  editor.triggerPreviewFragment(editor.offered_codes[a]);
	  }
	  editor.preview_div.innerHTML = editor.preview_code;
  },
  triggerPreviewFragment:function(node) {
	  var reg = new RegExp('\\['+node+'(?:=.*?|)\\].*?\\[/'+node+'\\]','g');
	  //reg is now for example /\[b(?:=.*?|)\].*?\[\/b\]/g
	  res = editor.preview_code.match(reg);
	  if(!res) return;
	  //if theres no result (unknown error), just return
	  
	  //Here , the error seems as it already took place, alerting res just returns the first code-occurence
	  //alert(res); 
	  for(b=0;b<res.length;b++) {
		  cur_res = res[b];
		  //cur_res is now the matched code-tag
		  if(cur_res && cur_res != '') {
			//the raw bbcode tag.
			var arg_e = cur_res.match(/=/) ? cur_res.match(/=(.*?)\]/)[1] : false;
			//if, in the bbcode-tag theres an argument passed (like [url=...]..[/url], then match it
																				
			var inner = new RegExp('\\['+node+'(?:=.*?|)\\](.*?)\\[/'+node+'\\]');
			var inner = inner.exec(cur_res)[1];
			//get the inner"HTML" of the bbcode-tag
			
			node_new = node;
			if(!arg_e && node!='img' && node!='ref' &&node!='quote') {
				//if no args were passed and theres no img-tag
				arg = '';			  
			} else if(arg_e || node=='img' || node=='ref' || node=='quote') {
				switch(node) {
					case 'url':
					  arg = ' href="'+arg_e+'"';
					  node_new = 'a';
					  break;
					case 'color': 
					  arg = ' style="color:'+arg_e+'"';
					  node_new = 'span';
					  break;
					case 'img':
					  arg = ' src="'+inner+'"';
					  inner = '';
					  node_new = node;
					  break;
					case 'ref':
					  node_new = 'a';
					  arg = ' href="http://'+document.location.hostname+'/change_please/'+inner+'/"';
					  inner = language.change_text;
					  break;
					case 'quote':
					  node_new = 'div';
					  
					  inner = '<strong>'+language.quote+'<i>'+arg_e+'</i>:</strong><br />"<br />'+inner+'<br />"';
					  arg = ' class="user_quote"';
					  break;
					default:
					  arg='';
					  break;	
				}
			}
			//arg is the argument, formatted as style.. src, href or so
			new_code = '<'+node_new+arg+'>'+inner+'</'+node_new+'>';
			editor.preview_code = editor.preview_code.replace(cur_res,new_code);
			//Means, for each found tag of the node, replace it.
		  }
	  }
  },
  replaceSmilies:function() {
	  var sm = editor.smilies_ob;
	  for(smilie_code in sm) {
		  src = sm[smilie_code];
		  editor.preview_code = editor.preview_code.replace(smilie_code,'<img src="'+src+'"></img>');
	  }
  }
}
/**
 * jscolor, JavaScript Color Picker
 *
 * @version 1.3.1
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  Jan Odvarko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2010-01-23
 * @link    http://jscolor.com
 */


var jscolor = {


	dir : '', // location of jscolor directory (leave empty to autodetect)
	bindClass : 'color', // class name
	binding : true, // automatic binding via <input class="...">
	preloading : true, // use image preloading?


	install : function() {
		jscolor.addEvent(window, 'load', jscolor.init);
	},


	init : function() {
		if(jscolor.binding) {
			jscolor.bind();
		}
		if(jscolor.preloading) {
			jscolor.preload();
		}
	},


	getDir : function() {
		if(!jscolor.dir) {
			var detected = jscolor.detectDir();
			jscolor.dir = detected!==false ? detected : 'jscolor/';
		}
		return jscolor.dir;
	},


	detectDir : function() {
		var base = location.href;

		var e = document.getElementsByTagName('base');
		for(var i=0; i<e.length; i+=1) {
			if(e[i].href) { base = e[i].href; }
		}

		var e = document.getElementsByTagName('script');
		for(var i=0; i<e.length; i+=1) {
			if(e[i].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(e[i].src)) {
				var src = new jscolor.URI(e[i].src);
				var srcAbs = src.toAbsolute(base);
				srcAbs.path = srcAbs.path.replace(/[^\/]+$/, ''); // remove filename
				srcAbs.query = null;
				srcAbs.fragment = null;
				return srcAbs.toString();
			}
		}
		return false;
	},


	bind : function() {
		var matchClass = new RegExp('(^|\\s)('+jscolor.bindClass+')\\s*(\\{[^}]*\\})?', 'i');
		var e = document.getElementsByTagName('input');
		for(var i=0; i<e.length; i+=1) {
			var m;
			if(!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
				var prop = {};
				if(m[3]) {
					try {
						eval('prop='+m[3]);
					} catch(eInvalidProp) {}
				}
				e[i].color = new jscolor.color(e[i], prop);
			}
		}
	},


	preload : function() {
		for(var fn in jscolor.imgRequire) {
			if(jscolor.imgRequire.hasOwnProperty(fn)) {
				jscolor.loadImage(fn);
			}
		}
	},


	images : {
		pad : [ 181, 101 ],
		sld : [ 16, 101 ],
		cross : [ 15, 15 ],
		arrow : [ 7, 11 ]
	},


	imgRequire : {},
	imgLoaded : {},


	requireImage : function(filename) {
		jscolor.imgRequire[filename] = true;
	},


	loadImage : function(filename) {
		if(!jscolor.imgLoaded[filename]) {
			jscolor.imgLoaded[filename] = new Image();
			jscolor.imgLoaded[filename].src = jscolor.getDir()+filename;
		}
	},


	fetchElement : function(mixed) {
		return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
	},


	addEvent : function(el, evnt, func) {
		if(el.addEventListener) {
			el.addEventListener(evnt, func, false);
		} else if(el.attachEvent) {
			el.attachEvent('on'+evnt, func);
		}
	},


	fireEvent : function(el, evnt) {
		if(!el) {
			return;
		}
		if(document.createEventObject) {
			var ev = document.createEventObject();
			el.fireEvent('on'+evnt, ev);
		} else if(document.createEvent) {
			var ev = document.createEvent('HTMLEvents');
			ev.initEvent(evnt, true, true);
			el.dispatchEvent(ev);
		} else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
			el['on'+evnt]();
		}
	},


	getElementPos : function(e) {
		var e1=e, e2=e;
		var x=0, y=0;
		if(e1.offsetParent) {
			do {
				x += e1.offsetLeft;
				y += e1.offsetTop;
			} while(e1 = e1.offsetParent);
		}
		while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
			x -= e2.scrollLeft;
			y -= e2.scrollTop;
		}
		return [x, y];
	},


	getElementSize : function(e) {
		return [e.offsetWidth, e.offsetHeight];
	},


	getMousePos : function(e) {
		if(!e) { e = window.event; }
		if(typeof e.pageX === 'number') {
			return [e.pageX, e.pageY];
		} else if(typeof e.clientX === 'number') {
			return [
				e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
				e.clientY + document.body.scrollTop + document.documentElement.scrollTop
			];
		}
	},


	getViewPos : function() {
		if(typeof window.pageYOffset === 'number') {
			return [window.pageXOffset, window.pageYOffset];
		} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			return [document.body.scrollLeft, document.body.scrollTop];
		} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
		} else {
			return [0, 0];
		}
	},


	getViewSize : function() {
		if(typeof window.innerWidth === 'number') {
			return [window.innerWidth, window.innerHeight];
		} else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
			return [document.body.clientWidth, document.body.clientHeight];
		} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else {
			return [0, 0];
		}
	},


	URI : function(uri) { // See RFC3986

		this.scheme = null;
		this.authority = null;
		this.path = '';
		this.query = null;
		this.fragment = null;

		this.parse = function(uri) {
			var m = uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
			this.scheme = m[3] ? m[2] : null;
			this.authority = m[5] ? m[6] : null;
			this.path = m[7];
			this.query = m[9] ? m[10] : null;
			this.fragment = m[12] ? m[13] : null;
			return this;
		};

		this.toString = function() {
			var result = '';
			if(this.scheme !== null) { result = result + this.scheme + ':'; }
			if(this.authority !== null) { result = result + '//' + this.authority; }
			if(this.path !== null) { result = result + this.path; }
			if(this.query !== null) { result = result + '?' + this.query; }
			if(this.fragment !== null) { result = result + '#' + this.fragment; }
			return result;
		};

		this.toAbsolute = function(base) {
			var base = new jscolor.URI(base);
			var r = this;
			var t = new jscolor.URI;

			if(base.scheme === null) { return false; }

			if(r.scheme !== null && r.scheme.toLowerCase() === base.scheme.toLowerCase()) {
				r.scheme = null;
			}

			if(r.scheme !== null) {
				t.scheme = r.scheme;
				t.authority = r.authority;
				t.path = removeDotSegments(r.path);
				t.query = r.query;
			} else {
				if(r.authority !== null) {
					t.authority = r.authority;
					t.path = removeDotSegments(r.path);
					t.query = r.query;
				} else {
					if(r.path === '') { // TODO: == or === ?
						t.path = base.path;
						if(r.query !== null) {
							t.query = r.query;
						} else {
							t.query = base.query;
						}
					} else {
						if(r.path.substr(0,1) === '/') {
							t.path = removeDotSegments(r.path);
						} else {
							if(base.authority !== null && base.path === '') { // TODO: == or === ?
								t.path = '/'+r.path;
							} else {
								t.path = base.path.replace(/[^\/]+$/,'')+r.path;
							}
							t.path = removeDotSegments(t.path);
						}
						t.query = r.query;
					}
					t.authority = base.authority;
				}
				t.scheme = base.scheme;
			}
			t.fragment = r.fragment;

			return t;
		};

		function removeDotSegments(path) {
			var out = '';
			while(path) {
				if(path.substr(0,3)==='../' || path.substr(0,2)==='./') {
					path = path.replace(/^\.+/,'').substr(1);
				} else if(path.substr(0,3)==='/./' || path==='/.') {
					path = '/'+path.substr(3);
				} else if(path.substr(0,4)==='/../' || path==='/..') {
					path = '/'+path.substr(4);
					out = out.replace(/\/?[^\/]*$/, '');
				} else if(path==='.' || path==='..') {
					path = '';
				} else {
					var rm = path.match(/^\/?[^\/]*/)[0];
					path = path.substr(rm.length);
					out = out + rm;
				}
			}
			return out;
		}

		if(uri) {
			this.parse(uri);
		}

	},


	/*
	 * Usage example:
	 * var myColor = new jscolor.color(myInputElement)
	 */

	color : function(target, prop) {

		editor.color_input = target;
		this.required = true; // refuse empty values?
		this.adjust = true; // adjust value to uniform notation?
		this.hash = false; // prefix color with # symbol?
		this.caps = true; // uppercase?
		this.valueElement = target; // value holder
		this.styleElement = target; // where to reflect current color
		this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
		this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1

		this.pickerOnfocus = true; // display picker on focus?
		this.pickerMode = 'HSV'; // HSV | HVS
		this.pickerPosition = 'bottom'; // left | right | top | bottom
		this.pickerFace = 10; // px
		this.pickerFaceColor = 'ThreeDFace'; // CSS color
		this.pickerBorder = 1; // px
		this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color
		this.pickerInset = 1; // px
		this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
		this.pickerZIndex = 10000;


		for(var p in prop) {
			if(prop.hasOwnProperty(p)) {
				this[p] = prop[p];
			}
		}


		this.hidePicker = function() {
			if(isPickerOwner()) {
				removePicker();
			}
		};


		this.showPicker = function() {
			if(!isPickerOwner()) {
				var tp = jscolor.getElementPos(target); // target pos
				var ts = jscolor.getElementSize(target); // target size
				var vp = jscolor.getViewPos(); // view pos
				var vs = jscolor.getViewSize(); // view size
				var ps = [ // picker size
					2*this.pickerBorder + 4*this.pickerInset + 2*this.pickerFace + jscolor.images.pad[0] + 2*jscolor.images.arrow[0] + jscolor.images.sld[0],
					2*this.pickerBorder + 2*this.pickerInset + 2*this.pickerFace + jscolor.images.pad[1]
				];
				var a, b, c;
				switch(this.pickerPosition.toLowerCase()) {
					case 'left': a=1; b=0; c=-1; break;
					case 'right':a=1; b=0; c=1; break;
					case 'top':  a=0; b=1; c=-1; break;
					default:     a=0; b=1; c=1; break;
				}
				var l = (ts[b]+ps[b])/2;
				var pp = [ // picker pos
					-vp[a]+tp[a]+ps[a] > vs[a] ?
						(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
						tp[a],
					-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
						(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
						(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
				];
				drawPicker(pp[a], pp[b]);
			}
		};


		this.importColor = function() {
			if(!valueElement) {
				this.exportColor();
			} else {
				if(!this.adjust) {
					if(!this.fromString(valueElement.value, leaveValue)) {
						styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
						styleElement.style.color = styleElement.jscStyle.color;
						this.exportColor(leaveValue | leaveStyle);
					}
				} else if(!this.required && /^\s*$/.test(valueElement.value)) {
					valueElement.value = '';
					styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
					styleElement.style.color = styleElement.jscStyle.color;
					this.exportColor(leaveValue | leaveStyle);

				} else if(this.fromString(valueElement.value)) {
					// OK
				} else {
					this.exportColor();
				}
			}
		};


		this.exportColor = function(flags) {
			if(!(flags & leaveValue) && valueElement) {
				var value = this.toString();
				if(this.caps) { value = value.toUpperCase(); }
				if(this.hash) { value = '#'+value; }
				valueElement.value = value;
			}
			if(!(flags & leaveStyle) && styleElement) {
				styleElement.style.backgroundColor =
					'#'+this.toString();
				styleElement.style.color =
					0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? '#FFF' : '#000';
			}
			if(!(flags & leavePad) && isPickerOwner()) {
				redrawPad();
			}
			if(!(flags & leaveSld) && isPickerOwner()) {
				redrawSld();
			}
		};


		this.fromHSV = function(h, s, v, flags) { // null = don't change
			h<0 && (h=0) || h>6 && (h=6);
			s<0 && (s=0) || s>1 && (s=1);
			v<0 && (v=0) || v>1 && (v=1);
			this.rgb = HSV_RGB(
				h===null ? this.hsv[0] : (this.hsv[0]=h),
				s===null ? this.hsv[1] : (this.hsv[1]=s),
				v===null ? this.hsv[2] : (this.hsv[2]=v)
			);
			this.exportColor(flags);
		};


		this.fromRGB = function(r, g, b, flags) { // null = don't change
			r<0 && (r=0) || r>1 && (r=1);
			g<0 && (g=0) || g>1 && (g=1);
			b<0 && (b=0) || b>1 && (b=1);
			var hsv = RGB_HSV(
				r===null ? this.rgb[0] : (this.rgb[0]=r),
				g===null ? this.rgb[1] : (this.rgb[1]=g),
				b===null ? this.rgb[2] : (this.rgb[2]=b)
			);
			if(hsv[0] !== null) {
				this.hsv[0] = hsv[0];
			}
			if(hsv[2] !== 0) {
				this.hsv[1] = hsv[1];
			}
			this.hsv[2] = hsv[2];
			this.exportColor(flags);
		};


		this.fromString = function(hex, flags) {
			var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
			if(!m) {
				return false;
			} else {
				if(m[1].length === 6) { // 6-char notation
					this.fromRGB(
						parseInt(m[1].substr(0,2),16) / 255,
						parseInt(m[1].substr(2,2),16) / 255,
						parseInt(m[1].substr(4,2),16) / 255,
						flags
					);
				} else { // 3-char notation
					this.fromRGB(
						parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
						parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
						parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
						flags
					);
				}
				return true;
			}
		};


		this.toString = function() {
			return (
				(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
			);
		};


		function RGB_HSV(r, g, b) {
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if(m === 0) { return [ null, 0, v ]; }
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h, s, v) {
			if(h === null) { return [ v, v, v ]; }
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0: return [v,n,m];
				case 1: return [n,v,m];
				case 2: return [m,v,n];
				case 3: return [m,n,v];
				case 4: return [n,m,v];
				case 5: return [v,m,n];
			}
		}


		function removePicker() {
			delete jscolor.picker.owner;
			document.getElementsByTagName('body')[0].removeChild(jscolor.picker.boxB);
		}


		function drawPicker(x, y) {
			try {
			if(!jscolor.picker) {
				jscolor.picker = {
					box : document.createElement('div'),
					boxB : document.createElement('div'),
					pad : document.createElement('div'),
					padB : document.createElement('div'),
					padM : document.createElement('div'),
					sld : document.createElement('div'),
					sldB : document.createElement('div'),
					sldM : document.createElement('div')
				};
				for(var i=0,segSize=4; i<jscolor.images.sld[1]; i+=segSize) {
					var seg = document.createElement('div');
					seg.style.height = segSize+'px';
					seg.style.fontSize = '1px';
					seg.style.lineHeight = '0';
					jscolor.picker.sld.appendChild(seg);
				}
				jscolor.picker.sldB.appendChild(jscolor.picker.sld);
				jscolor.picker.box.appendChild(jscolor.picker.sldB);
				jscolor.picker.box.appendChild(jscolor.picker.sldM);
				jscolor.picker.padB.appendChild(jscolor.picker.pad);
				jscolor.picker.box.appendChild(jscolor.picker.padB);
				jscolor.picker.box.appendChild(jscolor.picker.padM);
				jscolor.picker.boxB.appendChild(jscolor.picker.box);
			}

			var p = jscolor.picker;
/* between here*/
			// recompute controls positions
			posPad = [
				x+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset,
				y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];
			posSld = [
				null,
				y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];

			// controls interaction
			var func1 = function() { target.focus(); };
			var func2 = function() { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } };
			var func3 = function(e) {holdPad=true; setPad(e); };
			var func4 = function() { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } };
			p.box.addEventListener('mouseup',func1,false);
			p.box.addEventListener('mouseout',func1,false);
			p.box.addEventListener('mousedown',function() { abortBlur=true; },false);
			p.box.addEventListener('mousemove',function(e) {holdPad && setPad(e); holdSld && setSld(e); },false);
			p.padM.addEventListener('mouseup',func2,false);
			p.padM.addEventListener('mouseout',func2,false);	
			p.padM.addEventListener('mousedown',func3,true);
			p.sldM.addEventListener('mouseup',func4,false);
			p.sldM.addEventListener('mouseout',func4,false);		
			p.sldM.addEventListener('mousedown',function(e) {holdSld=true; setSld(e); },false);

/* and here*/
			// picker
			p.box.style.width = 4*THIS.pickerInset + 2*THIS.pickerFace + jscolor.images.pad[0] + 2*jscolor.images.arrow[0] + jscolor.images.sld[0] + 'px';
			p.box.style.height = 2*THIS.pickerInset + 2*THIS.pickerFace + jscolor.images.pad[1] + 'px';

			// picker border
			p.boxB.style.position = 'absolute';
			p.boxB.style.clear = 'both';
			p.boxB.style.left = x+'px';
			p.boxB.style.top = y+'px';
			p.boxB.style.zIndex = THIS.pickerZIndex;
			p.boxB.style.border = THIS.pickerBorder+'px solid';
			p.boxB.style.borderColor = THIS.pickerBorderColor;
			p.boxB.style.background = THIS.pickerFaceColor;

			// pad image
			p.pad.style.width = jscolor.images.pad[0]+'px';
			p.pad.style.height = jscolor.images.pad[1]+'px';

			// pad border
			p.padB.style.position = 'absolute';
			p.padB.style.left = THIS.pickerFace+'px';
			p.padB.style.top = THIS.pickerFace+'px';
			p.padB.style.border = THIS.pickerInset+'px solid';
			p.padB.style.borderColor = THIS.pickerInsetColor;

			// pad mouse area
			p.padM.style.position = 'absolute';
			p.padM.style.left = '0';
			p.padM.style.top = '0';
			p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
			p.padM.style.height = p.box.style.height;
			p.padM.style.cursor = 'crosshair';

			// slider image
			p.sld.style.overflow = 'hidden';
			p.sld.style.width = jscolor.images.sld[0]+'px';
			p.sld.style.height = jscolor.images.sld[1]+'px';

			// slider border
			p.sldB.style.position = 'absolute';
			p.sldB.style.right = THIS.pickerFace+'px';
			p.sldB.style.top = THIS.pickerFace+'px';
			p.sldB.style.border = THIS.pickerInset+'px solid';
			p.sldB.style.borderColor = THIS.pickerInsetColor;

			// slider mouse area
			p.sldM.style.position = 'absolute';
			p.sldM.style.right = '0';
			p.sldM.style.top = '0';
			p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
			p.sldM.style.height = p.box.style.height;
			try {
				p.sldM.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.sldM.style.cursor = 'hand';
			}

			// load images in optimal order
			switch(modeID) {
				case 0: var padImg = 'hs.png'; break;
				case 1: var padImg = 'hv.png'; break;
			}
			p.padM.style.background = "url('http://zahlii.independent-irc.com/BBCode/Color/cross.gif') no-repeat";
			p.sldM.style.background = "url('http://zahlii.independent-irc.com/BBCode/Color/arrow.gif') no-repeat";
			p.pad.style.background = "url('http://zahlii.independent-irc.com/BBCode/Color/"+padImg+"') 0 0 no-repeat";

			// place pointers
			redrawPad();
			redrawSld();

			jscolor.picker.owner = THIS;
			document.getElementsByTagName('body')[0].appendChild(p.boxB);
			}catch(e) {
				document.body.innerHTML += (e);
			}
		}


		function redrawPad() {
			// redraw the pad pointer
			switch(modeID) {
				case 0: var yComponent = 1; break;
				case 1: var yComponent = 2; break;
			}
			var x = Math.round((THIS.hsv[0]/6) * (jscolor.images.pad[0]-1));
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.pad[1]-1));
			jscolor.picker.padM.style.backgroundPosition =
				(THIS.pickerFace+THIS.pickerInset+x - Math.floor(jscolor.images.cross[0]/2)) + 'px ' +
				(THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.cross[1]/2)) + 'px';

			// redraw the slider image
			var seg = jscolor.picker.sld.childNodes;

			switch(modeID) {
				case 0:
					var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
					for(var i=0; i<seg.length; i+=1) {
						seg[i].style.backgroundColor = 'rgb('+
							(rgb[0]*(1-i/seg.length)*100)+'%,'+
							(rgb[1]*(1-i/seg.length)*100)+'%,'+
							(rgb[2]*(1-i/seg.length)*100)+'%)';
					}
					break;
				case 1:
					var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
					var i = Math.floor(THIS.hsv[0]);
					var f = i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
					switch(i) {
						case 6:
						case 0: rgb=[0,1,2]; break;
						case 1: rgb=[1,0,2]; break;
						case 2: rgb=[2,0,1]; break;
						case 3: rgb=[2,1,0]; break;
						case 4: rgb=[1,2,0]; break;
						case 5: rgb=[0,2,1]; break;
					}
					for(var i=0; i<seg.length; i+=1) {
						s = 1 - 1/(seg.length-1)*i;
						c[1] = c[0] * (1 - s*f);
						c[2] = c[0] * (1 - s);
						seg[i].style.backgroundColor = 'rgb('+
							(c[rgb[0]]*100)+'%,'+
							(c[rgb[1]]*100)+'%,'+
							(c[rgb[2]]*100)+'%)';
					}
					break;
			}
		}


		function redrawSld() {
			// redraw the slider pointer
			switch(modeID) {
				case 0: var yComponent = 2; break;
				case 1: var yComponent = 1; break;
			}
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.sld[1]-1));
			jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.arrow[1]/2)) + 'px';
		}


		function isPickerOwner() {
			return jscolor.picker && jscolor.picker.owner === THIS;
		}


		function blurTarget() {
			if(valueElement === target) {
				THIS.importColor();
			}
			if(THIS.pickerOnfocus) {
				THIS.hidePicker();
			}
		}


		function blurValue() {
			if(valueElement !== target) {
				THIS.importColor();
			}
		}


		function setPad(e) {
			var posM = jscolor.getMousePos(e);
			var x = posM[0]-posPad[0];
			var y = posM[1]-posPad[1];
			switch(modeID) {
				case 0: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), 1 - y/(jscolor.images.pad[1]-1), null, leaveSld); break;
				case 1: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), null, 1 - y/(jscolor.images.pad[1]-1), leaveSld); break;
			}
		}


		function setSld(e) {
			var posM = jscolor.getMousePos(e);
			var y = posM[1]-posPad[1];
			switch(modeID) {
				case 0: THIS.fromHSV(null, null, 1 - y/(jscolor.images.sld[1]-1), leavePad); break;
				case 1: THIS.fromHSV(null, 1 - y/(jscolor.images.sld[1]-1), null, leavePad); break;
			}
		}


		var THIS = this;
		var modeID = this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
		var abortBlur = false;
		var
			valueElement = jscolor.fetchElement(this.valueElement),
			styleElement = jscolor.fetchElement(this.styleElement);
		var
			holdPad = false,
			holdSld = false;
		var
			posPad,
			posSld;
		var
			leaveValue = 1<<0,
			leaveStyle = 1<<1,
			leavePad = 1<<2,
			leaveSld = 1<<3;

		// target
		jscolor.addEvent(target, 'focus', function() {
			if(THIS.pickerOnfocus) { THIS.showPicker(); }
		});
		jscolor.addEvent(target, 'blur', function() {
			if(!abortBlur) {
				window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; }, 0);
			} else {
				abortBlur = false;
			}
		});

		// valueElement
		if(valueElement) {
			var updateField = function() {
				THIS.fromString(valueElement.value, leaveValue);
			};
			jscolor.addEvent(valueElement, 'keyup', updateField);
			jscolor.addEvent(valueElement, 'input', updateField);
			jscolor.addEvent(valueElement, 'blur', blurValue);
			valueElement.setAttribute('autocomplete', 'off');
		}

		// styleElement
		if(styleElement) {
			styleElement.jscStyle = {
				backgroundColor : styleElement.style.backgroundColor,
				color : styleElement.style.color
			};
		}

		// require images
		switch(modeID) {
			case 0: jscolor.requireImage('hs.png'); break;
			case 1: jscolor.requireImage('hv.png'); break;
		}
		jscolor.requireImage('cross.gif');
		jscolor.requireImage('arrow.gif');

		this.importColor();
	}

};
jscolor.install();


init_shoutbox();
function init_shoutbox() {
	var url = document.location.href;
	if(!url.match(/settings/)) {
		var textarea = $('f_text');
		var value = textarea.value;
		var name = 'f_text';
	} else {
		var textarea = document.getElementsByTagName('textarea')[0];
		var value = textarea.value;
		var name = 'description';
	}
	var par_div = textarea.parentNode;
	par_div.innerHTML = "";
	par_div.style.textAlign='left';
	par_div.appendChild(createElement('style',{type:'text/css'},'#smilies,#buttons { text-align:left;}'));
	par_div.appendChild(createElement('textarea',{id:'f_text',name:name,style:'width:98%',rows:15},value));
	par_div.appendChild(createElement('div',{id:'smilies',width:'98%'}));
	par_div.appendChild(createElement('div',{id:'buttons',width:'98%'}));
	editor.init($('f_text'),$('smilies'),$('buttons'));	
	add_funcs();
	par_div.appendChild(createElement('span',{},language.chose_color));
	par_div.appendChild(createElement('input',{class:'color',id:'color'}));
	myColor = new jscolor.color($('color'));
	par_div.appendChild(createElement('br'));
	par_div.appendChild(createElement('br'));
	par_div.appendChild(createElement('input',{type:'submit',value:language.send,name:'submit'}));
	par_div.appendChild(createElement('input',{id:'prev',value:language.preview,type:'button'}));
	par_div.appendChild(createElement('div',{id:'preview',width:'98%',style:'border:1px solid #222;text-align:left;padding:5px;'},'<center>'+language.preview_window+'</center>'));
	editor.addPreview($('prev'),$('preview'));	
	par_div.appendChild(createElement('div',{id:'update',width:'98%',style:'border:1px solid #222;text-align:left;padding:5px;'}));
}
function createElement(type,attrs,inner) {
	var tmp_elem = document.createElement(type);
	if(!attrs) return tmp_elem;
	for(var att_name in attrs) {
		tmp_elem.setAttribute(att_name,attrs[att_name]);
	}
	if(inner==null || inner=='undefined') return tmp_elem;
	tmp_elem.innerHTML = inner;
	return tmp_elem;
}
function add_funcs() {
	/*
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_smile.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_biggrin.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_sad.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_surprised.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_eek.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_confused.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_cool.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_lol.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_mad.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_razz.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_redface.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_cry.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_evil.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_twisted.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_rolleyes.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_wink.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_wink.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_neutral.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_mrgreen.gif ');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_arrow.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_exclaim.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/10/icon_idea.gif');
editor.lineBreak();
*/
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-smile.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-wink.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-laugh.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-cool.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-smirk.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-raspberry.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-sad.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-crying.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-plain.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-uncertain.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-embarrassed.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-worried.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-surprise.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-angry.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-monkey.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-devilish.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/face-angel.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/stock_right.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/dialog-warning.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/help-browser.png');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2009/07/dialog-information.png');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_megaeek.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_eckbanner04.gif')

editor.lineBreak();
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_shocked.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_trage.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_rollstuhl1.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_pssst.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_charly_klatscher.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_knutsch.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_stevieh_seufz.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_daumendreh.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hurra_fruehling1_orange.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hecheln.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_charly_rofl.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kolobok.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_auslachen.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kolobok-hallo-kappe.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_smile.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_wallbash.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_star-wars-jedi2-gelb.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_klatsch.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hurra3.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mrgreen-dance.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_handjob.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_wink.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_nosmile.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_rolleyes.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_razz.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_biggrin2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_biggrin.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_coolnew.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_frown.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_blushnew.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_neutral.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_denker.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_weissnich.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_slash.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_oh-no2.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_yes.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_nana.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_nicht-lachen02.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_schweig.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_wp-arrow.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_wp-exclaim.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_wp-question.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_wp-idea.gif');

editor.lineBreak();
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_XP-rosa.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_confused.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_ben_dummekuh.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_doh.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_gott.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_irre.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_vampir.gif');
editor.addSmilie('http://www.greensmilies.com/smile/d2_saya_pala2.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2007/02/d1_rogue00.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_seb_cowboy_biggrin.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mad_GREEN.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_motz.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_kane.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_aufsmaul.gif');
editor.addSmilie('http://www.greensmilies.com/wp-content/uploads/2006/07/gw_warrior005.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kopfschmerz.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_zombies_biggrin.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_blaues-auge.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_stevieh_teddy.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kings_rolleyes.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kings_pfeif2.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kings_aufsmaul.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_lyssa_krone-heben.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_brieftraeger.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hangman.gif')
editor.addSmilie('http://www.greensmilies.com/smile/gw_warrior004.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_headbash.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kettensaege2.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_patsch.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_datz.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_selbstmord.gif')

editor.lineBreak();
editor.addSmilie('http://www.greensmilies.com/smile/gw_paragon001.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_seb_singing.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_sleep.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_bigtongue.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_winken4.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hurra2.gif');
editor.addSmilie('http://www.greensmilies.com/wp-includes/images/smilies/smiley_emoticons_lachtot.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_silvester_cool.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_silvester_razz.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_unknownauthor_trink.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_joint.gif'); 
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_dj.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_hinterlistig.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_sex4.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_waffe14.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_segen.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_fliegebaseball.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_steckenpferd.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_ugly-tittenwackler.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_nazis-raus.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_handshake.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_rate11b.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_rate01.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hoplit_sword2_m.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_flucht.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_wonderoflife.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kruecken.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_paradoxon7.gif');
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_fluch5.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_paradoxon5.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_scream-if-you-can.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_seb_hut5.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_uergs.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_vollpanik.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_bauarbeiter-hilti.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_reggae-jedi.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_cool-down.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_fieser_blick.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_grab-schaufler.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_haeuptling.gif') 
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_seb_detektiv_ani.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_steinpinkler.gif')
editor.addSmilie('http://www.greensmilies.com/smile/gw_assassine001.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_hurra.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_2thumbs.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_down.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_borat2.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mk_bildleser.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_number1_c.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_ahhahaha.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_xp-ani01.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_breitesgrinsen.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_streichel.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_safersex.gif') 
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_pokal_gold.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_pokal_silber.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_pokal_bronze.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_klo-musik-mann3.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_laufen2.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_gewichtheben02.gif') 
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_rennrad_2.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_boxen4.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_auto_skoda_octavia_silber2.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_ugly_gruebel.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_lanzarote.gif') 
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_bravo2.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_joint.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_skeptisch.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_herzen02.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_jumpgrin.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_anmachen.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_rose.gif')	
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_klo-musik-mann3.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kolobok-sanduhr.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_charly_rofl.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_charly_tuete.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_charly_klatscher.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_kolobok-hallo-kappe.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_charly_link_green.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_google3.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_auto_schlagloch.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mondfrau_kilroy-winkt.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_mttao_staubsaugen.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_browser-ie-vs-ff.gif')
editor.addSmilie('http://www.greensmilies.com/smile/smiley_emoticons_schal_deutschland.gif')
editor.addSmilie('http://www.abload.de/img/1_0kopieeqq0.gif')
       editor.lineBreak();}
	
	editor.addBBCode('b');
	editor.addBBCode('i');
	editor.addBBCode('u');
	editor.addBBCode('center');
	editor.addBBCode('big');
	editor.addBBCode('small');
	editor.addBBCode('img');
	editor.addBBCode('marquee');
	editor.addBBCode('ref');
	editor.addBBCode('youtube');
	editor.addBBCode('youtube_m');
	
	editor.lineBreak();
	
	editor.addExtendetBBCode('url',language.help.url);
	editor.addExtendetBBCode('color',language.help.color);
	editor.addExtendetBBCode('quote',language.help.quote);