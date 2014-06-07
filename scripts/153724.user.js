// ==UserScript==
// @name           User
// @description    Hello world
// @include        *://*.*/*
// @version        0.9
// ==/UserScript==

/*
To do:
- element.is() function
- dates
- integrate timer
- fire custom events ie7
- $k(this) handling //make it $(these)
- ready event
- docs!!!
- error throwing
*/

kLib={
	basicInfo: {
		version: '1.0',
		build: '18',
		stage: 'onWork',
		buildDate: '2012-12-07',
		getFullVersionInfo: function () {
			return kLib.basicInfo.version+'.'+kLib.basicInfo.build+' '+kLib.basicInfo.stage;
		}
	},
	regExp: {
		trimLeft: /^\s\s*/,
		trimRight: /\s\s*$/,
		simpleTag: /^[a-zA-Z]*$/,
		simpleId: /^#[a-zA-Z0-9\-\_]*$/,
		simpleClass: /^\.[a-zA-Z0-9\-\_]*$/,
		simpleTag: /^\<[A-z]+\>$/,
		complexTag: /^\<.*\>$/,
		bindToWindow: function () {
			for (var regExp in kLib.regExp) {
				window[regExp]=kLib.regExp[regExp];
			}
			return true;
		}
	},
	UA: {
		name: '',
		short: '',
		version: NaN,
		OS: '',
		getUAInfo: function () {
			kLib.UA.name=(function () {
				if (window.ActiveXObject) {
					return 'Internet Explorer';
				}
				if (window.opera) {
					return 'Opera';
				}
				if (window.chrome) {
					return 'Chrome';
				}
				if (window.WebKitAnimationEvent) {
					return 'Safari';
				}
				if (window.clientInformation) {
					return 'Konqueror';
				}
				if (window.mozRequestAnimationFrame) {
					if (window.navigator.userAgent.indexOf('SeaMonkey')!=-1) {
						return 'SeaMonkey';
					}
					if (window.navigator.userAgent.indexOf('Firefox')!=-1) {
						return 'Firefox';
					}
				}
				if (window.XPCSafeJSObjectWrapper) {
					return 'Camino';
				}
				return 'Unknown';
			})();
			kLib.UA.short=(function () {
				switch (kLib.UA.name) {
					case 'Internet Explorer':
						return 'IE';
					case 'Opera':
						return 'O';
					case 'Chrome':
						return 'CH';
					case 'Safari':
						return 'S';
					case 'Konqueror':
						return 'K';
					case 'SeaMonkey':
						return 'SM';
					case 'Firefox':
						return 'FF';
					case 'Camino':
						return 'C';
					default:
						return 'UK';
				}
			})();
			kLib.UA.version=(function () {
				switch (kLib.UA.name) {
					case 'Internet Explorer':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('MSIE ')+5));
					case 'Opera':
						return (navigator.userAgent.find('Version/')) ? parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Version/')+8)) : version=parseFloat(navigator.userAgent.substr(6));
					case 'Chrome':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Chrome/')+7));
					case 'Safari':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Version/')+8));
					case 'Konqueror':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Konqueror/')+10));
					case 'SeaMonkey':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('SeaMonkey/')+10));
					case 'Firefox':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Firefox/')+8));
					case 'Camino':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Camino/')+7));
					default:
						return NaN;
				}
			})();
			kLib.UA.browser=kLib.UA.name+' '+kLib.UA.version;
			kLib.UA.agent=kLib.UA.short+kLib.UA.version;
		}
	},
	extendDefaultObjectMethods: function () {
		Array.prototype.remove=function (element, all) {
			var found=false, _len, _i;
			if (all) {
				for (_i=0, _len=this.length; _i<_len; _i++) {
					if (this[_i]===element) {
						this.splice(_i--, 1);
						found=true;
					}
				}
			}
			else {
				for (_i=0, _len=this.length; _i<_len; _i++) {
					if (this[_i]===element) {
						this.splice(_i, 1);
						return true;
					}
				}
			}
			return found;
		};
		Array.prototype.find=function (element) {
			return (this.indexOf(element)!==-1);
		};
		String.prototype.firstChar=function () {
			return this.charAt(0)
		};
		String.prototype.lastChar=function () {
			return this.charAt(this.length-1)
		};
		String.prototype.count=function () {
			var i, j, count=0, len=this.length, aLen=arguments.length, arg;
			for (i=0; i<aLen; i++) {
				arg=arguments[i];
				if (arg.length===1 && typeof arg==='string') {
					for (j=0; j<len; j++) {
						count+= +(arg===this[j]);
					}
				}
				else if (typeof arg==='string') {
					count+=this.match(new RegExp(arg, 'g')).length;
				}
				else if (arg instanceof RegExp) {
					count+=this.match(arg).length;
				}
				else {
					throw new TypeError('Unexpected parameters in function.');
				}
			}
			return count;
		};
		String.prototype.find=function () {
			for (_i=0; _i<arguments.length; _i++) {
				if (this.match(arguments[_i])) {
					return true;
				}
			}
			return false;
		};
		String.prototype.trimSpaces=function () {
			return this.replace(kLib.regExp.trimLeft, '').replace(kLib.regExp.trimRight, '');
		};
		String.prototype.toCamelCase=function () {
			return this.replace(/((\s|-|_)+[^(\s|-|_)])/g, function ($1) {return $1.toUpperCase().replace(/(\s|-|_)+/,'')});
		};
		String.prototype.toDashCase=function () {
			return this.replace(/((\s|-|_)+[^(\s|-|_)])/g, function ($1) {return $1.replace(/(\s|-|_)+/, '-')});
		};
		String.prototype.toUnderscoreCase=function () {
			return this.replace(/((\s|-|_)+[^(\s|-|_)])/g, function ($1) {return $1.replace(/(\s|-|_)+/, '_')});
		};
		String.prototype.toJSONCase=function () {
			return this.replace(/[^(\w|$)]+/g, '').replace(/\b[0-9]+/, '');
		};
		Number.prototype.leadingZeroes=function (digits) {
			var str=this.toString();
			if (isNaN(digits) || !isFinite(digits) || arguments.length>1) {
				throw new TypeError('Unexpected parameters in function.');
			}
			if (this>=0) {
				while (str.length<digits) {
					str='0'+str;
				}
			}
			else {
				str=str.substr(1);
				while (str.length<digits-1) {
					str='0'+str;
				}
				str='-'+str;
			}
			return str;
		};
		kLib.QuerySelection.prototype=kLib.dom;
	},
	dom: {
		toString: function () {
			var string, i, len=this.length, digits=(this.length-1).toString().length;
			string='query: '+this.query;
			string+='\ncontext: '+((this.context instanceof kLib.QuerySelection) ? '[kLib query]' : this.context);
			string+='\nlength: '+this.length;
			for (i=0; i<len; i++) {
				string+='\n'+i.leadingZeroes(digits)+'. '+((this[i] instanceof kLib.QuerySelection) ? '[kLib query]' : this[i]);
			}
			return string;
		},
		concat: function () {
			var i, j=this.length, k, len=arguments.length, arg, aLen;
			this.context=undefined;
			this.query=undefined;
			for (i=0; i<len; i++) {
				arg=arguments[i];
				if (arg instanceof Array || arg instanceof kLib.QuerySelection) {
					aLen=arg.length;
					for (k=0; k<aLen; k++) {
						this[j]=arg[k];
						j++;
					}
				}
				else if (typeof arg==='string') {
					arg=kLib(arg);
					aLen=arg.length;
					for (k=0; k<aLen; k++) {
						this[j]=arg[k];
						j++;
					}
				}
				else {
					this[j]=arg;
					j++;
				}
			}
			this.length=j;
			return this;
		},
		join: function () {
			var i, aLen=arguments.length;
			this.context=undefined;
			this.query=undefined;
			for (i=0; i<aLen; i++) {
				this[this.length]=arguments[i];
				this.length++;
			}
			return this;
		},
		isDOM: function () {
			var i, len=this.length;
			for (i=0; i<len; i++) {
				if (!(this[i] instanceof HTMLElement || this[i]===document || this[i]===window)) {
					return false;
				}
			}
			return true;
		},
		ieGetUniqueID: function () {
			var _len, _i, idArray=[];
			for (_i=0, _len=this.length; _i<_len; _i++) {
				if (this[_i]===window) {
					idArray[_i]='window';
				}
				else if (this[_i]===document) {
					idArray[_i]='document';
				}
				else {
					idArray[_i]=this[_i].uniqueID;
				}
			}
			return idArray;
		},
		css: function (obj, val) {
			var camelized, _len, _i, _prop, currentStyle, cachedDisplay, arr='';
			if (typeof obj==='string' && typeof val==='string') {
				camelized=obj.toCamelCase();
				for (_i=0, _len=this.length; _i<_len; _i++) {
					this[_i].style[camelized]=val;
				}
			}
			else if (typeof obj==='object') {
				for (_prop in obj) {
					arr+=_prop+':'+obj[_prop]+';';
				}
				for (_i=0, _len=this.length; _i<_len; _i++) {
					this[_i].setAttribute('style', arr);
				}
			}
			else {
				throw new TypeError('Unexpected parameters in function.');
			}
			return this;
		},
		on: function (eventName, handler, capture, args) {
			var _len, _i, _key, _fn, _elm;
			if (typeof eventName==='string' && typeof handler==='function') {
				capture=(capture instanceof Array) ? false : !!capture;
				args=(capture instanceof Array) ? capture : args;
				args=(args instanceof Array) ? args : false;
				if (window.addEventListener) {
					if (args) {
						_fn=function (event) {
							handler.apply(this, args);
						}
						for (_i=0, _len=this.length; _i<_len; _i++) {
							this[_i].addEventListener(eventName, _fn, capture);
						}
					}
					else {
						for (_i=0, _len=this.length; _i<_len; _i++) {
							this[_i].addEventListener(eventName, handler, capture);
						}
					}
				}
				else {
					idArray=kLib(this).ieGetUniqueID();
					eventName='on'+eventName;
					for (_i=0, _len=this.length; _i<_len; _i++) {
						_key='functionKey::objectId_'+idArray[_i]+'::eventName_'+eventName+'::function_'+handler+'::arguments'+args;
						_fn=kLib.auxVars.handlers[_key];
						if (!_fn) {
							if (args) {
								_fn=function (event) {
									handler.apply(event.srcElement, args)
								}
							}
							else {
								_fn=function (event) {
									handler.call(event.srcElement, event)
								}
							}
							kLib.auxVars.handlers[_key]=_fn;
							_elm=this[_i];
							_elm.attachEvent(eventName, _fn);
							window.attachEvent('onunload', function () {
								_elm.detachEvent(eventName, _fn);
							});
						}
					}
				}
			}
			else {
				throw new TypeError('Unexpected parameters in function.');
			}
			return this;
		},
		off: function (eventName, handler, capture, args) {
			var _len, _i;
			if (typeof eventName==='string' && typeof handler==='function') {
				capture=(capture instanceof Array) ? false : !!capture;
				args=(capture instanceof Array) ? capture : args;
				args=(args instanceof Array) ? args : false;
				if (window.removeEventListener) {
					if (args) {
						_fn=function (event) {
							handler.apply(this, args);
						}
						for (_i=0, _len=this.length; _i<_len; _i++) {
							this[_i].addEventListener(eventName, _fn, capture);
						}
					}
					else {
						for (_i=0, _len=this.length; _i<_len; _i++) {
							this[_i].removeEventListener(eventName, handler, capture);
						}
					}
				}
				else {
					idArray=kLib(this).ieGetUniqueID();
					eventName='on'+eventName;
					for (_i=0, _len=this.length; _i<_len; _i++) {
						_key='functionKey::objectId_'+idArray[_i]+'::eventName_'+eventName+'::function_'+handler+'::arguments'+args;
						_fn=kLib.auxVars.handlers[_key];
						if (_fn) {
							this[_i].detachEvent(eventName, _fn);
							delete kLib.auxVars.handlers[_key];
						}
					}
				}
			}
			else {
				throw new TypeError('Unexpected parameters in function.');
			}
			return this;
		},
		trigger: function (event, properties, bubbles, cancelable) {
			var _i, _len, _str, _prop;			
			if (window.dispatchEvent) {
				if (typeof event==='string') {
					_str=event;
					event=document.createEvent('Event');
					bubbles=bubbles ? true : false;
					cancelable=cancelable ? true : false;
					event.initEvent(_str, bubbles, cancelable);
				}
				if (typeof properties==='object') {
					for (_prop in properties) {
						if (!event[_prop]) {
							event[_prop]=properties[_prop];
						}
					}
				}
				for (_i=0, _len=this.length; _i<_len; _i++) {
					this[_i].dispatchEvent(event);
				}
			}
			else {
				if (typeof event==='object' && event.type) {
					_str='on'+event.type;
				}
				else if (typeof event==='string') {
					_str='on'+event;
				}
				for (_i=0, _len=this.length; _i<_len; _i++) {
					if (this[_i]!==window) {
						this[_i].fireEvent(_str);
					}
				}
			}
			return this;
		},
		remove: function () {
			for (_i=0; _i<this.el.length; _i++) {
				this.el[_i].style.display='none';
			}
			return this;
		},
		forEach: function (code) {
			if (code) {
				for (_i=0; _i<this.length; _i++) {
					code.call(this[_i]);
				}
			}
			return this;
		},
		toggle: function (string, obj) {
			if (string=='style' || string=='css') {
				this.toggleCss(obj);
			}
			return this;
		},
		toggleCss: function (obj) {
			for (_i=0; _i<this.el.length; _i++) {
				for (prop in obj) {
					if (obj[prop] instanceof Array) {
						if (this.el[_i].style[prop.toCamelCase()]==obj[prop][0]) {
							this.el[_i].style[prop.toCamelCase()]=obj[prop][1];
						}
						else {
							this.el[_i].style[prop.toCamelCase()]=obj[prop][0];
						}
					}
				}
			}
			return this;
		}
	},
	debug: {
		writeToConsole: function (newText, overWriting) {
			consoleDisplay=document.getElementById('consoleDisplay');
			if (consoleDisplay) {
				consoleDisplay.style.visibility='visible';
				consoleDisplay.style.display='block';
				if (overWriting) {
					consoleDisplay.innerText=newText+'\n';
				}
				else {
					consoleDisplay.innerText+=newText+'\n';
				}
				while (consoleDisplay.innerText.count('\n')>200) {
					consoleDisplay.innerText=consoleDisplay.innerText.replace(/^.*\n/, '');
				}
				consoleDisplay.scrollTop=10000;
			}
			else {
				consoleDisplay=document.createElement('pre');
				consoleDisplay.id='consoleDisplay';
				consoleDisplay.style.position='fixed';
				consoleDisplay.style.top='auto';
				consoleDisplay.style.left='auto';
				consoleDisplay.style.bottom='0px';
				consoleDisplay.style.right='0px';
				consoleDisplay.style.width='400px';
				consoleDisplay.style.height='150px';
				consoleDisplay.style.backgroundColor=(kLib.UA.name==='Internet Explorer') ? '#212121' : 'rgba(33,33,33,0.9)';
				consoleDisplay.style.color='#ffffff';
				consoleDisplay.style.zIndex='9999';
				consoleDisplay.style.overflowY='auto';
				consoleDisplay.style.wordWrap='break-word';
				consoleDisplay.style.borderRadius='5px';
				consoleDisplay.style.paddingLeft='7px';
				consoleDisplay.style.margin='0px';
				consoleDisplay.ondblclick=cClose;
				document.getElementsByTagName('body')[0].appendChild(consoleDisplay);
				kLib.debug.writeToConsole(newText, overWriting);
			}
		},
		closeConsole: function (clearConsole) {
			if (window.consoleDisplay) {
				consoleDisplay.style.display='none';
				if (clearConsole) {
					consoleDisplay.innerText='';
				}
			}
		}
	},
	auxVars: {
		handlers: {}
	},
	select: function () {
		var string=arguments[0], obj=arguments[1], element, cont;
		if (typeof string==='string' && ((obj instanceof Object && !(obj instanceof Array)) || typeof obj==='undefined')) {
			if (simpleTag.test(string.trimSpaces())) {
				element=document.createElement(string.trimSpaces().substring(1, string.trimSpaces().length-1));
				for (prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						element[prop]=obj[prop];
					}
				}
				return kLib(element);
			}
			else if (complexTag.test(string.trimSpaces())) {
				cont=document.createElement('div');
				cont.innerHTML=string;
				element=cont.firstChild;
				for (prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						element[prop]=obj[prop];
					}
				}
				return kLib(element);
			}
		}
		return new kLib.QuerySelection(arguments);
	},
	QuerySelection: function () {
		var _aux, _len, aLen=arguments[0].length, _i, _j, trimmedString, cid, arg, context=arguments[0][1], string=arguments[0][0], _arguments=arguments[0];
		var existsAlready=function (collection, element) {
			var i, len=collection.length;
			for (i=0; i<len; i++) {
				if (collection[i]===element) {
					return true;
				}
			}
			return false;
		};
		this.length=0;
		if (typeof string==='string' && (typeof context==='undefined' || typeof context==='string' || kLib(context).isDOM()) && aLen<3) {
			this.query=string;
			if (!context) {
				context=window.document;
			}
			this.context=context;
			context=kLib(context);
			if (context.isDOM()) {
				trimmedString=string.trimSpaces();
				for (cid=0; cid<context.length; cid++) {
					if (simpleId.test(trimmedString) && context[cid]===document) {
						_aux=document.getElementById(trimmedString.slice(1));
						if (_aux) {
							if (!existsAlready(this, _aux)) {
								this[this.length]=_aux;
								this.length++;
							}
						}
					}
					else if (simpleClass.test(trimmedString) && context[cid].getElementsByClassName) {
						_aux=context[cid].getElementsByClassName(trimmedString.slice(1));
						_len=_aux.length;
						for (_i=0; _i<_len; _i++) {
							if (!existsAlready(this, _aux[_i])) {
								this[this.length]=_aux[_i];
								this.length++;
							}
						}
					}
					else if (simpleTag.test(trimmedString)) {
						_aux=context[cid].getElementsByTagName(string);
						_len=_aux.length;
						for (_i=0; _i<_len; _i++) {
							if (!existsAlready(this, _aux[_i])) {
								this[this.length]=_aux[_i];
								this.length++;
							}
						}
					}
					else {
						_aux=context[cid].querySelectorAll(string);
						_len=_aux.length;
						for (_i=0; _i<_len; _i++) {
							if (!existsAlready(this, _aux[_i])) {
								this[this.length]=_aux[_i];
								this.length++;
							}
						}
					}
				}
			}
		}
		else {
			for (_i=0; _i<aLen; _i++) {
				arg=_arguments[_i];
				if (arg instanceof Array || arg instanceof kLib.QuerySelection || typeof arg==='string') {
					arg=(typeof arg==='string') ? kLib(arg) : arg;
					_len=arg.length;
					for (_j=0; _j<_len; _j++) {
						this[this.length]=arg[_j];
						this.length++;
					}
				}
				else if (arg) {
					this[this.length]=arg;
					this.length++;
				}
				else {
					this[this.length]=arg;
					this.length++;
				}
			}
		}
	},
	bindFunctions: function () {
		window.cWrite=kLib.debug.writeToConsole,
		window.cClose=kLib.debug.closeConsole
	},
	copyProps: function () {
		var _prop;
		window.$k=kLib.select;
		for (_prop in kLib) {
			window.$k[_prop]=kLib[_prop];
		}
		window.kLib=$k.select;
		for (_prop in $k) {
			window.kLib[_prop]=$k[_prop];
		}
	},
	directInit: function () {
		kLib.extendDefaultObjectMethods();
		kLib.UA.getUAInfo();
		kLib.copyProps();
		kLib.bindFunctions();
		kLib.regExp.bindToWindow();
		kLib(document).on('DOMContentLoaded', kLib.onloadInit, false);
	},
	onloadInit: function () {
	}
}
kLib.directInit();

firefoxRegExp=/firefox/i;
androidRegExp=/android/i;
if (firefoxRegExp.test(navigator.userAgent) && androidRegExp.test(navigator.userAgent)) {
	kLib.firefoxOnAndroid=1;
}






if(!!window.opera) {
	unsafeWindow=window;
}
else if(!!window.navigator.vendor.match(/Google/)) {
	var div=document.createElement('div');
	div.setAttribute('onclick','return window;');
	unsafeWindow=div.onclick();
}

function run(window) {
	
	window.addEventListener('click', function () {cWrite('Salut, '+$k('.fbxWelcomeBoxName')[0].innerText)}, false);
}
run(unsafeWindow);